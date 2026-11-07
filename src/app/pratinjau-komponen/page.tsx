import type { ReactNode } from "react";
import Badge, {
  type NadaBadge,
  type StatusKonten,
} from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Callout from "@/components/ui/Callout";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Table, { type KolomTabel } from "@/components/ui/Table";
import Textarea from "@/components/ui/Textarea";

/**
 * Halaman pratinjau komponen untuk pengembangan S1-E01.
 * HAPUS halaman ini sebelum rilis (lihat issue #50 langkah 6).
 */

const TOKEN_WARNA = [
  { nama: "surface", kelas: "bg-surface" },
  { nama: "surface-raised", kelas: "bg-surface-raised" },
  { nama: "surface-raised-hover", kelas: "bg-surface-raised-hover" },
  { nama: "surface-sunken", kelas: "bg-surface-sunken" },
  { nama: "line", kelas: "bg-line" },
  { nama: "line-strong", kelas: "bg-line-strong" },
  { nama: "ink", kelas: "bg-ink" },
  { nama: "ink-muted", kelas: "bg-ink-muted" },
  { nama: "brand", kelas: "bg-brand" },
  { nama: "brand-strong", kelas: "bg-brand-strong" },
  { nama: "brand-soft", kelas: "bg-brand-soft" },
  { nama: "on-brand", kelas: "bg-on-brand" },
  { nama: "accent", kelas: "bg-accent" },
  { nama: "link", kelas: "bg-link" },
  { nama: "accent-soft", kelas: "bg-accent-soft" },
  { nama: "success", kelas: "bg-success" },
  { nama: "success-soft", kelas: "bg-success-soft" },
  { nama: "warning", kelas: "bg-warning" },
  { nama: "warning-soft", kelas: "bg-warning-soft" },
  { nama: "danger", kelas: "bg-danger" },
  { nama: "danger-soft", kelas: "bg-danger-soft" },
  { nama: "highlight", kelas: "bg-highlight" },
];

const TOKEN_RADIUS = [
  { nama: "rounded-sm", kelas: "rounded-sm" },
  { nama: "rounded-md", kelas: "rounded-md" },
  { nama: "rounded-lg", kelas: "rounded-lg" },
  { nama: "rounded-xl", kelas: "rounded-xl" },
  { nama: "rounded-pill", kelas: "rounded-pill" },
];

const STATUS: StatusKonten[] = [
  "Draft",
  "Diajukan",
  "Perlu Revisi",
  "Disetujui",
];

const NADA: NadaBadge[] = ["netral", "info", "sukses", "peringatan", "bahaya"];

type BarisKonten = {
  id: string;
  judul: string;
  status: StatusKonten;
  diperbarui: string;
};

const DATA_KONTEN: BarisKonten[] = [
  {
    id: "1",
    judul: "Upah tidak dibayar setelah pekerjaan selesai",
    status: "Draft",
    diperbarui: "3 Nov 2026",
  },
  {
    id: "2",
    judul: "Konsumen menolak pengembalian barang rusak",
    status: "Diajukan",
    diperbarui: "2 Nov 2026",
  },
  {
    id: "3",
    judul: "Sengketa batas tanah dengan tetangga",
    status: "Perlu Revisi",
    diperbarui: "1 Nov 2026",
  },
  {
    id: "4",
    judul: "Pemutusan hubungan kerja tanpa pesangon",
    status: "Disetujui",
    diperbarui: "31 Okt 2026",
  },
];

const KOLOM_KONTEN: KolomTabel<BarisKonten>[] = [
  { kunci: "judul", judul: "Judul konten" },
  {
    kunci: "status",
    judul: "Status",
    sel: (baris) => <Badge status={baris.status} />,
  },
  { kunci: "diperbarui", judul: "Diperbarui" },
  {
    kunci: "id",
    judul: "Aksi",
    rata: "kanan",
    sel: () => (
      <Button varian="secondary" ukuran="sm">
        Perbaiki konten
      </Button>
    ),
  },
];

function Bagian({
  judul,
  keterangan,
  children,
}: {
  judul: string;
  keterangan: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5 border-t border-line pt-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-ink">{judul}</h2>
        <p className="text-sm text-ink-muted">{keterangan}</p>
      </div>
      {children}
    </section>
  );
}

