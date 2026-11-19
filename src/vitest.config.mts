import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/**/*.test.{ts,tsx}"],
    exclude: ["tests/integrasi/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      include: [
        "lib/controllers/**/*.ts",
        "lib/models/**/*.ts",
        "proxy.ts",
        "components/konten/aturanDaftarButir.ts",
        "components/konten/useDaftarButir.ts",
      ],
    },
  },
});
