<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 6
<br>
ARSITEKTUR PERANGKAT LUNAK (APL)
</h1>
<br>

## PahamHukum

### Untuk: Mikhael Andrian Yonatan

Dipersiapkan oleh:

| Informasi | Keterangan |
| --- | --- |
| Kelas | K01 |
| Kelompok | 7  |
| Nama Kelompok | #PenjagaNilai  |

| NIM | Nama |
|---|---|
| 13525007 | Rivan Cahyadi |
| 13525019 | Raditya Wibian Sastaka |
| 13525064 | Matthew Evan Kurniawan |
| 13525100 | Wesley Lianto |
| 13525109 | Christopherus Michael Jafeth Tobing |

---

<br>
<br>

# BAB 1: Style/Pattern Arsitektur Acuan

Untuk **PahamHukum**, Pattern Arsitektur yang dipilih adalah **Model-View-Controller (MVC)**. Pattern ini memisahkan sistem menjadi tiga bagian dengan tanggung jawab yang berbeda, yaitu Model, View, dan Controller. Pemisahan tersebut bertujuan agar perubahan di satu bagian tidak menuntut perombakan menyeluruh pada bagian lainnya. Adapun pembagian tanggung jawabnya adalah sebagai berikut:

1. **Model**
   Komponen **Model** adalah bagian yang merepresentasikan data dan cara data tersebut dikelola. Model memiliki aturan untuk menjaga data, cara data disimpan, dan cara data diambil oleh komponen lain. Pada PahamHukum, **Model** merepresentasikan struktur data konten dan pengelola sistem yang terdiri atas 12 *entity*, yaitu data konten (`BidangHukum`, `KelompokKasus`, `RangkumanKasus`, `LangkahPenyelesaian`, `Checklist`, `TemplatDokumen`, `Artikel`, `LembagaBantuanHukum`), data otorisasi pengguna (`Akun`, `Kurator`, `Administrator`), serta riwayat perubahan status (`RiwayatStatus`).
   
2. **View**
   Komponen **View** bertanggung jawab menampilkan antarmuka sistem yang dapat langsung dilihat oleh pengguna sekaligus menerima masukan dari interaksi pengguna. Namun, **View** tidak seharusnya mengambil data langsung dari *database* atau memutuskan kelayakan konten. **View** hanya menerima data yang diberikan *Controller* dan meneruskan interaksi pengguna kembali ke *Controller*. Pada PahamHukum, **View** terbagi menjadi dua kelompok antarmuka utama:

   - **Antarmuka Publik**: menampilkan beranda penelusuran bidang hukum, hasil pencarian pengguna, serta halaman rangkuman kasus yang memuat penjelasan, hak, langkah-langkah, *checklist* dokumen, dan tombol unduh templat surat.
   - **Antarmuka Pengelola**: Berfungsi menyediakan halaman *login*, formulir penyusunan konten bagi Kurator, antrean peninjauan konten bagi Administrator, serta halaman pengelolaan akun Kurator.
   
   Seluruh komponen **View** diturunkan dari kelas-kelas *Boundary* pada dokumen Class Diagram (M4).

3. **Controller**  
   Komponen **Controller** adalah penghubung antara *View* dan *Model*. Ia menerima permintaan dari *View*, memvalidasi input, lalu memanggil *Model* untuk mengambil atau mengubah data. Setelah itu, ia memilih *View* yang harus ditampilkan atau menentukan pesan spesifik yang perlu diberikan. Contoh dalam skenario *login* akun: *View* mengirimkan permintaan ke **Controller** untuk mengecek kombinasi akun dan kata sandi. **Controller** kemudian meminta *Model* memverifikasi data tersebut. Jika benar, **Controller** mengarahkan pengguna ke *View* halaman beranda. Jika salah, **Controller** menampilkan kembali *View* halaman *login* dengan pesan kesalahan. Pada PahamHukum, **Controller** menangani alur penelusuran, pencarian, pengelolaan sesi *login* dan *logout*, interaksi pengguna dengan *checklist*, pengunduhan templat dokumen, hingga alur peninjauan dan perubahan status konten.

