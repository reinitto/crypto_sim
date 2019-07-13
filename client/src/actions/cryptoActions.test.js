import { storeFactory } from '../../tests/testUtils';
import {
  getAllCryptos,
  getAvailableCryptos,
  removeTodaysCryptos
} from './cryptoActions';
import fetchMock from 'fetch-mock';

describe('getAllCryptos actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  const fakeTimestamp = 12345678;

  test('successful call sets allCryptos to response object', () => {
    fetchMock.getOnce(`/cryptos/${fakeTimestamp}`, {
      body: [
        {
          timestamp: 12345678,
          cryptos: [
            {
              name: '300',
              time: 12345678,
              high: 481.78,
              low: 440.35,
              open: 469.53,
              volumefrom: 2.962,
              volumeto: 1382.36,
              close: 464.59
            }
          ]
        }
      ],
      headers: { 'content-type': 'application/json' }
    });

    const store = storeFactory();

    return store.dispatch(getAllCryptos(fakeTimestamp)).then(() => {
      // return of async actions
      expect(store.getState().cryptos.allCryptos).toEqual({
        12345678: [
          {
            name: '300',
            time: 12345678,
            high: 481.78,
            low: 440.35,
            open: 469.53,
            volumefrom: 2.962,
            volumeto: 1382.36,
            close: 464.59
          }
        ]
      });
    });
  });

  test('failed call adds alert to state with error message ', () => {
    const fakeError = { msg: 'network error' };
    fetchMock.getOnce(`/cryptos/${fakeTimestamp}`, {
      throws: { response: fakeError }
    });
    const store = storeFactory();
    return store.dispatch(getAllCryptos(fakeTimestamp)).then(() => {
      // return of async actions
      expect(store.getState().alerts[0]).toEqual(
        expect.objectContaining(fakeError)
      );
    });
  });
});

describe('removeTodaysCryptos action', () => {
  test('removes cryptos from store', () => {
    const fakeTimestamp = 12345678;
    const store = storeFactory({
      cryptos: {
        allCryptos: {
          12345678: [
            {
              name: '300',
              time: 12345678,
              high: 481.78,
              low: 440.35,
              open: 469.53,
              volumefrom: 2.962,
              volumeto: 1382.36,
              close: 464.59
            }
          ]
        }
      }
    });
    store.dispatch(removeTodaysCryptos(fakeTimestamp));
    expect(store.getState().cryptos.allCryptos[fakeTimestamp]).toBeUndefined();
  });
  test('returns old state if time was not found', () => {
    const existingTimestamp = 12345678;
    const nonExistingTimestamp = 87654321;
    const store = storeFactory({
      cryptos: {
        allCryptos: {
          12345678: [
            {
              name: '300',
              time: 12345678,
              high: 481.78,
              low: 440.35,
              open: 469.53,
              volumefrom: 2.962,
              volumeto: 1382.36,
              close: 464.59
            }
          ]
        }
      }
    });
    store.dispatch(removeTodaysCryptos(nonExistingTimestamp));
    expect(store.getState().cryptos.allCryptos[existingTimestamp]).toBeTruthy();
    expect(
      store.getState().cryptos.allCryptos[nonExistingTimestamp]
    ).toBeFalsy();
  });
});
