<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 7
<br>
DESKRIPSI PERANCANGAN PERANGKAT LUNAK (DPPL)
</h1>
<br>

## PahamHukum
### *[Logo Perangkat Lunak]*

### Untuk: Mikhael Andrian Yonatan

Dipersiapkan oleh: #PenjagaNilai

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
| *A* | Penambahan dan penyesuaian atribut serta metode kelas pada use case UC06 (C06, C07, C08, C09, C10, C17, C26) agar realisasi skenario normal dan alternatif dapat digambarkan pada sequence diagram. Tidak ada kelas baru. |
| *B* | Penyesuaian kelas pada use case UC07 dan UC08: penambahan metode `ambilDaftarKonten()` pada C02 `Kurator` untuk mengambil konten milik Kurator, penambahan metode `ambilAntreanPeninjauan()` pada C03 `Administrator` untuk mengambil konten berstatus Diajukan terurut dari yang paling lama menunggu, serta perubahan tipe kembalian `kembalikanKonten(...)` pada C28 `KontrolModerasiKonten` dari `void` menjadi `bool` agar halaman dapat menampilkan pesan wajib isi ketika alasan revisi kosong. Tidak ada kelas baru. |
| *C* | Penyesuaian kelas pada use case UC05 dan UC09. Metode `cariAkun(email)` ditambahkan pada C01 `Akun` karena `prosesLogin()` menerima email, sedangkan SKPL belum menyediakan cara mencari akun berdasarkan email. Metode `putusSesi(idAkun)` ditambahkan pada C25 `KontrolAutentikasi` untuk memenuhi KF37 yang menuntut sesi Kurator terputus seketika saat akunnya dinonaktifkan. Metode `ambilDaftarKurator(idAdministrator)` ditambahkan pada C29 `KontrolPengelolaanAkun` agar pemuatan tabel daftar Kurator tidak melangkahi lapisan *Controller*. Selain itu, C25 dimasukkan ke daftar kelas UC09 dan alur login UC05 kini memanggil `cekAktif()` milik C02 `Kurator`, yang sebelumnya tidak pernah ditempatkan pada alur mana pun. Tidak ada kelas baru. |

---

<br>

---


# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Deskripsi Perancangan Perangkat Lunak (DPPL) disusun untuk menjelaskan rancangan perangkat lunak PahamHukum yang akan diimplementasikan. Dokumen ini merupakan kelanjutan dari Spesifikasi Kebutuhan Perangkat Lunak (SKPL) dan Arsitektur Perangkat Lunak (APL) dengan mengolah kebutuhan dan arsitektur menjadi rancangan yang lebih rinci. Perincian itu merealisasikan tiap use case ke dalam sequence diagram yang merinci alur tiap proses yang dilakukan oleh user pada use case terkait. Dokumen ini penting bagi pengembang sebagai referensi alur saat menuliskan kode, bagi desainer sebagai landasan fitur dan tampilan yang dibutuhkan, dan bagi penguji sebagai dasar penyusunan skenario pengujian (*testing*).

## 1.2 Lingkup Masalah
PahamHukum adalah platform literasi hukum berbasis web yang menjembatani masyarakat awam dengan informasi hukum. Informasi pada sistem disusun berdasarkan situasi sehari-hari dalam bentuk rangkuman kasus. Rangkuman kasus memuat inti masalah, hak, langkah penyelesaian, poin pertimbangan, checklist dokumen, templat surat yang dapat diunduh, dan artikel pendukung. Pencari Informasi dapat menggunakan seluruh fitur publik tanpa akun, sedangkan Kurator menyusun konten dan Administrator meninjau konten sebelum ditayangkan sekaligus mengelola akun Kurator. PahamHukum tidak bertindak sebagai penasihat hukum resmi, melainkan sebagai penuntun langkah awal sebelum masyarakat berinteraksi dengan lembaga hukum formal.

## 1.3 Definisi, Istilah, dan Singkatan
Semua definisi dan singkatan yang digunakan dalam dokumen ini beserta penjelasannya.

Tabel 1.3. Definisi Istilah dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| **P/L** | Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu |
| **SKPL** | Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kebutuhan fungsional dan non-fungsional serta memetakan dalam Class Diagram (CD) untuk Perangkat Lunak terkait |
| **DPPL** | Singkatan dari Deskripsi Perancangan Perangkat Lunak, yaitu dokumen yang merinci rancangan dari SKPL dalam bentuk sequence diagram sebagai referensi saat implementasi Perangkat Lunak terkait |
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

## 1.4 Aturan Penomoran
Penomoran ID pada dokumen ini mengikuti pola yang sudah dipakai pada dokumen SKPL dan APL.

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| Kebutuhan Fungsional | KFXX | XX adalah nomor urut dari 01 hingga 44, mengikuti SKPL |
| Kebutuhan Non-Fungsional | KNFXX | XX adalah nomor urut dari 01 hingga 14, mengikuti SKPL |
| Aktor | AKTXX | XX adalah nomor urut dari 01 hingga 03, mengikuti SKPL |
| Use Case | UCXX | XX adalah nomor urut dari 01 hingga 09, mengikuti SKPL |
| Kelas | CXX | XX adalah nomor urut dari 01 hingga 29, mengikuti SKPL |

## 1.5 Referensi
1. K01_G07_SKPL, Spesifikasi Kebutuhan Perangkat Lunak (SKPL) PahamHukum, IF2150 Rekayasa Perangkat Lunak, Institut Teknologi Bandung, 2026
2. K01_G07_APL, Arsitektur Perangkat Lunak (APL) PahamHukum, IF2150 Rekayasa Perangkat Lunak, Institut Teknologi Bandung, 2026
3. PlantUML, “Sequence Diagram syntax and features,” PlantUML.com. Tersedia: https://plantuml.com/sequence-diagram
4. Object Management Group, “Unified Modeling Language (UML), Version 2.5.1,” OMG Document formal/2017-12-05, Des. 2017. Tersedia: https://www.omg.org/spec/UML/2.5.1/

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Dokumen DPPL ini terdiri atas lima bab. BAB 1 menjelaskan tujuan penulisan, lingkup masalah, definisi istilah, aturan penomoran, dan referensi. BAB 2 memaparkan perancangan arsitektur, yaitu lingkungan implementasi, pola arsitektur MVC, identifikasi komponen, dan model arsitektur dari dokumen APL. BAB 3 menjabarkan realisasi setiap *use case* melalui identifikasi kelas, sequence diagram untuk skenario normal dan alternatif, serta diagram kelas per *use case*. BAB 4 menyajikan diagram kelas keseluruhan beserta daftar atribut dan metodenya. Terakhir, BAB 5 memuat tabel *traceability* yang memetakan kelas terhadap *use case* terkait.

<br>

---

# BAB 2: Perancangan Arsitektur

## 2.1 Rancangan Lingkungan Implementasi

Rancangan lingkungan implementasi perangkat lunak **PahamHukum** diturunkan dari spesifikasi lingkungan operasi pada subbab 2.5 dokumen SKPL serta Tabel 1.1 dokumen APL. Spesifikasi lingkungan operasi dan rincian lingkungan implementasi sistem disajikan pada Tabel 2.1.1 dan Tabel 2.1.2.

Tabel 2.1.1. Lingkungan Operasi Perangkat Lunak

| Komponen | Spesifikasi |
| :--- | :--- |
| Server | Web server pada layanan *cloud hosting* gratis atau berbiaya rendah dengan dukungan HTTPS |
| Client | Peramban Chrome, Firefox, Edge, atau Safari (versi rilis dua tahun terakhir) di komputer maupun ponsel |
| DBMS | Basis data relasional (PostgreSQL atau MySQL) untuk data akun, bidang hukum, kelompok kasus, konten, dan riwayat perubahan status |
| Penyimpanan Berkas | Penyimpanan di sisi server untuk templat PDF dan DOCX |
| OS | Tidak bergantung pada sistem operasi tertentu selama tersedia peramban yang didukung |
| Jaringan | Koneksi internet minimal 1 Mbps agar beranda termuat paling lama 3 detik |

Tabel 2.1.2. Spesifikasi Rancangan Lingkungan Implementasi

