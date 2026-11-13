export type Bagian = {
  id: string;
  nomor: number;
  /** Teks singkat pada navigasi bagian. */
  label: string;
  judul: string;
  pengantar?: string;
};

/** Urutan bagian I-02 mengikuti KF08, dipakai bersama oleh navigasi dan kartu. */
export const BAGIAN = {
  intiMasalah: {
    id: "inti-masalah",
    nomor: 1,
    label: "Inti masalah",
    judul: "Inti masalah",
    pengantar: "Mulai dari sini",
  },
  hak: { id: "hak", nomor: 2, label: "Hak kamu", judul: "Hak kamu" },
  langkah: {
    id: "langkah",
    nomor: 3,
    label: "Langkah",
    judul: "Langkah penyelesaian",
    pengantar: "Apa yang bisa kamu lakukan",
  },
  pertimbangan: {
    id: "pertimbangan",
    nomor: 4,
    label: "Pertimbangan",
    judul: "Poin pertimbangan",
  },
  dokumen: {
    id: "dokumen",
    nomor: 5,
    label: "Dokumen",
    judul: "Daftar periksa dokumen",
  },
  templat: {
    id: "templat",
    nomor: 6,
    label: "Templat",
    judul: "Templat surat",
  },
  bacaan: {
    id: "bacaan",
    nomor: 7,
    label: "Bacaan",
    judul: "Bacaan pendukung",
  },
} satisfies Record<string, Bagian>;
