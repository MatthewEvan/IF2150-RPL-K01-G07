export type Butir<T> = { kunci: number; isi: T };

export type ArahPindah = -1 | 1;

export function buatDaftarButir<T>(daftarIsi: T[]): Butir<T>[] {
  return daftarIsi.map((isi, kunci) => ({ kunci, isi }));
}

export function tambahButir<T>(
  daftar: Butir<T>[],
  isi: T,
  kunci: number,
): Butir<T>[] {
  return [...daftar, { kunci, isi }];
}

export function hapusButir<T>(daftar: Butir<T>[], indeks: number): Butir<T>[] {
  if (indeks < 0 || indeks >= daftar.length) return daftar;
  return daftar.filter((_, i) => i !== indeks);
}

export function pindahkanButir<T>(
  daftar: Butir<T>[],
  indeks: number,
  arah: ArahPindah,
): Butir<T>[] {
  const tujuan = indeks + arah;
  if (indeks < 0 || indeks >= daftar.length) return daftar;
  if (tujuan < 0 || tujuan >= daftar.length) return daftar;

  const hasil = [...daftar];
  [hasil[indeks], hasil[tujuan]] = [hasil[tujuan], hasil[indeks]];
  return hasil;
}
