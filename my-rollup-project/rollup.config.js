import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

/** @type {import("rollup").RollupOptions} */
export default {
  input: 'src/main.js',
  output: [
    {
      format: 'iife',
      file: 'dist/main.js',
    },
  ],
  plugins: [nodeResolve(), commonjs()],
}
