import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import { Spinner } from './Spinner';

test('renders spinner withot crashing', () => {
  const wrapper = shallow(<Spinner />);
  const spinner = findByTestAttr(wrapper, 'component-spinner');
  expect(spinner.length).toBe(1);
});
