const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

/** @type { import("webpack").Configuration } */
const config = {
  mode: "development",
  entry: {},
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "bundle.js",
  },
  devtool: false,
  module: {},
  plugins: [],
};

module.exports = () => {
  const entryFiles = glob.sync("./src/**/index.js");
  console.log(entryFiles);
  const entrys = {};
  const htmlWebpackPlugins = [];
  entryFiles.forEach((file) => {
    // TODO: only support windows
    const res = file.match(/\\(.*)\\index\.js/);
    console.log(res);
    entrys[res[1]] = {
      import: "./" + file,
    };

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        filename: res[1] + ".html",
        chunks: [res[1]],
      })
    );
  });

  config.entry = entrys;
  console.log(entrys);
  console.log(htmlWebpackPlugins);
  config.plugins = htmlWebpackPlugins.concat(config.plugins);

  return config;
};
