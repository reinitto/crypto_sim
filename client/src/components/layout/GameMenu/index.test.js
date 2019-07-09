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
