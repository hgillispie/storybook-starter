import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, Paper, Typography } from '@mui/material';
import StatCard from '../../../main-project/src/dashboard/components/StatCard';
import HighlightedCard from '../../../main-project/src/dashboard/components/HighlightedCard';
import PageViewsBarChart from '../../../main-project/src/dashboard/components/PageViewsBarChart';
import CardAlert from '../../../main-project/src/dashboard/components/CardAlert';

const meta: Meta = {
  title: 'Dashboard/DashboardLayout',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete dashboard layout showcasing multiple components working together.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteDashboard: Story = {
  render: () => (
    <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>
      
      {/* Stats Row */}
      <Stack direction="row" spacing={3} sx={{ mb: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <StatCard
            title="Total Revenue"
            value="$45,231"
            interval="vs. last month"
            trend="up"
            data={[4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000]}
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <StatCard
            title="Active Users"
            value="2,350"
            interval="vs. last week"
            trend="up"
            data={[1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800]}
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <StatCard
            title="Bounce Rate"
            value="24.5%"
            interval="vs. last month"
            trend="down"
            data={[80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65]}
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            interval="vs. last quarter"
            trend="neutral"
            data={[3.1, 3.2, 3.1, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1]}
          />
        </Box>
      </Stack>

      {/* Main Content Row */}
      <Stack direction="row" spacing={3} sx={{ mb: 4, flexWrap: 'wrap' }}>
        {/* Chart Section */}
        <Box sx={{ flex: '2 1 600px', minWidth: 400 }}>
          <PageViewsBarChart />
        </Box>
        
        {/* Sidebar */}
        <Stack spacing={3} sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <HighlightedCard />
          <CardAlert />
        </Stack>
      </Stack>

      {/* Bottom Row */}
      <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 400px', minWidth: 300 }}>
          <Paper sx={{ p: 3, height: 200 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User login at 2:30 PM
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New file uploaded at 1:45 PM
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comment added at 12:20 PM
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 400px', minWidth: 300 }}>
          <Paper sx={{ p: 3, height: 200 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Generate report
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Export data
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Update settings
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete dashboard layout with all components working together.',
      },
    },
  },
};

export const CompactDashboard: Story = {
  render: () => (
    <Box sx={{ p: 2, bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Compact Dashboard
      </Typography>
      
      {/* Compact Stats */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <StatCard
            title="Revenue"
            value="$12,345"
            interval="vs. last week"
            trend="up"
            data={[1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800]}
          />
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <StatCard
            title="Users"
            value="1,234"
            interval="vs. yesterday"
            trend="neutral"
            data={[1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900]}
          />
        </Box>
      </Stack>

      {/* Compact Layout */}
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ flex: '2 1 400px', minWidth: 300 }}>
          <PageViewsBarChart />
        </Box>
        <Stack spacing={2} sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <HighlightedCard />
          <CardAlert />
        </Stack>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact dashboard layout for smaller screens.',
      },
    },
  },
}; 