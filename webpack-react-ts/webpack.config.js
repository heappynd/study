const path = require('path')
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  // plugins: [new BundleAnalyzerPlugin()],
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'), // 这样配置后 @ 可以指向 src 目录
    },
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      type: 'umd',
      name: 'biglab-utils',
      // type: 'module',
    },
  },
  // experiments: {
  //   outputModule: true,
  // },
  // externalsType: 'module',
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
}
