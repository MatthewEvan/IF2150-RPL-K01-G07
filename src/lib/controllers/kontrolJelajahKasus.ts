import { cache } from "react";
import {
  ambilSemuaBidang,
  cekAktif,
  type BidangHukum,
} from "@/lib/models/bidangHukum";
import {
  ambilKelompokDisetujui,
  cekDarurat as cekKelompokDarurat,
  type KelompokKasus,
} from "@/lib/models/kelompokKasus";
import {
  ambilSemuaLBH,
  cocokkanWilayah,
  type LembagaBantuanHukum,
} from "@/lib/models/lembagaBantuanHukum";
import {
  ambilRangkumanDisetujui,
  type RangkumanTampil,
} from "@/lib/models/rangkumanKasus";
import { buatClientServer } from "@/lib/supabase/server";

export type BidangTampil = BidangHukum & { jumlahKelompokKasus: number };

// Satu kueri per permintaan, dipakai bersama oleh kedua operasi di bawah.
const ambilKelompokTampil = cache(async () => {
  const supabase = await buatClientServer();
  return ambilKelompokDisetujui(supabase);
});

/** Bidang aktif yang punya minimal satu kelompok kasus Disetujui. */
export async function ambilDaftarBidang(): Promise<BidangTampil[]> {
  const supabase = await buatClientServer();
  const [daftarBidang, daftarKelompok] = await Promise.all([
    ambilSemuaBidang(supabase),
    ambilKelompokTampil(),
  ]);

  return daftarBidang
    .filter(cekAktif)
    .map((bidang) => ({
      ...bidang,
      jumlahKelompokKasus: daftarKelompok.filter(
        (kelompok) => kelompok.idBidang === bidang.idBidang,
      ).length,
    }))
    .filter((bidang) => bidang.jumlahKelompokKasus > 0);
}

export async function ambilDaftarKelompok(
  idBidang: number,
): Promise<KelompokKasus[]> {
  const daftarKelompok = await ambilKelompokTampil();
  return daftarKelompok.filter((kelompok) => kelompok.idBidang === idBidang);
}

export async function cekDarurat(idKelompok: number): Promise<boolean> {
  const daftarKelompok = await ambilKelompokTampil();
  const kelompok = daftarKelompok.find(
    (item) => item.idKelompok === idKelompok,
  );
  return kelompok ? cekKelompokDarurat(kelompok) : false;
}

/** Hanya rangkuman berstatus Disetujui yang boleh dibuka publik (KF02, KF05). */
export const ambilRangkuman = cache(
  async (idKelompok: number): Promise<RangkumanTampil | null> => {
    const supabase = await buatClientServer();
    return ambilRangkumanDisetujui(supabase, idKelompok);
  },
);

const ambilSemuaLBHTampil = cache(async () => {
  const supabase = await buatClientServer();
  return ambilSemuaLBH(supabase);
});

/** Pilihan pada dropdown wilayah, diambil dari direktori LBH yang ada. */
export async function ambilDaftarWilayah(): Promise<string[]> {
  const daftarLBH = await ambilSemuaLBHTampil();
  return [...new Set(daftarLBH.map((lbh) => lbh.wilayah))].sort();
}

export async function ambilDaftarLBH(
  wilayah: string,
): Promise<LembagaBantuanHukum[]> {
  const daftarLBH = await ambilSemuaLBHTampil();
  return daftarLBH.filter((lbh) => cocokkanWilayah(lbh, wilayah));
}
