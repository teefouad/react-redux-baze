// =========================================================================
// ACTIONS
// =========================================================================

import {
  LOAD_SHOTS,
  LOAD_SHOTS_SUCCESS,
  LOAD_SHOTS_FAILURE,
} from './actions';

// =========================================================================
// INITIAL STATE
// =========================================================================

const initialState = {
  shots: [],
  error: false,
  loading: false,
};

// =========================================================================
// MAIN REDUCER
// =========================================================================

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOTS:
      return {
        ...state,
        error: false,
        loading: true,
      };

    case LOAD_SHOTS_SUCCESS:
      return {
        ...state,
        shots: action.payload.data,
        error: false,
        loading: false,
      };

    case LOAD_SHOTS_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
}
