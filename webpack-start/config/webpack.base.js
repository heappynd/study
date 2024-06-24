const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

// const os = require('os')

// console.log(os.cpus())

/**
 * @type { import('webpack').Configuration }
 */
const config = {
  resolve: {
    // extensions: ['.jsx', '.js', '.json'],
    extensions: ['.vue', '.js', '.json'],
  },
  entry: {
    main: './src/main.js',
  },
  output: {
    // 所有文件的输出路径
    path: path.resolve(__dirname, '../dist'),
    // 入口文件打包输出文件名
    filename: 'static/js/[name].[contenthash].js',
    chunkFilename: 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/js/[hash:10][ext][query]',
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new ESLintPlugin({
      configType: 'flat',
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      // threads: 2,
      // cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
    }),
    // cross-env 环境变量给打包工具使用
    // DefinePlugin环境变量给源代码使用
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        // 每个文件只能被其中一个处理
        oneOf: [],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              // workers: 2,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              // presets: ['@babel/preset-env'],
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },

      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024, // 4kb
          },
        },
        generator: {
          filename: 'static/images/[contenthash][ext][query]',
        },
      },
      {
        test: /\.(ttf|woff2?|mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[contenthash][ext][query]',
        },
      },
    ],
  },
}

module.exports = config
