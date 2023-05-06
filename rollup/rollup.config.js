// rollup.config.js
import { defineConfig } from 'rollup'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  /* 你的配置 */
  input: 'src/main.ts',
  // output: {
  //   file: "dist/bundle.js",
  //   format: "esm",
  // },
  output: [
    {
      // file: 'bundle.js',
      format: 'esm',
      dir: 'dist',
    },
    {
      format: 'cjs',
      dir: 'dist/cjs',
    },
    // {
    // file: 'bundle.min.js',
    // format: 'iife',
    // name: 'version',
    // dir: 'dist',
    // plugins: [terser()]
    // },
  ],
  plugins: [json()],
})
