import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  cariKasus,
  sarankanBidangLain,
} from "@/lib/controllers/kontrolPencarianKataKunci";
import {
  cariKasusDisetujui,
  cekDisetujui,
  cocokkanKataKunciKelompok,
  cocokkanKataKunciRangkuman,
  rapikanKataKunci,
} from "@/lib/models/pencarian";
import { buatClientServer } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({ buatClientServer: vi.fn() }));

type Baris = Record<string, unknown>;

type OpsiMock = {
  bidang?: Baris[];
  kelompok?: Baris[];
  rangkuman?: Baris[];
  galatBidang?: Error | null;
  galatKelompok?: Error | null;
  galatRangkuman?: Error | null;
  rangkumanNull?: boolean;
  kelompokNull?: boolean;
};

function buatSupabasePencarian({
  bidang = [
    { id_bidang: 1, nama: "Ketenagakerjaan", status_aktif: true },
    { id_bidang: 2, nama: "Perlindungan Konsumen", status_aktif: true },
    { id_bidang: 3, nama: "Pidana Arsip", status_aktif: false },
  ],
  kelompok = [
    {
      id_kelompok: 1,
      id_bidang: 1,
      judul_umum: "Gaji tidak dibayar tepat waktu",
      istilah_resmi: "Keterlambatan pembayaran upah",
      penanda_darurat: false,
    },
    {
      id_kelompok: 3,
      id_bidang: 2,
      judul_umum: "Barang rusak dan penjual menolak ganti rugi",
      istilah_resmi: "Sengketa konsumen",
      penanda_darurat: false,
    },
  ],
  rangkuman = [
    {
      id_rangkuman: 1,
      id_kelompok: 1,
      inti_masalah: "Upah belum dibayarkan melewati tanggal yang disepakati.",
      hak: "Pekerja berhak menagih upah yang tertunda.",
      poin_pertimbangan: "Kumpulkan slip gaji dan perjanjian kerja.",
      status: "Disetujui",
      kelompok_kasus: {
        id_bidang: 1,
        judul_umum: "Gaji tidak dibayar tepat waktu",
        istilah_resmi: "Keterlambatan pembayaran upah",
        penanda_darurat: false,
        bidang_hukum: { nama: "Ketenagakerjaan", status_aktif: true },
      },
    },
    {
      id_rangkuman: 2,
      id_kelompok: 3,
      inti_masalah: "Barang yang diterima rusak.",
      hak: "Konsumen berhak atas kompensasi.",
      poin_pertimbangan: "Simpan bukti pembelian.",
      status: "Disetujui",
      kelompok_kasus: {
        id_bidang: 2,
        judul_umum: "Barang rusak dan penjual menolak ganti rugi",
        istilah_resmi: "Sengketa konsumen",
        penanda_darurat: false,
        bidang_hukum: { nama: "Perlindungan Konsumen", status_aktif: true },
      },
    },
    {
      id_rangkuman: 4,
      id_kelompok: 2,
      inti_masalah: "Pekerja diberhentikan tanpa menerima pesangon.",
      hak: "Pekerja berhak atas hak akhir.",
      poin_pertimbangan: "Periksa surat pemberhentian.",
      status: "Diajukan",
      kelompok_kasus: {
        id_bidang: 1,
        judul_umum: "Diberhentikan tanpa pesangon",
        istilah_resmi: "Pemutusan hubungan kerja",
        penanda_darurat: false,
        bidang_hukum: { nama: "Ketenagakerjaan", status_aktif: true },
      },
    },
    {
      id_rangkuman: 5,
      id_kelompok: 5,
      inti_masalah: "Konten bidang nonaktif terkait upah.",
      hak: "Hak arsip.",
      poin_pertimbangan: null,
      status: "Disetujui",
      kelompok_kasus: {
        id_bidang: 3,
        judul_umum: "Kasus arsip upah",
        istilah_resmi: "Arsip",
        penanda_darurat: false,
        bidang_hukum: { nama: "Pidana Arsip", status_aktif: false },
      },
    },
  ],
  galatBidang = null,
  galatKelompok = null,
  galatRangkuman = null,
  rangkumanNull = false,
  kelompokNull = false,
}: OpsiMock = {}) {
  const catatanOr: { tabel: string; ekspresi: string }[] = [];

  const client = {
    from(namaTabel: string) {
      let barisAktif: Baris[] =
        namaTabel === "bidang_hukum"
          ? [...bidang]
          : namaTabel === "kelompok_kasus"
            ? [...kelompok]
            : [...rangkuman];

      const kueri = {
        select: () => kueri,
        eq(kolom: string, nilai: unknown) {
          if (kolom === "status") {
            barisAktif = barisAktif.filter((b) => b.status === nilai);
          } else if (kolom === "kelompok_kasus.bidang_hukum.status_aktif") {
            barisAktif = barisAktif.filter((b) => {
              const kk = b.kelompok_kasus as Baris | null | undefined;
              const bh = kk?.bidang_hukum as Baris | null | undefined;
              return (
                bh?.status_aktif === undefined || bh.status_aktif === nilai
              );
            });
          }
          return kueri;
        },
        or(ekspresi: string) {
          catatanOr.push({ tabel: namaTabel, ekspresi });
          if (namaTabel === "kelompok_kasus") {
            const cocok = ekspresi.match(/ilike\.%(.*?)%/);
            const kunci = (cocok?.[1] ?? "")
              .replace(/\\([%_])/g, "$1")
              .toLowerCase();
            barisAktif = barisAktif.filter(
              (b) =>
                String(b.judul_umum ?? "")
                  .toLowerCase()
                  .includes(kunci) ||
                String(b.istilah_resmi ?? "")
                  .toLowerCase()
                  .includes(kunci),
            );
          }
          return kueri;
        },
        order: () => kueri,
        then<T>(
          selesai: (hasil: { data: Baris[] | null; error: Error | null }) => T,
          gagal?: (alasan: unknown) => T,
        ) {
          const galat =
            namaTabel === "bidang_hukum"
              ? galatBidang
              : namaTabel === "kelompok_kasus"
                ? galatKelompok
                : galatRangkuman;
          const data =
            galat !== null
              ? null
              : namaTabel === "rangkuman_kasus" && rangkumanNull
                ? null
                : namaTabel === "kelompok_kasus" && kelompokNull
                  ? null
                  : barisAktif;
          return Promise.resolve({ data, error: galat }).then(selesai, gagal);
        },
      };
      return kueri;
    },
  };

  return { client, catatanOr };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("C22 KontrolPencarianKataKunci — pembantu pencocokan (Algo-012, Algo-013)", () => {
  it("C22-UT01: rapikanKataKunci menghapus spasi tepi dan mengubah ke huruf kecil", () => {
    expect(rapikanKataKunci("  UPAH Lembur  ")).toBe("upah lembur");
    expect(rapikanKataKunci("   ")).toBe("");
  });

  it("C22-UT02: cekDisetujui hanya bernilai true untuk status 'Disetujui'", () => {
    expect(cekDisetujui("Disetujui")).toBe(true);
    expect(cekDisetujui("Draft")).toBe(false);
    expect(cekDisetujui("Diajukan")).toBe(false);
    expect(cekDisetujui("Perlu Revisi")).toBe(false);
    expect(cekDisetujui(null)).toBe(false);
    expect(cekDisetujui(undefined)).toBe(false);
  });

  it("C22-UT03: cocokkanKataKunciKelompok mencocokkan judulUmum dan istilahResmi (Normal & Batas)", () => {
    const kelompok = {
      judulUmum: "Gaji tidak dibayar tepat waktu",
      istilahResmi: "Keterlambatan pembayaran upah",
    };

    expect(cocokkanKataKunciKelompok(kelompok, "GAJI")).toBe(true);
    expect(cocokkanKataKunciKelompok(kelompok, "  upah ")).toBe(true);
    expect(cocokkanKataKunciKelompok(kelompok, "g")).toBe(true);
  });

  it("C22-UT04: cocokkanKataKunciKelompok mengembalikan false untuk kata kunci kosong atau tidak cocok (Negatif)", () => {
    const kelompok = {
      judulUmum: "Gaji tidak dibayar tepat waktu",
      istilahResmi: "Keterlambatan pembayaran upah",
    };

    expect(cocokkanKataKunciKelompok(kelompok, "")).toBe(false);
    expect(cocokkanKataKunciKelompok(kelompok, "   ")).toBe(false);
    expect(cocokkanKataKunciKelompok(kelompok, "warisan")).toBe(false);
  });

  it("C22-UT05: cocokkanKataKunciRangkuman mencocokkan intiMasalah, hak, dan poinPertimbangan (Normal & Batas null)", () => {
    expect(
      cocokkanKataKunciRangkuman(
        {
          intiMasalah: "Barang rusak saat dikirim",
          hak: null,
          poinPertimbangan: null,
        },
        "rusak",
      ),
    ).toBe(true);

    expect(
      cocokkanKataKunciRangkuman(
        {
          intiMasalah: null,
          hak: "Berhak menerima kompensasi",
          poinPertimbangan: null,
        },
        "KOMPENSASI",
      ),
    ).toBe(true);

    expect(
      cocokkanKataKunciRangkuman(
        {
          intiMasalah: null,
          hak: null,
          poinPertimbangan: "Simpan bukti transfer bank",
        },
        "transfer",
      ),
    ).toBe(true);
  });

  it("C22-UT06: cocokkanKataKunciRangkuman mengembalikan false saat kata kunci kosong, semua kolom null, atau tidak cocok (Negatif)", () => {
    expect(
      cocokkanKataKunciRangkuman(
        { intiMasalah: "Upah", hak: "Hak", poinPertimbangan: "Bukti" },
        "   ",
      ),
    ).toBe(false);
    expect(
      cocokkanKataKunciRangkuman(
        { intiMasalah: null, hak: null, poinPertimbangan: null },
        "upah",
      ),
    ).toBe(false);
    expect(
      cocokkanKataKunciRangkuman(
        { intiMasalah: "Upah", hak: "Hak", poinPertimbangan: "Bukti" },
        "pajak",
      ),
    ).toBe(false);
  });
});

describe("C22 KontrolPencarianKataKunci.cariKasus (Algo-032)", () => {
  it("C22-UT07: cariKasus mengembalikan kasus Disetujui pada bidang aktif yang cocok dengan kata kunci (Normal)", async () => {
    const { client, catatanOr } = buatSupabasePencarian();
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    const hasil = await cariKasus("  UPAH  ");

    expect(hasil).toHaveLength(1);
    expect(hasil[0]).toMatchObject({
      idRangkuman: 1,
      idKelompok: 1,
      namaBidang: "Ketenagakerjaan",
      judulUmum: "Gaji tidak dibayar tepat waktu",
      status: "Disetujui",
    });
    expect(catatanOr).toHaveLength(2);
    expect(catatanOr[1].ekspresi).toContain("id_kelompok.in.(1)");
  });

  it("C22-UT08: cariKasus mencocokkan isi rangkuman meski tidak ada di judul kelompok (Normal)", async () => {
    const { client, catatanOr } = buatSupabasePencarian();
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    const hasil = await cariKasus("kompensasi");

    expect(hasil).toHaveLength(1);
    expect(hasil[0].idKelompok).toBe(3);
    expect(catatanOr[1].ekspresi).not.toContain("id_kelompok.in.");
  });

  it("C22-UT09: cariKasus menolak kata kunci kosong atau hanya spasi tanpa memanggil Supabase (Batas/Negatif)", async () => {
    await expect(cariKasus("")).resolves.toEqual([]);
    await expect(cariKasus("    ")).resolves.toEqual([]);
    expect(buatClientServer).not.toHaveBeenCalled();

    const { client } = buatSupabasePencarian();
    await expect(
      cariKasusDisetujui(
        client as unknown as Parameters<typeof cariKasusDisetujui>[0],
        "   ",
      ),
    ).resolves.toEqual([]);
  });

  it("C22-UT10: cariKasus melakukan escape wildcard '%' dan '_' pada pola ILIKE (Batas)", async () => {
    const { client, catatanOr } = buatSupabasePencarian({
      rangkuman: [
        {
          id_rangkuman: 9,
          id_kelompok: 9,
          inti_masalah: "Potongan 100% tanpa alasan_jelas",
          hak: null,
          poin_pertimbangan: null,
          status: "Disetujui",
          kelompok_kasus: {
            id_bidang: 1,
            judul_umum: "Potongan 100% gaji",
            istilah_resmi: "Pemotongan_upah",
            penanda_darurat: false,
            bidang_hukum: { nama: "Ketenagakerjaan", status_aktif: true },
          },
        },
      ],
      kelompok: [],
    });
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    const hasil = await cariKasus("100%");

    expect(catatanOr[0].ekspresi).toContain("ilike.%100\\%%");
    expect(hasil).toHaveLength(1);
    expect(hasil[0]).toMatchObject({
      hak: "",
      poinPertimbangan: "",
    });
  });

  it("C22-UT11: cariKasus menggunakan jalur fallback tanpa .or() saat kata kunci mengandung delimiter PostgREST (Batas)", async () => {
    const { client, catatanOr } = buatSupabasePencarian({
      rangkuman: [
        {
          id_rangkuman: 10,
          id_kelompok: 10,
          inti_masalah: "PHK (sepihak), tanpa surat",
          hak: "Hak pesangon",
          poin_pertimbangan: "Bukti kontrak",
          status: "Disetujui",
          kelompok_kasus: {
            id_bidang: 1,
            judul_umum: "PHK (sepihak), tanpa surat",
            istilah_resmi: "PHK",
            penanda_darurat: false,
            bidang_hukum: { nama: "Ketenagakerjaan", status_aktif: true },
          },
        },
      ],
    });
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    const hasil = await cariKasus("(sepihak),");

    expect(catatanOr).toHaveLength(0);
    expect(hasil).toHaveLength(1);
    expect(hasil[0].idKelompok).toBe(10);
  });

  it("C22-UT12: cariKasus tidak mengembalikan konten belum Disetujui, baris tanpa relasi, atau data null (Negatif)", async () => {
    const { client } = buatSupabasePencarian({
      rangkuman: [
        {
          id_rangkuman: 11,
          id_kelompok: 11,
          inti_masalah: "Upah tanpa kelompok",
          hak: null,
          poin_pertimbangan: null,
          status: "Disetujui",
          kelompok_kasus: null,
        },
        {
          id_rangkuman: 12,
          id_kelompok: 12,
          inti_masalah: "Upah tanpa bidang",
          hak: null,
          poin_pertimbangan: null,
          status: "Disetujui",
          kelompok_kasus: {
            id_bidang: 1,
            judul_umum: "Upah",
            istilah_resmi: "Upah",
            penanda_darurat: false,
            bidang_hukum: null,
          },
        },
      ],
      kelompokNull: true,
    });
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    await expect(cariKasus("upah")).resolves.toEqual([]);

    const { client: clientNull } = buatSupabasePencarian({
      rangkumanNull: true,
    });
    vi.mocked(buatClientServer).mockResolvedValue(
      clientNull as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );
    await expect(cariKasus("upah")).resolves.toEqual([]);
  });

  it("C22-UT13: cariKasus menyaring baris non-Disetujui walau lolos dari filter query (Negatif KF02)", async () => {
    const clientTanpaFilterStatus = {
      from: (nama: string) => ({
        select: () => ({
          eq: () => ({
            eq: () => ({
              or: () => ({
                order: async () => ({
                  data: [
                    {
                      id_rangkuman: 99,
                      id_kelompok: 99,
                      inti_masalah: "Draf upah",
                      hak: null,
                      poin_pertimbangan: null,
                      status: "Draft",
                      kelompok_kasus: {
                        id_bidang: 1,
                        judul_umum: "Draf upah",
                        istilah_resmi: "Upah",
                        penanda_darurat: false,
                        bidang_hukum: { nama: "Ketenagakerjaan" },
                      },
                    },
                  ],
                  error: null,
                }),
              }),
            }),
          }),
          or: async () => ({
            data: nama === "kelompok_kasus" ? [{ id_kelompok: 99 }] : [],
            error: null,
          }),
        }),
      }),
    };
    vi.mocked(buatClientServer).mockResolvedValue(
      clientTanpaFilterStatus as unknown as Awaited<
        ReturnType<typeof buatClientServer>
      >,
    );

    await expect(cariKasus("upah")).resolves.toEqual([]);
  });

  it("C22-UT14: cariKasus meneruskan galat jika kueri kelompok_kasus atau rangkuman_kasus gagal (Negatif)", async () => {
    const { client: clientGalatKelompok } = buatSupabasePencarian({
      galatKelompok: new Error("Kueri kelompok gagal"),
    });
    vi.mocked(buatClientServer).mockResolvedValue(
      clientGalatKelompok as unknown as Awaited<
        ReturnType<typeof buatClientServer>
      >,
    );
    await expect(cariKasus("upah")).rejects.toThrow("Kueri kelompok gagal");

    const { client: clientGalatRangkuman } = buatSupabasePencarian({
      galatRangkuman: new Error("Kueri rangkuman gagal"),
    });
    vi.mocked(buatClientServer).mockResolvedValue(
      clientGalatRangkuman as unknown as Awaited<
        ReturnType<typeof buatClientServer>
      >,
    );
    await expect(cariKasus("upah")).rejects.toThrow("Kueri rangkuman gagal");
  });
});

describe("C22 KontrolPencarianKataKunci.sarankanBidangLain (Algo-033)", () => {
  it("C22-UT15: sarankanBidangLain hanya mengembalikan bidang hukum berstatus aktif (Normal)", async () => {
    const { client } = buatSupabasePencarian();
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    const saran = await sarankanBidangLain();

    expect(saran).toEqual([
      { idBidang: 1, nama: "Ketenagakerjaan", statusAktif: true },
      { idBidang: 2, nama: "Perlindungan Konsumen", statusAktif: true },
    ]);
  });

  it("C22-UT16: sarankanBidangLain mengembalikan daftar kosong jika tidak ada bidang aktif (Batas)", async () => {
    const { client } = buatSupabasePencarian({
      bidang: [{ id_bidang: 3, nama: "Arsip", status_aktif: false }],
    });
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    await expect(sarankanBidangLain()).resolves.toEqual([]);
  });

  it("C22-UT17: sarankanBidangLain meneruskan galat ketika basis data gagal dibaca (Negatif)", async () => {
    const { client } = buatSupabasePencarian({
      galatBidang: new Error("Gagal memuat bidang"),
    });
    vi.mocked(buatClientServer).mockResolvedValue(
      client as unknown as Awaited<ReturnType<typeof buatClientServer>>,
    );

    await expect(sarankanBidangLain()).rejects.toThrow("Gagal memuat bidang");
  });
});
