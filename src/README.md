# PahamHukum

PahamHukum adalah aplikasi web yang membantu pencari informasi memahami kasus
hukum sehari-hari lewat rangkuman yang ditulis Kurator dan ditinjau Administrator.

## Teknologi

- Node.js 24 (lihat `.nvmrc`)
- Next.js 16 (App Router) dan TypeScript
- Tailwind CSS 4
- Supabase (PostgreSQL dan Auth)

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

## Perintah Lain

| Perintah         | Kegunaan                       |
| :--------------- | :----------------------------- |
| `npm run lint`   | Memeriksa kode dengan ESLint   |
| `npm run format` | Merapikan kode dengan Prettier |
| `npm run build`  | Membuat build produksi         |
