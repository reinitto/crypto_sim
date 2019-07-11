import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import alertReducer from './alertReducer';

test('returns state if no type provided', () => {
  const newState = alertReducer(undefined, { type: '' });
  expect(newState).toStrictEqual([]);
});

test('returns array with alert item in it on receiving an action of type SET_ALERT  ', () => {
  const alert = {
    msg: 'I am alert',
    id: 1,
    type: 'green'
  };
  const newState = alertReducer(undefined, {
    type: SET_ALERT,
    payload: alert
  });
  expect(newState).toStrictEqual([alert]);
});
test('returns state array with alert item removed from it on receiving an action of type REMOVE_ALERT', () => {
  const id = 777;
  const newState = alertReducer([{ id }], {
    type: REMOVE_ALERT,
    payload: id
  });
  expect(newState).toStrictEqual([]);
});
