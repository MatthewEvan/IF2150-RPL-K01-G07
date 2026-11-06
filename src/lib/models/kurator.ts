import type { SupabaseClient } from "@supabase/supabase-js";

export type KuratorTerdaftar = {
  idAkun: string;
  email: string;
  statusAktif: boolean;
  jumlahKonten: number;
};

/** Q-006: Kurator yang didaftarkan seorang Administrator, urut menurut email. */
export async function ambilDaftarKurator(
  supabase: SupabaseClient,
  idAdministrator: string,
): Promise<KuratorTerdaftar[]> {
  const { data, error } = await supabase
    .from("kurator")
    .select("id_akun, status_aktif, jumlah_konten, akun(email)")
    .eq("id_administrator", idAdministrator);
  if (error) throw error;

  return data
    .map((baris) => ({
      idAkun: baris.id_akun,
      email: (baris.akun as unknown as { email: string }).email,
      statusAktif: baris.status_aktif,
      jumlahKonten: baris.jumlah_konten,
    }))
    .sort((a, b) => a.email.localeCompare(b.email));
}
