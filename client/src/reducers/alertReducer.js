import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
/**
 * @function alertReducer
 * @param {array} state - Array of alerts
 * @param {object} action - action to be reduced
 * @returns {array} - new alert state
 */
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};
