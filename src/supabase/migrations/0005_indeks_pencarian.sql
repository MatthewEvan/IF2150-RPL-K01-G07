-- Migrasi 0005: Indeks pencarian kata kunci (UC02, S3-C06).
-- Menggunakan ekstensi pg_trgm (GIN trigram index) dan partial index pada
-- rangkuman berstatus Disetujui untuk menghilangkan Sequential Scan saat
-- pencocokan kata kunci substring (ILIKE) pada kelompok_kasus dan rangkuman_kasus.

create extension if not exists pg_trgm;

-- Indeks GIN trigram pada gabungan judul_umum dan istilah_resmi di kelompok_kasus.
create index if not exists kelompok_kasus_pencarian_trgm_idx
  on public.kelompok_kasus
  using gin ((judul_umum || ' ' || istilah_resmi) gin_trgm_ops);

create index if not exists kelompok_kasus_judul_umum_trgm_idx
  on public.kelompok_kasus
  using gin (judul_umum gin_trgm_ops);

create index if not exists kelompok_kasus_istilah_resmi_trgm_idx
  on public.kelompok_kasus
  using gin (istilah_resmi gin_trgm_ops);

-- Partial GIN trigram index khusus rangkuman_kasus berstatus 'Disetujui' (KF02).
create index if not exists rangkuman_kasus_pencarian_trgm_idx
  on public.rangkuman_kasus
  using gin (
    (
      coalesce(inti_masalah, '') || ' ' ||
      coalesce(hak, '') || ' ' ||
      coalesce(poin_pertimbangan, '')
    ) gin_trgm_ops
  )
  where status = 'Disetujui';

create index if not exists rangkuman_kasus_inti_masalah_trgm_idx
  on public.rangkuman_kasus
  using gin (inti_masalah gin_trgm_ops)
  where status = 'Disetujui';

create index if not exists rangkuman_kasus_hak_trgm_idx
  on public.rangkuman_kasus
  using gin (hak gin_trgm_ops)
  where status = 'Disetujui';

create index if not exists rangkuman_kasus_poin_pertimbangan_trgm_idx
  on public.rangkuman_kasus
  using gin (poin_pertimbangan gin_trgm_ops)
  where status = 'Disetujui';

-- Partial B-tree index untuk mempercepat join id_kelompok pada rangkuman Disetujui.
create index if not exists rangkuman_kasus_disetujui_id_kelompok_idx
  on public.rangkuman_kasus (id_kelompok)
  where status = 'Disetujui';
