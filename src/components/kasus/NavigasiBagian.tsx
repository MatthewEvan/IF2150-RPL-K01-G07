import { BAGIAN } from "./bagian";

export default function NavigasiBagian() {
  return (
    <nav
      aria-label="Bagian rangkuman"
      className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0"
    >
      <ol className="flex gap-2 py-2 md:flex-wrap">
        {Object.values(BAGIAN).map((bagian) => (
          <li key={bagian.id} className="shrink-0">
            <a
              href={`#${bagian.id}`}
              className="flex items-center gap-2 rounded-pill border border-line bg-surface-raised py-1.5 pr-4 pl-1.5 text-sm font-semibold text-ink shadow-sm transition-colors hover:bg-surface-raised-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="flex size-8 items-center justify-center rounded-pill bg-surface text-ink">
                {bagian.nomor}
              </span>
              {bagian.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
