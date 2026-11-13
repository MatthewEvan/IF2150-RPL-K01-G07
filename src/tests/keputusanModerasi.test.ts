import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import {
  cekAlasanTerisi,
  simpanKeputusan,
} from "@/lib/models/riwayatStatus";

type Panggilan = {
  tabel: string;
  aksi: string;
  nilai: Record<string, unknown>;
  syarat: [string, unknown][];
  kolom?: string;
};

function buatClientPalsu(barisTerpengaruh: number) {
  const panggilan: Panggilan[] = [];
  let catatan: Panggilan | undefined;

  const ekor = {
    eq(kolom: string, nilai: unknown) {
      catatan?.syarat.push([kolom, nilai]);
      return ekor;
    },
    select(kolom: string) {
      if (catatan) catatan.kolom = kolom;
      return Promise.resolve({
        data: Array.from({ length: barisTerpengaruh }, (_, i) => ({
          id_rangkuman: i + 1,
        })),
        error: null,
      });
    },
    then(resolve: (nilai: unknown) => unknown) {
      return Promise.resolve({ data: null, error: null }).then(resolve);
    },
  };

  const client = {
    from(tabel: string) {
      return {
        update(nilai: Record<string, unknown>) {
          catatan = { tabel, aksi: "update", nilai, syarat: [] };
          panggilan.push(catatan);
          return ekor;
        },
      };
    },
  };

  return { client: client as unknown as SupabaseClient, panggilan };
}

describe("cekAlasanTerisi", () => {
  it("menerima alasan yang berisi teks", () => {
    expect(cekAlasanTerisi("Lengkapi langkah pelaporan.")).toBe(true);
  });

  it("menerima alasan dengan spasi di awal dan akhir", () => {
    expect(cekAlasanTerisi("  Tambahkan tenggat.  ")).toBe(true);
  });

  it("menolak alasan kosong", () => {
    expect(cekAlasanTerisi("")).toBe(false);
  });

  it("menolak alasan yang hanya berisi spasi", () => {
    expect(cekAlasanTerisi("   \n\t ")).toBe(false);
  });

  it("menolak alasan yang tidak diberikan", () => {
    expect(cekAlasanTerisi(null)).toBe(false);
    expect(cekAlasanTerisi(undefined)).toBe(false);
  });
});

describe("simpanKeputusan", () => {
  it("menyetujui konten dan mengisi tanggal peninjauan", async () => {
    const { client, panggilan } = buatClientPalsu(1);

    const berubah = await simpanKeputusan(client, 4, "Disetujui");

    expect(berubah).toBe(true);
    expect(panggilan[0].tabel).toBe("rangkuman_kasus");
    expect(panggilan[0].nilai.status).toBe("Disetujui");
    expect(panggilan[0].nilai.tanggal_peninjauan).toMatch(
      /^\d{4}-\d{2}-\d{2}$/,
    );
    expect(panggilan[0].nilai.catatan_revisi).toBeUndefined();
  });

  it("mengembalikan konten dengan catatan revisi yang dirapikan", async () => {
    const { client, panggilan } = buatClientPalsu(1);

    await simpanKeputusan(
      client,
      4,
      "Perlu Revisi",
      "  Lengkapi langkah pelaporan.  ",
    );

    expect(panggilan[0].nilai.status).toBe("Perlu Revisi");
    expect(panggilan[0].nilai.catatan_revisi).toBe(
      "Lengkapi langkah pelaporan.",
    );
    expect(panggilan[0].nilai.tanggal_peninjauan).toBeUndefined();
  });

  it("hanya mengubah konten yang masih berstatus Diajukan", async () => {
    const { client, panggilan } = buatClientPalsu(1);

    await simpanKeputusan(client, 5, "Disetujui");

    expect(panggilan[0].syarat).toEqual([
      ["id_rangkuman", 5],
      ["status", "Diajukan"],
    ]);
  });

  it("melaporkan tidak ada perubahan bila konten bukan Diajukan", async () => {
    const { client } = buatClientPalsu(0);

    const berubah = await simpanKeputusan(client, 5, "Perlu Revisi", "Catatan");

    expect(berubah).toBe(false);
  });
});
