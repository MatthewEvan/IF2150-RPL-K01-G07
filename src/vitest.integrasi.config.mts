import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    globals: true,
    include: ["tests/integrasi/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/integrasi/setupEnv.ts"],
    testTimeout: 15000,
    fileParallelism: false,
  },
});
