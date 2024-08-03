import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm"],
  },
  {
    entry: ["src/browser.ts"],
    format: ["iife"],
  },
  {
    entry: ["cli/main.ts"],
    format: "esm",
    banner: {
      js: "#! /usr/bin/env node",
    },
  },
]);
