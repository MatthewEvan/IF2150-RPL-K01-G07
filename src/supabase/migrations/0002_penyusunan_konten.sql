alter table public.langkah_penyelesaian
  alter column tenggat type text using tenggat::text;

create function private.bisa_menyunting(id integer)
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
      and r.status in ('Draft', 'Perlu Revisi')
  );
$$;

drop policy rangkuman_ubah_kurator on public.rangkuman_kasus;
create policy rangkuman_ubah_kurator on public.rangkuman_kasus for update to authenticated
  using (
    id_kurator = (select auth.uid())
    and private.adalah_kurator_aktif()
    and status in ('Draft', 'Perlu Revisi')
  )
  with check (
    id_kurator = (select auth.uid())
    and private.adalah_kurator_aktif()
    and status in ('Draft', 'Perlu Revisi', 'Diajukan')
  );

drop policy langkah_kelola on public.langkah_penyelesaian;
create policy langkah_tambah on public.langkah_penyelesaian for insert to authenticated
  with check (private.bisa_menyunting(id_rangkuman));
create policy langkah_ubah on public.langkah_penyelesaian for update to authenticated
  using (private.bisa_menyunting(id_rangkuman))
  with check (private.bisa_menyunting(id_rangkuman));
create policy langkah_hapus on public.langkah_penyelesaian for delete to authenticated
  using (private.bisa_menyunting(id_rangkuman));

drop policy checklist_kelola on public.checklist;
create policy checklist_tambah on public.checklist for insert to authenticated
  with check (private.bisa_menyunting(id_rangkuman));
create policy checklist_ubah on public.checklist for update to authenticated
  using (private.bisa_menyunting(id_rangkuman))
  with check (private.bisa_menyunting(id_rangkuman));
create policy checklist_hapus on public.checklist for delete to authenticated
  using (private.bisa_menyunting(id_rangkuman));

drop policy templat_kelola on public.templat_dokumen;
create policy templat_tambah on public.templat_dokumen for insert to authenticated
  with check (private.bisa_menyunting(id_rangkuman));
create policy templat_ubah on public.templat_dokumen for update to authenticated
  using (private.bisa_menyunting(id_rangkuman))
  with check (private.bisa_menyunting(id_rangkuman));
create policy templat_hapus on public.templat_dokumen for delete to authenticated
  using (private.bisa_menyunting(id_rangkuman));

drop policy artikel_kelola on public.artikel;
create policy artikel_tambah on public.artikel for insert to authenticated
  with check (private.bisa_menyunting(id_rangkuman));
create policy artikel_ubah on public.artikel for update to authenticated
  using (private.bisa_menyunting(id_rangkuman))
  with check (private.bisa_menyunting(id_rangkuman));
create policy artikel_hapus on public.artikel for delete to authenticated
  using (private.bisa_menyunting(id_rangkuman));

create function public.simpan_draf(
  p_id_rangkuman integer,
  p_inti_masalah text,
  p_hak text,
  p_poin_pertimbangan text,
  p_langkah jsonb,
  p_daftar_dokumen text[],
  p_artikel jsonb
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if not private.bisa_menyunting(p_id_rangkuman) then
    raise exception 'Konten % tidak dapat diubah', p_id_rangkuman
      using errcode = '42501';
  end if;

  update public.rangkuman_kasus
    set inti_masalah = p_inti_masalah,
        hak = p_hak,
        poin_pertimbangan = p_poin_pertimbangan
    where id_rangkuman = p_id_rangkuman;

  delete from public.langkah_penyelesaian where id_rangkuman = p_id_rangkuman;
  insert into public.langkah_penyelesaian (id_rangkuman, nomor, deskripsi, tujuan, tenggat)
    select p_id_rangkuman,
           (langkah ->> 'nomor')::integer,
           langkah ->> 'deskripsi',
           nullif(langkah ->> 'tujuan', ''),
           nullif(langkah ->> 'tenggat', '')
    from jsonb_array_elements(coalesce(p_langkah, '[]'::jsonb)) as langkah;

  delete from public.checklist where id_rangkuman = p_id_rangkuman;
  if coalesce(cardinality(p_daftar_dokumen), 0) > 0 then
    insert into public.checklist (id_rangkuman, daftar_dokumen)
      values (p_id_rangkuman, p_daftar_dokumen);
  end if;

  delete from public.artikel where id_rangkuman = p_id_rangkuman;
  insert into public.artikel (id_rangkuman, judul, tautan_sumber)
    select p_id_rangkuman, artikel ->> 'judul', artikel ->> 'tautanSumber'
    from jsonb_array_elements(coalesce(p_artikel, '[]'::jsonb))
      with ordinality as daftar (artikel, urutan)
    order by urutan;
end;
$$;

revoke execute on function public.simpan_draf(integer, text, text, text, jsonb, text[], jsonb)
  from public, anon;
grant execute on function public.simpan_draf(integer, text, text, text, jsonb, text[], jsonb)
  to authenticated;
