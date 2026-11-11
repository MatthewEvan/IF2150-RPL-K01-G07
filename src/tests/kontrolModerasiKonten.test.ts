// @vitest-environment node
import type { SupabaseClient } from "@supabase/supabase-js";
import { beforeEach, describe, expect, it, vi } from "vitest";

const tiruan = vi.hoisted(() => ({
  client: null as unknown,
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  buatClientServer: async () => tiruan.client,
}));

vi.mock("next/cache", () => ({
  revalidatePath: tiruan.revalidatePath,
}));

import {
  kembalikanKonten,
  setujuiKonten,
} from "@/lib/controllers/kontrolModerasiKonten";
import {
  GALAT_ALASAN_KOSONG,
  GALAT_BUKAN_DIAJUKAN,
} from "@/lib/models/riwayatStatus";

type Keadaan = {
  status: string;
  tanggal_peninjauan: string | null;
  catatan_revisi: string | null;
};

type Akun = {
  id_akun: string;
  email: string;
  peran: string;
  kurator: { status_aktif: boolean } | null;
};

type Opsi = {
  sesi?: { id: string } | null;
  akun?: Akun | null;
  keadaan?: Keadaan | null;
  /** Jumlah baris yang dianggap berubah pada UPDATE status. */
  barisTerpengaruh?: number;
  galatRiwayat?: Error | null;
};

/**
 * Tiruan SupabaseClient yang hanya mendukung rantai query yang dipakai C28:
 * ambil akun, ambil keadaan konten, update status, dan insert riwayat.
 */
function buatClientPalsu(opsi: Opsi = {}) {
  const sesi = opsi.sesi === undefined ? { id: "admin-1" } : opsi.sesi;
  const akun =
    opsi.akun === undefined
      ? {
          id_akun: "admin-1",
          email: "admin@pahamhukum.test",
          peran: "Administrator",
          kurator: null,
        }
      : opsi.akun;
  const keadaan =
    opsi.keadaan === undefined
      ? {
          status: "Diajukan",
          tanggal_peninjauan: null,
          catatan_revisi: null,
        }
      : opsi.keadaan;
  const barisTerpengaruh = opsi.barisTerpengaruh ?? 1;
  const galatRiwayat = opsi.galatRiwayat ?? null;

  const pembaruan: {
    nilai: Record<string, unknown>;
    syarat: [string, unknown][];
  }[] = [];
  const riwayat: Record<string, unknown>[] = [];

  const client = {
    auth: {
      getUser: async () => ({ data: { user: sesi }, error: null }),
    },
    from(tabel: string) {
      if (tabel === "akun") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: akun, error: null }),
            }),
          }),
        };
      }

      if (tabel === "riwayat_status") {
        return {
          insert: async (baris: Record<string, unknown>) => {
            if (galatRiwayat) return { data: null, error: galatRiwayat };
            riwayat.push(baris);
            return { data: null, error: null };
          },
        };
      }

      return {
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({
              data: keadaan ? { ...keadaan } : null,
              error: null,
            }),
          }),
        }),
        update: (nilai: Record<string, unknown>) => {
          const catatan = { nilai, syarat: [] as [string, unknown][] };
          pembaruan.push(catatan);

          const ekor = {
            eq(kolom: string, isi: unknown) {
              catatan.syarat.push([kolom, isi]);
              return ekor;
            },
            select: async () => ({
              data: Array.from({ length: barisTerpengaruh }, (_, i) => ({
                id_rangkuman: i + 1,
              })),
              error: null,
            }),
            then(
              onFulfilled?: (hasil: unknown) => unknown,
              onRejected?: (galat: unknown) => unknown,
            ) {
              return Promise.resolve({ data: null, error: null }).then(
                onFulfilled,
                onRejected,
              );
            },
          };

          return ekor;
        },
      };
    },
  };

  return {
    client: client as unknown as SupabaseClient,
    pembaruan,
    riwayat,
  };
}

beforeEach(() => {
  tiruan.revalidatePath.mockClear();
});

