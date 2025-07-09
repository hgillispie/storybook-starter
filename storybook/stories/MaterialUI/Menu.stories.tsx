import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  Button,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Stack,
  IconButton,
  Chip
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const meta: Meta<typeof Menu> = {
  title: 'Material UI/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Menu component with various configurations and content types.',
      },
    },
  },
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'If true, the menu is open.',
    },
    anchorOrigin: {
      control: { type: 'object' },
      description: 'This is the point on the anchor where the popover\'s anchorEl will attach to.',
    },
    transformOrigin: {
      control: { type: 'object' },
      description: 'This is the point on the popover which will attach to the anchor\'s origin.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle menu state
const MenuWrapper = ({ children, ...props }: Omit<MenuProps, 'open' | 'anchorEl'>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        endIcon={<MoreVertIcon />}
      >
        Open Menu
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...props}
      >
        {children}
      </Menu>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <MenuWrapper>
      <MenuItem onClick={() => {}}>Profile</MenuItem>
      <MenuItem onClick={() => {}}>My account</MenuItem>
      <MenuItem onClick={() => {}}>Logout</MenuItem>
    </MenuWrapper>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <MenuWrapper>
      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </MenuWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu items with icons and dividers.',
      },
    },
  },
};

export const ContextMenu: Story = {
  render: () => {
    const [contextMenu, setContextMenu] = useState<{
      mouseX: number;
      mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
      event.preventDefault();
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : null,
      );
    };

    const handleClose = () => {
      setContextMenu(null);
    };

    return (
      <Box
        onContextMenu={handleContextMenu}
        sx={{
          p: 3,
          border: '2px dashed',
          borderColor: 'grey.300',
          borderRadius: 1,
          cursor: 'context-menu',
          userSelect: 'none',
          '&:hover': {
            borderColor: 'primary.main',
          }
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Right-click here to open context menu
        </Typography>
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ShareIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Share</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Download</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Context menu that appears on right-click.',
      },
    },
  },
};

export const NestedMenu: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [nestedAnchorEl, setNestedAnchorEl] = useState<null | HTMLElement>(null);
    
    const open = Boolean(anchorEl);
    const nestedOpen = Boolean(nestedAnchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleNestedClick = (event: React.MouseEvent<HTMLElement>) => {
      setNestedAnchorEl(event.currentTarget);
    };

    const handleNestedClose = () => {
      setNestedAnchorEl(null);
    };

    return (
      <>
        <Button variant="contained" onClick={handleClick}>
          Open Nested Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Option 1</MenuItem>
          <MenuItem onClick={handleClose}>Option 2</MenuItem>
          <MenuItem 
            onClick={handleNestedClick}
            onMouseEnter={handleNestedClick}
          >
            More Options
          </MenuItem>
          <MenuItem onClick={handleClose}>Option 3</MenuItem>
        </Menu>
        <Menu
          anchorEl={nestedAnchorEl}
          open={nestedOpen}
          onClose={handleNestedClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleNestedClose}>Sub-option 1</MenuItem>
          <MenuItem onClick={handleNestedClose}>Sub-option 2</MenuItem>
          <MenuItem onClick={handleNestedClose}>Sub-option 3</MenuItem>
        </Menu>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Nested menu with sub-menu that appears on hover.',
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <MenuWrapper>
      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <StarBorderIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Add to favorites</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <ShareIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Share</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <DownloadIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Download</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </MenuWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu with various action items and icons.',
      },
    },
  },
};

export const IconButtonMenu: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <IconButton
          onClick={handleClick}
          size="large"
          edge="end"
          aria-label="more"
          aria-controls={open ? 'long-menu' : undefined}
          aria-haspopup="true"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EmailIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Messages</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PhoneIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Calls</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
        </Menu>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu triggered by an icon button with limited height.',
      },
    },
  },
};

export const CustomPositioning: Story = {
  render: () => (
    <MenuWrapper
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={() => {}}>
        <ListItemText>Top Right</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <ListItemText>Positioned Menu</ListItemText>
      </MenuItem>
    </MenuWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu with custom positioning using anchorOrigin and transformOrigin.',
      },
    },
  },
}; 