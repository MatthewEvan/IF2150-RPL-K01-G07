"use client";

import { useRef } from "react";
import TombolTautan from "@/components/ui/TombolTautan";
import { gabungGayaTombol } from "@/components/ui/gayaTombol";
import type { KelompokKasus } from "@/lib/models/kelompokKasus";
import { GAYA_KARTU_KELOMPOK } from "./gayaKartu";
import { IkonPanahKanan, IkonTelepon } from "./ikon";

type Props = {
  kelompok: KelompokKasus;
  namaBidang: string;
};

/** Situasi darurat menampilkan nomor darurat dulu sebelum rangkuman dibuka. */
export default function KartuKelompokDarurat({ kelompok, namaBidang }: Props) {
  const popup = useRef<HTMLDialogElement>(null);
  const idJudul = `peringatan-darurat-${kelompok.idKelompok}`;

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => popup.current?.showModal()}
        className={GAYA_KARTU_KELOMPOK}
      >
        <span className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-pill bg-warning-soft text-warning">
            <IkonTelepon className="size-5" />
          </span>
          <span className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
            {namaBidang} · Darurat
          </span>
        </span>
        <span className="mt-4 text-lg font-semibold text-ink">
          {kelompok.judulUmum}
        </span>
        <span className="mt-2 flex-1 text-ink-muted">
          Utamakan keselamatanmu. Ada nomor darurat sebelum rangkuman dibuka.
        </span>
        <span className="mt-4 inline-flex items-center gap-2 font-semibold text-link">
          Lihat bantuan
          <IkonPanahKanan className="size-4" />
        </span>
      </button>

      <dialog
        ref={popup}
        aria-labelledby={idJudul}
        className="m-auto w-full max-w-lg bg-transparent p-5 backdrop:bg-ink/50"
      >
        <div className="rounded-xl bg-surface-raised p-6 shadow-md">
          <span className="flex size-12 items-center justify-center rounded-pill bg-warning-soft text-warning">
            <IkonTelepon className="size-6" />
          </span>
          <h2 id={idJudul} className="mt-5 text-2xl font-semibold text-ink">
            Kalau kamu sedang terancam, cari bantuan sekarang
          </h2>
          <p className="mt-3 text-ink">
            Keselamatanmu lebih penting dari urusan lain. Hubungi kepolisian
            atau layanan darurat, lalu baca rangkuman ini setelah kamu aman.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="tel:112"
              className={gabungGayaTombol({ className: "w-full" })}
            >
              <IkonTelepon className="size-5" />
              Telepon 112
            </a>
            <a
              href="tel:110"
              className={gabungGayaTombol({
                varian: "secondary",
                className: "w-full",
              })}
            >
              <IkonTelepon className="size-5" />
              Telepon polisi 110
            </a>
            <TombolTautan
              href={`/kasus/${kelompok.idKelompok}`}
              varian="ghost"
              className="w-full text-link"
            >
              Tutup dan lanjut membaca
            </TombolTautan>
          </div>
        </div>
      </dialog>
    </>
  );
}
