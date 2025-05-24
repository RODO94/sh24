import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    globals: true,
    css: true,
    setupFiles: ["./setup-tests.ts"],
    environment: "jsdom",
  },
  plugins: [react()],
});
