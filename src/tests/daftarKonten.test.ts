import { describe, expect, it } from "vitest";
import {
  ringkasRiwayat,
  urutkanKonten,
  urutkanRiwayat,
  type KontenKurator,
} from "@/lib/models/kurator";

function buatKonten(
  idRangkuman: number,
  diperbarui: string | null,
): KontenKurator {
  return {
    idRangkuman,
    judul: `Konten ${idRangkuman}`,
    bidang: "Ketenagakerjaan",
    status: "Draft",
    diperbarui,
    catatanRevisi: null,
    riwayat: [],
  };
}

describe("urutkanKonten", () => {
  it("menampilkan konten yang terakhir diperbarui lebih dulu", () => {
    const hasil = urutkanKonten([
      buatKonten(1, "2026-10-05T00:00:00Z"),
      buatKonten(2, "2026-10-12T00:00:00Z"),
      buatKonten(3, "2026-10-08T00:00:00Z"),
    ]);

    expect(hasil.map((konten) => konten.idRangkuman)).toEqual([2, 3, 1]);
  });

  it("menempatkan konten tanpa riwayat di urutan terakhir", () => {
    const hasil = urutkanKonten([
      buatKonten(1, null),
      buatKonten(2, "2026-10-12T00:00:00Z"),
    ]);

    expect(hasil.map((konten) => konten.idRangkuman)).toEqual([2, 1]);
  });

  it("memakai id terbesar lebih dulu bila waktu diperbarui sama", () => {
    const hasil = urutkanKonten([
      buatKonten(4, "2026-10-12T00:00:00Z"),
      buatKonten(6, "2026-10-12T00:00:00Z"),
    ]);

    expect(hasil.map((konten) => konten.idRangkuman)).toEqual([6, 4]);
  });

  it("tidak mengubah array masukan", () => {
    const masukan = [
      buatKonten(1, "2026-10-05T00:00:00Z"),
      buatKonten(2, "2026-10-12T00:00:00Z"),
    ];

    urutkanKonten(masukan);

    expect(masukan.map((konten) => konten.idRangkuman)).toEqual([1, 2]);
  });
});

describe("urutkanRiwayat", () => {
  it("mengurutkan riwayat dari yang terlama", () => {
    const hasil = urutkanRiwayat([
      { status: "Diajukan", waktu: "2026-10-08T00:00:00Z" },
      { status: "Draft", waktu: "2026-10-05T00:00:00Z" },
      { status: "Perlu Revisi", waktu: "2026-10-10T00:00:00Z" },
    ]);

    expect(hasil.map((butir) => butir.status)).toEqual([
      "Draft",
      "Diajukan",
      "Perlu Revisi",
    ]);
  });
});

describe("ringkasRiwayat", () => {
  const riwayat = [
    { status: "Draft" as const, waktu: "2026-10-05T00:00:00Z" },
    { status: "Diajukan" as const, waktu: "2026-10-06T00:00:00Z" },
    { status: "Perlu Revisi" as const, waktu: "2026-10-07T00:00:00Z" },
    { status: "Diajukan" as const, waktu: "2026-10-08T00:00:00Z" },
  ];

  it("menampilkan seluruh riwayat bila belum melewati batas", () => {
    const hasil = ringkasRiwayat(riwayat.slice(0, 2));

    expect(hasil.map((butir) => butir.status)).toEqual(["Draft", "Diajukan"]);
  });

  it("mengambil tiga status terakhir", () => {
    expect(ringkasRiwayat(riwayat).map((butir) => butir.status)).toEqual([
      "Diajukan",
      "Perlu Revisi",
      "Diajukan",
    ]);
  });

  it("tidak mengubah array masukan", () => {
    ringkasRiwayat(riwayat);

    expect(riwayat.map((butir) => butir.status)).toEqual([
      "Draft",
      "Diajukan",
      "Perlu Revisi",
      "Diajukan",
    ]);
  });
});
