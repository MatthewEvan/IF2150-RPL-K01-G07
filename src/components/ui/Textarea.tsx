"use client";

import { useId, type TextareaHTMLAttributes } from "react";
import Field, { gayaKontrol, idPenjelas } from "./Field";

export type TextareaProps = {
  label: string;
  /** Teks bantuan di bawah isian; disembunyikan bila ada galat. */
  petunjuk?: string;
  /** Pesan galat validasi; mengubah warna garis tepi dan menampilkan teks galat. */
  galat?: string;
  /** Menambahkan tanda bintang pada label. */
  wajib?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

export default function Textarea({
  label,
  petunjuk,
  galat,
  wajib,
  id,
  rows = 4,
  ...sisa
}: TextareaProps) {
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
      <textarea
        id={idAkhir}
        rows={rows}
        aria-invalid={galat ? true : undefined}
        aria-describedby={idPenjelas(idAkhir, petunjuk, galat)}
        className={gayaKontrol(galat)}
        {...sisa}
      />
    </Field>
  );
}
