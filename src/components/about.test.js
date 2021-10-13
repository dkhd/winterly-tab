import { render, screen } from '@testing-library/react';
import About from './about';

test('Render Test About', () => {
  render(<About open={true} />);
  const linkElement = screen.getByText(/About/i);
  expect(linkElement).toBeInTheDocument();
});
