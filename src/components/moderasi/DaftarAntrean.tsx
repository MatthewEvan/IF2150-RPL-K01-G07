import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import {
  lamaMenungguHari,
  type AntreanPeninjauan,
} from "@/lib/models/administrator";

const FORMAT_TANGGAL = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatTanggal(iso: string | null) {
  if (!iso) return "—";
  return FORMAT_TANGGAL.format(new Date(iso));
}

function labelLamaMenunggu(iso: string | null) {
  const hari = lamaMenungguHari(iso, new Date());
  if (hari === null) return "waktu tidak tercatat";
  if (hari === 0) return "hari ini";
  return `${hari} hari`;
}

export type DaftarAntreanProps = {
  daftar: AntreanPeninjauan[];
  /** Butir yang sedang ditampilkan pada panel pratinjau. */
  idTerpilih: number | null;
};

/** Butir antrean tinjauan I-07, diurutkan dari pengajuan paling lama. */
export default function DaftarAntrean({
  daftar,
  idTerpilih,
}: DaftarAntreanProps) {
  return (
    <Card
      padat
      judul="Antrean tinjauan"
      aksi={
        <span className="rounded-pill bg-surface-sunken px-3 py-1 text-xs font-semibold text-ink-muted">
          {daftar.length} menunggu
        </span>
      }
      className="lg:sticky lg:top-6"
    >
      {daftar.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface-sunken px-4 py-6 text-sm text-ink-muted">
          Tidak ada konten yang menunggu peninjauan.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {daftar.map((konten) => {
            const terpilih = konten.idRangkuman === idTerpilih;
            return (
              <li key={konten.idRangkuman}>
                <Link
                  href={`/panel/admin/moderasi?konten=${konten.idRangkuman}`}
                  aria-current={terpilih ? "true" : undefined}
                  scroll={false}
                  className={`block rounded-lg border p-3 transition-colors ${
                    terpilih
                      ? "border-brand bg-accent-soft"
                      : "border-line bg-surface-raised hover:bg-surface-raised-hover"
                  }`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-sm font-semibold text-ink">
                      {konten.judul}
                    </span>
                    <Badge status="Diajukan" className="shrink-0" />
                  </span>
                  <span className="mt-2 block text-xs text-ink-muted">
                    Oleh {konten.namaPenulis} · {konten.bidang}
                  </span>
                  <span className="mt-1 block text-xs text-ink-muted">
                    Diajukan {formatTanggal(konten.waktuPengajuan)} · Menunggu{" "}
                    {labelLamaMenunggu(konten.waktuPengajuan)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
