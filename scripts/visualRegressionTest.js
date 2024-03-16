/**
 * @file
 * выненесно сюда из скриптов, т.к. при тестировании нужно
 * 1. формировать отчет после прогона в случае падения тестов (если есть diff-файлы)
 * 2. выдывать exit code после формирования отчета для git hooks
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const dirPath = path.join(__dirname, "..", ".loki", "difference");

prepare();
test();

/**
 * todo
 */
function prepare() {
    // clear
    execSync("npm run clear:vreg", { stdio: "inherit" });
}

/**
 * todo
 */
function test() {
    try {
        execSync("npm run vreg:test", { stdio: "inherit" });
    } catch (error) {
        createReport();
        console.log(`🛑 VReg: tests failed`);
        process.exit(1);
    }

    console.log("✅ VReg: tests passed");
    process.exit(0);
}

/**
 * todo
 */
function createReport() {
    const files = fs.readdirSync(dirPath);

    if (files.length > 0) {
        execSync("npm run vreg:report");
        console.log("📃 Vreg: report created");
    }
}
