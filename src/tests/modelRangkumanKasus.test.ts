import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import {
  ajukanRangkuman,
  ambilIsianKosong,
  ambilRangkumanDisetujui,
  ambilRangkumanMilik,
  buatRangkuman,
  cariLangkahBertenggat,
  simpanDraf,
  type DataKonten,
} from "@/lib/models/rangkumanKasus";

type Hasil = { data: unknown; error: unknown };
type Panggilan = [string, unknown[]];

function buatSupabase(
  hasil: Hasil,
  hasilRpc: { error: unknown } = { error: null },
) {
  const panggilan: Panggilan[] = [];
  const kueri: Record<string, (...argumen: unknown[]) => unknown> = {};
  for (const nama of ["from", "insert", "select", "eq", "order", "limit"]) {
    kueri[nama] = (...argumen) => {
      panggilan.push([nama, argumen]);
      return kueri;
    };
  }
  for (const nama of ["single", "maybeSingle"]) {
    kueri[nama] = async (...argumen) => {
      panggilan.push([nama, argumen]);
      return hasil;
    };
  }
  const rpc = vi.fn(async () => hasilRpc);
  const supabase = { from: kueri.from, rpc } as unknown as SupabaseClient;
  const argumen = (nama: string) =>
    panggilan.filter(([n]) => n === nama).map(([, a]) => a);
  return { supabase, rpc, argumen };
}

const GALAT_RLS = { code: "42501", message: "ditolak RLS" };

const DATA_LENGKAP: DataKonten = {
  intiMasalah: "Gaji terlambat lebih dari satu bulan.",
  hak: "Menerima upah tepat waktu.",
  poinPertimbangan: "Bipartit sekitar 30 hari kerja.",
  daftarLangkah: [
    { nomor: 1, deskripsi: "Tagih tertulis.", tujuan: "", tenggat: null },
  ],
  daftarDokumen: ["Slip gaji"],
  daftarArtikel: [{ judul: "PP 36/2021", tautanSumber: "https://jdih.go.id" }],
};

const BARIS_MILIK = {
  id_rangkuman: 11,
  id_kelompok: 1,
  inti_masalah: "Gaji terlambat.",
  hak: null,
  poin_pertimbangan: "Bipartit.",
  status: "Draft",
  catatan_revisi: null,
  kelompok_kasus: { judul_umum: "Gaji tidak dibayar tepat waktu" },
  langkah_penyelesaian: [
    {
      nomor: 2,
      deskripsi: "Laporkan ke Disnaker.",
      tujuan: null,
      tenggat: "30 hari kerja",
    },
    { nomor: 1, deskripsi: null, tujuan: "Menyimpan bukti.", tenggat: null },
  ],
  checklist: { daftar_dokumen: ["Perjanjian kerja", "Slip gaji"] },
  artikel: [
    { id_artikel: 9, judul: "Artikel B", tautan_sumber: null },
    { id_artikel: 3, judul: null, tautan_sumber: "https://jdih.go.id/a" },
  ],
};

const BARIS_TAMPIL = {
  id_rangkuman: 4,
  id_kelompok: 2,
  inti_masalah: "Diberhentikan tanpa pesangon.",
  hak: "Pesangon sesuai masa kerja.",
  poin_pertimbangan: null,
  nama_penulis: "Kurator Satu",
  tanggal_peninjauan: "2026-11-13",
  kelompok_kasus: {
    id_bidang: 1,
    judul_umum: "Diberhentikan tanpa pesangon",
    istilah_resmi: "Pemutusan hubungan kerja",
    bidang_hukum: { nama: "Ketenagakerjaan" },
  },
  langkah_penyelesaian: [
    {
      nomor: 1,
      deskripsi: "Minta surat PHK.",
      tujuan: null,
      dokumen_diperlukan: ["KTP"],
      tenggat: "   ",
    },
    {
      nomor: 2,
      deskripsi: null,
      tujuan: "Bukti tertulis.",
      dokumen_diperlukan: [],
      tenggat: " 7 hari kerja ",
    },
  ],
  checklist: null,
  templat_dokumen: [
    {
      id_templat: 5,
      nama_berkas: "surat-keberatan.pdf",
      format: "PDF",
      ukuran: 2048,
      versi: "2",
      tanggal_pembaruan: "2026-11-11",
    },
  ],
  artikel: [
    {
      id_artikel: 1,
      judul: "UU Ketenagakerjaan",
      tautan_sumber: "https://jdih.go.id/uu",
    },
    { id_artikel: 2, judul: "Tanpa tautan", tautan_sumber: null },
    { id_artikel: 3, judul: null, tautan_sumber: "https://jdih.go.id/x" },
  ],
};

