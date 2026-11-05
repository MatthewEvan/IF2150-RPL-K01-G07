import Link from "next/link";

export default function HalamanAksesDitolak() {
  return (
    <section className="rounded-xl border border-line bg-surface-raised p-5">
      <h1 className="text-2xl font-bold">Akses ditolak</h1>
      <p className="mt-2 text-ink-muted">
        Halaman tersebut tidak tersedia untuk peran akun Anda.
      </p>
      <Link
        href="/masuk"
        className="mt-4 inline-block font-medium text-link underline"
      >
        Masuk dengan akun lain
      </Link>
    </section>
  );
}
