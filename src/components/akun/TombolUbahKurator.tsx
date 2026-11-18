"use client";

import { useRef, useState, useTransition } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { perbaruiKurator } from "@/lib/controllers/kontrolPengelolaanAkun";
import type { KuratorTerdaftar } from "@/lib/models/kurator";

function IkonPensil() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4z" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

/** Aksi "Ubah" pada I-08 untuk mengganti email Kurator (KF43). */
export default function TombolUbahKurator({
  kurator,
}: {
  kurator: KuratorTerdaftar;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState(kurator.email);
  const [galat, setGalat] = useState<string>();
  const [sedangMengirim, mulaiKirim] = useTransition();
  const tidakBerubah =
    email.trim().toLowerCase() === kurator.email.toLowerCase();

  function buka() {
    setEmail(kurator.email);
    setGalat(undefined);
    dialog.current?.showModal();
  }

  function simpan(e: React.FormEvent) {
    e.preventDefault();
    mulaiKirim(async () => {
      const hasil = await perbaruiKurator(kurator.idAkun, email);
      setGalat(hasil.galat);
      if (!hasil.galat) dialog.current?.close();
    });
  }

  return (
    <>
      <Button
        varian="ghost"
        ukuran="sm"
        ikonKiri={<IkonPensil />}
        onClick={buka}
        aria-label={`Ubah akun ${kurator.email}`}
      >
        Ubah
      </Button>

      <dialog
        ref={dialog}
        aria-labelledby={`judul-ubah-${kurator.idAkun}`}
        className="m-auto w-[calc(100%-2.5rem)] max-w-md rounded-xl p-5 text-ink shadow-md backdrop:bg-ink/40"
      >
        <form onSubmit={simpan} className="flex flex-col gap-4">
          <div>
            <h2
              id={`judul-ubah-${kurator.idAkun}`}
              className="text-lg font-semibold"
            >
              Ubah akun kurator
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Email baru berlaku saat kurator masuk berikutnya.
            </p>
          </div>
          <Input
            label="Email kurator"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            galat={galat}
          />
          <div className="flex justify-end gap-3">
            <Button varian="secondary" onClick={() => dialog.current?.close()}>
              Batal
            </Button>
            <Button type="submit" disabled={sedangMengirim || tidakBerubah}>
              {sedangMengirim ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </dialog>
    </>
  );
}
