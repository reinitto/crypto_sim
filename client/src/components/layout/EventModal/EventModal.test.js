import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../../tests/testUtils';
import { EventModal } from '.';

const defaultProps = { removeQuest: jest.fn(), removeEvent: jest.fn() };
//title, icon, user, logoutUser
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<EventModal {...setupProps} />);
  return wrapper;
};

test('renders correctly without crashing', () => {
  const wrapper = setup();
  expect(wrapper.html()).toBeNull();
});
test('renders item if provided', () => {
  const props = {
    events: [{ message: 'I am message', id: 1, details: { cost: 100 } }],
    quests: [{ message: 'I am message', id: 2, details: { cost: 100 } }]
  };
  const wrapper = setup(props);
  const modalEvent = findByTestAttr(wrapper, 'component-eventModal');
  expect(modalEvent.children().length).toBe(1);
});