function BarisContoh({
  judul,
  children,
}: {
  judul: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold tracking-wide text-ink-muted uppercase">
        {judul}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

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

function IkonCentang() {
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
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IkonUnduh() {
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
      <path d="M12 4v10" />
      <path d="M8 10l4 4 4-4" />
      <path d="M5 19h14" />
    </svg>
  );
}

function IkonMenu() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-5"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function HalamanPratinjauKomponen() {
  return (
    <main className="mx-auto flex w-full max-w-280 flex-1 flex-col gap-10 px-5 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-ink">Pratinjau Komponen</h1>
        <p className="max-w-2xl text-sm text-ink-muted">
          Halaman kerja untuk fondasi token dan komponen dasar PahamHukum
          (S1-E01). Semua komponen memakai token dari{" "}
          <code className="rounded-sm bg-surface-sunken px-1 py-0.5 text-xs">
            app/globals.css
          </code>{" "}
          tanpa nilai warna atau jarak manual.
        </p>
      </header>

      <Callout jenis="info" judul="Halaman khusus pengembangan">
        Halaman <code>/pratinjau-komponen</code> dipakai untuk memeriksa
        komponen dan dihapus sebelum rilis. Jangan menautkannya dari navigasi
        publik.
      </Callout>

      <Bagian
        judul="Token design system"
        keterangan="Nilai token mengikuti tabel pada issue #50 dan sudah terdaftar di @theme Tailwind."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {TOKEN_WARNA.map(({ nama, kelas }) => (
            <div
              key={nama}
              className="overflow-hidden rounded-lg border border-line bg-surface-raised"
            >
              <div className={`h-12 ${kelas}`} />
              <div className="px-3 py-2">
                <p className="text-xs font-semibold text-ink">{nama}</p>
                <p className="text-xs text-ink-muted">{kelas}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-wide text-ink-muted uppercase">
              Radius
            </p>
            <div className="flex flex-wrap gap-3">
              {TOKEN_RADIUS.map(({ nama, kelas }) => (
                <div key={nama} className="flex flex-col items-center gap-2">
                  <div
                    className={`size-16 border border-line-strong bg-brand-soft ${kelas}`}
                  />
                  <span className="text-xs text-ink-muted">{nama}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-wide text-ink-muted uppercase">
              Bayangan
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="size-16 rounded-lg bg-surface-raised shadow-sm" />
                <span className="text-xs text-ink-muted">shadow-sm</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="size-16 rounded-lg bg-surface-raised shadow-md" />
                <span className="text-xs text-ink-muted">shadow-md</span>
              </div>
            </div>
          </div>
        </div>
      </Bagian>

      <Bagian
        judul="Button"
        keterangan="Empat varian, tiga ukuran, dukungan ikon, dan keadaan nonaktif."
      >
        <BarisContoh judul="Varian">
          <Button varian="primary">Tulis konten baru</Button>
          <Button varian="secondary">Simpan draf</Button>
          <Button varian="danger">Nonaktifkan</Button>
          <Button varian="ghost">Batal</Button>
        </BarisContoh>

        <BarisContoh judul="Ukuran">
          <Button ukuran="md">Ukuran md</Button>
          <Button ukuran="sm">Ukuran sm</Button>
          <Button ukuran="ikon" aria-label="Buka menu">
            <IkonMenu />
          </Button>
        </BarisContoh>

        <BarisContoh judul="Dengan ikon">
          <Button varian="primary" ikonKiri={<IkonPensil />}>
            Tulis konten baru
          </Button>
          <Button varian="primary" ikonKanan={<IkonCentang />}>
            Setujui dan tayangkan
          </Button>
          <Button varian="secondary" ikonKiri={<IkonUnduh />}>
            Unduh
          </Button>
        </BarisContoh>

        <BarisContoh judul="Nonaktif">
          <Button varian="primary" disabled>
            Ajukan untuk ditinjau
          </Button>
          <Button varian="secondary" disabled>
            Simpan perubahan
          </Button>
        </BarisContoh>
      </Bagian>

      <Bagian
        judul="Badge"
        keterangan="Label status konten dan peran pengguna. Teks status mengikuti SKPL."
      >
        <BarisContoh judul="Status konten">
          {STATUS.map((status) => (
            <Badge key={status} status={status} />
          ))}
        </BarisContoh>

        <BarisContoh judul="Peran">
          <Badge peran="Kurator" />
          <Badge peran="Administrator" />
        </BarisContoh>

        <BarisContoh judul="Nada bebas">
          {NADA.map((nada) => (
            <Badge key={nada} nada={nada}>
              {nada}
            </Badge>
          ))}
        </BarisContoh>
      </Bagian>

      <Bagian
        judul="Input, Textarea, dan Select"
        keterangan="Semua kendali isian memiliki label, petunjuk, dan pesan galat."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Input
            label="Judul konten"
            name="judul"
            placeholder="Contoh: Upah tidak dibayar"
            petunjuk="Maksimal 120 karakter."
          />
          <Input
            label="Email kurator"
            name="email-kurator"
            type="email"
            placeholder="nama@contoh.test"
            wajib
          />
          <Input
            label="Nama berkas templat"
            name="nama-berkas"
            defaultValue="templat-somasi.docx"
            galat="Berkas harus berformat PDF."
          />
          <Input
            label="Akun nonaktif"
            name="akun-nonaktif"
            defaultValue="kurator.nonaktif@pahamhukum.test"
            disabled
          />

          <Textarea
            label="Inti masalah"
            name="inti-masalah"
            placeholder="Tuliskan ringkasan masalah dalam 2-3 kalimat."
            petunjuk="Gunakan bahasa yang mudah dipahami."
          />
          <Textarea
            label="Hak yang dapat dituntut"
            name="hak"
            rows={3}
            galat="Bagian ini wajib diisi."
            wajib
          />

          <Select label="Bidang hukum" name="bidang" defaultValue="kerja">
            <option value="kerja">Hukum Ketenagakerjaan</option>
            <option value="konsumen">Hukum Perlindungan Konsumen</option>
            <option value="tanah">Hukum Tanah</option>
          </Select>
          <Select
            label="Wilayah LBH"
            name="wilayah"
            petunjuk="Pilih wilayah terdekat."
            defaultValue=""
          >
            <option value="" disabled>
              Pilih wilayah
            </option>
            <option value="jabar">Jawa Barat</option>
            <option value="jateng">Jawa Tengah</option>
          </Select>
          <Select label="Status konten" name="status" galat="Pilih status.">
            <option value="">Pilih status</option>
            {STATUS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </div>
      </Bagian>

      <Bagian
        judul="Card"
        keterangan="Wadah konten dengan judul dan aksi opsional."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card judul="Ringkasan kasus" aksi={<Badge status="Disetujui" />}>
            <p className="text-sm text-ink">
              Konten ini sudah ditinjau dan tayang untuk publik. Perubahan
              setelah tayang akan masuk ke antrean tinjauan kembali.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button varian="secondary" ukuran="sm">
                Lihat halaman
              </Button>
              <Button varian="ghost" ukuran="sm">
                Perbaiki konten
              </Button>
            </div>
          </Card>

          <Card padat>
            <p className="text-sm text-ink">
              Kartu rapat dipakai untuk daftar atau panel samping tanpa judul.
            </p>
          </Card>
        </div>
      </Bagian>

      <Bagian
        judul="Callout"
        keterangan="Tiga jenis pesan: informasi, peringatan, dan bahaya."
      >
        <div className="flex flex-col gap-4">
          <Callout jenis="info" judul="Informasi">
            Semua templat dokumen dapat diunduh tanpa akun.
          </Callout>
          <Callout jenis="peringatan" judul="Perlu revisi">
            Konten dikembalikan karena bagian hak belum lengkap.
          </Callout>
          <Callout jenis="bahaya" judul="Peringatan darurat">
            Jika ada ancaman keselamatan, hubungi 110 atau LBH terdekat sebelum
            melanjutkan.
          </Callout>
        </div>
      </Bagian>

      <Bagian
        judul="Table"
        keterangan="Tabel berubah menjadi daftar kartu pada layar sempit, termasuk lebar 360 px."
      >
        <Table
          kolom={KOLOM_KONTEN}
          data={DATA_KONTEN}
          kunciBaris={(baris) => baris.id}
          keterangan="Daftar konten milik kurator beserta statusnya"
        />
        <Table
          kolom={KOLOM_KONTEN}
          data={[]}
          keterangan="Contoh tabel kosong"
          pesanKosong="Belum ada konten. Mulai dengan menulis konten baru."
        />
      </Bagian>
    </main>
  );
}
