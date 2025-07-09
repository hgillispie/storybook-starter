import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip, Stack } from '@mui/material';
import { Face, Delete } from '@mui/icons-material';

const meta: Meta<typeof Chip> = {
  title: 'Material UI/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    clickable: {
      control: { type: 'boolean' },
    },
    deletable: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Chip',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Chip',
  },
};

export const Clickable: Story = {
  args: {
    label: 'Clickable Chip',
    clickable: true,
    onClick: () => alert('Chip clicked!'),
  },
};

export const Deletable: Story = {
  args: {
    label: 'Deletable Chip',
    onDelete: () => alert('Delete clicked!'),
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Face />,
    label: 'Chip with Icon',
  },
};

export const AllColors: Story = {
  render: () => (
    <Stack spacing={2} direction="row" flexWrap="wrap" gap={1}>
      <Chip label="Default" />
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Success" color="success" />
      <Chip label="Error" color="error" />
      <Chip label="Info" color="info" />
      <Chip label="Warning" color="warning" />
    </Stack>
  ),
}; 