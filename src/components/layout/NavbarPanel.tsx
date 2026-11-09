"use client";

import Button from "@/components/ui/Button";
import { logout } from "@/lib/controllers/kontrolAutentikasi";
import { PERAN, type Peran } from "@/lib/models/akun";
import NavbarDasar from "./NavbarDasar";

const PANEL = {
  [PERAN.KURATOR]: {
    label: "Kurator",
    warnaLencana: "bg-accent-soft text-link",
    tautan: [
      { href: "/panel/kurator/konten", label: "Konten saya" },
      { href: "/panel/kurator/konten/baru", label: "Tulis konten" },
    ],
  },
  [PERAN.ADMINISTRATOR]: {
    label: "Administrator",
    warnaLencana: "bg-surface-sunken text-ink",
    tautan: [
      { href: "/panel/admin/moderasi", label: "Antrean tinjauan" },
      { href: "/panel/admin/akun", label: "Akun kurator" },
    ],
  },
};

export default function NavbarPanel({ peran }: { peran: Peran }) {
  const panel = PANEL[peran];

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
        <form action={logout}>
          <Button type="submit" varian="secondary">
            Keluar
          </Button>
        </form>
      }
    />
  );
}
