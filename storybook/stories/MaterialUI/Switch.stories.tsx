import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Switch, 
  FormControlLabel,
  FormGroup,
  Typography,
  Box,
  Stack,
  Paper,
  Divider
} from '@mui/material';

const meta: Meta<typeof Switch> = {
  title: 'Material UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Switch component for toggle controls.',
      },
    },
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'If true, the component is checked.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'If true, the component is disabled.',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'The size of the component.',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'The color of the component.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        }
        label="Switch with label"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch with FormControlLabel for better accessibility.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="primary"
            />
          }
          label="Primary Color"
        />
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="secondary"
            />
          }
          label="Secondary Color"
        />
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="error"
            />
          }
          label="Error Color"
        />
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="info"
            />
          }
          label="Info Color"
        />
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="success"
            />
          }
          label="Success Color"
        />
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="warning"
            />
          }
          label="Warning Color"
        />
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Switches with different color variants.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              size="small"
            />
          }
          label="Small Size"
        />
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              size="medium"
            />
          }
          label="Medium Size (default)"
        />
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Switches in different sizes.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Checked (default)"
      />
      <FormControlLabel
        control={<Switch />}
        label="Unchecked"
      />
      <FormControlLabel
        control={<Switch disabled />}
        label="Disabled Unchecked"
      />
      <FormControlLabel
        control={<Switch disabled defaultChecked />}
        label="Disabled Checked"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switches in different states: checked, unchecked, and disabled.',
      },
    },
  },
};

export const FormGroupExample: Story = {
  render: () => {
    const [state, setState] = useState({
      notifications: true,
      email: false,
      sms: true,
      push: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    };

    return (
      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Notification Settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={state.notifications}
                onChange={handleChange}
                name="notifications"
              />
            }
            label="Enable Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.email}
                onChange={handleChange}
                name="email"
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.sms}
                onChange={handleChange}
                name="sms"
              />
            }
            label="SMS Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.push}
                onChange={handleChange}
                name="push"
              />
            }
            label="Push Notifications"
          />
        </FormGroup>
      </Paper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple switches in a FormGroup for settings or preferences.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          }
          label={`Switch is ${checked ? 'ON' : 'OFF'}`}
        />
        
        <Box sx={{ p: 2, bgcolor: checked ? 'success.light' : 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2">
            Status: {checked ? 'Active' : 'Inactive'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            size="small"
          />
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Small switch
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            size="medium"
          />
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Medium switch
          </Typography>
        </Box>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled switch with state management and visual feedback.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#52d869',
                  '&:hover': {
                    backgroundColor: 'rgba(82, 216, 105, 0.08)',
                  },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#52d869',
                },
              }}
            />
          }
          label="Custom Green Switch"
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: '#ff6b6b',
                },
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#ff6b6b',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 107, 107, 0.08)',
                  },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#ff6b6b',
                },
              }}
            />
          }
          label="Custom Red Switch"
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              sx={{
                '& .MuiSwitch-track': {
                  borderRadius: 22 / 2,
                  backgroundColor: '#bdbdbd',
                  opacity: 1,
                  transition: 'background-color 500ms',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#81c784',
                },
              }}
            />
          }
          label="Custom Track Switch"
        />
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Switches with custom styling using the sx prop.',
      },
    },
  },
}; 