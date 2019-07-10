import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../../tests/testUtils';
import { Item } from './Item';
// event, onClickFunction
const defaultProps = { onClickFunction: jest.fn() };
//title, icon, user, logoutUser
const setup = (
  props = {
    event: {
      message: 'I am message',
      id: 1,
      details: {
        cost: 50
      }
    }
  }
) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Item {...setupProps} />);
  return wrapper;
};

test('is renders properly ', () => {
  const wrapper = setup();
  const item = findByTestAttr(wrapper, 'eventModal-item');
  expect(item.length).toBe(1);
});
test('renders event message', () => {
  const props = {
    event: { message: 'I am message', id: 1, details: { cost: 100 } }
  };
  const wrapper = setup(props);
  const item = findByTestAttr(wrapper, 'eventModal-item');
  expect(item.text()).toContain(props.event.message);
});
test('renders event cost', () => {
  const props = {
    event: { message: 'I am message', id: 1, details: { cost: 100 } }
  };
  const wrapper = setup(props);
  const item = findByTestAttr(wrapper, 'eventModal-item');
  expect(item.text()).toContain(props.event.details.cost);
});
test('button calls passed in function', () => {
  const mockF = jest.fn();
  const props = {
    event: { message: 'I am message', id: 1, details: { cost: 100 } },
    onClickFunction: mockF
  };
  const wrapper = setup(props);
  const button = findByTestAttr(wrapper, 'modal-accept-button');
  button.simulate('click');
  expect(mockF).toBeCalledTimes(1);
});
test('function is called with id as argument', () => {
  const mockF = jest.fn();
  const props = {
    event: { message: 'I am message', id: 1, details: { cost: 100 } },
    onClickFunction: mockF
  };
  const wrapper = setup(props);
  const button = findByTestAttr(wrapper, 'modal-accept-button');
  button.simulate('click');
  expect(mockF).toBeCalledWith(props.event.id);
});
