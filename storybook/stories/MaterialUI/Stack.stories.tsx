import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Stack, 
  Box, 
  Paper,
  Typography,
  Button,
  Chip,
  Avatar,
  Divider
} from '@mui/material';

const meta: Meta<typeof Stack> = {
  title: 'Material UI/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Stack component for flexible layouts with consistent spacing.',
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Defines the flex-direction style property.',
    },
    spacing: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Defines the space between immediate children.',
    },
    justifyContent: {
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Defines the justify-content style property.',
    },
    alignItems: {
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: 'Defines the align-items style property.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spacing: 2,
    children: (
      <>
        <Paper sx={{ p: 2, width: 100, textAlign: 'center' }}>Item 1</Paper>
        <Paper sx={{ p: 2, width: 100, textAlign: 'center' }}>Item 2</Paper>
        <Paper sx={{ p: 2, width: 100, textAlign: 'center' }}>Item 3</Paper>
      </>
    ),
  },
};

export const Directions: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>Row Direction</Typography>
        <Stack direction="row" spacing={2}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 3</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Column Direction</Typography>
        <Stack direction="column" spacing={2}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, textAlign: 'center' }}>Item 2</Paper>
          <Paper sx={{ p: 2, textAlign: 'center' }}>Item 3</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Row Reverse</Typography>
        <Stack direction="row-reverse" spacing={2}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 3</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Column Reverse</Typography>
        <Stack direction="column-reverse" spacing={2}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, textAlign: 'center' }}>Item 2</Paper>
          <Paper sx={{ p: 2, textAlign: 'center' }}>Item 3</Paper>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack components with different direction properties.',
      },
    },
  },
};

export const Spacing: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>Spacing 0</Typography>
        <Stack direction="row" spacing={0}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 3</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Spacing 1</Typography>
        <Stack direction="row" spacing={1}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 3</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Spacing 3</Typography>
        <Stack direction="row" spacing={3}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 3</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Spacing 5</Typography>
        <Stack direction="row" spacing={5}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 3</Paper>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack components with different spacing values.',
      },
    },
  },
};

export const JustifyContent: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>flex-start (default)</Typography>
        <Stack direction="row" spacing={2} sx={{ border: '1px dashed grey', p: 1 }}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>center</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ border: '1px dashed grey', p: 1 }}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>flex-end</Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ border: '1px dashed grey', p: 1 }}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>space-between</Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ border: '1px dashed grey', p: 1 }}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>space-around</Typography>
        <Stack direction="row" spacing={2} justifyContent="space-around" sx={{ border: '1px dashed grey', p: 1 }}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack components with different justifyContent values.',
      },
    },
  },
};

export const AlignItems: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>stretch (default)</Typography>
        <Stack direction="row" spacing={2} sx={{ border: '1px dashed grey', p: 1, height: 100 }}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>flex-start</Typography>
        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ border: '1px dashed grey', p: 1, height: 100 }}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>center</Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ border: '1px dashed grey', p: 1, height: 100 }}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>flex-end</Typography>
        <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ border: '1px dashed grey', p: 1, height: 100 }}>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 1</Paper>
          <Paper sx={{ p: 2, minWidth: 80, textAlign: 'center' }}>Item 2</Paper>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack components with different alignItems values.',
      },
    },
  },
};

export const ComplexLayout: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">User Profile</Typography>
          <Typography variant="body2" color="text.secondary">user@example.com</Typography>
        </Box>
        <Button variant="outlined" size="small">Edit</Button>
      </Stack>
      
      <Divider />
      
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Chip label="React" color="primary" />
        <Chip label="TypeScript" color="secondary" />
        <Chip label="Material-UI" color="info" />
        <Chip label="Storybook" color="success" />
      </Stack>
      
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button variant="contained">Save</Button>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="outlined" color="error">Delete</Button>
        </Stack>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex layout example using multiple Stack components.',
      },
    },
  },
};

export const Responsive: Story = {
  render: () => (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      spacing={{ xs: 1, sm: 2, md: 4 }}
      sx={{ maxWidth: 800 }}
    >
      <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
        <Typography variant="h6">Responsive Item 1</Typography>
        <Typography variant="body2">This changes direction and spacing based on screen size</Typography>
      </Paper>
      <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
        <Typography variant="h6">Responsive Item 2</Typography>
        <Typography variant="body2">Column on mobile, row on larger screens</Typography>
      </Paper>
      <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
        <Typography variant="h6">Responsive Item 3</Typography>
        <Typography variant="body2">Spacing increases with screen size</Typography>
      </Paper>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive Stack with different directions and spacing based on breakpoints.',
      },
    },
  },
}; 