| Aspek Lingkungan | Spesifikasi Implementasi | Keterangan |
| :--- | :--- | :--- |
| ***Operating System*** | **Sisi Server:** Linux (Ubuntu Server / Debian pada layanan *cloud hosting*)<br>**Sisi Klien:** Lintas sistem operasi (*cross-platform*: Windows, macOS, Linux, Android, iOS)<br>**Sisi Pengembangan:** Windows, macOS, atau Linux | Pengguna tidak bergantung pada sistem operasi tertentu selama menggunakan peramban web rilis dua tahun terakhir (Chrome, Firefox, Edge, atau Safari) dengan lebar layar minimal 360 piksel (KNF03). |
| **DBMS** | PostgreSQL atau MySQL (Basis Data Relasional) | Menyimpan seluruh entitas *Model* secara persisten, meliputi data otorisasi (`Akun`, `Kurator`, `Administrator`), struktur katalog (`BidangHukum`, `KelompokKasus`), konten hukum (`RangkumanKasus`, `LangkahPenyelesaian`, `Checklist`, `TemplatDokumen`, `Artikel`, `LembagaBantuanHukum`), serta log permanen (`RiwayatStatus` sesuai KNF09). |
| ***Development Tools*** | - **IDE / Code Editor:** Visual Studio Code<br>- **Version Control:** Git dan GitHub<br>- **Pemodelan UML & Desain:** PlantUML, Draw.io, dan StarUML<br>- **Pengujian & Inspeksi:** Browser Developer Tools (Chrome/Firefox DevTools) | Digunakan untuk penulisan kode sumber, kolaborasi repositori kelompok, penyusunan diagram arsitektur dan *sequence/class diagram*, serta pengujian responsivitas antarmuka dan efisiensi ukuran halaman ($\le$ 350 KB pada KNF02). |
| ***Filing System*** | - **Sisi Server:** Sistem berkas direktori server (*Server-side File System*)<br>- **Sisi Klien:** *Browser Local Storage* (*Web Storage API*) | Sistem berkas server menyimpan berkas fisik templat dokumen berformat `.pdf` dan `.docx` (maksimal 5 MB sesuai KF26) dengan dukungan *rollback* versi (KNF08). *Local Storage* peramban menyimpan status centang *checklist* secara lokal di perangkat pengguna tanpa pernah dikirim ke server (KF14, KNF06). |
| **Bahasa Pemrograman** | - **Sisi Klien (*Front-End / View*):** HTML5, CSS3, dan JavaScript / TypeScript<br>- **Sisi Server (*Back-End / Controller & Model*):** Python / Node.js (TypeScript/JavaScript) dengan *hash* *bcrypt* (*cost factor* $\ge$ 10 sesuai KNF10)<br>- **Basis Data:** SQL (*Structured Query Language*) | HTML5, CSS3, dan JavaScript merender antarmuka publik dan panel pengelola (termasuk *single-page form* KNF12, peninjauan satu layar KNF13, dan manipulasi `localStorage`). Bahasa sisi server menjalankan logika *Controller* dan *Model* dalam satu proses aplikasi, sedangkan SQL mengelola kueri pada DBMS relasional. |

PahamHukum berjalan sebagai aplikasi web yang dilayani dari satu web server pada *cloud hosting* gratis atau berbiaya rendah. Kondisi ini selaras dengan pola arsitektur MVC karena *Model*, *View*, dan *Controller* dapat dipasang dalam satu proses aplikasi tanpa layanan tambahan. Klien yang beragam (berbeda perangkat, peramban, dan sistem operasi) hanya menerima *View* yang dirender oleh server, sehingga perbedaan perangkat cukup ditangani di lapisan *View*. DBMS relasional dan penyimpanan berkas di sisi server hanya diakses melalui *Model*, sehingga *View* tidak pernah menyentuh data secara langsung dan pergantian antara PostgreSQL atau MySQL tidak memengaruhi *Controller* maupun *View*. Selain itu, batas koneksi minimal 1 Mbps dengan target pemuatan beranda paling lama 3 detik (KNF01) menuntut halaman yang ringan; pemisahan *View* dari logika bisnis memudahkan ukuran halaman dijaga tetap kecil karena *Controller* hanya mengambil data yang diperlukan.

---

## 2.2 Style/Pattern Arsitektur Acuan

Untuk **PahamHukum**, *pattern* arsitektur yang dipilih sebagai acuan adalah **Model-View-Controller (MVC)**. *Pattern* ini memisahkan sistem menjadi tiga bagian dengan tanggung jawab yang berbeda, yaitu *Model*, *View*, dan *Controller*. Pemisahan tersebut bertujuan agar perubahan di satu bagian tidak menuntut perombakan menyeluruh pada bagian lainnya. Adapun pembagian tanggung jawabnya adalah sebagai berikut:

1. **Model**  
   Komponen **Model** adalah bagian yang merepresentasikan data dan cara data tersebut dikelola. *Model* memiliki aturan untuk menjaga data, cara data disimpan, dan cara data diambil oleh komponen lain. Pada PahamHukum, **Model** merepresentasikan struktur data konten dan pengelola sistem yang terdiri atas 12 *entity*, yaitu data konten (`BidangHukum`, `KelompokKasus`, `RangkumanKasus`, `LangkahPenyelesaian`, `Checklist`, `TemplatDokumen`, `Artikel`, `LembagaBantuanHukum`), data otorisasi pengguna (`Akun`, `Kurator`, `Administrator`), serta riwayat perubahan status (`RiwayatStatus`).

2. **View**  
   Komponen **View** bertanggung jawab menampilkan antarmuka sistem yang dapat langsung dilihat oleh pengguna sekaligus menerima masukan dari interaksi pengguna. Namun, **View** tidak mengambil data langsung dari *database* atau memutuskan kelayakan konten. **View** hanya menerima data yang diberikan *Controller* dan meneruskan interaksi pengguna kembali ke *Controller*. Pada PahamHukum, **View** terbagi menjadi dua kelompok antarmuka utama:
   - **Antarmuka Publik**: Menampilkan beranda penelusuran bidang hukum, hasil pencarian pengguna, serta halaman rangkuman kasus yang memuat penjelasan, hak, langkah-langkah, *checklist* dokumen, dan tombol unduh templat surat.
   - **Antarmuka Pengelola**: Menyediakan halaman *login*, formulir penyusunan konten bagi Kurator, antrean peninjauan konten bagi Administrator, serta halaman pengelolaan akun Kurator.

   Seluruh komponen **View** diturunkan dari kelas-kelas *Boundary* pada dokumen SKPL (BAB 5).

3. **Controller**  
   Komponen **Controller** adalah penghubung antara *View* dan *Model*. Komponen ini menerima permintaan dari *View*, memvalidasi masukan, lalu memanggil *Model* untuk mengambil atau mengubah data. Setelah itu, *Controller* memilih *View* yang harus ditampilkan atau menentukan pesan spesifik yang perlu diberikan. Contoh dalam skenario *login* akun: *View* mengirimkan permintaan ke **Controller** untuk memeriksa kombinasi email dan kata sandi. **Controller** kemudian meminta *Model* memverifikasi data tersebut. Jika benar, **Controller** mengarahkan pengguna ke *View* halaman sesuai perannya; jika salah, **Controller** menampilkan kembali *View* halaman *login* dengan pesan kesalahan. Pada PahamHukum, **Controller** menangani alur penelusuran, pencarian, pengelolaan sesi *login* dan *logout*, interaksi pengguna dengan *checklist*, pengunduhan templat dokumen, hingga alur peninjauan dan perubahan status konten.

### Alasan Pemilihan Arsitektur MVC

1. **Keterlacakan dengan pemodelan kelas *Entity, Control, Boundary* pada SKPL**  
   Pada BAB 5 SKPL, PahamHukum telah dimodelkan menjadi 29 kelas yang terbagi menjadi *Entity*, *Control*, dan *Boundary*. Struktur tersebut berpadanan langsung dengan MVC:
   - 8 kelas *Boundary* dipetakan menjadi komponen *View*.
   - 9 kelas *Control* dipetakan menjadi komponen *Controller*.
   - 12 kelas *Entity* dipetakan menjadi komponen *Model*.  
   Dengan memilih MVC, rantai keterlacakan dari kebutuhan awal, *use case*, hingga rancangan kelas tetap terjaga tanpa perombakan ulang.

2. **Dukungan terhadap dua kelompok antarmuka berbeda**  
   Sistem PahamHukum melayani tiga aktor dengan kebutuhan yang kontras. Pencari Informasi mengakses antarmuka publik tanpa akun, sedangkan Kurator dan Administrator mengakses panel pengelola yang membutuhkan autentikasi dan manipulasi data. Pola MVC memungkinkan entitas data yang sama (misalnya `RangkumanKasus` dan `RiwayatStatus`) disajikan ke dalam antarmuka publik maupun antarmuka pengelola melalui *View* yang terpisah, tanpa duplikasi atau perubahan logika bisnis pada *Model*.

3. **Penegakan alur status konten yang terkendali**  
   Konten melewati siklus `Draft` $\rightarrow$ `Diajukan` $\rightarrow$ `Disetujui` atau `Perlu Revisi`, dan publik hanya dapat melihat konten berstatus `Disetujui`. *Controller* yang mengatur penyusunan dan moderasi konten bertugas memvalidasi hak akses dan status konten sebelum mengubah data di *Model*, lalu mencatat perubahannya secara permanen di `RiwayatStatus` sesuai KNF09.

