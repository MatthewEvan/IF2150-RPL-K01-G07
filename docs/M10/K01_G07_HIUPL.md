<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 10
<br>
HASIL IMPLEMENTASI DAN UJI PERANGKAT LUNAK (HIUPL)
</h1>
<br>

## PahamHukum
<p align="left">
<img alt="Logo PahamHukum" src="./assets/PahamHukum_Logo.png" width="50%">
</p>

### Untuk: Mikhael Andrian Yonatan

Dipersiapkan oleh: *#PenjagaNilai*
| Informasi | Keterangan |
| --- | --- |
| Kelas | K01 |
| Kelompok | G07 |

| NIM | Nama |
|---|---|
| 13525007 | Rivan Cahyadi |
| 13525019 | Raditya Wibian Sastaka |
| 13525064 | Matthew Evan Kurniawan |
| 13525100 | Wesley Lianto |
| 13525109 | Christopherus Michael Jafeth Tobing |

---

## Daftar Isi

- [BAB 1: Pendahuluan](#bab-1-pendahuluan)
  - [1.1 Tujuan Penulisan Dokumen](#11-tujuan-penulisan-dokumen)
  - [1.2 Lingkup Masalah](#12-lingkup-masalah)
  - [1.3 Definisi, Istilah, dan Singkatan](#13-definisi-istilah-dan-singkatan)
  - [1.4 Aturan Penomoran](#14-aturan-penomoran)
  - [1.5 Referensi](#15-referensi)
  - [1.6 Deskripsi Umum Dokumen (Ikhtisar)](#16-deskripsi-umum-dokumen-ikhtisar)
- [BAB 2: Deskripsi Umum Perangkat Lunak](#bab-2-deskripsi-umum-perangkat-lunak)
- [BAB 3: Implementasi](#bab-3-implementasi)
  - [3.1 Lingkungan Implementasi](#31-lingkungan-implementasi)
  - [3.2 Implementasi Modul](#32-implementasi-modul)
  - [3.3 Implementasi Antarmuka](#33-implementasi-antarmuka)
  - [3.4 File Lain](#34-file-lain)
- [BAB 4: Hasil Pengujian](#bab-4-hasil-pengujian)
  - [4.1 Strategi dan Kedalaman Pengujian Kelas](#41-strategi-dan-kedalaman-pengujian-kelas)
  - [4.2 Pengujian Unit Kelas](#42-pengujian-unit-kelas)
  - [4.3 Pengujian Integrasi](#43-pengujian-integrasi)
  - [4.4 Pengujian Use Case](#44-pengujian-use-case)
  - [4.5 Pengujian Kebutuhan Non-Fungsional (KNF)](#45-pengujian-kebutuhan-non-fungsional-knf)
  - [4.6 Tangkapan Layar dan Bukti Hasil Pengujian](#46-tangkapan-layar-dan-bukti-hasil-pengujian)
- [BAB 5: Traceability](#bab-5-traceability)

---

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |

---

# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Dokumen Hasil Implementasi dan Uji Perangkat Lunak (HIUPL) ini melaporkan hasil implementasi dan pengujian perangkat lunak PahamHukum. Dokumen memuat lingkungan implementasi, daftar modul, antarmuka, dan berkas yang telah dibuat, strategi serta hasil pengujian unit, integrasi, use case, dan kebutuhan non-fungsional beserta buktinya, hingga matriks *traceability* dari kebutuhan ke pengujian. Dokumen ini ditujukan bagi asisten dan dosen pengampu mata kuliah IF2150 Rekayasa Perangkat Lunak sebagai bahan penilaian, serta bagi anggota tim pengembang sebagai acuan pemeliharaan dan pengembangan lanjutan.

## 1.2 Lingkup Masalah
Lingkup masalah dokumen ini adalah membangun perangkat lunak PahamHukum, yaitu platform literasi hukum berbasis web yang menjembatani masyarakat awam dengan informasi hukum. PahamHukum menyederhanakan bahasa hukum menjadi panduan praktis berdasarkan kelompok kasus sehari-hari, berisi inti masalah, hak yang dimiliki, langkah penyelesaian, daftar periksa dokumen, templat surat, serta direktori Lembaga Bantuan Hukum, dan dapat diakses secara gratis tanpa akun. Konten disusun oleh Kurator dan baru tampil setelah disetujui Administrator. PahamHukum tidak bertindak sebagai penasihat hukum resmi, melainkan penuntun langkah awal sebelum masyarakat berinteraksi dengan lembaga hukum formal. Sistem bergantung pada Supabase sebagai layanan eksternal untuk basis data PostgreSQL, autentikasi, dan penyimpanan berkas.

## 1.3 Definisi, Istilah, dan Singkatan
Semua definisi dan singkatan yang digunakan dalam dokumen ini beserta penjelasannya.

Tabel 1.3. Definisi Istilah dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| *P/L* | *Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu.* |
| *SKPL* | *Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan untuk membangun aplikasi menjalankan tugasnya.* |
| *DPPL* | *Singkatan dari Deskripsi Perancangan Perangkat Lunak, yaitu dokumen yang menjelaskan rancangan arsitektur, kelas, dan antarmuka P/L.* |
| *HIUPL* | *Singkatan dari Hasil Implementasi dan Uji Perangkat Lunak, yaitu dokumen yang melaporkan hasil implementasi dan pengujian P/L.* |
| *KF* | *Singkatan dari Kebutuhan Fungsional.* |
| *KNF* | *Singkatan dari Kebutuhan Non-Fungsional.* |
| *UC* | *Singkatan dari Use Case.* |
| *TC* | *Singkatan dari Test Case, yaitu satu kasus uji untuk skenario tertentu.* |
| *UT* | *Singkatan dari Unit Test, yaitu test case tingkat kelas/operasi.* |
| *INT* | *Singkatan dari Integration Test, yaitu test case yang menguji interaksi antarkomponen.* |
| *Boundary* | *Kasus uji pada nilai batas masukan, misalnya nilai minimum, maksimum, atau tepat di ambang aturan.* |
| *Coverage* | *Persentase baris/cabang kode yang dieksekusi oleh pengujian.* |
| *Risk-based testing* | Pendekatan perencanaan pengujian yang menentukan kedalaman uji setiap kelas berdasarkan risiko dan kompleksitas logikanya. Pada dokumen ini dipakai untuk mengelompokkan kelas ke tingkat Mendalam, Sedang, atau Tidak perlu (Subbab 4.1). |
| Tingkat Mendalam | Tingkat pengujian untuk kelas yang memuat logika bisnis, perhitungan, validasi, aturan status, algoritma, integrasi eksternal, atau keamanan. Seluruh operasi public diuji dengan kasus normal, batas, dan negatif, dengan *coverage* minimal 70%. |
| Tingkat Sedang | Tingkat pengujian untuk kelas yang hanya mengoordinasikan atau mendelegasikan proses. Operasi public utama diuji minimal dengan satu kasus normal dan satu kasus gagal. |
| Tingkat Tidak perlu | Tingkat pengujian untuk kelas tanpa logika, misalnya kelas *entity* yang hanya menyimpan data atau kelas *boundary* yang hanya menampilkan data. Kelas ini teruji secara tidak langsung melalui test case use case. |
| Kelas *entity*, *boundary*, dan *control* | Tiga jenis kelas perancangan pada DPPL. Kelas *entity* (C01 sampai C12) mewakili data, kelas *boundary* (C13 sampai C20) mewakili antarmuka pengguna, dan kelas *control* (C21 sampai C29) mewakili logika alur. Istilah kelas *boundary* berbeda dengan *Boundary* sebagai jenis kasus uji nilai batas. |
| *Mock* | Tiruan komponen yang dipakai pada *unit testing* agar kelas dapat diuji terpisah dari dependensinya, misalnya tiruan *client* Supabase. |
| *Unit testing* | Pengujian satu kelas atau fungsi secara terpisah dari komponen lain. Termasuk *white-box testing* karena penguji melihat isi kode. |
| *Integration testing* | Pengujian interaksi antarkomponen yang sebenarnya, misalnya *controller* dengan *model*, atau aplikasi dengan basis data. |
| *System testing* | Pengujian aplikasi secara utuh dari sudut pandang pengguna berdasarkan skenario use case. Termasuk *black-box testing* karena hanya memperhatikan masukan dan keluaran. |
| *Non-functional testing* | Pengujian kebutuhan non-fungsional, misalnya *performance*, *security*, *compatibility*, dan *reliability*. |

## 1.4 Aturan Penomoran
Dokumen ini memakai pola ID yang sama dengan SKPL, APL, DPPL, dan dokumen Implementasi (Tugas 9). ID pengujian dan ID antarmuka antarkomponen baru diperkenalkan pada dokumen ini.

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| Kebutuhan Fungsional | KFXX | XX adalah nomor urut dari 01 hingga 44, mengikuti SKPL |
| Kebutuhan Non-Fungsional | KNFXX | XX adalah nomor urut dari 01 hingga 14, mengikuti SKPL |
| Aktor | AKTXX | XX adalah nomor urut dari 01 hingga 03, mengikuti SKPL |
| Use Case | UCXX | XX adalah nomor urut dari 01 hingga 09, mengikuti SKPL |
| Kelas | CXX | XX adalah nomor urut dari 01 hingga 29, mengikuti DPPL |
| Algoritma | Algo-XXX | XXX adalah nomor urut algoritma, mengikuti BAB 5 DPPL |
| Query | Q-XXX | XXX adalah nomor urut query, mengikuti BAB 5 DPPL |
| Antarmuka (layar) | I-XX | XX adalah nomor urut layar dari 01 hingga 08, mengikuti BAB 6 DPPL |
| Antarmuka antarkomponen | IA-XX | XX adalah nomor urut batas antarkomponen yang diuji pada Subbab 4.3, dimulai dari 01. Awalan IA dipakai agar tidak tertukar dengan ID layar I-XX. |
| Test Case Unit | CXX-UTYY | XX adalah nomor kelas, YY adalah nomor urut test case unit pada kelas tersebut, dimulai dari 01 |
| Test Case Integrasi | INT-TCYY | YY adalah nomor urut test case integrasi, dimulai dari 01 |
| Test Case Use Case | UCXX-TCYY | XX adalah nomor use case, YY adalah nomor urut test case pada use case tersebut, dimulai dari 01 untuk skenario normal |
| Test Case KNF | KNFXX-TCYY | XX adalah nomor KNF, YY adalah nomor urut test case pada KNF tersebut, dimulai dari 01 |

## 1.5 Referensi
1. K01_G07, *Spesifikasi Kebutuhan Perangkat Lunak (SKPL) PahamHukum*, `docs/M5/K01_G07_SKPL.md`.
2. K01_G07, *Analisis Perangkat Lunak (APL) PahamHukum*, Tugas Besar IF2150.
3. K01_G07, *Deskripsi Perancangan Perangkat Lunak (DPPL) PahamHukum*, `docs/M7/K01_G07_DPPL.md` dan `docs/M8/K01_G07_DPPL2.md`.
4. K01_G07, *Laporan Implementasi PahamHukum (Tugas 9)*, `docs/M9/K01_G07_Implementasi.md`.
5. IEEE, *IEEE Standard for Software and System Test Documentation* (IEEE 829-2008).
6. Vercel, *Next.js Documentation*, https://nextjs.org/docs.
7. Supabase, *Supabase Documentation* (Database, Auth, Storage, Row Level Security), https://supabase.com/docs.
8. Vitest, *Vitest Documentation* (termasuk *coverage* `@vitest/coverage-v8`), https://vitest.dev.
9. Testing Library, *React Testing Library Documentation*, https://testing-library.com/docs/react-testing-library/intro.

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
BAB 1 berisi tujuan penulisan, lingkup masalah, definisi istilah, aturan penomoran, referensi, dan ikhtisar dokumen. BAB 2 memberikan gambaran umum PahamHukum beserta batas dan keterkaitannya dengan sistem lain melalui *physical view* dan *use case diagram*. BAB 3 menjelaskan lingkungan implementasi, modul kelas, antarmuka, dan berkas lain yang telah dibuat. BAB 4 memaparkan strategi kedalaman pengujian serta hasil pengujian unit, integrasi, use case, dan kebutuhan non-fungsional beserta bukti hasilnya. BAB 5 berisi matriks *traceability* yang memetakan setiap KF dan KNF ke use case, kelas, berkas implementasi, dan test case.

<br>

---

# BAB 2: Deskripsi Umum Perangkat Lunak

PahamHukum dibangun dengan arsitektur MVC di atas Next.js. Seluruh antarmuka dan logika aplikasi berjalan pada satu aplikasi Next.js: kelas *boundary* (C13 sampai C20) diwujudkan sebagai halaman dan komponen React, kelas *control* (C21 sampai C29) sebagai modul fungsi dan *Server Action* di sisi server, dan kelas *entity* (C01 sampai C12) sebagai modul *model* yang mengakses basis data. Batas sistem PahamHukum adalah aplikasi Next.js tersebut beserta skema basis datanya. Di luar batas sistem terdapat Supabase sebagai layanan eksternal, yang menyediakan basis data PostgreSQL dengan *Row Level Security* (RLS), Supabase Auth untuk autentikasi Kurator dan Administrator, serta Supabase Storage (*bucket* privat `templat`) untuk berkas templat surat. Peramban pengguna hanya berkomunikasi dengan aplikasi Next.js, kecuali saat mengunduh templat melalui *signed URL* Storage. Status centang daftar periksa dokumen disimpan di `localStorage` peramban, sehingga tidak dikirim ke server.

<p align="center">
<img alt="Physical View PahamHukum" src="./assets/diagram/physical-view-pahamhukum.svg" width="90%">
</p>
<p align="center">
<i>Gambar 2.1. Physical View PahamHukum</i>
</p>

Sistem memiliki tiga aktor. Pencari Informasi (AKT01) adalah masyarakat umum yang menjelajahi kelompok kasus per bidang hukum (UC01), mencari kasus dengan kata kunci (UC02), menandai daftar periksa dokumen (UC03), dan mengunduh templat surat (UC04) tanpa perlu akun. Kurator (AKT02) masuk ke panel pengelolaan (UC05), menyusun dan mengajukan konten rangkuman kasus (UC06), serta melacak status kontennya beserta catatan revisi (UC07). Administrator (AKT03) masuk ke panel yang sama (UC05), memoderasi konten yang diajukan dengan menyetujui atau mengembalikannya (UC08), dan mengelola akun Kurator (UC09). Konten yang disusun Kurator baru tampil untuk Pencari Informasi setelah disetujui Administrator.

<p align="center">
<img alt="Use Case Diagram PahamHukum" src="./assets/diagram/use-case-diagram.png" width="90%">
</p>
<p align="center">
<i>Gambar 2.2. Use Case Diagram PahamHukum</i>
</p>

**Batasan dan keterkaitan dengan sistem lain.** PahamHukum tidak menarik data dari sistem lain dan tidak mengirim data pengguna ke lembaga mana pun. Keterkaitannya dengan pihak luar dirangkum pada Tabel 2.1.

Tabel 2.1. Keterkaitan PahamHukum dengan Sistem Lain

| Sistem di luar PahamHukum | Bentuk keterkaitan | Batasan |
| :--- | :--- | :--- |
| Supabase (PostgreSQL, Auth, Storage) | Basis data seluruh *entity*, autentikasi Kurator dan Administrator, serta penyimpanan berkas templat pada *bucket* privat `templat` | Diakses hanya dari kode aplikasi. Hak akses dibatasi RLS, sehingga pengunjung publik hanya dapat membaca konten Disetujui. |
| Peramban pengguna | Menampilkan antarmuka dan menyimpan status *checklist* di `localStorage` | Status *checklist* tidak pernah dikirim ke server (KNF06). |
| Sumber hukum resmi (misalnya JDIH dan peraturan.bpk.go.id) | Ditautkan sebagai artikel pendukung oleh Kurator | Hanya berupa tautan. Aplikasi tidak menarik isi dari situs tersebut. |
| Layanan darurat (112) dan kepolisian (110) | Tombol telepon (`tel:`) pada peringatan darurat | Panggilan dilakukan oleh perangkat pengguna. Aplikasi tidak menangani situasi darurat secara langsung. |
| Lembaga Bantuan Hukum | Ditampilkan sebagai direktori beserta wilayah layanan dan tautannya | Informasi statis. Tidak ada data pengguna yang dikirim ke LBH. |

<br>

---

# BAB 3: Implementasi

Bab ini memuat elemen perangkat lunak yang telah dikembangkan, yaitu lingkungan implementasi, modul kelas, antarmuka, dan berkas lain. Karena PahamHukum adalah aplikasi web Next.js, tidak ada berkas *executable* tersendiri; aplikasi dijalankan dengan `npm run dev`, atau dibangun dengan `npm run build` lalu `npm start` dari folder `src/`. Perubahan implementasi terhadap rancangan DPPL telah dicatat pada Tabel B.1 dokumen Implementasi (Tugas 9). Pada Milestone 10 ditambahkan operasi `perbaruiKurator()` untuk mengubah email Kurator (KF43, PR #115) dan pengalihan tombol Keluar ke halaman login (KF44, PR #114).

## 3.1 Lingkungan Implementasi

Lingkungan implementasi konsisten dengan Subbab 2.1 DPPL. Perubahannya hanya pada penambahan alat pengujian (Vitest, React Testing Library, dan `@vitest/coverage-v8`) serta Supabase CLI dengan Docker untuk menjalankan basis data lokal pada pengujian integrasi.

Tabel 3.1. Lingkungan Implementasi

| Aspek | Keterangan |
| :--- | :--- |
| *Hardware* | Laptop masing-masing anggota (prosesor x86-64 atau ARM64, RAM minimal 8 GB); layanan Supabase *cloud* untuk basis data, Auth, dan Storage |
| *Operating System* | Windows 11 dan macOS (pengembangan); Supabase lokal berjalan di Docker (*container* Linux) |
| *Bahasa Pemrograman* | `typeScript` 5 (Node.js 24), SQL (PostgreSQL), CSS |
| *Framework/Library* | Next.js 16.4.5 (App Router, *Server Action*, `proxy.ts`), React 19.3.0, Tailwind CSS 4, `@supabase/supabase-js` 2.119, `@supabase/ssr` 0.12 |
| *DBMS* | `postgreSQL` 17 pada Supabase, dengan RLS dan ekstensi `pg_trgm` |
| *Development Tools* | Visual Studio Code, Git dan GitHub (*branch*, *pull request*, *code review*), npm, ESLint 9, Supabase CLI, Docker Desktop, Chrome DevTools |
| *Testing Tools* | Vitest 5.1 dengan lingkungan jsdom (*unit* dan *integration test*), `@vitest/coverage-v8` (laporan *coverage*), React Testing Library, Supabase lokal (basis data uji integrasi), Chrome DevTools (pengukuran KNF), `psql` (inspeksi basis data) |

## 3.2 Implementasi Modul

Seluruh 29 kelas pada DPPL telah diimplementasikan. Nama dan ID kelas mengikuti DPPL dan konsisten dengan Tabel B.5 dokumen Implementasi (Tugas 9). Kelas *entity* juga diwujudkan sebagai tabel pada `src/supabase/migrations/0001_skema.sql`. Kolom Nama File Executable bernilai "-" karena aplikasi web tidak menghasilkan berkas *executable* per modul.

Tabel 3.2. Implementasi Modul

| No | ID Kelas | Nama Modul/Kelas | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | C01 | Akun | `src/lib/models/akun.ts` | - |
| 2 | C02 | Kurator | `src/lib/models/kurator.ts` | - |
| 3 | C03 | Administrator | `src/lib/models/administrator.ts` | - |
| 4 | C04 | `bidangHukum` | `src/lib/models/bidangHukum.ts` | - |
| 5 | C05 | `kelompokKasus` | `src/lib/models/kelompokKasus.ts`<br>`src/lib/models/pencarian.ts` | - |
| 6 | C06 | `rangkumanKasus` | `src/lib/models/rangkumanKasus.ts` | - |
| 7 | C07 | `langkahPenyelesaian` | `src/lib/models/langkahPenyelesaian.ts` | - |
| 8 | C08 | Checklist | `src/supabase/migrations/0001_skema.sql` | - |
| 9 | C09 | `templatDokumen` | `src/lib/models/templatDokumen.ts` | - |
| 10 | C10 | Artikel | `src/lib/models/artikel.ts` | - |
| 11 | C11 | `lembagaBantuanHukum` | `src/lib/models/lembagaBantuanHukum.ts` | - |
| 12 | C12 | `riwayatStatus` | `src/lib/models/riwayatStatus.ts` | - |
| 13 | C13 | `halamanJelajahKasus` | `src/app/page.tsx`<br>`src/components/beranda/` | - |
| 14 | C14 | `halamanRangkumanKasus` | `src/app/kasus/[id]/page.tsx`<br>`src/components/kasus/` | - |
| 15 | C15 | `halamanPencarianKataKunci` | `src/app/cari/page.tsx`<br>`src/components/pencarian/` | - |
| 16 | C16 | `halamanLogin` | `src/app/masuk/page.tsx`<br>`src/components/login/FormLogin.tsx` | - |
| 17 | C17 | `halamanPenyusunanKonten` | `src/app/panel/kurator/konten/baru/page.tsx`<br>`src/app/panel/kurator/konten/[id]/page.tsx`<br>`src/components/konten/` | - |
| 18 | C18 | `halamanDaftarKontenKurator` | `src/app/panel/kurator/konten/page.tsx`<br>`src/components/pelacakan/DaftarKonten.tsx` | - |
| 19 | C19 | `halamanModerasiKonten` | `src/app/panel/admin/moderasi/page.tsx`<br>`src/components/moderasi/` | - |
| 20 | C20 | `halamanPengelolaanAkun` | `src/app/panel/admin/akun/page.tsx`<br>`src/components/akun/` | - |
| 21 | C21 | `kontrolJelajahKasus` | `src/lib/controllers/kontrolJelajahKasus.ts` | - |
| 22 | C22 | `kontrolPencarianKataKunci` | `src/lib/controllers/kontrolPencarianKataKunci.ts` | - |
| 23 | C23 | `kontrolChecklist` | `src/lib/controllers/kontrolChecklist.ts` | - |
| 24 | C24 | `kontrolUnduhTemplat` | `src/lib/controllers/kontrolUnduhTemplat.ts` | - |
| 25 | C25 | `kontrolAutentikasi` | `src/lib/controllers/kontrolAutentikasi.ts`<br>`src/lib/controllers/aturanSesi.ts`<br>`src/proxy.ts` | - |
| 26 | C26 | `kontrolPenyusunanKonten` | `src/lib/controllers/kontrolPenyusunanKonten.ts`<br>`src/lib/controllers/aturanPenyusunanKonten.ts` | - |
| 27 | C27 | `kontrolPelacakanKonten` | `src/lib/controllers/kontrolPelacakanKonten.ts` | - |
| 28 | C28 | `kontrolModerasiKonten` | `src/lib/controllers/kontrolModerasiKonten.ts` | - |
| 29 | C29 | `kontrolPengelolaanAkun` | `src/lib/controllers/kontrolPengelolaanAkun.ts`<br>`src/lib/controllers/validasiAkun.ts` | - |

## 3.3 Implementasi Antarmuka

Seluruh delapan layar pada BAB 6 DPPL telah diimplementasikan dengan ID dan nama yang sama.

Tabel 3.3. Implementasi Antarmuka

| No | ID Antarmuka | Nama Antarmuka | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | I-01 | Beranda | `src/app/page.tsx` | - |
| 2 | I-02 | Rangkuman Kasus | `src/app/kasus/[id]/page.tsx` | - |
| 3 | I-03 | Pencarian Kata Kunci | `src/app/cari/page.tsx` | - |
| 4 | I-04 | Login Pengelola | `src/app/masuk/page.tsx` | - |
| 5 | I-05 | Penyusunan Konten | `src/app/panel/kurator/konten/baru/page.tsx`<br>`src/app/panel/kurator/konten/[id]/page.tsx` | - |
| 6 | I-06 | Daftar Konten Kurator | `src/app/panel/kurator/konten/page.tsx` | - |
| 7 | I-07 | Moderasi Konten | `src/app/panel/admin/moderasi/page.tsx` | - |
| 8 | I-08 | Pengelolaan Akun Kurator | `src/app/panel/admin/akun/page.tsx` | - |

## 3.4 File Lain

Berikut berkas lain selain berkas kelas dan antarmuka, yaitu konfigurasi, skema dan data basis data, *utility*, serta berkas pengujian.

Tabel 3.4. File Lain

| No | Nama File | Keterangan |
| :--- | :--- | :--- |
| 1 | `src/package.json`<br>`src/package-lock.json` | Daftar dependensi dan skrip (`dev`, `build`, `test`, `test:coverage`, `test:integrasi`) |
| 2 | `src/next.config.ts`<br>`src/tsconfig.json`<br>`src/eslint.config.mjs` | Konfigurasi Next.js, TypeScript, dan ESLint |
| 3 | `src/vitest.config.mts`<br>`src/vitest.integrasi.config.mts` | Konfigurasi Vitest untuk *unit test* (jsdom dan *coverage*) dan *integration test* (Supabase lokal) |
| 4 | `src/supabase/config.toml` | Konfigurasi Supabase CLI untuk basis data lokal |
| 5 | `src/supabase/migrations/0001_skema.sql` | Skema tabel, RLS, *trigger* `riwayat_status_permanen`, dan fungsi `tambah_jumlah_konten` |
| 6 | `src/supabase/migrations/0002_penyusunan_konten.sql` | Fungsi basis data `simpan_draf` untuk menyimpan draf secara atomik |
| 7 | `src/supabase/migrations/0003_templat_dokumen.sql` | *Bucket* privat `templat` beserta kebijakan RLS Storage |
| 8 | `src/supabase/migrations/0004_ajukan_konten.sql` | Fungsi basis data `ajukan_konten` untuk mengubah status dan mencatat riwayat secara atomik |
| 9 | `src/supabase/migrations/0005_indeks_pencarian.sql` | Indeks `pg_trgm` untuk pencarian kata kunci |
| 10 | `src/supabase/seed.sql` | Data awal dan akun uji untuk basis data lokal |
| 11 | `src/lib/supabase/` | *Utility* pembuat *client* Supabase untuk peramban, server, dan *service role* |
| 12 | `src/app/panel/sesi/route.ts`<br>`src/components/panel/useJagaSesi.ts` | Pembaruan waktu aktivitas sesi panel (KNF14) |
| 13 | `src/components/ui/`<br>`src/components/layout/` | Komponen antarmuka bersama, misalnya tombol, *badge*, dan navigasi |
| 14 | `src/tests/` | Berkas *unit test* (Subbab 4.2) |
| 15 | `src/tests/integrasi/` | Berkas *integration test* beserta *helper* `supabaseLokal.ts` dan `setupEnv.ts` (Subbab 4.3) |
| 16 | `src/README.md` | Panduan instalasi, menjalankan aplikasi dan pengujian, serta akun uji |

<br>

---

# BAB 4: Hasil Pengujian

Bab ini melaporkan hasil pengujian P/L pada level unit, integrasi, dan sistem. Pengujian dilakukan pada tag release terakhir Tugas 9. Hasil aktual diisi berdasarkan pengamatan saat pengujian. Kesimpulan diisi `Pass` atau `Fail`, dan untuk `Fail` dilengkapi penyebab serta usulan perbaikan.

## 4.1 Strategi dan Kedalaman Pengujian Kelas

Penentuan kedalaman pengujian memakai pendekatan *risk-based testing*. Setiap kelas perancangan pada Tabel 4.1 DPPL diklasifikasikan ke dalam tiga tingkat kedalaman pengujian. Tingkat **Mendalam** diberikan pada kelas yang memuat logika bisnis, perhitungan, validasi, aturan status, algoritma, integrasi eksternal, atau keamanan. Tingkat **Sedang** diberikan pada kelas yang hanya mengoordinasikan atau mendelegasikan proses. Tingkat **Tidak perlu** diberikan pada kelas tanpa logika, seperti kelas *entity* yang hanya menyimpan data dan kelas *boundary* yang hanya menampilkan data, yang teruji secara tidak langsung melalui test case use case.

Dari 29 kelas perancangan, 12 kelas bertingkat Mendalam, 5 kelas bertingkat Sedang, dan 12 kelas bertingkat Tidak perlu.

Tabel 4.1.1. Identifikasi Tingkat Pengujian Kelas

| ID Kelas | Nama Kelas | Tingkat | Alasan | Test Case Terkait |
| :--- | :--- | :--- | :--- | :--- |
| C01 | Akun | Tidak perlu | Hanya membaca profil dan peran akun. Penyimpanan dan pencocokan kata sandi ditangani Supabase Auth. | UC05-TC01 s.d. UC05-TC04, KNF10-TC01 |
| C02 | Kurator | Mendalam | Memuat aturan status (Kurator hanya dapat diubah oleh Administrator pemiliknya), validasi email unik dengan *escape* pola, integrasi Supabase Auth dengan pembatalan akun jika penyimpanan gagal, serta algoritma pengurutan daftar konten dan riwayat. | C02-UT01 s.d. C02-UT20 |
| C03 | Administrator | Mendalam | Memuat perhitungan waktu pengajuan terakhir dan lama menunggu, serta algoritma pengurutan antrean peninjauan (Q-007, KF31). | C03-UT01 s.d. C03-UT19 |
| C04 | `bidangHukum` | Tidak perlu | Hanya menyimpan data bidang hukum. `cekAktif` berupa pemeriksaan satu atribut. | UC01-TC01, UC02-TC02 |
| C05 | `kelompokKasus` | Sedang | `cekDarurat` dan `cocokkanKataKunci` (Algo-012) berupa pemeriksaan sederhana. Algoritma pencarian utamanya diuji pada C22. | C05-UT01 s.d. C05-UT09 |
| C06 | `rangkumanKasus` | Mendalam | Memuat aturan kelengkapan isian (Algo-016), transisi status ke Diajukan, pencocokan kata kunci (Algo-013), dan pembatasan konten publik hanya yang Disetujui (KF02). | C06-UT01 s.d. C06-UT22 |
| C07 | `langkahPenyelesaian` | Tidak perlu | Hanya struktur data langkah. Penanda tenggat teruji melalui C06. | UC01-TC01, UC06-TC01 |
| C08 | Checklist | Tidak perlu | Hanya menyimpan daftar dokumen. Logika centang berada di C23. | UC03-TC01, UC06-TC01 |
| C09 | `templatDokumen` | Mendalam | Memuat validasi format dan ukuran berkas (Algo-021), pembaruan versi dengan pembatalan unggahan jika gagal (Algo-022, KNF08), serta pembuatan *signed URL* pada *bucket* privat (Algo-023). | C09-UT01 s.d. C09-UT27 |
| C10 | Artikel | Tidak perlu | Hanya struktur data judul dan tautan sumber. | UC01-TC01, UC06-TC01 |
| C11 | `lembagaBantuanHukum` | Sedang | `cocokkanWilayah` berupa penyaringan sederhana berdasarkan wilayah. | C11-UT01 s.d. C11-UT04 |
| C12 | `riwayatStatus` | Mendalam | Memuat transisi keputusan moderasi, pemulihan status jika pencatatan gagal, aturan alasan revisi wajib (Algo-049), dan riwayat yang permanen (KNF09). | C12-UT01 s.d. C12-UT19 |
| C13 | `halamanJelajahKasus` | Tidak perlu | Hanya menampilkan data dan meneruskan aksi ke C21. | UC01-TC01, UC01-TC02 |
| C14 | `halamanRangkumanKasus` | Tidak perlu | Hanya menampilkan rangkuman. Logika checklist dan unduh berada di C23 dan C24. | UC01-TC01, UC03-TC01, UC03-TC02, UC04-TC01, UC04-TC02 |
| C15 | `halamanPencarianKataKunci` | Tidak perlu | Hanya menampilkan hasil dari C22. | UC02-TC01, UC02-TC02 |
| C16 | `halamanLogin` | Tidak perlu | Hanya meneruskan isian ke C25 dan menampilkan pesan galat. | UC05-TC01, UC05-TC02 |
| C17 | `halamanPenyusunanKonten` | Sedang | Satu-satunya kelas *boundary* yang memiliki logika sendiri, yaitu menambah, menghapus, dan mengurutkan butir langkah dan artikel. | C17-UT01 s.d. C17-UT07 |
| C18 | `halamanDaftarKontenKurator` | Tidak perlu | Hanya menampilkan daftar dan catatan revisi dari C27. | UC07-TC01, UC07-TC02 |
| C19 | `halamanModerasiKonten` | Tidak perlu | Hanya menampilkan antrean dan meneruskan keputusan ke C28. | UC08-TC01 s.d. UC08-TC03 |
| C20 | `halamanPengelolaanAkun` | Tidak perlu | Hanya menampilkan daftar Kurator dan meneruskan aksi ke C29. | UC09-TC01, UC09-TC02 |
| C21 | `kontrolJelajahKasus` | Sedang | Mendelegasikan pengambilan data ke model dan menghitung jumlah kelompok per bidang. | C21-UT01 s.d. C21-UT14 |
| C22 | `kontrolPencarianKataKunci` | Mendalam | Memuat algoritma pencarian (Algo-032, Algo-012, Algo-013), *escape* pola `ILIKE`, serta penyaringan konten Disetujui dan bidang aktif. | C22-UT01 s.d. C22-UT17 |
| C23 | `kontrolChecklist` | Mendalam | Memuat penyimpanan status centang di `localStorage`, penanganan data rusak, sinkronisasi antartab, dan perhitungan kelengkapan. | C23-UT01 s.d. C23-UT20, INT-TC16, INT-TC17 |
| C24 | `kontrolUnduhTemplat` | Mendalam | Memuat aturan keamanan (hanya templat milik konten Disetujui dan validasi id) serta integrasi dengan Supabase Storage. | C24-UT01 s.d. C24-UT12 |
| C25 | `kontrolAutentikasi` | Mendalam | Memuat aturan keamanan login, proteksi rute per peran, pemutusan sesi akun nonaktif, dan batas sesi 30 menit (KNF14). | C25-UT01 s.d. C25-UT24 |
| C26 | `kontrolPenyusunanKonten` | Mendalam | Memuat aturan penyuntingan per status, validasi isian, pengajuan konten, serta unggah dan hapus templat. | C26-UT01 s.d. C26-UT22 |
| C27 | `kontrolPelacakanKonten` | Sedang | Hanya meneruskan permintaan daftar konten ke model C02. | C27-UT01 s.d. C27-UT04 |
| C28 | `kontrolModerasiKonten` | Mendalam | Memuat aturan bahwa hanya Administrator aktif yang dapat memutuskan, alasan revisi wajib, keputusan hanya untuk konten Diajukan, dan pemulihan status. | C28-UT01 s.d. C28-UT16 |
| C29 | `kontrolPengelolaanAkun` | Mendalam | Memuat aturan keamanan (hanya Administrator), validasi email dan kata sandi, email unik, serta pembatalan akun jika pendaftaran gagal. | C29-UT01 s.d. C29-UT17 |

## 4.2 Pengujian Unit Kelas

Pengujian unit dilakukan pada kelas bertingkat Mendalam dan Sedang. Kelas Mendalam diuji pada seluruh operasi public dengan kasus normal, batas, dan negatif, serta mencapai *coverage* minimal 70%. Kelas Sedang diuji minimal dengan satu kasus normal dan satu kasus gagal pada operasi public utama.

Cara menjalankan unit test: `npm test` dari folder `src/`. Laporan *coverage* dihasilkan dengan `npm run test:coverage` (Vitest dan `@vitest/coverage-v8`).

Lokasi file test: `src/tests/`. Judul test diberi awalan ID pengujian, misalnya `C06-UT01`, sehingga keluaran *test runner* dapat dicocokkan langsung dengan tabel pada subbab ini. Pada berkas test yang judulnya belum memuat ID, nomor ID mengikuti urutan test di dalam berkas. Dependensi basis data pada *unit test* diganti *mock* *client* Supabase.

### 4.2.1 Kelas Kurator

**ID Kelas:** C02  
**Nama Kelas:** Kurator  
**Tingkat:** Mendalam

Tabel 4.2.1. Hasil Pengujian Unit Kelas C02

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C02-UT01 | `perbaruiEmail` (`perbaruiEmailKurator`) | Normal | Kurator milik Administrator, email baru valid | Email diganti di Supabase Auth lalu di tabel `akun` | Sesuai harapan | Pass |
| C02-UT02 | `perbaruiEmailKurator` | Negatif | Kurator bukan milik Administrator tersebut | Mengembalikan false tanpa mengubah Auth maupun tabel | Sesuai harapan | Pass |
| C02-UT03 | `perbaruiEmailKurator` | Negatif | Pembaruan Auth gagal | Galat diteruskan, tabel `akun` tidak disentuh | Sesuai harapan | Pass |
| C02-UT04 | `perbaruiEmailKurator` | Negatif | Penyimpanan tabel `akun` gagal | Email Auth dikembalikan ke email lama | Sesuai harapan | Pass |
| C02-UT05 | `ambilDaftarKurator` (Q-006) | Normal | Dua Kurator dengan urutan acak | Dipetakan dan diurutkan menurut email, difilter `id_administrator` | Sesuai harapan | Pass |
| C02-UT06 | `ambilDaftarKurator` | Batas | Belum ada Kurator | Daftar kosong | Sesuai harapan | Pass |
| C02-UT07 | `ambilDaftarKurator` | Negatif | Basis data mengembalikan galat | Galat diteruskan | Sesuai harapan | Pass |
| C02-UT08 | `cekEmailUnik` (Q-028) | Normal | Jumlah akun dengan email = 0 | true | Sesuai harapan | Pass |
| C02-UT09 | `cekEmailUnik` | Negatif | Jumlah akun dengan email = 1 | false | Sesuai harapan | Pass |
| C02-UT10 | `cekEmailUnik` | Batas | Email berisi `_`, `%`, dan `\` | Karakter pola ILIKE di-*escape* sehingga tidak menjadi *wildcard* | Sesuai harapan | Pass |
| C02-UT11 | `cekEmailUnik` | Negatif | Basis data mengembalikan galat | Galat diteruskan | Sesuai harapan | Pass |
| C02-UT12 | `simpanKuratorBaru` (Q-029, Q-030) | Normal | Email dan kata sandi valid | Akun Auth dibuat, lalu baris `akun` dan `kurator` disimpan | Sesuai harapan | Pass |
| C02-UT13 | `simpanKuratorBaru` | Negatif | Pembuatan akun Auth gagal | Galat diteruskan, profil tidak disimpan | Sesuai harapan | Pass |
| C02-UT14 | `simpanKuratorBaru` | Negatif | Penyimpanan baris `akun` gagal | Akun Auth dihapus kembali | Sesuai harapan | Pass |
| C02-UT15 | `simpanKuratorBaru` | Negatif | Penyimpanan baris `kurator` gagal | Akun Auth dihapus kembali | Sesuai harapan | Pass |
| C02-UT16 | `nonaktifkan()` (`aturStatusKurator`, Q-004) | Normal | Kurator milik Administrator | true, hanya baris Kurator milik Administrator tersebut yang diubah | Sesuai harapan | Pass |
| C02-UT17 | `aturStatusKurator` | Negatif | Kurator tidak ditemukan atau bukan miliknya | false | Sesuai harapan | Pass |
| C02-UT18 | `aturStatusKurator` | Negatif | Basis data mengembalikan galat | Galat diteruskan | Sesuai harapan | Pass |
| C02-UT19 | `ambilDaftarKonten()` (Q-005) | Normal, Batas | Satu konten dengan dua riwayat dan satu draf tanpa kelompok maupun riwayat | Difilter `id_kurator`, riwayat terurut, tanggal diperbarui dari riwayat terbaru, draf memakai "Tanpa judul" dan "—" | Sesuai harapan | Pass |
| C02-UT20 | `ambilDaftarKonten()` | Negatif | Basis data mengembalikan galat | Galat diteruskan | Sesuai harapan | Pass |

Tabel 4.2.1b. Ringkasan Cakupan Kelas C02

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `cekAktif()`, `tambahJumlahKonten()`, `nonaktifkan()`, `ambilDaftarKonten()` |
| Operasi yang diuji | `nonaktifkan()` (C02-UT16 s.d. UT18), `ambilDaftarKonten()` (C02-UT19, UT20, serta test pengurutan milik Michael di `tests/daftarKonten.test.ts`), dan operasi tambahan Model Kurator pada implementasi. `cekAktif()` diwujudkan sebagai `statusAktif` pada `cariAkun` dan teruji lewat C25-UT05 dan INT-TC03. `tambahJumlahKonten()` diwujudkan sebagai trigger basis data dan teruji lewat INT-TC05 |
| ID Algoritma yang tercakup | Algo-005 (lewat trigger, INT-TC05), Algo-006, Algo-007 |
| Coverage (wajib ≥ 70%) | 100% baris, 95,34% cabang, 98,36% *statement* (`lib/models/kurator.ts`). Bukti pada 4.6 |

### 4.2.2 Kelas Administrator

**ID Kelas:** C03  
**Nama Kelas:** Administrator  
**Tingkat:** Mendalam

Berkas test: `src/tests/antreanPeninjauan.test.ts` (C03-UT01 s.d. C03-UT10) dan `src/tests/modelAdministrator.test.ts` (C03-UT11 s.d. C03-UT19).

Tabel 4.2.2. Hasil Pengujian Unit Kelas C03

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C03-UT01 | `urutkanAntreanPeninjauan(daftar)` | Normal | Tiga butir dengan waktu pengajuan berbeda | Pengajuan paling lama berada di urutan pertama (KF31) | Sesuai harapan | Pass |
| C03-UT02 | `urutkanAntreanPeninjauan(...)` | Batas | Satu butir tanpa riwayat Diajukan | Butir tersebut diletakkan paling akhir | Sesuai harapan | Pass |
| C03-UT03 | `urutkanAntreanPeninjauan(...)` | Batas | Dua butir dengan waktu pengajuan sama | Id terkecil diletakkan lebih dulu | Sesuai harapan | Pass |
| C03-UT04 | `urutkanAntreanPeninjauan(...)` | Normal | Array masukan | Array masukan tidak berubah | Sesuai harapan | Pass |
| C03-UT05 | `waktuPengajuanTerakhir(riwayat)` (Q-007) | Normal | Riwayat berisi beberapa status Diajukan dan status lain | Mengambil waktu Diajukan terbaru dan mengabaikan status lain | Sesuai harapan | Pass |
| C03-UT06 | `waktuPengajuanTerakhir(...)` | Negatif | Tidak ada riwayat Diajukan | Mengembalikan null | Sesuai harapan | Pass |
| C03-UT07 | `lamaMenungguHari(waktu, sekarang)` | Normal | Pengajuan beberapa hari lalu | Jumlah hari penuh sejak pengajuan | Sesuai harapan | Pass |
| C03-UT08 | `lamaMenungguHari(...)` | Batas | Pengajuan pada hari yang sama | 0 hari | Sesuai harapan | Pass |
| C03-UT09 | `lamaMenungguHari(...)` | Batas | Waktu pengajuan di masa depan | Tidak negatif (0) | Sesuai harapan | Pass |
| C03-UT10 | `lamaMenungguHari(...)` | Negatif | Waktu pengajuan null | Mengembalikan null | Sesuai harapan | Pass |
| C03-UT11 | `ambilAntreanPeninjauan(supabase)` (Algo-009) | Normal | *Mock* basis data | Kueri ke `rangkuman_kasus` hanya untuk status Diajukan | Sesuai harapan | Pass |
| C03-UT12 | `ambilAntreanPeninjauan(...)` | Normal | Tiga konten dengan riwayat campuran dan satu tanpa riwayat | Butir dipetakan dan diurutkan dari pengajuan Diajukan terakhir paling lama | Sesuai harapan | Pass |
| C03-UT13 | `ambilAntreanPeninjauan(...)` | Batas | Kelompok kasus dan nama penulis kosong | Memakai nilai pengganti "Tanpa judul", "—", dan "Tanpa nama" | Sesuai harapan | Pass |
| C03-UT14 | `ambilAntreanPeninjauan(...)` | Negatif | Basis data mengembalikan galat | Galat diteruskan | Sesuai harapan | Pass |
| C03-UT15 | `ambilKontenModerasi(supabase, id)` | Normal | Konten lengkap dengan langkah, templat, dan artikel acak | Isi dipetakan; langkah urut nomor, templat terbaru di atas, artikel urut id | Sesuai harapan | Pass |
| C03-UT16 | `ambilKontenModerasi(...)` | Batas | Checklist berbentuk objek tunggal | Daftar dokumen tetap terbaca | Sesuai harapan | Pass |
| C03-UT17 | `ambilKontenModerasi(...)` | Batas | Seluruh relasi konten kosong | Daftar kosong dan nilai pengganti | Sesuai harapan | Pass |
| C03-UT18 | `ambilKontenModerasi(...)` | Negatif | Id konten tidak ditemukan | Mengembalikan null | Sesuai harapan | Pass |
| C03-UT19 | `ambilKontenModerasi(...)` | Negatif | Basis data mengembalikan galat | Galat diteruskan | Sesuai harapan | Pass |

Tabel 4.2.2b. Ringkasan Cakupan Kelas C03

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `ambilKuratorTerdaftar()`, `ambilAntreanPeninjauan()` |
| Operasi yang diuji | `ambilAntreanPeninjauan()` beserta fungsi pendukungnya (`urutkanAntreanPeninjauan`, `waktuPengajuanTerakhir`, `lamaMenungguHari`) serta operasi tambahan `ambilKontenModerasi()`. `ambilKuratorTerdaftar()` diwujudkan sebagai `ambilDaftarKurator()` di C02 dan diuji pada C02-UT05 s.d. C02-UT07 |
| ID Algoritma yang tercakup | Algo-009, Q-007 |
| Coverage (wajib ≥ 70%) | `src/lib/models/administrator.ts`: 100% baris, 98% cabang, 100% fungsi |

### 4.2.3 Kelas KelompokKasus

**ID Kelas:** C05  
**Nama Kelas:** KelompokKasus  
**Tingkat:** Sedang  
**File test:** `src/tests/modelKelompokKasus.test.ts`

Operasi `cocokkanKataKunci()` diimplementasikan sebagai `cocokkanKataKunciKelompok()` di `src/lib/models/pencarian.ts` (Tabel B.5 dokumen Implementasi).

Tabel 4.2.3. Hasil Pengujian Unit Kelas C05

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C05-UT01 | `ambilKelompokDisetujui(supabase): KelompokKasus[]` | Normal | *Mock* Supabase mengembalikan satu baris kelompok "Gaji tidak dibayar tepat waktu" | Baris dipetakan ke objek `KelompokKasus`; query memakai `rangkuman_kasus!inner(status)`, filter `rangkuman_kasus.status = Disetujui`, dan urutan `id_kelompok` | Objek dan filter sesuai harapan | Pass |
| C05-UT02 | `ambilKelompokDisetujui(supabase)` | Gagal | *Mock* Supabase mengembalikan galat "permintaan ditolak" | Galat diteruskan ke pemanggil | Galat yang sama dilempar | Pass |
| C05-UT03 | `cekDarurat(kelompok): bool` | Normal | Kelompok "Mengalami kekerasan di rumah" dengan `penandaDarurat = true` | `true` | `true` | Pass |
| C05-UT04 | `cekDarurat(kelompok): bool` | Normal | Kelompok yang sama dengan `penandaDarurat = false` | `false` | `false` | Pass |
| C05-UT05 | `cocokkanKataKunci(kataKunci): bool` (Algo-012) | Normal | Kata kunci "RUMAH TANGGA" terhadap istilah "Kekerasan dalam rumah tangga" | `true` (tidak membedakan huruf besar dan kecil) | `true` | Pass |
| C05-UT06 | `cocokkanKataKunci(kataKunci): bool` | Batas | Kata kunci hanya berisi spasi `"   "` | `false` | `false` | Pass |
| C05-UT07 | `cocokkanKataKunci(kataKunci): bool` | Gagal | Kata kunci "pesangon" yang tidak ada di judul maupun istilah | `false` | `false` | Pass |
| C05-UT08 | `ambilPilihanKelompok(supabase): PilihanKelompok[]` | Normal | *Mock* Supabase mengembalikan kelompok "Diberhentikan tanpa pesangon" pada bidang Ketenagakerjaan | Pilihan berisi id, nama bidang, dan judul; filter `bidang_hukum.status_aktif = true`; urutan `id_bidang` lalu `id_kelompok` | Sesuai harapan | Pass |
| C05-UT09 | `ambilPilihanKelompok(supabase)` | Gagal | *Mock* Supabase mengembalikan galat | Galat diteruskan ke pemanggil | Galat yang sama dilempar | Pass |


### 4.2.4 Kelas RangkumanKasus

**ID Kelas:** C06  
**Nama Kelas:** RangkumanKasus  
**Tingkat:** Mendalam  
**File test:** `src/tests/modelRangkumanKasus.test.ts`

Tabel 4.2.4. Hasil Pengujian Unit Kelas C06

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C06-UT01 | `buatRangkuman(supabase, idKelompok, idKurator): number` | Normal | Kelompok 1, Kurator `k1`; basis data mengembalikan id 12 | Id 12 dikembalikan dan data yang dimasukkan berisi `id_kelompok` 1 dan `id_kurator` `k1` | Id 12 dikembalikan dengan data masukan yang sesuai | Pass |
| C06-UT02 | `buatRangkuman(...)` | Negatif | Basis data menolak dengan galat RLS `42501` | Galat diteruskan ke pemanggil | Galat `42501` diteruskan | Pass |
| C06-UT03 | `ambilRangkumanMilik(supabase, idRangkuman, idKurator): RangkumanKasus` | Normal | Rangkuman 11 milik `k1` dengan langkah bernomor 2 dan 1, artikel ber-id 9 dan 3, serta sebagian kolom `null` | Query difilter `id_rangkuman` dan `id_kurator`; langkah terurut per nomor, artikel per id, dan nilai `null` menjadi teks kosong | Filter, urutan langkah dan artikel, serta pemetaan nilai sesuai | Pass |
| C06-UT04 | `ambilRangkumanMilik(...)` | Batas | Rangkuman baru tanpa langkah, checklist, dan artikel | Seluruh isian bernilai teks kosong dan seluruh daftar kosong | Isian dan daftar kosong | Pass |
| C06-UT05 | `ambilRangkumanMilik(...)` | Negatif | Rangkuman 99 tidak ditemukan atau milik Kurator lain | Mengembalikan `null` | `null` dikembalikan | Pass |
| C06-UT06 | `ambilRangkumanMilik(...)` | Negatif | Basis data mengembalikan galat | Galat diteruskan | Galat diteruskan | Pass |
| C06-UT07 | `ambilIsianKosong(data): IsianWajib[]` | Normal | Konten dengan seluruh isian wajib terisi | Daftar kosong | Daftar kosong | Pass |
| C06-UT08 | `ambilIsianKosong(...)` | Batas | Checklist hanya berisi baris kosong dan spasi | `checklist` ditandai kosong | Hanya `checklist` yang ditandai | Pass |
| C06-UT09 | `ambilIsianKosong(...)` | Batas | Checklist berisi satu baris spasi dan satu dokumen | Tidak ada isian yang ditandai | Daftar kosong | Pass |
| C06-UT10 | `ambilIsianKosong(...)` | Negatif | Seluruh isian kosong, inti masalah hanya berisi spasi | Keenam isian wajib ditandai sesuai urutan | Keenam isian ditandai | Pass |
| C06-UT11 | `ajukanRangkuman(supabase, idRangkuman): void` | Normal | Rangkuman 11 | Fungsi basis data `ajukan_konten` dipanggil dengan `p_id_rangkuman` 11 | Fungsi dipanggil dengan argumen yang sesuai | Pass |
| C06-UT12 | `ajukanRangkuman(...)` | Negatif | Fungsi basis data menolak dengan kode `23514` (isian belum lengkap) | Galat diteruskan | Galat `23514` diteruskan | Pass |
| C06-UT13 | `simpanDraf(supabase, idRangkuman, data): void` | Normal | Data konten lengkap untuk rangkuman 11 | Fungsi basis data `simpan_draf` dipanggil dengan seluruh isian, langkah, dokumen, dan artikel | Seluruh parameter terkirim | Pass |
| C06-UT14 | `simpanDraf(...)` | Negatif | Fungsi basis data menolak dengan galat RLS (konten terkunci) | Galat diteruskan | Galat diteruskan | Pass |
| C06-UT15 | `ambilRangkumanDisetujui(supabase, idKelompok): RangkumanTampil` | Normal | Kelompok 2 | Query difilter `id_kelompok` 2 dan `status = Disetujui`, dengan batas satu baris (KF02) | Filter status Disetujui dan batas satu baris terkirim | Pass |
| C06-UT16 | `ambilRangkumanDisetujui(...)` | Normal | Rangkuman 4 lengkap dengan bidang hukum dan templat | Seluruh atribut tampilan I-02 terpetakan, termasuk nama bidang, penulis, tanggal peninjauan, dan templat | Seluruh atribut terpetakan | Pass |
| C06-UT17 | `ambilRangkumanDisetujui(...)` | Batas | Tenggat langkah berisi `"   "` dan `" 7 hari kerja "` | Tenggat spasi menjadi `null`, tenggat lain dirapikan | Tenggat bernilai `null` dan `"7 hari kerja"` | Pass |
| C06-UT18 | `ambilRangkumanDisetujui(...)` | Batas | Artikel tanpa tautan, artikel tanpa judul, dan checklist `null` | Hanya artikel lengkap yang ditampilkan dan checklist menjadi daftar kosong | Satu artikel lengkap tampil dan checklist kosong | Pass |
| C06-UT19 | `ambilRangkumanDisetujui(...)` | Negatif | Kelompok tanpa rangkuman Disetujui | Mengembalikan `null` | `null` dikembalikan | Pass |
| C06-UT20 | `ambilRangkumanDisetujui(...)` | Negatif | Basis data mengembalikan galat | Galat diteruskan | Galat diteruskan | Pass |
| C06-UT21 | `cariLangkahBertenggat(daftarLangkah): LangkahPenyelesaian` | Normal | Langkah 1 tanpa tenggat, langkah 2 dan 3 bertenggat | Langkah 2 dikembalikan | Langkah 2 dikembalikan | Pass |
| C06-UT22 | `cariLangkahBertenggat(...)` | Batas | Daftar tanpa langkah bertenggat dan daftar kosong | Mengembalikan `null` | `null` dikembalikan untuk kedua masukan | Pass |

Tabel 4.2.4b. Ringkasan Cakupan Kelas C06

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `cekDisetujui()`, `cocokkanKataKunci()`, `ambilDaftarLangkah()`, `ambilChecklist()`, `ambilDaftarTemplat()`, `ambilTemplat()`, `ambilDaftarArtikel()`, `lampirkanTemplat()`, `simpanDraf()`, `cekIsianLengkap()`, `ambilIsianKosong()`, `aturStatus()`, `ambilCatatanRevisi()`, `simpanCatatanRevisi()` |
| Operasi yang diuji | `buatRangkuman()`, `ambilRangkumanMilik()` dan `ambilRangkumanDisetujui()` (mewujudkan `ambilDaftarLangkah()`, `ambilChecklist()`, `ambilDaftarTemplat()`, dan `ambilDaftarArtikel()`), `ambilIsianKosong()` dan `cekIsianLengkap()`, `simpanDraf()`, `ajukanRangkuman()` (`aturStatus("Diajukan")`), serta `cariLangkahBertenggat()`. `cekDisetujui()` dan `cocokkanKataKunci()` diuji pada C22, `lampirkanTemplat()` dan `ambilTemplat()` pada C09, serta `aturStatus()` untuk keputusan moderasi, `ambilCatatanRevisi()`, dan `simpanCatatanRevisi()` pada C12. |
| ID Algoritma yang tercakup | Algo-015, Algo-016, Algo-017 |
| Coverage (wajib ≥ 70%) | `src/lib/models/rangkumanKasus.ts`: 100% baris, 96,29% cabang, 100% fungsi (Vitest `@vitest/coverage-v8`, bukti pada 4.6) |

### 4.2.5 Kelas TemplatDokumen

**ID Kelas:** C09  
**Nama Kelas:** TemplatDokumen  
**Tingkat:** Mendalam

Berkas test: `src/tests/modelTemplatDokumen.test.ts`.

Tabel 4.2.5. Hasil Pengujian Unit Kelas C09

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C09-UT01 | `validasiUnggahan(berkas)` (Algo-021) | Normal | `surat.pdf`, 2 KB | Diterima | Sesuai harapan | Pass |
| C09-UT02 | `validasiUnggahan(...)` | Batas | `SURAT.DOCX` tepat 5 MB | Diterima | Sesuai harapan | Pass |
| C09-UT03 | `validasiUnggahan(...)` | Negatif | `bukti.png` | Ditolak (KF26) | Sesuai harapan | Pass |
| C09-UT04 | `validasiUnggahan(...)` | Batas | PDF 5 MB + 1 byte | Ditolak (KF26) | Sesuai harapan | Pass |
| C09-UT05 | `validasiUnggahan(...)` | Batas | PDF 0 byte | Ditolak | Sesuai harapan | Pass |
| C09-UT06 | `validasiUnggahan(...)` | Negatif | Nama berkas tanpa ekstensi | Ditolak | Sesuai harapan | Pass |
| C09-UT07 | `ambilDaftarTemplat(supabase, idRangkuman)` | Normal | Satu baris templat | Baris dipetakan, difilter `id_rangkuman`, terurut `id_templat` | Sesuai harapan | Pass |
| C09-UT08 | `ambilDaftarTemplat(...)` | Negatif | Basis data mengembalikan galat | Galat diteruskan | Sesuai harapan | Pass |
| C09-UT09 | `perbaruiVersi(...)` (Algo-022) | Normal | Templat baru `surat.pdf` | Diunggah ke *bucket* `templat` tanpa `upsert`, disimpan sebagai versi 1, tidak ada berkas yang dihapus (KF25) | Sesuai harapan | Pass |
| C09-UT10 | `perbaruiVersi(...)` | Normal | Unggah ulang nama yang sama | Versi naik menjadi 2 dan berkas lama dihapus setelah baris tersimpan | Sesuai harapan | Pass |
| C09-UT11 | `perbaruiVersi(...)` | Normal | Berkas `.docx` | Jenis konten DOCX dipakai saat mengunggah | Sesuai harapan | Pass |
| C09-UT12 | `perbaruiVersi(...)` | Negatif | Berkas `.png` | Ditolak sebelum mengunggah dan tanpa menyentuh basis data | Sesuai harapan | Pass |
| C09-UT13 | `perbaruiVersi(...)` | Negatif | Unggahan ke Storage gagal (koneksi terputus) | Basis data tidak diubah dan berkas versi lama tetap utuh (KNF08) | Sesuai harapan | Pass |
| C09-UT14 | `perbaruiVersi(...)` | Negatif | Penyimpanan baris gagal setelah unggahan berhasil | Berkas baru dihapus kembali, berkas lama tidak dihapus (KNF08) | Sesuai harapan | Pass |
| C09-UT15 | `perbaruiVersi(...)` | Batas | Templat lama tanpa lokasi berkas | Tidak ada berkas yang dihapus | Sesuai harapan | Pass |
| C09-UT16 | `hapusTemplat(supabase, templat)` | Normal | Templat milik rangkuman | Baris dihapus lalu berkasnya di Storage | Sesuai harapan | Pass |
| C09-UT17 | `hapusTemplat(...)` | Negatif | Tidak ada baris yang terhapus | Galat "Templat tidak terhapus" dan Storage tidak disentuh | Sesuai harapan | Pass |
| C09-UT18 | `hapusTemplat(...)` | Negatif | Basis data menolak | Galat diteruskan dan Storage tidak disentuh | Sesuai harapan | Pass |
| C09-UT19 | `hapusTemplat(...)` | Batas | Lokasi berkas kosong | Hanya baris yang dihapus | Sesuai harapan | Pass |
| C09-UT20 | `ambilTemplatDisetujui(supabase, idTemplat)` | Normal | Templat pada rangkuman Disetujui | Kueri memfilter status Disetujui (KF02) | Sesuai harapan | Pass |
| C09-UT21 | `ambilTemplatDisetujui(...)` | Normal | Dengan `idRangkuman` | Filter `id_rangkuman` ditambahkan | Sesuai harapan | Pass |
| C09-UT22 | `ambilTemplatDisetujui(...)` | Negatif | Templat tidak ada atau belum Disetujui | Mengembalikan null | Sesuai harapan | Pass |
| C09-UT23 | `ambilTemplatDisetujui(...)` | Negatif | Basis data mengembalikan galat | Galat diteruskan | Sesuai harapan | Pass |
| C09-UT24 | `unduh(supabase, templat)` (Algo-023) | Normal | Templat dengan lokasi berkas | *Signed URL* 60 detik dengan nama berkas asli (KF16) | Sesuai harapan | Pass |
| C09-UT25 | `unduh(...)` | Batas | Lokasi berkas kosong | Mengembalikan null tanpa memanggil Storage | Sesuai harapan | Pass |
| C09-UT26 | `unduh(...)` | Negatif | Storage mengembalikan galat | Mengembalikan null | Sesuai harapan | Pass |
| C09-UT27 | `unduh(...)` | Negatif | *Signed URL* kosong | Mengembalikan null | Sesuai harapan | Pass |

Tabel 4.2.5b. Ringkasan Cakupan Kelas C09

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `validasiUnggahan()`, `perbaruiVersi()`, `unduh()` |
| Operasi yang diuji | Seluruhnya, ditambah operasi `ambilDaftarTemplat()`, `hapusTemplat()`, dan `ambilTemplatDisetujui()` |
| ID Algoritma yang tercakup | Algo-021, Algo-022, Algo-023, Algo-035 |
| Coverage (wajib ≥ 70%) | `src/lib/models/templatDokumen.ts`: 100% baris, 97,5% cabang, 100% fungsi |

### 4.2.6 Kelas LembagaBantuanHukum

**ID Kelas:** C11  
**Nama Kelas:** LembagaBantuanHukum  
**Tingkat:** Sedang  
**File test:** `src/tests/modelLembagaBantuanHukum.test.ts`

Tabel 4.2.6. Hasil Pengujian Unit Kelas C11

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C11-UT01 | `ambilSemuaLBH(supabase): LembagaBantuanHukum[]` (Q-022) | Normal | *Mock* Supabase mengembalikan "LBH Contoh Bandung" wilayah Jawa Barat | Baris dipetakan ke objek LBH dari tabel `lembaga_bantuan_hukum`, diurutkan berdasarkan `nama` | Sesuai harapan | Pass |
| C11-UT02 | `ambilSemuaLBH(supabase)` | Gagal | *Mock* Supabase mengembalikan galat | Galat diteruskan ke pemanggil | Galat yang sama dilempar | Pass |
| C11-UT03 | `cocokkanWilayah(wilayah): bool` | Normal | LBH wilayah "Jawa Barat", wilayah dipilih "Jawa Barat" | `true` | `true` | Pass |
| C11-UT04 | `cocokkanWilayah(wilayah): bool` | Gagal | LBH wilayah "Jawa Barat", wilayah dipilih "DKI Jakarta" | `false` | `false` | Pass |

### 4.2.7 Kelas RiwayatStatus

**ID Kelas:** C12  
**Nama Kelas:** RiwayatStatus  
**Tingkat:** Mendalam

Berkas test: `src/tests/keputusanModerasi.test.ts` (C12-UT01 s.d. C12-UT09) dan `src/tests/riwayatStatusLanjutan.test.ts` (C12-UT10 s.d. C12-UT19).

Tabel 4.2.7. Hasil Pengujian Unit Kelas C12

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C12-UT01 | `cekAlasanTerisi()` | Normal | Panggil `cekAlasanTerisi()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menerima alasan yang berisi teks | Sesuai harapan | Pass |
| C12-UT02 | `cekAlasanTerisi()` | Normal | Panggil `cekAlasanTerisi()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menerima alasan dengan spasi di awal dan akhir | Sesuai harapan | Pass |
| C12-UT03 | `cekAlasanTerisi()` | Negatif | Panggil `cekAlasanTerisi()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menolak alasan kosong | Sesuai harapan | Pass |
| C12-UT04 | `cekAlasanTerisi()` | Negatif | Panggil `cekAlasanTerisi()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menolak alasan yang hanya berisi spasi | Sesuai harapan | Pass |
| C12-UT05 | `cekAlasanTerisi()` | Negatif | Panggil `cekAlasanTerisi()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menolak alasan yang tidak diberikan | Sesuai harapan | Pass |
| C12-UT06 | `simpanKeputusan()` | Normal | Panggil `simpanKeputusan()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menyetujui konten dan mengisi tanggal peninjauan | Sesuai harapan | Pass |
| C12-UT07 | `simpanKeputusan()` | Normal | Panggil `simpanKeputusan()` sesuai skenario, dengan *mock* bila memerlukan basis data | Mengembalikan konten dengan catatan revisi yang dirapikan | Sesuai harapan | Pass |
| C12-UT08 | `simpanKeputusan()` | Normal | Panggil `simpanKeputusan()` sesuai skenario, dengan *mock* bila memerlukan basis data | Hanya mengubah konten yang masih berstatus Diajukan | Sesuai harapan | Pass |
| C12-UT09 | `simpanKeputusan()` | Negatif | Panggil `simpanKeputusan()` sesuai skenario, dengan *mock* bila memerlukan basis data | Melaporkan tidak ada perubahan bila konten bukan Diajukan | Sesuai harapan | Pass |
| C12-UT10 | `simpanRiwayat()` | Normal | Panggil `simpanRiwayat()` sesuai skenario, dengan *mock* bila memerlukan basis data | `simpanRiwayat` mencatat pelaku dan status baru (KF36) | Sesuai harapan | Pass |
| C12-UT11 | `simpanRiwayat()` | Negatif | Panggil `simpanRiwayat()` sesuai skenario, dengan *mock* bila memerlukan basis data | `simpanRiwayat` meneruskan galat penyimpanan | Sesuai harapan | Pass |
| C12-UT12 | `simpanKeputusan()` | Negatif | Panggil `simpanKeputusan()` sesuai skenario, dengan *mock* bila memerlukan basis data | `simpanKeputusan` meneruskan galat UPDATE | Sesuai harapan | Pass |
| C12-UT13 | `ambilKeadaanKonten()` | Normal | Panggil `ambilKeadaanKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | `ambilKeadaanKonten` mengembalikan keadaan yang lengkap | Sesuai harapan | Pass |
| C12-UT14 | `ambilKeadaanKonten()` | Negatif | Panggil `ambilKeadaanKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | `ambilKeadaanKonten` mengembalikan null bila konten tidak ada | Sesuai harapan | Pass |
| C12-UT15 | `ambilKeadaanKonten()` | Negatif | Panggil `ambilKeadaanKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | `ambilKeadaanKonten` meneruskan galat pembacaan | Sesuai harapan | Pass |
| C12-UT16 | `pulihkanKeadaan()` | Normal | Panggil `pulihkanKeadaan()` sesuai skenario, dengan *mock* bila memerlukan basis data | `pulihkanKeadaan` mengembalikan tiga kolom dan syarat keputusan | Sesuai harapan | Pass |
| C12-UT17 | `pulihkanKeadaan()` | Negatif | Panggil `pulihkanKeadaan()` sesuai skenario, dengan *mock* bila memerlukan basis data | `pulihkanKeadaan` meneruskan galat UPDATE (KNF09) | Sesuai harapan | Pass |
| C12-UT18 | `simpanKeputusan()` | Negatif | Panggil `simpanKeputusan()` sesuai skenario, dengan *mock* bila memerlukan basis data | `simpanKeputusan` memakai catatan revisi kosong bila tidak diberikan | Sesuai harapan | Pass |
| C12-UT19 | `simpanKeputusan()` | Negatif | Panggil `simpanKeputusan()` sesuai skenario, dengan *mock* bila memerlukan basis data | `simpanKeputusan` menganggap data kosong sebagai tidak ada perubahan | Sesuai harapan | Pass |

Tabel 4.2.7b. Ringkasan Cakupan Kelas C12

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `simpan()`, `cekAlasanTerisi()` |
| Operasi yang diuji | `simpanRiwayat()` (`simpan()`), `cekAlasanTerisi()`, serta operasi tambahan `simpanKeputusan()`, `ambilKeadaanKonten()`, dan `pulihkanKeadaan()` |
| ID Algoritma yang tercakup | Algo-047, Algo-048 |
| Coverage (wajib ≥ 70%) | `src/lib/models/riwayatStatus.ts`: 100% baris, 100% cabang, 100% fungsi |

### 4.2.8 Kelas HalamanPenyusunanKonten

**ID Kelas:** C17  
**Nama Kelas:** HalamanPenyusunanKonten  
**Tingkat:** Sedang  
**File test:** `src/tests/aturanDaftarButir.test.ts`

Logika yang diuji adalah pengelolaan butir langkah dan artikel pada formulir I-05 (`src/components/konten/aturanDaftarButir.ts`). Tampilan formulirnya diuji melalui UC06.

Tabel 4.2.8. Hasil Pengujian Unit Kelas C17

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C17-UT01 | `buatDaftarButir()`, `tambahButir()` | Normal | Daftar A, B, C lalu tambah D dengan kunci 3 | Daftar A, B, C, D dengan kunci 0 sampai 3 yang berbeda | Urutan dan kunci sesuai | Pass |
| C17-UT02 | `hapusButir(daftar, indeks)` | Normal | Hapus indeks 1 dari A, B, C | Daftar A, C | Daftar A, C | Pass |
| C17-UT03 | `hapusButir(...)` | Gagal | Indeks -1 dan 3 (di luar rentang) | Daftar tidak berubah | Daftar asli dikembalikan | Pass |
| C17-UT04 | `pindahkanButir(daftar, indeks, arah)` | Normal | Naikkan butir C (indeks 2) | Daftar A, C, B dan kunci C ikut berpindah | Urutan dan kunci sesuai | Pass |
| C17-UT05 | `pindahkanButir(...)` | Normal | Turunkan butir A (indeks 0) | Daftar B, A, C | Daftar B, A, C | Pass |
| C17-UT06 | `pindahkanButir(...)` | Normal | Pindahkan butir lalu periksa daftar asli | Daftar asli tidak berubah | Daftar asli tetap A, B, C | Pass |
| C17-UT07 | `pindahkanButir(...)` | Gagal | Naikkan butir pertama, turunkan butir terakhir, dan indeks 5 | Daftar tidak berubah | Daftar asli dikembalikan untuk ketiga masukan | Pass |

### 4.2.9 Kelas KontrolJelajahKasus

**ID Kelas:** C21  
**Nama Kelas:** KontrolJelajahKasus  
**Tingkat:** Sedang  
**File test:** `src/tests/kontrolJelajahKasus.test.ts`

*Client* Supabase diganti *mock* yang benar-benar menyaring baris berdasarkan filter `eq()` yang dikirim model, sehingga test membuktikan filter status Disetujui, bukan sekadar pemanggilannya. Data tiruan memuat bidang aktif dan nonaktif serta kelompok dengan status Disetujui, Draft, Diajukan, dan Perlu Revisi.

Tabel 4.2.9. Hasil Pengujian Unit Kelas C21

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C21-UT01 | `cekDarurat(idKelompok): bool` | Normal | Kelompok 12, darurat dan Disetujui | `true` | `true` | Pass |
| C21-UT02 | `cekDarurat(idKelompok): bool` | Normal | Kelompok 11, bukan darurat | `false` | `false` | Pass |
| C21-UT03 | `cekDarurat(idKelompok): bool` | Gagal | Kelompok 999 yang tidak ada | `false` | `false` | Pass |
| C21-UT04 | `cekDarurat(idKelompok): bool` | Gagal | Kelompok 21, darurat tetapi rangkumannya Diajukan | `false` | `false` | Pass |
| C21-UT05 | `ambilDaftarKelompok(idBidang)` (Algo-029) | Normal | Bidang 1 dengan kelompok 11 dan 12 (Disetujui) serta 13 (Draft) | Hanya kelompok 11 dan 12 | `[11, 12]` | Pass |
| C21-UT06 | `ambilDaftarKelompok(idBidang)` | Batas | Bidang 2, seluruh rangkumannya Diajukan atau Perlu Revisi | Daftar kosong | `[]` | Pass |
| C21-UT07 | `ambilDaftarBidang()` (Algo-028) | Normal | Bidang 1 dan 2 aktif, bidang 3 nonaktif | Hanya bidang 1 dengan `jumlahKelompokKasus = 2`; bidang tanpa kelompok Disetujui dan bidang nonaktif disembunyikan (KF01, KF02) | Sesuai harapan | Pass |
| C21-UT08 | `ambilRangkuman(idKelompok)` (Algo-030) | Normal | Kelompok 11 dengan rangkuman Disetujui | Rangkuman 101 beserta daftar dokumen | Sesuai harapan | Pass |
| C21-UT09 | `ambilRangkuman(idKelompok)` | Gagal | Kelompok 13 (Draft), 21 (Diajukan), dan 22 (Perlu Revisi) | `null` untuk ketiganya (KF02) | `null` untuk ketiganya | Pass |
| C21-UT10 | `ambilDaftarWilayah()` | Normal | Tiga LBH di Jawa Barat (2) dan DKI Jakarta (1) | `["DKI Jakarta", "Jawa Barat"]`, tanpa duplikat dan terurut | Sesuai harapan | Pass |
| C21-UT11 | `ambilDaftarLBH(wilayah)` (Algo-031) | Normal | Wilayah "Jawa Barat" | LBH Bandung dan LBH Bogor | Sesuai harapan | Pass |
| C21-UT12 | `ambilDaftarBidang()` | Gagal | *Mock* Supabase mengembalikan galat "koneksi basis data terputus" | Galat diteruskan ke pemanggil | Galat yang sama dilempar | Pass |
| C21-UT13 | `ambilRangkuman(idKelompok)` | Gagal | *Mock* Supabase mengembalikan galat | Galat diteruskan ke pemanggil | Galat yang sama dilempar | Pass |
| C21-UT14 | `ambilDaftarLBH(wilayah)` | Batas | Wilayah "Papua" yang tidak punya LBH | Daftar kosong | `[]` | Pass |

### 4.2.10 Kelas KontrolPencarianKataKunci

**ID Kelas:** C22  
**Nama Kelas:** KontrolPencarianKataKunci  
**Tingkat:** Mendalam  
**File test:** `src/tests/kontrolPencarianKataKunci.test.ts`

Tabel 4.2.10. Hasil Pengujian Unit Kelas C22

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C22-UT01 | `rapikanKataKunci(kataKunci): string` | Normal & Batas | Masukan `"  UPAH Lembur  "` dan `"   "` | Mengembalikan `"upah lembur"` dan `""` | Mengembalikan `"upah lembur"` dan `""` | Pass |
| C22-UT02 | `cekDisetujui(status): boolean` | Normal & Negatif | Masukan `"Disetujui"`, `"Draft"`, `"Diajukan"`, `"Perlu Revisi"`, `null`, `undefined` | `true` hanya untuk `"Disetujui"`, selain itu `false` | Seluruh masukan sesuai harapan | Pass |
| C22-UT03 | `cocokkanKataKunciKelompok(kelompok, kataKunci): boolean` | Normal & Batas | Cocokkan `"GAJI"`, `"  upah "`, dan 1 karakter `"g"` pada `judulUmum` dan `istilahResmi` | Mengembalikan `true` tanpa membedakan huruf besar/kecil | Seluruh pemanggilan mengembalikan `true` | Pass |
| C22-UT04 | `cocokkanKataKunciKelompok(...)` | Negatif | Masukan `""`, `"   "`, dan kata tidak cocok `"warisan"` | Mengembalikan `false` | Seluruh pemanggilan mengembalikan `false` | Pass |
| C22-UT05 | `cocokkanKataKunciRangkuman(rangkuman, kataKunci): boolean` | Normal & Batas | Cocokkan `"rusak"`, `"KOMPENSASI"`, `"transfer"` dengan sebagian kolom `null` | Mengembalikan `true` saat salah satu kolom isi cocok | Seluruh pemanggilan mengembalikan `true` | Pass |
| C22-UT06 | `cocokkanKataKunciRangkuman(...)` | Negatif | Kata kunci spasi `"   "`, semua kolom `null`, atau kata tidak cocok `"pajak"` | Mengembalikan `false` | Seluruh pemanggilan mengembalikan `false` | Pass |
| C22-UT07 | `cariKasus(kataKunci): HasilPencarianKasus[]` | Normal | Panggil `cariKasus("  UPAH  ")` pada data tiruan berisi konten Disetujui, Diajukan, dan bidang nonaktif | Mengembalikan 1 kasus Disetujui pada bidang aktif (`idKelompok` 1) dan menyertakan filter `id_kelompok.in.(1)` | Mengembalikan 1 kasus yang tepat dengan `status = Disetujui` | Pass |
| C22-UT08 | `cariKasus(...)` | Normal | Panggil `cariKasus("kompensasi")` (hanya muncul pada kolom `hak`, bukan judul kelompok) | Mengembalikan kasus `idKelompok` 3 tanpa klausa `id_kelompok.in.` | Mengembalikan 1 kasus (`idKelompok` 3) | Pass |
| C22-UT09 | `cariKasus(...)`, `cariKasusDisetujui(...)` | Batas & Negatif | Panggil dengan `""` dan `"    "` | Mengembalikan `[]` tanpa memanggil `buatClientServer()` | Mengembalikan `[]`, `buatClientServer` tidak dipanggil | Pass |
| C22-UT10 | `cariKasus(...)` | Batas | Panggil dengan wildcard SQL `"100%"` pada data berkolom `null` | Karakter `%` di-*escape* menjadi `\%` pada pola `ILIKE` dan kolom `null` dipetakan ke `""` | Pola mengandung `ilike.%100\%%` dan hasil terpetakan bersih | Pass |
| C22-UT11 | `cariKasus(...)` | Batas | Panggil dengan karakter delimiter PostgREST `"(sepihak),"` | Melewati `.or()` (jalur *fallback* aman) lalu tetap mencocokkan di aplikasi | Tidak ada panggilan `.or()`, mengembalikan 1 kasus cocok (`idKelompok` 10) | Pass |
| C22-UT12 | `cariKasus(...)` | Negatif | Data `kelompok_kasus: null`, `bidang_hukum: null`, atau respons `data: null` | Baris tidak valid dilewati dan mengembalikan `[]` | Mengembalikan `[]` tanpa melempar galat | Pass |
| C22-UT13 | `cariKasus(...)` | Negatif | Client mengembalikan baris berstatus `"Draft"` walau filter query dilewati | Pertahanan `cekDisetujui()` menyaring keluar baris `"Draft"` dan mengembalikan `[]` (KF02) | Mengembalikan `[]` | Pass |
| C22-UT14 | `cariKasus(...)` | Negatif | Kueri `kelompok_kasus` atau `rangkuman_kasus` mengembalikan galat | Galat basis data diteruskan ke pemanggil | Galat `"Kueri kelompok gagal"` dan `"Kueri rangkuman gagal"` diteruskan | Pass |
| C22-UT15 | `sarankanBidangLain(): BidangHukum[]` | Normal | Data berisi 2 bidang aktif dan 1 bidang nonaktif | Mengembalikan hanya 2 bidang dengan `statusAktif = true` | Mengembalikan Ketenagakerjaan dan Perlindungan Konsumen | Pass |
| C22-UT16 | `sarankanBidangLain()` | Batas | Seluruh bidang hukum berstatus nonaktif (`status_aktif = false`) | Mengembalikan `[]` | Mengembalikan `[]` | Pass |
| C22-UT17 | `sarankanBidangLain()` | Negatif | Kueri `bidang_hukum` mengembalikan galat | Galat `"Gagal memuat bidang"` diteruskan | Galat diteruskan | Pass |

Tabel 4.2.10b. Ringkasan Cakupan Kelas C22

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `cariKasus(kataKunci)`, `sarankanBidangLain()`, `ambilDaftarLBH(wilayah)` |
| Operasi yang diuji | `cariKasus(kataKunci)` dan `sarankanBidangLain()` (2 dari 2 operasi terimplementasi), beserta fungsi model `cariKasusDisetujui()`, `rapikanKataKunci()`, `cekDisetujui()`, `cocokkanKataKunciKelompok()`, dan `cocokkanKataKunciRangkuman()`. `ambilDaftarLBH(wilayah)` tidak diimplementasikan pada C22 (Tugas 9 B.1 no. 20) dan diuji pada C21. |
| ID Algoritma yang tercakup | Algo-012, Algo-013, Algo-032, Algo-033 |
| Coverage (wajib ≥ 70%) | `src/lib/controllers/kontrolPencarianKataKunci.ts`: 100% baris, 100% cabang, 100% fungsi; `src/lib/models/pencarian.ts`: 100% baris, 97,61% cabang, 100% fungsi (Vitest `@vitest/coverage-v8`, bukti pada 4.6) |

### 4.2.11 Kelas KontrolChecklist

**ID Kelas:** C23  
**Nama Kelas:** KontrolChecklist  
**Tingkat:** Mendalam  
**File test:** `src/tests/kontrolChecklist.test.ts`

Kelas ini berjalan di peramban. Test memakai `localStorage` milik jsdom, dan modul dimuat ulang (`vi.resetModules`) untuk meniru membuka halaman kembali.

Tabel 4.2.11. Hasil Pengujian Unit Kelas C23

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C23-UT01 | `bacaCentang(idRangkuman): string[]` | Batas | `localStorage` kosong | `[]` | `[]` | Pass |
| C23-UT02 | `simpanCentang(idRangkuman, daftar)` | Normal | Simpan "KTP" dan "Surat PHK" untuk rangkuman 7 | Kunci `pahamhukum:checklist:7` berisi kedua dokumen dan `bacaCentang(7)` mengembalikannya | Sesuai harapan | Pass |
| C23-UT03 | `bacaCentang(idRangkuman)` | Normal | Simpan "KTP", lalu modul dimuat ulang | `["KTP"]` dibaca kembali dari `localStorage` (KF14) | `["KTP"]` | Pass |
| C23-UT04 | `simpanCentang` dan `bacaCentang` | Normal | Simpan centang berbeda untuk rangkuman 7 dan 8 | Centang tiap rangkuman terpisah | Sesuai harapan | Pass |
| C23-UT05 | `kosongkanCentang(idRangkuman)` | Normal | Simpan "KTP", lalu kosongkan | Kunci dihapus dan `bacaCentang(7)` mengembalikan `[]` | Sesuai harapan | Pass |
| C23-UT06 | `bacaCentang(idRangkuman)` | Normal | Dua kali membaca tanpa perubahan | Rujukan larik yang sama, sehingga komponen tidak dirender ulang tanpa perlu | Rujukan sama | Pass |
| C23-UT07 | `bacaCentangAwal(): string[]` | Normal | Dipanggil saat render di server | `[]` | `[]` | Pass |
| C23-UT08 | `simpanCentang` dan `kosongkanCentang` | Normal | Mengintai `fetch` selama menyimpan dan mengosongkan | `fetch` tidak pernah dipanggil (KNF06) | Tidak dipanggil | Pass |
| C23-UT09 | `bacaCentang(idRangkuman)` | Negatif | Isi kunci berupa JSON rusak `{bukan json` dan objek `{"KTP":true}` | `[]` untuk keduanya | `[]` | Pass |
| C23-UT10 | `bacaCentang(idRangkuman)` | Negatif | Isi `["KTP", 3, null, "Surat PHK"]` | Butir bukan teks dibuang: `["KTP", "Surat PHK"]` | Sesuai harapan | Pass |
| C23-UT11 | `bacaCentang` dan `simpanCentang` | Negatif | `getItem` dan `setItem` melempar galat (penyimpanan diblokir) | Tidak melempar galat; centang tetap berlaku selama halaman terbuka | Sesuai harapan | Pass |
| C23-UT12 | `pantauCentang(pendengar)` | Normal | Simpan, kosongkan, berhenti memantau, lalu simpan lagi | Pendengar dipanggil 2 kali saja | 2 kali | Pass |
| C23-UT13 | `pantauCentang(pendengar)` | Normal | Event `storage` dari tab lain dengan kunci checklist | Pendengar dipanggil dan centang terbaru terbaca | Sesuai harapan | Pass |
| C23-UT14 | `pantauCentang(pendengar)` | Negatif | Event `storage` dengan kunci lain (`tema`) | Pendengar tidak dipanggil | Tidak dipanggil | Pass |
| C23-UT15 | `hitungKelengkapan(jumlahDicentang, jumlahTotal): int` (Algo-034) | Normal | (1, 3), (2, 3), (3, 3) | 33, 67, 100 | 33, 67, 100 | Pass |
| C23-UT16 | `pantauCentang(pendengar)` | Batas | `localStorage` dikosongkan di tab lain (event dengan `key = null`) | Tembolok dibersihkan, pendengar dipanggil, `bacaCentang(7)` menjadi `[]` | Sesuai harapan | Pass |
| C23-UT17 | `kosongkanCentang(idRangkuman)` | Negatif | `removeItem` melempar galat | Tidak melempar galat dan centang di memori kosong | Sesuai harapan | Pass |
| C23-UT18 | `pantauCentang(pendengar)` | Batas | Dua komponen memantau, lalu berhenti satu per satu | Event `storage` dipasang sekali dan dilepas setelah komponen terakhir berhenti | Dipasang 1 kali, dilepas 1 kali | Pass |
| C23-UT19 | `hitungKelengkapan(jumlahDicentang, jumlahTotal)` | Batas | (0, 3) dan (0, 0) | 0 dan 0, tanpa pembagian dengan nol | 0 dan 0 | Pass |
| C23-UT20 | `hitungKelengkapan(jumlahDicentang, jumlahTotal)` | Negatif | (5, 3), jumlah dicentang melebihi total | Dibatasi 100 | 100 | Pass |

Tabel 4.2.11b. Ringkasan Cakupan Kelas C23

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `ambilChecklist(idRangkuman)`, `hitungKelengkapan(jumlahDicentang, jumlahTotal)` |
| Operasi yang diuji | `bacaCentang`, `bacaCentangAwal`, `simpanCentang`, `kosongkanCentang`, `pantauCentang`, dan `hitungKelengkapan`. Pada implementasi, `ambilChecklist` dipecah menjadi fungsi baca, simpan, kosongkan, dan pantau atas `localStorage`, karena daftar dokumennya sudah diambil oleh C21 bersama rangkuman (Tabel B.5 dokumen Implementasi). |
| ID Algoritma yang tercakup | Algo-034 (`hitungKelengkapan`) |
| Coverage (wajib ≥ 70%) | `src/lib/controllers/kontrolChecklist.ts`: 100% baris, 100% cabang, 100% fungsi (Vitest `@vitest/coverage-v8`, bukti pada 4.6) |

### 4.2.12 Kelas KontrolUnduhTemplat

**ID Kelas:** C24  
**Nama Kelas:** KontrolUnduhTemplat  
**Tingkat:** Mendalam  
**File test:** `src/tests/kontrolUnduhTemplat.test.ts`

Tabel 4.2.12. Hasil Pengujian Unit Kelas C24

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C24-UT01 | `ambilDaftarTemplat(idRangkuman): TemplatDokumen[]` | Normal | Panggil `ambilDaftarTemplat(1)` pada rangkuman yang memiliki 2 templat | Mengembalikan 2 objek `TemplatDokumen` beserta format, ukuran, versi, dan tanggal pembaruan | Mengembalikan 2 templat dengan metadata lengkap | Pass |
| C24-UT02 | `ambilDaftarTemplat(...)` | Batas | Panggil `ambilDaftarTemplat(99)` pada rangkuman tanpa templat | Mengembalikan `[]` | Mengembalikan `[]` | Pass |
| C24-UT03 | `ambilDaftarTemplat(...)` | Negatif | Panggil dengan `0`, `-3`, `1.5`, dan `NaN` | Mengembalikan `[]` tanpa memanggil Supabase | Keempat masukan mengembalikan `[]`, `buatClientServer` tidak dipanggil | Pass |
| C24-UT04 | `unduhTemplat(idTemplat): HasilUnduhTemplat` | Normal | Panggil `unduhTemplat(1)` untuk berkas PDF pada rangkuman Disetujui | Mengembalikan `berhasil: true` dengan *signed URL* dan memanggil `createSignedUrl("1/penagihan.pdf", 60, { download: "surat-penagihan-upah.pdf" })` pada *bucket* `templat` | *Signed URL* dan argumen Storage sesuai | Pass |
| C24-UT05 | `unduhTemplat(idTemplat, idRangkuman)` | Normal & Batas | Panggil `unduhTemplat(2, 1)` untuk berkas DOCX versi 2 dengan `idRangkuman` cocok | Mengembalikan `berhasil: true` dan `namaBerkas = "surat-perundingan.docx"` | `berhasil: true` dan URL menunjuk `1/perundingan.docx` | Pass |
| C24-UT06 | `unduhTemplat(...)` | Batas & Negatif | Panggil dengan `idTemplat` = `0`, `-1`, `2.5`, dan `NaN` | Mengembalikan `{ berhasil: false, galat: "Berkas templat tidak tersedia." }` tanpa menyentuh Supabase | Keempat masukan ditolak dengan pesan tepat, Supabase tidak dipanggil | Pass |
| C24-UT07 | `unduhTemplat(...)` | Negatif | Panggil dengan `idTemplat = 1` dan `idRangkuman` = `0`, `-5`, `1.2`, dan `NaN` | Mengembalikan `{ berhasil: false, galat: "Berkas templat tidak tersedia." }` tanpa menyentuh Supabase | Keempat masukan ditolak dengan pesan tepat | Pass |
| C24-UT08 | `unduhTemplat(...)` | Negatif | Panggil `unduhTemplat(3)` milik rangkuman berstatus `"Draft"` | Menolak unduhan (KF02) dan tidak memanggil `createSignedUrl` | Mengembalikan galat `"Berkas templat tidak tersedia."` | Pass |
| C24-UT09 | `unduhTemplat(...)` | Negatif | Panggil dengan `idRangkuman` tidak cocok (`unduhTemplat(1, 2)`) dan `idTemplat` tidak ada (`unduhTemplat(999)`) | Mengembalikan `{ berhasil: false, galat: "Berkas templat tidak tersedia." }` | Keduanya mengembalikan galat tidak tersedia | Pass |
| C24-UT10 | `unduhTemplat(...)` | Batas | Panggil `unduhTemplat(4)` dengan `lokasiBerkas = null` | Tidak memanggil `createSignedUrl` dan mengembalikan pesan tidak tersedia | Mengembalikan galat `"Berkas templat tidak tersedia."` | Pass |
| C24-UT11 | `unduhTemplat(...)` | Negatif | `createSignedUrl` mengembalikan galat `"Object not found"` | Mengembalikan `{ berhasil: false, galat: "Berkas templat tidak tersedia." }` | Mengembalikan galat tidak tersedia | Pass |
| C24-UT12 | `unduhTemplat(...)` | Negatif | Kueri basis data melempar pengecualian `"Koneksi basis data terputus"` | Pengecualian ditangkap dan mengembalikan `{ berhasil: false, galat: "Berkas templat tidak tersedia." }` | Pengecualian ditangani aman, mengembalikan galat tidak tersedia | Pass |

Tabel 4.2.12b. Ringkasan Cakupan Kelas C24

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `ambilDaftarTemplat(idRangkuman)`, `unduhTemplat(idRangkuman, idTemplat)` |
| Operasi yang diuji | `ambilDaftarTemplat(idRangkuman)` dan `unduhTemplat(idTemplat, idRangkuman?)` (2 dari 2 operasi public) |
| ID Algoritma yang tercakup | Algo-023, Algo-035 |
| Coverage (wajib ≥ 70%) | `src/lib/controllers/kontrolUnduhTemplat.ts`: 100% baris, 100% cabang, 100% fungsi (Vitest `@vitest/coverage-v8`, bukti pada 4.6) |

### 4.2.13 Kelas KontrolAutentikasi

**ID Kelas:** C25  
**Nama Kelas:** KontrolAutentikasi  
**Tingkat:** Mendalam

Tabel 4.2.13. Hasil Pengujian Unit Kelas C25

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C25-UT01 | `prosesLogin(email, kataSandi)` | Normal | Kredensial benar, akun berperan Kurator dan aktif | Diarahkan ke `/panel/kurator/konten`, cookie `aktivitas_terakhir` (httpOnly) dibuat | Sesuai harapan | Pass |
| C25-UT02 | `prosesLogin` / `arahkanSesuaiPeran` | Normal | Kredensial benar, akun berperan Administrator | Diarahkan ke `/panel/admin/moderasi` | Sesuai harapan | Pass |
| C25-UT03 | `prosesLogin` | Negatif | Supabase Auth menolak kredensial | Pesan "Email atau kata sandi salah." tanpa menyebut bagian yang salah (KF40) | Sesuai harapan | Pass |
| C25-UT04 | `prosesLogin` | Batas | Email dan kata sandi kosong | Ditolak tanpa memanggil Supabase Auth | Sesuai harapan | Pass |
| C25-UT05 | `prosesLogin` | Negatif | Kredensial benar, akun Kurator nonaktif | Ditolak dengan pesan akun dinonaktifkan, sesi diakhiri, cookie aktivitas tidak dibuat (KF37) | Sesuai harapan | Pass |
| C25-UT06 | `prosesLogin` | Negatif | Akun Auth tanpa profil di tabel `akun` | Ditolak dengan pesan umum dan sesi diakhiri | Sesuai harapan | Pass |
| C25-UT07 | `logout()` | Normal | Panggil `logout()` | Sesi diakhiri, cookie aktivitas dihapus, diarahkan ke `/masuk` (KF44) | Sesuai harapan | Pass |
| C25-UT08 | `cekSesi()` (`tentukanAksesPanel`) | Negatif | Rute panel tanpa akun | Dialihkan ke `/masuk` | Sesuai harapan | Pass |
| C25-UT09 | `cekSesi()` | Negatif | Kurator membuka `/panel/admin/akun` | Dialihkan ke `/panel/ditolak` tanpa mengakhiri sesi | Sesuai harapan | Pass |
| C25-UT10 | `cekSesi()` | Negatif | Administrator membuka `/panel/kurator/konten` | Dialihkan ke `/panel/ditolak` | Sesuai harapan | Pass |
| C25-UT11 | `cekSesi()` | Normal | Setiap peran membuka panelnya sendiri | Akses diizinkan | Sesuai harapan | Pass |
| C25-UT12 | `cekSesi()` | Batas | Kurator membuka `/panel/administrasi` (awalan mirip) | Tidak dianggap panel Administrator | Sesuai harapan | Pass |
| C25-UT13 | `cekSesi()` | Normal | Rute bersama `/panel/sesi` | Diizinkan untuk kedua peran | Sesuai harapan | Pass |
| C25-UT14 | `cekSesi()` | Negatif | Akun Kurator nonaktif | Dialihkan ke `/masuk?alasan=akun-nonaktif` dan sesi diakhiri | Sesuai harapan | Pass |
| C25-UT15 | `cekSesi()` | Batas | Aktivitas terakhir tepat 30 menit lalu | Sesi masih sah | Sesuai harapan | Pass |
| C25-UT16 | `cekSesi()` | Batas | Aktivitas terakhir 30 menit lebih 1 milidetik lalu | Dialihkan ke `/masuk?alasan=sesi-berakhir` (KNF14) | Sesuai harapan | Pass |
| C25-UT17 | `cekSesi()` | Batas | Belum ada catatan aktivitas | Dianggap sesi baru | Sesuai harapan | Pass |
| C25-UT18 | `cekSesi()` (`proxy.ts`) | Negatif | Permintaan panel tanpa sesi Supabase | Respons 307 ke `/masuk`, `signOut` tidak dipanggil | Sesuai harapan | Pass |
| C25-UT19 | `cekSesi()` (`proxy.ts`) | Negatif | Cookie aktivitas 31 menit lalu | Dialihkan ke `/masuk?alasan=sesi-berakhir`, `signOut` dipanggil, cookie aktivitas dihapus | Sesuai harapan | Pass |
| C25-UT20 | `putusSesi` (`proxy.ts`) | Negatif | Kurator dinonaktifkan saat sesi masih berjalan | Dialihkan ke `/masuk?alasan=akun-nonaktif` dan `signOut` dipanggil (KF37) | Sesuai harapan | Pass |
| C25-UT21 | `cekSesi()` (`proxy.ts`) | Negatif | Kurator membuka panel Administrator | Dialihkan ke `/panel/ditolak` tanpa `signOut` | Sesuai harapan | Pass |
| C25-UT22 | `cekSesi()` (`proxy.ts`) | Normal | Administrator sah membuka panelnya | Permintaan diteruskan dan cookie aktivitas diperbarui (httpOnly) | Sesuai harapan | Pass |
| C25-UT23 | `cekSesi()` (`proxy.ts`) | Normal | Supabase memperbarui token saat `getUser` | Cookie sesi baru ikut pada respons sah maupun pengalihan | Sesuai harapan | Pass |
| C25-UT24 | `cekSesi()` (`proxy.ts`) | Batas | Cookie aktivitas berisi teks bukan angka | Dianggap sesi baru, tidak dialihkan | Sesuai harapan | Pass |

Tabel 4.2.13b. Ringkasan Cakupan Kelas C25

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `putusSesi()`, `prosesLogin()`, `arahkanSesuaiPeran()`, `cekSesi()`, `logout()` |
| Operasi yang diuji | Seluruhnya. `cekSesi()` dan `putusSesi()` diwujudkan oleh `tentukanAksesPanel` (`lib/controllers/aturanSesi.ts`) dan `proxy.ts`; `arahkanSesuaiPeran()` oleh `BERANDA_PANEL` di dalam `prosesLogin` |
| ID Algoritma yang tercakup | Algo-036, Algo-037, Algo-038, Algo-039 |
| Coverage (wajib ≥ 70%) | 98,18% baris, 95,83% cabang, 98,36% *statement* (`kontrolAutentikasi.ts`, `aturanSesi.ts`, `proxy.ts`), diukur dengan `@vitest/coverage-v8`. Bukti pada 4.6 |

### 4.2.14 Kelas KontrolPenyusunanKonten

**ID Kelas:** C26  
**Nama Kelas:** KontrolPenyusunanKonten  
**Tingkat:** Mendalam  
**File test:** `src/tests/kontrolPenyusunanKonten.test.ts`

Tabel 4.2.14. Hasil Pengujian Unit Kelas C26

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C26-UT01 | `simpanDraf(idRangkuman, dataKonten)` | Batas | Formulir hanya berisi inti masalah dan satu langkah | Draf tetap tersimpan dan data yang dikirim ke model sudah dirapikan | Draf tersimpan dengan data yang sesuai | Pass |
| C26-UT02 | `simpanDraf(...)` | Negatif | Kurator dinonaktifkan | Ditolak dengan pesan "Akun Anda tidak aktif. Hubungi Administrator." tanpa menyimpan | Ditolak, model tidak dipanggil | Pass |
| C26-UT03 | `simpanDraf(...)` | Negatif | Rangkuman 99 bukan milik Kurator | Ditolak dengan pesan "Konten tidak ditemukan." | Ditolak, model tidak dipanggil | Pass |
| C26-UT04 | `simpanDraf(...)` | Negatif | Konten berstatus Diajukan dan Disetujui | Ditolak dengan pesan "Konten berstatus ... tidak bisa diubah." | Kedua status ditolak | Pass |
| C26-UT05 | `simpanDraf(...)` | Negatif | Penyimpanan di basis data gagal | Pesan "Draf gagal disimpan. Coba lagi." | Pesan galat ditampilkan | Pass |
| C26-UT06 | `ajukanKonten(idRangkuman, dataKonten)` | Negatif | Hak, poin pertimbangan, checklist, dan artikel kosong | Draf tersimpan, keempat isian ditandai, dan status tidak diubah | Empat isian ditandai, fungsi pengajuan tidak dipanggil | Pass |
| C26-UT07 | `ajukanKonten(...)` | Batas | Setiap isian wajib dikosongkan satu per satu (6 masukan) | Hanya isian yang kosong yang ditandai | Keenam masukan menandai tepat satu isian | Pass |
| C26-UT08 | `ajukanKonten(...)` | Negatif | Konten sudah berstatus Diajukan | Ditolak tanpa menyimpan dan tanpa mengajukan | Ditolak, model tidak dipanggil | Pass |
| C26-UT09 | `ajukanKonten(...)` | Normal | Konten Draft dan Perlu Revisi yang lengkap | Draf disimpan lebih dulu, lalu pengajuan dijalankan tepat satu kali | Urutan simpan lalu ajukan sesuai untuk kedua status | Pass |
| C26-UT10 | `ajukanKonten(...)` | Negatif | Perubahan status dan riwayat gagal di basis data | Pesan "Konten gagal diajukan. Coba lagi." | Pesan galat ditampilkan | Pass |
| C26-UT11 | `buatDraf(idKelompok)` | Normal | Kurator aktif memilih kelompok 1 | Rangkuman dibuat, riwayat Draft dicatat atas nama Kurator, lalu dialihkan ke halaman draf | Rangkuman, riwayat, dan pengalihan sesuai | Pass |
| C26-UT12 | `buatDraf(...)` | Negatif | Kurator dinonaktifkan | Ditolak tanpa membuat rangkuman maupun riwayat | Ditolak, model tidak dipanggil | Pass |
| C26-UT13 | `lampirkanTemplat(idRangkuman, berkas)` | Negatif | Berkas PNG, PDF 5 MB + 1 byte, dan DOCX 0 byte | Ditolak dengan pesan "Berkas harus berformat PDF atau DOCX dan berukuran paling besar 5 MB." | Ketiga berkas ditolak dengan pesan tersebut | Pass |
| C26-UT14 | `lampirkanTemplat(...)` | Negatif | Permintaan tanpa berkas | Ditolak dengan pesan yang sama | Ditolak | Pass |
| C26-UT15 | `lampirkanTemplat(...)` | Normal | Berkas PDF dan DOCX 2 KB | Berkas diteruskan ke model sebagai templat baru | Kedua berkas diterima | Pass |
| C26-UT16 | `lampirkanTemplat(...)` | Normal | Berkas dengan nama yang sama dengan templat versi 1 | Templat lama diteruskan ke model dan versi menjadi 2 | Versi 2 dikembalikan | Pass |
| C26-UT17 | `lampirkanTemplat(...)` | Negatif | Konten berstatus Diajukan | Ditolak tanpa mengunggah | Ditolak, model tidak dipanggil | Pass |
| C26-UT18 | `hapusTemplat(idRangkuman, idTemplat)` | Normal | Templat milik rangkuman 11 | Templat dihapus melalui model dan halaman diperbarui | Templat dihapus | Pass |
| C26-UT19 | `hapusTemplat(...)` | Negatif | Id templat 999 bukan milik rangkuman | Pesan "Templat tidak ditemukan." tanpa menghapus | Ditolak, model tidak dipanggil | Pass |
| C26-UT20 | `hapusTemplat(...)` | Negatif | Konten berstatus Diajukan dan Disetujui | Ditolak tanpa membaca maupun menghapus templat | Kedua status ditolak | Pass |
| C26-UT21 | `hapusTemplat(...)` | Negatif | Kurator dinonaktifkan | Ditolak tanpa menghapus | Ditolak | Pass |
| C26-UT22 | `hapusTemplat(...)` | Negatif | Penghapusan di basis data atau Storage gagal | Pesan "Templat gagal dihapus. Coba lagi." dan halaman tidak diperbarui | Pesan galat ditampilkan | Pass |

Tabel 4.2.14b. Ringkasan Cakupan Kelas C26

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `buatDraf()`, `simpanDraf()`, `lampirkanTemplat()`, `ajukanKonten()`, `tayangkanKonten()` |
| Operasi yang diuji | `buatDraf()`, `simpanDraf()`, `lampirkanTemplat()`, `ajukanKonten()`, serta operasi tambahan `hapusTemplat()`. Operasi privat `catatRiwayat()` teruji melalui `buatDraf()`. `tayangkanKonten()` tidak diimplementasikan (Tugas 9 B.1 no. 11); larangan penayangan oleh Kurator diuji pada INT-TC39. |
| ID Algoritma yang tercakup | Algo-040, Algo-041, Algo-042, Algo-043, Algo-045 |
| Coverage (wajib ≥ 70%) | `src/lib/controllers/kontrolPenyusunanKonten.ts`: 96% baris, 96,96% cabang, 100% fungsi; `src/lib/controllers/aturanPenyusunanKonten.ts`: 100% baris, 82,35% cabang (Vitest `@vitest/coverage-v8`, bukti pada 4.6) |

### 4.2.15 Kelas KontrolPelacakanKonten

**ID Kelas:** C27  
**Nama Kelas:** KontrolPelacakanKonten  
**Tingkat:** Sedang

Berkas test: `src/tests/kontrolPelacakanKonten.test.ts`.

Tabel 4.2.15. Hasil Pengujian Unit Kelas C27

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C27-UT01 | `ambilDaftarKonten(idKurator)` (Algo-007) | Normal | Id Kurator dari sesi | Model C02 dipanggil dengan *client* server dan id yang sama | Sesuai harapan | Pass |
| C27-UT02 | `ambilDaftarKonten(...)` | Normal | Model mengembalikan dua konten | Daftar diteruskan tanpa diubah (KF29) | Sesuai harapan | Pass |
| C27-UT03 | `ambilDaftarKonten(...)` | Batas | Kurator belum punya konten | Daftar kosong | Sesuai harapan | Pass |
| C27-UT04 | `ambilDaftarKonten(...)` | Negatif | Model melempar galat | Galat diteruskan | Sesuai harapan | Pass |

### 4.2.16 Kelas KontrolModerasiKonten

**ID Kelas:** C28  
**Nama Kelas:** KontrolModerasiKonten  
**Tingkat:** Mendalam

Berkas test: `src/tests/kontrolModerasiKonten.test.ts` (C28-UT01 s.d. C28-UT10) dan `src/tests/kontrolModerasiLanjutan.test.ts` (C28-UT11 s.d. C28-UT16).

Tabel 4.2.16. Hasil Pengujian Unit Kelas C28

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C28-UT01 | `setujuiKonten()` | Normal | Panggil `setujuiKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menyetujui konten Diajukan, mengisi tanggal, dan mencatat riwayat | Sesuai harapan | Pass |
| C28-UT02 | `setujuiKonten()` | Negatif | Panggil `setujuiKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menolak konten yang bukan Diajukan tanpa mengubah apa pun | Sesuai harapan | Pass |
| C28-UT03 | `setujuiKonten()` | Negatif | Panggil `setujuiKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menolak bila konten sudah diputuskan Administrator lain | Sesuai harapan | Pass |
| C28-UT04 | `setujuiKonten()` | Negatif | Panggil `setujuiKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menolak pengguna tanpa sesi | Sesuai harapan | Pass |
| C28-UT05 | `setujuiKonten()` | Negatif | Panggil `setujuiKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menolak akun yang bukan Administrator | Sesuai harapan | Pass |
| C28-UT06 | `setujuiKonten()` | Negatif | Panggil `setujuiKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | Mengembalikan status bila pencatatan riwayat gagal | Sesuai harapan | Pass |
| C28-UT07 | `kembalikanKonten()` | Normal | Panggil `kembalikanKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | Mengembalikan konten Diajukan dengan catatan revisi yang dirapikan | Sesuai harapan | Pass |
| C28-UT08 | `kembalikanKonten()` | Negatif | Panggil `kembalikanKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menolak alasan kosong atau hanya spasi | Sesuai harapan | Pass |
| C28-UT09 | `kembalikanKonten()` | Negatif | Panggil `kembalikanKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menolak konten yang bukan Diajukan | Sesuai harapan | Pass |
| C28-UT10 | `kembalikanKonten()` | Negatif | Panggil `kembalikanKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | Menolak id yang tidak valid | Sesuai harapan | Pass |
| C28-UT11 | `setujuiKonten()` | Negatif | Panggil `setujuiKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | `setujuiKonten` menolak id bukan bilangan bulat positif | Sesuai harapan | Pass |
| C28-UT12 | `setujuiKonten()` | Negatif | Panggil `setujuiKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | `setujuiKonten` melaporkan galat umum bila keadaan konten gagal dibaca | Sesuai harapan | Pass |
| C28-UT13 | `setujuiKonten()` | Negatif | Panggil `setujuiKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | `setujuiKonten` melaporkan galat umum bila UPDATE status gagal | Sesuai harapan | Pass |
| C28-UT14 | `ambilAntrean()` | Normal | Panggil `ambilAntrean()` sesuai skenario, dengan *mock* bila memerlukan basis data | `ambilAntrean` meneruskan hasil model ke pemanggil | Sesuai harapan | Pass |
| C28-UT15 | `ambilKonten()` | Normal | Panggil `ambilKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | `ambilKonten` meneruskan id dan hasil model | Sesuai harapan | Pass |
| C28-UT16 | `ambilKonten()` | Negatif | Panggil `ambilKonten()` sesuai skenario, dengan *mock* bila memerlukan basis data | `ambilKonten` mengembalikan null bila konten tidak ada | Sesuai harapan | Pass |

Tabel 4.2.16b. Ringkasan Cakupan Kelas C28

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `ambilAntrean()`, `setujuiKonten()`, `kembalikanKonten()` |
| Operasi yang diuji | Seluruhnya, serta `ambilKonten()` dan operasi privat `catatKeputusan()` |
| ID Algoritma yang tercakup | Algo-046, Algo-047, Algo-048 |
| Coverage (wajib ≥ 70%) | `src/lib/controllers/kontrolModerasiKonten.ts`: 100% baris, 96,55% cabang, 100% fungsi |

### 4.2.17 Kelas KontrolPengelolaanAkun

**ID Kelas:** C29  
**Nama Kelas:** KontrolPengelolaanAkun  
**Tingkat:** Mendalam

Tabel 4.2.17. Hasil Pengujian Unit Kelas C29

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C29-UT01 | `validasiAkunBaru(email, kataSandi)` | Negatif, Batas | Email kosong, kata sandi kosong, email tanpa `@`, kata sandi 6 karakter (batas minimal 8) | Keempat masukan ditolak dengan pesan galat | Sesuai harapan | Pass |
| C29-UT02 | `validasiAkunBaru` | Normal | Email valid dan kata sandi 11 karakter | Lolos validasi | Sesuai harapan | Pass |
| C29-UT03 | `daftarkanKurator(email, kataSandi)` | Normal | `" Baru@Contoh.Test "` oleh Administrator | Disimpan dengan email huruf kecil dan pesan sukses | Sesuai harapan | Pass |
| C29-UT04 | `daftarkanKurator` | Negatif | Email sudah terdaftar | Pesan "Email sudah terdaftar.", akun tidak dibuat (KF38) | Sesuai harapan | Pass |
| C29-UT05 | `daftarkanKurator` | Negatif | Penyimpanan ke Model gagal | Pesan galat umum | Sesuai harapan | Pass |
| C29-UT06 | `daftarkanKurator` | Negatif | Dipanggil oleh Kurator | Ditolak sebelum memeriksa email maupun menyimpan | Sesuai harapan | Pass |
| C29-UT07 | `nonaktifkanKurator` (`ubahStatusKurator`) | Normal | Kurator milik Administrator yang sedang masuk | Status diubah lewat Model dengan id Administrator yang benar (KF37) | Sesuai harapan | Pass |
| C29-UT08 | `nonaktifkanKurator` | Negatif | Kurator tidak ditemukan | Pesan "Akun kurator tidak ditemukan." | Sesuai harapan | Pass |
| C29-UT09 | `nonaktifkanKurator` | Negatif | Dipanggil tanpa sesi | Ditolak tanpa memanggil Model | Sesuai harapan | Pass |
| C29-UT10 | `validasiEmail(email)` | Negatif, Batas | `""`, `"bukan-email"`, `"tanpa@titik"` | Ketiganya ditolak | Sesuai harapan | Pass |
| C29-UT11 | `validasiEmail` | Normal | Email valid | Lolos validasi | Sesuai harapan | Pass |
| C29-UT12 | `perbaruiKurator(idAkun, emailBaru)` | Normal | `"  Baru@Contoh.Test "` | Email diganti dalam huruf kecil tanpa spasi tepi (KF43) | Sesuai harapan | Pass |
| C29-UT13 | `perbaruiKurator` | Negatif, Batas | `""` dan `"bukan-email"` | Ditolak sebelum memeriksa basis data | Sesuai harapan | Pass |
| C29-UT14 | `perbaruiKurator` / `cekEmailUnik` | Negatif | Email milik akun lain | Pesan "Email sudah terdaftar." | Sesuai harapan | Pass |
| C29-UT15 | `perbaruiKurator` | Negatif | Kurator bukan milik Administrator tersebut | Pesan "Akun kurator tidak ditemukan." | Sesuai harapan | Pass |
| C29-UT16 | `perbaruiKurator` | Negatif | Penyimpanan ke Model gagal | Pesan galat umum | Sesuai harapan | Pass |
| C29-UT17 | `perbaruiKurator` | Negatif | Dipanggil oleh Kurator | Ditolak tanpa memanggil Model | Sesuai harapan | Pass |

Tabel 4.2.17b. Ringkasan Cakupan Kelas C29

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `ambilDaftarKurator()`, `daftarkanKurator()`, `perbaruiKurator()`, `nonaktifkanKurator()` |
| Operasi yang diuji | `daftarkanKurator()`, `perbaruiKurator()`, `nonaktifkanKurator()` (`ubahStatusKurator`), serta operasi private `cekEmailUnik()`. `ambilDaftarKurator()` dipanggil halaman langsung dari Model C02, sehingga diuji pada C02-UT05 sampai C02-UT07 |
| ID Algoritma yang tercakup | Algo-050, Algo-051, Algo-052, Algo-053 |
| Coverage (wajib ≥ 70%) | 98,11% baris, 92,10% cabang, 96,87% *statement* (`kontrolPengelolaanAkun.ts`, `validasiAkun.ts`). Bukti pada 4.6 |

<br>

## 4.3 Pengujian Integrasi

Pengujian integrasi memeriksa interaksi antarkomponen yang melewati batas, yaitu *Controller* ke *Model*, aplikasi ke basis data, dan aplikasi ke sistem eksternal. Daftar antarmuka mengacu pada dokumen DPPL, dengan minimal satu test case untuk setiap antarmuka. Pengujian memakai komponen nyata, bukan *mock*. Apabila ada antarmuka tambahan yang belum didaftarkan pada dokumen DPPL, cantumkan juga.

Tabel 4.3.1. Daftar Antarmuka Antarkomponen

| ID Antarmuka | Komponen Asal | Komponen Tujuan | Jenis Batas | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| IA-01 | C25 KontrolAutentikasi | Supabase Auth dan C01 Akun (tabel `akun`, `kurator`) | *Controller* - *Model* / Aplikasi - Basis data | INT-TC01, INT-TC02, INT-TC03 |
| IA-02 | C01 Akun dan C02 Kurator (*Model*) | Basis data (RLS tabel `akun`, `kurator`) | Aplikasi - Basis data | INT-TC04, INT-TC09 |
| IA-03 | C29 KontrolPengelolaanAkun | C02 Kurator (*Model*) dan Supabase Auth Admin | *Controller* - *Model* / Aplikasi - Basis data | INT-TC05, INT-TC06, INT-TC07, INT-TC08, INT-TC09 |
| IA-07 | C22 KontrolPencarianKataKunci | `src/lib/models/pencarian.ts` dan tabel `kelompok_kasus`, `rangkuman_kasus`, `bidang_hukum` dengan RLS peran `anon` | *Controller* - *Model* - Basis data | INT-TC20 s.d. INT-TC24 |
| IA-08 | C24 KontrolUnduhTemplat | C09 TemplatDokumen, tabel `templat_dokumen`, dan Supabase Storage (*bucket* `templat`) | *Controller* - *Model* - Basis data / Sistem eksternal | INT-TC25 s.d. INT-TC28 |
| IA-10 | C26 KontrolPenyusunanKonten | C06 RangkumanKasus, tabel `rangkuman_kasus` dan `riwayat_status` | *Controller* - *Model* - Basis data | INT-TC30, INT-TC31, INT-TC32 |
| IA-11 | C06 RangkumanKasus | Fungsi basis data `simpan_draf` dan `ajukan_konten`, C12 RiwayatStatus, RLS | Aplikasi - Basis data | INT-TC33, INT-TC34, INT-TC35, INT-TC39 |
| IA-12 | C09 TemplatDokumen | Supabase Storage (*bucket* privat `templat`) | Aplikasi - Sistem eksternal | INT-TC36, INT-TC37, INT-TC38 |
| IA-13 | C21 KontrolJelajahKasus | C04 BidangHukum, C05 KelompokKasus (Model) dan tabel `bidang_hukum`, `kelompok_kasus`, `rangkuman_kasus` | *Controller* - *Model* - Basis data | INT-TC10, INT-TC11, INT-TC12 |
| IA-14 | C21 KontrolJelajahKasus | C06 RangkumanKasus (Model) dan tabel rangkuman beserta tabel anaknya, dengan RLS peran `anon` | *Controller* - *Model* - Basis data | INT-TC13, INT-TC14 |
| IA-15 | C21 KontrolJelajahKasus | C11 LembagaBantuanHukum (Model) dan tabel `lembaga_bantuan_hukum` | *Controller* - *Model* - Basis data | INT-TC15 |
| IA-16 | C14 HalamanRangkumanKasus (komponen `ChecklistDokumen`) | C23 KontrolChecklist dan `localStorage` peramban | *View* - *Controller* - Penyimpanan peramban | INT-TC16, INT-TC17 |
| IA-17 | C27 KontrolPelacakanKonten | C02 Kurator (*Model*) dan tabel `rangkuman_kasus`, `riwayat_status` | *Controller* - *Model* - Basis data | INT-TC40, INT-TC41 |
| IA-18 | C28 KontrolModerasiKonten | C03 Administrator (*Model*) dan tabel `rangkuman_kasus` | *Controller* - *Model* - Basis data | INT-TC42, INT-TC43, INT-TC44 |
| IA-19 | C28 KontrolModerasiKonten | C12 RiwayatStatus (*Model*) dan tabel `rangkuman_kasus`, `riwayat_status` | *Controller* - *Model* - Basis data | INT-TC45, INT-TC46, INT-TC47, INT-TC49 |
| IA-20 | C12 RiwayatStatus | Basis data (*trigger* `riwayat_status_permanen` dan RLS) | Aplikasi - Basis data | INT-TC48 |

Tabel 4.3.2. Hasil Pengujian Integrasi

| ID Pengujian | ID Antarmuka | Skenario | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| INT-TC01 | IA-01 | Normal: login Kurator | `prosesLogin` dengan `kurator1@pahamhukum.test` dan kata sandi benar | Sesi Supabase terbentuk untuk akun tersebut, cookie aktivitas dibuat, diarahkan ke `/panel/kurator/konten` | Sesuai harapan | Pass |
| INT-TC02 | IA-01 | Gagal: kata sandi salah | `prosesLogin` dengan kata sandi salah | Pesan umum "Email atau kata sandi salah." dan tidak ada sesi | Sesuai harapan | Pass |
| INT-TC03 | IA-01 | Gagal: akun nonaktif | `prosesLogin` dengan `kurator.nonaktif@pahamhukum.test` | Ditolak dengan pesan akun dinonaktifkan dan sesi Supabase diakhiri | Sesuai harapan | Pass |
| INT-TC04 | IA-02 | Normal: batas baca Kurator | Kurator membaca tabel `akun` dan `kurator` | Hanya baris miliknya sendiri yang terbaca | Sesuai harapan | Pass |
| INT-TC05 | IA-03 | Normal: daftarkan Kurator | `daftarkanKurator` oleh Administrator dengan email baru | Akun Auth, baris `akun` (peran Kurator), dan baris `kurator` (aktif, `jumlah_konten` 0, milik Administrator) tersimpan, dan akun bisa login | Sesuai harapan | Pass |
| INT-TC06 | IA-03 | Gagal: email terdaftar | `daftarkanKurator` dengan `KURATOR1@pahamhukum.test` | Pesan "Email sudah terdaftar." dan jumlah akun tidak bertambah | Sesuai harapan | Pass |
| INT-TC07 | IA-03 | Normal dan gagal: nonaktifkan lalu aktifkan | `ubahStatusKurator(id, false)`, login Kurator, lalu `ubahStatusKurator(id, true)` dan login lagi | `status_aktif` false di basis data dan login ditolak; setelah diaktifkan, login berhasil | Sesuai harapan | Pass |
| INT-TC08 | IA-03 | Normal: ubah email (KF43) | `perbaruiKurator(id, emailBaru)` | Email di tabel `akun` dan Auth berganti; login dengan email lama gagal dan dengan email baru berhasil | Sesuai harapan | Pass |
| INT-TC09 | IA-03, IA-02 | Gagal: Kurator mengelola akun | Kurator memanggil `ubahStatusKurator` dan meng-*update* tabel `kurator` langsung | Server Action menolak, RLS tidak mengubah baris apa pun, status Kurator lain tetap aktif | Sesuai harapan | Pass |
| INT-TC10 | IA-13 | Normal: daftar bidang di beranda | Panggil `ambilDaftarBidang()` dengan *client* anonim, lalu bandingkan dengan isi tabel yang dibaca lewat *service role* | Hanya bidang aktif yang punya kelompok Disetujui, dengan jumlah kelompok yang sama dengan basis data (KF01, KF02) | 3 bidang (Ketenagakerjaan, Perlindungan Konsumen, Keluarga), masing-masing 1 situasi, sama dengan basis data | Pass |
| INT-TC11 | IA-13 | Normal: daftar kelompok per bidang | Panggil `ambilDaftarKelompok(idBidang)` untuk setiap bidang | Hanya kelompok yang rangkumannya Disetujui; kelompok berstatus Diajukan, Perlu Revisi, dan Draft tidak ikut | Daftar setiap bidang sama dengan basis data | Pass |
| INT-TC12 | IA-13 | Alternatif: kelompok darurat | Panggil `cekDarurat(idKelompok)` untuk setiap kelompok di basis data | `true` hanya untuk kelompok bertanda darurat yang rangkumannya Disetujui (KF21) | `true` hanya untuk kelompok 5 "Mengalami kekerasan di rumah" | Pass |
| INT-TC13 | IA-14 | Normal: membuka rangkuman | Panggil `ambilRangkuman(idKelompok)` untuk kelompok Disetujui | Rangkuman, langkah terurut menurut nomor, dan isi *checklist* sama dengan basis data (KF05, KF08, KF11) | Sesuai basis data | Pass |
| INT-TC14 | IA-14 | Gagal: konten belum Disetujui | Panggil `ambilRangkuman` untuk setiap kelompok tanpa rangkuman Disetujui, lalu baca `rangkuman_kasus` dengan status selain Disetujui langsung lewat *client* anonim | `null` dari controller dan daftar kosong dari query langsung karena RLS (KF02) | `null` dan `[]` | Pass |
| INT-TC15 | IA-15 | Normal: direktori LBH per wilayah | Panggil `ambilDaftarWilayah()` dan `ambilDaftarLBH(wilayah)` untuk setiap wilayah | Wilayah unik dan terurut; LBH tiap wilayah sama dengan basis data (KF20) | Sesuai basis data | Pass |
| INT-TC16 | IA-16 | Normal: centang tersimpan dan dipulihkan | *Render* `ChecklistDokumen` dengan 3 dokumen, centang 2, *unmount*, muat ulang modul, lalu *render* lagi | Teks "1 dokumen lagi", kunci `pahamhukum:checklist:1` berisi 2 dokumen, centang dan progres 2/3 tampil kembali, dan `fetch` tidak dipanggil (KF13, KF14, KNF06) | Sesuai harapan | Pass |
| INT-TC17 | IA-16 | Alternatif: kosongkan centang | Isi `localStorage` dengan 3 dokumen, *render*, lalu klik "Kosongkan centang" | Kunci terhapus, progres 0/3, teks "3 dokumen lagi" | Sesuai harapan | Pass |
| INT-TC20 | IA-07 | Normal: Mengembalikan hanya kasus Disetujui yang cocok dengan kata kunci dari Supabase | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | Mengembalikan hanya kasus Disetujui yang cocok dengan kata kunci dari Supabase | Sesuai harapan | Pass |
| INT-TC21 | IA-07 | Normal: Mengembalikan daftar bidang hukum aktif melalui sarankanBidangLain() saat hasil kosong | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | Mengembalikan daftar bidang hukum aktif melalui sarankanBidangLain() saat hasil kosong | Sesuai harapan | Pass |
| INT-TC22 | IA-07 | Gagal: Tidak menampilkan rangkuman berstatus Draft, Diajukan, atau Perlu Revisi pada hasil pencarian (KF02) | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | Tidak menampilkan rangkuman berstatus Draft, Diajukan, atau Perlu Revisi pada hasil pencarian (KF02) | Sesuai harapan | Pass |
| INT-TC23 | IA-07 | Normal: Mencocokkan kata kunci terhadap istilah_resmi kelompok dan isi rangkuman (hak/inti_masalah) | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | Mencocokkan kata kunci terhadap istilah_resmi kelompok dan isi rangkuman (hak/inti_masalah) | Sesuai harapan | Pass |
| INT-TC24 | IA-07 | Normal: Menangani kata kunci berkarakter khusus PostgREST (koma/kurung) melalui fallback tanpa galat | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | Menangani kata kunci berkarakter khusus PostgREST (koma/kurung) melalui fallback tanpa galat | Sesuai harapan | Pass |
| INT-TC25 | IA-08 | Normal: Klien anonim mendapat signed URL berkas PDF pada rangkuman Disetujui dan berhasil mengunduh isinya (KF16) | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | Klien anonim mendapat signed URL berkas PDF pada rangkuman Disetujui dan berhasil mengunduh isinya (KF16) | Sesuai harapan | Pass |
| INT-TC26 | IA-08 | Normal: `ambilDaftarTemplat` memuat metadata templat dan klien anonim dapat mengunduh berkas DOCX versi terbaru (KF15, KF16) | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | `ambilDaftarTemplat` memuat metadata templat dan klien anonim dapat mengunduh berkas DOCX versi terbaru (KF15, KF16) | Sesuai harapan | Pass |
| INT-TC27 | IA-08 | Gagal: Menolak unduhan templat milik rangkuman berstatus Draft untuk klien anonim (KF02) | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | Menolak unduhan templat milik rangkuman berstatus Draft untuk klien anonim (KF02) | Sesuai harapan | Pass |
| INT-TC28 | IA-08 | Gagal: Mengembalikan pesan tidak tersedia saat lokasi_berkas kosong atau objek tidak ditemukan di Storage | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | Mengembalikan pesan tidak tersedia saat lokasi_berkas kosong atau objek tidak ditemukan di Storage | Sesuai harapan | Pass |
| INT-TC30 | IA-10 | Normal: membuat draf | Masuk sebagai `kurator1`, panggil `buatDraf(1)`, lalu baca ulang rangkuman dan riwayat dari basis data | Rangkuman berstatus Draft milik `kurator1` dan satu riwayat Draft atas nama `kurator1` | Rangkuman Draft dan satu riwayat Draft tercatat | Pass |
| INT-TC31 | IA-10 | Normal: menyimpan dan menyimpan ulang draf | Panggil `simpanDraf()` dengan isian lengkap dua langkah, lalu simpan ulang dengan satu langkah | Isian, langkah terurut beserta tenggat teks, checklist, dan artikel tersimpan; simpan ulang mengganti langkah lama | Seluruh data tersimpan dan langkah lama tergantikan | Pass |
| INT-TC32 | IA-10 | Gagal: menyimpan konten Diajukan | Panggil `simpanDraf()` pada rangkuman 4 (Diajukan) | Ditolak dan isi rangkuman di basis data tidak berubah | Ditolak dengan pesan status dan inti masalah tetap | Pass |
| INT-TC33 | IA-11 | Normal: mengajukan konten | Buat draf, lalu panggil `ajukanKonten()` dengan isian lengkap, kemudian coba simpan ulang | Status menjadi Diajukan, riwayat Draft lalu Diajukan atas nama `kurator1`, dan konten terkunci | Status Diajukan, dua riwayat tercatat, dan simpan ulang ditolak | Pass |
| INT-TC34 | IA-11 | Gagal: konten belum lengkap | Panggil fungsi basis data `ajukan_konten` langsung pada draf kosong | Ditolak dengan kode `23514`, status tetap Draft, dan riwayat tidak bertambah | Ditolak `23514`, status Draft, satu riwayat | Pass |
| INT-TC35 | IA-11 | Gagal: Kurator lain | Masuk sebagai `kurator2`, panggil `simpan_draf` dan `ajukan_konten` pada draf `kurator1` | Keduanya ditolak dengan kode `42501` dan draf tidak berubah | Keduanya ditolak `42501` | Pass |
| INT-TC36 | IA-12 | Normal: mengunggah dan memperbarui versi templat | Panggil `lampirkanTemplat()` dengan PDF 2 KB, lalu unggah ulang nama yang sama berukuran 4 KB | Versi 1 tersimpan di Storage; unggahan ulang menjadi versi 2 dan berkas versi lama terhapus | Versi 2 tersimpan dan Storage hanya berisi berkas terbaru | Pass |
| INT-TC37 | IA-12 | Normal: menghapus templat | Unggah templat, lalu panggil `hapusTemplat()` | Baris `templat_dokumen` dan berkas di Storage terhapus | Baris dan berkas terhapus | Pass |
| INT-TC38 | IA-12 | Gagal: pengunjung mengunduh templat draf | Tanpa sesi, minta *signed URL* untuk templat milik draf | Ditolak oleh RLS Storage | Ditolak ("Object not found"), sementara akses *service role* untuk berkas yang sama berhasil | Pass |
| INT-TC39 | IA-11 | Gagal: Kurator menayangkan sendiri (KF35) | Masuk sebagai `kurator1`, ubah status draf sendiri menjadi Disetujui langsung ke tabel `rangkuman_kasus` | Ditolak dengan kode `42501`, status tetap Draft, tidak ada riwayat Disetujui, dan konten tidak tampil untuk publik | Ditolak `42501` dan konten tetap Draft serta tidak terlihat publik | Pass |
| INT-TC40 | IA-17 | Normal: `ambilDaftarKonten` menampilkan konten Kurator Satu beserta riwayatnya | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | `ambilDaftarKonten` menampilkan konten Kurator Satu beserta riwayatnya | Sesuai harapan | Pass |
| INT-TC41 | IA-17 | Gagal: `ambilDaftarKonten` tidak menampilkan konten Kurator lain | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | `ambilDaftarKonten` tidak menampilkan konten Kurator lain | Sesuai harapan | Pass |
| INT-TC42 | IA-18 | Normal: `ambilAntrean` hanya berisi konten Diajukan yang terurut dari pengajuan terlama | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | `ambilAntrean` hanya berisi konten Diajukan yang terurut dari pengajuan terlama | Sesuai harapan | Pass |
| INT-TC43 | IA-18 | Normal: `ambilKonten` mengembalikan isi pratinjau lengkap untuk konten Diajukan | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | `ambilKonten` mengembalikan isi pratinjau lengkap untuk konten Diajukan | Sesuai harapan | Pass |
| INT-TC44 | IA-18 | Gagal: `ambilKonten` mengembalikan null untuk id yang tidak ada | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | `ambilKonten` mengembalikan null untuk id yang tidak ada | Sesuai harapan | Pass |
| INT-TC45 | IA-19 | Normal: `setujuiKonten` mengubah status, mengisi tanggal, dan mencatat riwayat Disetujui | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | `setujuiKonten` mengubah status, mengisi tanggal, dan mencatat riwayat Disetujui | Sesuai harapan | Pass |
| INT-TC46 | IA-19 | Gagal: `kembalikanKonten` menolak alasan kosong tanpa mengubah status | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | `kembalikanKonten` menolak alasan kosong tanpa mengubah status | Sesuai harapan | Pass |
| INT-TC47 | IA-19 | Normal: `kembalikanKonten` mencatat Perlu Revisi beserta alasan yang dirapikan | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | `kembalikanKonten` mencatat Perlu Revisi beserta alasan yang dirapikan | Sesuai harapan | Pass |
| INT-TC48 | IA-20 | Gagal: Riwayat status permanen tidak bisa disunting maupun dihapus (KNF09) | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | Riwayat status permanen tidak bisa disunting maupun dihapus (KNF09) | Sesuai harapan | Pass |
| INT-TC49 | IA-19 | Normal: Konten yang disetujui langsung tampil untuk publik tanpa deploy ulang (KNF07) | Dijalankan dengan `npm run test:integrasi` pada Supabase lokal | Konten yang disetujui langsung tampil untuk publik tanpa deploy ulang (KNF07) | Sesuai harapan | Pass |

<br>

## 4.4 Pengujian Use Case

Pengujian use case dilakukan pada seluruh skenario normal dan alternatif sesuai Subbab 4.4 SKPL, dengan minimal satu test case untuk setiap skenario. Kolom ID KF menunjukkan KF yang diverifikasi oleh test case tersebut.

### 4.4.1 Use Case Menelusuri dan Membaca Rangkuman Kasus

**ID Use Case:** UC01  
**Nama Use Case:** Menelusuri dan Membaca Rangkuman Kasus

Pengujian dilakukan pada *build* produksi (`next build` lalu `next start`) yang terhubung ke PostgreSQL lokal dengan migrasi `0001` sampai `0005` dan data awal `seed.sql` dari repositori, diakses lewat PostgREST dengan peran `anon` dan RLS yang sama dengan Supabase, menggunakan peramban Chromium. Pengujian ini tidak memerlukan akun karena seluruh fitur dipakai sebagai Pencari Informasi.

Tabel 4.4.1. Hasil Pengujian Use Case UC01

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC01-TC01 | KF01, KF02, KF03, KF04, KF05, KF08, KF09, KF10, KF11, KF12, KF18, KF19, KF20, KF42 | Normal | 1. Buka beranda `/`.<br>2. Klik bidang "Ketenagakerjaan".<br>3. Klik kelompok "Gaji tidak dibayar tepat waktu".<br>4. Baca bagian Hak kamu dan Poin pertimbangan.<br>5. Baca Langkah penyelesaian.<br>6. Gulir ke Bacaan pendukung, lalu ganti pilihan wilayah LBH.<br>7. Ulangi langkah 1 pada lebar 360 px. | Bidang "Ketenagakerjaan"; kelompok id 1; wilayah "Jawa Timur" | 1. Hanya bidang aktif dengan kelompok Disetujui beserta jumlahnya.<br>2. Kelompok bidang itu tampil dengan judul sehari-hari dan istilah resmi.<br>3. Halaman `/kasus/1` tersusun urut: inti masalah, hak, langkah, pertimbangan, dokumen, templat, bacaan, lalu *disclaimer*.<br>5. Langkah bernomor dengan tujuan, dokumen, dan penanda tenggat.<br>6. Artikel bertaut, LBH sesuai wilayah, nama Kurator, dan tanggal peninjauan tampil.<br>7. Tidak ada geser horizontal. | 1. Tiga bidang tampil, masing-masing "1 situasi"; kelompok "Diberhentikan tanpa pesangon" (Diajukan) tidak muncul.<br>2. "Gaji tidak dibayar tepat waktu" dengan "Istilah hukum: Keterlambatan pembayaran upah."<br>3. Tujuh bagian tampil berurutan, disertai kotak *disclaimer*.<br>5. Langkah 1 dan 2 bernomor; langkah 2 menampilkan "Tenggat: 14 hari kerja setelah surat penagihan dikirim".<br>6. Wilayah awal DKI Jakarta (LBH Contoh Jakarta) berganti menjadi Jawa Timur (LBH Contoh Surabaya); penanda "Disusun oleh Kurator Satu (Kurator) · Ditinjau 20 Okt 2026" tampil.<br>7. Lebar halaman tetap 360 px. | Pass |
| UC01-TC02 | KF21, KF05 | Alternatif 1: Kasus Ditandai Situasi Darurat | 1. Buka beranda dan pilih bidang "Keluarga".<br>2. Klik "Lihat bantuan" pada kelompok "Mengalami kekerasan di rumah".<br>3. Klik "Tutup dan lanjut membaca". | Bidang "Keluarga"; kelompok id 5 (darurat) | 2. Peringatan prioritas berisi ajakan melapor serta tombol Telepon 112 dan Telepon polisi 110 tampil sebelum rangkuman dibuka.<br>3. Halaman rangkuman kasus tampil seperti skenario normal. | 2. Dialog "Kalau kamu sedang terancam, cari bantuan sekarang" terbuka dengan tombol Telepon 112 (`tel:112`) dan Telepon polisi 110 (`tel:110`).<br>3. Halaman `/kasus/5` "Mengalami kekerasan di rumah" terbuka. | Pass |

### 4.4.2 Use Case Mencari Kasus

**ID Use Case:** UC02  
**Nama Use Case:** Mencari Kasus

Pengujian dilakukan pada aplikasi yang dijalankan secara lokal (`npm run dev`) tanpa login (peran Pencari Informasi).

Tabel 4.4.2. Hasil Pengujian Use Case UC02

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC02-TC01 | KF02, KF06 | Normal | 1. Buka halaman `/cari` (I-03) tanpa login.<br>2. Ketik kata kunci pada kolom pencarian lalu kirim.<br>3. Klik kartu hasil yang tampil. | Kata kunci: `"upah"` | Sistem menampilkan jumlah dan kartu hasil kasus berstatus Disetujui (*Gaji tidak dibayar tepat waktu*), dan klik kartu membuka halaman rangkuman `/kasus/1` (I-02). | Tampil `"1 situasi cocok dengan “upah”"` beserta kartu *Gaji tidak dibayar tepat waktu*; klik kartu membuka `/kasus/1`. | Pass |
| UC02-TC02 | KF07 | Alternatif 1: Pencarian Tidak Menemukan Hasil | 1. Buka halaman `/cari` (I-03).<br>2. Ketik kata kunci yang tidak cocok dengan kasus mana pun lalu kirim pencarian.<br>3. Klik salah satu kartu saran bidang hukum yang tampil. | Kata kunci: `"pajak kendaraan"` | Sistem menampilkan pesan sopan bahwa situasi belum tersedia, saran bidang hukum aktif yang mengarahkan ke beranda dengan bidang terpilih, serta kotak *disclaimer* rujukan konsultasi ke LBH (sesuai penyesuaian Tugas 9 B.1 no. 20). | Tampil `"Situasi yang kamu cari belum tersedia."`, 3 kartu saran bidang hukum aktif (*Ketenagakerjaan*, *Perlindungan Konsumen*, *Keluarga*), dan kotak *disclaimer* rujukan LBH; klik *Ketenagakerjaan* membuka `/?bidang=1#daftar-situasi`. | Pass |

### 4.4.3 Use Case Menyiapkan Dokumen dengan Checklist

**ID Use Case:** UC03  
**Nama Use Case:** Menyiapkan Dokumen dengan *Checklist*

Pengujian dilakukan pada *build* produksi (`next build` lalu `next start`) yang terhubung ke PostgreSQL lokal dengan migrasi `0001` sampai `0005` dan data awal `seed.sql` dari repositori, diakses lewat PostgREST dengan peran `anon` dan RLS yang sama dengan Supabase, menggunakan peramban Chromium. Pengujian ini tidak memerlukan akun karena seluruh fitur dipakai sebagai Pencari Informasi.

Tabel 4.4.3. Hasil Pengujian Use Case UC03

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC03-TC01 | KF13, KF14 | Normal | 1. Buka `/kasus/1` dan gulir ke bagian 5 Daftar periksa dokumen.<br>2. Centang dua dokumen.<br>3. Periksa `localStorage` dan lalu lintas jaringan. | Centang "Perjanjian kerja" dan "Slip gaji" dari 3 dokumen | Tampilan item berubah, progres terhitung, dan status centang tersimpan di penyimpanan lokal tanpa dikirim ke server | Progres "2/3" dengan teks "1 dokumen lagi"; kunci `pahamhukum:checklist:1` berisi `["Perjanjian kerja","Slip gaji"]`; tidak ada permintaan jaringan saat mencentang | Pass |
| UC03-TC02 | KF14 | Alternatif 1: Pengguna Memuat Ulang atau Membuka Kembali Halaman | 1. Lanjut dari UC03-TC01, muat ulang halaman.<br>2. Tutup tab, lalu buka `/kasus/1` di tab baru. | Status centang dari UC03-TC01 | Status *checklist* dan centangnya dipulihkan dari penyimpanan lokal | Setelah muat ulang dan di tab baru, "Perjanjian kerja" dan "Slip gaji" tetap tercentang dengan teks "1 dokumen lagi" | Pass |

### 4.4.4 Use Case Mengunduh Templat Dokumen

**ID Use Case:** UC04  
**Nama Use Case:** Mengunduh Templat Dokumen

Pengujian dilakukan pada halaman rangkuman kasus I-02 (`/kasus/[id]`) tanpa login.

Tabel 4.4.4. Hasil Pengujian Use Case UC04

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC04-TC01 | KF15, KF16, KF17 | Normal | 1. Buka halaman rangkuman `/kasus/1` (I-02) yang memiliki templat tanpa login.<br>2. Gulir ke bagian 6 Templat surat.<br>3. Periksa *disclaimer* kerangka awal dan metadata berkas, lalu klik tombol "Unduh". | Rangkuman `/kasus/1` (templat `.pdf` dan `.docx` pada *bucket* `templat`) | Tampil teks *disclaimer* kerangka awal di atas daftar templat, informasi nama berkas, versi, tanggal pembaruan, format, ukuran, dan tombol "Unduh"; klik tombol langsung mengunduh berkas tanpa meminta login. | Teks *disclaimer* dan metadata tampil sesuai I-02; klik "Unduh" langsung mengunduh berkas `.pdf` dan `.docx` yang dapat dibuka normal tanpa akun. | Pass |
| UC04-TC02 | KF15 | Alternatif 1: Kasus Belum Memiliki Templat | 1. Buka halaman rangkuman `/kasus/5` (I-02) yang belum memiliki templat.<br>2. Gulir ke bagian 6 Templat surat. | Rangkuman `/kasus/5` (tanpa baris `templat_dokumen`) | Tidak tampil tombol unduh dan muncul pesan bahwa templat belum tersedia untuk kasus tersebut. | Tombol unduh tidak ditampilkan dan muncul pesan `"Belum ada templat surat untuk situasi ini."`. | Pass |

### 4.4.5 Use Case Masuk dan Keluar Panel Pengelolaan

**ID Use Case:** UC05  
**Nama Use Case:** Masuk dan Keluar Panel Pengelolaan

Tabel 4.4.5. Hasil Pengujian Use Case UC05

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC05-TC01 | KF39 | Normal | 1. Buka halaman `/masuk`.<br>2. Masukkan email dan kata sandi Kurator, klik "Masuk".<br>3. Klik "Keluar", lalu ulangi langkah 2 dengan akun Administrator. | Email: `kurator1@pahamhukum.test`, lalu `admin@pahamhukum.test`<br>Kata sandi: kata sandi akun uji | Kurator diarahkan ke panel Kurator, Administrator diarahkan ke panel Administrator. | Kurator diarahkan ke `/panel/kurator/konten` (Konten saya), Administrator diarahkan ke `/panel/admin/moderasi` (Antrean tinjauan). | Pass |
| UC05-TC02 | KF40 | Alternatif 1: Kredensial Salah | 1. Buka `/masuk`.<br>2. Masukkan email terdaftar dengan kata sandi salah, klik "Masuk".<br>3. Masukkan email yang tidak terdaftar, klik "Masuk". | (a) `kurator1@pahamhukum.test` dengan kata sandi salah<br>(b) `tidak.ada@pahamhukum.test` | Akses ditolak dengan pesan galat yang tidak menyebut bagian mana yang salah. | Pengguna tetap di `/masuk`. Kedua masukan menampilkan pesan yang sama, "Email atau kata sandi salah.", sehingga tidak terlihat bagian mana yang keliru. | Pass |
| UC05-TC03 | KF41 | Alternatif 2: Akses Tanpa Sesi yang Sah | 1. Tanpa login, buka `/panel/admin/akun`.<br>2. Login sebagai Kurator, lalu buka `/panel/admin/akun`. | Akun Kurator `kurator1@pahamhukum.test` | Pengguna dialihkan ke halaman login atau melihat halaman akses ditolak. | Tanpa login dialihkan ke `/masuk`. Kurator yang membuka panel Administrator dialihkan ke `/panel/ditolak` dengan judul "Akses ditolak". | Pass |
| UC05-TC04 | KF44 | Alternatif 3: Mengakhiri Sesi (tombol Keluar) | 1. Login sebagai Administrator.<br>2. Klik "Keluar".<br>3. Buka kembali `/panel/admin/moderasi`. | Akun `admin@pahamhukum.test` | Sesi berakhir dan pengguna dialihkan kembali ke halaman login. | Setelah klik "Keluar", pengguna dialihkan ke `/masuk`. Membuka `/panel/admin/moderasi` setelahnya juga dialihkan ke `/masuk`. Pada uji awal di `v9.0` tombol Keluar mengarah ke beranda (`/`); perbaikan masuk melalui PR #114, lalu diuji ulang. | Pass |
| UC05-TC05 | KF41, KNF14 | Alternatif 3: Mengakhiri Sesi (tanpa aktivitas 30 menit) | 1. Login sebagai Kurator.<br>2. Ubah cookie `aktivitas_terakhir` menjadi 29 menit lalu, buka panel.<br>3. Ubah menjadi 31 menit lalu, buka panel lagi. | Akun `kurator1@pahamhukum.test`; nilai cookie `Date.now() - 29 menit` dan `Date.now() - 31 menit` | Pada 29 menit sesi masih sah. Lewat dari 30 menit, sesi berakhir dan pengguna wajib masuk kembali. | Pada 29 menit Kurator tetap di `/panel/kurator/konten`. Pada 31 menit dialihkan ke `/masuk?alasan=sesi-berakhir` dengan pesan "Sesi Anda berakhir karena tidak ada aktivitas. Silakan masuk kembali." | Pass |

### 4.4.6 Use Case Mengelola Konten Rangkuman Kasus

**ID Use Case:** UC06  
**Nama Use Case:** Mengelola Konten Rangkuman Kasus

Pengujian dilakukan pada aplikasi yang dijalankan secara lokal (`npm run dev`) dan terhubung ke Supabase lokal, menggunakan akun `kurator1@pahamhukum.test` dan `admin@pahamhukum.test` dari data awal pengujian.

Tabel 4.4.6. Hasil Pengujian Use Case UC06

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC06-TC01 | KF22, KF23, KF25, KF27 | Normal | 1. Masuk sebagai Kurator.<br>2. Klik "Tulis konten", pilih kelompok kasus, lalu klik "Mulai menulis".<br>3. Unggah berkas templat pada kartu Templat surat.<br>4. Lengkapi seluruh isian wajib, lalu klik "Ajukan untuk ditinjau".<br>5. Masuk sebagai Administrator dan buka halaman Moderasi. | Kelompok: Gaji tidak dibayar tepat waktu<br>Berkas: `surat-pengaduan-konsumen.pdf` (25 KB)<br>Seluruh isian wajib terisi | Formulir satu halaman tampil dan konten berstatus Draft. Templat tersimpan sebagai versi 1. Setelah diajukan, status menjadi Diajukan, formulir terkunci, dan konten masuk antrean peninjauan Administrator. | Formulir tampil dengan status Draft. Templat tersimpan sebagai versi 1. Setelah diajukan, badge berubah menjadi Diajukan, seluruh isian terkunci, dan konten muncul di antrean Moderasi. | Pass |
| UC06-TC02 | KF26 | Alternatif 1: Berkas Templat Tidak Valid | 1. Buat draf baru.<br>2. Pilih berkas JPG lalu klik "Unggah".<br>3. Pilih berkas PDF berukuran 6 MB lalu klik "Unggah". | `bukti-transfer.jpg`<br>`berkas-terlalu-besar.pdf` (6 MB) | Unggahan ditolak dengan pesan yang menjelaskan format dan ukuran yang benar, dan tidak ada templat yang tersimpan. | Kedua unggahan ditolak dengan pesan "Berkas harus berformat PDF atau DOCX dan berukuran paling besar 5 MB." dan daftar templat tetap kosong. | Pass |
| UC06-TC03 | KF28 | Alternatif 2: Isian Wajib Belum Lengkap | 1. Pada draf, isi Inti masalah, Hak kamu, dan Poin pertimbangan saja.<br>2. Klik "Ajukan untuk ditinjau". | Langkah penyelesaian, Dokumen yang perlu disiapkan, dan Artikel pendukung dibiarkan kosong | Pengajuan dicegah dan setiap isian wajib yang kosong ditandai. | Pengajuan dicegah. Pesan galat tampil pada Langkah penyelesaian, Dokumen yang perlu disiapkan, dan Artikel pendukung. Panel status menampilkan "Draf tersimpan, tetapi 3 isian wajib belum lengkap" dan status tetap Draft. | Pass |
| UC06-TC04 | KF35 | Alternatif 3: Kurator Mencoba Menayangkan Sendiri | 1. Buka draf sebagai Kurator dan periksa panel Status konten.<br>2. Ubah status draf menjadi Disetujui langsung ke basis data dengan sesi Kurator (INT-TC39). | Sesi Kurator, permintaan ubah status menjadi Disetujui | Kurator tidak dapat menayangkan konten. Penayangan hanya melalui persetujuan Administrator. | Panel status hanya menyediakan "Simpan draf" dan "Ajukan untuk ditinjau". Permintaan ubah status ditolak basis data dengan kode `42501`, status tetap Draft, dan konten tidak tampil untuk publik. | Pass |

### 4.4.9 Use Case Mengelola Akun Kurator

**ID Use Case:** UC09  
**Nama Use Case:** Mengelola Akun Kurator

Tabel 4.4.9. Hasil Pengujian Use Case UC09

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC09-TC01 | KF38 | Normal (langkah 1): Mendaftarkan Kurator | 1. Login sebagai Administrator, buka "Akun kurator".<br>2. Isi email dan kata sandi awal, klik "Daftarkan kurator".<br>3. Login dengan akun baru tersebut.<br>4. Periksa antarmuka publik. | Email: `kurator.uji.radit@pahamhukum.test`<br>Kata sandi awal: kata sandi uji baru | Akun dibuat lewat panel Administrator dan tidak ada pendaftaran mandiri di antarmuka publik. | Muncul pesan "Akun kurator.uji.radit@pahamhukum.test berhasil didaftarkan.", akun tampil di daftar dengan status Aktif, dan akun tersebut bisa login ke `/panel/kurator/konten`. Antarmuka publik tidak memiliki menu daftar. | Pass |
| UC09-TC02 | KF43 | Normal (langkah 2): Memperbarui detail akun Kurator | 1. Login sebagai Kurator `kurator2@pahamhukum.test` di jendela terpisah.<br>2. Login sebagai Administrator, buka "Akun kurator", klik "Ubah" pada akun tersebut.<br>3. Isi email yang sudah dipakai akun lain, klik "Simpan".<br>4. Isi email baru, klik "Simpan".<br>5. Muat ulang panel di jendela Kurator.<br>6. Login dengan email lama, lalu dengan email baru. | Email dipakai: `kurator1@pahamhukum.test`<br>Email baru: `kurator2.baru@pahamhukum.test` | Perubahan detail akun tersimpan dan berlaku pada sesi login Kurator berikutnya. | Email yang sudah dipakai ditolak dengan pesan "Email sudah terdaftar.". Email baru tersimpan dan tampil di daftar. Sesi Kurator yang sedang berjalan tidak terputus. Login dengan email lama ditolak, sedangkan login dengan email baru berhasil masuk ke `/panel/kurator/konten`. Pada uji awal di `v9.0` aksi Ubah belum tersedia; fitur ditambahkan melalui PR #115, lalu diuji ulang. | Pass |
| UC09-TC03 | KF37 | Alternatif 1: Penonaktifan Akun Kurator | 1. Login sebagai Kurator baru di jendela terpisah.<br>2. Dari panel Administrator, klik "Nonaktifkan" pada akun tersebut dan konfirmasi.<br>3. Muat ulang panel di jendela Kurator.<br>4. Coba login kembali dengan akun tersebut. | Akun `kurator.uji.radit@pahamhukum.test` | Sesi Kurator segera terputus dan Kurator tidak bisa login kembali. | Status berubah menjadi Nonaktif setelah konfirmasi. Permintaan berikutnya dari Kurator dialihkan ke `/masuk?alasan=akun-nonaktif` dengan pesan "Akun Anda dinonaktifkan. Hubungi Administrator.", dan login ulang ditolak dengan pesan yang sama. | Pass |

<br>

## 4.5 Pengujian Kebutuhan Non-Fungsional (KNF)

Setiap KNF pada Tabel 3.2 SKPL diuji secara terukur berdasarkan parameter yang telah didefinisikan. Setiap pengujian memuat target terukur, metode dan alat yang sesuai dengan parameter (misalnya Chrome DevTools untuk *response time* dan inspeksi basis data untuk *security*), serta hasil aktual berupa angka atau data. KNF yang belum dipenuhi atau tidak diimplementasikan dicantumkan beserta alasan dan rencana perbaikan.

Tabel 4.5. Hasil Pengujian KNF

| ID Pengujian | ID KNF | Parameter | Target Terukur | Metode dan Alat | Hasil Aktual | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| KNF01-TC01 | KNF01 | *Response time* | Bagian inti beranda (judul, kolom pencarian, dan kartu bidang hukum) tampil ≤ 3 detik pada koneksi 1 Mbps | *Build* produksi; Chromium lewat Playwright dengan Chrome DevTools Protocol: *throttling* 1 Mbps unduh dan unggah, RTT 40 ms, *cache* dinonaktifkan. Diukur 5 kali: waktu sampai kartu bidang hukum tampil dan *Largest Contentful Paint* (LCP). | Bagian inti tampil rata-rata 98 ms (maks 130 ms); LCP rata-rata 513 ms (maks 524 ms); seluruh halaman selesai dimuat (*load*) rata-rata sekitar 1,83 detik (maks 1,84 detik) | Pass |
| KNF02-TC01 | KNF02 | *Efficiency* | Total data terunduh pada pemuatan awal tanpa *cache* ≤ 350 KB per halaman, di luar berkas templat | Chrome DevTools Protocol, menjumlahkan `encodedDataLength` seluruh permintaan (ukuran setelah kompresi) pada setiap halaman publik dengan *cache* dinonaktifkan | `/` 211,6 KB; `/kasus/1` 214,9 KB; `/cari?q=upah` 208,4 KB; `/masuk` 196,6 KB. Halaman terberat 214,9 KB (61,4% dari batas). | Pass |
| KNF03-TC01 | KNF03 | *Portability* | Antarmuka berjalan normal di Chrome, Firefox, Edge, dan Safari versi rilis dua tahun terakhir, serta tetap tertata pada lebar layar mulai 360 piksel | Uji manual di Chrome dan Edge versi terbaru serta Chrome/Edge DevTools *Device Toolbar* (lebar 360 px dan desktop) pada layar I-01 (`/`), I-02 (`/kasus/1`), dan I-03 (`/cari?q=upah`), ditambah pengamatan selama uji use case UC01 sampai UC09 di Chrome | Chrome dan Edge: layar I-01, I-02, dan I-03 tertata rapi pada lebar 360 px dan desktop tanpa *horizontal overflow* (`scrollWidth <= innerWidth`) dan tanpa galat konsol. Firefox dan Safari belum diuji; Safari tidak tersedia pada perangkat Windows yang dipakai | Fail. Chrome, Edge, dan lebar 360 px terpenuhi, tetapi Firefox dan Safari belum diuji. Rencana: menjalankan ulang pengujian yang sama di Firefox dan di Safari pada perangkat macOS |
| KNF04-TC01 | KNF04 | *Response time* | Waktu respons pencarian paling lama 2 detik (`≤ 2.000 ms`) meski jumlah data kasus melebihi 500 entri | Menambahkan 600 entri fiktif pada Supabase lokal hingga total 603 rangkuman Disetujui (`> 500`), lalu mengukur 5 kali pencarian (`"upah"`, `"sengketa konsumen"`, `"kompensasi"`, `"gaji"`, `"pajak kendaraan"`) menggunakan `performance.now()` pada `cariKasusDisetujui()` dengan indeks GIN `pg_trgm` (`0005_indeks_pencarian.sql`) | Hasil 5 percobaan: 42,78 ms, 30,13 ms, 36,03 ms, 49,87 ms, dan 42,21 ms; rata-rata **40,2 ms** dan maksimum **49,87 ms** (`< 2.000 ms`) | Pass |
| KNF05-TC01 | KNF05 | *Availability* | *Uptime* layanan publik minimal 95% setiap bulan | Uji pendahuluan: `npm run build` dan `npx next start` dengan Supabase lokal, lalu 20 permintaan HTTP berurutan ke 5 rute publik (`/`, `/cari`, `/cari?q=upah`, `/kasus/1`, `/kasus/3`) dengan skrip *probe* Node.js `fetch` | 20/20 permintaan mengembalikan HTTP 200 (100%), waktu respons rata-rata 109,54 ms dan maksimum 290,07 ms. Target bulanan belum dapat diukur karena aplikasi belum di-*deploy* | Belum diuji sesuai target. Uji pendahuluan lokal berhasil, tetapi *uptime* bulanan baru dapat diukur setelah *deploy* dengan pemantauan selama satu bulan, misalnya menggunakan UptimeRobot |
| KNF06-TC01 | KNF06 | *Security* | Status *checklist* tetap anonim, hanya tersimpan di perangkat, dan tidak dikirim atau disimpan ke basis data server | 1. Memantau seluruh permintaan jaringan saat mencentang dokumen di `/kasus/1` (Playwright).<br>2. Memeriksa isi `localStorage`.<br>3. Inspeksi basis data: kolom tabel `checklist`, hak tulis peran `anon`, dan isi baris setelah mencentang.<br>4. Didukung C23-UT08 dan INT-TC16. | 0 permintaan jaringan saat mencentang; status hanya ada di kunci `localStorage` `pahamhukum:checklist:1`; tabel `checklist` hanya menyimpan daftar dokumen dari Kurator (`daftar_dokumen`), peran `anon` tidak memiliki hak `INSERT` maupun `UPDATE`, dan barisnya tidak berubah setelah pengguna mencentang | Pass |
| KNF07-TC01 | KNF07 | *Response time* | Konten yang disetujui Administrator tampil di halaman publik ≤ 60 detik tanpa *re-deploy* | INT-TC49 pada Supabase lokal: menyetujui konten lalu membaca konten tersebut dengan *client* anonim, diukur 3 kali | 148 ms, 198 ms, dan 278 ms (rata-rata 208 ms, maksimum 278 ms), jauh di bawah 60 detik | Pass |
| KNF08-TC01 | KNF08 | *Reliability* | Saat templat diperbarui, berkas versi lama tetap tersedia sampai versi baru selesai tersimpan, dan setelah berhasil hanya tersisa satu berkas (versi terbaru) di Storage | Integration test INT-TC36 pada Supabase lokal: unggah `surat.pdf` 2 KB, unggah ulang nama yang sama 4 KB, lalu daftar isi folder rangkuman di *bucket* `templat` | Versi naik dari 1 menjadi 2, baris `templat_dokumen` menunjuk lokasi berkas baru, dan folder hanya berisi 1 berkas (berkas versi 1 terhapus setelah versi 2 tersimpan) | Pass |
| KNF08-TC02 | KNF08 | *Reliability* | Jika unggahan atau penyimpanan versi baru gagal, templat tetap menunjuk versi sebelumnya dan tidak ada berkas setengah jadi yang tertinggal | Inspeksi kode `perbaruiVersi()` di `src/lib/models/templatDokumen.ts`: berkas baru diunggah ke lokasi unik dengan `upsert: false`, baris basis data baru diperbarui setelah unggahan berhasil, berkas baru dihapus bila pembaruan baris gagal, dan berkas lama baru dihapus setelah pembaruan berhasil | Tiga jalur sesuai target: unggahan gagal berhenti sebelum basis data diubah, pembaruan baris gagal menghapus berkas baru dan versi lama tetap utuh, dan berkas lama tidak pernah ditimpa di tempat. Kegagalan jaringan belum disimulasikan secara otomatis | Pass |
| KNF09-TC01 | KNF09 | *Security* | Riwayat status tersimpan permanen dan tidak dapat diubah atau dihapus, termasuk oleh Administrator | INT-TC48 pada Supabase lokal: mencoba `UPDATE` dan `DELETE` pada tabel `riwayat_status`, didukung C12-UT17 | Kedua operasi ditolak oleh *trigger* `riwayat_status_permanen` dan baris riwayat tidak berubah | Pass |
| KNF10-TC01 | KNF10 | Security | Kata sandi tidak tersimpan sebagai teks mentah dan di-*hash* dengan bcrypt *cost factor* ≥ 10 | Membuat akun lewat `auth.admin.createUser` (jalur yang sama dengan `simpanKuratorBaru`), lalu memeriksa kolom `auth.users.encrypted_password` dengan `psql` pada Supabase lokal, serta mencari kolom kata sandi di skema `public` | Seluruh akun yang diperiksa (akun baru, `admin`, `kurator1`) berawalan `$2a$10$` (bcrypt, *cost factor* 10) dengan panjang 60 karakter, tidak sama dengan teks kata sandi, dan skema `public` tidak memiliki kolom kata sandi | Pass |
| KNF11-TC01 | KNF11 | *Security* | Seluruh lalu lintas memakai TLS/HTTPS dan akses HTTP dialihkan otomatis ke HTTPS | Belum diuji | Aplikasi belum di-*deploy* ke domain publik, sehingga pengalihan HTTP ke HTTPS belum dapat diperiksa. Koneksi ke Supabase sudah memakai HTTPS | Belum diuji. Rencana: setelah *deploy*, memeriksa respons `http://` dengan `curl -I` dan memastikan pengalihan 301/308 ke `https://` |
| KNF12-TC01 | KNF12 | *Ergonomy* | Seluruh isian penyusunan konten dapat diisi dan diajukan pada satu halaman tanpa berpindah halaman atau tab | Uji manual pada UC06-TC01 di halaman `/panel/kurator/konten/[id]`: hitung jumlah kartu isian dan jumlah perpindahan halaman dari draf dibuat sampai diajukan, serta tambah dan hapus butir Langkah dan Artikel | 6 kartu isian (Kasus, Isi rangkuman, Langkah penyelesaian, Daftar periksa dokumen, Templat surat, dan Artikel pendukung) tampil dalam 1 halaman, 0 perpindahan halaman atau tab, dan butir Langkah serta Artikel dapat ditambah, diurutkan, dan dihapus langsung di halaman yang sama | Pass |
| KNF13-TC01 | KNF13 | *Ergonomy* | Administrator dapat membaca isi konten sekaligus menekan tombol "Setujui" dan "Kembalikan" pada satu layar tanpa berpindah tab | Pengamatan pada halaman Moderasi (`/panel/admin/moderasi`) saat UC06-TC01 langkah 5 | Antrean, isi lengkap konten, kolom alasan revisi, serta tombol "Kembalikan" dan "Setujui dan tayangkan" tampil dalam satu halaman tanpa berpindah tab | Pass |
| KNF14-TC01 | KNF14 | Security | Sesi panel berakhir otomatis setelah 30 menit tanpa aktivitas dan pengguna wajib masuk kembali | Mengubah cookie `aktivitas_terakhir` menjadi 29 dan 31 menit lalu di Chrome (UC05-TC05), ditambah unit test batas C25-UT15, C25-UT16, dan C25-UT19 | Pada 29 menit dan tepat 30 menit sesi masih sah. Pada 31 menit dan 30 menit lebih 1 milidetik, pengguna dialihkan ke `/masuk?alasan=sesi-berakhir` dan sesi Supabase diakhiri | Pass |

<br>

## 4.6 Tangkapan Layar dan Bukti Hasil Pengujian

Bukti pengujian dilampirkan sesuai ID Pengujian pada Subbab 4.2 sampai 4.5, berupa tangkapan layar aplikasi, keluaran *test runner*, laporan *coverage* untuk setiap kelas Mendalam, atau hasil alat ukur.

Tabel 4.6. Bukti Hasil Pengujian

| ID Pengujian | Bukti Hasil Pengujian |
| :--- | :--- |
| C02-UT01 – C02-UT20 | ![Unit test C02](./assets/pengujian/unit/c02-unit-test.png) |
| C02 (coverage) | ![Coverage C02](./assets/pengujian/unit/c02-coverage.png) |
| C03-UT01 – C03-UT19, C09-UT01 – C09-UT27, C27-UT01 – C27-UT04 | Keluaran `npm test` dan `npm run test:coverage` untuk berkas `antreanPeninjauan.test.ts`, `modelAdministrator.test.ts`, `modelTemplatDokumen.test.ts`, dan `kontrolPelacakanKonten.test.ts`: 50 test lulus; `administrator.ts` 100% baris dan 98% cabang, `templatDokumen.ts` 100% baris dan 97,5% cabang, `kontrolPelacakanKonten.ts` 100% |
| C05-UT01 – C05-UT09, C11-UT01 – C11-UT04, C21-UT01 – C21-UT14, C23-UT01 – C23-UT20 | Keluaran `npm test`: berkas `modelKelompokKasus.test.ts` (C05), `modelLembagaBantuanHukum.test.ts` (C11), `kontrolJelajahKasus.test.ts` (C21), dan `kontrolChecklist.test.ts` (C23), 53 test seluruhnya lulus<br>![Keluaran unit test C05, C11, C21, dan C23](./assets/pengujian/unit/unit-test-c05-c11-c21-c23.png) |
| C23 (coverage) | Keluaran `npm run test:coverage`: `kontrolChecklist.ts` (C23) 100% *lines* dan 100% *branch*; `kontrolJelajahKasus.ts` (C21), `kelompokKasus.ts` (C05), dan `lembagaBantuanHukum.ts` (C11) juga 100% *lines* dan 100% *branch*<br>![Laporan coverage C05, C11, C21, dan C23](./assets/pengujian/unit/coverage-c05-c11-c21-c23.png) |
| C22-UT01 – C22-UT17, C24-UT01 – C24-UT12 | Keluaran `npm test`: berkas `kontrolPencarianKataKunci.test.ts` (17 test, C22) dan `kontrolUnduhTemplat.test.ts` (21 test, C24) seluruhnya lulus<br>![Keluaran unit test C22 dan C24](./assets/pengujian/unit/unit-test-c22-c24.png) |
| C22 (coverage), C24 (coverage) | Keluaran `npm run test:coverage`: `kontrolPencarianKataKunci.ts` (C22) 100% *lines* dan 100% *branch*; `pencarian.ts` (C22) 100% *lines* dan 97,61% *branch*; `kontrolUnduhTemplat.ts` (C24) 100% *lines* dan 100% *branch*<br>![Laporan coverage C22 dan C24](./assets/pengujian/unit/coverage-c22-c24.png) |
| C06-UT01 – C06-UT22, C17-UT01 – C17-UT07, C26-UT01 – C26-UT22 | Keluaran `npm test`: berkas `modelRangkumanKasus.test.ts` (C06), `aturanDaftarButir.test.ts` (C17), serta `kontrolPenyusunanKonten.test.ts` dan `aturanPenyusunanKonten.test.ts` (C26) seluruhnya lulus<br>![Keluaran unit test seluruh berkas](./assets/pengujian/unit/unit-test-seluruh-berkas.png) |
| C06 (coverage), C26 (coverage) | Keluaran `npm run test:coverage`: `rangkumanKasus.ts` (C06) 100% *lines* dan 96,29% *branch*; `kontrolPenyusunanKonten.ts` (C26) 96% *lines* dan 96,96% *branch*; `aturanPenyusunanKonten.ts` (C26) 100% *lines* dan 82,35% *branch*<br>![Laporan coverage seluruh berkas](./assets/pengujian/unit/coverage-seluruh-berkas.png) |
| C25-UT01 – C25-UT24 | ![Unit test C25](./assets/pengujian/unit/c25-unit-test.png) |
| C25 (coverage) | ![Coverage C25](./assets/pengujian/unit/c25-coverage.png) |
| C29-UT01 – C29-UT17 | ![Unit test C29](./assets/pengujian/unit/c29-unit-test.png) |
| C29 (coverage) | ![Coverage C29](./assets/pengujian/unit/c29-coverage.png) |
| INT-TC01 – INT-TC09 | Keluaran `npm run test:integrasi` untuk IA-01 sampai IA-03 pada Supabase lokal<br>![Integration test IA-01 sampai IA-03](./assets/pengujian/integrasi/ia-01-03-autentikasi-akun.png) |
| INT-TC10 – INT-TC17 | Keluaran `npm run test:integrasi` untuk IA-13 sampai IA-16<br>![Keluaran integration test IA-13 sampai IA-16](./assets/pengujian/integrasi/ia-13-16-jelajah-checklist.png) |
| C12-UT01 – C12-UT19, C22-UT01 – C22-UT17, C24-UT01 – C24-UT12, C28-UT01 – C28-UT16 | Keluaran `npm test` pada seluruh berkas (25 berkas, 338 test lulus)<br>![Keluaran unit test lengkap](./assets/pengujian/unit/unit-test-lengkap.png) |
| INT-TC20 – INT-TC28 | Keluaran `npm run test:integrasi` untuk IA-07 dan IA-08 pada Supabase lokal (2 berkas, 9 test lulus)<br>![Keluaran integration test IA-07 dan IA-08](./assets/pengujian/integrasi/ia-07-08-pencarian-unduh-templat.png) |
| INT-TC30 – INT-TC39, KNF08-TC01 | Keluaran `npm run test:integrasi` untuk IA-10 sampai IA-12 pada Supabase lokal<br>![Keluaran integration test IA-10 sampai IA-12](./assets/pengujian/integrasi/ia-10-12-penyusunan-konten.png) |
| UC01-TC01 | Beranda menampilkan tiga bidang hukum yang punya situasi Disetujui<br>![UC01-TC01 beranda](./assets/pengujian/uc01/uc01-tc01-1-beranda.png)<br>Daftar situasi setelah memilih bidang Ketenagakerjaan<br>![UC01-TC01 pilih bidang](./assets/pengujian/uc01/uc01-tc01-2-pilih-bidang.png)<br>Halaman rangkuman `/kasus/1` dengan tujuh bagian berurutan, penanda Kurator, dan *disclaimer*<br>![UC01-TC01 rangkuman kasus](./assets/pengujian/uc01/uc01-tc01-3-rangkuman.png)<br>Direktori LBH setelah wilayah diganti menjadi Jawa Timur<br>![UC01-TC01 direktori LBH](./assets/pengujian/uc01/uc01-tc01-5-direktori-lbh.png)<br>Beranda pada lebar 360 px<br>![UC01-TC01 beranda ponsel](./assets/pengujian/uc01/uc01-tc01-4-beranda-ponsel.png) |
| UC01-TC02 | Peringatan darurat dengan tombol Telepon 112 dan Telepon polisi 110<br>![UC01-TC02 peringatan darurat](./assets/pengujian/uc01/uc01-tc02-1-peringatan.png)<br>Rangkuman `/kasus/5` setelah klik "Tutup dan lanjut membaca"<br>![UC01-TC02 rangkuman setelah peringatan](./assets/pengujian/uc01/uc01-tc02-2-rangkuman.png) |
| UC02-TC01 | Hasil pencarian kata kunci `"upah"` pada layar I-03<br>![UC02-TC01 hasil pencarian](./assets/pengujian/uc02/uc02-tc01-1-hasil-pencarian.png)<br>Halaman rangkuman `/kasus/1` terbuka setelah kartu hasil diklik<br>![UC02-TC01 rangkuman terbuka](./assets/pengujian/uc02/uc02-tc01-2-rangkuman-terbuka.png) |
| UC02-TC02 | Keadaan tidak ditemukan beserta saran bidang hukum aktif dan kotak *disclaimer* rujukan LBH<br>![UC02-TC02 tidak ditemukan](./assets/pengujian/uc02/uc02-tc02-1-tidak-ditemukan.png)<br>Klik kartu saran membuka beranda dengan bidang hukum terpilih<br>![UC02-TC02 klik saran bidang](./assets/pengujian/uc02/uc02-tc02-2-klik-saran-bidang.png) |
| UC03-TC01 | Dua dari tiga dokumen dicentang, progres 2/3 dan teks "1 dokumen lagi"<br>![UC03-TC01 centang dokumen](./assets/pengujian/uc03/uc03-tc01-centang.png) |
| UC03-TC02 | Centang tetap ada setelah halaman dimuat ulang<br>![UC03-TC02 setelah muat ulang](./assets/pengujian/uc03/uc03-tc02-1-muat-ulang.png)<br>Centang tetap ada saat halaman dibuka di tab baru<br>![UC03-TC02 setelah dibuka kembali](./assets/pengujian/uc03/uc03-tc02-2-buka-kembali.png) |
| UC04-TC01 | Bagian 6 Templat surat pada `/kasus/1` menampilkan *disclaimer* kerangka awal, metadata berkas, dan tombol "Unduh"<br>![UC04-TC01 bagian templat](./assets/pengujian/uc04/uc04-tc01-1-bagian-templat.png)<br>Berkas `.pdf` / `.docx` berhasil terunduh tanpa login<br>![UC04-TC01 berkas terunduh](./assets/pengujian/uc04/uc04-tc01-2-berkas-terunduh.png) |
| UC04-TC02 | Kasus tanpa templat (`/kasus/5`) tidak menampilkan tombol unduh dan menyatakan templat belum tersedia<br>![UC04-TC02 belum ada templat](./assets/pengujian/uc04/uc04-tc02-belum-ada-templat.png) |
| UC05-TC01 | Login Kurator<br>![UC05-TC01 Kurator](./assets/pengujian/uc05/uc05-tc01-kurator.png)<br>Login Administrator<br>![UC05-TC01 Administrator](./assets/pengujian/uc05/uc05-tc01-admin.png) |
| UC05-TC02 | Kata sandi salah<br>![UC05-TC02 kata sandi salah](./assets/pengujian/uc05/uc05-tc02-sandi-salah.png)<br>Email tidak terdaftar<br>![UC05-TC02 email salah](./assets/pengujian/uc05/uc05-tc02-email-salah.png) |
| UC05-TC03 | Tanpa login<br>![UC05-TC03 tanpa login](./assets/pengujian/uc05/uc05-tc03-tanpa-login.png)<br>Kurator membuka panel Administrator<br>![UC05-TC03 peran salah](./assets/pengujian/uc05/uc05-tc03-peran-salah.png) |
| UC05-TC04 | Setelah klik Keluar diarahkan ke halaman login<br>![UC05-TC04 setelah keluar](./assets/pengujian/uc05/uc05-tc04-ulang-setelah-keluar.png) |
| UC05-TC05, KNF14-TC01 | Sesi berakhir setelah 31 menit tanpa aktivitas (didukung C25-UT15, C25-UT16, dan C25-UT19)<br>![UC05-TC05 sesi berakhir](./assets/pengujian/uc05/uc05-tc05-sesi-berakhir.png) |
| UC06-TC01 | Formulir penyusunan konten baru berstatus Draft<br>![UC06-TC01 formulir baru](./assets/pengujian/uc06/uc06-tc01-1-formulir-baru.png)<br>Draf tersimpan setelah klik "Mulai menulis"<br>![UC06-TC01 draf dibuat](./assets/pengujian/uc06/uc06-tc01-2-draf-dibuat.png)<br>Templat tersimpan sebagai versi 1<br>![UC06-TC01 templat versi 1](./assets/pengujian/uc06/uc06-tc01-3-templat-versi-1.png)<br>Konten berstatus Diajukan dan formulir terkunci<br>![UC06-TC01 diajukan](./assets/pengujian/uc06/uc06-tc01-4-diajukan.png)<br>Konten muncul di antrean Moderasi Administrator<br>![UC06-TC01 antrean moderasi](./assets/pengujian/uc06/uc06-tc01-5-antrean-moderasi.png) |
| UC06-TC02 | Unggahan berkas JPG ditolak<br>![UC06-TC02 format salah](./assets/pengujian/uc06/uc06-tc02-1-format-salah.png)<br>Unggahan PDF 6 MB ditolak<br>![UC06-TC02 ukuran melebihi batas](./assets/pengujian/uc06/uc06-tc02-2-ukuran-melebihi.png) |
| UC06-TC03 | Pengajuan dicegah dan tiga isian wajib yang kosong ditandai<br>![UC06-TC03 isian belum lengkap](./assets/pengujian/uc06/uc06-tc03-isian-belum-lengkap.png) |
| UC06-TC04 | Panel Status konten milik Kurator hanya berisi "Simpan draf" dan "Ajukan untuk ditinjau"<br>![UC06-TC04 panel status](./assets/pengujian/uc06/uc06-tc04-panel-status.png) |
| UC09-TC01 | Akun baru terdaftar<br>![UC09-TC01 akun baru](./assets/pengujian/uc09/uc09-tc01-akun-baru.png)<br>Login dengan akun baru<br>![UC09-TC01 login akun baru](./assets/pengujian/uc09/uc09-tc01-login-akun-baru.png) |
| UC09-TC02 | Dialog ubah email<br>![UC09-TC02 dialog](./assets/pengujian/uc09/uc09-tc02-ulang-dialog.png)<br>Email yang sudah dipakai ditolak<br>![UC09-TC02 email dipakai](./assets/pengujian/uc09/uc09-tc02-ulang-email-dipakai.png)<br>Email baru tersimpan<br>![UC09-TC02 tersimpan](./assets/pengujian/uc09/uc09-tc02-ulang-tersimpan.png)<br>Login dengan email baru<br>![UC09-TC02 login email baru](./assets/pengujian/uc09/uc09-tc02-ulang-login-email-baru.png) |
| UC09-TC03 | Konfirmasi penonaktifan<br>![UC09-TC03 konfirmasi](./assets/pengujian/uc09/uc09-tc03-konfirmasi.png)<br>Status Nonaktif<br>![UC09-TC03 status nonaktif](./assets/pengujian/uc09/uc09-tc03-status-nonaktif.png)<br>Sesi Kurator diputus<br>![UC09-TC03 sesi diputus](./assets/pengujian/uc09/uc09-tc03-sesi-diputus.png)<br>Login ulang ditolak<br>![UC09-TC03 login ditolak](./assets/pengujian/uc09/uc09-tc03-login-ditolak.png) |
| KNF03-TC01 | Beranda pada lebar 360 piksel<br>![KNF03-TC01 beranda 360 piksel](./assets/pengujian/uc01/uc01-tc01-4-beranda-ponsel.png) |
| KNF03-TC01 | Tampilan responsif layar I-02 (`/kasus/1`) pada lebar `360 px` tanpa *horizontal overflow* dan tanpa galat konsol<br>![KNF03-TC01 tampilan 360 px](./assets/pengujian/knf/knf03-portability-360px.png) |
| KNF04-TC01 | Keluaran pengukuran waktu respons pencarian pada 603 entri Disetujui (rata-rata 40,2 ms, maks 49,87 ms)<br>![KNF04-TC01 pengukuran waktu respons](./assets/pengujian/knf/knf04-response-time-pencarian.png) |
| KNF05-TC01 | Keluaran *probe* ketersediaan layanan publik lokal: 20/20 HTTP 200 (100% *availability*)<br>![KNF05-TC01 pengukuran availability lokal](./assets/pengujian/knf/knf05-availability-lokal.png) |
| KNF01-TC01, KNF02-TC01 | Hasil lima kali pengukuran beranda pada 1 Mbps dan total data terunduh tiap halaman publik<br>![KNF01-TC01 dan KNF02-TC01 hasil pengukuran](./assets/pengujian/knf/knf01-knf02-pengukuran.png) |
| KNF06-TC01 | Tidak ada permintaan jaringan saat mencentang, dan status hanya ada di `localStorage`<br>![KNF06-TC01 lalu lintas jaringan](./assets/pengujian/knf/knf06-jaringan-saat-mencentang.png)<br>Inspeksi basis data: tabel `checklist` hanya berisi daftar dokumen dari Kurator dan peran `anon` tidak punya hak tulis<br>![KNF06-TC01 inspeksi basis data](./assets/pengujian/knf/knf06-inspeksi-basis-data.png) |
| KNF10-TC01 | Pemeriksaan `auth.users.encrypted_password` dengan `psql`<br>![KNF10-TC01 hash kata sandi](./assets/pengujian/knf/knf10-tc01-hash-kata-sandi.png) |
| KNF12-TC01 | Seluruh kartu isian berada dalam satu halaman<br>![KNF12-TC01 formulir satu halaman](./assets/pengujian/uc06/uc06-tc01-4-diajukan.png) |
| KNF13-TC01 | Isi konten dan tombol keputusan dalam satu layar Moderasi<br>![KNF13-TC01 moderasi satu layar](./assets/pengujian/uc06/uc06-tc01-5-antrean-moderasi.png) |

<br>

---

# BAB 5: Traceability

Petakan setiap KF ke KNF, use case, kelas perancangan, file implementasi, dan test case. Tabel traceability berikut akan menjadi sarana verifikasi KF. Setiap KF memiliki minimal satu test case dan dinyatakan terpenuhi apabila **seluruh** test case terkaitnya berkesimpulan `Pass`. KF yang tidak diimplementasikan tetap dicantumkan beserta alasannya.

Tabel 5.1. Matriks Kerunutan KF terhadap Implementasi dan Pengujian

| KF ID | KNF Terkait | Use Case ID | Kelas Terkait | Implementasi File Terkait | Test Case (UC) | Test Case (Unit/Integrasi/KNF) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| KF01 | KNF01, KNF02 | UC01 | C04, C13, C21 | `src/app/page.tsx`<br>`src/lib/controllers/kontrolJelajahKasus.ts`<br>`src/lib/models/bidangHukum.ts` | UC01-TC01 | C21-UT07, C21-UT12, INT-TC10 |
| KF02 | - | UC01, UC02, UC04 | C05, C06, C21, C22, C24 | `src/lib/controllers/kontrolJelajahKasus.ts`<br>`src/lib/controllers/kontrolPencarianKataKunci.ts`<br>`src/lib/controllers/kontrolUnduhTemplat.ts`<br>`src/supabase/migrations/0001_skema.sql` | UC01-TC01, UC02-TC01 | C21-UT09, C22-UT12, C22-UT13, C24-UT08, INT-TC14, INT-TC22, INT-TC27, INT-TC38, INT-TC39 |
| KF03 | - | UC01 | C05, C13, C21 | `src/app/page.tsx`<br>`src/lib/controllers/kontrolJelajahKasus.ts`<br>`src/lib/models/kelompokKasus.ts` | UC01-TC01 | C05-UT01, C21-UT05, C21-UT06, INT-TC11 |
| KF04 | - | UC01 | C05, C14 | `src/components/kasus/KepalaRangkuman.tsx`<br>`src/lib/models/kelompokKasus.ts` | UC01-TC01 | C05-UT05 |
| KF05 | KNF01 | UC01 | C06, C14, C21 | `src/app/kasus/[id]/page.tsx`<br>`src/lib/controllers/kontrolJelajahKasus.ts`<br>`src/lib/models/rangkumanKasus.ts` | UC01-TC01 | C21-UT08, C06-UT15, INT-TC13 |
| KF06 | KNF04 | UC02 | C05, C06, C15, C22 | `src/app/cari/page.tsx`<br>`src/lib/controllers/kontrolPencarianKataKunci.ts`<br>`src/lib/models/pencarian.ts` | UC02-TC01 | C22-UT01 s.d. C22-UT11, INT-TC20, INT-TC23, INT-TC24 |
| KF07 | - | UC02 | C04, C11, C15, C22 | `src/app/cari/page.tsx`<br>`src/components/pencarian/TidakDitemukanPencarian.tsx`<br>`src/lib/controllers/kontrolPencarianKataKunci.ts` | UC02-TC02 | C22-UT15 s.d. C22-UT17, INT-TC21 |
| KF08 | - | UC01 | C06, C14 | `src/app/kasus/[id]/page.tsx`<br>`src/components/kasus/` | UC01-TC01 | INT-TC13 |
| KF09 | - | UC01 | C06, C14 | `src/components/kasus/BagianPertimbangan.tsx` | UC01-TC01 | - |
| KF10 | - | UC01 | C06, C14 | `src/components/kasus/KepalaRangkuman.tsx`<br>`src/lib/models/rangkumanKasus.ts` | UC01-TC01 | INT-TC45 |
| KF11 | - | UC01 | C07, C14 | `src/components/kasus/BagianLangkah.tsx`<br>`src/lib/models/langkahPenyelesaian.ts` | UC01-TC01 | INT-TC13 |
| KF12 | - | UC01 | C07, C14 | `src/components/kasus/BagianLangkah.tsx`<br>`src/lib/models/rangkumanKasus.ts` | UC01-TC01 | C06-UT21, C06-UT22 |
| KF13 | - | UC03 | C08, C14, C23 | `src/components/kasus/ChecklistDokumen.tsx`<br>`src/lib/controllers/kontrolChecklist.ts` | UC03-TC01 | C23-UT15 s.d. C23-UT20 |
| KF14 | KNF06 | UC03 | C08, C23 | `src/lib/controllers/kontrolChecklist.ts` | UC03-TC01, UC03-TC02 | C23-UT01 s.d. C23-UT14, INT-TC16, INT-TC17 |
| KF15 | - | UC04 | C09, C14, C24 | `src/components/kasus/BagianTemplat.tsx`<br>`src/lib/controllers/kontrolUnduhTemplat.ts` | UC04-TC01, UC04-TC02 | C24-UT01 s.d. C24-UT03, INT-TC26 |
| KF16 | KNF08 | UC04 | C09, C24 | `src/components/kasus/TombolUnduhTemplat.tsx`<br>`src/lib/controllers/kontrolUnduhTemplat.ts`<br>`src/lib/models/templatDokumen.ts` | UC04-TC01 | C09-UT24 s.d. C09-UT27, C24-UT04 s.d. C24-UT12, INT-TC25, INT-TC26, INT-TC28 |
| KF17 | - | UC04 | C14 | `src/components/kasus/BagianTemplat.tsx` | UC04-TC01 | - |
| KF18 | - | UC01 | C10, C14 | `src/components/kasus/BagianBacaan.tsx`<br>`src/lib/models/artikel.ts` | UC01-TC01 | - |
| KF19 | - | UC01, UC02 | C13, C14, C15 | `src/components/beranda/KotakDisclaimer.tsx`<br>`src/components/pencarian/KotakDisclaimerPencarian.tsx` | UC01-TC01, UC02-TC01 | - |
| KF20 | - | UC01 | C11, C14, C21 | `src/components/kasus/DirektoriLBH.tsx`<br>`src/lib/controllers/kontrolJelajahKasus.ts`<br>`src/lib/models/lembagaBantuanHukum.ts` | UC01-TC01 | C11-UT01 s.d. C11-UT04, C21-UT10, C21-UT11, C21-UT14, INT-TC15 |
| KF21 | - | UC01 | C05, C13, C21 | `src/components/beranda/KartuKelompokDarurat.tsx`<br>`src/lib/controllers/kontrolJelajahKasus.ts` | UC01-TC02 | C05-UT03, C05-UT04, C21-UT01 s.d. C21-UT04, INT-TC12 |
| KF22 | KNF12 | UC06 | C17, C26 | `src/app/panel/kurator/konten/[id]/page.tsx`<br>`src/components/konten/FormulirKonten.tsx` | UC06-TC01 | C17-UT01 s.d. C17-UT07, C26-UT01 s.d. C26-UT05, KNF12-TC01 |
| KF23 | - | UC06 | C06, C12, C26 | `src/lib/controllers/kontrolPenyusunanKonten.ts`<br>`src/lib/models/rangkumanKasus.ts` | UC06-TC01 | C06-UT01, C06-UT02, C26-UT11, C26-UT12, INT-TC30 |
| KF24 | KNF07 | UC08 | C12, C28 | `src/lib/controllers/kontrolModerasiKonten.ts`<br>`src/lib/models/riwayatStatus.ts` | UC08-TC01 | C28-UT11 s.d. C28-UT13, INT-TC45, INT-TC49, KNF07-TC01 |
| KF25 | KNF08 | UC06 | C09, C26 | `src/lib/controllers/kontrolPenyusunanKonten.ts`<br>`src/lib/models/templatDokumen.ts` | UC06-TC01 | C09-UT09 s.d. C09-UT15, C26-UT15 s.d. C26-UT17, INT-TC36, INT-TC37, KNF08-TC01, KNF08-TC02 |
| KF26 | - | UC06 | C09, C17, C26 | `src/lib/controllers/kontrolPenyusunanKonten.ts`<br>`src/lib/models/templatDokumen.ts`<br>`src/components/konten/KartuTemplat.tsx` | UC06-TC02 | C09-UT01 s.d. C09-UT06, C26-UT13, C26-UT14 |
| KF27 | - | UC06 | C06, C12, C26 | `src/lib/controllers/kontrolPenyusunanKonten.ts`<br>`src/lib/models/rangkumanKasus.ts`<br>`src/supabase/migrations/0004_ajukan_konten.sql` | UC06-TC01 | C06-UT11, C06-UT12, C26-UT06, C26-UT07, INT-TC33 |
| KF28 | - | UC06 | C06, C17, C26 | `src/lib/controllers/aturanPenyusunanKonten.ts`<br>`src/lib/models/rangkumanKasus.ts`<br>`src/components/konten/TandaIsian.tsx` | UC06-TC03 | C06-UT07 s.d. C06-UT10, C26-UT08 s.d. C26-UT10, INT-TC34 |
| KF29 | - | UC07 | C02, C18, C27 | `src/app/panel/kurator/konten/page.tsx`<br>`src/lib/controllers/kontrolPelacakanKonten.ts`<br>`src/lib/models/kurator.ts` | UC07-TC01 | C02-UT19, C02-UT20, C27-UT01 s.d. C27-UT04, INT-TC40, INT-TC41 |
| KF30 | - | UC07 | C02, C18, C27 | `src/components/pelacakan/DaftarKonten.tsx`<br>`src/lib/models/kurator.ts` | UC07-TC02 | C02-UT19, INT-TC47 |
| KF31 | - | UC08 | C03, C19, C28 | `src/app/panel/admin/moderasi/page.tsx`<br>`src/lib/controllers/kontrolModerasiKonten.ts`<br>`src/lib/models/administrator.ts` | UC08-TC01 | C03-UT01 s.d. C03-UT14, C28-UT14, INT-TC42 |
| KF32 | KNF13 | UC08 | C12, C19, C28 | `src/components/moderasi/PanelKeputusan.tsx`<br>`src/lib/controllers/kontrolModerasiKonten.ts`<br>`src/lib/models/riwayatStatus.ts` | UC08-TC01 | C12-UT10, C28-UT11 s.d. C28-UT13, INT-TC45 |
| KF33 | - | UC08 | C12, C19, C28 | `src/components/moderasi/PanelKeputusan.tsx`<br>`src/lib/controllers/kontrolModerasiKonten.ts` | UC08-TC02 | INT-TC47 |
| KF34 | - | UC08 | C12, C19, C28 | `src/components/moderasi/PanelKeputusan.tsx`<br>`src/lib/controllers/kontrolModerasiKonten.ts`<br>`src/lib/models/riwayatStatus.ts` | UC08-TC03 | INT-TC46 |
| KF35 | - | UC06 | C06, C17, C26 | `src/supabase/migrations/0001_skema.sql`<br>`src/components/konten/PanelStatusKonten.tsx` | UC06-TC04 | INT-TC35, INT-TC39 |
| KF36 | KNF09 | UC06, UC08 | C12, C26, C28 | `src/lib/models/riwayatStatus.ts`<br>`src/lib/controllers/kontrolPenyusunanKonten.ts`<br>`src/lib/controllers/kontrolModerasiKonten.ts` | UC06-TC01, UC08-TC01 | C12-UT10 s.d. C12-UT19, C26-UT11, INT-TC30, INT-TC33, INT-TC45, INT-TC48 |
| KF37 | KNF14 | UC09 | C02, C20, C25, C29 | `src/lib/controllers/kontrolPengelolaanAkun.ts`<br>`src/lib/models/kurator.ts`<br>`src/proxy.ts` | UC09-TC03 | C02-UT16 s.d. C02-UT18, C25-UT05, C25-UT20, C29-UT07 s.d. C29-UT09, INT-TC03, INT-TC07 |
| KF38 | KNF10 | UC09 | C02, C20, C29 | `src/lib/controllers/kontrolPengelolaanAkun.ts`<br>`src/lib/controllers/validasiAkun.ts`<br>`src/lib/models/kurator.ts` | UC09-TC01 | C02-UT08 s.d. C02-UT15, C29-UT01 s.d. C29-UT06, INT-TC05, INT-TC06, KNF10-TC01 |
| KF39 | - | UC05 | C01, C16, C25 | `src/app/masuk/page.tsx`<br>`src/lib/controllers/kontrolAutentikasi.ts` | UC05-TC01 | C25-UT01, C25-UT02, C25-UT11, INT-TC01 |
| KF40 | - | UC05 | C16, C25 | `src/components/login/FormLogin.tsx`<br>`src/lib/controllers/kontrolAutentikasi.ts` | UC05-TC02 | C25-UT03, C25-UT04, C25-UT06, INT-TC02 |
| KF41 | KNF14 | UC05 | C25 | `src/proxy.ts`<br>`src/lib/controllers/aturanSesi.ts` | UC05-TC03, UC05-TC05 | C25-UT08 s.d. C25-UT19, C25-UT21 s.d. C25-UT24, INT-TC04, INT-TC09 |
| KF42 | - | UC01 s.d. UC09 | C13 s.d. C20 | `src/app/`<br>`src/components/` | UC01-TC01 s.d. UC09-TC03 | - |
| KF43 | - | UC09 | C02, C20, C29 | `src/lib/controllers/kontrolPengelolaanAkun.ts`<br>`src/lib/models/kurator.ts`<br>`src/components/akun/` | UC09-TC02 | C02-UT01 s.d. C02-UT04, C29-UT10 s.d. C29-UT17, INT-TC08 |
| KF44 | - | UC05 | C25 | `src/lib/controllers/kontrolAutentikasi.ts`<br>`src/components/layout/NavbarPanel.tsx` | UC05-TC04 | C25-UT07 |

Seluruh 44 KF telah diimplementasikan. KF43 dan KF44 yang sebelumnya belum sesuai pada `v9.0` telah dilengkapi melalui PR #115 dan #114.

Tabel 5.2. Matriks Kerunutan KNF terhadap Pengujian

| ID KNF | Parameter | KF/UC Terkait | Test Case |
| :--- | :--- | :--- | :--- |
| KNF01 | *Response time* | KF01, KF05 / UC01 | KNF01-TC01 |
| KNF02 | *Efficiency* | KF01, KF05 / UC01 | KNF02-TC01 |
| KNF03 | *Portability* | KF42 / UC01 s.d. UC09 | KNF03-TC01 (Fail sebagian: Firefox dan Safari belum diuji) |
| KNF04 | *Response time* | KF06 / UC02 | KNF04-TC01 |
| KNF05 | *Availability* | - / UC01 s.d. UC04 | KNF05-TC01 (belum diuji sesuai target bulanan; uji pendahuluan lokal 100%) |
| KNF06 | *Security* | KF14 / UC03 | KNF06-TC01, INT-TC16 |
| KNF07 | *Response time* | KF24 / UC08 | KNF07-TC01, INT-TC49 |
| KNF08 | *Reliability* | KF16, KF25 / UC06 | KNF08-TC01, KNF08-TC02, C09-UT13, C09-UT14, INT-TC36 |
| KNF09 | *Security* | KF36 / UC06, UC08 | KNF09-TC01, INT-TC48 |
| KNF10 | *Security* | KF38 / UC09 | KNF10-TC01 |
| KNF11 | *Security* | - / UC01 s.d. UC09 | KNF11-TC01 (belum diuji: aplikasi belum di-*deploy*) |
| KNF12 | *Ergonomy* | KF22 / UC06 | KNF12-TC01 |
| KNF13 | *Ergonomy* | KF32, KF33 / UC08 | KNF13-TC01 |
| KNF14 | *Security* | KF37, KF41 / UC05 | KNF14-TC01, C25-UT15, C25-UT16, C25-UT19 |
