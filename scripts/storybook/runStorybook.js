const path = require("path");
const fs = require("node:fs");
const { execSync } = require("child_process");

const parentRepoPath = getParentRepoPath();

exports.runStorybookDev = runStorybookDev;
exports.runStorybookBuild = runStorybookBuild;

// Functions
// ......................................

function runStorybookBuild() {
    buildAssetsFromMasterBranch();
    buildStorybook();
}

function runStorybookDev() {
    buildAssetsFromCurrentBranch();
    runStorybookServer();
}

function runStorybookServer() {
    process.env.PRR_ASSETS_DIR = getAssetsDirPath();
    execSync("npx storybook dev -p 3000", { stdio: "inherit" });
}

function buildStorybook() {
    process.env.PRR_ASSETS_DIR = getAssetsDirPath();
    execSync("npx storybook build", { stdio: "inherit" });
}

function buildAssetsFromCurrentBranch() {
    execSync(`npm run prod --prefix ${parentRepoPath}`, { stdio: "inherit" });
}

function buildAssetsFromMasterBranch() {
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
