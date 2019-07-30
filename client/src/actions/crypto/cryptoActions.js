import { GET_ALL_CRYPTOS, REMOVE_TODAYS_CRYPTOS, SET_ALERT } from '../types';

// Get Contacts
export const getAllCryptos = time => async dispatch => {
  try {
    let day = 86400;
    let multiplier = 1;
    var data = [];
    for (var i = 0; i < multiplier; i++) {
      data.push(
        await fetch(`./cryptos/${time + day * i}`).then(res => res.json())
      );
    }

    Promise.all(data);
    let response = data
      .filter(d => d.length > 0)
      .reduce((acc, curr) => {
        if (acc[curr[0].timestamp]) {
          acc[curr[0].timestamp].cryptos = [
            ...acc[curr[0].cryptos].cryptos,
            ...curr[0].cryptos
          ];
          return acc;
        } else {
          acc[curr[0].timestamp] = [...curr[0].cryptos];
          return acc;
        }
      }, {});

    dispatch({
      type: GET_ALL_CRYPTOS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: { msg: error.response.msg, type: 'red' }
    });
  }
};

export const removeTodaysCryptos = time => dispatch => {
  dispatch({
    type: REMOVE_TODAYS_CRYPTOS,
    payload: time
  });
};
