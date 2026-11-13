import FormulirKonten from "@/components/konten/FormulirKonten";
import { ambilPilihanKelompok } from "@/lib/models/kelompokKasus";
import { buatClientServer } from "@/lib/supabase/server";

export default async function HalamanKontenBaru() {
  const supabase = await buatClientServer();
  const daftarKelompok = await ambilPilihanKelompok(supabase);

  return <FormulirKonten daftarKelompok={daftarKelompok} />;
}
