import {
  LOAD_USER,
  GET_USER_LOCAL,
  LOGOUT_USER,
  ADVANCE_TIME,
  BUY_CRYPTO,
  SELL_CRYPTO
} from '../actions/types';
import userReducer from './userReducer';

test('returns state if no type provided', () => {
  const newState = userReducer(undefined, { type: '' });
  expect(newState).toBeNull();
});

test('sets user on calling GET_USER_LOCAL', () => {
  const user = {
    id: 2,
    userName: 'user',
    money: 100000,
    timesToInvestLeft: 4,
    time: 1529884800
  };
  const newState = userReducer(undefined, {
    type: GET_USER_LOCAL,
    payload: user
  });
  expect(newState).toStrictEqual(user);
});
test('sets user on calling LOAD_USER', () => {
  const user = {
    id: 2,
    userName: 'user',
    money: 100000,
    timesToInvestLeft: 4,
    time: 1529884800
  };
  const newState = userReducer(undefined, {
    type: LOAD_USER,
    payload: user
  });
  expect(newState).toStrictEqual(user);
});
test('sets userto null on  calling LOGOUT_USER', () => {
  const user = {
    id: 2,
    userName: 'user',
    money: 100000,
    timesToInvestLeft: 4,
    time: 1529884800
  };
  const newState = userReducer(user, {
    type: LOGOUT_USER
  });
  expect(newState).toBeNull();
});
test('advances time on calling ADVANCE_TIME', () => {
  const user = {
    id: 2,
    userName: 'user',
    money: 100000,
    timesToInvestLeft: 4,
    time: 1529884800
  };
  const newState = userReducer(user, {
    type: ADVANCE_TIME
  });
  expect(newState.time).toBeGreaterThan(user.time);
});
describe('Buy crypto', () => {
  describe('user owns coin', () => {
    const user = {
      id: 2,
      userName: 'user',
      money: 100000,
      timesToInvestLeft: 4,
      time: 1529884800,
      cryptos: [{ name: 'btc', amount: 100 }]
    };
    const moneyLeft = 10;
    const amount = 500;
    const newState = userReducer(user, {
      type: BUY_CRYPTO,
      payload: {
        name: 'btc',
        money: moneyLeft,
        amount: amount
      }
    });
    test('add amount to existing amount', () => {
      expect(newState.cryptos[0].amount).toBe(user.cryptos[0].amount + amount);
    });
    test('timesToInvestLeft is reduced by 1', () => {
      expect(newState.timesToInvestLeft).toBe(user.timesToInvestLeft - 1);
    });
    test('user money is updated to moneyLeft', () => {
      expect(newState.money).toBe(moneyLeft);
    });
  });
  describe('user doesnt own coin yet', () => {
    const user = {
      id: 2,
      userName: 'user',
      money: 100000,
      timesToInvestLeft: 4,
      time: 1529884800,
      cryptos: [{ name: 'btc', amount: 100 }]
    };
    const moneyLeft = 10;
    const amount = 500;
    const newState = userReducer(user, {
      type: BUY_CRYPTO,
      payload: {
        name: 'xyz',
        money: moneyLeft,
        amount: amount
      }
    });
    test('add coin to user', () => {
      expect(newState.cryptos.length).toBe(user.cryptos.length + 1);
    });
    test('timesToInvestLeft is reduced by 1', () => {
      expect(newState.timesToInvestLeft).toBe(user.timesToInvestLeft - 1);
    });
    test('user money is updated to moneyLeft', () => {
      expect(newState.money).toBe(moneyLeft);
    });
  });
  describe('sell crypto', () => {
    describe('user doesnt own the coin', () => {
      const user = {
        id: 2,
        userName: 'user',
        money: 100000,
        timesToInvestLeft: 4,
        time: 1529884800,
        cryptos: [{ name: 'btc', amount: 100 }]
      };
      const newState = userReducer(user, {
        type: SELL_CRYPTO,
        payload: {
          name: 'xyz'
        }
      });
      test('return user unchanged', () => {
        expect(newState).toStrictEqual(user);
      });
    });
    describe('user owns coin', () => {
      const user = {
        id: 2,
        userName: 'user',
        money: 100000,
        timesToInvestLeft: 4,
        time: 1529884800,
        cryptos: [{ name: 'btc', amount: 100 }, { name: 'ftc', amount: 4100 }]
      };
      const price = 100;
      const newState = userReducer(user, {
        type: SELL_CRYPTO,
        payload: {
          name: 'btc',
          price: price
        }
      });
      test('returns state without the sold crypto', () => {
        expect(newState.cryptos.length).toBe(user.cryptos.length - 1);
      });
      test('returns state with more money', () => {
        expect(newState.money).toBeGreaterThan(user.money);
      });
      test('returns stae with timesToInvestLeft reduced by 1', () => {
        expect(newState.timesToInvestLeft).toBe(user.timesToInvestLeft - 1);
      });
    });
  });
});
