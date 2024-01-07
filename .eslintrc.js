module.exports = {
    env: {
        browser: true,
        jquery: true,
    },
    globals: {
        moment: true,
        _: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/react-in-jsx-scope": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
