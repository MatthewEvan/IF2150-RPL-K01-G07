import { describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  ambilKelompokDisetujui,
  ambilPilihanKelompok,
  cekDarurat,
  type KelompokKasus,
} from "@/lib/models/kelompokKasus";
import { cocokkanKataKunciKelompok } from "@/lib/models/pencarian";

type Hasil = { data: unknown; error: unknown };

/** Tiruan Supabase yang mencatat filter dan urutan yang dikirim model. */
function buatSupabase(hasil: Hasil) {
  const catatan = {
    tabel: "",
    select: "",
    eq: [] as [string, unknown][],
    order: [] as string[],
  };
  const kueri = {
    select(kolom: string) {
      catatan.select = kolom;
      return kueri;
    },
    eq(kolom: string, isi: unknown) {
      catatan.eq.push([kolom, isi]);
      return kueri;
    },
    order(kolom: string) {
      catatan.order.push(kolom);
      return kueri;
    },
    returns: () => kueri,
    then<T>(selesai: (nilai: Hasil) => T) {
      return Promise.resolve(hasil).then(selesai);
    },
  };
  const supabase = {
    from: vi.fn((tabel: string) => {
      catatan.tabel = tabel;
      return kueri;
    }),
  };
  return { supabase: supabase as unknown as SupabaseClient, catatan };
}

const GALAT = { message: "permintaan ditolak" };

const KELOMPOK: KelompokKasus = {
  idKelompok: 5,
  idBidang: 3,
  judulUmum: "Mengalami kekerasan di rumah",
  istilahResmi: "Kekerasan dalam rumah tangga",
  penandaDarurat: true,
};

describe("C05 KelompokKasus — ambilKelompokDisetujui", () => {
  it("C05-UT01: memetakan baris dan hanya meminta kelompok berstatus Disetujui", async () => {
    const { supabase, catatan } = buatSupabase({
      data: [
        {
          id_kelompok: 1,
          id_bidang: 1,
          judul_umum: "Gaji tidak dibayar tepat waktu",
          istilah_resmi: "Keterlambatan pembayaran upah",
          penanda_darurat: false,
          rangkuman_kasus: [{ status: "Disetujui" }],
        },
      ],
      error: null,
    });

    const hasil = await ambilKelompokDisetujui(supabase);

    expect(hasil).toEqual([
      {
        idKelompok: 1,
        idBidang: 1,
        judulUmum: "Gaji tidak dibayar tepat waktu",
        istilahResmi: "Keterlambatan pembayaran upah",
        penandaDarurat: false,
      },
    ]);
    expect(catatan.tabel).toBe("kelompok_kasus");
    expect(catatan.select).toContain("rangkuman_kasus!inner(status)");
    expect(catatan.eq).toEqual([["rangkuman_kasus.status", "Disetujui"]]);
    expect(catatan.order).toEqual(["id_kelompok"]);
  });

  it("C05-UT02: meneruskan galat basis data", async () => {
    const { supabase } = buatSupabase({ data: null, error: GALAT });

    await expect(ambilKelompokDisetujui(supabase)).rejects.toBe(GALAT);
  });
});

describe("C05 KelompokKasus — cekDarurat", () => {
  it("C05-UT03: bernilai benar untuk kelompok bertanda darurat", () => {
    expect(cekDarurat(KELOMPOK)).toBe(true);
  });

  it("C05-UT04: bernilai salah untuk kelompok bukan darurat", () => {
    expect(cekDarurat({ ...KELOMPOK, penandaDarurat: false })).toBe(false);
  });
});

describe("C05 KelompokKasus — cocokkanKataKunci (Algo-012)", () => {
  it("C05-UT05: cocok dengan istilah resmi tanpa membedakan huruf besar", () => {
    expect(cocokkanKataKunciKelompok(KELOMPOK, "RUMAH TANGGA")).toBe(true);
  });

  it("C05-UT06: tidak cocok untuk kata kunci kosong atau hanya spasi", () => {
    expect(cocokkanKataKunciKelompok(KELOMPOK, "   ")).toBe(false);
  });

  it("C05-UT07: tidak cocok untuk kata kunci yang tidak ada di judul maupun istilah", () => {
    expect(cocokkanKataKunciKelompok(KELOMPOK, "pesangon")).toBe(false);
  });
});

describe("C05 KelompokKasus — ambilPilihanKelompok", () => {
  it("C05-UT08: memetakan pilihan dari bidang aktif dengan urutan bidang lalu kelompok", async () => {
    const { supabase, catatan } = buatSupabase({
      data: [
        {
          id_kelompok: 2,
          judul_umum: "Diberhentikan tanpa pesangon",
          bidang_hukum: { nama: "Ketenagakerjaan" },
        },
      ],
      error: null,
    });

    await expect(ambilPilihanKelompok(supabase)).resolves.toEqual([
      {
        idKelompok: 2,
        namaBidang: "Ketenagakerjaan",
        judulUmum: "Diberhentikan tanpa pesangon",
      },
    ]);
    expect(catatan.eq).toEqual([["bidang_hukum.status_aktif", true]]);
    expect(catatan.order).toEqual(["id_bidang", "id_kelompok"]);
  });

  it("C05-UT09: meneruskan galat basis data", async () => {
    const { supabase } = buatSupabase({ data: null, error: GALAT });

    await expect(ambilPilihanKelompok(supabase)).rejects.toBe(GALAT);
  });
});
