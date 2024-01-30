import path from "path";

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)"],
    addons: [
        "@storybook/addon-essentials",
        {
            name: "@storybook/addon-docs",
            options: { transcludeMarkdown: true }, // for import .md in .mdx files
        },
    ],
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

        // if (process.env.NODE_ENV === "production") {
        //   config.output.publicPath = "/react-uikit";
        // }

        return config;
    },
    staticDirs: ["../assets/redesign-theme", "./public"],
};

export default config;
