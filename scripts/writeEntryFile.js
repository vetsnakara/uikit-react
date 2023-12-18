const fs = require("fs");
const path = require("path");

const writeCjsEntryFile = () => {
  const name = "uikit";
  const baseLine = `module.exports = require('./${name}`;
  const contents = `'use strict'

if (process.env.NODE_ENV === 'production') {
  ${baseLine}.min.js');
} else {
  ${baseLine}.js');
}
`;

  const distDir = path.join(__dirname, "../dist/");

  const filePath = path.join(distDir, "index.js");
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }
  return fs.writeFileSync(filePath, contents);
};

writeCjsEntryFile();
