import { describe, expect, it } from "vitest";

type StatusKonten = "Draft" | "Diajukan" | "Perlu Revisi" | "Disetujui";

function bisaDiajukan(status: StatusKonten): boolean {
  return status === "Draft" || status === "Perlu Revisi";
}

describe("Contoh pengujian: kelayakan pengajuan konten", () => {
  it("mengizinkan pengajuan untuk konten berstatus Draft atau Perlu Revisi", () => {
    expect(bisaDiajukan("Draft")).toBe(true);
    expect(bisaDiajukan("Perlu Revisi")).toBe(true);
  });

  it("menolak pengajuan untuk konten yang sedang Diajukan atau sudah Disetujui", () => {
    expect(bisaDiajukan("Diajukan")).toBe(false);
    expect(bisaDiajukan("Disetujui")).toBe(false);
  });
});
