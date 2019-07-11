import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import { CryptoItem } from './CryptoItem';

const defaultProps = {
  buyCrypto: jest.fn(),
  sellCrypto: jest.fn(),
  userCryptos: []
};
/**
 * Factory function to create ShallowWrapper for CryptoItem Component
 * @function setup
 * @param {object} props
 * @returns {ShallowWrapper}
 */
const setup = props => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<CryptoItem {...setupProps} />);
  return wrapper;
};
describe('renders correctly without crashing', () => {
  const prop = {
    open: 22,
    close: 44,
    high: 55,
    low: 11,
    name: 'cryptoName'
  };
  const wrapper = setup({ item: prop });
  const item = findByTestAttr(wrapper, 'available-cryptos-item');
  test('renders correctly without crashing', () => {
    expect(item.length).toBe(1);
  });
  test('item name is rendered', () => {
    expect(item.text()).toContain(prop.name);
  });
  test('item close is rendered', () => {
    expect(item.text()).toContain(prop.close);
  });
  test('item change is rendered', () => {
    const change = ((prop.close / prop.open) * 100 - 100).toPrecision(4);
    expect(item.text()).toContain(change);
  });
});
describe('Buy button', () => {
  const mock = jest.fn();
  const props = {
    buyCrypto: mock,
    item: {
      open: 22,
      close: 44,
      high: 55,
      low: 11,
      name: 'cryptoName'
    }
  };
  const wrapper = setup(props);
  const buy_button = findByTestAttr(
    wrapper,
    'available-cryptos-item-buy-button'
  );
  test('buy button renders correctly', () => {
    expect(buy_button.length).toBe(1);
  });
  test('buyCrypto is called when buy button is clicked', () => {
    buy_button.simulate('click');
    expect(mock).toHaveBeenCalled();
  });
});

describe('Sell button', () => {
  const mockF = jest.fn();
  const mockUserOwnsCoin = jest.fn(() => true);
  const props = {
    sellCrypto: mockF,
    item: {
      open: 22,
      close: 44,
      high: 55,
      low: 11,
      name: 'cryptoName'
    },
    timesToInvestLeft: 4,
    userOwnsCoin: mockUserOwnsCoin
  };
  const wrapper = setup(props);
  const sell_button = findByTestAttr(
    wrapper,
    'available-cryptos-item-sell-button'
  );
  test('it renders properly', () => {
    expect(sell_button.length).toBe(1);
  });
  test('it calls passed in function when clicked on', () => {
    sell_button.simulate('click');
    expect(mockF).toBeCalledTimes(1);
  });
});
