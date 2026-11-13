import { createClient } from "@supabase/supabase-js";

/**
 * Client dengan kunci service role, melewati RLS. Hanya untuk kode server
 * setelah peran Administrator diperiksa.
 */
export function buatClientAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
