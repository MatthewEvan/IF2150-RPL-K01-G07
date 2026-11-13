import { beforeEach, describe, expect, it, vi } from "vitest";
import type { StatusKonten } from "@/components/ui/Badge";
import {
  ajukanKonten,
  buatDraf,
  lampirkanTemplat,
  simpanDraf,
} from "@/lib/controllers/kontrolPenyusunanKonten";
import { cariAkun, PERAN } from "@/lib/models/akun";
import {
  ajukanRangkuman,
  ambilRangkumanMilik,
  buatRangkuman,
  simpanDraf as simpanDrafRangkuman,
  type RangkumanKasus,
} from "@/lib/models/rangkumanKasus";
import { simpanRiwayat } from "@/lib/models/riwayatStatus";
import {
  ambilDaftarTemplat,
  perbaruiVersi,
  UKURAN_MAKSIMAL_TEMPLAT,
  type TemplatDokumen,
} from "@/lib/models/templatDokumen";

const getUser = vi.hoisted(() => vi.fn());
const redirect = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/server", () => ({
  buatClientServer: async () => ({ auth: { getUser } }),
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect }));
vi.mock("@/lib/models/akun", async (asli) => ({
  ...(await asli<typeof import("@/lib/models/akun")>()),
  cariAkun: vi.fn(),
}));
vi.mock("@/lib/models/rangkumanKasus", async (asli) => ({
  ...(await asli<typeof import("@/lib/models/rangkumanKasus")>()),
  ajukanRangkuman: vi.fn(),
  ambilRangkumanMilik: vi.fn(),
  buatRangkuman: vi.fn(),
  simpanDraf: vi.fn(),
}));
vi.mock("@/lib/models/riwayatStatus", () => ({ simpanRiwayat: vi.fn() }));
vi.mock("@/lib/models/templatDokumen", async (asli) => ({
  ...(await asli<typeof import("@/lib/models/templatDokumen")>()),
  ambilDaftarTemplat: vi.fn(),
  hapusTemplat: vi.fn(),
  perbaruiVersi: vi.fn(),
}));

const KURATOR = {
  idAkun: "k1",
  email: "kurator1@contoh.test",
  peran: PERAN.KURATOR,
  statusAktif: true,
};

const GALAT_UNGGAH =
  "Berkas harus berformat PDF atau DOCX dan berukuran paling besar 5 MB.";

function rangkuman(status: StatusKonten = "Draft"): RangkumanKasus {
  return {
    idRangkuman: 11,
    idKelompok: 1,
    judulUmum: "Gaji tidak dibayar tepat waktu",
    status,
    catatanRevisi: null,
    intiMasalah: "",
    hak: "",
    poinPertimbangan: "",
    daftarLangkah: [],
    daftarDokumen: [],
    daftarArtikel: [],
  };
}

type IsianFormulir = Partial<Record<string, string | readonly string[]>>;

const ISIAN_LENGKAP: IsianFormulir = {
  intiMasalah: "Gaji terlambat lebih dari satu bulan.",
  hak: "Menerima upah tepat waktu.",
  poinPertimbangan: "Bipartit sekitar 30 hari kerja.",
  langkahDeskripsi: ["Tagih secara tertulis.", "Laporkan ke Disnaker."],
  langkahTujuan: ["Menyimpan bukti.", ""],
  langkahTenggat: ["", "Setelah 30 hari kerja"],
  checklist: "Perjanjian kerja\nSlip gaji",
  artikelJudul: ["PP 36/2021 tentang Pengupahan"],
  artikelTautan: ["https://jdih.kemnaker.go.id"],
};

function formulir(isian: IsianFormulir) {
  const data = new FormData();
  for (const [nama, nilai] of Object.entries(isian)) {
    for (const satu of [nilai ?? []].flat()) data.append(nama, satu);
  }
  return data;
}

function berkas(nama: string, ukuran: number) {
  return new File([new Uint8Array(ukuran)], nama);
}

function formulirTemplat(isi: File) {
  const data = new FormData();
  data.set("templat", isi);
  return data;
}

function templat(namaBerkas: string, versi = "1"): TemplatDokumen {
  return {
    idTemplat: 5,
    idRangkuman: 11,
    namaBerkas,
    format: "PDF",
    ukuran: 2048,
    versi,
    tanggalPembaruan: "2026-11-12",
    lokasiBerkas: `11/${namaBerkas}`,
  };
}

beforeEach(() => {
  vi.resetAllMocks();
  getUser.mockResolvedValue({ data: { user: { id: "k1" } } });
  vi.mocked(cariAkun).mockResolvedValue(KURATOR);
  vi.mocked(ambilRangkumanMilik).mockResolvedValue(rangkuman());
  vi.mocked(ambilDaftarTemplat).mockResolvedValue([]);
});

