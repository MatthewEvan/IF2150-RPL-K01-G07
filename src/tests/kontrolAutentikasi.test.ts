import { beforeEach, describe, expect, it, vi } from "vitest";
import { prosesLogin } from "@/lib/controllers/kontrolAutentikasi";
import { cariAkun, PERAN } from "@/lib/models/akun";

const auth = vi.hoisted(() => ({
  signInWithPassword: vi.fn(),
  signOut: vi.fn(),
}));
const cookieSet = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/server", () => ({
  buatClientServer: async () => ({ auth }),
}));
vi.mock("next/headers", () => ({
  cookies: async () => ({ set: cookieSet, delete: vi.fn() }),
}));
// redirect() Next.js menghentikan fungsi dengan melempar galat.
vi.mock("next/navigation", () => ({
  redirect: (tujuan: string) => {
    throw new Error(`REDIRECT:${tujuan}`);
  },
}));
vi.mock("@/lib/models/akun", async (asli) => ({
  ...(await asli<typeof import("@/lib/models/akun")>()),
  cariAkun: vi.fn(),
}));

function isian(email = "kurator@contoh.test", kataSandi = "rahasia-uji") {
  const data = new FormData();
  data.set("email", email);
  data.set("kataSandi", kataSandi);
  return data;
}

function akunUji(peran: "Kurator" | "Administrator", statusAktif = true) {
  return { idAkun: "u1", email: "u@contoh.test", peran, statusAktif };
}

describe("prosesLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.signInWithPassword.mockResolvedValue({
      data: { user: { id: "u1" } },
      error: null,
    });
  });

  it("mengarahkan Kurator ke panelnya dan mencatat aktivitas", async () => {
    vi.mocked(cariAkun).mockResolvedValue(akunUji(PERAN.KURATOR));

    await expect(prosesLogin({}, isian())).rejects.toThrow(
      "REDIRECT:/panel/kurator/konten",
    );
    expect(cookieSet).toHaveBeenCalledWith(
      "aktivitas_terakhir",
      expect.any(String),
      expect.objectContaining({ httpOnly: true }),
    );
  });

  it("mengarahkan Administrator ke panelnya", async () => {
    vi.mocked(cariAkun).mockResolvedValue(akunUji(PERAN.ADMINISTRATOR));

    await expect(prosesLogin({}, isian())).rejects.toThrow(
      "REDIRECT:/panel/admin/moderasi",
    );
  });

  it("menolak kredensial salah tanpa menyebut bagian yang salah", async () => {
    auth.signInWithPassword.mockResolvedValue({
      data: { user: null },
      error: new Error("Invalid login credentials"),
    });

    await expect(prosesLogin({}, isian())).resolves.toEqual({
      galat: "Email atau kata sandi salah.",
    });
    expect(cariAkun).not.toHaveBeenCalled();
  });

  it("menolak isian kosong tanpa menghubungi Supabase", async () => {
    await expect(prosesLogin({}, isian("", ""))).resolves.toHaveProperty(
      "galat",
    );
    expect(auth.signInWithPassword).not.toHaveBeenCalled();
  });

  it("menolak akun nonaktif dan mengakhiri sesinya", async () => {
    vi.mocked(cariAkun).mockResolvedValue(akunUji(PERAN.KURATOR, false));

    await expect(prosesLogin({}, isian())).resolves.toEqual({
      galat: "Akun Anda dinonaktifkan. Hubungi Administrator.",
    });
    expect(auth.signOut).toHaveBeenCalledOnce();
    expect(cookieSet).not.toHaveBeenCalled();
  });

  it("menolak pengguna Auth yang tidak punya profil akun", async () => {
    vi.mocked(cariAkun).mockResolvedValue(null);

    await expect(prosesLogin({}, isian())).resolves.toEqual({
      galat: "Email atau kata sandi salah.",
    });
    expect(auth.signOut).toHaveBeenCalledOnce();
  });
});
