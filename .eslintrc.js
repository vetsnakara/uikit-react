module.exports = {
    env: {
        browser: true,
        node: true,
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
    plugins: ["react", "@typescript-eslint", "import", "unused-imports"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react/display-name": "off",

        // rules for `unused-imports` plugin
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "error",
            {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_",
            },
        ],

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
