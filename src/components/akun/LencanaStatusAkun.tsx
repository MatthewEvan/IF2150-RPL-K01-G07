export default function LencanaStatusAkun({ aktif }: { aktif: boolean }) {
  return (
    <span
      className={`inline-flex rounded-pill px-3 py-1 text-sm font-semibold ${
        aktif ? "bg-success-soft text-success" : "bg-surface-sunken text-ink"
      }`}
    >
      {aktif ? "Aktif" : "Nonaktif"}
    </span>
  );
}
