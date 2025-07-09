import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogProps,
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Paper,
  IconButton
} from '@mui/material';
import { 
  Close as CloseIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const meta: Meta<typeof Dialog> = {
  title: 'Material UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Dialog component with various configurations and content types.',
      },
    },
  },
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'If true, the dialog is open.',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'If true, the dialog will be full-screen.',
    },
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Determine the max-width of the dialog.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle dialog state
const DialogWrapper = ({ children, ...props }: Omit<DialogProps, 'open'>) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} {...props}>
        {children}
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <DialogWrapper>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is a simple dialog with a title and content.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained">Confirm</Button>
      </DialogActions>
    </DialogWrapper>
  ),
};

export const AlertDialog: Story = {
  render: () => (
    <DialogWrapper>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        Confirm Action
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </DialogWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert dialog for confirming destructive actions.',
      },
    },
  },
};

export const FormDialog: Story = {
  render: () => (
    <DialogWrapper maxWidth="sm" fullWidth>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained">Create</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog with form inputs for data entry.',
      },
    },
  },
};

export const CustomContent: Story = {
  render: () => (
    <DialogWrapper maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Detailed Information</Typography>
        <IconButton size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 3, pt: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Project Details
            </Typography>
            <Typography variant="body2" paragraph>
              This is a comprehensive project overview with detailed information about the goals, 
              timeline, and resources required.
            </Typography>
            <Typography variant="body2" paragraph>
              The project involves multiple stakeholders and requires careful coordination across 
              different departments and teams.
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Key Metrics
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="body2">
                • Timeline: 6 months<br/>
                • Budget: $50,000<br/>
                • Team Size: 8 people<br/>
                • Risk Level: Medium
              </Typography>
            </Paper>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Close</Button>
        <Button variant="contained">Save Changes</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog with custom content layout and styling.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
      <DialogWrapper maxWidth="xs">
        <DialogTitle>Extra Small</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is an extra small dialog (xs).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Close</Button>
        </DialogActions>
      </DialogWrapper>
      
      <DialogWrapper maxWidth="sm">
        <DialogTitle>Small</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a small dialog (sm).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Close</Button>
        </DialogActions>
      </DialogWrapper>
      
      <DialogWrapper maxWidth="md">
        <DialogTitle>Medium</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a medium dialog (md).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Close</Button>
        </DialogActions>
      </DialogWrapper>
      
      <DialogWrapper maxWidth="lg">
        <DialogTitle>Large</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a large dialog (lg).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Close</Button>
        </DialogActions>
      </DialogWrapper>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialogs in different sizes: xs, sm, md, lg.',
      },
    },
  },
};

export const FullScreen: Story = {
  render: () => (
    <DialogWrapper fullScreen>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Full Screen Dialog</Typography>
        <IconButton size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          This is a full-screen dialog that takes up the entire viewport. It's useful for 
          complex forms, detailed views, or immersive experiences.
        </Typography>
        <Typography variant="body1" paragraph>
          Full-screen dialogs are commonly used in mobile applications or when you need to 
          focus the user's attention on a specific task.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Large Text Area"
            multiline
            rows={8}
            fullWidth
            variant="outlined"
            placeholder="Enter your content here..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained">Save</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-screen dialog for immersive experiences.',
      },
    },
  },
};

export const InfoDialog: Story = {
  render: () => (
    <DialogWrapper>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <InfoIcon color="info" />
        Information
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is an informational dialog that provides helpful context or guidance to the user.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained">Got it</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Informational dialog with icon and simple confirmation.',
      },
    },
  },
}; 