describe("simpanDraf", () => {
  it("tetap menyimpan draf walaupun isian wajib belum lengkap", async () => {
    const hasil = await simpanDraf(
      11,
      formulir({
        intiMasalah: "  Gaji terlambat.  ",
        langkahDeskripsi: ["Tagih secara tertulis."],
        langkahTujuan: [""],
        langkahTenggat: [""],
      }),
    );

    expect(hasil.berhasil).toBe(true);
    expect(simpanDrafRangkuman).toHaveBeenCalledWith(
      { auth: { getUser } },
      11,
      {
        intiMasalah: "Gaji terlambat.",
        hak: "",
        poinPertimbangan: "",
        daftarLangkah: [
          {
            nomor: 1,
            deskripsi: "Tagih secara tertulis.",
            tujuan: "",
            tenggat: null,
          },
        ],
        daftarDokumen: [],
        daftarArtikel: [],
      },
    );
  });

  it("menolak Kurator yang dinonaktifkan", async () => {
    vi.mocked(cariAkun).mockResolvedValue({ ...KURATOR, statusAktif: false });

    const hasil = await simpanDraf(11, formulir(ISIAN_LENGKAP));

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Akun Anda tidak aktif. Hubungi Administrator.",
    });
    expect(simpanDrafRangkuman).not.toHaveBeenCalled();
  });

  it("menolak konten milik Kurator lain atau yang tidak ada", async () => {
    vi.mocked(ambilRangkumanMilik).mockResolvedValue(null);

    const hasil = await simpanDraf(99, formulir(ISIAN_LENGKAP));

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Konten tidak ditemukan.",
    });
    expect(simpanDrafRangkuman).not.toHaveBeenCalled();
  });

  it.each<StatusKonten>(["Diajukan", "Disetujui"])(
    "menolak perubahan pada konten berstatus %s",
    async (status) => {
      vi.mocked(ambilRangkumanMilik).mockResolvedValue(rangkuman(status));

      const hasil = await simpanDraf(11, formulir(ISIAN_LENGKAP));

      expect(hasil).toEqual({
        berhasil: false,
        galat: `Konten berstatus ${status} tidak bisa diubah.`,
      });
      expect(simpanDrafRangkuman).not.toHaveBeenCalled();
    },
  );

  it("menampilkan galat bila penyimpanan gagal", async () => {
    vi.mocked(simpanDrafRangkuman).mockRejectedValue(new Error("putus"));

    const hasil = await simpanDraf(11, formulir(ISIAN_LENGKAP));

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Draf gagal disimpan. Coba lagi.",
    });
  });
});

describe("ajukanKonten dengan isian wajib kosong", () => {
  it("menandai semua isian wajib yang kosong dan tidak mengubah status", async () => {
    const hasil = await ajukanKonten(
      11,
      formulir({
        intiMasalah: "Gaji terlambat.",
        langkahDeskripsi: ["Tagih secara tertulis."],
        langkahTujuan: [""],
        langkahTenggat: [""],
      }),
    );

    expect(hasil).toEqual({
      berhasil: false,
      galat:
        "Draf tersimpan, tetapi 4 isian wajib belum lengkap. Lengkapi isian yang ditandai sebelum mengajukan.",
      isianKosong: ["hak", "poinPertimbangan", "checklist", "artikel"],
    });
    expect(simpanDrafRangkuman).toHaveBeenCalledOnce();
    expect(ajukanRangkuman).not.toHaveBeenCalled();
  });

  it.each([
    ["intiMasalah", { intiMasalah: "   " }],
    ["hak", { hak: "" }],
    ["poinPertimbangan", { poinPertimbangan: "" }],
    [
      "langkah",
      {
        langkahDeskripsi: [""],
        langkahTujuan: ["Tujuan saja"],
        langkahTenggat: [""],
      },
    ],
    ["checklist", { checklist: "\n  \n" }],
    ["artikel", { artikelJudul: ["Judul tanpa tautan"], artikelTautan: [""] }],
  ] as const)(
    "hanya menandai %s bila isian itu saja yang kosong",
    async (isian, ubahan) => {
      const hasil = await ajukanKonten(
        11,
        formulir({ ...ISIAN_LENGKAP, ...ubahan }),
      );

      expect(hasil.berhasil).toBe(false);
      expect(!hasil.berhasil && hasil.isianKosong).toEqual([isian]);
      expect(ajukanRangkuman).not.toHaveBeenCalled();
    },
  );

  it("tidak menyimpan atau mengajukan konten yang sudah Diajukan", async () => {
    vi.mocked(ambilRangkumanMilik).mockResolvedValue(rangkuman("Diajukan"));

    const hasil = await ajukanKonten(11, formulir(ISIAN_LENGKAP));

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Konten berstatus Diajukan tidak bisa diubah.",
      isianKosong: [],
    });
    expect(simpanDrafRangkuman).not.toHaveBeenCalled();
    expect(ajukanRangkuman).not.toHaveBeenCalled();
  });
});

