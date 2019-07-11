import React, { Component } from 'react';
import CryptosTable from './CryptosTable';
import { connect } from 'react-redux';
import CryptoItem from './CryptoItem';
import { sortCryptos } from './helpers';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { advanceTime } from '../../actions/userActions';

export class AvailableCryptos extends Component {
  state = {
    time: this.props.time,
    cryptos: this.props.allCryptos[this.props.time],
    reverse: false,
    sortBy: 'name'
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
  render() {
    let content;

    if (this.props.allCryptos[this.props.time]) {
      let newContent = [...this.props.allCryptos[this.props.time]];
      let sortedContent = sortCryptos(
        this.state.sortBy,
        newContent,
        this.state.reverse
      );
      content = sortedContent.map(i => <CryptoItem key={i.name} item={i} />);
      if (content && content.length > 0) {
        return (
          <CryptosTable
            data-test='component-available-cryptos'
            sortCryptos={this.sortCryptos.bind(this)}
          >
            {content}
          </CryptosTable>
        );
      } else {
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
