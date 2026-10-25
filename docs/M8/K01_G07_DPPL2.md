<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 5
<br>
DESKRIPSI PERANCANGAN PERANGKAT LUNAK (DPPL)
</h1>
<br>

## PahamHukum
### *[Logo Perangkat Lunak]*

### Untuk: Mikhael Andrian Yonatan

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | K01 |
| Kelompok | G07  |

| NIM | Nama |
|---|---|
| 13525007 | Rivan Cahyadi |
| 13525019 | Raditya Wibian Sastaka |
| 13525064 | Matthew Evan Kurniawan |
| 13525100 | Wesley Lianto |
| 13525109 | Christopherus Michael Jafeth Tobing |
---

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

---

<br>

> **Petunjuk pengerjaan:** *[Silahkan hapus bagian ini setelah selesai mengerjakan]*
>
> Dokumen ini melanjutkan **Deskripsi Perancangan Perangkat Lunak**. Gunakan nama, ID, kebutuhan, dan use case yang konsisten dengan kedua dokumen tersebut. Contoh pola ID baru di bawah dapat disesuaikan dengan kesepakatan kelompok, ID yang sudah ada tetap dipertahankan.

<br>

---


# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Deskripsi Perancangan Perangkat Lunak (DPPL) disusun untuk menjelaskan rancangan perangkat lunak PahamHukum yang akan diimplementasikan. Dokumen ini merupakan kelanjutan dari Spesifikasi Kebutuhan Perangkat Lunak (SKPL) dan Arsitektur Perangkat Lunak (APL), dan DPPL pada tahap sebelumnya, dengan mengolah kebutuhan dan arsitektur menjadi rancangan yang lebih rinci. Perincian tersebut mencakup realisasi tiap use case ke dalam sequence diagram dan diagram kelas, perincian tiap kelas beserta operasi, atribut, algoritma, dan query pentingnya, serta rancangan antarmuka tiap layar. Dokumen ini penting. Dokumen ini penting bagi pengembang sebagai referensi alur saat menuliskan kode, bagi desainer sebagai landasan fitur dan tampilan yang dibutuhkan, dan bagi penguji sebagai dasar penyusunan skenario pengujian (*testing*).

## 1.2 Lingkup Masalah
PahamHukum adalah platform literasi hukum berbasis web yang menjembatani masyarakat awam dengan informasi hukum. Informasi pada sistem disusun berdasarkan situasi sehari-hari dalam bentuk rangkuman kasus. Rangkuman kasus memuat inti masalah, hak, langkah penyelesaian, poin pertimbangan, checklist dokumen, templat surat yang dapat diunduh, dan artikel pendukung. Pencari Informasi dapat menggunakan seluruh fitur publik tanpa akun, sedangkan Kurator menyusun konten dan Administrator meninjau konten sebelum ditayangkan sekaligus mengelola akun Kurator. PahamHukum tidak bertindak sebagai penasihat hukum resmi, melainkan sebagai penuntun langkah awal sebelum masyarakat berinteraksi dengan lembaga hukum formal.

