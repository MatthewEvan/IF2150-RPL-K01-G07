import type { SupabaseClient } from "@supabase/supabase-js";

export type BidangHukum = {
  idBidang: number;
  nama: string;
  statusAktif: boolean;
};

export async function ambilSemuaBidang(
  supabase: SupabaseClient,
): Promise<BidangHukum[]> {
  const { data, error } = await supabase
    .from("bidang_hukum")
    .select("id_bidang, nama, status_aktif")
    .order("id_bidang");
  if (error) throw error;

  return data.map((baris) => ({
    idBidang: baris.id_bidang,
    nama: baris.nama,
    statusAktif: baris.status_aktif,
  }));
}

export function cekAktif(bidang: BidangHukum) {
  return bidang.statusAktif;
}
