import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import {
  ambilAntreanPeninjauan,
  ambilKontenModerasi,
} from "@/lib/models/administrator";

type Hasil = { data: unknown; error: unknown };
type Panggilan = [string, unknown[]];

function buatSupabase(hasil: Hasil) {
  const panggilan: Panggilan[] = [];
  const kueri: Record<string, unknown> = {};
  for (const nama of ["from", "select", "eq"]) {
    kueri[nama] = (...argumen: unknown[]) => {
      panggilan.push([nama, argumen]);
      return kueri;
    };
  }
  kueri.maybeSingle = async () => hasil;
  kueri.then = (selesai: (nilai: Hasil) => unknown) => selesai(hasil);
  const supabase = { from: kueri.from } as unknown as SupabaseClient;
  const argumen = (nama: string) =>
    panggilan.filter(([n]) => n === nama).map(([, a]) => a);
  return { supabase, argumen };
}

function barisAntrean(
  id: number,
  riwayat: { status: string; waktu: string }[] | null,
  lengkap = true,
) {
  return {
    id_rangkuman: id,
    nama_penulis: lengkap ? "Kurator Satu" : null,
    kelompok_kasus: lengkap
      ? { judul_umum: `Kasus ${id}`, bidang_hukum: { nama: "Ketenagakerjaan" } }
      : null,
    riwayat_status: riwayat,
  };
}

describe("ambilAntreanPeninjauan", () => {
  it("C03-UT12: hanya meminta konten berstatus Diajukan dari rangkuman_kasus", async () => {
    const { supabase, argumen } = buatSupabase({ data: [], error: null });

    await ambilAntreanPeninjauan(supabase);

    expect(argumen("from")).toEqual([["rangkuman_kasus"]]);
    expect(argumen("eq")).toEqual([["status", "Diajukan"]]);
  });

  it("C03-UT13: memetakan baris dan mengurutkan dari pengajuan Diajukan terakhir paling lama", async () => {
    const { supabase } = buatSupabase({
      data: [
        barisAntrean(5, [
          { status: "Draft", waktu: "2026-11-01T00:00:00Z" },
          { status: "Diajukan", waktu: "2026-11-18T00:00:00Z" },
        ]),
        barisAntrean(3, [
          { status: "Diajukan", waktu: "2026-11-02T00:00:00Z" },
          { status: "Ditolak", waktu: "2026-11-05T00:00:00Z" },
          { status: "Diajukan", waktu: "2026-11-10T00:00:00Z" },
        ]),
        barisAntrean(9, null),
      ],
      error: null,
    });

    const hasil = await ambilAntreanPeninjauan(supabase);

    expect(hasil.map((butir) => butir.idRangkuman)).toEqual([3, 5, 9]);
    expect(hasil[0]).toEqual({
      idRangkuman: 3,
      judul: "Kasus 3",
      bidang: "Ketenagakerjaan",
      namaPenulis: "Kurator Satu",
      waktuPengajuan: "2026-11-10T00:00:00Z",
    });
    expect(hasil[2].waktuPengajuan).toBeNull();
  });

  it("C03-UT14: memberi nilai pengganti bila kelompok kasus dan penulis kosong", async () => {
    const { supabase } = buatSupabase({
      data: [barisAntrean(4, [], false)],
      error: null,
    });

    const [butir] = await ambilAntreanPeninjauan(supabase);

    expect(butir).toMatchObject({
      judul: "Tanpa judul",
      bidang: "—",
      namaPenulis: "Tanpa nama",
      waktuPengajuan: null,
    });
  });

  it("C03-UT15: meneruskan galat basis data", async () => {
    const galat = new Error("gagal");
    const { supabase } = buatSupabase({ data: null, error: galat });

    await expect(ambilAntreanPeninjauan(supabase)).rejects.toBe(galat);
  });
});

