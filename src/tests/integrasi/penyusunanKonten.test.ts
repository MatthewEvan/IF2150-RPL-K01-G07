import type { SupabaseClient } from "@supabase/supabase-js";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ajukanKonten,
  buatDraf,
  hapusTemplat,
  lampirkanTemplat,
  simpanDraf,
} from "@/lib/controllers/kontrolPenyusunanKonten";
import { buatClientServer } from "@/lib/supabase/server";
import {
  buatClientAdminLokal,
  buatClientAnonLokal,
  buatClientMasukLokal,
  wajibSupabaseLokal,
} from "./supabaseLokal";

const redirect = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/server", () => ({ buatClientServer: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect }));

const ID_KURATOR1 = "b0000000-0000-4000-8000-000000000001";
const ID_KONTEN_DIAJUKAN = 4;
const BUCKET = "templat";

let kurator1: SupabaseClient;
let kurator2: SupabaseClient;
let admin: SupabaseClient;

type IsianFormulir = Record<string, string | string[]>;

const ISIAN_LENGKAP: IsianFormulir = {
  intiMasalah: "Gaji terlambat lebih dari satu bulan.",
  hak: "Menerima upah tepat waktu.",
  poinPertimbangan: "Bipartit sekitar 30 hari kerja.",
  langkahDeskripsi: ["Tagih secara tertulis.", "Laporkan ke Disnaker."],
  langkahTujuan: ["Menyimpan bukti.", ""],
  langkahTenggat: ["", "Setelah 30 hari kerja"],
  checklist: "Perjanjian kerja\nSlip gaji",
  artikelJudul: ["PP 36/2021 tentang Pengupahan"],
  artikelTautan: ["https://jdih.kemnaker.go.id"],
};

function formulir(isian: IsianFormulir) {
  const data = new FormData();
  for (const [nama, nilai] of Object.entries(isian)) {
    for (const satu of [nilai].flat()) data.append(nama, satu);
  }
  return data;
}

function berkasPdf(nama: string, ukuran = 2048) {
  return new File([new Uint8Array(ukuran)], nama, { type: "application/pdf" });
}

function formulirTemplat(berkas: File) {
  const data = new FormData();
  data.set("templat", berkas);
  return data;
}

function pakaiClient(client: SupabaseClient) {
  vi.mocked(buatClientServer).mockResolvedValue(
    client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
  );
}

async function buatDrafBaru(idKelompok = 1) {
  redirect.mockClear();
  const hasil = await buatDraf(idKelompok);
  expect(hasil).toBeUndefined();
  const tujuan = String(redirect.mock.calls[0][0]);
  return Number(tujuan.split("/").pop());
}

async function bacaRangkuman(idRangkuman: number) {
  const { data, error } = await admin
    .from("rangkuman_kasus")
    .select(
      `id_rangkuman, id_kurator, status, inti_masalah, hak, poin_pertimbangan,
       langkah_penyelesaian ( nomor, deskripsi, tujuan, tenggat ),
       checklist ( daftar_dokumen ),
       artikel ( judul, tautan_sumber )`,
    )
    .eq("id_rangkuman", idRangkuman)
    .single();
  if (error) throw error;
  return data;
}

async function bacaRiwayat(idRangkuman: number) {
  const { data, error } = await admin
    .from("riwayat_status")
    .select("status, id_pelaku")
    .eq("id_rangkuman", idRangkuman)
    .order("id_riwayat");
  if (error) throw error;
  return data;
}

async function daftarBerkas(idRangkuman: number) {
  const { data, error } = await admin.storage
    .from(BUCKET)
    .list(String(idRangkuman));
  if (error) throw error;
  return data.map((berkas) => `${idRangkuman}/${berkas.name}`);
}

beforeAll(async () => {
  wajibSupabaseLokal();
  kurator1 = await buatClientMasukLokal("kurator1@pahamhukum.test");
  kurator2 = await buatClientMasukLokal("kurator2@pahamhukum.test");
  admin = buatClientAdminLokal();
});

beforeEach(() => {
  pakaiClient(kurator1);
});