### Alasan Pemilihan Arsitektur MVC:

1. **Keterlacakan dengan pemodelan kelas *Entity, Control, Boundary* pada M4**
   Pada BAB 5 SKPL dan M4, PahamHukum telah dimodelkan menjadi 29 kelas yang terbagi menjadi *Entity, Control, Boundary*. Struktur tersebut berhubungan langsung dengan MVC:
   - 8 kelas *Boundary* sesuai dengan komponen *View*.
   - 9 kelas *Control* sesuai dengan komponen *Controller*.
   - 12 kelas *Entity* sesuai dengan komponen *Model*.  
   Dengan memilih MVC, rantai keterlacakan dari kebutuhan awal, use case, hingga rancangan kelas tetap terjaga tanpa perombakan kembali. Selain itu, MVC yang familiar bagi seluruh anggota kelompok mempermudah proses perancangan.

2. **Dukungan terhadap dua kelompok antarmuka berbeda**  
   Sistem PahamHukum melayani tiga aktor dengan kebutuhan yang kontras. Pencari Informasi mengakses antarmuka publik tanpa akun, sedangkan Kurator dan Administrator mengakses panel pengelola yang membutuhkan autentikasi dan manipulasi data. Pola MVC memungkinkan entitas data yang sama (misalnya `RangkumanKasus` dan `RiwayatStatus`) disajikan ke dalam antarmuka publik maupun antarmuka pengelola
   melalui *View* yang terpisah, tanpa duplikasi atau perubahan logika bisnis pada *Model*.

3. **Penegakan alur status konten yang terkendali**  
   Konten melewati siklus `Draft` $\rightarrow$ `Diajukan` $\rightarrow$ `Disetujui` atau `Perlu Revisi` dan publik hanya bisa melihat konten `Disetujui`. *Controller* yang mengatur penyusunan dan moderasi konten bertugas memvalidasi hak akses dan status konten sebelum mengubah data di *Model*, lalu mencatat perubahannya secara permanen di `RiwayatStatus` sesuai KNF09.

4. **Menjaga pemisahan antara aturan domain dan tampilan**
   Perubahan di sisi antarmuka atau *View* tidak bisa melangkahi aturan seperti urutan status pengajuan konten dan pencatatan riwayat. Konten yang belum disetujui tidak bisa muncul ke halaman utama. Dengan MVC, aturan-aturan ini berada pada *Model*, sementara *View* hanya menampilkan. MVC mengurangi risiko rusaknya aturan bisnis saat tampilan mengalami perubahan.

5. **Mendukung penggunaan ulang komponen tampilan di antarmuka**
   Halaman Jelajah, Rangkuman, dan Pencarian memakai komponen tampilan yang serupa untuk menampilkan konten dengan sumber data dan aksi yang berbeda. *View* yang sama dapat dipakai beberapa *Controller* dan *Model* tanpa duplikasi. Sebaliknya, satu *Model* seperti `RangkumanKasus` dapat ditampilkan lewat beberapa *View* tanpa mengubah *Model*-nya.

6. **Mendukung beberapa KNF dari PahamHukum**
   - KNF09 menetapkan bahwa riwayat perubahan status konten bersifat permanen dan tidak dapat diubah. Aturan ini lebih layak ditaruh di bagian *Model* tepatnya pada entitas `RiwayatStatus`.
   - KNF14 menyebutkan bahwa sesi pengelola harus berakhir otomatis setelah 30 menit tanpa aktivitas. Aturan seperti itu adalah urusan alur, bukan urusan data atau tampilan sehingga cocok masuk ke *Controller*.
   - KNF12 dan KNF13 menuntut formulir penyusunan konten berada dalam satu halaman dan semuanya murni soal tampilan sehingga harus diselesaikan di *View* tanpa mengganggu komponen lain.


<p align="center">
<img alt="Contoh Arsitektur MVC" src="./assets/diagram/contoh-arsitektur-mvc.webp" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Arsitektur MVC</i>
</p>

