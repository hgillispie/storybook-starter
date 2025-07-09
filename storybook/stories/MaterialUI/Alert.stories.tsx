import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Stack } from '@mui/material';

const meta: Meta<typeof Alert> = {
  title: 'Material UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['error', 'warning', 'info', 'success'],
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'standard'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    severity: 'success',
    children: 'This is a success alert — check it out!',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    children: 'This is an error alert — check it out!',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    children: 'This is a warning alert — check it out!',
  },
};

export const Info: Story = {
  args: {
    severity: 'info',
    children: 'This is an info alert — check it out!',
  },
};

export const AllSeverities: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Alert variant="standard" severity="success">Standard success alert</Alert>
      <Alert variant="outlined" severity="success">Outlined success alert</Alert>
      <Alert variant="filled" severity="success">Filled success alert</Alert>
    </Stack>
  ),
}; 