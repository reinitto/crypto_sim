import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../../tests/testUtils';
import NextWeekButton from './NextWeekButton';

const mockClick = jest.fn();
const defaultProps = { user: { timesToInvestLeft: 0 }, nextWeek: mockClick };

const setup = props => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<NextWeekButton {...setupProps} />);
  return wrapper;
};

const wrapper = setup();
const nextWeekButton = findByTestAttr(wrapper, 'nextweek-button');
test('renders correctly', () => {
  expect(nextWeekButton.length).toBe(1);
});
test('clicking calls nextweek function', () => {
  nextWeekButton.simulate('click');
  expect(mockClick).toHaveBeenCalledTimes(1);
});