## 1.3 Definisi, Istilah, dan Singkatan
Tabel 1.3. Definisi Istilah dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| **P/L** | Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu |
| **SKPL** | Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kebutuhan fungsional dan non-fungsional serta memetakan dalam Class Diagram (CD) untuk Perangkat Lunak terkait |
| **DPPL** | Singkatan dari Deskripsi Perancangan Perangkat Lunak, yaitu dokumen yang merinci rancangan dari SKPL dan APL menjadi realisasi use case, perancangan rinci kelas, dan perancangan antarmuka sebagai referensi saat implementasi P/L terkait |
| **APL** | Singkatan dari Arsitektur Perangkat Lunak, yaitu dokumen yang merinci pola arsitektur, komponen, dan model arsitektur Perangkat Lunak terkait |
| **KF** | Singkatan dari Kebutuhan Fungsional |
| **KNF** | Singkatan dari Kebutuhan Non-Fungsional |
| **UC**| Singkatan dari *Use Case*, yaitu rangkaian interaksi antara aktor dan sistem untuk mencapai suatu target |
| **MVC** | Singkatan dari *Model-View-Controller*, yaitu pola arsitektur yang memisahkan data (*Model*), tampilan (*View*), dan alur pengendali (*Controller*). |
|**Boundary**, **Control**, **Entity** | Stereotipe kelas pada tahap analisis yang masing-masing berperan sebagai antarmuka, pengendali alur, dan data. Pada rancangan MVC PahamHukum, ketiganya dipetakan ke *View*, *Controller*, dan *Model*. |
| **Kelas** | Kelas yang siap diimplementasikan, lengkap dengan atribut, metode, tipe data, dan visibilitasnya. Beberapa kelas membentuk suatu Class Diagram (CD). |
| **Sequence Diagram** | Diagram UML yang menggambarkan urutan pesan antarobjek untuk menjalankan satu skenario *use case*. |
| **Pencari Informasi** | Masyarakat awam yang menelusuri, mencari, dan membaca rangkuman kasus tanpa akun |
| **Kurator** | Pengelola sistem yang menyusun, menyunting, dan mengajukan konten untuk rangkuman kasus |
| **Administrator** | Pengelola sistem yang meninjau dan memutuskan kelayakan konten serta mengelola akun Kurator |
| **Visibility** | Tingkat akses atribut atau operasi pada kelas: public (+) atau private (-) |
| **Algoritma** | Langkah pemrosesan yang digunakan oleh sebuah operasi penting, ditulis sebagai *pseudocode* |
| **Query** | Perintah SQL yang dijalankan terhadap DBMS untuk membaca atau mengubah data |
| **Antarmuka** | Tampilan layar yang berinteraksi langsung dengan pengguna, dirancang dalam bentuk prototipe |
| **Prototipe** | Rancangan awal antarmuka dari perangkat lunak sebelum diimplementasikan |

## 1.4 Aturan Penomoran
Tuliskan aturan penomoran (ID) yang digunakan dalam dokumen ini. Gunakan pola ID yang **sama** dengan yang sudah dipakai pada dokumen-dokumen sebelumnya, jangan membuat pola baru di dokumen ini.

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| Kebutuhan Fungsional | KFXX | XX adalah nomor urut dari 01 hingga 44, mengikuti SKPL |
| Kebutuhan Non-Fungsional | KNFXX | XX adalah nomor urut dari 01 hingga 14, mengikuti SKPL |
| Aktor | AKTXX | XX adalah nomor urut dari 01 hingga 03, mengikuti SKPL |
| Use Case | UCXX | XX adalah nomor urut dari 01 hingga 09, mengikuti SKPL |
| Kelas | CXX | XX adalah nomor urut dari 01 hingga 29, mengikuti SKPL |
| Algoritma	| Algo-XXX | XXX adalah nomor urut algoritma pada BAB 5, dimulai dari 001 |
| Query | Q-XXX	| XXX adalah nomor urut query pada BAB 5, dimulai dari 001 |
| Antarmuka	| I-XX | XX adalah nomor urut layar pada BAB 6, dimulai dari 01 |

## 1.5 Referensi
1. K01_G07_SKPL, Spesifikasi Kebutuhan Perangkat Lunak (SKPL) PahamHukum, IF2150 Rekayasa Perangkat Lunak, Institut Teknologi Bandung, 2026
2. K01_G07_APL, Arsitektur Perangkat Lunak (APL) PahamHukum, IF2150 Rekayasa Perangkat Lunak, Institut Teknologi Bandung, 2026
3. PlantUML, “Sequence Diagram syntax and features,” PlantUML.com. Tersedia: https://plantuml.com/sequence-diagram
4. Object Management Group, “Unified Modeling Language (UML), Version 2.5.1,” OMG Document formal/2017-12-05, Des. 2017. Tersedia: https://www.omg.org/spec/UML/2.5.1/
5. K01_G07_DPPL, Deskripsi Perancangan Perangkat Lunak (DPPL) PahamHukum, IF2150 Rekayasa Perangkat Lunak, Institut Teknologi Bandung, 2026

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Dokumen DPPL ini terdiri atas tujuh bab. BAB 1 menjelaskan tujuan penulisan, lingkup masalah, definisi istilah, aturan penomoran, dan referensi. BAB 2 memaparkan perancangan arsitektur, yaitu lingkungan implementasi, pola arsitektur MVC, identifikasi komponen, dan model arsitektur dari dokumen APL. BAB 3 menjabarkan realisasi setiap use case melalui identifikasi kelas, sequence diagram untuk skenario normal dan alternatif, serta diagram kelas per use case. BAB 4 menyajikan diagram kelas keseluruhan beserta daftar atribut dan metodenya. BAB 5 merinci setiap kelas perancangan beserta operasi, atribut, algoritma, dan query pentingnya. BAB 6 memuat perancangan antarmuka tiap layar. Terakhir, BAB 7 memuat matriks kerunutan yang memetakan kelas terhadap use case terkait.

