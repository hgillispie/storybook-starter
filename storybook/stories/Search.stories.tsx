import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Import the Search component from the main project submodule
import Search from '../../main-project/src/dashboard/components/Search';

const meta: Meta<typeof Search> = {
  title: 'Dashboard/Search',
  component: Search,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A search input component with an icon adornment, designed for the dashboard header.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minWidth: '400px'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const InHeader: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '20px',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ fontSize: '14px', color: '#666' }}>Dashboard</div>
        <Story />
        <div style={{ fontSize: '14px', color: '#666' }}>User</div>
      </div>
    ),
  ],
}; 