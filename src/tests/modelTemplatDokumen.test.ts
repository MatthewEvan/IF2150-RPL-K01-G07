import type { SupabaseClient } from "@supabase/supabase-js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ambilDaftarTemplat,
  ambilTemplatDisetujui,
  BUCKET_TEMPLAT,
  hapusTemplat,
  perbaruiVersi,
  type TemplatDokumen,
  UKURAN_MAKSIMAL_TEMPLAT,
  unduh,
  validasiUnggahan,
} from "@/lib/models/templatDokumen";

type Hasil = { data: unknown; error: unknown };
type Panggilan = [string, unknown[]];

const barisTemplat = {
  id_templat: 7,
  id_rangkuman: 11,
  nama_berkas: "surat.pdf",
  format: "PDF",
  ukuran: 2048,
  versi: "2",
  tanggal_pembaruan: "2026-11-20",
  lokasi_berkas: "11/baru.pdf",
};

const templatLama: TemplatDokumen = {
  idTemplat: 7,
  idRangkuman: 11,
  namaBerkas: "surat.pdf",
  format: "PDF",
  ukuran: 1024,
  versi: "1",
  tanggalPembaruan: "2026-11-19",
  lokasiBerkas: "11/lama.pdf",
};

function buatSupabase({
  hasil = { data: null, error: null } as Hasil,
  unggah = { data: {}, error: null } as Hasil,
  tautan = { data: { signedUrl: "https://contoh/unduh" }, error: null } as Hasil,
} = {}) {
  const panggilan: Panggilan[] = [];
  const kueri: Record<string, unknown> = {};
  for (const nama of ["select", "eq", "order", "returns", "insert", "update", "delete"]) {
    kueri[nama] = (...argumen: unknown[]) => {
      panggilan.push([nama, argumen]);
      return kueri;
    };
  }
  for (const nama of ["single", "maybeSingle"]) {
    kueri[nama] = async (...argumen: unknown[]) => {
      panggilan.push([nama, argumen]);
      return hasil;
    };
  }
  kueri.then = (selesai: (nilai: Hasil) => unknown) => selesai(hasil);

  const penyimpanan = {
    upload: vi.fn(async () => unggah),
    remove: vi.fn(async () => ({ data: [], error: null })),
    createSignedUrl: vi.fn(async () => tautan),
  };
  const storageFrom = vi.fn(() => penyimpanan);
  const supabase = {
    from: (...argumen: unknown[]) => {
      panggilan.push(["from", argumen]);
      return kueri;
    },
    storage: { from: storageFrom },
  } as unknown as SupabaseClient;
  const argumen = (nama: string) =>
    panggilan.filter(([n]) => n === nama).map(([, a]) => a);
  return { supabase, penyimpanan, storageFrom, argumen };
}

