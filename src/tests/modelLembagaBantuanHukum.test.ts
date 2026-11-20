import { describe, expect, it } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  ambilSemuaLBH,
  cocokkanWilayah,
  type LembagaBantuanHukum,
} from "@/lib/models/lembagaBantuanHukum";

type Hasil = { data: unknown; error: unknown };

function buatSupabase(hasil: Hasil) {
  const catatan = { tabel: "", order: [] as string[] };
  const kueri = {
    select: () => kueri,
    order(kolom: string) {
      catatan.order.push(kolom);
      return kueri;
    },
    then<T>(selesai: (nilai: Hasil) => T) {
      return Promise.resolve(hasil).then(selesai);
    },
  };
  const supabase = {
    from(tabel: string) {
      catatan.tabel = tabel;
      return kueri;
    },
  };
  return { supabase: supabase as unknown as SupabaseClient, catatan };
}

const LBH: LembagaBantuanHukum = {
  idLbh: 1,
  nama: "LBH Contoh Bandung",
  wilayah: "Jawa Barat",
  tautan: "https://contoh.test/lbh/bandung",
};

describe("C11 LembagaBantuanHukum — ambilSemuaLBH (Q-022)", () => {
  it("C11-UT01: memetakan baris LBH dan mengurutkan berdasarkan nama", async () => {
    const { supabase, catatan } = buatSupabase({
      data: [
        {
          id_lbh: 1,
          nama: "LBH Contoh Bandung",
          wilayah: "Jawa Barat",
          tautan: "https://contoh.test/lbh/bandung",
        },
      ],
      error: null,
    });

    await expect(ambilSemuaLBH(supabase)).resolves.toEqual([LBH]);
    expect(catatan.tabel).toBe("lembaga_bantuan_hukum");
    expect(catatan.order).toEqual(["nama"]);
  });

  it("C11-UT02: meneruskan galat basis data", async () => {
    const galat = { message: "permintaan ditolak" };
    const { supabase } = buatSupabase({ data: null, error: galat });

    await expect(ambilSemuaLBH(supabase)).rejects.toBe(galat);
  });
});

describe("C11 LembagaBantuanHukum — cocokkanWilayah", () => {
  it("C11-UT03: cocok untuk wilayah layanan yang sama", () => {
    expect(cocokkanWilayah(LBH, "Jawa Barat")).toBe(true);
  });

  it("C11-UT04: tidak cocok untuk wilayah lain", () => {
    expect(cocokkanWilayah(LBH, "DKI Jakarta")).toBe(false);
  });
});