4. **Menjaga pemisahan antara aturan domain dan tampilan**  
   Perubahan di sisi antarmuka atau *View* tidak boleh melangkahi aturan seperti urutan status pengajuan konten dan pencatatan riwayat. Konten yang belum disetujui tidak boleh muncul ke halaman utama. Dengan MVC, aturan-aturan ini berada pada *Model* dan dikawal oleh *Controller*, sementara *View* hanya menampilkan data sehingga risiko rusaknya aturan bisnis saat tampilan berubah dapat diminimalkan.

5. **Mendukung penggunaan ulang komponen tampilan di antarmuka**  
   Halaman Jelajah, Rangkuman, dan Pencarian memakai komponen tampilan yang serupa untuk menampilkan konten dengan sumber data dan aksi yang berbeda. *View* yang sama dapat dipakai oleh beberapa *Controller* dan *Model* tanpa duplikasi. Sebaliknya, satu *Model* seperti `RangkumanKasus` dapat ditampilkan melalui beberapa *View* tanpa mengubah *Model*-nya.

6. **Mendukung pemenuhan Kebutuhan Non-Fungsional (KNF) PahamHukum**  
   - **KNF09** menetapkan bahwa riwayat perubahan status konten bersifat permanen dan tidak dapat diubah; aturan ini ditempatkan di bagian *Model* tepatnya pada entitas `RiwayatStatus`.
   - **KNF14** menetapkan bahwa sesi pengelola harus berakhir otomatis setelah 30 menit tanpa aktivitas; aturan pengelolaan sesi tersebut ditempatkan pada *Controller* (`KontrolAutentikasi`).
   - **KNF12** dan **KNF13** menuntut formulir penyusunan konten berada dalam satu halaman dan peninjauan konten berada dalam satu layar; keduanya diselesaikan di lapisan *View* tanpa mengganggu komponen lain.

<p align="center">
<img alt="Arsitektur MVC pada Sistem PahamHukum" src="./assets/diagram/arsitektur-mvc-pahamhukum.svg" width="75%">
</p>
<p align="center">
<i>Gambar 2.2.1 Arsitektur MVC pada Sistem PahamHukum</i>
</p>

---

## 2.3 Identifikasi Komponen / Modul / Subsistem

Komponen pada PahamHukum diidentifikasi berdasarkan pola *Model-View-Controller* (MVC) yang telah ditetapkan pada subbab 2.2. Setiap komponen dikelompokkan menurut lapisan arsitektur, yaitu *View*, *Controller*, dan *Model*, ditambah komponen *Penyimpanan Data*. Komponen `Database` dan `Penyimpanan Berkas` berasal dari lingkungan operasi pada Tabel 2.1.1, sedangkan `Penyimpanan Lokal Peramban` berasal dari KF14 dan KNF06 pada dokumen SKPL. Kelas *Boundary* pada dokumen SKPL menjadi komponen *View*, kelas *Control* menjadi komponen *Controller*, dan kelas *Entity* menjadi komponen *Model*. Dengan demikian, seluruh 29 kelas pada SKPL tercakup oleh komponen pada Tabel 2.3, dan seluruh *use case* UC01 sampai UC09 dapat dijalankan oleh komponen-komponen tersebut.

Tabel 2.3. Identifikasi Komponen/Modul/Subsistem

| Nama Komponen/Modul/Subsistem | Jenis | Penjelasan |
| :--- | :--- | :--- |
| `HalamanJelajahKasus` | *View* | Menampilkan beranda berisi bidang hukum dan kelompok kasus, serta peringatan prioritas untuk kasus darurat, lalu meneruskan pilihan pengguna ke `KontrolJelajahKasus`. |
| `HalamanRangkumanKasus` | *View* | Menampilkan satu rangkuman kasus lengkap (langkah, *checklist*, templat, artikel, direktori LBH) beserta status centang *checklist*, meneruskan permintaan centang *checklist* ke `KontrolChecklist`, serta meneruskan aksi unduh templat ke `KontrolUnduhTemplat`. |
| `HalamanPencarianKataKunci` | *View* | Menampilkan kolom pencarian, daftar hasil, dan pesan serta saran jika kasus tidak ditemukan, lalu meneruskan kata kunci ke `KontrolPencarianKataKunci`. |
| `HalamanLogin` | *View* | Menampilkan formulir *login* pengelola beserta pesan galat dan meneruskan kredensial ke `KontrolAutentikasi`. |
| `HalamanPenyusunanKonten` | *View* | Menampilkan formulir penyusunan konten satu halaman bagi Kurator dan meneruskan aksi simpan draf, unggah templat, dan ajukan ke `KontrolPenyusunanKonten`. |
| `HalamanDaftarKontenKurator` | *View* | Menampilkan daftar konten milik Kurator beserta status dan catatan revisinya, lalu meneruskan pilihan konten ke `KontrolPelacakanKonten`. |
| `HalamanModerasiKonten` | *View* | Menampilkan antrean dan isi konten untuk Administrator beserta tombol Setujui dan Kembalikan pada layar yang sama, lalu meneruskan keputusan ke `KontrolModerasiKonten`. |
| `HalamanPengelolaanAkun` | *View* | Menampilkan daftar Kurator dan formulir pendaftaran, pembaruan, serta penonaktifan akun bagi Administrator, lalu meneruskan aksinya ke `KontrolPengelolaanAkun`. |
| `KontrolJelajahKasus` | *Controller* | Mengatur alur penampilan bidang hukum, kelompok kasus, rangkuman kasus, dan direktori LBH. |
| `KontrolPencarianKataKunci` | *Controller* | Memproses kata kunci, mengambil hasil yang relevan, dan menyarankan bidang lain jika kasus tidak ditemukan. |
| `KontrolChecklist` | *Controller* | Mengambil *checklist* rangkuman, menghitung kelengkapan dokumen yang dicentang, serta menyimpan dan memuat status centang pada `Penyimpanan Lokal Peramban`. |
| `KontrolUnduhTemplat` | *Controller* | Menyediakan daftar dan berkas templat versi terbaru untuk diunduh. |
| `KontrolAutentikasi` | *Controller* | Memeriksa kredensial akun, mengarahkan pengguna sesuai perannya, serta mengakhiri sesi saat keluar atau kedaluwarsa (30 menit tanpa aktivitas). |
| `KontrolPenyusunanKonten` | *Controller* | Mengatur pembuatan draf, pelampiran templat, validasi isian, dan pengajuan konten (`Draft` menjadi `Diajukan`), serta mencatat riwayat statusnya. |
| `KontrolPelacakanKonten` | *Controller* | Mengambil daftar konten milik Kurator dan catatan revisinya. |
| `KontrolModerasiKonten` | *Controller* | Mengatur persetujuan dan pengembalian konten oleh Administrator, mewajibkan alasan revisi, dan mencatat riwayat status ke `RiwayatStatus`. |
| `KontrolPengelolaanAkun` | *Controller* | Mengatur pendaftaran, pembaruan, dan penonaktifan akun Kurator. |
| `Akun` | *Model* | Merepresentasikan data akun pengelola (email, kata sandi ter-*hash*, peran) serta metode untuk memverifikasi dan mengubahnya. |
| `Kurator` | *Model* | Merepresentasikan akun Kurator (status aktif dan jumlah konten) serta metode untuk mengakses dan mengubahnya, turunan `Akun`. |
| `Administrator` | *Model* | Merepresentasikan akun Administrator beserta daftar Kurator yang dikelolanya, turunan `Akun`. |
| `BidangHukum` | *Model* | Merepresentasikan bidang hukum beserta status aktif dan kelompok kasus di bawahnya serta metode untuk mengakses dan mengubahnya. |
| `KelompokKasus` | *Model* | Merepresentasikan satu jenis kasus (judul sehari-hari, istilah resmi, penanda darurat) serta metode pencocokan kata kunci. |
| `RangkumanKasus` | *Model* | Merepresentasikan isi rangkuman kasus beserta status, penulis, tanggal peninjauan, dan catatan revisi serta metode untuk mengakses dan mengubahnya. |
| `LangkahPenyelesaian` | *Model* | Merepresentasikan langkah bernomor beserta tujuan, dokumen yang diperlukan, dan tenggat. |
| `Checklist` | *Model* | Merepresentasikan daftar dokumen yang perlu disiapkan untuk suatu kasus. |
| `TemplatDokumen` | *Model* | Merepresentasikan berkas templat (format, ukuran, versi, tanggal pembaruan) serta validasi unggahan PDF/DOCX maksimal 5 MB. |
| `Artikel` | *Model* | Merepresentasikan artikel pendukung beserta tautan ke sumber hukum resmi. |
| `LembagaBantuanHukum` | *Model* | Merepresentasikan direktori LBH beserta wilayah layanannya. |
| `RiwayatStatus` | *Model* | Merepresentasikan catatan perubahan status konten (konten, pelaku, status, waktu) yang bersifat permanen dan tidak dapat diubah (KNF09). |
| `Database` | *Penyimpanan Data* | Menyimpan seluruh data *Model* secara persisten pada DBMS relasional (PostgreSQL atau MySQL). |
| `Penyimpanan Berkas` | *Penyimpanan Data* | Menyimpan berkas templat PDF dan DOCX di sisi server. |
| `Penyimpanan Lokal Peramban` | *Penyimpanan Data* | Menyimpan status centang *checklist* di perangkat pengguna dan tidak pernah dikirim ke server (KNF06). |

