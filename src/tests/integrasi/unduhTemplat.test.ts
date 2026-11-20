import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  ambilDaftarTemplat,
  unduhTemplat,
} from "@/lib/controllers/kontrolUnduhTemplat";
import { BUCKET_TEMPLAT } from "@/lib/models/templatDokumen";
import { buatClientServer } from "@/lib/supabase/server";
import {
  buatClientAdminLokal,
  buatClientAnonLokal,
  wajibSupabaseLokal,
} from "./supabaseLokal";

vi.mock("@/lib/supabase/server", () => ({
  buatClientServer: vi.fn(),
}));

const ID_TEMPLAT_UJI: number[] = [];
const LOKASI_BERKAS_UJI: string[] = [];

const ISI_PDF_UJI = "%PDF-1.4\n1 0 obj <<>> endobj\n%%EOF\n";
const ISI_DOCX_UJI = "PK\x03\x04templat-uji-integrasi-docx";

let idTemplatPdfDisetujui = 0;
let idTemplatDocxDisetujui = 0;
let idTemplatDraft = 0;
let idTemplatTanpaBerkas = 0;
let idTemplatPathHilang = 0;

beforeAll(async () => {
  wajibSupabaseLokal();
  const admin = buatClientAdminLokal();
  const penanda = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  // 1. Unggah berkas PDF nyata untuk rangkuman Disetujui (id_rangkuman = 1 di seed).
  const lokasiPdf = `1/int-uji-${penanda}.pdf`;
  const unggahPdf = await admin.storage
    .from(BUCKET_TEMPLAT)
    .upload(lokasiPdf, Buffer.from(ISI_PDF_UJI, "utf8"), {
      contentType: "application/pdf",
      upsert: false,
    });
  if (unggahPdf.error) throw unggahPdf.error;
  LOKASI_BERKAS_UJI.push(lokasiPdf);

  const { data: barisPdf, error: galatPdf } = await admin
    .from("templat_dokumen")
    .insert({
      id_rangkuman: 1,
      nama_berkas: `int-penagihan-${penanda}.pdf`,
      format: "PDF",
      ukuran: Buffer.byteLength(ISI_PDF_UJI, "utf8"),
      versi: "1",
      tanggal_pembaruan: "2026-10-20",
      lokasi_berkas: lokasiPdf,
    })
    .select("id_templat")
    .single();
  if (galatPdf) throw galatPdf;
  idTemplatPdfDisetujui = barisPdf.id_templat;
  ID_TEMPLAT_UJI.push(idTemplatPdfDisetujui);

  // 2. Unggah berkas DOCX nyata untuk rangkuman Disetujui (id_rangkuman = 1).
  const lokasiDocx = `1/int-uji-${penanda}.docx`;
  const unggahDocx = await admin.storage
    .from(BUCKET_TEMPLAT)
    .upload(lokasiDocx, Buffer.from(ISI_DOCX_UJI, "utf8"), {
      contentType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      upsert: false,
    });
  if (unggahDocx.error) throw unggahDocx.error;
  LOKASI_BERKAS_UJI.push(lokasiDocx);

  const { data: barisDocx, error: galatDocx } = await admin
    .from("templat_dokumen")
    .insert({
      id_rangkuman: 1,
      nama_berkas: `int-perundingan-${penanda}.docx`,
      format: "DOCX",
      ukuran: Buffer.byteLength(ISI_DOCX_UJI, "utf8"),
      versi: "2",
      tanggal_pembaruan: "2026-10-21",
      lokasi_berkas: lokasiDocx,
    })
    .select("id_templat")
    .single();
  if (galatDocx) throw galatDocx;
  idTemplatDocxDisetujui = barisDocx.id_templat;
  ID_TEMPLAT_UJI.push(idTemplatDocxDisetujui);

  // 3. Unggah berkas PDF untuk rangkuman berstatus Draft (id_rangkuman = 6 di seed).
  const lokasiDraft = `6/int-draft-${penanda}.pdf`;
  const unggahDraft = await admin.storage
    .from(BUCKET_TEMPLAT)
    .upload(lokasiDraft, Buffer.from(ISI_PDF_UJI, "utf8"), {
      contentType: "application/pdf",
      upsert: false,
    });
  if (unggahDraft.error) throw unggahDraft.error;
  LOKASI_BERKAS_UJI.push(lokasiDraft);

  const { data: barisDraft, error: galatDraft } = await admin
    .from("templat_dokumen")
    .insert({
      id_rangkuman: 6,
      nama_berkas: `int-draft-${penanda}.pdf`,
      format: "PDF",
      ukuran: Buffer.byteLength(ISI_PDF_UJI, "utf8"),
      versi: "1",
      tanggal_pembaruan: "2026-11-01",
      lokasi_berkas: lokasiDraft,
    })
    .select("id_templat")
    .single();
  if (galatDraft) throw galatDraft;
  idTemplatDraft = barisDraft.id_templat;
  ID_TEMPLAT_UJI.push(idTemplatDraft);

  // 4. Baris templat pada rangkuman Disetujui tanpa berkas (lokasi_berkas = null).
  const { data: barisNull, error: galatNull } = await admin
    .from("templat_dokumen")
    .insert({
      id_rangkuman: 2,
      nama_berkas: `int-kosong-${penanda}.docx`,
      format: "DOCX",
      ukuran: 1024,
      versi: "1",
      tanggal_pembaruan: "2026-10-22",
      lokasi_berkas: null,
    })
    .select("id_templat")
    .single();
  if (galatNull) throw galatNull;
  idTemplatTanpaBerkas = barisNull.id_templat;
  ID_TEMPLAT_UJI.push(idTemplatTanpaBerkas);

  // 5. Baris templat dengan lokasi_berkas yang tidak ada di Supabase Storage.
  const { data: barisHilang, error: galatHilang } = await admin
    .from("templat_dokumen")
    .insert({
      id_rangkuman: 2,
      nama_berkas: `int-hilang-${penanda}.pdf`,
      format: "PDF",
      ukuran: 512,
      versi: "1",
      tanggal_pembaruan: "2026-10-22",
      lokasi_berkas: `2/tidak-ada-${penanda}.pdf`,
    })
    .select("id_templat")
    .single();
  if (galatHilang) throw galatHilang;
  idTemplatPathHilang = barisHilang.id_templat;
  ID_TEMPLAT_UJI.push(idTemplatPathHilang);
});

