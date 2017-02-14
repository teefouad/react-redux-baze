import { call, put, takeLatest } from 'redux-saga/effects';

export default function createSaga(sagaAction, successAction, failureAction, callback) {
  return function* saga() {
    yield takeLatest(sagaAction, function* sagaHandler(action) {
      try {
        // get data
        const data = yield call(() => callback(action));

        // dispatch success action
        yield put({
          type: successAction,
          payload: {
            data
          }
        });
      } catch (e) {
        // dispatch failure action
        yield put({
          type: failureAction,
          payload: {
            message: e.message,
          }
        });
      }
    });
  };
}