describe("C06 buatRangkuman", () => {
  it("C06-UT01: membuat rangkuman Draft milik Kurator dan mengembalikan id barunya", async () => {
    const { supabase, argumen } = buatSupabase({
      data: { id_rangkuman: 12 },
      error: null,
    });

    await expect(buatRangkuman(supabase, 1, "k1")).resolves.toBe(12);
    expect(argumen("from")).toEqual([["rangkuman_kasus"]]);
    expect(argumen("insert")).toEqual([[{ id_kelompok: 1, id_kurator: "k1" }]]);
  });

  it("C06-UT02: meneruskan galat bila basis data menolak pembuatan rangkuman", async () => {
    const { supabase } = buatSupabase({ data: null, error: GALAT_RLS });

    await expect(buatRangkuman(supabase, 1, "k-nonaktif")).rejects.toBe(
      GALAT_RLS,
    );
  });
});

describe("C06 ambilRangkumanMilik", () => {
  it("C06-UT03: memetakan baris menjadi rangkuman dengan langkah dan artikel terurut", async () => {
    const { supabase, argumen } = buatSupabase({
      data: BARIS_MILIK,
      error: null,
    });

    const hasil = await ambilRangkumanMilik(supabase, 11, "k1");

    expect(argumen("eq")).toEqual([
      ["id_rangkuman", 11],
      ["id_kurator", "k1"],
    ]);
    expect(hasil).toEqual({
      idRangkuman: 11,
      idKelompok: 1,
      judulUmum: "Gaji tidak dibayar tepat waktu",
      status: "Draft",
      catatanRevisi: null,
      intiMasalah: "Gaji terlambat.",
      hak: "",
      poinPertimbangan: "Bipartit.",
      daftarLangkah: [
        { nomor: 1, deskripsi: "", tujuan: "Menyimpan bukti.", tenggat: null },
        {
          nomor: 2,
          deskripsi: "Laporkan ke Disnaker.",
          tujuan: "",
          tenggat: "30 hari kerja",
        },
      ],
      daftarDokumen: ["Perjanjian kerja", "Slip gaji"],
      daftarArtikel: [
        { judul: "", tautanSumber: "https://jdih.go.id/a" },
        { judul: "Artikel B", tautanSumber: "" },
      ],
    });
  });

  it("C06-UT04: mengembalikan daftar kosong untuk rangkuman yang baru dibuat", async () => {
    const { supabase } = buatSupabase({
      data: {
        ...BARIS_MILIK,
        inti_masalah: null,
        poin_pertimbangan: null,
        langkah_penyelesaian: [],
        checklist: null,
        artikel: [],
      },
      error: null,
    });

    const hasil = await ambilRangkumanMilik(supabase, 11, "k1");

    expect(hasil).toMatchObject({
      intiMasalah: "",
      hak: "",
      poinPertimbangan: "",
      daftarLangkah: [],
      daftarDokumen: [],
      daftarArtikel: [],
    });
  });

  it("C06-UT05: mengembalikan null untuk rangkuman milik Kurator lain atau yang tidak ada", async () => {
    const { supabase } = buatSupabase({ data: null, error: null });

    await expect(ambilRangkumanMilik(supabase, 99, "k1")).resolves.toBeNull();
  });

  it("C06-UT06: meneruskan galat basis data", async () => {
    const { supabase } = buatSupabase({ data: null, error: GALAT_RLS });

    await expect(ambilRangkumanMilik(supabase, 11, "k1")).rejects.toBe(
      GALAT_RLS,
    );
  });
});

