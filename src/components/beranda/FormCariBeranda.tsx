import { IkonCari, IkonPanahKanan } from "./ikon";

export default function FormCariBeranda() {
  return (
    <form
      action="/cari"
      role="search"
      className="flex items-center gap-3 rounded-pill border border-line bg-surface-raised py-2 pr-2 pl-5 shadow-sm focus-within:border-accent"
    >
      <IkonCari className="size-5 shrink-0 text-ink-muted" />
      <label htmlFor="kata-kunci-beranda" className="sr-only">
        Ceritakan situasimu
      </label>
      <input
        id="kata-kunci-beranda"
        name="q"
        type="search"
        required
        placeholder="Contoh: saya diberhentikan tanpa surat"
        className="min-w-0 flex-1 bg-transparent py-2 text-base text-ink outline-none placeholder:text-ink-muted"
      />
      <button
        type="submit"
        aria-label="Cari"
        className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-brand text-on-brand hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <IkonPanahKanan className="size-5" />
      </button>
    </form>
  );
}
