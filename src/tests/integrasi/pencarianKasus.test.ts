import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  cariKasus,
  sarankanBidangLain,
} from "@/lib/controllers/kontrolPencarianKataKunci";
import { buatClientServer } from "@/lib/supabase/server";
import { buatClientAnonLokal } from "./supabaseLokal";

// Hubungkan buatClientServer() ke client Supabase nyata tanpa meniru Model atau query DB.
vi.mock("@/lib/supabase/server", () => ({
  buatClientServer: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(buatClientServer).mockResolvedValue(
    buatClientAnonLokal() as unknown as Awaited<
      ReturnType<typeof buatClientServer>
    >,
  );
});

describe("Integrasi C22 KontrolPencarianKataKunci ke Supabase", () => {
  it("INT-TC20: mengembalikan hanya kasus Disetujui yang cocok dengan kata kunci dari Supabase", async () => {
    const hasil = await cariKasus("  upah  ");

    expect(hasil.length).toBeGreaterThanOrEqual(1);
    expect(hasil.every((item) => item.status === "Disetujui")).toBe(true);
    expect(
      hasil.some((item) =>
        item.judulUmum.toLowerCase().includes("gaji tidak dibayar"),
      ),
    ).toBe(true);
  });

  it("INT-TC21: mengembalikan daftar bidang hukum aktif melalui sarankanBidangLain() saat hasil kosong", async () => {
    const hasilKosong = await cariKasus("kata-kunci-tidak-terdaftar-xyz");
    const saran = await sarankanBidangLain();

    expect(hasilKosong).toEqual([]);
    expect(saran.length).toBeGreaterThanOrEqual(1);
    expect(saran.every((bidang) => bidang.statusAktif)).toBe(true);
  });
});
