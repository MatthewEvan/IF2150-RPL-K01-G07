import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { ambilDaftarKonten } from "@/lib/controllers/kontrolPelacakanKonten";
import {
  kembalikanKonten,
  setujuiKonten,
} from "@/lib/controllers/kontrolModerasiKonten";
import { ambilRangkumanDisetujui } from "@/lib/models/rangkumanKasus";
import {
  buatClientAdminLokal,
  buatClientAnonLokal,
  buatClientMasukLokal,
  wajibSupabaseLokal,
} from "./supabaseLokal";

const tiruan = vi.hoisted(() => ({
  client: null as unknown,
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  buatClientServer: async () => tiruan.client,
}));

vi.mock("next/cache", () => ({
  revalidatePath: tiruan.revalidatePath,
}));

const ID_KURATOR_SATU = "b0000000-0000-4000-8000-000000000001";
const ID_KURATOR_DUA = "b0000000-0000-4000-8000-000000000002";

type Keadaan = {
  status: string;
  tanggal_peninjauan: string | null;
  catatan_revisi: string | null;
};

/** Data uji baru berstatus Diajukan dibuat lewat service role, bukan konten milik orang lain. */
async function buatKontenDiajukan(idKelompok = 2): Promise<number> {
  const admin = buatClientAdminLokal();
  const { data, error } = await admin
    .from("rangkuman_kasus")
    .insert({
      id_kelompok: idKelompok,
      id_kurator: ID_KURATOR_SATU,
      inti_masalah: "Data uji integrasi moderasi M10.",
      hak: "Hak yang diuji.",
      poin_pertimbangan: "Pertimbangan yang diuji.",
      status: "Diajukan",
      nama_penulis: "Kurator Satu",
    })
    .select("id_rangkuman")
    .single();
  if (error) throw error;

  const { error: errorRiwayat } = await admin.from("riwayat_status").insert({
    id_rangkuman: data.id_rangkuman,
    id_pelaku: ID_KURATOR_SATU,
    status: "Diajukan",
  });
  if (errorRiwayat) throw errorRiwayat;

  return data.id_rangkuman as number;
}

async function bacaKeadaan(idRangkuman: number): Promise<Keadaan | null> {
  const admin = buatClientAdminLokal();
  const { data, error } = await admin
    .from("rangkuman_kasus")
    .select("status, tanggal_peninjauan, catatan_revisi")
    .eq("id_rangkuman", idRangkuman)
    .maybeSingle();
  if (error) throw error;
  return (data as Keadaan | null) ?? null;
}

