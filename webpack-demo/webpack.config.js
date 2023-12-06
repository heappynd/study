const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const smp = new SpeedMeasurePlugin();

/** @type { import("webpack").Configuration } */
const config = {
  mode: "development",
  entry: {
    index: {
      import: "./src/index.js",
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "bundle.js",
    clean: true,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  optimization: {
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      minSize: 1,
      cacheGroups: {
        // defaultVendors: false,
        reactVendor: {
          test: /node_modules\/react/,
          reuseExistingChunk: true,
          priority: 120,
        },
        axiosVendor: {
          test: /node_modules\/axios/,
          reuseExistingChunk: true,
          priority: 120,
        },
      },
    },
  },
};

module.exports = () => {
  // return smp.wrap(config);
  return config;
};
