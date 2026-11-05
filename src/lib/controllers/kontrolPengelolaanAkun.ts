"use server";

import { revalidatePath } from "next/cache";
import { cariAkun, PERAN } from "@/lib/models/akun";
import { cekEmailUnik, simpanKuratorBaru } from "@/lib/models/kurator";
import { buatClientAdmin } from "@/lib/supabase/admin";
import { buatClientServer } from "@/lib/supabase/server";
import { validasiAkunBaru } from "./validasiAkun";

export type HasilAkun = { galat?: string; sukses?: string };

const GALAT_AKSES = "Hanya Administrator yang dapat mengelola akun.";

/** Server Action bisa dipanggil langsung, jadi peran diperiksa di sini juga. */
async function ambilAdministrator() {
  const supabase = await buatClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const akun = user ? await cariAkun(supabase, user.id) : null;
  return akun?.peran === PERAN.ADMINISTRATOR ? akun : null;
}

/** C29 daftarkanKurator. */
export async function daftarkanKurator(
  _hasil: HasilAkun,
  data: FormData,
): Promise<HasilAkun> {
  const administrator = await ambilAdministrator();
  if (!administrator) return { galat: GALAT_AKSES };

  const email = String(data.get("email") ?? "")
    .trim()
    .toLowerCase();
  const kataSandi = String(data.get("kataSandi") ?? "");
  const galat = validasiAkunBaru(email, kataSandi);
  if (galat) return { galat };

  const supabase = buatClientAdmin();
  if (!(await cekEmailUnik(supabase, email))) {
    return { galat: "Email sudah terdaftar." };
  }

  try {
    await simpanKuratorBaru(supabase, email, kataSandi, administrator.idAkun);
  } catch {
    return { galat: "Akun gagal dibuat. Silakan coba lagi." };
  }

  revalidatePath("/panel/admin/akun");
  return { sukses: `Akun ${email} berhasil didaftarkan.` };
}
