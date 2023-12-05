const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type { import("webpack").Configuration } */
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "bundle.js",
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    // {
                    //   browser: ["ie > 8"],
                    // },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     // minChunks: 0,
  //     // minSize: 200000000,
  //   },
  // },
  externals: {
    // jquery1: "jQuery",
    // axios: "axios",
    axios: [
      "https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.min.js",
      "axios",
    ],
  },
  externalsType: "script",
};