---

## 2.4 Model Arsitektur Perangkat Lunak

Model arsitektur perangkat lunak PahamHukum disajikan dalam dua *view* yang saling melengkapi, yaitu ***Logical View*** untuk menggambarkan struktur logis dan kolaborasi antarkomponen berdasarkan pola MVC, serta ***Physical View*** untuk menggambarkan penempatan (*deployment*) komponen pada node perangkat keras dan lingkungan eksekusinya.

### 2.4.1 Logical View

Model arsitektur perangkat lunak yang dipilih untuk PahamHukum adalah **Model-View-Controller (MVC)** yang divisualisasikan melalui ***Logical View***. *Logical View* mendeskripsikan abstraksi komponen utama sistem dan hubungannya secara statis untuk mendukung pemenuhan kebutuhan fungsional bisnis. Model arsitektur ini cocok untuk aplikasi PahamHukum karena PahamHukum memiliki antarmuka yang berbeda antara pengguna publik dan panel pengelola. MVC memungkinkan tampilan (*View*) dipisah dari alur dan validasi (*Controller*) serta aturan dan data (*Model*) sehingga perubahan tampilan di masa depan tidak merusak aturan atau status konten. *Logical View* dipilih karena memperlihatkan pembagian tanggung jawab *View*, *Controller*, dan *Model* serta arah panggilan antarkomponen secara menyeluruh.

<p align="center">
<img alt="Logical View pada Sistem PahamHukum berbasis Pola MVC" src="./assets/diagram/logical-view-pahamhukum.svg" width="100%">
</p>
<p align="center">
<i>Gambar 2.4.1 Logical View pada Sistem PahamHukum berbasis Pola MVC</i>
</p>

#### Penjelasan Komponen dan Label Relasi

Diagram pada Gambar 2.4.1 memetakan ke-32 komponen yang terdaftar pada Tabel 2.3 ke dalam tiga lapisan utama MVC beserta subsistem penyimpanannya:

1. **View**  
   Terdiri atas 8 komponen antarmuka yang melayani interaksi langsung dengan pengguna (mulai dari `HalamanJelajahKasus`, `HalamanRangkumanKasus`, `HalamanPencarianKataKunci` untuk pengguna publik anonim, hingga antarmuka pengelolaan konten dan akun untuk Administrator dan Kurator).

2. **Controller**  
   Terdiri atas 9 komponen pengendali yang mengoordinasikan interaksi antara *View* dan *Model*. *Controller* bertanggung jawab memvalidasi setiap *event* dari pengguna (misalnya verifikasi otorisasi pada `KontrolAutentikasi` atau penyetujuan pada `KontrolModerasiKonten`) sebelum mengizinkan pemanggilan operasi ke *Model*.

3. **Model**  
   Terdiri atas 12 komponen entitas yang menyimpan struktur data hukum dan pengguna sistem. Komponen `RiwayatStatus` diisolasi guna memenuhi perlindungan KNF09, yaitu riwayat perubahan status tidak boleh dimanipulasi atau diubah setelah dibuat.

4. **Penyimpanan Data**  
   Terdiri atas `Database` dan `Penyimpanan Berkas` yang berada di server, serta komponen khusus `Penyimpanan Lokal Peramban` (di sisi klien). `Penyimpanan Lokal Peramban` digunakan oleh `KontrolChecklist` dan `HalamanRangkumanKasus` untuk mempertahankan daftar persiapan dokumen pengguna secara anonim. `Sumber Hukum Resmi` digambar sebagai sistem eksternal di luar ruang lingkup komponen Tabel 2.3.

**Keterangan Relasi (Label Panah):**
- **memanggil:** Aksi dari *View* yang meneruskan interaksi pengguna ke *Controller* terkait.
- **akses:** Aksi dari *Controller* untuk menerapkan logika bisnis terhadap *Model* (mengambil, mengubah, atau menghapus data).
- **komposisi / agregasi:** Relasi kepemilikan struktural antar-*Model*. Komponen bagian (misalnya `Checklist`) terikat kuat (komposisi) atau terkait lepas (agregasi) dengan entitas induknya (misalnya `RangkumanKasus`).
- **asosiasi:** Keterkaitan operasional spesifik berarah, dengan peranannya dituliskan langsung di atas garis (contoh: "menulis", "diubah oleh").
- **generalisasi:** Pewarisan atribut dan metode dari *Model* spesifik (`Kurator`, `Administrator`) ke *Model* umum (`Akun`).
- **sistem eksternal:** Entitas di luar ruang lingkup PahamHukum (seperti JDIH/BPK) yang ditautkan melalui URL.

### 2.4.2 Physical View

Selain *Logical View* pada subbab 2.4.1, PahamHukum juga dimodelkan melalui ***Physical View*** (*deployment view*) agar lingkungan eksekusi perangkat lunak terlihat jelas. *Physical View* mendeskripsikan node tempat komponen berjalan atau tersimpan, *artifact* yang dipasang pada node tersebut, serta jalur jaringan antarnode. *View* ini dipilih sebagai pelengkap *Logical View* karena PahamHukum melayani klien yang beragam (lintas perangkat, peramban, dan sistem operasi, dengan koneksi yang bervariasi sesuai batasan pada subbab 2.4 SKPL), sehingga penting menunjukkan secara eksplisit di mana data disimpan: di peramban klien (sementara dan anonim untuk *checklist*) atau di server (persisten untuk seluruh data lain).

Diagram digambar dengan notasi *UML Deployment Diagram*: node berstereotip `«Device»` dengan nama instans `:NamaNode`, lingkungan eksekusi di dalam node (`«Execution Environment»`, `«Database System»`, `«File System»`) digambar abu-abu sebagai perangkat lunak pihak ketiga, sedangkan setiap komponen pada Tabel 2.3 digambar sebagai `«artifact»` putih bergambar ikon komponen di luar node dan dihubungkan dengan panah putus-putus `«deploy»` ke lingkungan eksekusi tujuannya. Pemetaan ini langsung menggunakan lingkungan operasi pada Tabel 2.1.1, sehingga hubungan antara pilihan teknologi dan tempat dijalankannya pola MVC terlihat secara konkret.

<p align="center">
<img alt="Physical View pada Sistem PahamHukum" src="./assets/diagram/physical-view-pahamhukum.svg" width="100%">
</p>
<p align="center">
<i>Gambar 2.4.2 Physical View pada Sistem PahamHukum</i>
</p>

#### Pemetaan Node dan Artifact ke Lingkungan Operasi dan Komponen

Tabel 2.4.1. Pemetaan Node dan Artifact pada Physical View

| Node | Lingkungan Eksekusi (Pihak Ketiga) | Komponen Lingkungan (Tabel 2.1.1) | Artifact yang Dipasang (Tabel 2.3) |
| :--- | :--- | :--- | :--- |
| `:Perangkat Klien` `«Device»` | `:Peramban Web` `«Execution Environment»` | Client, OS | `:Penyimpanan Lokal Peramban` (status centang *checklist*, tidak dikirim ke server sesuai KNF06), serta instans sisi klien dari `:HalamanRangkumanKasus` dan `:KontrolChecklist` |
| `:Web Server` `«Device»` | `:Application Server` `«Execution Environment»` | Server | 8 *artifact* *View*, 9 *artifact* *Controller*, dan 12 *artifact* *Model* (total 29), dijalankan dalam satu proses aplikasi |
| | `:Sistem Berkas Server` `«File System»` | Penyimpanan Berkas | `:Penyimpanan Berkas` (templat PDF/DOCX) |
| `:Database Server` `«Device»` | `:PostgreSQL / MySQL` `«Database System»` | DBMS | `:Database` |
| `:Sumber Hukum Resmi` (garis putus-putus) | Tidak ada | Tidak ada | Sistem eksternal di luar PahamHukum (JDIH, peraturan.bpk.go.id); bukan komponen Tabel 2.3 |

