/**
 * Main entry point
 */

// load environment variables for the server
require('dotenv').config({ silent: true });

// enable es6 for node
require('./serve.babel');

// include the Express server
require('./bin/www');

// include webpack-dev-server for development only
if (process.env.NODE_ENV !== 'production') {
  require('./webpack/webpack-dev-server');
}

// setup the Express app
require('./app');
