-- Skema basis data PahamHukum untuk kelas entity C01-C12 pada DPPL.
-- Autentikasi memakai Supabase Auth, sehingga id_akun mengikuti auth.users.id
-- dan kolom kata_sandi_hash tidak disimpan di tabel akun.

-- ---------------------------------------------------------------------------
-- Tabel
-- ---------------------------------------------------------------------------

create table public.akun (
  id_akun uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  peran text not null check (peran in ('Kurator', 'Administrator'))
);
create unique index akun_email_unik on public.akun (lower(email));

create table public.administrator (
  id_akun uuid primary key references public.akun (id_akun) on delete cascade
);

create table public.kurator (
  id_akun uuid primary key references public.akun (id_akun) on delete cascade,
  jumlah_konten integer not null default 0 check (jumlah_konten >= 0),
  status_aktif boolean not null default true,
  id_administrator uuid not null references public.administrator (id_akun)
);

create table public.bidang_hukum (
  id_bidang integer generated always as identity primary key,
  nama text not null unique,
  status_aktif boolean not null default true
);

create table public.kelompok_kasus (
  id_kelompok integer generated always as identity primary key,
  id_bidang integer not null references public.bidang_hukum (id_bidang),
  judul_umum text not null,
  istilah_resmi text not null,
  penanda_darurat boolean not null default false
);
create index kelompok_kasus_id_bidang on public.kelompok_kasus (id_bidang);

-- Kolom isian boleh kosong karena draf boleh disimpan sebelum lengkap.
create table public.rangkuman_kasus (
  id_rangkuman integer generated always as identity primary key,
  id_kelompok integer not null references public.kelompok_kasus (id_kelompok),
  id_kurator uuid not null references public.kurator (id_akun),
  inti_masalah text,
  hak text,
  poin_pertimbangan text,
  status text not null default 'Draft'
    check (status in ('Draft', 'Diajukan', 'Perlu Revisi', 'Disetujui')),
  nama_penulis text,
  tanggal_peninjauan date,
  catatan_revisi text
);
create index rangkuman_kasus_id_kelompok on public.rangkuman_kasus (id_kelompok);
create index rangkuman_kasus_id_kurator on public.rangkuman_kasus (id_kurator);
create index rangkuman_kasus_status on public.rangkuman_kasus (status);

create table public.langkah_penyelesaian (
  id_langkah integer generated always as identity primary key,
  id_rangkuman integer not null references public.rangkuman_kasus (id_rangkuman) on delete cascade,
  nomor integer not null,
  deskripsi text,
  tujuan text,
  dokumen_diperlukan text[] not null default '{}',
  tenggat date,
  unique (id_rangkuman, nomor)
);

create table public.checklist (
  id_checklist integer generated always as identity primary key,
  id_rangkuman integer not null unique references public.rangkuman_kasus (id_rangkuman) on delete cascade,
  daftar_dokumen text[] not null default '{}'
);

create table public.templat_dokumen (
  id_templat integer generated always as identity primary key,
  id_rangkuman integer not null references public.rangkuman_kasus (id_rangkuman) on delete cascade,
  nama_berkas text not null,
  format text not null,
  ukuran integer not null check (ukuran >= 0),
  versi text not null,
  tanggal_pembaruan date not null default current_date
);
create index templat_dokumen_id_rangkuman on public.templat_dokumen (id_rangkuman);

create table public.artikel (
  id_artikel integer generated always as identity primary key,
  id_rangkuman integer not null references public.rangkuman_kasus (id_rangkuman) on delete cascade,
  judul text,
  tautan_sumber text
);
create index artikel_id_rangkuman on public.artikel (id_rangkuman);

create table public.lembaga_bantuan_hukum (
  id_lbh integer generated always as identity primary key,
  nama text not null,
  wilayah text not null,
  tautan text not null
);