`:HalamanRangkumanKasus` dan `:KontrolChecklist` dipasang pada **dua node**: instans di `:Web Server` menyusun halaman rangkuman dan mengambil isi *checklist* dari *Model*, sedangkan instans di `:Peramban Web` berjalan pada perangkat pengguna untuk memperbarui tampilan centang, menghitung kelengkapan dokumen, serta menyimpan dan memuat status centang di `:Penyimpanan Lokal Peramban` (UC03, KF13, KF14). Pemasangan ganda ini diperlukan karena KNF06 melarang status centang dikirim ke server.

#### Keterangan Jalur Komunikasi

Tabel 2.4.2. Keterangan Jalur Komunikasi pada Physical View

| Penghubung | Stereotype | Multiplisitas | Keterangan |
| :--- | :--- | :--- | :--- |
| `:Perangkat Klien` - `:Web Server` | `«internet»` `{HTTPS}` | n : 1 | Permintaan halaman dan pengiriman formulir. Terkait baris *Jaringan* Tabel 2.1.1 (minimal 1 Mbps, beranda termuat paling lama 3 detik). |
| `:Web Server` - `:Database Server` | `«intranet»` `{SQL}` | 1 : 1 | Kueri baca/tulis oleh lapisan *Model* ke `:Database`. |
| `:Perangkat Klien` - `:Sumber Hukum Resmi` | `«internet»` `{hyperlink}` | n : 1 | Dibuka langsung oleh peramban pengguna saat mengeklik rujukan pada `Artikel`, bukan panggilan dari Web Server. |

*Catatan:* `:Database Server` digambar sebagai node terpisah dari `:Web Server` karena DBMS pada Tabel 2.1.1 adalah layanan tersendiri. Jika pada implementasi basis data berada pada mesin yang sama dengan aplikasi, kedua node cukup digabung dan jalur `«intranet»` dihilangkan tanpa mengubah pemetaan *artifact*.

<br>

---


# BAB 3: Realisasi Use Case

## 3.1 Use Case Menelusuri dan Membaca Rangkuman Kasus

**ID Use Case:** UC01
**Nama Use Case:** Menelusuri dan Membaca Rangkuman Kasus

### 3.1.1 Identifikasi Kelas

Tabel 3.1. Identifikasi Kelas Use Case UC01

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanJelajahKasus` | C13 - `HalamanJelajahKasus` |
| 2 | `HalamanRangkumanKasus` | C14 - `HalamanRangkumanKasus` |
| 3 | `KontrolJelajahKasus` | C21 - `KontrolJelajahKasus` |
| 4 | `BidangHukum` | C04 - `BidangHukum` |
| 5 | `KelompokKasus` | C05 - `KelompokKasus` |
| 6 | `RangkumanKasus` | C06 - `RangkumanKasus` |
| 7 | `LangkahPenyelesaian` | C07 - `LangkahPenyelesaian` |
| 8 | `Checklist` | C08 - `Checklist` |
| 9 | `TemplatDokumen` | C09 - `TemplatDokumen` |
| 10 | `Artikel` | C10 - `Artikel` |
| 11 | `LembagaBantuanHukum` | C11 - `LembagaBantuanHukum` |

### 3.1.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC01 - Skenario Normal" src="./assets/diagram/SequenceDiagram_UC01_Skenario_Normal.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.1.1 Sequence Diagram UC01 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Kasus Ditandai Situasi Darurat**

<p align="center">
<img alt="Sequence Diagram UC01 - Kasus Ditandai Situasi Darurat" src="./assets/diagram/SequenceDiagram_UC01_Skenario_Alternatif%201.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.1.2 Sequence Diagram UC01 - Kasus Ditandai Situasi Darurat</i>
</p>

### 3.1.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Use Case UC01" src="./assets/diagram/ClassDiagram_UC01.svg" width="95%">
</p>
<p align="center">
<i>Gambar 3.1.3 Diagram Kelas Menelusuri dan Membaca Rangkuman Kasus (UC01)</i>
</p>

<br>

## 3.2 Use Case Mencari Kasus

**ID Use Case:** UC02
**Nama Use Case:** Mencari Kasus

### 3.2.1 Identifikasi Kelas

Tabel 3.2. Identifikasi Kelas Use Case UC02

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanPencarianKataKunci` | C15 - `HalamanPencarianKataKunci` |
| 2 | `KontrolPencarianKataKunci` | C22 - `KontrolPencarianKataKunci` |
| 3 | `BidangHukum` | C04 - `BidangHukum` |
| 4 | `KelompokKasus` | C05 - `KelompokKasus` |
| 5 | `RangkumanKasus` | C06 - `RangkumanKasus` |
| 6 | `LembagaBantuanHukum` | C11 - `LembagaBantuanHukum` |

### 3.2.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC02 - Skenario Normal" src="./assets/diagram/SequenceDiagram_UC02_Skenario_Normal.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.2.1 Sequence Diagram UC02 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Pencarian Tidak Menemukan Hasil**

<p align="center">
<img alt="Sequence Diagram UC02 - Pencarian Tidak Menemukan Hasil" src="./assets/diagram/SequenceDiagram_UC02_Skenario_Alternatif_1.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.2.2 Sequence Diagram UC02 - Pencarian Tidak Menemukan Hasil</i>
</p>

### 3.2.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Use Case UC02" src="./assets/diagram/ClassDiagram_UC02.svg" width="95%">
</p>
<p align="center">
<i>Gambar 3.2.3 Diagram Kelas Mencari Kasus (UC02)</i>
</p>

<br>

## 3.3 Use Case Menyiapkan Dokumen dengan *Checklist*

**ID Use Case:** UC03  
**Nama Use Case:** Menyiapkan Dokumen dengan *Checklist*

### 3.3.1 Identifikasi Kelas

Tabel 3.3. Identifikasi Kelas Use Case UC03

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanRangkumanKasus` | C14 - `HalamanRangkumanKasus` |
| 2 | `KontrolChecklist` | C23 - `KontrolChecklist` |
| 3 | `RangkumanKasus` | C06 - `RangkumanKasus` |
| 4 | `Checklist` | C08 - `Checklist` |

### 3.3.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC03 - Skenario Normal" src="./assets/diagram/SequenceDiagram_UC03_Normal.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.3.1 Sequence Diagram UC03 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Pengguna Memuat Ulang atau Membuka Kembali Halaman**

<p align="center">
<img alt="Sequence Diagram UC03 - Pengguna Memuat Ulang atau Membuka Kembali Halaman" src="./assets/diagram/SequenceDiagram_UC03_Alt1.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.3.2 Sequence Diagram UC03 - Pengguna Memuat Ulang atau Membuka Kembali Halaman</i>
</p>

### 3.3.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Use Case UC03" src="./assets/diagram/ClassDiagram_UC03.svg" width="95%">
</p>
<p align="center">
<i>Gambar 3.3.3 Diagram Kelas Menyiapkan Dokumen dengan Checklist (UC03)</i>
</p>

<br>

## 3.4 Use Case Mengunduh Templat Dokumen

**ID Use Case:** UC04  
**Nama Use Case:** Mengunduh Templat Dokumen

### 3.4.1 Identifikasi Kelas

Tabel 3.4. Identifikasi Kelas Use Case UC04

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanRangkumanKasus` | C14 - `HalamanRangkumanKasus` |
| 2 | `KontrolUnduhTemplat` | C24 - `KontrolUnduhTemplat` |
| 3 | `RangkumanKasus` | C06 - `RangkumanKasus` |
| 4 | `TemplatDokumen` | C09 - `TemplatDokumen` |

### 3.4.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC04 - Skenario Normal" src="./assets/diagram/SequenceDiagram_UC04_Normal.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.4.1 Sequence Diagram UC04 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Kasus Belum Memiliki Templat**

<p align="center">
<img alt="Sequence Diagram UC04 - Kasus Belum Memiliki Templat" src="./assets/diagram/SequenceDiagram_UC04_Alt1.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.4.2 Sequence Diagram UC04 - Kasus Belum Memiliki Templat</i>
</p>

### 3.4.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Use Case UC04" src="./assets/diagram/ClassDiagram_UC04.svg" width="95%">
</p>
<p align="center">
<i>Gambar 3.4.3 Diagram Kelas Mengunduh Templat Dokumen (UC04)</i>
</p>

<br>

## 3.5 Use Case Masuk dan Keluar Panel Pengelolaan

**ID Use Case:** UC05
**Nama Use Case:** Masuk dan Keluar Panel Pengelolaan

### 3.5.1 Identifikasi Kelas

