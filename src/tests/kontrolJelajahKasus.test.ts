import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ambilDaftarBidang,
  ambilDaftarKelompok,
  ambilDaftarLBH,
  ambilDaftarWilayah,
  ambilRangkuman,
  cekDarurat,
} from "@/lib/controllers/kontrolJelajahKasus";
import { buatClientServer } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({ buatClientServer: vi.fn() }));

type Baris = Record<string, unknown>;

// Isi kolom pada jalur "a.b"; relasi satu-ke-banyak menghasilkan banyak isi.
function ambilIsi(baris: Baris, jalur: string): unknown[] {
  return jalur.split(".").reduce<unknown[]>(
    (daftar, kunci) =>
      daftar.flatMap((isi) => {
        const anak = (isi as Baris | null)?.[kunci];
        return Array.isArray(anak) ? anak : [anak];
      }),
    [baris],
  );
}

/**
 * Tiruan Supabase yang benar-benar menyaring baris dengan eq(), sehingga
 * test membuktikan filter status yang dikirim model, bukan sekadar memanggilnya.
 */
function buatSupabasePalsu(tabel: Record<string, Baris[]>) {
  return {
    from(nama: string) {
      let hasil = [...(tabel[nama] ?? [])];
      const kueri = {
        select: () => kueri,
        order: () => kueri,
        limit: () => kueri,
        returns: () => kueri,
        eq(kolom: string, isi: unknown) {
          hasil = hasil.filter((baris) => ambilIsi(baris, kolom).includes(isi));
          return kueri;
        },
        maybeSingle: async () => ({ data: hasil[0] ?? null, error: null }),
        then<T>(
          selesai: (nilai: { data: Baris[]; error: null }) => T,
          gagal?: (alasan: unknown) => T,
        ) {
          return Promise.resolve({ data: hasil, error: null }).then(
            selesai,
            gagal,
          );
        },
      };
      return kueri;
    },
  };
}

function kelompok(
  idKelompok: number,
  idBidang: number,
  judulUmum: string,
  penandaDarurat: boolean,
  status: string,
): Baris {
  return {
    id_kelompok: idKelompok,
    id_bidang: idBidang,
    judul_umum: judulUmum,
    istilah_resmi: `Istilah ${judulUmum}`,
    penanda_darurat: penandaDarurat,
    rangkuman_kasus: [{ status }],
  };
}

function rangkuman(idRangkuman: number, idKelompok: number, status: string) {
  return {
    id_rangkuman: idRangkuman,
    id_kelompok: idKelompok,
    status,
    inti_masalah: `Inti masalah ${idRangkuman}`,
    hak: "Hak pekerja",
    poin_pertimbangan: null,
    nama_penulis: "Kurator Uji",
    tanggal_peninjauan: null,
    kelompok_kasus: {
      id_bidang: 1,
      judul_umum: `Kelompok ${idKelompok}`,
      istilah_resmi: "Istilah resmi",
      bidang_hukum: { nama: "Ketenagakerjaan" },
    },
    langkah_penyelesaian: [],
    checklist: { daftar_dokumen: ["KTP", "Surat PHK"] },
    templat_dokumen: [],
    artikel: [],
  };
}

const DATA = {
  bidang_hukum: [
    { id_bidang: 1, nama: "Ketenagakerjaan", status_aktif: true },
    { id_bidang: 2, nama: "Keluarga", status_aktif: true },
    { id_bidang: 3, nama: "Pidana", status_aktif: false },
  ],
  kelompok_kasus: [
    kelompok(11, 1, "Di-PHK sepihak", false, "Disetujui"),
    kelompok(12, 1, "Kecelakaan kerja", true, "Disetujui"),
    kelompok(13, 1, "Pesangon tidak dibayar", false, "Draft"),
    kelompok(21, 2, "Kekerasan dalam rumah tangga", true, "Diajukan"),
    kelompok(22, 2, "Hak asuh anak", false, "Perlu Revisi"),
    kelompok(31, 3, "Penangkapan", true, "Disetujui"),
  ],
  rangkuman_kasus: [
    rangkuman(101, 11, "Disetujui"),
    rangkuman(103, 13, "Draft"),
    rangkuman(121, 21, "Diajukan"),
    rangkuman(122, 22, "Perlu Revisi"),
  ],
  lembaga_bantuan_hukum: [
    { id_lbh: 1, nama: "LBH Bandung", wilayah: "Jawa Barat", tautan: "a" },
    { id_lbh: 2, nama: "LBH Jakarta", wilayah: "DKI Jakarta", tautan: "b" },
    { id_lbh: 3, nama: "LBH Bogor", wilayah: "Jawa Barat", tautan: "c" },
  ],
};

beforeEach(() => {
  vi.mocked(buatClientServer).mockResolvedValue(
    buatSupabasePalsu(DATA) as unknown as Awaited<
      ReturnType<typeof buatClientServer>
    >,
  );
});

describe("cekDarurat", () => {
  it("bernilai benar untuk kelompok kasus darurat", async () => {
    await expect(cekDarurat(12)).resolves.toBe(true);
  });

  it("bernilai salah untuk kelompok kasus bukan darurat", async () => {
    await expect(cekDarurat(11)).resolves.toBe(false);
  });

  it("bernilai salah untuk kelompok yang tidak ada", async () => {
    await expect(cekDarurat(999)).resolves.toBe(false);
  });

  it("bernilai salah untuk kelompok darurat yang belum Disetujui", async () => {
    await expect(cekDarurat(21)).resolves.toBe(false);
  });
});

describe("konten belum Disetujui tidak ditampilkan", () => {
  it("hanya menampilkan kelompok kasus Disetujui pada satu bidang", async () => {
    const hasil = await ambilDaftarKelompok(1);

    expect(hasil.map((item) => item.idKelompok)).toEqual([11, 12]);
  });

  it("tidak menampilkan kelompok bila semua rangkumannya belum Disetujui", async () => {
    await expect(ambilDaftarKelompok(2)).resolves.toEqual([]);
  });

  it("hanya menampilkan bidang aktif yang punya kelompok Disetujui", async () => {
    const hasil = await ambilDaftarBidang();

    expect(hasil).toEqual([
      {
        idBidang: 1,
        nama: "Ketenagakerjaan",
        statusAktif: true,
        jumlahKelompokKasus: 2,
      },
    ]);
  });

  it("membuka rangkuman berstatus Disetujui", async () => {
    const hasil = await ambilRangkuman(11);

    expect(hasil).toMatchObject({
      idRangkuman: 101,
      idKelompok: 11,
      daftarDokumen: ["KTP", "Surat PHK"],
    });
  });

  it.each([
    [13, "Draft"],
    [21, "Diajukan"],
    [22, "Perlu Revisi"],
  ])("tidak membuka rangkuman kelompok %i berstatus %s", async (idKelompok) => {
    await expect(ambilRangkuman(idKelompok)).resolves.toBeNull();
  });
});

describe("direktori LBH", () => {
  it("menampilkan wilayah tanpa duplikat dan terurut", async () => {
    await expect(ambilDaftarWilayah()).resolves.toEqual([
      "DKI Jakarta",
      "Jawa Barat",
    ]);
  });

  it("menyaring LBH sesuai wilayah", async () => {
    const hasil = await ambilDaftarLBH("Jawa Barat");

    expect(hasil.map((lbh) => lbh.nama)).toEqual(["LBH Bandung", "LBH Bogor"]);
  });
});
