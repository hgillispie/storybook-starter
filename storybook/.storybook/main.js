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
    // Remove any alias or reference to 'main-project' or 'mui-vite-demo' as all components are now local.
    // Ensure dev server binds correctly in container/proxy environments
    config.server = {
      ...(config.server || {}),
      host: true,
      port: process.env.PORT ? Number(process.env.PORT) : 6006,
      strictPort: false,
      hmr: {
        clientPort: process.env.HMR_CLIENT_PORT ? Number(process.env.HMR_CLIENT_PORT) : undefined,
        host: process.env.HMR_HOST || undefined,
        protocol: process.env.HMR_PROTOCOL || undefined,
      },
      headers: {
        // Allow Fusion/Builder ancestors to frame Storybook
        'Content-Security-Policy': [
          "frame-ancestors 'self'",
          'https://builder.io',
          'https://*.builder.io',
          'https://builder.my',
          'https://*.builder.my',
          'https://*.projects.builder.codes',
          'https://*.builder.codes',
          'http://localhost:*',
        ].join(' ') + ';',
        // Ensure legacy header does not block framing
        'X-Frame-Options': 'ALLOWALL',
        // Quiet permissions warnings in sandboxed docs
        'Permissions-Policy': 'fullscreen=*, clipboard-write=*',
      },
    };

    // Workaround for iframe/proxy environments where websocket origin differs
    config.preview = {
      ...(config.preview || {}),
      host: true,
      port: process.env.PREVIEW_PORT ? Number(process.env.PREVIEW_PORT) : 6007,
    };

    return config;
  },
};
export default config; 