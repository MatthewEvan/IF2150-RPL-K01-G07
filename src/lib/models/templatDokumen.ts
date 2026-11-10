import type { SupabaseClient } from "@supabase/supabase-js";

export const BUCKET_TEMPLAT = "templat";
export const UKURAN_MAKSIMAL_TEMPLAT = 5 * 1024 * 1024;

const JENIS_BERKAS = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

type Ekstensi = keyof typeof JENIS_BERKAS;

export type TemplatDokumen = {
  idTemplat: number;
  idRangkuman: number;
  namaBerkas: string;
  format: string;
  ukuran: number;
  versi: string;
  tanggalPembaruan: string;
  lokasiBerkas: string | null;
};

type BarisTemplat = {
  id_templat: number;
  id_rangkuman: number;
  nama_berkas: string;
  format: string;
  ukuran: number;
  versi: string;
  tanggal_pembaruan: string;
  lokasi_berkas: string | null;
};

const KOLOM_TEMPLAT =
  "id_templat, id_rangkuman, nama_berkas, format, ukuran, versi, tanggal_pembaruan, lokasi_berkas";

function keTemplat(baris: BarisTemplat): TemplatDokumen {
  return {
    idTemplat: baris.id_templat,
    idRangkuman: baris.id_rangkuman,
    namaBerkas: baris.nama_berkas,
    format: baris.format,
    ukuran: baris.ukuran,
    versi: baris.versi,
    tanggalPembaruan: baris.tanggal_pembaruan,
    lokasiBerkas: baris.lokasi_berkas,
  };
}

function ambilEkstensi(namaBerkas: string): Ekstensi | null {
  const ekstensi = namaBerkas.split(".").pop()?.toLowerCase() ?? "";
  return ekstensi in JENIS_BERKAS ? (ekstensi as Ekstensi) : null;
}

function tanggalHariIni() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(
    new Date(),
  );
}

export function validasiUnggahan(berkas: { name: string; size: number }) {
  return (
    ambilEkstensi(berkas.name) !== null &&
    berkas.size > 0 &&
    berkas.size <= UKURAN_MAKSIMAL_TEMPLAT
  );
}

export async function ambilDaftarTemplat(
  supabase: SupabaseClient,
  idRangkuman: number,
): Promise<TemplatDokumen[]> {
  const { data, error } = await supabase
    .from("templat_dokumen")
    .select(KOLOM_TEMPLAT)
    .eq("id_rangkuman", idRangkuman)
    .order("id_templat")
    .returns<BarisTemplat[]>();
  if (error) throw error;
  return data.map(keTemplat);
}

export async function perbaruiVersi(
  supabase: SupabaseClient,
  idRangkuman: number,
  templatLama: TemplatDokumen | null,
  berkas: File,
): Promise<TemplatDokumen> {
  const ekstensi = ambilEkstensi(berkas.name);
  if (!ekstensi) throw new Error("Format berkas tidak didukung");

  const lokasiBaru = `${idRangkuman}/${crypto.randomUUID()}.${ekstensi}`;
  const penyimpanan = supabase.storage.from(BUCKET_TEMPLAT);
  const unggah = await penyimpanan.upload(lokasiBaru, berkas, {
    contentType: JENIS_BERKAS[ekstensi],
    upsert: false,
  });
  if (unggah.error) throw unggah.error;

  const isi = {
    nama_berkas: berkas.name,
    format: ekstensi.toUpperCase(),
    ukuran: berkas.size,
    versi: templatLama ? String(Number(templatLama.versi) + 1) : "1",
    tanggal_pembaruan: tanggalHariIni(),
    lokasi_berkas: lokasiBaru,
  };
  const simpan = templatLama
    ? supabase
        .from("templat_dokumen")
        .update(isi)
        .eq("id_templat", templatLama.idTemplat)
    : supabase
        .from("templat_dokumen")
        .insert({ ...isi, id_rangkuman: idRangkuman });
  const { data, error } = await simpan
    .select(KOLOM_TEMPLAT)
    .single<BarisTemplat>();

  if (error) {
    await penyimpanan.remove([lokasiBaru]);
    throw error;
  }

  if (templatLama?.lokasiBerkas) {
    await penyimpanan.remove([templatLama.lokasiBerkas]);
  }
  return keTemplat(data);
}