-- id_rangkuman dan id_pelaku tidak memakai cascade agar riwayat tetap permanen (KNF09).
create table public.riwayat_status (
  id_riwayat integer generated always as identity primary key,
  id_rangkuman integer not null references public.rangkuman_kasus (id_rangkuman),
  id_pelaku uuid not null references public.akun (id_akun),
  status text not null
    check (status in ('Draft', 'Diajukan', 'Perlu Revisi', 'Disetujui')),
  waktu timestamptz not null default now()
);
create index riwayat_status_id_rangkuman on public.riwayat_status (id_rangkuman);

-- ---------------------------------------------------------------------------
-- Trigger
-- ---------------------------------------------------------------------------

-- Riwayat status tidak dapat diubah atau dihapus oleh peran apa pun (KNF09).
create function public.tolak_perubahan_riwayat()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'riwayat_status bersifat permanen dan tidak dapat diubah (KNF09)';
end;
$$;

create trigger riwayat_status_permanen
  before update or delete on public.riwayat_status
  for each row execute function public.tolak_perubahan_riwayat();

create trigger riwayat_status_tanpa_truncate
  before truncate on public.riwayat_status
  for each statement execute function public.tolak_perubahan_riwayat();

-- jumlah_konten diperbarui di basis data karena Kurator tidak boleh mengubah
-- baris kurator miliknya sendiri (baris itu juga menyimpan status_aktif).
create function public.tambah_jumlah_konten()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.kurator
    set jumlah_konten = jumlah_konten + 1
    where id_akun = new.id_kurator;
  return new;
end;
$$;

create trigger rangkuman_kasus_tambah_jumlah_konten
  after insert on public.rangkuman_kasus
  for each row execute function public.tambah_jumlah_konten();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

-- Fungsi pembantu berada di luar skema public agar tidak terbuka lewat API,
-- dan memakai security definer agar tidak memicu RLS tabel akun secara berulang.
create schema private;
grant usage on schema private to anon, authenticated;

create function private.adalah_administrator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.administrator where id_akun = (select auth.uid())
  );
$$;

create function private.adalah_kurator_aktif()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.kurator
    where id_akun = (select auth.uid()) and status_aktif
  );
$$;

-- Dipakai tabel anak: konten harus milik Kurator aktif yang sedang masuk.
create function private.memiliki_rangkuman(id integer)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.rangkuman_kasus r
    join public.kurator k on k.id_akun = r.id_kurator
    where r.id_rangkuman = id
      and r.id_kurator = (select auth.uid())
      and k.status_aktif
  );
$$;

alter table public.akun enable row level security;
alter table public.administrator enable row level security;
alter table public.kurator enable row level security;
alter table public.bidang_hukum enable row level security;
alter table public.kelompok_kasus enable row level security;
alter table public.rangkuman_kasus enable row level security;
alter table public.langkah_penyelesaian enable row level security;
alter table public.checklist enable row level security;
alter table public.templat_dokumen enable row level security;
alter table public.artikel enable row level security;
alter table public.lembaga_bantuan_hukum enable row level security;
alter table public.riwayat_status enable row level security;

-- Akun: pembuatan akun hanya lewat service role di kode server.
create policy akun_baca on public.akun for select to authenticated
  using (id_akun = (select auth.uid()) or private.adalah_administrator());

create policy administrator_baca on public.administrator for select to authenticated
  using (id_akun = (select auth.uid()));

create policy kurator_baca on public.kurator for select to authenticated
  using (id_akun = (select auth.uid()) or private.adalah_administrator());

create policy kurator_ubah_oleh_administrator on public.kurator for update to authenticated
  using (private.adalah_administrator())
  with check (private.adalah_administrator());

-- Katalog dan direktori LBH terbuka untuk publik.
create policy bidang_hukum_baca on public.bidang_hukum for select to anon, authenticated
  using (true);

create policy kelompok_kasus_baca on public.kelompok_kasus for select to anon, authenticated
  using (true);

create policy lbh_baca on public.lembaga_bantuan_hukum for select to anon, authenticated
  using (true);

