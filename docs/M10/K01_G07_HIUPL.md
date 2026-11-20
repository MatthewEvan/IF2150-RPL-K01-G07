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
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

---

# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Tuliskan uraian ringkas mengenai isi dokumen, tujuan pembuatan dokumen HIUPL ini, dan siapa saja target pembacanya.

## 1.2 Lingkup Masalah
Tuliskan lingkup masalah, yaitu membangun perangkat lunak *[nama perangkat lunak]*. Jelaskan dengan singkat dan jelas deskripsi aplikasi serta keterkaitannya dengan perangkat lunak atau sistem lain (jika ada). Bagian ini maksimal berisi satu paragraf, dapat diambil dari SKPL/DPPL.

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
| *...* | *...* |

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
Cantumkan daftar buku, panduan, atau dokumentasi lain yang dirujuk dalam pembuatan dokumen dan pengembangan P/L, **minimal dokumen SKPL, APL, DPPL, dan Implementasi (Tugas 9)**. Tambahkan dokumentasi *framework*/*library*/*testing tool* atau referensi lain apabila digunakan.

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Tuliskan sistematika pembahasan dokumen ini secara ringkas dan runut bab demi bab, dengan maksimal 1 paragraf.

<br>

---

# BAB 2: Deskripsi Umum Perangkat Lunak

Bagian ini diisi dengan *System Overview*, dalam bentuk gambar dan narasi yang memberikan gambaran tentang aplikasi dan konteksnya. **Batasan dan keterkaitan** antara sistem yang dibangun dengan sistem lain di luarnya harus jelas. Deskripsi umum sistem perlu dilengkapi dengan pemodelan kasus yang dihadapi, seperti *use case diagram*. Berikan narasi yang jelas untuk setiap gambar yang ditampilkan.

Bagian ini dapat menyalin atau meringkas dari dokumen SKPL atau DPPL.

<p align="center">
<img alt="System Overview / Use Case Diagram" src="./assets/contoh-uc-diagram.webp" width="90%">
</p>
<p align="center">
<i>Gambar 2.1. Use Case Diagram [Nama P/L]</i>
</p>

<br>

---

# BAB 3: Implementasi

Bagian ini diisi dengan informasi tentang elemen P/L yang dikembangkan (*executable files*, *configuration files*, *data files*, dan sebagainya) serta perubahannya terhadap rancangan pada DPPL (jika ada).

## 3.1 Lingkungan Implementasi

