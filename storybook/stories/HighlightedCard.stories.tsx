import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, Grid } from '@mui/material';
import HighlightedCard from '../src/components/HighlightedCard';

const meta: Meta<typeof HighlightedCard> = {
  title: 'Dashboard/HighlightedCard',
  component: HighlightedCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dashboard highlighted card component with insights and call-to-action.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HighlightedCard />,
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box sx={{ width: '100%', height: 200 }}>
        <HighlightedCard />
      </Box>
      <Box sx={{ width: '50%', height: 150 }}>
        <HighlightedCard />
      </Box>
      <Box sx={{ width: '25%', height: 120 }}>
        <HighlightedCard />
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Highlighted card in different sizes to show responsive behavior.',
      },
    },
  },
};

export const SideBySide: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ maxWidth: 1000 }}>
      <Box sx={{ flex: 1, height: 200 }}>
        <HighlightedCard />
      </Box>
      <Box sx={{ flex: 1, height: 200 }}>
        <HighlightedCard />
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two highlighted cards side by side.',
      },
    },
  },
};

export const ResponsiveLayout: Story = {
  render: () => (
    <Grid container spacing={3} sx={{ maxWidth: 1200 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ height: 200 }}>
          <HighlightedCard />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ height: 200 }}>
          <HighlightedCard />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ height: 200 }}>
          <HighlightedCard />
        </Box>
      </Grid>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive grid layout with highlighted cards.',
      },
    },
  },
}; 