describe("setujuiKonten", () => {
  it("menyetujui konten Diajukan, mengisi tanggal, dan mencatat riwayat", async () => {
    const { client, pembaruan, riwayat } = buatClientPalsu();
    tiruan.client = client;

    const hasil = await setujuiKonten(4);

    expect(hasil.berhasil).toBe(true);
    if (!hasil.berhasil) throw new Error(hasil.galat);
    expect(hasil.pesan).toContain("langsung tayang untuk publik");
    expect(pembaruan).toHaveLength(1);
    expect(pembaruan[0].nilai.status).toBe("Disetujui");
    expect(String(pembaruan[0].nilai.tanggal_peninjauan)).toMatch(
      /^\d{4}-\d{2}-\d{2}$/,
    );
    expect(pembaruan[0].syarat).toEqual([
      ["id_rangkuman", 4],
      ["status", "Diajukan"],
    ]);
    expect(riwayat).toEqual([
      { id_rangkuman: 4, id_pelaku: "admin-1", status: "Disetujui" },
    ]);
    expect(tiruan.revalidatePath).toHaveBeenCalledWith("/panel/admin/moderasi");
    expect(tiruan.revalidatePath).toHaveBeenCalledWith("/panel/kurator/konten");
    expect(tiruan.revalidatePath).toHaveBeenCalledWith("/");
  });

  it("menolak konten yang bukan Diajukan tanpa mengubah apa pun", async () => {
    const { client, pembaruan, riwayat } = buatClientPalsu({
      keadaan: {
        status: "Perlu Revisi",
        tanggal_peninjauan: null,
        catatan_revisi: "Lengkapi langkah pelaporan.",
      },
    });
    tiruan.client = client;

    const hasil = await setujuiKonten(5);

    expect(hasil.berhasil).toBe(false);
    if (hasil.berhasil) return;
    expect(hasil.galat).toBe(GALAT_BUKAN_DIAJUKAN);
    expect(pembaruan).toHaveLength(0);
    expect(riwayat).toHaveLength(0);
    expect(tiruan.revalidatePath).not.toHaveBeenCalled();
  });

  it("menolak bila konten sudah diputuskan Administrator lain", async () => {
    const { client, pembaruan, riwayat } = buatClientPalsu({
      barisTerpengaruh: 0,
    });
    tiruan.client = client;

    const hasil = await setujuiKonten(4);

    expect(hasil.berhasil).toBe(false);
    if (hasil.berhasil) return;
    expect(hasil.galat).toBe(GALAT_BUKAN_DIAJUKAN);
    expect(pembaruan).toHaveLength(1);
    expect(riwayat).toHaveLength(0);
  });

  it("menolak pengguna tanpa sesi", async () => {
    const { client, pembaruan, riwayat } = buatClientPalsu({ sesi: null });
    tiruan.client = client;

    const hasil = await setujuiKonten(4);

    expect(hasil.berhasil).toBe(false);
    expect(pembaruan).toHaveLength(0);
    expect(riwayat).toHaveLength(0);
  });

  it("menolak akun yang bukan Administrator", async () => {
    const { client, pembaruan } = buatClientPalsu({
      akun: {
        id_akun: "kurator-1",
        email: "kurator1@pahamhukum.test",
        peran: "Kurator",
        kurator: { status_aktif: true },
      },
    });
    tiruan.client = client;

    const hasil = await setujuiKonten(4);

    expect(hasil.berhasil).toBe(false);
    expect(pembaruan).toHaveLength(0);
  });

  it("mengembalikan status bila pencatatan riwayat gagal", async () => {
    const { client, pembaruan, riwayat } = buatClientPalsu({
      galatRiwayat: new Error("riwayat gagal"),
    });
    tiruan.client = client;

    const hasil = await setujuiKonten(4);

    expect(hasil.berhasil).toBe(false);
    expect(riwayat).toHaveLength(0);
    expect(pembaruan).toHaveLength(2);
    expect(pembaruan[1].nilai).toEqual({
      status: "Diajukan",
      tanggal_peninjauan: null,
      catatan_revisi: null,
    });
    expect(pembaruan[1].syarat).toEqual([
      ["id_rangkuman", 4],
      ["status", "Disetujui"],
    ]);
    expect(tiruan.revalidatePath).not.toHaveBeenCalled();
  });
});

describe("kembalikanKonten", () => {
  it("mengembalikan konten Diajukan dengan catatan revisi yang dirapikan", async () => {
    const { client, pembaruan, riwayat } = buatClientPalsu();
    tiruan.client = client;

    const hasil = await kembalikanKonten(
      4,
      "  Lengkapi langkah pelaporan ke platform.  ",
    );

    expect(hasil.berhasil).toBe(true);
    if (!hasil.berhasil) throw new Error(hasil.galat);
    expect(hasil.pesan).toContain("catatan revisi");
    expect(pembaruan).toHaveLength(1);
    expect(pembaruan[0].nilai).toEqual({
      status: "Perlu Revisi",
      catatan_revisi: "Lengkapi langkah pelaporan ke platform.",
    });
    expect(riwayat).toEqual([
      { id_rangkuman: 4, id_pelaku: "admin-1", status: "Perlu Revisi" },
    ]);
    expect(tiruan.revalidatePath).toHaveBeenCalledWith("/panel/admin/moderasi");
  });

  it("menolak alasan kosong atau hanya spasi", async () => {
    const { client, pembaruan, riwayat } = buatClientPalsu();
    tiruan.client = client;

    for (const alasan of ["", "   ", "\n\t "]) {
      const hasil = await kembalikanKonten(4, alasan);

      expect(hasil.berhasil).toBe(false);
      if (hasil.berhasil) continue;
      expect(hasil.galat).toBe(GALAT_ALASAN_KOSONG);
      expect(hasil.galatAlasan).toBe(GALAT_ALASAN_KOSONG);
    }

    expect(pembaruan).toHaveLength(0);
    expect(riwayat).toHaveLength(0);
    expect(tiruan.revalidatePath).not.toHaveBeenCalled();
  });

  it("menolak konten yang bukan Diajukan", async () => {
    const { client, pembaruan, riwayat } = buatClientPalsu({
      keadaan: {
        status: "Disetujui",
        tanggal_peninjauan: "2026-11-10",
        catatan_revisi: null,
      },
    });
    tiruan.client = client;

    const hasil = await kembalikanKonten(4, "Perbaiki langkah.");

    expect(hasil.berhasil).toBe(false);
    if (hasil.berhasil) return;
    expect(hasil.galat).toBe(GALAT_BUKAN_DIAJUKAN);
    expect(pembaruan).toHaveLength(0);
    expect(riwayat).toHaveLength(0);
  });

  it("menolak id yang tidak valid", async () => {
    const { client, pembaruan } = buatClientPalsu();
    tiruan.client = client;

    const hasil = await kembalikanKonten(0, "Perbaiki langkah.");

    expect(hasil.berhasil).toBe(false);
    expect(pembaruan).toHaveLength(0);
  });
});
