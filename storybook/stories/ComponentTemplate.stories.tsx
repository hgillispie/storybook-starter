import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// TEMPLATE: How to import components from the main project
// 
// 1. Import from the main project using the alias:
// import { YourComponent } from 'mui-vite-demo/path/to/component';
//
// 2. If the component doesn't exist yet, you can create a placeholder:
// import { YourComponent } from 'mui-vite-demo/components/YourComponent';
//
// 3. Or use MUI components directly for examples:
// import { Button, Card, CardContent, Typography } from '@mui/material';

// Example: Creating a story for a custom component from the main project
const ExampleComponent = ({ title, content, variant = 'primary' }: {
  title: string;
  content: string;
  variant?: 'primary' | 'secondary';
}) => (
  <div style={{ 
    padding: '20px', 
    border: '1px solid #ccc', 
    borderRadius: '8px',
    backgroundColor: variant === 'primary' ? '#f0f8ff' : '#f5f5f5',
    maxWidth: '300px'
  }}>
    <h3 style={{ margin: '0 0 10px 0', color: variant === 'primary' ? '#1976d2' : '#666' }}>
      {title}
    </h3>
    <p style={{ margin: '0 0 15px 0', color: '#666' }}>
      {content}
    </p>
    <button style={{
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: variant === 'primary' ? '#1976d2' : '#666',
      color: 'white',
      cursor: 'pointer'
    }}>
      Action
    </button>
  </div>
);

const meta: Meta<typeof ExampleComponent> = {
  title: 'Components/ExampleComponent',
  component: ExampleComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Example Component',
    content: 'This is an example of how to create stories for components from the main project.',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Variant',
    content: 'This example shows the secondary variant.',
    variant: 'secondary',
  },
}; 