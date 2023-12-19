const path = require("path");
const fs = require("fs");

const dirName = path.resolve(__dirname, "..", "assets");

if (!fs.existsSync(dirName)) {
  throw new Error(
    "🛑 Assets directory is not exist (run 'npm run build:assets')"
  );
}

console.log("✅ Assets directory exist");