-- Rangkuman: publik hanya melihat konten Disetujui.
create policy rangkuman_baca on public.rangkuman_kasus for select to anon, authenticated
  using (
    status = 'Disetujui'
    or (id_kurator = (select auth.uid()) and private.adalah_kurator_aktif())
    or private.adalah_administrator()
  );

create policy rangkuman_tambah on public.rangkuman_kasus for insert to authenticated
  with check (
    id_kurator = (select auth.uid())
    and private.adalah_kurator_aktif()
    and status = 'Draft'
  );

-- Kurator hanya mengubah konten miliknya dan tidak bisa menyetujui konten sendiri.
create policy rangkuman_ubah_kurator on public.rangkuman_kasus for update to authenticated
  using (id_kurator = (select auth.uid()) and private.adalah_kurator_aktif())
  with check (
    id_kurator = (select auth.uid())
    and private.adalah_kurator_aktif()
    and status <> 'Disetujui'
  );

create policy rangkuman_ubah_administrator on public.rangkuman_kasus for update to authenticated
  using (private.adalah_administrator())
  with check (private.adalah_administrator());

-- Tabel anak mengikuti aturan baca rangkuman induknya (RLS induk ikut berlaku).
create policy langkah_baca on public.langkah_penyelesaian for select to anon, authenticated
  using (exists (select 1 from public.rangkuman_kasus r where r.id_rangkuman = langkah_penyelesaian.id_rangkuman));
create policy langkah_kelola on public.langkah_penyelesaian for all to authenticated
  using (private.memiliki_rangkuman(id_rangkuman))
  with check (private.memiliki_rangkuman(id_rangkuman));

create policy checklist_baca on public.checklist for select to anon, authenticated
  using (exists (select 1 from public.rangkuman_kasus r where r.id_rangkuman = checklist.id_rangkuman));
create policy checklist_kelola on public.checklist for all to authenticated
  using (private.memiliki_rangkuman(id_rangkuman))
  with check (private.memiliki_rangkuman(id_rangkuman));

create policy templat_baca on public.templat_dokumen for select to anon, authenticated
  using (exists (select 1 from public.rangkuman_kasus r where r.id_rangkuman = templat_dokumen.id_rangkuman));
create policy templat_kelola on public.templat_dokumen for all to authenticated
  using (private.memiliki_rangkuman(id_rangkuman))
  with check (private.memiliki_rangkuman(id_rangkuman));

create policy artikel_baca on public.artikel for select to anon, authenticated
  using (exists (select 1 from public.rangkuman_kasus r where r.id_rangkuman = artikel.id_rangkuman));
create policy artikel_kelola on public.artikel for all to authenticated
  using (private.memiliki_rangkuman(id_rangkuman))
  with check (private.memiliki_rangkuman(id_rangkuman));

-- Riwayat hanya bisa dibaca pihak terkait dan ditambah. Tidak ada kebijakan
-- update maupun delete (KNF09).
create policy riwayat_baca on public.riwayat_status for select to authenticated
  using (private.memiliki_rangkuman(id_rangkuman) or private.adalah_administrator());

create policy riwayat_tambah on public.riwayat_status for insert to authenticated
  with check (
    id_pelaku = (select auth.uid())
    and (private.memiliki_rangkuman(id_rangkuman) or private.adalah_administrator())
  );

-- ---------------------------------------------------------------------------
-- Hak akses
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated, service_role;
grant select on public.bidang_hukum, public.kelompok_kasus, public.lembaga_bantuan_hukum,
  public.rangkuman_kasus, public.langkah_penyelesaian, public.checklist,
  public.templat_dokumen, public.artikel
  to anon;
grant select, insert, update, delete on all tables in schema public to authenticated, service_role;
revoke truncate on public.riwayat_status from anon, authenticated, service_role;

-- Fungsi trigger tidak perlu dipanggil langsung lewat API.
revoke execute on function public.tolak_perubahan_riwayat() from public, anon, authenticated;
revoke execute on function public.tambah_jumlah_konten() from public, anon, authenticated;
