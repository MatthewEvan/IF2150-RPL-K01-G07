create function public.ajukan_konten(p_id_rangkuman integer)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_rangkuman public.rangkuman_kasus%rowtype;
begin
  if not private.bisa_menyunting(p_id_rangkuman) then
    raise exception 'Konten % tidak dapat diajukan', p_id_rangkuman
      using errcode = '42501';
  end if;

  select * into v_rangkuman
    from public.rangkuman_kasus
    where id_rangkuman = p_id_rangkuman;

  if coalesce(btrim(v_rangkuman.inti_masalah), '') = ''
    or coalesce(btrim(v_rangkuman.hak), '') = ''
    or coalesce(btrim(v_rangkuman.poin_pertimbangan), '') = ''
    or not exists (
      select 1 from public.langkah_penyelesaian
      where id_rangkuman = p_id_rangkuman
    )
    or exists (
      select 1 from public.langkah_penyelesaian
      where id_rangkuman = p_id_rangkuman
        and coalesce(btrim(deskripsi), '') = ''
    )
    or not exists (
      select 1 from public.checklist
      where id_rangkuman = p_id_rangkuman
        and coalesce(cardinality(daftar_dokumen), 0) > 0
    )
    or not exists (
      select 1 from public.artikel
      where id_rangkuman = p_id_rangkuman
    )
    or exists (
      select 1 from public.artikel
      where id_rangkuman = p_id_rangkuman
        and (coalesce(btrim(judul), '') = '' or coalesce(btrim(tautan_sumber), '') = '')
    )
  then
    raise exception 'Isian wajib konten % belum lengkap', p_id_rangkuman
      using errcode = '23514';
  end if;

  update public.rangkuman_kasus
    set status = 'Diajukan'
    where id_rangkuman = p_id_rangkuman
      and status in ('Draft', 'Perlu Revisi');

  if not found then
    raise exception 'Konten % tidak dapat diajukan', p_id_rangkuman
      using errcode = '42501';
  end if;

  insert into public.riwayat_status (id_rangkuman, id_pelaku, status)
    values (p_id_rangkuman, (select auth.uid()), 'Diajukan');
end;
$$;

revoke execute on function public.ajukan_konten(integer) from public, anon;
grant execute on function public.ajukan_konten(integer) to authenticated;
