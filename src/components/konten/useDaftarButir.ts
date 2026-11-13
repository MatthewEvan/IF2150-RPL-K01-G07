"use client";

import { useEffect, useRef, useState } from "react";
import {
  buatDaftarButir,
  hapusButir,
  pindahkanButir,
  tambahButir,
  type ArahPindah,
} from "./aturanDaftarButir";

export default function useDaftarButir<T>(daftarAwal: T[], namaButir: string) {
  const wadah = useRef<HTMLDivElement>(null);
  const kunciBerikut = useRef(daftarAwal.length);
  const fokusBerikut = useRef<string | null>(null);
  const [daftar, setDaftar] = useState(() => buatDaftarButir(daftarAwal));
  const [pengumuman, setPengumuman] = useState("");

  useEffect(() => {
    const pemilih = fokusBerikut.current;
    if (!pemilih) return;
    fokusBerikut.current = null;
    wadah.current?.querySelector<HTMLElement>(pemilih)?.focus();
  }, [daftar]);

  function tambah(isi: T) {
    const kunci = kunciBerikut.current;
    kunciBerikut.current += 1;
    fokusBerikut.current = `[data-kunci="${kunci}"] input`;
    setDaftar(tambahButir(daftar, isi, kunci));
    setPengumuman(`${namaButir} ${daftar.length + 1} ditambahkan.`);
  }

  function hapus(indeks: number) {
    fokusBerikut.current = '[data-aksi="tambah"]';
    setDaftar(hapusButir(daftar, indeks));
    setPengumuman(`${namaButir} ${indeks + 1} dihapus.`);
  }

  function pindahkan(indeks: number, arah: ArahPindah) {
    const tujuan = indeks + arah;
    const hasil = pindahkanButir(daftar, indeks, arah);
    if (hasil === daftar) return;

    const diTepi = tujuan === 0 || tujuan === daftar.length - 1;
    const aksi = arah === -1 ? "naik" : "turun";
    const aksiCadangan = arah === -1 ? "turun" : "naik";
    fokusBerikut.current = `[data-kunci="${daftar[indeks].kunci}"] [data-aksi="${
      diTepi ? aksiCadangan : aksi
    }"]`;
    setDaftar(hasil);
    setPengumuman(
      `${namaButir} ${indeks + 1} dipindah ke urutan ${tujuan + 1}.`,
    );
  }

  return { wadah, daftar, pengumuman, tambah, hapus, pindahkan };
}
