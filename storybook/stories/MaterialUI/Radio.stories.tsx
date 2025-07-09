import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Radio, 
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Box,
  Stack,
  Paper,
  Divider
} from '@mui/material';

const meta: Meta<typeof Radio> = {
  title: 'Material UI/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Radio component for single selection controls.',
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
    const [value, setValue] = useState('option1');
    
    return (
      <FormControlLabel
        control={
          <Radio
            checked={value === 'option1'}
            onChange={(e) => setValue(e.target.value)}
            value="option1"
          />
        }
        label="Radio with label"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio with FormControlLabel for better accessibility.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => {
    const [value, setValue] = useState('primary');
    
    return (
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <FormControlLabel
          control={
            <Radio
              checked={value === 'primary'}
              onChange={(e) => setValue(e.target.value)}
              value="primary"
              color="primary"
            />
          }
          label="Primary Color"
        />
        <FormControlLabel
          control={
            <Radio
              checked={value === 'secondary'}
              onChange={(e) => setValue(e.target.value)}
              value="secondary"
              color="secondary"
            />
          }
          label="Secondary Color"
        />
        <FormControlLabel
          control={
            <Radio
              checked={value === 'error'}
              onChange={(e) => setValue(e.target.value)}
              value="error"
              color="error"
            />
          }
          label="Error Color"
        />
        <FormControlLabel
          control={
            <Radio
              checked={value === 'info'}
              onChange={(e) => setValue(e.target.value)}
              value="info"
              color="info"
            />
          }
          label="Info Color"
        />
        <FormControlLabel
          control={
            <Radio
              checked={value === 'success'}
              onChange={(e) => setValue(e.target.value)}
              value="success"
              color="success"
            />
          }
          label="Success Color"
        />
        <FormControlLabel
          control={
            <Radio
              checked={value === 'warning'}
              onChange={(e) => setValue(e.target.value)}
              value="warning"
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
        story: 'Radio buttons with different color variants.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState('small');
    
    return (
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <FormControlLabel
          control={
            <Radio
              checked={value === 'small'}
              onChange={(e) => setValue(e.target.value)}
              value="small"
              size="small"
            />
          }
          label="Small Size"
        />
        <FormControlLabel
          control={
            <Radio
              checked={value === 'medium'}
              onChange={(e) => setValue(e.target.value)}
              value="medium"
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
        story: 'Radio buttons in different sizes.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <FormControlLabel
        control={<Radio defaultChecked />}
        label="Checked (default)"
      />
      <FormControlLabel
        control={<Radio />}
        label="Unchecked"
      />
      <FormControlLabel
        control={<Radio disabled />}
        label="Disabled Unchecked"
      />
      <FormControlLabel
        control={<Radio disabled defaultChecked />}
        label="Disabled Checked"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons in different states: checked, unchecked, and disabled.',
      },
    },
  },
};

export const RadioGroupExample: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    return (
      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select an option</FormLabel>
          <RadioGroup
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
            <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
            <FormControlLabel value="option4" control={<Radio />} label="Option 4" />
          </RadioGroup>
        </FormControl>
      </Paper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons in a RadioGroup for single selection from multiple options.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    
    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Controlled Radio Group</FormLabel>
          <RadioGroup
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
            <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
          </RadioGroup>
        </FormControl>
        
        <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
          <Typography variant="body2">
            Selected: {value}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Radio
            checked={value === 'option1'}
            onChange={(e) => setValue(e.target.value)}
            value="option1"
            size="small"
          />
          <Typography variant="body2">
            Small radio button
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Radio
            checked={value === 'option2'}
            onChange={(e) => setValue(e.target.value)}
            value="option2"
            size="medium"
          />
          <Typography variant="body2">
            Medium radio button
          </Typography>
        </Box>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled radio buttons with state management and visual feedback.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => {
    const [gender, setGender] = useState('female');
    const [age, setAge] = useState('18-25');

    return (
      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
          User Preferences
        </Typography>
        
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        
        <Divider sx={{ my: 2 }} />
        
        <FormControl component="fieldset">
          <FormLabel component="legend">Age Range</FormLabel>
          <RadioGroup
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            <FormControlLabel value="18-25" control={<Radio />} label="18-25" />
            <FormControlLabel value="26-35" control={<Radio />} label="26-35" />
            <FormControlLabel value="36-45" control={<Radio />} label="36-45" />
            <FormControlLabel value="46+" control={<Radio />} label="46+" />
          </RadioGroup>
        </FormControl>
        
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2">
            Selected: Gender - {gender}, Age - {age}
          </Typography>
        </Box>
      </Paper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form example with multiple radio groups for user preferences.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    
    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <FormControlLabel
          control={
            <Radio
              checked={value === 'option1'}
              onChange={(e) => setValue(e.target.value)}
              value="option1"
              sx={{
                '&.Mui-checked': {
                  color: '#52d869',
                },
              }}
            />
          }
          label="Custom Green Radio"
        />
        
        <FormControlLabel
          control={
            <Radio
              checked={value === 'option2'}
              onChange={(e) => setValue(e.target.value)}
              value="option2"
              sx={{
                '&.Mui-checked': {
                  color: '#ff6b6b',
                },
              }}
            />
          }
          label="Custom Red Radio"
        />
        
        <FormControlLabel
          control={
            <Radio
              checked={value === 'option3'}
              onChange={(e) => setValue(e.target.value)}
              value="option3"
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                },
              }}
            />
          }
          label="Large Radio Button"
        />
        
        <FormControlLabel
          control={
            <Radio
              checked={value === 'option4'}
              onChange={(e) => setValue(e.target.value)}
              value="option4"
              sx={{
                '&.Mui-checked': {
                  color: '#9c27b0',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 20,
                },
              }}
            />
          }
          label="Purple Small Radio"
        />
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons with custom styling using the sx prop.',
      },
    },
  },
}; 