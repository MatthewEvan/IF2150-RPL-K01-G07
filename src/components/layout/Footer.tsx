"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TAUTAN = [
  { href: "/", label: "Jelajahi situasi" },
  { href: "/cari", label: "Cari kasus" },
  { href: "/masuk", label: "Masuk pengelola" },
];

export default function Footer() {
  const pathname = usePathname();

  // Footer hanya untuk layar publik, dan mockup I-04 tidak memakainya.
  if (pathname.startsWith("/panel") || pathname === "/masuk") return null;

  return (
    <footer className="bg-brand-strong text-on-brand">
      <div className="mx-auto flex max-w-280 flex-col gap-6 px-5 py-12 md:flex-row md:justify-between">
        <div className="max-w-md">
          <Image
            src="/logo-putih.png"
            alt="PahamHukum"
            width={620}
            height={104}
            className="h-7 w-auto"
          />
          <p className="mt-3 text-sm">
            Panduan langkah awal untuk masalah hukum sehari-hari. Gratis,
            terbuka, dan tanpa akun.
          </p>
          <p className="mt-3 text-xs">© 2026 PahamHukum</p>
        </div>
        <nav aria-label="Navigasi kaki" className="flex flex-wrap gap-6">
          {TAUTAN.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium underline"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
