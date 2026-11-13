"use client";

import { useState, useTransition } from "react";
import Button from "@/components/ui/Button";
import { unduhTemplat } from "@/lib/controllers/kontrolUnduhTemplat";
import { IkonUnduh } from "./ikon";

type Props = {
  idTemplat: number;
  namaBerkas: string;
};

/**
 * Tombol unduh templat dokumen pada layar I-02 (I-02-09 pada DPPL).
 * Memanggil KontrolUnduhTemplat.unduhTemplat(idTemplat) (Algo-035) dan
 * menampilkan pesan galat bila berkas tidak tersedia (UC04, KF15, KF16).
 */
export default function TombolUnduhTemplat({ idTemplat, namaBerkas }: Props) {
  const [galat, setGalat] = useState<string | null>(null);
  const [sedangMengunduh, mulaiMengunduh] = useTransition();

  function klikTombolUnduh() {
    setGalat(null);
    mulaiMengunduh(async () => {
      const hasil = await unduhTemplat(idTemplat);
      if (!hasil.berhasil) {
        setGalat(hasil.galat);
        return;
      }

      const tautan = document.createElement("a");
      tautan.href = hasil.urlUnduh;
      tautan.download = hasil.namaBerkas;
      tautan.rel = "noopener";
      document.body.appendChild(tautan);
      tautan.click();
      tautan.remove();
    });
  }

  return (
    <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
      <Button
        varian="secondary"
        ukuran="sm"
        ikonKiri={<IkonUnduh className="size-4" />}
        onClick={klikTombolUnduh}
        disabled={sedangMengunduh}
        aria-label={`Unduh ${namaBerkas}`}
      >
        {sedangMengunduh ? "Mengunduh…" : "Unduh"}
      </Button>
      {galat && (
        <p role="alert" className="text-xs font-medium text-danger">
          {galat}
        </p>
      )}
    </div>
  );
}
