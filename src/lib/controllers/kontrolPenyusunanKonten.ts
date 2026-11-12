"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { StatusKonten } from "@/components/ui/Badge";
import { PERAN, cariAkun } from "@/lib/models/akun";
import {
  ajukanRangkuman,
  ambilIsianKosong,
  ambilRangkumanMilik,
  buatRangkuman,
  simpanDraf as simpanDrafRangkuman,
  type IsianWajib,
} from "@/lib/models/rangkumanKasus";
import { simpanRiwayat } from "@/lib/models/riwayatStatus";
import {
  ambilDaftarTemplat,
  hapusTemplat as hapusTemplatDokumen,
  perbaruiVersi,
  validasiUnggahan,
  type TemplatDokumen,
} from "@/lib/models/templatDokumen";
import { buatClientServer } from "@/lib/supabase/server";
import { bacaDataKonten, bisaDisunting } from "./aturanPenyusunanKonten";

export type HasilBuatDraf = { galat: string };

export type HasilSimpanDraf =
  { berhasil: true; waktuSimpan: string } | { berhasil: false; galat: string };

export type HasilLampirkanTemplat =
  | { berhasil: true; templat: TemplatDokumen }
  | { berhasil: false; galat: string };

export type HasilHapusTemplat =
  { berhasil: true } | { berhasil: false; galat: string };

export type HasilAjukanKonten =
  | { berhasil: true }
  | { berhasil: false; galat: string; isianKosong: IsianWajib[] };

const GALAT_NONAKTIF = "Akun Anda tidak aktif. Hubungi Administrator.";
const GALAT_UNGGAH =
  "Berkas harus berformat PDF atau DOCX dan berukuran paling besar 5 MB.";

async function ambilKuratorAktif(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const akun = await cariAkun(supabase, user.id);
  if (!akun || akun.peran !== PERAN.KURATOR || !akun.statusAktif) return null;
  return akun;
}

async function periksaKontenBisaDiubah(
  supabase: SupabaseClient,
  idRangkuman: number,
): Promise<string | null> {
  const kurator = await ambilKuratorAktif(supabase);
  if (!kurator) return GALAT_NONAKTIF;

  const rangkuman = await ambilRangkumanMilik(
    supabase,
    idRangkuman,
    kurator.idAkun,
  );
  if (!rangkuman) return "Konten tidak ditemukan.";
  if (!bisaDisunting(rangkuman.status)) {
    return `Konten berstatus ${rangkuman.status} tidak bisa diubah.`;
  }
  return null;
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
  const galat = await periksaKontenBisaDiubah(supabase, idRangkuman);
  if (galat) return { berhasil: false, galat };

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

export async function ajukanKonten(
  idRangkuman: number,
  dataKonten: FormData,
): Promise<HasilAjukanKonten> {
  const supabase = await buatClientServer();
  const galat = await periksaKontenBisaDiubah(supabase, idRangkuman);
  if (galat) return { berhasil: false, galat, isianKosong: [] };

  const data = bacaDataKonten(dataKonten);
  try {
    await simpanDrafRangkuman(supabase, idRangkuman, data);
  } catch {
    return {
      berhasil: false,
      galat: "Konten gagal diajukan. Coba lagi.",
      isianKosong: [],
    };
  }
  revalidatePath(`/panel/kurator/konten/${idRangkuman}`);

  const isianKosong = ambilIsianKosong(data);
  if (isianKosong.length > 0) {
    return {
      berhasil: false,
      galat: `Draf tersimpan, tetapi ${isianKosong.length} isian wajib belum lengkap. Lengkapi isian yang ditandai sebelum mengajukan.`,
      isianKosong,
    };
  }

  try {
    await ajukanRangkuman(supabase, idRangkuman);
  } catch {
    return {
      berhasil: false,
      galat: "Konten gagal diajukan. Coba lagi.",
      isianKosong: [],
    };
  }

  revalidatePath("/panel/kurator/konten");
  revalidatePath(`/panel/kurator/konten/${idRangkuman}`);
  return { berhasil: true };
}

export async function lampirkanTemplat(
  idRangkuman: number,
  data: FormData,
): Promise<HasilLampirkanTemplat> {
  const berkas = data.get("templat");
  if (!(berkas instanceof File) || !validasiUnggahan(berkas)) {
    return { berhasil: false, galat: GALAT_UNGGAH };
  }

  const supabase = await buatClientServer();
  const galat = await periksaKontenBisaDiubah(supabase, idRangkuman);
  if (galat) return { berhasil: false, galat };

  try {
    const daftarTemplat = await ambilDaftarTemplat(supabase, idRangkuman);
    const templatLama =
      daftarTemplat.find((templat) => templat.namaBerkas === berkas.name) ??
      null;
    const templat = await perbaruiVersi(
      supabase,
      idRangkuman,
      templatLama,
      berkas,
    );
    revalidatePath(`/panel/kurator/konten/${idRangkuman}`);
    return { berhasil: true, templat };
  } catch {
    return {
      berhasil: false,
      galat: "Templat gagal diunggah. Templat sebelumnya tetap dipakai.",
    };
  }
}

export async function hapusTemplat(
  idRangkuman: number,
  idTemplat: number,
): Promise<HasilHapusTemplat> {
  const supabase = await buatClientServer();
  const galat = await periksaKontenBisaDiubah(supabase, idRangkuman);
  if (galat) return { berhasil: false, galat };

  try {
    const daftarTemplat = await ambilDaftarTemplat(supabase, idRangkuman);
    const templat = daftarTemplat.find(
      (templat) => templat.idTemplat === idTemplat,
    );
    if (!templat) return { berhasil: false, galat: "Templat tidak ditemukan." };
    await hapusTemplatDokumen(supabase, templat);
  } catch {
    return { berhasil: false, galat: "Templat gagal dihapus. Coba lagi." };
  }

  revalidatePath(`/panel/kurator/konten/${idRangkuman}`);
  return { berhasil: true };
}
