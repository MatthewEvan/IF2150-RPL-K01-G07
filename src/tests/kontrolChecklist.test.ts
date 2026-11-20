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

describe("C23 KontrolChecklist — penyimpanan status checklist", () => {
  it("C23-UT01: kosong bila belum ada yang dicentang", () => {
    expect(checklist.bacaCentang(7)).toEqual([]);
  });

  it("C23-UT02: menyimpan centang ke localStorage", () => {
    checklist.simpanCentang(7, ["KTP", "Surat PHK"]);

    expect(JSON.parse(localStorage.getItem(KUNCI)!)).toEqual([
      "KTP",
      "Surat PHK",
    ]);
    expect(checklist.bacaCentang(7)).toEqual(["KTP", "Surat PHK"]);
  });

  it("C23-UT03: membaca kembali centang setelah halaman dibuka ulang", async () => {
    checklist.simpanCentang(7, ["KTP"]);
    await muatUlang();

    expect(checklist.bacaCentang(7)).toEqual(["KTP"]);
  });

  it("C23-UT04: memisahkan centang tiap rangkuman", () => {
    checklist.simpanCentang(7, ["KTP"]);
    checklist.simpanCentang(8, ["Akta nikah"]);

    expect(checklist.bacaCentang(7)).toEqual(["KTP"]);
    expect(checklist.bacaCentang(8)).toEqual(["Akta nikah"]);
  });

  it("C23-UT05: mengosongkan centang dan menghapus kuncinya", () => {
    checklist.simpanCentang(7, ["KTP"]);
    checklist.kosongkanCentang(7);

    expect(localStorage.getItem(KUNCI)).toBeNull();
    expect(checklist.bacaCentang(7)).toEqual([]);
  });

  it("C23-UT06: memberi rujukan yang sama selama isinya tidak berubah", () => {
    checklist.simpanCentang(7, ["KTP"]);

    expect(checklist.bacaCentang(7)).toBe(checklist.bacaCentang(7));
  });

  it("C23-UT07: memakai daftar kosong saat render di server", () => {
    expect(checklist.bacaCentangAwal()).toEqual([]);
  });

  it("C23-UT08: tidak mengirim status centang ke server", () => {
    const fetch = vi.spyOn(globalThis, "fetch");

    checklist.simpanCentang(7, ["KTP"]);
    checklist.kosongkanCentang(7);

    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("C23 KontrolChecklist — pembacaan isi yang tidak valid", () => {
  it.each([
    ["JSON rusak", "{bukan json"],
    ["bukan larik", '{"KTP":true}'],
  ])("C23-UT09: mengabaikan %s", (_, isi) => {
    localStorage.setItem(KUNCI, isi);

    expect(checklist.bacaCentang(7)).toEqual([]);
  });

  it("C23-UT10: membuang butir yang bukan teks", () => {
    localStorage.setItem(KUNCI, JSON.stringify(["KTP", 3, null, "Surat PHK"]));

    expect(checklist.bacaCentang(7)).toEqual(["KTP", "Surat PHK"]);
  });

  it("C23-UT11: tetap berjalan bila localStorage diblokir peramban", () => {
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

describe("C23 KontrolChecklist — pantauCentang", () => {
  it("C23-UT12: mengabari pendengar saat centang disimpan dan dikosongkan", () => {
    const pendengar = vi.fn();
    const berhenti = checklist.pantauCentang(pendengar);

    checklist.simpanCentang(7, ["KTP"]);
    checklist.kosongkanCentang(7);
    berhenti();
    checklist.simpanCentang(7, ["KTP"]);

    expect(pendengar).toHaveBeenCalledTimes(2);
  });

  it("C23-UT13: mengikuti perubahan centang dari tab lain", () => {
    const pendengar = vi.fn();
    const berhenti = checklist.pantauCentang(pendengar);
    checklist.simpanCentang(7, ["KTP"]);

    localStorage.setItem(KUNCI, JSON.stringify(["KTP", "Surat PHK"]));
    window.dispatchEvent(new StorageEvent("storage", { key: KUNCI }));

    expect(pendengar).toHaveBeenCalledTimes(2);
    expect(checklist.bacaCentang(7)).toEqual(["KTP", "Surat PHK"]);
    berhenti();
  });

  it("C23-UT14: mengabaikan perubahan kunci lain dari tab lain", () => {
    const pendengar = vi.fn();
    const berhenti = checklist.pantauCentang(pendengar);

    window.dispatchEvent(new StorageEvent("storage", { key: "tema" }));

    expect(pendengar).not.toHaveBeenCalled();
    berhenti();
  });

  it("C23-UT18: memasang satu pendengar storage untuk banyak komponen dan melepasnya setelah komponen terakhir", () => {
    const pasang = vi.spyOn(window, "addEventListener");
    const lepas = vi.spyOn(window, "removeEventListener");
    const berhentiA = checklist.pantauCentang(vi.fn());
    const berhentiB = checklist.pantauCentang(vi.fn());

    berhentiA();
    expect(lepas).not.toHaveBeenCalledWith("storage", expect.anything());
    berhentiB();

    expect(
      pasang.mock.calls.filter(([jenis]) => jenis === "storage"),
    ).toHaveLength(1);
    expect(
      lepas.mock.calls.filter(([jenis]) => jenis === "storage"),
    ).toHaveLength(1);
  });

  it("C23-UT16: membaca ulang centang saat localStorage dikosongkan di tab lain", () => {
    const pendengar = vi.fn();
    const berhenti = checklist.pantauCentang(pendengar);
    checklist.simpanCentang(7, ["KTP"]);

    localStorage.clear();
    window.dispatchEvent(new StorageEvent("storage", { key: null }));

    expect(pendengar).toHaveBeenCalledTimes(2);
    expect(checklist.bacaCentang(7)).toEqual([]);
    berhenti();
  });

  it("C23-UT17: kosongkanCentang tetap berjalan bila localStorage diblokir", () => {
    checklist.simpanCentang(7, ["KTP"]);
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("diblokir");
    });

    expect(() => checklist.kosongkanCentang(7)).not.toThrow();
    expect(checklist.bacaCentang(7)).toEqual([]);
  });
});

describe("C23 KontrolChecklist — hitungKelengkapan", () => {
  it.each([
    [1, 3, 33],
    [2, 3, 67],
    [3, 3, 100],
  ])(
    "C23-UT15: %i dari %i dokumen dicentang menjadi %i persen",
    (dicentang, total, persen) => {
      expect(checklist.hitungKelengkapan(dicentang, total)).toBe(persen);
    },
  );

  it.each([
    [0, 3, 0],
    [0, 0, 0],
  ])(
    "C23-UT19: batas %i dari %i dokumen menjadi %i persen",
    (dicentang, total, persen) => {
      expect(checklist.hitungKelengkapan(dicentang, total)).toBe(persen);
    },
  );

  it("C23-UT20: jumlah dicentang melebihi total dibatasi 100 persen", () => {
    expect(checklist.hitungKelengkapan(5, 3)).toBe(100);
  });
});