Tabel 3.5. Identifikasi Kelas Use Case UC05

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanLogin` | C16 - `HalamanLogin` |
| 2 | `KontrolAutentikasi` | C25 - `KontrolAutentikasi` |
| 3 | `Akun` | C01 - `Akun` |
| 4 | `Kurator` | C02 - `Kurator` |
| 5 | `Administrator` | C03 - `Administrator` |

### 3.5.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC05 - Skenario Normal" src="./assets/diagram/SequenceDiagram_UC05_Normal.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.5.1 Sequence Diagram UC05 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Kredensial Salah**

<p align="center">
<img alt="Sequence Diagram UC05 - Kredensial Salah" src="./assets/diagram/SequenceDiagram_UC05_Alt1.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.5.2 Sequence Diagram UC05 - Kredensial Salah</i>
</p>

- **Skenario Alternatif 2: Akses Tanpa Sesi yang Sah**

<p align="center">
<img alt="Sequence Diagram UC05 - Akses Tanpa Sesi yang Sah" src="./assets/diagram/SequenceDiagram_UC05_Alt2.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.5.3 Sequence Diagram UC05 - Akses Tanpa Sesi yang Sah</i>
</p>

- **Skenario Alternatif 3: Mengakhiri Sesi Pengelolaan** (keluar atas permintaan pengguna dan sesi yang berakhir otomatis, digambarkan dengan fragmen `alt`)

<p align="center">
<img alt="Sequence Diagram UC05 - Mengakhiri Sesi Pengelolaan" src="./assets/diagram/SequenceDiagram_UC05_Alt3.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.5.4 Sequence Diagram UC05 - Mengakhiri Sesi Pengelolaan</i>
</p>

### 3.5.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Use Case UC05" src="./assets/diagram/ClassDiagram_UC05.svg" width="95%">
</p>
<p align="center">
<i>Gambar 3.5.5 Diagram Kelas Masuk dan Keluar Panel Pengelolaan (UC05)</i>
</p>

<br>

## 3.6 Use Case Mengelola Konten Rangkuman Kasus

**ID Use Case:** UC06
**Nama Use Case:** Mengelola Konten Rangkuman Kasus

### 3.6.1 Identifikasi Kelas

Tabel 3.6. Identifikasi Kelas Use Case UC06

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanPenyusunanKonten` | C17 - `HalamanPenyusunanKonten` |
| 2 | `KontrolPenyusunanKonten` | C26 - `KontrolPenyusunanKonten` |
| 3 | `Akun` | C01 - `Akun` |
| 4 | `Kurator` | C02 - `Kurator` |
| 5 | `RangkumanKasus` | C06 - `RangkumanKasus` |
| 6 | `LangkahPenyelesaian` | C07 - `LangkahPenyelesaian` |
| 7 | `Checklist` | C08 - `Checklist` |
| 8 | `TemplatDokumen` | C09 - `TemplatDokumen` |
| 9 | `Artikel` | C10 - `Artikel` |
| 10 | `RiwayatStatus` | C12 - `RiwayatStatus` |

### 3.6.2 Sequence Diagram

- **Skenario Normal** (termasuk Skenario Alternatif 1: Berkas Templat Tidak Valid dan Skenario Alternatif 2: Isian Wajib Belum Lengkap, yang digambarkan dengan fragmen `alt`)

<p align="center">
<img alt="Sequence Diagram UC06 - Skenario Normal, Alternatif 1, dan Alternatif 2" src="./assets/diagram/SeqDiagram_UC06_Normal_Alt1_Alt2.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.6.1 Sequence Diagram UC06 - Skenario Normal, Alternatif 1, dan Alternatif 2</i>
</p>

- **Skenario Alternatif 3: Kurator Mencoba Menayangkan Sendiri**

<p align="center">
<img alt="Sequence Diagram UC06 - Kurator Mencoba Menayangkan Sendiri" src="./assets/diagram/SeqDiagram_UC06_Alt3.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.6.2 Sequence Diagram UC06 - Kurator Mencoba Menayangkan Sendiri</i>
</p>

### 3.6.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Use Case UC06" src="./assets/diagram/ClassDiagram_UC06.svg" width="95%">
</p>
<p align="center">
<i>Gambar 3.6.3 Diagram Kelas Mengelola Konten Rangkuman Kasus (UC06)</i>
</p>

<br>

## 3.7 Use Case Memantau Status dan Revisi Konten

**ID Use Case:** UC07  
**Nama Use Case:** Memantau Status dan Revisi Konten

### 3.7.1 Identifikasi Kelas

Tabel 3.7. Identifikasi Kelas Use Case UC07

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanDaftarKontenKurator` | C18 - `HalamanDaftarKontenKurator` |
| 2 | `KontrolPelacakanKonten` | C27 - `KontrolPelacakanKonten` |
| 3 | `Kurator` | C02 - `Kurator` |
| 4 | `RangkumanKasus` | C06 - `RangkumanKasus` |

### 3.7.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC07 - Skenario Normal" src="./assets/diagram/SequenceDiagram_UC07_Normal.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.7.1 Sequence Diagram UC07 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Konten Berstatus Perlu Revisi**

<p align="center">
<img alt="Sequence Diagram UC07 - Skenario Alternatif 1: Konten Berstatus Perlu Revisi" src="./assets/diagram/SequenceDiagram_UC07_Alt1.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.7.2 Sequence Diagram UC07 - Skenario Alternatif 1: Konten Berstatus Perlu Revisi</i>
</p>

### 3.7.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas UC07" src="./assets/diagram/ClassDiagram_UC07.svg" width="95%">
</p>
<p align="center">
<i>Gambar 3.7.3 Diagram Kelas Memantau Status dan Revisi Konten (UC07)</i>
</p>

<br>

## 3.8 Use Case Meninjau dan Memutuskan Konten

**ID Use Case:** UC08  
**Nama Use Case:** Meninjau dan Memutuskan Konten

### 3.8.1 Identifikasi Kelas

Tabel 3.8. Identifikasi Kelas Use Case UC08

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanModerasiKonten` | C19 - `HalamanModerasiKonten` |
| 2 | `KontrolModerasiKonten` | C28 - `KontrolModerasiKonten` |
| 3 | `Akun` | C01 - `Akun` |
| 4 | `Administrator` | C03 - `Administrator` |
| 5 | `RangkumanKasus` | C06 - `RangkumanKasus` |
| 6 | `RiwayatStatus` | C12 - `RiwayatStatus` |

### 3.8.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC08 - Skenario Normal" src="./assets/diagram/SequenceDiagram_UC08_Normal.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.8.1 Sequence Diagram UC08 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Konten Dikembalikan dengan Catatan Revisi**

<p align="center">
<img alt="Sequence Diagram UC08 - Skenario Alternatif 1: Konten Dikembalikan dengan Catatan Revisi" src="./assets/diagram/SequenceDiagram_UC08_Alt1.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.8.2 Sequence Diagram UC08 - Skenario Alternatif 1: Konten Dikembalikan dengan Catatan Revisi</i>
</p>

- **Skenario Alternatif 2: Alasan Revisi Dikosongkan**

<p align="center">
<img alt="Sequence Diagram UC08 - Skenario Alternatif 2: Alasan Revisi Dikosongkan" src="./assets/diagram/SequenceDiagram_UC08_Alt2.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.8.3 Sequence Diagram UC08 - Skenario Alternatif 2: Alasan Revisi Dikosongkan</i>
</p>

### 3.8.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas UC08" src="./assets/diagram/ClassDiagram_UC08.svg" width="95%">
</p>
<p align="center">
<i>Gambar 3.8.4 Diagram Kelas Meninjau dan Memutuskan Konten (UC08)</i>
</p>

<br>

## 3.9 Use Case Mengelola Akun Kurator

**ID Use Case:** UC09
**Nama Use Case:** Mengelola Akun Kurator

### 3.9.1 Identifikasi Kelas

Tabel 3.9. Identifikasi Kelas Use Case UC09

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | `HalamanPengelolaanAkun` | C20 - `HalamanPengelolaanAkun` |
| 2 | `KontrolPengelolaanAkun` | C29 - `KontrolPengelolaanAkun` |
| 3 | `KontrolAutentikasi` | C25 - `KontrolAutentikasi` |
| 4 | `Akun` | C01 - `Akun` |
| 5 | `Kurator` | C02 - `Kurator` |
| 6 | `Administrator` | C03 - `Administrator` |

### 3.9.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC09 - Skenario Normal" src="./assets/diagram/SequenceDiagram_UC09_Normal.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.9.1 Sequence Diagram UC09 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Penonaktifan Akun Kurator**

<p align="center">
<img alt="Sequence Diagram UC09 - Penonaktifan Akun Kurator" src="./assets/diagram/SequenceDiagram_UC09_Alt1.svg" width="85%">
</p>
<p align="center">
<i>Gambar 3.9.2 Sequence Diagram UC09 - Penonaktifan Akun Kurator</i>
</p>

### 3.9.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Use Case UC09" src="./assets/diagram/ClassDiagram_UC09.svg" width="95%">
</p>
<p align="center">
<i>Gambar 3.9.3 Diagram Kelas Mengelola Akun Kurator (UC09)</i>
</p>

