import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  COOKIE_AKTIVITAS,
  tentukanAksesPanel,
} from "@/lib/controllers/aturanSesi";
import { cariAkun } from "@/lib/models/akun";

/** Menjaga seluruh rute panel: sesi, batas aktivitas, status akun, dan peran. */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getUser memvalidasi token ke Supabase Auth, berbeda dengan getSession.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const akun = user ? await cariAkun(supabase, user.id) : null;

  const sekarang = Date.now();
  const aktivitas = Number(request.cookies.get(COOKIE_AKTIVITAS)?.value);
  const keputusan = tentukanAksesPanel({
    pathname: request.nextUrl.pathname,
    akun,
    aktivitasTerakhir: Number.isFinite(aktivitas) ? aktivitas : null,
    sekarang,
  });

  if (!keputusan.izin) {
    if (keputusan.akhiriSesi && user) await supabase.auth.signOut();

    const alihkan = NextResponse.redirect(
      new URL(keputusan.tujuan, request.url),
    );
    response.cookies.getAll().forEach((c) => alihkan.cookies.set(c));
    if (keputusan.akhiriSesi) alihkan.cookies.delete(COOKIE_AKTIVITAS);
    return alihkan;
  }

  response.cookies.set(COOKIE_AKTIVITAS, String(sekarang), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return response;
}

export const config = {
  matcher: "/panel/:path*",
};
