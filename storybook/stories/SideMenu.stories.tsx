import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Import the SideMenu component from the main project submodule
import SideMenu from '../../main-project/src/dashboard/components/SideMenu';

const meta: Meta<typeof SideMenu> = {
  title: 'Dashboard/SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A permanent sidebar navigation component for the dashboard. This component includes user selection, menu content, alerts, and user profile information.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ 
        height: '100vh', 
        display: 'flex',
        backgroundColor: '#f5f5f5'
      }}>
        <Story />
        <div style={{ 
          flex: 1, 
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2>Main Content Area</h2>
            <p>This is where the main dashboard content would appear.</p>
            <p>The SideMenu is positioned on the left side.</p>
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithBackground: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ 
        height: '100vh', 
        display: 'flex',
        backgroundColor: '#1976d2',
        backgroundImage: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
      }}>
        <Story />
        <div style={{ 
          flex: 1, 
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <h2>Dashboard Content</h2>
            <p>This demonstrates the SideMenu with a gradient background.</p>
          </div>
        </div>
      </div>
    ),
  ],
}; 