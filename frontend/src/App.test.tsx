import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render heading platform users', () => {
    render(<App />);
    expect(screen.getByText('Platform Users')).toBeInTheDocument();
  });
});
