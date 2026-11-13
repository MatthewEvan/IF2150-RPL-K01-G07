import Badge from "@/components/ui/Badge";
import type { LangkahTampil } from "@/lib/models/rangkumanKasus";
import { BAGIAN } from "./bagian";
import { IkonJam } from "./ikon";
import KartuBagian from "./KartuBagian";

/** Langkah bernomor beserta tujuan dan dokumennya (KF11), dan tenggat (KF12). */
export default function BagianLangkah({
  daftarLangkah,
}: {
  daftarLangkah: LangkahTampil[];
}) {
  return (
    <KartuBagian bagian={BAGIAN.langkah}>
      <ol className="flex flex-col gap-6">
        {daftarLangkah.map((langkah) => (
          <li key={langkah.nomor} className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-brand-soft font-semibold text-brand">
              {langkah.nomor}
            </span>
            <div className="min-w-0 pt-1.5">
              <p className="text-lg font-semibold text-ink">
                {langkah.deskripsi}
              </p>
              {langkah.tujuan && (
                <p className="mt-1 text-ink">{langkah.tujuan}</p>
              )}
              {langkah.dokumenDiperlukan.length > 0 && (
                <p className="mt-2 text-sm text-ink-muted">
                  Dokumen: {langkah.dokumenDiperlukan.join(", ")}
                </p>
              )}
              {langkah.tenggat && (
                <Badge nada="peringatan" className="mt-3 gap-1.5">
                  <IkonJam className="size-4" />
                  Tenggat: {langkah.tenggat}
                </Badge>
              )}
            </div>
          </li>
        ))}
      </ol>
    </KartuBagian>
  );
}
