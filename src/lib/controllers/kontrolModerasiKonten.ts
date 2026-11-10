import {
  ambilAntreanPeninjauan as ambilAntreanPeninjauanModel,
  ambilKontenModerasi as ambilKontenModerasiModel,
  type AntreanPeninjauan,
  type KontenModerasi,
} from "@/lib/models/administrator";
import { buatClientServer } from "@/lib/supabase/server";

/**
 * C28 KontrolModerasiKonten.ambilAntrean() pada DPPL (Algo-009).
 * Hanya konten berstatus Diajukan, diurutkan dari pengajuan paling lama.
 */
export async function ambilAntrean(): Promise<AntreanPeninjauan[]> {
  const supabase = await buatClientServer();
  return ambilAntreanPeninjauanModel(supabase);
}

/** C28 KontrolModerasiKonten.ambilKonten(idRangkuman) untuk panel pratinjau. */
export async function ambilKonten(
  idRangkuman: number,
): Promise<KontenModerasi | null> {
  const supabase = await buatClientServer();
  return ambilKontenModerasiModel(supabase, idRangkuman);
}
