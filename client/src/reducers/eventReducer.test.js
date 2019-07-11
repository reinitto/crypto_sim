import {
  ADD_EVENT,
  REMOVE_EVENT,
  ADD_QUEST,
  REMOVE_QUEST
} from '../actions/types';
import eventReducer from './eventReducer';

test('returns initial state ', () => {
  const expectedState = {
    events: [],
    quests: []
  };
  const newState = eventReducer(undefined, { type: '' });
  expect(newState).toStrictEqual(expectedState);
});
test('adds event on ADD_EVENT action ', () => {
  const initialState = {
    events: [],
    quests: []
  };
  const newState = eventReducer(initialState, {
    type: ADD_EVENT,
    payload: {}
  });
  expect(newState.events.length).toBe(initialState.events.length + 1);
});
test('adds quest on ADD_QUEST action ', () => {
  const initialState = {
    events: [],
    quests: []
  };
  const newState = eventReducer(initialState, {
    type: ADD_QUEST,
    payload: {}
  });
  expect(newState.quests.length).toBe(initialState.quests.length + 1);
});
test('removes quest on REMOVE_QUEST action ', () => {
  const initialState = {
    events: [],
    quests: [{ msg: 'im a quest', id: 1 }, { msg: 'im a quest', id: 3 }]
  };
  const newState = eventReducer(initialState, {
    type: REMOVE_QUEST,
    payload: 1
  });
  expect(newState.quests.length).toBe(initialState.quests.length - 1);
});
test('removes event on REMOVE_EVENT action ', () => {
  const initialState = {
    events: [{ msg: 'im an event', id: 1 }, { msg: 'im an event', id: 3 }],
    quests: []
  };
  const newState = eventReducer(initialState, {
    type: REMOVE_EVENT,
    payload: 1
  });
  expect(newState.events.length).toBe(initialState.events.length - 1);
});
