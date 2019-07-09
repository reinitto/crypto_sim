import {
  GET_ALL_CRYPTOS,
  GET_AVAILABLE_CRYPTOS,
  REMOVE_TODAYS_CRYPTOS
} from '../actions/types';

const initialState = { allCryptos: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_ALL_CRYPTOS:
      return { ...state, allCryptos: action.payload };
    case REMOVE_TODAYS_CRYPTOS:
      let newAllCryptos = { ...state.allCryptos };
      delete newAllCryptos[action.payload];
      return {
        ...state,
        allCryptos: newAllCryptos
      };
  }
};
