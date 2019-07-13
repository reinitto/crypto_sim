import {
  ADD_EVENT,
  REMOVE_EVENT,
  ADD_QUEST,
  REMOVE_QUEST
} from '../actions/types';

const initialState = { events: [], quests: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case ADD_EVENT: {
      let newEvent = { ...action.payload };
      return {
        ...state,
        events: [...state.events, newEvent]
      };
    }
    case REMOVE_EVENT: {
      let idToRemove = action.payload;
      let newEvents = state.events.filter(e => e.id !== idToRemove);
      return {
        ...state,
        events: [...newEvents]
      };
    }
    case ADD_QUEST: {
      let newQuest = { ...action.payload };
      return {
        ...state,
        quests: [...state.quests, newQuest]
      };
    }
    case REMOVE_QUEST: {
      let idToRemove = action.payload;
      let newQuests = state.quests.filter(e => e.id !== idToRemove);
      return {
        ...state,
        quests: [...newQuests]
      };
    }
  }
};
