import type { ReactNode, SVGProps } from "react";

function Ikon({
  children,
  className = "size-5",
  ...sisa
}: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...sisa}
    >
      {children}
    </svg>
  );
}

type PropsIkon = { className?: string };

export function IkonPanahKiri(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </Ikon>
  );
}

export function IkonBagikan(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </Ikon>
  );
}

export function IkonJam(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Ikon>
  );
}

export function IkonBuku(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />
    </Ikon>
  );
}

export function IkonPerisai(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </Ikon>
  );
}

export function IkonDaftarCentang(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="m3 6 2 2 3-3M3 13l2 2 3-3" />
      <path d="M12 7h9M12 14h9M4 20h17" />
    </Ikon>
  );
}

export function IkonDokumen(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8M8 17h5" />
    </Ikon>
  );
}

export function IkonTautanLuar(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </Ikon>
  );
}

export function IkonGedung(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M3 21h18M4 10h16M12 3l8 4H4z" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
    </Ikon>
  );
}

export function IkonUnduh(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M12 4v10" />
      <path d="m8 10 4 4 4-4" />
      <path d="M5 19h14" />
    </Ikon>
  );
}
