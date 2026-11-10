import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Representasi hasil pencarian kasus yang menggabungkan data KelompokKasus (C05),
 * RangkumanKasus (C06), dan nama BidangHukum (C04) untuk ditampilkan pada layar I-03.
 */
export type HasilPencarianKasus = {
  idRangkuman: number;
  idKelompok: number;
  idBidang: number;
  namaBidang: string;
  judulUmum: string;
  istilahResmi: string;
  penandaDarurat: boolean;
  intiMasalah: string;
  hak: string;
  poinPertimbangan: string;
  status: "Disetujui";
};

type BarisPencarian = {
  id_rangkuman: number;
  id_kelompok: number;
  inti_masalah: string | null;
  hak: string | null;
  poin_pertimbangan: string | null;
  status: string;
  kelompok_kasus: {
    id_kelompok: number;
    id_bidang: number;
    judul_umum: string;
    istilah_resmi: string;
    penanda_darurat: boolean;
    bidang_hukum: {
      id_bidang: number;
      nama: string;
      status_aktif: boolean;
    } | null;
  } | null;
};

/**
 * Merapikan kata kunci menjadi huruf kecil dan menghapus spasi di kedua tepi
 * sesuai langkah awal Algo-012 dan Algo-013 pada DPPL.
 */
export function rapikanKataKunci(kataKunci: string): string {
  return kataKunci.trim().toLowerCase();
}

/**
 * C06 RangkumanKasus.cekDisetujui() pada DPPL.
 * Memastikan hanya rangkuman berstatus Disetujui yang tampil ke publik (KF02).
 */
export function cekDisetujui(status: string | null | undefined): boolean {
  return status === "Disetujui";
}

/**
 * C05 KelompokKasus.cocokkanKataKunci(kataKunci) pada DPPL (Algo-012).
 * Mencocokkan kata kunci dengan judulUmum dan istilahResmi tanpa membedakan huruf besar/kecil (KF06).
 */
export function cocokkanKataKunciKelompok(
  kelompok: { judulUmum: string; istilahResmi: string },
  kataKunci: string,
): boolean {
  const kunci = rapikanKataKunci(kataKunci);
  if (!kunci) {
    return false;
  }

  return (
    kelompok.judulUmum.toLowerCase().includes(kunci) ||
    kelompok.istilahResmi.toLowerCase().includes(kunci)
  );
}

/**
 * C06 RangkumanKasus.cocokkanKataKunci(kataKunci) pada DPPL (Algo-013).
 * Mencocokkan kata kunci dengan isi rangkuman: intiMasalah, hak, dan poinPertimbangan (KF06).
 */
export function cocokkanKataKunciRangkuman(
  rangkuman: {
    intiMasalah: string | null;
    hak: string | null;
    poinPertimbangan: string | null;
  },
  kataKunci: string,
): boolean {
  const kunci = rapikanKataKunci(kataKunci);
  if (!kunci) {
    return false;
  }

  const daftarIsi = [
    rangkuman.intiMasalah,
    rangkuman.hak,
    rangkuman.poinPertimbangan,
  ];

  for (const isi of daftarIsi) {
    if (isi && isi.toLowerCase().includes(kunci)) {
      return true;
    }
  }

  return false;
}

/**
 * Mengambil dan menyaring kasus berstatus Disetujui pada bidang hukum aktif
 * yang cocok dengan kata kunci (Algo-032, Q-023, KF02, KF06).
 *
 * Filter status = 'Disetujui' tetap dipasang secara eksplisit walaupun sudah ada
 * RLS, karena pengguna Kurator/Administrator yang sedang login juga memiliki akses
 * baca ke rangkuman berstatus selain Disetujui.
 */
export async function cariKasusDisetujui(
  supabase: SupabaseClient,
  kataKunci: string,
): Promise<HasilPencarianKasus[]> {
  const kunci = rapikanKataKunci(kataKunci);
  if (!kunci) {
    return [];
  }

  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .select(
      `id_rangkuman, id_kelompok, inti_masalah, hak, poin_pertimbangan, status,
       kelompok_kasus!inner (
         id_kelompok, id_bidang, judul_umum, istilah_resmi, penanda_darurat,
         bidang_hukum!inner ( id_bidang, nama, status_aktif )
       )`,
    )
    .eq("status", "Disetujui")
    .eq("kelompok_kasus.bidang_hukum.status_aktif", true)
    .order("id_kelompok", { ascending: true });

  if (error) throw error;

  const daftarBaris = (data ?? []) as unknown as BarisPencarian[];
  const hasil: HasilPencarianKasus[] = [];

  for (const baris of daftarBaris) {
    const kelompok = baris.kelompok_kasus;
    const bidang = kelompok?.bidang_hukum;

    if (!kelompok || !bidang || !bidang.status_aktif) {
      continue;
    }

    if (!cekDisetujui(baris.status)) {
      continue;
    }

    const cocokKelompok = cocokkanKataKunciKelompok(
      {
        judulUmum: kelompok.judul_umum,
        istilahResmi: kelompok.istilah_resmi,
      },
      kunci,
    );

    const cocokRangkuman = cocokkanKataKunciRangkuman(
      {
        intiMasalah: baris.inti_masalah,
        hak: baris.hak,
        poinPertimbangan: baris.poin_pertimbangan,
      },
      kunci,
    );

    if (cocokKelompok || cocokRangkuman) {
      hasil.push({
        idRangkuman: baris.id_rangkuman,
        idKelompok: kelompok.id_kelompok,
        idBidang: kelompok.id_bidang,
        namaBidang: bidang.nama,
        judulUmum: kelompok.judul_umum,
        istilahResmi: kelompok.istilah_resmi,
        penandaDarurat: kelompok.penanda_darurat,
        intiMasalah: baris.inti_masalah ?? "",
        hak: baris.hak ?? "",
        poinPertimbangan: baris.poin_pertimbangan ?? "",
        status: "Disetujui",
      });
    }
  }

  return hasil;
}
