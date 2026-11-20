import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ambilDaftarTemplat,
  unduhTemplat,
} from "@/lib/controllers/kontrolUnduhTemplat";
import { BUCKET_TEMPLAT } from "@/lib/models/templatDokumen";
import { buatClientServer } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({ buatClientServer: vi.fn() }));

type BarisTemplatMock = {
  id_templat: number;
  id_rangkuman: number;
  nama_berkas: string;
  format: string;
  ukuran: number;
  versi: string;
  tanggal_pembaruan: string;
  lokasi_berkas: string | null;
  status_rangkuman: string;
};

const DATA_TEMPLAT_AWAL: BarisTemplatMock[] = [
  {
    id_templat: 1,
    id_rangkuman: 1,
    nama_berkas: "surat-penagihan-upah.pdf",
    format: "PDF",
    ukuran: 3071,
    versi: "1",
    tanggal_pembaruan: "2026-10-20",
    lokasi_berkas: "1/penagihan.pdf",
    status_rangkuman: "Disetujui",
  },
  {
    id_templat: 2,
    id_rangkuman: 1,
    nama_berkas: "surat-perundingan.docx",
    format: "DOCX",
    ukuran: 1901,
    versi: "2",
    tanggal_pembaruan: "2026-10-21",
    lokasi_berkas: "1/perundingan.docx",
    status_rangkuman: "Disetujui",
  },
  {
    id_templat: 3,
    id_rangkuman: 6,
    nama_berkas: "draf-templat.pdf",
    format: "PDF",
    ukuran: 2048,
    versi: "1",
    tanggal_pembaruan: "2026-11-01",
    lokasi_berkas: "6/draf.pdf",
    status_rangkuman: "Draft",
  },
  {
    id_templat: 4,
    id_rangkuman: 2,
    nama_berkas: "templat-tanpa-berkas.docx",
    format: "DOCX",
    ukuran: 1024,
    versi: "1",
    tanggal_pembaruan: "2026-10-22",
    lokasi_berkas: null,
    status_rangkuman: "Disetujui",
  },
];

