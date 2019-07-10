import React, { Fragment, useEffect } from 'react';
import { loadUser, getUserLocal } from '../../actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AvailableCryptos from '../AvailableCryptos';

const Home = ({
  cryptos: { allCryptos },
  getUserLocal,
  loadUser,
  user,
  quests,
  events
}) => {
  useEffect(() => {
    if (!user) {
      getUserLocal();
    }
    //eslint-disable-next-line
  }, [quests, events]);
  const getUser = () => {
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    if (username && password) {
      loadUser(username, password);
    }
  };

  let time = () => {
    var utcSeconds = user.time;
    var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    date.setUTCSeconds(utcSeconds);
    var year = date.getFullYear();
    var month = monthNames[date.getMonth()];
    var day = date.getDate();

    return `${month} ${day}, ${year}`;
  };

  const calculateWorth = (coinName, amount) => {
    let coin =
      allCryptos &&
      allCryptos[user.time] &&
      allCryptos[user.time].filter(f => f.name === coinName);
    return coin && coin[0] ? Math.floor(coin[0].close * amount) : 0;
  };
  if (user && user !== null) {
    return (
      <Fragment>
        <h2>{`Welcome Back, ${user.userName}`}</h2>
        <div className='row'>
          <div className='col s12 m6'>
            <p>{`Your current available cash is $${Math.floor(user.money)}`}</p>
            <p>Your own these cryptos</p>
            <ul>
              {user.cryptos &&
                user.cryptos.map(c => (
                  <li key={c.name + c.amount}>
                    <strong>{c.name}:</strong> {Math.floor(c.amount)} worth $
                    {calculateWorth(c.name, c.amount)}
                  </li>
                ))}
            </ul>
            <div>Today is {time()}</div>
          </div>
          <div className='col s12 m6'>Your Skills</div>
        </div>
        <AvailableCryptos />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className='row'>
          <div className='input-field col s6'>
            <input
              placeholder='username'
              id='username'
              type='text'
              className='validate'
            />
            <label htmlFor='first_name'>Username</label>
          </div>
          <div className='input-field col s6'>
            <input id='password' type='text' />
            <label htmlFor='password'>Fake password</label>
          </div>
        </div>
        <button onClick={getUser}>Load user</button>
      </Fragment>
    );
  }
};

Home.propTypes = {
  cryptos: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ cryptos, alert, user, events }) => ({
  cryptos,
  alerts: alert,
  user,
  events: events.events,
  quests: events.quests
});

export default connect(
  mapStateToProps,
  { getUserLocal, loadUser }
)(Home);
