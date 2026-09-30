<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 5
<br>
SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK (SKPL)
</h1>
<br>

## PahamHukum

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

Tabel berikut merangkum perubahan yang dilakukan pada dokumen-dokumen milestone sebelumnya selama penyusunan SKPL ini.

| Revisi | Deskripsi |
| :--- | :--- |
| A | Pengenalan Administrator Sistem ditambahkan pada BAB 2.1 dokumen Tugas 1 (*Topic Brainstorming*). Sebelumnya deskripsi perangkat lunak hanya menyebut masyarakat awam dan Kurator, sehingga Administrator baru muncul pada BAB 3.1 tanpa pernah diperkenalkan lebih dahulu. Perubahan ini sekaligus menjawab catatan asistensi Tugas 1 mengenai perlunya memvalidasi peran Administrator dalam perangkat lunak. |
| B | Penambahan Asumsi A-10 pada dokumen Tugas 1 mengenai Administrator Sistem, yaitu pemahaman hukumnya yang lebih mendalam daripada Kurator serta kesediaannya meninjau antrean konten secara berkala. Sebelumnya asumsi dari sisi pengguna hanya mencakup Pencari Informasi (A-01 sampai A-04) dan Kurator (A-05), padahal Administrator memegang keputusan akhir atas konten yang tayang ke publik. |
| C | Pemulihan aktivitas A06 (Membaca Inti Masalah dan Hak) pada dokumen Tugas 2 (*Requirement Gathering*), yang sempat terhapus saat perapian tabel sehingga seluruh ID aktivitas di bawahnya bergeser satu nomor. Dengan pemulihan ini, penomoran aktivitas kembali sejajar dengan Tugas 1 dan dengan kedua diagram proses bisnis, serta autentikasi pengelola menempati A20 sebagaimana rencana semula. Kolom ID Aktivitas pada tabel Pemetaan Kebutuhan ikut disesuaikan. |
| D | Penambahan KF44 untuk aksi keluar (*logout*). Aksi ini sudah disebut pada US-17, A20, dan R40, tetapi belum pernah diturunkan menjadi kebutuhan fungsional. KF44 ditambahkan pada tabel Kebutuhan Fungsional dan pada daftar KF milik UC05 di dokumen Tugas 2, Tugas 3, Tugas 4, dan dokumen ini. Karena lingkup UC05 kini mencakup keluar dan berakhirnya sesi, namanya diubah dari "Masuk ke Panel Pengelolaan" menjadi "Masuk dan Keluar Panel Pengelolaan". |
| E | Penambahan KNF14 bertipe *Security* sebagai turunan R43 mengenai pengakhiran sesi pengelola secara otomatis setelah 30 menit tanpa aktivitas. Sebelumnya R43 bertanda P/L "Ya" tetapi merupakan satu-satunya kebutuhan yang belum memiliki turunan KF maupun KNF. |
| F | Penambahan Skenario Alternatif 3 pada UC05 (Mengakhiri Sesi Pengelolaan), yang mencakup keluar secara sengaja maupun sesi yang berakhir otomatis. Skenario ini ditambahkan pada dokumen Tugas 3, Tugas 4, dan dokumen ini. |
| G | Penulisan ulang paragraf penjelasan relasi *include* dan *extend* pada dokumen Tugas 3. Paragraf sebelumnya masih memakai penomoran use case versi lama sehingga setiap ID berpasangan dengan nama yang keliru, menyebut use case "Menampilkan Peringatan Darurat" yang tidak ada pada tabel identifikasi use case, serta menghitung jumlah use case sebagai delapan. Paragraf hasil perbaikan juga ditambahkan pada BAB 4.3 dokumen ini yang sebelumnya belum memuat penjelasan relasi sama sekali. |
| H | Pelengkapan pemodelan kelas untuk aksi keluar pada dokumen Tugas 4. Metode `logout()` ditambahkan pada C25 (KontrolAutentikasi), dan tabel Traceability diperbarui sehingga KF44 direalisasikan oleh C16 (HalamanLogin) sebagai tujuan pengalihan serta C25 sebagai pengendali sesinya. |
| I | Perapian tabel Daftar Perubahan pada dokumen Tugas 2. Sejumlah ID yang dirujuk tidak sesuai dengan tabel final dokumen tersebut, satu kode revisi tercatat ganda, dan deskripsinya diringkas mengikuti catatan asistensi Tugas 2. Sejumlah salah ketik pada dokumen yang sama turut diperbaiki. |
| J | Penyelarasan isi sejumlah Kebutuhan Fungsional antardokumen. Tabel KF sempat direvisi pada Tugas 3 tanpa diikuti Tugas 2, sehingga isinya berbeda pada sebagian butir. Rumusan yang lebih tepat dipertahankan pada versi terbaru, yaitu KF07 kembali menuntut pesan yang sopan agar sejalan dengan R45, KF10 kembali menyebut nama Kurator penulis agar jelas siapa yang diatribusikan, dan KF14 diselaraskan dengan UC03 mengenai pemulihan status *checklist* dari penyimpanan lokal peramban. Penulisan istilah *disclaimer* turut diseragamkan di seluruh dokumen. |
| K | Penurunan ambang KNF02 dari 2 MB menjadi 350 KB. Ambang lama tidak mungkin dipenuhi bersamaan dengan KNF01, karena mengunduh 2 MB pada koneksi 1 Mbps membutuhkan sekitar 17 detik, sedangkan KNF01 menjanjikan halaman tampil dalam 3 detik. Selain itu parameter pada KNF02, KNF07, dan KNF09 dibetulkan agar sesuai dengan aspek mutu yang sebenarnya diukur. |
| L | Penyelarasan dokumen Tugas 1 dengan kedua diagram proses bisnis yang telah diperbarui. US-17 dan aktivitas A20 (Autentikasi Sistem Pengelola) ditambahkan pada tabel Kebutuhan Pengguna Awal dan Deskripsi Aktivitas, aktivitas A05 dirumuskan ulang dari sudut pandang pengguna, serta penamaan tiga belas aktivitas diseragamkan dengan dokumen Tugas 2. Sebelum penyelarasan ini, diagram menampilkan aktivitas yang tidak terdaftar pada tabel dokumen tersebut. |

<br>

# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) ini disusun untuk menjabarkan spesifikasi fungsional dan non-fungsional dari perangkat lunak PahamHukum. Dokumen ini bertujuan untuk menjadi acuan resmi dan kontrak teknis bagi tim pengembang (developer), penguji (tester), dan pengelola proyek (administrator) dalam membangun sistem. Melalui dokumen ini, seluruh pemangku kepentingan dapat memastikan bahwa produk akhir yang dikembangkan selaras dengan kebutuhan, batasan, dan tujuan yang telah disepakati.

## 1.2 Lingkup Masalah
PahamHukum adalah platform literasi hukum berbasis web yang menjembatani masyarakat awam dengan informasi hukum. Sistem ini menyederhanakan bahasa hukum menjadi panduan praktis berdasarkan kelompok kasus sehari-hari, memberikan wawasan, panduan langkah penyelesaian, serta template dokumen pendukung secara gratis. Platform ini tidak bertindak sebagai penasihat hukum resmi, melainkan sebagai penuntun langkah awal bagi masyarakat sebelum mereka berinteraksi langsung dengan lembaga hukum formal.

## 1.3 Definisi, Istilah, dan Singkatan
Semua definisi dan singkatan yang digunakan dalam dokumen ini beserta penjelasannya.

Tabel 1.3. Definisi Istilah dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| *P/L* | *Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu.* |
| *SKPL* | *Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan untuk membangun aplikasi menjalankan tugasnya.* |
| *KF* | *Singkatan dari Kebutuhan Fungsional.* |
| *KNF* | *Singkatan dari Kebutuhan Non-Fungsional.* |
| *UC* | *Singkatan dari Use Case.* |
| *EARS* | *Easy Approach to Requirements Syntax, yaitu pola penulisan kebutuhan agar konsisten dan mudah diuji.* |
| *LBH* | *Lembaga Bantuan Hukum, instansi yang memberikan layanan hukum bagi masyarakat.* |
| *Kurator* | *Pengelola sistem yang bertugas menyusun, menyunting, dan mengajukan konten rangkuman kasus untuk publik.* |
| *Administrator* | *Pemegang otoritas sistem yang memvalidasi konten kurator dan mengatur manajemen akun.* |

## 1.4 Aturan Penomoran
Tuliskan aturan penomoran (ID) yang digunakan dalam dokumen ini. Gunakan pola ID yang **sama** dengan yang sudah dipakai pada dokumen-dokumen sebelumnya, jangan membuat pola baru di dokumen ini.

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| *Kebutuhan (Pemetaan Kebutuhan)* | *RXX* | *XX adalah nomor urut dari 01 hingga 51* |
| *Kebutuhan Fungsional* | *KFXX* | *XX adalah nomor urut dari 01 hingga 44* |
| *Kebutuhan Non-Fungsional* | *KNFXX* | *XX adalah nomor urut dari 01 hingga 14* |
| *Aktor* | *AKTXX* | *XX adalah nomor urut dari 01 hingga 03* |
| *Use Case* | *UCXX* | *XX adalah nomor urut dari 01 hingga 09* |
| *Kelas* | *CXX* | *XX adalah nomor urut dari 01 hingga 29* |

## 1.5 Referensi
1. *Justice Needs in Indonesia 2014: Problems, Processes and Fairness* - The Hague Institute for Innovation of Law (2014)

2. *Analisis Ketimpangan Keadilan di Indonesia: Potret Buram Akses Keadilan bagi Masyarakat Marginal* - Pancasila: Jurnal Keindonesiaan (2025)

3. Mavin, A., Wilkinson, P., Harwood, A., & Novak, M. (2009). Easy Approach to Requirements Syntax (EARS). IEEE.

4. Web Content Accessibility Guidelines (WCAG) 2.1 - W3C

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Dokumen SKPL ini disusun dengan BAB 1 menguraikan pendahuluan, tujuan, lingkup masalah, serta definisi istilah. BAB 2 memaparkan deskripsi umum perangkat lunak, karakteristik pengguna, batasan, serta lingkungan operasi. BAB 3 mendetailkan Kebutuhan Fungsional (KF) dan Kebutuhan Non-Fungsional (KNF) sistem secara terukur. BAB 4 menjabarkan pemodelan Use Case beserta skenarionya. BAB 5 menjelaskan pemodelan Kelas (Class Diagram) baik per-Use Case maupun keseluruhan. Terakhir, BAB 6 memuat matriks keterlacakan (Traceability) yang memetakan hubungan antara Kelas, Use Case, dan Kebutuhan Fungsional.

---

# BAB 2: Deskripsi Perangkat Lunak

## 2.1 Deskripsi Umum Sistem
PahamHukum adalah aplikasi berbasis web yang menjembatani masyarakat awam dengan informasi hukum. Selama ini, informasi hukum di Indonesia ditulis dengan istilah teknis dan disusun untuk kalangan profesional. Akibatnya, orang yang tidak  memiliki latar belakang hukum sering terhenti karena kebingungan. PahamHukum menyajikan ulang informasi tersebut dalam bahasa sehari-hari, lengkap dengan panduan langkah dan templat surat pendukung. Namun, sistem ini tidak menangani perkara, tidak mewakili pengguna secara hukum, dan tidak menggantikan advokat maupun Lembaga Bantuan Hukum (LBH).

Proses bisnis PahamHukum berjalan dalam dua alur. Alur pertama dijalankan Pencari Informasi. Pengguna membuka beranda, menelusuri bidang hukum atau mengetik kata kunci, lalu memilih kasus yang paling mirip dengan situasinya. Judul kasus ditulis dalam bahasa sehari-hari, misalnya "saya diberhentikan tanpa surat", sedangkan istilah hukum resminya hanya menjadi keterangan pelengkap. Setelah kasus dipilih, sistem menampilkan satu halaman rangkuman berisi inti masalah, hak pengguna, langkah penyelesaian, hal yang perlu dipertimbangkan, daftar periksa dokumen, templat surat, artikel dan sumber hukum, serta rujukan LBH.

Di balik layar, alur kedua dijalankan Kurator dan Administrator. Kurator menyusun rangkuman kasus di panel pengelolaan, melampirkan templat, lalu mengajukannya sehingga status konten berubah dari `Draft` menjadi `Diajukan`. Selanjutnya, Administrator memeriksa ketepatan informasi hukum di dalamnya. Konten yang disetujui langsung tayang bersama nama Kurator dan tanggal peninjauan. Sebaliknya, konten yang dikembalikan berstatus `Perlu Revisi` dan wajib disertai catatan perbaikan. Singkatnya, publik hanya melihat konten yang sudah lolos peninjauan.

