import {
  ambilSemuaBidang,
  cekAktif,
  type BidangHukum,
} from "@/lib/models/bidangHukum";
import {
  cariKasusDisetujui,
  rapikanKataKunci,
  type HasilPencarianKasus,
} from "@/lib/models/pencarian";
import { buatClientServer } from "@/lib/supabase/server";

export type { BidangHukum, HasilPencarianKasus };

/**
 * C22 KontrolPencarianKataKunci.cariKasus(kataKunci) pada DPPL (Algo-032).
 * Merapikan kata kunci (huruf kecil dan hapus spasi tepi), menolak kata kunci
 * kosong, lalu memanggil Model untuk mengembalikan kasus berstatus Disetujui
 * yang cocok dengan kata kunci (KF02, KF06).
 */
export async function cariKasus(
  kataKunci: string,
): Promise<HasilPencarianKasus[]> {
  const kunci = rapikanKataKunci(kataKunci);
  if (!kunci) {
    return [];
  }

  const supabase = await buatClientServer();
  return cariKasusDisetujui(supabase, kunci);
}

/**
 * C22 KontrolPencarianKataKunci.sarankanBidangLain() pada DPPL (Algo-033).
 * Mengembalikan seluruh bidang hukum yang aktif (cekAktif() === true)
 * sebagai saran ketika pencarian kata kunci tidak menemukan hasil (KF07).
 */
export async function sarankanBidangLain(): Promise<BidangHukum[]> {
  const supabase = await buatClientServer();
  const daftarBidang = await ambilSemuaBidang(supabase);
  return daftarBidang.filter(cekAktif);
}
