import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import {
  ambilDaftarKonten,
  ambilDaftarKurator,
  aturStatusKurator,
  cekEmailUnik,
  perbaruiEmailKurator,
  simpanKuratorBaru,
} from "@/lib/models/kurator";

type Galat = { message: string } | null;

/** Klien Supabase tiruan secukupnya untuk perbaruiEmailKurator. */
function buatKlien({
  kurator = { id_akun: "k1", akun: { email: "lama@contoh.test" } } as unknown,
  galatAuth = null as Galat,
  galatAkun = null as Galat,
} = {}) {
  const updateUserById = vi.fn().mockResolvedValue({ error: galatAuth });
  const updateAkun = vi.fn();
  const filterKurator = vi.fn();

  const from = vi.fn((tabel: string) => {
    if (tabel === "kurator") {
      const rantai = {
        select: () => rantai,
        eq: (kolom: string, nilai: string) => {
          filterKurator(kolom, nilai);
          return rantai;
        },
        maybeSingle: async () => ({ data: kurator, error: null }),
      };
      return rantai;
    }
    return {
      update: (isi: unknown) => {
        updateAkun(isi);
        return { eq: async () => ({ error: galatAkun }) };
      },
    };
  });

  const klien = {
    from,
    auth: { admin: { updateUserById } },
  } as unknown as SupabaseClient;
  return { klien, updateUserById, updateAkun, filterKurator };
}

describe("perbaruiEmailKurator (C02)", () => {
  it("C02-UT01: perbaruiEmailKurator mengganti email di Auth lalu di tabel akun", async () => {
    const { klien, updateUserById, updateAkun, filterKurator } = buatKlien();

    await expect(
      perbaruiEmailKurator(klien, "k1", "a1", "baru@contoh.test"),
    ).resolves.toBe(true);
    expect(filterKurator).toHaveBeenCalledWith("id_administrator", "a1");
    expect(updateUserById).toHaveBeenCalledWith("k1", {
      email: "baru@contoh.test",
      email_confirm: true,
    });
    expect(updateAkun).toHaveBeenCalledWith({ email: "baru@contoh.test" });
  });

  it("C02-UT02: perbaruiEmailKurator tidak mengubah apa pun jika Kurator bukan milik Administrator tersebut", async () => {
    const { klien, updateUserById, updateAkun } = buatKlien({ kurator: null });

    await expect(
      perbaruiEmailKurator(klien, "k1", "a2", "baru@contoh.test"),
    ).resolves.toBe(false);
    expect(updateUserById).not.toHaveBeenCalled();
    expect(updateAkun).not.toHaveBeenCalled();
  });

  it("C02-UT03: perbaruiEmailKurator tidak menyentuh tabel akun jika pembaruan Auth gagal", async () => {
    const { klien, updateAkun } = buatKlien({
      galatAuth: { message: "email dipakai" },
    });

    await expect(
      perbaruiEmailKurator(klien, "k1", "a1", "baru@contoh.test"),
    ).rejects.toBeTruthy();
    expect(updateAkun).not.toHaveBeenCalled();
  });

  it("C02-UT04: perbaruiEmailKurator mengembalikan email Auth jika penyimpanan tabel akun gagal", async () => {
    const { klien, updateUserById } = buatKlien({
      galatAkun: { message: "gagal" },
    });

    await expect(
      perbaruiEmailKurator(klien, "k1", "a1", "baru@contoh.test"),
    ).rejects.toBeTruthy();
    expect(updateUserById).toHaveBeenLastCalledWith("k1", {
      email: "lama@contoh.test",
      email_confirm: true,
    });
  });
});

/** Hasil tiruan satu kueri: setiap metode rantai mengembalikan dirinya sendiri. */
type HasilKueri = { data?: unknown; error?: unknown; count?: number | null };

/**
 * Klien Supabase tiruan berbasis antrean: setiap from(tabel) mengambil hasil
 * berikutnya untuk tabel itu, dan semua pemanggilan metode dicatat.
 */
function buatKlienAntrean(antrean: Record<string, HasilKueri[]>) {
  const catatan: { tabel: string; metode: string; argumen: unknown[] }[] = [];
  const admin = {
    createUser: vi.fn(),
    deleteUser: vi.fn().mockResolvedValue({ error: null }),
  };

  function kueri(tabel: string, hasil: HasilKueri): unknown {
    const objek: unknown = new Proxy(
      {},
      {
        get(_, metode) {
          if (metode === "then") {
            return (selesai: (v: HasilKueri) => unknown) => selesai(hasil);
          }
          return (...argumen: unknown[]) => {
            catatan.push({ tabel, metode: String(metode), argumen });
            return metode === "maybeSingle" || metode === "single"
              ? Promise.resolve(hasil)
              : objek;
          };
        },
      },
    );
    return objek;
  }

  const klien = {
    from: (tabel: string) =>
      kueri(tabel, antrean[tabel]?.shift() ?? { data: null, error: null }),
    auth: { admin },
  } as unknown as SupabaseClient;
  const panggilan = (tabel: string, metode: string) =>
    catatan.filter((c) => c.tabel === tabel && c.metode === metode);
  return { klien, admin, panggilan };
}