Kedua alur tersebut dimodelkan dalam *Activity Diagram* berikut.

<p align="center">
<img alt="Activity Diagram Penyediaan Konten untuk Kurator dan Administrator" src="./assets/diagram/kurator.png" width="70%">
</p>
<p align="center">
<i>Gambar 1. Activity Diagram Penyediaan Konten untuk Kurator dan Administrator</i>
</p>
<br>
<p align="center">
<img alt="Activity Diagram untuk Pencari Informasi" src="./assets/diagram/pencari_informasi.png" width="70%">
</p>
<p align="center">
<i>Gambar 2. Activity Diagram untuk Pencari Informasi</i>
</p>

## 2.2 Deskripsi Umum Perangkat Lunak
PahamHukum memiliki dua antarmuka, yaitu halaman publik dan panel pengelolaan. Halaman publik terbuka bagi siapa saja tanpa akun. Di sana, Pencari Informasi dapat menelusuri dan mencari kasus, membaca rangkuman, menandai daftar periksa dokumen, serta mengunduh templat surat. Panel pengelolaan hanya bisa diakses Kurator dan Administrator setelah masuk dengan email dan kata sandi. Kurator memakainya untuk menyusun dan mengajukan konten, sementara Administrator memakainya untuk meninjau konten dan mengelola akun Kurator.

PahamHukum tidak terhubung secara otomatis dengan sistem eksternal. Tidak ada *payment gateway*, layanan tanda tangan digital, ataupun integrasi dengan sistem pengaduan instansi. Keterkaitan dengan pihak luar hanya berupa rujukan dan penyimpanan di sisi pengguna, seperti berikut.
1. Sumber hukum primer terbuka, seperti JDIH dan peraturan.bpk.go.id, dirujuk Kurator saat menyusun konten dan ditampilkan sebagai tautan pada artikel pendukung. Sistem tidak menarik data dari situs tersebut.
2. Direktori LBH ditampilkan beserta area layanannya. Untuk kasus yang ditandai darurat, sistem menampilkan rujukan ke kepolisian atau unit perlindungan terkait. Tidak ada data pengguna yang dikirim ke lembaga mana pun.
3. Penyimpanan lokal peramban (*local storage*) menyimpan status daftar periksa dokumen milik pengguna. Data ini tidak pernah dikirim ke server.

## 2.3 Pengguna dan Kebutuhan Pengguna Perangkat Lunak

| Pengguna | Kebutuhan |
| :--- | :--- |
| Pencari Informasi (Masyarakat Awam) | Menemukan kasus yang sesuai dengan situasinya, baik lewat penelusuran bidang hukum maupun kata kunci sehari-hari. Setelah itu, pengguna dapat membaca rangkuman kasus, menandai daftar periksa dokumen, mengunduh templat surat, dan melihat rujukan sumber hukum serta LBH. Semua fitur ini dipakai tanpa mendaftar akun. |
| Kurator Konten | Masuk ke panel pengelolaan, menulis atau menyunting rangkuman kasus dalam satu formulir, dan melampirkan templat PDF atau DOCX. Kurator juga mengajukan konten untuk ditinjau, lalu memantau statusnya beserta catatan revisi dari Administrator. Kurator tidak dapat menayangkan kontennya sendiri. |
| Administrator Sistem | Masuk ke panel pengelolaan dan melihat antrean konten berstatus `Diajukan`, diurutkan dari yang paling lama menunggu. Pada satu layar, Administrator membaca isi konten lalu memilih Setujui atau Kembalikan dengan catatan revisi. Selain itu, Administrator mendaftarkan, memperbarui, dan menonaktifkan akun Kurator. |

## 2.4 Batasan Perangkat Lunak
1. P/L berjalan sebagai aplikasi web pada peramban Chrome, Firefox, Edge, dan Safari versi rilis dua tahun terakhir, dengan lebar layar minimal 360 piksel.
2. P/L tidak memakai API atau data dari sistem lain. Sumber hukum primer dan direktori LBH hanya ditampilkan sebagai tautan atau informasi statis.
3. P/L hanya menerima templat berformat PDF atau DOCX dengan ukuran paling besar 5 MB.
4. P/L tidak menyimpan data pribadi maupun detail kasus Pencari Informasi di server. Status daftar periksa hanya tersimpan di peramban pengguna.
5. P/L hanya menyediakan informasi umum, bukan nasihat hukum yang mengikat. Oleh karena itu, setiap halaman publik wajib memuat *disclaimer*.
6. P/L tidak menangani situasi darurat secara langsung dan tidak mengirim dokumen ke instansi mana pun. Pengguna diarahkan ke lembaga yang berwenang, lalu menindaklanjuti sendiri.
7. P/L tidak menyediakan pendaftaran akun publik. Akun Kurator hanya dibuat oleh Administrator.
8. Cakupan konten dibatasi pada dua sampai tiga bidang hukum, misalnya ketenagakerjaan dan perlindungan konsumen, dengan antarmuka berbahasa Indonesia.

## 2.5 Lingkungan Operasi Perangkat Lunak

| Komponen | Spesifikasi |
| :--- | :--- |
| Server | Web server pada layanan *cloud hosting* gratis atau berbiaya rendah dengan dukungan HTTPS |
| Client | Peramban Chrome, Firefox, Edge, atau Safari (versi rilis dua tahun terakhir) di komputer maupun ponsel |
| DBMS | Basis data relasional (PostgreSQL atau MySQL) untuk data akun, bidang hukum, kelompok kasus, konten, dan riwayat perubahan status |
| Penyimpanan Berkas | Penyimpanan di sisi server untuk templat PDF dan DOCX |
| OS | Tidak bergantung pada sistem operasi tertentu selama tersedia peramban yang didukung |
| Jaringan | Koneksi internet minimal 1 Mbps agar beranda termuat paling lama 3 detik |

---

# BAB 3: Deskripsi Kebutuhan Perangkat Lunak

## 3.1 Kebutuhan Fungsional (KF)

Tabel 3.1. Kebutuhan Fungsional

| ID KF | ID Kebutuhan | Penjelasan |
| :--- | :--- | :--- |
| KF01 | R01 | Sistem harus menampilkan seluruh bidang hukum yang aktif di beranda utama beserta jumlah kelompok kasus pada masing-masing bidang. |
| KF02 | R02, R13 | Selama sebuah konten berstatus selain Disetujui atau kategori hukumnya sedang dinonaktifkan, sistem harus menyembunyikannya dari *interface* publik dan pencarian internal. |
| KF03 | R05 | Ketika Pencari Informasi mengeklik salah satu bidang hukum, sistem harus menampilkan kelompok kasus yang termasuk dalam bidang tersebut. |
| KF04 | R06 | Sistem harus menampilkan judul utama dari kasus dalam bahasa sehari-hari dan menaruh istilah hukum resminya sebagai keterangan pelengkap. |
| KF05 | R07 | Ketika Pencari Informasi memilih sebuah kelompok kasus, sistem harus menampilkan halaman rangkuman untuk kasus tersebut. |
| KF06 | R08 | Ketika Pencari Informasi memasukkan kata kunci pencarian, sistem harus mencocokkannya dengan judul kasus, kalimat gejala, isi rangkuman, dan istilah hukum resmi, lalu menampilkan hasil yang relevan. |
| KF07 | R09 | Jika pencarian tidak menemukan hasil, maka sistem harus menampilkan pesan yang sopan bahwa kasus belum tersedia, disertai saran bidang hukum lain dan tautan ke lembaga bantuan hukum. |
| KF08 | R11, R12 | Sistem harus menyusun halaman rangkuman kasus dalam satu tampilan berurutan yang meliputi inti masalah, hak, langkah penyelesaian, poin pertimbangan, *checklist* dokumen, templat, artikel pendukung, dan *disclaimer*. |
| KF09 | R46 | Sistem harus menampilkan bagian "hal yang perlu dipertimbangkan" yang berisi perkiraan waktu pengerjaan dan saran kapan pengguna sebaiknya mencari pendampingan profesional. |
| KF10 | R47 | Sistem harus mencantumkan nama Kurator penulis dan tanggal peninjauan oleh Administrator pada setiap rangkuman kasus yang terbit ke publik. |
| KF11 | R14 | Sistem harus menyajikan langkah penyelesaian secara bernomor dan berurutan, lengkap dengan tujuan tiap langkah dan dokumen yang diperlukan pada tahap tersebut. |
| KF12 | R14 | Jika sebuah langkah penyelesaian memiliki tenggat waktu administratif, maka sistem harus menampilkan penanda batas waktu pada langkah tersebut. |
| KF13 | R15 | Ketika Pencari Informasi mencentang sebuah item pada *checklist*, sistem harus memperbarui tampilan item itu dan menghitung berapa banyak dokumen yang sudah disiapkan. |
| KF14 | R16 | Sistem harus menyimpan status *checklist* pada penyimpanan *browser* secara lokal, sehingga *progress* Pencari Informasi tetap terjaga saat halaman dimuat ulang atau dibuka kembali |
| KF15 | R17 | Jika sebuah kasus memiliki berkas templat dokumen, maka sistem harus menampilkan tombol unduh beserta ukuran berkas dan tanggal pembaruan terakhirnya. |
| KF16 | R17 | Ketika Pencari Informasi menekan tombol unduh templat, sistem harus mengirimkan berkas versi terbaru tanpa meminta pengguna mendaftar. |
| KF17 | R18 | Sistem harus menampilkan *disclaimer* bahwa templat hanya berupa kerangka awal, ditempatkan tepat di atas tombol unduh. |
| KF18 | R19 | Sistem harus menampilkan daftar artikel pendukung beserta tautan ke sumber hukum resmi pada bagian akhir halaman rangkuman. |
| KF19 | R21 | Sistem harus menampilkan *disclaimer* pada *footer* di setiap halaman publik yang menegaskan bahwa informasi di PahamHukum bukanlah nasihat hukum resmi. |
| KF20 | R22 | Sistem harus menampilkan direktori Lembaga Bantuan Hukum (LBH) terdekat beserta area layanannya. |
| KF21 | R23 | Ketika Pencari Informasi membuka kelompok kasus yang ditandai sebagai situasi darurat, sistem harus menampilkan peringatan prioritas untuk segera melapor ke kepolisian atau unit perlindungan khusus. |
| KF22 | R24 | Sistem harus menyediakan formulir dinamis bagi Kurator yang urutan isiannya mengikuti susunan baku halaman rangkuman pada KF08. |
| KF23 | R25 | Ketika Kurator membuat draf tulisan baru, sistem harus otomatis menetapkan statusnya sebagai *Draft*. |
| KF24 | R26 | Ketika Administrator menyetujui sebuah tulisan, sistem harus menayangkannya ke *interface* publik tanpa perlu *deploy* ulang aplikasi. |
| KF25 | R27 | Ketika Kurator mengunggah berkas templat ke sebuah kasus, sistem harus menyimpan berkas itu dan mencatat tanggal pembaruannya sebagai versi terbaru. |
| KF26 | R28 | Jika berkas templat yang diunggah bukan PDF atau DOCX, atau melebihi 5 MB, maka sistem harus menolak unggahan dan menampilkan pesan penjelasan yang benar. |
| KF27 | R30 | Ketika Kurator mengajukan sebuah tulisan, sistem harus mengubah statusnya dari *Draft* menjadi *Diajukan* dan memasukkannya ke antrean peninjauan Administrator. |
| KF28 | R31 | Jika Kurator mengajukan tulisan sementara masih ada isian wajib yang kosong, maka sistem harus mencegah pengajuan dan menandai isian mana saja yang belum lengkap. |
| KF29 | R32 | Sistem harus menampilkan daftar tulisan milik tiap Kurator beserta statusnya (*Draft*, *Diajukan*, *Disetujui*, atau *Perlu Revisi*). |
| KF30 | R32 | Jika sebuah tulisan ditetapkan sebagai *Perlu Revisi*, maka sistem harus menampilkan catatan perbaikan dari Administrator pada menu penyuntingan Kurator terkait. |
| KF31 | R33 | Sistem harus menampilkan antrean tulisan berstatus *Diajukan* bagi Administrator, diurutkan dari yang paling lama menunggu, beserta nama pengunggahnya. |
| KF32 | R34 | Ketika Administrator memilih Setujui, sistem harus mengubah status tulisan menjadi "Disetujui". |
| KF33 | R34 | Ketika Administrator memilih Kembalikan, sistem harus mengubah status tulisan menjadi "Perlu Revisi" dan mengirimkan catatan revisi dari Administrator kepada Kurator. |
| KF34 | R35 | Jika Administrator mengembalikan tulisan tetapi kolom alasan revisi dibiarkan kosong, sistem harus menahan perubahan status dan mewajibkan alasan revisi diisi lebih dulu. |
| KF35 | R36 | Jika seorang Kurator mencoba menayangkan sendiri tulisannya, maka sistem harus menolak permintaan tersebut. |
| KF36 | R37 | Ketika status sebuah konten berubah, sistem harus mencatat riwayatnya secara lengkap, memuat nama pengubah, waktu, dan status barunya. |
| KF37 | R38 | Ketika Administrator menonaktifkan akun seorang Kurator, sistem harus segera memutus sesinya jika sedang login dan mencegahnya login kembali. |
| KF38 | R39 | Sistem harus menyediakan pendaftaran akun hanya melalui panel Administrator, dan tidak menyediakan menu *Sign Up* di *interface* publik. |
| KF39 | R40 | Ketika Administrator atau Kurator memasukkan email dan kata sandi yang benar, sistem harus memberi akses dan mengarahkan mereka ke *interface* sesuai perannya. |
| KF40 | R40 | Jika email atau kata sandi yang dimasukkan salah, maka sistem harus menolak akses dengan pesan *error* tanpa menyebutkan bagian mana yang keliru. |
| KF41 | R42 | Jika ada upaya membuka halaman pengelola tanpa sesi login yang sah, maka sistem harus mengalihkannya ke halaman login atau menampilkan halaman akses ditolak. |
| KF42 | R45 | Sistem harus menggunakan Bahasa Indonesia yang sopan dan formal secara konsisten pada label tombol, pesan kesalahan, dan isi *interface*. |
| KF43 | R38 | Ketika Administrator menyimpan perubahan data akun Kurator, sistem harus memperbarui detail akun tersebut dan memberlakukannya pada sesi login Kurator berikutnya. |
| KF44 | R40 | Ketika Kurator atau Administrator menekan tombol keluar, sistem harus mengakhiri sesi pengelolaannya dan mengalihkannya kembali ke halaman login. |

