import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('Header Component', () => {
  it('renders the header with venue options', () => {
    render(<Header />);
    
    // Check if default venue is rendered
    expect(screen.getByText('MetLife Stadium')).toBeTruthy();
  });

  it('toggles dropdown when clicked', () => {
    render(<Header />);
    
    const dropdownButton = screen.getByText('MetLife Stadium').closest('button');
    if (dropdownButton) {
        fireEvent.click(dropdownButton);
    }
    
    // Once clicked, other venues should be visible
    expect(screen.getByText('Estadio Azteca')).toBeTruthy();
    expect(screen.getByText('BMO Field')).toBeTruthy();
  });
});
