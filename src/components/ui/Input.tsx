"use client";

import { useId, type InputHTMLAttributes } from "react";
import Field, { gayaKontrol, idPenjelas } from "./Field";

export type InputProps = {
  label: string;
  /** Teks bantuan di bawah isian; disembunyikan bila ada galat. */
  petunjuk?: string;
  /** Pesan galat validasi; mengubah warna garis tepi dan menampilkan teks galat. */
  galat?: string;
  /** Menambahkan tanda bintang pada label. */
  wajib?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export default function Input({
  label,
  petunjuk,
  galat,
  wajib,
  id,
  ...sisa
}: InputProps) {
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
      <input
        id={idAkhir}
        aria-invalid={galat ? true : undefined}
        aria-describedby={idPenjelas(idAkhir, petunjuk, galat)}
        className={gayaKontrol(galat)}
        {...sisa}
      />
    </Field>
  );
}
