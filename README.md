# MUI Vite Storybook

A standalone Storybook repository that showcases components from the [mui-vite-demo](https://github.com/buildernick/mui-vite-demo) project.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

## 📁 Project Structure

```
mui-vite-storybook/
├── storybook/                 # Storybook workspace
│   ├── .storybook/           # Storybook configuration
│   ├── stories/              # All stories and documentation
│   │   ├── Introduction.stories.mdx
│   │   ├── ComponentTemplate.stories.tsx
│   │   └── [YourComponent].stories.tsx
│   └── package.json          # Storybook dependencies
├── package.json              # Root workspace configuration
└── README.md                 # This file
```

## 🔗 How it Works

This repository uses **npm workspaces** to reference components from the main `mui-vite-demo` project:

1. **Dependency Management**: The main project is installed as a GitHub dependency
2. **Component Import**: Stories import components from the main project using the `mui-vite-demo` alias
3. **Standalone Stories**: All stories are maintained in this Storybook repository
4. **Independent**: This Storybook runs independently while staying in sync with the main project

## 📝 Creating Stories

### For Main Project Components

Create story files in the `storybook/stories/` directory following this pattern:

```typescript
// storybook/stories/YourComponent.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Import your component from the main project
import { YourComponent } from 'mui-vite-demo/path/to/YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define your component's props here
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Your component props
  },
};
```

### Import Paths

Components from the main project can be imported using:
- `mui-vite-demo/src/components/ComponentName` - Direct path
- `mui-vite-demo/components/ComponentName` - Using the alias (configured in main.js)

### Story Organization

Organize your stories in the `storybook/stories/` directory:
```
stories/
├── Introduction.stories.mdx          # Documentation
├── ComponentTemplate.stories.tsx     # Template example
├── Button.stories.tsx               # Button component stories
├── Card.stories.tsx                 # Card component stories
└── [ComponentName].stories.tsx      # Your component stories
```

## 🔄 Syncing with Main Project

To update to the latest version of the main project:

```bash
# Update the dependency
npm update mui-vite-demo

# Or install a specific version
npm install mui-vite-demo@<version>
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm 8+

### Available Scripts
- `npm run storybook` - Start development server
- `npm run build-storybook` - Build for production
- `npm run dev` - Alias for storybook command

### Adding New Components

1. **Create the component** in the main `mui-vite-demo` project
2. **Create a story** in `storybook/stories/ComponentName.stories.tsx`
3. **Import the component** using the `mui-vite-demo` alias
4. **Define stories** for different states and variants

## 📦 Deployment

The built Storybook can be deployed to any static hosting service:

```bash
npm run build-storybook
# Deploy the storybook-static/ directory
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the same terms as the main mui-vite-demo project.
