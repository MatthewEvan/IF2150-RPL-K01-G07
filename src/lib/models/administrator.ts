import type { SupabaseClient } from "@supabase/supabase-js";
import type { StatusKonten } from "@/components/ui/Badge";

/** Satu butir pada antrean tinjauan (I-07). */
export type AntreanPeninjauan = {
  idRangkuman: number;
  judul: string;
  bidang: string;
  namaPenulis: string;
  /** ISO 8601 pengajuan terakhir berstatus Diajukan; null bila riwayatnya tidak ada. */
  waktuPengajuan: string | null;
};

export type LangkahModerasi = {
  nomor: number;
  deskripsi: string | null;
  tujuan: string | null;
  dokumenDiperlukan: string[];
  tenggat: string | null;
};

export type TemplatModerasi = {
  idTemplat: number;
  namaBerkas: string;
  format: string;
  ukuran: number;
  versi: string;
  tanggalPembaruan: string;
};

export type ArtikelModerasi = {
  idArtikel: number;
  judul: string | null;
  tautanSumber: string | null;
};

/** Isi lengkap konten yang ditinjau pada panel pratinjau I-07. */
export type KontenModerasi = {
  idRangkuman: number;
  judul: string;
  bidang: string;
  namaPenulis: string;
  status: StatusKonten;
  intiMasalah: string | null;
  hak: string | null;
  poinPertimbangan: string | null;
  langkah: LangkahModerasi[];
  dokumenChecklist: string[];
  templat: TemplatModerasi[];
  artikel: ArtikelModerasi[];
};

type BarisRiwayat = { status: StatusKonten; waktu: string };

type BarisAntrean = {
  id_rangkuman: number;
  nama_penulis: string | null;
  kelompok_kasus: {
    judul_umum: string;
    bidang_hukum: { nama: string } | null;
  } | null;
  riwayat_status: BarisRiwayat[] | null;
};

type BarisKonten = {
  id_rangkuman: number;
  inti_masalah: string | null;
  hak: string | null;
  poin_pertimbangan: string | null;
  status: StatusKonten;
  nama_penulis: string | null;
  kelompok_kasus: {
    judul_umum: string;
    bidang_hukum: { nama: string } | null;
  } | null;
  langkah_penyelesaian:
    | {
        nomor: number;
        deskripsi: string | null;
        tujuan: string | null;
        dokumen_diperlukan: string[] | null;
        tenggat: string | null;
      }[]
    | null;
  checklist:
    | { daftar_dokumen: string[] | null }
    | { daftar_dokumen: string[] | null }[]
    | null;
  templat_dokumen:
    | {
        id_templat: number;
        nama_berkas: string;
        format: string;
        ukuran: number;
        versi: string;
        tanggal_pembaruan: string;
      }[]
    | null;
  artikel:
    | {
        id_artikel: number;
        judul: string | null;
        tautan_sumber: string | null;
      }[]
    | null;
};

const MS_PER_HARI = 24 * 60 * 60 * 1000;

/**
 * Q-007: MAX(rs.waktu) hanya dari riwayat berstatus Diajukan. Riwayat status
 * lain tidak boleh ikut terhitung sebagai waktu pengajuan.
 */
export function waktuPengajuanTerakhir(
  riwayat: BarisRiwayat[] | null,
): string | null {
  if (!riwayat) return null;
  return riwayat
    .filter((baris) => baris.status === "Diajukan")
    .reduce<string | null>(
      (terbaru, baris) =>
        terbaru === null || baris.waktu > terbaru ? baris.waktu : terbaru,
      null,
    );
}

/**
 * KF31: pengajuan paling lama berada di atas. Butir tanpa riwayat Diajukan
 * diletakkan paling akhir agar tidak menggeser antrean yang sah.
 */
export function urutkanAntreanPeninjauan(
  daftar: AntreanPeninjauan[],
): AntreanPeninjauan[] {
  return [...daftar].sort((a, b) => {
    if (a.waktuPengajuan === b.waktuPengajuan) {
      return a.idRangkuman - b.idRangkuman;
    }
    if (a.waktuPengajuan === null) return 1;
    if (b.waktuPengajuan === null) return -1;
    return a.waktuPengajuan.localeCompare(b.waktuPengajuan);
  });
}

/** Lama menunggu dalam hari penuh; null bila waktu pengajuan tidak diketahui. */
export function lamaMenungguHari(
  waktuPengajuan: string | null,
  sekarang: Date,
): number | null {
  if (!waktuPengajuan) return null;
  const mulai = Date.parse(waktuPengajuan);
  if (Number.isNaN(mulai)) return null;
  const selisih = Math.floor((sekarang.getTime() - mulai) / MS_PER_HARI);
  return selisih > 0 ? selisih : 0;
}

