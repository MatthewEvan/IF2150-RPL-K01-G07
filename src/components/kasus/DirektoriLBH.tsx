import type { LembagaBantuanHukum } from "@/lib/models/lembagaBantuanHukum";
import { tautanAman } from "./format";
import { IkonGedung } from "./ikon";
import PilihWilayah from "./PilihWilayah";

type Props = {
  daftarWilayah: string[];
  wilayahTerpilih?: string;
  daftarLBH: LembagaBantuanHukum[];
};

/** Direktori LBH beserta area layanannya (KF20). */
export default function DirektoriLBH({
  daftarWilayah,
  wilayahTerpilih,
  daftarLBH,
}: Props) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-ink">
        Bantuan hukum di dekatmu
      </h3>
      {wilayahTerpilih ? (
        <>
          <div className="mt-4">
            <PilihWilayah
              daftarWilayah={daftarWilayah}
              wilayahTerpilih={wilayahTerpilih}
            />
          </div>
          <ul className="mt-4 flex flex-col gap-4">
            {daftarLBH.map((lbh) => {
              const url = tautanAman(lbh.tautan);

              return (
                <li
                  key={lbh.idLbh}
                  className="flex gap-3 rounded-lg bg-surface p-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-brand-soft text-brand">
                    <IkonGedung className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{lbh.nama}</p>
                    <p className="mt-1 text-sm text-ink-muted">
                      Melayani wilayah {lbh.wilayah}.
                    </p>
                    {url && (
                      <a
                        href={url.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm font-semibold text-link underline underline-offset-2"
                      >
                        Kunjungi situs {lbh.nama}
                        <span className="sr-only"> (membuka tab baru)</span>
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="mt-4 text-ink-muted">
          Direktori lembaga bantuan hukum belum tersedia.
        </p>
      )}
    </div>
  );
}
