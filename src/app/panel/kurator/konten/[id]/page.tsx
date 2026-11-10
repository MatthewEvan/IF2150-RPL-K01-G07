import { notFound, redirect } from "next/navigation";
import FormulirKonten from "@/components/konten/FormulirKonten";
import {
  lampirkanTemplat,
  simpanDraf,
} from "@/lib/controllers/kontrolPenyusunanKonten";
import { ambilPilihanKelompok } from "@/lib/models/kelompokKasus";
import { ambilRangkumanMilik } from "@/lib/models/rangkumanKasus";
import { ambilDaftarTemplat } from "@/lib/models/templatDokumen";
import { buatClientServer } from "@/lib/supabase/server";

type HalamanSuntingKontenProps = {
  params: Promise<{ id: string }>;
};

export default async function HalamanSuntingKonten({
  params,
}: HalamanSuntingKontenProps) {
  const { id } = await params;
  const idRangkuman = Number(id);
  if (!Number.isInteger(idRangkuman) || idRangkuman <= 0) notFound();

  const supabase = await buatClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/masuk");

  const [rangkuman, daftarKelompok] = await Promise.all([
    ambilRangkumanMilik(supabase, idRangkuman, user.id),
    ambilPilihanKelompok(supabase),
  ]);
  if (!rangkuman) notFound();
  const daftarTemplat = await ambilDaftarTemplat(supabase, idRangkuman);

  return (
    <FormulirKonten
      daftarKelompok={daftarKelompok}
      rangkuman={rangkuman}
      daftarTemplat={daftarTemplat}
      aksiSimpan={simpanDraf.bind(null, idRangkuman)}
      aksiLampirkan={lampirkanTemplat.bind(null, idRangkuman)}
    />
  );
}
