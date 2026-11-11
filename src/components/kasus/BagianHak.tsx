import { BAGIAN } from "./bagian";
import { pecahParagraf } from "./format";
import { IkonPerisai } from "./ikon";
import KartuBagian from "./KartuBagian";

export default function BagianHak({ isi }: { isi: string }) {
  return (
    <KartuBagian bagian={BAGIAN.hak}>
      <ul className="flex flex-col gap-4">
        {pecahParagraf(isi).map((hak, indeks) => (
          <li
            key={indeks}
            className="flex flex-col gap-3 rounded-lg bg-surface p-4 sm:flex-row"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-success-soft text-success">
              <IkonPerisai className="size-5" />
            </span>
            <p className="text-ink sm:pt-2">{hak}</p>
          </li>
        ))}
      </ul>
    </KartuBagian>
  );
}