Isi bab ini dengan hal-hal berikut:
1. **Style/pattern yang dipilih** beserta penjelasan singkat peran setiap bagiannya. Untuk MVC, jelaskan peran *Model*, *View*, dan *Controller*.
2. **Alasan pemilihan** berdasarkan karakteristik P/L Anda, misalnya jenis pengguna, alur proses bisnis, serta KF dan KNF pada dokumen SKPL.
3. **Gambar style/pattern yang diterapkan pada P/L Anda.** Jangan hanya menyalin Gambar 1. Isi setiap bagian pattern dengan komponen milik P/L Anda. Misalnya, kotak *Controller* berisi daftar *controller* yang ada di aplikasi dan kotak *Model* berisi daftar *model* yang ada di aplikasi.

Selain *style/pattern*, tuliskan juga lingkungan operasi P/L. Tabel berikut **disalin dari subbab 2.5 *Lingkungan Operasi Perangkat Lunak* pada dokumen SKPL** tanpa perubahan. Setelah tabel, jelaskan kaitan teknologi yang dipakai dengan *style/pattern* yang dipilih. Contohnya, Django (Python) secara bawaan mengikuti pola MVT (*Model-View-Template*), yaitu varian dari MVC.

Tabel 1.1. Lingkungan Operasi Perangkat Lunak

| Komponen | Spesifikasi |
| :--- | :--- |
| Server | Web server pada layanan *cloud hosting* gratis atau berbiaya rendah dengan dukungan HTTPS |
| Client | Peramban Chrome, Firefox, Edge, atau Safari (versi rilis dua tahun terakhir) di komputer maupun ponsel |
| DBMS | Basis data relasional (PostgreSQL atau MySQL) untuk data akun, bidang hukum, kelompok kasus, konten, dan riwayat perubahan status |
| Penyimpanan Berkas | Penyimpanan di sisi server untuk templat PDF dan DOCX |
| OS | Tidak bergantung pada sistem operasi tertentu selama tersedia peramban yang didukung |
| Jaringan | Koneksi internet minimal 1 Mbps agar beranda termuat paling lama 3 detik |

PahamHukum berjalan sebagai aplikasi web yang dilayani dari satu web server pada cloud hosting gratis atau berbiaya rendah. Kondisi ini cocok dengan MVC karena *Model*, *View*, dan *Controller* dapat dipasang dalam satu aplikasi tanpa layanan tambahan. Klien yang beragam (berbeda device, browser, dan OS) hanya menerima *View* yang dirender server, sehingga perbedaan perangkat cukup ditangani di lapisan *View*. DBMS relasional dan penyimpanan berkas di sisi server hanya diakses melalui *Model*, sehingga *View* tidak pernah menyentuh data langsung dan pergantian PostgreSQL ke MySQL tidak memengaruhi *Controller* maupun *View*. Terakhir, batas koneksi minimal 1 Mbps dengan target beranda 3 detik menuntut halaman yang ringan. Pemisahan *View* dari logika memudahkan halaman dijaga tetap kecil karena *Controller* hanya mengambil data yang diperlukan.

<sub><b><i>Catatan</i></b>: <i>Style/pattern yang dipilih di bab ini menjadi acuan untuk BAB 2 (pengelompokan komponen) dan BAB 3 (model arsitektur). Contoh pada dokumen ini memakai MVC secara konsisten dari BAB 1 sampai BAB 3. Kelompok boleh memakai pattern lain selama alasannya dijelaskan dan BAB 2 serta BAB 3 disesuaikan. Tabel 1.1 harus sama persis dengan subbab 2.5 dokumen SKPL; jangan menambah atau mengubah isinya karena SKPL sudah final.</i></sub>

---

# BAB 2: Identifikasi Komponen / Modul / Subsistem

