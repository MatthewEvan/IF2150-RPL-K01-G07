import Badge, { type StatusKonten } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

type PanelStatusKontenProps = {
  status: StatusKonten;
  bisaDisimpan: boolean;
  bisaDiajukan: boolean;
  sedangMenyimpan: boolean;
  sedangMengajukan: boolean;
  galat?: string;
  pesanBerhasil?: string;
};

function IkonKirim() {
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
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

export default function PanelStatusKonten({
  status,
  bisaDisimpan,
  bisaDiajukan,
  sedangMenyimpan,
  sedangMengajukan,
  galat,
  pesanBerhasil,
}: PanelStatusKontenProps) {
  const sedangBerjalan = sedangMenyimpan || sedangMengajukan;

  return (
    <aside className="flex flex-col gap-4 rounded-xl border border-line bg-surface-raised p-6 shadow-sm lg:sticky lg:top-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
          Status konten
        </p>
        <Badge status={status} className="self-start" />
        <p className="text-sm text-ink-muted">
          Konten baru tampil untuk publik setelah disetujui Administrator.
        </p>
      </div>
      {galat ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {galat}
        </p>
      ) : null}
      {pesanBerhasil ? (
        <p aria-live="polite" className="text-sm font-medium text-success">
          {pesanBerhasil}
        </p>
      ) : null}
      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          name="aksi"
          value="simpan"
          varian="secondary"
          className="w-full"
          disabled={!bisaDisimpan || sedangBerjalan}
        >
          {sedangMenyimpan ? "Menyimpan…" : "Simpan draf"}
        </Button>
        <Button
          type="submit"
          name="aksi"
          value="ajukan"
          ikonKiri={<IkonKirim />}
          className="w-full"
          disabled={!bisaDiajukan || sedangBerjalan}
        >
          {sedangMengajukan ? "Mengajukan…" : "Ajukan untuk ditinjau"}
        </Button>
      </div>
    </aside>
  );
}
