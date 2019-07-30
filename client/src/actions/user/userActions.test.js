import { storeFactory } from '../../../tests/testUtils';
import {
  buyCrypto,
  sellCrypto,
  loadUser,
  getUserLocal,
  logoutUser,
  advanceTime
} from './userActions';
import fetchMock from 'fetch-mock';

describe('user actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  describe('loadUser action', () => {
    test('successful call sets user', () => {
      const userName = '1';
      const password = '1';
      const responseUser = {
        id: 1,
        userName: 'user1',
        money: 100,
        cryptos: [{ name: 'BTC', amount: 300 }],
        timesToInvestLeft: 4,
        time: 12345678
      };
      fetchMock.postOnce(`/user/loadUser`, {
        body: { user: responseUser },
        headers: { 'content-type': 'application/json' }
      });
      const store = storeFactory();

      return store.dispatch(loadUser(userName, password)).then(() => {
        // return of async actions
        expect(store.getState().user).toEqual(responseUser);
      });
    });
    test('unsuccessful userLoad sets alert with error message', () => {
      const userName = '1';
      const password = '1';
      const fakeError = { msg: 'network error' };
      fetchMock.postOnce(`/user/loadUser`, {
        throws: { response: fakeError }
      });
      const store = storeFactory();
      return store.dispatch(loadUser(userName, password)).then(() => {
        // return of async actions
        expect(store.getState().alerts[0]).toEqual(
          expect.objectContaining(fakeError)
        );
      });
    });
    test('sets alert with error message if user is not found or password is not valid', () => {
      const userName = '1';
      const password = '1';
      const fakeError = { error: 'invalid username or password' };
      fetchMock.postOnce(`/user/loadUser`, {
        body: fakeError,
        headers: { 'content-type': 'application/json' }
      });
      const store = storeFactory();
      return store.dispatch(loadUser(userName, password)).then(() => {
        // return of async actions
        expect(store.getState().alerts[0]).toEqual(
          expect.objectContaining({
            msg: fakeError.error
          })
        );
      });
    });
  });
  describe('logoutuser action', () => {
    const loggedInUser = {
      id: 1,
      userName: 'user1',
      money: 100,
      cryptos: [{ name: 'BTC', amount: 300 }],
      timesToInvestLeft: 4,
      time: 12345678
    };
    const store = storeFactory({
      user: loggedInUser
    });
    store.dispatch(logoutUser());
    test('sets store user to null', () => {
      expect(store.getState().user).toBeNull();
    });
    test('sets localstorage user to null', () => {
      expect(localStorage.removeItem).toHaveBeenLastCalledWith('user');
    });
  });
});
describe('advaneTime action', () => {
  const startTime = 12345678;
  const loggedInUser = {
    id: 1,
    userName: 'user1',
    money: 100,
    cryptos: [{ name: 'BTC', amount: 300 }],
    timesToInvestLeft: 4,
    time: startTime
  };
  const store = storeFactory({
    user: loggedInUser
  });
  store.dispatch(advanceTime());
  test('it advances time', () => {
    expect(store.getState().user.time).toBeGreaterThan(startTime);
  });
});
describe('sellCrypto action', () => {
  describe('on success', () => {
    const user = {
      id: 1,
      userName: 'user1',
      money: 100,
      cryptos: [{ name: 'BTC', amount: 300 }],
      timesToInvestLeft: 4,
      time: 12345678
    };
    const store = storeFactory({
      user
    });
    store.dispatch(sellCrypto('btc', 10000, 4));
    test('it removes crypto from user owned cryptos', () => {
      const userCryptos = store.getState().user.cryptos;
      expect(userCryptos.length).toBe(0);
    });
    test('it adds money to users money', () => {});
    const userMoney = store.getState().user.money;
    expect(userMoney).toBeGreaterThan(user.money);
  });
  describe('on failure', () => {
    const user = {
      id: 1,
      userName: 'user1',
      money: 100,
      cryptos: [{ name: 'BTC', amount: 300 }],
      timesToInvestLeft: 0,
      time: 12345678
    };
    const store = storeFactory({
      user
    });
    store.dispatch(sellCrypto('btc', 10000, 0));
    test('sets alerts with error message', () => {
      expect(store.getState().alerts.length).toBe(1);
    });
  });
});
describe('getUserLocal', () => {
  const store = storeFactory();
  store.dispatch(getUserLocal());
  test('gets user from localstorage', () => {
    expect(localStorage.getItem).toHaveBeenLastCalledWith('user');
  });
});
describe('buyCrypto', () => {
  describe('user already has coin', () => {
    const user = {
      id: 1,
      userName: 'user1',
      money: 100,
      cryptos: [{ name: 'BTC', amount: 300 }],
      timesToInvestLeft: 4,
      time: 12345678
    };
    const store = storeFactory({
      user
    });
    test('crypto amount is increased', () => {
      // coinName,
      // coinPrice,
      // userMoney,
      // timesToInvestLeft
      store.dispatch(buyCrypto('btc', 1, 100, 4));
      expect(store.getState().user.cryptos[0].amount).toBeGreaterThan(
        user.cryptos[0].amount
      );
    });
    test('user moneyt is decreased', () => {
      // coinName,
      // coinPrice,
      // userMoney,
      // timesToInvestLeft
      store.dispatch(buyCrypto('btc', 1, 100, 4));
      expect(store.getState().user.money).toBeLessThan(user.money);
    });
  });
  describe('user does not have coin', () => {
    const user = {
      id: 1,
      userName: 'user1',
      money: 100,
      cryptos: [{ name: 'BTC', amount: 300 }],
      timesToInvestLeft: 4,
      time: 12345678
    };
    const store = storeFactory({
      user
    });
    test('crypto is added to cryptos array', () => {
      // coinName,
      // coinPrice,
      // userMoney,
      // timesToInvestLeft
      store.dispatch(buyCrypto('ltc', 1, 100, 4));
      expect(store.getState().user.cryptos.length).toBeGreaterThan(
        user.cryptos.length
      );
    });
    test('user money is decreased', () => {
      // coinName,
      // coinPrice,
      // userMoney,
      // timesToInvestLeft
      store.dispatch(buyCrypto('ltc', 1, 100, 4));
      expect(store.getState().user.money).toBeLessThan(user.money);
    });
  });
});
