"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import type { Artikel } from "@/lib/models/artikel";
import { IkonHapus, IkonTambah } from "./ikon";
import { JudulWajib, PesanGalat } from "./TandaIsian";
import useDaftarButir from "./useDaftarButir";

type DaftarArtikelProps = {
  id: string;
  daftarAwal: Artikel[];
  galat?: string;
};

const ARTIKEL_KOSONG: Artikel = { judul: "", tautanSumber: "" };

export default function DaftarArtikel({
  id,
  daftarAwal,
  galat,
}: DaftarArtikelProps) {
  const { wadah, daftar, pengumuman, tambah, hapus } = useDaftarButir(
    daftarAwal.length ? daftarAwal : [ARTIKEL_KOSONG],
    "Artikel",
  );

  return (
    <Card judul={<JudulWajib teks="Artikel pendukung" />}>
      <div
        ref={wadah}
        id={id}
        aria-describedby={galat ? `${id}-galat` : undefined}
        className="flex flex-col gap-4"
      >
        <PesanGalat id={`${id}-galat`} galat={galat} />
        {daftar.length === 0 ? (
          <p className="text-sm text-ink-muted">Belum ada artikel.</p>
        ) : (
          <ul className="flex flex-col gap-4">
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
                      Artikel {nomor}
                    </h4>
                    <Button
                      varian="ghost"
                      ukuran="ikon"
                      className="text-danger! hover:bg-danger-soft!"
                      aria-label={`Hapus artikel ${nomor}`}
                      onClick={() => hapus(indeks)}
                    >
                      <IkonHapus />
                    </Button>
                  </div>
                  <Input
                    label={`Judul artikel ${nomor}`}
                    name="artikelJudul"
                    defaultValue={isi.judul}
                  />
                  <Input
                    label={`Tautan sumber resmi ${nomor}`}
                    name="artikelTautan"
                    type="url"
                    placeholder="https://"
                    petunjuk="Gunakan sumber resmi seperti JDIH."
                    defaultValue={isi.tautanSumber}
                  />
                </li>
              );
            })}
          </ul>
        )}
        <Button
          varian="ghost"
          ukuran="sm"
          className="self-start"
          data-aksi="tambah"
          ikonKiri={<IkonTambah />}
          onClick={() => tambah(ARTIKEL_KOSONG)}
        >
          Tambah artikel
        </Button>
        <p aria-live="polite" className="sr-only">
          {pengumuman}
        </p>
      </div>
    </Card>
  );
}
