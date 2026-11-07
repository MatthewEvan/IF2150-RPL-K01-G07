import type { ButtonHTMLAttributes, ReactNode } from "react";

export type VarianTombol = "primary" | "secondary" | "danger" | "ghost";
export type UkuranTombol = "md" | "sm" | "ikon";

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

export type ButtonProps = {
  /** Varian tampilan tombol. Bawaan: primary. */
  varian?: VarianTombol;
  /** Ukuran tombol. Pakai ikon untuk tombol tanpa teks, sertakan aria-label. */
  ukuran?: UkuranTombol;
  /** Ikon di kiri teks, misalnya ikon pensil atau unduh. */
  ikonKiri?: ReactNode;
  /** Ikon di kanan teks. */
  ikonKanan?: ReactNode;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  varian = "primary",
  ukuran = "md",
  ikonKiri,
  ikonKanan,
  className = "",
  type = "button",
  children,
  ...sisa
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 ${GAYA_VARIAN[varian]} ${GAYA_UKURAN[ukuran]} ${className}`}
      {...sisa}
    >
      {ikonKiri}
      {children}
      {ikonKanan}
    </button>
  );
}
