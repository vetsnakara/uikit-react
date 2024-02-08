/**
 * @file Перемещение минифицированного бандла React UIKit из каталога сборки `lib` в каталог `assets`
 * для возможности подключения React UIKit в качестве ресурса инфоблока.
 */

const fs = require("fs");
const path = require("path");

const fileName = "uikit-react.min.js";

const src = path.resolve(__dirname, "..", "lib", fileName);

const dest = path.resolve(__dirname, "..", "assets", "redesign-theme", "scripts", fileName);

fs.rename(src, dest, (err) => {
    if (err) console.log(err);
});
