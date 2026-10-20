# Draf Kerja DPPL — UC05 & UC09 (Radit)

> **CATATAN:** File kerja, belum di-commit. Isinya rancangan untuk subbab BAB 3 DPPL.
> Konvensi diagram mengikuti UC03/UC04 milik Ripan: lifeline `:NamaKelas`, pesan berupa
> nama metode dengan **nama parameter saja** (tanpa tipe), balikan berupa nama nilai,
> ekspor SVG dari StarUML ke `docs/M7/assets/diagram/`.

---

## UC05 — Masuk dan Keluar Panel Pengelolaan

### Tabel Identifikasi Kelas

Tabel 3.x. Identifikasi Kelas Use Case UC05

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanLogin` | C16 - `HalamanLogin` |
| 2 | `KontrolAutentikasi` | C25 - `KontrolAutentikasi` |
| 3 | `Akun` | C01 - `Akun` |
| 4 | `Kurator` | C02 - `Kurator` |
| 5 | `Administrator` | C03 - `Administrator` |

### SD-1 — Skenario Normal (Login Berhasil)

**Lifeline:** `Kurator / Administrator` (aktor) → `:HalamanLogin` → `:KontrolAutentikasi` → `:Akun` → `:Kurator`

| # | Dari | Ke | Pesan |
|:--|:--|:--|:--|
| 1 | aktor | `:HalamanLogin` | `tampilkanHalaman()` |
| 2 | `:HalamanLogin` | aktor | *(balikan)* tampilan `inputEmail`, `inputKataSandi`, `tombolMasuk` |
| 3 | aktor | `:HalamanLogin` | `klikMasuk(email, kataSandi)` |
| 4 | `:HalamanLogin` | `:KontrolAutentikasi` | `prosesLogin(email, kataSandi)` |
| 5 | `:KontrolAutentikasi` | `:Akun` | `cariAkun(email)` *(lihat Catatan 1)* |
| 6 | `:Akun` | `:KontrolAutentikasi` | *(balikan)* `akun` |
| 7 | `:KontrolAutentikasi` | `:Akun` | `cocokkanKataSandi(kataSandi)` |
| 8 | `:Akun` | `:Akun` | `hashKataSandi(kataSandi)` *(self-message)* |
| 9 | `:Akun` | `:KontrolAutentikasi` | *(balikan)* `true` |
| 10 | `:KontrolAutentikasi` | `:Kurator` | `cekAktif()` *(lihat Catatan 2)* |
| 11 | `:Kurator` | `:KontrolAutentikasi` | *(balikan)* `true` |
| 12 | `:KontrolAutentikasi` | `:Akun` | `ambilPeran()` |
| 13 | `:Akun` | `:KontrolAutentikasi` | *(balikan)* `peran` |
| 14 | `:KontrolAutentikasi` | `:KontrolAutentikasi` | `arahkanSesuaiPeran(peran)` *(self-message)* |
| 15 | `:KontrolAutentikasi` | `:HalamanLogin` | *(balikan)* `true` |
| 16 | `:HalamanLogin` | aktor | *(balikan)* dialihkan ke panel sesuai peran |

### SD-2 — Skenario Alternatif 1: Kredensial Salah

**Lifeline:** aktor → `:HalamanLogin` → `:KontrolAutentikasi` → `:Akun`

| # | Dari | Ke | Pesan |
|:--|:--|:--|:--|
| 1 | aktor | `:HalamanLogin` | `klikMasuk(email, kataSandi)` |
| 2 | `:HalamanLogin` | `:KontrolAutentikasi` | `prosesLogin(email, kataSandi)` |
| 3 | `:KontrolAutentikasi` | `:Akun` | `cariAkun(email)` |
| 4 | `:Akun` | `:KontrolAutentikasi` | *(balikan)* `akun` **atau** `null` |
| 5 | `:KontrolAutentikasi` | `:Akun` | `cocokkanKataSandi(kataSandi)` |
| 6 | `:Akun` | `:KontrolAutentikasi` | *(balikan)* `false` |
| 7 | `:KontrolAutentikasi` | `:HalamanLogin` | *(balikan)* `false` |
| 8 | `:HalamanLogin` | aktor | *(balikan)* `pesanGalat` — "Email atau kata sandi salah" |

> Catatan diagram: beri *note* pada langkah 8 bahwa pesan **tidak** menyebutkan bagian
> mana yang keliru (KF40). Email tak ditemukan dan kata sandi salah menghasilkan pesan
> yang sama — gabungkan keduanya dalam satu `alt` fragment atau satu *note*.

### SD-3 — Skenario Alternatif 2: Akses Tanpa Sesi yang Sah

**Lifeline:** aktor → `:HalamanPengelola` *(lihat Catatan 3)* → `:KontrolAutentikasi` → `:HalamanLogin`

| # | Dari | Ke | Pesan |
|:--|:--|:--|:--|
| 1 | aktor | `:HalamanPengelola` | `tampilkanHalaman()` |
| 2 | `:HalamanPengelola` | `:KontrolAutentikasi` | `cekSesi()` |
| 3 | `:KontrolAutentikasi` | `:HalamanPengelola` | *(balikan)* `false` |
| 4 | `:HalamanPengelola` | `:HalamanLogin` | `tampilkanHalaman()` |
| 5 | `:HalamanLogin` | aktor | *(balikan)* halaman login / halaman akses ditolak |

### SD-4 — Skenario Alternatif 3a: Keluar atas Permintaan Pengguna

**Lifeline:** aktor → `:HalamanPengelola` → `:KontrolAutentikasi` → `:HalamanLogin`

| # | Dari | Ke | Pesan |
|:--|:--|:--|:--|
| 1 | aktor | `:HalamanPengelola` | klik `tombolKeluar` |
| 2 | `:HalamanPengelola` | `:KontrolAutentikasi` | `logout()` |
| 3 | `:KontrolAutentikasi` | `:KontrolAutentikasi` | akhiri sesi *(self-message)* |
| 4 | `:KontrolAutentikasi` | `:HalamanLogin` | `tampilkanHalaman()` |
| 5 | `:HalamanLogin` | aktor | *(balikan)* halaman login |

### SD-5 — Skenario Alternatif 3b: Sesi Berakhir Otomatis (30 Menit)

**Lifeline:** aktor → `:HalamanPengelola` → `:KontrolAutentikasi` → `:HalamanLogin`

| # | Dari | Ke | Pesan |
|:--|:--|:--|:--|
| — | — | — | *note:* tidak ada aktivitas pengguna selama 30 menit (KNF14) |
| 1 | `:KontrolAutentikasi` | `:KontrolAutentikasi` | sesi kedaluwarsa → `logout()` *(self-message)* |
| 2 | aktor | `:HalamanPengelola` | mencoba melanjutkan pekerjaan |
| 3 | `:HalamanPengelola` | `:KontrolAutentikasi` | `cekSesi()` |
| 4 | `:KontrolAutentikasi` | `:HalamanPengelola` | *(balikan)* `false` |
| 5 | `:HalamanPengelola` | `:HalamanLogin` | `tampilkanHalaman()` |
| 6 | `:HalamanLogin` | aktor | *(balikan)* wajib masuk kembali sebelum melanjutkan |

### Diagram Kelas UC05

Sumber: `docs/M4/assets/diagram/ClassDiagram_UC05.svg` → salin ke
`docs/M7/assets/diagram/ClassDiagram_UC05.svg`, lalu sesuaikan dengan Catatan 1 & 2.

---

## UC09 — Mengelola Akun Kurator

### Tabel Identifikasi Kelas

Tabel 3.x. Identifikasi Kelas Use Case UC09

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanPengelolaanAkun` | C20 - `HalamanPengelolaanAkun` |
| 2 | `KontrolPengelolaanAkun` | C29 - `KontrolPengelolaanAkun` |
| 3 | `KontrolAutentikasi` | C25 - `KontrolAutentikasi` *(lihat Catatan 4)* |
| 4 | `Akun` | C01 - `Akun` |
| 5 | `Kurator` | C02 - `Kurator` |
| 6 | `Administrator` | C03 - `Administrator` |

