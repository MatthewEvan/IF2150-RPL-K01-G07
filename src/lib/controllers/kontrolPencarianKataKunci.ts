import {
  cariKasusDisetujui,
  rapikanKataKunci,
  type HasilPencarianKasus,
} from "@/lib/models/pencarian";
import { buatClientServer } from "@/lib/supabase/server";

export type { HasilPencarianKasus };

/**
 * C22 KontrolPencarianKataKunci.cariKasus(kataKunci) pada DPPL (Algo-032).
 * Merapikan kata kunci (huruf kecil dan hapus spasi tepi), menolak kata kunci
 * kosong, lalu memanggil Model untuk mengembalikan kasus berstatus Disetujui
 * yang cocok dengan kata kunci (KF02, KF06).
 */
export async function cariKasus(
  kataKunci: string,
): Promise<HasilPencarianKasus[]> {
  const kunci = rapikanKataKunci(kataKunci);
  if (!kunci) {
    return [];
  }

  const supabase = await buatClientServer();
  return cariKasusDisetujui(supabase, kunci);
}
