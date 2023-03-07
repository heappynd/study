import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

// rollup.config.js
export default {
  input: "src/main.js",
  output: [
    {
      file: "bundle.js",
      format: "cjs",
    },
    {
      file: 'bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ],
  plugins: [json()]
};
