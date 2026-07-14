import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App Component', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('renders the Dashboard by default', () => {
    // Render the App component
    render(<App />);

    // Check for the presence of the header or sidebar element
    const appElement = screen.getAllByText(/StadiaPulse/i);
    expect(appElement.length).toBeGreaterThan(0);
  });
});
