// Utils
const FS = require("fs");
const $PATH = require("path");

function readFileAsync(filename) {
    return new Promise((y, n) => FS.readFile(filename, "utf8", (e, d) => (e ? n(e) : y(d))));
}

function parseArg(arg) {
    const start = arg.indexOf("$"),
        end = arg.indexOf(":");
    if (start > -1 && end > -1) return arg.substring(start, end);
}

// Tests
const tests = {
    // checkPixelsRecalculations: function(e, path, file, args) {
    //   const pixelsDeclare = file.match(/[\-\.\d]+px/g);
    //   const fpxDeclare = file.match(/px\([\-\.\d]/g);
    //   if(!pixelsDeclare || !fpxDeclare) return;
    //
    //   fpxDeclare.forEach(function(px) {
    //     const pxIndex = pixelsDeclare.findIndex(px => px.includes(`(${px}`));
    //     if(pxIndex < 0) return;
    //     pixelsDeclare.splice(pxIndex, 1);
    //   })
    //
    //   const thinlessPixelsDeclare = pixelsDeclare.filter(px => px != '1px' && px != '.px' && px != '-1px' && px != '0.1px');
    //   if(thinlessPixelsDeclare.length) {
    //     e.add(path, `Значения [${thinlessPixelsDeclare.join(', ')}] объявлены без использования функции px(), либо указана ненужная ед. измерения`);
    //   }
    // },
    checkPixelsRecalculations: function (e, path, file) {
        // eslint-disable-next-line no-useless-escape
        const pixelsDeclare = file.match(/[\-\.\d]+px/g);
        if (!pixelsDeclare) return;

        pixelsDeclare.forEach(function () {
            const pxIndex = pixelsDeclare.findIndex((px) => px.includes(`(${px}`));
            if (pxIndex < 0) return;
            pixelsDeclare.splice(pxIndex, 1);
        });

        const thinlessPixelsDeclare = pixelsDeclare.filter(
            (px) => px != "1px" && px != ".px" && px != "-1px" && px != "0.1px"
        );
        if (thinlessPixelsDeclare.length) {
            e.add(path, `Значения [${thinlessPixelsDeclare.join(", ")}] объявлены без использования функции px()`);
        }
    },
    checkUnusedVariables: function (e, path, file) {
        const variablesNames = file.match(/\$[\w-]+/g);
        const variablesNamesDoubles = [
            "$hue",
            "$saturation",
            "$lightness",
            "$alpha",
            "$datepickerTextColor",
            "$datepickerBG",
            "$datepickerBorderColor",
            "$font-size-datepicker-nav-title",
            "$images",
        ];
        variablesNames.forEach(function (variableName, i) {
            if (variablesNamesDoubles.includes(variableName)) return;
            const nextPosition = variablesNames.indexOf(variableName, i + 1);
            if (nextPosition < 0) e.add(path, `Переменная [${variableName}] объявлена, но не используется`);
            else variablesNamesDoubles.push(variableName);
        });
    },
    checkParametersDeclarations: function (e, path, file, args) {
        const parametersNames = file.match(/\$[\w-]+.+?!default;/g).map((paramStr) => paramStr.match(/\$[\w-]+/g)[0]);
        parametersNames.forEach((paramName) => {
            if (!args.includes(paramName)) {
                e.add(path, `Объявление параметра [${paramName}] не найдено`);
            }
        });
    },
    checkArgumentsDeclarations: function (e, path, file, args) {
        args.forEach(function (argument) {
            const index = file.indexOf(argument);
            if (index < 0) {
                e.add(path, `Объявление аргумента [${argument}] не найдено.`);
            }
        });
    },
};

// Main
async function parseIndex(indexFile, type) {
    const modules = indexFile.split("@use");
    const errors = {
        log: {},
        add: function (path, message) {
            if (this.log[path]) {
                this.log[path].push(message);
            } else {
                this.log[path] = [message];
            }
        },
    };

    for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        const argumentsStart = module.indexOf("(");
        const moduleName = module
            .substring(0, argumentsStart)
            .replace("with", "")
            .replace(/"| |\r|\n/g, "");
        if (!moduleName || moduleName == "tooltip" || moduleName == "index/index") continue;
        const argumentsDeclarations = module.substring(argumentsStart).replace("(", "").replace(");", "").split(",");
        const moduleArgs = argumentsDeclarations.map(parseArg).filter((arg) => arg && arg.length);
        const modulePath = `sources-redesign/ui-${type}/${moduleName}/index.scss`;
        const moduleFile = await readFileAsync($PATH.resolve(__dirname, modulePath));

        for (const test in tests) {
            tests[test](errors, modulePath, moduleFile, moduleArgs);
        }
    }

    return errors.log;
}

async function run() {
    const types = ["infoblocks", "kit", "special"];
    const errors = {};
    for (const type of types) {
        const indexFile = await readFileAsync(__dirname + `/sources-redesign/ui-${type}/index.scss`);
        const typeErrors = await parseIndex(indexFile, type);
        Object.assign(errors, typeErrors);
    }

    FS.writeFile("sources-redesign/__tests.json", JSON.stringify(errors, null, 2), "utf-8", function (err) {
        if (err) throw err;
    });
}

run();
