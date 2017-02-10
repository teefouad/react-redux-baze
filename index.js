/**
 * Main entry point
 */

// enable es6 for node
require('./serve.babel');

// include the Express server
require('./bin/www');

// setup the Express app
require('./app');
