import Link from "next/link";
import type { BidangTampil } from "@/lib/controllers/kontrolJelajahKasus";
import { IkonBidang, IkonPanahSerong } from "./ikon";

type Props = {
  bidang: BidangTampil;
  terpilih: boolean;
};

export default function KartuBidangHukum({ bidang, terpilih }: Props) {
  return (
    <Link
      href={`/?bidang=${bidang.idBidang}#daftar-situasi`}
      aria-current={terpilih ? "true" : undefined}
      className={`flex flex-col rounded-xl border bg-surface-raised p-4 shadow-sm transition-colors hover:bg-surface-raised-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5 ${
        terpilih ? "border-accent" : "border-line"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-pill bg-brand-soft text-brand">
          <IkonBidang nama={bidang.nama} className="size-6" />
        </span>
        <span className="flex size-8 items-center justify-center rounded-pill bg-surface text-ink">
          <IkonPanahSerong className="size-4" />
        </span>
      </div>
      <p className="mt-6 font-semibold text-ink">{bidang.nama}</p>
      <p className="mt-2 text-sm text-ink-muted">
        {bidang.jumlahKelompokKasus} situasi
      </p>
    </Link>
  );
}
