import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const Introduction = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <h1>MUI Vite Demo Storybook</h1>
    
    <p>
      This Storybook showcases components from the{' '}
      <a href="https://github.com/buildernick/mui-vite-demo" target="_blank" rel="noopener noreferrer">
        mui-vite-demo
      </a>{' '}
      project.
    </p>

    <h2>How it works</h2>
    <p>
      This standalone Storybook repository references the main project components through npm workspaces. 
      The components are imported from the <code>mui-vite-demo</code> package and displayed here for 
      documentation and testing purposes.
    </p>

    <h2>Getting Started</h2>
    <ol>
      <li>Install dependencies: <code>npm install</code></li>
      <li>Start Storybook: <code>npm run storybook</code></li>
      <li>Build for production: <code>npm run build-storybook</code></li>
    </ol>

    <h2>Available Components</h2>
    <p>
      The following real components from the main project are now available in this Storybook:
    </p>
    <ul>
      <li><strong>Dashboard/SideMenu</strong> - A permanent sidebar navigation component</li>
      <li><strong>Dashboard/Search</strong> - A search input component with icon adornment</li>
      <li><strong>Dashboard/StatCard</strong> - A statistics card with sparkline charts</li>
      <li><strong>Components/Button</strong> - Example button component (demonstration)</li>
      <li><strong>Examples/ComponentExample</strong> - Example component with variants</li>
    </ul>

    <h2>Component Stories</h2>
    <p>
      The stories in this Storybook are maintained here and import components from the main project using git submodules. 
      This approach provides better dependency management and avoids import issues.
    </p>

    <h2>Creating Stories</h2>
    <p>
      To create stories for components from the main project:
    </p>
    <pre style={{ 
      backgroundColor: '#f5f5f5', 
      padding: '15px', 
      borderRadius: '4px',
      overflow: 'auto'
    }}>
{`// storybook/stories/MyComponent.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Import from main project using relative path
import { MyComponent } from '../../main-project/src/components/MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  // ... configuration
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Your component props
  },
};`}
    </pre>

    <h2>Import Paths</h2>
    <p>
      Components from the main project can be imported using relative paths to the submodule:
    </p>
    <ul>
      <li><code>../../main-project/src/dashboard/components/ComponentName</code> - Dashboard components</li>
      <li><code>../../main-project/src/components/ComponentName</code> - General components</li>
      <li><code>../../main-project/src/path/to/ComponentName</code> - Other components</li>
    </ul>

    <h2>Updating Components</h2>
    <p>
      To get the latest version of components from the main project:
    </p>
    <pre style={{ 
      backgroundColor: '#f5f5f5', 
      padding: '15px', 
      borderRadius: '4px',
      overflow: 'auto'
    }}>
{`# Update the submodule to latest
git submodule update --remote main-project

# Or pull specific changes
cd main-project
git pull origin main
cd ..`}
    </pre>
  </div>
);

const meta: Meta<typeof Introduction> = {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}; 