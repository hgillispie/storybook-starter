import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import StatCard from "../src/components/StatCard";
import PageViewsBarChart from "../src/components/PageViewsBarChart";

const meta: Meta = {
  title: "Tests/ResizeObserver Fix",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Test components to verify ResizeObserver errors are fixed",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const testData = [
  23, 45, 32, 56, 78, 45, 67, 89, 34, 12, 56, 78, 45, 23, 67, 89, 34, 56, 78,
  45, 32, 67, 89, 23, 45, 56, 78, 34, 45, 67,
];

export const MultipleCharts: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ResizeObserver Fix Test
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        This story tests multiple chart components to ensure ResizeObserver
        errors are properly handled. Open the browser console to verify no
        ResizeObserver errors are logged.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Page Views"
            value="1.2M"
            interval="Last 30 days"
            trend="up"
            data={testData}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Downloads"
            value="456K"
            interval="Last 30 days"
            trend="down"
            data={testData.map((x) => x * 0.8)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Conversions"
            value="89.2%"
            interval="Last 30 days"
            trend="up"
            data={testData.map((x) => x * 1.2)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Revenue"
            value="$12.3K"
            interval="Last 30 days"
            trend="neutral"
            data={testData.map((x) => x * 0.9)}
          />
        </Grid>

        <Grid item xs={12} lg={8}>
          <PageViewsBarChart />
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <StatCard
              title="Active Users"
              value="24.5K"
              interval="Last 24 hours"
              trend="up"
              data={testData.slice(0, 15)}
            />
            <StatCard
              title="Bounce Rate"
              value="32.1%"
              interval="Last 24 hours"
              trend="down"
              data={testData.slice(15).map((x) => x * 0.6)}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  ),
};

export const DynamicResize: Story = {
  render: () => {
    const [containerWidth, setContainerWidth] = React.useState("100%");
    const [containerHeight, setContainerHeight] = React.useState(400);

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dynamic Resize Test
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Test chart components with dynamic container resizing to verify
          ResizeObserver handling.
        </Typography>

        <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <button onClick={() => setContainerWidth("50%")}>50% Width</button>
          <button onClick={() => setContainerWidth("75%")}>75% Width</button>
          <button onClick={() => setContainerWidth("100%")}>100% Width</button>
          <button onClick={() => setContainerHeight(300)}>300px Height</button>
          <button onClick={() => setContainerHeight(400)}>400px Height</button>
          <button onClick={() => setContainerHeight(500)}>500px Height</button>
        </Box>

        <Box
          sx={{
            width: containerWidth,
            height: containerHeight,
            border: "2px dashed #ccc",
            transition: "all 0.3s ease",
            p: 2,
          }}
        >
          <Grid container spacing={2} sx={{ height: "100%" }}>
            <Grid item xs={12} md={6}>
              <StatCard
                title="Resizable Chart 1"
                value="123"
                interval="Dynamic"
                trend="up"
                data={testData.slice(0, 20)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: "100%" }}>
                <PageViewsBarChart />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  },
};

export const StressTest: Story = {
  render: () => {
    const [chartCount, setChartCount] = React.useState(4);

    const generateCharts = () => {
      const charts = [];
      for (let i = 0; i < chartCount; i++) {
        charts.push(
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <StatCard
              title={`Chart ${i + 1}`}
              value={`${Math.floor(Math.random() * 1000)}K`}
              interval="Test data"
              trend={
                ["up", "down", "neutral"][i % 3] as "up" | "down" | "neutral"
              }
              data={testData.map((x) => x + Math.random() * 20 - 10)}
            />
          </Grid>
        );
      }
      return charts;
    };

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Stress Test - Multiple Charts
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Test with multiple chart instances to ensure ResizeObserver errors
          don't compound.
        </Typography>

        <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <button onClick={() => setChartCount(4)}>4 Charts</button>
          <button onClick={() => setChartCount(8)}>8 Charts</button>
          <button onClick={() => setChartCount(12)}>12 Charts</button>
          <button onClick={() => setChartCount(16)}>16 Charts</button>
        </Box>

        <Grid container spacing={2}>
          {generateCharts()}
        </Grid>
      </Box>
    );
  },
};
