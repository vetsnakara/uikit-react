const path = require("path");

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
      extensions: [".js", ".jsx"],
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
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
  };

  return config;
};
