import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCryptos } from '../../actions/cryptoActions';
import CryptoItem from './CryptoItem';
import { sortByChange, sortByName, sortByPrice, isInArray } from './helpers';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { advanceTime } from '../../actions/userActions';

export class AvailableCryptos extends Component {
  state = {
    cryptosState: null,
    nameToggle: false,
    changeToggle: false,
    priceToggle: false
  };

  setCryptosState = state => {
    this.setState({
      cryptosState: state
    });
  };
  toggleNameSort = () => {
    this.setState({
      nameToggle: !this.state.nameToggle
    });
  };
  toggleChangeSort = () => {
    this.setState({
      changeToggle: !this.state.changeToggle
    });
  };
  togglePriceSort = () => {
    this.setState({
      priceToggle: !this.state.priceToggle
    });
  };
  sortCryptos = (sortBy = 'name', cryptoArray = [], reverse = false) => {
    if (cryptoArray.length === 0) {
      this.setCryptosState([]);
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
      return this.setCryptosState(sortedCryptos.reverse());
    } else {
      return this.setCryptosState(sortedCryptos);
    }
  };
  render() {
    const { cryptosState, nameToggle, changeToggle, priceToggle } = this.state;
    const { advanceTime, getAllCryptos, time, allCryptos } = this.props;
    if (Object.keys(allCryptos).length === 0) {
      getAllCryptos(time);
    }

    if (!time) {
      return (
        <div data-test='component-available-cryptos'>
          <Spinner data-test='no-time-spinner' />
        </div>
      );
    }
    if (Object.keys(allCryptos).length === 0) {
      return (
        <div data-test='component-available-cryptos'>
          no cryptos available today
          <button data-test='button-advance-time' onClick={() => advanceTime()}>
            Advance Time
          </button>
        </div>
      );
    }
    if (cryptosState === null) {
      this.sortCryptos('name', allCryptos[time]);
    }
    if (
      cryptosState &&
      cryptosState[0].props.item.time !== Number(Object.keys(allCryptos)[0])
    ) {
      this.sortCryptos('name', allCryptos[time]);
    }
    return (
      <div data-test='component-available-cryptos'>
        <table data-test='component-table' className='centered'>
          <thead>
            <tr>
              <th>
                <a
                  style={{ display: 'block' }}
                  onClick={() => {
                    this.toggleNameSort();
                    this.sortCryptos('name', allCryptos[time], nameToggle);
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
                    this.toggleChangeSort();
                    this.sortCryptos('change', allCryptos[time], changeToggle);
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
                    this.togglePriceSort();
                    this.sortCryptos('price', allCryptos[time], priceToggle);
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

          <tbody>{cryptosState}</tbody>
        </table>
      </div>
    );
  }
}

AvailableCryptos.propTypes = {
  getAllCryptos: PropTypes.func.isRequired,
  time: PropTypes.number
};

const mapStateToProps = ({ user, cryptos }) => ({
  time: user.time,
  allCryptos: cryptos.allCryptos
});

export default connect(
  mapStateToProps,
  { getAllCryptos, advanceTime }
)(AvailableCryptos);
