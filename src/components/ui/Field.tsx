import type { ReactNode } from "react";

/**
 * Kerangka bersama untuk Input, Textarea, dan Select.
 * Menjaga label, petunjuk, dan pesan galat selalu tampil dengan urutan yang sama.
 */

type FieldProps = {
  id: string;
  label: string;
  wajib?: boolean;
  petunjuk?: string;
  galat?: string;
  children: ReactNode;
};

/** Kelas dasar kendali isian, tanpa nilai warna atau jarak manual. */
export function gayaKontrol(galat?: string) {
  return `w-full rounded-md border bg-surface-raised px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 focus:outline-2 focus:outline-offset-0 focus:outline-accent disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-ink-muted ${
    galat ? "border-danger" : "border-line"
  }`;
}

/** Id elemen yang menjelaskan kendali isian, dipakai untuk aria-describedby. */
export function idPenjelas(
  id: string,
  petunjuk?: string,
  galat?: string,
): string | undefined {
  if (galat) return `${id}-galat`;
  if (petunjuk) return `${id}-petunjuk`;
  return undefined;
}

export default function Field({
  id,
  label,
  wajib = false,
  petunjuk,
  galat,
  children,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {wajib && (
          <span className="ml-0.5 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {galat ? (
        <p id={`${id}-galat`} className="text-xs font-medium text-danger">
          {galat}
        </p>
      ) : petunjuk ? (
        <p id={`${id}-petunjuk`} className="text-xs text-ink-muted">
          {petunjuk}
        </p>
      ) : null}
    </div>
  );
}
