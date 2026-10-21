# Sumber PlantUML — Diagram Sekuens Milestone 7

Folder ini menyimpan sumber PlantUML (`.puml`) dari diagram sekuens pada
Milestone 7 yang dibuat dengan PlantUML. Berkas `.svg` yang dipakai pada
dokumen DPPL dihasilkan dari berkas `.puml` di folder ini.

## Menghasilkan ulang SVG

```bash
# plantuml.jar dapat diunduh dari https://plantuml.com/download
java -Djava.awt.headless=true -jar plantuml.jar -tsvg -charset UTF-8 \
     docs/M7/assets/diagram/puml/SequenceDiagram_UC01_Skenario_Alternatif_1.puml

# hasil: docs/M7/assets/diagram/puml/SequenceDiagram_UC01_Skenario_Alternatif_1.svg
# pindahkan ke ../SequenceDiagram_UC01_Skenario_Alternatif_1.svg
```

Diagram yang berasal dari draw.io tetap berada satu level di atas folder ini
(`docs/M7/assets/diagram/`) sehingga penyuntingan visual dapat dilakukan
melalui draw.io seperti diagram sekuens Milestone 7 lainnya.

Setelah hasil render dipindahkan ke folder di atas, tambahkan atribut
`data-diagram-type="SEQUENCE"` pada elemen `<svg>` agar konsisten dengan
diagram sekuens lain yang diekspor melalui draw.io:

```xml
<svg xmlns="http://www.w3.org/2000/svg" data-diagram-type="SEQUENCE" ...>
```

## Catatan sintaks

Nama kelas pada diagram sekuens PahamHukum mengandung spasi, sehingga harus
menggunakan alias agar pesan dapat dirujuk dengan benar:

```plantuml
actor "Pencari Informasi" as PencariInformasi
participant "HalamanJelajahKasus" as HalamanJelajahKasus
```

Tanpa alias, PlantUML akan menampilkan `Syntax Error?` pada baris
pendeklarasian kelas maupun pada baris pemanggilan metodenya.
