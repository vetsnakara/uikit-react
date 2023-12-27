import path from "path";

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@uikit": path.resolve(__dirname, "../src"),
        // "@storybook": path.resolve(__dirname, "../.storybook"),
      };
    }

    config.module.rules = config.module.rules.map((rule) => {
      // disable handling urls in css files
      if (/css/.test(rule.test)) {
        rule.use[1].options.url = false; // 1 - css-loader
      }

      return rule;
    });

    return config;
  },
  staticDirs: ["../assets/redesign-theme", "./public"],
};

export default config;
