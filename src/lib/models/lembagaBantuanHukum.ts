import type { SupabaseClient } from "@supabase/supabase-js";

export type LembagaBantuanHukum = {
  idLbh: number;
  nama: string;
  wilayah: string;
  tautan: string;
};

/** Q-022. */
export async function ambilSemuaLBH(
  supabase: SupabaseClient,
): Promise<LembagaBantuanHukum[]> {
  const { data, error } = await supabase
    .from("lembaga_bantuan_hukum")
    .select("id_lbh, nama, wilayah, tautan")
    .order("nama");
  if (error) throw error;

  return data.map((baris) => ({
    idLbh: baris.id_lbh,
    nama: baris.nama,
    wilayah: baris.wilayah,
    tautan: baris.tautan,
  }));
}

export function cocokkanWilayah(lbh: LembagaBantuanHukum, wilayah: string) {
  return lbh.wilayah === wilayah;
}
