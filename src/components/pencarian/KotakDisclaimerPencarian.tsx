import { IkonInfo, IkonTelepon } from "./ikon";

/**
 * Kotak disclaimer hukum pada bagian bawah layar I-03 sesuai KF19 dan mockup Figma.
 */
export default function KotakDisclaimerPencarian() {
  return (
    <aside className="flex w-full items-start gap-3 rounded-xl bg-surface-raised p-5 shadow-sm">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-surface-sunken text-ink-muted">
        <IkonInfo className="size-5" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-base font-semibold text-ink">
          Ini panduan langkah awal, bukan nasihat hukum
        </p>
        <p className="text-base text-ink">
          PahamHukum membantu kamu memahami situasi dan menyiapkan langkah.
          Untuk keputusan penting, konsultasikan dengan lembaga bantuan hukum
          atau advokat.
        </p>
        <p className="flex items-center gap-2 text-sm text-ink-muted">
          <IkonTelepon className="size-4 shrink-0" />
          <span>Dalam keadaan darurat atau terancam, hubungi 112.</span>
        </p>
      </div>
    </aside>
  );
}
