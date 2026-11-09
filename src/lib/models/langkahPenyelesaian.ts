import type { SupabaseClient } from "@supabase/supabase-js";

export type LangkahPenyelesaian = {
  nomor: number;
  deskripsi: string;
  tujuan: string;
  tenggat: string | null;
};

export async function gantiDaftarLangkah(
  supabase: SupabaseClient,
  idRangkuman: number,
  daftarLangkah: LangkahPenyelesaian[],
): Promise<void> {
  const hapus = await supabase
    .from("langkah_penyelesaian")
    .delete()
    .eq("id_rangkuman", idRangkuman);
  if (hapus.error) throw hapus.error;
  if (daftarLangkah.length === 0) return;

  const { error } = await supabase.from("langkah_penyelesaian").insert(
    daftarLangkah.map((langkah) => ({
      id_rangkuman: idRangkuman,
      nomor: langkah.nomor,
      deskripsi: langkah.deskripsi,
      tujuan: langkah.tujuan || null,
      tenggat: langkah.tenggat || null,
    })),
  );
  if (error) throw error;
}
