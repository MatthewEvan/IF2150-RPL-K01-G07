import type { SupabaseClient } from "@supabase/supabase-js";
import type { StatusKonten } from "@/components/ui/Badge";
import type { LangkahPenyelesaian } from "./langkahPenyelesaian";
import type { Artikel } from "./artikel";

export type IsiRangkuman = {
  intiMasalah: string;
  hak: string;
  poinPertimbangan: string;
};

export type DataKonten = IsiRangkuman & {
  daftarLangkah: LangkahPenyelesaian[];
  daftarDokumen: string[];
  daftarArtikel: Artikel[];
};

export type RangkumanKasus = DataKonten & {
  idRangkuman: number;
  idKelompok: number;
  judulUmum: string;
  status: StatusKonten;
  catatanRevisi: string | null;
};

type BarisRangkuman = {
  id_rangkuman: number;
  id_kelompok: number;
  inti_masalah: string | null;
  hak: string | null;
  poin_pertimbangan: string | null;
  status: StatusKonten;
  catatan_revisi: string | null;
  kelompok_kasus: { judul_umum: string };
  langkah_penyelesaian: {
    nomor: number;
    deskripsi: string | null;
    tujuan: string | null;
    tenggat: string | null;
  }[];
  checklist: { daftar_dokumen: string[] } | null;
  artikel: {
    id_artikel: number;
    judul: string | null;
    tautan_sumber: string | null;
  }[];
};

export async function buatRangkuman(
  supabase: SupabaseClient,
  idKelompok: number,
  idKurator: string,
): Promise<number> {
  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .insert({ id_kelompok: idKelompok, id_kurator: idKurator })
    .select("id_rangkuman")
    .single();
  if (error) throw error;
  return data.id_rangkuman;
}

export async function ambilRangkumanMilik(
  supabase: SupabaseClient,
  idRangkuman: number,
  idKurator: string,
): Promise<RangkumanKasus | null> {
  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .select(
      `id_rangkuman, id_kelompok, inti_masalah, hak, poin_pertimbangan, status, catatan_revisi,
       kelompok_kasus!inner ( judul_umum ),
       langkah_penyelesaian ( nomor, deskripsi, tujuan, tenggat ),
       checklist ( daftar_dokumen ),
       artikel ( id_artikel, judul, tautan_sumber )`,
    )
    .eq("id_rangkuman", idRangkuman)
    .eq("id_kurator", idKurator)
    .maybeSingle<BarisRangkuman>();
  if (error) throw error;
  if (!data) return null;

  return {
    idRangkuman: data.id_rangkuman,
    idKelompok: data.id_kelompok,
    judulUmum: data.kelompok_kasus.judul_umum,
    status: data.status,
    catatanRevisi: data.catatan_revisi,
    intiMasalah: data.inti_masalah ?? "",
    hak: data.hak ?? "",
    poinPertimbangan: data.poin_pertimbangan ?? "",
    daftarLangkah: [...data.langkah_penyelesaian]
      .sort((a, b) => a.nomor - b.nomor)
      .map((langkah) => ({
        nomor: langkah.nomor,
        deskripsi: langkah.deskripsi ?? "",
        tujuan: langkah.tujuan ?? "",
        tenggat: langkah.tenggat,
      })),
    daftarDokumen: data.checklist?.daftar_dokumen ?? [],
    daftarArtikel: [...data.artikel]
      .sort((a, b) => a.id_artikel - b.id_artikel)
      .map((artikel) => ({
        judul: artikel.judul ?? "",
        tautanSumber: artikel.tautan_sumber ?? "",
      })),
  };
}

export async function simpanDraf(
  supabase: SupabaseClient,
  idRangkuman: number,
  data: DataKonten,
): Promise<void> {
  const { error } = await supabase.rpc("simpan_draf", {
    p_id_rangkuman: idRangkuman,
    p_inti_masalah: data.intiMasalah,
    p_hak: data.hak,
    p_poin_pertimbangan: data.poinPertimbangan,
    p_langkah: data.daftarLangkah,
    p_daftar_dokumen: data.daftarDokumen,
    p_artikel: data.daftarArtikel,
  });
  if (error) throw error;
}

export type LangkahTampil = LangkahPenyelesaian & {
  dokumenDiperlukan: string[];
};

export type TemplatTampil = {
  idTemplat: number;
  namaBerkas: string;
  format: string;
  /** Ukuran berkas dalam byte. */
  ukuran: number;
  versi: string;
  tanggalPembaruan: string;
};

/** Rangkuman lengkap untuk layar Rangkuman Kasus (I-02). */
export type RangkumanTampil = IsiRangkuman & {
  idRangkuman: number;
  idKelompok: number;
  idBidang: number;
  namaBidang: string;
  judulUmum: string;
  istilahResmi: string;
  namaPenulis: string | null;
  tanggalPeninjauan: string | null;
  daftarLangkah: LangkahTampil[];
  daftarDokumen: string[];
  daftarTemplat: TemplatTampil[];
  daftarArtikel: Artikel[];
};

