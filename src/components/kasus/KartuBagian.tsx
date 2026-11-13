import type { ReactNode } from "react";
import type { Bagian } from "./bagian";

type Props = {
  bagian: Bagian;
  children: ReactNode;
};

export default function KartuBagian({ bagian, children }: Props) {
  const idJudul = `judul-${bagian.id}`;

  return (
    <section
      id={bagian.id}
      aria-labelledby={idJudul}
      className="scroll-mt-6 rounded-xl border border-line bg-surface-raised p-5 shadow-sm sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-brand font-semibold text-on-brand">
          {bagian.nomor}
        </span>
        <div>
          {bagian.pengantar && (
            <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
              {bagian.pengantar}
            </p>
          )}
          <h2 id={idJudul} className="text-xl font-semibold text-ink">
            {bagian.judul}
          </h2>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
