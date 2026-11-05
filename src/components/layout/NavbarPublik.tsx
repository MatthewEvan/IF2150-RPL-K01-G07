"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarDasar from "./NavbarDasar";

const TAUTAN = [
  { href: "/", label: "Jelajahi situasi" },
  { href: "/cari", label: "Cari kasus" },
];

export default function NavbarPublik() {
  const pathname = usePathname();

  // Layar panel memakai NavbarPanel dari app/panel/layout.tsx.
  if (pathname.startsWith("/panel")) return null;

  return (
    <NavbarDasar
      tautan={TAUTAN}
      aksi={
        pathname !== "/masuk" && (
          <Link
            href="/masuk"
            className="rounded-pill bg-brand px-6 py-2.5 text-sm font-semibold text-on-brand hover:bg-brand-strong"
          >
            Masuk
          </Link>
        )
      }
    />
  );
}
