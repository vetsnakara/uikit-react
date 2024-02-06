const path = require("path");

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

        // todo: добавить другие библиотеки
        externals: {
            axios: {
                root: "axios",
                commonjs2: "axios",
                commonjs: "axios",
                amd: "axios",
            },
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
            "react-hook-form": {
                root: "ReactHookForm",
                commonjs2: "react-hook-form",
                commonjs: "react-hook-form",
                amd: "react-dom",
            },
            "react-query": {
                root: "ReactQuery",
                commonjs2: "react-query",
                commonjs: "react-query",
                amd: "react-query",
            }
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
