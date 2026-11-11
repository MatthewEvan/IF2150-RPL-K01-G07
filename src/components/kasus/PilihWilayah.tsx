"use client";

import { usePathname, useRouter } from "next/navigation";
import Select from "@/components/ui/Select";

type Props = {
  daftarWilayah: string[];
  wilayahTerpilih: string;
};

/** C14 pilihWilayah: wilayah disimpan di URL agar daftar LBH disaring server. */
export default function PilihWilayah({
  daftarWilayah,
  wilayahTerpilih,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      label="Wilayah"
      defaultValue={wilayahTerpilih}
      onChange={(event) =>
        router.replace(
          `${pathname}?wilayah=${encodeURIComponent(event.target.value)}`,
          { scroll: false },
        )
      }
    >
      {daftarWilayah.map((wilayah) => (
        <option key={wilayah} value={wilayah}>
          {wilayah}
        </option>
      ))}
    </Select>
  );
}
