import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from '../app/pages/Main';
import Homepage from '../app/pages/Homepage';
import About from '../app/pages/About';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Homepage} />
    <Route path="about" component={About} />
  </Route>
);