Komponen pada PahamHukum diidentifikasi berdasarkan pola Model-View-Controller (MVC) yang telah ditetapkan pada BAB 1. Setiap komponen dikelompokkan menurut lapisan arsitektur, yaitu View, Controller, dan Model, ditambah komponen penyimpanan data. Database dan Penyimpanan Berkas berasal dari lingkungan operasi pada Tabel 1.1, sedangkan Penyimpanan Lokal Peramban berasal dari KF14 dan KNF06 pada dokumen SKPL. Kelas Boundary pada dokumen Class Diagram (M4) menjadi komponen View, kelas Control menjadi komponen Controller, dan kelas Entity menjadi komponen Model. Dengan demikian, seluruh 29 kelas pada M4 tercakup oleh komponen pada tabel berikut, dan seluruh use case UC01 sampai UC09 pada dokumen SKPL dapat dijalankan oleh komponen-komponen tersebut.

Tabel 2.1. Identifikasi Komponen/Modul/Subsistem

| Nama Komponen/Modul/Subsistem | Jenis                 | Penjelasan                                                                                                           |
| :---------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------- |
| HalamanJelajahKasus | *View* | Menampilkan beranda berisi bidang hukum dan kelompok kasus, serta peringatan prioritas untuk kasus darurat, lalu meneruskan pilihan pengguna ke KontrolJelajahKasus. |
| HalamanRangkumanKasus | *View* | Menampilkan satu rangkuman kasus lengkap (langkah, *checklist*, templat, artikel, direktori LBH), menyimpan dan memuat status centang *checklist* di peramban, serta meneruskan aksi unduh templat ke KontrolUnduhTemplat. |
| HalamanPencarianKataKunci | *View* | Menampilkan kolom pencarian, daftar hasil, dan pesan serta saran jika kasus tidak ditemukan, lalu meneruskan kata kunci ke KontrolPencarianKataKunci. |
| HalamanLogin | *View* | Menampilkan formulir *login* pengelola beserta pesan galat dan meneruskan kredensial ke KontrolAutentikasi. |
| HalamanPenyusunanKonten | *View* | Menampilkan formulir penyusunan konten satu halaman bagi Kurator dan meneruskan aksi simpan draf, unggah templat, dan ajukan ke KontrolPenyusunanKonten. |
| HalamanDaftarKontenKurator | *View* | Menampilkan daftar konten milik Kurator beserta status dan catatan revisinya. |
| HalamanModerasiKonten | *View* | Menampilkan antrean dan isi konten untuk Administrator beserta tombol Setujui dan Kembalikan pada layar yang sama, lalu meneruskan keputusan ke KontrolModerasiKonten. |
| HalamanPengelolaanAkun | *View* | Menampilkan daftar Kurator dan formulir pendaftaran, pembaruan, serta penonaktifan akun bagi Administrator. |
| KontrolJelajahKasus | *Controller* | Mengatur alur penampilan bidang hukum, kelompok kasus, rangkuman kasus, dan direktori LBH. |
| KontrolPencarianKataKunci | *Controller* | Memproses kata kunci, mengambil hasil yang relevan, dan menyarankan bidang lain jika kasus tidak ditemukan. |
| KontrolChecklist | *Controller* | Mengambil *checklist* rangkuman dan menghitung kelengkapan dokumen yang dicentang. |
| KontrolUnduhTemplat | *Controller* | Menyediakan daftar dan berkas templat versi terbaru untuk diunduh. |
| KontrolAutentikasi | *Controller* | Memeriksa kredensial akun, mengarahkan pengguna sesuai perannya, serta mengakhiri sesi saat keluar atau kedaluwarsa (30 menit tanpa aktivitas). |
| KontrolPenyusunanKonten | *Controller* | Mengatur pembuatan draf, pelampiran templat, validasi isian, dan pengajuan konten (Draft menjadi Diajukan), serta mencatat riwayat statusnya. |
| KontrolPelacakanKonten | *Controller* | Mengambil daftar konten milik Kurator dan catatan revisinya. |
| KontrolModerasiKonten | *Controller* | Mengatur persetujuan dan pengembalian konten oleh Administrator, mewajibkan alasan revisi, dan mencatat riwayat status ke RiwayatStatus. |
| KontrolPengelolaanAkun | *Controller* | Mengatur pendaftaran, pembaruan, dan penonaktifan akun Kurator. |
| Akun | *Model* | Merepresentasikan data akun pengelola (email, kata sandi ter-*hash*, peran) serta metode untuk memverifikasi dan mengubahnya. |
| Kurator | *Model* | Merepresentasikan akun Kurator (status aktif dan jumlah konten) serta metode untuk mengakses dan mengubahnya, turunan Akun. |
| Administrator | *Model* | Merepresentasikan akun Administrator beserta daftar Kurator yang dikelolanya, turunan Akun. |
| BidangHukum | *Model* | Merepresentasikan bidang hukum beserta status aktif dan kelompok kasus di bawahnya serta metode untuk mengakses dan mengubahnya. |
| KelompokKasus | *Model* | Merepresentasikan satu jenis kasus (judul sehari-hari, istilah resmi, penanda darurat) serta metode pencocokan kata kunci. |
| RangkumanKasus | *Model* | Merepresentasikan isi rangkuman kasus beserta status, penulis, tanggal peninjauan, dan catatan revisi serta metode untuk mengakses dan mengubahnya. |
| LangkahPenyelesaian | *Model* | Merepresentasikan langkah bernomor beserta tujuan, dokumen yang diperlukan, dan tenggat. |
| Checklist | *Model* | Merepresentasikan daftar dokumen yang perlu disiapkan untuk suatu kasus. |
| TemplatDokumen | *Model* | Merepresentasikan berkas templat (format, ukuran, versi, tanggal pembaruan) serta validasi unggahan PDF/DOCX maksimal 5 MB. |
| Artikel | *Model* | Merepresentasikan artikel pendukung beserta tautan ke sumber hukum resmi. |
| LembagaBantuanHukum | *Model* | Merepresentasikan direktori LBH beserta wilayah layanannya. |
| RiwayatStatus | *Model* | Merepresentasikan catatan perubahan status konten (konten, pelaku, status, waktu) yang bersifat permanen dan tidak dapat diubah (KNF09). |
| Database | *Penyimpanan Data* | Menyimpan seluruh data *Model* secara persisten pada DBMS relasional (PostgreSQL atau MySQL). |
| Penyimpanan Berkas | *Penyimpanan Data* | Menyimpan berkas templat PDF dan DOCX di sisi server. |
| Penyimpanan Lokal Peramban | *Penyimpanan Data* | Menyimpan status centang *checklist* di perangkat pengguna dan tidak pernah dikirim ke server (KNF06). |

