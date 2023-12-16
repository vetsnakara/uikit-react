const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Example: build with iblock names
// npm run devjs -- --env names=name1,name2,...

const Mode = {
  Development: "development",
  Production: "production",
};

const mode = process.env.NODE_ENV;
const isProduction = mode === Mode.Production;
const name = "uikit";
const bundleName = `${name}${isProduction ? ".min" : ""}.js`;

module.exports = () => {
  console.log(`Running webpack in ${mode} mode.`);

  const config = {
    mode,

    entry: "./src/index.js",

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },

    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: bundleName,
      libraryTarget: "umd",
    },

    devtool: isProduction ? false : "inline-source-map",

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/env",
                  [
                    "@babel/react",
                    {
                      runtime: "automatic",
                    },
                  ],
                ],
              },
            },
            { loader: "ts-loader" },
          ],
        },
      ],
    },

    plugins: [new CleanWebpackPlugin()],
  };

  return config;
};
