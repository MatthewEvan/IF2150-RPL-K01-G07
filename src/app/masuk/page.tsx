import FormLogin from "@/components/login/FormLogin";
import { prosesLogin } from "@/lib/controllers/kontrolAutentikasi";

const PESAN_ALASAN: Record<string, string> = {
  "sesi-berakhir":
    "Sesi Anda berakhir karena tidak ada aktivitas. Silakan masuk kembali.",
  "akun-nonaktif": "Akun Anda dinonaktifkan. Hubungi Administrator.",
};

export default async function HalamanLogin({
  searchParams,
}: PageProps<"/masuk">) {
  const { alasan } = await searchParams;
  const pesanAwal =
    typeof alasan === "string" ? PESAN_ALASAN[alasan] : undefined;

  return (
    <main className="flex flex-1 flex-col items-center px-5 py-8 sm:py-16">
      <section className="w-full max-w-110 rounded-xl border border-line bg-surface-raised p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
          Panel pengelola
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Masuk ke panel
        </h1>
        <p className="mt-2 text-ink-muted">
          Khusus Kurator dan Administrator. Akun dibuat oleh Administrator,
          tidak ada pendaftaran mandiri.
        </p>

        <div className="mt-4 flex gap-3 rounded-lg bg-accent-soft p-4">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="mt-0.5 size-5 shrink-0 text-link"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
          </svg>
          <div>
            <p className="font-semibold">
              Hanya untuk Kurator dan Administrator
            </p>
            <p className="mt-1">
              Pengguna publik tidak memerlukan akun, silakan kembali ke halaman
              utama.
            </p>
          </div>
        </div>

        <FormLogin aksi={prosesLogin} pesanAwal={pesanAwal} />
      </section>

      <p className="mt-6 flex items-start gap-2 text-sm text-ink-muted">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="mt-0.5 size-4 shrink-0"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        Sesi berakhir otomatis setelah 30 menit tanpa aktivitas.
      </p>
    </main>
  );
}
