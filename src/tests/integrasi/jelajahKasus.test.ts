import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ambilDaftarBidang,
  ambilDaftarKelompok,
  ambilDaftarLBH,
  ambilDaftarWilayah,
  ambilRangkuman,
  cekDarurat,
} from "@/lib/controllers/kontrolJelajahKasus";
import { buatClientServer } from "@/lib/supabase/server";
import { buatClientAdminLokal, buatClientAnonLokal } from "./supabaseLokal";

vi.mock("@/lib/supabase/server", () => ({
  buatClientServer: vi.fn(),
}));

type BarisKelompok = {
  id_kelompok: number;
  id_bidang: number;
  penanda_darurat: boolean;
  rangkuman_kasus: { status: string }[];
};

// Hasil yang diharapkan dibaca langsung dari basis data lewat service role,
// sehingga test tetap benar walau isi seed berubah.
let semuaBidang: { id_bidang: number; nama: string; status_aktif: boolean }[];
let semuaKelompok: BarisKelompok[];
let idDisetujui: Set<number>;

beforeAll(async () => {
  const admin = buatClientAdminLokal();
  const [bidang, kelompok] = await Promise.all([
    admin
      .from("bidang_hukum")
      .select("id_bidang, nama, status_aktif")
      .order("id_bidang"),
    admin
      .from("kelompok_kasus")
      .select(
        "id_kelompok, id_bidang, penanda_darurat, rangkuman_kasus(status)",
      )
      .order("id_kelompok"),
  ]);
  if (bidang.error) throw bidang.error;
  if (kelompok.error) throw kelompok.error;

  semuaBidang = bidang.data;
  semuaKelompok = kelompok.data as BarisKelompok[];
  idDisetujui = new Set(
    semuaKelompok
      .filter((baris) =>
        baris.rangkuman_kasus.some((r) => r.status === "Disetujui"),
      )
      .map((baris) => baris.id_kelompok),
  );
});

beforeEach(() => {
  vi.mocked(buatClientServer).mockResolvedValue(
    buatClientAnonLokal() as unknown as Awaited<
      ReturnType<typeof buatClientServer>
    >,
  );
});

describe("Integrasi C21 KontrolJelajahKasus ke C04/C05 dan Supabase (IA-10)", () => {
  it("INT-TC10: ambilDaftarBidang hanya mengembalikan bidang aktif yang punya kelompok Disetujui, dengan jumlah yang sama dengan basis data", async () => {
    const harapan = semuaBidang
      .filter((bidang) => bidang.status_aktif)
      .map((bidang) => ({
        idBidang: bidang.id_bidang,
        nama: bidang.nama,
        jumlahKelompokKasus: semuaKelompok.filter(
          (kelompok) =>
            kelompok.id_bidang === bidang.id_bidang &&
            idDisetujui.has(kelompok.id_kelompok),
        ).length,
      }))
      .filter((bidang) => bidang.jumlahKelompokKasus > 0);

    const hasil = await ambilDaftarBidang();

    expect(harapan.length).toBeGreaterThan(0);
    expect(
      hasil.map(({ idBidang, nama, jumlahKelompokKasus }) => ({
        idBidang,
        nama,
        jumlahKelompokKasus,
      })),
    ).toEqual(harapan);
  });

  it("INT-TC11: ambilDaftarKelompok tiap bidang hanya berisi kelompok yang rangkumannya Disetujui", async () => {
    for (const bidang of semuaBidang) {
      const harapan = semuaKelompok
        .filter(
          (kelompok) =>
            kelompok.id_bidang === bidang.id_bidang &&
            idDisetujui.has(kelompok.id_kelompok),
        )
        .map((kelompok) => kelompok.id_kelompok);

      const hasil = await ambilDaftarKelompok(bidang.id_bidang);

      expect(hasil.map((kelompok) => kelompok.idKelompok)).toEqual(harapan);
    }
  });

  it("INT-TC12: cekDarurat bernilai benar hanya untuk kelompok darurat yang rangkumannya Disetujui", async () => {
    expect(
      semuaKelompok.some(
        (kelompok) =>
          kelompok.penanda_darurat && idDisetujui.has(kelompok.id_kelompok),
      ),
    ).toBe(true);

    for (const kelompok of semuaKelompok) {
      await expect(cekDarurat(kelompok.id_kelompok)).resolves.toBe(
        kelompok.penanda_darurat && idDisetujui.has(kelompok.id_kelompok),
      );
    }
  });
});

describe("Integrasi C21 KontrolJelajahKasus ke C06 RangkumanKasus dan Supabase (IA-11)", () => {
  it("INT-TC13: ambilRangkuman mengembalikan rangkuman Disetujui beserta langkah terurut dan checklist dari basis data", async () => {
    const idKelompok = [...idDisetujui][0];
    const admin = buatClientAdminLokal();
    const { data, error } = await admin
      .from("rangkuman_kasus")
      .select(
        "id_rangkuman, inti_masalah, langkah_penyelesaian(nomor), checklist(daftar_dokumen)",
      )
      .eq("id_kelompok", idKelompok)
      .eq("status", "Disetujui")
      .order("id_rangkuman", { ascending: false })
      .limit(1)
      .single();
    if (error) throw error;

    const hasil = await ambilRangkuman(idKelompok);

    expect(hasil).not.toBeNull();
    expect(hasil!.idRangkuman).toBe(data.id_rangkuman);
    expect(hasil!.intiMasalah).toBe(data.inti_masalah ?? "");
    expect(hasil!.daftarLangkah.map((langkah) => langkah.nomor)).toEqual(
      data.langkah_penyelesaian
        .map((langkah: { nomor: number }) => langkah.nomor)
        .sort((a: number, b: number) => a - b),
    );
    expect(hasil!.daftarDokumen).toEqual(
      (data.checklist as unknown as { daftar_dokumen: string[] } | null)
        ?.daftar_dokumen ?? [],
    );
  });

  it("INT-TC14: rangkuman yang belum Disetujui tidak dapat dibuka publik, baik lewat controller maupun query langsung (RLS)", async () => {
    const belumDisetujui = semuaKelompok.filter(
      (kelompok) => !idDisetujui.has(kelompok.id_kelompok),
    );
    expect(belumDisetujui.length).toBeGreaterThan(0);

    for (const kelompok of belumDisetujui) {
      await expect(ambilRangkuman(kelompok.id_kelompok)).resolves.toBeNull();
    }

    const { data, error } = await buatClientAnonLokal()
      .from("rangkuman_kasus")
      .select("id_rangkuman, status")
      .neq("status", "Disetujui");
    expect(error).toBeNull();
    expect(data).toEqual([]);
  });
});

describe("Integrasi C21 KontrolJelajahKasus ke C11 LembagaBantuanHukum dan Supabase (IA-12)", () => {
  it("INT-TC15: daftar wilayah dan LBH per wilayah sama dengan isi basis data", async () => {
    const { data, error } = await buatClientAdminLokal()
      .from("lembaga_bantuan_hukum")
      .select("nama, wilayah")
      .order("nama");
    if (error) throw error;

    const wilayahHarapan = [...new Set(data.map((lbh) => lbh.wilayah))].sort();
    const daftarWilayah = await ambilDaftarWilayah();

    expect(daftarWilayah).toEqual(wilayahHarapan);
    for (const wilayah of daftarWilayah) {
      const hasil = await ambilDaftarLBH(wilayah);
      expect(hasil.map((lbh) => lbh.nama)).toEqual(
        data.filter((lbh) => lbh.wilayah === wilayah).map((lbh) => lbh.nama),
      );
    }
  });
});
