import { redirect } from "next/navigation";
import DaftarAntrean from "@/components/moderasi/DaftarAntrean";
import PanelKeputusan from "@/components/moderasi/PanelKeputusan";
import PratinjauKonten from "@/components/moderasi/PratinjauKonten";
import Callout from "@/components/ui/Callout";
import {
  ambilAntrean,
  ambilKonten,
} from "@/lib/controllers/kontrolModerasiKonten";
import { PERAN, cariAkun } from "@/lib/models/akun";
import { buatClientServer } from "@/lib/supabase/server";

/** I-07: antrean tinjauan dan pratinjau isi konten pada satu layar. */
export default async function HalamanModerasi({
  searchParams,
}: PageProps<"/panel/admin/moderasi">) {
  const supabase = await buatClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/masuk");

  const akun = await cariAkun(supabase, user.id);
  if (!akun || akun.peran !== PERAN.ADMINISTRATOR) redirect("/panel/ditolak");

  const { konten: paramKonten, hasil: paramHasil } = await searchParams;
  const antrean = await ambilAntrean();

  const idDiminta =
    typeof paramKonten === "string" ? Number(paramKonten) : Number.NaN;
  const idTerpilih = antrean.some((butir) => butir.idRangkuman === idDiminta)
    ? idDiminta
    : (antrean[0]?.idRangkuman ?? null);
  const konten = idTerpilih === null ? null : await ambilKonten(idTerpilih);
  const pesanHasil =
    paramHasil === "disetujui"
      ? "Konten disetujui dan langsung tayang untuk publik."
      : paramHasil === "revisi"
        ? "Konten dikembalikan ke Kurator beserta catatan revisi."
        : null;

  return (
    <>
      <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
        Panel administrator
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">
        Moderasi konten
      </h1>
      <p className="mt-2 text-ink-muted">
        Tinjau isi konten yang diajukan Kurator sebelum memberi keputusan.
      </p>

      {pesanHasil && (
        <div className="mt-6">
          <Callout jenis="info" judul="Keputusan tersimpan">
            {pesanHasil}
          </Callout>
        </div>
      )}

      {antrean.length === 0 ? (
        <div className="mt-6">
          <DaftarAntrean daftar={[]} idTerpilih={null} />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start">
          <DaftarAntrean daftar={antrean} idTerpilih={idTerpilih} />
          {konten && (
            <div className="flex flex-col gap-5">
              <PratinjauKonten konten={konten} />
              <PanelKeputusan idRangkuman={konten.idRangkuman} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
