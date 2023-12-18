const fs = require("fs");
const path = require("path");

const oldPath = path.resolve(__dirname, "..", "assets");
const newPath = path.resolve(__dirname, "..", "dist", "assets");

fs.mkdir(path.dirname(newPath), { recursive: true }, () => {});
fs.rename(oldPath, newPath, () => {});
