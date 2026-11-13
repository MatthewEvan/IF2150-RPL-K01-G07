// Kolom bertipe date disimpan tanpa zona waktu, jadi dibaca sebagai UTC agar
// tanggalnya tidak bergeser.
const FORMAT_TANGGAL = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const KATA_PER_MENIT = 200;

export function formatTanggal(tanggal: string) {
  return FORMAT_TANGGAL.format(new Date(tanggal));
}

/** Ukuran berkas templat untuk label info berkas (KF15). */
export function formatUkuran(byte: number) {
  if (byte < 1024 * 1024) return `${Math.max(1, Math.round(byte / 1024))} KB`;
  return `${(byte / (1024 * 1024)).toLocaleString("id-ID", {
    maximumFractionDigits: 1,
  })} MB`;
}

/** Isian Kurator berupa teks bebas; setiap baris menjadi satu paragraf. */
export function pecahParagraf(teks: string) {
  return teks
    .split("\n")
    .map((baris) => baris.trim())
    .filter(Boolean);
}

export function hitungMenitBaca(daftarTeks: string[]) {
  const jumlahKata = daftarTeks.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(jumlahKata / KATA_PER_MENIT));
}

/**
 * Tautan diisi Kurator, jadi hanya http dan https yang boleh dipasang pada
 * href agar tautan javascript: tidak bisa dijalankan.
 */
export function tautanAman(tautan: string): URL | null {
  try {
    const url = new URL(tautan);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}
