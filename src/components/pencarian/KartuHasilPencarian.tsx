import Link from "next/link";
import type { HasilPencarianKasus } from "@/lib/controllers/kontrolPencarianKataKunci";
import { IkonBidang, IkonPanahKanan } from "./ikon";

type Props = {
  hasil: HasilPencarianKasus;
};

/**
 * Kartu hasil pencarian pada layar I-03 (I-03-07 pada DPPL).
 * Mengarahkan klik pengguna ke halaman rangkuman kasus (/kasus/[id]).
 */
export default function KartuHasilPencarian({ hasil }: Props) {
  const ringkasan = hasil.intiMasalah.trim();
  const deskripsi = ringkasan
    ? `${ringkasan.endsWith(".") ? ringkasan : `${ringkasan}.`} Istilah hukum: ${hasil.istilahResmi}.`
    : `Istilah hukum: ${hasil.istilahResmi}.`;

  return (
    <Link
      href={`/kasus/${hasil.idKelompok}`}
      className="flex w-full flex-col items-start gap-3 rounded-xl bg-surface-raised p-5 text-left shadow-sm transition-colors hover:bg-surface-raised-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-brand-soft text-brand">
          <IkonBidang nama={hasil.namaBidang} className="size-5" />
        </span>
        <span className="text-xs font-bold tracking-wider text-ink-muted uppercase">
          {hasil.namaBidang}
        </span>
      </span>

      <span className="text-lg font-bold text-ink">{hasil.judulUmum}</span>

      <span className="text-base text-ink-muted">{deskripsi}</span>

      <span className="inline-flex items-center gap-2 text-base font-semibold text-link">
        <span>Lihat langkahnya</span>
        <IkonPanahKanan className="size-5" />
      </span>
    </Link>
  );
}