function buatSupabaseTemplat({
  daftar = DATA_TEMPLAT_AWAL,
  galatQuery = null,
  hasilSignedUrl,
}: {
  daftar?: BarisTemplatMock[];
  galatQuery?: Error | null;
  hasilSignedUrl?: (
    lokasi: string,
    detik: number,
    opsi?: { download?: string },
  ) => Promise<{ data: { signedUrl: string } | null; error: Error | null }>;
} = {}) {
  const createSignedUrl = vi.fn(
    hasilSignedUrl ??
      (async (
        lokasi: string,
        _detik: number,
        opsi?: { download?: string },
      ) => ({
        data: {
          signedUrl: `https://contoh.supabase.local/storage/v1/object/sign/${BUCKET_TEMPLAT}/${lokasi}?download=${encodeURIComponent(opsi?.download ?? "")}`,
        },
        error: null,
      })),
  );
  const fromStorage = vi.fn(() => ({ createSignedUrl }));

  const client = {
    from() {
      let barisAktif = [...daftar];
      const kueri = {
        select: () => kueri,
        eq(kolom: string, nilai: unknown) {
          if (kolom === "id_templat") {
            barisAktif = barisAktif.filter((b) => b.id_templat === nilai);
          } else if (kolom === "id_rangkuman") {
            barisAktif = barisAktif.filter((b) => b.id_rangkuman === nilai);
          } else if (kolom === "rangkuman_kasus.status") {
            barisAktif = barisAktif.filter((b) => b.status_rangkuman === nilai);
          }
          return kueri;
        },
        order: () => kueri,
        returns: () => kueri,
        maybeSingle: async () =>
          galatQuery
            ? { data: null, error: galatQuery }
            : { data: barisAktif[0] ?? null, error: null },
        then<T>(
          selesai: (hasil: {
            data: BarisTemplatMock[] | null;
            error: Error | null;
          }) => T,
          gagal?: (alasan: unknown) => T,
        ) {
          return Promise.resolve(
            galatQuery
              ? { data: null, error: galatQuery }
              : { data: barisAktif, error: null },
          ).then(selesai, gagal);
        },
      };
      return kueri;
    },
    storage: {
      from: fromStorage,
    },
  };

  return { client, fromStorage, createSignedUrl };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("C24 KontrolUnduhTemplat.ambilDaftarTemplat (KF15)", () => {
  it("C24-UT01: mengembalikan daftar templat milik rangkuman yang valid (Normal)", async () => {
    const { client } = buatSupabaseTemplat();
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    const hasil = await ambilDaftarTemplat(1);

    expect(hasil).toHaveLength(2);
    expect(hasil[0]).toMatchObject({
      idTemplat: 1,
      idRangkuman: 1,
      namaBerkas: "surat-penagihan-upah.pdf",
      format: "PDF",
      ukuran: 3071,
      versi: "1",
    });
  });

  it("C24-UT02: mengembalikan daftar kosong untuk rangkuman yang belum punya templat (Batas)", async () => {
    const { client } = buatSupabaseTemplat();
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    await expect(ambilDaftarTemplat(99)).resolves.toEqual([]);
  });

  it.each([0, -3, 1.5, Number.NaN])(
    "C24-UT03: mengembalikan daftar kosong tanpa memanggil Supabase untuk idRangkuman tidak valid (%s) (Negatif)",
    async (idTidakValid) => {
      await expect(ambilDaftarTemplat(idTidakValid)).resolves.toEqual([]);
      expect(buatClientServer).not.toHaveBeenCalled();
    },
  );
});

describe("C24 KontrolUnduhTemplat.unduhTemplat (Algo-035, Algo-023)", () => {
  it("C24-UT04: menghasilkan signed URL unduhan untuk berkas PDF pada rangkuman Disetujui (Normal)", async () => {
    const { client, fromStorage, createSignedUrl } = buatSupabaseTemplat();
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    const hasil = await unduhTemplat(1);

    expect(hasil).toEqual({
      berhasil: true,
      urlUnduh:
        "https://contoh.supabase.local/storage/v1/object/sign/templat/1/penagihan.pdf?download=surat-penagihan-upah.pdf",
      namaBerkas: "surat-penagihan-upah.pdf",
    });
    expect(fromStorage).toHaveBeenCalledWith(BUCKET_TEMPLAT);
    expect(createSignedUrl).toHaveBeenCalledWith("1/penagihan.pdf", 60, {
      download: "surat-penagihan-upah.pdf",
    });
  });

  it("C24-UT05: menghasilkan signed URL unduhan untuk berkas DOCX dengan idRangkuman cocok (Normal/Batas)", async () => {
    const { client } = buatSupabaseTemplat();
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    const hasil = await unduhTemplat(2, 1);

    expect(hasil.berhasil).toBe(true);
    if (hasil.berhasil) {
      expect(hasil.namaBerkas).toBe("surat-perundingan.docx");
      expect(hasil.urlUnduh).toContain("1/perundingan.docx");
    }
  });

  it.each([0, -1, 2.5, Number.NaN])(
    "C24-UT06: menolak idTemplat tidak valid (%s) tanpa menyentuh Supabase (Batas/Negatif)",
    async (idTidakValid) => {
      await expect(unduhTemplat(idTidakValid)).resolves.toEqual({
        berhasil: false,
        galat: "Berkas templat tidak tersedia.",
      });
      expect(buatClientServer).not.toHaveBeenCalled();
    },
  );

  it.each([0, -5, 1.2, Number.NaN])(
    "C24-UT07: menolak idRangkuman opsional yang tidak valid (%s) tanpa menyentuh Supabase (Negatif)",
    async (idRangkumanTidakValid) => {
      await expect(unduhTemplat(1, idRangkumanTidakValid)).resolves.toEqual({
        berhasil: false,
        galat: "Berkas templat tidak tersedia.",
      });
      expect(buatClientServer).not.toHaveBeenCalled();
    },
  );

  it("C24-UT08: menolak unduhan untuk templat milik rangkuman yang belum Disetujui (Negatif KF02)", async () => {
    const { client, createSignedUrl } = buatSupabaseTemplat();
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    await expect(unduhTemplat(3)).resolves.toEqual({
      berhasil: false,
      galat: "Berkas templat tidak tersedia.",
    });
    expect(createSignedUrl).not.toHaveBeenCalled();
  });

  it("C24-UT09: menolak unduhan bila idTemplat tidak cocok dengan idRangkuman atau tidak ada (Negatif)", async () => {
    const { client } = buatSupabaseTemplat();
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    await expect(unduhTemplat(1, 2)).resolves.toEqual({
      berhasil: false,
      galat: "Berkas templat tidak tersedia.",
    });
    await expect(unduhTemplat(999)).resolves.toEqual({
      berhasil: false,
      galat: "Berkas templat tidak tersedia.",
    });
  });

  it("C24-UT10: mengembalikan galat bila lokasiBerkas templat bernilai null (Batas)", async () => {
    const { client, createSignedUrl } = buatSupabaseTemplat();
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    await expect(unduhTemplat(4)).resolves.toEqual({
      berhasil: false,
      galat: "Berkas templat tidak tersedia.",
    });
    expect(createSignedUrl).not.toHaveBeenCalled();
  });

  it("C24-UT11: mengembalikan galat bila Supabase Storage gagal membuat signed URL (Negatif)", async () => {
    const { client } = buatSupabaseTemplat({
      hasilSignedUrl: async () => ({
        data: null,
        error: new Error("Object not found"),
      }),
    });
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    await expect(unduhTemplat(1)).resolves.toEqual({
      berhasil: false,
      galat: "Berkas templat tidak tersedia.",
    });
  });

  it("C24-UT12: menangani pengecualian basis data dan tetap mengembalikan pesan tidak tersedia (Negatif)", async () => {
    const { client } = buatSupabaseTemplat({
      galatQuery: new Error("Koneksi basis data terputus"),
    });
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    await expect(unduhTemplat(1)).resolves.toEqual({
      berhasil: false,
      galat: "Berkas templat tidak tersedia.",
    });
  });
});
