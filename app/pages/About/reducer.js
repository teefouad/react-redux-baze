// =========================================================================
// ACTIONS
// =========================================================================

import {
  SAY_SOMETHING,
} from './actions';

// =========================================================================
// INITIAL STATE
// =========================================================================

const initialState = {
  msg: 'Hello Redux!',
  alreadySaidSomething: false,
};

// =========================================================================
// MAIN REDUCER
// =========================================================================

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAY_SOMETHING:
      if (state.alreadySaidSomething === true) {
        alert('I have already said something!');
      } else {
        alert(state.msg);
      }

      return {
        ...state,
        alreadySaidSomething: true,
      };

    default:
      return state;
  }
}
