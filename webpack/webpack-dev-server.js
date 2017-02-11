/**
 * Setup Webpack dev server
 */

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack-config-dev';
import app from '../app';

if (process.env.NODE_ENV !== 'production') {
  const webpackCompiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(webpackCompiler, {
    // display no info to console (only warnings and errors)
    noInfo: true,
    // public path to bind the middleware to
    publicPath: webpackConfig.output.publicPath,
  }));

  // allow using Webpack hot reloading
  app.use(webpackHotMiddleware(webpackCompiler));
}
