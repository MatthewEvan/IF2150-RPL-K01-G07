"use client";

import { useActionState } from "react";

export type HasilLogin = { galat?: string };

type FormLoginProps = {
  aksi: (hasil: HasilLogin, data: FormData) => Promise<HasilLogin>;
  /** Pesan dari luar formulir, misalnya saat sesi berakhir. */
  pesanAwal?: string;
};

const GAYA_INPUT =
  "mt-2 h-12 w-full rounded-md border border-line-strong bg-surface-raised px-4 text-ink focus:outline-2 focus:outline-accent";

export default function FormLogin({ aksi, pesanAwal }: FormLoginProps) {
  const [hasil, jalankanAksi, sedangMengirim] = useActionState(aksi, {});
  const pesanGalat = hasil.galat ?? pesanAwal;

  return (
    <form action={jalankanAksi} className="mt-4 flex flex-col gap-4">
      {pesanGalat && (
        <p
          role="alert"
          className="rounded-md bg-danger-soft px-4 py-3 text-sm font-medium text-danger"
        >
          {pesanGalat}
        </p>
      )}
      <label className="text-sm font-medium">
        Email
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={GAYA_INPUT}
        />
      </label>
      <label className="text-sm font-medium">
        Kata sandi
        <input
          type="password"
          name="kataSandi"
          required
          autoComplete="current-password"
          className={GAYA_INPUT}
        />
      </label>
      <button
        type="submit"
        disabled={sedangMengirim}
        className="h-14 rounded-pill bg-brand font-semibold text-on-brand hover:bg-brand-strong disabled:opacity-60"
      >
        {sedangMengirim ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
