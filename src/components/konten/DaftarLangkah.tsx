"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import type { LangkahPenyelesaian } from "@/lib/models/langkahPenyelesaian";
import { IkonHapus, IkonNaik, IkonTambah, IkonTurun } from "./ikon";
import { JudulWajib, PesanGalat } from "./TandaIsian";
import useDaftarButir from "./useDaftarButir";

type DaftarLangkahProps = {
  id: string;
  daftarAwal: LangkahPenyelesaian[];
  galat?: string;
};

const LANGKAH_KOSONG: LangkahPenyelesaian = {
  nomor: 0,
  deskripsi: "",
  tujuan: "",
  tenggat: null,
};

export default function DaftarLangkah({
  id,
  daftarAwal,
  galat,
}: DaftarLangkahProps) {
  const { wadah, daftar, pengumuman, tambah, hapus, pindahkan } =
    useDaftarButir(
      daftarAwal.length ? daftarAwal : [LANGKAH_KOSONG],
      "Langkah",
    );

  return (
    <Card judul={<JudulWajib teks="Langkah penyelesaian" />}>
      <div
        ref={wadah}
        id={id}
        aria-describedby={galat ? `${id}-galat` : undefined}
        className="flex flex-col gap-4"
      >
        <PesanGalat id={`${id}-galat`} galat={galat} />
        <ol className="flex flex-col gap-4">
          {daftar.map(({ kunci, isi }, indeks) => {
            const nomor = indeks + 1;
            return (
              <li
                key={kunci}
                data-kunci={kunci}
                className="flex flex-col gap-4 rounded-lg border border-line p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-ink">
                    Langkah {nomor}
                  </h4>
                  <div
                    role="group"
                    aria-label={`Atur langkah ${nomor}`}
                    className="flex gap-1"
                  >
                    <Button
                      varian="ghost"
                      ukuran="ikon"
                      data-aksi="naik"
                      aria-label={`Naikkan langkah ${nomor}`}
                      disabled={indeks === 0}
                      onClick={() => pindahkan(indeks, -1)}
                    >
                      <IkonNaik />
                    </Button>
                    <Button
                      varian="ghost"
                      ukuran="ikon"
                      data-aksi="turun"
                      aria-label={`Turunkan langkah ${nomor}`}
                      disabled={indeks === daftar.length - 1}
                      onClick={() => pindahkan(indeks, 1)}
                    >
                      <IkonTurun />
                    </Button>
                    <Button
                      varian="ghost"
                      ukuran="ikon"
                      className="text-danger! hover:bg-danger-soft!"
                      aria-label={`Hapus langkah ${nomor}`}
                      disabled={daftar.length === 1}
                      onClick={() => hapus(indeks)}
                    >
                      <IkonHapus />
                    </Button>
                  </div>
                </div>
                <Input
                  label={`Isi langkah ${nomor}`}
                  name="langkahDeskripsi"
                  wajib
                  defaultValue={isi.deskripsi}
                />
                <Input
                  label={`Keterangan langkah ${nomor} (opsional)`}
                  name="langkahTujuan"
                  petunjuk="Satu kalimat tentang tujuan langkah ini."
                  defaultValue={isi.tujuan}
                />
                <Input
                  label={`Tenggat langkah ${nomor} (opsional)`}
                  name="langkahTenggat"
                  petunjuk="Contoh: 7 hari kerja setelah surat PHK diterima."
                  defaultValue={isi.tenggat ?? ""}
                />
              </li>
            );
          })}
        </ol>
        <Button
          varian="ghost"
          ukuran="sm"
          className="self-start"
          data-aksi="tambah"
          ikonKiri={<IkonTambah />}
          onClick={() => tambah(LANGKAH_KOSONG)}
        >
          Tambah langkah
        </Button>
        <p aria-live="polite" className="sr-only">
          {pengumuman}
        </p>
      </div>
    </Card>
  );
}