const barisKonten = {
  id_rangkuman: 4,
  inti_masalah: "Gaji terlambat.",
  hak: "Upah tepat waktu.",
  poin_pertimbangan: "Bipartit 30 hari.",
  status: "Diajukan",
  nama_penulis: "Kurator Satu",
  kelompok_kasus: {
    judul_umum: "Gaji tidak dibayar",
    bidang_hukum: { nama: "Ketenagakerjaan" },
  },
  langkah_penyelesaian: [
    { nomor: 2, deskripsi: "Lapor Disnaker", tujuan: null, dokumen_diperlukan: null, tenggat: null },
    { nomor: 1, deskripsi: "Tagih HRD", tujuan: "Bukti tertulis", dokumen_diperlukan: ["Slip gaji"], tenggat: "7 hari" },
  ],
  checklist: [{ daftar_dokumen: ["Perjanjian kerja", "Slip gaji"] }],
  templat_dokumen: [
    { id_templat: 2, nama_berkas: "lama.pdf", format: "PDF", ukuran: 10, versi: "1", tanggal_pembaruan: "2026-11-01" },
    { id_templat: 5, nama_berkas: "baru.pdf", format: "PDF", ukuran: 20, versi: "2", tanggal_pembaruan: "2026-11-20" },
    { id_templat: 3, nama_berkas: "lain.docx", format: "DOCX", ukuran: 30, versi: "1", tanggal_pembaruan: "2026-11-20" },
  ],
  artikel: [
    { id_artikel: 9, judul: "UU 13/2003", tautan_sumber: "https://jdih.go.id/b" },
    { id_artikel: 6, judul: "PP 36/2021", tautan_sumber: "https://jdih.go.id/a" },
  ],
};

describe("ambilKontenModerasi", () => {
  it("C03-UT16: memetakan isi lengkap konten dengan urutan langkah, templat, dan artikel", async () => {
    const { supabase, argumen } = buatSupabase({ data: barisKonten, error: null });

    const konten = await ambilKontenModerasi(supabase, 4);

    expect(argumen("eq")).toEqual([["id_rangkuman", 4]]);
    expect(konten).toMatchObject({
      idRangkuman: 4,
      judul: "Gaji tidak dibayar",
      bidang: "Ketenagakerjaan",
      namaPenulis: "Kurator Satu",
      status: "Diajukan",
      intiMasalah: "Gaji terlambat.",
      dokumenChecklist: ["Perjanjian kerja", "Slip gaji"],
    });
    expect(konten?.langkah).toEqual([
      { nomor: 1, deskripsi: "Tagih HRD", tujuan: "Bukti tertulis", dokumenDiperlukan: ["Slip gaji"], tenggat: "7 hari" },
      { nomor: 2, deskripsi: "Lapor Disnaker", tujuan: null, dokumenDiperlukan: [], tenggat: null },
    ]);
    expect(konten?.templat.map((templat) => templat.idTemplat)).toEqual([3, 5, 2]);
    expect(konten?.artikel.map((artikel) => artikel.idArtikel)).toEqual([6, 9]);
  });

  it("C03-UT17: menerima checklist berbentuk objek tunggal", async () => {
    const { supabase } = buatSupabase({
      data: { ...barisKonten, checklist: { daftar_dokumen: ["KTP"] } },
      error: null,
    });

    const konten = await ambilKontenModerasi(supabase, 4);

    expect(konten?.dokumenChecklist).toEqual(["KTP"]);
  });

  it("C03-UT18: memberi nilai kosong bila relasi konten tidak ada", async () => {
    const { supabase } = buatSupabase({
      data: {
        ...barisKonten,
        nama_penulis: null,
        kelompok_kasus: null,
        langkah_penyelesaian: null,
        checklist: null,
        templat_dokumen: null,
        artikel: null,
      },
      error: null,
    });

    const konten = await ambilKontenModerasi(supabase, 4);

    expect(konten).toMatchObject({
      judul: "Tanpa judul",
      bidang: "—",
      namaPenulis: "Tanpa nama",
      langkah: [],
      dokumenChecklist: [],
      templat: [],
      artikel: [],
    });
  });

  it("C03-UT19: mengembalikan null bila konten tidak ditemukan", async () => {
    const { supabase } = buatSupabase({ data: null, error: null });

    expect(await ambilKontenModerasi(supabase, 99)).toBeNull();
  });

  it("C03-UT20: meneruskan galat basis data", async () => {
    const galat = new Error("gagal");
    const { supabase } = buatSupabase({ data: null, error: galat });

    await expect(ambilKontenModerasi(supabase, 4)).rejects.toBe(galat);
  });
});
