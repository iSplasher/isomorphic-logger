import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  skipNodeModulesBundle: true,
  treeshake: true,
  shims: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  format: ["cjs"],
  target: [
    "es6",
    // "hermes0.73",
  ],
  bundle: true,
  // dts: true,
});
