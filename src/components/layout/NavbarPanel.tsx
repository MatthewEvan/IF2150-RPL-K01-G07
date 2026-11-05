"use client";

import { usePathname } from "next/navigation";
import NavbarDasar from "./NavbarDasar";

const PANEL = {
  kurator: {
    label: "Kurator",
    warnaLencana: "bg-accent-soft text-link",
    tautan: [
      { href: "/panel/kurator/konten", label: "Konten saya" },
      { href: "/panel/kurator/konten/baru", label: "Tulis konten" },
    ],
  },
  administrator: {
    label: "Administrator",
    warnaLencana: "bg-surface-sunken text-ink",
    tautan: [
      { href: "/panel/admin/moderasi", label: "Antrean tinjauan" },
      { href: "/panel/admin/akun", label: "Akun kurator" },
    ],
  },
};

export default function NavbarPanel() {
  const pathname = usePathname();
  const panel = pathname.startsWith("/panel/admin")
    ? PANEL.administrator
    : PANEL.kurator;

  return (
    <NavbarDasar
      tautan={panel.tautan}
      lencana={
        <span
          className={`rounded-pill px-3 py-1 text-xs font-semibold sm:text-sm ${panel.warnaLencana}`}
        >
          {panel.label}
        </span>
      }
      aksi={
        <button
          type="button"
          className="rounded-pill border border-line-strong px-6 py-2.5 text-sm font-semibold text-brand hover:bg-surface-raised-hover"
        >
          Keluar
        </button>
      }
    />
  );
}
