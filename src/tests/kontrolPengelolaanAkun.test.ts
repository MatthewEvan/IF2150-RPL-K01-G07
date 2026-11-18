import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  daftarkanKurator,
  perbaruiKurator,
  ubahStatusKurator,
} from "@/lib/controllers/kontrolPengelolaanAkun";
import {
  validasiAkunBaru,
  validasiEmail,
} from "@/lib/controllers/validasiAkun";
import { cariAkun, PERAN } from "@/lib/models/akun";
import {
  aturStatusKurator,
  cekEmailUnik,
  perbaruiEmailKurator,
  simpanKuratorBaru,
} from "@/lib/models/kurator";

const getUser = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/server", () => ({
  buatClientServer: async () => ({ auth: { getUser } }),
}));
vi.mock("@/lib/supabase/admin", () => ({ buatClientAdmin: () => ({}) }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/lib/models/akun", async (asli) => ({
  ...(await asli<typeof import("@/lib/models/akun")>()),
  cariAkun: vi.fn(),
}));
vi.mock("@/lib/models/kurator", () => ({
  aturStatusKurator: vi.fn(),
  cekEmailUnik: vi.fn(),
  perbaruiEmailKurator: vi.fn(),
  simpanKuratorBaru: vi.fn(),
}));

const ADMIN = {
  idAkun: "a1",
  email: "a@contoh.test",
  peran: PERAN.ADMINISTRATOR,
  statusAktif: true,
};

function isian(email: string, kataSandi = "rahasia-uji") {
  const data = new FormData();
  data.set("email", email);
  data.set("kataSandi", kataSandi);
  return data;
}

beforeEach(() => {
  vi.clearAllMocks();
  getUser.mockResolvedValue({ data: { user: { id: "a1" } } });
  vi.mocked(cariAkun).mockResolvedValue(ADMIN);
  vi.mocked(cekEmailUnik).mockResolvedValue(true);
});

describe("validasiAkunBaru", () => {
  it.each([
    ["", "rahasia-uji"],
    ["baru@contoh.test", ""],
    ["bukan-email", "rahasia-uji"],
    ["baru@contoh.test", "pendek"],
  ])("menolak email %j dan kata sandi %j", (email, kataSandi) => {
    expect(validasiAkunBaru(email, kataSandi)).not.toBeNull();
  });

  it("menerima isian yang benar", () => {
    expect(validasiAkunBaru("baru@contoh.test", "rahasia-uji")).toBeNull();
  });
});

describe("daftarkanKurator", () => {
  it("menyimpan akun baru dengan email huruf kecil", async () => {
    const hasil = await daftarkanKurator({}, isian(" Baru@Contoh.Test "));

    expect(hasil.sukses).toContain("baru@contoh.test");
    expect(simpanKuratorBaru).toHaveBeenCalledWith(
      {},
      "baru@contoh.test",
      "rahasia-uji",
      "a1",
    );
  });

  it("menolak email duplikat", async () => {
    vi.mocked(cekEmailUnik).mockResolvedValue(false);

    await expect(
      daftarkanKurator({}, isian("ada@contoh.test")),
    ).resolves.toEqual({ galat: "Email sudah terdaftar." });
    expect(simpanKuratorBaru).not.toHaveBeenCalled();
  });

  it("melaporkan galat jika penyimpanan gagal", async () => {
    vi.mocked(simpanKuratorBaru).mockRejectedValueOnce(new Error("gagal"));

    await expect(
      daftarkanKurator({}, isian("baru@contoh.test")),
    ).resolves.toHaveProperty("galat");
  });

  it("menolak pemanggil yang bukan Administrator", async () => {
    vi.mocked(cariAkun).mockResolvedValue({ ...ADMIN, peran: PERAN.KURATOR });

    await expect(
      daftarkanKurator({}, isian("baru@contoh.test")),
    ).resolves.toHaveProperty("galat");
    expect(cekEmailUnik).not.toHaveBeenCalled();
    expect(simpanKuratorBaru).not.toHaveBeenCalled();
  });
});

