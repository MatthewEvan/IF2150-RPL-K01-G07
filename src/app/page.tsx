import FormCariBeranda from "@/components/beranda/FormCariBeranda";
import KartuBidangHukum from "@/components/beranda/KartuBidangHukum";
import KartuKelompokKasus from "@/components/beranda/KartuKelompokKasus";
import KotakDisclaimer from "@/components/beranda/KotakDisclaimer";
import {
  ambilDaftarBidang,
  ambilDaftarKelompok,
} from "@/lib/controllers/kontrolJelajahKasus";

export default async function HalamanJelajahKasus({
  searchParams,
}: PageProps<"/">) {
  const { bidang } = await searchParams;
  const daftarBidang = await ambilDaftarBidang();
  const bidangTerpilih =
    daftarBidang.find(({ idBidang }) => String(idBidang) === bidang) ??
    daftarBidang[0];
  const daftarKelompok = bidangTerpilih
    ? await ambilDaftarKelompok(bidangTerpilih.idBidang)
    : [];

  return (
    <main className="mx-auto flex w-full max-w-280 flex-col gap-14 px-5 pt-12 pb-16">
      <section className="max-w-170">
        <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
          Panduan hukum sehari-hari
        </p>
        <h1 className="mt-4 text-4xl font-bold text-ink">
          Ceritakan situasimu, kami bantu pahami hakmu.
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Pilih bidang yang paling dekat dengan masalahmu, atau tulis situasimu
          dengan kata-katamu sendiri. Gratis dan tanpa akun.
        </p>
        <div className="mt-6">
          <FormCariBeranda />
        </div>
      </section>

      <section aria-labelledby="judul-bidang">
        <h2 id="judul-bidang" className="text-2xl font-semibold text-ink">
          Pilih bidang hukum
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Hanya situasi yang sudah ditinjau Administrator yang tampil di sini.
        </p>
        {daftarBidang.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {daftarBidang.map((item) => (
              <KartuBidangHukum
                key={item.idBidang}
                bidang={item}
                terpilih={item.idBidang === bidangTerpilih?.idBidang}
              />
            ))}
          </div>
        ) : (
          <p className="mt-5 text-ink-muted">
            Belum ada situasi yang bisa ditampilkan. Coba lagi nanti.
          </p>
        )}
      </section>

      {bidangTerpilih && (
        <section
          id="daftar-situasi"
          aria-labelledby="judul-situasi"
          className="scroll-mt-6"
        >
          <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
            {bidangTerpilih.nama} · {daftarKelompok.length} situasi
          </p>
          <h2
            id="judul-situasi"
            className="mt-2 text-2xl font-semibold text-ink"
          >
            Situasi mana yang paling mirip denganmu?
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {daftarKelompok.map((kelompok) => (
              <li key={kelompok.idKelompok}>
                <KartuKelompokKasus
                  kelompok={kelompok}
                  namaBidang={bidangTerpilih.nama}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <KotakDisclaimer />
    </main>
  );
}
