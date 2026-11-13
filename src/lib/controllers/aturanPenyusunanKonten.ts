import type { StatusKonten } from "@/components/ui/Badge";
import type { Artikel } from "@/lib/models/artikel";
import type { LangkahPenyelesaian } from "@/lib/models/langkahPenyelesaian";
import type { DataKonten } from "@/lib/models/rangkumanKasus";

const STATUS_BISA_DISUNTING: StatusKonten[] = ["Draft", "Perlu Revisi"];

export function bisaDisunting(status: StatusKonten) {
  return STATUS_BISA_DISUNTING.includes(status);
}

function teks(data: FormData, nama: string) {
  return String(data.get(nama) ?? "").trim();
}

function semuaTeks(data: FormData, nama: string) {
  return data.getAll(nama).map((nilai) => String(nilai).trim());
}

export function bacaDataKonten(data: FormData): DataKonten {
  const daftarDeskripsi = semuaTeks(data, "langkahDeskripsi");
  const daftarTujuan = semuaTeks(data, "langkahTujuan");
  const daftarTenggat = semuaTeks(data, "langkahTenggat");

  const daftarLangkah: LangkahPenyelesaian[] = [];
  daftarDeskripsi.forEach((deskripsi, i) => {
    const tujuan = daftarTujuan[i] ?? "";
    const tenggat = daftarTenggat[i] ?? "";
    if (!deskripsi && !tujuan && !tenggat) return;
    daftarLangkah.push({
      nomor: daftarLangkah.length + 1,
      deskripsi,
      tujuan,
      tenggat: tenggat || null,
    });
  });

  const daftarTautan = semuaTeks(data, "artikelTautan");
  const daftarArtikel: Artikel[] = semuaTeks(data, "artikelJudul")
    .map((judul, i) => ({ judul, tautanSumber: daftarTautan[i] ?? "" }))
    .filter((artikel) => artikel.judul || artikel.tautanSumber);

  const daftarDokumen = teks(data, "checklist")
    .split("\n")
    .map((baris) => baris.trim())
    .filter(Boolean);

  return {
    intiMasalah: teks(data, "intiMasalah"),
    hak: teks(data, "hak"),
    poinPertimbangan: teks(data, "poinPertimbangan"),
    daftarLangkah,
    daftarDokumen,
    daftarArtikel,
  };
}
