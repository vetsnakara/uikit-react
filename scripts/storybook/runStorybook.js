const path = require("path");
const fs = require("node:fs");
const { execSync } = require("child_process");

const Mode = {
    Dev: "dev",
    Build: "build",
};

const parentRepoPath = getParentRepoPath();

exports.runStorybook = runStorybook;
exports.getParentRepoPath = getParentRepoPath;

/**
 * todo
 * @param {*} param0
 */
function runStorybook({ mode = Mode.Dev }) {
    buildAssetsFromMaster();

    process.env.PRR_ASSETS_DIR = getAssetsDirPath();

    if (mode === Mode.Dev) runStorybookDev();
    if (mode === Mode.Build) runStorybookBuild();
}

function runStorybookDev() {
    execSync("npx storybook dev -p 3000", { stdio: "inherit" });
}

function runStorybookBuild() {
    execSync("npx storybook build", { stdio: "inherit" });
}

function buildAssetsFromMaster() {
    // console.log("❗ buildAssetsFromMaster: uikit-react repo");
    // execSync(`cd ${parentRepoPath}`);
    // execSync(`cd -`);

    // execSync(`npm run prod:master --prefix ${parentRepoPath}`, { stdio: "inherit" });

    // process.chdir(parentRepoPath);
    // console.log("process.cwd()", process.cwd());
    // execSync(`npm run prod:master`, { stdio: "inherit" });
    execSync(`npm run prod:master --prefix ${parentRepoPath}`, { stdio: "inherit" });
}

function getParentRepoPath() {
    const str = fs.readFileSync(".git", "utf8");

    const [, parentGitPath] = str.split("gitdir: ");
    const [parentRepoPath] = parentGitPath.split(".git");

    return parentRepoPath;
}

function getAssetsDirPath() {
    const rootDir = path.join(__dirname, "..", "..");
    return path.join(rootDir, parentRepoPath, "assets", "redesign-theme");
}
