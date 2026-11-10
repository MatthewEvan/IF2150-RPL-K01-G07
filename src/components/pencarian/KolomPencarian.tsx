import { IkonCari, IkonPanahKanan } from "./ikon";

type Props = {
  nilaiAwal?: string;
};

/**
 * Kolom pencarian kata kunci pada layar I-03 (C15 HalamanPencarianKataKunci).
 * Mempertahankan kata kunci yang dicari di dalam kolom input setelah hasil tampil.
 */
export default function KolomPencarian({ nilaiAwal = "" }: Props) {
  return (
    <form
      action="/cari"
      role="search"
      className="flex w-full items-center gap-3 rounded-pill bg-surface-raised py-2 pr-2 pl-5 shadow-md focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent"
    >
      <IkonCari className="size-5 shrink-0 text-ink-muted" />
      <label htmlFor="kolom-pencarian-kasus" className="sr-only">
        Cari situasimu
      </label>
      <input
        key={nilaiAwal}
        id="kolom-pencarian-kasus"
        name="q"
        type="search"
        defaultValue={nilaiAwal}
        placeholder="Contoh: saya diberhentikan tanpa surat"
        className="min-w-0 flex-1 bg-transparent py-2 text-base text-ink outline-none placeholder:text-ink-muted"
      />
      <button
        type="submit"
        aria-label="Cari"
        className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-brand text-on-brand transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <IkonPanahKanan className="size-5" />
      </button>
    </form>
  );
}