## 3.2 Kebutuhan Non-Fungsional (KNF)

Tabel 3.2. Kebutuhan Non-Fungsional

| ID KNF | ID Kebutuhan | Parameter | Deskripsi Kebutuhan |
| :--- | :--- | :--- | :--- |
| KNF01 | R03 | Response time | Ketika pengguna membuka halaman beranda pada koneksi 1 Mbps, sistem harus menampilkan bagian inti halaman dalam waktu paling lama 3 detik. |
| KNF02 | R03 | Efficiency | Pada pemuatan awal tanpa cache, total data yang diunduh untuk satu halaman tidak boleh melebihi 350 KB, di luar berkas templat yang diunduh pengguna atas permintaannya sendiri. |
| KNF03 | R04 | Portability | Antarmuka harus berjalan normal di peramban umum (Chrome, Firefox, Edge, dan Safari) untuk versi rilis dua tahun terakhir, serta tetap tertata rapi pada lebar layar mulai dari 360 piksel. |
| KNF04 | R10 | Response time | Ketika pengguna melakukan pencarian, sistem harus menampilkan hasil dalam waktu paling lama 2 detik, meski jumlah data kasus sudah melebihi 500 entri. |
| KNF05 | R51 | Availability | Layanan publik harus tersedia (uptime) minimal 95 persen setiap bulan, di luar jadwal pemeliharaan yang sudah diumumkan sebelumnya. |
| KNF06 | R16 | Security | Interaksi pada daftar periksa dan rekam jejak kasus harus tetap anonim dan tersimpan hanya di perangkat pengguna. Data ini tidak boleh dikirim atau disimpan ke *database* server. |
| KNF07 | R26 | Response time | Ketika Administrator menyetujui perubahan konten, perubahan itu harus tampil di halaman publik dalam waktu paling lama 60 detik, tanpa perlu menerapkan ulang (re-deploy) kode program. |
| KNF08 | R29 | Reliability | Jika koneksi terputus atau rusak saat Kurator mengunggah templat baru, sistem harus mengembalikan (rollback) templat ke versi sebelumnya, sehingga pengguna tidak pernah menerima berkas yang rusak. |
| KNF09 | R37 | Security | Riwayat perubahan status konten (Approval Log) harus tersimpan permanen dan tidak dapat diubah. Administrator sekalipun tidak boleh menghapus atau menyunting catatan log ini. |
| KNF10 | R41 | Security | Sistem dilarang menyimpan kata sandi dalam bentuk teks mentah (plain-text). Kata sandi wajib di-hash dengan algoritma bcrypt pada cost factor minimal 10 sebelum disimpan di server. |
| KNF11 | R42 | Security | Seluruh lalu lintas jaringan sistem, baik pada halaman publik maupun panel pengelola, harus memakai koneksi aman TLS/HTTPS. Setiap akses lewat HTTP biasa harus otomatis dialihkan ke HTTPS. |
| KNF12 | R48 | Ergonomy | Formulir penyusunan konten kasus harus berada dalam satu halaman (single-page form) yang dinamis, sehingga Kurator tidak perlu berpindah-pindah tab saat mengisinya. |
| KNF13 | R49 | Ergonomy | Saat meninjau konten, Administrator harus dapat membaca isi tulisan sekaligus menekan tombol keputusan ("Setujui" dan "Kembalikan") pada satu layar yang sama, tanpa berpindah tab. |
| KNF14 | R43 | Security | Sistem harus mengakhiri sesi panel pengelolaan secara otomatis setelah 30 menit tanpa aktivitas, lalu mewajibkan Kurator atau Administrator masuk kembali sebelum dapat melanjutkan pekerjaannya. |

---

# BAB 4: Pemodelan Use Case

## 4.1 Identifikasi Aktor

| ID Aktor | Aktor | Deskripsi |
| :--- | :--- | :--- |
| AKT01 | **Pencari Informasi (Masyarakat Awam)** | Masyarakat umum yang sedang menghadapi persoalan hukum, atau sekadar ingin memahaminya, misalnya sengketa ketenagakerjaan dan perselisihan transaksi. Kebanyakan tidak berlatar hukum dan kurang familier dengan istilah teknis maupun nomor peraturan. Yang mereka butuhkan kejelasan, bahasa yang sederhana, dan panduan langkah yang praktis. Umumnya, situs diakses lewat perangkat seluler dengan kualitas koneksi yang bervariasi, dan mereka memakai sistem tanpa perlu mendaftar dan membuat akun. |
| AKT02 | **Kurator Konten** | Tim pengelola yang menyusun kategori hukum, menulis rangkuman kasus, mengunggah materi pendukung, dan menyiapkan *template* dokumen. Mereka memiliki pemahaman dasar tentang hukum, teliti saat merujuk peraturan, serta konsisten menjaga informasi tetap mudah dicerna orang awam. Kurator bekerja melalui panel pengelolaan dan tidak berwenang menerbitkan konten langsung ke publik. |
| AKT03 | **Administrator Sistem** | Pemegang otoritas tertinggi dalam sistem. Tugas utamanya meninjau akurasi konten dari Kurator sebelum terbit, sekaligus mengelola akun dan hak akses mereka. Pemahaman hukumnya umumnya lebih dalam daripada Kurator dengan tingkat kehati-hatian yang tinggi untuk meloloskan informasi hukum bagi konsumsi publik, contohnya praktisi hukum atau mahasiswa tingkat akhir di bidang hukum. |

## 4.2 Identifikasi Use Case
| ID UC | Nama Use Case | Deskripsi Singkat | Aktor | ID KF |
| :--- | :--- | :--- | :--- | :--- |
| UC01 | Menelusuri dan Membaca Rangkuman Kasus | Pencari Informasi menelusuri bidang dan kelompok hukum, lalu membuka satu halaman rangkuman kasus yang memuat inti masalah, hak, langkah, pertimbangan, dan referensi. | Pencari Informasi | KF01, KF02, KF03, KF04, KF05, KF08, KF09, KF10, KF11, KF12, KF18, KF19, KF20, KF21, KF42 |
| UC02 | Mencari Kasus | Pencari Informasi mengetik kata kunci untuk langsung menuju kasus yang dicari tanpa menelusuri seluruh kategori. | Pencari Informasi | KF02, KF06, KF07 |
| UC03 | Menyiapkan Dokumen dengan *Checklist* | Pencari Informasi menandai dokumen yang sudah disiapkan pada *checklist*, dan progresnya tersimpan di *browser* sehingga tetap terjaga saat halaman dibuka kembali. | Pencari Informasi | KF13, KF14 |
| UC04 | Mengunduh Templat Dokumen | Pencari Informasi mengunduh templat surat yang tersedia pada sebuah kasus sebagai kerangka awal dokumen. | Pencari Informasi | KF15, KF16, KF17 |
| UC05 | Masuk dan Keluar Panel Pengelolaan | Kurator atau Administrator masuk ke panel pengelolaan menggunakan email dan kata sandinya, lalu keluar setelah menyelesaikan pekerjaannya. | Kurator Konten, Administrator Sistem | KF39, KF40, KF41, KF44 |
| UC06 | Mengelola Konten Rangkuman Kasus | Kurator menulis, menyunting, melampirkan templat, lalu mengajukan konten rangkuman kasus untuk ditinjau. | Kurator Konten | KF22, KF23, KF25, KF26, KF27, KF28, KF35 |
| UC07 | Memantau Status dan Revisi Konten | Kurator memantau status pengajuan kontennya dan membaca catatan revisi bila ada. | Kurator Konten | KF29, KF30 |
| UC08 | Meninjau dan Memutuskan Konten | Administrator meninjau konten yang diajukan Kurator, lalu menyetujui atau mengembalikannya disertai catatan. | Administrator Sistem | KF24, KF31, KF32, KF33, KF34, KF36 |
| UC09 | Mengelola Akun Kurator | Administrator mendaftarkan, memperbarui, atau menonaktifkan akun Kurator beserta hak aksesnya. | Administrator Sistem | KF37, KF38, KF43 |

## 4.3 Use Case Diagram
Diagram berikut memuat ketiga aktor (Pencari Informasi, Kurator Konten, dan Administrator Sistem) beserta sembilan use case (UC01 hingga UC09) yang diidentifikasi pada 4.2.

<br>
<p align="center">
<img alt="Use Case Diagram Sistem PahamHukum" src="./assets/diagram/useCaseDiagram.png" width="80%">
</p>
<p align="center">
<i>Gambar 3. Use Case Diagram Sistem PahamHukum</i>
</p>
<br>

**Relasi *include*:** UC06 (Mengelola Konten Rangkuman Kasus), UC07 (Memantau Status dan Revisi Konten), UC08 (Meninjau dan Memutuskan Konten), dan UC09 (Mengelola Akun Kurator) masing-masing meng-*include* UC05 (Masuk dan Keluar Panel Pengelolaan), karena keempatnya selalu menuntut sesi login pengelola yang sah sebelum dapat dijalankan — perilaku wajib yang dipakai ulang di tiap use case pengelolaan.

**Relasi *extend*:** UC03 (Menyiapkan Dokumen dengan *Checklist*) dan UC04 (Mengunduh Templat Dokumen) masing-masing meng-*extend* UC01 (Menelusuri dan Membaca Rangkuman Kasus). Keduanya merupakan tindakan pilihan yang hanya dijalankan bila Pencari Informasi memang memerlukannya saat berada di halaman rangkuman kasus, bukan langkah wajib dalam alur membaca rangkuman pada umumnya. Adapun peringatan situasi darurat tidak dimodelkan sebagai use case tersendiri, melainkan sebagai Skenario Alternatif 1 pada UC01, karena peringatan tersebut merupakan reaksi sistem di dalam alur yang sama, bukan tujuan terpisah yang dikejar aktor.

## 4.4 Skenario Use Case

### 4.4.1 Skenario UC01

