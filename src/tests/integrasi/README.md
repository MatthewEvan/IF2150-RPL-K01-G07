# Infrastruktur Pengujian Coverage & Integrasi Supabase Lokal

Folder `tests/integrasi/` berisi _integration test_ nyata (tanpa _mock_ Model atau kueri basis data) terhadap Supabase untuk M10 HIUPL.

## 1. Menjalankan Unit Test & Coverage (`@vitest/coverage-v8`)

Dari folder `src/`:

```bash
# Unit test saja (tanpa Docker / tanpa basis data)
npm test

# Unit test beserta laporan coverage (% line dan % branch) di terminal & ./coverage/
npm run test:coverage
```

## 2. Persiapan Supabase Lokal untuk Integration Test

Pastikan **Docker** berjalan, lalu jalankan dari folder `src/`:

```bash
npx supabase start
```

Salin `.env.test.example` menjadi `.env.test` di folder `src/`, lalu isi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, dan `SUPABASE_SERVICE_ROLE_KEY` dari hasil perintah berikut (opsional — jika `.env.test` tidak dibuat, `setupEnv.ts` akan membaca otomatis dari `supabase status -o env`):

```bash
npx supabase status -o env
```

> Berkas `.env.test` otomatis diabaikan oleh `.gitignore` dan diprioritaskan oleh skrip integrasi di atas `.env.local`. Pengujian tulis yang memanggil `wajibSupabaseLokal()` akan menolak berjalan jika URL menunjuk ke Supabase hosted agar tabel permanen `riwayat_status` (KNF09) tidak tercemar.

## 3. Menjalankan Integration Test

```bash
npm run test:integrasi
```

## 4. Pembagian Nomor ID `INT-TC`

Agar tidak bentrok antaranggota tim, gunakan rentang nomor berikut:

| Anggota | Rentang ID              | Fokus modul                                                   |
| :------ | :---------------------- | :------------------------------------------------------------ |
| Raditya | `INT-TC01` – `INT-TC09` | Autentikasi, sesi/proxy, pengelolaan akun Kurator             |
| Wesley  | `INT-TC10` – `INT-TC19` | Jelajah kasus & direktori LBH                                 |
| Rivan   | `INT-TC20` – `INT-TC29` | Pencarian kata kunci & unduh templat dokumen                  |
| Matthew | `INT-TC30` – `INT-TC39` | Penyusunan konten, simpan draf, unggah templat, ajukan konten |
| Michael | `INT-TC40` – `INT-TC49` | Pelacakan konten Kurator & moderasi Administrator             |

## 5. Cara Menulis Integration Test dengan Helper `supabaseLokal.ts`

- **Akses anonim (publik):** gunakan `buatClientAnonLokal()` (lihat contoh di `tests/integrasi/pencarianKasus.test.ts`).
- **Akses terautentikasi (Kurator / Administrator):** gunakan `await buatClientMasukLokal("kurator1@pahamhukum.test")` atau `"admin@pahamhukum.test"`.
- **Verifikasi / pembersihan lewat service role:** gunakan `buatClientAdminLokal()`.
- **Untuk test yang mengubah data DB:** panggil `wajibSupabaseLokal()` di awal `beforeAll` / `beforeEach` dan bungkus pemanggilan controller lewat `vi.mock("@/lib/supabase/server", ...)`.
