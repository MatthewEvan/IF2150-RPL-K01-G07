import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import TombolTautan from "@/components/ui/TombolTautan";
import {
  cariLangkahBertenggat,
  type RangkumanTampil,
} from "@/lib/models/rangkumanKasus";
import { formatTanggal, hitungMenitBaca } from "./format";
import {
  IkonBuku,
  IkonDaftarCentang,
  IkonDokumen,
  IkonJam,
  IkonPanahKiri,
  IkonPerisai,
} from "./ikon";
import TombolBagikan from "./TombolBagikan";

const GAYA_CHIP = {
  brand: "bg-brand-soft text-brand",
  info: "bg-accent-soft text-link",
  peringatan: "bg-warning-soft text-warning",
};

function KotakRingkasan({
  ikon,
  nada,
  className = "",
  children,
}: {
  ikon: ReactNode;
  nada: keyof typeof GAYA_CHIP;
  className?: string;
  children: ReactNode;
}) {
  return (
    <li
      className={`rounded-xl border border-line bg-surface-raised p-5 shadow-sm ${className}`}
    >
      <span
        className={`flex size-8 items-center justify-center rounded-pill ${GAYA_CHIP[nada]}`}
      >
        {ikon}
      </span>
      <div className="mt-2">{children}</div>
    </li>
  );
}

export default function KepalaRangkuman({
  rangkuman,
}: {
  rangkuman: RangkumanTampil;
}) {
  const langkahBertenggat = cariLangkahBertenggat(rangkuman.daftarLangkah);
  const menitBaca = hitungMenitBaca([
    rangkuman.intiMasalah,
    rangkuman.hak,
    rangkuman.poinPertimbangan,
    ...rangkuman.daftarLangkah.flatMap((langkah) => [
      langkah.deskripsi,
      langkah.tujuan,
    ]),
  ]);

  return (
    <header>
      <div className="flex items-center justify-between gap-4">
        <TombolTautan
          href={`/?bidang=${rangkuman.idBidang}#daftar-situasi`}
          varian="secondary"
          ukuran="ikon"
          aria-label="Kembali ke daftar situasi"
        >
          <IkonPanahKiri className="size-5" />
        </TombolTautan>
        <TombolBagikan judul={rangkuman.judulUmum} />
      </div>

      <Badge nada="info" className="mt-5 text-sm">
        {rangkuman.namaBidang}
      </Badge>
      <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
        {rangkuman.judulUmum}
      </h1>
      <p className="mt-3 max-w-200 text-lg text-ink">
        Kamu tidak sendirian, dan ada langkah yang bisa kamu ambil.
      </p>

      <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-muted sm:flex-row sm:flex-wrap sm:gap-4">
        {rangkuman.tanggalPeninjauan && (
          <li className="flex items-center gap-1.5">
            <IkonJam className="size-4 shrink-0" />
            Diperbarui {formatTanggal(rangkuman.tanggalPeninjauan)}
          </li>
        )}
        <li className="flex items-center gap-1.5">
          <IkonBuku className="size-4 shrink-0" />
          {menitBaca} menit baca
        </li>
        <li className="flex items-center gap-1.5">
          <IkonPerisai className="size-4 shrink-0" />
          Ditinjau tim PahamHukum
        </li>
      </ul>
      <p className="mt-3 text-sm text-ink-muted">
        Istilah hukum: {rangkuman.istilahResmi}.
      </p>

      <ul className="mt-5 grid grid-cols-2 gap-3 md:max-w-170 md:grid-cols-4">
        <KotakRingkasan
          ikon={<IkonDaftarCentang className="size-4" />}
          nada="brand"
        >
          <p className="text-3xl font-bold text-ink">
            {rangkuman.daftarLangkah.length}
          </p>
          <p className="mt-1 text-sm text-ink-muted">langkah</p>
        </KotakRingkasan>
        <KotakRingkasan ikon={<IkonDokumen className="size-4" />} nada="info">
          <p className="text-3xl font-bold text-ink">
            {rangkuman.daftarDokumen.length}
          </p>
          <p className="mt-1 text-sm text-ink-muted">dokumen disiapkan</p>
        </KotakRingkasan>
        {langkahBertenggat && (
          <KotakRingkasan
            ikon={<IkonJam className="size-4" />}
            nada="peringatan"
            className="col-span-2"
          >
            <p className="text-lg font-semibold text-ink">
              Ada tenggat: {langkahBertenggat.tenggat}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              untuk langkah {langkahBertenggat.nomor}:{" "}
              {langkahBertenggat.deskripsi}
            </p>
          </KotakRingkasan>
        )}
      </ul>
    </header>
  );
}
