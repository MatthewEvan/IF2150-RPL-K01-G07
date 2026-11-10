import Link from "next/link";
import type { BidangHukum } from "@/lib/controllers/kontrolPencarianKataKunci";
import { IkonBidang, IkonPanahKanan } from "./ikon";

type Props = {
  kataKunci: string;
  saranBidang: BidangHukum[];
};

/**
 * C15 HalamanPencarianKataKunci.tampilkanTidakDitemukan(saranBidang) pada DPPL.
 * Menampilkan pesan tidak ditemukan (I-03-08) dan daftar kartu saran bidang
 * hukum aktif (I-03-09) yang mengarahkan ke beranda dengan bidang terpilih (KF07).
 */
export default function TidakDitemukanPencarian({
  kataKunci,
  saranBidang,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 rounded-xl border border-line bg-surface-raised p-5 shadow-sm">
        <h2 className="text-lg font-bold text-ink">
          Situasi yang kamu cari belum tersedia.
        </h2>
        <p className="text-base text-ink-muted">
          Kami belum memiliki rangkuman situasi yang cocok dengan “{kataKunci}
          ”. Coba gunakan kata sehari-hari yang lebih umum, atau telusuri
          situasi hukum berdasarkan bidang di bawah ini.
        </p>
      </div>

      {saranBidang.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold tracking-wider text-brand uppercase">
            Telusuri bidang hukum lainnya
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {saranBidang.map((bidang) => (
              <li key={bidang.idBidang}>
                <Link
                  href={`/?bidang=${bidang.idBidang}#daftar-situasi`}
                  className="flex h-full flex-col justify-between gap-4 rounded-xl border border-line bg-surface-raised p-4 shadow-sm transition-colors hover:bg-surface-raised-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-brand-soft text-brand">
                      <IkonBidang nama={bidang.nama} className="size-5" />
                    </span>
                    <span className="font-semibold text-ink">
                      {bidang.nama}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-link">
                    <span>Jelajahi bidang</span>
                    <IkonPanahKanan className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
