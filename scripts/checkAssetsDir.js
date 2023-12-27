const path = require("path");
const fs = require("fs");

const dirName = path.resolve(__dirname, "..", "assets", "redesign-theme");

if (!fs.existsSync(dirName)) {
  throw new Error(
    "🛑 Directory 'assets/redesign-theme' is not exist (run 'npm run build:assets')"
  );
}

console.log("✅ Directory 'assets/redesign-theme' exist");
