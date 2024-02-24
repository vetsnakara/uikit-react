module.exports = {
    env: {
        browser: true,
        node: true,
        jquery: true,
    },
    globals: {
        moment: true,
        _: true,
        yup: true,
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        // "plugin:react-hooks/recommended", // todo: fix deps errors
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["react", "react-hooks", "@typescript-eslint", "import", "unused-imports"],
    rules: {
        "prefer-const": "error",
        "no-extra-boolean-cast": "off",

        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react/display-name": "off",

        // rules for `unused-imports` plugin
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": "error",

        "@typescript-eslint/no-var-requires": "off",

        "import/order": [
            "error",
            {
                groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
                "newlines-between": "always-and-inside-groups",
            },
        ],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
