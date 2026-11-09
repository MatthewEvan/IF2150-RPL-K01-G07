"use client";

import { useId, type SelectHTMLAttributes } from "react";
import Field, { gayaKontrol, idPenjelas } from "./Field";

export type SelectProps = {
  label: string;
  /** Teks bantuan di bawah isian; disembunyikan bila ada galat. */
  petunjuk?: string;
  /** Pesan galat validasi; mengubah warna garis tepi dan menampilkan teks galat. */
  galat?: string;
  /** Menambahkan tanda bintang pada label. */
  wajib?: boolean;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className">;

export default function Select({
  label,
  petunjuk,
  galat,
  wajib,
  id,
  children,
  ...sisa
}: SelectProps) {
  const idOtomatis = useId();
  const idAkhir = id ?? idOtomatis;

  return (
    <Field
      id={idAkhir}
      label={label}
      wajib={wajib}
      petunjuk={petunjuk}
      galat={galat}
    >
      <div className="relative">
        <select
          id={idAkhir}
          aria-invalid={galat ? true : undefined}
          aria-describedby={idPenjelas(idAkhir, petunjuk, galat)}
          className={`${gayaKontrol(galat)} appearance-none pr-10`}
          {...sisa}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-muted"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </Field>
  );
}
