import { storeFactory } from '../../../tests/testUtils';
import { addEvent, addQuest, removeEvent, removeQuest } from './eventActions';

describe('addEvent action', () => {
  const store = storeFactory();
  const oldEventState = store.getState().events.events;
  store.dispatch(addEvent());
  const newEventState = store.getState().events.events;
  test('adds event to state', () => {
    expect(newEventState.length).toBe(oldEventState.length + 1);
  });
  test('added event has correct properties', () => {
    const addedEvent = newEventState[newEventState.length - 1];
    expect(addedEvent).toHaveProperty('message');
    expect(addedEvent).toHaveProperty('id');
    expect(addedEvent).toHaveProperty('details');
    expect(addedEvent).toHaveProperty('details.cost');
  });
});
describe('removeEvent action', () => {
  const store = storeFactory();
  //add initial event
  store.dispatch(addEvent());
  const oldEventState = store.getState().events.events;
  const addedEvent = oldEventState[oldEventState.length - 1];
  test('removes event by id', () => {
    const eventId = addedEvent.id;
    store.dispatch(removeEvent(eventId));
    const newEventState = store.getState().events.events;
    expect(newEventState.length).toBe(oldEventState.length - 1);
  });
});

describe('addQuest action', () => {
  const store = storeFactory();
  const oldQuestState = store.getState().events.quests;
  store.dispatch(addQuest());
  const newQuestState = store.getState().events.quests;
  test('adds quest to state', () => {
    expect(newQuestState.length).toBe(oldQuestState.length + 1);
  });
  test('added quest has correct properties', () => {
    const addedQuest = newQuestState[newQuestState.length - 1];
    expect(addedQuest).toHaveProperty('message');
    expect(addedQuest).toHaveProperty('id');
    expect(addedQuest).toHaveProperty('details');
    expect(addedQuest).toHaveProperty('details.reward');
    expect(addedQuest).toHaveProperty('details.expiration');
  });
});

describe('removeQuest action', () => {
  const store = storeFactory();
  //add initial quest
  store.dispatch(addQuest());
  const oldState = store.getState().events.quests;
  const addedQuest = oldState[oldState.length - 1];
  test('remove quest by id', () => {
    const questId = addedQuest.id;
    store.dispatch(removeQuest(questId));
    const newQuestState = store.getState().events.quests;
    expect(newQuestState.length).toBe(oldState.length - 1);
  });
});