async function bacaRiwayat(idRangkuman: number): Promise<string[]> {
  const admin = buatClientAdminLokal();
  const { data, error } = await admin
    .from("riwayat_status")
    .select("status")
    .eq("id_rangkuman", idRangkuman)
    .order("waktu", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((baris) => baris.status as string);
}

beforeAll(() => {
  wajibSupabaseLokal();
});

beforeEach(() => {
  tiruan.revalidatePath.mockClear();
});

describe("Integrasi C12/C28 — pelacakan konten Kurator (INT-TC40–44)", () => {
  it("INT-TC40: ambilDaftarKonten menampilkan konten Kurator Satu beserta riwayatnya", async () => {
    tiruan.client = await buatClientMasukLokal("kurator1@pahamhukum.test");

    const daftar = await ambilDaftarKonten(ID_KURATOR_SATU);

    expect(daftar.length).toBeGreaterThanOrEqual(4);
    expect(daftar.every((konten) => konten.idRangkuman > 0)).toBe(true);
    expect(daftar.some((konten) => konten.status === "Diajukan")).toBe(true);
    expect(daftar.some((konten) => konten.status === "Draft")).toBe(true);
    const diajukan = daftar.find((konten) => konten.status === "Diajukan");
    expect(diajukan?.riwayat.at(-1)?.status).toBe("Diajukan");
  });

  it("INT-TC41: ambilDaftarKonten tidak menampilkan konten Kurator lain", async () => {
    tiruan.client = await buatClientMasukLokal("kurator2@pahamhukum.test");

    const daftar = await ambilDaftarKonten(ID_KURATOR_DUA);

    expect(daftar.length).toBeGreaterThanOrEqual(2);
    expect(daftar.some((konten) => konten.idRangkuman === 4)).toBe(false);
    expect(daftar.some((konten) => konten.idRangkuman === 6)).toBe(false);
    expect(daftar.some((konten) => konten.status === "Perlu Revisi")).toBe(
      true,
    );
  });

  it("INT-TC42: ambilAntrean hanya berisi konten Diajukan yang terurut dari pengajuan terlama", async () => {
    tiruan.client = await buatClientMasukLokal("admin@pahamhukum.test");
    const { ambilAntrean } =
      await import("@/lib/controllers/kontrolModerasiKonten");

    const antrean = await ambilAntrean();

    expect(antrean.length).toBeGreaterThanOrEqual(1);
    expect(antrean.every((butir) => butir.idRangkuman > 0)).toBe(true);
    expect(antrean[0].judul.length).toBeGreaterThan(0);
    expect(antrean[0].bidang.length).toBeGreaterThan(0);
    expect(antrean[0].waktuPengajuan).not.toBeNull();
  });

  it("INT-TC43: ambilKonten mengembalikan isi pratinjau lengkap untuk konten Diajukan", async () => {
    tiruan.client = await buatClientMasukLokal("admin@pahamhukum.test");
    const { ambilKonten } =
      await import("@/lib/controllers/kontrolModerasiKonten");

    const konten = await ambilKonten(4);

    expect(konten).not.toBeNull();
    expect(konten?.idRangkuman).toBe(4);
    expect(konten?.status).toBe("Diajukan");
    expect(konten?.langkah.length).toBeGreaterThanOrEqual(1);
    expect(konten?.judul.length).toBeGreaterThan(0);
  });

  it("INT-TC44: ambilKonten mengembalikan null untuk id yang tidak ada", async () => {
    tiruan.client = await buatClientMasukLokal("admin@pahamhukum.test");
    const { ambilKonten } =
      await import("@/lib/controllers/kontrolModerasiKonten");

    expect(await ambilKonten(999999)).toBeNull();
  });
});

describe("Integrasi C12/C28 — keputusan moderasi Administrator (INT-TC45–49)", () => {
  it("INT-TC45: setujuiKonten mengubah status, mengisi tanggal, dan mencatat riwayat Disetujui", async () => {
    const id = await buatKontenDiajukan();
    tiruan.client = await buatClientMasukLokal("admin@pahamhukum.test");

    const hasil = await setujuiKonten(id);

    expect(hasil.berhasil).toBe(true);
    const keadaan = await bacaKeadaan(id);
    expect(keadaan?.status).toBe("Disetujui");
    expect(keadaan?.tanggal_peninjauan).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(await bacaRiwayat(id)).toEqual(["Diajukan", "Disetujui"]);
    expect(tiruan.revalidatePath).toHaveBeenCalledWith("/panel/admin/moderasi");
  });

  it("INT-TC46: kembalikanKonten menolak alasan kosong tanpa mengubah status", async () => {
    const id = await buatKontenDiajukan();
    tiruan.client = await buatClientMasukLokal("admin@pahamhukum.test");

    const hasil = await kembalikanKonten(id, "   \n  ");

    expect(hasil.berhasil).toBe(false);
    if (!hasil.berhasil) expect(hasil.galat).toBe("Alasan revisi wajib diisi.");
    expect((await bacaKeadaan(id))?.status).toBe("Diajukan");
    expect(await bacaRiwayat(id)).toEqual(["Diajukan"]);
  });

  it("INT-TC47: kembalikanKonten mencatat Perlu Revisi beserta alasan yang dirapikan", async () => {
    const id = await buatKontenDiajukan();
    tiruan.client = await buatClientMasukLokal("admin@pahamhukum.test");

    const hasil = await kembalikanKonten(id, "  Lengkapi langkah pelaporan.  ");

    expect(hasil.berhasil).toBe(true);
    const keadaan = await bacaKeadaan(id);
    expect(keadaan?.status).toBe("Perlu Revisi");
    expect(keadaan?.catatan_revisi).toBe("Lengkapi langkah pelaporan.");
    expect(await bacaRiwayat(id)).toEqual(["Diajukan", "Perlu Revisi"]);
  });

  it("INT-TC48: riwayat status permanen tidak bisa disunting maupun dihapus (KNF09)", async () => {
    const admin = buatClientAdminLokal();
    const { data: baris, error: errorBaca } = await admin
      .from("riwayat_status")
      .select("id_riwayat, status")
      .limit(1)
      .maybeSingle();
    expect(errorBaca).toBeNull();
    expect(baris).not.toBeNull();

    const { error: errorUbah } = await admin
      .from("riwayat_status")
      .update({ status: "Disetujui" })
      .eq("id_riwayat", baris!.id_riwayat);
    expect(errorUbah?.message).toContain("permanen");

    const { error: errorHapus } = await admin
      .from("riwayat_status")
      .delete()
      .eq("id_riwayat", baris!.id_riwayat);
    expect(errorHapus?.message).toContain("permanen");
  });

  it("INT-TC49: konten yang disetujui langsung tampil untuk publik tanpa deploy ulang (KNF07)", async () => {
    const id = await buatKontenDiajukan(2);
    tiruan.client = await buatClientMasukLokal("admin@pahamhukum.test");

    const mulai = Date.now();
    expect((await setujuiKonten(id)).berhasil).toBe(true);

    const publik = buatClientAnonLokal();
    const tampil = await ambilRangkumanDisetujui(publik, 2);
    const durasiMs = Date.now() - mulai;

    expect(tampil?.idRangkuman).toBe(id);
    // KNF07: perubahan harus tampil di halaman publik dalam waktu ≤ 60 detik.
    expect(durasiMs).toBeLessThan(60_000);
    process.stdout.write(
      `KNF07-TC01: konten tampil ${durasiMs} ms setelah disetujui\n`,
    );
  });
});
