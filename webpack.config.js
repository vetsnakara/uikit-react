const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");

const Mode = {
    Development: "development",
    Production: "production",
};

const mode = process.env.NODE_ENV;
const isProduction = mode === Mode.Production;
const libName = "uikit-react";

module.exports = () => {
    console.log(`Running webpack in ${mode} mode.`);

    const config = {
        mode,

        entry: "./src/index.js",

        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },

        output: {
            path: path.resolve(__dirname, "./lib"),
            filename: isProduction ? `${libName}.min.js` : `${libName}.js`,

            // собираем UMD-модуль
            libraryTarget: "umd",

            // в месте использования библиотека будет доступна через глобальную переменную UIKitReact
            library: "UIKitReact",
        },

        devtool: isProduction ? false : "inline-source-map",

        module: {
            rules: [
                // {
                //     test: /\.css$/i,
                //     use: ["style-loader", "css-loader"], // todo: rm deps
                // },
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: "babel-loader",
                },
            ],
        },

        // зависимости UMD-модуля библиотеки React UIKit
        // ---------------------------------------------
        // NOTE: указанные ниже библиотеки не включаются в бандл библиотеки React UIKIT,
        // их UMD-модули доллжны быть загружены в браузер перед загрузкой React UIKit
        // и быть доступны глобально под указанными именами (root)
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
            "react-hook-form": {
                root: "ReactHookForm",
                commonjs2: "react-hook-form",
                commonjs: "react-hook-form",
                amd: "react-dom",
            },
            "@tanstack/react-query": {
                root: "ReactQuery",
                commonjs2: "react-query",
                commonjs: "react-query",
                amd: "react-query",
            },
            axios: {
                root: "axios",
                commonjs2: "axios",
                commonjs: "axios",
                amd: "axios",
            },
        },

        // не генерировать файл лицензии
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
