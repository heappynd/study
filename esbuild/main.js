import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.js"],
  bundle: true,
  outdir: 'dist'
  //   outfile: "bundle.js",
  //   minify: true,
  //   sourcemap: true,
  //   external: [],
  //   platform: 'node'
  //   target: ["chrome100"],
});
