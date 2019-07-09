import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import { Navbar } from './Navbar';

//title, icon, user, logoutUser
const setup = (initialProps = {}) => {
  const wrapper = shallow(<Navbar {...initialProps} />);
  return wrapper;
};

test('renders correctly without crashing', () => {
  const wrapper = setup();
  const navbarComponent = findByTestAttr(wrapper, 'component-navbar');
  expect(navbarComponent.length).toBe(1);
});

test('renders title correctly', () => {
  let wrapper;
  const props = {
    title: 'some title'
  };
  wrapper = setup(props);
  const navbarTitle = findByTestAttr(wrapper, 'navbar-title');
  expect(navbarTitle.length).toBe(1);
  expect(navbarTitle.text()).toBe(props.title);
});

describe('renders links', () => {
  test('renders guestLinks', () => {
    const wrapper = setup();
    const guestLinks = findByTestAttr(wrapper, 'navbar-links-guest');
    expect(guestLinks.length).toBe(1);
  });
  test('renders authLinks', () => {
    const props = { user: {} };
    const wrapper = setup(props);
    const authLinks = findByTestAttr(wrapper, 'navbar-links-auth');
    expect(authLinks.length).toBe(1);
  });
});

describe('logout button', () => {
  let wrapper;
  const props = { user: {}, logoutUser: jest.fn() };
  beforeEach(() => {
    wrapper = setup(props);
  });
  test('renders', () => {
    const logoutButton = findByTestAttr(wrapper, 'logout-button');
    expect(logoutButton.length).toBe(1);
  });
  test('logout is called if clicked', () => {
    const logoutButton = findByTestAttr(wrapper, 'logout-button');
    logoutButton.simulate('click');
    expect(props.logoutUser.mock.calls.length).toBe(1);
  });
});
