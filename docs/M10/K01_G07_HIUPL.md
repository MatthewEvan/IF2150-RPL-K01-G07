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
| C02 | Kurator | Mendalam | Memuat aturan status (Kurator hanya dapat diubah oleh Administrator pemiliknya), validasi email unik dengan *escape* pola, integrasi Supabase Auth dengan pembatalan akun jika penyimpanan gagal, serta algoritma pengurutan daftar konten dan riwayat. | C02-UT01 s.d. C02-UTnn |
| C03 | Administrator | Mendalam | Memuat perhitungan waktu pengajuan terakhir dan lama menunggu, serta algoritma pengurutan antrean peninjauan (Q-007, KF31). | C03-UT01 s.d. C03-UTnn |
| C04 | BidangHukum | Tidak perlu | Hanya menyimpan data bidang hukum. `cekAktif` berupa pemeriksaan satu atribut. | UC01-TC01, UC02-TC02 |
| C05 | KelompokKasus | Sedang | `cekDarurat` dan `cocokkanKataKunci` (Algo-012) berupa pemeriksaan sederhana. Algoritma pencarian utamanya diuji pada C22. | C05-UT01 s.d. C05-UTnn |
| C06 | RangkumanKasus | Mendalam | Memuat aturan kelengkapan isian (Algo-016), transisi status ke Diajukan, pencocokan kata kunci (Algo-013), dan pembatasan konten publik hanya yang Disetujui (KF02). | C06-UT01 s.d. C06-UT22 |
| C07 | LangkahPenyelesaian | Tidak perlu | Hanya struktur data langkah. Penanda tenggat teruji melalui C06. | UC01-TC01, UC06-TC01 |
| C08 | Checklist | Tidak perlu | Hanya menyimpan daftar dokumen. Logika centang berada di C23. | UC03-TC01, UC06-TC01 |
| C09 | TemplatDokumen | Mendalam | Memuat validasi format dan ukuran berkas (Algo-021), pembaruan versi dengan pembatalan unggahan jika gagal (Algo-022, KNF08), serta pembuatan *signed URL* pada *bucket* privat (Algo-023). | C09-UT01 s.d. C09-UTnn |
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
| C25 | KontrolAutentikasi | Mendalam | Memuat aturan keamanan login, proteksi rute per peran, pemutusan sesi akun nonaktif, dan batas sesi 30 menit (KNF14). | C25-UT01 s.d. C25-UTnn |
| C26 | KontrolPenyusunanKonten | Mendalam | Memuat aturan penyuntingan per status, validasi isian, pengajuan konten, serta unggah dan hapus templat. | C26-UT01 s.d. C26-UT22 |
| C27 | KontrolPelacakanKonten | Sedang | Hanya meneruskan permintaan daftar konten ke model C02. | C27-UT01 s.d. C27-UTnn |
| C28 | KontrolModerasiKonten | Mendalam | Memuat aturan bahwa hanya Administrator aktif yang dapat memutuskan, alasan revisi wajib, keputusan hanya untuk konten Diajukan, dan pemulihan status. | C28-UT01 s.d. C28-UTnn |
| C29 | KontrolPengelolaanAkun | Mendalam | Memuat aturan keamanan (hanya Administrator), validasi email dan kata sandi, email unik, serta pembatalan akun jika pendaftaran gagal. | C29-UT01 s.d. C29-UTnn |

## 4.2 Pengujian Unit Kelas

Pengujian unit dilakukan pada kelas bertingkat Mendalam dan Sedang. Kelas Mendalam diuji pada seluruh operasi public dengan kasus normal, batas, dan negatif, serta mencapai *coverage* minimal 70%. Kelas Sedang diuji minimal dengan satu kasus normal dan satu kasus gagal pada operasi public utama.

Cara menjalankan unit test: `npm test` dari folder `src/`. Laporan *coverage* dihasilkan dengan `npm run test:coverage` (Vitest dan `@vitest/coverage-v8`).

Lokasi file test: `src/tests/`. Judul test diberi awalan ID pengujian, misalnya `C06-UT01`, sehingga keluaran *test runner* dapat dicocokkan langsung dengan tabel pada subbab ini. Pada berkas test yang judulnya belum memuat ID, nomor ID mengikuti urutan test di dalam berkas. Dependensi basis data pada *unit test* diganti *mock* *client* Supabase.

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

<br>

## 4.3 Pengujian Integrasi

