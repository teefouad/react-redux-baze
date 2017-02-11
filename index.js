/**
 * Main entry point
 */

// load environment variables for the server
require('dotenv').config({ silent: true });

// enable es6 for node
require('./serve.babel');

// include the Express server
require('./bin/www');

// setup the Express app
require('./app');
