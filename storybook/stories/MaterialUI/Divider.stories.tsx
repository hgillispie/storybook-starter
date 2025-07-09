import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Divider, 
  Typography, 
  Box, 
  Stack,
  Paper
} from '@mui/material';

const meta: Meta<typeof Divider> = {
  title: 'Material UI/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Divider component with various orientations and variants.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The divider orientation.',
    },
    variant: {
      control: { type: 'select' },
      options: ['fullWidth', 'inset', 'middle'],
      description: 'The variant to use.',
    },
    flexItem: {
      control: { type: 'boolean' },
      description: 'If true, the divider will have a smaller height.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box sx={{ width: 400 }}>
      <Typography variant="h6" gutterBottom>
        Content Above
      </Typography>
      <Divider />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Content Below
      </Typography>
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Full Width (default)
        </Typography>
        <Divider />
        <Typography variant="body2" sx={{ mt: 1 }}>
          This divider spans the full width of its container.
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>
          Inset
        </Typography>
        <Divider variant="inset" />
        <Typography variant="body2" sx={{ mt: 1 }}>
          This divider has inset margins on the left and right.
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>
          Middle
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body2" sx={{ mt: 1 }}>
          This divider has inset margins on both sides.
        </Typography>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different divider variants: fullWidth, inset, and middle.',
      },
    },
  },
};

export const Orientations: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: 100 }}>
      <Typography variant="h6">Left</Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="h6">Center</Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="h6">Right</Typography>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical dividers used to separate content horizontally.',
      },
    },
  },
};

export const WithText: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <Divider>
        <Typography variant="body2" sx={{ px: 2 }}>
          OR
        </Typography>
      </Divider>
      
      <Divider>
        <Typography variant="body2" sx={{ px: 2 }}>
          Section Break
        </Typography>
      </Divider>
      
      <Divider>
        <Typography variant="body2" sx={{ px: 2 }}>
          Continue Reading
        </Typography>
      </Divider>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dividers with text content in the middle.',
      },
    },
  },
};

export const InLayout: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h5" gutterBottom>
        Article Title
      </Typography>
      <Typography variant="body1" paragraph>
        This is the introduction paragraph of the article. It provides context and sets up the main content.
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6" gutterBottom>
        Section 1
      </Typography>
      <Typography variant="body2" paragraph>
        This is the first section of the article. It contains detailed information about the topic.
      </Typography>
      
      <Divider variant="middle" sx={{ my: 2 }} />
      
      <Typography variant="h6" gutterBottom>
        Section 2
      </Typography>
      <Typography variant="body2" paragraph>
        This is the second section. It continues the discussion with additional details and examples.
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="body2" color="text.secondary">
        Article footer or conclusion text.
      </Typography>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dividers used in a typical article or content layout.',
      },
    },
  },
};

export const ListDividers: Story = {
  render: () => (
    <Paper sx={{ p: 2, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        List Items
      </Typography>
      
      <Box sx={{ py: 1 }}>
        <Typography variant="body2">List item 1</Typography>
      </Box>
      <Divider />
      
      <Box sx={{ py: 1 }}>
        <Typography variant="body2">List item 2</Typography>
      </Box>
      <Divider />
      
      <Box sx={{ py: 1 }}>
        <Typography variant="body2">List item 3</Typography>
      </Box>
      <Divider />
      
      <Box sx={{ py: 1 }}>
        <Typography variant="body2">List item 4</Typography>
      </Box>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dividers used to separate list items.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <Divider sx={{ borderColor: 'primary.main', borderWidth: 2 }} />
      
      <Divider sx={{ 
        borderColor: 'secondary.main', 
        borderWidth: 3,
        '&::before': {
          borderTop: 'thin solid',
          borderColor: 'error.main',
        },
        '&::after': {
          borderTop: 'thin solid',
          borderColor: 'success.main',
        }
      }} />
      
      <Divider sx={{ 
        height: 4,
        backgroundColor: 'warning.main',
        borderRadius: 2
      }} />
      
      <Divider sx={{ 
        borderStyle: 'dashed',
        borderColor: 'info.main'
      }} />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dividers with custom styling and colors.',
      },
    },
  },
}; 