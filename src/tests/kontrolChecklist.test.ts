import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type KontrolChecklist = typeof import("@/lib/controllers/kontrolChecklist");

const KUNCI = "pahamhukum:checklist:7";

let checklist: KontrolChecklist;

// Modul dimuat ulang agar tembolok di memori kosong, seperti membuka halaman baru.
async function muatUlang() {
  vi.resetModules();
  checklist = await import("@/lib/controllers/kontrolChecklist");
}

beforeEach(async () => {
  localStorage.clear();
  await muatUlang();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("penyimpanan status checklist", () => {
  it("kosong bila belum ada yang dicentang", () => {
    expect(checklist.bacaCentang(7)).toEqual([]);
  });

  it("menyimpan centang ke localStorage", () => {
    checklist.simpanCentang(7, ["KTP", "Surat PHK"]);

    expect(JSON.parse(localStorage.getItem(KUNCI)!)).toEqual([
      "KTP",
      "Surat PHK",
    ]);
    expect(checklist.bacaCentang(7)).toEqual(["KTP", "Surat PHK"]);
  });

  it("membaca kembali centang setelah halaman dibuka ulang", async () => {
    checklist.simpanCentang(7, ["KTP"]);
    await muatUlang();

    expect(checklist.bacaCentang(7)).toEqual(["KTP"]);
  });

  it("memisahkan centang tiap rangkuman", () => {
    checklist.simpanCentang(7, ["KTP"]);
    checklist.simpanCentang(8, ["Akta nikah"]);

    expect(checklist.bacaCentang(7)).toEqual(["KTP"]);
    expect(checklist.bacaCentang(8)).toEqual(["Akta nikah"]);
  });

  it("mengosongkan centang dan menghapus kuncinya", () => {
    checklist.simpanCentang(7, ["KTP"]);
    checklist.kosongkanCentang(7);

    expect(localStorage.getItem(KUNCI)).toBeNull();
    expect(checklist.bacaCentang(7)).toEqual([]);
  });

  it("memberi rujukan yang sama selama isinya tidak berubah", () => {
    checklist.simpanCentang(7, ["KTP"]);

    expect(checklist.bacaCentang(7)).toBe(checklist.bacaCentang(7));
  });

  it("memakai daftar kosong saat render di server", () => {
    expect(checklist.bacaCentangAwal()).toEqual([]);
  });

  it("tidak mengirim status centang ke server", () => {
    const fetch = vi.spyOn(globalThis, "fetch");

    checklist.simpanCentang(7, ["KTP"]);
    checklist.kosongkanCentang(7);

    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("pembacaan isi yang tidak valid", () => {
  it.each([
    ["JSON rusak", "{bukan json"],
    ["bukan larik", '{"KTP":true}'],
  ])("mengabaikan %s", (_, isi) => {
    localStorage.setItem(KUNCI, isi);

    expect(checklist.bacaCentang(7)).toEqual([]);
  });

  it("membuang butir yang bukan teks", () => {
    localStorage.setItem(KUNCI, JSON.stringify(["KTP", 3, null, "Surat PHK"]));

    expect(checklist.bacaCentang(7)).toEqual(["KTP", "Surat PHK"]);
  });

  it("tetap berjalan bila localStorage diblokir peramban", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("diblokir");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("diblokir");
    });

    expect(checklist.bacaCentang(7)).toEqual([]);
    expect(() => checklist.simpanCentang(7, ["KTP"])).not.toThrow();
    expect(checklist.bacaCentang(7)).toEqual(["KTP"]);
  });
});

describe("pantauCentang", () => {
  it("mengabari pendengar saat centang disimpan dan dikosongkan", () => {
    const pendengar = vi.fn();
    const berhenti = checklist.pantauCentang(pendengar);

    checklist.simpanCentang(7, ["KTP"]);
    checklist.kosongkanCentang(7);
    berhenti();
    checklist.simpanCentang(7, ["KTP"]);

    expect(pendengar).toHaveBeenCalledTimes(2);
  });

  it("mengikuti perubahan centang dari tab lain", () => {
    const pendengar = vi.fn();
    const berhenti = checklist.pantauCentang(pendengar);
    checklist.simpanCentang(7, ["KTP"]);

    localStorage.setItem(KUNCI, JSON.stringify(["KTP", "Surat PHK"]));
    window.dispatchEvent(new StorageEvent("storage", { key: KUNCI }));

    expect(pendengar).toHaveBeenCalledTimes(2);
    expect(checklist.bacaCentang(7)).toEqual(["KTP", "Surat PHK"]);
    berhenti();
  });

  it("mengabaikan perubahan kunci lain dari tab lain", () => {
    const pendengar = vi.fn();
    const berhenti = checklist.pantauCentang(pendengar);

    window.dispatchEvent(new StorageEvent("storage", { key: "tema" }));

    expect(pendengar).not.toHaveBeenCalled();
    berhenti();
  });
});

describe("hitungKelengkapan", () => {
  it.each([
    [0, 0, 0],
    [0, 3, 0],
    [1, 3, 33],
    [2, 3, 67],
    [3, 3, 100],
    [5, 3, 100],
  ])("%i dari %i dokumen menjadi %i%%", (dicentang, total, persen) => {
    expect(checklist.hitungKelengkapan(dicentang, total)).toBe(persen);
  });
});
