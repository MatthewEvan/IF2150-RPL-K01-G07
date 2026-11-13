import Callout from "@/components/ui/Callout";
import { BAGIAN } from "./bagian";
import { pecahParagraf } from "./format";
import KartuBagian from "./KartuBagian";

/** Perkiraan waktu dan saran kapan mencari pendamping (KF09). */
export default function BagianPertimbangan({ isi }: { isi: string }) {
  return (
    <KartuBagian bagian={BAGIAN.pertimbangan}>
      <Callout jenis="peringatan" judul="Hal yang perlu kamu pertimbangkan">
        {pecahParagraf(isi).map((paragraf, indeks) => (
          <p key={indeks} className="mt-1 text-base">
            {paragraf}
          </p>
        ))}
      </Callout>
    </KartuBagian>
  );
}
