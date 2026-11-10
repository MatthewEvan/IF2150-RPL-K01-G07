import { IkonInfo, IkonTelepon } from "./ikon";

export default function KotakDisclaimer() {
  return (
    <aside className="flex gap-4 rounded-xl border border-line bg-surface-raised p-5 shadow-sm">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-surface-sunken text-ink-muted">
        <IkonInfo className="size-5" />
      </span>
      <div>
        <p className="font-semibold text-ink">
          Ini panduan langkah awal, bukan nasihat hukum
        </p>
        <p className="mt-2 text-ink">
          PahamHukum membantu kamu memahami situasi dan menyiapkan langkah.
          Untuk keputusan penting, konsultasikan dengan lembaga bantuan hukum
          atau advokat.
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
          <IkonTelepon className="size-4 shrink-0" />
          Dalam keadaan darurat atau terancam, hubungi 112.
        </p>
      </div>
    </aside>
  );
}
