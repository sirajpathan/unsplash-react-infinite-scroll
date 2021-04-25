import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../components/Loader';

test('renders learn react link', () => {
  const { container} = render(<Loader loading={true} />);
  expect(container.firstChild.classList.contains('loader-overlay')).toBe(true)
});
