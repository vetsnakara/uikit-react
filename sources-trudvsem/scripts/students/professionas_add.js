/**
 * Страница со списком добавленных профессий
 */

$(function () {
    var ACTIVITY_AREA_CATALOG = "ACTIVITY_AREA";
    window.__activtyAreacHash = {};
    window.getActivityAreaCode = function (id) {
        if (!_.has(window.__activtyAreacHash, id)) {
            window.__activtyAreacHash = null;
            var filter = {
                code: id
            };
            if (id.indexOf("-") > -1) {
                filter = {
                    id: id
                };
            }

            getCatalogData(ACTIVITY_AREA_CATALOG, filter).done(function (response) {
                var data = response.result.data;
                if (data && data.length) {
                    $("span[ref=_aa_place_"+id+"]").each(function () {
                        $(this).text(data[0][4])
                    })
                }
            });
        }

        return window.__activtyAreacHash &&
        _.isString(window.__activtyAreacHash[id])
            ? window.__activtyAreacHash[id]
            : "<span ref='_aa_place_" + id + "'></span>";
    };
});
