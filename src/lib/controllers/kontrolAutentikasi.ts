"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { HasilLogin } from "@/components/login/FormLogin";
import { cariAkun } from "@/lib/models/akun";
import { buatClientServer } from "@/lib/supabase/server";
import { BERANDA_PANEL, COOKIE_AKTIVITAS } from "./aturanSesi";

/** Pesan tidak menyebut bagian yang salah (KF40). */
const GALAT_KREDENSIAL = "Email atau kata sandi salah.";
const GALAT_NONAKTIF = "Akun Anda dinonaktifkan. Hubungi Administrator.";

/** C25 prosesLogin. Kata sandi diperiksa Supabase Auth dengan bcrypt (KNF10). */
export async function prosesLogin(
  _hasil: HasilLogin,
  data: FormData,
): Promise<HasilLogin> {
  const email = String(data.get("email") ?? "").trim();
  const kataSandi = String(data.get("kataSandi") ?? "");
  if (!email || !kataSandi) return { galat: GALAT_KREDENSIAL };

  const supabase = await buatClientServer();
  const { data: masuk, error } = await supabase.auth.signInWithPassword({
    email,
    password: kataSandi,
  });
  if (error || !masuk.user) return { galat: GALAT_KREDENSIAL };

  const akun = await cariAkun(supabase, masuk.user.id);
  if (!akun || !akun.statusAktif) {
    await supabase.auth.signOut();
    return { galat: akun ? GALAT_NONAKTIF : GALAT_KREDENSIAL };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_AKTIVITAS, String(Date.now()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect(BERANDA_PANEL[akun.peran]);
}

/** C25 logout. */
export async function logout() {
  const supabase = await buatClientServer();
  await supabase.auth.signOut();
  (await cookies()).delete(COOKIE_AKTIVITAS);
  redirect("/");
}
