const { Configuration } = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
/**
 * @type { Configuration }
 */
const config = {
  mode: 'none',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 9001, // remote
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './addList': './list.js',
      },
    }),
  ],
}
module.exports = config
