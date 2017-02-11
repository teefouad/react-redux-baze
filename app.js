/**
 * Express app setup
 */

import path from 'path';
import express from 'express';
import hogan from 'hogan-express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes/index';

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

// serve static files from 'public'
app.use(express.static(path.join(__dirname, './public')));

export default app;
