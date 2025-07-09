import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Stack, Box } from '@mui/material';

const meta: Meta<typeof Button> = {
  title: 'Material UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Button component with various variants, colors, and sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'outlined', 'contained'],
      description: 'The variant to use.',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'The color of the component.',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the component.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'If true, the component is disabled.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2} direction="row" flexWrap="wrap" gap={2}>
      <Button variant="text">Text</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="contained">Contained</Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button variants: text, outlined, and contained.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={2} direction="row" flexWrap="wrap" gap={2}>
      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="contained" color="secondary">Secondary</Button>
      <Button variant="contained" color="error">Error</Button>
      <Button variant="contained" color="info">Info</Button>
      <Button variant="contained" color="success">Success</Button>
      <Button variant="contained" color="warning">Warning</Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with different color themes.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2} direction="row" alignItems="center" flexWrap="wrap" gap={2}>
      <Button size="small" variant="contained">Small</Button>
      <Button size="medium" variant="contained">Medium</Button>
      <Button size="large" variant="contained">Large</Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons in different sizes: small, medium, and large.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Stack spacing={2} direction="row" flexWrap="wrap" gap={2}>
      <Button variant="contained">Normal</Button>
      <Button variant="contained" disabled>Disabled</Button>
      <Button variant="contained" loading>Loading</Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states: normal, disabled, and loading.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Stack spacing={2} direction="row" flexWrap="wrap" gap={2}>
      <Button variant="contained" startIcon={<span>🚀</span>}>
        Start Icon
      </Button>
      <Button variant="contained" endIcon={<span>⭐</span>}>
        End Icon
      </Button>
      <Button variant="contained">
        <span>🎯</span>
      </Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons at different positions.',
      },
    },
  },
}; 