### SD-6 — Skenario Normal (Mendaftarkan & Memperbarui Akun)

**Lifeline:** `Administrator` (aktor) → `:HalamanPengelolaanAkun` → `:KontrolPengelolaanAkun` → `:Administrator` → `:Kurator`

| # | Dari | Ke | Pesan |
|:--|:--|:--|:--|
| 1 | aktor | `:HalamanPengelolaanAkun` | `tampilkanHalaman()` |
| 2 | `:HalamanPengelolaanAkun` | `:KontrolPengelolaanAkun` | `ambilDaftarKurator(idAdministrator)` *(lihat Catatan 5)* |
| 3 | `:KontrolPengelolaanAkun` | `:Administrator` | `ambilKuratorTerdaftar()` |
| 4 | `:Administrator` | `:KontrolPengelolaanAkun` | *(balikan)* `daftarKurator` |
| 5 | `:KontrolPengelolaanAkun` | `:HalamanPengelolaanAkun` | *(balikan)* `daftarKurator` |
| 6 | `:HalamanPengelolaanAkun` | aktor | *(balikan)* `tabelDaftarKurator` terisi |
| 7 | aktor | `:HalamanPengelolaanAkun` | `klikDaftarkan(email, kataSandi)` |
| 8 | `:HalamanPengelolaanAkun` | `:KontrolPengelolaanAkun` | `daftarkanKurator(email, kataSandi, idAdministrator)` |
| 9 | `:KontrolPengelolaanAkun` | `:KontrolPengelolaanAkun` | `cekEmailUnik(email)` *(self-message)* |
| 10 | `:KontrolPengelolaanAkun` | `:Kurator` | `«create»` |
| 11 | `:Kurator` | `:Kurator` | `hashKataSandi(kataSandi)` *(self-message, warisan `Akun`)* |
| 12 | `:Kurator` | `:KontrolPengelolaanAkun` | *(balikan)* `kurator` |
| 13 | `:KontrolPengelolaanAkun` | `:HalamanPengelolaanAkun` | *(balikan)* `kurator` |
| 14 | `:HalamanPengelolaanAkun` | aktor | *(balikan)* `tabelDaftarKurator` diperbarui |
| 15 | aktor | `:HalamanPengelolaanAkun` | `klikSimpanPerubahan(idAkun, email)` |
| 16 | `:HalamanPengelolaanAkun` | `:KontrolPengelolaanAkun` | `perbaruiKurator(idAkun, emailBaru)` |
| 17 | `:KontrolPengelolaanAkun` | `:KontrolPengelolaanAkun` | `cekEmailUnik(emailBaru)` *(self-message)* |
| 18 | `:KontrolPengelolaanAkun` | `:Kurator` | `perbaruiEmail(emailBaru)` *(warisan `Akun`)* |
| 19 | `:Kurator` | `:KontrolPengelolaanAkun` | *(balikan)* perubahan tersimpan |
| 20 | `:KontrolPengelolaanAkun` | `:HalamanPengelolaanAkun` | *(balikan)* berhasil |
| 21 | `:HalamanPengelolaanAkun` | aktor | *(balikan)* detail akun diperbarui, berlaku pada sesi login berikutnya |

