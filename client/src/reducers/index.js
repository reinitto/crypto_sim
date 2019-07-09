import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import cryptoReducer from './cryptoReducer';
import userReducer from './userReducer';
import eventReducer from './eventReducer';
export default combineReducers({
  cryptos: cryptoReducer,
  alerts: alertReducer,
  user: userReducer,
  events: eventReducer
});
