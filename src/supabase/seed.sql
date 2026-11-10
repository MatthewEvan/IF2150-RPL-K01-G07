-- Data uji fiktif PahamHukum. Seluruh nama, email, tautan, dan isi kasus hanya
-- contoh untuk pengembangan, bukan data pribadi asli dan bukan nasihat hukum.
-- Kata sandi akun uji dicantumkan di src/README.md.

-- Akun uji di Supabase Auth.
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, recovery_token, email_change, email_change_token_new
)
select
  '00000000-0000-0000-0000-000000000000', a.id, 'authenticated', 'authenticated',
  a.email, extensions.crypt('PahamHukum-Uji-123', extensions.gen_salt('bf', 10)), now(),
  '{"provider":"email","providers":["email"]}', '{}', now(), now(),
  '', '', '', ''
from (values
  ('a0000000-0000-4000-8000-000000000001'::uuid, 'admin@pahamhukum.test'),
  ('b0000000-0000-4000-8000-000000000001'::uuid, 'kurator1@pahamhukum.test'),
  ('b0000000-0000-4000-8000-000000000002'::uuid, 'kurator2@pahamhukum.test'),
  ('b0000000-0000-4000-8000-000000000003'::uuid, 'kurator.nonaktif@pahamhukum.test')
) as a (id, email);

insert into auth.identities (id, user_id, provider_id, provider, identity_data, created_at, updated_at, last_sign_in_at)
select gen_random_uuid(), u.id, u.id::text, 'email',
  jsonb_build_object('sub', u.id::text, 'email', u.email, 'email_verified', true),
  now(), now(), now()
from auth.users u
where u.email like '%@pahamhukum.test';

insert into public.akun (id_akun, email, peran) values
  ('a0000000-0000-4000-8000-000000000001', 'admin@pahamhukum.test', 'Administrator'),
  ('b0000000-0000-4000-8000-000000000001', 'kurator1@pahamhukum.test', 'Kurator'),
  ('b0000000-0000-4000-8000-000000000002', 'kurator2@pahamhukum.test', 'Kurator'),
  ('b0000000-0000-4000-8000-000000000003', 'kurator.nonaktif@pahamhukum.test', 'Kurator');

insert into public.administrator (id_akun) values
  ('a0000000-0000-4000-8000-000000000001');

insert into public.kurator (id_akun, status_aktif, id_administrator) values
  ('b0000000-0000-4000-8000-000000000001', true, 'a0000000-0000-4000-8000-000000000001'),
  ('b0000000-0000-4000-8000-000000000002', true, 'a0000000-0000-4000-8000-000000000001'),
  ('b0000000-0000-4000-8000-000000000003', false, 'a0000000-0000-4000-8000-000000000001');

-- Katalog.
insert into public.bidang_hukum (id_bidang, nama) overriding system value values
  (1, 'Ketenagakerjaan'),
  (2, 'Perlindungan Konsumen'),
  (3, 'Keluarga');

insert into public.kelompok_kasus (id_kelompok, id_bidang, judul_umum, istilah_resmi, penanda_darurat) overriding system value values
  (1, 1, 'Gaji tidak dibayar tepat waktu', 'Keterlambatan pembayaran upah', false),
  (2, 1, 'Diberhentikan tanpa pesangon', 'Pemutusan hubungan kerja', false),
  (3, 2, 'Barang rusak dan penjual menolak ganti rugi', 'Sengketa konsumen', false),
  (4, 2, 'Tertipu saat belanja daring', 'Penipuan transaksi elektronik', false),
  (5, 3, 'Mengalami kekerasan di rumah', 'Kekerasan dalam rumah tangga', true);

select setval(pg_get_serial_sequence('public.bidang_hukum', 'id_bidang'), 3);
select setval(pg_get_serial_sequence('public.kelompok_kasus', 'id_kelompok'), 5);

-- Konten dengan setiap status agar semua layar punya data.
insert into public.rangkuman_kasus (
  id_rangkuman, id_kelompok, id_kurator, inti_masalah, hak, poin_pertimbangan,
  status, nama_penulis, tanggal_peninjauan, catatan_revisi
) overriding system value values
  (1, 1, 'b0000000-0000-4000-8000-000000000001',
   'Upah belum dibayarkan melewati tanggal yang disepakati dalam perjanjian kerja.',
   'Pekerja berhak menagih upah yang tertunda sesuai perjanjian kerja.',
   'Kumpulkan bukti perjanjian kerja dan riwayat pembayaran sebelum menagih.',
   'Disetujui', 'Kurator Satu', '2026-10-20', null),
  (2, 3, 'b0000000-0000-4000-8000-000000000001',
   'Barang yang diterima rusak dan penjual menolak memberi penggantian.',
   'Konsumen berhak atas barang sesuai perjanjian atau kompensasi.',
   'Simpan bukti pembelian dan foto kondisi barang.',
   'Disetujui', 'Kurator Satu', '2026-10-22', null),
  (3, 5, 'b0000000-0000-4000-8000-000000000002',
   'Korban mengalami kekerasan oleh anggota keluarga di rumah.',
   'Korban berhak atas perlindungan dan pendampingan.',
   'Utamakan keselamatan dan hubungi layanan darurat bila ada ancaman langsung.',
   'Disetujui', 'Kurator Dua', '2026-10-25', null),
  (4, 2, 'b0000000-0000-4000-8000-000000000001',
   'Pekerja diberhentikan tanpa menerima pesangon.',
   'Pekerja berhak atas hak akhir sesuai ketentuan.',
   'Periksa surat pemberhentian dan masa kerja.',
   'Diajukan', 'Kurator Satu', null, null),
  (5, 4, 'b0000000-0000-4000-8000-000000000002',
   'Pembeli tidak menerima barang setelah membayar di toko daring.',
   'Pembeli berhak meminta pengembalian dana.',
   'Simpan bukti transfer dan percakapan.',
   'Perlu Revisi', 'Kurator Dua', null, 'Lengkapi langkah pelaporan ke platform.'),
  (6, 4, 'b0000000-0000-4000-8000-000000000001',
   'Draf: penipuan lewat tautan pembayaran palsu.',
   null, null,
   'Draft', 'Kurator Satu', null, null);

