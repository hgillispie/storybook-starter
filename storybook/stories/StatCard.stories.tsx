import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, Grid } from '@mui/material';
import StatCard from '../src/components/StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Dashboard/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dashboard stat card component with sparkline charts and trend indicators.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The title of the stat card.',
    },
    value: {
      control: { type: 'text' },
      description: 'The main value to display.',
    },
    interval: {
      control: { type: 'text' },
      description: 'The time interval for the data.',
    },
    trend: {
      control: { type: 'select' },
      options: ['up', 'down', 'neutral'],
      description: 'The trend direction.',
    },
    data: {
      control: { type: 'object' },
      description: 'Array of data points for the sparkline chart.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231',
    interval: 'vs. last month',
    trend: 'up',
    data: [4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000],
  },
};

export const UpwardTrend: Story = {
  args: {
    title: 'Active Users',
    value: '2,350',
    interval: 'vs. last week',
    trend: 'up',
    data: [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800],
  },
  parameters: {
    docs: {
      description: {
        story: 'Stat card showing an upward trend with increasing data.',
      },
    },
  },
};

export const DownwardTrend: Story = {
  args: {
    title: 'Bounce Rate',
    value: '24.5%',
    interval: 'vs. last month',
    trend: 'down',
    data: [80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
  },
  parameters: {
    docs: {
      description: {
        story: 'Stat card showing a downward trend with decreasing data.',
      },
    },
  },
};

export const NeutralTrend: Story = {
  args: {
    title: 'Conversion Rate',
    value: '3.2%',
    interval: 'vs. last quarter',
    trend: 'neutral',
    data: [3.1, 3.2, 3.1, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1],
  },
  parameters: {
    docs: {
      description: {
        story: 'Stat card showing a neutral trend with stable data.',
      },
    },
  },
};

export const VolatileData: Story = {
  args: {
    title: 'Stock Price',
    value: '$156.78',
    interval: 'vs. yesterday',
    trend: 'up',
    data: [150, 155, 148, 162, 158, 165, 160, 168, 172, 169, 175, 170, 178, 182, 179, 185, 180, 188, 192, 189, 195, 190, 198, 202, 199, 205, 200, 208, 212, 209],
  },
  parameters: {
    docs: {
      description: {
        story: 'Stat card with volatile data showing frequent ups and downs.',
      },
    },
  },
};

export const DashboardGrid: Story = {
  render: () => (
    <Grid container spacing={3} sx={{ maxWidth: 1200 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Revenue"
          value="$45,231"
          interval="vs. last month"
          trend="up"
          data={[4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Active Users"
          value="2,350"
          interval="vs. last week"
          trend="up"
          data={[1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Bounce Rate"
          value="24.5%"
          interval="vs. last month"
          trend="down"
          data={[80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          interval="vs. last quarter"
          trend="neutral"
          data={[3.1, 3.2, 3.1, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1]}
        />
      </Grid>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple stat cards arranged in a responsive grid layout.',
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box sx={{ width: '100%', height: 200 }}>
        <StatCard
          title="Large Stat Card"
          value="$123,456"
          interval="vs. last year"
          trend="up"
          data={[10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000, 42000, 44000, 46000, 48000, 50000, 52000, 54000, 56000, 58000, 60000, 62000, 64000, 66000, 68000]}
        />
      </Box>
      <Box sx={{ width: '50%', height: 150 }}>
        <StatCard
          title="Medium Stat Card"
          value="89.2%"
          interval="vs. last month"
          trend="down"
          data={[95, 93, 91, 89, 87, 85, 83, 81, 79, 77, 75, 73, 71, 69, 67, 65, 63, 61, 59, 57, 55, 53, 51, 49, 47, 45, 43, 41, 39, 37]}
        />
      </Box>
      <Box sx={{ width: '25%', height: 120 }}>
        <StatCard
          title="Small Stat Card"
          value="1,234"
          interval="vs. last week"
          trend="neutral"
          data={[1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900]}
        />
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stat cards in different sizes to show layout flexibility.',
      },
    },
  },
}; 