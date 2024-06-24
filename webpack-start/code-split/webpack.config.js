const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * @type { import('webpack').Configuration }
 */
const config = {
  entry: {
    main: {
      import: './code-split/src/main.js',
      // dependOn: 'shared',
    },
    // app: {
    //   import: './code-split/src/app.js',
    //   dependOn: 'shared',
    // },
    // shared: 'lodash',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      templateParameters: {
        jsList: [],
        // jsList: ['https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js'],
      },
    }),
  ],
  mode: 'production',
  externalsType: 'script',
  externals: {
    jquery123: ['https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js', 'jQuery'],
  },
  module: {
    rules: [
      {
        test: /inline\/.*\.html/,
        type: 'asset/source'
      }
    ]
  }
  // optimization: {
  //   // runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
}

module.exports = config
