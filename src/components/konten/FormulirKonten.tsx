"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { bisaDisunting } from "@/lib/controllers/aturanPenyusunanKonten";
import {
  buatDraf,
  type HasilAjukanKonten,
  type HasilHapusTemplat,
  type HasilLampirkanTemplat,
  type HasilSimpanDraf,
} from "@/lib/controllers/kontrolPenyusunanKonten";
import type { PilihanKelompok } from "@/lib/models/kelompokKasus";
import type { IsianWajib, RangkumanKasus } from "@/lib/models/rangkumanKasus";
import type { TemplatDokumen } from "@/lib/models/templatDokumen";
import useJagaSesi from "@/components/panel/useJagaSesi";
import DaftarArtikel from "./DaftarArtikel";
import DaftarLangkah from "./DaftarLangkah";
import KartuTemplat from "./KartuTemplat";
import PanelStatusKonten from "./PanelStatusKonten";

type FormulirKontenProps = {
  daftarKelompok: PilihanKelompok[];
  rangkuman?: RangkumanKasus;
  daftarTemplat?: TemplatDokumen[];
  aksiSimpan?: (data: FormData) => Promise<HasilSimpanDraf>;
  aksiAjukan?: (data: FormData) => Promise<HasilAjukanKonten>;
  aksiLampirkan?: (data: FormData) => Promise<HasilLampirkanTemplat>;
  aksiHapusTemplat?: (idTemplat: number) => Promise<HasilHapusTemplat>;
};

const PESAN_ISIAN_KOSONG: Record<IsianWajib, string> = {
  intiMasalah: "Inti masalah wajib diisi.",
  hak: "Hak kamu wajib diisi.",
  poinPertimbangan: "Poin pertimbangan wajib diisi.",
  langkah: "Isi minimal satu langkah, dan setiap langkah wajib punya isi.",
  checklist: "Isi minimal satu dokumen yang perlu disiapkan.",
  artikel:
    "Tambahkan minimal satu artikel lengkap dengan judul dan tautan sumber.",
};

function idIsian(isian: IsianWajib) {
  return `isian-${isian}`;
}

