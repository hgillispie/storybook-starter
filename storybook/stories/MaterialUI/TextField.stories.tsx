import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField, Stack, Box } from '@mui/material';

const meta: Meta<typeof TextField> = {
  title: 'Material UI/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI TextField component with various variants, types, and states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      description: 'The variant to use.',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'Type of the input element.',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'The size of the component.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'If true, the component is disabled.',
    },
    required: {
      control: { type: 'boolean' },
      description: 'If true, the label is displayed as required.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'If true, the label is displayed in an error state.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    variant: 'outlined',
    size: 'medium',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <TextField label="Outlined" variant="outlined" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Standard" variant="standard" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different TextField variants: outlined, filled, and standard.',
      },
    },
  },
};

export const Types: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <TextField label="Text" type="text" variant="outlined" />
      <TextField label="Password" type="password" variant="outlined" />
      <TextField label="Email" type="email" variant="outlined" />
      <TextField label="Number" type="number" variant="outlined" />
      <TextField label="Tel" type="tel" variant="outlined" />
      <TextField label="URL" type="url" variant="outlined" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TextFields with different input types.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <TextField label="Small" size="small" variant="outlined" />
      <TextField label="Medium" size="medium" variant="outlined" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TextFields in different sizes.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <TextField label="Normal" variant="outlined" />
      <TextField label="Disabled" variant="outlined" disabled />
      <TextField label="Required" variant="outlined" required />
      <TextField label="Error" variant="outlined" error helperText="Error message" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different TextField states: normal, disabled, required, and error.',
      },
    },
  },
};

export const WithHelperText: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <TextField 
        label="Username" 
        variant="outlined" 
        helperText="Enter your username"
      />
      <TextField 
        label="Password" 
        type="password" 
        variant="outlined" 
        helperText="Password must be at least 8 characters"
      />
      <TextField 
        label="Email" 
        type="email" 
        variant="outlined" 
        helperText="We'll never share your email"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TextFields with helper text for additional guidance.',
      },
    },
  },
};

export const Multiline: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <TextField 
        label="Comments" 
        multiline 
        rows={3} 
        variant="outlined" 
        placeholder="Enter your comments..."
      />
      <TextField 
        label="Description" 
        multiline 
        rows={4} 
        maxRows={6} 
        variant="outlined" 
        placeholder="Enter a description..."
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiline TextFields for longer text input.',
      },
    },
  },
}; 