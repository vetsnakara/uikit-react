const fs = require("fs");
const path = require("path");

const fileName = "react-uikit.min.js";

const src = path.resolve(__dirname, "..", "lib", fileName);

const dest = path.resolve(
  __dirname,
  "..",
  "assets",
  "redesign-theme",
  "scripts",
  fileName
);

fs.rename(src, dest, (err) => {
  if (err) console.log(err);
});
