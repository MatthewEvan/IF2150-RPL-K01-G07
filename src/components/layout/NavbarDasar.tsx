"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

export type TautanNavbar = { href: string; label: string };

type NavbarDasarProps = {
  tautan: TautanNavbar[];
  /** Tampil di samping logo, misalnya label peran. */
  lencana?: ReactNode;
  /** Tombol di ujung navbar, misalnya Masuk atau Keluar. */
  aksi?: ReactNode;
};

/** Tautan aktif adalah yang href-nya paling panjang dan cocok dengan rute. */
function cariTautanAktif(pathname: string, tautan: TautanNavbar[]) {
  return tautan
    .filter(({ href }) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
}

export default function NavbarDasar({
  tautan,
  lencana,
  aksi,
}: NavbarDasarProps) {
  const pathname = usePathname();
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const aktif = cariTautanAktif(pathname, tautan);

  const daftarTautan = tautan.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      aria-current={href === aktif ? "page" : undefined}
      onClick={() => setMenuTerbuka(false)}
      className={`border-b-2 pb-1 text-sm font-medium ${
        href === aktif
          ? "border-accent text-ink"
          : "border-transparent text-ink-muted hover:text-ink"
      }`}
    >
      {label}
    </Link>
  ));

  return (
    <header className="border-b border-line bg-surface-raised">
      <div className="mx-auto flex h-17 max-w-280 items-center justify-between gap-3 px-5">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            aria-label="PahamHukum, ke beranda"
            className="shrink-0"
          >
            <Image
              src="/logo.png"
              alt="PahamHukum"
              width={620}
              height={104}
              priority
              className="h-6 w-auto"
            />
          </Link>
          {lencana}
        </div>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-8 md:flex"
        >
          {daftarTautan}
          {aksi}
        </nav>

        <button
          type="button"
          aria-label={menuTerbuka ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuTerbuka}
          aria-controls="menu-ponsel"
          onClick={() => setMenuTerbuka((terbuka) => !terbuka)}
          className="flex size-11 shrink-0 items-center justify-center rounded-md border border-line-strong text-ink md:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-6"
          >
            {menuTerbuka ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuTerbuka && (
        <nav
          id="menu-ponsel"
          aria-label="Navigasi ponsel"
          className="flex flex-col items-start gap-4 border-t border-line px-5 py-4 md:hidden"
        >
          {daftarTautan}
          {aksi}
        </nav>
      )}
    </header>
  );
}
