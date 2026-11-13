import type { SupabaseClient } from "@supabase/supabase-js";
import type { StatusKonten } from "@/components/ui/Badge";

/** Keputusan yang boleh diambil Administrator atas konten yang diajukan. */
export type KeputusanModerasi = "Disetujui" | "Perlu Revisi";

export const GALAT_ALASAN_KOSONG = "Alasan revisi wajib diisi.";
export const GALAT_BUKAN_DIAJUKAN =
  "Konten ini tidak sedang menunggu peninjauan.";

/**
 * Algo-049: alasan revisi dianggap terisi bila ada teks selain spasi (KF34).
 * Dipakai bersama oleh formulir dan Server Action agar aturannya satu.
 */
export function cekAlasanTerisi(alasan: string | null | undefined): boolean {
  return typeof alasan === "string" && alasan.trim().length > 0;
}

export async function simpanRiwayat(
  supabase: SupabaseClient,
  idRangkuman: number,
  idPelaku: string,
  status: StatusKonten,
): Promise<void> {
  const { error } = await supabase
    .from("riwayat_status")
    .insert({ id_rangkuman: idRangkuman, id_pelaku: idPelaku, status });
  if (error) throw error;
}

/**
 * Algo-047/Algo-048 (Q-012, Q-013, Q-014): menyimpan status keputusan beserta
 * tanggal peninjauan atau catatan revisinya.
 *
 * `status = Diajukan` pada syarat update membuat keputusan hanya berlaku untuk
 * konten yang masih di antrean, sehingga dua Administrator yang menekan tombol
 * hampir bersamaan tidak dapat memutuskan konten yang sama dua kali.
 *
 * Mengembalikan true bila ada baris yang berubah.
 */
export async function simpanKeputusan(
  supabase: SupabaseClient,
  idRangkuman: number,
  keputusan: KeputusanModerasi,
  catatanRevisi?: string,
): Promise<boolean> {
  const perubahan: {
    status: KeputusanModerasi;
    tanggal_peninjauan?: string;
    catatan_revisi?: string;
  } = { status: keputusan };

  if (keputusan === "Disetujui") {
    perubahan.tanggal_peninjauan = new Date().toISOString().slice(0, 10);
  } else {
    perubahan.catatan_revisi = catatanRevisi?.trim() ?? "";
  }

  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .update(perubahan)
    .eq("id_rangkuman", idRangkuman)
    .eq("status", "Diajukan")
    .select("id_rangkuman");
  if (error) throw error;

  return (data?.length ?? 0) > 0;
}

/** Keadaan konten sebelum diputuskan, untuk pemulihan bila riwayat gagal dicatat. */
export type KeadaanKonten = {
  status: StatusKonten;
  tanggalPeninjauan: string | null;
  catatanRevisi: string | null;
};

export async function ambilKeadaanKonten(
  supabase: SupabaseClient,
  idRangkuman: number,
): Promise<KeadaanKonten | null> {
  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .select("status, tanggal_peninjauan, catatan_revisi")
    .eq("id_rangkuman", idRangkuman)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  return {
    status: data.status as StatusKonten,
    tanggalPeninjauan: data.tanggal_peninjauan,
    catatanRevisi: data.catatan_revisi,
  };
}

/**
 * Mengembalikan konten ke keadaan semula bila pencatatan riwayat gagal, supaya
 * status dan riwayat tidak pernah berbeda. Pengganti transaksi karena Supabase
 * JS tidak menyediakan transaksi lintas pernyataan tanpa RPC.
 */
export async function pulihkanKeadaan(
  supabase: SupabaseClient,
  idRangkuman: number,
  keadaan: KeadaanKonten,
  keputusan: KeputusanModerasi,
): Promise<void> {
  const { error } = await supabase
    .from("rangkuman_kasus")
    .update({
      status: keadaan.status,
      tanggal_peninjauan: keadaan.tanggalPeninjauan,
      catatan_revisi: keadaan.catatanRevisi,
    })
    .eq("id_rangkuman", idRangkuman)
    .eq("status", keputusan);
  if (error) throw error;
}