**Nama Use Case:** Menelusuri dan Membaca Rangkuman Kasus

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Pencari Informasi membuka halaman beranda | Sistem menampilkan seluruh bidang hukum aktif beserta jumlah kelompok kasus pada masing-masing bidang, dan hanya menampilkan konten yang sudah berstatus Disetujui |
| 2 | Pencari Informasi memilih salah satu bidang hukum | Sistem menampilkan kelompok kasus pada bidang tersebut, dengan judul dalam bahasa sehari-hari dan istilah hukum resmi sebagai keterangan pelengkap |
| 3 | Pencari Informasi memilih kelompok kasus yang sesuai | Sistem membuka halaman rangkuman kasus yang tersusun berurutan, meliputi inti masalah, hak, langkah penyelesaian, poin pertimbangan, checklist dokumen, templat, artikel pendukung, dan *disclaimer* |
| 4 | Pencari Informasi membaca bagian hak dan pertimbangan | Sistem menampilkan hak pengguna serta bagian "hal yang perlu dipertimbangkan" yang memuat perkiraan waktu pengerjaan dan saran kapan sebaiknya mencari pendampingan profesional |
| 5 | Pencari Informasi membaca langkah penyelesaian | Sistem menyajikan langkah secara bernomor dan berurutan, lengkap dengan tujuan tiap langkah dan dokumen yang diperlukan, serta menandai langkah yang memiliki tenggat waktu |
| 6 | Pencari Informasi menelusuri bagian akhir halaman | Sistem menampilkan artikel pendukung bertaut ke sumber hukum resmi, direktori Lembaga Bantuan Hukum terdekat, nama Kurator dan tanggal peninjauan, serta *disclaimer* pada footer |

<br>

**Skenario Alternatif 1: Kasus Ditandai Situasi Darurat**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Pencari Informasi memilih kelompok kasus yang ditandai sebagai situasi darurat | Sistem menampilkan peringatan prioritas agar segera melapor ke kepolisian atau unit perlindungan khusus |
| 2 | Pencari Informasi menutup peringatan dan melanjutkan | Sistem menampilkan halaman rangkuman kasus seperti pada skenario normal |

### 4.4.2 Skenario UC02

**Nama Use Case:** Mencari Kasus

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Pencari Informasi mengetik kata kunci pada kolom pencarian | Sistem mencocokkan kata kunci dengan judul kasus, kalimat gejala, isi rangkuman, dan istilah hukum resmi |
| 2 | Pencari Informasi mengirim pencarian | Sistem menampilkan daftar kasus yang relevan, terbatas pada konten yang sudah Disetujui |
| 3 | Pencari Informasi memilih salah satu hasil | Sistem membuka halaman rangkuman kasus terkait |

<br>

**Skenario Alternatif 1: Pencarian Tidak Menemukan Hasil**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Pencari Informasi mengirim kata kunci yang tidak cocok dengan kasus mana pun | Sistem menampilkan pesan yang sopan bahwa kasus belum tersedia, disertai saran bidang hukum lain dan tautan lembaga bantuan hukum |

### 4.4.3 Skenario UC03

**Nama Use Case:** Menyiapkan Dokumen dengan *Checklist*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Pencari Informasi membuka bagian *checklist* dokumen pada halaman rangkuman | Sistem menampilkan daftar dokumen yang perlu disiapkan |
| 2 | Pencari Informasi mencentang dokumen yang sudah disiapkan | Sistem memperbarui tampilan item yang dicentang, menghitung berapa banyak dokumen yang sudah siap, dan menyimpan status centang ke penyimpanan lokal peramban |
| 3 | Pencari Informasi meninggalkan halaman | Sistem mempertahankan status centang di penyimpanan lokal peramban pengguna tanpa mengirimnya ke server |

<br>

**Skenario Alternatif 1: Pengguna Memuat Ulang atau Membuka Kembali Halaman**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Pencari Informasi memuat ulang atau membuka kembali halaman rangkuman yang sama | Sistem memulihkan status *checklist* dan centangnya dari penyimpanan lokal peramban, sehingga progres sebelumnya tetap terjaga |

### 4.4.4 Skenario UC04

**Nama Use Case:** Mengunduh Templat Dokumen

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Pencari Informasi mencari bagian templat pada halaman rangkuman | Sistem menampilkan tombol unduh beserta ukuran berkas dan tanggal pembaruan terakhir, serta *disclaimer* bahwa templat hanya kerangka awal tepat di atas tombol |
| 2 | Pencari Informasi menekan tombol unduh | Sistem mengirimkan berkas templat versi terbaru tanpa meminta pengguna mendaftar |

<br>

**Skenario Alternatif 1: Kasus Belum Memiliki Templat**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Pencari Informasi membuka kasus yang belum memiliki berkas templat | Sistem tidak menampilkan tombol unduh dan menyatakan bahwa templat belum tersedia untuk kasus tersebut |

### 4.4.5 Skenario UC05

**Nama Use Case:** Masuk dan Keluar Panel Pengelolaan

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Kurator atau Administrator membuka halaman login dan memasukkan email dan kata sandi yang benar | Sistem memberi akses dan mengarahkan pengguna ke antarmuka kerja sesuai perannya |

<br>

**Skenario Alternatif 1: Kredensial Salah**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Pengguna memasukkan email atau kata sandi yang keliru | Sistem menolak akses dan menampilkan pesan galat tanpa menyebutkan bagian mana yang salah |

<br>

**Skenario Alternatif 2: Akses Tanpa Sesi yang Sah**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Pengguna mencoba membuka halaman pengelola tanpa sesi login yang sah | Sistem mengalihkannya ke halaman login atau menampilkan halaman akses ditolak |

<br>

**Skenario Alternatif 3: Mengakhiri Sesi Pengelolaan**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Kurator atau Administrator menekan tombol keluar setelah menyelesaikan pekerjaannya | Sistem mengakhiri sesi pengelolaannya dan mengalihkannya kembali ke halaman login |
| 2 | Kurator atau Administrator meninggalkan panel pengelolaan tanpa aktivitas selama 30 menit | Sistem mengakhiri sesi tersebut secara otomatis dan mewajibkan pengguna masuk kembali sebelum dapat melanjutkan pekerjaannya |

### 4.4.6 Skenario UC06

**Nama Use Case:** Mengelola Konten Rangkuman Kasus

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Kurator membuka formulir penyusunan konten | Sistem menampilkan formulir dinamis yang urutan isiannya mengikuti susunan baku halaman rangkuman |
| 2 | Kurator mulai menulis draf baru | Sistem menetapkan status konten sebagai Draft secara otomatis |
| 3 | Kurator melampirkan berkas templat pada kasus | Sistem menyimpan berkas dan memperbarui riwayat perubahan dokumen sebagai versi paling baru |
| 4 | Kurator melengkapi seluruh isian wajib lalu mengajukan konten | Sistem mengubah status dari Draft menjadi Diajukan dan memasukkannya ke antrean peninjauan Administrator |

<br>

**Skenario Alternatif 1: Berkas Templat Tidak Valid**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Kurator mengunggah berkas templat selain PDF atau DOCX, atau berukuran melebihi 5 MB | Sistem menolak unggahan dan menampilkan pesan yang menjelaskan format dan ukuran yang benar |

<br>

**Skenario Alternatif 2: Isian Wajib Belum Lengkap**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Kurator mengajukan konten sementara masih ada isian wajib yang kosong | Sistem mencegah pengajuan dan menandai isian mana saja yang belum lengkap |

<br>

**Skenario Alternatif 3: Kurator Mencoba Menayangkan Sendiri**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Kurator mencoba menayangkan langsung kontennya ke publik | Sistem menolak permintaan tersebut, karena penayangan hanya dapat dilakukan melalui persetujuan Administrator |

### 4.4.7 Skenario UC07

**Nama Use Case:** Memantau Status dan Revisi Konten

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Kurator membuka daftar kontennya | Sistem menampilkan seluruh tulisan milik Kurator beserta statusnya, yaitu Draft, Diajukan, Disetujui, atau Perlu Revisi |

<br>

**Skenario Alternatif 1: Konten Berstatus Perlu Revisi**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Kurator membuka konten yang berstatus Perlu Revisi | Sistem menampilkan catatan perbaikan dari Administrator pada menu penyuntingan konten terkait |

### 4.4.8 Skenario UC08

**Nama Use Case:** Meninjau dan Memutuskan Konten

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Administrator membuka antrean peninjauan | Sistem menampilkan daftar konten berstatus Diajukan, diurutkan dari yang paling lama menunggu beserta nama pengunggahnya |
| 2 | Administrator membuka salah satu konten dan meninjau isinya | Sistem menampilkan isi konten pada layar peninjauan |
| 3 | Administrator memilih Setujui | Sistem mengubah status menjadi Disetujui, menayangkan konten ke publik, dan mencatat riwayat perubahan status |

<br>

**Skenario Alternatif 1: Konten Dikembalikan dengan Catatan Revisi**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Administrator memilih Kembalikan dan mengisi alasan revisi | Sistem mengubah status menjadi Perlu Revisi, mengirimkan catatan revisi kepada Kurator, dan mencatat riwayat perubahan status |

<br>

**Skenario Alternatif 2: Alasan Revisi Dikosongkan**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Administrator memilih Kembalikan tetapi membiarkan kolom alasan revisi kosong | Sistem menahan perubahan status dan mewajibkan alasan revisi diisi lebih dulu |

### 4.4.9 Skenario UC09

**Nama Use Case:** Mengelola Akun Kurator

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Administrator membuka panel pengelolaan akun dan mendaftarkan akun Kurator baru | Sistem membuat akun tersebut melalui panel Administrator, tanpa membuka pendaftaran mandiri di *interface* publik |
| 2 | Administrator memperbarui detail akun Kurator | Sistem menyimpan perubahan dan memberlakukannya pada sesi login Kurator berikutnya |

<br>

**Skenario Alternatif 1: Penonaktifan Akun Kurator**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Administrator menonaktifkan akun seorang Kurator | Sistem segera memutus sesi Kurator tersebut bila sedang login dan mencegahnya login kembali |

---

# BAB 5: Pemodelan Kelas

## 5.1 Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas | ID Use Case |
| :--- | :--- | :--- | :--- |
| C01 | Akun | Berisi data akun pengelola (email, kata sandi, peran, dan status) yang digunakan dalam sistem, menjadi induk dari Kurator dan Administrator | UC05, UC09 |
| C02 | Kurator | Salah satu pengelola yang menyusun dan mengajukan konten, turunan dari Akun | UC05, UC06, UC07, UC09 |
| C03 | Administrator | Salah satu pengelola yang meninjau konten yang berbasis hukum dan mengelola akun Kurator, turunan dari Akun | UC05, UC08, UC09 |
| C04 | BidangHukum | Kategori hukum lebih umum yang menaungi beberapa kelompok kasus yang lebih rinci sesuai peristiwa | UC01, UC02 |
| C05 | KelompokKasus | Satu jenis kasus dengan judul umum yang mudah dimengerti dan *disclaimer* jika kasus termasuk kelompok "darurat", menaungi satu rangkuman | UC01, UC02 |
| C06 | RangkumanKasus | Halaman konten inti sebuah kasus yang menyimpan inti masalah, hak pelapor, poin pertimbangan, alur dan *timeline* pelaporan, langkah penyelesaian, *checklist* dokumen, templat, dan artikel pendukung menjadi satu kesatuan. Dicantumkan juga nama penulis dan tanggal peninjauan terkini | UC01, UC02, UC03, UC04, UC06, UC07, UC08 |
| C07 | LangkahPenyelesaian | Langkah bernomor pada rangkuman kasus yang memuat tujuan, dokumen yang diperlukan, dan tenggat waktu untuk pelaporan | UC01, UC06 |
| C08 | *Checklist* | Daftar dokumen yang perlu disiapkan untuk sebuah kasus yang ditulis oleh Kurator sebagai bagian dari konten | UC01, UC03, UC06 |
| C09 | TemplatDokumen | Berkas surat berupa templat yang dapat diunduh, disertai informasi mengenai format, ukuran *file*, versi, dan tanggal pembaruan | UC01, UC04, UC06 |
| C10 | Artikel | Artikel pendukung beserta tautan ke sumber hukum resmi pada rangkuman | UC01, UC06 |
| C11 | LembagaBantuanHukum | Direktori LBH beserta area layanannya | UC01, UC02 |
| C12 | RiwayatStatus | Menyimpan riwayat status konten setiap kali terjadi perubahan, yang dicatat adalah konten yang berubah, siapa yang mengubah, kapan, dan statusnya | UC06, UC08 |
| C13 | HalamanJelajahKasus | Layar beranda tempat Pencari Informasi menelusuri bidang hukum lalu memilih kelompok kasus | UC01 |
| C14 | HalamanRangkumanKasus | Layar yang menampilkan isi lengkap satu rangkuman kasus termasuk langkah, *checklist*, templat, artikel, dan direktori LBH. | UC01, UC03, UC04 |
| C15 | HalamanPencarianKataKunci | Layar berisi kolom pencarian dan daftar hasil pencocokan kata kunci | UC02 |
| C16 | HalamanLogin | Layar untuk *log in* bagi Kurator dan Administrator | UC05 |
| C17 | HalamanPenyusunanKonten | Semacam formulir tempat Kurator menyusun, menyunting, melampirkan templat dokumen, dan mengajukan konten | UC06 |
| C18 | HalamanDaftarKontenKurator | Layar berisi daftar konten milik Kurator beserta status dan catatan revisinya | UC07 |
| C19 | HalamanModerasiKonten | Layar antrean dan peninjauan konten untuk Administrator | UC08 |
| C20 | HalamanPengelolaanAkun | Panel Administrator untuk mendaftarkan, memperbarui, dan menonaktifkan akun Kurator | UC09 |
| C21 | KontrolJelajahKasus | Mengatur alur menampilkan bidang hukum, kelompok, dan rangkuman kasus | UC01 |
| C22 | KontrolPencarianKataKunci | Memproses kata kunci, mengambil hasil yang relevan, dan menyarankan alternatif jika tidak ditemukan kasusnya | UC02 |
| C23 | KontrolChecklist | Mengambil *checklist* dan menghitung kelengkapan dokumen yang dicentang | UC03 |
| C24 | KontrolUnduhTemplat | Menyediakan berkas templat versi terbaru untuk diunduh | UC04 |
| C25 | KontrolAutentikasi | Memeriksa kredensial akun, mengarahkan pengguna ke antarmuka sesuai perannya, serta mengakhiri sesi ketika pengguna keluar atau sesi kedaluwarsa | UC05 |
| C26 | KontrolPenyusunanKonten | Mengatur pembuatan draf, pelampiran templat, validasi isian, dan pengajuan konten oleh Kurator untuk mengubah status konten (Draf -> Diajukan) | UC06 |
| C27 | KontrolPelacakanKonten | Mengambil daftar konten milik Kurator dan catatan revisinya | UC07 |
| C28 | KontrolModerasiKonten | Mengatur persetujuan dan pengembalian konten dari Administrator sekaligus pencatatan riwayat status ke entity RiwayatStatus | UC08 |
| C29 | KontrolPengelolaanAkun | Mengatur pendaftaran, pembaruan, dan penonaktifan akun Kurator | UC09 |

