import type { KuratorTerdaftar } from "@/lib/models/kurator";
import LencanaStatusAkun from "./LencanaStatusAkun";

const GAYA_KEPALA =
  "px-4 py-3 text-left text-xs font-semibold tracking-wider text-ink-muted uppercase";

/** Tabel di desktop dan daftar bertumpuk di ponsel, sesuai mockup I-08. */
export default function DaftarKurator({
  daftar,
}: {
  daftar: KuratorTerdaftar[];
}) {
  if (daftar.length === 0) {
    return <p className="mt-3 text-ink-muted">Belum ada Kurator terdaftar.</p>;
  }

  return (
    <>
      <table className="mt-3 hidden w-full md:table">
        <thead className="bg-surface-sunken">
          <tr>
            <th className={`${GAYA_KEPALA} rounded-l-md`}>Email</th>
            <th className={GAYA_KEPALA}>Konten</th>
            <th className={`${GAYA_KEPALA} rounded-r-md`}>Status</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((kurator) => (
            <tr
              key={kurator.idAkun}
              className="border-b border-line last:border-0"
            >
              <td className="px-4 py-4 font-medium">{kurator.email}</td>
              <td className="px-4 py-4">{kurator.jumlahKonten}</td>
              <td className="px-4 py-4">
                <LencanaStatusAkun aktif={kurator.statusAktif} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="mt-3 md:hidden">
        {daftar.map((kurator) => (
          <li
            key={kurator.idAkun}
            className="border-t border-line py-4 first:border-0"
          >
            <p className="font-medium break-all">{kurator.email}</p>
            <dl className="mt-3 flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-muted">Konten</dt>
                <dd>{kurator.jumlahKonten}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-muted">Status</dt>
                <dd>
                  <LencanaStatusAkun aktif={kurator.statusAktif} />
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
