import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min';
import { buyCrypto, sellCrypto } from '../../actions/userActions';
import { colorPicker } from './helpers';
function CryptoItem({ item, money, timesToInvestLeft, buyCrypto, sellCrypto }) {
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

  const changeInPrice = ((close / open) * 100 - 100).toPrecision(4);
  const color_open = colorPicker(open);
  const color_close = colorPicker(changeInPrice);
  return (
    <tr>
      <td>{name}</td>
      <td style={{ backgroundColor: `${color_close}` }}>
        {changeInPrice}%
        <i className='material-icons small'>
          {changeInPrice > 0 ? 'arrow_drop_up' : 'arrow_drop_down'}
        </i>
      </td>
      <td>${close}</td>
      <td>
        <button
          style={{ width: '100%', height: '100%' }}
          className=' btn waves-effect waves-green btn-flat'
          onClick={buy}
        >
          Buy
        </button>
      </td>
      <td>
        <button
          style={{ width: '100%', height: '100%' }}
          className='waves-effect waves-red btn-flat btn'
          onClick={sellAll}
        >
          Sell all
        </button>
      </td>
    </tr>
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
