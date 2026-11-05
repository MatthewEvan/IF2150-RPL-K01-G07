# PahamHukum

PahamHukum adalah aplikasi web yang membantu pencari informasi memahami kasus
hukum sehari-hari lewat rangkuman yang ditulis Kurator dan ditinjau Administrator.

## Teknologi

- Node.js 24 (lihat `.nvmrc`)
- Next.js 16 (App Router) dan TypeScript
- Tailwind CSS 4
- Supabase (PostgreSQL 17 dan Auth), dijalankan lokal dengan Supabase CLI dan Docker

## Cara Menjalankan

Jalankan perintah berikut dari folder `src/`:

```bash
npm install
npm run dev
```

Aplikasi berjalan di <http://localhost:3000>.

## Struktur Folder

Struktur kode mengikuti pola MVC pada DPPL.

| Folder             | Lapisan    | Isi                                |
| :----------------- | :--------- | :--------------------------------- |
| `app/`             | View       | Halaman dan rute                   |
| `components/`      | View       | Komponen antarmuka                 |
| `lib/controllers/` | Controller | Server Action dan logika alur      |
| `lib/models/`      | Model      | Akses data tiap entitas            |
| `lib/supabase/`    | Pendukung  | Client Supabase server dan browser |
| `supabase/`        | Pendukung  | Migrasi dan seed basis data        |

## Peta Rute

| Rute                         | Layar | Halaman                |
| :--------------------------- | :---- | :--------------------- |
| `/`                          | I-01  | Beranda                |
| `/kasus/[id]`                | I-02  | Rangkuman kasus        |
| `/cari`                      | I-03  | Hasil pencarian        |
| `/masuk`                     | I-04  | Login pengelola        |
| `/panel/kurator/konten/baru` | I-05  | Penyusunan konten baru |
| `/panel/kurator/konten/[id]` | I-05  | Penyusunan konten      |
| `/panel/kurator/konten`      | I-06  | Daftar konten Kurator  |
| `/panel/admin/moderasi`      | I-07  | Moderasi konten        |
| `/panel/admin/akun`          | I-08  | Pengelolaan akun       |

## Basis Data

Basis data berjalan lokal dengan Supabase CLI, sehingga tidak perlu akun Supabase pribadi. Prasyarat: Docker sudah berjalan.

Jalankan dari folder `src/`:

```bash
npx supabase start
```

Perintah ini menyiapkan basis data, menjalankan `supabase/migrations/`, lalu mengisi `supabase/seed.sql`. Salin nilainya ke `.env.local`:

```bash
cp .env.example .env.local
npx supabase status
```

| Variabel di `.env.local`        | Nilai dari `supabase status` |
| :------------------------------ | :--------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | API URL                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key                     |
| `SUPABASE_SERVICE_ROLE_KEY`     | Service role key             |

Untuk membentuk ulang basis data dari nol:

```bash
npx supabase db reset
```

Pada proyek Supabase yang di-hosting, jalankan `0001_skema.sql` lalu `seed.sql` di SQL Editor dan matikan pendaftaran mandiri di pengaturan Auth.

### Akun Uji

Semua akun bersifat fiktif dan memakai kata sandi `PahamHukum-Uji-123`.

| Email                              | Peran                   |
| :--------------------------------- | :---------------------- |
| `admin@pahamhukum.test`            | Administrator           |
| `kurator1@pahamhukum.test`         | Kurator                 |
| `kurator2@pahamhukum.test`         | Kurator                 |
| `kurator.nonaktif@pahamhukum.test` | Kurator (akun nonaktif) |

### Daftar Tabel

Atribut lengkap ada di `supabase/migrations/0001_skema.sql`.

| Tabel                   | Kelas | Atribut utama                                                                |
| :---------------------- | :---- | :--------------------------------------------------------------------------- |
| `akun`                  | C01   | `id_akun`, `email`, `peran`                                                  |
| `kurator`               | C02   | `id_akun`, `jumlah_konten`, `status_aktif`, `id_administrator`               |
| `administrator`         | C03   | `id_akun`                                                                    |
| `bidang_hukum`          | C04   | `id_bidang`, `nama`, `status_aktif`                                          |
| `kelompok_kasus`        | C05   | `id_kelompok`, `id_bidang`, `judul_umum`, `istilah_resmi`, `penanda_darurat` |
| `rangkuman_kasus`       | C06   | `id_rangkuman`, `id_kelompok`, `id_kurator`, isian konten, `status`          |
| `langkah_penyelesaian`  | C07   | `id_langkah`, `id_rangkuman`, `nomor`, `deskripsi`, `tujuan`, `tenggat`      |
| `checklist`             | C08   | `id_checklist`, `id_rangkuman`, `daftar_dokumen`                             |
| `templat_dokumen`       | C09   | `id_templat`, `id_rangkuman`, `nama_berkas`, `format`, `ukuran`, `versi`     |
| `artikel`               | C10   | `id_artikel`, `id_rangkuman`, `judul`, `tautan_sumber`                       |
| `lembaga_bantuan_hukum` | C11   | `id_lbh`, `nama`, `wilayah`, `tautan`                                        |
| `riwayat_status`        | C12   | `id_riwayat`, `id_rangkuman`, `id_pelaku`, `status`, `waktu`                 |

Perbedaan dari DPPL yang perlu dicatat di laporan B.1:

- `id_akun` bertipe UUID dan mengikuti `auth.users`, serta kolom `kata_sandi_hash` tidak ada karena kata sandi disimpan Supabase Auth.
- `jumlah_konten` ditambah oleh trigger basis data, bukan oleh Kurator.
- `jumlahKelompokKasus` pada `BidangHukum` dihitung saat query (Q-021), bukan disimpan.

## Perintah Lain

| Perintah         | Kegunaan                       |
| :--------------- | :----------------------------- |
| `npm run lint`   | Memeriksa kode dengan ESLint   |
| `npm run format` | Merapikan kode dengan Prettier |
| `npm run build`  | Membuat build produksi         |
