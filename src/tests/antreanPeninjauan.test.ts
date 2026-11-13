import { describe, expect, it } from "vitest";
import {
  lamaMenungguHari,
  urutkanAntreanPeninjauan,
  waktuPengajuanTerakhir,
  type AntreanPeninjauan,
} from "@/lib/models/administrator";

function buatButir(
  idRangkuman: number,
  waktuPengajuan: string | null,
): AntreanPeninjauan {
  return {
    idRangkuman,
    judul: `Konten ${idRangkuman}`,
    bidang: "Ketenagakerjaan",
    namaPenulis: "Kurator Satu",
    waktuPengajuan,
  };
}

describe("urutkanAntreanPeninjauan", () => {
  it("menempatkan pengajuan paling lama di atas", () => {
    const hasil = urutkanAntreanPeninjauan([
      buatButir(1, "2026-10-12T00:00:00Z"),
      buatButir(2, "2026-10-05T00:00:00Z"),
      buatButir(3, "2026-10-08T00:00:00Z"),
    ]);

    expect(hasil.map((butir) => butir.idRangkuman)).toEqual([2, 3, 1]);
  });

  it("menempatkan butir tanpa riwayat Diajukan di urutan terakhir", () => {
    const hasil = urutkanAntreanPeninjauan([
      buatButir(1, null),
      buatButir(2, "2026-10-05T00:00:00Z"),
    ]);

    expect(hasil.map((butir) => butir.idRangkuman)).toEqual([2, 1]);
  });

  it("memakai id terkecil lebih dulu bila waktu pengajuan sama", () => {
    const hasil = urutkanAntreanPeninjauan([
      buatButir(6, "2026-10-05T00:00:00Z"),
      buatButir(4, "2026-10-05T00:00:00Z"),
    ]);

    expect(hasil.map((butir) => butir.idRangkuman)).toEqual([4, 6]);
  });

  it("tidak mengubah array masukan", () => {
    const masukan = [
      buatButir(1, "2026-10-12T00:00:00Z"),
      buatButir(2, "2026-10-05T00:00:00Z"),
    ];

    urutkanAntreanPeninjauan(masukan);

    expect(masukan.map((butir) => butir.idRangkuman)).toEqual([1, 2]);
  });
});

describe("waktuPengajuanTerakhir", () => {
  it("mengambil waktu Diajukan terbaru dan mengabaikan status lain", () => {
    const hasil = waktuPengajuanTerakhir([
      { status: "Draft", waktu: "2026-10-01T00:00:00Z" },
      { status: "Diajukan", waktu: "2026-10-05T00:00:00Z" },
      { status: "Diajukan", waktu: "2026-10-09T00:00:00Z" },
      { status: "Perlu Revisi", waktu: "2026-10-10T00:00:00Z" },
    ]);

    expect(hasil).toBe("2026-10-09T00:00:00Z");
  });

  it("mengembalikan null bila tidak ada riwayat Diajukan", () => {
    expect(waktuPengajuanTerakhir(null)).toBeNull();
    expect(
      waktuPengajuanTerakhir([
        { status: "Draft", waktu: "2026-10-01T00:00:00Z" },
      ]),
    ).toBeNull();
  });
});

describe("lamaMenungguHari", () => {
  const sekarang = new Date("2026-10-08T12:00:00Z");

  it("menghitung hari penuh sejak pengajuan", () => {
    expect(lamaMenungguHari("2026-10-05T12:00:00Z", sekarang)).toBe(3);
  });

  it("mengembalikan 0 untuk pengajuan pada hari yang sama", () => {
    expect(lamaMenungguHari("2026-10-08T09:00:00Z", sekarang)).toBe(0);
  });

  it("tidak menghasilkan angka negatif untuk waktu di masa depan", () => {
    expect(lamaMenungguHari("2026-10-12T00:00:00Z", sekarang)).toBe(0);
  });

  it("mengembalikan null bila waktu pengajuan tidak diketahui", () => {
    expect(lamaMenungguHari(null, sekarang)).toBeNull();
    expect(lamaMenungguHari("bukan-tanggal", sekarang)).toBeNull();
  });
});
