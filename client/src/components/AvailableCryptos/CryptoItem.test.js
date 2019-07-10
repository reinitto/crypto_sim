import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import { CryptoItem } from './CryptoItem';
// event, onClickFunction
const defaultProps = {
  buyCrypto: jest.fn(),
  sellCrypto: jest.fn(),
  userCryptos: []
};
//title, icon, user, logoutUser
const setup = props => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<CryptoItem {...setupProps} />);
  return wrapper;
};

test('is renders properly ', () => {
  const prop = {
    open: 22,
    close: 44,
    high: 55,
    low: 11,
    name: 'cryptoName'
  };
  const wrapper = setup({ item: prop });
  const item = findByTestAttr(wrapper, 'available-cryptos-item');
  expect(item.length).toBe(1);
});
test('renders item props', () => {
  const prop = {
    open: 22,
    close: 44,
    high: 55,
    low: 11,
    name: 'cryptoName'
  };
  const wrapper = setup({ item: prop });
  const item = findByTestAttr(wrapper, 'available-cryptos-item');
  expect(item.text()).toContain(prop.name);
});
test('buy button works', () => {
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
  expect(buy_button.length).toBe(1);
  buy_button.simulate('click');
  expect(mock).toHaveBeenCalled();
});
test('buy button renders and buyCrypto is called when clicked', () => {
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
  expect(buy_button.length).toBe(1);
  buy_button.simulate('click');
  expect(mock).toHaveBeenCalled();
});
test('sell button renders', () => {
  const mock = jest.fn();
  const props = {
    sellCrypto: mock,
    item: {
      open: 22,
      close: 44,
      high: 55,
      low: 11,
      name: 'cryptoName'
    }
  };
  const wrapper = setup(props);
  const sell_button = findByTestAttr(
    wrapper,
    'available-cryptos-item-sell-button'
  );
  expect(sell_button.length).toBe(1);
});
// test('button calls passed in function', () => {
//   const mockF = jest.fn();
//   const props = {
//     event: { message: 'I am message', id: 1, details: { cost: 100 } },
//     onClickFunction: mockF
//   };
//   const wrapper = setup(props);
//   const button = findByTestAttr(wrapper, 'modal-accept-button');
//   button.simulate('click');
//   expect(mockF).toBeCalledTimes(1);
// });
// test('function is called with id as argument', () => {
//   const mockF = jest.fn();
//   const props = {
//     event: { message: 'I am message', id: 1, details: { cost: 100 } },
//     onClickFunction: mockF
//   };
//   const wrapper = setup(props);
//   const button = findByTestAttr(wrapper, 'modal-accept-button');
//   button.simulate('click');
//   expect(mockF).toBeCalledWith(props.event.id);
// });
