import type { SupabaseClient } from "@supabase/supabase-js";

export async function gantiChecklist(
  supabase: SupabaseClient,
  idRangkuman: number,
  daftarDokumen: string[],
): Promise<void> {
  const hapus = await supabase
    .from("checklist")
    .delete()
    .eq("id_rangkuman", idRangkuman);
  if (hapus.error) throw hapus.error;
  if (daftarDokumen.length === 0) return;

  const { error } = await supabase
    .from("checklist")
    .insert({ id_rangkuman: idRangkuman, daftar_dokumen: daftarDokumen });
  if (error) throw error;
}
