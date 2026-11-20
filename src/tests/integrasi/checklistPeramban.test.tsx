// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const KUNCI = "pahamhukum:checklist:1";
const DOKUMEN = ["Perjanjian kerja", "Slip gaji", "Surat penagihan"];

// Modul dimuat ulang agar tembolok di memori kosong, seperti membuka halaman lagi.
async function bukaHalaman() {
  vi.resetModules();
  const { default: ChecklistDokumen } =
    await import("@/components/kasus/ChecklistDokumen");
  return render(<ChecklistDokumen idRangkuman={1} daftarDokumen={DOKUMEN} />);
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Integrasi C14 HalamanRangkumanKasus ke C23 KontrolChecklist dan localStorage (IA-13)", () => {
  it("INT-TC16: centang tersimpan di localStorage, tetap ada setelah halaman dibuka ulang, dan tidak dikirim ke server", async () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    const halaman = await bukaHalaman();

    fireEvent.click(screen.getByLabelText("Perjanjian kerja"));
    fireEvent.click(screen.getByLabelText("Slip gaji"));

    expect(screen.getByRole("status").textContent).toBe("1 dokumen lagi");
    expect(JSON.parse(localStorage.getItem(KUNCI)!)).toEqual([
      "Perjanjian kerja",
      "Slip gaji",
    ]);

    halaman.unmount();
    await bukaHalaman();

    expect(
      (screen.getByLabelText("Perjanjian kerja") as HTMLInputElement).checked,
    ).toBe(true);
    expect(
      (screen.getByLabelText("Surat penagihan") as HTMLInputElement).checked,
    ).toBe(false);
    expect(screen.getByText("2/3")).toBeTruthy();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("INT-TC17: tombol Kosongkan centang menghapus kunci localStorage dan mengembalikan progres ke 0", async () => {
    localStorage.setItem(KUNCI, JSON.stringify(DOKUMEN));
    await bukaHalaman();

    expect(screen.getByRole("status").textContent).toBe(
      "Semua dokumen sudah siap",
    );

    fireEvent.click(screen.getByRole("button", { name: "Kosongkan centang" }));

    expect(localStorage.getItem(KUNCI)).toBeNull();
    expect(screen.getByText("0/3")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toBe("3 dokumen lagi");
  });
});
