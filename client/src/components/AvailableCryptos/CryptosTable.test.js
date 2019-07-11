import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import { CryptosTable } from './CryptosTable';
import { CryptoItem } from './CryptoItem';

const defaultProps = {
  items: []
};

const setup = props => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<CryptosTable {...setupProps} />);
  return wrapper;
};

test('renders without crashing ', () => {
  const wrapper = setup();
  const CryptosTableComponent = findByTestAttr(
    wrapper,
    'component-cryptos-table'
  );
  expect(CryptosTableComponent.length).toBe(1);
});
test('renders items ', () => {
  let items = [
    { name: 'btc', open: 11, close: 22, high: 33, low: 1 },
    { name: 'ltc', open: 11, close: 22, high: 33, low: 1 }
  ];
  let content = items.map(i => (
    <CryptoItem key={i.name} item={i} userCryptos={[]} />
  ));
  const wrapper = setup({ children: content });
  const CryptoItems = wrapper.find('CryptoItem');

  expect(CryptoItems.length).toBe(items.length);
});
test('clicking on name calls sortCryptos function with name as arg', () => {
  const mock = jest.fn();
  const wrapper = setup({ sortCryptos: mock });
  const button = findByTestAttr(wrapper, 'button-sort-by-name');
  button.simulate('click');
  expect(mock).toHaveBeenCalledWith('name');
});
test('clicking on change calls sortCryptos function with change as arg', () => {
  const mock = jest.fn();
  const wrapper = setup({ sortCryptos: mock });
  const button = findByTestAttr(wrapper, 'button-sort-by-change');
  button.simulate('click');
  expect(mock).toHaveBeenCalledWith('change');
});
test('clicking on price calls sortCryptos function with price as arg', () => {
  const mock = jest.fn();
  const wrapper = setup({ sortCryptos: mock });
  const button = findByTestAttr(wrapper, 'button-sort-by-price');
  button.simulate('click');
  expect(mock).toHaveBeenCalledWith('price');
});