<br>

---

# BAB 4: Diagram Kelas Keseluruhan

## 4.1 Diagram Kelas

Realisasi sembilan *use case* pada BAB 3 menghasilkan 29 kelas perancangan. Penamaan dan penomoran kelas mengikuti BAB 5 dokumen SKPL, sedangkan atribut, metode, tipe data, dan visibilitasnya dirinci di sini agar siap diimplementasikan. Pemetaan ke lapisan MVC mengikuti ketetapan pada subbab 2.2, yaitu delapan kelas *boundary* menjadi *View*, sembilan kelas *control* menjadi *Controller*, dan dua belas kelas *entity* menjadi *Model*.

Diagram pada Gambar 4.1 menyatukan seluruh kelas tersebut beserta relasinya. Panah asosiasi dari *View* ke *Controller* menunjukkan bahwa setiap halaman hanya memanggil pengendalinya sendiri, sedangkan panah dependensi dari *Controller* ke *Model* menegaskan bahwa data hanya disentuh melalui lapisan *Model*. Tidak ada satu pun relasi langsung dari *View* ke *Model*, sehingga pemisahan tanggung jawab yang dijanjikan pola MVC tetap terjaga pada tingkat rancangan kelas.

<p align="center">
<img alt="Diagram Kelas Perancangan Keseluruhan PahamHukum" src="./assets/diagram/ClassDiagram_Full.svg" width="100%">
</p>
<p align="center">
<i>Gambar 4.1. Diagram Kelas Perancangan Keseluruhan PahamHukum</i>
</p>

Relasi antarkelas *entity* membentuk satu rantai komposisi yang berpusat pada `RangkumanKasus`. Satu `BidangHukum` menaungi beberapa `KelompokKasus`, dan tiap kelompok memiliki tepat satu `RangkumanKasus`. Rangkuman itulah yang memiliki `LangkahPenyelesaian`, `Checklist`, `TemplatDokumen`, `Artikel`, dan `RiwayatStatus`. Karena relasinya komposisi, penghapusan sebuah rangkuman ikut menghapus seluruh bagian di bawahnya. Di sisi pengelola, `Kurator` dan `Administrator` merupakan turunan `Akun`, sehingga email, kata sandi, dan peran cukup disimpan satu kali pada kelas induk.

Tabel 4.1 merinci atribut dan metode seluruh kelas. Daftar ini menggantikan tabel per kelas pada BAB 3, sebagaimana disebut pada subbab 3.1.3.

