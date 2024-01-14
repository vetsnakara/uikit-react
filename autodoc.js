const fs = require("fs");

const cheerio = require("cheerio");
// const process = require('child_process');

function hashsum(s) {
    let chk = 0x123456;
    for (let i = 0; i < s.length; i++) {
        chk += s.charCodeAt(i) * (i + 1);
    }
    return (chk & 0xffffff).toString(16);
}

function format(code) {
    let outerIndent = null;
    return code
        .split("\n")
        .map((line, index, arr) => {
            const codeIndex = line.search(/\S/);
            const edgeLine = index == 0 || index == arr.length - 1;
            if (codeIndex === -1 && edgeLine) return false;
            // Trim empty lines
            else if (codeIndex === -1) return "";
            // Save empty lines but clean them within code
            else if (outerIndent === null) outerIndent = codeIndex; // Calc parent's indentation
            return line.replace("\r", "").substring(outerIndent); // Clean and cut parent's indentation
        })
        .filter((line) => line !== false)
        .join("\n");
}

function collectBlocks(uiType) {
    const elements = fs.readdirSync(`sources-redesign/${uiType}/`, { withFileTypes: true });

    return elements
        .map((element) => {
            const name = element.name;
            const type = element[Object.getOwnPropertySymbols(element)[0]];

            if (type === 2) {
                return name;
            }
        })
        .filter(Boolean);
}

function prepareBlock(uiType, name) {
    let html = {},
        time;
    try {
        html = fs.readFileSync(`sources-redesign/${uiType}/${name}/index.htm`);
        // time = process.execSync(`git log -1 --pretty="format:%ci" sources-redesign/${uiType}/${name}/index.htm`).toString();
    } catch (err) {
        return;
    }

    const $ = cheerio.load(html.toString(), { decodeEntities: false });
    const tabs = [];

    $("doc-tab").each((i, tab) => {
        const name = $(tab).attr("name");
        const hash = "tab-" + hashsum(name);
        let info = $(tab).find("doc-info").html();
        let view = $(tab).find("doc-view").html();

        if (info) info = info.replace(/  +/g, " ");
        if (view) view = view.replace(/  +/g, " ");

        const viewHeight = $(tab).find("doc-view").attr("height");
        const codes = [];
        $("doc-code", tab).each((i, code) => {
            codes.push(format($(code).html()));
        });

        tabs.push({ hash, name, info, view, viewHeight, codes });
    });

    return {
        hash: name,
        name: $("doc-component").attr("name"),
        link: $("doc-component").attr("link"),
        type: uiType,
        tabs,
        time,
    };
}

function createPage() {
    const UIKIT = collectBlocks("ui-kit")
        .map((name) => prepareBlock("ui-kit", name))
        .filter(Boolean);
    const UISPECIAL = collectBlocks("ui-special")
        .map((name) => prepareBlock("ui-special", name))
        .filter(Boolean);
    const UIINFOBLOCKS = collectBlocks("ui-infoblocks")
        .map((name) => prepareBlock("ui-infoblocks", name))
        .filter(Boolean);

    return JSON.stringify(UIKIT.concat(UISPECIAL).concat(UIINFOBLOCKS));
}

fs.mkdir("assets/redesign-theme", { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFile(`assets/redesign-theme/uikit/index.json`, createPage(), function (err) {
        if (err) throw err;
    });
});
