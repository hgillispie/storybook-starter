import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';
import PageViewsBarChart from '../../../main-project/src/dashboard/components/PageViewsBarChart';

const meta: Meta<typeof PageViewsBarChart> = {
  title: 'Dashboard/PageViewsBarChart',
  component: PageViewsBarChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dashboard bar chart component showing page views and downloads data.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageViewsBarChart />,
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box sx={{ width: '100%', height: 400 }}>
        <PageViewsBarChart />
      </Box>
      <Box sx={{ width: '75%', height: 300 }}>
        <PageViewsBarChart />
      </Box>
      <Box sx={{ width: '50%', height: 250 }}>
        <PageViewsBarChart />
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Page views bar chart in different sizes.',
      },
    },
  },
};

export const SideBySide: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ maxWidth: 1200 }}>
      <Box sx={{ flex: 1, height: 350 }}>
        <PageViewsBarChart />
      </Box>
      <Box sx={{ flex: 1, height: 350 }}>
        <PageViewsBarChart />
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two page views bar charts side by side.',
      },
    },
  },
};

export const CompactLayout: Story = {
  render: () => (
    <Box sx={{ maxWidth: 600, height: 300 }}>
      <PageViewsBarChart />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact layout for the page views bar chart.',
      },
    },
  },
}; 