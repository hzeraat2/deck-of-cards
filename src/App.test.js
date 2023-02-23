import { render, screen } from '@testing-library/react';
import App from './App';

test('Card deck page should render text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Card Deck/i);
  expect(linkElement).toBeInTheDocument();
});
