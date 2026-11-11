/**
 * C23 KontrolChecklist sisi peramban. Status centang hanya disimpan di
 * localStorage perangkat dan tidak pernah dikirim ke server (KF14, KNF06).
 */

const AWALAN_KUNCI = "pahamhukum:checklist:";
const KOSONG: string[] = [];

// Hasil baca disimpan agar useSyncExternalStore menerima rujukan yang sama.
const tembolok = new Map<number, string[]>();
const daftarPendengar = new Set<() => void>();

function kunci(idRangkuman: number) {
  return `${AWALAN_KUNCI}${idRangkuman}`;
}

function muat(idRangkuman: number): string[] {
  try {
    const isi: unknown = JSON.parse(
      localStorage.getItem(kunci(idRangkuman)) ?? "[]",
    );
    return Array.isArray(isi)
      ? isi.filter((dokumen) => typeof dokumen === "string")
      : KOSONG;
  } catch {
    // Penyimpanan diblokir peramban atau isinya rusak.
    return KOSONG;
  }
}

function kabari() {
  daftarPendengar.forEach((pendengar) => pendengar());
}

function dariTabLain(event: StorageEvent) {
  if (event.key !== null && !event.key.startsWith(AWALAN_KUNCI)) return;
  tembolok.clear();
  kabari();
}

/** Nama dokumen yang sudah dicentang pada satu rangkuman. */
export function bacaCentang(idRangkuman: number): string[] {
  let daftarDicentang = tembolok.get(idRangkuman);
  if (!daftarDicentang) {
    daftarDicentang = muat(idRangkuman);
    tembolok.set(idRangkuman, daftarDicentang);
  }
  return daftarDicentang;
}

/** Dipakai saat render di server, karena localStorage belum tersedia. */
export function bacaCentangAwal(): string[] {
  return KOSONG;
}

export function simpanCentang(idRangkuman: number, daftarDicentang: string[]) {
  tembolok.set(idRangkuman, daftarDicentang);
  try {
    localStorage.setItem(kunci(idRangkuman), JSON.stringify(daftarDicentang));
  } catch {
    // Centang tetap berlaku sampai halaman ditutup.
  }
  kabari();
}

export function kosongkanCentang(idRangkuman: number) {
  tembolok.set(idRangkuman, KOSONG);
  try {
    localStorage.removeItem(kunci(idRangkuman));
  } catch {
    // Penyimpanan diblokir peramban.
  }
  kabari();
}

/** Mengikuti perubahan centang, termasuk dari tab lain. */
export function pantauCentang(pendengar: () => void) {
  if (daftarPendengar.size === 0) {
    window.addEventListener("storage", dariTabLain);
  }
  daftarPendengar.add(pendengar);

  return () => {
    daftarPendengar.delete(pendengar);
    if (daftarPendengar.size === 0) {
      window.removeEventListener("storage", dariTabLain);
    }
  };
}

/** Persentase dokumen yang sudah dicentang, dibulatkan (KF13). */
export function hitungKelengkapan(
  jumlahDicentang: number,
  jumlahTotal: number,
): number {
  if (jumlahTotal <= 0) return 0;
  return Math.round(
    (Math.min(jumlahDicentang, jumlahTotal) / jumlahTotal) * 100,
  );
}