Pengujian integrasi memeriksa interaksi antarkomponen yang melewati batas, yaitu *Controller* ke *Model*, aplikasi ke basis data, dan aplikasi ke sistem eksternal. Daftar antarmuka mengacu pada dokumen DPPL, dengan minimal satu test case untuk setiap antarmuka. Pengujian memakai komponen nyata, bukan *mock*. Apabila ada antarmuka tambahan yang belum didaftarkan pada dokumen DPPL, cantumkan juga.

Tabel 4.3.1. Daftar Antarmuka Antarkomponen

| ID Antarmuka | Komponen Asal | Komponen Tujuan | Jenis Batas | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| IA-10 | C26 KontrolPenyusunanKonten | C06 RangkumanKasus, tabel `rangkuman_kasus` dan `riwayat_status` | *Controller* - *Model* - Basis data | INT-TC30, INT-TC31, INT-TC32 |
| IA-11 | C06 RangkumanKasus | Fungsi basis data `simpan_draf` dan `ajukan_konten`, C12 RiwayatStatus, RLS | Aplikasi - Basis data | INT-TC33, INT-TC34, INT-TC35, INT-TC39 |
| IA-12 | C09 TemplatDokumen | Supabase Storage (*bucket* privat `templat`) | Aplikasi - Sistem eksternal | INT-TC36, INT-TC37, INT-TC38 |

Tabel 4.3.2. Hasil Pengujian Integrasi

| ID Pengujian | ID Antarmuka | Skenario | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
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

### 4.4.6 Use Case Mengelola Konten Rangkuman Kasus

**ID Use Case:** UC06  
**Nama Use Case:** Mengelola Konten Rangkuman Kasus

Pengujian dilakukan pada aplikasi yang dijalankan secara lokal (`npm run dev`) dan terhubung ke Supabase lokal, menggunakan akun `kurator1@pahamhukum.test` dan `admin@pahamhukum.test` dari data awal pengujian.

Tabel 4.4.6. Hasil Pengujian Use Case UC06

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC06-TC01 | KF22, KF23, KF25, KF27 | Normal | 1. Masuk sebagai Kurator.<br>2. Klik "Tulis konten", pilih kelompok kasus, lalu klik "Mulai menulis".<br>3. Unggah berkas templat pada kartu Templat surat.<br>4. Lengkapi seluruh isian wajib, lalu klik "Ajukan untuk ditinjau".<br>5. Masuk sebagai Administrator dan buka halaman Moderasi. | Kelompok: Gaji tidak dibayar tepat waktu<br>Berkas: `templat-surat-penagihan.pdf` (616 byte)<br>Seluruh isian wajib terisi | Formulir satu halaman tampil dan konten berstatus Draft. Templat tersimpan sebagai versi 1. Setelah diajukan, status menjadi Diajukan, formulir terkunci, dan konten masuk antrean peninjauan Administrator. | Formulir tampil dengan status Draft. Templat tersimpan sebagai versi 1. Setelah diajukan, badge berubah menjadi Diajukan, seluruh isian terkunci, dan konten muncul di antrean Moderasi. | Pass |
| UC06-TC02 | KF26 | Alternatif 1: Berkas Templat Tidak Valid | 1. Buat draf baru.<br>2. Pilih berkas PNG lalu klik "Unggah".<br>3. Pilih berkas PDF berukuran 6 MB lalu klik "Unggah". | `bukti-transfer.png`<br>`berkas-terlalu-besar.pdf` (6 MB) | Unggahan ditolak dengan pesan yang menjelaskan format dan ukuran yang benar, dan tidak ada templat yang tersimpan. | Kedua unggahan ditolak dengan pesan "Berkas harus berformat PDF atau DOCX dan berukuran paling besar 5 MB." dan daftar templat tetap kosong. | Pass |
| UC06-TC03 | KF28 | Alternatif 2: Isian Wajib Belum Lengkap | 1. Pada draf, isi Inti masalah saja.<br>2. Klik "Ajukan untuk ditinjau". | Hanya Inti masalah yang terisi | Pengajuan dicegah dan setiap isian wajib yang kosong ditandai. | Pengajuan dicegah. Pesan galat tampil di bawah Hak kamu, Poin pertimbangan, Langkah, Dokumen, dan Artikel, ringkasan tampil di panel status, dan status tetap Draft. | Pass |
| UC06-TC04 | KF35 | Alternatif 3: Kurator Mencoba Menayangkan Sendiri | 1. Buka draf sebagai Kurator dan periksa panel Status konten.<br>2. Ubah status draf menjadi Disetujui langsung ke basis data dengan sesi Kurator (INT-TC39). | Sesi Kurator, permintaan ubah status menjadi Disetujui | Kurator tidak dapat menayangkan konten. Penayangan hanya melalui persetujuan Administrator. | Panel status hanya menyediakan "Simpan draf" dan "Ajukan untuk ditinjau". Permintaan ubah status ditolak basis data dengan kode `42501`, status tetap Draft, dan konten tidak tampil untuk publik. | Pass |

