"use client";

import { useActionState, useState } from "react";
import Button from "@/components/ui/Button";
import Callout from "@/components/ui/Callout";
import Input from "@/components/ui/Input";

export type HasilLogin = { galat?: string };

type FormLoginProps = {
  aksi: (hasil: HasilLogin, data: FormData) => Promise<HasilLogin>;
  /** Pesan dari luar formulir, misalnya saat sesi berakhir. */
  pesanAwal?: string;
};

export default function FormLogin({ aksi, pesanAwal }: FormLoginProps) {
  const [hasil, jalankanAksi, sedangMengirim] = useActionState(aksi, {});
  const pesanGalat = hasil.galat ?? pesanAwal;
  // Dikendalikan state agar email tidak ikut terhapus saat React 19
  // mengosongkan formulir setelah login gagal.
  const [email, setEmail] = useState("");

  return (
    <form action={jalankanAksi} className="mt-4 flex flex-col gap-4">
      {pesanGalat && (
        <div role="alert">
          <Callout jenis="bahaya">{pesanGalat}</Callout>
        </div>
      )}
      <Input
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        label="Kata sandi"
        type="password"
        name="kataSandi"
        required
        autoComplete="current-password"
      />
      <Button type="submit" disabled={sedangMengirim} className="w-full">
        {sedangMengirim ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
