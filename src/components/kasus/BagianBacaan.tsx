import type { ReactNode } from "react";
import type { Artikel } from "@/lib/models/artikel";
import { BAGIAN } from "./bagian";
import { tautanAman } from "./format";
import { IkonTautanLuar } from "./ikon";
import KartuBagian from "./KartuBagian";

/** Artikel pendukung dengan tautan sumber hukum (KF18), diikuti direktori LBH. */
export default function BagianBacaan({
  daftarArtikel,
  children,
}: {
  daftarArtikel: Artikel[];
  children: ReactNode;
}) {
  return (
    <KartuBagian bagian={BAGIAN.bacaan}>
      <ul className="flex flex-col gap-5">
        {daftarArtikel.map((artikel) => {
          const url = tautanAman(artikel.tautanSumber);

          return (
            <li key={artikel.tautanSumber} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-pill bg-surface-sunken text-ink-muted">
                <IkonTautanLuar className="size-4" />
              </span>
              <div className="min-w-0">
                {url ? (
                  <a
                    href={url.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium break-words text-link underline underline-offset-2"
                  >
                    {artikel.judul}
                    <span className="sr-only"> (membuka tab baru)</span>
                  </a>
                ) : (
                  <p className="font-medium text-ink">{artikel.judul}</p>
                )}
                {url && (
                  <p className="mt-0.5 text-sm text-ink-muted">
                    {url.hostname}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {children}
    </KartuBagian>
  );
}
