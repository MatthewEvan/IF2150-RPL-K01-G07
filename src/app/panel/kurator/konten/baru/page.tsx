import FormulirKonten from "@/components/konten/FormulirKonten";
import { ambilPilihanKelompok } from "@/lib/models/pilihanKelompok";
import { buatClientServer } from "@/lib/supabase/server";

async function aksiSementara() {
  "use server";
}

export default async function HalamanKontenBaru() {
  const supabase = await buatClientServer();
  const daftarKelompok = await ambilPilihanKelompok(supabase);

  return (
    <FormulirKonten daftarKelompok={daftarKelompok} aksi={aksiSementara} />
  );
}
