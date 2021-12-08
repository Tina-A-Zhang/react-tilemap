import { render, screen } from '@testing-library/react';
import App from '../App';

describe("render app elements", () => {

  test('renders zoom in button', () => {
    render(<App />);
    const linkElement = screen.getByText("+");
    expect(linkElement).toBeInTheDocument();
  });

  test('renders zoom out button', () => {
    render(<App />);
    const linkElement = screen.getByText("-");
    expect(linkElement).toBeInTheDocument();
  });

  test('render map correctly', () => {
    const { container } = render(<App />)
    expect(container.querySelector("Map")).toBeDefined;
  });

});


