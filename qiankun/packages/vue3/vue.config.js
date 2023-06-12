const path = require("path");
const { name } = require("./package");
const { defineConfig } = require("@vue/cli-service");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 7105;

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
});
