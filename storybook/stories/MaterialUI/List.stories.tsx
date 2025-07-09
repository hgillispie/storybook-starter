import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Typography,
  Box,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import { 
  Folder as FolderIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const meta: Meta<typeof List> = {
  title: 'Material UI/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI List component with various item types and layouts.',
      },
    },
  },
  argTypes: {
    dense: {
      control: { type: 'boolean' },
      description: 'If true, compact vertical padding designed for keyboard and mouse input will be used.',
    },
    disablePadding: {
      control: { type: 'boolean' },
      description: 'If true, vertical padding will be removed from the list.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Paper sx={{ width: 400 }}>
      <List>
        <ListItem>
          <ListItemText primary="List item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="List item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="List item 3" />
        </ListItem>
      </List>
    </Paper>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Paper sx={{ width: 400 }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Documents" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Pictures" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Music" />
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List items with icons.',
      },
    },
  },
};

export const WithAvatars: Story = {
  render: () => (
    <Paper sx={{ width: 400 }}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary="John Doe" 
            secondary="john.doe@example.com" 
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary="Jane Smith" 
            secondary="jane.smith@example.com" 
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary="Bob Johnson" 
            secondary="bob.johnson@example.com" 
          />
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List items with avatars and secondary text.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <Paper sx={{ width: 400 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Sent" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive list items with buttons and hover effects.',
      },
    },
  },
};

export const WithSecondaryActions: Story = {
  render: () => (
    <Paper sx={{ width: 400 }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <StarBorderIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Important Document" 
            secondary="Last modified: 2 hours ago" 
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Project Report" 
            secondary="Last modified: 1 day ago" 
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <StarBorderIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Meeting Notes" 
            secondary="Last modified: 3 days ago" 
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List items with secondary actions (buttons on the right).',
      },
    },
  },
};

export const WithSubheaders: Story = {
  render: () => (
    <Paper sx={{ width: 400 }}>
      <List subheader={<ListSubheader>Recent Files</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="document.pdf" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="presentation.pptx" />
        </ListItem>
      </List>
      <Divider />
      <List subheader={<ListSubheader>Archived Files</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="old-document.pdf" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="backup.zip" />
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lists with subheaders to organize content into sections.',
      },
    },
  },
};

export const Dense: Story = {
  render: () => (
    <Paper sx={{ width: 400 }}>
      <List dense>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Compact item 1" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Compact item 2" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Compact item 3" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Compact item 4" />
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dense list with reduced padding for compact layouts.',
      },
    },
  },
};

export const Nested: Story = {
  render: () => (
    <Paper sx={{ width: 400 }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Main Folder" />
        </ListItem>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Subfolder 1" />
          </ListItem>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 6 }}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Subfolder 1.1" />
            </ListItem>
          </List>
          <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Subfolder 2" />
          </ListItem>
        </List>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Another Folder" />
        </ListItem>
      </List>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nested list structure with indentation.',
      },
    },
  },
}; 