describe("C02 ambilDaftarKurator (Q-006)", () => {
  it("C02-UT05: memetakan baris Kurator milik Administrator dan mengurutkannya menurut email", async () => {
    const { klien, panggilan } = buatKlienAntrean({
      kurator: [
        {
          data: [
            {
              id_akun: "k2",
              status_aktif: false,
              jumlah_konten: 0,
              akun: { email: "zaki@contoh.test" },
            },
            {
              id_akun: "k1",
              status_aktif: true,
              jumlah_konten: 4,
              akun: { email: "ani@contoh.test" },
            },
          ],
          error: null,
        },
      ],
    });

    await expect(ambilDaftarKurator(klien, "a1")).resolves.toEqual([
      {
        idAkun: "k1",
        email: "ani@contoh.test",
        statusAktif: true,
        jumlahKonten: 4,
      },
      {
        idAkun: "k2",
        email: "zaki@contoh.test",
        statusAktif: false,
        jumlahKonten: 0,
      },
    ]);
    expect(panggilan("kurator", "eq")[0].argumen).toEqual([
      "id_administrator",
      "a1",
    ]);
  });

  it("C02-UT06: mengembalikan daftar kosong bila Administrator belum mendaftarkan Kurator", async () => {
    const { klien } = buatKlienAntrean({
      kurator: [{ data: [], error: null }],
    });

    await expect(ambilDaftarKurator(klien, "a1")).resolves.toEqual([]);
  });

  it("C02-UT07: meneruskan galat basis data", async () => {
    const { klien } = buatKlienAntrean({
      kurator: [{ data: null, error: { message: "gagal" } }],
    });

    await expect(ambilDaftarKurator(klien, "a1")).rejects.toEqual({
      message: "gagal",
    });
  });
});

describe("C02 cekEmailUnik (Q-028)", () => {
  it("C02-UT08: mengembalikan true bila belum ada akun dengan email tersebut", async () => {
    const { klien } = buatKlienAntrean({
      akun: [{ count: 0, error: null }],
    });

    await expect(cekEmailUnik(klien, "baru@contoh.test")).resolves.toBe(true);
  });

  it("C02-UT09: mengembalikan false bila email sudah dipakai", async () => {
    const { klien } = buatKlienAntrean({
      akun: [{ count: 1, error: null }],
    });

    await expect(cekEmailUnik(klien, "ada@contoh.test")).resolves.toBe(false);
  });

  it("C02-UT10: meng-escape karakter pola ILIKE agar % dan _ tidak menjadi wildcard", async () => {
    const { klien, panggilan } = buatKlienAntrean({
      akun: [{ count: 0, error: null }],
    });

    await cekEmailUnik(klien, "a_b%c\\d@contoh.test");

    expect(panggilan("akun", "ilike")[0].argumen).toEqual([
      "email",
      "a\\_b\\%c\\\\d@contoh.test",
    ]);
  });

  it("C02-UT11: meneruskan galat basis data", async () => {
    const { klien } = buatKlienAntrean({
      akun: [{ count: null, error: { message: "gagal" } }],
    });

    await expect(cekEmailUnik(klien, "x@contoh.test")).rejects.toBeTruthy();
  });
});

describe("C02 simpanKuratorBaru (Q-029, Q-030)", () => {
  it("C02-UT12: membuat akun Auth lalu profil akun dan kurator", async () => {
    const { klien, admin, panggilan } = buatKlienAntrean({
      akun: [{ error: null }],
      kurator: [{ error: null }],
    });
    admin.createUser.mockResolvedValue({
      data: { user: { id: "k9" } },
      error: null,
    });

    await simpanKuratorBaru(klien, "baru@contoh.test", "rahasia-uji", "a1");

    expect(admin.createUser).toHaveBeenCalledWith({
      email: "baru@contoh.test",
      password: "rahasia-uji",
      email_confirm: true,
    });
    expect(panggilan("akun", "insert")[0].argumen[0]).toEqual({
      id_akun: "k9",
      email: "baru@contoh.test",
      peran: "Kurator",
    });
    expect(panggilan("kurator", "insert")[0].argumen[0]).toEqual({
      id_akun: "k9",
      id_administrator: "a1",
    });
    expect(admin.deleteUser).not.toHaveBeenCalled();
  });

  it("C02-UT13: tidak menyimpan profil bila pembuatan akun Auth gagal", async () => {
    const { klien, admin, panggilan } = buatKlienAntrean({});
    admin.createUser.mockResolvedValue({
      data: { user: null },
      error: { message: "email sudah ada" },
    });

    await expect(
      simpanKuratorBaru(klien, "ada@contoh.test", "rahasia-uji", "a1"),
    ).rejects.toEqual({ message: "email sudah ada" });
    expect(panggilan("akun", "insert")).toHaveLength(0);
  });

  it("C02-UT14: menghapus akun Auth bila profil akun gagal disimpan", async () => {
    const { klien, admin, panggilan } = buatKlienAntrean({
      akun: [{ error: { message: "akun gagal" } }],
    });
    admin.createUser.mockResolvedValue({
      data: { user: { id: "k9" } },
      error: null,
    });

    await expect(
      simpanKuratorBaru(klien, "baru@contoh.test", "rahasia-uji", "a1"),
    ).rejects.toEqual({ message: "akun gagal" });
    expect(panggilan("kurator", "insert")).toHaveLength(0);
    expect(admin.deleteUser).toHaveBeenCalledWith("k9");
  });

  it("C02-UT15: menghapus akun Auth bila baris kurator gagal disimpan", async () => {
    const { klien, admin } = buatKlienAntrean({
      akun: [{ error: null }],
      kurator: [{ error: { message: "kurator gagal" } }],
    });
    admin.createUser.mockResolvedValue({
      data: { user: { id: "k9" } },
      error: null,
    });

    await expect(
      simpanKuratorBaru(klien, "baru@contoh.test", "rahasia-uji", "a1"),
    ).rejects.toEqual({ message: "kurator gagal" });
    expect(admin.deleteUser).toHaveBeenCalledWith("k9");
  });
});