describe("IA-10 KontrolPenyusunanKonten ke RangkumanKasus dan basis data", () => {
  it("INT-TC30: buatDraf membuat rangkuman Draft milik Kurator beserta riwayat Draft", async () => {
    const idRangkuman = await buatDrafBaru(1);

    const rangkuman = await bacaRangkuman(idRangkuman);
    expect(rangkuman.status).toBe("Draft");
    expect(rangkuman.id_kurator).toBe(ID_KURATOR1);
    expect(await bacaRiwayat(idRangkuman)).toEqual([
      { status: "Draft", id_pelaku: ID_KURATOR1 },
    ]);
  });

  it("INT-TC31: simpanDraf menyimpan isian, langkah, checklist, dan artikel, lalu menggantinya saat disimpan ulang", async () => {
    const idRangkuman = await buatDrafBaru(1);

    const hasil = await simpanDraf(idRangkuman, formulir(ISIAN_LENGKAP));
    expect(hasil.berhasil).toBe(true);

    const tersimpan = await bacaRangkuman(idRangkuman);
    expect(tersimpan.inti_masalah).toBe(ISIAN_LENGKAP.intiMasalah);
    expect(
      [...tersimpan.langkah_penyelesaian].sort((a, b) => a.nomor - b.nomor),
    ).toEqual([
      {
        nomor: 1,
        deskripsi: "Tagih secara tertulis.",
        tujuan: "Menyimpan bukti.",
        tenggat: null,
      },
      {
        nomor: 2,
        deskripsi: "Laporkan ke Disnaker.",
        tujuan: null,
        tenggat: "Setelah 30 hari kerja",
      },
    ]);
    expect(tersimpan.checklist).toEqual({
      daftar_dokumen: ["Perjanjian kerja", "Slip gaji"],
    });
    expect(tersimpan.artikel).toEqual([
      {
        judul: "PP 36/2021 tentang Pengupahan",
        tautan_sumber: "https://jdih.kemnaker.go.id",
      },
    ]);

    await simpanDraf(
      idRangkuman,
      formulir({
        ...ISIAN_LENGKAP,
        langkahDeskripsi: ["Laporkan ke Disnaker."],
        langkahTujuan: [""],
        langkahTenggat: [""],
      }),
    );
    const ulang = await bacaRangkuman(idRangkuman);
    expect(ulang.langkah_penyelesaian).toEqual([
      {
        nomor: 1,
        deskripsi: "Laporkan ke Disnaker.",
        tujuan: null,
        tenggat: null,
      },
    ]);
  });

  it("INT-TC32: simpanDraf menolak konten berstatus Diajukan dan isi di basis data tidak berubah", async () => {
    const sebelum = await bacaRangkuman(ID_KONTEN_DIAJUKAN);

    const hasil = await simpanDraf(
      ID_KONTEN_DIAJUKAN,
      formulir({ ...ISIAN_LENGKAP, intiMasalah: "Diubah oleh pengujian." }),
    );

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Konten berstatus Diajukan tidak bisa diubah.",
    });
    expect((await bacaRangkuman(ID_KONTEN_DIAJUKAN)).inti_masalah).toBe(
      sebelum.inti_masalah,
    );
  });
});

