import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min';
import { buyCrypto, sellCrypto } from '../../actions/userActions';
import { colorPicker, tryRequire, userOwnsCoin } from './helpers';

export function CryptoItem({
  item,
  money,
  timesToInvestLeft,
  userCryptos,
  buyCrypto,
  sellCrypto,
  tryRequire,
  userOwnsCoin
}) {
  const { open, close, high, low, name } = item;

  let icon = name && tryRequire(name);

  const buy = () => {
    if (timesToInvestLeft < 1) {
      M.toast({ html: 'No more investing today' });
      return;
    } else if (money === 0) {
      M.toast({ html: 'Not enough money' });
      return;
    } else {
      buyCrypto(name, close, money, timesToInvestLeft);
    }
  };
  const sellAll = () => {
    if (timesToInvestLeft < 1) {
      M.toast({ html: 'No more investing today' });
      return;
    }
    //check to see if user owns coin
    if (userOwnsCoin(name, userCryptos)) {
      sellCrypto(name, close, timesToInvestLeft);
    } else {
      M.toast({ html: 'You dont own this coin' });
      return;
    }
  };

  const changeInPrice = ((close / open) * 100 - 100).toPrecision(4);
  const color_close = colorPicker(changeInPrice);
  return (
    <tr data-test='available-cryptos-item'>
      <td>
        <img src={icon} alt='coin_icon' className='left' /> {name}
      </td>
      <td style={{ backgroundColor: `${color_close}` }}>
        {changeInPrice}%
        <i className='material-icons small'>
          {changeInPrice > 0 ? 'arrow_drop_up' : 'arrow_drop_down'}
        </i>
      </td>
      <td>${close}</td>
      <td>
        <button
          data-test='available-cryptos-item-buy-button'
          style={{ width: '100%', height: '100%' }}
          className=' btn waves-effect waves-green btn-flat'
          onClick={buy}
        >
          Buy
        </button>
      </td>
      <td>
        <button
          data-test='available-cryptos-item-sell-button'
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
  userCryptos: PropTypes.array.isRequired,
  buyCrypto: PropTypes.func.isRequired,
  sellCrypto: PropTypes.func.isRequired,
  tryRequire: PropTypes.func.isRequired,
  userOwnsCoin: PropTypes.func.isRequired
};

CryptoItem.defaultProps = {
  tryRequire: tryRequire,
  userOwnsCoin: userOwnsCoin
};

const mapStateToProps = ({ user }) => ({
  money: user.money,
  time: user.time,
  timesToInvestLeft: user.timesToInvestLeft,
  userCryptos: user.cryptos
});

export default connect(
  mapStateToProps,
  { buyCrypto, sellCrypto }
)(CryptoItem);
