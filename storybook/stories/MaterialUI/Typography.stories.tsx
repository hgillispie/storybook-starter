import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Typography, 
  Box, 
  Stack,
  Paper,
  Divider
} from '@mui/material';

const meta: Meta<typeof Typography> = {
  title: 'Material UI/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Typography component with various variants and styles.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline', 'button'],
      description: 'The variant to use.',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'text.primary', 'text.secondary', 'text.disabled'],
      description: 'The color of the component.',
    },
    align: {
      control: { type: 'select' },
      options: ['inherit', 'left', 'center', 'right', 'justify'],
      description: 'Set the text-align on the component.',
    },
    gutterBottom: {
      control: { type: 'boolean' },
      description: 'If true, the text will have a bottom margin.',
    },
    noWrap: {
      control: { type: 'boolean' },
      description: 'If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Typography Text',
    variant: 'body1',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="h1">h1. Heading</Typography>
      <Typography variant="h2">h2. Heading</Typography>
      <Typography variant="h3">h3. Heading</Typography>
      <Typography variant="h4">h4. Heading</Typography>
      <Typography variant="h5">h5. Heading</Typography>
      <Typography variant="h6">h6. Heading</Typography>
      <Typography variant="subtitle1">subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
      <Typography variant="subtitle2">subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
      <Typography variant="body1">body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
      <Typography variant="body2">body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
      <Typography variant="button">button text</Typography>
      <Typography variant="caption">caption text</Typography>
      <Typography variant="overline">overline text</Typography>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All typography variants available in Material-UI.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="h6" color="primary">Primary Color</Typography>
      <Typography variant="h6" color="secondary">Secondary Color</Typography>
      <Typography variant="h6" color="error">Error Color</Typography>
      <Typography variant="h6" color="warning">Warning Color</Typography>
      <Typography variant="h6" color="info">Info Color</Typography>
      <Typography variant="h6" color="success">Success Color</Typography>
      <Typography variant="h6" color="text.primary">Text Primary</Typography>
      <Typography variant="h6" color="text.secondary">Text Secondary</Typography>
      <Typography variant="h6" color="text.disabled">Text Disabled</Typography>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography with different color variants.',
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Box>
        <Typography variant="h6" align="left" gutterBottom>
          Left Aligned
        </Typography>
        <Typography variant="body2" align="left">
          This text is left aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="h6" align="center" gutterBottom>
          Center Aligned
        </Typography>
        <Typography variant="body2" align="center">
          This text is center aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="h6" align="right" gutterBottom>
          Right Aligned
        </Typography>
        <Typography variant="body2" align="right">
          This text is right aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="h6" align="justify" gutterBottom>
          Justified
        </Typography>
        <Typography variant="body2" align="justify">
          This text is justified. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography with different text alignments.',
      },
    },
  },
};

export const TextOverflow: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 300 }}>
      <Typography variant="body1" noWrap>
        This is a very long text that will be truncated with ellipsis when it overflows the container width.
      </Typography>
      
      <Typography variant="body1">
        This is a very long text that will wrap to multiple lines when it overflows the container width.
      </Typography>
      
      <Box sx={{ width: 200 }}>
        <Typography variant="body2" noWrap>
          Fixed width container with noWrap text that gets truncated.
        </Typography>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography with text overflow handling using noWrap prop.',
      },
    },
  },
};

export const ArticleExample: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 700 }}>
      <Typography variant="h4" gutterBottom>
        Article Title
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        By Author Name • Published on January 1, 2024
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="body1" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        Section Heading
      </Typography>
      
      <Typography variant="body1" paragraph>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
      
      <Typography variant="body2" color="text.secondary">
        This is a smaller text for additional information or footnotes.
      </Typography>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of typography usage in an article layout.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          cursor: 'pointer',
          '&:hover': { color: 'primary.main' }
        }}
      >
        Hover me to change color
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          cursor: 'pointer',
          textDecoration: 'underline',
          '&:hover': { textDecoration: 'none' }
        }}
      >
        Hover me to remove underline
      </Typography>
      
      <Typography 
        variant="subtitle1" 
        sx={{ 
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': { 
            transform: 'scale(1.05)',
            color: 'secondary.main'
          }
        }}
      >
        Hover me for scale effect
      </Typography>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive typography with hover effects.',
      },
    },
  },
}; 