import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import { EventModal } from './EventModal';

const defualtProps = {
};
//title, icon, user, logoutUser
const setup = (props = {}) => {
  const setupProps = { ...defualtProps, ...props };
  const wrapper = shallow(<EventModal {...setupProps} />);
  return wrapper;
};

test('renders correctly without crashing', () => {
  const wrapper = setup();
  const eventModalComponent = findByTestAttr(wrapper, 'component-eventModal');
  expect(eventModalComponent.length).toBe(1);
});
test('renders message if provided', () => {
    const props = {
        events: [{ message: 'I am message' ,id:1, details:{cost:100}}],
        quests: [{ message: 'I am message' ,id:2, details:{cost:100}}]
      }
  const wrapper = setup(props);
  const modalEvent = findByTestAttr(wrapper, 'modal-event');
  console.log(modalEvent.debug())
  expect(modalEvent.length).toBe(props.events.length);
});
