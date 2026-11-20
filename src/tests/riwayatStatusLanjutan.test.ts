// @vitest-environment node
// C12-UT10 … C12-UT19 — pengujian lanjutan RiwayatStatus (KF36, KNF09).
// Melengkapi keputusanModerasi.test.ts: simpanRiwayat, ambilKeadaanKonten,
// pulihkanKeadaan, dan cabang galat simpanKeputusan.
import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import {
  ambilKeadaanKonten,
  pulihkanKeadaan,
  simpanKeputusan,
  simpanRiwayat,
} from "@/lib/models/riwayatStatus";

type Panggilan = {
  tabel: string;
  aksi: "insert" | "update" | "select";
  nilai?: Record<string, unknown>;
  syarat: [string, unknown][];
};

type Opsi = {
  barisKeadaan?: Record<string, unknown> | null;
  galat?: Error | null;
  barisTerpengaruh?: number;
};

/** Tiruan rantai query Supabase yang dipakai empat fungsi RiwayatStatus. */
function buatClientPalsu(opsi: Opsi = {}) {
  const panggilan: Panggilan[] = [];
  const galat = opsi.galat ?? null;
  const barisTerpengaruh = opsi.barisTerpengaruh ?? 1;

  function ekorSyarat(syarat: [string, unknown][]) {
    const ekor = {
      eq(kolom: string, nilai: unknown) {
        syarat.push([kolom, nilai]);
        return ekor;
      },
      maybeSingle: async () => ({
        data: galat ? null : (opsi.barisKeadaan ?? null),
        error: galat,
      }),
      select: async () => ({
        data: galat
          ? null
          : Array.from({ length: barisTerpengaruh }, (_, i) => ({
              id_rangkuman: i + 1,
            })),
        error: galat,
      }),
      then(
        onFulfilled?: (hasil: unknown) => unknown,
        onRejected?: (galat: unknown) => unknown,
      ) {
        return Promise.resolve({ data: null, error: galat }).then(
          onFulfilled,
          onRejected,
        );
      },
    };
    return ekor;
  }

  const client = {
    from(tabel: string) {
      return {
        insert: async (nilai: Record<string, unknown>) => {
          panggilan.push({ tabel, aksi: "insert", nilai, syarat: [] });
          return { data: null, error: galat };
        },
        update(nilai: Record<string, unknown>) {
          const catatan: Panggilan = {
            tabel,
            aksi: "update",
            nilai,
            syarat: [],
          };
          panggilan.push(catatan);
          return ekorSyarat(catatan.syarat);
        },
        select() {
          const catatan: Panggilan = { tabel, aksi: "select", syarat: [] };
          panggilan.push(catatan);
          return ekorSyarat(catatan.syarat);
        },
      };
    },
  };

  return { client: client as unknown as SupabaseClient, panggilan };
}

describe("C12 RiwayatStatus — pencatatan dan pemulihan", () => {
  it("C12-UT10: simpanRiwayat mencatat pelaku dan status baru (KF36)", async () => {
    const { client, panggilan } = buatClientPalsu();

    await simpanRiwayat(client, 4, "admin-1", "Disetujui");

    expect(panggilan).toEqual([
      {
        tabel: "riwayat_status",
        aksi: "insert",
        nilai: {
          id_rangkuman: 4,
          id_pelaku: "admin-1",
          status: "Disetujui",
        },
        syarat: [],
      },
    ]);
  });

  it("C12-UT11: simpanRiwayat meneruskan galat penyimpanan", async () => {
    const galat = new Error("riwayat permanen gagal");
    const { client } = buatClientPalsu({ galat });

    await expect(simpanRiwayat(client, 4, "admin-1", "Disetujui")).rejects.toBe(
      galat,
    );
  });

  it("C12-UT12: simpanKeputusan meneruskan galat UPDATE", async () => {
    const galat = new Error("update gagal");
    const { client } = buatClientPalsu({ galat });

    await expect(simpanKeputusan(client, 4, "Disetujui")).rejects.toBe(galat);
  });

  it("C12-UT13: ambilKeadaanKonten mengembalikan keadaan yang lengkap", async () => {
    const { client, panggilan } = buatClientPalsu({
      barisKeadaan: {
        status: "Diajukan",
        tanggal_peninjauan: null,
        catatan_revisi: null,
      },
    });

    const keadaan = await ambilKeadaanKonten(client, 4);

    expect(keadaan).toEqual({
      status: "Diajukan",
      tanggalPeninjauan: null,
      catatanRevisi: null,
    });
    expect(panggilan[0]).toMatchObject({
      tabel: "rangkuman_kasus",
      aksi: "select",
    });
    expect(panggilan[0].syarat).toEqual([["id_rangkuman", 4]]);
  });

  it("C12-UT14: ambilKeadaanKonten mengembalikan null bila konten tidak ada", async () => {
    const { client } = buatClientPalsu({ barisKeadaan: null });

    expect(await ambilKeadaanKonten(client, 99)).toBeNull();
  });

  it("C12-UT15: ambilKeadaanKonten meneruskan galat pembacaan", async () => {
    const galat = new Error("baca gagal");
    const { client } = buatClientPalsu({ galat });

    await expect(ambilKeadaanKonten(client, 4)).rejects.toBe(galat);
  });

  it("C12-UT16: pulihkanKeadaan mengembalikan tiga kolom dan syarat keputusan", async () => {
    const { client, panggilan } = buatClientPalsu();

    await pulihkanKeadaan(
      client,
      4,
      {
        status: "Diajukan",
        tanggalPeninjauan: null,
        catatanRevisi: "Catatan lama.",
      },
      "Perlu Revisi",
    );

    expect(panggilan[0]).toEqual({
      tabel: "rangkuman_kasus",
      aksi: "update",
      nilai: {
        status: "Diajukan",
        tanggal_peninjauan: null,
        catatan_revisi: "Catatan lama.",
      },
      syarat: [
        ["id_rangkuman", 4],
        ["status", "Perlu Revisi"],
      ],
    });
  });

  it("C12-UT17: pulihkanKeadaan meneruskan galat UPDATE (KNF09)", async () => {
    const galat = new Error("pemulihan gagal");
    const { client } = buatClientPalsu({ galat });

    await expect(
      pulihkanKeadaan(
        client,
        4,
        { status: "Diajukan", tanggalPeninjauan: null, catatanRevisi: null },
        "Disetujui",
      ),
    ).rejects.toBe(galat);
  });

  it("C12-UT18: simpanKeputusan memakai catatan revisi kosong bila tidak diberikan", async () => {
    const { client, panggilan } = buatClientPalsu({ barisTerpengaruh: 0 });

    const berubah = await simpanKeputusan(client, 4, "Perlu Revisi");

    expect(berubah).toBe(false);
    expect(panggilan[0].nilai).toEqual({
      status: "Perlu Revisi",
      catatan_revisi: "",
    });
  });

  it("C12-UT19: simpanKeputusan menganggap data kosong sebagai tidak ada perubahan", async () => {
    const client = {
      from: vi.fn(() => ({
        update: vi.fn(() => ({
          eq: () => ({
            eq: () => ({
              select: async () => ({ data: null, error: null }),
            }),
          }),
        })),
      })),
    } as unknown as SupabaseClient;

    expect(await simpanKeputusan(client, 4, "Disetujui")).toBe(false);
  });
});