describe("IA-11 RangkumanKasus ke fungsi basis data ajukan_konten dan RiwayatStatus", () => {
  it("INT-TC33: ajukanKonten mengubah status menjadi Diajukan, mencatat riwayat, dan mengunci konten", async () => {
    const idRangkuman = await buatDrafBaru(2);

    const hasil = await ajukanKonten(idRangkuman, formulir(ISIAN_LENGKAP));

    expect(hasil).toEqual({ berhasil: true });
    expect((await bacaRangkuman(idRangkuman)).status).toBe("Diajukan");
    expect(await bacaRiwayat(idRangkuman)).toEqual([
      { status: "Draft", id_pelaku: ID_KURATOR1 },
      { status: "Diajukan", id_pelaku: ID_KURATOR1 },
    ]);

    const ubah = await simpanDraf(idRangkuman, formulir(ISIAN_LENGKAP));
    expect(ubah.berhasil).toBe(false);
  });

  it("INT-TC34: ajukan_konten menolak konten yang belum lengkap walau dipanggil langsung", async () => {
    const idRangkuman = await buatDrafBaru(2);

    const { error } = await kurator1.rpc("ajukan_konten", {
      p_id_rangkuman: idRangkuman,
    });

    expect(error?.code).toBe("23514");
    expect((await bacaRangkuman(idRangkuman)).status).toBe("Draft");
    expect(await bacaRiwayat(idRangkuman)).toHaveLength(1);
  });

  it("INT-TC35: Kurator lain tidak dapat menyimpan maupun mengajukan draf milik Kurator1", async () => {
    const idRangkuman = await buatDrafBaru(3);

    const simpan = await kurator2.rpc("simpan_draf", {
      p_id_rangkuman: idRangkuman,
      p_inti_masalah: "Diambil alih Kurator lain.",
      p_hak: "",
      p_poin_pertimbangan: "",
      p_langkah: [],
      p_daftar_dokumen: [],
      p_artikel: [],
    });
    const ajukan = await kurator2.rpc("ajukan_konten", {
      p_id_rangkuman: idRangkuman,
    });

    expect(simpan.error?.code).toBe("42501");
    expect(ajukan.error?.code).toBe("42501");
    const rangkuman = await bacaRangkuman(idRangkuman);
    expect(rangkuman.inti_masalah).toBeNull();
    expect(rangkuman.status).toBe("Draft");
  });

  it("INT-TC39: Kurator tidak dapat menayangkan sendiri drafnya dengan mengubah status menjadi Disetujui (KF35)", async () => {
    const idRangkuman = await buatDrafBaru(5);
    await simpanDraf(idRangkuman, formulir(ISIAN_LENGKAP));

    const { data, error } = await kurator1
      .from("rangkuman_kasus")
      .update({ status: "Disetujui", tanggal_peninjauan: "2026-11-19" })
      .eq("id_rangkuman", idRangkuman)
      .select("status");

    expect(error?.code).toBe("42501");
    expect(data).toBeNull();
    const rangkuman = await bacaRangkuman(idRangkuman);
    expect(rangkuman.status).toBe("Draft");
    expect(await bacaRiwayat(idRangkuman)).toEqual([
      { status: "Draft", id_pelaku: ID_KURATOR1 },
    ]);

    const { data: publik } = await buatClientAnonLokal()
      .from("rangkuman_kasus")
      .select("id_rangkuman")
      .eq("id_rangkuman", idRangkuman);
    expect(publik).toEqual([]);
  });
});

describe("IA-12 TemplatDokumen ke Supabase Storage", () => {
  it("INT-TC36: lampirkanTemplat menyimpan berkas di Storage dan nama yang sama menjadi versi baru", async () => {
    const idRangkuman = await buatDrafBaru(4);

    const pertama = await lampirkanTemplat(
      idRangkuman,
      formulirTemplat(berkasPdf("surat-penagihan.pdf")),
    );
    expect(pertama.berhasil).toBe(true);
    if (!pertama.berhasil) return;
    expect(pertama.templat.versi).toBe("1");
    expect(await daftarBerkas(idRangkuman)).toEqual([
      pertama.templat.lokasiBerkas,
    ]);

    const kedua = await lampirkanTemplat(
      idRangkuman,
      formulirTemplat(berkasPdf("surat-penagihan.pdf", 4096)),
    );
    expect(kedua.berhasil).toBe(true);
    if (!kedua.berhasil) return;
    expect(kedua.templat.idTemplat).toBe(pertama.templat.idTemplat);
    expect(kedua.templat.versi).toBe("2");
    expect(kedua.templat.ukuran).toBe(4096);
    expect(await daftarBerkas(idRangkuman)).toEqual([
      kedua.templat.lokasiBerkas,
    ]);
  });

  it("INT-TC37: hapusTemplat menghapus baris templat dan berkasnya di Storage", async () => {
    const idRangkuman = await buatDrafBaru(4);
    const unggah = await lampirkanTemplat(
      idRangkuman,
      formulirTemplat(berkasPdf("surat-keberatan.pdf")),
    );
    if (!unggah.berhasil) throw new Error(unggah.galat);

    const hasil = await hapusTemplat(idRangkuman, unggah.templat.idTemplat);

    expect(hasil).toEqual({ berhasil: true });
    const { data } = await admin
      .from("templat_dokumen")
      .select("id_templat")
      .eq("id_templat", unggah.templat.idTemplat);
    expect(data).toEqual([]);
    expect(await daftarBerkas(idRangkuman)).toEqual([]);
  });

  it("INT-TC38: pengunjung tidak dapat membuat tautan unduh untuk templat konten yang belum Disetujui", async () => {
    const idRangkuman = await buatDrafBaru(4);
    const unggah = await lampirkanTemplat(
      idRangkuman,
      formulirTemplat(berkasPdf("surat-draf.pdf")),
    );
    if (!unggah.berhasil) throw new Error(unggah.galat);

    const { data, error } = await buatClientAnonLokal()
      .storage.from(BUCKET)
      .createSignedUrl(unggah.templat.lokasiBerkas!, 60);

    expect(error).not.toBeNull();
    expect(data).toBeNull();
  });
});
