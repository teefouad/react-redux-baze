import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';

if (module.hot) {
  module.hot.accept();
}

const router = (
  <Router history={browserHistory} key={Math.random()}>
    {routes}
  </Router>
);

// render everything
render(router, document.getElementById('root'));