describe("C02 aturStatusKurator (Q-004)", () => {
  it("C02-UT16: mengembalikan true dan hanya mengubah Kurator milik Administrator tersebut", async () => {
    const { klien, panggilan } = buatKlienAntrean({
      kurator: [{ data: [{ id_akun: "k1" }], error: null }],
    });

    await expect(aturStatusKurator(klien, "k1", "a1", false)).resolves.toBe(
      true,
    );
    expect(panggilan("kurator", "update")[0].argumen[0]).toEqual({
      status_aktif: false,
    });
    expect(panggilan("kurator", "eq").map((c) => c.argumen)).toEqual([
      ["id_akun", "k1"],
      ["id_administrator", "a1"],
    ]);
  });

  it("C02-UT17: mengembalikan false bila Kurator tidak ditemukan atau bukan miliknya", async () => {
    const { klien } = buatKlienAntrean({
      kurator: [{ data: [], error: null }],
    });

    await expect(aturStatusKurator(klien, "x", "a1", true)).resolves.toBe(
      false,
    );
  });

  it("C02-UT18: meneruskan galat basis data", async () => {
    const { klien } = buatKlienAntrean({
      kurator: [{ data: null, error: { message: "gagal" } }],
    });

    await expect(aturStatusKurator(klien, "k1", "a1", true)).rejects.toEqual({
      message: "gagal",
    });
  });
});

describe("C02 ambilDaftarKonten (Q-005)", () => {
  it("C02-UT19: memetakan konten milik Kurator, mengurutkan riwayat, dan memakai riwayat terbaru sebagai tanggal diperbarui", async () => {
    const { klien, panggilan } = buatKlienAntrean({
      rangkuman_kasus: [
        {
          data: [
            {
              id_rangkuman: 1,
              status: "Disetujui",
              catatan_revisi: null,
              kelompok_kasus: {
                judul_umum: "Gaji tidak dibayar",
                bidang_hukum: { nama: "Ketenagakerjaan" },
              },
              riwayat_status: [
                { status: "Disetujui", waktu: "2026-10-20T03:00:00Z" },
                { status: "Diajukan", waktu: "2026-10-19T02:00:00Z" },
              ],
            },
            {
              id_rangkuman: 6,
              status: "Draft",
              catatan_revisi: null,
              kelompok_kasus: null,
              riwayat_status: null,
            },
          ],
          error: null,
        },
      ],
    });

    const daftar = await ambilDaftarKonten(klien, "k1");

    expect(panggilan("rangkuman_kasus", "eq")[0].argumen).toEqual([
      "id_kurator",
      "k1",
    ]);
    expect(daftar.map((k) => k.idRangkuman)).toEqual([1, 6]);
    expect(daftar[0]).toMatchObject({
      judul: "Gaji tidak dibayar",
      bidang: "Ketenagakerjaan",
      diperbarui: "2026-10-20T03:00:00Z",
    });
    expect(daftar[0].riwayat.map((r) => r.status)).toEqual([
      "Diajukan",
      "Disetujui",
    ]);
    expect(daftar[1]).toMatchObject({
      judul: "Tanpa judul",
      bidang: "—",
      diperbarui: null,
      riwayat: [],
    });
  });

  it("C02-UT20: meneruskan galat basis data", async () => {
    const { klien } = buatKlienAntrean({
      rangkuman_kasus: [{ data: null, error: { message: "gagal" } }],
    });

    await expect(ambilDaftarKonten(klien, "k1")).rejects.toEqual({
      message: "gagal",
    });
  });
});
