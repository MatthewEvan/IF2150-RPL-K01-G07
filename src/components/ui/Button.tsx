import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  gabungGayaTombol,
  type UkuranTombol,
  type VarianTombol,
} from "./gayaTombol";

export type { UkuranTombol, VarianTombol };

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
      className={gabungGayaTombol({ varian, ukuran, className })}
      {...sisa}
    >
      {ikonKiri}
      {children}
      {ikonKanan}
    </button>
  );
}
