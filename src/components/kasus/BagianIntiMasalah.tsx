import { BAGIAN } from "./bagian";
import { pecahParagraf } from "./format";
import KartuBagian from "./KartuBagian";

export default function BagianIntiMasalah({ isi }: { isi: string }) {
  const [pembuka, ...lanjutan] = pecahParagraf(isi);

  return (
    <KartuBagian bagian={BAGIAN.intiMasalah}>
      <p className="text-lg text-ink">{pembuka}</p>
      {lanjutan.map((paragraf, indeks) => (
        <p key={indeks} className="mt-3 text-ink">
          {paragraf}
        </p>
      ))}
    </KartuBagian>
  );
}
