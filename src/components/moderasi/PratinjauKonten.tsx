import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { KontenModerasi } from "@/lib/models/administrator";

const FORMAT_TANGGAL = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatTanggal(iso: string | null) {
  if (!iso) return "—";
  return FORMAT_TANGGAL.format(new Date(iso));
}

function formatUkuran(ukuran: number) {
  if (ukuran < 1024) return `${ukuran} B`;
  return `${Math.max(1, Math.round(ukuran / 1024))} KB`;
}

function Bagian({ judul, children }: { judul: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-4">
      <h4 className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
        {judul}
      </h4>
      <div className="mt-2 text-sm text-ink">{children}</div>
    </section>
  );
}

function Teks({ nilai }: { nilai: string | null }) {
  if (!nilai) return <p className="text-ink-muted">Belum diisi.</p>;
  return <p className="whitespace-pre-line">{nilai}</p>;
}

/** Panel pratinjau isi konten I-07; ditampilkan di layar yang sama dengan antrean. */
export default function PratinjauKonten({
  konten,
}: {
  konten: KontenModerasi;
}) {
  return (
    <Card judul={konten.judul} aksi={<Badge status={konten.status} />}>
      <p className="text-sm text-ink-muted">
        {konten.bidang} · Oleh {konten.namaPenulis}
      </p>

      <div className="mt-5 flex flex-col gap-5">
        <Bagian judul="Inti masalah">
          <Teks nilai={konten.intiMasalah} />
        </Bagian>

        <Bagian judul="Hak yang dimiliki">
          <Teks nilai={konten.hak} />
        </Bagian>

        <Bagian judul="Poin pertimbangan">
          <Teks nilai={konten.poinPertimbangan} />
        </Bagian>

        <Bagian judul="Langkah penyelesaian">
          {konten.langkah.length === 0 ? (
            <p className="text-ink-muted">Belum ada langkah penyelesaian.</p>
          ) : (
            <ol className="flex list-decimal flex-col gap-3 pl-5">
              {konten.langkah.map((langkah) => (
                <li key={langkah.nomor} className="pl-1">
                  <p className="font-medium whitespace-pre-line">
                    {langkah.deskripsi ?? "Belum diisi."}
                  </p>
                  {langkah.tujuan && (
                    <p className="mt-1 text-sm text-ink-muted">
                      Tujuan: {langkah.tujuan}
                    </p>
                  )}
                  {langkah.dokumenDiperlukan.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {langkah.dokumenDiperlukan.map((dokumen) => (
                        <li
                          key={dokumen}
                          className="rounded-pill bg-surface-sunken px-3 py-1 text-xs text-ink-muted"
                        >
                          {dokumen}
                        </li>
                      ))}
                    </ul>
                  )}
                  {langkah.tenggat && (
                    <p className="mt-2 text-xs font-semibold text-warning">
                      Tenggat {formatTanggal(langkah.tenggat)}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}
        </Bagian>

        <Bagian judul="Dokumen yang perlu disiapkan">
          {konten.dokumenChecklist.length === 0 ? (
            <p className="text-ink-muted">Belum ada daftar dokumen.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {konten.dokumenChecklist.map((dokumen) => (
                <li
                  key={dokumen}
                  className="rounded-pill bg-surface-sunken px-3 py-1 text-xs text-ink-muted"
                >
                  {dokumen}
                </li>
              ))}
            </ul>
          )}
        </Bagian>

        <Bagian judul="Templat dokumen">
          {konten.templat.length === 0 ? (
            <p className="text-ink-muted">Belum ada templat.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {konten.templat.map((templat) => (
                <li key={templat.idTemplat}>
                  <span className="block font-medium">
                    {templat.namaBerkas}
                  </span>
                  <span className="block text-xs text-ink-muted">
                    {templat.format} · {formatUkuran(templat.ukuran)} · versi{" "}
                    {templat.versi} · {formatTanggal(templat.tanggalPembaruan)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Bagian>

        <Bagian judul="Artikel pendukung">
          {konten.artikel.length === 0 ? (
            <p className="text-ink-muted">Belum ada artikel.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {konten.artikel.map((artikel) => (
                <li key={artikel.idArtikel}>
                  {artikel.tautanSumber ? (
                    <a
                      href={artikel.tautanSumber}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-link underline underline-offset-2"
                    >
                      {artikel.judul ?? artikel.tautanSumber}
                    </a>
                  ) : (
                    <span className="font-medium">
                      {artikel.judul ?? "Tanpa judul"}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Bagian>
      </div>
    </Card>
  );
}