Ketentuan pengisian Tabel 2.1:
1. Kolom **Jenis** mengikuti pengelompokan pada *style/pattern* di BAB 1. Untuk MVC, jenisnya adalah *Model*, *View*, dan *Controller*. Jenis lain boleh ditambahkan, misalnya *Pendukung* untuk komponen bantu yang dipakai bersama, atau *Integrasi Eksternal* untuk penghubung ke sistem di luar P/L yang disebutkan pada subbab 2.2 dokumen SKPL. Kolom ini juga boleh diisi dengan *Subsistem*, *Modul*, atau *Komponen* apabila komponen dikelompokkan berdasarkan fungsinya. Tuliskan subsistem terlebih dahulu, lalu komponen penyusunnya di baris-baris berikutnya.
2. Komponen **tidak sama dengan** kelas. Satu komponen boleh mewadahi beberapa kelas dari diagram kelas pada dokumen SKPL. Pastikan seluruh kelas tercakup oleh setidaknya satu komponen.
3. Pastikan seluruh use case pada dokumen SKPL dapat dijalankan oleh komponen-komponen yang didaftarkan di tabel ini. Jangan menambahkan komponen untuk fitur yang tidak ada di SKPL.

<sub><b><i>Catatan</i></b>: <i>Nama komponen pada Tabel 2.1 harus dipakai sama persis pada gambar di BAB 1 dan setiap view di BAB 3. Jika saat membuat view ternyata dibutuhkan komponen baru, tambahkan komponen tersebut ke Tabel 2.1 terlebih dahulu.</i></sub>

---

# BAB 3: Model Arsitektur Perangkat Lunak

