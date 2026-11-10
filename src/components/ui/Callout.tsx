import type { ReactNode } from "react";

export type JenisCallout = "info" | "peringatan" | "bahaya";

const GAYA: Record<
  JenisCallout,
  { kotak: string; teks: string; ikon: ReactNode }
> = {
  info: {
    kotak: "border-accent bg-accent-soft",
    teks: "text-link",
    ikon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
  peringatan: {
    kotak: "border-warning bg-warning-soft",
    teks: "text-warning",
    ikon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
      >
        <path d="M12 4l9 16H3l9-16z" />
        <path d="M12 10v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  bahaya: {
    kotak: "border-danger bg-danger-soft",
    teks: "text-danger",
    ikon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
};

export type CalloutProps = {
  /** Jenis pesan. Bawaan: info. */
  jenis?: JenisCallout;
  /** Judul singkat pesan. */
  judul?: string;
  children: ReactNode;
};

export default function Callout({
  jenis = "info",
  judul,
  children,
}: CalloutProps) {
  const gaya = GAYA[jenis];

  return (
    <div className={`rounded-md border-l-4 p-4 ${gaya.kotak}`}>
      <div className="flex gap-3">
        <span className={`mt-0.5 shrink-0 ${gaya.teks}`}>{gaya.ikon}</span>
        <div className="min-w-0">
          {judul && (
            <p className={`text-sm font-semibold ${gaya.teks}`}>{judul}</p>
          )}
          <div className="text-sm text-ink">{children}</div>
        </div>
      </div>
    </div>
  );
}
