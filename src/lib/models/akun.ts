import type { SupabaseClient } from "@supabase/supabase-js";

export const PERAN = {
  KURATOR: "Kurator",
  ADMINISTRATOR: "Administrator",
} as const;

export type Peran = (typeof PERAN)[keyof typeof PERAN];

export type AkunTerhubung = {
  idAkun: string;
  email: string;
  peran: Peran;
  /** Administrator selalu aktif, status hanya berlaku bagi Kurator. */
  statusAktif: boolean;
};

/** Mengambil profil akun berikut status aktif Kurator (C01, C02). */
export async function cariAkun(
  supabase: SupabaseClient,
  idAkun: string,
): Promise<AkunTerhubung | null> {
  const { data } = await supabase
    .from("akun")
    .select("id_akun, email, peran, kurator(status_aktif)")
    .eq("id_akun", idAkun)
    .maybeSingle();

  if (!data) return null;

  const kurator = data.kurator as unknown as { status_aktif: boolean } | null;
  return {
    idAkun: data.id_akun,
    email: data.email,
    peran: data.peran,
    statusAktif: kurator?.status_aktif ?? data.peran === PERAN.ADMINISTRATOR,
  };
}