Tabel 4.1. Daftar Kelas Perancangan Keseluruhan

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C01 | `Akun` | - idAkun: int<br>- email: string<br>- kataSandiHash: string<br>- peran: string | + {static} cariAkun(email: string): Akun<br>+ cocokkanKataSandi(kataSandi: string): bool<br>- hashKataSandi(kataSandi: string): string<br>+ ambilPeran(): string<br>+ perbaruiEmail(emailBaru: string): void |
| C02 | `Kurator` | - jumlahKonten: int<br>- statusAktif: bool<br>- idAdministrator: int<br>(serta atribut warisan Akun) | + cekAktif(): bool<br>+ tambahJumlahKonten(): void<br>+ nonaktifkan(): void |
| C03 | `Administrator` | (mewarisi atribut Akun) | + ambilKuratorTerdaftar(): Kurator [0..\*] |
| C04 | `BidangHukum` | - idBidang: int<br>- nama: string<br>- jumlahKelompokKasus: int<br>- statusAktif: bool | + ambilDaftarKelompok(): KelompokKasus [1..\*]<br>+ cekAktif(): bool |
| C05 | `KelompokKasus` | - idKelompok: int<br>- idBidang: int<br>- judulUmum: string<br>- istilahResmi: string<br>- penandaDarurat: bool | + ambilRangkuman(): RangkumanKasus<br>+ cekDarurat(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool |
| C06 | `RangkumanKasus` | - idRangkuman: int<br>- idKelompok: int<br>- idKurator: int<br>- intiMasalah: string<br>- hak: string<br>- poinPertimbangan: string<br>- status: string<br>- namaPenulis: string<br>- tanggalPeninjauan: date<br>- catatanRevisi: string | + cekDisetujui(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool<br>+ ambilChecklist(): Checklist<br>+ ambilDaftarTemplat(): TemplatDokumen [0..\*]<br>+ ambilTemplat(idTemplat: int): TemplatDokumen<br>+ lampirkanTemplat(berkas: file): void<br>+ simpanDraf(): void<br>+ cekIsianLengkap(): bool<br>+ aturStatus(statusBaru: string): void<br>+ ambilCatatanRevisi(): string<br>+ simpanCatatanRevisi(catatan: string): void |
| C07 | `LangkahPenyelesaian` | - idLangkah: int<br>- idRangkuman: int<br>- nomor: int<br>- deskripsi: string<br>- tujuan: string<br>- dokumenDiperlukan: string [1..\*]<br>- tenggat: date [0..1] | + punyaTenggat(): bool |
| C08 | `Checklist` | - idChecklist: int<br>- idRangkuman: int<br>- daftarDokumen: string [1..\*] | + hitungJumlahDokumen(): int |
| C09 | `TemplatDokumen` | - idTemplat: int<br>- idRangkuman: int<br>- namaBerkas: string<br>- format: string<br>- ukuran: int<br>- versi: string<br>- tanggalPembaruan: date | + unduh(): file<br>+ perbaruiVersi(berkas: file): void<br>- validasiUnggahan(berkas: file): bool |
| C10 | `Artikel` | - idArtikel: int<br>- idRangkuman: int<br>- judul: string<br>- tautanSumber: string | + ambilTautan(): string |
| C11 | `LembagaBantuanHukum` | - idLBH: int<br>- nama: string<br>- wilayah: string<br>- tautan: string | + cocokkanWilayah(wilayah: string): bool |
| C12 | `RiwayatStatus` | - idRiwayat: int<br>- idRangkuman: int<br>- idPelaku: int<br>- status: string<br>- waktu: date | + simpan(): void |
| C13 | `HalamanJelajahKasus` | - sectionDaftarBidang: Section<br>- kartuBidangHukum: Card [1..\*]<br>- sectionDaftarKelompok: Section<br>- kartuKelompokKasus: Card [1..\*]<br>- popupPeringatanDarurat: Modal<br>- tombolTutupPeringatan: Button | + tampilkanHalaman(): void<br>+ klikBidangHukum(idBidang: int): void<br>+ klikKelompokKasus(idKelompok: int): void<br>+ tutupPeringatan(): void |
| C14 | `HalamanRangkumanKasus` | - sectionIntiMasalah: Section<br>- sectionHak: Section<br>- sectionPertimbangan: Section<br>- sectionLangkah: Section<br>- penandaTenggat: Badge [0..\*]<br>- sectionChecklist: Section<br>- checkboxDokumen: Checkbox [1..\*]<br>- labelKelengkapan: Text<br>- sectionTemplat: Section<br>- tombolUnduh: Button [0..\*]<br>- labelInfoBerkas: Text<br>- sectionArtikel: Section<br>- sectionLBH: Section<br>- dropdownWilayah: Select<br>- labelPenulis: Text<br>- teksDisclaimer: Text | + tampilkanHalaman(idKelompok: int): void<br>+ pilihWilayah(wilayah: string): void<br>+ centangDokumen(indeks: int): void<br>- simpanStatusCentang(): void<br>- muatStatusCentang(): void<br>+ klikTombolUnduh(idTemplat: int): void |
| C15 | `HalamanPencarianKataKunci` | - kolomPencarian: TextField<br>- tombolCari: Button<br>- daftarHasil: Card [0..\*]<br>- pesanTidakDitemukan: Text<br>- saranBidangLain: Card [0..\*]<br>- sectionLBH: Section<br>- dropdownWilayah: Select | + klikCari(kataKunci: string): void<br>+ klikHasil(idKelompok: int): void<br>+ pilihWilayah(wilayah: string): void |
| C16 | `HalamanLogin` | - inputEmail: TextField<br>- inputKataSandi: PasswordField<br>- tombolMasuk: Button<br>- pesanGalat: Text | + tampilkanHalaman(): void<br>+ klikMasuk(email: string, kataSandi: string): void |
| C17 | `HalamanPenyusunanKonten` | - formulirKonten: Form<br>- inputIntiMasalah: TextArea<br>- inputHak: TextArea<br>- inputPertimbangan: TextArea<br>- inputLangkah: TextArea [1..\*]<br>- inputChecklist: TextArea<br>- inputArtikel: TextField [1..\*]<br>- inputUnggahTemplat: FileInput<br>- tombolSimpanDraf: Button<br>- tombolAjukan: Button<br>- penandaIsianKosong: Text [0..\*]<br>- pesanGalatUnggah: Text<br>- tombolKeluar: Button | + tampilkanFormulir(idRangkuman: int): void<br>+ klikSimpanDraf(): void<br>+ unggahTemplat(berkas: file): void<br>+ klikAjukan(): void |
| C18 | `HalamanDaftarKontenKurator` | - tabelDaftarKonten: Table<br>- labelStatus: Badge [0..\*]<br>- panelCatatanRevisi: Section<br>- tombolKeluar: Button | + tampilkanHalaman(): void<br>+ klikKonten(idRangkuman: int): void |
| C19 | `HalamanModerasiKonten` | - tabelAntrean: Table<br>- panelIsiKonten: Section<br>- tombolSetujui: Button<br>- tombolKembalikan: Button<br>- inputAlasanRevisi: TextArea<br>- pesanWajibIsi: Text<br>- tombolKeluar: Button | + tampilkanAntrean(): void<br>+ klikKonten(idRangkuman: int): void<br>+ klikSetujui(idRangkuman: int): void<br>+ klikKembalikan(idRangkuman: int, alasan: string): void |
| C20 | `HalamanPengelolaanAkun` | - tabelDaftarKurator: Table<br>- formulirAkun: Form<br>- inputEmail: TextField<br>- inputKataSandi: PasswordField<br>- tombolDaftarkan: Button<br>- tombolSimpan: Button<br>- tombolNonaktifkan: Button<br>- tombolKeluar: Button | + tampilkanHalaman(): void<br>+ klikDaftarkan(email: string, kataSandi: string): void<br>+ klikSimpanPerubahan(idAkun: int, email: string): void<br>+ klikNonaktifkan(idAkun: int): void |
| C21 | `KontrolJelajahKasus` | - | + ambilDaftarBidang(): BidangHukum [1..\*]<br>+ ambilDaftarKelompok(idBidang: int): KelompokKasus [1..\*]<br>+ ambilRangkuman(idKelompok: int): RangkumanKasus<br>+ ambilDaftarLBH(wilayah: string): LembagaBantuanHukum [0..\*] |
| C22 | `KontrolPencarianKataKunci` | - | + cariKasus(kataKunci: string): KelompokKasus [0..\*]<br>+ sarankanBidangLain(): BidangHukum [1..\*]<br>+ ambilDaftarLBH(wilayah: string): LembagaBantuanHukum [0..\*] |
| C23 | `KontrolChecklist` | - | + ambilChecklist(idRangkuman: int): Checklist<br>+ hitungKelengkapan(jumlahDicentang: int, jumlahTotal: int): int |
| C24 | `KontrolUnduhTemplat` | - | + ambilDaftarTemplat(idRangkuman: int): TemplatDokumen [0..\*]<br>+ unduhTemplat(idRangkuman: int, idTemplat: int): file |
| C25 | `KontrolAutentikasi` | - | + putusSesi(idAkun: int): void<br>+ prosesLogin(email: string, kataSandi: string): bool<br>+ arahkanSesuaiPeran(peran: string): void<br>+ cekSesi(): bool<br>+ logout(): void |
| C26 | `KontrolPenyusunanKonten` | - | + buatDraf(idKelompok: int, idKurator: int): RangkumanKasus<br>+ simpanDraf(idRangkuman: int): void<br>+ lampirkanTemplat(idRangkuman: int, berkas: file): void<br>+ ajukanKonten(idRangkuman: int): void<br>- catatRiwayat(idRangkuman: int, idPelaku: int, status: string): void |
| C27 | `KontrolPelacakanKonten` | - | + ambilDaftarKonten(idKurator: int): RangkumanKasus [0..\*]<br>+ ambilCatatanRevisi(idRangkuman: int): string |
| C28 | `KontrolModerasiKonten` | - | + ambilAntrean(): RangkumanKasus [0..\*]<br>+ ambilKonten(idRangkuman: int): RangkumanKasus<br>+ setujuiKonten(idRangkuman: int, idAdministrator: int): void<br>+ kembalikanKonten(idRangkuman: int, idAdministrator: int, alasan: string): void<br>- cekAlasanTerisi(alasan: string): bool<br>- catatRiwayat(idRangkuman: int, idPelaku: int, status: string): void |
| C29 | `KontrolPengelolaanAkun` | - | + ambilDaftarKurator(idAdministrator: int): Kurator [0..\*]<br>+ daftarkanKurator(email: string, kataSandi: string, idAdministrator: int): Kurator<br>+ perbaruiKurator(idAkun: int, emailBaru: string): void<br>+ nonaktifkanKurator(idAkun: int): void<br>- cekEmailUnik(email: string): bool |
Tiga metode berikut tidak terdapat pada BAB 5 dokumen SKPL dan baru ditambahkan pada tahap perancangan. Penambahannya dicatat pada tabel Daftar Perubahan.

1. `cariAkun(email)` pada `Akun`. Metode `prosesLogin()` menerima email, tetapi SKPL tidak menyediakan cara mencari akun berdasarkan email, sehingga `cocokkanKataSandi()` tidak memiliki objek sasaran. Metode ini bersifat statis karena dipanggil sebelum objek `Akun` terbentuk.
2. `putusSesi(idAkun)` pada `KontrolAutentikasi`. KF37 menuntut sesi Kurator terputus seketika saat akunnya dinonaktifkan, sedangkan pemegang sesi adalah `KontrolAutentikasi`.
3. `ambilDaftarKurator(idAdministrator)` pada `KontrolPengelolaanAkun`. Tanpa metode ini, `HalamanPengelolaanAkun` harus memanggil `Administrator` secara langsung dan melangkahi lapisan *Controller*.

Selain ketiganya, alur login UC05 kini memanggil `cekAktif()` milik `Kurator`. Metode tersebut sudah ada pada SKPL, tetapi belum pernah ditempatkan dalam alur mana pun, sehingga KF37 mengenai pencegahan login bagi Kurator nonaktif belum terealisasi.

<br>

---

# BAB 5: Matriks Kerunutan

Matriks kerunutan memetakan tiap kelas perancangan terhadap *use case* yang merealisasikannya. Acuannya adalah BAB 6 dokumen SKPL, disesuaikan dengan hasil realisasi pada BAB 3. Satu penyesuaian terjadi pada `KontrolAutentikasi`, yang semula hanya terkait UC05 dan kini juga terkait UC09 karena penonaktifan akun menuntut pemutusan sesi.

Seluruh 29 kelas terpetakan ke sekurang-kurangnya satu *use case*, sehingga tidak ada kelas yang dirancang tanpa kebutuhan yang mendasarinya. Sebaliknya, kesembilan *use case* pada SKPL juga terwakili, sehingga tidak ada kebutuhan yang kehilangan rancangan kelasnya.

Tabel 5.1. Matriks Kerunutan Kelas terhadap Use Case

| Kelas | Use Case Terkait |
| :--- | :--- |
| C01 - `Akun` | UC05, UC06, UC08, UC09 |
| C02 - `Kurator` | UC05, UC06, UC07, UC09 |
| C03 - `Administrator` | UC05, UC08, UC09 |
| C04 - `BidangHukum` | UC01, UC02 |
| C05 - `KelompokKasus` | UC01, UC02 |
| C06 - `RangkumanKasus` | UC01, UC02, UC03, UC04, UC06, UC07, UC08 |
| C07 - `LangkahPenyelesaian` | UC01, UC06 |
| C08 - `Checklist` | UC01, UC03, UC06 |
| C09 - `TemplatDokumen` | UC01, UC04, UC06 |
| C10 - `Artikel` | UC01, UC06 |
| C11 - `LembagaBantuanHukum` | UC01, UC02 |
| C12 - `RiwayatStatus` | UC06, UC08 |
| C13 - `HalamanJelajahKasus` | UC01 |
| C14 - `HalamanRangkumanKasus` | UC01, UC03, UC04 |
| C15 - `HalamanPencarianKataKunci` | UC02 |
| C16 - `HalamanLogin` | UC05 |
| C17 - `HalamanPenyusunanKonten` | UC06 |
| C18 - `HalamanDaftarKontenKurator` | UC07 |
| C19 - `HalamanModerasiKonten` | UC08 |
| C20 - `HalamanPengelolaanAkun` | UC09 |
| C21 - `KontrolJelajahKasus` | UC01 |
| C22 - `KontrolPencarianKataKunci` | UC02 |
| C23 - `KontrolChecklist` | UC03 |
| C24 - `KontrolUnduhTemplat` | UC04 |
| C25 - `KontrolAutentikasi` | UC05, UC09 |
| C26 - `KontrolPenyusunanKonten` | UC06 |
| C27 - `KontrolPelacakanKonten` | UC07 |
| C28 - `KontrolModerasiKonten` | UC08 |
| C29 - `KontrolPengelolaanAkun` | UC09 |
