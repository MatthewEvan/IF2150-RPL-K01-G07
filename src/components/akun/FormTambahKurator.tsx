"use client";

import { useActionState, useEffect, useRef } from "react";
import { daftarkanKurator } from "@/lib/controllers/kontrolPengelolaanAkun";

const GAYA_INPUT =
  "mt-2 h-12 w-full rounded-md border border-line-strong bg-surface-raised px-4 font-normal text-ink focus:outline-2 focus:outline-accent";

export default function FormTambahKurator() {
  const [hasil, jalankanAksi, sedangMengirim] = useActionState(
    daftarkanKurator,
    {},
  );
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (hasil.sukses) form.current?.reset();
  }, [hasil]);

  return (
    <form ref={form} action={jalankanAksi} className="mt-4 flex flex-col gap-4">
      {hasil.galat && (
        <p
          role="alert"
          className="rounded-md bg-danger-soft px-4 py-3 text-sm font-medium text-danger"
        >
          {hasil.galat}
        </p>
      )}
      {hasil.sukses && (
        <p
          role="status"
          className="rounded-md bg-success-soft px-4 py-3 text-sm font-medium break-words text-success"
        >
          {hasil.sukses}
        </p>
      )}
      <label className="text-sm font-medium">
        Email kurator
        <input
          type="email"
          name="email"
          required
          autoComplete="off"
          className={GAYA_INPUT}
        />
      </label>
      <label className="text-sm font-medium">
        Kata sandi awal
        <input
          type="password"
          name="kataSandi"
          required
          minLength={8}
          autoComplete="new-password"
          className={GAYA_INPUT}
        />
        <span className="mt-2 block font-normal text-ink-muted">
          Sampaikan langsung ke kurator yang bersangkutan.
        </span>
      </label>
      <button
        type="submit"
        disabled={sedangMengirim}
        className="h-11 rounded-pill bg-brand font-semibold text-on-brand hover:bg-brand-strong disabled:opacity-60"
      >
        {sedangMengirim ? "Memproses..." : "Daftarkan kurator"}
      </button>
    </form>
  );
}
