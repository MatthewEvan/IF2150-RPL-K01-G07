import TombolTautan from "@/components/ui/TombolTautan";

export default function HalamanAksesDitolak() {
  return (
    <section className="rounded-xl border border-line bg-surface-raised p-5">
      <h1 className="text-2xl font-bold">Akses ditolak</h1>
      <p className="mt-2 text-ink-muted">
        Halaman tersebut tidak tersedia untuk peran akun Anda.
      </p>
      <TombolTautan href="/masuk" varian="secondary" className="mt-4">
        Masuk dengan akun lain
      </TombolTautan>
    </section>
  );
}
