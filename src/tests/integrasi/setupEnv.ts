import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

function parseEnvStatus(keluaran: string): Record<string, string> {
  const hasil: Record<string, string> = {};
  for (const baris of keluaran.split(/\r?\n/)) {
    const cocok = baris.match(/^([A-Z0-9_]+)="(.*)"$/);
    if (cocok) {
      hasil[cocok[1]] = cocok[2];
    }
  }
  return hasil;
}

const jalurEnvTest = path.join(process.cwd(), ".env.test");
if (existsSync(jalurEnvTest)) {
  process.loadEnvFile(jalurEnvTest);
}

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
) {
  try {
    const keluaran = execSync("npx --no supabase status -o env", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const envStatus = parseEnvStatus(keluaran);
    process.env.NEXT_PUBLIC_SUPABASE_URL ||= envStatus.API_URL ?? "";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||= envStatus.ANON_KEY ?? "";
    process.env.SUPABASE_SERVICE_ROLE_KEY ||= envStatus.SERVICE_ROLE_KEY ?? "";
  } catch {
    // Akan ditangani pada pemeriksaan variabel wajib di bawah.
  }
}

const wajib = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];
const hilang = wajib.filter((kunci) => !process.env[kunci]?.trim());

if (hilang.length > 0) {
  throw new Error(
    `Variabel lingkungan untuk integration test belum lengkap (${hilang.join(", ")}). ` +
      "Pastikan Docker menyala dan jalankan `npx supabase start`, atau buat `.env.test` dari `.env.test.example` menggunakan nilai dari `npx supabase status -o env`.",
  );
}
