<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 9
<br>
IMPLEMENTASI PERANGKAT LUNAK
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

**Deadline:** Jumat, 13 November 2026, 21.00 WIB
**Asistensi akbar:** Senin, 2 November 2026, 19.00 WIB, Microsoft Teams

---

# BAGIAN A: Ketentuan Implementasi

## A.1 Deskripsi Tugas

Pada tugas ini, kalian mengimplementasikan perangkat lunak yang telah dirancang pada tugas-tugas sebelumnya (SKPL, APL, DPPL) menjadi aplikasi yang **dapat dijalankan**. Platform bebas (web, desktop, atau mobile) selama aplikasi dapat dijalankan ulang oleh asisten mengikuti petunjuk kalian.

Ketentuan umum:
- Setiap anggota bertanggung jawab atas **minimal satu fitur atau modul** dan harus terlihat jelas di riwayat commit/PR.
- Implementasi harus **mengacu pada DPPL**. Jika ada yang berubah (kelas, layar, basis data, dsb.), catat di Bagian B.1. Perubahan itu wajar, tetapi harus tercatat dan beralasan.
- Implementasi **tidak harus berupa kelas** (misalnya fungsi, komponen, *route/handler*, *stored procedure*, atau skrip). Namun, setiap kelas perancangan pada DPPL **wajib dapat ditelusuri** ke implementasinya, dan penelusuran ini dicatat di Bagian B.5.
- Seluruh use case pada SKPL **diprioritaskan** untuk diimplementasikan. Status tiap use case akan dilaporkan pada HIUPL (Tugas 10).
- Seluruh mahasiswa **wajib** mengikuti asistensi akbar.

## A.2 Platform, Bahasa, dan Teknologi

Kalian **bebas** memilih bahasa, framework, library, dan basis data, dengan syarat:

1. **Dapat dijalankan ulang** oleh asisten pada mesin biasa dengan mengikuti README. Versi bahasa/runtime dan seluruh dependensi harus tertulis jelas.
2. **Dependensi dikelola lewat file standar**, misalnya `package.json` + lockfile, `requirements.txt`/`pyproject.toml`, `pom.xml`/`build.gradle`, `composer.json`, `pubspec.yaml`, dan sejenisnya. Jangan meng-commit folder hasil instalasi (`node_modules/`, `venv/`, `build/`, dll.).
3. **Jika memakai layanan eksternal** (basis data cloud, API pihak ketiga, auth, dll.), sediakan cara menjalankan tanpa akun pribadi kalian, atau sediakan data/akun uji pada README. Basis data **sangat disarankan** dapat dijalankan lokal (SQLite, atau Docker Compose untuk PostgreSQL/MySQL/MongoDB).
4. **Arsitektur sesuai DPPL.** Pola arsitektur yang kalian pilih di APL/DPPL (MVC, layered, client-server, dll.) harus terlihat pada struktur kode.

Ketentuan tambahan per platform:

| Platform | Ketentuan |
| :--- | :--- |
| **Web** | Berjalan lokal lewat satu-dua perintah yang terdokumentasi. Boleh juga di-*deploy*; jika ya, cantumkan URL, tetapi **tetap wajib bisa dijalankan lokal** (URL deploy bisa mati). |
| **Desktop** | Berjalan dari source lewat perintah yang terdokumentasi. Build/installer opsional. |
| **Mobile** | Berjalan di emulator/simulator atau perangkat. Sertakan langkah menjalankan, dan **sangat disarankan** melampirkan APK/build di Release. |

## A.3 Keamanan Repository

Repo fork kelompok bersifat **public**, sehingga:

- **Dilarang** meng-commit password, API key, token, `.env` asli, sertifikat/private key, atau data pribadi. Hal ini dapat mengurangi nilai.
- Sediakan `.env.example` berisi nama variabel tanpa nilai rahasia, dan masukkan `.env` ke `.gitignore`.
- Jika sudah terlanjur ter-commit, **cabut/ganti** kredensial tersebut. Menghapus commit saja tidak cukup.
- Data uji/seed harus berupa data fiktif.

## A.4 Struktur Folder

Seluruh kode ditempatkan di `src/` pada repo fork. Jangan mengubah folder milestone lama.

```
src/                              # SELURUH kode implementasi
	README.md                     # dokumentasi utama aplikasi (lihat A.5)
	.env.example                  # jika memakai environment variable
	<struktur kode kalian>        # bebas, mengikuti pola arsitektur DPPL
	tests/                        # test case (jika ada)
docs/
	M9/
		KXX_GYY_Implementasi.md   # laporan ini (Bagian B)
		KXX_GYY_Form-Asistensi.md
```

Catatan:
- `README.md` aplikasi diletakkan di **`src/README.md`**, bukan di root repo.
- Jika kerangka kerja kalian mewajibkan struktur tertentu (misalnya Maven `src/main/java`, Flutter `lib/`, monorepo `frontend/` dan `backend/`), letakkan semuanya **di dalam `src/`**.
- Nama file dan folder pada `docs/M9/` mengikuti aturan penamaan milestone sebelumnya (`KXX_GYY_...`).

## A.5 Isi Minimal `src/README.md`

README harus cukup bagi orang yang belum pernah melihat proyek kalian untuk menjalankan aplikasi dari nol. Minimal berisi:

1. **Deskripsi singkat** aplikasi.
2. **Teknologi yang digunakan** beserta versi (bahasa, framework, basis data).
3. **Prasyarat dan instalasi** (software yang harus ada, perintah instalasi dependensi).
4. **Konfigurasi** (environment variable, setup basis data, migrasi/seed) dan langkah demi langkah menjalankannya.
5. **Cara menjalankan aplikasi** (dan cara menjalankan test, jika ada).
6. **Akun/data uji** untuk mencoba tiap peran pengguna (jika ada login).
7. **Daftar modul/fitur yang diimplementasi** beserta pembagian anggota.
8. **Daftar tabel/koleksi basis data** beserta atributnya (atau tautan ke skema/ERD).

## A.6 Best Practices

Kalian dianjurkan menerapkan praktik berikut. Bukti penerapannya dirangkum pada Bagian B.2.

### 1. Branching
Sesuai aturan umum di README repository, `main` fork kelompok dijaga agar tetap bisa menerima sync dari asisten. Pada tugas ini **sangat disarankan** memakai branch per fitur dengan format `<tipe>/<nama-fitur>` (contoh: `feat/login-page`, `fix/null-cart`), lalu digabungkan ke `main` melalui Pull Request. Skema Gitflow penuh (dengan `develop`) boleh dipakai, tetapi tidak diwajibkan.

