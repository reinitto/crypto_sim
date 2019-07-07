import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import cryptoReducer from './cryptoReducer';
import userReducer from './userReducer';
export default combineReducers({
  cryptos: cryptoReducer,
  alerts: alertReducer,
  user: userReducer
});
