import { render } from '@testing-library/react';
import Map from '../components/Map';

describe('renders elements in map correctly', () => {
  test('render img correctly', () => {
    const { container } = render(<Map />)
    expect(container.querySelector("img")).toBeDefined;
  });
});

