/**
 * @file подключение и инициализация tinyMCE
 */
try {
    (function () {
        const selector = "[data-wysiwyg]";
        let tinymceConfig = {
            target: null,
            menubar: false,
            toolbar: "bold bullist undo redo",
            plugins: "lists paste",
            paste_block_drop: true,
            icons: "custom",
            paste_data_images: false,
            paste_enable_default_filters: false,
            paste_word_valid_elements: "b,strong,ul,li,p",
            valid_elements: "p,b,strong,ul,li",
            branding: false,
            elementpath: false,
            setup: function (editor) {
                editor.on("change", function () {
                    tinymce.triggerSave();
                    $(editor.getElement()).trigger('change');
                });
            },
        };

        $(document).ready(()=>{
            attachScripts().done(() => {
                $(selector).each((index, item) => {
                    tinymce.init({
                        ...tinymceConfig,
                        readonly: item.hasAttribute('disabled') ? 1 : 0,
                        target: item,
                    });
                });
            });
        })



        function inIframe () {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        }

        /**
         * Подключает файл инициализации tinyMCE
         * @return {*}
         */
        function attachScripts() {
            const d = $.Deferred();
            const tinymcePath = "/tinymce/tinymce.min.js";
            let basePath = ""
            let url = "";
            if (inIframe() || window.location.host.indexOf("localhost") > -1 || window.location.host.indexOf("127.0.0.1") > -1) {
                url = `http://${inIframe() ? "localhost:3000" : window.location.host}/scripts${tinymcePath}`;
                basePath = `//${inIframe() ? "localhost:3000" : window.location.host}/scripts/tinymce`;
            } else {
                url = `${window.location.protocol}//${window.location.host}/assets/redesign-theme/scripts${tinymcePath}`;
                basePath = `${window.location.protocol}//${window.location.host}/assets/redesign-theme/scripts/tinymce`;
            }
            if (_.has(window, "tinymce") && _.isFunction(window.tinymce.init)) {
                window.tinymce.dom.Event.domLoaded = true;
                window.tinymce.baseURL = basePath;
                return d.resolve();
            } else {
                $.getScript(url)
                    .done(function () {
                        window.tinymce.dom.Event.domLoaded = true;
                        window.tinymce.baseURL = basePath;
                        d.resolve();
                    })
                    .fail(function () {
                        d.reject("Ошибка подключения ресурсов tinymce");
                    });
                return d.promise();
            }
        }

        /**
         * Функция для ручной инициализации редактора
         * @param node
         */
        window.initWYSIWYG = function (node) {
            attachScripts().done(function () {
                node.each((index, item) => {
                    tinymce.init({
                        ...tinymceConfig,
                        readonly: item.hasAttribute('disabled') ? 1 : 0,
                        target: item,
                    });
                });
            }).fail((e)=>{
                console.log("error:",e);
            })
        }
    })();
} catch (e) {
    console.log(e);
}
