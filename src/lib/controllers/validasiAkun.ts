const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PANJANG_MINIMAL_KATA_SANDI = 8;

/** Mengembalikan pesan galat pertama, atau null jika isian sudah benar. */
export function validasiAkunBaru(email: string, kataSandi: string) {
  if (!email || !kataSandi) return "Email dan kata sandi awal wajib diisi.";
  if (!POLA_EMAIL.test(email)) return "Format email tidak valid.";
  if (kataSandi.length < PANJANG_MINIMAL_KATA_SANDI) {
    return `Kata sandi awal minimal ${PANJANG_MINIMAL_KATA_SANDI} karakter.`;
  }
  return null;
}