<br>

---

# BAB 2: Perancangan Arsitektur

## 2.1 Rancangan Lingkungan Implementasi

Sebutkan *operating system*, DBMS, *development tools*, *filing system*, dan bahasa pemrograman yang digunakan.

## 2.2 Style/Pattern Arsitektur Acuan

Tentukan *architectural style* atau *pattern* yang menjadi acuan aplikasi, misalnya *layered architecture*, *client-server*, *repository*, *pipe and filter*, atau MVC (*Model-View-Controller*).


Gunakan hasil **BAB 1 Style/Pattern Arsitektur Acuan pada dokumen APL**, termasuk alasan pemilihan dan gambar penerapannya pada P/L kelompok. Gunakan komponen aplikasi sendiri pada gambar, bukan hanya contoh pola umum.

<p align="center">
<img alt="Contoh Arsitektur MVC" src="./assets/diagram/contoh-arsitektur-mvc.webp" width="40%">
</p>
<p align="center">
<i>Gambar 1. Contoh Arsitektur MVC</i>
</p>

## 2.3 Identifikasi Komponen / Modul / Subsistem

Identifikasi komponen, modul, atau subsistem penyusun aplikasi berdasarkan *pattern* yang telah ditetapkan. Jelaskan tanggung jawab masing-masing komponen. Pengelompokan dapat mengikuti lapisan arsitektur atau fungsi/peran komponen dalam sistem.

Dapat menyalin dari dokumen DPPL sebelumnya

Tabel 2.3. Identifikasi Komponen/Modul/Subsistem

| Nama Komponen/Modul/Subsistem | Jenis | Penjelasan |
| :--- | :--- | :--- |
| *[Nama komponen/modul/subsistem]* | *[Jenis]* | *[Tanggung jawab komponen]* |
| *[Nama komponen/modul/subsistem]* | *[Jenis]* | *[Tanggung jawab komponen]* |
| *...* | *...* | *...* |

## 2.4 Model Arsitektur Perangkat Lunak

Buat model arsitektur dalam bentuk satu atau lebih *view* yang memperlihatkan interaksi dan kolaborasi komponen, modul, serta subsistem dalam menjalankan fungsi sistem. Pilih notasi yang sesuai. Contoh *view*: *Logical View*, *Process View*, *Development View*, dan *Physical View*.

Gunakan hasil **BAB 3 Model Arsitektur Perangkat Lunak pada dokumen APL**. 

### 2.4.1 View [Nama View]

Tuliskan secara singkat model arsitektur yang dipilih dan alasan model tersebut cocok untuk aplikasi.

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-logical-view.webp" width="50%">
</p>
<p align="center">
<i>Gambar 2. Contoh Logical View pada P/L E-Commerce</i>
</p>

### 2.4.X View [Nama View]
*[Lakukan hal yang sama dengan bagian sebelumnya]*

<br>

---


# BAB 3: Realisasi Use Case

## 3.1 Use Case [Nama Use Case 1]

**ID Use Case:** *[UC01 sesuai SKPL]*  
**Nama Use Case:** *[Nama use case sesuai SKPL]*

### 3.1.1 Identifikasi Kelas

Identifikasi kelas yang terkait dengan use case tersebut. Kelas di tahap perancangan dapat berbeda dengan dengan kelas di tahap analisis. Dapat menggunakan tabel di bawah:

Tabel 3.1. Identifikasi Kelas Use Case [UC01]

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *[Nama kelas perancangan]* | *[Nama kelas analisis pada SKPL]* |
| 2 | *[Nama kelas perancangan]* | *[Nama kelas analisis pada SKPL]* |
| ... | *...* | *...* |

