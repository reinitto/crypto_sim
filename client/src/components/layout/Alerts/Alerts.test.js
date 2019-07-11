import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../../tests/testUtils';
import { Alerts } from './Alerts';
/**
 * Function that returns ShallowWrapper for Alerts component
 * @function setup
 * @param {array} initialState array
 * @returns {ShallowWrapper}
 */
const setup = (initialState = []) => {
  const wrapper = shallow(<Alerts alerts={initialState} />);
  return wrapper;
};

test('renders correctly without crashing', () => {
  const wrapper = setup();
  const alertsComponent = findByTestAttr(wrapper, 'component-alerts');
  expect(alertsComponent.length).toBe(1);
});
test('renders correctly without crashing with props', () => {
  let props = [
    { msg: 'alert1', type: 'green', id: 1 },
    { msg: 'alert1', type: 'green', id: 2 }
  ];
  const wrapper = setup(props);
  const alertComponent = findByTestAttr(wrapper, 'alerts-item');
  expect(alertComponent.length).toBe(props.length);
});