/**
 * C03 Administrator.ambilAntreanPeninjauan (Algo-009, Q-007).
 *
 * Q-007 diperluas dengan judul dan bidang agar butir antrean bisa langsung
 * ditampilkan tanpa query tambahan. Filter status dipertahankan walau RLS
 * sudah membatasi, karena Administrator berhak membaca semua status.
 * MAX(waktu) dihitung di sini karena Supabase JS tidak mendukung agregasi
 * GROUP BY bersama join tanpa RPC.
 */
export async function ambilAntreanPeninjauan(
  supabase: SupabaseClient,
): Promise<AntreanPeninjauan[]> {
  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .select(
      `id_rangkuman, nama_penulis, status,
       kelompok_kasus ( judul_umum, bidang_hukum ( nama ) ),
       riwayat_status ( status, waktu )`,
    )
    .eq("status", "Diajukan");
  if (error) throw error;

  const daftar = (data as unknown as BarisAntrean[]).map((baris) => ({
    idRangkuman: baris.id_rangkuman,
    judul: baris.kelompok_kasus?.judul_umum ?? "Tanpa judul",
    bidang: baris.kelompok_kasus?.bidang_hukum?.nama ?? "—",
    namaPenulis: baris.nama_penulis ?? "Tanpa nama",
    waktuPengajuan: waktuPengajuanTerakhir(baris.riwayat_status),
  }));

  return urutkanAntreanPeninjauan(daftar);
}

/**
 * Isi lengkap satu konten untuk panel pratinjau I-07. Dipanggil hanya saat
 * butir antrean dipilih, sehingga antrean panjang tidak memuat semua isi.
 */
export async function ambilKontenModerasi(
  supabase: SupabaseClient,
  idRangkuman: number,
): Promise<KontenModerasi | null> {
  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .select(
      `id_rangkuman, inti_masalah, hak, poin_pertimbangan, status, nama_penulis,
       kelompok_kasus ( judul_umum, bidang_hukum ( nama ) ),
       langkah_penyelesaian ( nomor, deskripsi, tujuan, dokumen_diperlukan, tenggat ),
       checklist ( daftar_dokumen ),
       templat_dokumen ( id_templat, nama_berkas, format, ukuran, versi, tanggal_pembaruan ),
       artikel ( id_artikel, judul, tautan_sumber )`,
    )
    .eq("id_rangkuman", idRangkuman)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  const baris = data as unknown as BarisKonten;
  const checklist = Array.isArray(baris.checklist)
    ? baris.checklist[0]
    : baris.checklist;

  return {
    idRangkuman: baris.id_rangkuman,
    judul: baris.kelompok_kasus?.judul_umum ?? "Tanpa judul",
    bidang: baris.kelompok_kasus?.bidang_hukum?.nama ?? "—",
    namaPenulis: baris.nama_penulis ?? "Tanpa nama",
    status: baris.status,
    intiMasalah: baris.inti_masalah,
    hak: baris.hak,
    poinPertimbangan: baris.poin_pertimbangan,
    langkah: [...(baris.langkah_penyelesaian ?? [])]
      .sort((a, b) => a.nomor - b.nomor)
      .map((langkah) => ({
        nomor: langkah.nomor,
        deskripsi: langkah.deskripsi,
        tujuan: langkah.tujuan,
        dokumenDiperlukan: langkah.dokumen_diperlukan ?? [],
        tenggat: langkah.tenggat,
      })),
    dokumenChecklist: checklist?.daftar_dokumen ?? [],
    templat: [...(baris.templat_dokumen ?? [])]
      .sort(
        (a, b) =>
          b.tanggal_pembaruan.localeCompare(a.tanggal_pembaruan) ||
          a.id_templat - b.id_templat,
      )
      .map((templat) => ({
        idTemplat: templat.id_templat,
        namaBerkas: templat.nama_berkas,
        format: templat.format,
        ukuran: templat.ukuran,
        versi: templat.versi,
        tanggalPembaruan: templat.tanggal_pembaruan,
      })),
    artikel: [...(baris.artikel ?? [])]
      .sort((a, b) => a.id_artikel - b.id_artikel)
      .map((artikel) => ({
        idArtikel: artikel.id_artikel,
        judul: artikel.judul,
        tautanSumber: artikel.tautan_sumber,
      })),
  };
}