## 5.2 Diagram Kelas per Use Case

### 5.2.1 Use Case UC01

**Nama Use Case:** Menelusuri dan Membaca Rangkuman Kasus

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C13 | HalamanJelajahKasus | Layar beranda tempat Pencari Informasi menelusuri bidang hukum lalu memilih kelompok kasus |
| C14 | HalamanRangkumanKasus | Layar yang menampilkan isi lengkap satu rangkuman kasus termasuk langkah, *checklist*, templat, artikel, dan direktori LBH |
| C21 | KontrolJelajahKasus | Mengatur alur menampilkan bidang hukum, kelompok, dan rangkuman kasus |
| C04 | BidangHukum | Kategori hukum lebih umum yang menaungi beberapa kelompok kasus yang lebih rinci sesuai peristiwa |
| C05 | KelompokKasus | Satu jenis kasus dengan judul umum yang mudah dimengerti dan *disclaimer* jika kasus termasuk kelompok "darurat", menaungi satu rangkuman |
| C06 | RangkumanKasus | Halaman konten inti sebuah kasus yang menyimpan inti masalah, hak pelapor, poin pertimbangan, langkah penyelesaian, *checklist* dokumen, templat, dan artikel pendukung menjadi satu kesatuan, beserta nama penulis dan tanggal peninjauan terkini |
| C07 | LangkahPenyelesaian | Langkah bernomor pada rangkuman kasus yang memuat tujuan, dokumen yang diperlukan, dan tenggat waktu untuk pelaporan |
| C08 | *Checklist* | Daftar dokumen yang perlu disiapkan untuk sebuah kasus yang ditulis oleh Kurator sebagai bagian dari konten |
| C09 | TemplatDokumen | Berkas surat berupa templat yang dapat diunduh, disertai informasi mengenai format, ukuran *file*, versi, dan tanggal pembaruan |
| C10 | Artikel | Artikel pendukung beserta tautan ke sumber hukum resmi pada rangkuman |
| C11 | LembagaBantuanHukum | Direktori LBH beserta wilayah layanannya, dicari berdasarkan wilayah yang dipilih pengguna |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC01" src="./assets/diagram/ClassDiagram_UC01.svg" width="70%">
</p>
<p align="center">
<i>Gambar 4. Diagram Kelas Use Case UC01</i>
</p>
<br>


| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C13 | HalamanJelajahKasus | - sectionDaftarBidang: Section<br>- kartuBidangHukum: Card [1..\*]<br>- sectionDaftarKelompok: Section<br>- kartuKelompokKasus: Card [1..\*]<br>- popupPeringatanDarurat: Modal<br>- tombolTutupPeringatan: Button | + tampilkanHalaman(): void<br>+ klikBidangHukum(idBidang: int): void<br>+ klikKelompokKasus(idKelompok: int): void<br>+ tutupPeringatan(): void |
| C14 | HalamanRangkumanKasus | - sectionIntiMasalah: Section<br>- sectionHak: Section<br>- sectionPertimbangan: Section<br>- sectionLangkah: Section<br>- penandaTenggat: Badge [0..\*]<br>- sectionChecklist: Section<br>- checkboxDokumen: Checkbox [1..\*]<br>- labelKelengkapan: Text<br>- sectionTemplat: Section<br>- tombolUnduh: Button [0..\*]<br>- labelInfoBerkas: Text<br>- sectionArtikel: Section<br>- sectionLBH: Section<br>- dropdownWilayah: Select<br>- labelPenulis: Text<br>- teksDisclaimer: Text | + tampilkanHalaman(idKelompok: int): void<br>+ pilihWilayah(wilayah: string): void<br>+ centangDokumen(indeks: int): void<br>- simpanStatusCentang(): void<br>- muatStatusCentang(): void<br>+ klikTombolUnduh(idTemplat: int): void |
| C21 | KontrolJelajahKasus | - | + ambilDaftarBidang(): BidangHukum [1..\*]<br>+ ambilDaftarKelompok(idBidang: int): KelompokKasus [1..\*]<br>+ ambilRangkuman(idKelompok: int): RangkumanKasus<br>+ ambilDaftarLBH(wilayah: string): LembagaBantuanHukum [0..\*] |
| C04 | BidangHukum | - idBidang: int<br>- nama: string<br>- jumlahKelompokKasus: int<br>- statusAktif: bool | + ambilDaftarKelompok(): KelompokKasus [1..\*]<br>+ cekAktif(): bool |
| C05 | KelompokKasus | - idKelompok: int<br>- idBidang: int<br>- judulUmum: string<br>- istilahResmi: string<br>- penandaDarurat: bool | + ambilRangkuman(): RangkumanKasus<br>+ cekDarurat(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool |
| C06 | RangkumanKasus | - idRangkuman: int<br>- idKelompok: int<br>- idKurator: int<br>- intiMasalah: string<br>- hak: string<br>- poinPertimbangan: string<br>- status: string<br>- namaPenulis: string<br>- tanggalPeninjauan: date<br>- catatanRevisi: string | + cekDisetujui(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool<br>+ ambilChecklist(): Checklist<br>+ ambilDaftarTemplat(): TemplatDokumen [0..\*]<br>+ ambilTemplat(idTemplat: int): TemplatDokumen<br>+ lampirkanTemplat(berkas: file): void<br>+ simpanDraf(): void<br>+ cekIsianLengkap(): bool<br>+ aturStatus(statusBaru: string): void<br>+ ambilCatatanRevisi(): string<br>+ simpanCatatanRevisi(catatan: string): void |
| C07 | LangkahPenyelesaian | - idLangkah: int<br>- idRangkuman: int<br>- nomor: int<br>- deskripsi: string<br>- tujuan: string<br>- dokumenDiperlukan: string [1..\*]<br>- tenggat: date [0..1] | + punyaTenggat(): bool |
| C08 | *Checklist* | - idChecklist: int<br>- idRangkuman: int<br>- daftarDokumen: string [1..\*] | + hitungJumlahDokumen(): int |
| C09 | TemplatDokumen | - idTemplat: int<br>- idRangkuman: int<br>- namaBerkas: string<br>- format: string<br>- ukuran: int<br>- versi: string<br>- tanggalPembaruan: date | + unduh(): file<br>+ perbaruiVersi(berkas: file): void<br>- validasiUnggahan(berkas: file): bool |
| C10 | Artikel | - idArtikel: int<br>- idRangkuman: int<br>- judul: string<br>- tautanSumber: string | + ambilTautan(): string |
| C11 | LembagaBantuanHukum | - idLBH: int<br>- nama: string<br>- wilayah: string<br>- tautan: string | + cocokkanWilayah(wilayah: string): bool |

---

### 5.2.2 Use Case UC02

**Nama Use Case:** Mencari Kasus

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C15 | HalamanPencarianKataKunci | Layar berisi kolom pencarian dan daftar hasil pencocokan kata kunci |
| C22 | KontrolPencarianKataKunci | Memproses kata kunci, mengambil hasil yang relevan, dan menyarankan alternatif jika tidak ditemukan kasusnya |
| C04 | BidangHukum | Kategori hukum lebih umum yang menaungi beberapa kelompok kasus yang lebih rinci sesuai peristiwa |
| C05 | KelompokKasus | Satu jenis kasus dengan judul umum yang mudah dimengerti dan *disclaimer* jika kasus termasuk kelompok "darurat", menaungi satu rangkuman |
| C06 | RangkumanKasus | Halaman konten inti sebuah kasus yang menyimpan inti masalah, hak pelapor, poin pertimbangan, langkah penyelesaian, *checklist* dokumen, templat, dan artikel pendukung menjadi satu kesatuan, beserta nama penulis dan tanggal peninjauan terkini |
| C11 | LembagaBantuanHukum | Direktori LBH beserta wilayah layanannya, dicari berdasarkan wilayah yang dipilih pengguna |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC02" src="./assets/diagram/ClassDiagram_UC02.svg" width="70%">
</p>
<p align="center">
<i>Gambar 5. Diagram Kelas Use Case UC02</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C15 | HalamanPencarianKataKunci | - kolomPencarian: TextField<br>- tombolCari: Button<br>- daftarHasil: Card [0..\*]<br>- pesanTidakDitemukan: Text<br>- saranBidangLain: Card [0..\*]<br>- sectionLBH: Section<br>- dropdownWilayah: Select | + klikCari(kataKunci: string): void<br>+ klikHasil(idKelompok: int): void<br>+ pilihWilayah(wilayah: string): void |
| C22 | KontrolPencarianKataKunci | - | + cariKasus(kataKunci: string): KelompokKasus [0..\*]<br>+ sarankanBidangLain(): BidangHukum [1..\*]<br>+ ambilDaftarLBH(wilayah: string): LembagaBantuanHukum [0..\*] |
| C04 | BidangHukum | - idBidang: int<br>- nama: string<br>- jumlahKelompokKasus: int<br>- statusAktif: bool | + ambilDaftarKelompok(): KelompokKasus [1..\*]<br>+ cekAktif(): bool |
| C05 | KelompokKasus | - idKelompok: int<br>- idBidang: int<br>- judulUmum: string<br>- istilahResmi: string<br>- penandaDarurat: bool | + ambilRangkuman(): RangkumanKasus<br>+ cekDarurat(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool |
| C06 | RangkumanKasus | - idRangkuman: int<br>- idKelompok: int<br>- idKurator: int<br>- intiMasalah: string<br>- hak: string<br>- poinPertimbangan: string<br>- status: string<br>- namaPenulis: string<br>- tanggalPeninjauan: date<br>- catatanRevisi: string | + cekDisetujui(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool<br>+ ambilChecklist(): Checklist<br>+ ambilDaftarTemplat(): TemplatDokumen [0..\*]<br>+ ambilTemplat(idTemplat: int): TemplatDokumen<br>+ lampirkanTemplat(berkas: file): void<br>+ simpanDraf(): void<br>+ cekIsianLengkap(): bool<br>+ aturStatus(statusBaru: string): void<br>+ ambilCatatanRevisi(): string<br>+ simpanCatatanRevisi(catatan: string): void |
| C11 | LembagaBantuanHukum | - idLBH: int<br>- nama: string<br>- wilayah: string<br>- tautan: string | + cocokkanWilayah(wilayah: string): bool |

---

### 5.2.3 Use Case UC03

**Nama Use Case:** Menyiapkan Dokumen dengan *Checklist*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C14 | HalamanRangkumanKasus | Layar yang menampilkan isi lengkap satu rangkuman kasus termasuk langkah, *checklist*, templat, artikel, dan direktori LBH |
| C23 | KontrolChecklist | Mengambil *checklist* dan menghitung kelengkapan dokumen yang dicentang |
| C06 | RangkumanKasus | Halaman konten inti sebuah kasus yang menyimpan inti masalah, hak pelapor, poin pertimbangan, langkah penyelesaian, *checklist* dokumen, templat, dan artikel pendukung menjadi satu kesatuan, beserta nama penulis dan tanggal peninjauan terkini |
| C08 | *Checklist* | Daftar dokumen yang perlu disiapkan untuk sebuah kasus yang ditulis oleh Kurator sebagai bagian dari konten |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC03" src="./assets/diagram/ClassDiagram_UC03.svg" width="70%">
</p>
<p align="center">
<i>Gambar 6. Diagram Kelas Use Case UC03</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C14 | HalamanRangkumanKasus | - sectionIntiMasalah: Section<br>- sectionHak: Section<br>- sectionPertimbangan: Section<br>- sectionLangkah: Section<br>- penandaTenggat: Badge [0..\*]<br>- sectionChecklist: Section<br>- checkboxDokumen: Checkbox [1..\*]<br>- labelKelengkapan: Text<br>- sectionTemplat: Section<br>- tombolUnduh: Button [0..\*]<br>- labelInfoBerkas: Text<br>- sectionArtikel: Section<br>- sectionLBH: Section<br>- dropdownWilayah: Select<br>- labelPenulis: Text<br>- teksDisclaimer: Text | + tampilkanHalaman(idKelompok: int): void<br>+ pilihWilayah(wilayah: string): void<br>+ centangDokumen(indeks: int): void<br>- simpanStatusCentang(): void<br>- muatStatusCentang(): void<br>+ klikTombolUnduh(idTemplat: int): void |
| C23 | KontrolChecklist | - | + ambilChecklist(idRangkuman: int): Checklist<br>+ hitungKelengkapan(jumlahDicentang: int, jumlahTotal: int): int |
| C06 | RangkumanKasus | - idRangkuman: int<br>- idKelompok: int<br>- idKurator: int<br>- intiMasalah: string<br>- hak: string<br>- poinPertimbangan: string<br>- status: string<br>- namaPenulis: string<br>- tanggalPeninjauan: date<br>- catatanRevisi: string | + cekDisetujui(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool<br>+ ambilChecklist(): Checklist<br>+ ambilDaftarTemplat(): TemplatDokumen [0..\*]<br>+ ambilTemplat(idTemplat: int): TemplatDokumen<br>+ lampirkanTemplat(berkas: file): void<br>+ simpanDraf(): void<br>+ cekIsianLengkap(): bool<br>+ aturStatus(statusBaru: string): void<br>+ ambilCatatanRevisi(): string<br>+ simpanCatatanRevisi(catatan: string): void |
| C08 | *Checklist* | - idChecklist: int<br>- idRangkuman: int<br>- daftarDokumen: string [1..\*] | + hitungJumlahDokumen(): int |

---

### 5.2.4 Use Case UC04

**Nama Use Case:** Mengunduh Templat Dokumen

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C14 | HalamanRangkumanKasus | Layar yang menampilkan isi lengkap satu rangkuman kasus termasuk langkah, *checklist*, templat, artikel, dan direktori LBH |
| C24 | KontrolUnduhTemplat | Menyediakan berkas templat versi terbaru untuk diunduh |
| C06 | RangkumanKasus | Halaman konten inti sebuah kasus yang menyimpan inti masalah, hak pelapor, poin pertimbangan, langkah penyelesaian, *checklist* dokumen, templat, dan artikel pendukung menjadi satu kesatuan, beserta nama penulis dan tanggal peninjauan terkini |
| C09 | TemplatDokumen | Berkas surat berupa templat yang dapat diunduh, disertai informasi mengenai format, ukuran *file*, versi, dan tanggal pembaruan |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC04" src="./assets/diagram/ClassDiagram_UC04.svg" width="70%">
</p>
<p align="center">
<i>Gambar 7. Diagram Kelas Use Case UC04</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C14 | HalamanRangkumanKasus | - sectionIntiMasalah: Section<br>- sectionHak: Section<br>- sectionPertimbangan: Section<br>- sectionLangkah: Section<br>- penandaTenggat: Badge [0..\*]<br>- sectionChecklist: Section<br>- checkboxDokumen: Checkbox [1..\*]<br>- labelKelengkapan: Text<br>- sectionTemplat: Section<br>- tombolUnduh: Button [0..\*]<br>- labelInfoBerkas: Text<br>- sectionArtikel: Section<br>- sectionLBH: Section<br>- dropdownWilayah: Select<br>- labelPenulis: Text<br>- teksDisclaimer: Text | + tampilkanHalaman(idKelompok: int): void<br>+ pilihWilayah(wilayah: string): void<br>+ centangDokumen(indeks: int): void<br>- simpanStatusCentang(): void<br>- muatStatusCentang(): void<br>+ klikTombolUnduh(idTemplat: int): void |
| C24 | KontrolUnduhTemplat | - | + ambilDaftarTemplat(idRangkuman: int): TemplatDokumen [0..\*]<br>+ unduhTemplat(idRangkuman: int, idTemplat: int): file |
| C06 | RangkumanKasus | - idRangkuman: int<br>- idKelompok: int<br>- idKurator: int<br>- intiMasalah: string<br>- hak: string<br>- poinPertimbangan: string<br>- status: string<br>- namaPenulis: string<br>- tanggalPeninjauan: date<br>- catatanRevisi: string | + cekDisetujui(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool<br>+ ambilChecklist(): Checklist<br>+ ambilDaftarTemplat(): TemplatDokumen [0..\*]<br>+ ambilTemplat(idTemplat: int): TemplatDokumen<br>+ lampirkanTemplat(berkas: file): void<br>+ simpanDraf(): void<br>+ cekIsianLengkap(): bool<br>+ aturStatus(statusBaru: string): void<br>+ ambilCatatanRevisi(): string<br>+ simpanCatatanRevisi(catatan: string): void |
| C09 | TemplatDokumen | - idTemplat: int<br>- idRangkuman: int<br>- namaBerkas: string<br>- format: string<br>- ukuran: int<br>- versi: string<br>- tanggalPembaruan: date | + unduh(): file<br>+ perbaruiVersi(berkas: file): void<br>- validasiUnggahan(berkas: file): bool |

---

### 5.2.5 Use Case UC05

**Nama Use Case:** Masuk dan Keluar Panel Pengelolaan

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C16 | HalamanLogin | Layar untuk *log in* bagi Kurator dan Administrator |
| C25 | KontrolAutentikasi | Memeriksa kredensial akun dan mengarahkan pengguna ke antarmuka sesuai perannya |
| C01 | Akun | Berisi data akun pengelola (email, kata sandi, dan peran) yang digunakan dalam sistem, menjadi induk dari Kurator dan Administrator |
| C02 | Kurator | Salah satu pengelola yang menyusun dan mengajukan konten, turunan dari Akun |
| C03 | Administrator | Salah satu pengelola yang meninjau konten yang berbasis hukum dan mengelola akun Kurator, turunan dari Akun |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC05" src="./assets/diagram/ClassDiagram_UC05.svg" width="70%">
</p>
<p align="center">
<i>Gambar 8. Diagram Kelas Use Case UC05</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C16 | HalamanLogin | - inputEmail: TextField<br>- inputKataSandi: PasswordField<br>- tombolMasuk: Button<br>- pesanGalat: Text | + tampilkanHalaman(): void<br>+ klikMasuk(email: string, kataSandi: string): void |
| C25 | KontrolAutentikasi | - | + prosesLogin(email: string, kataSandi: string): bool<br>+ arahkanSesuaiPeran(peran: string): void<br>+ cekSesi(): bool<br>+ logout(): void |
| C01 | Akun | - idAkun: int<br>- email: string<br>- kataSandiHash: string<br>- peran: string | + cocokkanKataSandi(kataSandi: string): bool<br>- hashKataSandi(kataSandi: string): string<br>+ ambilPeran(): string<br>+ perbaruiEmail(emailBaru: string): void |
| C02 | Kurator | - jumlahKonten: int<br>- statusAktif: bool<br>- idAdministrator: int<br>(serta atribut warisan Akun) | + cekAktif(): bool<br>+ tambahJumlahKonten(): void<br>+ nonaktifkan(): void |
| C03 | Administrator | (mewarisi atribut Akun) | + ambilKuratorTerdaftar(): Kurator [0..\*] |

---

### 5.2.6 Use Case UC06

**Nama Use Case:** Mengelola Konten Rangkuman Kasus

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C17 | HalamanPenyusunanKonten | Semacam formulir tempat Kurator menyusun, menyunting, melampirkan templat dokumen, dan mengajukan konten |
| C26 | KontrolPenyusunanKonten | Mengatur pembuatan draf, pelampiran templat, validasi isian, dan pengajuan konten oleh Kurator untuk mengubah status konten (Draf -> Diajukan) |
| C01 | Akun | Berisi data akun pengelola (email, kata sandi, dan peran) yang digunakan dalam sistem, menjadi induk dari Kurator dan Administrator |
| C02 | Kurator | Salah satu pengelola yang menyusun dan mengajukan konten, turunan dari Akun |
| C06 | RangkumanKasus | Halaman konten inti sebuah kasus yang menyimpan inti masalah, hak pelapor, poin pertimbangan, langkah penyelesaian, *checklist* dokumen, templat, dan artikel pendukung menjadi satu kesatuan, beserta nama penulis dan tanggal peninjauan terkini |
| C07 | LangkahPenyelesaian | Langkah bernomor pada rangkuman kasus yang memuat tujuan, dokumen yang diperlukan, dan tenggat waktu untuk pelaporan |
| C08 | *Checklist* | Daftar dokumen yang perlu disiapkan untuk sebuah kasus yang ditulis oleh Kurator sebagai bagian dari konten |
| C09 | TemplatDokumen | Berkas surat berupa templat yang dapat diunduh, disertai informasi mengenai format, ukuran *file*, versi, dan tanggal pembaruan |
| C10 | Artikel | Artikel pendukung beserta tautan ke sumber hukum resmi pada rangkuman |
| C12 | RiwayatStatus | Menyimpan riwayat status konten setiap kali terjadi perubahan, yang dicatat adalah konten yang berubah, siapa yang mengubah, kapan, dan statusnya |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC06" src="./assets/diagram/ClassDiagram_UC06.svg" width="70%">
</p>
<p align="center">
<i>Gambar 9. Diagram Kelas Use Case UC06</i>
</p>
<br>


| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C17 | HalamanPenyusunanKonten | - formulirKonten: Form<br>- inputIntiMasalah: TextArea<br>- inputHak: TextArea<br>- inputPertimbangan: TextArea<br>- inputLangkah: TextArea [1..\*]<br>- inputChecklist: TextArea<br>- inputArtikel: TextField [1..\*]<br>- inputUnggahTemplat: FileInput<br>- tombolSimpanDraf: Button<br>- tombolAjukan: Button<br>- penandaIsianKosong: Text [0..\*]<br>- pesanGalatUnggah: Text<br>- tombolKeluar: Button | + tampilkanFormulir(idRangkuman: int): void<br>+ klikSimpanDraf(): void<br>+ unggahTemplat(berkas: file): void<br>+ klikAjukan(): void |
| C26 | KontrolPenyusunanKonten | - | + buatDraf(idKelompok: int, idKurator: int): RangkumanKasus<br>+ simpanDraf(idRangkuman: int): void<br>+ lampirkanTemplat(idRangkuman: int, berkas: file): void<br>+ ajukanKonten(idRangkuman: int): void<br>- catatRiwayat(idRangkuman: int, idPelaku: int, status: string): void |
| C01 | Akun | - idAkun: int<br>- email: string<br>- kataSandiHash: string<br>- peran: string | + cocokkanKataSandi(kataSandi: string): bool<br>- hashKataSandi(kataSandi: string): string<br>+ ambilPeran(): string<br>+ perbaruiEmail(emailBaru: string): void |
| C02 | Kurator | - jumlahKonten: int<br>- statusAktif: bool<br>- idAdministrator: int<br>(serta atribut warisan Akun) | + cekAktif(): bool<br>+ tambahJumlahKonten(): void<br>+ nonaktifkan(): void |
| C06 | RangkumanKasus | - idRangkuman: int<br>- idKelompok: int<br>- idKurator: int<br>- intiMasalah: string<br>- hak: string<br>- poinPertimbangan: string<br>- status: string<br>- namaPenulis: string<br>- tanggalPeninjauan: date<br>- catatanRevisi: string | + cekDisetujui(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool<br>+ ambilChecklist(): Checklist<br>+ ambilDaftarTemplat(): TemplatDokumen [0..\*]<br>+ ambilTemplat(idTemplat: int): TemplatDokumen<br>+ lampirkanTemplat(berkas: file): void<br>+ simpanDraf(): void<br>+ cekIsianLengkap(): bool<br>+ aturStatus(statusBaru: string): void<br>+ ambilCatatanRevisi(): string<br>+ simpanCatatanRevisi(catatan: string): void |
| C07 | LangkahPenyelesaian | - idLangkah: int<br>- idRangkuman: int<br>- nomor: int<br>- deskripsi: string<br>- tujuan: string<br>- dokumenDiperlukan: string [1..\*]<br>- tenggat: date [0..1] | + punyaTenggat(): bool |
| C08 | *Checklist* | - idChecklist: int<br>- idRangkuman: int<br>- daftarDokumen: string [1..\*] | + hitungJumlahDokumen(): int |
| C09 | TemplatDokumen | - idTemplat: int<br>- idRangkuman: int<br>- namaBerkas: string<br>- format: string<br>- ukuran: int<br>- versi: string<br>- tanggalPembaruan: date | + unduh(): file<br>+ perbaruiVersi(berkas: file): void<br>- validasiUnggahan(berkas: file): bool |
| C10 | Artikel | - idArtikel: int<br>- idRangkuman: int<br>- judul: string<br>- tautanSumber: string | + ambilTautan(): string |
| C12 | RiwayatStatus | - idRiwayat: int<br>- idRangkuman: int<br>- idPelaku: int<br>- status: string<br>- waktu: date | + simpan(): void |

---

### 5.2.7 Use Case UC07

**Nama Use Case:** Memantau Status dan Revisi Konten

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C18 | HalamanDaftarKontenKurator | Layar berisi daftar konten milik Kurator beserta status dan catatan revisinya |
| C27 | KontrolPelacakanKonten | Mengambil daftar konten milik Kurator dan catatan revisinya |
| C02 | Kurator | Salah satu pengelola yang menyusun dan mengajukan konten, turunan dari Akun |
| C06 | RangkumanKasus | Halaman konten inti sebuah kasus yang menyimpan inti masalah, hak pelapor, poin pertimbangan, langkah penyelesaian, *checklist* dokumen, templat, dan artikel pendukung menjadi satu kesatuan, beserta nama penulis dan tanggal peninjauan terkini |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC07" src="./assets/diagram/ClassDiagram_UC07.svg" width="70%">
</p>
<p align="center">
<i>Gambar 10. Diagram Kelas Use Case UC07</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C18 | HalamanDaftarKontenKurator | - tabelDaftarKonten: Table<br>- labelStatus: Badge [0..\*]<br>- panelCatatanRevisi: Section<br>- tombolKeluar: Button | + tampilkanHalaman(): void<br>+ klikKonten(idRangkuman: int): void |
| C27 | KontrolPelacakanKonten | - | + ambilDaftarKonten(idKurator: int): RangkumanKasus [0..\*]<br>+ ambilCatatanRevisi(idRangkuman: int): string |
| C02 | Kurator | - jumlahKonten: int<br>- statusAktif: bool<br>- idAdministrator: int<br>(serta atribut warisan Akun) | + cekAktif(): bool<br>+ tambahJumlahKonten(): void<br>+ nonaktifkan(): void |
| C06 | RangkumanKasus | - idRangkuman: int<br>- idKelompok: int<br>- idKurator: int<br>- intiMasalah: string<br>- hak: string<br>- poinPertimbangan: string<br>- status: string<br>- namaPenulis: string<br>- tanggalPeninjauan: date<br>- catatanRevisi: string | + cekDisetujui(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool<br>+ ambilChecklist(): Checklist<br>+ ambilDaftarTemplat(): TemplatDokumen [0..\*]<br>+ ambilTemplat(idTemplat: int): TemplatDokumen<br>+ lampirkanTemplat(berkas: file): void<br>+ simpanDraf(): void<br>+ cekIsianLengkap(): bool<br>+ aturStatus(statusBaru: string): void<br>+ ambilCatatanRevisi(): string<br>+ simpanCatatanRevisi(catatan: string): void |

---

### 5.2.8 Use Case UC08

**Nama Use Case:** Meninjau dan Memutuskan Konten

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C19 | HalamanModerasiKonten | Layar antrean dan peninjauan konten untuk Administrator |
| C28 | KontrolModerasiKonten | Mengatur persetujuan dan pengembalian konten dari Administrator sekaligus pencatatan riwayat status ke entity RiwayatStatus |
| C01 | Akun | Berisi data akun pengelola (email, kata sandi, dan peran) yang digunakan dalam sistem, menjadi induk dari Kurator dan Administrator |
| C03 | Administrator | Salah satu pengelola yang meninjau konten yang berbasis hukum dan mengelola akun Kurator, turunan dari Akun |
| C06 | RangkumanKasus | Halaman konten inti sebuah kasus yang menyimpan inti masalah, hak pelapor, poin pertimbangan, langkah penyelesaian, *checklist* dokumen, templat, dan artikel pendukung menjadi satu kesatuan, beserta nama penulis dan tanggal peninjauan terkini |
| C12 | RiwayatStatus | Menyimpan riwayat status konten setiap kali terjadi perubahan, yang dicatat adalah konten yang berubah, siapa yang mengubah, kapan, dan statusnya |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC08" src="./assets/diagram/ClassDiagram_UC08.svg" width="70%">
</p>
<p align="center">
<i>Gambar 11. Diagram Kelas Use Case UC08</i>
</p>
<br>


| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C19 | HalamanModerasiKonten | - tabelAntrean: Table<br>- panelIsiKonten: Section<br>- tombolSetujui: Button<br>- tombolKembalikan: Button<br>- inputAlasanRevisi: TextArea<br>- pesanWajibIsi: Text<br>- tombolKeluar: Button | + tampilkanAntrean(): void<br>+ klikKonten(idRangkuman: int): void<br>+ klikSetujui(idRangkuman: int): void<br>+ klikKembalikan(idRangkuman: int, alasan: string): void |
| C28 | KontrolModerasiKonten | - | + ambilAntrean(): RangkumanKasus [0..\*]<br>+ ambilKonten(idRangkuman: int): RangkumanKasus<br>+ setujuiKonten(idRangkuman: int, idAdministrator: int): void<br>+ kembalikanKonten(idRangkuman: int, idAdministrator: int, alasan: string): void<br>- cekAlasanTerisi(alasan: string): bool<br>- catatRiwayat(idRangkuman: int, idPelaku: int, status: string): void |
| C01 | Akun | - idAkun: int<br>- email: string<br>- kataSandiHash: string<br>- peran: string | + cocokkanKataSandi(kataSandi: string): bool<br>- hashKataSandi(kataSandi: string): string<br>+ ambilPeran(): string<br>+ perbaruiEmail(emailBaru: string): void |
| C03 | Administrator | (mewarisi atribut Akun) | + ambilKuratorTerdaftar(): Kurator [0..\*] |
| C06 | RangkumanKasus | - idRangkuman: int<br>- idKelompok: int<br>- idKurator: int<br>- intiMasalah: string<br>- hak: string<br>- poinPertimbangan: string<br>- status: string<br>- namaPenulis: string<br>- tanggalPeninjauan: date<br>- catatanRevisi: string | + cekDisetujui(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool<br>+ ambilChecklist(): Checklist<br>+ ambilDaftarTemplat(): TemplatDokumen [0..\*]<br>+ ambilTemplat(idTemplat: int): TemplatDokumen<br>+ lampirkanTemplat(berkas: file): void<br>+ simpanDraf(): void<br>+ cekIsianLengkap(): bool<br>+ aturStatus(statusBaru: string): void<br>+ ambilCatatanRevisi(): string<br>+ simpanCatatanRevisi(catatan: string): void |
| C12 | RiwayatStatus | - idRiwayat: int<br>- idRangkuman: int<br>- idPelaku: int<br>- status: string<br>- waktu: date | + simpan(): void |

---

### 5.2.9 Use Case UC09

**Nama Use Case:** Mengelola Akun Kurator

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C20 | HalamanPengelolaanAkun | Panel Administrator untuk mendaftarkan, memperbarui, dan menonaktifkan akun Kurator |
| C29 | KontrolPengelolaanAkun | Mengatur pendaftaran, pembaruan, dan penonaktifan akun Kurator |
| C01 | Akun | Berisi data akun pengelola (email, kata sandi, dan peran) yang digunakan dalam sistem, menjadi induk dari Kurator dan Administrator |
| C02 | Kurator | Salah satu pengelola yang menyusun dan mengajukan konten, turunan dari Akun |
| C03 | Administrator | Salah satu pengelola yang meninjau konten yang berbasis hukum dan mengelola akun Kurator, turunan dari Akun |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC09" src="./assets/diagram/ClassDiagram_UC09.svg" width="70%">
</p>
<p align="center">
<i>Gambar 12. Diagram Kelas Use Case UC09</i>
</p>
<br>


| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C20 | HalamanPengelolaanAkun | - tabelDaftarKurator: Table<br>- formulirAkun: Form<br>- inputEmail: TextField<br>- inputKataSandi: PasswordField<br>- tombolDaftarkan: Button<br>- tombolSimpan: Button<br>- tombolNonaktifkan: Button<br>- tombolKeluar: Button | + tampilkanHalaman(): void<br>+ klikDaftarkan(email: string, kataSandi: string): void<br>+ klikSimpanPerubahan(idAkun: int, email: string): void<br>+ klikNonaktifkan(idAkun: int): void |
| C29 | KontrolPengelolaanAkun | - | + daftarkanKurator(email: string, kataSandi: string, idAdministrator: int): Kurator<br>+ perbaruiKurator(idAkun: int, emailBaru: string): void<br>+ nonaktifkanKurator(idAkun: int): void<br>- cekEmailUnik(email: string): bool |
| C01 | Akun | - idAkun: int<br>- email: string<br>- kataSandiHash: string<br>- peran: string | + cocokkanKataSandi(kataSandi: string): bool<br>- hashKataSandi(kataSandi: string): string<br>+ ambilPeran(): string<br>+ perbaruiEmail(emailBaru: string): void |
| C02 | Kurator | - jumlahKonten: int<br>- statusAktif: bool<br>- idAdministrator: int<br>(serta atribut warisan Akun) | + cekAktif(): bool<br>+ tambahJumlahKonten(): void<br>+ nonaktifkan(): void |
| C03 | Administrator | (mewarisi atribut Akun) | + ambilKuratorTerdaftar(): Kurator [0..\*] |

---

## 5.3 Diagram Kelas Keseluruhan

<p align="center">
<img alt="Class Diagram Keseluruhan" src="./assets/diagram/ClassDiagram_Full.png" width="90%">
</p>
<p align="center">
<i>Gambar 13. Diagram Kelas Keseluruhan</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C01 | Akun | - idAkun: int<br>- email: string<br>- kataSandiHash: string<br>- peran: string | + cocokkanKataSandi(kataSandi: string): bool<br>- hashKataSandi(kataSandi: string): string<br>+ ambilPeran(): string<br>+ perbaruiEmail(emailBaru: string): void |
| C02 | Kurator | - jumlahKonten: int<br>- statusAktif: bool<br>- idAdministrator: int<br>(serta atribut warisan Akun) | + cekAktif(): bool<br>+ tambahJumlahKonten(): void<br>+ nonaktifkan(): void |
| C03 | Administrator | (mewarisi atribut Akun) | + ambilKuratorTerdaftar(): Kurator [0..\*] |
| C04 | BidangHukum | - idBidang: int<br>- nama: string<br>- jumlahKelompokKasus: int<br>- statusAktif: bool | + ambilDaftarKelompok(): KelompokKasus [1..\*]<br>+ cekAktif(): bool |
| C05 | KelompokKasus | - idKelompok: int<br>- idBidang: int<br>- judulUmum: string<br>- istilahResmi: string<br>- penandaDarurat: bool | + ambilRangkuman(): RangkumanKasus<br>+ cekDarurat(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool |
| C06 | RangkumanKasus | - idRangkuman: int<br>- idKelompok: int<br>- idKurator: int<br>- intiMasalah: string<br>- hak: string<br>- poinPertimbangan: string<br>- status: string<br>- namaPenulis: string<br>- tanggalPeninjauan: date<br>- catatanRevisi: string | + cekDisetujui(): bool<br>+ cocokkanKataKunci(kataKunci: string): bool<br>+ ambilChecklist(): Checklist<br>+ ambilDaftarTemplat(): TemplatDokumen [0..\*]<br>+ ambilTemplat(idTemplat: int): TemplatDokumen<br>+ lampirkanTemplat(berkas: file): void<br>+ simpanDraf(): void<br>+ cekIsianLengkap(): bool<br>+ aturStatus(statusBaru: string): void<br>+ ambilCatatanRevisi(): string<br>+ simpanCatatanRevisi(catatan: string): void |
| C07 | LangkahPenyelesaian | - idLangkah: int<br>- idRangkuman: int<br>- nomor: int<br>- deskripsi: string<br>- tujuan: string<br>- dokumenDiperlukan: string [1..\*]<br>- tenggat: date [0..1] | + punyaTenggat(): bool |
| C08 | *Checklist* | - idChecklist: int<br>- idRangkuman: int<br>- daftarDokumen: string [1..\*] | + hitungJumlahDokumen(): int |
| C09 | TemplatDokumen | - idTemplat: int<br>- idRangkuman: int<br>- namaBerkas: string<br>- format: string<br>- ukuran: int<br>- versi: string<br>- tanggalPembaruan: date | + unduh(): file<br>+ perbaruiVersi(berkas: file): void<br>- validasiUnggahan(berkas: file): bool |
| C10 | Artikel | - idArtikel: int<br>- idRangkuman: int<br>- judul: string<br>- tautanSumber: string | + ambilTautan(): string |
| C11 | LembagaBantuanHukum | - idLBH: int<br>- nama: string<br>- wilayah: string<br>- tautan: string | + cocokkanWilayah(wilayah: string): bool |
| C12 | RiwayatStatus | - idRiwayat: int<br>- idRangkuman: int<br>- idPelaku: int<br>- status: string<br>- waktu: date | + simpan(): void |
| C13 | HalamanJelajahKasus | - sectionDaftarBidang: Section<br>- kartuBidangHukum: Card [1..\*]<br>- sectionDaftarKelompok: Section<br>- kartuKelompokKasus: Card [1..\*]<br>- popupPeringatanDarurat: Modal<br>- tombolTutupPeringatan: Button | + tampilkanHalaman(): void<br>+ klikBidangHukum(idBidang: int): void<br>+ klikKelompokKasus(idKelompok: int): void<br>+ tutupPeringatan(): void |
| C14 | HalamanRangkumanKasus | - sectionIntiMasalah: Section<br>- sectionHak: Section<br>- sectionPertimbangan: Section<br>- sectionLangkah: Section<br>- penandaTenggat: Badge [0..\*]<br>- sectionChecklist: Section<br>- checkboxDokumen: Checkbox [1..\*]<br>- labelKelengkapan: Text<br>- sectionTemplat: Section<br>- tombolUnduh: Button [0..\*]<br>- labelInfoBerkas: Text<br>- sectionArtikel: Section<br>- sectionLBH: Section<br>- dropdownWilayah: Select<br>- labelPenulis: Text<br>- teksDisclaimer: Text | + tampilkanHalaman(idKelompok: int): void<br>+ pilihWilayah(wilayah: string): void<br>+ centangDokumen(indeks: int): void<br>- simpanStatusCentang(): void<br>- muatStatusCentang(): void<br>+ klikTombolUnduh(idTemplat: int): void |
| C15 | HalamanPencarianKataKunci | - kolomPencarian: TextField<br>- tombolCari: Button<br>- daftarHasil: Card [0..\*]<br>- pesanTidakDitemukan: Text<br>- saranBidangLain: Card [0..\*]<br>- sectionLBH: Section<br>- dropdownWilayah: Select | + klikCari(kataKunci: string): void<br>+ klikHasil(idKelompok: int): void<br>+ pilihWilayah(wilayah: string): void |
| C16 | HalamanLogin | - inputEmail: TextField<br>- inputKataSandi: PasswordField<br>- tombolMasuk: Button<br>- pesanGalat: Text | + tampilkanHalaman(): void<br>+ klikMasuk(email: string, kataSandi: string): void |
| C17 | HalamanPenyusunanKonten | - formulirKonten: Form<br>- inputIntiMasalah: TextArea<br>- inputHak: TextArea<br>- inputPertimbangan: TextArea<br>- inputLangkah: TextArea [1..\*]<br>- inputChecklist: TextArea<br>- inputArtikel: TextField [1..\*]<br>- inputUnggahTemplat: FileInput<br>- tombolSimpanDraf: Button<br>- tombolAjukan: Button<br>- penandaIsianKosong: Text [0..\*]<br>- pesanGalatUnggah: Text<br>- tombolKeluar: Button | + tampilkanFormulir(idRangkuman: int): void<br>+ klikSimpanDraf(): void<br>+ unggahTemplat(berkas: file): void<br>+ klikAjukan(): void |
| C18 | HalamanDaftarKontenKurator | - tabelDaftarKonten: Table<br>- labelStatus: Badge [0..\*]<br>- panelCatatanRevisi: Section<br>- tombolKeluar: Button | + tampilkanHalaman(): void<br>+ klikKonten(idRangkuman: int): void |
| C19 | HalamanModerasiKonten | - tabelAntrean: Table<br>- panelIsiKonten: Section<br>- tombolSetujui: Button<br>- tombolKembalikan: Button<br>- inputAlasanRevisi: TextArea<br>- pesanWajibIsi: Text<br>- tombolKeluar: Button | + tampilkanAntrean(): void<br>+ klikKonten(idRangkuman: int): void<br>+ klikSetujui(idRangkuman: int): void<br>+ klikKembalikan(idRangkuman: int, alasan: string): void |
| C20 | HalamanPengelolaanAkun | - tabelDaftarKurator: Table<br>- formulirAkun: Form<br>- inputEmail: TextField<br>- inputKataSandi: PasswordField<br>- tombolDaftarkan: Button<br>- tombolSimpan: Button<br>- tombolNonaktifkan: Button<br>- tombolKeluar: Button | + tampilkanHalaman(): void<br>+ klikDaftarkan(email: string, kataSandi: string): void<br>+ klikSimpanPerubahan(idAkun: int, email: string): void<br>+ klikNonaktifkan(idAkun: int): void |
| C21 | KontrolJelajahKasus | - | + ambilDaftarBidang(): BidangHukum [1..\*]<br>+ ambilDaftarKelompok(idBidang: int): KelompokKasus [1..\*]<br>+ ambilRangkuman(idKelompok: int): RangkumanKasus<br>+ ambilDaftarLBH(wilayah: string): LembagaBantuanHukum [0..\*] |
| C22 | KontrolPencarianKataKunci | - | + cariKasus(kataKunci: string): KelompokKasus [0..\*]<br>+ sarankanBidangLain(): BidangHukum [1..\*]<br>+ ambilDaftarLBH(wilayah: string): LembagaBantuanHukum [0..\*] |
| C23 | KontrolChecklist | - | + ambilChecklist(idRangkuman: int): Checklist<br>+ hitungKelengkapan(jumlahDicentang: int, jumlahTotal: int): int |
| C24 | KontrolUnduhTemplat | - | + ambilDaftarTemplat(idRangkuman: int): TemplatDokumen [0..\*]<br>+ unduhTemplat(idRangkuman: int, idTemplat: int): file |
| C25 | KontrolAutentikasi | - | + prosesLogin(email: string, kataSandi: string): bool<br>+ arahkanSesuaiPeran(peran: string): void<br>+ cekSesi(): bool<br>+ logout(): void |
| C26 | KontrolPenyusunanKonten | - | + buatDraf(idKelompok: int, idKurator: int): RangkumanKasus<br>+ simpanDraf(idRangkuman: int): void<br>+ lampirkanTemplat(idRangkuman: int, berkas: file): void<br>+ ajukanKonten(idRangkuman: int): void<br>- catatRiwayat(idRangkuman: int, idPelaku: int, status: string): void |
| C27 | KontrolPelacakanKonten | - | + ambilDaftarKonten(idKurator: int): RangkumanKasus [0..\*]<br>+ ambilCatatanRevisi(idRangkuman: int): string |
| C28 | KontrolModerasiKonten | - | + ambilAntrean(): RangkumanKasus [0..\*]<br>+ ambilKonten(idRangkuman: int): RangkumanKasus<br>+ setujuiKonten(idRangkuman: int, idAdministrator: int): void<br>+ kembalikanKonten(idRangkuman: int, idAdministrator: int, alasan: string): void<br>- cekAlasanTerisi(alasan: string): bool<br>- catatRiwayat(idRangkuman: int, idPelaku: int, status: string): void |
| C29 | KontrolPengelolaanAkun | - | + daftarkanKurator(email: string, kataSandi: string, idAdministrator: int): Kurator<br>+ perbaruiKurator(idAkun: int, emailBaru: string): void<br>+ nonaktifkanKurator(idAkun: int): void<br>- cekEmailUnik(email: string): bool |

---

# BAB 6: Traceability

| ID Kelas | ID Use Case | ID KF |
| :--- | :--- | :--- |
| C01 | UC05, UC06, UC08, UC09 | KF27, KF36, KF38, KF39, KF40, KF43 |
| C02 | UC05, UC06, UC07, UC09 | KF23, KF27, KF29, KF37, KF38, KF39, KF43 |
| C03 | UC05, UC08, UC09 | KF32, KF33, KF36, KF38, KF39 |
| C04 | UC01, UC02 | KF01, KF02, KF03, KF07 |
| C05 | UC01, UC02 | KF03, KF04, KF05, KF06, KF21 |
| C06 | UC01, UC02, UC03, UC04, UC06, UC07, UC08 | KF02, KF05, KF06, KF08, KF09, KF10, KF13, KF15, KF16, KF22, KF23, KF24, KF25, KF27, KF28, KF29, KF30, KF31, KF32, KF33, KF35 |
| C07 | UC01, UC06 | KF08, KF11, KF12, KF22 |
| C08 | UC01, UC03, UC06 | KF08, KF13, KF22 |
| C09 | UC01, UC04, UC06 | KF08, KF15, KF16, KF22, KF25, KF26 |
| C10 | UC01, UC06 | KF08, KF18, KF22 |
| C11 | UC01, UC02 | KF07, KF20 |
| C12 | UC06, UC08 | KF27, KF36 |
| C13 | UC01 | KF01, KF03, KF04, KF05, KF19, KF21, KF42 |
| C14 | UC01, UC03, UC04 | KF05, KF08, KF09, KF10, KF11, KF12, KF13, KF14, KF15, KF16, KF17, KF18, KF19, KF20, KF42 |
| C15 | UC02 | KF06, KF07 |
| C16 | UC05 | KF39, KF40, KF41, KF44 |
| C17 | UC06 | KF22, KF23, KF25, KF26, KF27, KF28 |
| C18 | UC07 | KF29, KF30 |
| C19 | UC08 | KF31, KF32, KF33, KF34 |
| C20 | UC09 | KF37, KF38, KF43 |
| C21 | UC01 | KF01, KF02, KF03, KF05, KF08, KF20 |
| C22 | UC02 | KF02, KF06, KF07 |
| C23 | UC03 | KF13 |
| C24 | UC04 | KF15, KF16 |
| C25 | UC05 | KF39, KF40, KF41, KF44 |
| C26 | UC06 | KF22, KF23, KF25, KF26, KF27, KF28, KF35 |
| C27 | UC07 | KF29, KF30 |
| C28 | UC08 | KF24, KF31, KF32, KF33, KF34, KF36 |
| C29 | UC09 | KF37, KF38, KF43 |

---

# Referensi
- Diagram UML: [https://www.drawio.com/](https://www.drawio.com/), [https://staruml.io/](https://staruml.io/)
