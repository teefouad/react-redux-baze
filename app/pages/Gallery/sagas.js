import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  LOAD_SHOTS,
  LOAD_SHOTS_SUCCESS,
  LOAD_SHOTS_FAILURE,
} from './actions';

function* loadShots() {
  try {
    // get data
    const data = yield call(() => fetch(
      'https://api.dribbble.com/v1/shots?access_token=e11ae6314d42a59bfccebe96576b1b0a6b1b2b283834cd5bf4a440b5289ddefe'
    ).then(response => response.json()));

    // dispatch success action
    yield put({
      type: LOAD_SHOTS_SUCCESS,
      payload: {
        data
      }
    });
  } catch (e) {
    // dispatch failure action
    yield put({
      type: LOAD_SHOTS_FAILURE,
      message: e.message
    });
  }
}

export function* loadShotsSaga() {
  yield* takeLatest(LOAD_SHOTS, loadShots);
}
