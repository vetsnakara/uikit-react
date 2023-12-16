const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Example: build with iblock names
// npm run devjs -- --env names=name1,name2,...

const Mode = {
  Development: "development",
  Production: "production",
};

module.exports = (...args) => {
  const [, { mode = Mode.Development, env: { names = "" } = {} }] = args;

  const isProduction = mode === Mode.Production;

  console.log(`Running webpack in ${mode} mode.`);

  const config = {
    mode,

    entry: "./src/index.js",

    resolve: {
      extensions: [".js", ".jsx"],
    },

    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "index.js",
      libraryTarget: "umd",
    },

    devtool: isProduction ? false : "inline-source-map",

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },

    plugins: [new CleanWebpackPlugin()],
  };

  return config;
};
