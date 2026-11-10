import type { ReactNode } from "react";

export type KolomTabel<T> = {
  /** Nama atribut pada data yang ditampilkan sebagai teks biasa. */
  kunci: keyof T & string;
  /** Judul kolom. */
  judul: string;
  /** Pengganti tampilan sel, misalnya untuk lencana atau tautan. */
  sel?: (baris: T, indeks: number) => ReactNode;
  /** Perataan isi sel. Bawaan: kiri. */
  rata?: "kiri" | "kanan";
};

export type TableProps<T> = {
  kolom: KolomTabel<T>[];
  data: T[];
  /** Kunci stabil tiap baris; bawaan memakai indeks. */
  kunciBaris?: (baris: T, indeks: number) => string | number;
  /** Pesan saat data kosong. */
  pesanKosong?: string;
  /** Keterangan tabel untuk pembaca layar. */
  keterangan?: string;
};

const GAYA_RATA = {
  kiri: "text-left",
  kanan: "text-right",
} as const;

export default function Table<T>({
  kolom,
  data,
  kunciBaris,
  pesanKosong = "Belum ada data.",
  keterangan,
}: TableProps<T>) {
  const ambilKunci = (baris: T, indeks: number) =>
    kunciBaris ? kunciBaris(baris, indeks) : indeks;

  const isiSel = (kolomTabel: KolomTabel<T>, baris: T, indeks: number) =>
    kolomTabel.sel
      ? kolomTabel.sel(baris, indeks)
      : String(baris[kolomTabel.kunci] ?? "");

  return (
    <>
      <div className="flex flex-col gap-3 md:hidden">
        {data.length === 0 ? (
          <p className="rounded-lg border border-line bg-surface-raised p-4 text-sm text-ink-muted">
            {pesanKosong}
          </p>
        ) : (
          data.map((baris, indeks) => (
            <div
              key={ambilKunci(baris, indeks)}
              className="rounded-lg border border-line bg-surface-raised p-4"
            >
              {kolom.map((kolomTabel) => (
                <div
                  key={kolomTabel.kunci}
                  className="flex items-start justify-between gap-4 py-1"
                >
                  <span className="text-xs font-medium text-ink-muted">
                    {kolomTabel.judul}
                  </span>
                  <span className="text-right text-sm text-ink">
                    {isiSel(kolomTabel, baris, indeks)}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      <div className="hidden overflow-x-auto rounded-lg border border-line bg-surface-raised md:block">
        <table className="w-full border-collapse text-sm">
          {keterangan && <caption className="sr-only">{keterangan}</caption>}
          <thead className="bg-surface-sunken text-xs text-ink-muted uppercase">
            <tr>
              {kolom.map((kolomTabel) => (
                <th
                  key={kolomTabel.kunci}
                  scope="col"
                  className={`px-4 py-3 font-semibold whitespace-nowrap ${
                    GAYA_RATA[kolomTabel.rata ?? "kiri"]
                  }`}
                >
                  {kolomTabel.judul}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={kolom.length}
                  className="px-4 py-6 text-center text-ink-muted"
                >
                  {pesanKosong}
                </td>
              </tr>
            ) : (
              data.map((baris, indeks) => (
                <tr
                  key={ambilKunci(baris, indeks)}
                  className="border-t border-line hover:bg-surface-raised-hover"
                >
                  {kolom.map((kolomTabel) => (
                    <td
                      key={kolomTabel.kunci}
                      className={`px-4 py-3 align-top ${
                        GAYA_RATA[kolomTabel.rata ?? "kiri"]
                      }`}
                    >
                      {isiSel(kolomTabel, baris, indeks)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
