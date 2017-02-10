/**
 * Enable runtime transpilation to use ES6/7 in node
 */

const fs = require('fs');

const babelrc = fs.readFileSync('./.babelrc');

// eslint-disable-next-line
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('ERROR: Error parsing your .babelrc.');
  console.error(err);
}

// register for Babel
require('babel-register')(config);

// include Babel polyfills (allows using Promise, Array.from, Object.assign and so on)
require('babel-polyfill');
