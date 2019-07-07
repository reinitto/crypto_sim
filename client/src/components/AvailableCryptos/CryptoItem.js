import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buyCrypto, sellCrypto } from '../../actions/userActions';
import M from 'materialize-css/dist/js/materialize.min';

function CryptoItem({ item, money, buyCrypto, sellCrypto, timesToInvestLeft }) {
  const { open, close, high, low, name } = item;

  let icon;
  //   try {
  //     let src = await fetch(`https://cryptoicons.org/api/black/${name}/400`, {
  //       mode: 'cors'
  //     });
  //     icon = src;
  //   } catch (error) {
  //     icon = null;
  //   }

  const buy = () => {
    if (timesToInvestLeft < 1) {
      M.toast({ html: 'No more investing this week' });
      return;
    }
    buyCrypto(name, close, money, timesToInvestLeft);
  };
  const sellAll = () => {
    if (timesToInvestLeft < 1) {
      M.toast({ html: 'No more investing this week' });
      return;
    }
    sellCrypto(name, close, timesToInvestLeft);
  };

  return (
    <div className='row'>
      <div className='col s12 m6'>
        <div className='card'>
          <div className='card blue-grey darken-1'>
            <div style={{ margin: '1rem' }} className='card-title '>
              <strong> {name} </strong>
              <strong className='right'>Price: ${close}</strong>
            </div>
            <div className='card-content text-white'>
              <div className='row'>
                <div className='col s6'>
                  <ul>
                    <li>Opened at: {open} </li>
                    <li>Closed at: {close} </li>
                  </ul>
                </div>
                <div className='col s6'>
                  <ul>
                    <li>Week High: {high} </li>
                    <li>Week Low: {low} </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='card-action'>
              <a className='waves-effect waves-teal btn-flat' onClick={buy}>
                Invest
              </a>
              <a className='waves-effect waves-teal btn-flat' onClick={sellAll}>
                Sell bags
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CryptoItem.propTypes = {
  item: PropTypes.object.isRequired,
  buyCrypto: PropTypes.func.isRequired,
  sellCrypto: PropTypes.func.isRequired
};
const mapStateToProps = ({ user }) => ({
  money: user.money,
  time: user.time,
  timesToInvestLeft: user.timesToInvestLeft
});

export default connect(
  mapStateToProps,
  { buyCrypto, sellCrypto }
)(CryptoItem);
