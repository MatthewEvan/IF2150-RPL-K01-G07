import { beforeEach, describe, expect, it, vi } from "vitest";
import { ambilDaftarKonten } from "@/lib/controllers/kontrolPelacakanKonten";
import { ambilDaftarKonten as ambilDaftarKontenModel } from "@/lib/models/kurator";
import { buatClientServer } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({ buatClientServer: vi.fn() }));
vi.mock("@/lib/models/kurator", () => ({ ambilDaftarKonten: vi.fn() }));

const supabase = { tanda: "client-server" };

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(buatClientServer).mockResolvedValue(supabase as never);
});

describe("ambilDaftarKonten", () => {
  it("C27-UT01: meneruskan id Kurator dari sesi ke model C02 dengan client server", async () => {
    vi.mocked(ambilDaftarKontenModel).mockResolvedValue([]);

    await ambilDaftarKonten("kurator-1");

    expect(buatClientServer).toHaveBeenCalledTimes(1);
    expect(ambilDaftarKontenModel).toHaveBeenCalledWith(supabase, "kurator-1");
  });

  it("C27-UT02: mengembalikan daftar konten dari model tanpa mengubahnya", async () => {
    const daftar = [{ idRangkuman: 4 }, { idRangkuman: 6 }];
    vi.mocked(ambilDaftarKontenModel).mockResolvedValue(daftar as never);

    expect(await ambilDaftarKonten("kurator-1")).toBe(daftar);
  });

  it("C27-UT03: mengembalikan daftar kosong bila Kurator belum punya konten", async () => {
    vi.mocked(ambilDaftarKontenModel).mockResolvedValue([]);

    expect(await ambilDaftarKonten("kurator-2")).toEqual([]);
  });

  it("C27-UT04: meneruskan galat dari model", async () => {
    const galat = new Error("gagal");
    vi.mocked(ambilDaftarKontenModel).mockRejectedValue(galat);

    await expect(ambilDaftarKonten("kurator-1")).rejects.toBe(galat);
  });
});
