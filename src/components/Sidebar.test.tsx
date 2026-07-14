import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Sidebar from './Sidebar';
import { Map, MessageSquare, Earth, TramFront } from 'lucide-react';

const mockNavItems = [
  { id: 'heatmap', label: 'Live Crowd Heatmap', icon: Map },
  { id: 'chat', label: 'OpsGPT Assistant', icon: MessageSquare },
  { id: 'comm', label: 'Multilingual Comm', icon: Earth },
  { id: 'transit', label: 'Transit & Grid', icon: TramFront },
];

describe('Sidebar Component', () => {
  it('renders all navigation items', () => {
    const setActiveTab = vi.fn();
    render(<Sidebar activeTab="heatmap" setActiveTab={setActiveTab} />);
    
    expect(screen.getAllByText('Live Crowd Heatmap')).toBeTruthy();
    expect(screen.getAllByText('OpsGPT Assistant')).toBeTruthy();
    expect(screen.getAllByText('Multilingual Comm')).toBeTruthy();
    expect(screen.getAllByText('Transit & Grid')).toBeTruthy();
  });

  it('calls setActiveTab when a navigation item is clicked', () => {
    const setActiveTab = vi.fn();
    render(<Sidebar activeTab="heatmap" setActiveTab={setActiveTab} />);
    
    const chatButton = screen.getAllByText('OpsGPT Assistant')[0].closest('button');
    if (chatButton) {
      fireEvent.click(chatButton);
    }
    
    expect(setActiveTab).toHaveBeenCalledWith('opsgpt');
  });
});
