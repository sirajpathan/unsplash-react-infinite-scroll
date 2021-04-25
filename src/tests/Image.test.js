import React from 'react';
import { render } from '@testing-library/react';
import Image from '../components/Image';
import {imageData} from './testData'

test('renders learn react link', () => {

  const { container} = render(<Image image={imageData.hits[0]} containerWidth={200} />);
  expect(container.firstChild.classList.contains('single-image-container')).toBe(true);
});
