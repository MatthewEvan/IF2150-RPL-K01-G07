import { describe, expect, it } from "vitest";
import type { StatusKonten } from "@/components/ui/Badge";
import {
  bacaDataKonten,
  bisaDisunting,
} from "@/lib/controllers/aturanPenyusunanKonten";
import { ambilIsianKosong, type DataKonten } from "@/lib/models/rangkumanKasus";
import {
  UKURAN_MAKSIMAL_TEMPLAT,
  validasiUnggahan,
} from "@/lib/models/templatDokumen";

const DATA_LENGKAP: DataKonten = {
  intiMasalah: "Gaji terlambat.",
  hak: "Menerima upah tepat waktu.",
  poinPertimbangan: "Bipartit sekitar 30 hari kerja.",
  daftarLangkah: [
    { nomor: 1, deskripsi: "Tagih tertulis.", tujuan: "", tenggat: null },
  ],
  daftarDokumen: ["Slip gaji"],
  daftarArtikel: [{ judul: "PP 36/2021", tautanSumber: "https://jdih.go.id" }],
};

describe("bacaDataKonten", () => {
  it("menomori langkah sesuai urutan dan membuang baris kosong", () => {
    const data = new FormData();
    for (const [deskripsi, tujuan, tenggat] of [
      ["Langkah pertama", "", ""],
      ["", "", ""],
      ["Langkah kedua", "Tujuan", "7 hari kerja"],
    ]) {
      data.append("langkahDeskripsi", deskripsi);
      data.append("langkahTujuan", tujuan);
      data.append("langkahTenggat", tenggat);
    }

    expect(bacaDataKonten(data).daftarLangkah).toEqual([
      { nomor: 1, deskripsi: "Langkah pertama", tujuan: "", tenggat: null },
      {
        nomor: 2,
        deskripsi: "Langkah kedua",
        tujuan: "Tujuan",
        tenggat: "7 hari kerja",
      },
    ]);
  });

  it("memecah checklist per baris dan membuang baris kosong", () => {
    const data = new FormData();
    data.set("checklist", " KTP \n\n Slip gaji\n");

    expect(bacaDataKonten(data).daftarDokumen).toEqual(["KTP", "Slip gaji"]);
  });

  it("menyimpan artikel yang baru terisi sebagian", () => {
    const data = new FormData();
    for (const [judul, tautan] of [
      ["Judul saja", ""],
      ["", ""],
      ["", "https://jdih.go.id"],
    ]) {
      data.append("artikelJudul", judul);
      data.append("artikelTautan", tautan);
    }

    expect(bacaDataKonten(data).daftarArtikel).toEqual([
      { judul: "Judul saja", tautanSumber: "" },
      { judul: "", tautanSumber: "https://jdih.go.id" },
    ]);
  });
});

describe("ambilIsianKosong", () => {
  it("mengembalikan daftar kosong untuk konten yang lengkap", () => {
    expect(ambilIsianKosong(DATA_LENGKAP)).toEqual([]);
  });

  it("menandai semua isian pada konten yang masih kosong", () => {
    expect(
      ambilIsianKosong({
        intiMasalah: "",
        hak: "",
        poinPertimbangan: "",
        daftarLangkah: [],
        daftarDokumen: [],
        daftarArtikel: [],
      }),
    ).toEqual([
      "intiMasalah",
      "hak",
      "poinPertimbangan",
      "langkah",
      "checklist",
      "artikel",
    ]);
  });

  it("menganggap teks berisi spasi sebagai kosong", () => {
    expect(ambilIsianKosong({ ...DATA_LENGKAP, hak: "   \n " })).toEqual([
      "hak",
    ]);
  });

  it("menandai langkah yang hanya berisi keterangan", () => {
    expect(
      ambilIsianKosong({
        ...DATA_LENGKAP,
        daftarLangkah: [
          ...DATA_LENGKAP.daftarLangkah,
          { nomor: 2, deskripsi: "", tujuan: "Tujuan", tenggat: null },
        ],
      }),
    ).toEqual(["langkah"]);
  });

  it("menandai artikel tanpa judul atau tanpa tautan", () => {
    expect(
      ambilIsianKosong({
        ...DATA_LENGKAP,
        daftarArtikel: [{ judul: "", tautanSumber: "https://jdih.go.id" }],
      }),
    ).toEqual(["artikel"]);
  });
});

describe("bisaDisunting", () => {
  it.each<[StatusKonten, boolean]>([
    ["Draft", true],
    ["Perlu Revisi", true],
    ["Diajukan", false],
    ["Disetujui", false],
  ])("status %s bisa disunting: %s", (status, hasil) => {
    expect(bisaDisunting(status)).toBe(hasil);
  });
});

describe("validasiUnggahan", () => {
  it.each([
    ["surat.pdf", 1, true],
    ["SURAT.PDF", 2048, true],
    ["surat.docx", UKURAN_MAKSIMAL_TEMPLAT, true],
    ["surat.pdf", UKURAN_MAKSIMAL_TEMPLAT + 1, false],
    ["surat.pdf", 0, false],
    ["surat.doc", 2048, false],
    ["surat.pdf.png", 2048, false],
    ["tanpa-ekstensi", 2048, false],
  ])("%s berukuran %i byte diterima: %s", (name, size, hasil) => {
    expect(validasiUnggahan({ name, size })).toBe(hasil);
  });
});
