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
| C06 | RangkumanKasus | Mendalam | Memuat aturan kelengkapan isian (Algo-016), transisi status ke Diajukan, pencocokan kata kunci (Algo-013), dan pembatasan konten publik hanya yang Disetujui (KF02). | C06-UT01 s.d. C06-UTnn |
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
| C17 | HalamanPenyusunanKonten | Sedang | Satu-satunya kelas *boundary* yang memiliki logika sendiri, yaitu menambah, menghapus, dan mengurutkan butir langkah dan artikel. | C17-UT01 s.d. C17-UTnn |
| C18 | HalamanDaftarKontenKurator | Tidak perlu | Hanya menampilkan daftar dan catatan revisi dari C27. | UC07-TC01, UC07-TC02 |
| C19 | HalamanModerasiKonten | Tidak perlu | Hanya menampilkan antrean dan meneruskan keputusan ke C28. | UC08-TC01 s.d. UC08-TC03 |
| C20 | HalamanPengelolaanAkun | Tidak perlu | Hanya menampilkan daftar Kurator dan meneruskan aksi ke C29. | UC09-TC01, UC09-TC02 |
| C21 | KontrolJelajahKasus | Sedang | Mendelegasikan pengambilan data ke model dan menghitung jumlah kelompok per bidang. | C21-UT01 s.d. C21-UTnn |
| C22 | KontrolPencarianKataKunci | Mendalam | Memuat algoritma pencarian (Algo-032, Algo-012, Algo-013), *escape* pola `ILIKE`, serta penyaringan konten Disetujui dan bidang aktif. | C22-UT01 s.d. C22-UTnn |
| C23 | KontrolChecklist | Mendalam | Memuat penyimpanan status centang di `localStorage`, penanganan data rusak, sinkronisasi antartab, dan perhitungan kelengkapan. | C23-UT01 s.d. C23-UTnn |
| C24 | KontrolUnduhTemplat | Mendalam | Memuat aturan keamanan (hanya templat milik konten Disetujui dan validasi id) serta integrasi dengan Supabase Storage. | C24-UT01 s.d. C24-UTnn |
| C25 | KontrolAutentikasi | Mendalam | Memuat aturan keamanan login, proteksi rute per peran, pemutusan sesi akun nonaktif, dan batas sesi 30 menit (KNF14). | C25-UT01 s.d. C25-UTnn |
| C26 | KontrolPenyusunanKonten | Mendalam | Memuat aturan penyuntingan per status, validasi isian, pengajuan konten, serta unggah dan hapus templat. | C26-UT01 s.d. C26-UTnn |
| C27 | KontrolPelacakanKonten | Sedang | Hanya meneruskan permintaan daftar konten ke model C02. | C27-UT01 s.d. C27-UTnn |
| C28 | KontrolModerasiKonten | Mendalam | Memuat aturan bahwa hanya Administrator aktif yang dapat memutuskan, alasan revisi wajib, keputusan hanya untuk konten Diajukan, dan pemulihan status. | C28-UT01 s.d. C28-UTnn |
| C29 | KontrolPengelolaanAkun | Mendalam | Memuat aturan keamanan (hanya Administrator), validasi email dan kata sandi, email unik, serta pembatalan akun jika pendaftaran gagal. | C29-UT01 s.d. C29-UTnn |

## 4.2 Pengujian Unit Kelas

Pengujian unit dilakukan pada kelas bertingkat Mendalam dan Sedang. Kelas Mendalam diuji pada seluruh operasi public dengan kasus normal, batas, dan negatif, serta mencapai *coverage* minimal 70%. Kelas Sedang diuji minimal dengan satu kasus normal dan satu kasus gagal pada operasi public utama.

Cara menjalankan unit test: *[tuliskan perintah, mis. `pytest src/tests/`]*.

Lokasi file test: *[path, mis. `src/tests/`]*.

### 4.2.1 Kelas [Nama Kelas 1]

**ID Kelas:** *[C02]*  
**Nama Kelas:** *[Pesanan]*  
**Tingkat:** *[Mendalam]*

Tabel 4.2.1. Hasil Pengujian Unit Kelas [C02]

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C02-UT01* | *`hitungTotal(): Decimal`* | *Normal* | *Pesanan berisi 2 item: 10.000 x 2 dan 5.000 x 1* | *Total = 25.000* | *[Hasil aktual]* | *Pass/Fail* |
| *C02-UT02* | *`hitungTotal(): Decimal`* | *Batas* | *Pesanan berisi tepat 1 item dengan jumlah 1* | *Total = harga item tersebut* | *[...]* | *Pass/Fail* |
| *C02-UT03* | *`hitungTotal(): Decimal`* | *Negatif* | *Pesanan tanpa item* | *Total = 0 atau melempar kesalahan sesuai rancangan* | *[...]* | *Pass/Fail* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

Khusus kelas **Mendalam**:

Tabel 4.2.1b. Ringkasan Cakupan Kelas [C02]

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *[op1(), op2(), ...]* |
| Operasi yang diuji | *[op1(), op2(), ...]* |
| ID Algoritma yang tercakup | *[Algo-001, ...]* |
| Coverage (wajib ≥ 70%) | *[% baris / % cabang, alat dan bukti pada 4.6]* |

### 4.2.2 Kelas [Nama Kelas 2]