function formatJam(iso: string) {
  return new Date(iso).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FormulirKonten({
  daftarKelompok,
  rangkuman,
  daftarTemplat = [],
  aksiSimpan,
  aksiAjukan,
  aksiLampirkan,
  aksiHapusTemplat,
}: FormulirKontenProps) {
  const [idKelompok, setIdKelompok] = useState(
    rangkuman ? String(rangkuman.idKelompok) : "",
  );
  const [hasil, setHasil] = useState<HasilSimpanDraf | null>(null);
  const [galatBuat, setGalatBuat] = useState<string>();
  const [sedangMembuat, mulaiMembuat] = useTransition();
  const [sedangMenyimpan, mulaiMenyimpan] = useTransition();
  const [hasilAjukan, setHasilAjukan] = useState<HasilAjukanKonten | null>(
    null,
  );
  const [sedangMengajukan, mulaiMengajukan] = useTransition();
  const jagaSesi = useJagaSesi();

  const isianKosong =
    hasilAjukan && !hasilAjukan.berhasil ? hasilAjukan.isianKosong : [];
  const galatIsian = (isian: IsianWajib) =>
    isianKosong.includes(isian) ? PESAN_ISIAN_KOSONG[isian] : undefined;

  useEffect(() => {
    if (!hasilAjukan || hasilAjukan.berhasil) return;
    const [isianPertama] = hasilAjukan.isianKosong;
    if (!isianPertama) return;
    const wadah = document.getElementById(idIsian(isianPertama));
    const sasaran = wadah?.matches("input, textarea")
      ? wadah
      : (wadah?.querySelector<HTMLElement>("input, textarea") ??
        wadah?.querySelector<HTMLElement>('[data-aksi="tambah"]'));
    sasaran?.focus();
  }, [hasilAjukan]);

  const kelompokTerpilih = daftarKelompok.find(
    (kelompok) => String(kelompok.idKelompok) === idKelompok,
  );
  const status = rangkuman?.status ?? "Draft";
  const bisaDiubah = rangkuman ? bisaDisunting(status) : false;

  let keterangan = "Pilih kelompok kasus, lalu klik Mulai menulis";
  if (rangkuman && !bisaDiubah) {
    keterangan = `Konten berstatus ${status} tidak bisa diubah`;
  } else if (hasil?.berhasil) {
    keterangan = `Disimpan pukul ${formatJam(hasil.waktuSimpan)}`;
  } else if (rangkuman) {
    keterangan = "Draf tersimpan";
  }

  function pilihKelompok(nilai: string) {
    setIdKelompok(nilai);
    setGalatBuat(undefined);
  }

  function mulaiMenulis() {
    if (rangkuman || !idKelompok) return;
    setGalatBuat(undefined);
    mulaiMembuat(async () => {
      const hasilBuat = await buatDraf(Number(idKelompok));
      if (hasilBuat) setGalatBuat(hasilBuat.galat);
    });
  }

  function kirim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!bisaDiubah || sedangMenyimpan || sedangMengajukan) return;
    const data = new FormData(event.currentTarget);
    const pengirim = (event.nativeEvent as SubmitEvent).submitter;

    if (pengirim?.getAttribute("value") === "ajukan") {
      if (!aksiAjukan) return;
      setHasil(null);
      mulaiMengajukan(async () => {
        setHasilAjukan(await aksiAjukan(data));
      });
      return;
    }

    if (!aksiSimpan) return;
    setHasilAjukan(null);
    mulaiMenyimpan(async () => {
      setHasil(await aksiSimpan(data));
    });
  }

  let galatPanel: string | undefined;
  if (hasilAjukan && !hasilAjukan.berhasil) galatPanel = hasilAjukan.galat;
  else if (hasil && !hasil.berhasil) galatPanel = hasil.galat;

  return (
    <form onSubmit={kirim} onInput={jagaSesi} className="flex flex-col gap-6">
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
            <div className="flex flex-col gap-4">
              <Select
                label="Kelompok kasus"
                name="idKelompok"
                wajib
                value={idKelompok}
                onChange={(event) => pilihKelompok(event.target.value)}
                disabled={Boolean(rangkuman) || sedangMembuat}
                petunjuk="Kelompok kasus tidak bisa diganti setelah draf dibuat."
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
              {rangkuman ? null : (
                <Button
                  type="button"
                  className="self-start"
                  onClick={mulaiMenulis}
                  disabled={!idKelompok || sedangMembuat}
                >
                  {sedangMembuat ? "Membuat draf…" : "Mulai menulis"}
                </Button>
              )}
            </div>
          </Card>

          <fieldset
            disabled={!bisaDiubah}
            className="flex min-w-0 flex-col gap-4"
          >
            <Card judul="Isi rangkuman">
              <div className="flex flex-col gap-5">
                <Textarea
                  id={idIsian("intiMasalah")}
                  label="Inti masalah"
                  name="intiMasalah"
                  petunjuk="2–3 paragraf dengan bahasa sehari-hari."
                  wajib
                  galat={galatIsian("intiMasalah")}
                  defaultValue={rangkuman?.intiMasalah}
                />
                <Textarea
                  id={idIsian("hak")}
                  label="Hak kamu"
                  name="hak"
                  petunjuk="Satu hak per baris, sertakan dasar hukumnya."
                  wajib
                  galat={galatIsian("hak")}
                  defaultValue={rangkuman?.hak}
                />
                <Textarea
                  id={idIsian("poinPertimbangan")}
                  label="Poin pertimbangan"
                  name="poinPertimbangan"
                  petunjuk="Perkiraan waktu dan kapan perlu pendamping profesional."
                  wajib
                  rows={3}
                  galat={galatIsian("poinPertimbangan")}
                  defaultValue={rangkuman?.poinPertimbangan}
                />
              </div>
            </Card>

            <DaftarLangkah
              id={idIsian("langkah")}
              daftarAwal={rangkuman?.daftarLangkah ?? []}
              galat={galatIsian("langkah")}
            />

            <Card judul="Daftar periksa dokumen">
              <Textarea
                id={idIsian("checklist")}
                label="Dokumen yang perlu disiapkan"
                name="checklist"
                petunjuk="Satu dokumen per baris."
                wajib
                galat={galatIsian("checklist")}
                defaultValue={rangkuman?.daftarDokumen.join("\n")}
              />
            </Card>

            <KartuTemplat
              daftarTemplat={daftarTemplat}
              aksiLampirkan={aksiLampirkan}
              aksiHapus={aksiHapusTemplat}
            />

            <DaftarArtikel
              id={idIsian("artikel")}
              daftarAwal={rangkuman?.daftarArtikel ?? []}
              galat={galatIsian("artikel")}
            />
          </fieldset>
        </div>

        <PanelStatusKonten
          status={status}
          bisaDisimpan={bisaDiubah}
          bisaDiajukan={bisaDiubah && Boolean(aksiAjukan)}
          sedangMenyimpan={sedangMenyimpan}
          sedangMengajukan={sedangMengajukan}
          galat={galatPanel}
          pesanBerhasil={
            hasilAjukan?.berhasil
              ? "Konten diajukan dan masuk antrean peninjauan Administrator."
              : undefined
          }
        />
      </div>
    </form>
  );
}
