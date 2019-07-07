import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getAvailableCryptos,
  getAllCryptos
} from '../../actions/cryptoActions';
import CryptoItemSmall from './CryptoItemSmall';
import { sortByChange, sortByName, sortByPrice } from './helpers';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

function AvailableCryptos({ getAllCryptos, time, cryptos: { allCryptos } }) {
  const [cryptosState, setCryptosState] = useState(null);
  const [nameToggle, toggleNameSort] = useState(false);
  const [changeToggle, toggleChangeSort] = useState(false);
  const [priceToggle, togglePriceSort] = useState(false);
  let dates =
    allCryptos &&
    Object.keys(allCryptos).length > 0 &&
    Object.keys(allCryptos).reduce((acc, curr) => {
      return acc > curr ? curr : acc;
    });
  useEffect(() => {
    getAllCryptos(time);
    sortCryptos('name', allCryptos[time]);
  }, [time, dates]);

  const sortCryptos = (sortBy = 'name', cryptoArray = [], reverse = false) => {
    let sortedCryptos = [...cryptoArray];
    if (sortBy === 'name') {
      sortByName(sortedCryptos);
      sortedCryptos = sortedCryptos.map(c => (
        <CryptoItemSmall key={c.name} item={c} />
      ));
    } else if (sortBy === 'change') {
      sortByChange(sortedCryptos);
      sortedCryptos = sortedCryptos.map(c => (
        <CryptoItemSmall key={c.name} item={c} />
      ));
    } else if (sortBy === 'price') {
      sortByPrice(sortedCryptos);
      sortedCryptos = sortedCryptos.map(c => (
        <CryptoItemSmall key={c.name} item={c} />
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
              Name
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
              Change
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
              Price
            </a>
          </th>

          <th>Buy</th>
          <th>Sell</th>
        </tr>
      </thead>

      <tbody>{cryptosState}</tbody>
    </table>
  );
}

AvailableCryptos.propTypes = {
  getAvailableCryptos: PropTypes.func.isRequired,
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
  { getAvailableCryptos, getAllCryptos }
)(AvailableCryptos);
