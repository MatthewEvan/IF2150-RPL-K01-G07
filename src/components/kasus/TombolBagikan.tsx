"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { IkonBagikan } from "./ikon";

/** Memakai menu bagikan bawaan ponsel; di desktop tautan disalin. */
export default function TombolBagikan({ judul }: { judul: string }) {
  const [pesan, setPesan] = useState("");

  async function bagikan() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: judul, url });
      } catch {
        // Pengguna menutup menu bagikan.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setPesan("Tautan disalin");
    } catch {
      setPesan("Tautan gagal disalin");
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span role="status" className="text-sm text-ink-muted">
        {pesan}
      </span>
      <Button
        varian="secondary"
        ukuran="ikon"
        aria-label="Bagikan rangkuman"
        onClick={bagikan}
      >
        <IkonBagikan className="size-5" />
      </Button>
    </div>
  );
}
