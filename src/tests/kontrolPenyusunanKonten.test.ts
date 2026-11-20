import { beforeEach, describe, expect, it, vi } from "vitest";
import type { StatusKonten } from "@/components/ui/Badge";
import { revalidatePath } from "next/cache";
import {
  ajukanKonten,
  buatDraf,
  hapusTemplat,
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
  hapusTemplat as hapusTemplatDokumen,
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
  it("C26-UT01: tetap menyimpan draf walaupun isian wajib belum lengkap", async () => {
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

  it("C26-UT02: menolak Kurator yang dinonaktifkan", async () => {
    vi.mocked(cariAkun).mockResolvedValue({ ...KURATOR, statusAktif: false });

    const hasil = await simpanDraf(11, formulir(ISIAN_LENGKAP));

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Akun Anda tidak aktif. Hubungi Administrator.",
    });
    expect(simpanDrafRangkuman).not.toHaveBeenCalled();
  });

  it("C26-UT03: menolak konten milik Kurator lain atau yang tidak ada", async () => {
    vi.mocked(ambilRangkumanMilik).mockResolvedValue(null);

    const hasil = await simpanDraf(99, formulir(ISIAN_LENGKAP));

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Konten tidak ditemukan.",
    });
    expect(simpanDrafRangkuman).not.toHaveBeenCalled();
  });

  it.each<StatusKonten>(["Diajukan", "Disetujui"])(
    "C26-UT04: menolak perubahan pada konten berstatus %s",
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

  it("C26-UT05: menampilkan galat bila penyimpanan gagal", async () => {
    vi.mocked(simpanDrafRangkuman).mockRejectedValue(new Error("putus"));

    const hasil = await simpanDraf(11, formulir(ISIAN_LENGKAP));

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Draf gagal disimpan. Coba lagi.",
    });
  });
});

describe("ajukanKonten dengan isian wajib kosong", () => {
  it("C26-UT06: menandai semua isian wajib yang kosong dan tidak mengubah status", async () => {
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
    "C26-UT07: hanya menandai %s bila isian itu saja yang kosong",
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

  it("C26-UT08: tidak menyimpan atau mengajukan konten yang sudah Diajukan", async () => {
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
    "C26-UT09: mengajukan konten %s yang lengkap tepat satu kali",
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

  it("C26-UT10: melaporkan galat bila perubahan status dan riwayat gagal", async () => {
    vi.mocked(ajukanRangkuman).mockRejectedValue(new Error("23514"));

    const hasil = await ajukanKonten(11, formulir(ISIAN_LENGKAP));

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Konten gagal diajukan. Coba lagi.",
      isianKosong: [],
    });
  });

  it("C26-UT11: mencatat riwayat Draft atas nama Kurator saat draf dibuat", async () => {
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

  it("C26-UT12: tidak membuat draf untuk Kurator nonaktif", async () => {
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
  ])("C26-UT13: menolak %s dengan pesan yang jelas", async (_, isi) => {
    const hasil = await lampirkanTemplat(11, formulirTemplat(isi));

    expect(hasil).toEqual({ berhasil: false, galat: GALAT_UNGGAH });
    expect(perbaruiVersi).not.toHaveBeenCalled();
  });

  it("C26-UT14: menolak permintaan tanpa berkas", async () => {
    const hasil = await lampirkanTemplat(11, new FormData());

    expect(hasil).toEqual({ berhasil: false, galat: GALAT_UNGGAH });
  });

  it.each(["surat.pdf", "surat.docx"])(
    "C26-UT15: menerima %s",
    async (nama) => {
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
    },
  );

  it("C26-UT16: meneruskan templat lama bila nama berkasnya sama", async () => {
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

  it("C26-UT17: menolak unggahan ke konten yang sudah Diajukan", async () => {
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

describe("hapusTemplat", () => {
  it("C26-UT18: menghapus templat milik rangkuman tersebut", async () => {
    const sasaran = templat("surat.pdf");
    vi.mocked(ambilDaftarTemplat).mockResolvedValue([sasaran]);

    const hasil = await hapusTemplat(11, sasaran.idTemplat);

    expect(hasil).toEqual({ berhasil: true });
    expect(ambilDaftarTemplat).toHaveBeenCalledWith({ auth: { getUser } }, 11);
    expect(hapusTemplatDokumen).toHaveBeenCalledWith(
      { auth: { getUser } },
      sasaran,
    );
    expect(revalidatePath).toHaveBeenCalledWith("/panel/kurator/konten/11");
  });

  it("C26-UT19: menolak id templat yang bukan milik rangkuman tersebut", async () => {
    vi.mocked(ambilDaftarTemplat).mockResolvedValue([templat("surat.pdf")]);

    const hasil = await hapusTemplat(11, 999);

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Templat tidak ditemukan.",
    });
    expect(hapusTemplatDokumen).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it.each<StatusKonten>(["Diajukan", "Disetujui"])(
    "C26-UT20: menolak penghapusan templat pada konten berstatus %s",
    async (status) => {
      vi.mocked(ambilRangkumanMilik).mockResolvedValue(rangkuman(status));

      const hasil = await hapusTemplat(11, 5);

      expect(hasil).toEqual({
        berhasil: false,
        galat: `Konten berstatus ${status} tidak bisa diubah.`,
      });
      expect(ambilDaftarTemplat).not.toHaveBeenCalled();
      expect(hapusTemplatDokumen).not.toHaveBeenCalled();
    },
  );

  it("C26-UT21: menolak Kurator yang dinonaktifkan", async () => {
    vi.mocked(cariAkun).mockResolvedValue({ ...KURATOR, statusAktif: false });

    const hasil = await hapusTemplat(11, 5);

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Akun Anda tidak aktif. Hubungi Administrator.",
    });
    expect(hapusTemplatDokumen).not.toHaveBeenCalled();
  });

  it("C26-UT22: menampilkan galat bila penghapusan di basis data atau Storage gagal", async () => {
    vi.mocked(ambilDaftarTemplat).mockResolvedValue([templat("surat.pdf")]);
    vi.mocked(hapusTemplatDokumen).mockRejectedValue(
      new Error("Templat tidak terhapus"),
    );

    const hasil = await hapusTemplat(11, 5);

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Templat gagal dihapus. Coba lagi.",
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
