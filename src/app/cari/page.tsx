import KartuHasilPencarian from "@/components/pencarian/KartuHasilPencarian";
import KolomPencarian from "@/components/pencarian/KolomPencarian";
import KotakDisclaimerPencarian from "@/components/pencarian/KotakDisclaimerPencarian";
import { cariKasus } from "@/lib/controllers/kontrolPencarianKataKunci";

export default async function HalamanPencarianKataKunci({
  searchParams,
}: PageProps<"/cari">) {
  const parameter = await searchParams;
  const qMentah = parameter.q;
  const kataKunci =
    typeof qMentah === "string"
      ? qMentah
      : Array.isArray(qMentah)
        ? (qMentah[0] ?? "")
        : "";
  const kataKunciRapi = kataKunci.trim();
  const daftarHasil = kataKunciRapi ? await cariKasus(kataKunciRapi) : [];

  return (
    <main className="mx-auto flex w-full max-w-180 flex-col gap-6 px-5 pt-4 pb-12 md:pt-8 md:pb-16">
      <section
        aria-labelledby="judul-pencarian"
        className="flex flex-col gap-3"
      >
        <h1
          id="judul-pencarian"
          className="text-3xl font-bold tracking-tight text-ink"
        >
          Cari situasimu
        </h1>
        <p className="text-base text-ink-muted">
          Tulis dengan kata-katamu sendiri. Kami mencocokkannya dengan judul
          situasi, gejala, isi rangkuman, dan istilah hukum.
        </p>
        <KolomPencarian nilaiAwal={kataKunci} />
      </section>

      {kataKunciRapi && (
        <section aria-label="Hasil pencarian" className="flex flex-col gap-3">
          <p className="text-sm text-ink-muted">
            {daftarHasil.length} situasi cocok dengan “{kataKunciRapi}”
          </p>
          {daftarHasil.length > 0 && (
            <ul className="flex flex-col gap-3">
              {daftarHasil.map((hasil) => (
                <li key={hasil.idKelompok}>
                  <KartuHasilPencarian hasil={hasil} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <KotakDisclaimerPencarian />
    </main>
  );
}
