import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import { AvailableCryptos } from '.';
// event, onClickFunction
const defaultProps = {
  time: 12345678,
  allCryptos: { 12345678: [] },
  advanceTime: jest.fn()
};

/**
 * Factory function to create ShallowWrapper for AvailableCryptos Component
 * @function setup
 * @param {object} props
 * @returns {ShallowWrapper}
 */
const setup = props => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<AvailableCryptos {...setupProps} />);
  return wrapper;
};

describe('renders properly', () => {
  test('renders without crashing ', () => {
    const wrapper = setup();
    const availableCryptosComponent = findByTestAttr(
      wrapper,
      'component-available-cryptos'
    );
    expect(availableCryptosComponent.length).toBe(1);
  });
  test('renders table if items provided', () => {
    const props = {
      allCryptos: {
        12345678: [
          { name: 'btc', open: 11, close: 22, high: 33, low: 1 },
          { name: 'ltc', open: 11, close: 22, high: 33, low: 1 }
        ]
      }
    };
    const wrapper = setup(props);
    const component = findByTestAttr(wrapper, 'component-available-cryptos');
    expect(component.length).toBe(1);
  });

  test('renders spinner if items === undefined or null', () => {
    const props = {
      allCryptos: {}
    };
    const wrapper = setup(props);
    const cryptosComponent = findByTestAttr(wrapper, 'component-loading');
    expect(cryptosComponent.length).toBe(1);
  });
});
describe('allCryptos[date] array is empty', () => {
  const wrapper = setup();
  test('renders "No cryptos available today"', () => {
    const cryptosComponent = findByTestAttr(
      wrapper,
      'component-available-cryptos'
    );
    expect(cryptosComponent.text()).toContain('No cryptos available today');
  });
  test('renders "Advance time " button ', () => {
    const advanceTimeButton = findByTestAttr(wrapper, 'button-advance-time');
    expect(advanceTimeButton.length).toBe(1);
  });
  test('"Advance time " calls advance time prop function ', () => {
    const mock = jest.fn();
    const props = {
      advanceTime: mock
    };
    const wrapper = setup(props);
    wrapper.instance().advanceTime();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
