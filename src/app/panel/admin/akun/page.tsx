import { redirect } from "next/navigation";
import DaftarKurator from "@/components/akun/DaftarKurator";
import FormTambahKurator from "@/components/akun/FormTambahKurator";
import { ambilDaftarKurator } from "@/lib/models/kurator";
import { buatClientServer } from "@/lib/supabase/server";

export default async function HalamanPengelolaanAkun() {
  const supabase = await buatClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/masuk");

  const daftar = await ambilDaftarKurator(supabase, user.id);

  return (
    <>
      <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
        Panel administrator
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Akun kurator</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Akun kurator hanya dibuat dari panel ini. Tidak ada pendaftaran mandiri
        di halaman publik.
      </p>

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1fr_300px]">
        <section className="rounded-xl border border-line bg-surface-raised p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Kurator terdaftar</h2>
          <DaftarKurator daftar={daftar} />
        </section>

        <section className="rounded-xl border border-line bg-surface-raised p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
            Akun baru
          </p>
          <h2 className="mt-1 text-lg font-semibold">Daftarkan kurator</h2>
          <FormTambahKurator />
        </section>
      </div>
    </>
  );
}
