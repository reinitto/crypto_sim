import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../../tests/testUtils';
import { GameMenu } from './index';

const defaultProps = {
  advanceTime: jest.fn(),
  saveUser: jest.fn(),
  addEvent: jest.fn(),
  addQuest: jest.fn(),
  removeTodaysCryptos: jest.fn()
};
/**
 * Function that returns a shallow wrapper for GameMenu Component
 * @function setup
 * @param {object} props
 * @returns {ShallowWrapper}
 */
const setup = props => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<GameMenu {...setupProps} />);
  return wrapper;
};

test('doesnt render if no user provided', () => {
  const wrapper = setup();
  const gameMenuComponent = findByTestAttr(wrapper, 'component-gameMenu');
  expect(gameMenuComponent.length).toBe(0);
});

describe('has user', () => {
  let wrapper;
  const props = {
    user: { timesToInvestLeft: 0 }
  };
  beforeEach(() => {
    wrapper = setup(props);
  });

  test('renders correctly without crashing', () => {
    const gameMenuComponent = findByTestAttr(wrapper, 'component-gameMenu');
    expect(gameMenuComponent.length).toBe(1);
  });
});

describe('nextweek method', () => {
  const mockAddEvent = jest.fn();
  const mockAddQuest = jest.fn();
  const mockRemoveTodaysCryptos = jest.fn();
  const mockAdvanceTime = jest.fn();
  const props = {
    user: { timesToInvestLeft: 0 },
    addEvent: mockAddEvent,
    addQuest: mockAddQuest,
    removeTodaysCryptos: mockRemoveTodaysCryptos,
    advanceTime: mockAdvanceTime
  };
  let wrapper = setup(props);
  wrapper.instance().nextWeek();
  test('calls addEvent ', () => {
    expect(mockAddEvent).toHaveBeenCalled();
  });
  test('calls addQuest ', () => {
    expect(mockAddQuest).toHaveBeenCalled();
  });
  test('calls removeTodaysCryptos ', () => {
    expect(mockRemoveTodaysCryptos).toHaveBeenCalled();
  });
  test('calls advanceTime ', () => {
    expect(mockAdvanceTime).toHaveBeenCalled();
  });
});
describe('save method', () => {
  const mock = jest.fn();
  const user = {};
  const props = {
    saveUser: mock
  };
  const wrapper = setup(props);
  test('calls saveUser when invoked', () => {
    wrapper.instance().save(user);
    expect(mock).toHaveBeenCalled();
  });
  test('is invoked with user prop', () => {
    wrapper.instance().save(user);
    expect(mock).toHaveBeenCalledWith(user);
  });
});
