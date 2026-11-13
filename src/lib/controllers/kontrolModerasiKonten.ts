"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import {
  ambilAntreanPeninjauan as ambilAntreanPeninjauanModel,
  ambilKontenModerasi as ambilKontenModerasiModel,
  type AntreanPeninjauan,
  type KontenModerasi,
} from "@/lib/models/administrator";
import { PERAN, cariAkun } from "@/lib/models/akun";
import {
  GALAT_ALASAN_KOSONG,
  GALAT_BUKAN_DIAJUKAN,
  ambilKeadaanKonten,
  cekAlasanTerisi,
  pulihkanKeadaan,
  simpanKeputusan,
  simpanRiwayat,
} from "@/lib/models/riwayatStatus";
import { buatClientServer } from "@/lib/supabase/server";

export type HasilKeputusan =
  | { berhasil: true; pesan: string }
  | { berhasil: false; galat: string; galatAlasan?: string };

const GALAT_NONAKTIF = "Akun Anda tidak aktif. Hubungi Administrator.";
const GALAT_GAGAL = "Keputusan gagal disimpan. Coba lagi.";

async function ambilAdministratorAktif(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const akun = await cariAkun(supabase, user.id);
  if (!akun || akun.peran !== PERAN.ADMINISTRATOR || !akun.statusAktif) {
    return null;
  }
  return akun;
}

/** Halaman yang menampilkan status konten ikut disegarkan setelah keputusan. */
function segarkanHalamanKonten() {
  revalidatePath("/panel/admin/moderasi");
  revalidatePath("/panel/kurator/konten");
  revalidatePath("/");
}

/**
 * Menyimpan satu keputusan lalu mencatat riwayatnya. Bila riwayat gagal
 * dicatat, status dikembalikan ke keadaan semula (KNF09, Algo-047/048).
 */
async function catatKeputusan(
  supabase: SupabaseClient,
  idRangkuman: number,
  idAdministrator: string,
  keputusan: "Disetujui" | "Perlu Revisi",
  catatanRevisi?: string,
): Promise<HasilKeputusan> {
  let keadaan;
  try {
    keadaan = await ambilKeadaanKonten(supabase, idRangkuman);
  } catch {
    return { berhasil: false, galat: GALAT_GAGAL };
  }
  if (!keadaan || keadaan.status !== "Diajukan") {
    return { berhasil: false, galat: GALAT_BUKAN_DIAJUKAN };
  }

  try {
    const berubah = await simpanKeputusan(
      supabase,
      idRangkuman,
      keputusan,
      catatanRevisi,
    );
    if (!berubah) {
      return { berhasil: false, galat: GALAT_BUKAN_DIAJUKAN };
    }
  } catch {
    return { berhasil: false, galat: GALAT_GAGAL };
  }

  try {
    await simpanRiwayat(supabase, idRangkuman, idAdministrator, keputusan);
  } catch {
    try {
      await pulihkanKeadaan(supabase, idRangkuman, keadaan, keputusan);
    } catch {
      // Status sudah dikembalikan sebagian; galat tetap dilaporkan ke pengguna.
    }
    return { berhasil: false, galat: GALAT_GAGAL };
  }

  segarkanHalamanKonten();
  return {
    berhasil: true,
    pesan:
      keputusan === "Disetujui"
        ? "Konten disetujui dan langsung tayang untuk publik."
        : "Konten dikembalikan ke Kurator beserta catatan revisi.",
  };
}

/**
 * C28 KontrolModerasiKonten.ambilAntrean() pada DPPL (Algo-009).
 * Hanya konten berstatus Diajukan, diurutkan dari pengajuan paling lama.
 */
export async function ambilAntrean(): Promise<AntreanPeninjauan[]> {
  const supabase = await buatClientServer();
  return ambilAntreanPeninjauanModel(supabase);
}

/** C28 KontrolModerasiKonten.ambilKonten(idRangkuman) untuk panel pratinjau. */
export async function ambilKonten(
  idRangkuman: number,
): Promise<KontenModerasi | null> {
  const supabase = await buatClientServer();
  return ambilKontenModerasiModel(supabase, idRangkuman);
}

/** Algo-047: setujui konten sehingga langsung tayang untuk publik (KF32). */
export async function setujuiKonten(
  idRangkuman: number,
): Promise<HasilKeputusan> {
  if (!Number.isInteger(idRangkuman) || idRangkuman <= 0) {
    return { berhasil: false, galat: "Konten tidak ditemukan." };
  }

  const supabase = await buatClientServer();
  const administrator = await ambilAdministratorAktif(supabase);
  if (!administrator) return { berhasil: false, galat: GALAT_NONAKTIF };

  return catatKeputusan(
    supabase,
    idRangkuman,
    administrator.idAkun,
    "Disetujui",
  );
}

/**
 * Algo-048: kembalikan konten ke Kurator. Alasan wajib terisi; bila kosong,
 * status tidak berubah dan tidak ada riwayat baru (KF33, KF34).
 */
export async function kembalikanKonten(
  idRangkuman: number,
  alasan: string,
): Promise<HasilKeputusan> {
  if (!Number.isInteger(idRangkuman) || idRangkuman <= 0) {
    return { berhasil: false, galat: "Konten tidak ditemukan." };
  }

  const supabase = await buatClientServer();
  const administrator = await ambilAdministratorAktif(supabase);
  if (!administrator) return { berhasil: false, galat: GALAT_NONAKTIF };

  if (!cekAlasanTerisi(alasan)) {
    return {
      berhasil: false,
      galat: GALAT_ALASAN_KOSONG,
      galatAlasan: GALAT_ALASAN_KOSONG,
    };
  }

  return catatKeputusan(
    supabase,
    idRangkuman,
    administrator.idAkun,
    "Perlu Revisi",
    alasan.trim(),
  );
}
