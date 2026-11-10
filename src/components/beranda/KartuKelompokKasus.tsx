import Link from "next/link";
import { cekDarurat } from "@/lib/controllers/kontrolJelajahKasus";
import type { KelompokKasus } from "@/lib/models/kelompokKasus";
import { GAYA_KARTU_KELOMPOK } from "./gayaKartu";
import KartuKelompokDarurat from "./KartuKelompokDarurat";
import { IkonBidang, IkonPanahKanan } from "./ikon";

type Props = {
  kelompok: KelompokKasus;
  namaBidang: string;
};

export default async function KartuKelompokKasus({
  kelompok,
  namaBidang,
}: Props) {
  if (await cekDarurat(kelompok.idKelompok)) {
    return <KartuKelompokDarurat kelompok={kelompok} namaBidang={namaBidang} />;
  }

  return (
    <Link
      href={`/kasus/${kelompok.idKelompok}`}
      className={GAYA_KARTU_KELOMPOK}
    >
      <span className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-pill bg-brand-soft text-brand">
          <IkonBidang nama={namaBidang} className="size-5" />
        </span>
        <span className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
          {namaBidang}
        </span>
      </span>
      <span className="mt-4 text-lg font-semibold text-ink">
        {kelompok.judulUmum}
      </span>
      <span className="mt-2 flex-1 text-ink-muted">
        Istilah hukum: {kelompok.istilahResmi}.
      </span>
      <span className="mt-4 inline-flex items-center gap-2 font-semibold text-link">
        Lihat langkahnya
        <IkonPanahKanan className="size-4" />
      </span>
    </Link>
  );
}
