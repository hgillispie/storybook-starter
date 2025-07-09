# Alternative Setup Approaches

## Option 1: Git Submodules (Recommended for Development)

If you want to work on both repositories simultaneously, you can use git submodules:

```bash
# Add the main project as a submodule
git submodule add https://github.com/buildernick/mui-vite-demo.git main-project

# Update the storybook/.storybook/main.js to reference the submodule
```

Then update `storybook/.storybook/main.js`:
```javascript
const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Reference the submodule
    '../main-project/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  // ... rest of config
  viteFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'mui-vite-demo': '/main-project/src'
    };
    return config;
  },
};
```

## Option 2: Local Development Setup

For local development, you can link the projects:

```bash
# In the main project directory
npm link

# In this storybook directory
npm link mui-vite-demo
```

## Option 3: Monorepo with Lerna/Nx

For more complex setups, consider using Lerna or Nx to manage both projects in a monorepo structure.

## Current Setup (GitHub Dependency)

The current setup uses the GitHub dependency approach, which is:
- ✅ Simple to set up
- ✅ Works well for production
- ✅ Easy to version control
- ❌ Requires manual updates to get latest changes
- ❌ No live development sync

Choose the approach that best fits your workflow! 