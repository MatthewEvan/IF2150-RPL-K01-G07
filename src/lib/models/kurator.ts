import type { SupabaseClient } from "@supabase/supabase-js";
import type { StatusKonten } from "@/components/ui/Badge";

/** Satu baris pada layar Daftar Konten Kurator (I-06). */
export type KontenKurator = {
  idRangkuman: number;
  judul: string;
  bidang: string;
  status: StatusKonten;
  /** ISO 8601 dari riwayat status terakhir; null bila belum ada riwayat. */
  diperbarui: string | null;
  catatanRevisi: string | null;
};

type BarisKonten = {
  id_rangkuman: number;
  status: StatusKonten;
  catatan_revisi: string | null;
  kelompok_kasus: {
    judul_umum: string;
    bidang_hukum: { nama: string } | null;
  } | null;
  riwayat_status: { waktu: string }[] | null;
};

/** Waktu riwayat terbaru sebagai penanda "diperbarui". */
function waktuTerbaru(riwayat: { waktu: string }[] | null): string | null {
  if (!riwayat || riwayat.length === 0) return null;
  return riwayat.reduce(
    (terbaru, baris) => (baris.waktu > terbaru ? baris.waktu : terbaru),
    riwayat[0].waktu,
  );
}

/** Mockup I-06: "diurutkan dari yang terakhir diperbarui". */
export function urutkanKonten(daftar: KontenKurator[]): KontenKurator[] {
  return [...daftar].sort((a, b) => {
    if (a.diperbarui === b.diperbarui) return b.idRangkuman - a.idRangkuman;
    if (a.diperbarui === null) return 1;
    if (b.diperbarui === null) return -1;
    return b.diperbarui.localeCompare(a.diperbarui);
  });
}

/**
 * Q-005 diperluas: judul dan bidang ikut diambil agar tabel I-06 bisa
 * menampilkan "Judul situasi" dan "Bidang" tanpa query tambahan.
 *
 * Filter `id_kurator` wajib karena RLS juga membuka konten berstatus
 * Disetujui milik Kurator lain untuk semua pengguna.
 */
export async function ambilDaftarKonten(
  supabase: SupabaseClient,
  idKurator: string,
): Promise<KontenKurator[]> {
  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .select(
      `id_rangkuman, status, catatan_revisi,
       kelompok_kasus ( judul_umum, bidang_hukum ( nama ) ),
       riwayat_status ( waktu )`,
    )
    .eq("id_kurator", idKurator);
  if (error) throw error;

  const daftar = (data as unknown as BarisKonten[]).map((baris) => ({
    idRangkuman: baris.id_rangkuman,
    judul: baris.kelompok_kasus?.judul_umum ?? "Tanpa judul",
    bidang: baris.kelompok_kasus?.bidang_hukum?.nama ?? "—",
    status: baris.status,
    diperbarui: waktuTerbaru(baris.riwayat_status),
    catatanRevisi: baris.catatan_revisi,
  }));

  return urutkanKonten(daftar);
}
