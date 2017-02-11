import { combineReducers, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * An object that is used as a map to store references to registered reducers.
 * This object is used by `getRootReducer` to create the root reducer.
 * @type {Object}
 */
const registeredReducers = {
  _foo_: foo => foo || {}
};

/**
 * An object that is used as a map to store references to registered sagas.
 * This object can be retrieved using `getSagas` to run all registered sagas via
 * the saga middleware.
 * @type {Object}
 */
let registeredSagas = {};

/**
 * Combines all registered reducers and returns a single reducer.
 * @type {Function}
 */
export const getRootReducer = () => combineReducers(registeredReducers);

/**
 * Returns all registered sagas as a single object.
 * @type {Function}
 */
export const getSagas = () => registeredSagas;

/**
 * Registers a reducer function.
 * @param  {String}   key       Reducer key
 * @param  {Function} reducer   Reducer function
 * @return {Boolean}            Whether the reducer function was successfully registered or not.
 */
export function registerReducer(key, reducer) {
  if (key && reducer && !registeredReducers[key]) {
    registeredReducers[key] = reducer;
    return true;
  }

  return false;
}

/**
 * This methods provides a simple way to connect to the Redux store. It takes two
 * arguments, the component to be connected and a configuration object then returns
 * the connected component.
 *
 * Arguments:
 * ----------
 *
 *  component (required)
 *    Reference to the component class.
 *
 *  configObject (optional)
 *    Configuration object that contains the following keys:
 *
 *      - reducer         Reference to the component reducer.
 *      - actions         Reference to the actions object.
 *      - sagas           Reference to the sagas object.
 *      - stateKey        Namespace that will be used to pass component state as props.
 *      - actionsKey      Namespace that will be used to pass component actions as props.
 *
 * Usage example:
 * --------------
 *
 *    import React from 'react';
 *    import connectToStore from './connectToStore';
 *    import reducer from './reducer';
 *    import * as actions from './actions';
 *    import * as sagas from './sagas';
 *
 *    const MyComponent = (props) => (
 *      <div>
 *        <h1>{ this.props.myStateKey.pageTitle }</h1>
 *        <button
 *          onClick={() => this.props.actions.myActionsKey.changePageTitle('New Title')}
 *        >
 *        Change Page Title
 *        </button>
 *      </div>
 *    );
 *
 *    export default connectToStore(MyComponent, {
 *      reducer, actions, sagas
 *      stateKey: 'myStateKey',
 *      actionsKey: 'myActionsKey'
 *    });
 *
 * Component state can then be accessed via this.props.myStateKey and component
 * actions can be accessed via this.props.actions.myActionsKey, this is to avoid
 * naming conflicts between different states and actions. You can use ES6 object
 * destructuring to extract state and actions and avoid writing long lines of code.
 *
 * @type {Function}
 */
export default function connectToStore(
  component,
  config = {}
) {
  if (!component) {
    throw new Error(
      'You must pass a valid React component class to `connectToStore`.'
    );
  }

  // if no reducer is provided, use a simple reducer that returns the state as it is.
  const reducer = config.reducer || ((state = {}) => state);

  // default value for the actions object is an empty object (no actions).
  const actions = config.actions || {};

  // default value for the sagas object is an empty object (no sagas).
  const sagas = config.sagas || {};

  // default value for the stateKey null (component is stateless).
  const stateKey = config.stateKey || null;

  // default value for the actionsKey is stateKey (more convenient).
  const actionsKey = config.actionsKey || stateKey;

  // register reducer
  if (reducer && stateKey !== null) {
    registeredReducers[stateKey] = reducer;
  }

  // register sagas
  if (sagas) {
    registeredSagas = {
      ...registeredSagas,
      ...sagas
    };
  }

  // maps component state to component props
  const mapStateToProps = (stateKey === null ? null : state => ({
    [stateKey]: state[stateKey]
  }));

  // maps component actions to dispatchProps
  const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

  // combines component props, mapped props from state and mapped props from dispatchProps
  const combineProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    actions: (
      actionsKey === null ? {
        ...dispatchProps
      } : {
        ...ownProps.actions,
        [actionsKey]: dispatchProps
      }
    )
  });

  // return the connected component
  return connect(mapStateToProps, mapDispatchToProps, combineProps)(component);
}
