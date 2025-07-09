import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Checkbox, 
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
  Typography,
  Box,
  Stack,
  Paper,
  Divider
} from '@mui/material';

const meta: Meta<typeof Checkbox> = {
  title: 'Material UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Checkbox component for selection controls.',
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
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        }
        label="Checkbox with label"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with FormControlLabel for better accessibility.',
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
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="primary"
            />
          }
          label="Primary Color"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="secondary"
            />
          }
          label="Secondary Color"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="error"
            />
          }
          label="Error Color"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="info"
            />
          }
          label="Info Color"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="success"
            />
          }
          label="Success Color"
        />
        <FormControlLabel
          control={
            <Checkbox
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
        story: 'Checkboxes with different color variants.',
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
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              size="small"
            />
          }
          label="Small Size"
        />
        <FormControlLabel
          control={
            <Checkbox
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
        story: 'Checkboxes in different sizes.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Checked (default)"
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Unchecked"
      />
      <FormControlLabel
        control={<Checkbox indeterminate />}
        label="Indeterminate"
      />
      <FormControlLabel
        control={<Checkbox disabled />}
        label="Disabled Unchecked"
      />
      <FormControlLabel
        control={<Checkbox disabled defaultChecked />}
        label="Disabled Checked"
      />
      <FormControlLabel
        control={<Checkbox disabled indeterminate />}
        label="Disabled Indeterminate"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes in different states: checked, unchecked, indeterminate, and disabled.',
      },
    },
  },
};

export const FormGroupExample: Story = {
  render: () => {
    const [state, setState] = useState({
      react: true,
      typescript: false,
      materialui: true,
      storybook: false,
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
          Technology Stack
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.react}
                onChange={handleChange}
                name="react"
              />
            }
            label="React"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.typescript}
                onChange={handleChange}
                name="typescript"
              />
            }
            label="TypeScript"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.materialui}
                onChange={handleChange}
                name="materialui"
              />
            }
            label="Material-UI"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.storybook}
                onChange={handleChange}
                name="storybook"
              />
            }
            label="Storybook"
          />
        </FormGroup>
      </Paper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple checkboxes in a FormGroup for selection lists.',
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
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          }
          label={`Checkbox is ${checked ? 'checked' : 'unchecked'}`}
        />
        
        <Box sx={{ p: 2, bgcolor: checked ? 'success.light' : 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2">
            Status: {checked ? 'Selected' : 'Not Selected'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            size="small"
          />
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Small checkbox
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            size="medium"
          />
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Medium checkbox
          </Typography>
        </Box>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled checkbox with state management and visual feedback.',
      },
    },
  },
};

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState([true, false]);
    const [indeterminate, setIndeterminate] = useState(true);

    const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked([event.target.checked, event.target.checked]);
      setIndeterminate(false);
    };

    const handleChildChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = [...checked];
      newChecked[index] = event.target.checked;
      setChecked(newChecked);
      setIndeterminate(newChecked.some(Boolean) && !newChecked.every(Boolean));
    };

    return (
      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Nested Selection
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.every(Boolean)}
                indeterminate={indeterminate}
                onChange={handleParentChange}
              />
            }
            label="Select All"
          />
          <Box sx={{ ml: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[0]}
                  onChange={handleChildChange(0)}
                />
              }
              label="Option 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[1]}
                  onChange={handleChildChange(1)}
                />
              }
              label="Option 2"
            />
          </Box>
        </FormGroup>
      </Paper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with indeterminate state for parent-child selection scenarios.',
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
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              sx={{
                '&.Mui-checked': {
                  color: '#52d869',
                },
              }}
            />
          }
          label="Custom Green Checkbox"
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              sx={{
                '&.Mui-checked': {
                  color: '#ff6b6b',
                },
                '&.MuiCheckbox-indeterminate': {
                  color: '#ff6b6b',
                },
              }}
            />
          }
          label="Custom Red Checkbox"
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                },
              }}
            />
          }
          label="Large Checkbox"
        />
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes with custom styling using the sx prop.',
      },
    },
  },
}; 