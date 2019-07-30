import uuid from 'uuid';
import { ADD_EVENT, REMOVE_EVENT, ADD_QUEST, REMOVE_QUEST } from '../types';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let eventMessage = ['event1', 'event2', 'You lost your lucky screwdriver'];

export const addEvent = () => dispatch => {
  const id = uuid.v4();
  const num = getRandomInt(eventMessage.length);
  const message = eventMessage[num];
  const details = {
    cost: 150
  };
  dispatch({
    type: ADD_EVENT,
    payload: {
      message,
      id,
      details
    }
  });
};

export const removeEvent = id => dispatch => {
  dispatch({
    type: REMOVE_EVENT,
    payload: id
  });
};
export const addQuest = () => dispatch => {
  const id = uuid.v4();
  const num = getRandomInt(eventMessage.length);
  const message = eventMessage[num];
  const details = {
    reward: 1000,
    expiration: 4
  };
  dispatch({
    type: ADD_QUEST,
    payload: {
      message,
      id,
      details
    }
  });
};

export const removeQuest = id => dispatch => {
  dispatch({
    type: REMOVE_QUEST,
    payload: id
  });
};