### 3.1.2 Sequence Diagram

Buat *sequence diagram* untuk **setiap skenario use case**, mencakup skenario normal dan alternatif pada subbab 4.4 SKPL. Diagram melibatkan kelas-kelas yang telah diidentifikasi pada SKPL. 

- **Skenario Normal**

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-sequence_diagram.png" width="50%">
</p>
<p align="center">
<i>Gambar X. Sequence Diagram [UC01]</i>
</p>

- **Skenario Alternatif [Nomor]: [Nama Skenario]**

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-sequence_diagram.png" width="50%">
</p>
<p align="center">
<i>Gambar X. Sequence Diagram [UC01] - [Nama skenario alternatif]</i>
</p>

### 3.1.3 Diagram Kelas

Buatlah diagram kelas untuk use case ini yang terdiri atas kelas-kelas dari 3.1.1. **Setiap kelas pada diagram wajib menampilkan atribut dan metode/operasi langsung di dalam kotak kelasnya**, sehingga tidak perlu membuat tabel daftar atribut dan metode per kelas pada subbab ini. Daftar lengkap atribut dan metode seluruh kelas disajikan pada Tabel 4.1 (Bab 4).

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh_class-diagram2.jpg" width="35%">
</p>
<p align="center">
<i>Gambar X. Diagram Kelas [Nama Uce Case]</i>
</p>

Pada diagram, pastikan:
- Atribut dituliskan beserta visibilitas dan tipe datanya, misalnya `- email: String`.
- Operasi dituliskan beserta visibilitas, parameter, dan tipe kembaliannya, misalnya `+ login(email: String, password: String): Boolean`.
- Relasi antarkelas (asosiasi, agregasi, komposisi, generalisasi, dan dependensi) digambarkan lengkap dengan multiplisitas.
- Semua operasi yang dipanggil pada sequence diagram 3.1.2 (skenario normal dan alternatif) ada pada kelas yang bersangkutan.
- Kelas yang sama dengan kelas di use case lain memakai nama, atribut, dan metode yang konsisten.

## 3.2 Use Case XX

Silahkan lanjutkan untuk  *use case* berikutnya dengan content yang sama dengan 3.1

<br>

---

# BAB 4: Diagram Kelas Keseluruhan

## 4.1 Diagram Kelas

**Bagian ini diisi dengan diagram kelas keseluruhan.**

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-class_diargam.png" width="35%">
</p>
<p align="center">
<i>Gambar 4.1. Diagram Kelas Perancangan Keseluruhan [Nama P/L]</i>
</p>

Tabel 4.1. Daftar Kelas Perancangan Keseluruhan

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *[C01]* | *[Nama kelas]* | *[Daftar atribut]* | *[Daftar metode/operasi]* |
| *[C02]* | *[Nama kelas]* | *[Daftar atribut]* | *[Daftar metode/operasi]* |
| *[C03]* | *[Nama kelas]* | *[Daftar atribut]* | *[Daftar metode/operasi]* |
| *...* | *...* | *...* | *...* |

---

# BAB 5: Perancangan Rinci Kelas

Bagian ini diisi dengan daftar seluruh kelas dalam tabel berikut:

Tabel 5.1. Daftar Kelas Perancangan dan Kelas Analisis Terkait

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
| :--- | :--- | :--- |
| 1 | *[Nama kelas perancangan]* | *[Nama kelas analisis pada SKPL atau -]* |
| 2 | *[Nama kelas perancangan]* | *[Nama kelas analisis pada SKPL atau -]* |
| ... | *...* | *...* |

Untuk **setiap kelas**, identifikasi operasi berdasarkan tanggung jawab kelas beserta *visibility*-nya, serta atribut beserta *visibility* dan tipenya. Buat subbab tersendiri untuk setiap kelas.

## 5.1 Kelas [Nama Kelas 1]

**Nama Kelas:** *[Nama kelas]*  
**ID Kelas:** *[ID kelas]*

Tabel 5.1.1. Operasi Kelas [Nama Kelas 1]

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *[Signature operasi, termasuk parameter dan tipe kembalian]* | *[Visibility]* | *[Tanggung jawab operasi]* |
| *...* | *...* | *...* |

