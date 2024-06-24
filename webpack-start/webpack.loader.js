const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/loader/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          // './loaders/demo/test1.js',
          // './loaders/demo/test2.js',
          // './loaders/demo/test3.js',
          {
            loader: './loaders/demo/banner.js',
            options: {
              author: 'Zhangsan',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: './loaders/demo/babel.js',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
  mode: 'development',
}
