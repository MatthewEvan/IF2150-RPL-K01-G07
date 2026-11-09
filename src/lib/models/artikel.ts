import type { SupabaseClient } from "@supabase/supabase-js";

export type Artikel = {
  judul: string;
  tautanSumber: string;
};

export async function gantiDaftarArtikel(
  supabase: SupabaseClient,
  idRangkuman: number,
  daftarArtikel: Artikel[],
): Promise<void> {
  const hapus = await supabase
    .from("artikel")
    .delete()
    .eq("id_rangkuman", idRangkuman);
  if (hapus.error) throw hapus.error;
  if (daftarArtikel.length === 0) return;

  const { error } = await supabase.from("artikel").insert(
    daftarArtikel.map((artikel) => ({
      id_rangkuman: idRangkuman,
      judul: artikel.judul,
      tautan_sumber: artikel.tautanSumber,
    })),
  );
  if (error) throw error;
}
