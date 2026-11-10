import { describe, expect, it } from "vitest";
import { urutkanKonten, type KontenKurator } from "@/lib/models/kurator";

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
