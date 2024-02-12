module.exports = function (api) {
    const mode = process.env.NODE_ENV;
    const isDev = mode === "development";

    console.log("🛠 Babel:mode", mode);

    api.cache(true);

    // note:
    // 1. при сборке в DEV-режиме (uikit-react.js) генерируем импорты React из среды выполнения,
    // чтобы сборка uikit-react.js работала в Storybook в проекте ПРР
    // 2. при сборке в PROD-режиме (uikit-react.min.js) переменная React будет ссылаться
    // на глобальную переменную в браузере

    return {
        presets: ["@babel/env", ["@babel/react", { runtime: isDev ? "automatic" : "classic" }]],
        plugins: ["@babel/proposal-class-properties"], //! rm?
    };
};
