import { Fragment } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import TombolTautan from "@/components/ui/TombolTautan";
import {
  ringkasRiwayat,
  type KontenKurator,
  type RiwayatStatusKonten,
} from "@/lib/models/kurator";

const FORMAT_TANGGAL = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const MAKS_RIWAYAT = 3;

function formatTanggal(iso: string | null) {
  if (!iso) return "—";
  return FORMAT_TANGGAL.format(new Date(iso));
}

function alamatSunting(idRangkuman: number) {
  return `/panel/kurator/konten/${idRangkuman}`;
}

/** Draf bisa dibuka kembali lewat judulnya; status lain belum punya formulir. */
function JudulKonten({ konten }: { konten: KontenKurator }) {
  if (konten.status !== "Draft") return <>{konten.judul}</>;
  return (
    <Link
      href={alamatSunting(konten.idRangkuman)}
      title="Buka draf"
      className="text-brand underline underline-offset-2 hover:text-brand-strong"
    >
      {konten.judul}
    </Link>
  );
}

function RiwayatSingkat({ riwayat }: { riwayat: RiwayatStatusKonten[] }) {
  if (riwayat.length === 0) {
    return (
      <span className="mt-1 block text-xs text-ink-muted">
        Belum ada riwayat status.
      </span>
    );
  }

  const tampil = ringkasRiwayat(riwayat, MAKS_RIWAYAT);
  return (
    <span className="mt-1 block text-xs text-ink-muted">
      {riwayat.length > MAKS_RIWAYAT && "… → "}
      {tampil.map((butir, indeks) => (
        <Fragment key={`${butir.waktu}-${butir.status}`}>
          {indeks > 0 && " → "}
          {butir.status}
        </Fragment>
      ))}
    </span>
  );
}

function CatatanRevisi({ konten }: { konten: KontenKurator }) {
  return (
    <div className="rounded-lg border border-warning bg-warning-soft p-4">
      <p className="text-xs font-semibold tracking-wider text-warning uppercase">
        Catatan revisi
      </p>
      <p className="mt-1 text-sm text-ink">
        {konten.catatanRevisi ?? "Belum ada catatan revisi dari Administrator."}
      </p>
      <TombolTautan
        href={alamatSunting(konten.idRangkuman)}
        varian="secondary"
        ukuran="sm"
        className="mt-3"
      >
        Perbaiki konten
      </TombolTautan>
    </div>
  );
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
                <Fragment key={konten.idRangkuman}>
                  <tr className="border-b border-line last:border-0 hover:bg-surface-raised-hover">
                    <td className="px-4 py-4 font-medium text-ink">
                      <JudulKonten konten={konten} />
                      <RiwayatSingkat riwayat={konten.riwayat} />
                    </td>
                    <td className="px-4 py-4 text-ink">{konten.bidang}</td>
                    <td className="px-4 py-4 text-ink">
                      {formatTanggal(konten.diperbarui)}
                    </td>
                    <td className="px-4 py-4">
                      <Badge status={konten.status} />
                    </td>
                  </tr>
                  {konten.status === "Perlu Revisi" && (
                    <tr className="border-b border-line last:border-0">
                      <td colSpan={4} className="px-4 pb-4">
                        <CatatanRevisi konten={konten} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>

          <ul className="border-t border-line md:hidden">
            {daftar.map((konten) => (
              <li
                key={konten.idRangkuman}
                className="border-b border-line px-5 py-4 last:border-0"
              >
                <p className="font-semibold text-ink">
                  <JudulKonten konten={konten} />
                </p>
                <RiwayatSingkat riwayat={konten.riwayat} />
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
                {konten.status === "Perlu Revisi" && (
                  <div className="mt-3">
                    <CatatanRevisi konten={konten} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
