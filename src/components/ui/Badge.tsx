import type { HTMLAttributes, ReactNode } from "react";

/** Status konten mengikuti SKPL: Draft, Diajukan, Perlu Revisi, Disetujui. */
export type StatusKonten = "Draft" | "Diajukan" | "Perlu Revisi" | "Disetujui";

/** Peran pengguna yang punya layar panel. */
export type PeranPengguna = "Kurator" | "Administrator";

export type NadaBadge = "netral" | "info" | "sukses" | "peringatan" | "bahaya";

const GAYA_NADA: Record<NadaBadge, string> = {
  netral: "bg-surface-sunken text-ink",
  info: "bg-accent-soft text-link",
  sukses: "bg-success-soft text-success",
  peringatan: "bg-warning-soft text-warning",
  bahaya: "bg-danger-soft text-danger",
};

const NADA_STATUS: Record<StatusKonten, NadaBadge> = {
  Draft: "netral",
  Diajukan: "info",
  "Perlu Revisi": "peringatan",
  Disetujui: "sukses",
};

const NADA_PERAN: Record<PeranPengguna, NadaBadge> = {
  Kurator: "info",
  Administrator: "netral",
};

export type BadgeProps = {
  /** Warna lencana. Diabaikan bila status atau peran diisi. */
  nada?: NadaBadge;
  /** Menampilkan label status konten sekaligus warna yang sesuai. */
  status?: StatusKonten;
  /** Menampilkan label peran pengguna sekaligus warna yang sesuai. */
  peran?: PeranPengguna;
  children?: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export default function Badge({
  nada,
  status,
  peran,
  children,
  className = "",
  ...sisa
}: BadgeProps) {
  const nadaAkhir: NadaBadge = status
    ? NADA_STATUS[status]
    : peran
      ? NADA_PERAN[peran]
      : (nada ?? "netral");

  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold ${GAYA_NADA[nadaAkhir]} ${className}`}
      {...sisa}
    >
      {children ?? status ?? peran}
    </span>
  );
}