select setval(pg_get_serial_sequence('public.rangkuman_kasus', 'id_rangkuman'), 6);

insert into public.langkah_penyelesaian (id_rangkuman, nomor, deskripsi, tujuan, dokumen_diperlukan, tenggat) values
  (1, 1, 'Kirim surat penagihan kepada pemberi kerja.', 'Membuat bukti tertulis penagihan.', '{"Perjanjian kerja","Slip gaji"}', null),
  (1, 2, 'Ajukan perundingan bipartit.', 'Mencari penyelesaian bersama.', '{"Surat penagihan"}', '14 hari kerja setelah surat penagihan dikirim'),
  (2, 1, 'Sampaikan keluhan tertulis kepada penjual.', 'Memberi kesempatan penyelesaian.', '{"Bukti pembelian","Foto barang"}', null),
  (3, 1, 'Hubungi layanan darurat terdekat.', 'Memastikan keselamatan korban.', '{"Kartu identitas"}', null),
  (4, 1, 'Minta rincian hak akhir kepada pemberi kerja.', 'Mengetahui perhitungan yang dipakai.', '{"Surat pemberhentian"}', null),
  (5, 1, 'Laporkan transaksi kepada platform.', 'Menahan dana penjual.', '{"Bukti transfer"}', null);

insert into public.checklist (id_rangkuman, daftar_dokumen) values
  (1, '{"Perjanjian kerja","Slip gaji","Surat penagihan"}'),
  (2, '{"Bukti pembelian","Foto barang"}'),
  (3, '{"Kartu identitas","Catatan kejadian"}'),
  (4, '{"Surat pemberhentian","Perjanjian kerja"}'),
  (5, '{"Bukti transfer","Tangkapan layar percakapan"}');

insert into public.artikel (id_rangkuman, judul, tautan_sumber) values
  (1, 'Contoh artikel tentang upah', 'https://contoh.test/artikel/upah'),
  (2, 'Contoh artikel tentang hak konsumen', 'https://contoh.test/artikel/konsumen'),
  (3, 'Contoh artikel tentang perlindungan korban', 'https://contoh.test/artikel/perlindungan'),
  (4, 'Contoh artikel tentang hak akhir pekerja', 'https://contoh.test/artikel/hak-akhir'),
  (5, 'Contoh artikel tentang belanja daring', 'https://contoh.test/artikel/belanja-daring');

insert into public.lembaga_bantuan_hukum (nama, wilayah, tautan) values
  ('LBH Contoh Bandung', 'Jawa Barat', 'https://contoh.test/lbh/bandung'),
  ('LBH Contoh Jakarta', 'DKI Jakarta', 'https://contoh.test/lbh/jakarta'),
  ('LBH Contoh Surabaya', 'Jawa Timur', 'https://contoh.test/lbh/surabaya');

insert into public.riwayat_status (id_rangkuman, id_pelaku, status, waktu) values
  (1, 'b0000000-0000-4000-8000-000000000001', 'Diajukan', '2026-10-19 09:00+07'),
  (1, 'a0000000-0000-4000-8000-000000000001', 'Disetujui', '2026-10-20 10:00+07'),
  (2, 'b0000000-0000-4000-8000-000000000001', 'Diajukan', '2026-10-21 09:00+07'),
  (2, 'a0000000-0000-4000-8000-000000000001', 'Disetujui', '2026-10-22 10:00+07'),
  (3, 'b0000000-0000-4000-8000-000000000002', 'Diajukan', '2026-10-24 09:00+07'),
  (3, 'a0000000-0000-4000-8000-000000000001', 'Disetujui', '2026-10-25 10:00+07'),
  (4, 'b0000000-0000-4000-8000-000000000001', 'Diajukan', '2026-11-01 09:00+07'),
  (5, 'b0000000-0000-4000-8000-000000000002', 'Diajukan', '2026-10-30 09:00+07'),
  (5, 'a0000000-0000-4000-8000-000000000001', 'Perlu Revisi', '2026-10-31 10:00+07');
