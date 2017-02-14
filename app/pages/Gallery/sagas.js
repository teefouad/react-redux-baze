import createSaga from '../../createSaga';

import {
  LOAD_SHOTS,
  LOAD_SHOTS_SUCCESS,
  LOAD_SHOTS_FAILURE,
} from './actions';

export const gallerySaga = createSaga(
  LOAD_SHOTS,
  LOAD_SHOTS_SUCCESS,
  LOAD_SHOTS_FAILURE,
  action => new Promise((resolve, reject) => {
    fetch(`https://api.dribbble.com/v1/shots?page=${action.payload.page}&access_token=e11ae6314d42a59bfccebe96576b1b0a6b1b2b283834cd5bf4a440b5289ddefe`)
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(e => reject(e));
  })
);
