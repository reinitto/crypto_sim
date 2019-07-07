import { GET_ALL_CRYPTOS, GET_AVAILABLE_CRYPTOS } from './types';

// Get Contacts
export const getAllCryptos = time => async dispatch => {
  try {
    let week = 864000;
    let weeks = 10;
    var data = [];
    for (var i = 0; i < weeks; i++) {
      data.push(
        await fetch(`./cryptos/${time + week * i}`).then(res => res.json())
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
    console.log('error:', error);
    // dispatch({
    //   type: CONTACT_ERROR,
    //   payload: error.response.msg
    // });
  }
};

export const getAvailableCryptos = time => dispatch => {
  dispatch({
    type: GET_AVAILABLE_CRYPTOS,
    payload: time
  });
};
