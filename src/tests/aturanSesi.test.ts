import { describe, expect, it } from "vitest";
import {
  BATAS_TANPA_AKTIVITAS_MS,
  tentukanAksesPanel,
} from "@/lib/controllers/aturanSesi";
import { PERAN, type AkunTerhubung } from "@/lib/models/akun";

const SEKARANG = 1_000_000_000;
const KURATOR: AkunTerhubung = {
  idAkun: "k1",
  email: "k1@contoh.test",
  peran: PERAN.KURATOR,
  statusAktif: true,
};
const ADMIN: AkunTerhubung = {
  idAkun: "a1",
  email: "a1@contoh.test",
  peran: PERAN.ADMINISTRATOR,
  statusAktif: true,
};

function akses(
  pathname: string,
  akun: AkunTerhubung | null,
  aktivitasTerakhir: number | null = SEKARANG,
) {
  return tentukanAksesPanel({
    pathname,
    akun,
    aktivitasTerakhir,
    sekarang: SEKARANG,
  });
}

describe("proteksi peran", () => {
  it("menolak akses panel tanpa sesi", () => {
    expect(akses("/panel/kurator/konten", null)).toEqual({
      izin: false,
      tujuan: "/masuk",
      akhiriSesi: true,
    });
  });

  it("menolak Kurator yang membuka panel Administrator", () => {
    expect(akses("/panel/admin/akun", KURATOR)).toEqual({
      izin: false,
      tujuan: "/panel/ditolak",
      akhiriSesi: false,
    });
  });

  it("menolak Administrator yang membuka panel Kurator", () => {
    expect(akses("/panel/kurator/konten", ADMIN)).toMatchObject({
      izin: false,
      tujuan: "/panel/ditolak",
    });
  });

  it("mengizinkan setiap peran membuka panelnya sendiri", () => {
    expect(akses("/panel/kurator/konten/5", KURATOR)).toEqual({ izin: true });
    expect(akses("/panel/admin/moderasi", ADMIN)).toEqual({ izin: true });
  });

  it("tidak tertukar dengan rute yang awalannya mirip", () => {
    expect(akses("/panel/administrasi", KURATOR)).toEqual({ izin: true });
  });

  it("tidak membatasi rute panel bersama seperti /panel/sesi", () => {
    expect(akses("/panel/sesi", KURATOR)).toEqual({ izin: true });
    expect(akses("/panel/sesi", ADMIN)).toEqual({ izin: true });
  });
});

describe("status akun", () => {
  it("mengakhiri sesi Kurator yang sudah dinonaktifkan", () => {
    expect(
      akses("/panel/kurator/konten", { ...KURATOR, statusAktif: false }),
    ).toEqual({
      izin: false,
      tujuan: "/masuk?alasan=akun-nonaktif",
      akhiriSesi: true,
    });
  });
});

describe("batas 30 menit tanpa aktivitas", () => {
  it("masih sah tepat pada batasnya", () => {
    const tepatBatas = SEKARANG - BATAS_TANPA_AKTIVITAS_MS;
    expect(akses("/panel/kurator/konten", KURATOR, tepatBatas)).toEqual({
      izin: true,
    });
  });

  it("berakhir setelah melewati batas", () => {
    const lewatBatas = SEKARANG - BATAS_TANPA_AKTIVITAS_MS - 1;
    expect(akses("/panel/kurator/konten", KURATOR, lewatBatas)).toEqual({
      izin: false,
      tujuan: "/masuk?alasan=sesi-berakhir",
      akhiriSesi: true,
    });
  });

  it("menganggap sesi baru jika belum ada catatan aktivitas", () => {
    expect(akses("/panel/kurator/konten", KURATOR, null)).toEqual({
      izin: true,
    });
  });
});
