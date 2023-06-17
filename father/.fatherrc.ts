import { defineConfig } from "father";

export default defineConfig({
  esm: {
    input: "src",
    platform: "browser",
    transformer: "swc",
  },
  // umd: {
  //   entry: "src/index",
  // },
});
