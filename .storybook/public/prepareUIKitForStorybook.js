/**
 * @file
 */

const $script = $("[data-name='uikit-script']");
const uikitScriptUrl = $script.data("url");

$.ajax({
    url: uikitScriptUrl,
    dataType: "text",
    success: function modifyAbsoluteAssetsPaths(content) {
        const regex = /\/assets\/redesign-theme\//g;
        const uikitProcessed = content.replace(regex, "");

        $script.replaceWith(`<script>${uikitProcessed}</script>`);
    },
});