*Architectural View* adalah bagaimana cara kita melihat/mendeskripsikan arsitektur sebuah sistem dari sudut pandang tertentu. Dalam perancangan arsitektur aplikasi, dibutuhkan *Architectural View* yang dapat mempermudah pemahaman dari proses aplikasi yang akan dikembangkan. Tujuan dari *Architectural View* adalah menjadi bahan komunikasi, pemisahan masalah, mempermudah analisis, dan pemandu saat eksekusi pengembangan sistem tersebut.

Buatlah model arsitektur dari aplikasi yang akan dirancang dalam bentuk *view*. Model arsitektur ini berfungsi untuk memperlihatkan bagaimana setiap komponen, modul, dan subsistem saling berinteraksi serta berkolaborasi dalam menjalankan fungsi utama sistem secara keseluruhan. Anda dapat membuat satu atau lebih *view* tergantung kebutuhan dalam bentuk gambar. Pilihlah notasi yang sesuai. Contoh *view* yang dapat digunakan antara lain ***Logical View***, ***Process View***, ***Development View***, serta ***Physical View***.

Ketentuan pengisian BAB 3:
1. Setiap view menggambarkan **keseluruhan sistem**, bukan satu use case atau satu fitur saja.
2. Buat **minimal satu view**. Setiap view dituliskan dalam subbab tersendiri (3.1, 3.2, dan seterusnya). Tidak perlu membuat keempat view, pilih yang paling membantu menjelaskan P/L Anda, lalu jelaskan alasan pemilihannya.
3. Setiap view harus **konsisten dengan BAB 2**. Seluruh komponen pada Tabel 2.1 harus muncul dengan nama yang sama, dan tidak boleh ada komponen pada view yang tidak terdaftar di Tabel 2.1.
4. Setiap view harus **mencerminkan style/pattern pada BAB 1**. Misalnya, jika memilih MVC, pembagian *Model*, *View*, dan *Controller* harus terlihat jelas pada diagram.
5. Jika membuat lebih dari satu view, setiap view harus menggambarkan sistem yang sama dari sudut pandang berbeda. View tambahan melengkapi view pertama, bukan mengulanginya.
6. Beri label pada setiap garis atau panah yang menghubungkan komponen agar hubungan antarkomponen dapat dipahami tanpa penjelasan tambahan.
7. Jika membuat *Physical View*, gambarkan lingkungan operasi pada Tabel 1.1.

## 3.1 Logical View

Model arsitektur perangkat lunak yang dipilih untuk PahamHukum adalah **Model-View-Controller (MVC)** yang divisualisasikan melalui ***Logical View***. *Logical View* mendeskripsikan abstraksi komponen utama sistem dan hubungannya secara statis untuk mendukung pemenuhan kebutuhan fungsional bisnis. Model arsitektur ini dinilai paling cocok untuk aplikasi PahamHukum karena PahamHukum memiliki antarmuka yang sangat berbeda antara pengguna publik dan panel pengelola. MVC memungkinkan logika antarmuka (*View*) dipisah dari aturan validasi (*Controller*) dan struktur data (*Model*) sehingga perubahan tampilan di masa depan tidak akan merusak aturan atau status konten.

<p align="center">
  <img alt="Logical View pada Sistem PahamHukum berbasis Pola MVC" src="./assets/diagram/logical-view-pahamhukum.svg" width="100%">
</p>
<p align="center">
  <i>Gambar 2. Logical View pada Sistem PahamHukum berbasis Pola MVC</i>
</p>

### Penjelasan Komponen dan Label Relasi

Diagram di atas memetakan ke-32 komponen yang terdaftar pada Tabel 2.1 ke dalam tiga lapisan utama MVC beserta subsistem penyimpanannya:

1. **View**
   Terdiri atas 8 komponen antarmuka yang melayani interaksi langsung dengan pengguna (mulai dari `HalamanJelajahKasus`, `HalamanRangkumanKasus`, `HalamanPencarianKataKunci` untuk pengguna publik anonim, hingga antarmuka pengelolaan konten untuk Administrator dan Kurator).

2. **Controller**
   Terdiri atas 9 komponen pengendali yang mengoordinasikan interaksi antara *View* dan *Model*. *Controller* bertanggung jawab untuk memvalidasi setiap *event* dari pengguna (misalnya verifikasi otorisasi pada `KontrolAutentikasi` atau penyetujuan pada `KontrolModerasiKonten`) sebelum mengizinkan pemanggilan operasi ke *Model*.

