import type { SupabaseClient } from "@supabase/supabase-js";

export type KelompokKasus = {
  idKelompok: number;
  idBidang: number;
  judulUmum: string;
  istilahResmi: string;
  penandaDarurat: boolean;
};

/**
 * Hanya kelompok yang rangkumannya berstatus Disetujui. Filter ini tetap
 * diperlukan walau ada RLS, karena Kurator yang sedang masuk juga bisa
 * membaca draf miliknya sendiri.
 */
export async function ambilKelompokDisetujui(
  supabase: SupabaseClient,
): Promise<KelompokKasus[]> {
  const { data, error } = await supabase
    .from("kelompok_kasus")
    .select(
      "id_kelompok, id_bidang, judul_umum, istilah_resmi, penanda_darurat, rangkuman_kasus!inner(status)",
    )
    .eq("rangkuman_kasus.status", "Disetujui")
    .order("id_kelompok");
  if (error) throw error;

  return data.map((baris) => ({
    idKelompok: baris.id_kelompok,
    idBidang: baris.id_bidang,
    judulUmum: baris.judul_umum,
    istilahResmi: baris.istilah_resmi,
    penandaDarurat: baris.penanda_darurat,
  }));
}

export function cekDarurat(kelompok: KelompokKasus) {
  return kelompok.penandaDarurat;
}

export type PilihanKelompok = {
  idKelompok: number;
  namaBidang: string;
  judulUmum: string;
};

type BarisPilihanKelompok = {
  id_kelompok: number;
  judul_umum: string;
  bidang_hukum: { nama: string };
};

export async function ambilPilihanKelompok(
  supabase: SupabaseClient,
): Promise<PilihanKelompok[]> {
  const { data, error } = await supabase
    .from("kelompok_kasus")
    .select("id_kelompok, judul_umum, bidang_hukum!inner(nama)")
    .eq("bidang_hukum.status_aktif", true)
    .order("id_bidang")
    .order("id_kelompok")
    .returns<BarisPilihanKelompok[]>();
  if (error) throw error;

  return data.map((baris) => ({
    idKelompok: baris.id_kelompok,
    namaBidang: baris.bidang_hukum.nama,
    judulUmum: baris.judul_umum,
  }));
}
