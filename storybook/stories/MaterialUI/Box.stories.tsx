import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Box, 
  Typography,
  Button,
  Paper,
  Stack,
  Divider
} from '@mui/material';

const meta: Meta<typeof Box> = {
  title: 'Material UI/Box',
  component: Box,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Box component for flexible styling and layout.',
      },
    },
  },
  argTypes: {
    sx: {
      control: { type: 'object' },
      description: 'The system prop that allows defining system overrides as well as additional CSS styles.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Box Content',
    sx: { p: 2, border: '1px solid grey', borderRadius: 1 },
  },
};

export const Styling: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>
        <Typography variant="h6">Primary Background</Typography>
        <Typography variant="body2">Box with primary color background</Typography>
      </Box>
      
      <Box sx={{ p: 2, bgcolor: 'secondary.main', color: 'white', borderRadius: 1 }}>
        <Typography variant="h6">Secondary Background</Typography>
        <Typography variant="body2">Box with secondary color background</Typography>
      </Box>
      
      <Box sx={{ p: 2, bgcolor: 'success.main', color: 'white', borderRadius: 1 }}>
        <Typography variant="h6">Success Background</Typography>
        <Typography variant="body2">Box with success color background</Typography>
      </Box>
      
      <Box sx={{ p: 2, bgcolor: 'error.main', color: 'white', borderRadius: 1 }}>
        <Typography variant="h6">Error Background</Typography>
        <Typography variant="body2">Box with error color background</Typography>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box components with different background colors and styling.',
      },
    },
  },
};

export const Layout: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box sx={{ width: 100, height: 60, bgcolor: 'primary.main', borderRadius: 1 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Flex Layout</Typography>
          <Typography variant="body2">Box with flex display and gap</Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="body2">Grid Item 1</Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: 'grey.200', borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="body2">Grid Item 2</Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: 'grey.300', borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="body2">Grid Item 3</Typography>
        </Box>
      </Box>
      
      <Box sx={{ position: 'relative', height: 100, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 10, 
          left: 10, 
          width: 50, 
          height: 50, 
          bgcolor: 'primary.main', 
          borderRadius: 1 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: 10, 
          right: 10, 
          width: 50, 
          height: 50, 
          bgcolor: 'secondary.main', 
          borderRadius: 1 
        }} />
        <Typography variant="body2" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Relative positioning
        </Typography>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box components demonstrating different layout techniques.',
      },
    },
  },
};

export const Spacing: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Box sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body2">Padding 1 (8px)</Typography>
      </Box>
      
      <Box sx={{ p: 2, bgcolor: 'grey.200', borderRadius: 1 }}>
        <Typography variant="body2">Padding 2 (16px)</Typography>
      </Box>
      
      <Box sx={{ p: 3, bgcolor: 'grey.300', borderRadius: 1 }}>
        <Typography variant="body2">Padding 3 (24px)</Typography>
      </Box>
      
      <Box sx={{ p: 4, bgcolor: 'grey.400', borderRadius: 1 }}>
        <Typography variant="body2">Padding 4 (32px)</Typography>
      </Box>
      
      <Box sx={{ px: 3, py: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>
        <Typography variant="body2">Different horizontal and vertical padding</Typography>
      </Box>
      
      <Box sx={{ m: 2, p: 2, bgcolor: 'secondary.main', color: 'white', borderRadius: 1 }}>
        <Typography variant="body2">Box with margin and padding</Typography>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box components with different spacing using the spacing system.',
      },
    },
  },
};

export const Responsive: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 800 }}>
      <Box sx={{ 
        width: { xs: '100%', sm: '50%', md: '33%' },
        height: { xs: 60, sm: 80, md: 100 },
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="body2">Responsive Box</Typography>
      </Box>
      
      <Box sx={{ 
        display: { xs: 'block', sm: 'flex' },
        gap: { xs: 1, sm: 2, md: 3 },
        p: { xs: 1, sm: 2, md: 3 },
        bgcolor: 'grey.100',
        borderRadius: 1
      }}>
        <Box sx={{ 
          flex: { sm: 1 },
          bgcolor: 'primary.main',
          color: 'white',
          p: 1,
          borderRadius: 1,
          textAlign: 'center'
        }}>
          <Typography variant="body2">Item 1</Typography>
        </Box>
        <Box sx={{ 
          flex: { sm: 1 },
          bgcolor: 'secondary.main',
          color: 'white',
          p: 1,
          borderRadius: 1,
          textAlign: 'center'
        }}>
          <Typography variant="body2">Item 2</Typography>
        </Box>
        <Box sx={{ 
          flex: { sm: 1 },
          bgcolor: 'success.main',
          color: 'white',
          p: 1,
          borderRadius: 1,
          textAlign: 'center'
        }}>
          <Typography variant="body2">Item 3</Typography>
        </Box>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive Box components that adapt to different screen sizes.',
      },
    },
  },
};

