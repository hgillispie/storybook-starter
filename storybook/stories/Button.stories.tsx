import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Example: How to import a component from the main project
// import { Button } from 'mui-vite-demo/components/Button';

// For demonstration, creating a simple button component
const Button = ({ 
  children, 
  variant = 'contained', 
  color = 'primary', 
  size = 'medium',
  disabled = false,
  onClick 
}: {
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const getStyles = () => {
    const baseStyles = {
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'inherit',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.6 : 1,
    };

    const sizeStyles = {
      small: { padding: '6px 12px', fontSize: '12px' },
      medium: { padding: '8px 16px', fontSize: '14px' },
      large: { padding: '12px 24px', fontSize: '16px' },
    };

    const colorStyles = {
      primary: { backgroundColor: '#1976d2', color: 'white' },
      secondary: { backgroundColor: '#9c27b0', color: 'white' },
      success: { backgroundColor: '#2e7d32', color: 'white' },
      error: { backgroundColor: '#d32f2f', color: 'white' },
      info: { backgroundColor: '#0288d1', color: 'white' },
      warning: { backgroundColor: '#ed6c02', color: 'white' },
    };

    const variantStyles = {
      text: {
        backgroundColor: 'transparent',
        color: colorStyles[color].backgroundColor,
        border: 'none',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: colorStyles[color].backgroundColor,
        border: `1px solid ${colorStyles[color].backgroundColor}`,
      },
      contained: {
        backgroundColor: colorStyles[color].backgroundColor,
        color: colorStyles[color].color,
        border: 'none',
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <button
      style={getStyles()}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'outlined', 'contained'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'contained',
    color: 'secondary',
    children: 'Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}; 