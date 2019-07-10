import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllCryptos } from '../../actions/cryptoActions';
import CryptoItem from './CryptoItem';
import { sortByChange, sortByName, sortByPrice } from './helpers';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { advanceTime } from '../../actions/userActions';

function AvailableCryptos({
  advanceTime,
  getAllCryptos,
  time,
  cryptos: { allCryptos }
}) {
  const [cryptosState, setCryptosState] = useState(null);
  const [nameToggle, toggleNameSort] = useState(false);
  const [changeToggle, toggleChangeSort] = useState(false);
  const [priceToggle, togglePriceSort] = useState(false);

  const isInArray = (array, name) => {
    let isTrue;
    array.forEach(i => {
      if (i.name == name) {
        isTrue = true;
      }
    });
    return isTrue;
  };

  useEffect(() => {
    if (Object.keys(allCryptos).length === 0) {
      getAllCryptos(time);
      setCryptosState(null);
    }
    // else if (time) {
    //   console.log('time', time);
    //
    // }
  }, [time, allCryptos]);
  const sortCryptos = (sortBy = 'name', cryptoArray = [], reverse = false) => {
    if (cryptoArray.length === 0) {
      setCryptosState([]);
    }
    let sortedCryptos = [];
    cryptoArray.forEach(c => {
      if (!isInArray(sortedCryptos, c.name)) {
        sortedCryptos.push(c);
      } else {
        console.log(`${c.name} is already in array`);
      }
    });

    if (sortBy === 'name') {
      sortByName(sortedCryptos);
      sortedCryptos = sortedCryptos.map(c => (
        <CryptoItem key={c.name} item={c} />
      ));
    } else if (sortBy === 'change') {
      sortByChange(sortedCryptos);
      sortedCryptos = sortedCryptos.map(c => (
        <CryptoItem key={c.name} item={c} />
      ));
    } else if (sortBy === 'price') {
      sortByPrice(sortedCryptos);
      sortedCryptos = sortedCryptos.map(c => (
        <CryptoItem key={c.name} item={c} />
      ));
    }
    if (reverse) {
      return setCryptosState(sortedCryptos.reverse());
    } else {
      return setCryptosState(sortedCryptos);
    }
  };
  if (!time) {
    return <Spinner />;
  }
  if (allCryptos && Object.keys(allCryptos).length === 0) {
    return <Spinner />;
  }
  if (cryptosState === null) {
    let time = Object.keys(allCryptos)[0];
    sortCryptos('name', allCryptos[time]);
  }

  if (cryptosState && cryptosState.length === 0) {
    return (
      <div>
        no cryptos available today
        <button onClick={() => advanceTime()}>Advance Time</button>
      </div>
    );
  }
  return (
    <table className='centered'>
      <thead>
        <tr>
          <th>
            <a
              style={{ display: 'block' }}
              onClick={() => {
                toggleNameSort(!nameToggle);
                sortCryptos('name', allCryptos[time], nameToggle);
              }}
            >
              <span>Name</span>
              <small className='left valign-wrapper'>
                <i className='material-icons tiny '>sort_by_alpha</i>
              </small>
            </a>
          </th>
          <th>
            <a
              style={{ display: 'block' }}
              onClick={() => {
                toggleChangeSort(!changeToggle);
                sortCryptos('change', allCryptos[time], changeToggle);
              }}
            >
              <span>Change</span>
              <small className='left valign-wrapper'>
                <i className='material-icons tiny '>sort</i>
              </small>
            </a>
          </th>
          <th>
            <a
              style={{ display: 'block' }}
              onClick={() => {
                togglePriceSort(!priceToggle);
                sortCryptos('price', allCryptos[time], priceToggle);
              }}
            >
              <span>Price</span>
              <small className='left valign-wrapper'>
                <i className='material-icons tiny '>sort</i>
              </small>
            </a>
          </th>

          <th>Buy</th>
          <th>Sell</th>
        </tr>
      </thead>
      {/* <tbody>
        {allCryptos[time] &&
          allCryptos[time].map(c => <CryptoItem key={c.name} item={c} />)}
      </tbody> */}

      <tbody>{cryptosState}</tbody>
    </table>
  );
}

AvailableCryptos.propTypes = {
  getAllCryptos: PropTypes.func.isRequired,
  availableCryptos: PropTypes.array,
  time: PropTypes.number
};

const mapStateToProps = ({ user, cryptos }) => ({
  time: user.time,
  cryptos
});

export default connect(
  mapStateToProps,
  { getAllCryptos, advanceTime }
)(AvailableCryptos);
