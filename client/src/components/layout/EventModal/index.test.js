import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../../tests/testUtils';
import { EventModal } from '.';

const defaultProps = { removeQuest: jest.fn(), removeEvent: jest.fn() };
/**
 * Function that returns a ShallowWrapper for Event modal
 * @function setup
 * @param {object} props default props
 * @returns {shallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<EventModal {...setupProps} />);
  return wrapper;
};

test('renders correctly without crashing', () => {
  const wrapper = setup();
  expect(wrapper.html()).toBeNull();
});
test('renders items if provided', () => {
  const props = {
    events: [{ message: 'I am message', id: 1, details: { cost: 100 } }],
    quests: [{ message: 'I am message', id: 2, details: { cost: 100 } }]
  };
  const wrapper = setup(props);
  const modalEvent = findByTestAttr(wrapper, 'component-eventModal');
  expect(modalEvent.children().length).toBe(1);
});
describe('dismissEventById', () => {
  const mock1 = jest.fn();
  const mock2 = jest.fn();
  const mockId = 17;
  const props = {
    events: [{ message: 'I am message', id: 1, details: { cost: 100 } }],
    quests: [{ message: 'I am message', id: 2, details: { cost: 100 } }],
    removeQuest: mock1,
    removeEvent: mock2
  };
  const wrapper = setup(props);

  test('calls removeQuest(id)', () => {
    wrapper.instance().dismissEventById(mockId);
    expect(mock1).toHaveBeenCalledWith(mockId);
  });
  test('calls removeEvent(id)', () => {
    wrapper.instance().dismissEventById(mockId);
    expect(mock2).toHaveBeenCalledWith(mockId);
  });
});