### 2. Semantic Commit
Gunakan format `<tipe>(<scope>): <deskripsi>`, misalnya `feat(auth): tambah validasi email`.

| Tipe | Kegunaan |
| :--- | :--- |
| `feat` | Menambahkan fitur baru |
| `fix` | Memperbaiki bug |
| `docs` | Mengubah dokumentasi |
| `style` | Perubahan format/spasi, tanpa mengubah logika |
| `refactor` | Perubahan kode yang tidak menambah fitur atau memperbaiki bug |
| `test` | Menambah/memperbaiki pengujian |
| `chore` | Tugas rutin (build, dependensi, konfigurasi) |

### 3. Track Tasks
Gunakan **GitHub Issues** (dan opsional GitHub Projects) untuk membagi tugas dan melacak progres.
- Pecah fitur besar menjadi issue yang lebih kecil dan tetapkan penanggung jawabnya.
- Hubungkan PR dengan issue (`Closes #12`) dan tutup issue ketika selesai.

### 4. Pull Request dan Code Review
- Setiap PR berisi penjelasan deskriptif tentang apa yang dikerjakan, beserta bukti (tangkapan layar/rekaman/hasil test).
- Setiap PR di-*review* minimal **1 anggota lain**, dengan komentar konstruktif atau approval.

### 5. Pengujian dan Optimasi Performa
- Tulis pengujian untuk logika inti (unit test dan/atau pengujian alur utama). Cakupan penuh tidak diwajibkan, tetapi pengujian pada logika utama dinilai.
- Lakukan **profiling** pada setidaknya satu fitur yang berat (query besar, proses pengolahan data, render list panjang, dsb.), lalu catat temuan dan perbaikannya. Contoh alat:

| Platform | Contoh alat |
| :--- | :--- |
| Web (frontend) | Chrome DevTools (Performance/Network), Lighthouse |
| Web (backend) | Profiler bawaan bahasa, `EXPLAIN` pada query basis data, logging waktu respons |
| Python | `cProfile`, `PyInstrument` |
| Java | VisualVM, JProfiler |
| Mobile | Android Studio Profiler, Flutter DevTools, Xcode Instruments |

### 6. Penggunaan AI
Penggunaan AI **tetap harus dicatat** pada `docs/KXX_GYY_AI-Usage.md` sesuai ketentuan yang sudah berlaku.

## A.7 Pengumpulan

Pengumpulan dinilai dari **tag release**, bukan commit terakhir.

1. Pastikan seluruh pekerjaan sudah di-*commit* dan di-*push* ke `main` fork kelompok.
2. Buat release dengan tag **`v9.0`** (revisi berikutnya `v9.1`, `v9.2`, dst.) dengan target branch `main`.
3. Yang dinilai adalah **tag terakhir yang dibuat sebelum deadline**.

## A.8 Aturan Tanya Jawab

Agar semua kelompok mendapat jawaban yang sama, pertanyaan dibagi menjadi dua jalur:

| Jenis Pertanyaan | Jalur |
| :--- | :--- |
| **Ketentuan tugas**, misalnya teknologi yang diperbolehkan, struktur folder, format pengumpulan, dan penilaian | **Sheets QnA:** *[tautan sheets QnA]* |
| **Kendala teknis kelompok sendiri**, misalnya error, setup, dan penggunaan git | Grup kelompok bersama asisten masing-masing |

Ketentuan:
1. Pertanyaan tentang ketentuan tugas **wajib** diajukan melalui Sheets QnA. Periksa terlebih dahulu apakah pertanyaan serupa sudah dijawab.
2. Jika pertanyaan tentang ketentuan tugas tetap diajukan langsung kepada asisten kelompok, asisten **berhak menolak menjawab** dan meminta kelompok memasukkan pertanyaannya ke Sheets QnA.
3. Jika pertanyaan di Sheets QnA **belum dijawab dalam 24 jam**, kelompok boleh menghubungi asisten kelompok masing-masing. Cantumkan pertanyaan yang sudah diajukan di sheets tersebut.
4. Jawaban pada Sheets QnA berlaku untuk **seluruh kelompok** dan menjadi acuan jika terjadi perbedaan pemahaman.

---

# BAGIAN B: Laporan Implementasi

## B.1 Perubahan dari DPPL

Tabel B.1. Perubahan dari DPPL

