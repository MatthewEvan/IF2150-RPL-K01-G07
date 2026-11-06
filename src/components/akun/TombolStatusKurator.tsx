"use client";

import { useRef, useState, useTransition } from "react";
import { ubahStatusKurator } from "@/lib/controllers/kontrolPengelolaanAkun";
import type { KuratorTerdaftar } from "@/lib/models/kurator";

export default function TombolStatusKurator({
  kurator,
}: {
  kurator: KuratorTerdaftar;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [galat, setGalat] = useState<string>();
  const [sedangMengirim, mulaiKirim] = useTransition();
  const { idAkun, email, statusAktif } = kurator;
  const label = statusAktif ? "Nonaktifkan" : "Aktifkan";

  function konfirmasi() {
    mulaiKirim(async () => {
      const hasil = await ubahStatusKurator(idAkun, !statusAktif);
      setGalat(hasil.galat);
      dialog.current?.close();
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className={`rounded-pill border px-5 py-2 text-sm font-semibold ${
          statusAktif
            ? "border-danger text-danger hover:bg-danger-soft"
            : "border-line-strong text-brand hover:bg-surface-raised-hover"
        }`}
      >
        {label}
      </button>
      {galat && (
        <p role="alert" className="mt-2 text-sm text-danger">
          {galat}
        </p>
      )}

      <dialog
        ref={dialog}
        aria-labelledby={`judul-${idAkun}`}
        className="m-auto w-[calc(100%-2.5rem)] max-w-md rounded-xl p-5 text-ink shadow-md backdrop:bg-ink/40"
      >
        <h2 id={`judul-${idAkun}`} className="text-lg font-semibold">
          {label} akun kurator?
        </h2>
        <p className="mt-2 break-words text-ink-muted">
          {statusAktif
            ? `Sesi ${email} akan berakhir dan akun ini tidak bisa masuk lagi. Kontennya tetap tersimpan.`
            : `${email} akan bisa masuk kembali ke panel kurator.`}
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={() => dialog.current?.close()}
            className="rounded-pill border border-line-strong px-5 py-2 text-sm font-semibold text-brand"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={sedangMengirim}
            onClick={konfirmasi}
            className={`rounded-pill px-5 py-2 text-sm font-semibold text-on-brand disabled:opacity-60 ${
              statusAktif ? "bg-danger" : "bg-brand"
            }`}
          >
            {sedangMengirim ? "Memproses..." : label}
          </button>
        </div>
      </dialog>
    </>
  );
}
