import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Import the StatCard component from the main project submodule
import StatCard, { StatCardProps } from '../../main-project/src/dashboard/components/StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Dashboard/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A statistics card component that displays a metric with a title, value, trend indicator, and a sparkline chart showing data over time.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the statistic',
    },
    value: {
      control: 'text',
      description: 'The main value to display',
    },
    interval: {
      control: 'text',
      description: 'The time interval for the statistic',
    },
    trend: {
      control: { type: 'select' },
      options: ['up', 'down', 'neutral'],
      description: 'The trend direction',
    },
    data: {
      control: 'object',
      description: 'Array of numbers for the sparkline chart',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '300px',
        padding: '20px',
        backgroundColor: '#f5f5f5'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for different scenarios
const sampleData = {
  increasing: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155],
  decreasing: [150, 145, 140, 135, 130, 125, 120, 115, 110, 105, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5],
  stable: [50, 52, 48, 51, 49, 53, 47, 50, 52, 48, 51, 49, 53, 47, 50, 52, 48, 51, 49, 53, 47, 50, 52, 48, 51, 49, 53, 47, 50, 52],
};

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231',
    interval: 'vs. last month',
    trend: 'up',
    data: sampleData.increasing,
  },
};

export const Decreasing: Story = {
  args: {
    title: 'Active Users',
    value: '2,345',
    interval: 'vs. last week',
    trend: 'down',
    data: sampleData.decreasing,
  },
};

export const Neutral: Story = {
  args: {
    title: 'Conversion Rate',
    value: '3.2%',
    interval: 'vs. last quarter',
    trend: 'neutral',
    data: sampleData.stable,
  },
};

export const HighValue: Story = {
  args: {
    title: 'Total Sales',
    value: '$1,234,567',
    interval: 'this year',
    trend: 'up',
    data: sampleData.increasing,
  },
};

export const SmallValue: Story = {
  args: {
    title: 'Error Rate',
    value: '0.12%',
    interval: 'vs. last hour',
    trend: 'down',
    data: sampleData.decreasing,
  },
}; 