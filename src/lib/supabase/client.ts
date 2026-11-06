import { createBrowserClient } from "@supabase/ssr";

/** Client Supabase untuk komponen yang berjalan di browser. */
export function buatClientBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