function berkas(nama: string, ukuran = 2048) {
  return new File([new Uint8Array(ukuran)], nama);
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("validasiUnggahan", () => {
  it.each([
    ["C09-UT01", "surat.pdf", 2048],
    ["C09-UT02", "SURAT.DOCX", UKURAN_MAKSIMAL_TEMPLAT],
  ])("%s: menerima %s berukuran %d byte", (_, name, size) => {
    expect(validasiUnggahan({ name, size })).toBe(true);
  });

  it.each([
    ["C09-UT03", "bukti.png", 2048],
    ["C09-UT04", "surat.pdf", UKURAN_MAKSIMAL_TEMPLAT + 1],
    ["C09-UT05", "surat.pdf", 0],
    ["C09-UT06", "tanpa-ekstensi", 2048],
  ])("%s: menolak %s berukuran %d byte", (_, name, size) => {
    expect(validasiUnggahan({ name, size })).toBe(false);
  });
});

describe("ambilDaftarTemplat", () => {
  it("C09-UT07: memetakan baris templat milik rangkuman terurut id", async () => {
    const { supabase, argumen } = buatSupabase({
      hasil: { data: [barisTemplat], error: null },
    });

    const hasil = await ambilDaftarTemplat(supabase, 11);

    expect(argumen("eq")).toEqual([["id_rangkuman", 11]]);
    expect(argumen("order")).toEqual([["id_templat"]]);
    expect(hasil).toEqual([
      {
        idTemplat: 7,
        idRangkuman: 11,
        namaBerkas: "surat.pdf",
        format: "PDF",
        ukuran: 2048,
        versi: "2",
        tanggalPembaruan: "2026-11-20",
        lokasiBerkas: "11/baru.pdf",
      },
    ]);
  });

  it("C09-UT08: meneruskan galat basis data", async () => {
    const galat = new Error("gagal");
    const { supabase } = buatSupabase({ hasil: { data: null, error: galat } });

    await expect(ambilDaftarTemplat(supabase, 11)).rejects.toBe(galat);
  });
});

describe("perbaruiVersi", () => {
  beforeEach(() => {
    vi.spyOn(crypto, "randomUUID").mockReturnValue(
      "00000000-0000-0000-0000-000000000001",
    );
  });

  const lokasiBaru = "11/00000000-0000-0000-0000-000000000001.pdf";

  it("C09-UT09: menyimpan templat baru sebagai versi 1 di bucket privat", async () => {
    const { supabase, penyimpanan, storageFrom, argumen } = buatSupabase({
      hasil: { data: { ...barisTemplat, versi: "1", lokasi_berkas: lokasiBaru }, error: null },
    });

    const hasil = await perbaruiVersi(supabase, 11, null, berkas("surat.pdf"));

    expect(storageFrom).toHaveBeenCalledWith(BUCKET_TEMPLAT);
    expect(penyimpanan.upload).toHaveBeenCalledWith(
      lokasiBaru,
      expect.any(File),
      { contentType: "application/pdf", upsert: false },
    );
    expect(argumen("insert")[0][0]).toMatchObject({
      id_rangkuman: 11,
      nama_berkas: "surat.pdf",
      format: "PDF",
      ukuran: 2048,
      versi: "1",
      lokasi_berkas: lokasiBaru,
    });
    expect(penyimpanan.remove).not.toHaveBeenCalled();
    expect(hasil.versi).toBe("1");
  });

  it("C09-UT10: menaikkan versi dan menghapus berkas lama setelah baris tersimpan", async () => {
    const { supabase, penyimpanan, argumen } = buatSupabase({
      hasil: { data: barisTemplat, error: null },
    });

    const hasil = await perbaruiVersi(
      supabase,
      11,
      templatLama,
      berkas("surat.pdf", 4096),
    );

    expect(argumen("update")[0][0]).toMatchObject({ versi: "2", ukuran: 4096 });
    expect(argumen("eq")).toEqual([["id_templat", 7]]);
    expect(penyimpanan.remove).toHaveBeenCalledTimes(1);
    expect(penyimpanan.remove).toHaveBeenCalledWith(["11/lama.pdf"]);
    expect(hasil.versi).toBe("2");
  });

  it("C09-UT11: memakai jenis berkas DOCX untuk unggahan .docx", async () => {
    const { supabase, penyimpanan } = buatSupabase({
      hasil: { data: barisTemplat, error: null },
    });

    await perbaruiVersi(supabase, 11, null, berkas("surat.docx"));

    expect(penyimpanan.upload).toHaveBeenCalledWith(
      "11/00000000-0000-0000-0000-000000000001.docx",
      expect.any(File),
      {
        contentType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        upsert: false,
      },
    );
  });

  it("C09-UT12: menolak format yang tidak didukung sebelum mengunggah", async () => {
    const { supabase, penyimpanan, argumen } = buatSupabase();

    await expect(
      perbaruiVersi(supabase, 11, templatLama, berkas("bukti.png")),
    ).rejects.toThrow("Format berkas tidak didukung");
    expect(penyimpanan.upload).not.toHaveBeenCalled();
    expect(argumen("from")).toEqual([]);
  });

  it("C09-UT13 (KNF08): unggahan gagal tidak mengubah basis data dan versi lama tetap utuh", async () => {
    const galat = new Error("koneksi terputus");
    const { supabase, penyimpanan, argumen } = buatSupabase({
      unggah: { data: null, error: galat },
    });

    await expect(
      perbaruiVersi(supabase, 11, templatLama, berkas("surat.pdf")),
    ).rejects.toBe(galat);
    expect(argumen("from")).toEqual([]);
    expect(penyimpanan.remove).not.toHaveBeenCalled();
  });

  it("C09-UT14 (KNF08): penyimpanan baris gagal menghapus berkas baru dan mempertahankan berkas lama", async () => {
    const galat = new Error("gagal menyimpan");
    const { supabase, penyimpanan } = buatSupabase({
      hasil: { data: null, error: galat },
    });

    await expect(
      perbaruiVersi(supabase, 11, templatLama, berkas("surat.pdf")),
    ).rejects.toBe(galat);
    expect(penyimpanan.remove).toHaveBeenCalledTimes(1);
    expect(penyimpanan.remove).toHaveBeenCalledWith([lokasiBaru]);
    expect(penyimpanan.remove).not.toHaveBeenCalledWith(["11/lama.pdf"]);
  });

  it("C09-UT15: tidak menghapus apa pun bila templat lama tidak punya lokasi berkas", async () => {
    const { supabase, penyimpanan } = buatSupabase({
      hasil: { data: barisTemplat, error: null },
    });

    await perbaruiVersi(
      supabase,
      11,
      { ...templatLama, lokasiBerkas: null },
      berkas("surat.pdf"),
    );

    expect(penyimpanan.remove).not.toHaveBeenCalled();
  });
});

describe("hapusTemplat", () => {
  it("C09-UT16: menghapus baris lalu berkasnya di Storage", async () => {
    const { supabase, penyimpanan, argumen } = buatSupabase({
      hasil: { data: [{ id_templat: 7 }], error: null },
    });

    await hapusTemplat(supabase, templatLama);

    expect(argumen("delete")).toHaveLength(1);
    expect(argumen("eq")).toEqual([
      ["id_templat", 7],
      ["id_rangkuman", 11],
    ]);
    expect(penyimpanan.remove).toHaveBeenCalledWith(["11/lama.pdf"]);
  });

  it("C09-UT17: menolak bila tidak ada baris yang terhapus dan tidak menyentuh Storage", async () => {
    const { supabase, penyimpanan } = buatSupabase({
      hasil: { data: [], error: null },
    });

    await expect(hapusTemplat(supabase, templatLama)).rejects.toThrow(
      "Templat tidak terhapus",
    );
    expect(penyimpanan.remove).not.toHaveBeenCalled();
  });

  it("C09-UT18: meneruskan galat basis data saat menghapus", async () => {
    const galat = new Error("ditolak RLS");
    const { supabase, penyimpanan } = buatSupabase({
      hasil: { data: null, error: galat },
    });

    await expect(hapusTemplat(supabase, templatLama)).rejects.toBe(galat);
    expect(penyimpanan.remove).not.toHaveBeenCalled();
  });

  it("C09-UT19: tidak menghapus berkas bila lokasi berkas kosong", async () => {
    const { supabase, penyimpanan } = buatSupabase({
      hasil: { data: [{ id_templat: 7 }], error: null },
    });

    await hapusTemplat(supabase, { ...templatLama, lokasiBerkas: null });

    expect(penyimpanan.remove).not.toHaveBeenCalled();
  });
});

describe("ambilTemplatDisetujui", () => {
  it("C09-UT20: hanya mengambil templat dari rangkuman Disetujui", async () => {
    const { supabase, argumen } = buatSupabase({
      hasil: { data: barisTemplat, error: null },
    });

    const hasil = await ambilTemplatDisetujui(supabase, 7);

    expect(argumen("eq")).toEqual([
      ["id_templat", 7],
      ["rangkuman_kasus.status", "Disetujui"],
    ]);
    expect(hasil?.idTemplat).toBe(7);
  });

  it("C09-UT21: menambah filter rangkuman bila idRangkuman diberikan", async () => {
    const { supabase, argumen } = buatSupabase({
      hasil: { data: barisTemplat, error: null },
    });

    await ambilTemplatDisetujui(supabase, 7, 11);

    expect(argumen("eq")).toContainEqual(["id_rangkuman", 11]);
  });

  it("C09-UT22: mengembalikan null bila templat tidak ditemukan atau belum Disetujui", async () => {
    const { supabase } = buatSupabase({ hasil: { data: null, error: null } });

    expect(await ambilTemplatDisetujui(supabase, 99)).toBeNull();
  });

  it("C09-UT23: meneruskan galat basis data", async () => {
    const galat = new Error("gagal");
    const { supabase } = buatSupabase({ hasil: { data: null, error: galat } });

    await expect(ambilTemplatDisetujui(supabase, 7)).rejects.toBe(galat);
  });
});

describe("unduh", () => {
  it("C09-UT24: membuat signed URL 60 detik dengan nama berkas asli", async () => {
    const { supabase, penyimpanan, storageFrom } = buatSupabase();

    const tautan = await unduh(supabase, templatLama);

    expect(storageFrom).toHaveBeenCalledWith(BUCKET_TEMPLAT);
    expect(penyimpanan.createSignedUrl).toHaveBeenCalledWith("11/lama.pdf", 60, {
      download: "surat.pdf",
    });
    expect(tautan).toBe("https://contoh/unduh");
  });

  it("C09-UT25: mengembalikan null tanpa memanggil Storage bila lokasi berkas kosong", async () => {
    const { supabase, penyimpanan } = buatSupabase();

    expect(await unduh(supabase, { ...templatLama, lokasiBerkas: null })).toBeNull();
    expect(penyimpanan.createSignedUrl).not.toHaveBeenCalled();
  });

  it.each([
    ["C09-UT26", "galat Storage", { data: null, error: new Error("Object not found") }],
    ["C09-UT27", "signed URL kosong", { data: { signedUrl: "" }, error: null }],
  ])("%s: mengembalikan null bila %s", async (_, __, tautan) => {
    const { supabase } = buatSupabase({ tautan });

    expect(await unduh(supabase, templatLama)).toBeNull();
  });
});
