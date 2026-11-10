import type { SupabaseClient } from "@supabase/supabase-js";
import type { StatusKonten } from "@/components/ui/Badge";

export async function simpanRiwayat(
  supabase: SupabaseClient,
  idRangkuman: number,
  idPelaku: string,
  status: StatusKonten,
): Promise<void> {
  const { error } = await supabase
    .from("riwayat_status")
    .insert({ id_rangkuman: idRangkuman, id_pelaku: idPelaku, status });
  if (error) throw error;
}
