"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import type { PilihanKelompok } from "@/lib/models/pilihanKelompok";
import PanelStatusKonten from "./PanelStatusKonten";

type FormulirKontenProps = {
  daftarKelompok: PilihanKelompok[];
  aksi: (data: FormData) => void | Promise<void>;
};

const DAFTAR_LANGKAH = [{ nomor: 1 }];
const DAFTAR_ARTIKEL = [{ nomor: 1 }];

export default function FormulirKonten({
  daftarKelompok,
  aksi,
}: FormulirKontenProps) {
  const [idKelompok, setIdKelompok] = useState("");
  const kelompokTerpilih = daftarKelompok.find(
    (kelompok) => String(kelompok.idKelompok) === idKelompok,
  );

  return (
    <form action={aksi} className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
          Penyusunan konten
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">
          {kelompokTerpilih?.judulUmum ?? "Konten baru"}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Badge status="Draft" />
          <p className="text-sm text-ink-muted">
            Belum disimpan · urutan isian mengikuti halaman rangkuman
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
              onChange={(event) => setIdKelompok(event.target.value)}
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

          <Card judul="Isi rangkuman">
            <div className="flex flex-col gap-5">
              <Textarea
                label="Inti masalah"
                name="intiMasalah"
                petunjuk="2–3 paragraf dengan bahasa sehari-hari."
                wajib
              />
              <Textarea
                label="Hak kamu"
                name="hak"
                petunjuk="Satu hak per baris, sertakan dasar hukumnya."
                wajib
              />
              <Textarea
                label="Poin pertimbangan"
                name="poinPertimbangan"
                petunjuk="Perkiraan waktu dan kapan perlu pendamping profesional."
                wajib
                rows={3}
              />
            </div>
          </Card>

          <Card judul="Langkah penyelesaian">
            <div className="flex flex-col gap-5">
              {DAFTAR_LANGKAH.map((langkah) => (
                <div key={langkah.nomor} className="flex flex-col gap-5">
                  <Input
                    label={`Langkah ${langkah.nomor}`}
                    name="langkahDeskripsi"
                    wajib
                  />
                  <Input
                    label={`Tenggat langkah ${langkah.nomor} (opsional)`}
                    name="langkahTenggat"
                    petunjuk="Contoh: 7 hari kerja setelah surat PHK diterima."
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
              {DAFTAR_ARTIKEL.map((artikel) => (
                <div key={artikel.nomor} className="flex flex-col gap-5">
                  <Input
                    label={`Judul artikel ${artikel.nomor}`}
                    name="artikelJudul"
                  />
                  <Input
                    label={`Tautan sumber resmi ${artikel.nomor}`}
                    name="artikelTautan"
                    type="url"
                    placeholder="https://"
                    petunjuk="Gunakan sumber resmi seperti JDIH."
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
        </div>

        <PanelStatusKonten />
      </div>
    </form>
  );
}
