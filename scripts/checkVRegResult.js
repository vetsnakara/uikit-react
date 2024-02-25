/**
 * @file
 */

const fs = require("fs");
const path = require("path");

// check last exit code: echo $?

const dirPath = path.join(__dirname, "..", ".loki", "difference");

fs.readdir(dirPath, function (err, files) {
    if (err || files.length) {
        console.log(`🛑 VReg: have ${files.length} diff files`);
        process.exit(1);
    }

    console.log("✅ VReg");
    process.exit(0);
});
