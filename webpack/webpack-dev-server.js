/**
 * Setup Webpack dev server
 */

/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack-config-dev';

const webpackCompiler = webpack(webpackConfig);

export default webpackCompiler;

export const devMiddleware = webpackDevMiddleware(webpackCompiler, {
  // display no info to console (only warnings and errors)
  noInfo: true,
  // public path to bind the middleware to
  publicPath: webpackConfig.output.publicPath,
});

export const hotMiddleware = webpackHotMiddleware(webpackCompiler);
