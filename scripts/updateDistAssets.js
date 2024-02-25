/**
 * @file Делаем сборку UIKit в случае, если есть изменения в каталогах исходных файлов
 */

const { execSync } = require("child_process");

const SRC_PATH = "src/ sources-default/ sources-redesign/ sources-trudvsem";
const DIST_PATH = "./lib ./assets";

const diffCommand = `git diff --cached HEAD ${SRC_PATH}`;
const diffResult = execSync(diffCommand).toString();

if (diffResult) {
    console.log("🛑 Changed source files detected => Rebuild assets ...");

    const build = `npm run build:all`;
    const gitAdd = `git add ${DIST_PATH}`;
    const gitCommit = `git commit -m '[auto] add assets'`;

    const commands = [build, gitAdd, gitCommit].join(" && ");

    execSync(commands, { stdio: "inherit" });

    process.exit(0);
}

console.log("✅ No changed source files detected");
