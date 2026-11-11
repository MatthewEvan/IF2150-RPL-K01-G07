"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import {
  kembalikanKonten,
  setujuiKonten,
} from "@/lib/controllers/kontrolModerasiKonten";
import { GALAT_ALASAN_KOSONG } from "@/lib/models/riwayatStatus";

function IkonCentang() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IkonPeringatan() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M12 4l9 16H3l9-16z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export type PanelKeputusanProps = {
  idRangkuman: number;
};

/**
 * Panel "Keputusan" I-07-07 sampai I-07-09. Alasan revisi diperiksa di klien
 * agar pesan muncul tanpa menunggu server, lalu diperiksa ulang di Server
 * Action supaya aturannya tetap berlaku walau permintaan dikirim langsung.
 */
export default function PanelKeputusan({ idRangkuman }: PanelKeputusanProps) {
  const router = useRouter();
  const [alasan, setAlasan] = useState("");
  const [galatAlasan, setGalatAlasan] = useState<string>();
  const [galat, setGalat] = useState<string>();
  const [sedangMenyetujui, mulaiMenyetujui] = useTransition();
  const [sedangMengembalikan, mulaiMengembalikan] = useTransition();
  const tertunda = sedangMenyetujui || sedangMengembalikan;

  function pindahSetelahKeputusan(hasil: "disetujui" | "revisi") {
    router.replace(`/panel/admin/moderasi?hasil=${hasil}`);
  }

  function setujui() {
    setGalat(undefined);
    setGalatAlasan(undefined);
    mulaiMenyetujui(async () => {
      try {
        const hasil = await setujuiKonten(idRangkuman);
        if (!hasil.berhasil) {
          setGalat(hasil.galat);
          return;
        }
        pindahSetelahKeputusan("disetujui");
      } catch {
        setGalat("Keputusan gagal disimpan. Coba lagi.");
      }
    });
  }

  function kembalikan() {
    setGalat(undefined);
    if (alasan.trim().length === 0) {
      setGalatAlasan(GALAT_ALASAN_KOSONG);
      return;
    }
    setGalatAlasan(undefined);
    mulaiMengembalikan(async () => {
      try {
        const hasil = await kembalikanKonten(idRangkuman, alasan);
        if (!hasil.berhasil) {
          setGalatAlasan(hasil.galatAlasan);
          setGalat(hasil.galatAlasan ? undefined : hasil.galat);
          return;
        }
        pindahSetelahKeputusan("revisi");
      } catch {
        setGalat("Keputusan gagal disimpan. Coba lagi.");
      }
    });
  }

  return (
    <Card judul="Keputusan">
      <p className="text-sm text-ink-muted">
        Setujui agar konten langsung tayang untuk publik, atau kembalikan ke
        Kurator dengan alasan yang jelas.
      </p>

      <div className="mt-4 flex flex-col gap-4">
        <Textarea
          label="Alasan revisi"
          name="alasanRevisi"
          petunjuk="Wajib diisi jika mengembalikan konten ke Kurator."
          galat={galatAlasan}
          value={alasan}
          onChange={(event) => {
            setAlasan(event.target.value);
            if (galatAlasan) setGalatAlasan(undefined);
          }}
          rows={4}
          disabled={tertunda}
        />

        {galat ? (
          <p role="alert" className="text-sm font-medium text-danger">
            {galat}
          </p>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row-reverse sm:justify-start">
          <Button
            onClick={setujui}
            ikonKiri={<IkonCentang />}
            disabled={tertunda}
            className="sm:flex-1"
          >
            {sedangMenyetujui ? "Menyetujui…" : "Setujui dan tayangkan"}
          </Button>
          <Button
            varian="secondary"
            onClick={kembalikan}
            ikonKiri={<IkonPeringatan />}
            disabled={tertunda}
            className="sm:flex-1"
          >
            {sedangMengembalikan ? "Mengembalikan…" : "Kembalikan"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
