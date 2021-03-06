import {
  LOAD_USER,
  ADVANCE_TIME,
  SELL_CRYPTO,
  GET_USER_LOCAL,
  LOGOUT_USER,
  BUY_CRYPTO
} from '../types';
import { setAlert } from '../alert/alertActions';

//Register User
export const registerUser = (username, password) => async dispatch => {
  try {
    const res = await fetch(`/user/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: username, password })
    });
    let data = await res.json();
    if (data.errors) {
      data.errors.forEach(err => dispatch(setAlert(err.msg, 'red')));
    } else {
      console.log('reg data:', data);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch({
        type: LOAD_USER,
        payload: data.user
      });
    }
  } catch (error) {
    dispatch(setAlert(error.msg, 'red'));
  }
};

// Load User
export const loadUser = (username, password) => async dispatch => {
  try {
    const res = await fetch(`/user/loadUser`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    let data = await res.json();
    localStorage.setItem('user', JSON.stringify(data.user));
    if (data.error) {
      dispatch(setAlert(data.error, 'red'));
    } else {
      dispatch({
        type: LOAD_USER,
        payload: data.user
      });
    }
  } catch (error) {
    dispatch(setAlert(error.response.msg, 'red'));
  }
};

export const saveUser = user => async dispatch => {
  try {
    const res = await fetch(`user/${user.id}/save`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let save = await res.json();
    if (save.success) {
      localStorage.setItem('user', JSON.stringify(save.user));
      dispatch(setAlert(save.message, 'green'));
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setAlert('user saved locally', 'red'));
    }
  } catch (error) {
    console.log('error on save:', error);
  }
};
export const getUserLocal = () => dispatch => {
  let localUser = JSON.parse(localStorage.getItem('user'));
  if (localUser !== null) {
    dispatch({
      type: GET_USER_LOCAL,
      payload: localUser
    });
  }
};

export const buyCrypto = (
  coinName,
  coinPrice,
  userMoney,
  timesToInvestLeft
) => dispatch => {
  let timesLeft = timesToInvestLeft;
  if (timesLeft < 1) {
    dispatch(setAlert('Cant invest anymore this week', 'red'));
  } else {
    let moneyToSpend = Math.floor(userMoney / timesLeft);

    let coinsCanBuy = moneyToSpend / coinPrice;
    let multiplierLength = coinPrice.toString().split('').length;
    let coinsBought =
      Math.floor(coinsCanBuy * multiplierLength) / multiplierLength;
    let moneyLeft = userMoney - moneyToSpend;

    dispatch({
      type: BUY_CRYPTO,
      payload: {
        money: moneyLeft,
        name: coinName,
        amount: coinsBought
      }
    });
  }
};
export const sellCrypto = (name, close, timesToInvestLeft) => dispatch => {
  if (timesToInvestLeft < 1) {
    dispatch(setAlert('Cant invest anymore this week', 'red'));
  } else {
    name = name.toLowerCase();
    dispatch({
      type: SELL_CRYPTO,
      payload: {
        name,
        price: close
      }
    });
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT_USER });
};

// Get Contacts
export const advanceTime = () => dispatch => {
  try {
    dispatch({
      type: ADVANCE_TIME
    });
  } catch (error) {
    dispatch(setAlert(error.response.msg, 'red'));
  }
};
