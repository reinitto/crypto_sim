import { GET_ALL_CRYPTOS, REMOVE_TODAYS_CRYPTOS } from '../actions/types';
import cryptoReducer from './cryptoReducer';
const initialState = { allCryptos: {} };

test('returns initial state if no type provided', () => {
  const newState = cryptoReducer(undefined, { type: '' });
  expect(newState).toStrictEqual(initialState);
});

test('returns state with allCryptos set to payload on receiving GET_ALL_CRYPTOS action', () => {
  const allCryptos = {
    12345678: [{ name: 'btc' }]
  };
  const newState = cryptoReducer(undefined, {
    type: GET_ALL_CRYPTOS,
    payload: allCryptos
  });
  expect(newState.allCryptos).toStrictEqual(allCryptos);
});
test('returns state object with todays data deleted on receiving REMOVE_TODAYS_CRYPTOS action ', () => {
  const oldState = {
    allCryptos: {
      12345678: [{ name: 'btc' }],
      87654321: [{ name: 'btc' }]
    }
  };

  const newState = cryptoReducer(oldState, {
    type: REMOVE_TODAYS_CRYPTOS,
    payload: 12345678
  });
  const expectedState = {
    allCryptos: {
      87654321: [{ name: 'btc' }]
    }
  };

  expect(newState).toStrictEqual(expectedState);
});
