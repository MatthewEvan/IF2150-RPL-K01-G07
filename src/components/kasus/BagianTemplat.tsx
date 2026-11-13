import Badge from "@/components/ui/Badge";
import type { TemplatTampil } from "@/lib/models/rangkumanKasus";
import { BAGIAN } from "./bagian";
import { formatTanggal, formatUkuran } from "./format";
import { IkonDokumen } from "./ikon";
import KartuBagian from "./KartuBagian";
import TombolUnduhTemplat from "./TombolUnduhTemplat";

export default function BagianTemplat({
  daftarTemplat,
}: {
  daftarTemplat: TemplatTampil[];
}) {
  return (
    <KartuBagian bagian={BAGIAN.templat}>
      <p className="text-sm text-ink-muted">
        Templat ini kerangka awal. Sesuaikan dengan situasimu sebelum dikirim.
      </p>
      {daftarTemplat.length === 0 ? (
        <p className="mt-4 text-ink-muted">
          Belum ada templat surat untuk situasi ini.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-4">
          {daftarTemplat.map((templat) => (
            <li
              key={templat.idTemplat}
              className="flex flex-col gap-4 rounded-lg bg-surface p-4 sm:flex-row sm:items-center"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-pill bg-accent-soft text-link">
                <IkonDokumen className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold break-words text-ink">
                  {templat.namaBerkas}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Versi {templat.versi}. Diperbarui{" "}
                  {formatTanggal(templat.tanggalPembaruan)}.
                </p>
                <Badge className="mt-2">
                  {templat.format.toUpperCase()} ·{" "}
                  {formatUkuran(templat.ukuran)}
                </Badge>
              </div>
              <TombolUnduhTemplat
                idTemplat={templat.idTemplat}
                namaBerkas={templat.namaBerkas}
              />
            </li>
          ))}
        </ul>
      )}
    </KartuBagian>
  );
}
