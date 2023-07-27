// rollup.config.js
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions} */
export default {
  input: "./src/index.ts",
  output: {
    // file: "bundle.js",
    format: "cjs",
    dir: 'dist'
  },
  plugins: [json(), typescript()],
};
