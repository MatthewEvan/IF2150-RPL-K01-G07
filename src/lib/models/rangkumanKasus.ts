import type { SupabaseClient } from "@supabase/supabase-js";
import type { StatusKonten } from "@/components/ui/Badge";
import type { LangkahPenyelesaian } from "./langkahPenyelesaian";
import type { Artikel } from "./artikel";

export type IsiRangkuman = {
  intiMasalah: string;
  hak: string;
  poinPertimbangan: string;
};

export type RangkumanKasus = IsiRangkuman & {
  idRangkuman: number;
  idKelompok: number;
  judulUmum: string;
  status: StatusKonten;
  catatanRevisi: string | null;
  daftarLangkah: LangkahPenyelesaian[];
  daftarDokumen: string[];
  daftarArtikel: Artikel[];
};

type BarisRangkuman = {
  id_rangkuman: number;
  id_kelompok: number;
  inti_masalah: string | null;
  hak: string | null;
  poin_pertimbangan: string | null;
  status: StatusKonten;
  catatan_revisi: string | null;
  kelompok_kasus: { judul_umum: string };
  langkah_penyelesaian: {
    nomor: number;
    deskripsi: string | null;
    tujuan: string | null;
    tenggat: string | null;
  }[];
  checklist: { daftar_dokumen: string[] } | null;
  artikel: {
    id_artikel: number;
    judul: string | null;
    tautan_sumber: string | null;
  }[];
};

export async function buatRangkuman(
  supabase: SupabaseClient,
  idKelompok: number,
  idKurator: string,
): Promise<number> {
  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .insert({ id_kelompok: idKelompok, id_kurator: idKurator })
    .select("id_rangkuman")
    .single();
  if (error) throw error;
  return data.id_rangkuman;
}

export async function ambilRangkumanMilik(
  supabase: SupabaseClient,
  idRangkuman: number,
  idKurator: string,
): Promise<RangkumanKasus | null> {
  const { data, error } = await supabase
    .from("rangkuman_kasus")
    .select(
      `id_rangkuman, id_kelompok, inti_masalah, hak, poin_pertimbangan, status, catatan_revisi,
       kelompok_kasus!inner ( judul_umum ),
       langkah_penyelesaian ( nomor, deskripsi, tujuan, tenggat ),
       checklist ( daftar_dokumen ),
       artikel ( id_artikel, judul, tautan_sumber )`,
    )
    .eq("id_rangkuman", idRangkuman)
    .eq("id_kurator", idKurator)
    .maybeSingle<BarisRangkuman>();
  if (error) throw error;
  if (!data) return null;

  return {
    idRangkuman: data.id_rangkuman,
    idKelompok: data.id_kelompok,
    judulUmum: data.kelompok_kasus.judul_umum,
    status: data.status,
    catatanRevisi: data.catatan_revisi,
    intiMasalah: data.inti_masalah ?? "",
    hak: data.hak ?? "",
    poinPertimbangan: data.poin_pertimbangan ?? "",
    daftarLangkah: [...data.langkah_penyelesaian]
      .sort((a, b) => a.nomor - b.nomor)
      .map((langkah) => ({
        nomor: langkah.nomor,
        deskripsi: langkah.deskripsi ?? "",
        tujuan: langkah.tujuan ?? "",
        tenggat: langkah.tenggat,
      })),
    daftarDokumen: data.checklist?.daftar_dokumen ?? [],
    daftarArtikel: [...data.artikel]
      .sort((a, b) => a.id_artikel - b.id_artikel)
      .map((artikel) => ({
        judul: artikel.judul ?? "",
        tautanSumber: artikel.tautan_sumber ?? "",
      })),
  };
}

export async function simpanIsiRangkuman(
  supabase: SupabaseClient,
  idRangkuman: number,
  isi: IsiRangkuman,
): Promise<void> {
  const { error } = await supabase
    .from("rangkuman_kasus")
    .update({
      inti_masalah: isi.intiMasalah,
      hak: isi.hak,
      poin_pertimbangan: isi.poinPertimbangan,
    })
    .eq("id_rangkuman", idRangkuman);
  if (error) throw error;
}
