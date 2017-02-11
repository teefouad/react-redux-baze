import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import { registerReducer, getRootReducer } from './connectToStore';
import routes from '../routes';

if (module.hot) {
  module.hot.accept();
}

// enable Redux devTools
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : foo => foo
);

// register router reducer
registerReducer('routing', routerReducer);

// create the routing middleware
const routingMiddleware = routerMiddleware(browserHistory);

// create the store
export const store = createStore(
  getRootReducer(),
  compose(
    applyMiddleware(routingMiddleware),
    enhancers
  )
);

// create history
const history = syncHistoryWithStore(browserHistory, store);

// wrap it all with the provider
const MainApp = (
  <Provider store={store}>
    <Router history={history} key={Math.random()}>
      {routes}
    </Router>
  </Provider>
);

// reducers are registered by now, so update the root reducer
store.replaceReducer(getRootReducer());

// render everything
render(MainApp, document.getElementById('root'));