describe("ubahStatusKurator", () => {
  it("menonaktifkan Kurator milik Administrator yang sedang masuk", async () => {
    vi.mocked(aturStatusKurator).mockResolvedValue(true);

    await expect(ubahStatusKurator("k1", false)).resolves.toEqual({});
    expect(aturStatusKurator).toHaveBeenCalledWith(
      expect.anything(),
      "k1",
      "a1",
      false,
    );
  });

  it("melaporkan galat jika Kurator tidak ditemukan", async () => {
    vi.mocked(aturStatusKurator).mockResolvedValue(false);

    await expect(ubahStatusKurator("x", false)).resolves.toHaveProperty(
      "galat",
    );
  });

  it("menolak pemanggil tanpa sesi", async () => {
    getUser.mockResolvedValue({ data: { user: null } });

    await expect(ubahStatusKurator("k1", false)).resolves.toHaveProperty(
      "galat",
    );
    expect(aturStatusKurator).not.toHaveBeenCalled();
  });
});

describe("validasiEmail", () => {
  it.each([[""], ["bukan-email"], ["tanpa@titik"]])(
    "menolak email %j",
    (email) => {
      expect(validasiEmail(email)).not.toBeNull();
    },
  );

  it("menerima email yang benar", () => {
    expect(validasiEmail("baru@contoh.test")).toBeNull();
  });
});

describe("perbaruiKurator (KF43)", () => {
  beforeEach(() => {
    vi.mocked(perbaruiEmailKurator).mockResolvedValue(true);
  });

  it("mengganti email dengan huruf kecil tanpa spasi tepi", async () => {
    const hasil = await perbaruiKurator("k1", "  Baru@Contoh.Test ");

    expect(hasil.sukses).toContain("baru@contoh.test");
    expect(perbaruiEmailKurator).toHaveBeenCalledWith(
      {},
      "k1",
      "a1",
      "baru@contoh.test",
    );
  });

  it.each([[""], ["bukan-email"]])(
    "menolak email %j sebelum memeriksa basis data",
    async (email) => {
      await expect(perbaruiKurator("k1", email)).resolves.toHaveProperty(
        "galat",
      );
      expect(cekEmailUnik).not.toHaveBeenCalled();
      expect(perbaruiEmailKurator).not.toHaveBeenCalled();
    },
  );

  it("menolak email yang sudah dipakai akun lain", async () => {
    vi.mocked(cekEmailUnik).mockResolvedValue(false);

    await expect(perbaruiKurator("k1", "ada@contoh.test")).resolves.toEqual({
      galat: "Email sudah terdaftar.",
    });
    expect(perbaruiEmailKurator).not.toHaveBeenCalled();
  });

  it("menolak Kurator yang bukan milik Administrator tersebut", async () => {
    vi.mocked(perbaruiEmailKurator).mockResolvedValue(false);

    await expect(perbaruiKurator("x", "baru@contoh.test")).resolves.toEqual({
      galat: "Akun kurator tidak ditemukan.",
    });
  });

  it("melaporkan galat jika penyimpanan gagal", async () => {
    vi.mocked(perbaruiEmailKurator).mockRejectedValueOnce(new Error("gagal"));

    await expect(
      perbaruiKurator("k1", "baru@contoh.test"),
    ).resolves.toHaveProperty("galat");
  });

  it("menolak pemanggil yang bukan Administrator", async () => {
    vi.mocked(cariAkun).mockResolvedValue({ ...ADMIN, peran: PERAN.KURATOR });

    await expect(
      perbaruiKurator("k1", "baru@contoh.test"),
    ).resolves.toHaveProperty("galat");
    expect(perbaruiEmailKurator).not.toHaveBeenCalled();
  });
});
