import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import Clock from './clock';

test('Render Test Clock', () => {
  render(<Clock open={true} />);
  const clockElement = screen.getByTestId("clock");
  expect(clockElement).toBeInTheDocument();
});

test('Check time rendered with correct format', () => {
  const mockDate = new DateTime(1634129255);
  DateTime.now = jest.fn().mockReturnValue(mockDate);
  render(<Clock open={true} />);
  const clockElement = screen.getByTestId("clock");
  expect(clockElement.textContent).toBe(mockDate.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS));
});
