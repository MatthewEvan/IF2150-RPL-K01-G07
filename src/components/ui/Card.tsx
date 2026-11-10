import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = {
  /** Judul kartu, ditampilkan sebaris dengan aksi. */
  judul?: ReactNode;
  /** Konten di kanan judul, misalnya tombol atau lencana. */
  aksi?: ReactNode;
  /** Memakai padding lebih rapat untuk daftar atau panel samping. */
  padat?: boolean;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Card({
  judul,
  aksi,
  padat = false,
  children,
  className = "",
  ...sisa
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-line bg-surface-raised shadow-sm ${
        padat ? "p-4" : "p-6"
      } ${className}`}
      {...sisa}
    >
      {(judul || aksi) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          {judul && <h3 className="text-lg font-semibold text-ink">{judul}</h3>}
          {aksi && <div className="shrink-0">{aksi}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