| No | Bagian DPPL | Rancangan Awal | Implementasi Akhir | Alasan |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Kelas *entity* C01 sampai C12 (BAB 4 dan BAB 5) | Setiap *entity* berupa kelas dengan atribut dan operasi seperti `simpan()`, `aturStatus()`, dan `ambilDaftarLangkah()` | Setiap *entity* menjadi satu tabel PostgreSQL (`supabase/migrations/0001_skema.sql`) dan satu modul TypeScript di `src/lib/models/` yang berisi tipe serta fungsi. Fungsi menerima *client* Supabase dan id sebagai parameter, misalnya `simpanDraf(supabase, idRangkuman, data)`. Berkas `langkahPenyelesaian.ts` dan `artikel.ts` hanya berisi tipe. | Next.js dengan Supabase tidak memakai objek *entity* yang hidup lama di server. Fungsi tanpa *state* lebih mudah diuji dan dipakai bersama oleh *Server Action*. |
| 2 | DPPL 2.1 Lingkungan implementasi: *filing system* | Berkas templat disimpan di sistem berkas server | Berkas disimpan di Supabase Storage pada *bucket* privat `templat` (`0003_templat_dokumen.sql`), dan diunduh lewat *signed URL* yang berlaku 60 detik | Aplikasi tidak memiliki sistem berkas server sendiri. *Bucket* privat mencegah templat milik konten yang belum disetujui terbaca publik. |
| 3 | Tabel `langkah_penyelesaian`, kolom `tenggat` | Bertipe `date` | Bertipe `text` (`0002_penyusunan_konten.sql`) | Tenggat pada mockup I-02 dan I-05 berupa kalimat relatif, misalnya "7 hari kerja setelah surat PHK diterima", bukan tanggal pasti. |
| 4 | C09 `TemplatDokumen`, Algo-022 `perbaruiVersi` | Lokasi berkas disimpan di `namaBerkas`, dan versi lama tersimpan sebagai riwayat (I-05-13) | Kolom baru `lokasi_berkas` menyimpan *path* di Storage, sedangkan `nama_berkas` tetap berisi nama asli. Berkas versi lama dihapus setelah versi baru tersimpan, dan nomor versi bertambah. | Nama asli dibutuhkan untuk tampilan dan pencocokan versi. Tidak ada layar untuk melihat atau memulihkan versi lama, sehingga menyimpannya hanya memakan ruang. |
| 5 | C09 dan C26, layar I-05 | Tidak ada operasi menghapus templat | Fungsi `hapusTemplat` di model C09 dan controller C26, serta tombol **Hapus** dengan konfirmasi di kartu Templat surat | Kurator membutuhkan cara membuang templat yang salah unggah sebelum konten diajukan, karena templat ikut tampil ke publik setelah disetujui. |
| 6 | Algo-021 `validasiUnggahan` | Memeriksa ekstensi PDF/DOCX dan ukuran paling besar 5 MB | Pemeriksaan sama, ditambah penolakan berkas berukuran 0 byte | Berkas kosong tidak berguna bagi pengguna. |
| 7 | Algo-041 `simpanDraf` (`MULAI TRANSAKSI ... SAHKAN TRANSAKSI`) | Transaksi dijalankan dari kode aplikasi, dengan `simpan()` per objek C07, C08, dan C10 | Satu fungsi PostgreSQL `public.simpan_draf(...)` (`0002_penyusunan_konten.sql`) yang dipanggil lewat `supabase.rpc`. Q-015, Q-016, Q-019, dan Q-025 sampai Q-027 berjalan di dalamnya dalam satu transaksi. | Supabase JS tidak mendukung transaksi di sisi klien. Fungsi memakai `security invoker` sehingga RLS tetap berlaku. |
| 8 | Algo-043 `ajukanKonten`, Algo-017 `aturStatus`, Algo-045 `catatRiwayat` | Perubahan status ke Diajukan dan pencatatan riwayat dijalankan sebagai dua langkah terpisah | Satu fungsi PostgreSQL `public.ajukan_konten(...)` (`0004_ajukan_konten.sql`) yang memeriksa hak sunting dan kelengkapan isian, mengubah status, lalu mencatat riwayat dalam satu transaksi. Sebelum memanggilnya, controller menyimpan draf terlebih dahulu. | Setelah status Diajukan, RLS tidak mengizinkan Kurator mengembalikan status, dan riwayat tidak dapat dihapus (KNF09). Kegagalan di tengah tidak bisa dipulihkan, sehingga kedua tulisan harus atomik. |
| 9 | Algo-016 `ambilIsianKosong` | Hanya memeriksa apakah daftar langkah dan daftar artikel kosong | Langkah tanpa isi dan artikel tanpa judul atau tautan juga dianggap kosong. Pemeriksaan dilakukan di controller dan diulang di fungsi `ajukan_konten`. | Butir yang baru terisi sebagian tidak layak tampil di I-02, dan fungsi basis data tidak boleh bisa dipakai untuk mengajukan konten yang belum lengkap. |
| 10 | C26 `buatDraf(idKelompok, idKurator)`, `simpanDraf(idRangkuman, dataKonten: Map)`, `ajukanKonten(idRangkuman, idKurator)` | Identitas Kurator dan data konten dikirim sebagai parameter | `buatDraf(idKelompok)`, `simpanDraf(idRangkuman, FormData)`, dan `ajukanKonten(idRangkuman, FormData)`. Identitas Kurator diambil dari sesi login, dan hasilnya berupa objek berhasil atau pesan galat. | *Server Action* bisa dipanggil dari peramban dengan argumen apa pun, sehingga identitas pelaku tidak boleh berasal dari klien. `FormData` adalah bentuk bawaan formulir Next.js. |
| 11 | Layar I-05, I-05-06 dan I-05-17 | Memilih kelompok kasus langsung membuat draf. Ada tombol "Tayangkan langsung" yang selalu ditolak (KF35). | Draf dibuat setelah tombol **Mulai menulis** diklik, dan kelompok terkunci setelah draf dibuat. Tombol "Tayangkan langsung" tidak dibuat. | Mencegah draf tercipta karena salah pilih. Tombol yang selalu gagal membingungkan Kurator, sedangkan KF35 tetap terpenuhi karena RLS `rangkuman_ubah_kurator` melarang Kurator mengubah status menjadi Disetujui. |
| 12 | Layar I-05, I-05-10, I-05-11, dan I-05-14 | Isian "Langkah 1", "Langkah 2", dan seterusnya, dengan tombol "Tambah langkah" dan "Tambah artikel" | Setiap langkah menjadi kartu berjudul "Langkah n" dengan isian "Isi langkah n", keterangan, dan tenggat, serta tombol **Naikkan**, **Turunkan**, dan **Hapus**. Artikel juga bisa dihapus. Isian wajib diberi tanda bintang. | Issue S2-D03 meminta butir dapat ditambah, dihapus, dan diurutkan. Label diubah agar teks "Langkah n" tidak tertulis dua kali. |
| 13 | Layar I-06, Q-005, dan I-06-07 | Daftar diurutkan dengan `ORDER BY id_rangkuman DESC`. Hanya konten Perlu Revisi yang bisa diklik untuk melihat catatan revisi. | Kolom "Diperbarui" diambil dari waktu riwayat status terbaru, dan daftar diurutkan dari yang terakhir diperbarui. Judul konten Draft menjadi tautan untuk membuka kembali drafnya. Tiga status terakhir ditampilkan di bawah judul. | Mengikuti teks mockup "diurutkan dari yang terakhir diperbarui", karena skema tidak memiliki kolom `updated_at`. DPPL tidak menyediakan cara membuka kembali draf yang sudah dibuat. |
| 14 | Layar I-07, Q-007 | Satu query agregat `MAX(waktu)` dengan `GROUP BY` | Waktu pengajuan terakhir dihitung di model, lalu antrean diurutkan menaik. Butir yang dipilih memakai parameter `?konten=<id>`, dan hasil keputusan ditampilkan lewat `?hasil=disetujui\|revisi`. | Supabase JS tidak mendukung `GROUP BY` bersama *join* tanpa fungsi basis data. Urutan dan hasilnya sama dengan Q-007. |
| 15 | Algo-047 `setujuiKonten` dan Algo-048 `kembalikanKonten`, Q-012 sampai Q-014 | Tiga query terpisah di dalam satu transaksi | Q-012, Q-013, dan Q-014 digabung menjadi satu `UPDATE` dengan syarat `status = 'Diajukan'`. Riwayat dicatat sesudahnya, dan jika gagal, status, tanggal peninjauan, serta catatan revisi dipulihkan. | Supabase JS tidak mendukung transaksi di sisi klien. Administrator diizinkan RLS mengembalikan status, sehingga pemulihan dapat dilakukan dari aplikasi. |
| 16 | Komponen `Badge` pada I-06 dan I-07 | Mockup: Diajukan kuning, Perlu Revisi merah | Diajukan biru, Perlu Revisi kuning, mengikuti token *design system* | Menjaga konsistensi dengan komponen dasar yang sudah disepakati pada S1-E01. |
| 17 | Layar I-01 | Kartu kelompok kasus berisi ikon dan kalimat deskripsi | Ikon dipilih berdasarkan nama bidang hukum, dan kartu menampilkan "Istilah hukum: ..." | Basis data tidak menyimpan ikon maupun kalimat deskripsi kelompok kasus. |
| 18 | C22 `KontrolPencarianKataKunci`, Q-023 | Seluruh rangkuman Disetujui diambil, lalu dicocokkan dengan kata kunci di aplikasi | Penyaringan `ILIKE` dijalankan lebih dulu di basis data dengan indeks GIN `pg_trgm` (`0005_indeks_pencarian.sql`), lalu hasilnya tetap dicocokkan dengan Algo-012 dan Algo-013 | Hasil *profiling* menunjukkan *sequential scan* penuh. Waktu eksekusi turun dari 125,7 ms menjadi 2,8 ms (lihat B.2.1). |
| 19 | Layar I-08, KF43 | Tombol **Ubah** untuk memperbarui email akun Kurator | Belum diimplementasikan. Administrator dapat melihat, mendaftarkan, serta menonaktifkan dan mengaktifkan akun Kurator. | Tidak ada issue yang mencakup KF43 pada pembagian tugas M9. Dicatat sebagai *known issue* di B.3. |
| 20 | Layar I-03 (C15 `sectionLBH`, `dropdownWilayah`, `pilihWilayah`) dan C22 `ambilDaftarLBH` | Halaman hasil pencarian menampilkan direktori lembaga bantuan hukum per wilayah | Direktori LBH dan pilihan wilayah hanya tersedia di halaman rangkuman kasus I-02 (C14 dan C21 `ambilDaftarLBH`). Halaman I-03 menampilkan kotak disclaimer yang menyarankan konsultasi ke lembaga bantuan hukum. | Pengguna membutuhkan direktori LBH setelah membaca rangkuman kasusnya, dan satu implementasi di I-02 menghindari duplikasi. Dicatat sebagai *known issue* di B.3. |
| 21 | Kelas C01 `Akun`, C02 `Kurator`, C04 `BidangHukum` (atribut) | `idAkun: int` dan `kataSandiHash` disimpan di tabel `akun`; `jumlahKonten` diperbarui oleh Kurator; `jumlahKelompokKasus` disimpan sebagai atribut | `id_akun` bertipe UUID dan mengikuti `auth.users`, tanpa kolom `kata_sandi_hash`. `jumlah_konten` ditambah oleh *trigger* basis data `tambah_jumlah_konten`. `jumlahKelompokKasus` dihitung saat data diambil (Q-021). | Kata sandi dikelola Supabase Auth sehingga tidak pernah disimpan aplikasi. Kurator tidak boleh mengubah angka kontennya sendiri. Jumlah yang dihitung saat query selalu sesuai data terbaru. |

