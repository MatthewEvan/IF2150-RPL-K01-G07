import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const KATA_SANDI_UJI_LOKAL = "PahamHukum-Uji-123";

function ambilUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL belum diatur.");
  }
  return url;
}

function ambilAnonKey(): string {
  const kunci = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!kunci) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY belum diatur.");
  }
  return kunci;
}

function ambilServiceRoleKey(): string {
  const kunci = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!kunci) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY belum diatur.");
  }
  return kunci;
}

/**
 * Memeriksa apakah target integration test menunjuk ke instans Supabase lokal
 * (127.0.0.1 atau localhost).
 */
export function adalahSupabaseLokal(): boolean {
  const host = new URL(ambilUrl()).hostname;
  return host === "127.0.0.1" || host === "localhost";
}

/**
 * Pengaman untuk pengujian integrasi yang menulis data (INSERT/UPDATE/RPC),
 * agar tidak mengotori Supabase hosted karena tabel `riwayat_status` bersifat
 * permanen (KNF09).
 */
export function wajibSupabaseLokal(): void {
  if (
    !adalahSupabaseLokal() &&
    process.env.INTEGRASI_IZINKAN_HOSTED !== "true"
  ) {
    throw new Error(
      `Pengujian tulis ditolak karena NEXT_PUBLIC_SUPABASE_URL (${ambilUrl()}) bukan Supabase lokal. ` +
        "Gunakan Supabase lokal (`npx supabase start` dan `.env.test`) untuk pengujian yang mengubah basis data.",
    );
  }
}

/** Membuat client Supabase anonim (tanpa sesi login) untuk pengujian integrasi. */
export function buatClientAnonLokal(): SupabaseClient {
  return createClient(ambilUrl(), ambilAnonKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Membuat client Supabase yang sudah login dengan email & kata sandi akun uji
 * pada Supabase lokal (`admin@pahamhukum.test`, `kurator1@pahamhukum.test`, dll.).
 */
export async function buatClientMasukLokal(
  email: string,
  kataSandi = KATA_SANDI_UJI_LOKAL,
): Promise<SupabaseClient> {
  const client = buatClientAnonLokal();
  const { error } = await client.auth.signInWithPassword({
    email,
    password: kataSandi,
  });
  if (error) {
    throw new Error(`Gagal masuk sebagai ${email}: ${error.message}`);
  }
  return client;
}

/**
 * Membuat client Supabase dengan kunci service role (melewati RLS), berguna
 * untuk verifikasi langsung keadaan basis data dan pembersihan data uji.
 */
export function buatClientAdminLokal(): SupabaseClient {
  return createClient(ambilUrl(), ambilServiceRoleKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
