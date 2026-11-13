import type { ReactNode } from "react";

function Ikon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      {children}
    </svg>
  );
}

export function IkonNaik() {
  return (
    <Ikon>
      <path d="m18 15-6-6-6 6" />
    </Ikon>
  );
}

export function IkonTurun() {
  return (
    <Ikon>
      <path d="m6 9 6 6 6-6" />
    </Ikon>
  );
}

export function IkonHapus() {
  return (
    <Ikon>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </Ikon>
  );
}

export function IkonTambah() {
  return (
    <Ikon>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Ikon>
  );
}
