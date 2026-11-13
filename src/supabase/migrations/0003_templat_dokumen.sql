alter table public.templat_dokumen
  add column lokasi_berkas text;

create unique index templat_dokumen_lokasi_unik
  on public.templat_dokumen (lokasi_berkas);
create unique index templat_dokumen_nama_unik
  on public.templat_dokumen (id_rangkuman, nama_berkas);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'templat',
  'templat',
  false,
  5242880,
  array[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

create function private.id_rangkuman_berkas(lokasi text)
returns integer
language sql
immutable
set search_path = ''
as $$
  select case
    when split_part(lokasi, '/', 1) ~ '^[0-9]{1,9}$'
      then split_part(lokasi, '/', 1)::integer
  end;
$$;

create policy templat_berkas_baca on storage.objects for select to anon, authenticated
  using (
    bucket_id = 'templat'
    and (
      exists (
        select 1 from public.templat_dokumen t
        where t.lokasi_berkas = storage.objects.name
      )
      or private.memiliki_rangkuman(private.id_rangkuman_berkas(name))
    )
  );

create policy templat_berkas_tambah on storage.objects for insert to authenticated
  with check (
    bucket_id = 'templat'
    and private.bisa_menyunting(private.id_rangkuman_berkas(name))
  );

create policy templat_berkas_hapus on storage.objects for delete to authenticated
  using (
    bucket_id = 'templat'
    and private.bisa_menyunting(private.id_rangkuman_berkas(name))
  );
