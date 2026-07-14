import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Chat from './Chat';

describe('Chat Component', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('renders the chat interface properly', () => {
    render(<Chat />);
    expect(screen.getByPlaceholderText('Type your message here...')).toBeTruthy();
  });

  it('allows user to type a message', () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText('Type your message here...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello OpsGPT' } });
    expect(input.value).toBe('Hello OpsGPT');
  });
});
