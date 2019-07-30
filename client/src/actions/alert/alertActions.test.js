import { storeFactory } from '../../../tests/testUtils';
import { setAlert } from './alertActions';

describe('setAlert action with default timeout argument', () => {
  const store = storeFactory();
  jest.useFakeTimers();
  const msg = 'alert message';
  const color = 'green';
  const defaultTimeout = 5000;
  test('adds alert to state', () => {
    store.dispatch(setAlert(msg, color));
    const expectedState = [{ msg: msg, type: color, id: expect.any(String) }];
    const alertState = store.getState().alerts;
    expect(alertState).toEqual(expect.arrayContaining(expectedState));
  });
  test('removes alert from state after 5sec by default', () => {
    jest.advanceTimersByTime(defaultTimeout);
    const expectedState = [];
    const alertState = store.getState().alerts;
    expect(alertState).toEqual(expectedState);
  });
});

describe('setAlert action with custom timeout argument', () => {
  const store = storeFactory();
  jest.useFakeTimers();
  const msg = 'alert message with custom timeout';
  const color = 'red';
  const timeout = 2000;
  const expectedAlert = { msg: msg, type: color, id: expect.any(String) };
  test('adds alert to state', () => {
    store.dispatch(setAlert(msg, color, timeout));
    const newState = store.getState();
    expect(newState.alerts).toEqual(expect.arrayContaining([expectedAlert]));
  });
  test('removes the alert from state after custom timeout', () => {
    store.dispatch(setAlert('anotherFakeMessage', 'blue', 9000));
    jest.advanceTimersByTime(timeout);
    const newState = store.getState();
    expect(newState.alerts).not.toEqual(
      expect.arrayContaining([expectedAlert])
    );
  });
});
