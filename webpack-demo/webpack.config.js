const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

/** @type { import("webpack").Configuration } */
const config = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "bundle.js",
    clean: true,
  },
  devtool: false,
  module: {},
  plugins: [new HtmlWebpackPlugin()],
};

module.exports = () => {
  return config;
};
