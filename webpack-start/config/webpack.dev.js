const { merge } = require('webpack-merge')
const base = require('./webpack.base')

const output = merge(base, {
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 9527,
    // open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          // 'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
})

module.exports = output
