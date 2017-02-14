const actionPrefix = 'gallery/';

export const LOAD_SHOTS = `${actionPrefix}LOAD_SHOTS`;
export const LOAD_SHOTS_SUCCESS = `${actionPrefix}LOAD_SHOTS_SUCCESS`;
export const LOAD_SHOTS_FAILURE = `${actionPrefix}LOAD_SHOTS_FAILURE`;

export function loadShots(page) {
  return {
    type: LOAD_SHOTS,
    payload: {
      page
    }
  };
}
