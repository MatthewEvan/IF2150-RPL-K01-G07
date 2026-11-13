"use client";

import { useMemo, useSyncExternalStore } from "react";
import Button from "@/components/ui/Button";
import {
  bacaCentang,
  bacaCentangAwal,
  hitungKelengkapan,
  kosongkanCentang,
  pantauCentang,
  simpanCentang,
} from "@/lib/controllers/kontrolChecklist";

type Props = {
  idRangkuman: number;
  daftarDokumen: string[];
};

const JARI_JARI = 28;
const KELILING = 2 * Math.PI * JARI_JARI;

function CincinKelengkapan({ persen, teks }: { persen: number; teks: string }) {
  return (
    <div className="relative size-16 shrink-0">
      <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden>
        <circle
          cx="32"
          cy="32"
          r={JARI_JARI}
          fill="none"
          strokeWidth="6"
          className="stroke-surface-sunken"
        />
        <circle
          cx="32"
          cy="32"
          r={JARI_JARI}
          fill="none"
          strokeWidth="6"
          strokeDasharray={KELILING}
          strokeDashoffset={KELILING * (1 - persen / 100)}
          className="stroke-accent transition-[stroke-dashoffset]"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-semibold text-ink">
        {teks}
      </span>
    </div>
  );
}

/** UC03: centang dokumen yang sudah disiapkan, tersimpan di perangkat. */
export default function ChecklistDokumen({
  idRangkuman,
  daftarDokumen,
}: Props) {
  const tersimpan = useSyncExternalStore(
    pantauCentang,
    () => bacaCentang(idRangkuman),
    bacaCentangAwal,
  );

  // Dokumen yang dihapus Kurator dari checklist tidak ikut dihitung.
  const dicentang = useMemo(
    () =>
      new Set(tersimpan.filter((dokumen) => daftarDokumen.includes(dokumen))),
    [tersimpan, daftarDokumen],
  );

  const jumlahTotal = daftarDokumen.length;
  const sisa = jumlahTotal - dicentang.size;
  const persen = hitungKelengkapan(dicentang.size, jumlahTotal);

  function ubahCentang(dokumen: string, centang: boolean) {
    simpanCentang(
      idRangkuman,
      daftarDokumen.filter((item) =>
        item === dokumen ? centang : dicentang.has(item),
      ),
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <CincinKelengkapan
          persen={persen}
          teks={`${dicentang.size}/${jumlahTotal}`}
        />
        <div>
          <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
            Kesiapan dokumen
          </p>
          <p role="status" className="text-lg font-semibold text-ink">
            {sisa > 0 ? `${sisa} dokumen lagi` : "Semua dokumen sudah siap"}
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-1">
        {daftarDokumen.map((dokumen) => (
          <li key={dokumen}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 text-ink hover:bg-surface-raised-hover">
              <input
                type="checkbox"
                checked={dicentang.has(dokumen)}
                onChange={(event) => ubahCentang(dokumen, event.target.checked)}
                className="mt-0.5 size-5 shrink-0 cursor-pointer accent-success"
              />
              <span className="font-medium">{dokumen}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Centanganmu hanya tersimpan di perangkat ini dan tidak dikirim ke
          server.
        </p>
        <Button
          varian="ghost"
          ukuran="sm"
          disabled={dicentang.size === 0}
          onClick={() => kosongkanCentang(idRangkuman)}
        >
          Kosongkan centang
        </Button>
      </div>
    </div>
  );
}
