import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  beforeAll(() => {
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  it('renders dashboard widgets', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Active Fans in Stadium/i)).toBeTruthy();
    expect(screen.getByText(/Transit Load/i)).toBeTruthy();
    expect(screen.getByText(/Grid Battery Reserve/i)).toBeTruthy();
  });
});
