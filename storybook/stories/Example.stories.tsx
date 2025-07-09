import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Example: How to import a component from the main project
// Uncomment and modify the import path based on your actual component structure
// import { MyComponent } from 'mui-vite-demo/src/components/MyComponent';

// For demonstration, we'll create a simple component
const ExampleComponent = ({ 
  title, 
  description, 
  variant = 'default',
  disabled = false 
}: {
  title: string;
  description: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  disabled?: boolean;
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return { backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724' };
      case 'warning':
        return { backgroundColor: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' };
      case 'error':
        return { backgroundColor: '#f8d7da', borderColor: '#f5c6cb', color: '#721c24' };
      default:
        return { backgroundColor: '#f8f9fa', borderColor: '#dee2e6', color: '#495057' };
    }
  };

  return (
    <div style={{
      padding: '16px',
      border: '1px solid',
      borderRadius: '8px',
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'default',
      ...getVariantStyles()
    }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: '14px' }}>
        {description}
      </p>
    </div>
  );
};

const meta: Meta<typeof ExampleComponent> = {
  title: 'Examples/ComponentExample',
  component: ExampleComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Example Component',
    description: 'This is a default example component.',
    variant: 'default',
    disabled: false,
  },
};

export const Success: Story = {
  args: {
    title: 'Success State',
    description: 'This component shows a success state.',
    variant: 'success',
    disabled: false,
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning State',
    description: 'This component shows a warning state.',
    variant: 'warning',
    disabled: false,
  },
};

export const Error: Story = {
  args: {
    title: 'Error State',
    description: 'This component shows an error state.',
    variant: 'error',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled State',
    description: 'This component is disabled.',
    variant: 'default',
    disabled: true,
  },
}; 