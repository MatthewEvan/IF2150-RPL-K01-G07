"use client";

import { useCallback, useRef } from "react";

export const JEDA_JAGA_SESI_MS = 5 * 60 * 1000;

export default function useJagaSesi() {
  const terakhirDikirim = useRef(0);

  return useCallback(() => {
    const sekarang = Date.now();
    if (sekarang - terakhirDikirim.current < JEDA_JAGA_SESI_MS) return;
    terakhirDikirim.current = sekarang;

    fetch("/panel/sesi", { method: "POST" })
      .then((respons) => {
        if (respons.redirected) window.location.assign(respons.url);
      })
      .catch(() => {});
  }, []);
}
