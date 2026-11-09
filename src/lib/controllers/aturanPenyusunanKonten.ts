import type { StatusKonten } from "@/components/ui/Badge";
import type { Artikel } from "@/lib/models/artikel";
import type { LangkahPenyelesaian } from "@/lib/models/langkahPenyelesaian";
import type { IsiRangkuman } from "@/lib/models/rangkumanKasus";

export type DataKonten = IsiRangkuman & {
  daftarLangkah: LangkahPenyelesaian[];
  daftarDokumen: string[];
  daftarArtikel: Artikel[];
};

export type HasilBacaKonten =
  { berhasil: true; data: DataKonten } | { berhasil: false; galat: string };

const STATUS_BISA_DISUNTING: StatusKonten[] = ["Draft", "Perlu Revisi"];

const POLA_TANGGAL = /^\d{4}-\d{2}-\d{2}$/;

export function bisaDisunting(status: StatusKonten) {
  return STATUS_BISA_DISUNTING.includes(status);
}

function teks(data: FormData, nama: string) {
  return String(data.get(nama) ?? "").trim();
}

function semuaTeks(data: FormData, nama: string) {
  return data.getAll(nama).map((nilai) => String(nilai).trim());
}

export function bacaDataKonten(data: FormData): HasilBacaKonten {
  const daftarDeskripsi = semuaTeks(data, "langkahDeskripsi");
  const daftarTujuan = semuaTeks(data, "langkahTujuan");
  const daftarTenggat = semuaTeks(data, "langkahTenggat");

  const daftarLangkah: LangkahPenyelesaian[] = [];
  for (let i = 0; i < daftarDeskripsi.length; i++) {
    const deskripsi = daftarDeskripsi[i];
    const tujuan = daftarTujuan[i] ?? "";
    const tenggat = daftarTenggat[i] ?? "";
    if (!deskripsi && !tujuan && !tenggat) continue;

    const nomor = daftarLangkah.length + 1;
    if (tenggat && !POLA_TANGGAL.test(tenggat)) {
      return {
        berhasil: false,
        galat: `Tenggat langkah ${nomor} harus berupa tanggal.`,
      };
    }
    daftarLangkah.push({ nomor, deskripsi, tujuan, tenggat: tenggat || null });
  }

  const daftarJudul = semuaTeks(data, "artikelJudul");
  const daftarTautan = semuaTeks(data, "artikelTautan");
  const daftarArtikel: Artikel[] = daftarJudul
    .map((judul, i) => ({ judul, tautanSumber: daftarTautan[i] ?? "" }))
    .filter((artikel) => artikel.judul || artikel.tautanSumber);

  const daftarDokumen = teks(data, "checklist")
    .split("\n")
    .map((baris) => baris.trim())
    .filter(Boolean);

  return {
    berhasil: true,
    data: {
      intiMasalah: teks(data, "intiMasalah"),
      hak: teks(data, "hak"),
      poinPertimbangan: teks(data, "poinPertimbangan"),
      daftarLangkah,
      daftarDokumen,
      daftarArtikel,
    },
  };
}