## B.2 Bukti Penerapan Best Practices

Tabel B.2. Bukti Best Practices

| Praktik | Bukti | Keterangan |
| :--- | :--- | :--- |
| Branching | [Daftar branch](https://github.com/MatthewEvan/IF2150-RPL-K01-G07/branches/all) dan [graph commit](https://github.com/MatthewEvan/IF2150-RPL-K01-G07/network) | Gitflow ringan dengan dua branch utama: `main` untuk rilis yang dinilai dan `dev` untuk integrasi. Setiap issue dikerjakan di branch `<tipe>/s<sprint>-<kode tugas>-<nama>`, misalnya `feat/s2-d05-ajukan-konten`, `test/s3-d06-penyusunan-konten`, dan `refactor/s3-c06-optimasi-pencarian`. Fitur yang saling bergantung memakai branch bertumpuk (contoh: #82 sampai #85, dan #97, #102 sampai #104). Seluruh PR fitur masuk ke `dev`, lalu `dev` digabung ke `main` lewat [#109](https://github.com/MatthewEvan/IF2150-RPL-K01-G07/pull/109) dengan *merge commit*. Branch `main` dan `dev` dilindungi: setiap merge wajib melalui PR dengan minimal satu *approval*, termasuk untuk admin. |
| Semantic commit | [Riwayat commit `main`](https://github.com/MatthewEvan/IF2150-RPL-K01-G07/commits/main) | Seluruh 54 commit non-merge pada M9 memakai format `<tipe>(<scope>): <deskripsi>`: 44 `feat`, 5 `test`, 2 `chore`, 2 `refactor`, dan 1 `fix`. *Scope* mengikuti modul, misalnya `auth`, `akun`, `db`, `konten`, `pencarian`, `kasus`, `checklist`, `pelacakan`, dan `moderasi`. |
| Track tasks | [GitHub Issues #33 sampai #65](https://github.com/MatthewEvan/IF2150-RPL-K01-G07/issues?q=is%3Aissue+is%3Aclosed) | 33 issue dibagi ke lima paket sesuai use case, semuanya sudah ditutup. Paket A (autentikasi dan akun, Raditya): 10 issue. Paket B (jelajah kasus dan checklist, Wesley): 5 issue. Paket C (pencarian dan unduh templat, Rivan): 6 issue. Paket D (penyusunan konten, Matthew): 6 issue. Paket E (komponen dasar, pelacakan, dan moderasi, Michael): 6 issue. Setiap issue memuat penanggung jawab, reviewer, sprint, use case, kelas DPPL, langkah, batasan berkas, dan kriteria "Selesai jika". |
| Pull request dan review | [#78](https://github.com/MatthewEvan/IF2150-RPL-K01-G07/pull/78), [#99](https://github.com/MatthewEvan/IF2150-RPL-K01-G07/pull/99), [#103](https://github.com/MatthewEvan/IF2150-RPL-K01-G07/pull/103), [#108](https://github.com/MatthewEvan/IF2150-RPL-K01-G07/pull/108) | 34 PR (#76 sampai #109) di-merge, dan setiap PR memiliki minimal satu *approval* dari anggota lain. Matthew me-review 21 PR (Raditya 10, Rivan 4, Michael 4, Wesley 3). Raditya me-review 7 PR (Matthew 2, Rivan 2, Michael 2, Wesley 1). Rivan me-review 5 PR (Matthew 4, Wesley 1). Wesley me-review PR rilis #109. Setiap PR memakai template yang berisi tugas dan issue terkait (`Closes #...`), penjelasan perubahan, bukti tangkapan layar per kriteria "Selesai jika", cara pengujian, dan *checklist*. |
| Pengujian | [`src/tests/`](https://github.com/MatthewEvan/IF2150-RPL-K01-G07/tree/main/src/tests) | 13 berkas dan 158 *unit test* dengan Vitest, dijalankan lewat `npm test` di folder `src`. Cakupan: autentikasi dan sesi (C25), pengelolaan akun (C29), jelajah kasus (C21), checklist (C23), penyusunan konten (C26), pelacakan konten (C27), dan moderasi konten (C28). Supabase diganti tiruan dengan `vi.mock`, sehingga test tidak membutuhkan `.env.local` maupun basis data. Fungsi basis data `ajukan_konten` dan indeks pencarian juga diuji di PostgreSQL lokal (PGlite) sebelum migrasinya dijalankan. |

### B.2.1 Profiling dan Optimasi

| Informasi | Keterangan |
| :--- | :--- |
| Fitur / proses yang diprofil | Pencarian kasus berdasarkan kata kunci bebas (UC02 Mencari Kasus, `C22 KontrolPencarianKataKunci.cariKasus` dan `lib/models/pencarian.ts`) |
| Alat | PostgreSQL `EXPLAIN (ANALYZE, BUFFERS)` pada PGlite (PostgreSQL 16) dengan data uji beban fiktif 10.000 baris `kelompok_kasus` dan 10.000 baris `rangkuman_kasus` |
| Temuan (sebelum) | Kueri memicu `Seq Scan` penuh pada `rangkuman_kasus` (8.000 baris `Disetujui`) dan `kelompok_kasus` (10.000 baris) serta mengambil kolom berlebih. Pembacaan memori mencapai `Buffers: shared hit=770` dengan **`Execution Time: 125,695 ms`**. |
| Perbaikan | Menambahkan migrasi `0005_indeks_pencarian.sql` (indeks GIN `pg_trgm` pada kolom pencarian dan *partial index* `WHERE status = 'Disetujui'`), mengurangi kolom pada `.select(KOLOM_PENCARIAN)`, dan mendorong penyaringan `ILIKE` ke basis data di `src/lib/models/pencarian.ts`. |
| Hasil (sesudah) | Eksekusi kueri beralih ke `Bitmap Index Scan` pada indeks GIN `pg_trgm`, pembacaan buffer turun **95,6%** (`34` buffer), dan waktu eksekusi turun **97,8% (~45x lebih cepat)** menjadi **`2,797 ms`**. |

## B.3 Kendala dan Catatan Penting

### Kendala

1. **Transaksi basis data.** Supabase JS tidak mendukung transaksi di sisi klien, padahal beberapa algoritma DPPL (Algo-041 dan Algo-043) menulis ke beberapa tabel sekaligus. Kendala ini diatasi dengan fungsi PostgreSQL `simpan_draf` dan `ajukan_konten` yang berjalan dalam satu transaksi dengan RLS tetap berlaku (lihat B.1 no. 7 dan 8).
2. **Riwayat status bersifat permanen.** Tabel `riwayat_status` tidak dapat diubah maupun dihapus (KNF09), termasuk oleh pengembang. Pengujian alur pengajuan dan moderasi di basis data bersama harus direncanakan dengan hati-hati, karena setiap percobaan meninggalkan jejak permanen. Fungsi basis data baru diuji lebih dulu di PostgreSQL lokal (PGlite) sebelum dijalankan di Supabase hosted.
3. **Migrasi dijalankan manual di Supabase hosted.** Migrasi `0002` sampai `0005` ditambahkan di tengah pengerjaan dan dijalankan lewat SQL Editor secara berurutan. Migrasi `0002` sempat gagal sekali karena *deadlock* dengan proses lain, lalu berhasil saat diulang.
4. **Pull request yang bertumpuk.** Beberapa issue saling bergantung sehingga branch-nya dibuat bertumpuk. Penggabungan dengan *squash* membuat branch turunan membawa ulang commit induknya dan menimbulkan konflik. Rantai berikutnya digabung dengan *merge commit* agar riwayatnya tetap selaras.

### Fitur yang belum sempurna (*known issues*)

1. **Ubah email akun Kurator (KF43)** belum tersedia di layar I-08. Administrator dapat melihat, mendaftarkan, serta menonaktifkan dan mengaktifkan akun Kurator.
2. **Tombol "Tayangkan langsung" (I-05-17)** tidak ditampilkan. Larangan Kurator menayangkan konten sendiri (KF35) tetap ditegakkan oleh RLS `rangkuman_ubah_kurator`.
3. **Direktori LBH di halaman pencarian I-03** belum tersedia. Direktori dan pilihan wilayah hanya ada di halaman rangkuman kasus I-02.
4. **Riwayat versi templat** tidak disimpan. Unggahan dengan nama berkas yang sama menggantikan berkas lama dan menaikkan nomor versi.
5. **Tanggal peninjauan** disimpan dalam tanggal UTC, sehingga konten yang disetujui sekitar tengah malam WIB dapat tercatat pada tanggal sebelumnya.
6. **Halaman `/pratinjau-komponen`** masih ada sebagai halaman pratinjau komponen UI untuk pengembang. Halaman ini tidak ditautkan dari navigasi.

### Catatan untuk asisten

1. Langkah menjalankan aplikasi, basis data lokal (Supabase CLI dan Docker), variabel lingkungan, dan akun uji ada di `src/README.md`. Perintah `npx supabase start` menjalankan migrasi `0001` sampai `0005` dan mengisi data seed secara otomatis.
2. Akun uji: `admin@pahamhukum.test` (Administrator), `kurator1@pahamhukum.test` dan `kurator2@pahamhukum.test` (Kurator), serta `kurator.nonaktif@pahamhukum.test` (Kurator nonaktif). Kata sandi lokal adalah `PahamHukum-Uji-123`.
3. Pendaftaran akun Kurator oleh Administrator membutuhkan `SUPABASE_SERVICE_ROLE_KEY` di `.env.local`, karena akun dibuat lewat Supabase Auth Admin API.
4. Data seed tidak memuat templat dokumen. Untuk mencoba unduh templat (UC04), masuk sebagai Kurator, unggah templat pada draf, lengkapi lalu ajukan konten, kemudian setujui sebagai Administrator. Templat akan muncul dengan tombol **Unduh** di halaman rangkuman kasus.
5. Sesi panel berakhir setelah 30 menit tanpa aktivitas, dan akun Kurator yang dinonaktifkan langsung dikeluarkan pada permintaan berikutnya.
6. Pengujian dijalankan dengan `npm test` di folder `src` (13 berkas, 158 test) dan tidak membutuhkan basis data maupun `.env.local`.

## B.4 Kontribusi Anggota

Tabel B.4. Kontribusi Anggota

| NIM | Nama | Modul / Fitur yang Dikerjakan | Persentase Kontribusi |
| :--- | :--- | :--- | :--- |
| 13525007 | Rivan Cahyadi | **Paket C: Pencarian dan unduh templat (UC02, UC04).** Setup Vitest (#86); query dan kontrol pencarian kata kunci C22 (#88); halaman hasil pencarian I-03 C15 (#92); pesan tidak ditemukan dan saran bidang hukum (#94); unduh templat dokumen C24 (#106); *profiling* dan optimasi pencarian dengan indeks `pg_trgm` (#108). Me-review 5 PR. | 18% |
| 13525019 | Raditya Wibian Sastaka | **Paket A: Fondasi, autentikasi, dan pengelolaan akun (UC05, UC09).** Inisialisasi Next.js (#76); struktur MVC dan *client* Supabase (#77); skema basis data, RLS, dan seed (#78); layout, navbar, dan footer (#79); halaman login I-04 C16 (#80); login, logout, dan proteksi rute panel C25 (#81); daftar, tambah, serta nonaktifkan dan aktifkan akun Kurator I-08 C20 dan C29 (#82, #83, #84); pengujian autentikasi dan pengelolaan akun (#85). Me-review 7 PR. | 22% |
| 13525064 | Matthew Evan Kurniawan | **Paket D: Penyusunan konten (UC06).** Formulir penyusunan konten I-05 C17 (#93); simpan dan muat draf (#96); unggah dan hapus templat dokumen C09 (#97); isian dinamis langkah penyelesaian dan artikel (#102); validasi isian dan ajukan konten C26 (#103); pengujian KontrolPenyusunanKonten (#104); migrasi basis data `0002` sampai `0004`. Me-review 21 PR, menggabungkan `dev` ke `main` (#109), dan menyusun laporan implementasi M9. | 22% |
| 13525100 | Wesley Lianto | **Paket B: Jelajah kasus dan checklist (UC01, UC03).** Beranda daftar bidang hukum dan kelompok kasus I-01 C13 dan C21 (#89); peringatan darurat (#90); halaman rangkuman kasus I-02 C14 (#100); checklist dokumen tersimpan di `localStorage` C23 (#101); pengujian KontrolJelajahKasus dan KontrolChecklist (#105). Me-review PR rilis #109. | 18% |
| 13525109 | Christopherus Michael Jafeth Tobing | **Paket E: Komponen dasar, pelacakan, dan moderasi konten (UC07, UC08).** Token *design system* dan komponen UI dasar (#87); daftar konten Kurator I-06 C18 dan C27 (#91); catatan revisi dan riwayat status (#98); antrean peninjauan I-07 C19 (#95); setujui atau minta revisi konten C28 (#99); pengujian KontrolModerasiKonten (#107). | 20% |

## B.5 Traceability Kelas Perancangan ke Implementasi

Kelas *entity* (C01 sampai C12) diwujudkan sebagai tabel di `src/supabase/migrations/0001_skema.sql` beserta tipe dan fungsi di `src/lib/models/`. Kelas *boundary* (C13 sampai C20) diwujudkan sebagai halaman Next.js di `src/app/` beserta komponen React di `src/components/`. Kelas *control* (C21 sampai C29) diwujudkan sebagai modul fungsi di `src/lib/controllers/`, sebagian besar berupa *Server Action* (`"use server"`). Atribut *boundary* menjadi elemen dan *state* komponen, sedangkan operasinya menjadi *event handler*.

Tabel B.5. Traceability Kelas Perancangan ke Implementasi

| ID Kelas | Nama Kelas Perancangan | Bentuk Implementasi | Lokasi (File dan Nama) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| C01 | `Akun` | Tabel, tipe, dan fungsi; Supabase Auth | Tabel `akun`; `src/lib/models/akun.ts` - `AkunTerhubung`, `PERAN`, `cariAkun` | `cariAkun` mencari akun berdasarkan id dari sesi. `kataSandiHash`, `cocokkanKataSandi`, dan `hashKataSandi` ditangani Supabase Auth (`auth.users`). `ambilPeran` diwujudkan sebagai atribut `peran`. `perbaruiEmail` belum diimplementasikan (B.1 no. 19). |
| C02 | `Kurator` | Tabel, fungsi, dan *trigger* | Tabel `kurator`; `src/lib/models/kurator.ts` - `ambilDaftarKonten`, `aturStatusKurator`; `0001_skema.sql` - `tambah_jumlah_konten`, `private.adalah_kurator_aktif` | `cekAktif` diwujudkan lewat atribut `statusAktif` pada `cariAkun` dan fungsi RLS `adalah_kurator_aktif`. `tambahJumlahKonten` menjadi *trigger* basis data. `nonaktifkan` menjadi `aturStatusKurator`, yang juga dapat mengaktifkan kembali. |
| C03 | `Administrator` | Tabel dan fungsi | Tabel `administrator`; `src/lib/models/kurator.ts` - `ambilDaftarKurator`; `src/lib/models/administrator.ts` - `ambilAntreanPeninjauan`, `ambilKontenModerasi` | `ambilKuratorTerdaftar` menjadi `ambilDaftarKurator` yang memfilter `id_administrator`. Pemeriksaan peran memakai fungsi RLS `private.adalah_administrator`. |
| C04 | `BidangHukum` | Tabel dan fungsi | Tabel `bidang_hukum`; `src/lib/models/bidangHukum.ts` - `ambilSemuaBidang`, `cekAktif` | `ambilDaftarKelompok` diwujudkan oleh `ambilKelompokDisetujui` pada C05. `jumlahKelompokKasus` dihitung saat data diambil. |
| C05 | `KelompokKasus` | Tabel dan fungsi | Tabel `kelompok_kasus`; `src/lib/models/kelompokKasus.ts` - `ambilKelompokDisetujui`, `cekDarurat`, `ambilPilihanKelompok`; `src/lib/models/pencarian.ts` - `cocokkanKataKunciKelompok` | `cocokkanKataKunci` mengikuti Algo-012. `ambilRangkuman` diwujudkan oleh `ambilRangkumanDisetujui` pada C06. |
| C06 | `RangkumanKasus` | Tabel, fungsi, dan fungsi basis data | Tabel `rangkuman_kasus`; `src/lib/models/rangkumanKasus.ts` - `buatRangkuman`, `ambilRangkumanMilik`, `ambilRangkumanDisetujui`, `simpanDraf`, `ambilIsianKosong`, `ajukanRangkuman`; `src/lib/models/pencarian.ts` - `cekDisetujui`, `cocokkanKataKunciRangkuman`; `0002` - `simpan_draf`; `0004` - `ajukan_konten` | `ambilDaftarLangkah`, `ambilChecklist`, `ambilDaftarTemplat`, dan `ambilDaftarArtikel` digabung dalam satu query *embedded* pada `ambilRangkumanDisetujui` dan `ambilRangkumanMilik`. `cekIsianLengkap` adalah `ambilIsianKosong(...).length === 0`. `aturStatus` diwujudkan oleh `ajukan_konten` (Diajukan) dan `simpanKeputusan` di C12 (Disetujui, Perlu Revisi), yang juga menyimpan catatan revisi (`simpanCatatanRevisi`). `lampirkanTemplat` dan `ambilTemplat` diwujudkan di C09. |
| C07 | `LangkahPenyelesaian` | Tabel dan tipe | Tabel `langkah_penyelesaian`; `src/lib/models/langkahPenyelesaian.ts` - `LangkahPenyelesaian`; `src/lib/models/rangkumanKasus.ts` - `cariLangkahBertenggat` | `simpan` dijalankan di dalam `simpan_draf` (B.1 no. 7). `punyaTenggat` diwujudkan oleh pemeriksaan `tenggat` dan `cariLangkahBertenggat`, yang menampilkan penanda tenggat di I-02. |
| C08 | `Checklist` | Tabel | Tabel `checklist` (kolom `daftar_dokumen text[]`) | `simpan` dijalankan di dalam `simpan_draf`. `hitungJumlahDokumen` adalah panjang `daftarDokumen` yang dipakai di `src/components/kasus/ChecklistDokumen.tsx`. |
| C09 | `TemplatDokumen` | Tabel, fungsi, dan Supabase Storage | Tabel `templat_dokumen`; *bucket* `templat`; `src/lib/models/templatDokumen.ts` - `validasiUnggahan`, `perbaruiVersi`, `unduh`, `ambilDaftarTemplat`, `ambilTemplatDisetujui`, `hapusTemplat` | `unduh` menghasilkan *signed URL* (Algo-023). `perbaruiVersi` mengikuti Algo-022 dengan kolom tambahan `lokasi_berkas`, dan `hapusTemplat` adalah operasi tambahan (B.1 no. 4 dan 5). |
| C10 | `Artikel` | Tabel dan tipe | Tabel `artikel`; `src/lib/models/artikel.ts` - `Artikel` | `simpan` dijalankan di dalam `simpan_draf`. `ambilTautan` diwujudkan sebagai atribut `tautanSumber` yang ditampilkan di `src/components/kasus/BagianBacaan.tsx`. |
| C11 | `LembagaBantuanHukum` | Tabel dan fungsi | Tabel `lembaga_bantuan_hukum`; `src/lib/models/lembagaBantuanHukum.ts` - `ambilSemuaLBH`, `cocokkanWilayah` | - |
| C12 | `RiwayatStatus` | Tabel, fungsi, dan *trigger* | Tabel `riwayat_status`; `src/lib/models/riwayatStatus.ts` - `simpanRiwayat`, `simpanKeputusan`, `ambilKeadaanKonten`, `pulihkanKeadaan`, `cekAlasanTerisi`; `0001_skema.sql` - *trigger* `riwayat_status_permanen` | `simpan` menjadi `simpanRiwayat`, dengan `waktu` diisi `now()` oleh basis data. *Trigger* menolak `UPDATE`, `DELETE`, dan `TRUNCATE` (KNF09). |
| C13 | `HalamanJelajahKasus` | Halaman dan komponen | `src/app/page.tsx` - `/`; `src/components/beranda/` - `KartuBidangHukum`, `KartuKelompokKasus`, `KartuKelompokDarurat`, `FormCariBeranda`, `KotakDisclaimer` | `klikBidangHukum` memakai parameter URL bidang terpilih. `popupPeringatanDarurat` adalah elemen `<dialog>` di `KartuKelompokDarurat` yang ditampilkan bila `cekDarurat` bernilai benar (`tampilkanPeringatanDarurat`, `tutupPeringatan`). |
| C14 | `HalamanRangkumanKasus` | Halaman dan komponen | `src/app/kasus/[id]/page.tsx` - `/kasus/[id]`; `src/components/kasus/` - `KepalaRangkuman`, `BagianIntiMasalah`, `BagianHak`, `BagianLangkah`, `BagianPertimbangan`, `BagianChecklist`, `ChecklistDokumen`, `BagianTemplat`, `TombolUnduhTemplat`, `BagianBacaan`, `DirektoriLBH`, `PilihWilayah`, `NavigasiBagian` | Setiap *section* DPPL menjadi satu komponen `Bagian...`. `checkboxDokumen` dan `labelKelengkapan` ada di `ChecklistDokumen`, `tombolUnduh` di `TombolUnduhTemplat`, dan `dropdownWilayah` di `PilihWilayah`. |
| C15 | `HalamanPencarianKataKunci` | Halaman dan komponen | `src/app/cari/page.tsx` - `/cari?q=`; `src/components/pencarian/` - `KolomPencarian`, `KartuHasilPencarian`, `TidakDitemukanPencarian`, `KotakDisclaimerPencarian` | `klikCari` mengirim formulir ke `/cari?q=...`. `tampilkanHasil` dan `tampilkanTidakDitemukan` adalah *render* bersyarat di halaman. `klikHasil` adalah tautan ke `/kasus/[id]`. `sectionLBH`, `dropdownWilayah`, dan `pilihWilayah` tidak diimplementasikan di halaman ini (B.1 no. 20). |
| C16 | `HalamanLogin` | Halaman dan komponen | `src/app/masuk/page.tsx` - `/masuk`; `src/components/login/FormLogin.tsx` - `FormLogin` | `klikMasuk` mengirim formulir ke *Server Action* `prosesLogin` (C25). `pesanGalat` adalah *state* hasil aksi. |
| C17 | `HalamanPenyusunanKonten` | Halaman dan komponen | `src/app/panel/kurator/konten/baru/page.tsx`, `src/app/panel/kurator/konten/[id]/page.tsx`; `src/components/konten/` - `FormulirKonten`, `DaftarLangkah`, `DaftarArtikel`, `KartuTemplat`, `PanelStatusKonten`, `TandaIsian`, `useDaftarButir`, `aturanDaftarButir` | `klikBuatDraf`, `klikSimpanDraf`, `unggahTemplat`, dan `klikAjukan` memanggil *Server Action* C26. `penandaIsianKosong` adalah pesan galat per isian, dan `pesanGalatUnggah` ditampilkan di `KartuTemplat`. `tombolTayangkan` dan `pesanPenolakan` tidak ditampilkan (B.1 no. 11). |
| C18 | `HalamanDaftarKontenKurator` | Halaman dan komponen | `src/app/panel/kurator/konten/page.tsx` - `/panel/kurator/konten`; `src/components/pelacakan/DaftarKonten.tsx` - `DaftarKonten`, `CatatanRevisi`, `RiwayatSingkat` | `labelStatus` memakai komponen `Badge`. `panelCatatanRevisi` adalah `CatatanRevisi`, yang tampil untuk konten Perlu Revisi. `klikKonten` adalah tautan ke formulir penyusunan. `tombolKeluar` ada di `src/components/layout/NavbarPanel.tsx`. |
| C19 | `HalamanModerasiKonten` | Halaman dan komponen | `src/app/panel/admin/moderasi/page.tsx` - `/panel/admin/moderasi`; `src/components/moderasi/` - `DaftarAntrean`, `PratinjauKonten`, `PanelKeputusan` | `klikKonten` memakai parameter `?konten=<id>`. `klikSetujui`, `klikKembalikan`, `inputAlasanRevisi`, dan `pesanWajibIsi` ada di `PanelKeputusan`. |
| C20 | `HalamanPengelolaanAkun` | Halaman dan komponen | `src/app/panel/admin/akun/page.tsx` - `/panel/admin/akun`; `src/components/akun/` - `DaftarKurator`, `FormTambahKurator`, `TombolStatusKurator`, `LencanaStatusAkun` | `klikDaftarkan` ada di `FormTambahKurator`. `klikNonaktifkan` ada di `TombolStatusKurator` dengan dialog konfirmasi. `tombolSimpan` dan `klikSimpanPerubahan` belum diimplementasikan (B.1 no. 19). |
| C21 | `KontrolJelajahKasus` | Modul fungsi | `src/lib/controllers/kontrolJelajahKasus.ts` - `ambilDaftarBidang`, `ambilDaftarKelompok`, `cekDarurat`, `ambilRangkuman`, `ambilDaftarWilayah`, `ambilDaftarLBH` | `ambilDaftarWilayah` adalah fungsi pendukung untuk mengisi pilihan wilayah. |
| C22 | `KontrolPencarianKataKunci` | Modul fungsi | `src/lib/controllers/kontrolPencarianKataKunci.ts` - `cariKasus`, `sarankanBidangLain`; `src/lib/models/pencarian.ts` - `cariKasusDisetujui` | `cariKasus` mengikuti Algo-032 dengan penyaringan `ILIKE` dan indeks `pg_trgm` (B.1 no. 18). `ambilDaftarLBH` tidak dibuat di kelas ini (B.1 no. 20). |
| C23 | `KontrolChecklist` | Modul fungsi sisi peramban | `src/lib/controllers/kontrolChecklist.ts` - `bacaCentang`, `simpanCentang`, `kosongkanCentang`, `pantauCentang`, `hitungKelengkapan` | `ambilChecklist` mengambil daftar dokumen dari rangkuman (C21), sedangkan status centang dibaca dan disimpan di `localStorage` perangkat (KF14). |
| C24 | `KontrolUnduhTemplat` | Modul fungsi (*Server Action*) | `src/lib/controllers/kontrolUnduhTemplat.ts` - `ambilDaftarTemplat`, `unduhTemplat` | `unduhTemplat` hanya melayani templat milik konten Disetujui dan mengembalikan *signed URL*, bukan berkas langsung. |
| C25 | `KontrolAutentikasi` | Modul fungsi, *proxy*, dan *route handler* | `src/lib/controllers/kontrolAutentikasi.ts` - `prosesLogin`, `logout`; `src/lib/controllers/aturanSesi.ts` - `tentukanAksesPanel`; `src/proxy.ts`; `src/app/panel/sesi/route.ts`; `src/components/panel/useJagaSesi.ts` | `cekSesi` dan `arahkanSesuaiPeran` dijalankan di `proxy.ts` melalui `tentukanAksesPanel` pada setiap permintaan ke panel. `putusSesi` adalah `signOut` di `proxy.ts` untuk Kurator nonaktif atau sesi yang melewati 30 menit tanpa aktivitas. `useJagaSesi` dan `/panel/sesi` memperbarui waktu aktivitas. |
| C26 | `KontrolPenyusunanKonten` | Modul fungsi (*Server Action*) | `src/lib/controllers/kontrolPenyusunanKonten.ts` - `buatDraf`, `simpanDraf`, `ajukanKonten`, `lampirkanTemplat`, `hapusTemplat`, `catatRiwayat`; `src/lib/controllers/aturanPenyusunanKonten.ts` - `bisaDisunting`, `bacaDataKonten` | Signature disesuaikan seperti B.1 no. 10. `ajukanKonten` mengikuti Algo-043 lewat fungsi basis data `ajukan_konten` (B.1 no. 8). `tayangkanKonten` tidak dibuat karena KF35 ditegakkan oleh RLS (B.1 no. 11). |
| C27 | `KontrolPelacakanKonten` | Modul fungsi | `src/lib/controllers/kontrolPelacakanKonten.ts` - `ambilDaftarKonten` | `ambilCatatanRevisi` digabung ke `ambilDaftarKonten`: setiap butir membawa `catatanRevisi` dan riwayat status (B.1 no. 13). |
| C28 | `KontrolModerasiKonten` | Modul fungsi (*Server Action*) | `src/lib/controllers/kontrolModerasiKonten.ts` - `ambilAntrean`, `ambilKonten`, `setujuiKonten`, `kembalikanKonten`, `catatKeputusan` | `cekAlasanTerisi` berada di `src/lib/models/riwayatStatus.ts` agar dipakai bersama formulir dan *Server Action*. `catatRiwayat` diwujudkan oleh `catatKeputusan` (B.1 no. 15). |
| C29 | `KontrolPengelolaanAkun` | Modul fungsi (*Server Action*) | `src/lib/controllers/kontrolPengelolaanAkun.ts` - `daftarkanKurator`, `ubahStatusKurator`; `src/lib/controllers/validasiAkun.ts` - `validasiAkunBaru`; `src/lib/models/kurator.ts` - `ambilDaftarKurator`, `cekEmailUnik`, `simpanKuratorBaru`; `src/lib/supabase/admin.ts` - `buatClientAdmin` | `nonaktifkanKurator` menjadi `ubahStatusKurator`, yang juga dapat mengaktifkan kembali. `ambilDaftarKurator` dipanggil langsung oleh halaman I-08. `perbaruiKurator` belum diimplementasikan (B.1 no. 19). |
