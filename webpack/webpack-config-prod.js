/**
 * Development Webpack configuration
 */

const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const envConfig = dotenv.config().parsed || {};

envConfig.CLIENT = true;
envConfig.SERVER = false;

Object.keys(envConfig).forEach((key) => {
  envConfig[key] = JSON.stringify(process.env[key] || envConfig[key]);
});

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'babel-polyfill',
      path.join(process.cwd(), 'app/index')
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'public/js')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(), // Merge all duplicate modules
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': envConfig
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
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
  target: 'web', // Make web variables accessible to webpack, e.g. window
  progress: true
};
