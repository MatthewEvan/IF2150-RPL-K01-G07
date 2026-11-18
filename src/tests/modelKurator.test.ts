import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import { perbaruiEmailKurator } from "@/lib/models/kurator";

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
  it("mengganti email di Auth lalu di tabel akun", async () => {
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

  it("tidak mengubah apa pun jika Kurator bukan milik Administrator tersebut", async () => {
    const { klien, updateUserById, updateAkun } = buatKlien({ kurator: null });

    await expect(
      perbaruiEmailKurator(klien, "k1", "a2", "baru@contoh.test"),
    ).resolves.toBe(false);
    expect(updateUserById).not.toHaveBeenCalled();
    expect(updateAkun).not.toHaveBeenCalled();
  });

  it("tidak menyentuh tabel akun jika pembaruan Auth gagal", async () => {
    const { klien, updateAkun } = buatKlien({
      galatAuth: { message: "email dipakai" },
    });

    await expect(
      perbaruiEmailKurator(klien, "k1", "a1", "baru@contoh.test"),
    ).rejects.toBeTruthy();
    expect(updateAkun).not.toHaveBeenCalled();
  });

  it("mengembalikan email Auth jika penyimpanan tabel akun gagal", async () => {
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
