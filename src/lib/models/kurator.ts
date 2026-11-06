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

/** Q-028: true jika email belum dipakai akun lain. */
export async function cekEmailUnik(supabase: SupabaseClient, email: string) {
  const { count, error } = await supabase
    .from("akun")
    .select("id_akun", { count: "exact", head: true })
    .ilike("email", email.replace(/[\\%_]/g, "\\$&"));
  if (error) throw error;
  return count === 0;
}

/**
 * Membuat akun Auth lalu profilnya (Q-029, Q-030). Supabase tidak menyediakan
 * transaksi lintas Auth dan tabel, jadi akun Auth dihapus lagi jika profil gagal.
 */
export async function simpanKuratorBaru(
  supabase: SupabaseClient,
  email: string,
  kataSandi: string,
  idAdministrator: string,
) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: kataSandi,
    email_confirm: true,
  });
  if (error) throw error;

  const idAkun = data.user.id;
  const { error: galatAkun } = await supabase
    .from("akun")
    .insert({ id_akun: idAkun, email, peran: "Kurator" });
  const { error: galatKurator } = galatAkun
    ? { error: galatAkun }
    : await supabase
        .from("kurator")
        .insert({ id_akun: idAkun, id_administrator: idAdministrator });

  if (galatKurator) {
    // akun ikut terhapus lewat on delete cascade ke auth.users.
    await supabase.auth.admin.deleteUser(idAkun);
    throw galatKurator;
  }
}
