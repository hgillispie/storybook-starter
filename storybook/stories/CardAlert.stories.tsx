import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';
import CardAlert from '../src/components/CardAlert';

const meta: Meta<typeof CardAlert> = {
  title: 'Dashboard/CardAlert',
  component: CardAlert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dashboard alert card component with call-to-action.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CardAlert />,
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <CardAlert />
      </Box>
      <Box sx={{ width: '75%', maxWidth: 300 }}>
        <CardAlert />
      </Box>
      <Box sx={{ width: '50%', maxWidth: 250 }}>
        <CardAlert />
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card alert in different sizes.',
      },
    },
  },
};

export const SideBySide: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ maxWidth: 1000 }}>
      <Box sx={{ flex: 1, maxWidth: 300 }}>
        <CardAlert />
      </Box>
      <Box sx={{ flex: 1, maxWidth: 300 }}>
        <CardAlert />
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two card alerts side by side.',
      },
    },
  },
};

export const MultipleAlerts: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <CardAlert />
      <CardAlert />
      <CardAlert />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple card alerts stacked vertically.',
      },
    },
  },
}; 