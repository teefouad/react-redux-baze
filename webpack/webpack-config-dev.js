/**
 * Development Webpack configuration
 */

import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';

const envConfig = dotenv.config().parsed || {};

envConfig.CLIENT = true;
envConfig.SERVER = false;

Object.keys(envConfig).forEach((key) => {
  envConfig[key] = JSON.stringify(process.env[key] || envConfig[key]);
});

export default {
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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env': envConfig })
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
