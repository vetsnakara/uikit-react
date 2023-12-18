/**
 * Страница исходящих заявок учебных заведений
 **/

(function () {
    var COOPERATION_CATALOG = "COOPERATION";
    var DS_HOST = "";
    var cooperationDS = {};

    new bft_JoinSource({
        sources: ["_request_source"],
        initHandler: function (response) {
            var cooperationData = response["_request_source"];

            var url = cooperationData.url.split("/getData/");
            DS_HOST = url[0];
            url = url[1].split("/");
            cooperationDS.dataSourceId = url[0];
            cooperationDS.dataVersion = url[1];
        },
        handler: null
    });

    $(document).on("tile-catalog:draw", function (event, ib) {
        var ib = $(ib);

        $("div.modal[role=dialog]").off("show.bs.modal").on("show.bs.modal", function () {
            var dialog = $(this);
            var frame = $("div.frame.frame_blue", dialog);
            var container = $("div.frame__container", frame);
            var id = dialog.data("uid");
            var shown = dialog.data("isshow") || false;
            var file = $("[ref=file-download]", dialog).data("file");

            getFileEnum(file).done(function (response) {
                var link;
                var name;
                if (_.has(response, "attachs")) {
                    link = "/api/archive/download/"+response.attachs[0].file;
                    name = response.attachs[0].fileName;
                    $("[ref=file-download] .file-preview", dialog).text(name);
                    $("[ref=file-download] a", dialog).attr("href", link);
                    $("[ref=file-download] a", dialog).attr("target", "_blank");
                } else {
                    link = file;
                    name = "Договор"
                }
                $("[ref=file-download] .file-preview", dialog).text(name);
                $("[ref=file-download] a", dialog).attr("href", link);
                $("[ref=file-download] a", dialog).attr("target", "_blank");
            });

            if (!shown) {
                dialog.attr("data-isshow", true);
                frame.hide();
                getCatalogData(COOPERATION_CATALOG, {request_code: id}).done(function (response) {
                    var data = response.result.data || [];
                    if (data.length) {
                        container.empty();
                        data.forEach(function (item) {
                            container.append("<div><a class=\"link\" href=\"#\">" + (item[7] ? item[7][1] : "поле пустое") + "</a></div>")
                        });
                        frame.show();
                    }
                })
            }
        });

        $("a[data-pub]", ib).off("click").on("click", function () {
            var val = parseInt($(this).data("pub"));
            var id = $(this).data("uid");
            var params = {
                dataSourceId: cooperationDS.dataSourceId,
                dataVersion: cooperationDS.dataVersion,
                sortId: id,
                id: id,
            };
            var fields = {
                publication_status: !val
            };
            setFields(DS_HOST, params, fields).done(function () {
                window.location.reload();
            })
        })
    });

    window.filterStatusLabel = function (val) {
        var value;
        try {
            value = JSON.parse(val);
        } catch (e) {
            value = val
        }
        return value ? "Опубликована" : "Сната с публикации"
    }
})()



