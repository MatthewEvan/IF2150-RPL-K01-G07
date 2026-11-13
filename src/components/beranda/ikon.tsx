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

export function IkonCari(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Ikon>
  );
}

export function IkonPanahKanan(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Ikon>
  );
}

export function IkonPanahSerong(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Ikon>
  );
}

export function IkonTelepon(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </Ikon>
  );
}

export function IkonInfo(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </Ikon>
  );
}

function IkonKoper(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M8 7v13M16 7v13" />
    </Ikon>
  );
}

function IkonTas(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M6 7h12l1 13H5L6 7z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </Ikon>
  );
}

function IkonRumah(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-5h4v5" />
    </Ikon>
  );
}

function IkonTimbangan(props: PropsIkon) {
  return (
    <Ikon {...props}>
      <path d="M12 4v16M8 20h8M5 7h14" />
      <path d="m5 7-3 6a3 3 0 0 0 6 0L5 7zM19 7l-3 6a3 3 0 0 0 6 0l-3-6z" />
    </Ikon>
  );
}

/** Basis data tidak menyimpan ikon, jadi ikon dipilih dari nama bidang. */
export function IkonBidang({
  nama,
  className,
}: {
  nama: string;
  className?: string;
}) {
  const namaKecil = nama.toLowerCase();
  if (namaKecil.includes("kerja")) return <IkonKoper className={className} />;
  if (namaKecil.includes("konsumen")) return <IkonTas className={className} />;
  if (namaKecil.includes("keluarga"))
    return <IkonRumah className={className} />;
  return <IkonTimbangan className={className} />;
}
