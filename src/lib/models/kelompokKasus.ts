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
