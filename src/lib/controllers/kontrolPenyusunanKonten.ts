"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { StatusKonten } from "@/components/ui/Badge";
import { PERAN, cariAkun } from "@/lib/models/akun";
import {
  ambilRangkumanMilik,
  buatRangkuman,
  simpanDraf as simpanDrafRangkuman,
} from "@/lib/models/rangkumanKasus";
import { simpanRiwayat } from "@/lib/models/riwayatStatus";
import { buatClientServer } from "@/lib/supabase/server";
import { bacaDataKonten, bisaDisunting } from "./aturanPenyusunanKonten";

export type HasilBuatDraf = { galat: string };

export type HasilSimpanDraf =
  { berhasil: true; waktuSimpan: string } | { berhasil: false; galat: string };

const GALAT_NONAKTIF = "Akun Anda tidak aktif. Hubungi Administrator.";

async function ambilKuratorAktif(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const akun = await cariAkun(supabase, user.id);
  if (!akun || akun.peran !== PERAN.KURATOR || !akun.statusAktif) return null;
  return akun;
}

async function catatRiwayat(
  supabase: SupabaseClient,
  idRangkuman: number,
  idPelaku: string,
  status: StatusKonten,
) {
  await simpanRiwayat(supabase, idRangkuman, idPelaku, status);
}

export async function buatDraf(idKelompok: number): Promise<HasilBuatDraf> {
  const supabase = await buatClientServer();
  const kurator = await ambilKuratorAktif(supabase);
  if (!kurator) return { galat: GALAT_NONAKTIF };

  let idRangkuman: number;
  try {
    idRangkuman = await buatRangkuman(supabase, idKelompok, kurator.idAkun);
    await catatRiwayat(supabase, idRangkuman, kurator.idAkun, "Draft");
  } catch {
    return { galat: "Draf gagal dibuat. Coba lagi." };
  }

  revalidatePath("/panel/kurator/konten");
  redirect(`/panel/kurator/konten/${idRangkuman}`);
}

export async function simpanDraf(
  idRangkuman: number,
  dataKonten: FormData,
): Promise<HasilSimpanDraf> {
  const supabase = await buatClientServer();
  const kurator = await ambilKuratorAktif(supabase);
  if (!kurator) return { berhasil: false, galat: GALAT_NONAKTIF };

  const rangkuman = await ambilRangkumanMilik(
    supabase,
    idRangkuman,
    kurator.idAkun,
  );
  if (!rangkuman) {
    return { berhasil: false, galat: "Konten tidak ditemukan." };
  }
  if (!bisaDisunting(rangkuman.status)) {
    return {
      berhasil: false,
      galat: `Konten berstatus ${rangkuman.status} tidak bisa diubah.`,
    };
  }

  try {
    await simpanDrafRangkuman(
      supabase,
      idRangkuman,
      bacaDataKonten(dataKonten),
    );
  } catch {
    return { berhasil: false, galat: "Draf gagal disimpan. Coba lagi." };
  }

  revalidatePath(`/panel/kurator/konten/${idRangkuman}`);
  return { berhasil: true, waktuSimpan: new Date().toISOString() };
}
