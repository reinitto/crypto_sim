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
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload]
      };
    case REMOVE_EVENT:
      let newEvents = state.events.filter(e => e.id !== action.payload);
      return {
        ...state,
        events: [...newEvents]
      };
    case ADD_QUEST:
      return {
        ...state,
        quests: [...state.quests, action.payload]
      };
    case REMOVE_QUEST:
      let newQuests = state.quests.filter(e => e.id !== action.payload);
      return {
        ...state,
        quests: [...newQuests]
      };
  }
};
