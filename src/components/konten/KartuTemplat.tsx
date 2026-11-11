"use client";

import { useRef, useState, useTransition } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type {
  HasilHapusTemplat,
  HasilLampirkanTemplat,
} from "@/lib/controllers/kontrolPenyusunanKonten";
import {
  validasiUnggahan,
  type TemplatDokumen,
} from "@/lib/models/templatDokumen";

type KartuTemplatProps = {
  daftarTemplat: TemplatDokumen[];
  aksiLampirkan?: (data: FormData) => Promise<HasilLampirkanTemplat>;
  aksiHapus?: (idTemplat: number) => Promise<HasilHapusTemplat>;
};

const GALAT_UNGGAH =
  "Berkas harus berformat PDF atau DOCX dan berukuran paling besar 5 MB.";

function formatUkuran(byte: number) {
  if (byte < 1024 * 1024) {
    return `${Math.max(1, Math.round(byte / 1024))} KB`;
  }
  return `${(byte / (1024 * 1024)).toLocaleString("id-ID", {
    maximumFractionDigits: 1,
  })} MB`;
}

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function KartuTemplat({
  daftarTemplat,
  aksiLampirkan,
  aksiHapus,
}: KartuTemplatProps) {
  const inputBerkas = useRef<HTMLInputElement>(null);
  const [daftar, setDaftar] = useState(daftarTemplat);
  const [adaBerkas, setAdaBerkas] = useState(false);
  const [galat, setGalat] = useState<string>();
  const [pesanBerhasil, setPesanBerhasil] = useState<string>();
  const [idDikonfirmasi, setIdDikonfirmasi] = useState<number | null>(null);
  const [sedangMengunggah, mulaiMengunggah] = useTransition();
  const [sedangMenghapus, mulaiMenghapus] = useTransition();

  function bersihkanPesan() {
    setGalat(undefined);
    setPesanBerhasil(undefined);
  }

  function pilihBerkas() {
    setAdaBerkas(Boolean(inputBerkas.current?.files?.length));
    bersihkanPesan();
  }

  function unggah() {
    const berkas = inputBerkas.current?.files?.[0];
    if (!berkas || !aksiLampirkan) return;
    if (!validasiUnggahan(berkas)) {
      setGalat(GALAT_UNGGAH);
      return;
    }

    const data = new FormData();
    data.append("templat", berkas);
    mulaiMengunggah(async () => {
      const hasil = await aksiLampirkan(data);
      if (!hasil.berhasil) {
        setGalat(hasil.galat);
        return;
      }
      setDaftar((sebelumnya) => [
        ...sebelumnya.filter(
          (templat) => templat.idTemplat !== hasil.templat.idTemplat,
        ),
        hasil.templat,
      ]);
      setPesanBerhasil(
        `${hasil.templat.namaBerkas} tersimpan sebagai versi ${hasil.templat.versi}.`,
      );
      if (inputBerkas.current) inputBerkas.current.value = "";
      setAdaBerkas(false);
    });
  }

  function mintaKonfirmasi(idTemplat: number) {
    bersihkanPesan();
    setIdDikonfirmasi(idTemplat);
  }

  function hapus(templat: TemplatDokumen) {
    if (!aksiHapus) return;
    mulaiMenghapus(async () => {
      const hasil = await aksiHapus(templat.idTemplat);
      setIdDikonfirmasi(null);
      if (!hasil.berhasil) {
        setGalat(hasil.galat);
        return;
      }
      setDaftar((sebelumnya) =>
        sebelumnya.filter((item) => item.idTemplat !== templat.idTemplat),
      );
      setPesanBerhasil(`${templat.namaBerkas} dihapus.`);
    });
  }

  return (
    <Card judul="Templat surat">
      <div className="flex flex-col gap-4">
        {daftar.length === 0 ? (
          <p className="text-sm text-ink-muted">Belum ada templat.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {daftar.map((templat) => (
              <li
                key={templat.idTemplat}
                className="flex flex-col gap-3 rounded-lg border border-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                {idDikonfirmasi === templat.idTemplat ? (
                  <>
                    <p className="text-sm break-all text-ink">
                      Hapus{" "}
                      <span className="font-semibold">
                        {templat.namaBerkas}
                      </span>
                      ?
                    </p>
                    <div className="flex shrink-0 gap-2">
                      <Button
                        varian="danger"
                        ukuran="sm"
                        onClick={() => hapus(templat)}
                        disabled={sedangMenghapus}
                      >
                        {sedangMenghapus ? "Menghapus…" : "Ya, hapus"}
                      </Button>
                      <Button
                        varian="ghost"
                        ukuran="sm"
                        onClick={() => setIdDikonfirmasi(null)}
                        disabled={sedangMenghapus}
                      >
                        Batal
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold break-all text-ink">
                        {templat.namaBerkas}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {templat.format} · {formatUkuran(templat.ukuran)} ·
                        versi {templat.versi} ·{" "}
                        {formatTanggal(templat.tanggalPembaruan)}
                      </p>
                    </div>
                    <Button
                      varian="ghost"
                      ukuran="sm"
                      className="shrink-0 self-start text-danger! hover:bg-danger-soft! sm:self-auto"
                      onClick={() => mintaKonfirmasi(templat.idTemplat)}
                      disabled={
                        !aksiHapus || sedangMenghapus || sedangMengunggah
                      }
                      aria-label={`Hapus ${templat.namaBerkas}`}
                    >
                      Hapus
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="templat" className="text-sm font-semibold text-ink">
            Berkas templat
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              ref={inputBerkas}
              id="templat"
              type="file"
              accept=".pdf,.docx"
              onChange={pilihBerkas}
              aria-describedby="templat-petunjuk"
              aria-invalid={galat ? true : undefined}
              className="min-w-0 text-sm text-ink-muted file:mr-4 file:rounded-pill file:border file:border-line-strong file:bg-surface-raised file:px-4 file:py-2 file:font-semibold file:text-brand hover:file:bg-surface-raised-hover"
            />
            <Button
              type="button"
              varian="secondary"
              ukuran="sm"
              className="self-start sm:self-auto"
              onClick={unggah}
              disabled={
                !aksiLampirkan ||
                !adaBerkas ||
                sedangMengunggah ||
                sedangMenghapus
              }
            >
              {sedangMengunggah ? "Mengunggah…" : "Unggah"}
            </Button>
          </div>
          <p id="templat-petunjuk" className="text-xs text-ink-muted">
            PDF atau DOCX, paling besar 5 MB. Berkas dengan nama yang sama
            menggantikan versi sebelumnya.
          </p>
          {galat ? (
            <p role="alert" className="text-sm font-medium text-danger">
              {galat}
            </p>
          ) : null}
          {pesanBerhasil ? (
            <p aria-live="polite" className="text-sm font-medium text-success">
              {pesanBerhasil}
            </p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
