import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: true,
  sourcemap: true,
  clean: true,
  format: ["cjs", "esm", "iife"],
  target: [
    "es6",
    "deno1",
    "chrome58",
    "edge16",
    "firefox57",
    "safari11",
    "node12",
    "ios16.6",
    // "hermes0.73",
  ],
  bundle: false,
  // dts: true,
});