Tuliskan *hardware* dan *software* yang digunakan untuk implementasi, mencakup *operating system*, bahasa pemrograman beserta versinya, *framework*/*library*, DBMS, *development tools*, dan *version control*. Lingkungan ini harus konsisten dengan **Subbab 2.1 DPPL**; jelaskan jika ada perubahan. Cantumkan juga *framework* dan alat pengujian yang dipakai.

Tabel 3.1. Lingkungan Implementasi

| Aspek | Keterangan |
| :--- | :--- |
| *Hardware* | *[Spesifikasi perangkat keras]* |
| *Operating System* | *[Nama dan versi OS]* |
| *Bahasa Pemrograman* | *[Bahasa dan versi]* |
| *Framework/Library* | *[Daftar framework/library beserta versi]* |
| *DBMS* | *[Nama dan versi DBMS]* |
| *Development Tools* | *[IDE, version control, tools lain]* |
| *Testing Tools* | *[Framework unit test, alat ukur performa, alat coverage]* |

## 3.2 Implementasi Modul

Daftar modul/kelas yang **TELAH** diimplementasikan. Gunakan nama dan ID kelas yang sama dengan DPPL, dan konsisten dengan Tabel B.5 pada dokumen Implementasi (Tugas 9).

Tabel 3.2. Implementasi Modul

| No | ID Kelas | Nama Modul/Kelas | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *[C01]* | *[Nama modul/kelas]* | *[path/ke/file]* | *[Nama file executable, atau - jika tidak ada]* |
| 2 | *[C02]* | *[Nama modul/kelas]* | *[path/ke/file]* | *[...]* |
| ... | *...* | *...* | *...* | *...* |

## 3.3 Implementasi Antarmuka

Daftar antarmuka yang telah diimplementasikan. Gunakan ID dan nama layar yang sama dengan ID dan nama layar pada tugas DPPL.

Tabel 3.3. Implementasi Antarmuka

| No | ID Antarmuka | Nama Antarmuka | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *[I-01]* | *[Nama layar]* | *[path/ke/file]* | *[Nama file executable, atau - jika tidak ada]* |
| 2 | *[I-02]* | *[Nama layar]* | *[path/ke/file]* | *[...]* |
| ... | *...* | *...* | *...* | *...* |

## 3.4 File Lain

Daftar file lain yang dibuat selain file kelas dan antarmuka, misalnya file *utility*, *configuration*, *database schema/seed*, *file test*, atau *data*.

Tabel 3.4. File Lain

| No | Nama File | Keterangan |
| :--- | :--- | :--- |
| 1 | *[Nama file]* | *[Fungsi file]* |
| ... | *...* | *...* |

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
| C03 | Administrator | Mendalam | Memuat perhitungan waktu pengajuan terakhir dan lama menunggu, serta algoritma pengurutan antrean peninjauan (Q-007, KF31). | C03-UT01 s.d. C03-UT20 |
| C04 | BidangHukum | Tidak perlu | Hanya menyimpan data bidang hukum. `cekAktif` berupa pemeriksaan satu atribut. | UC01-TC01, UC02-TC02 |
| C05 | KelompokKasus | Sedang | `cekDarurat` dan `cocokkanKataKunci` (Algo-012) berupa pemeriksaan sederhana. Algoritma pencarian utamanya diuji pada C22. | C05-UT01 s.d. C05-UTnn |
| C06 | RangkumanKasus | Mendalam | Memuat aturan kelengkapan isian (Algo-016), transisi status ke Diajukan, pencocokan kata kunci (Algo-013), dan pembatasan konten publik hanya yang Disetujui (KF02). | C06-UT01 s.d. C06-UT22 |
| C07 | LangkahPenyelesaian | Tidak perlu | Hanya struktur data langkah. Penanda tenggat teruji melalui C06. | UC01-TC01, UC06-TC01 |
| C08 | Checklist | Tidak perlu | Hanya menyimpan daftar dokumen. Logika centang berada di C23. | UC03-TC01, UC06-TC01 |
| C09 | TemplatDokumen | Mendalam | Memuat validasi format dan ukuran berkas (Algo-021), pembaruan versi dengan pembatalan unggahan jika gagal (Algo-022, KNF08), serta pembuatan *signed URL* pada *bucket* privat (Algo-023). | C09-UT01 s.d. C09-UT27 |
| C10 | Artikel | Tidak perlu | Hanya struktur data judul dan tautan sumber. | UC01-TC01, UC06-TC01 |
| C11 | LembagaBantuanHukum | Sedang | `cocokkanWilayah` berupa penyaringan sederhana berdasarkan wilayah. | C11-UT01 s.d. C11-UTnn |
| C12 | RiwayatStatus | Mendalam | Memuat transisi keputusan moderasi, pemulihan status jika pencatatan gagal, aturan alasan revisi wajib (Algo-049), dan riwayat yang permanen (KNF09). | C12-UT01 s.d. C12-UTnn |
| C13 | HalamanJelajahKasus | Tidak perlu | Hanya menampilkan data dan meneruskan aksi ke C21. | UC01-TC01, UC01-TC02 |
| C14 | HalamanRangkumanKasus | Tidak perlu | Hanya menampilkan rangkuman. Logika checklist dan unduh berada di C23 dan C24. | UC01-TC01, UC03-TC01, UC03-TC02, UC04-TC01, UC04-TC02 |
| C15 | HalamanPencarianKataKunci | Tidak perlu | Hanya menampilkan hasil dari C22. | UC02-TC01, UC02-TC02 |
| C16 | HalamanLogin | Tidak perlu | Hanya meneruskan isian ke C25 dan menampilkan pesan galat. | UC05-TC01, UC05-TC02 |
| C17 | HalamanPenyusunanKonten | Sedang | Satu-satunya kelas *boundary* yang memiliki logika sendiri, yaitu menambah, menghapus, dan mengurutkan butir langkah dan artikel. | C17-UT01 s.d. C17-UT07 |
| C18 | HalamanDaftarKontenKurator | Tidak perlu | Hanya menampilkan daftar dan catatan revisi dari C27. | UC07-TC01, UC07-TC02 |
| C19 | HalamanModerasiKonten | Tidak perlu | Hanya menampilkan antrean dan meneruskan keputusan ke C28. | UC08-TC01 s.d. UC08-TC03 |
| C20 | HalamanPengelolaanAkun | Tidak perlu | Hanya menampilkan daftar Kurator dan meneruskan aksi ke C29. | UC09-TC01, UC09-TC02 |
| C21 | KontrolJelajahKasus | Sedang | Mendelegasikan pengambilan data ke model dan menghitung jumlah kelompok per bidang. | C21-UT01 s.d. C21-UTnn |
| C22 | KontrolPencarianKataKunci | Mendalam | Memuat algoritma pencarian (Algo-032, Algo-012, Algo-013), *escape* pola `ILIKE`, serta penyaringan konten Disetujui dan bidang aktif. | C22-UT01 s.d. C22-UTnn |
| C23 | KontrolChecklist | Mendalam | Memuat penyimpanan status centang di `localStorage`, penanganan data rusak, sinkronisasi antartab, dan perhitungan kelengkapan. | C23-UT01 s.d. C23-UTnn |
| C24 | KontrolUnduhTemplat | Mendalam | Memuat aturan keamanan (hanya templat milik konten Disetujui dan validasi id) serta integrasi dengan Supabase Storage. | C24-UT01 s.d. C24-UTnn |
| C25 | KontrolAutentikasi | Mendalam | Memuat aturan keamanan login, proteksi rute per peran, pemutusan sesi akun nonaktif, dan batas sesi 30 menit (KNF14). | C25-UT01 s.d. C25-UT24 |
| C26 | KontrolPenyusunanKonten | Mendalam | Memuat aturan penyuntingan per status, validasi isian, pengajuan konten, serta unggah dan hapus templat. | C26-UT01 s.d. C26-UT22 |
| C27 | KontrolPelacakanKonten | Sedang | Hanya meneruskan permintaan daftar konten ke model C02. | C27-UT01 s.d. C27-UT04 |
| C28 | KontrolModerasiKonten | Mendalam | Memuat aturan bahwa hanya Administrator aktif yang dapat memutuskan, alasan revisi wajib, keputusan hanya untuk konten Diajukan, dan pemulihan status. | C28-UT01 s.d. C28-UTnn |
| C29 | KontrolPengelolaanAkun | Mendalam | Memuat aturan keamanan (hanya Administrator), validasi email dan kata sandi, email unik, serta pembatalan akun jika pendaftaran gagal. | C29-UT01 s.d. C29-UT17 |

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
| IA-10 | C26 KontrolPenyusunanKonten | C06 RangkumanKasus, tabel `rangkuman_kasus` dan `riwayat_status` | *Controller* - *Model* - Basis data | INT-TC30, INT-TC31, INT-TC32 |
| IA-11 | C06 RangkumanKasus | Fungsi basis data `simpan_draf` dan `ajukan_konten`, C12 RiwayatStatus, RLS | Aplikasi - Basis data | INT-TC33, INT-TC34, INT-TC35, INT-TC39 |
| IA-12 | C09 TemplatDokumen | Supabase Storage (*bucket* privat `templat`) | Aplikasi - Sistem eksternal | INT-TC36, INT-TC37, INT-TC38 |

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

<br>

## 4.4 Pengujian Use Case

Pengujian use case dilakukan pada seluruh skenario normal dan alternatif sesuai Subbab 4.4 SKPL, dengan minimal satu test case untuk setiap skenario. Kolom ID KF menunjukkan KF yang diverifikasi oleh test case tersebut.

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
| KNF08-TC01 | KNF08 | *Reliability* | Saat templat diperbarui, berkas versi lama tetap tersedia sampai versi baru selesai tersimpan, dan setelah berhasil hanya tersisa satu berkas (versi terbaru) di Storage | Integration test INT-TC36 pada Supabase lokal: unggah `surat.pdf` 2 KB, unggah ulang nama yang sama 4 KB, lalu daftar isi folder rangkuman di *bucket* `templat` | Versi naik dari 1 menjadi 2, baris `templat_dokumen` menunjuk lokasi berkas baru, dan folder hanya berisi 1 berkas (berkas versi 1 terhapus setelah versi 2 tersimpan) | Pass |
| KNF08-TC02 | KNF08 | *Reliability* | Jika unggahan atau penyimpanan versi baru gagal, templat tetap menunjuk versi sebelumnya dan tidak ada berkas setengah jadi yang tertinggal | Inspeksi kode `perbaruiVersi()` di `src/lib/models/templatDokumen.ts`: berkas baru diunggah ke lokasi unik dengan `upsert: false`, baris basis data baru diperbarui setelah unggahan berhasil, berkas baru dihapus bila pembaruan baris gagal, dan berkas lama baru dihapus setelah pembaruan berhasil | Tiga jalur sesuai target: unggahan gagal berhenti sebelum basis data diubah, pembaruan baris gagal menghapus berkas baru dan versi lama tetap utuh, dan berkas lama tidak pernah ditimpa di tempat. Kegagalan jaringan belum disimulasikan secara otomatis | Pass |
| KNF10-TC01 | KNF10 | Security | Kata sandi tidak tersimpan sebagai teks mentah dan di-*hash* dengan bcrypt *cost factor* ≥ 10 | Membuat akun lewat `auth.admin.createUser` (jalur yang sama dengan `simpanKuratorBaru`), lalu memeriksa kolom `auth.users.encrypted_password` dengan `psql` pada Supabase lokal, serta mencari kolom kata sandi di skema `public` | Seluruh akun yang diperiksa (akun baru, `admin`, `kurator1`) berawalan `$2a$10$` (bcrypt, *cost factor* 10) dengan panjang 60 karakter, tidak sama dengan teks kata sandi, dan skema `public` tidak memiliki kolom kata sandi | Pass |
| KNF12-TC01 | KNF12 | *Ergonomy* | Seluruh isian penyusunan konten dapat diisi dan diajukan pada satu halaman tanpa berpindah halaman atau tab | Uji manual pada UC06-TC01 di halaman `/panel/kurator/konten/[id]`: hitung jumlah kartu isian dan jumlah perpindahan halaman dari draf dibuat sampai diajukan, serta tambah dan hapus butir Langkah dan Artikel | 6 kartu isian (Kasus, Isi rangkuman, Langkah penyelesaian, Daftar periksa dokumen, Templat surat, dan Artikel pendukung) tampil dalam 1 halaman, 0 perpindahan halaman atau tab, dan butir Langkah serta Artikel dapat ditambah, diurutkan, dan dihapus langsung di halaman yang sama | Pass |
| KNF14-TC01 | KNF14 | Security | Sesi panel berakhir otomatis setelah 30 menit tanpa aktivitas dan pengguna wajib masuk kembali | Mengubah cookie `aktivitas_terakhir` menjadi 29 dan 31 menit lalu di Chrome (UC05-TC05), ditambah unit test batas C25-UT15, C25-UT16, dan C25-UT19 | Pada 29 menit dan tepat 30 menit sesi masih sah. Pada 31 menit dan 30 menit lebih 1 milidetik, pengguna dialihkan ke `/masuk?alasan=sesi-berakhir` dan sesi Supabase diakhiri | Pass |

<br>

## 4.6 Tangkapan Layar dan Bukti Hasil Pengujian

Bukti pengujian dilampirkan sesuai ID Pengujian pada Subbab 4.2 sampai 4.5, berupa tangkapan layar aplikasi, keluaran *test runner*, laporan *coverage* untuk setiap kelas Mendalam, atau hasil alat ukur.

Tabel 4.6. Bukti Hasil Pengujian

| ID Pengujian | Bukti Hasil Pengujian |
| :--- | :--- |
| C02-UT01 – C02-UT20 | ![Unit test C02](./assets/pengujian/unit/c02-unit-test.png) |
| C02 (coverage) | ![Coverage C02](./assets/pengujian/unit/c02-coverage.png) |
| C06-UT01 – C06-UT22, C17-UT01 – C17-UT07, C26-UT01 – C26-UT22 | Keluaran `npm test`: berkas `modelRangkumanKasus.test.ts` (C06), `aturanDaftarButir.test.ts` (C17), serta `kontrolPenyusunanKonten.test.ts` dan `aturanPenyusunanKonten.test.ts` (C26) seluruhnya lulus<br>![Keluaran unit test seluruh berkas](./assets/pengujian/unit/unit-test-seluruh-berkas.png) |
| C06 (coverage), C26 (coverage) | Keluaran `npm run test:coverage`: `rangkumanKasus.ts` (C06) 100% *lines* dan 96,29% *branch*; `kontrolPenyusunanKonten.ts` (C26) 96% *lines* dan 96,96% *branch*; `aturanPenyusunanKonten.ts` (C26) 100% *lines* dan 82,35% *branch*<br>![Laporan coverage seluruh berkas](./assets/pengujian/unit/coverage-seluruh-berkas.png) |
| C25-UT01 – C25-UT24 | ![Unit test C25](./assets/pengujian/unit/c25-unit-test.png) |
| C25 (coverage) | ![Coverage C25](./assets/pengujian/unit/c25-coverage.png) |
| C29-UT01 – C29-UT17 | ![Unit test C29](./assets/pengujian/unit/c29-unit-test.png) |
| C29 (coverage) | ![Coverage C29](./assets/pengujian/unit/c29-coverage.png) |
| INT-TC01 – INT-TC09 | Keluaran `npm run test:integrasi` untuk IA-01 sampai IA-03 pada Supabase lokal<br>![Integration test IA-01 sampai IA-03](./assets/pengujian/integrasi/ia-01-03-autentikasi-akun.png) |
| INT-TC30 – INT-TC39, KNF08-TC01 | Keluaran `npm run test:integrasi` untuk IA-10 sampai IA-12 pada Supabase lokal<br>![Keluaran integration test IA-10 sampai IA-12](./assets/pengujian/integrasi/ia-10-12-penyusunan-konten.png) |
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
| KNF10-TC01 | Pemeriksaan `auth.users.encrypted_password` dengan `psql`<br>![KNF10-TC01 hash kata sandi](./assets/pengujian/knf/knf10-tc01-hash-kata-sandi.png) |
| KNF12-TC01 | Seluruh kartu isian berada dalam satu halaman<br>![KNF12-TC01 formulir satu halaman](./assets/pengujian/uc06/uc06-tc01-4-diajukan.png) |

<br>

---

# BAB 5: Traceability

Petakan setiap KF ke KNF, use case, kelas perancangan, file implementasi, dan test case. Tabel traceability berikut akan menjadi sarana verifikasi KF. Setiap KF memiliki minimal satu test case dan dinyatakan terpenuhi apabila **seluruh** test case terkaitnya berkesimpulan `Pass`. KF yang tidak diimplementasikan tetap dicantumkan beserta alasannya.

Tabel 5.1. Matriks Kerunutan KF terhadap Implementasi dan Pengujian

| KF ID | KNF Terkait | Use Case ID | Kelas Terkait | Implementasi File Terkait | Test Case (UC) | Test Case (Unit/Integrasi/KNF) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *KF05* | *KNF01* | *UC03* | *C02 - Pesanan* | *`src/...`* | *UC03-TC01* | *C02-UT05, INT-TC04, KNF01-TC01* |
| *KF01* | *-* | *UC01<br>UC02* | *[C01 - Nama kelas]<br>[C02 - Nama kelas]* | *[path/ke/file1]<br>[path/ke/file2]* | *UC01-TC01, UC01-TC02<br>UC02-TC01* | *-* |
| *KF02* | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| *KFXX* | *-* | *[UCXX atau -]* | *[CXX - Nama kelas atau -]* | *Tidak diimplementasikan: [alasan]* | *-* | *-* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

Tabel 5.2. Matriks Kerunutan KNF terhadap Pengujian

| ID KNF | Parameter | KF/UC Terkait | Test Case |
| :--- | :--- | :--- | :--- |
| *KNF01* | *Reliability* | *KF05 / UC03* | *KNF01-TC01* |
| *KNFXX* | *[Parameter]* | *[KFXX / UCXX atau -]* | *[KNFXX-TCYY]* |
| *...* | *...* | *...* | *...* |