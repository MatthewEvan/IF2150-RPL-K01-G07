import { redirect } from "next/navigation";
import DaftarKonten from "@/components/pelacakan/DaftarKonten";
import TombolTautan from "@/components/ui/TombolTautan";
import { ambilDaftarKonten } from "@/lib/controllers/kontrolPelacakanKonten";
import { buatClientServer } from "@/lib/supabase/server";

/** Ikon pensil untuk tombol "Tulis konten baru" (I-06-06). */
function IkonPensil() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4z" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

export default async function HalamanDaftarKontenKurator() {
  const supabase = await buatClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/masuk");

  const daftar = await ambilDaftarKonten(user.id);

  return (
    <>
      <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
        Panel kurator
      </p>

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">
            Konten saya
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {daftar.length} konten, diurutkan dari yang terakhir diperbarui
          </p>
        </div>
        <TombolTautan
          href="/panel/kurator/konten/baru"
          ikonKiri={<IkonPensil />}
          className="w-full sm:w-auto"
        >
          Tulis konten baru
        </TombolTautan>
      </div>

      <div className="mt-8">
        <DaftarKonten daftar={daftar} />
      </div>
    </>
  );
}