describe("transisi status dan RiwayatStatus", () => {
  it.each<StatusKonten>(["Draft", "Perlu Revisi"])(
    "mengajukan konten %s yang lengkap tepat satu kali",
    async (status) => {
      vi.mocked(ambilRangkumanMilik).mockResolvedValue(rangkuman(status));

      const hasil = await ajukanKonten(11, formulir(ISIAN_LENGKAP));

      expect(hasil).toEqual({ berhasil: true });
      expect(simpanDrafRangkuman).toHaveBeenCalledOnce();
      expect(ajukanRangkuman).toHaveBeenCalledOnce();
      expect(ajukanRangkuman).toHaveBeenCalledWith({ auth: { getUser } }, 11);
      expect(
        vi.mocked(simpanDrafRangkuman).mock.invocationCallOrder[0],
      ).toBeLessThan(vi.mocked(ajukanRangkuman).mock.invocationCallOrder[0]);
    },
  );

  it("melaporkan galat bila perubahan status dan riwayat gagal", async () => {
    vi.mocked(ajukanRangkuman).mockRejectedValue(new Error("23514"));

    const hasil = await ajukanKonten(11, formulir(ISIAN_LENGKAP));

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Konten gagal diajukan. Coba lagi.",
      isianKosong: [],
    });
  });

  it("mencatat riwayat Draft atas nama Kurator saat draf dibuat", async () => {
    vi.mocked(buatRangkuman).mockResolvedValue(12);

    await buatDraf(1);

    expect(buatRangkuman).toHaveBeenCalledWith({ auth: { getUser } }, 1, "k1");
    expect(simpanRiwayat).toHaveBeenCalledWith(
      { auth: { getUser } },
      12,
      "k1",
      "Draft",
    );
    expect(redirect).toHaveBeenCalledWith("/panel/kurator/konten/12");
  });

  it("tidak membuat draf untuk Kurator nonaktif", async () => {
    vi.mocked(cariAkun).mockResolvedValue({ ...KURATOR, statusAktif: false });

    const hasil = await buatDraf(1);

    expect(hasil).toEqual({
      galat: "Akun Anda tidak aktif. Hubungi Administrator.",
    });
    expect(buatRangkuman).not.toHaveBeenCalled();
    expect(simpanRiwayat).not.toHaveBeenCalled();
  });
});

describe("lampirkanTemplat", () => {
  it.each([
    ["format PNG", berkas("bukti.png", 1024)],
    ["berkas di atas 5 MB", berkas("besar.pdf", UKURAN_MAKSIMAL_TEMPLAT + 1)],
    ["berkas kosong", berkas("kosong.docx", 0)],
  ])("menolak %s dengan pesan yang jelas", async (_, isi) => {
    const hasil = await lampirkanTemplat(11, formulirTemplat(isi));

    expect(hasil).toEqual({ berhasil: false, galat: GALAT_UNGGAH });
    expect(perbaruiVersi).not.toHaveBeenCalled();
  });

  it("menolak permintaan tanpa berkas", async () => {
    const hasil = await lampirkanTemplat(11, new FormData());

    expect(hasil).toEqual({ berhasil: false, galat: GALAT_UNGGAH });
  });

  it.each(["surat.pdf", "surat.docx"])("menerima %s", async (nama) => {
    const isi = berkas(nama, 2048);
    vi.mocked(perbaruiVersi).mockResolvedValue(templat(nama));

    const hasil = await lampirkanTemplat(11, formulirTemplat(isi));

    expect(hasil.berhasil).toBe(true);
    expect(perbaruiVersi).toHaveBeenCalledWith(
      { auth: { getUser } },
      11,
      null,
      expect.objectContaining({ name: nama }),
    );
  });

  it("meneruskan templat lama bila nama berkasnya sama", async () => {
    const lama = templat("surat.pdf", "1");
    vi.mocked(ambilDaftarTemplat).mockResolvedValue([lama]);
    vi.mocked(perbaruiVersi).mockResolvedValue(templat("surat.pdf", "2"));

    const hasil = await lampirkanTemplat(
      11,
      formulirTemplat(berkas("surat.pdf", 4096)),
    );

    expect(hasil.berhasil && hasil.templat.versi).toBe("2");
    expect(perbaruiVersi).toHaveBeenCalledWith(
      { auth: { getUser } },
      11,
      lama,
      expect.anything(),
    );
  });

  it("menolak unggahan ke konten yang sudah Diajukan", async () => {
    vi.mocked(ambilRangkumanMilik).mockResolvedValue(rangkuman("Diajukan"));

    const hasil = await lampirkanTemplat(
      11,
      formulirTemplat(berkas("surat.pdf", 2048)),
    );

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Konten berstatus Diajukan tidak bisa diubah.",
    });
    expect(perbaruiVersi).not.toHaveBeenCalled();
  });
});
