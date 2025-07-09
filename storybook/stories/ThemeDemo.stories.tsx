import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Button } from '@mui/material';

const ThemeDemo = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Theme Demo
    </Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>
      Use the theme toggle in the Storybook toolbar to switch between light and dark modes.
    </Typography>
    <Button variant="contained">Test Button</Button>
  </Box>
);

const meta: Meta<typeof ThemeDemo> = {
  title: 'Theme/Theme Demo',
  component: ThemeDemo,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};