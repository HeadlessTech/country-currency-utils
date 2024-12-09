import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/add.ts", "src/subtract.ts", "src/index.ts"],
  format: ["esm", "cjs", "iife"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
});