> Catatan diagram: langkah 1–6 adalah pemuatan halaman, 7–14 pendaftaran, 15–21 pembaruan.
> Pola menggabungkan beberapa langkah skenario normal dalam satu diagram ini sama dengan
> yang dipakai Ripan pada SD UC03 Normal, jadi tetap seragam dengan dokumen.

### SD-7 — Skenario Alternatif 1: Penonaktifan Akun Kurator

**Lifeline:** `Administrator` (aktor) → `:HalamanPengelolaanAkun` → `:KontrolPengelolaanAkun` → `:Kurator` → `:KontrolAutentikasi`

| # | Dari | Ke | Pesan |
|:--|:--|:--|:--|
| 1 | aktor | `:HalamanPengelolaanAkun` | `klikNonaktifkan(idAkun)` |
| 2 | `:HalamanPengelolaanAkun` | `:KontrolPengelolaanAkun` | `nonaktifkanKurator(idAkun)` |
| 3 | `:KontrolPengelolaanAkun` | `:Kurator` | `nonaktifkan()` — `statusAktif` menjadi `false` |
| 4 | `:Kurator` | `:KontrolPengelolaanAkun` | *(balikan)* berhasil |
| 5 | `:KontrolPengelolaanAkun` | `:KontrolAutentikasi` | `putusSesi(idAkun)` *(lihat Catatan 4)* |
| 6 | `:KontrolAutentikasi` | `:KontrolPengelolaanAkun` | *(balikan)* sesi terputus |
| 7 | `:KontrolPengelolaanAkun` | `:HalamanPengelolaanAkun` | *(balikan)* berhasil |
| 8 | `:HalamanPengelolaanAkun` | aktor | *(balikan)* `tabelDaftarKurator` diperbarui, akun nonaktif |

> Catatan diagram: beri *note* bahwa pencegahan login berikutnya ditangani
> `cekAktif()` pada SD-1 langkah 10 (KF37).

