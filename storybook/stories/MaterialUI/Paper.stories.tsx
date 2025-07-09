import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Paper, 
  Typography, 
  Box, 
  Stack,
  Grid,
  Divider
} from '@mui/material';

const meta: Meta<typeof Paper> = {
  title: 'Material UI/Paper',
  component: Paper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Paper component with various elevations and variants.',
      },
    },
  },
  argTypes: {
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
      description: 'Shadow depth, corresponds to dp in the spec.',
    },
    variant: {
      control: { type: 'select' },
      options: ['elevation', 'outlined'],
      description: 'The variant to use.',
    },
    square: {
      control: { type: 'boolean' },
      description: 'If true, rounded corners are disabled.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Paper sx={{ p: 2, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Paper Component
      </Typography>
      <Typography variant="body2">
        This is a basic Paper component with default elevation and padding.
      </Typography>
    </Paper>
  ),
};

export const ElevationVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
      <Paper elevation={0} sx={{ p: 2, width: 150, textAlign: 'center' }}>
        <Typography variant="h6">0</Typography>
        <Typography variant="body2">No shadow</Typography>
      </Paper>
      <Paper elevation={1} sx={{ p: 2, width: 150, textAlign: 'center' }}>
        <Typography variant="h6">1</Typography>
        <Typography variant="body2">Low shadow</Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, width: 150, textAlign: 'center' }}>
        <Typography variant="h6">3</Typography>
        <Typography variant="body2">Medium shadow</Typography>
      </Paper>
      <Paper elevation={6} sx={{ p: 2, width: 150, textAlign: 'center' }}>
        <Typography variant="h6">6</Typography>
        <Typography variant="body2">High shadow</Typography>
      </Paper>
      <Paper elevation={12} sx={{ p: 2, width: 150, textAlign: 'center' }}>
        <Typography variant="h6">12</Typography>
        <Typography variant="body2">Very high shadow</Typography>
      </Paper>
      <Paper elevation={24} sx={{ p: 2, width: 150, textAlign: 'center' }}>
        <Typography variant="h6">24</Typography>
        <Typography variant="body2">Maximum shadow</Typography>
      </Paper>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Paper components with different elevation levels to demonstrate shadow depth.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Elevated Paper
        </Typography>
        <Typography variant="body2">
          This paper uses the default elevation variant with a shadow.
        </Typography>
      </Paper>
      
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Outlined Paper
        </Typography>
        <Typography variant="body2">
          This paper uses the outlined variant with a border instead of shadow.
        </Typography>
      </Paper>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Paper components with different variants: elevated and outlined.',
      },
    },
  },
};

export const LayoutExample: Story = {
  render: () => (
    <Box sx={{ maxWidth: 800 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Application Layout
        </Typography>
        <Typography variant="body1" paragraph>
          Paper components are commonly used to create distinct sections in layouts.
        </Typography>
      </Paper>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper elevation={1} sx={{ p: 2, height: 200, flex: 1, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Sidebar Content
          </Typography>
          <Typography variant="body2">
            This could be navigation, filters, or secondary information.
          </Typography>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, height: 200, flex: 1, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Main Content
          </Typography>
          <Typography variant="body2">
            This is the primary content area of the application.
          </Typography>
        </Paper>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of how Paper components can be used in a layout.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            elevation: 8,
            transform: 'translateY(-2px)',
          }
        }}
      >
        <Typography variant="h6" gutterBottom>
          Hover Me
        </Typography>
        <Typography variant="body2">
          This paper has hover effects. Try hovering over it!
        </Typography>
      </Paper>
      
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'primary.main',
            borderWidth: 2,
          }
        }}
      >
        <Typography variant="h6" gutterBottom>
          Outlined Hover
        </Typography>
        <Typography variant="body2">
          This outlined paper changes border color on hover.
        </Typography>
      </Paper>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive Paper components with hover effects.',
      },
    },
  },
};

export const ContentSections: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Section 1: Introduction
        </Typography>
        <Typography variant="body2" paragraph>
          This is the first section of content. Paper components help organize information into distinct, visually separated areas.
        </Typography>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Section 2: Details
        </Typography>
        <Typography variant="body2" paragraph>
          Each section can contain different types of content, from text to forms to data displays.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2">
          Additional content can be separated with dividers or other components.
        </Typography>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Section 3: Actions
        </Typography>
        <Typography variant="body2">
          The final section might contain action buttons or summary information.
        </Typography>
      </Paper>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple Paper components used to create content sections.',
      },
    },
  },
}; 