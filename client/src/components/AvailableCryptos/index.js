import React, { Component, Fragment } from 'react';
import CryptosTable from './CryptosTable';
import { connect } from 'react-redux';
import CryptoItem from './CryptoItem';
import { sortCryptos } from './helpers';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { advanceTime } from '../../actions/user/userActions';

export class AvailableCryptos extends Component {
  state = {
    time: this.props.time,
    reverse: false,
    sortBy: 'name',
    itemsPerPage: 20,
    page: 0
  };

  sortCryptos(sortBy) {
    this.setState({
      sortBy,
      reverse: !this.state.reverse
    });
  }
  advanceTime() {
    this.props.advanceTime();
  }

  showPage = page => {
    this.setState({
      page
    });
  };

  render() {
    let content;
    const { showPage } = this;
    const { page, itemsPerPage } = this.state;
    if (this.props.allCryptos[this.props.time]) {
      const cryptos = this.props.allCryptos[this.props.time];
      const pagination = Array.from(
        new Array(Math.ceil(cryptos.length / itemsPerPage)),
        function(val, i) {
          return (
            <button
              style={
                i === page
                  ? { backgroundColor: '#2ab7a9' }
                  : { backgroundColor: 'buttonface' }
              }
              onClick={() => showPage(i)}
              key={i}
            >
              {i + 1}{' '}
            </button>
          );
        }
      );

      let sortedContent = sortCryptos(
        this.state.sortBy,
        cryptos,
        this.state.reverse
      );

      let itemsToDisplay = [...sortedContent].slice(
        page * itemsPerPage,
        (page + 1) * itemsPerPage
      );

      content = itemsToDisplay.map(i => <CryptoItem key={i.name} item={i} />);
      if (content && content.length > 0) {
        // allCryptos[date] has items
        return (
          <Fragment>
            {pagination}
            <CryptosTable
              data-test='component-available-cryptos'
              sortCryptos={this.sortCryptos.bind(this)}
              showPage={this.showPage.bind(this)}
            >
              {content}
            </CryptosTable>
          </Fragment>
        );
      } else {
        // allCryptos[date] is empty
        return (
          <div data-test='component-available-cryptos'>
            <p>No cryptos available today</p>
            <button data-test='button-advance-time' onClick={advanceTime}>
              Advance Time
            </button>
          </div>
        );
      }
    } else {
      // No allCryptos[date]
      // Means cryptos havent been received from server
      return (
        <div data-test='component-available-cryptos'>
          <Spinner data-test='component-loading' />
        </div>
      );
    }
  }
}

AvailableCryptos.propTypes = {
  time: PropTypes.number.isRequired,
  allCryptos: PropTypes.object.isRequired,
  advanceTime: PropTypes.func.isRequired
};

const mapStateToProps = ({ user, cryptos }) => ({
  time: user.time,
  allCryptos: cryptos.allCryptos
});

export default connect(
  mapStateToProps,
  { advanceTime }
)(AvailableCryptos);
