"use server";

import {
  ambilDaftarTemplat as ambilDaftarTemplatModel,
  ambilTemplatDisetujui,
  unduh,
  type TemplatDokumen,
} from "@/lib/models/templatDokumen";
import { buatClientServer } from "@/lib/supabase/server";

export type { TemplatDokumen };

export type HasilUnduhTemplat =
  | { berhasil: true; urlUnduh: string; namaBerkas: string }
  | { berhasil: false; galat: string };

const GALAT_TIDAK_TERSEDIA = "Berkas templat tidak tersedia.";

/**
 * C24 KontrolUnduhTemplat.ambilDaftarTemplat(idRangkuman) pada DPPL.
 * Mengembalikan daftar templat beserta ukuran berkas dan tanggal pembaruannya (KF15).
 */
export async function ambilDaftarTemplat(
  idRangkuman: number,
): Promise<TemplatDokumen[]> {
  if (!Number.isInteger(idRangkuman) || idRangkuman <= 0) {
    return [];
  }

  const supabase = await buatClientServer();
  return ambilDaftarTemplatModel(supabase, idRangkuman);
}

/**
 * C24 KontrolUnduhTemplat.unduhTemplat(idTemplat, idRangkuman) pada DPPL (Algo-035).
 * Memastikan rangkuman induk berstatus Disetujui dan menghasilkan URL unduhan
 * berkas templat versi terbaru dari Supabase Storage tanpa meminta pengguna
 * mendaftar akun (KF16).
 */
export async function unduhTemplat(
  idTemplat: number,
  idRangkuman?: number,
): Promise<HasilUnduhTemplat> {
  if (!Number.isInteger(idTemplat) || idTemplat <= 0) {
    return { berhasil: false, galat: GALAT_TIDAK_TERSEDIA };
  }

  if (
    idRangkuman !== undefined &&
    (!Number.isInteger(idRangkuman) || idRangkuman <= 0)
  ) {
    return { berhasil: false, galat: GALAT_TIDAK_TERSEDIA };
  }

  try {
    const supabase = await buatClientServer();
    const templat = await ambilTemplatDisetujui(
      supabase,
      idTemplat,
      idRangkuman,
    );
    if (!templat) {
      return { berhasil: false, galat: GALAT_TIDAK_TERSEDIA };
    }

    const urlUnduh = await unduh(supabase, templat);
    if (!urlUnduh) {
      return { berhasil: false, galat: GALAT_TIDAK_TERSEDIA };
    }

    return {
      berhasil: true,
      urlUnduh,
      namaBerkas: templat.namaBerkas,
    };
  } catch {
    return { berhasil: false, galat: GALAT_TIDAK_TERSEDIA };
  }
}
