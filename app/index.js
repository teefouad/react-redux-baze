import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { registerReducer, getRootReducer, getSagas } from './connectToStore';
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

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({
  logger: (level, ...args) => {
    if (level === 'error') {
      console.log(`Error: ${args.join(' ')}`);
    }
  }
});

// create the store
export const store = createStore(
  getRootReducer(),
  compose(
    applyMiddleware(routingMiddleware),
    applyMiddleware(sagaMiddleware),
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

// then run the sagas
const sagas = getSagas();
Object.values(sagas).forEach(saga => sagaMiddleware.run(saga));

// render everything
render(MainApp, document.getElementById('root'));