describe("C06 ambilIsianKosong (Algo-016)", () => {
  it("C06-UT07: mengembalikan daftar kosong untuk konten yang lengkap", () => {
    expect(ambilIsianKosong(DATA_LENGKAP)).toEqual([]);
  });

  it("C06-UT08: menganggap checklist yang hanya berisi baris spasi sebagai kosong", () => {
    expect(
      ambilIsianKosong({ ...DATA_LENGKAP, daftarDokumen: ["", "   "] }),
    ).toEqual(["checklist"]);
  });

  it("C06-UT09: menerima checklist bila minimal satu baris terisi", () => {
    expect(
      ambilIsianKosong({ ...DATA_LENGKAP, daftarDokumen: ["  ", "KTP"] }),
    ).toEqual([]);
  });

  it("C06-UT10: menandai seluruh isian wajib pada konten kosong", () => {
    expect(
      ambilIsianKosong({
        intiMasalah: " ",
        hak: "",
        poinPertimbangan: "",
        daftarLangkah: [],
        daftarDokumen: [],
        daftarArtikel: [],
      }),
    ).toEqual([
      "intiMasalah",
      "hak",
      "poinPertimbangan",
      "langkah",
      "checklist",
      "artikel",
    ]);
  });
});

describe("C06 ajukanRangkuman", () => {
  it("C06-UT11: memanggil fungsi basis data ajukan_konten dengan id rangkuman", async () => {
    const { supabase, rpc } = buatSupabase({ data: null, error: null });

    await ajukanRangkuman(supabase, 11);

    expect(rpc).toHaveBeenCalledWith("ajukan_konten", { p_id_rangkuman: 11 });
  });

  it("C06-UT12: meneruskan penolakan basis data untuk konten yang belum lengkap", async () => {
    const galat = {
      code: "23514",
      message: "Isian wajib konten 11 belum lengkap",
    };
    const { supabase } = buatSupabase(
      { data: null, error: null },
      { error: galat },
    );

    await expect(ajukanRangkuman(supabase, 11)).rejects.toBe(galat);
  });
});

describe("C06 simpanDraf", () => {
  it("C06-UT13: mengirim seluruh isian ke fungsi basis data simpan_draf", async () => {
    const { supabase, rpc } = buatSupabase({ data: null, error: null });

    await simpanDraf(supabase, 11, DATA_LENGKAP);

    expect(rpc).toHaveBeenCalledWith("simpan_draf", {
      p_id_rangkuman: 11,
      p_inti_masalah: DATA_LENGKAP.intiMasalah,
      p_hak: DATA_LENGKAP.hak,
      p_poin_pertimbangan: DATA_LENGKAP.poinPertimbangan,
      p_langkah: DATA_LENGKAP.daftarLangkah,
      p_daftar_dokumen: DATA_LENGKAP.daftarDokumen,
      p_artikel: DATA_LENGKAP.daftarArtikel,
    });
  });

  it("C06-UT14: meneruskan penolakan untuk konten yang tidak dapat diubah", async () => {
    const { supabase } = buatSupabase(
      { data: null, error: null },
      { error: GALAT_RLS },
    );

    await expect(simpanDraf(supabase, 4, DATA_LENGKAP)).rejects.toBe(GALAT_RLS);
  });
});

