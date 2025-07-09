import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Typography,
  Box,
  Stack,
  Paper,
  Chip,
  OutlinedInput
} from '@mui/material';

const meta: Meta<typeof Select> = {
  title: 'Material UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Select component for dropdown selection.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      description: 'The variant to use.',
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
    multiple: {
      control: { type: 'boolean' },
      description: 'If true, the component can take multiple values.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

    return (
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setValue(event.target.value);
    };

    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <FormControl fullWidth>
          <InputLabel>Outlined Variant</InputLabel>
          <Select
            value={value}
            label="Outlined Variant"
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Filled Variant</InputLabel>
          <Select
            value={value}
            label="Filled Variant"
            onChange={handleChange}
            variant="filled"
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Standard Variant</InputLabel>
          <Select
            value={value}
            label="Standard Variant"
            onChange={handleChange}
            variant="standard"
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select components with different variants.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setValue(event.target.value);
    };

    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Small Size</InputLabel>
          <Select
            value={value}
            label="Small Size"
            onChange={handleChange}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="medium">
          <InputLabel>Medium Size (default)</InputLabel>
          <Select
            value={value}
            label="Medium Size (default)"
            onChange={handleChange}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select components in different sizes.',
      },
    },
  },
};

export const Multiple: Story = {
  render: () => {
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    return (
      <FormControl sx={{ minWidth: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          <MenuItem value="Oliver Hansen">Oliver Hansen</MenuItem>
          <MenuItem value="Van Henry">Van Henry</MenuItem>
          <MenuItem value="April Tucker">April Tucker</MenuItem>
          <MenuItem value="Ralph Hubbard">Ralph Hubbard</MenuItem>
          <MenuItem value="Omar Alexander">Omar Alexander</MenuItem>
          <MenuItem value="Carlos Abbott">Carlos Abbott</MenuItem>
          <MenuItem value="Miriam Wagner">Miriam Wagner</MenuItem>
          <MenuItem value="Bradley Wilkerson">Bradley Wilkerson</MenuItem>
          <MenuItem value="Virginia Andrews">Virginia Andrews</MenuItem>
          <MenuItem value="Kelly Snyder">Kelly Snyder</MenuItem>
        </Select>
      </FormControl>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple selection with chip display.',
      },
    },
  },
};

export const States: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setValue(event.target.value);
    };

    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <FormControl fullWidth>
          <InputLabel>Normal State</InputLabel>
          <Select
            value={value}
            label="Normal State"
            onChange={handleChange}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth disabled>
          <InputLabel>Disabled State</InputLabel>
          <Select
            value=""
            label="Disabled State"
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth error>
          <InputLabel>Error State</InputLabel>
          <Select
            value={value}
            label="Error State"
            onChange={handleChange}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select components in different states.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setValue(event.target.value);
    };

    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            value={value}
            label="Country"
            onChange={handleChange}
          >
            <MenuItem value="us">🇺🇸 United States</MenuItem>
            <MenuItem value="uk">🇬🇧 United Kingdom</MenuItem>
            <MenuItem value="ca">🇨🇦 Canada</MenuItem>
            <MenuItem value="au">🇦🇺 Australia</MenuItem>
            <MenuItem value="de">🇩🇪 Germany</MenuItem>
            <MenuItem value="fr">🇫🇷 France</MenuItem>
            <MenuItem value="jp">🇯🇵 Japan</MenuItem>
            <MenuItem value="br">🇧🇷 Brazil</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={value}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="tech">💻 Technology</MenuItem>
            <MenuItem value="health">🏥 Healthcare</MenuItem>
            <MenuItem value="finance">💰 Finance</MenuItem>
            <MenuItem value="education">📚 Education</MenuItem>
            <MenuItem value="entertainment">🎬 Entertainment</MenuItem>
            <MenuItem value="sports">⚽ Sports</MenuItem>
            <MenuItem value="food">🍕 Food & Dining</MenuItem>
            <MenuItem value="travel">✈️ Travel</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select components with icons and emojis in menu items.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      country: '',
      language: '',
      timezone: '',
    });

    const handleChange = (field: string) => (event: SelectChangeEvent) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

    return (
      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
          User Profile Settings
        </Typography>
        
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              value={formData.country}
              label="Country"
              onChange={handleChange('country')}
            >
              <MenuItem value="us">United States</MenuItem>
              <MenuItem value="uk">United Kingdom</MenuItem>
              <MenuItem value="ca">Canada</MenuItem>
              <MenuItem value="au">Australia</MenuItem>
              <MenuItem value="de">Germany</MenuItem>
              <MenuItem value="fr">France</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select
              value={formData.language}
              label="Language"
              onChange={handleChange('language')}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="it">Italian</MenuItem>
              <MenuItem value="pt">Portuguese</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={formData.timezone}
              label="Timezone"
              onChange={handleChange('timezone')}
            >
              <MenuItem value="utc-8">UTC-8 (Pacific Time)</MenuItem>
              <MenuItem value="utc-5">UTC-5 (Eastern Time)</MenuItem>
              <MenuItem value="utc+0">UTC+0 (GMT)</MenuItem>
              <MenuItem value="utc+1">UTC+1 (Central European Time)</MenuItem>
              <MenuItem value="utc+5">UTC+5 (India Standard Time)</MenuItem>
              <MenuItem value="utc+8">UTC+8 (China Standard Time)</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2">
            Selected: Country - {formData.country}, Language - {formData.language}, Timezone - {formData.timezone}
          </Typography>
        </Box>
      </Paper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form example with multiple select components.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setValue(event.target.value);
    };

    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <FormControl fullWidth>
          <InputLabel sx={{ color: 'primary.main' }}>Custom Label Color</InputLabel>
          <Select
            value={value}
            label="Custom Label Color"
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.dark',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Custom Background</InputLabel>
          <Select
            value={value}
            label="Custom Background"
            onChange={handleChange}
            sx={{
              backgroundColor: 'grey.100',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Rounded Corners</InputLabel>
          <Select
            value={value}
            label="Rounded Corners"
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                '& fieldset': {
                  borderRadius: 3,
                },
              },
            }}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select components with custom styling using the sx prop.',
      },
    },
  },
}; 