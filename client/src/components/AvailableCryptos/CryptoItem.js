import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min';
import { buyCrypto, sellCrypto } from '../../actions/userActions';
import { colorPicker } from './helpers';
function CryptoItem({
  item,
  money,
  timesToInvestLeft,
  userCryptos,
  buyCrypto,
  sellCrypto
}) {
  const { open, close, high, low, name } = item;

  var tryRequire = name => {
    try {
      return require(`../../../node_modules/cryptocurrency-icons/svg/color/${name
        .toString()
        .toLowerCase()}.svg`);
    } catch (err) {
      return require(`../../../node_modules/cryptocurrency-icons/svg/color/generic.svg`);
    }
  };
  let icon = name && tryRequire(name);

  const userOwnsCoin = coinName => {
    let coin = userCryptos.filter(c => c.name === coinName);
    if (coin.length === 0) {
      return false;
    }
    return true;
  };

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
    if (userOwnsCoin(name)) {
      sellCrypto(name, close, timesToInvestLeft);
    } else {
      M.toast({ html: 'You dont own this coin' });
      return;
    }
  };

  const changeInPrice = ((close / open) * 100 - 100).toPrecision(4);
  const color_open = colorPicker(open);
  const color_close = colorPicker(changeInPrice);
  return (
    <tr>
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
  userCryptos: PropTypes.array.isRequired,
  buyCrypto: PropTypes.func.isRequired,
  sellCrypto: PropTypes.func.isRequired
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
