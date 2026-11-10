import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  gabungGayaTombol,
  type UkuranTombol,
  type VarianTombol,
} from "./gayaTombol";

/**
 * Tombol yang berpindah halaman.
 * Memakai Link dari Next.js dengan varian dan ukuran yang sama seperti Button.
 */
export type TombolTautanProps = {
  /** Varian tampilan. Bawaan: primary. */
  varian?: VarianTombol;
  /** Ukuran. Pakai ikon untuk tautan tanpa teks, sertakan aria-label. */
  ukuran?: UkuranTombol;
  /** Ikon di kiri teks, misalnya ikon pensil atau unduh. */
  ikonKiri?: ReactNode;
  /** Ikon di kanan teks. */
  ikonKanan?: ReactNode;
  className?: string;
  children?: ReactNode;
} & Omit<LinkProps, "children"> &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof LinkProps | "className" | "children"
  >;

export default function TombolTautan({
  varian = "primary",
  ukuran = "md",
  ikonKiri,
  ikonKanan,
  className = "",
  children,
  ...sisa
}: TombolTautanProps) {
  return (
    <Link className={gabungGayaTombol({ varian, ukuran, className })} {...sisa}>
      {ikonKiri}
      {children}
      {ikonKanan}
    </Link>
  );
}
