// @vitest-environment node
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cariAkun, PERAN, type AkunTerhubung } from "@/lib/models/akun";
import { proxy } from "@/proxy";

type CookieBaru = { name: string; value: string; options?: object };

const tiruan = vi.hoisted(() => ({
  getUser: vi.fn(),
  signOut: vi.fn(),
  /** Cookie yang "diperbarui" Supabase saat getUser dipanggil. */
  cookieBaru: [] as CookieBaru[],
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: (
    _url: string,
    _kunci: string,
    opsi: { cookies: { setAll: (daftar: CookieBaru[]) => void } },
  ) => ({
    auth: {
      getUser: async () => {
        if (tiruan.cookieBaru.length) opsi.cookies.setAll(tiruan.cookieBaru);
        return tiruan.getUser();
      },
      signOut: tiruan.signOut,
    },
  }),
}));
vi.mock("@/lib/models/akun", async (asli) => ({
  ...(await asli<typeof import("@/lib/models/akun")>()),
  cariAkun: vi.fn(),
}));

const MENIT = 60 * 1000;

function permintaan(path: string, menitLalu?: number) {
  const headers = new Headers();
  if (menitLalu !== undefined) {
    headers.set(
      "cookie",
      `aktivitas_terakhir=${Date.now() - menitLalu * MENIT}`,
    );
  }
  return new NextRequest(new URL(`http://localhost${path}`), { headers });
}

function akun(peran: AkunTerhubung["peran"], statusAktif = true) {
  return { idAkun: "u1", email: "u@contoh.test", peran, statusAktif };
}

function masukSebagai(nilai: AkunTerhubung | null) {
  tiruan.getUser.mockResolvedValue({ data: { user: { id: "u1" } } });
  vi.mocked(cariAkun).mockResolvedValue(nilai);
}

beforeEach(() => {
  vi.clearAllMocks();
  tiruan.cookieBaru = [];
});

describe("C25 KontrolAutentikasi.cekSesi lewat proxy.ts", () => {
  it("C25-UT18: mengalihkan permintaan panel tanpa sesi ke /masuk tanpa memanggil signOut", async () => {
    tiruan.getUser.mockResolvedValue({ data: { user: null } });

    const respons = await proxy(permintaan("/panel/kurator/konten"));

    expect(respons.status).toBe(307);
    expect(respons.headers.get("location")).toBe("http://localhost/masuk");
    expect(tiruan.signOut).not.toHaveBeenCalled();
    expect(cariAkun).not.toHaveBeenCalled();
  });

  it("C25-UT19: mengakhiri sesi yang tidak aktif lebih dari 30 menit (KNF14)", async () => {
    masukSebagai(akun(PERAN.KURATOR));

    const respons = await proxy(permintaan("/panel/kurator/konten", 31));

    expect(respons.headers.get("location")).toBe(
      "http://localhost/masuk?alasan=sesi-berakhir",
    );
    expect(tiruan.signOut).toHaveBeenCalledOnce();
    expect(respons.cookies.get("aktivitas_terakhir")?.value).toBe("");
  });

  it("C25-UT20: mengakhiri sesi Kurator yang sudah dinonaktifkan (KF37)", async () => {
    masukSebagai(akun(PERAN.KURATOR, false));

    const respons = await proxy(permintaan("/panel/kurator/konten", 1));

    expect(respons.headers.get("location")).toBe(
      "http://localhost/masuk?alasan=akun-nonaktif",
    );
    expect(tiruan.signOut).toHaveBeenCalledOnce();
  });

  it("C25-UT21: menolak Kurator yang membuka panel Administrator tanpa mengakhiri sesinya", async () => {
    masukSebagai(akun(PERAN.KURATOR));

    const respons = await proxy(permintaan("/panel/admin/akun", 1));

    expect(respons.headers.get("location")).toBe(
      "http://localhost/panel/ditolak",
    );
    expect(tiruan.signOut).not.toHaveBeenCalled();
  });

  it("C25-UT22: meneruskan permintaan yang sah dan memperbarui cookie aktivitas", async () => {
    masukSebagai(akun(PERAN.ADMINISTRATOR));
    const sebelum = Date.now();

    const respons = await proxy(permintaan("/panel/admin/akun", 5));

    expect(respons.headers.get("location")).toBeNull();
    expect(respons.headers.get("x-middleware-next")).toBe("1");
    const cookie = respons.cookies.get("aktivitas_terakhir");
    expect(Number(cookie?.value)).toBeGreaterThanOrEqual(sebelum);
    expect(cookie?.httpOnly).toBe(true);
  });

  it("C25-UT23: menyertakan cookie sesi yang diperbarui Supabase pada respons sah maupun pengalihan", async () => {
    tiruan.cookieBaru = [{ name: "sb-sesi", value: "token-baru" }];
    masukSebagai(akun(PERAN.KURATOR));

    const sah = await proxy(permintaan("/panel/kurator/konten", 1));
    const ditolak = await proxy(permintaan("/panel/admin/akun", 1));

    expect(sah.cookies.get("sb-sesi")?.value).toBe("token-baru");
    expect(ditolak.cookies.get("sb-sesi")?.value).toBe("token-baru");
  });

  it("C25-UT24: menganggap cookie aktivitas yang rusak sebagai sesi baru", async () => {
    masukSebagai(akun(PERAN.KURATOR));
    const headers = new Headers({ cookie: "aktivitas_terakhir=bukan-angka" });

    const respons = await proxy(
      new NextRequest(new URL("http://localhost/panel/kurator/konten"), {
        headers,
      }),
    );

    expect(respons.headers.get("location")).toBeNull();
    expect(tiruan.signOut).not.toHaveBeenCalled();
  });
});
