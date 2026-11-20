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

describe("Integrasi C22 KontrolPencarianKataKunci ke Supabase (INT-TC20 s.d. INT-TC24)", () => {
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

  it("INT-TC22: tidak menampilkan rangkuman berstatus Draft, Diajukan, atau Perlu Revisi pada hasil pencarian (KF02)", async () => {
    // Kata kunci di bawah hanya ada pada seed rangkuman status Diajukan (4), Perlu Revisi (5), dan Draft (6).
    const hasilDraft = await cariKasus("tautan pembayaran palsu");
    const hasilDiajukan = await cariKasus("tanpa menerima pesangon");
    const hasilRevisi = await cariKasus("membayar di toko daring");

    expect(hasilDraft).toEqual([]);
    expect(hasilDiajukan).toEqual([]);
    expect(hasilRevisi).toEqual([]);
  });

  it("INT-TC23: mencocokkan kata kunci terhadap istilah_resmi kelompok dan isi rangkuman (hak/inti_masalah)", async () => {
    const hasilIstilah = await cariKasus("sengketa konsumen");
    const hasilIsi = await cariKasus("kompensasi");

    expect(hasilIstilah.some((item) => item.idKelompok === 3)).toBe(true);
    expect(hasilIsi.some((item) => item.idKelompok === 3)).toBe(true);
  });

  it("INT-TC24: menangani kata kunci berkarakter khusus PostgREST (koma/kurung) melalui fallback tanpa galat", async () => {
    const hasil = await cariKasus("upah, (uji)");

    expect(Array.isArray(hasil)).toBe(true);
    expect(hasil).toEqual([]);
  });
});
