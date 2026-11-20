import type { SupabaseClient } from "@supabase/supabase-js";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { prosesLogin } from "@/lib/controllers/kontrolAutentikasi";
import {
  daftarkanKurator,
  perbaruiKurator,
  ubahStatusKurator,
} from "@/lib/controllers/kontrolPengelolaanAkun";
import {
  buatClientAdminLokal,
  buatClientAnonLokal,
  buatClientMasukLokal,
  KATA_SANDI_UJI_LOKAL,
  wajibSupabaseLokal,
} from "./supabaseLokal";

/**
 * Integration test C25 dan C29 terhadap Supabase lokal. Yang ditiru hanya
 * pembungkus Next.js (cookies, redirect, revalidatePath) dan pemilihan client
 * sesi; Model, RLS, trigger, dan Supabase Auth berjalan sungguhan.
 */
const tiruan = vi.hoisted(() => ({
  client: null as unknown,
  cookieSet: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  buatClientServer: async () => tiruan.client,
}));
vi.mock("next/headers", () => ({
  cookies: async () => ({ set: tiruan.cookieSet, delete: vi.fn() }),
}));
vi.mock("next/navigation", () => ({
  redirect: (tujuan: string) => {
    throw new Error(`REDIRECT:${tujuan}`);
  },
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

const ID_ADMIN = "a0000000-0000-4000-8000-000000000001";
const SANDI_BARU = "Integrasi-Uji-2026";
const akunDibuat: string[] = [];

function isianLogin(email: string, kataSandi = KATA_SANDI_UJI_LOKAL) {
  const data = new FormData();
  data.set("email", email);
  data.set("kataSandi", kataSandi);
  return data;
}

function isianAkun(email: string, kataSandi = SANDI_BARU) {
  const data = new FormData();
  data.set("email", email);
  data.set("kataSandi", kataSandi);
  return data;
}

/** Email unik per eksekusi agar test bisa diulang tanpa reset basis data. */
function emailUji(nama: string) {
  return `int.${nama}.${Date.now()}@pahamhukum.test`;
}

async function idAkunDariEmail(email: string) {
  const { data, error } = await buatClientAdminLokal()
    .from("akun")
    .select("id_akun")
    .eq("email", email)
    .maybeSingle();
  if (error) throw error;
  return (data?.id_akun as string | undefined) ?? null;
}

async function buatKuratorUji(nama: string) {
  tiruan.client = await buatClientMasukLokal("admin@pahamhukum.test");
  const email = emailUji(nama);
  const hasil = await daftarkanKurator({}, isianAkun(email));
  if (hasil.galat) throw new Error(hasil.galat);
  const idAkun = await idAkunDariEmail(email);
  if (!idAkun) throw new Error("Kurator uji tidak tersimpan");
  akunDibuat.push(idAkun);
  return { email, idAkun };
}

async function bisaMasuk(email: string, kataSandi = SANDI_BARU) {
  const { error } = await buatClientAnonLokal().auth.signInWithPassword({
    email,
    password: kataSandi,
  });
  return !error;
}

beforeAll(() => wajibSupabaseLokal());
beforeEach(() => vi.clearAllMocks());

afterAll(async () => {
  const admin = buatClientAdminLokal();
  for (const idAkun of akunDibuat) {
    // akun dan kurator ikut terhapus lewat on delete cascade.
    await admin.auth.admin.deleteUser(idAkun);
  }
});

describe("Integrasi C25 KontrolAutentikasi ke Supabase Auth dan tabel akun (INT-TC01–04)", () => {
  it("INT-TC01: prosesLogin dengan akun Kurator yang benar membuat sesi dan mengarahkan ke panel Kurator", async () => {
    const client = buatClientAnonLokal();
    tiruan.client = client;

    await expect(
      prosesLogin({}, isianLogin("kurator1@pahamhukum.test")),
    ).rejects.toThrow("REDIRECT:/panel/kurator/konten");

    const { data } = await client.auth.getUser();
    expect(data.user?.email).toBe("kurator1@pahamhukum.test");
    expect(tiruan.cookieSet).toHaveBeenCalledWith(
      "aktivitas_terakhir",
      expect.any(String),
      expect.objectContaining({ httpOnly: true }),
    );
  });

  it("INT-TC02: prosesLogin dengan kata sandi salah ditolak dengan pesan umum tanpa membuat sesi", async () => {
    const client = buatClientAnonLokal();
    tiruan.client = client;

    await expect(
      prosesLogin({}, isianLogin("kurator1@pahamhukum.test", "sandi-salah")),
    ).resolves.toEqual({ galat: "Email atau kata sandi salah." });

    const { data } = await client.auth.getUser();
    expect(data.user).toBeNull();
  });

  it("INT-TC03: prosesLogin akun Kurator nonaktif ditolak lalu sesinya diakhiri", async () => {
    const client = buatClientAnonLokal();
    tiruan.client = client;

    await expect(
      prosesLogin({}, isianLogin("kurator.nonaktif@pahamhukum.test")),
    ).resolves.toEqual({
      galat: "Akun Anda dinonaktifkan. Hubungi Administrator.",
    });

    const { data } = await client.auth.getSession();
    expect(data.session).toBeNull();
  });

  it("INT-TC04: RLS hanya mengizinkan Kurator membaca profil akunnya sendiri", async () => {
    const kurator: SupabaseClient = await buatClientMasukLokal(
      "kurator1@pahamhukum.test",
    );

    const { data: akun } = await kurator.from("akun").select("email");
    const { data: daftarKurator } = await kurator
      .from("kurator")
      .select("id_akun");

    expect(akun?.map((baris) => baris.email)).toEqual([
      "kurator1@pahamhukum.test",
    ]);
    expect(daftarKurator).toHaveLength(1);
  });
});

describe("Integrasi C29 KontrolPengelolaanAkun ke Model C02 dan basis data (INT-TC05–09)", () => {
  it("INT-TC05: daftarkanKurator membuat akun Auth, profil akun, dan baris kurator milik Administrator", async () => {
    const { email, idAkun } = await buatKuratorUji("daftar");

    const { data } = await buatClientAdminLokal()
      .from("kurator")
      .select("status_aktif, jumlah_konten, id_administrator, akun(peran)")
      .eq("id_akun", idAkun)
      .single();
    expect(data).toMatchObject({
      status_aktif: true,
      jumlah_konten: 0,
      id_administrator: ID_ADMIN,
      akun: { peran: "Kurator" },
    });
    expect(await bisaMasuk(email)).toBe(true);
  });

  it("INT-TC06: daftarkanKurator menolak email yang sudah terdaftar tanpa membuat akun baru", async () => {
    tiruan.client = await buatClientMasukLokal("admin@pahamhukum.test");
    const { count: sebelum } = await buatClientAdminLokal()
      .from("akun")
      .select("id_akun", { count: "exact", head: true });

    await expect(
      daftarkanKurator({}, isianAkun("KURATOR1@pahamhukum.test")),
    ).resolves.toEqual({ galat: "Email sudah terdaftar." });

    const { count: sesudah } = await buatClientAdminLokal()
      .from("akun")
      .select("id_akun", { count: "exact", head: true });
    expect(sesudah).toBe(sebelum);
  });

  it("INT-TC07: ubahStatusKurator menonaktifkan Kurator di basis data sehingga login berikutnya ditolak, lalu dapat diaktifkan kembali", async () => {
    const { email, idAkun } = await buatKuratorUji("nonaktif");

    await expect(ubahStatusKurator(idAkun, false)).resolves.toEqual({});
    const { data: nonaktif } = await buatClientAdminLokal()
      .from("kurator")
      .select("status_aktif")
      .eq("id_akun", idAkun)
      .single();
    expect(nonaktif?.status_aktif).toBe(false);

    tiruan.client = buatClientAnonLokal();
    await expect(
      prosesLogin({}, isianLogin(email, SANDI_BARU)),
    ).resolves.toEqual({
      galat: "Akun Anda dinonaktifkan. Hubungi Administrator.",
    });

    tiruan.client = await buatClientMasukLokal("admin@pahamhukum.test");
    await expect(ubahStatusKurator(idAkun, true)).resolves.toEqual({});
    tiruan.client = buatClientAnonLokal();
    await expect(
      prosesLogin({}, isianLogin(email, SANDI_BARU)),
    ).rejects.toThrow("REDIRECT:/panel/kurator/konten");
  });

  it("INT-TC08: perbaruiKurator mengganti email di Auth dan tabel akun; email lama tidak bisa dipakai lagi (KF43)", async () => {
    const { email, idAkun } = await buatKuratorUji("emaillama");
    const emailBaru = emailUji("emailbaru");

    await expect(perbaruiKurator(idAkun, emailBaru)).resolves.toEqual({
      sukses: `Email kurator diubah menjadi ${emailBaru}.`,
    });

    const { data } = await buatClientAdminLokal()
      .from("akun")
      .select("email")
      .eq("id_akun", idAkun)
      .single();
    expect(data?.email).toBe(emailBaru);
    expect(await bisaMasuk(email)).toBe(false);
    expect(await bisaMasuk(emailBaru)).toBe(true);
  });

  it("INT-TC09: Kurator tidak bisa mengelola akun, baik lewat Server Action maupun langsung ke tabel kurator", async () => {
    const kurator = await buatClientMasukLokal("kurator1@pahamhukum.test");
    tiruan.client = kurator;

    await expect(
      ubahStatusKurator("b0000000-0000-4000-8000-000000000002", false),
    ).resolves.toEqual({
      galat: "Hanya Administrator yang dapat mengelola akun.",
    });

    const { data } = await kurator
      .from("kurator")
      .update({ status_aktif: false })
      .eq("id_akun", "b0000000-0000-4000-8000-000000000002")
      .select("id_akun");
    expect(data ?? []).toHaveLength(0);

    const { data: tetap } = await buatClientAdminLokal()
      .from("kurator")
      .select("status_aktif")
      .eq("id_akun", "b0000000-0000-4000-8000-000000000002")
      .single();
    expect(tetap?.status_aktif).toBe(true);
  });
});