type BarisRangkumanTampil = {
  id_rangkuman: number;
  id_kelompok: number;
  inti_masalah: string | null;
  hak: string | null;
  poin_pertimbangan: string | null;
  nama_penulis: string | null;
  tanggal_peninjauan: string | null;
  kelompok_kasus: {
    id_bidang: number;
    judul_umum: string;
    istilah_resmi: string;
    bidang_hukum: { nama: string };
  };
  langkah_penyelesaian: {
    nomor: number;
    deskripsi: string | null;
    tujuan: string | null;
    dokumen_diperlukan: string[];
    tenggat: string | null;
  }[];
  checklist: { daftar_dokumen: string[] } | null;
  templat_dokumen: {
    id_templat: number;
    nama_berkas: string;
    format: string;
    ukuran: number;
    versi: string;
    tanggal_pembaruan: string;
  }[];
  artikel: {
    id_artikel: number;
    judul: string | null;
    tautan_sumber: string | null;
  }[];
};

/**
 * Q-009 diperluas: langkah (Q-010), checklist, templat, artikel, serta judul
 * dan bidang kelompok ikut diambil agar I-02 cukup memakai satu query.
 *
 * Filter status tetap diperlukan walau ada RLS, karena Kurator yang sedang
 * masuk juga bisa membaca draf miliknya sendiri (KF02).
 */
export async function ambilRangkumanDisetujui(
  supabase: SupabaseClient,
  idKelompok: number,
): Promise<RangkumanTampil | null> {
  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .select(
      `id_rangkuman, id_kelompok, inti_masalah, hak, poin_pertimbangan,
       nama_penulis, tanggal_peninjauan,
       kelompok_kasus!inner ( id_bidang, judul_umum, istilah_resmi, bidang_hukum!inner ( nama ) ),
       langkah_penyelesaian ( nomor, deskripsi, tujuan, dokumen_diperlukan, tenggat ),
       checklist ( daftar_dokumen ),
       templat_dokumen ( id_templat, nama_berkas, format, ukuran, versi, tanggal_pembaruan ),
       artikel ( id_artikel, judul, tautan_sumber )`,
    )
    .eq("id_kelompok", idKelompok)
    .eq("status", "Disetujui")
    .order("nomor", { referencedTable: "langkah_penyelesaian" })
    .order("id_templat", { referencedTable: "templat_dokumen" })
    .order("id_artikel", { referencedTable: "artikel" })
    .order("id_rangkuman", { ascending: false })
    .limit(1)
    .maybeSingle<BarisRangkumanTampil>();
  if (error) throw error;
  if (!data) return null;

  return {
    idRangkuman: data.id_rangkuman,
    idKelompok: data.id_kelompok,
    idBidang: data.kelompok_kasus.id_bidang,
    namaBidang: data.kelompok_kasus.bidang_hukum.nama,
    judulUmum: data.kelompok_kasus.judul_umum,
    istilahResmi: data.kelompok_kasus.istilah_resmi,
    intiMasalah: data.inti_masalah ?? "",
    hak: data.hak ?? "",
    poinPertimbangan: data.poin_pertimbangan ?? "",
    namaPenulis: data.nama_penulis,
    tanggalPeninjauan: data.tanggal_peninjauan,
    daftarLangkah: data.langkah_penyelesaian.map((langkah) => ({
      nomor: langkah.nomor,
      deskripsi: langkah.deskripsi ?? "",
      tujuan: langkah.tujuan ?? "",
      dokumenDiperlukan: langkah.dokumen_diperlukan,
      tenggat: langkah.tenggat?.trim() || null,
    })),
    daftarDokumen: data.checklist?.daftar_dokumen ?? [],
    daftarTemplat: data.templat_dokumen.map((templat) => ({
      idTemplat: templat.id_templat,
      namaBerkas: templat.nama_berkas,
      format: templat.format,
      ukuran: templat.ukuran,
      versi: templat.versi,
      tanggalPembaruan: templat.tanggal_pembaruan,
    })),
    daftarArtikel: data.artikel
      .filter((artikel) => artikel.judul && artikel.tautan_sumber)
      .map((artikel) => ({
        judul: artikel.judul!,
        tautanSumber: artikel.tautan_sumber!,
      })),
  };
}

/**
 * Langkah bertenggat pertama menurut nomor, untuk ringkasan di kepala I-02
 * (KF12). Tenggat berupa teks bebas sehingga tidak bisa diurutkan per tanggal.
 */
export function cariLangkahBertenggat<T extends LangkahPenyelesaian>(
  daftarLangkah: T[],
): T | null {
  return daftarLangkah.find((langkah) => langkah.tenggat) ?? null;
}