### Diagram Kelas UC09

Sumber: `docs/M4/assets/diagram/ClassDiagram_UC09.svg` → salin ke
`docs/M7/assets/diagram/ClassDiagram_UC09.svg`, lalu sesuaikan dengan Catatan 4 & 5.

---

## Catatan Perancangan (kandidat isi tabel Daftar Perubahan DPPL)

**Catatan 1 — `cariAkun(email)` belum ada.**
`prosesLogin()` menerima email, tetapi tidak ada satu pun metode di C01/C25 pada SKPL yang
mencari akun berdasarkan email. Tanpa itu, `cocokkanKataSandi()` tidak punya objek sasaran.
Usul: tambahkan `+ cariAkun(email: string): Akun` sebagai metode statis pada `Akun`,
atau `- cariAkun(email: string): Akun` sebagai metode privat pada `KontrolAutentikasi`.

**Catatan 2 — `cekAktif()` perlu masuk alur login.**
KF37 mewajibkan Kurator yang dinonaktifkan dicegah login kembali. `C02 Kurator` sudah punya
`cekAktif()`, tetapi SKPL tidak pernah menempatkannya dalam alur UC05. Tanpa langkah ini,
UC09 Alt 1 tidak terealisasi sepenuhnya. Karena itu `cekAktif()` dimasukkan pada SD-1
langkah 10.

**Catatan 3 — lifeline `:HalamanPengelola` pada SD-3, SD-4, SD-5.**
UC05 di-*include* UC06, UC07, UC08, dan UC09, sehingga halaman yang diakses bisa salah satu
dari beberapa halaman pengelola. Pilihan: (a) pakai nama generik `:HalamanPengelola` dengan
*note* bahwa ia mewakili halaman pengelola mana pun, atau (b) pakai `:HalamanPengelolaanAkun`
sebagai perwakilan konkret. Opsi (a) lebih jujur terhadap relasi *include*.
**Perlu disepakati dengan Matthew dan Wesley** supaya diagram mereka memakai nama yang sama.

**Catatan 4 — `KontrolAutentikasi` masuk ke UC09.**
SKPL tidak memuat C25 pada daftar kelas UC09, padahal UC09 Alt 1 mewajibkan sesi Kurator
diputus seketika. Pemegang sesi adalah C25. Usul: masukkan C25 ke tabel identifikasi kelas
UC09 dan tambahkan `+ putusSesi(idAkun: int): void` padanya.

**Catatan 5 — `ambilDaftarKurator()` belum ada di C29.**
`C20 HalamanPengelolaanAkun` punya `tabelDaftarKurator`, tetapi `C29` tidak punya metode untuk
mengisinya. Yang ada hanya `ambilKuratorTerdaftar()` di `C03 Administrator`. Agar tidak
melompati lapisan Controller (melanggar MVC pada APL), usul: tambahkan
`+ ambilDaftarKurator(idAdministrator: int): Kurator [0..*]` pada `C29`.

**Catatan 6 — `tombolKeluar` ada di C20.**
`C20 HalamanPengelolaanAkun` memuat `tombolKeluar`, yang alurnya milik UC05 (KF44), bukan
UC09. Ini wajar karena UC09 meng-*include* UC05. Cukup pastikan SD-4 memakai
`:HalamanPengelola`, bukan `:HalamanPengelolaanAkun`, agar batas use case tetap jelas.

---

## Ringkasan Luaran

| Berkas | Isi |
|:--|:--|
| `SequenceDiagram_UC05_Normal.svg` | SD-1 |
| `SequenceDiagram_UC05_Alt1.svg` | SD-2 Kredensial Salah |
| `SequenceDiagram_UC05_Alt2.svg` | SD-3 Akses Tanpa Sesi |
| `SequenceDiagram_UC05_Alt3a.svg` | SD-4 Keluar atas Permintaan Pengguna |
| `SequenceDiagram_UC05_Alt3b.svg` | SD-5 Sesi Berakhir Otomatis |
| `SequenceDiagram_UC09_Normal.svg` | SD-6 |
| `SequenceDiagram_UC09_Alt1.svg` | SD-7 Penonaktifan Akun |
| `ClassDiagram_UC05.svg` | salin dari M4, sesuaikan Catatan 1 & 2 |
| `ClassDiagram_UC09.svg` | salin dari M4, sesuaikan Catatan 4 & 5 |

Semua ke `docs/M7/assets/diagram/`.
