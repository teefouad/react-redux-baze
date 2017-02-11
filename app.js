/**
 * Express app setup
 */

import path from 'path';
import express from 'express';
import hogan from 'hogan-express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { devMiddleware, hotMiddleware } from './webpack/webpack-dev-server';

// setup the Express app
const app = express();

// views engine
app.engine('html', hogan);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');

// logger
app.use(logger('combined'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// include webpack-dev-server for development only
if (process.env.NODE_ENV !== 'production') {
  app.use(devMiddleware);

  // allow using Webpack hot reloading
  app.use(hotMiddleware);
}

// serve static files from 'public'
app.use(express.static(path.join(__dirname, './public')));

// handle rendering
app.get('*', (req, res) => {
  res.render('index');
});

export default app;