3. **Model**
   Terdiri atas 12 komponen entitas yang menyimpan struktur data hukum dan pengguna sistem. Komponen `RiwayatStatus` diisolasi guna memenuhi perlindungan KNF09 di mana riwayat tidak boleh dimanipulasi atau diubah setelah dibuat.

4. **Storage**
   Terdiri atas `Database` dan `Penyimpanan Berkas` yang berada di server, serta komponen khusus `Penyimpanan Lokal Peramban` (di sisi klien) dan `Sumber Hukum Resmi` (sistem eksternal). `Penyimpanan Lokal Peramban` digunakan oleh `KontrolChecklist` untuk mempertahankan daftar persiapan dokumen pengguna secara anonim.

**Keterangan Relasi (Label Panah):**

* **memanggil:** Aksi dari *View* yang meneruskan interaksi pengguna ke *Controller* terkait.
* **akses:** Aksi dari *Controller* untuk menerapkan logika bisnis terhadap *Model* (mengambil, mengubah, atau menghapus data).
* **komposisi / agregasi:** Relasi kepemilikan struktural antar-*Model* di mana komponen bagian (misal *Checklist*) terikat kuat (komposisi) atau terkait lepas (agregasi) dengan entitas induknya (misal *RangkumanKasus*).
* **asosiasi:** Keterkaitan operasional spesifik berarah, di mana peranannya dituliskan langsung di atas garis (contoh: "menulis", "diubah oleh").
* **generalisasi:** Pewarisan atribut dan *method* dari *Model* spesifik (Kurator, Administrator) ke *Model* umum (Akun).
* **sistem eksternal:** Entitas di luar ruang lingkup PahamHukum (seperti JDIH/BPK) yang ditautkan melalui URL.

## 3.2 Physical View

Selain *Logical View* pada 3.1, PahamHukum juga dimodelkan melalui ***Physical View*** (*deployment view*) agar lingkungan eksekusi perangkat lunak terlihat jelas, bukan hanya struktur logisnya. *Physical View* mendeskripsikan node tempat komponen berjalan atau tersimpan, artifact yang dipasang pada node tersebut, serta jalur jaringan antarnode. *View* ini dipilih sebagai pelengkap *Logical View* karena PahamHukum melayani klien yang sangat beragam (lintas perangkat, peramban, dan sistem operasi, dengan koneksi yang tidak selalu stabil — lihat Asumsi A-01 dan subbab 2.4 *Batasan Perangkat Lunak* SKPL poin 1 dan 4), sehingga penting menunjukkan secara eksplisit di mana data disimpan, di peramban klien (sementara, untuk *checklist*) atau di server (persisten, untuk seluruh data lain).

Diagram digambar dengan notasi *UML Deployment Diagram*: node berstereotip `«Device»` dengan nama instans `:NamaNode`, lingkungan eksekusi di dalam node (`«Execution Environment»`, `«Database System»`, `«File System»`) digambar abu-abu sebagai perangkat lunak pihak ketiga, sedangkan setiap komponen pada Tabel 2.1 digambar sebagai `«artifact»` putih bergambar ikon komponen di luar node dan dihubungkan dengan panah putus-putus `«deploy»` ke lingkungan eksekusi tujuannya. Pemetaan ini langsung memakai lingkungan operasi pada Tabel 1.1, sehingga hubungan antara pilihan teknologi di BAB 1 dan tempat dijalankannya pola MVC terlihat secara konkret.

<p align="center">
  <img alt="Physical View pada Sistem PahamHukum" src="./assets/diagram/physical-view-pahamhukum.svg" width="100%">
</p>
<p align="center">
  <i>Gambar 3. Physical View pada Sistem PahamHukum</i>
</p>

### Pemetaan Node dan Artifact ke Tabel 1.1 dan Tabel 2.1

