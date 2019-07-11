import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import { CryptosTable } from './CryptosTable';
import { CryptoItem } from './CryptoItem';

const defaultProps = {
  sortCryptos: jest.fn()
};
/**
 * Factory function to create ShallowWrapper for CryptosTable Component
 * @function setup
 * @param {object} props
 * @returns {ShallowWrapper}
 */
const setup = props => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<CryptosTable {...setupProps} />);
  return wrapper;
};
describe('renders correctly', () => {
  test('without crashing ', () => {
    const wrapper = setup();
    const CryptosTableComponent = findByTestAttr(
      wrapper,
      'component-cryptos-table'
    );
    expect(CryptosTableComponent.length).toBe(1);
  });
  test('renders all items ', () => {
    let items = [
      { name: 'btc', open: 11, close: 22, high: 33, low: 1 },
      { name: 'ltc', open: 11, close: 22, high: 33, low: 1 }
    ];
    let userCryptos = [];
    let content = items.map(i => (
      <CryptoItem key={i.name} item={i} userCryptos={userCryptos} />
    ));
    const wrapper = setup({ children: content });
    const CryptoItems = wrapper.find('CryptoItem');
    expect(CryptoItems.length).toBe(items.length);
  });
});
describe('sorting table', () => {
  const mock = jest.fn();
  const wrapper = setup({ sortCryptos: mock });
  const sort_by_name = findByTestAttr(wrapper, 'button-sort-by-name');
  const sort_by_change = findByTestAttr(wrapper, 'button-sort-by-change');
  const sort_by_close = findByTestAttr(wrapper, 'button-sort-by-price');
  test('clicking on name calls sortCryptos function with "name" as arg', () => {
    sort_by_name.simulate('click');
    expect(mock).toHaveBeenCalledWith('name');
  });
  test('clicking on change calls sortCryptos function with "change" as arg', () => {
    sort_by_change.simulate('click');
    expect(mock).toHaveBeenCalledWith('change');
  });
  test('clicking on price calls sortCryptos function with "price" as arg', () => {
    sort_by_close.simulate('click');
    expect(mock).toHaveBeenCalledWith('price');
  });
});