Tabel 5.1.2. Atribut Kelas [Nama Kelas 1]

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *[Nama atribut]* | *[Visibility]* | *[Tipe sesuai bahasa pemrograman yang digunakan]* |
| *...* | *...* | *...* |

### 5.1.1 Algoritma/Query

Bagian ini diisi untuk kerangka algoritma proses yang dianggap cukup penting. Algoritma dapat dituliskan sebagai *pseudocode*. Implementasi *skeleton code* juga dapat digunakan untuk kelas yang sudah terdefinisi pada bahasa pemrograman tertentu.

**Nama Kelas:** *[Nama kelas]*  
**Nama Operasi:** *[Signature operasi]*  
**ID Algoritma:** *[Algo-001]*

```text
[Tuliskan pseudocode algoritma operasi di sini.]
```

Jika operasi mengacu pada query tertentu, lengkapi tabel berikut. 

Tabel 5.1.1. Query Operasi [Nama Operasi]

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *[Q-001]* | *[Tuliskan query]* | *[Fungsi query]* |
| *...* | *...* | *...* |


### 5.1.2 Algoritma/Query

*[Ulangi pola 5.1.1 untuk operasi penting berikutnya pada kelas yang sama, jika ada.]*

## 5.2 Kelas [Nama Kelas Berikutnya]

*[Ulangi pola 5.1: nama dan ID kelas, tabel operasi, tabel atribut, serta subbab algoritma/query untuk operasi penting jika diperlukan.]*

<br>

---

# BAB 6: Perancangan Antarmuka

## 6.1 Rancangan Antarmuka [ID Layar 1]

Masukkan versi awal prototipe antarmuka, dimana untuk setiap antarmuka/layar, tuliskan spesifikasi rinci objek yang ditampilkan dan reaksi sistem terhadap interaksi pengguna.

**Antarmuka:** *[ID layar]*  
**Nama Layar:** *[Nama layar]*

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-design.png" width="50%">
</p>
<p align="center">
<i>Gambar 6.1. Rancangan Antarmuka [ID Layar] - [Nama Layar]</i>
</p>

Tabel 6.1. Spesifikasi Objek Antarmuka [ID Layar]

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *[ID objek]* | *[Jenis objek, misalnya Button, RTF Box, dll]* | *[String yang tampil pada layar]* | *[Reaksi sistem, layar tujuan, tautan, atau ID algoritma yang dijalankan]* |
| *[ID objek]* | *[Jenis objek]* | *[Konten yang ditampilkan]* | *[Reaksi sistem atau nama file terkait beserta deskripsi ringkasnya]* |
| *...* | *...* | *...* | *...* |


## 6.X Rancangan Antarmuka [ID Layar X]

*[Ulangi pola 6.1 untuk layar berikutnya sampai semua layar teridentifikasi]*

## 6.Y Rancangan Antarmuka Keseluruhan

Tuliskan daftar gambar seluruh antarmuka. Berikan ID unik untuk setiap tampilan dan gunakan ID yang sama pada subbab perancangan antarmuka masing-masing.

Tabel 6.Y. Rancangan Antarmuka Keseluruhan

| No | Tampilan Antarmuka |
| :--- | :--- |
| *[I-01]* | <img src="./assets/diagram/contoh-design.png" alt="Contoh Desain" width="400"> |
| *[I-02]* | *[Sisipkan gambar antarmuka I-02]* |
| *[I-XX]* | *[Sisipkan gambar antarmuka berikutnya]* |

<br>

---

# BAB 7: Matriks Kerunutan

Petakan kelas perancangan dengan use case yang terkait. Gunakan **BAB 6 Traceability pada dokumen SKPL** sebagai acuan keterkaitan kelas analisis dan use case, lalu sesuaikan dengan realisasi use case dan kelas perancangan pada BAB 3–BAB 5 DPPL.

Tabel 7.1. Matriks Kerunutan Kelas terhadap Use Case

| Kelas | Use Case Terkait |
| :--- | :--- |
| *[ID kelas - Nama kelas]* | *[ID UC - Nama use case; tuliskan seluruh use case terkait]* |
| *[ID kelas - Nama kelas]* | *[ID UC - Nama use case]* |
| *...* | *...* |
