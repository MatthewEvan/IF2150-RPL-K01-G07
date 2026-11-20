// @vitest-environment node
// C28-UT11 … C28-UT16 — pengujian lanjutan KontrolModerasiKonten.
// Melengkapi kontrolModerasiKonten.test.ts: galat baca/update, ambilAntrean,
// ambilKonten, dan validasi id pada setujuiKonten.
import { beforeEach, describe, expect, it, vi } from "vitest";

const tiruan = vi.hoisted(() => ({
  client: null as unknown,
  revalidatePath: vi.fn(),
  ambilAntreanModel: vi.fn(),
  ambilKontenModel: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  buatClientServer: async () => tiruan.client,
}));

vi.mock("next/cache", () => ({
  revalidatePath: tiruan.revalidatePath,
}));

vi.mock("@/lib/models/administrator", () => ({
  ambilAntreanPeninjauan: (...arg: unknown[]) =>
    tiruan.ambilAntreanModel(...arg),
  ambilKontenModerasi: (...arg: unknown[]) => tiruan.ambilKontenModel(...arg),
}));

import {
  ambilAntrean,
  ambilKonten,
  setujuiKonten,
} from "@/lib/controllers/kontrolModerasiKonten";

const AKUN_ADMIN = {
  id_akun: "admin-1",
  email: "admin@pahamhukum.test",
  peran: "Administrator",
  kurator: null,
};

type Opsi = {
  keadaan?: Record<string, unknown> | null;
  galatKeadaan?: Error | null;
  galatUpdate?: Error | null;
};

function buatClientPalsu(opsi: Opsi = {}) {
  let galatUpdateDipakai = false;
  const client = {
    auth: {
      getUser: async () => ({ data: { user: { id: "admin-1" } }, error: null }),
    },
    from(tabel: string) {
      if (tabel === "akun") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: AKUN_ADMIN, error: null }),
            }),
          }),
        };
      }

      if (tabel === "rangkuman_kasus") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({
                data: opsi.galatKeadaan
                  ? null
                  : (opsi.keadaan ?? {
                      status: "Diajukan",
                      tanggal_peninjauan: null,
                      catatan_revisi: null,
                    }),
                error: opsi.galatKeadaan ?? null,
              }),
            }),
          }),
          update: () => {
            const ekor = {
              eq: () => ekor,
              select: async () => {
                if (opsi.galatUpdate && !galatUpdateDipakai) {
                  galatUpdateDipakai = true;
                  return { data: null, error: opsi.galatUpdate };
                }
                return {
                  data: [{ id_rangkuman: 4 }],
                  error: null,
                };
              },
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
      }

      return {
        insert: async () => ({ data: null, error: null }),
      };
    },
  };
  return client as unknown as Parameters<typeof setujuiKonten>[0] extends never
    ? never
    : unknown;
}

beforeEach(() => {
  tiruan.revalidatePath.mockClear();
  tiruan.ambilAntreanModel.mockReset();
  tiruan.ambilKontenModel.mockReset();
});

describe("C28 KontrolModerasiKonten — cabang galat dan pembacaan", () => {
  it("C28-UT11: setujuiKonten menolak id bukan bilangan bulat positif", async () => {
    const hasil = await setujuiKonten(0);

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Konten tidak ditemukan.",
    });
    expect(tiruan.revalidatePath).not.toHaveBeenCalled();
  });

  it("C28-UT12: setujuiKonten melaporkan galat umum bila keadaan konten gagal dibaca", async () => {
    tiruan.client = buatClientPalsu({ galatKeadaan: new Error("baca gagal") });

    const hasil = await setujuiKonten(4);

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Keputusan gagal disimpan. Coba lagi.",
    });
    expect(tiruan.revalidatePath).not.toHaveBeenCalled();
  });

  it("C28-UT13: setujuiKonten melaporkan galat umum bila UPDATE status gagal", async () => {
    tiruan.client = buatClientPalsu({ galatUpdate: new Error("update gagal") });

    const hasil = await setujuiKonten(4);

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Keputusan gagal disimpan. Coba lagi.",
    });
    expect(tiruan.revalidatePath).not.toHaveBeenCalled();
  });

  it("C28-UT14: ambilAntrean meneruskan hasil model ke pemanggil", async () => {
    const antrean = [
      {
        idRangkuman: 4,
        judul: "Upah belum dibayar",
        bidang: "Ketenagakerjaan",
        namaPenulis: "Kurator Satu",
        waktuPengajuan: "2026-11-01T09:00:00Z",
      },
    ];
    tiruan.client = buatClientPalsu();
    tiruan.ambilAntreanModel.mockResolvedValue(antrean);

    expect(await ambilAntrean()).toEqual(antrean);
    expect(tiruan.ambilAntreanModel).toHaveBeenCalledWith(tiruan.client);
  });

  it("C28-UT15: ambilKonten meneruskan id dan hasil model", async () => {
    const konten = { idRangkuman: 4, status: "Diajukan" };
    tiruan.client = buatClientPalsu();
    tiruan.ambilKontenModel.mockResolvedValue(konten);

    expect(await ambilKonten(4)).toEqual(konten);
    expect(tiruan.ambilKontenModel).toHaveBeenCalledWith(tiruan.client, 4);
  });

  it("C28-UT16: ambilKonten mengembalikan null bila konten tidak ada", async () => {
    tiruan.client = buatClientPalsu();
    tiruan.ambilKontenModel.mockResolvedValue(null);

    expect(await ambilKonten(999)).toBeNull();
  });
});
