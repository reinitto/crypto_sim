import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

/**
 * Returns Redux Thunk function that dispatches SET_ALERT action and REMOVE_ALERT action
 * @function setAlert
 * @param {string} msg - alert message
 * @param {string} type - alert color
 * @returns {function}  -Redux thunk function
 */
export const setAlert = (msg, color = `red`, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      type: color,
      id
    }
  });
  setTimeout(() => {
    return dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  }, timeout);
};
