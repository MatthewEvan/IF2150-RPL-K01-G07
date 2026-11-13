import { describe, expect, it } from "vitest";
import {
  buatDaftarButir,
  hapusButir,
  pindahkanButir,
  tambahButir,
} from "@/components/konten/aturanDaftarButir";

const daftar = buatDaftarButir(["A", "B", "C"]);

function isi(hasil: { isi: string }[]) {
  return hasil.map((butir) => butir.isi);
}

describe("buatDaftarButir dan tambahButir", () => {
  it("memberi kunci berbeda untuk setiap butir", () => {
    const hasil = tambahButir(daftar, "D", 3);

    expect(hasil.map((butir) => butir.kunci)).toEqual([0, 1, 2, 3]);
    expect(isi(hasil)).toEqual(["A", "B", "C", "D"]);
  });
});

describe("hapusButir", () => {
  it("menghapus butir pada indeks yang dipilih", () => {
    expect(isi(hapusButir(daftar, 1))).toEqual(["A", "C"]);
  });

  it.each([-1, 3])("mengabaikan indeks di luar rentang (%i)", (indeks) => {
    expect(hapusButir(daftar, indeks)).toBe(daftar);
  });
});

describe("pindahkanButir", () => {
  it("menaikkan butir satu urutan dan kuncinya ikut pindah", () => {
    const hasil = pindahkanButir(daftar, 2, -1);

    expect(isi(hasil)).toEqual(["A", "C", "B"]);
    expect(hasil[1].kunci).toBe(2);
  });

  it("menurunkan butir satu urutan", () => {
    expect(isi(pindahkanButir(daftar, 0, 1))).toEqual(["B", "A", "C"]);
  });

  it("tidak mengubah daftar asli", () => {
    pindahkanButir(daftar, 0, 1);

    expect(isi(daftar)).toEqual(["A", "B", "C"]);
  });

  it.each([
    [0, -1],
    [2, 1],
    [5, -1],
  ] as const)(
    "mengabaikan perpindahan di luar ujung (indeks %i, arah %i)",
    (indeks, arah) => {
      expect(pindahkanButir(daftar, indeks, arah)).toBe(daftar);
    },
  );
});
