const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
// const TestPlugin = require('./plugins/test1')
const BannerPlugin = require('./plugins/banner')

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
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    // new TestPlugin(),
    new BannerPlugin({
      author: '作者'
    }),
  ],
  mode: 'development',
}
