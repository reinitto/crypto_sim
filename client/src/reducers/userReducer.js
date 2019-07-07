import {
  SAVE_USER,
  LOAD_USER,
  GET_USER_LOCAL,
  LOGOUT_USER,
  RESET_TIMES_TO_INVEST_LEFT,
  ADVANCE_TIME,
  UPDATE_TIMES_TO_INVEST_LEFT,
  GET_TIMES_TO_INVEST,
  BUY_CRYPTO,
  SELL_CRYPTO
} from '../actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LOCAL:
      let user = { ...action.payload };
      return user;
    default:
      return state;
    case LOGOUT_USER:
      return initialState;
    case SELL_CRYPTO:
      // payload: {
      //   name: coinName,
      //   price: coinPrice
      // }
      // get coin
      let crypto = state.cryptos.filter(c => c.name === action.payload.name);
      if (crypto.length === 0) {
        return {
          ...state
        };
      }
      let gains = action.payload.price * crypto[0].amount;
      return {
        ...state,
        money: state.money + gains,
        timesToInvestLeft: state.timesToInvestLeft - 1,
        cryptos: [...state.cryptos.filter(c => c.name !== action.payload.name)]
      };
    case BUY_CRYPTO:
      //check if crypto already exists on user
      let coin = state.cryptos.filter(c => c.name === action.payload.name);
      if (coin.length === 0) {
        //coin doesnt exist in wallet
        let newCrypto = {
          name: action.payload.name,
          amount: action.payload.amount
        };
        return {
          ...state,
          timesToInvestLeft: state.timesToInvestLeft - 1,
          money: action.payload.money,
          cryptos: [
            ...state.cryptos.filter(c => c.name !== action.payload.name),
            newCrypto
          ]
        };
      } else {
        //update currency amount
        let newCoin = {
          name: coin[0].name,
          amount: coin[0].amount + action.payload.amount
        };
        return {
          ...state,
          money: action.payload.money,
          timesToInvestLeft: state.timesToInvestLeft - 1,
          cryptos: [
            ...state.cryptos.filter(c => c.name !== action.payload.name),
            newCoin
          ]
        };
      }

    case LOAD_USER:
      return {
        ...action.payload
      };

    case ADVANCE_TIME:
      return {
        ...state,
        time: state.time + 604800,
        timesToInvestLeft: 4
      };
  }
};