*[Ulangi pola 4.2.1 untuk setiap kelas bertingkat Mendalam atau Sedang.]*

<br>

## 4.3 Pengujian Integrasi

Pengujian integrasi memeriksa interaksi antarkomponen yang melewati batas, yaitu *Controller* ke *Model*, aplikasi ke basis data, dan aplikasi ke sistem eksternal. Daftar antarmuka mengacu pada dokumen DPPL, dengan minimal satu test case untuk setiap antarmuka. Pengujian memakai komponen nyata, bukan *mock*. Apabila ada antarmuka tambahan yang belum didaftarkan pada dokumen DPPL, cantumkan juga.

Tabel 4.3.1. Daftar Antarmuka Antarkomponen

| ID Antarmuka | Komponen Asal | Komponen Tujuan | Jenis Batas | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| *I-01* | *KeranjangController* | *Keranjang (Model)* | *Controller - Model* | *INT-TC01, INT-TC02* |
| *I-02* | *Pesanan (Model)* | *Database* | *Aplikasi - Basis data* | *INT-TC03* |
| *I-03* | *PaymentGatewayAdapter* | *Payment Gateway (dummy)* | *Aplikasi - Sistem eksternal* | *INT-TC04, INT-TC05* |
| *[I-XX]* | *[Komponen asal]* | *[Komponen tujuan]* | *[Jenis batas]* | *[ID test case]* |
| *...* | *...* | *...* | *...* | *...* |

Tabel 4.3.2. Hasil Pengujian Integrasi

| ID Pengujian | ID Antarmuka | Skenario | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *INT-TC01* | *I-01* | *Normal: tambah item ke keranjang* | *Panggil `tambahItem()` melalui KeranjangController dengan produk valid* | *Item tersimpan pada Keranjang dan tampil pada daftar item* | *[Hasil aktual]* | *Pass/Fail* |
| *INT-TC03* | *I-02* | *Normal: simpan pesanan* | *Buat pesanan, lalu baca ulang langsung dari basis data* | *Baris pesanan ada dengan nilai total dan status yang sama* | *[...]* | *Pass/Fail* |
| *INT-TC05* | *I-03* | *Gagal: gateway mengembalikan status gagal* | *Kirim otorisasi dengan saldo dummy tidak cukup* | *Status pesanan tidak berubah menjadi "Lunas", pesan gagal diteruskan ke pengguna* | *[...]* | *Pass/Fail* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

<br>

## 4.4 Pengujian Use Case

Pengujian use case dilakukan pada seluruh skenario normal dan alternatif sesuai Subbab 4.4 SKPL, dengan minimal satu test case untuk setiap skenario. Kolom ID KF menunjukkan KF yang diverifikasi oleh test case tersebut.

### 4.4.1 Use Case [Nama Use Case 1]

**ID Use Case:** *[UC01 sesuai SKPL]*  
**Nama Use Case:** *[Nama use case sesuai SKPL]*

Tabel 4.4.1. Hasil Pengujian Use Case [UC01]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC01-TC01* | *KF01* | *Normal* | *1. Buka halaman login.<br>2. Masukkan kredensial.<br>3. Klik tombol "Login".* | *User: rpl@gmail.com<br>Pass: 123456* | *Pengguna diarahkan ke Halaman Dashboard.* | *Pengguna diarahkan ke Halaman Dashboard sesuai hasil yang diharapkan.* | *Pass* |
| *UC01-TC02* | *KF01* | *Alternatif 1: [Nama skenario]* | *[Langkah-langkah pengujian]* | *[Data masukan]* | *[Hasil yang diharapkan]* | *[Hasil aktual]* | *[Pass/Fail. Jika Fail: penjelasan dan solusi]* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* | *...* |

### 4.4.2 Use Case [Nama Use Case 2]

*[Lanjutkan untuk seluruh use case dengan pola yang sama, hingga 4.4.N.]*

<br>

## 4.5 Pengujian Kebutuhan Non-Fungsional (KNF)

Setiap KNF pada Tabel 3.2 SKPL diuji secara terukur berdasarkan parameter yang telah didefinisikan. Setiap pengujian memuat target terukur, metode dan alat yang sesuai dengan parameter (misalnya Chrome DevTools untuk *response time* dan inspeksi basis data untuk *security*), serta hasil aktual berupa angka atau data. KNF yang belum dipenuhi atau tidak diimplementasikan dicantumkan beserta alasan dan rencana perbaikan.

Tabel 4.5. Hasil Pengujian KNF

| ID Pengujian | ID KNF | Parameter | Target Terukur | Metode dan Alat | Hasil Aktual | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *KNF01-TC01* | *KNF01* | *Reliability* | *Tidak ada data hilang/ganda saat jaringan putus di tengah transaksi* | *Simulasi putus koneksi saat bayar, lalu cek status di DB* | *[Hasil aktual]* | *Pass/Fail* |
| *KNF02-TC01* | *KNF02* | *Security* | *Password tersimpan sebagai hash, bukan plain-text* | *Inspeksi tabel pengguna di DB* | *[...]* | *Pass/Fail* |
| *KNFXX-TC01* | *KNFXX* | *Response time* | *Halaman tampil ≤ 4 detik* | *Chrome DevTools, 5 kali ukur, ambil rata-rata* | *[Rata-rata ... detik, maks ... detik]* | *Pass/Fail* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

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