import type { SupabaseClient } from "@supabase/supabase-js";

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
