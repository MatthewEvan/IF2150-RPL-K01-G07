/**
 * Satu sumber kelas gaya untuk semua tombol.
 * Dipakai bersama oleh Button (aksi di halaman) dan TombolTautan (aksi pindah halaman).
 */

export type VarianTombol = "primary" | "secondary" | "danger" | "ghost";
export type UkuranTombol = "md" | "sm" | "ikon";

/** Kelas yang selalu ada, apa pun varian dan ukurannya. */
export const GAYA_DASAR =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60";

const GAYA_VARIAN: Record<VarianTombol, string> = {
  primary: "bg-brand text-on-brand hover:bg-brand-strong",
  secondary:
    "border border-line-strong bg-surface-raised text-brand hover:bg-surface-raised-hover",
  danger: "bg-danger text-on-brand hover:bg-danger/90",
  ghost: "text-brand hover:bg-brand-soft",
};

const GAYA_UKURAN: Record<UkuranTombol, string> = {
  md: "px-6 py-2.5 text-sm",
  sm: "px-4 py-1.5 text-xs",
  ikon: "size-11 p-0 text-sm",
};

/** Menggabungkan kelas dasar, varian, ukuran, dan kelas tambahan pemanggil. */
export function gabungGayaTombol({
  varian = "primary",
  ukuran = "md",
  className = "",
}: {
  varian?: VarianTombol;
  ukuran?: UkuranTombol;
  className?: string;
} = {}) {
  return `${GAYA_DASAR} ${GAYA_VARIAN[varian]} ${GAYA_UKURAN[ukuran]} ${className}`.trim();
}
