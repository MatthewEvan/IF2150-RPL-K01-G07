import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KotakDisclaimer from "@/components/beranda/KotakDisclaimer";
import BagianBacaan from "@/components/kasus/BagianBacaan";
import BagianChecklist from "@/components/kasus/BagianChecklist";
import BagianHak from "@/components/kasus/BagianHak";
import BagianIntiMasalah from "@/components/kasus/BagianIntiMasalah";
import BagianLangkah from "@/components/kasus/BagianLangkah";
import BagianPertimbangan from "@/components/kasus/BagianPertimbangan";
import BagianTemplat from "@/components/kasus/BagianTemplat";
import DirektoriLBH from "@/components/kasus/DirektoriLBH";
import KepalaRangkuman from "@/components/kasus/KepalaRangkuman";
import NavigasiBagian from "@/components/kasus/NavigasiBagian";
import { formatTanggal } from "@/components/kasus/format";
import { IkonPerisai } from "@/components/kasus/ikon";
import {
  ambilDaftarLBH,
  ambilDaftarWilayah,
  ambilRangkuman,
} from "@/lib/controllers/kontrolJelajahKasus";

/** Id rangkuman di URL adalah idKelompok, sesuai tautan dari beranda. */
async function muatRangkuman(params: PageProps<"/kasus/[id]">["params"]) {
  const { id } = await params;
  const idKelompok = Number(id);
  if (!Number.isInteger(idKelompok) || idKelompok <= 0) return null;
  return ambilRangkuman(idKelompok);
}

export async function generateMetadata({
  params,
}: PageProps<"/kasus/[id]">): Promise<Metadata> {
  const rangkuman = await muatRangkuman(params);
  return {
    title: rangkuman ? `${rangkuman.judulUmum} | PahamHukum` : undefined,
  };
}

export default async function HalamanRangkumanKasus({
  params,
  searchParams,
}: PageProps<"/kasus/[id]">) {
  const rangkuman = await muatRangkuman(params);
  if (!rangkuman) notFound();

  const { wilayah } = await searchParams;
  const daftarWilayah = await ambilDaftarWilayah();
  const wilayahTerpilih =
    daftarWilayah.find((item) => item === wilayah) ?? daftarWilayah[0];
  const daftarLBH = wilayahTerpilih
    ? await ambilDaftarLBH(wilayahTerpilih)
    : [];

  const penanda = [
    rangkuman.namaPenulis && `Disusun oleh ${rangkuman.namaPenulis} (Kurator)`,
    rangkuman.tanggalPeninjauan &&
      `Ditinjau ${formatTanggal(rangkuman.tanggalPeninjauan)}`,
  ].filter(Boolean);

  return (
    <main className="mx-auto flex w-full max-w-280 flex-col gap-3 px-5 pt-2 pb-16">
      <KepalaRangkuman rangkuman={rangkuman} />
      <NavigasiBagian />

      <BagianIntiMasalah isi={rangkuman.intiMasalah} />
      <BagianHak isi={rangkuman.hak} />
      <BagianLangkah daftarLangkah={rangkuman.daftarLangkah} />
      <BagianPertimbangan isi={rangkuman.poinPertimbangan} />
      <BagianChecklist
        idRangkuman={rangkuman.idRangkuman}
        daftarDokumen={rangkuman.daftarDokumen}
      />
      <BagianTemplat daftarTemplat={rangkuman.daftarTemplat} />
      <BagianBacaan daftarArtikel={rangkuman.daftarArtikel}>
        <DirektoriLBH
          daftarWilayah={daftarWilayah}
          wilayahTerpilih={wilayahTerpilih}
          daftarLBH={daftarLBH}
        />
      </BagianBacaan>

      {/* Nama Kurator dan tanggal peninjauan Administrator (KF10). */}
      {penanda.length > 0 && (
        <p className="mt-3 flex items-start gap-2 text-sm text-ink-muted">
          <IkonPerisai className="mt-0.5 size-4 shrink-0" />
          {penanda.join(" · ")}
        </p>
      )}
      <KotakDisclaimer />
    </main>
  );
}
