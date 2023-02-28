const path = require("path");
const { WebpackRunPlugin, WebpackDonePlugin } = require("./plugins");
const { loader1, loader2 } = require("./loaders");

module.exports = {
  mode: "development", //防止代码被压缩
  entry: "./src/index.js", //入口文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [new WebpackRunPlugin(), new WebpackDonePlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [loader1, loader2],
      },
    ],
  },
  devtool: "source-map", //防止干扰源文件
};
