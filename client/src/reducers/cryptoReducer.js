import { GET_ALL_CRYPTOS, GET_AVAILABLE_CRYPTOS } from '../actions/types';

const initialState = { allCryptos: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_ALL_CRYPTOS:
      return { ...state, allCryptos: action.payload };
    case GET_AVAILABLE_CRYPTOS:
      if (state.allCryptos[action.payload.toString()]) {
        console.log(
          'cryptos available',
          state.allCryptos[action.payload].cryptos
        );
        return {
          ...state,
          availableCryptos: [...state.allCryptos[action.payload].cryptos]
        };
      } else {
        return {
          ...state
        };
      }
  }
};
