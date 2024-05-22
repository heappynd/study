const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const svgToMiniDataURI = require('mini-svg-data-uri')

/** @type {import('webpack').Configuration} */
const config = {
  target: 'web',
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/chunk-[contenthash].js',
    clean: true,
    environment: {
      arrowFunction: false,
    },
    // assetModuleFilename: 'images/[hash][ext][query]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'images3/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        // type: 'asset/inline',
        // generator: {
        //   dataUrl: (content) => {
        //     console.log('content', content, content.toString())
        //     return svgToMiniDataURI(content.toString())
        //   },
        // },
        // 默认小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    // 引入文件时省略后缀
    // extensions: ['.js', '.ts', '.vue'],
  },
}

module.exports = config

console.log('__dirname', __dirname)
