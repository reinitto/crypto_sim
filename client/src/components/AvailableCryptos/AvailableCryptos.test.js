import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import { AvailableCryptos } from '.';
// event, onClickFunction
const defaultProps = {
  getAllCryptos: jest.fn(),
  advanceTime: jest.fn()
};

const setup = props => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<AvailableCryptos {...setupProps} />);
  return wrapper;
};

test('is renders without crashing ', () => {
  const wrapper = setup();
  const availableCryptosComponent = findByTestAttr(
    wrapper,
    'component-available-cryptos'
  );

  expect(availableCryptosComponent.length).toBe(1);
});
test('is renders spinner if no time is provided', () => {
  const wrapper = setup();
  const noTimeSpinner = findByTestAttr(wrapper, 'no-time-spinner');
  expect(noTimeSpinner.length).toBe(1);
});
test('is renders text if no Cryptos available that day', () => {
  const wrapper = setup({ time: 12345678 });
  const component = findByTestAttr(wrapper, 'component-available-cryptos');
  expect(component.text()).toContain('no cryptos available today');
});
test('if no Cryptos available it renders button', () => {
  const wrapper = setup({ time: 12345678 });
  const button = findByTestAttr(wrapper, 'button-advance-time');
  expect(button.text().toLowerCase()).toContain('advance time');
});
test('button click calls advance time prop', () => {
  const mock = jest.fn();
  const wrapper = setup({ time: 12345678, advanceTime: mock });
  const button = findByTestAttr(wrapper, 'button-advance-time');
  button.simulate('click');
  expect(mock).toHaveBeenCalledTimes(1);
});
test('renders table', () => {
  const props = {
    time: 12345678,
    allCryptos: { 12345678: [{ name: 'coinName' }] }
  };
  const wrapper = setup(props);

  const table = findByTestAttr(wrapper, 'component-table');
  console.log(table.debug());
  expect(table).toBeTruthy();
});
//   const wrapper = setup(props);
//   const availableCryptosComponent = findByTestAttr(
//     wrapper,
//     'component-available-cryptos'
//   );
//   const mock = jest.fn();
//   wrapper.instance().sortCryptos = mock;
//   expect(mock).tohaveBeencalled();
// });
// test('  if (cryptosState && cryptosState.length === 0) text rendered', () => {});
// test(' if cryptosState !== 0 component with items is rendered', () => {});
