import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const Introduction = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <h1>MUI Vite Demo Storybook</h1>
    <p>
      This Storybook showcases components that are now fully local to this repository. All dashboard and UI components are copied into the Storybook project for documentation and testing purposes.
    </p>
    <h2>How it works</h2>
    <p>
      This standalone Storybook repository contains its own copies of all relevant components. There are no dependencies on an external main project.
    </p>
    <h2>Getting Started</h2>
    <ol>
      <li>Install dependencies: <code>npm install</code></li>
      <li>Start Storybook: <code>npm run storybook</code></li>
      <li>Build for production: <code>npm run build-storybook</code></li>
    </ol>
    <h2>Available Components</h2>
    <p>
      The following components are now available in this Storybook:
    </p>
    <ul>
      <li><strong>Dashboard/SideMenu</strong> - A permanent sidebar navigation component</li>
      <li><strong>Dashboard/Search</strong> - A search input component with icon adornment</li>
      <li><strong>Dashboard/StatCard</strong> - A statistics card with sparkline charts</li>
      <li><strong>Dashboard/HighlightedCard</strong> - A highlighted card with call-to-action</li>
      <li><strong>Dashboard/PageViewsBarChart</strong> - Bar chart for page views and downloads</li>
      <li><strong>Dashboard/CardAlert</strong> - Alert card with call-to-action</li>
      <li><strong>Dashboard/DashboardLayout</strong> - Example dashboard layout</li>
      <li><strong>Components/Button</strong> - Example button component (demonstration)</li>
      <li><strong>Examples/ComponentExample</strong> - Example component with variants</li>
    </ul>
    <h2>Component Stories</h2>
    <p>
      The stories in this Storybook are maintained here and import components from the local <code>src/components</code> and <code>src/shared-theme</code> directories.
    </p>
    <h2>Creating Stories</h2>
    <p>
      To create stories for components, import them from the local <code>src/components</code> directory:
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
import MyComponent from '../src/components/MyComponent';

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
    <h2>Updating Components</h2>
    <p>
      All components are now managed and updated directly within this repository.
    </p>
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