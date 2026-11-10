"use client";

import { useState, useTransition, type FormEvent } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { bisaDisunting } from "@/lib/controllers/aturanPenyusunanKonten";
import {
  buatDraf,
  type HasilSimpanDraf,
} from "@/lib/controllers/kontrolPenyusunanKonten";
import type { PilihanKelompok } from "@/lib/models/kelompokKasus";
import type { RangkumanKasus } from "@/lib/models/rangkumanKasus";
import useJagaSesi from "@/components/panel/useJagaSesi";
import PanelStatusKonten from "./PanelStatusKonten";

type FormulirKontenProps = {
  daftarKelompok: PilihanKelompok[];
  rangkuman?: RangkumanKasus;
  aksiSimpan?: (data: FormData) => Promise<HasilSimpanDraf>;
};

const LANGKAH_KOSONG = [{ nomor: 1, deskripsi: "", tujuan: "", tenggat: null }];
const ARTIKEL_KOSONG = [{ judul: "", tautanSumber: "" }];

function formatJam(iso: string) {
  return new Date(iso).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FormulirKonten({
  daftarKelompok,
  rangkuman,
  aksiSimpan,
}: FormulirKontenProps) {
  const [idKelompok, setIdKelompok] = useState(
    rangkuman ? String(rangkuman.idKelompok) : "",
  );
  const [hasil, setHasil] = useState<HasilSimpanDraf | null>(null);
  const [galatBuat, setGalatBuat] = useState<string>();
  const [sedangMembuat, mulaiMembuat] = useTransition();
  const [sedangMenyimpan, mulaiMenyimpan] = useTransition();
  const jagaSesi = useJagaSesi();

  const kelompokTerpilih = daftarKelompok.find(
    (kelompok) => String(kelompok.idKelompok) === idKelompok,
  );
  const status = rangkuman?.status ?? "Draft";
  const bisaDiubah = rangkuman ? bisaDisunting(status) : false;
  const daftarLangkah = rangkuman?.daftarLangkah.length
    ? rangkuman.daftarLangkah
    : LANGKAH_KOSONG;
  const daftarArtikel = rangkuman?.daftarArtikel.length
    ? rangkuman.daftarArtikel
    : ARTIKEL_KOSONG;

  let keterangan = "Pilih kelompok kasus untuk mulai menyusun draf";
  if (rangkuman && !bisaDiubah) {
    keterangan = `Konten berstatus ${status} tidak bisa diubah`;
  } else if (hasil?.berhasil) {
    keterangan = `Disimpan pukul ${formatJam(hasil.waktuSimpan)}`;
  } else if (rangkuman) {
    keterangan = "Draf tersimpan";
  }

  function pilihKelompok(nilai: string) {
    setIdKelompok(nilai);
    if (rangkuman || !nilai) return;
    setGalatBuat(undefined);
    mulaiMembuat(async () => {
      const hasilBuat = await buatDraf(Number(nilai));
      if (hasilBuat) setGalatBuat(hasilBuat.galat);
    });
  }

  function simpan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!aksiSimpan || !bisaDiubah) return;
    const data = new FormData(event.currentTarget);
    data.delete("templat");
    mulaiMenyimpan(async () => {
      setHasil(await aksiSimpan(data));
    });
  }

  return (
    <form onSubmit={simpan} onInput={jagaSesi} className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
          Penyusunan konten
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">
          {rangkuman?.judulUmum ?? kelompokTerpilih?.judulUmum ?? "Konten baru"}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Badge status={status} />
          <p className="text-sm text-ink-muted" aria-live="polite">
            {keterangan} · urutan isian mengikuti halaman rangkuman
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="flex flex-col gap-4">
          <Card judul="Kasus">
            <Select
              label="Kelompok kasus"
              name="idKelompok"
              wajib
              value={idKelompok}
              onChange={(event) => pilihKelompok(event.target.value)}
              disabled={Boolean(rangkuman) || sedangMembuat}
              petunjuk={
                rangkuman
                  ? "Kelompok kasus tidak bisa diganti setelah draf dibuat."
                  : sedangMembuat
                    ? "Membuat draf…"
                    : undefined
              }
              galat={galatBuat}
            >
              <option value="" disabled>
                Pilih kelompok kasus
              </option>
              {daftarKelompok.map((kelompok) => (
                <option key={kelompok.idKelompok} value={kelompok.idKelompok}>
                  {kelompok.namaBidang} · {kelompok.judulUmum}
                </option>
              ))}
            </Select>
          </Card>

          <fieldset
            disabled={!bisaDiubah}
            className="flex min-w-0 flex-col gap-4"
          >
            <Card judul="Isi rangkuman">
              <div className="flex flex-col gap-5">
                <Textarea
                  label="Inti masalah"
                  name="intiMasalah"
                  petunjuk="2–3 paragraf dengan bahasa sehari-hari."
                  wajib
                  defaultValue={rangkuman?.intiMasalah}
                />
                <Textarea
                  label="Hak kamu"
                  name="hak"
                  petunjuk="Satu hak per baris, sertakan dasar hukumnya."
                  wajib
                  defaultValue={rangkuman?.hak}
                />
                <Textarea
                  label="Poin pertimbangan"
                  name="poinPertimbangan"
                  petunjuk="Perkiraan waktu dan kapan perlu pendamping profesional."
                  wajib
                  rows={3}
                  defaultValue={rangkuman?.poinPertimbangan}
                />
              </div>
            </Card>

            <Card judul="Langkah penyelesaian">
              <div className="flex flex-col gap-5">
                {daftarLangkah.map((langkah) => (
                  <div key={langkah.nomor} className="flex flex-col gap-5">
                    <Input
                      label={`Langkah ${langkah.nomor}`}
                      name="langkahDeskripsi"
                      wajib
                      defaultValue={langkah.deskripsi}
                    />
                    <Input
                      label={`Keterangan langkah ${langkah.nomor} (opsional)`}
                      name="langkahTujuan"
                      petunjuk="Satu kalimat tentang tujuan langkah ini."
                      defaultValue={langkah.tujuan}
                    />
                    <Input
                      label={`Tenggat langkah ${langkah.nomor} (opsional)`}
                      name="langkahTenggat"
                      petunjuk="Contoh: 7 hari kerja setelah surat PHK diterima."
                      defaultValue={langkah.tenggat ?? ""}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  varian="ghost"
                  ukuran="sm"
                  className="self-start"
                >
                  Tambah langkah
                </Button>
              </div>
            </Card>

            <Card judul="Daftar periksa dokumen">
              <Textarea
                label="Dokumen yang perlu disiapkan"
                name="checklist"
                petunjuk="Satu dokumen per baris."
                wajib
                defaultValue={rangkuman?.daftarDokumen.join("\n")}
              />
            </Card>

            <Card judul="Templat surat">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="templat"
                  className="text-sm font-semibold text-ink"
                >
                  Berkas templat
                </label>
                <input
                  id="templat"
                  type="file"
                  name="templat"
                  accept=".pdf,.docx"
                  aria-describedby="templat-petunjuk"
                  className="text-sm text-ink-muted file:mr-4 file:rounded-pill file:border file:border-line-strong file:bg-surface-raised file:px-4 file:py-2 file:font-semibold file:text-brand hover:file:bg-surface-raised-hover"
                />
                <p id="templat-petunjuk" className="text-xs text-ink-muted">
                  PDF atau DOCX, paling besar 5 MB. Versi lama tersimpan sebagai
                  riwayat.
                </p>
              </div>
            </Card>

            <Card judul="Artikel pendukung">
              <div className="flex flex-col gap-5">
                {daftarArtikel.map((artikel, indeks) => (
                  <div key={indeks} className="flex flex-col gap-5">
                    <Input
                      label={`Judul artikel ${indeks + 1}`}
                      name="artikelJudul"
                      defaultValue={artikel.judul}
                    />
                    <Input
                      label={`Tautan sumber resmi ${indeks + 1}`}
                      name="artikelTautan"
                      type="url"
                      placeholder="https://"
                      petunjuk="Gunakan sumber resmi seperti JDIH."
                      defaultValue={artikel.tautanSumber}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  varian="ghost"
                  ukuran="sm"
                  className="self-start"
                >
                  Tambah artikel
                </Button>
              </div>
            </Card>
          </fieldset>
        </div>

        <PanelStatusKonten
          status={status}
          bisaDisimpan={bisaDiubah}
          sedangMenyimpan={sedangMenyimpan}
          galat={hasil && !hasil.berhasil ? hasil.galat : undefined}
        />
      </div>
    </form>
  );
}
