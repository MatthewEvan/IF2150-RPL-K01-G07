import { BAGIAN } from "./bagian";
import ChecklistDokumen from "./ChecklistDokumen";
import KartuBagian from "./KartuBagian";

export default function BagianChecklist({
  idRangkuman,
  daftarDokumen,
}: {
  idRangkuman: number;
  daftarDokumen: string[];
}) {
  return (
    <KartuBagian bagian={BAGIAN.dokumen}>
      <ChecklistDokumen
        idRangkuman={idRangkuman}
        daftarDokumen={daftarDokumen}
      />
    </KartuBagian>
  );
}
