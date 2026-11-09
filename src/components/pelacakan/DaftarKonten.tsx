import Badge from "@/components/ui/Badge";
import type { KontenKurator } from "@/lib/models/kurator";

const FORMAT_TANGGAL = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatTanggal(iso: string | null) {
  if (!iso) return "—";
  return FORMAT_TANGGAL.format(new Date(iso));
}

const KEPALA =
  "px-4 py-3 text-left text-xs font-semibold tracking-wider text-ink-muted uppercase";

/** Tabel di desktop dan daftar bertumpuk di ponsel, sesuai mockup I-06. */
export default function DaftarKonten({ daftar }: { daftar: KontenKurator[] }) {
  return (
    <section className="rounded-xl border border-line bg-surface-raised shadow-sm">
      <h2 className="px-5 pt-5 pb-3 text-lg font-semibold text-ink">
        Daftar konten
      </h2>

      {daftar.length === 0 ? (
        <p className="border-t border-line px-5 py-6 text-sm text-ink-muted">
          Belum ada konten. Mulai dengan menulis konten baru.
        </p>
      ) : (
        <>
          <table className="hidden w-full border-collapse text-sm md:table">
            <caption className="sr-only">
              Daftar konten milik Anda beserta statusnya
            </caption>
            <thead className="border-y border-line bg-surface-sunken">
              <tr>
                <th scope="col" className={KEPALA}>
                  Judul situasi
                </th>
                <th scope="col" className={KEPALA}>
                  Bidang
                </th>
                <th scope="col" className={KEPALA}>
                  Diperbarui
                </th>
                <th scope="col" className={KEPALA}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {daftar.map((konten) => (
                <tr
                  key={konten.idRangkuman}
                  className="border-b border-line last:border-0 hover:bg-surface-raised-hover"
                >
                  <td className="px-4 py-4 font-medium text-ink">
                    {konten.judul}
                  </td>
                  <td className="px-4 py-4 text-ink">{konten.bidang}</td>
                  <td className="px-4 py-4 text-ink">
                    {formatTanggal(konten.diperbarui)}
                  </td>
                  <td className="px-4 py-4">
                    <Badge status={konten.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="border-t border-line md:hidden">
            {daftar.map((konten) => (
              <li
                key={konten.idRangkuman}
                className="border-b border-line px-5 py-4 last:border-0"
              >
                <p className="font-semibold text-ink">{konten.judul}</p>
                <dl className="mt-3 flex flex-col gap-2 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-ink-muted">Bidang</dt>
                    <dd className="text-right text-ink">{konten.bidang}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-ink-muted">Diperbarui</dt>
                    <dd className="text-right text-ink">
                      {formatTanggal(konten.diperbarui)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-muted">Status</dt>
                    <dd>
                      <Badge status={konten.status} />
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