describe("C06 ambilRangkumanDisetujui (KF02)", () => {
  it("C06-UT15: hanya meminta rangkuman berstatus Disetujui pada kelompok tersebut", async () => {
    const { supabase, argumen } = buatSupabase({
      data: BARIS_TAMPIL,
      error: null,
    });

    await ambilRangkumanDisetujui(supabase, 2);

    expect(argumen("eq")).toEqual([
      ["id_kelompok", 2],
      ["status", "Disetujui"],
    ]);
    expect(argumen("limit")).toEqual([[1]]);
  });

  it("C06-UT16: memetakan rangkuman lengkap untuk halaman I-02", async () => {
    const { supabase } = buatSupabase({ data: BARIS_TAMPIL, error: null });

    const hasil = await ambilRangkumanDisetujui(supabase, 2);

    expect(hasil).toMatchObject({
      idRangkuman: 4,
      idKelompok: 2,
      idBidang: 1,
      namaBidang: "Ketenagakerjaan",
      judulUmum: "Diberhentikan tanpa pesangon",
      istilahResmi: "Pemutusan hubungan kerja",
      poinPertimbangan: "",
      namaPenulis: "Kurator Satu",
      tanggalPeninjauan: "2026-11-13",
      daftarTemplat: [
        {
          idTemplat: 5,
          namaBerkas: "surat-keberatan.pdf",
          format: "PDF",
          ukuran: 2048,
          versi: "2",
          tanggalPembaruan: "2026-11-11",
        },
      ],
    });
  });

  it("C06-UT17: mengosongkan tenggat yang hanya berisi spasi dan merapikan tenggat lainnya", async () => {
    const { supabase } = buatSupabase({ data: BARIS_TAMPIL, error: null });

    const hasil = await ambilRangkumanDisetujui(supabase, 2);

    expect(hasil?.daftarLangkah).toEqual([
      {
        nomor: 1,
        deskripsi: "Minta surat PHK.",
        tujuan: "",
        dokumenDiperlukan: ["KTP"],
        tenggat: null,
      },
      {
        nomor: 2,
        deskripsi: "",
        tujuan: "Bukti tertulis.",
        dokumenDiperlukan: [],
        tenggat: "7 hari kerja",
      },
    ]);
  });

  it("C06-UT18: tidak menampilkan artikel tanpa judul atau tanpa tautan, dan checklist kosong menjadi daftar kosong", async () => {
    const { supabase } = buatSupabase({ data: BARIS_TAMPIL, error: null });

    const hasil = await ambilRangkumanDisetujui(supabase, 2);

    expect(hasil?.daftarArtikel).toEqual([
      { judul: "UU Ketenagakerjaan", tautanSumber: "https://jdih.go.id/uu" },
    ]);
    expect(hasil?.daftarDokumen).toEqual([]);
  });

  it("C06-UT19: mengembalikan null bila kelompok belum punya rangkuman Disetujui", async () => {
    const { supabase } = buatSupabase({ data: null, error: null });

    await expect(ambilRangkumanDisetujui(supabase, 3)).resolves.toBeNull();
  });

  it("C06-UT20: meneruskan galat basis data", async () => {
    const { supabase } = buatSupabase({ data: null, error: GALAT_RLS });

    await expect(ambilRangkumanDisetujui(supabase, 2)).rejects.toBe(GALAT_RLS);
  });
});

describe("C06 cariLangkahBertenggat", () => {
  const langkah = (nomor: number, tenggat: string | null) => ({
    nomor,
    deskripsi: `Langkah ${nomor}`,
    tujuan: "",
    tenggat,
  });

  it("C06-UT21: mengembalikan langkah bertenggat pertama menurut urutan", () => {
    expect(
      cariLangkahBertenggat([
        langkah(1, null),
        langkah(2, "7 hari"),
        langkah(3, "30 hari"),
      ]),
    ).toEqual(langkah(2, "7 hari"));
  });

  it("C06-UT22: mengembalikan null bila tidak ada langkah bertenggat atau daftar kosong", () => {
    expect(cariLangkahBertenggat([langkah(1, null)])).toBeNull();
    expect(cariLangkahBertenggat([])).toBeNull();
  });
});
