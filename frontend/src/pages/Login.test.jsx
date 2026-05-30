import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './LoginPage';

test('renders login page', () => {

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(
    screen.getByText('Login')
  ).toBeInTheDocument();
});