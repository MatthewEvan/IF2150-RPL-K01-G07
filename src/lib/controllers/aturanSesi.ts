import { PERAN, type AkunTerhubung } from "@/lib/models/akun";

export const COOKIE_AKTIVITAS = "aktivitas_terakhir";

/** Batas sesi tanpa aktivitas (KF41, KNF14). */
export const BATAS_TANPA_AKTIVITAS_MS = 30 * 60 * 1000;

export const BERANDA_PANEL = {
  [PERAN.KURATOR]: "/panel/kurator/konten",
  [PERAN.ADMINISTRATOR]: "/panel/admin/moderasi",
};

type DataAkses = {
  pathname: string;
  akun: AkunTerhubung | null;
  aktivitasTerakhir: number | null;
  sekarang: number;
};

type KeputusanAkses =
  { izin: true } | { izin: false; tujuan: string; akhiriSesi: boolean };

/**
 * Wujud cekSesi() pada DPPL (Algo-037) ditambah pemeriksaan peran dan status
 * aktif Kurator (KF37). Dipisah dari proxy.ts agar bisa diuji tanpa Supabase.
 */
export function tentukanAksesPanel({
  pathname,
  akun,
  aktivitasTerakhir,
  sekarang,
}: DataAkses): KeputusanAkses {
  if (!akun) return { izin: false, tujuan: "/masuk", akhiriSesi: true };

  if (
    aktivitasTerakhir !== null &&
    sekarang - aktivitasTerakhir > BATAS_TANPA_AKTIVITAS_MS
  ) {
    return {
      izin: false,
      tujuan: "/masuk?alasan=sesi-berakhir",
      akhiriSesi: true,
    };
  }

  if (!akun.statusAktif) {
    return {
      izin: false,
      tujuan: "/masuk?alasan=akun-nonaktif",
      akhiriSesi: true,
    };
  }

  const panelAdmin =
    pathname === "/panel/admin" || pathname.startsWith("/panel/admin/");
  const panelKurator =
    pathname === "/panel/kurator" || pathname.startsWith("/panel/kurator/");
  if (
    (panelAdmin && akun.peran !== PERAN.ADMINISTRATOR) ||
    (panelKurator && akun.peran !== PERAN.KURATOR)
  ) {
    return { izin: false, tujuan: "/panel/ditolak", akhiriSesi: false };
  }

  return { izin: true };
}
