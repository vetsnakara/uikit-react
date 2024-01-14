module.exports = function (grunt) {
    const timeGrunt = require("time-grunt");
    const sass = require("sass-embedded");
    timeGrunt(grunt);

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                includePaths: ["sources-redesign"],
            },
            redesign: {
                files: [
                    {
                        "assets/redesign-theme/uikit/blind-white-small-noimage.css":
                            "sources-redesign/theme-blind-white-small-noimage.scss",
                        "assets/redesign-theme/uikit/blind-white-small-image.css":
                            "sources-redesign/theme-blind-white-small-image.scss",
                        "assets/redesign-theme/uikit/blind-white-medium-noimage.css":
                            "sources-redesign/theme-blind-white-medium-noimage.scss",
                        "assets/redesign-theme/uikit/blind-white-medium-image.css":
                            "sources-redesign/theme-blind-white-medium-image.scss",
                        "assets/redesign-theme/uikit/blind-white-large-noimage.css":
                            "sources-redesign/theme-blind-white-large-noimage.scss",
                        "assets/redesign-theme/uikit/blind-white-large-image.css":
                            "sources-redesign/theme-blind-white-large-image.scss",
                        "assets/redesign-theme/uikit/blind-blue-small-noimage.css":
                            "sources-redesign/theme-blind-blue-small-noimage.scss",
                        "assets/redesign-theme/uikit/blind-blue-small-image.css":
                            "sources-redesign/theme-blind-blue-small-image.scss",
                        "assets/redesign-theme/uikit/blind-blue-medium-noimage.css":
                            "sources-redesign/theme-blind-blue-medium-noimage.scss",
                        "assets/redesign-theme/uikit/blind-blue-medium-image.css":
                            "sources-redesign/theme-blind-blue-medium-image.scss",
                        "assets/redesign-theme/uikit/blind-blue-large-noimage.css":
                            "sources-redesign/theme-blind-blue-large-noimage.scss",
                        "assets/redesign-theme/uikit/blind-blue-large-image.css":
                            "sources-redesign/theme-blind-blue-large-image.scss",
                        "assets/redesign-theme/uikit/blind-black-small-noimage.css":
                            "sources-redesign/theme-blind-black-small-noimage.scss",
                        "assets/redesign-theme/uikit/blind-black-small-image.css":
                            "sources-redesign/theme-blind-black-small-image.scss",
                        "assets/redesign-theme/uikit/blind-black-medium-noimage.css":
                            "sources-redesign/theme-blind-black-medium-noimage.scss",
                        "assets/redesign-theme/uikit/blind-black-medium-image.css":
                            "sources-redesign/theme-blind-black-medium-image.scss",
                        "assets/redesign-theme/uikit/blind-black-large-noimage.css":
                            "sources-redesign/theme-blind-black-large-noimage.scss",
                        "assets/redesign-theme/uikit/blind-black-large-image.css":
                            "sources-redesign/theme-blind-black-large-image.scss",
                        "assets/redesign-theme/uikit/common.css": "sources-redesign/theme-common.scss",
                        "assets/redesign-theme/uikit/cssdebug.css": "sources-redesign/cssdebug.scss",
                    },
                ],
            },
            legacy: {
                files: {
                    "assets/trudvsem-theme/uikit/common.css": "sources-trudvsem/theme-common.scss",
                },
            },
            rdev: {
                options: {
                    sourceMap: true,
                },
                files: {
                    "assets/redesign-theme/uikit/common.css": "sources-redesign/theme-common.scss",
                },
            },
        },
        postcss: {
            options: {
                processors: [require("autoprefixer")({ grid: true })],
            },
            redesign: {
                src: "assets/redesign-theme/uikit/*.css",
            },
            legacy: {
                src: "assets/trudvsem-theme/uikit/*.css",
            },
        },
        cssmin: {
            options: {
                compatibility: "ie11",
            },
            redesign: {
                files: {
                    "assets/redesign-theme/uikit/blind-white-small-noimage.css":
                        "assets/redesign-theme/uikit/blind-white-small-noimage.css",
                    "assets/redesign-theme/uikit/blind-white-small-image.css":
                        "assets/redesign-theme/uikit/blind-white-small-image.css",
                    "assets/redesign-theme/uikit/blind-white-medium-noimage.css":
                        "assets/redesign-theme/uikit/blind-white-medium-noimage.css",
                    "assets/redesign-theme/uikit/blind-white-medium-image.css":
                        "assets/redesign-theme/uikit/blind-white-medium-image.css",
                    "assets/redesign-theme/uikit/blind-white-large-noimage.css":
                        "assets/redesign-theme/uikit/blind-white-large-noimage.css",
                    "assets/redesign-theme/uikit/blind-white-large-image.css":
                        "assets/redesign-theme/uikit/blind-white-large-image.css",
                    "assets/redesign-theme/uikit/blind-blue-small-noimage.css":
                        "assets/redesign-theme/uikit/blind-blue-small-noimage.css",
                    "assets/redesign-theme/uikit/blind-blue-small-image.css":
                        "assets/redesign-theme/uikit/blind-blue-small-image.css",
                    "assets/redesign-theme/uikit/blind-blue-medium-noimage.css":
                        "assets/redesign-theme/uikit/blind-blue-medium-noimage.css",
                    "assets/redesign-theme/uikit/blind-blue-medium-image.css":
                        "assets/redesign-theme/uikit/blind-blue-medium-image.css",
                    "assets/redesign-theme/uikit/blind-blue-large-noimage.css":
                        "assets/redesign-theme/uikit/blind-blue-large-noimage.css",
                    "assets/redesign-theme/uikit/blind-blue-large-image.css":
                        "assets/redesign-theme/uikit/blind-blue-large-image.css",
                    "assets/redesign-theme/uikit/blind-black-small-noimage.css":
                        "assets/redesign-theme/uikit/blind-black-small-noimage.css",
                    "assets/redesign-theme/uikit/blind-black-small-image.css":
                        "assets/redesign-theme/uikit/blind-black-small-image.css",
                    "assets/redesign-theme/uikit/blind-black-medium-noimage.css":
                        "assets/redesign-theme/uikit/blind-black-medium-noimage.css",
                    "assets/redesign-theme/uikit/blind-black-medium-image.css":
                        "assets/redesign-theme/uikit/blind-black-medium-image.css",
                    "assets/redesign-theme/uikit/blind-black-large-noimage.css":
                        "assets/redesign-theme/uikit/blind-black-large-noimage.css",
                    "assets/redesign-theme/uikit/blind-black-large-image.css":
                        "assets/redesign-theme/uikit/blind-black-large-image.css",
                    "assets/redesign-theme/uikit/common.css": "assets/redesign-theme/uikit/common.css",
                    "assets/redesign-theme/uikit/cssdebug.css": "assets/redesign-theme/uikit/cssdebug.css",
                },
            },
            legacy: {
                files: {
                    "assets/trudvsem-theme/uikit/common.css": "assets/trudvsem-theme/uikit/common.css",
                },
            },
        },
        svgstore: {
            options: {
                inlineSvg: true,
                includeTitleElement: false,
            },
            redesign: {
                files: {
                    "assets/redesign-theme/uikit/icon/icons.svg": "sources-redesign/ui-kit/icon/icons/*.svg",
                },
            },
            legacy: {
                files: {
                    "assets/trudvsem-theme/uikit/icon/icons.svg": "sources-trudvsem/ui-kit/icon/icons/*.svg",
                },
            },
        },
        svgmin: {
            options: {
                plugins: [{ removeViewBox: false }, { removeUselessStrokeAndFill: false }, { cleanupIDs: false }],
            },
            redesign: {
                files: {
                    "assets/redesign-theme/uikit/icon/icons.svg": "assets/redesign-theme/uikit/icon/icons.svg",
                },
            },
            legacy: {
                files: {
                    "assets/trudvsem-theme/uikit/icon/icons.svg": "assets/trudvsem-theme/uikit/icon/icons.svg",
                },
            },
        },
        copy: {
            redesign: {
                files: [
                    {
                        expand: true,
                        cwd: "sources-redesign",
                        src: "page-templates/*/*",
                        dest: "assets/redesign-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-trudvsem",
                        src: "page-templates/*/*",
                        dest: "assets/redesign-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-default",
                        src: "page-templates/*/*",
                        dest: "assets/redesign-theme",
                    },

                    {
                        expand: true,
                        cwd: "sources-redesign",
                        src: "static-templates/*/*.html",
                        dest: "assets/redesign-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-trudvsem",
                        src: "static-templates/*/*.html",
                        dest: "assets/redesign-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-default",
                        src: "static-templates/*/*.html",
                        dest: "assets/redesign-theme",
                    },

                    {
                        expand: true,
                        cwd: "sources-redesign",
                        src: "fonts/*.{woff,woff2}",
                        dest: "assets/redesign-theme",
                    },

                    {
                        expand: true,
                        cwd: "sources-redesign",
                        src: "scripts/**/*.css",
                        dest: "assets/redesign-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-redesign",
                        src: "root/*",
                        dest: "assets/redesign-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-redesign/ui-kit",
                        src: ["**/*.{jpg,jpeg,png,svg}", `!icon/icons/*.svg`],
                        dest: "assets/redesign-theme/uikit",
                    },
                    {
                        expand: true,
                        cwd: "sources-redesign/ui-infoblocks",
                        src: "**/*.{jpg,jpeg,png,svg}",
                        dest: "assets/redesign-theme/uikit",
                    },
                    {
                        expand: true,
                        cwd: "sources-redesign/ui-special",
                        src: "**/*.{jpg,jpeg,png,svg}",
                        dest: "assets/redesign-theme/uikit",
                    },
                    {
                        // todo перенести utils.js в папку scripts и убрать не нужные сабтаски и исключения
                        expand: true,
                        cwd: "sources-redesign/ui-kit/bootstrap",
                        src: "utils.js",
                        dest: "assets/redesign-theme/scripts",
                    },
                    {
                        expand: true,
                        cwd: "sources-redesign/scripts",
                        src: "**/*.js",
                        dest: "assets/redesign-theme/scripts",
                    },
                ],
            },
            legacy: {
                files: [
                    {
                        expand: true,
                        cwd: "sources-trudvsem",
                        src: "page-templates/*/*",
                        dest: "assets/trudvsem-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-redesign",
                        src: "page-templates/*/*",
                        dest: "assets/trudvsem-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-default",
                        src: "page-templates/*/*",
                        dest: "assets/trudvsem-theme",
                    },

                    {
                        expand: true,
                        cwd: "sources-trudvsem",
                        src: "static-templates/*/*.html",
                        dest: "assets/trudvsem-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-redesign",
                        src: "static-templates/*/*.html",
                        dest: "assets/trudvsem-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-default",
                        src: "static-templates/*/*.html",
                        dest: "assets/trudvsem-theme",
                    },

                    {
                        expand: true,
                        cwd: "sources-trudvsem/scripts",
                        src: "**/*.js",
                        dest: "assets/trudvsem-theme/scripts",
                    },
                    {
                        expand: true,
                        cwd: "sources-trudvsem/ui-kit/bootstrap",
                        src: "utils.js",
                        dest: "assets/trudvsem-theme/scripts",
                    },

                    {
                        expand: true,
                        cwd: "sources-trudvsem",
                        src: "fonts/*.{woff,woff2}",
                        dest: "assets/trudvsem-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-trudvsem/ui-kit",
                        src: ["**/*.{jpg,jpeg,png,svg}", `!icon/**/*.svg`],
                        dest: "assets/trudvsem-theme/uikit",
                    },
                    {
                        expand: true,
                        cwd: "sources-trudvsem",
                        src: "images/*.{png,ico,jpg,svg}",
                        dest: "assets/trudvsem-theme/images",
                    },
                ],
            },
            defaultTheme: {
                files: [
                    {
                        expand: true,
                        cwd: "sources-trudvsem",
                        src: "page-templates/*/*",
                        dest: "assets/default-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-redesign",
                        src: "page-templates/*/*",
                        dest: "assets/default-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-default",
                        src: "page-templates/*/*",
                        dest: "assets/default-theme",
                    },

                    {
                        expand: true,
                        cwd: "sources-trudvsem",
                        src: "static-templates/*/*.html",
                        dest: "assets/default-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-redesign",
                        src: "static-templates/*/*.html",
                        dest: "assets/default-theme",
                    },
                    {
                        expand: true,
                        cwd: "sources-default",
                        src: "static-templates/*/*.html",
                        dest: "assets/default-theme",
                    },
                ],
            },
        },
        concat: {
            /*options : {
                sourceMap :true,
                sourceMapStyle: "inline",
            },*/
            redesign: {
                files: [
                    {
                        src: [
                            "sources-redesign/ui-kit/**/*.js",
                            "!sources-redesign/ui-kit/bootstrap/utils.js",
                            "!sources-redesign/ui-kit/**/fallback.js",
                            "sources-redesign/ui-special/**/*.js",
                            "!sources-redesign/ui-special/**/fallback.js",
                            "sources-redesign/ui-infoblocks/**/*.js",
                            "!sources-redesign/ui-infoblocks/**/fallback.js",
                        ],
                        dest: "assets/redesign-theme/scripts/uikit.js",
                    },
                    {
                        src: [
                            "sources-redesign/ui-kit/**/fallback.js",
                            "sources-redesign/ui-special/**/fallback.js",
                            "sources-redesign/ui-infoblocks/**/fallback.js",
                        ],
                        dest: "assets/redesign-theme/scripts/fallbacks.js",
                    },
                ],
            },
            legacy: {
                files: [
                    {
                        "assets/trudvsem-theme/scripts/uikit.js": [
                            "sources-trudvsem/ui-kit/**/*.js",
                            "!sources-trudvsem/ui-kit/bootstrap/utils.js",
                            "!sources-trudvsem/ui-kit/**/*.stories.js",
                        ],
                    },
                ],
            },
        },
        babel: {
            options: {
                sourceMap: false,
                presets: [["@babel/preset-env", { modules: false }]],
            },
            redesign: {
                files: [
                    {
                        expand: true,
                        cwd: "assets/redesign-theme/scripts",
                        src: ["**/*.js", "!tinymce/**/*.js", "!jquery.js", "!fallback.js", "!utils.js"],
                        dest: "assets/redesign-theme/scripts",
                    },
                ],
            },
            legacy: {
                files: [
                    {
                        expand: true,
                        cwd: "assets/trudvsem-theme/scripts",
                        src: ["**/*.js", "!jquery.js", "!underscore.js", "!dayjs.js", "!purify.min.js"],
                        dest: "assets/trudvsem-theme/scripts",
                    },
                ],
            },
        },
        uglify: {
            options: {
                output: {
                    comments: "some",
                },
            },
            redesign: {
                files: [
                    {
                        expand: true,
                        cwd: "assets/redesign-theme/scripts",
                        src: ["**/*.js", "!tinymce/**/*.js", "!fallback.js", "!purify.min.js"],
                        dest: "assets/redesign-theme/scripts",
                    },
                ],
            },
            legacy: {
                files: [
                    {
                        expand: true,
                        cwd: "assets/trudvsem-theme/scripts",
                        src: ["**/*.js", "!pealistib.js"],
                        dest: "assets/trudvsem-theme/scripts",
                    },
                ],
            },
        },
        exec: {
            doc: "node autodoc.js",
            testing: "node autotest.js",
        },
        watch: {
            scss: {
                files: ["sources-redesign/**/*.scss"],
                tasks: ["sass:rdev", "exec:testing"],
            },
            htm: {
                files: ["sources-redesign/**/*.htm"],
                tasks: ["exec:doc"],
            },
            svg: {
                files: ["sources-redesign/ui-kit/icon/icons/**/*.svg"],
                tasks: ["svgstore:redesign", "svgmin:redesign"],
            },
            stylelint: {
                files: ["sources-redesign/**/*.scss"],
                tasks: ["stylelint:redesign"],
            },
        },
        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 3005,
                    debug: true,
                    base: "assets/redesign-theme",
                    open: true,
                },
            },
        },
        stylelint: {
            redesign: {
                options: {
                    configFile: "package.json",
                    fix: true,
                    ignoreDisables: false,
                    failOnError: false,
                    formatter: function (results) {
                        return results
                            .map((element) => {
                                if (!element.warnings.length) return;

                                const source = element.source.replace(/\\/g, "/");
                                let message = "";
                                const project = "bft-portal-platform-site-prr";
                                const pathStart = source.indexOf(project);
                                const path = source.substring(pathStart + project.length + 1);
                                const BR = "\n";
                                const TAB = "\t";

                                message += path + BR;
                                element.warnings.forEach((warning) => {
                                    message +=
                                        TAB +
                                        warning.line.toString().padStart(2, "0") +
                                        ":" +
                                        warning.column.toString().padStart(2, "0") +
                                        TAB +
                                        warning.severity +
                                        TAB +
                                        warning.text +
                                        BR;
                                });
                                console.log(message);
                                return message;
                            })
                            .filter(Boolean)
                            .join("\n");
                    },
                    reportNeedlessDisables: true,
                    outputFile: "sources-redesign/__lints.log",
                },
                src: ["sources-redesign/**/*.scss"],
            },
        },
    });

    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-svgstore");
    grunt.loadNpmTasks("grunt-svgmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-stylelint");

    grunt.registerTask("redesign", [
        "sass:redesign",
        "postcss:redesign",
        "cssmin:redesign",

        "svgstore:redesign",
        "svgmin:redesign",

        "copy:redesign",

        "concat:redesign",
        "babel:redesign",
        "uglify:redesign",

        "stylelint",

        "exec",
    ]);
    grunt.registerTask("rdev", [
        "sass:rdev",

        "copy:redesign",
        "concat:redesign",

        "svgstore:redesign",
        "svgmin:redesign",

        "exec",

        "connect:server",
        "watch",
    ]);
    grunt.registerTask("legacy", [
        "sass:legacy",
        "postcss:legacy",
        "cssmin:legacy",
        "svgstore:legacy",
        "svgmin:legacy",
        "copy:legacy",
        "concat:legacy",
        "babel:legacy",
        "uglify:legacy",
    ]);
    grunt.registerTask("prod", ["redesign", "legacy", "copy:defaultTheme"]);
};
