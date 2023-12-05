const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/** @type { import("webpack").Configuration } */
module.exports = {
  // mode: "production",
  mode: "development",
  // context: '',
  /**
   * @default 'src/index.js' output 'dist/main.js'
   * webpack.config.js
   */
  // entry: "./src/index.js",
  // entry: ["./src/index.js", "./src/foo.js"],
  entry: {
    index: {
      import: "./src/index.js",
      // dependOn: "react-vendor",
    },
    // "react-vendor": "react",
    // "react-vendor": ["react", "redux"],
    // foo: {
    //   import: "./src/foo.js",
    //   filename: "app.js",
    // },
  },
  output: {
    // abs path
    path: path.resolve(__dirname, "dist"),
    // 按需加载或外部资源的真实路径，默认为相对路径
    // publicPath: "https://a.b.c/assets",
    // filename: "test-demo.js",
    // crossOriginLoading: 'anonymous'
    // assetModuleFilename: ''
    // chunkFilename: "asset_[id].js",
    // library: 'my_lib'
    // library: {
    //   name: "my_libx",
    //   type: "umd",
    //   // export: ''
    //   auxiliaryComment: "Todo:xxx",
    //   umdNamedDefine: false
    // },
  },

  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      // title: "Html demo",
      // filename: 'a.html'
      // templateParameters: {
      // titleName: "title2",
      // },
      // publicPath: ''
      // minify: {
      //   removeComments: true,
      // },
    }),
    new MiniCssExtractPlugin({
      // filename: "[name].css",
      // chunk 不是直接加载的 比如异步的
      // chunkFilename: "[name].css",
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        // 匹配的是输出 不是源文件
        // test: /index\.css$/,
      }),
    ],
  },
  // devtool: "nosources-source-map",
  // devtool: "hidden-nosources-source-map",
  devtool: "source-map",
  devServer: {
    client: {
      // overlay: false,
      progress: false,
    },
    compress: true,
    // allowedHosts: [''],
    // host: '0.0.0.0',
    hot: "only",
    proxy: {
      // api: "http://localhost:3000",
      "/api/*": {
        target: "http://localhost:3000",
        // pathRewrite: {
        //   "^/api": "",
        // },
        bypass: (req, res, proxyOptions) => {
          if (req.url.includes("test2")) {
            return "/";
          }
        },
        // secure: false
      },
    },
    // server: "https",
    // static: ['assets']
    static: {
      directory: path.resolve(__dirname, "assets"),
      // publicPath: 'http://a.b.c/aas'
    },
  },
};

// module.exports = (env, args) => {};
// webpack --mode=development
