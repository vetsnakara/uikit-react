const exec = require("child_process").exec;

const del = require("del");
const open = require("open");

const { src, dest, series, watch } = require("gulp");
const svgmin = require("gulp-svgo");
const svgstore = require("gulp-svgstore");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-terser");
const rename = require("gulp-rename");
const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const sass = require("gulp-dart-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const connect = require("gulp-connect");

const isProduction = process.env.PRRENV === "production";
const paths = {
    theme: process.env.PRRTHEME || "redesign",
    get from() {
        return `sources-${this.theme}`;
    },
    get to() {
        return `assets/${this.theme}-theme`;
    },
};

function clean() {
    return del([`${paths.to}/fonts`, `${paths.to}/scripts`, `${paths.to}/uikit`]);
}

function fonts() {
    return src(`${paths.from}/fonts/*.{woff,woff2}`).pipe(dest(`${paths.to}/fonts`));
}

function legacyImages() {
    return src(`${paths.from}/images/*.{png,ico,jpg,svg}`).pipe(dest(`${paths.to}/images`));
}

function pageTemplates() {
    return src([
        "sources-default/page-templates/*/*.*",
        "sources-trudvsem/page-templates/*/*.*",
        "sources-redesign/page-templates/*/*.*",
    ])
        .pipe(dest("assets/default-theme/page-templates"))
        .pipe(dest("assets/trudvsem-theme/page-templates"))
        .pipe(dest("assets/redesign-theme/page-templates"));
}

function sysTemplates() {
    return src([
        "sources-default/static-templates/*/*.html",
        "sources-trudvsem/static-templates/*/*.html",
        "sources-redesign/static-templates/*/*.html",
    ])
        .pipe(dest("assets/default-theme/static-templates"))
        .pipe(dest("assets/trudvsem-theme/static-templates"))
        .pipe(dest("assets/redesign-theme/static-templates"));
}

function scss() {
    return src(`${paths.from}/theme-${isProduction ? "*" : "common"}.scss`)
        .pipe(sass())
        .pipe(autoprefixer({ grid: true }))
        .pipe(
            cleancss({
                compatibility: "ie11",
                format: isProduction ? "default" : "beautify",
            })
        )
        .pipe(
            rename(function (path) {
                path.basename = path.basename.replace("theme-", "");
            })
        )
        .pipe(dest(`${paths.to}/uikit`));
    // idk how to gitignore one line .pipe(dest('/Users/xbor/Projects/doc/public/uikit'))
}

function debug() {
    return src(`${paths.from}/cssdebug.scss`, {
        allowEmpty: true,
    })
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(dest(`${paths.to}/uikit/`));
}

function icons() {
    return src(`${paths.from}/ui-kit/icon/icons/**/*.svg`)
        .pipe(
            svgmin({
                plugins: [{ removeViewBox: false }, { removeUselessStrokeAndFill: false }],
            })
        )
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(dest(`${paths.to}/uikit/icon`));
}

function fallbacks() {
    return src([`${paths.from}/ui-kit/**/fallback.js`, `${paths.from}/ui-special/**/fallback.js`], {
        allowEmpty: true,
    })
        .pipe(concat("fallbacks.js"))
        .pipe(gulpif(isProduction, babel({ presets: [["@babel/preset-env", { modules: false }]] })))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(dest(`${paths.to}/scripts`));
}

function root() {
    return src([`${paths.from}/root/*`], {
        allowEmpty: true,
    }).pipe(dest(`${paths.to}/root/`));
}

function uikit() {
    return src(
        [
            `${paths.from}/ui-kit/**/*.js`,
            `${paths.from}/ui-infoblocks/**/*.js`,
            `${paths.from}/ui-special/**/*.js`,
            `!${paths.from}/ui-kit/bootstrap/utils.js`,
            `!${paths.from}/ui-kit/**/fallback.js`,
            `!${paths.from}/ui-special/**/fallback.js`,
            `!${paths.from}/ui-kit/**/*.stories.js`,
        ],
        {
            allowEmpty: true,
        }
    )
        .pipe(gulpif(!isProduction, sourcemaps.init()))
        .pipe(babel())
        .pipe(concat("uikit.js"))
        .pipe(gulpif(!isProduction, sourcemaps.write(), uglify()))
        .pipe(dest(`${paths.to}/scripts`));
}

function libraries() {
    return src(
        [
            `${paths.from}/scripts/**/*.js`,
            `${paths.from}/ui-kit/bootstrap/utils.js`,
            `!${paths.from}/scripts/tinymce/**/*.js`,

            //! don't minify already minified lib files
            `!${paths.from}/scripts/*.min.js`,
            `${paths.from}/scripts/purify.min.js`,
        ],
        {
            allowEmpty: true,
        }
    )
        .pipe(babel({ presets: [["@babel/preset-env", { modules: false }]] }))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(dest(`${paths.to}/scripts`));
}

function minLibrariesMove() {
    return src([`${paths.from}/scripts/*.min.js`, `!${paths.from}/scripts/purify.min.js`]).pipe(
        dest(`${paths.to}/scripts`)
    );
}

function librariesMove() {
    return src([`${paths.from}/scripts/tinymce/**/*.js`], {
        allowEmpty: true,
    }).pipe(dest(`${paths.to}/scripts/tinymce/`));
}

function librariesCSS() {
    return src([`${paths.from}/scripts/**/*.css`], {
        allowEmpty: true,
    }).pipe(dest(`${paths.to}/scripts`));
}

function images() {
    return src([
        `${paths.from}/ui-kit/**/*.{jpg,jpeg,png,svg}`,
        `${paths.from}/ui-infoblocks/**/*.{jpg,jpeg,png,svg}`,
        `${paths.from}/ui-special/**/*.{jpg,jpeg,png,svg}`,
        `!${paths.from}/ui-kit/icon/**/*.svg`,
    ]).pipe(dest(`${paths.to}/uikit`));
}

function serve() {
    connect.server({
        root: "assets/redesign-theme",
        port: 3000,
    });
    open("http://localhost:3000/?watch");
}

function autodoc(callback) {
    var execute = isProduction ? "node autodoc.js PRODUCTION" : "node autodoc.js";
    exec(execute, function (err) {
        callback(err);
    });
}

function autotest(callback) {
    exec("node autotest.js", function (err) {
        callback(err);
    });
}

function setRedesignTheme(callback) {
    paths.theme = "redesign";
    callback();
}

function setTrudvsemTheme(callback) {
    paths.theme = "trudvsem";
    callback();
}

exports.production = series(
    setRedesignTheme,
    clean,
    scss,
    autodoc,
    debug,
    libraries,
    librariesMove,
    minLibrariesMove,
    librariesCSS,
    uikit,
    fonts,
    images,
    root,
    icons,
    fallbacks,
    autotest,
    setTrudvsemTheme,
    clean,
    scss,
    autodoc,
    libraries,
    librariesMove, //? duplication
    uikit,
    fonts,
    images,
    icons,
    fallbacks,
    legacyImages,
    sysTemplates,
    pageTemplates
);

exports.watch = function () {
    series(
        clean,
        scss,
        autodoc,
        debug,
        libraries,
        librariesMove,
        minLibrariesMove,
        librariesCSS,
        uikit,
        fonts,
        images,
        icons,
        autotest,
        root,
        serve
    )();

    watch(`${paths.from}/cssdebug.scss`, debug);
    watch(`${paths.from}/**/*.scss`, series(scss, autotest));
    watch(`${paths.from}/scripts/**/*.js`, libraries);
    watch(`${paths.from}/scripts/**/*.css`, librariesCSS);
    watch(`${paths.from}/ui-kit/icon/svg/**/*.svg`, icons);
    watch(`${paths.from}/**/*.htm`, autodoc);
    watch(
        [`${paths.from}/ui-kit/**/*.js`, `${paths.from}/ui-infoblocks/**/*.js`, `${paths.from}/ui-special/**/*.js`],
        uikit
    );
};
