const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// Example: build with iblock names
// npm run devjs -- --env names=name1,name2,...

const Mode = {
    Development: "development",
    Production: "production",
};

const mode = process.env.NODE_ENV;
const isProduction = mode === Mode.Production;

module.exports = () => {
    console.log(`Running webpack in ${mode} mode.`);

    const config = {
        mode,

        entry: "./src/index.js",

        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"], //? ts
        },

        output: {
            path: path.resolve(__dirname, "./lib"),
            filename: isProduction ? "react-uikit.min.js" : "react-uikit.js",
            library: "ReactUikit",
            libraryTarget: "umd",
        },

        devtool: isProduction ? false : "inline-source-map",

        module: {
            rules: [
                // todo: rm ???
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(js|jsx|ts|tsx)$/, //? ts
                    exclude: /node_modules/,
                    use: "babel-loader",
                },
            ],
        },

        // plugins: [new CleanWebpackPlugin()],

        externals: {
            react: {
                root: "React",
                commonjs2: "react",
                commonjs: "react",
                amd: "react",
            },
            "react-dom": {
                root: "ReactDOM",
                commonjs2: "react-dom",
                commonjs: "react-dom",
                amd: "react-dom",
            },
        },

        // to NOT generate license file
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
            ],
        },
    };

    return config;
};
