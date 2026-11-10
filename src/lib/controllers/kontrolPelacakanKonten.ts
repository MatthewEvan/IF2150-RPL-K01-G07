import {
  ambilDaftarKonten as ambilDaftarKontenModel,
  type KontenKurator,
} from "@/lib/models/kurator";
import { buatClientServer } from "@/lib/supabase/server";

/**
 * C27 KontrolPelacakanKonten.ambilDaftarKonten(idKurator) pada DPPL (Algo-007).
 * `idKurator` berasal dari sesi login yang sudah diperiksa halaman.
 */
export async function ambilDaftarKonten(
  idKurator: string,
): Promise<KontenKurator[]> {
  const supabase = await buatClientServer();
  return ambilDaftarKontenModel(supabase, idKurator);
}
