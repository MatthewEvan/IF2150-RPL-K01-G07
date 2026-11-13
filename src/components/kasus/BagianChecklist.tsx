import { BAGIAN } from "./bagian";
import { IkonDokumen } from "./ikon";
import KartuBagian from "./KartuBagian";

export default function BagianChecklist({
  daftarDokumen,
}: {
  daftarDokumen: string[];
}) {
  return (
    <KartuBagian bagian={BAGIAN.dokumen}>
      <p className="text-sm text-ink-muted">
        Siapkan {daftarDokumen.length} dokumen berikut sebelum mulai menjalankan
        langkah.
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {daftarDokumen.map((dokumen, indeks) => (
          <li key={indeks} className="flex items-start gap-3 text-ink">
            <IkonDokumen className="mt-0.5 size-5 shrink-0 text-ink-muted" />
            {dokumen}
          </li>
        ))}
      </ul>
    </KartuBagian>
  );
}