afterAll(async () => {
  const admin = buatClientAdminLokal();
  if (ID_TEMPLAT_UJI.length > 0) {
    await admin
      .from("templat_dokumen")
      .delete()
      .in("id_templat", ID_TEMPLAT_UJI);
  }
  if (LOKASI_BERKAS_UJI.length > 0) {
    await admin.storage.from(BUCKET_TEMPLAT).remove(LOKASI_BERKAS_UJI);
  }
});

beforeEach(() => {
  vi.mocked(buatClientServer).mockResolvedValue(
    buatClientAnonLokal() as unknown as Awaited<
      ReturnType<typeof buatClientServer>
    >,
  );
});

describe("Integrasi C24 KontrolUnduhTemplat ke Supabase DB & Storage (INT-TC25 s.d. INT-TC28)", () => {
  it("INT-TC25: klien anonim mendapat signed URL berkas PDF pada rangkuman Disetujui dan berhasil mengunduh isinya (KF16)", async () => {
    const hasil = await unduhTemplat(idTemplatPdfDisetujui, 1);

    expect(hasil.berhasil).toBe(true);
    if (!hasil.berhasil) return;

    expect(hasil.namaBerkas).toMatch(/\.pdf$/);
    const respons = await fetch(hasil.urlUnduh);
    expect(respons.status).toBe(200);
    expect(await respons.text()).toBe(ISI_PDF_UJI);
  });

  it("INT-TC26: ambilDaftarTemplat memuat metadata templat dan klien anonim dapat mengunduh berkas DOCX versi terbaru (KF15, KF16)", async () => {
    const daftar = await ambilDaftarTemplat(1);
    const itemDocx = daftar.find(
      (item) => item.idTemplat === idTemplatDocxDisetujui,
    );
    expect(itemDocx).toMatchObject({
      format: "DOCX",
      versi: "2",
      ukuran: Buffer.byteLength(ISI_DOCX_UJI, "utf8"),
    });

    const hasil = await unduhTemplat(idTemplatDocxDisetujui);
    expect(hasil.berhasil).toBe(true);
    if (!hasil.berhasil) return;

    const respons = await fetch(hasil.urlUnduh);
    expect(respons.status).toBe(200);
    expect(await respons.text()).toBe(ISI_DOCX_UJI);
  });

  it("INT-TC27: menolak unduhan templat milik rangkuman berstatus Draft untuk klien anonim (KF02)", async () => {
    const hasil = await unduhTemplat(idTemplatDraft);

    expect(hasil).toEqual({
      berhasil: false,
      galat: "Berkas templat tidak tersedia.",
    });
  });

  it("INT-TC28: mengembalikan pesan tidak tersedia saat lokasi_berkas kosong atau objek tidak ditemukan di Storage", async () => {
    const hasilNull = await unduhTemplat(idTemplatTanpaBerkas);
    const hasilHilang = await unduhTemplat(idTemplatPathHilang);

    expect(hasilNull).toEqual({
      berhasil: false,
      galat: "Berkas templat tidak tersedia.",
    });
    expect(hasilHilang).toEqual({
      berhasil: false,
      galat: "Berkas templat tidak tersedia.",
    });
  });
});