| Node | Lingkungan eksekusi (pihak ketiga) | Baris Tabel 1.1 | Artifact yang dipasang (nama sama dengan Tabel 2.1) |
| :--- | :--- | :--- | :--- |
| `:Perangkat Klien` `«Device»` | `:Peramban Web` `«Execution Environment»` | Client, OS | `:Penyimpanan Lokal Peramban` (status centang *checklist*, tidak dikirim ke server, KNF06), serta instans sisi klien dari `:HalamanRangkumanKasus` dan `:KontrolChecklist` |
| `:Web Server` `«Device»` | `:Application Server` `«Execution Environment»` | Server | 8 artifact *View*, 9 artifact *Controller*, dan 12 artifact *Model* (total 29), dijalankan dalam satu proses aplikasi |
| | `:Sistem Berkas Server` `«File System»` | Penyimpanan Berkas | `:Penyimpanan Berkas` (templat PDF/DOCX) |
| `:Database Server` `«Device»` | `:PostgreSQL / MySQL` `«Database System»` | DBMS | `:Database` |
| `:Sumber Hukum Resmi` (garis putus-putus) | — | — | Sistem eksternal di luar PahamHukum (JDIH, peraturan.bpk.go.id); bukan komponen Tabel 2.1 |

`:HalamanRangkumanKasus` dan `:KontrolChecklist` dipasang pada **dua node**: instans di `:Web Server` menyusun halaman rangkuman dan mengambil isi *checklist* dari `Model`, sedangkan instans di `:Peramban Web` berjalan pada perangkat pengguna untuk memperbarui tampilan centang, menghitung kelengkapan dokumen, serta menyimpan dan memuat status centang di `:Penyimpanan Lokal Peramban` (UC03, KF13, KF14). Pemasangan ganda ini diperlukan karena KNF06 melarang status centang dikirim ke server, sehingga logika tersebut tidak mungkin berjalan di sisi server. Hal ini juga sesuai dengan panah *HalamanRangkumanKasus* ke *Penyimpanan Lokal Peramban* pada *Logical View* 3.1.

Seluruh 32 komponen pada Tabel 2.1 muncul pada gambar dengan nama yang sama (awalan titik dua hanyalah notasi instans UML). Node, lingkungan eksekusi, dan sistem eksternal bukan komponen sehingga tidak terdaftar di Tabel 2.1. Bingkai putus-putus *View*, *Controller*, dan *Model* pada gambar hanya pengelompokan MVC dari BAB 1; panah `«deploy»` dari bingkai berlaku untuk semua artifact di dalamnya.

### Keterangan Jalur Komunikasi

| Penghubung | Stereotype | Multiplisitas | Keterangan |
| :--- | :--- | :--- | :--- |
| `:Perangkat Klien` — `:Web Server` | `«internet»` `{HTTPS}` | n : 1 | Permintaan halaman dan pengiriman formulir. Terkait baris *Jaringan* Tabel 1.1 (minimal 1 Mbps, beranda termuat paling lama 3 detik). |
| `:Web Server` — `:Database Server` | `«intranet»` `{SQL}` | 1 : 1 | Kueri baca/tulis oleh lapisan *Model* ke `:Database`. |
| `:Perangkat Klien` — `:Sumber Hukum Resmi` | `«internet»` `{hyperlink}` | n : 1 | Dibuka langsung oleh peramban pengguna saat mengeklik rujukan pada `Artikel`, bukan panggilan dari Web Server. |

*Catatan:* `:Database Server` digambar sebagai node terpisah dari `:Web Server` karena DBMS pada Tabel 1.1 adalah layanan tersendiri. Jika pada implementasi basis data berada pada mesin yang sama dengan aplikasi, kedua node cukup digabung dan jalur `«intranet»` dihilangkan tanpa mengubah pemetaan artifact.

---

# Referensi

- Sommerville, I. (2016). *Software Engineering* (10th ed.). Pearson. Chapter 6: *Architectural Design*: [https://software-engineering-book.com/slides/](https://software-engineering-book.com/slides/)
- Diagram arsitektur: [https://www.drawio.com/](https://www.drawio.com/), [https://staruml.io/](https://staruml.io/)
