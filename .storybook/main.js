import path from "path";
import webpack from "webpack";

const { PRR_ASSETS_DIR } = process.env;

if (!PRR_ASSETS_DIR) {
    console.log("🛑 PRR_ASSETS_DIR isn't found");
    process.exit(1);
}

console.log(`✅ PRR_ASSETS_DIR="${PRR_ASSETS_DIR}"`);

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-essentials",
        {
            name: "@storybook/addon-docs",
            options: {
                // for import .md in .mdx files
                transcludeMarkdown: true,
            },
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
                "@/storybook": path.resolve(__dirname, "."),
                "@": path.resolve(__dirname, "..", "src"),
            };
        }

        config.module.rules = config.module.rules.map((rule) => {
            // disable handling urls in css files
            if (/css/.test(rule.test)) {
                rule.use[1].options.url = false; // 1 - css-loader
            }

            return rule;
        });

        const definePlugin = new webpack.DefinePlugin({
            __ASSETS_BASE_URL__: JSON.stringify(""),
        });

        config.plugins?.push(definePlugin);

        return config;
    },
    staticDirs: [PRR_ASSETS_DIR, "./public"],
};

export default config;
