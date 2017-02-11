/**
 * Development Webpack configuration
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      path.join(process.cwd(), 'app/index')
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'js'),
    publicPath: '/js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js(x)?$/, // Transform all .js/.jsx files required somewhere with Babel
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    modules: [path.join(process.cwd(), 'app'), 'node_modules'],
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },
  target: 'web' // Make web variables accessible to webpack, e.g. window
};
