import { defineConfig } from "rollup";
import sucrase from "@rollup/plugin-sucrase";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  input: "app.jsx",
  output: {
    file: "bundle.js",
    format: "cjs",
  },
  plugins: [
    resolve({
      extensions: [".jsx"],
    }),
    sucrase({
      transforms: ["jsx"],
    }),
    commonjs(),
  ],
});