export const Components: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Box component="section" sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="h6">Section Component</Typography>
        <Typography variant="body2">This Box renders as a section element</Typography>
      </Box>
      
      <Box component="article" sx={{ p: 2, bgcolor: 'grey.200', borderRadius: 1 }}>
        <Typography variant="h6">Article Component</Typography>
        <Typography variant="body2">This Box renders as an article element</Typography>
      </Box>
      
      <Box component="header" sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>
        <Typography variant="h6">Header Component</Typography>
        <Typography variant="body2">This Box renders as a header element</Typography>
      </Box>
      
      <Box component="footer" sx={{ p: 2, bgcolor: 'secondary.main', color: 'white', borderRadius: 1 }}>
        <Typography variant="h6">Footer Component</Typography>
        <Typography variant="body2">This Box renders as a footer element</Typography>
      </Box>
      
      <Box component="aside" sx={{ p: 2, bgcolor: 'success.main', color: 'white', borderRadius: 1 }}>
        <Typography variant="h6">Aside Component</Typography>
        <Typography variant="body2">This Box renders as an aside element</Typography>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box components rendering as different HTML elements.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: 'primary.main', 
          color: 'white', 
          borderRadius: 1,
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: 'primary.dark',
            transform: 'scale(1.02)',
          }
        }}
      >
        <Typography variant="h6">Hover Effect</Typography>
        <Typography variant="body2">Hover over this box to see the effect</Typography>
      </Box>
      
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: 'secondary.main', 
          color: 'white', 
          borderRadius: 1,
          cursor: 'pointer',
          transition: 'all 0.3s',
          '&:hover': {
            bgcolor: 'secondary.dark',
            boxShadow: 3,
          }
        }}
      >
        <Typography variant="h6">Shadow Effect</Typography>
        <Typography variant="body2">Hover to add shadow</Typography>
      </Box>
      
      <Box 
        sx={{ 
          p: 2, 
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: 1,
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'secondary.main',
            bgcolor: 'primary.light',
          }
        }}
      >
        <Typography variant="h6">Border Effect</Typography>
        <Typography variant="body2">Hover to change border and background</Typography>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive Box components with hover effects.',
      },
    },
  },
};

export const ComplexExample: Story = {
  render: () => (
    <Box sx={{ maxWidth: 800 }}>
      <Box component="header" sx={{ p: 3, bgcolor: 'primary.main', color: 'white', borderRadius: '8px 8px 0 0' }}>
        <Typography variant="h4">Dashboard Header</Typography>
        <Typography variant="body2">Welcome to your dashboard</Typography>
      </Box>
      
      <Box sx={{ p: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1, p: 2, bgcolor: 'success.light', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">1,234</Typography>
          </Box>
          <Box sx={{ flex: 1, p: 2, bgcolor: 'info.light', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="h6">Active Sessions</Typography>
            <Typography variant="h4">567</Typography>
          </Box>
          <Box sx={{ flex: 1, p: 2, bgcolor: 'warning.light', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="h6">Pending Tasks</Typography>
            <Typography variant="h4">89</Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <Typography variant="body2">User login at 2:30 PM</Typography>
            <Typography variant="body2">New file uploaded at 1:45 PM</Typography>
            <Typography variant="body2">Comment added at 12:20 PM</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button variant="contained" size="small">Add User</Button>
              <Button variant="outlined" size="small">Export Data</Button>
              <Button variant="outlined" size="small">Settings</Button>
            </Stack>
          </Box>
        </Box>
      </Box>
      
      <Box component="footer" sx={{ p: 2, bgcolor: 'grey.100', borderRadius: '0 0 8px 8px', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Dashboard v1.0 • Last updated: 2 minutes ago
        </Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex example showing a dashboard layout using multiple Box components.',
      },
    },
  },
}; 