<br>

## 4.5 Pengujian Kebutuhan Non-Fungsional (KNF)

Setiap KNF pada Tabel 3.2 SKPL diuji secara terukur berdasarkan parameter yang telah didefinisikan. Setiap pengujian memuat target terukur, metode dan alat yang sesuai dengan parameter (misalnya Chrome DevTools untuk *response time* dan inspeksi basis data untuk *security*), serta hasil aktual berupa angka atau data. KNF yang belum dipenuhi atau tidak diimplementasikan dicantumkan beserta alasan dan rencana perbaikan.

Tabel 4.5. Hasil Pengujian KNF

| ID Pengujian | ID KNF | Parameter | Target Terukur | Metode dan Alat | Hasil Aktual | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| KNF08-TC01 | KNF08 | *Reliability* | Saat templat diperbarui, berkas versi lama tetap tersedia sampai versi baru selesai tersimpan, dan setelah berhasil hanya tersisa satu berkas (versi terbaru) di Storage | Integration test INT-TC36 pada Supabase lokal: unggah `surat.pdf` 2 KB, unggah ulang nama yang sama 4 KB, lalu daftar isi folder rangkuman di *bucket* `templat` | Versi naik dari 1 menjadi 2, baris `templat_dokumen` menunjuk lokasi berkas baru, dan folder hanya berisi 1 berkas (berkas versi 1 terhapus setelah versi 2 tersimpan) | Pass |
| KNF08-TC02 | KNF08 | *Reliability* | Jika unggahan atau penyimpanan versi baru gagal, templat tetap menunjuk versi sebelumnya dan tidak ada berkas setengah jadi yang tertinggal | Inspeksi kode `perbaruiVersi()` di `src/lib/models/templatDokumen.ts`: berkas baru diunggah ke lokasi unik dengan `upsert: false`, baris basis data baru diperbarui setelah unggahan berhasil, berkas baru dihapus bila pembaruan baris gagal, dan berkas lama baru dihapus setelah pembaruan berhasil | Tiga jalur sesuai target: unggahan gagal berhenti sebelum basis data diubah, pembaruan baris gagal menghapus berkas baru dan versi lama tetap utuh, dan berkas lama tidak pernah ditimpa di tempat. Kegagalan jaringan belum disimulasikan secara otomatis | Pass |
| KNF12-TC01 | KNF12 | *Ergonomy* | Seluruh isian penyusunan konten (Inti masalah, Hak kamu, Poin pertimbangan, Langkah, Dokumen, Artikel, dan Templat surat) dapat diisi dan diajukan pada satu halaman tanpa berpindah halaman atau tab | Uji manual pada UC06-TC01 di halaman `/panel/kurator/konten/[id]`: hitung jumlah perpindahan halaman dari draf dibuat sampai diajukan, serta tambah dan hapus baris Langkah, Dokumen, dan Artikel | 7 bagian isian tampil dalam 1 halaman, 0 perpindahan halaman atau tab, dan baris Langkah, Dokumen, serta Artikel dapat ditambah dan dihapus langsung di halaman yang sama | Pass |

<br>

## 4.6 Tangkapan Layar dan Bukti Hasil Pengujian

Bukti pengujian dilampirkan sesuai ID Pengujian pada Subbab 4.2 sampai 4.5, berupa tangkapan layar aplikasi, keluaran *test runner*, laporan *coverage* untuk setiap kelas Mendalam, atau hasil alat ukur.

Tabel 4.6. Bukti Hasil Pengujian

| ID Pengujian | Bukti Hasil Pengujian |
| :--- | :--- |
| *C02-UT01 – C02-UT08* | *[Sisipkan hasil keluaran unit test]* |
| *C02 (coverage)* | *[Sisipkan laporan coverage kelas C02]* |
| *INT-TC01* | *[Sisipkan bukti pengujian integrasi]* |
| *UC01-TC01* | *[Sisipkan tangkapan layar UC01-TC01 sesuai prosedur pengujian]* |
| *UC01-TC02* | *[Sisipkan tangkapan layar UC01-TC02 sesuai prosedur pengujian]* |
| *KNF01-TC01* | *[Sisipkan bukti pengukuran parameter KNF01-TC01]* |
| *...* | *...* |

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