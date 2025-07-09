/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // Add alias for the main project components using submodule
    config.resolve.alias = {
      ...config.resolve.alias,
      'mui-vite-demo': '/main-project/src'
    };
    return config;
  },
};
export default config; 