$(document).ready(function () {
    $("select.select__control").each(function (index, element) {
        initBootstrapSelect(element);
    });
});

window.initBootstrapSelect = function (element, options) {
    var el = $(element);
    /**
     * Глобальные параметры по умолчанию
     * @type {{container: string}}
     */
    var params = {
        container: "body",
    };
    params = $.extend(params, options);
    var optionsList = $("option:not([data-divider])", el);
    var selectedTextFormat =  el.data("my-selected-text-format") || el.data("selected-text-format") ||params.selectedTextFormat;
    var selectedDivider = el.data("selected-divider") || params.selectedDivider;
    var firstSelectVal = -1;
    var firstSelectLabel = "";

    //доработка для подстановки минимальной ширины
    var os = new MutationObserver(function (list) {
        _.each(list, function (item) {
            if  (item.addedNodes && item.addedNodes.length ) {
                var target =  $(item.addedNodes[0]);
                var width;
                if (target.hasClass("bootstrap-select") && target.hasClass("dropdown")) {
                    width = target.css("width");
                    if (width) {
                        target.css("min-width", width);
                    }
                }
            }
        })
    })
    os.observe($("body").get(0), {childList: true});


    function getTitle(format, option) {
        switch (format) {
            case "title:label":
                return (el.attr("title") || el.data("header")) + ": " + option.innerText.trim();
            case "title:count":
                return (el.attr("title") || el.data("header")) + " (1)";
            case "title:num":
                return (el.attr("title") || el.data("header")) + ": " + option.innerText.trim();
            default:
                return false;
        }
    }

    function titleCount() {
        return (this.title || this.header) + " (" + arguments[0] + ")";
    }

    function titleNum() {
        return (this.title || this.header) + " (" + arguments[0] + ")";
    }

    function labelCount() {
        return firstSelectLabel + " (" + arguments[0] + ")";
    }

    function setFirstSelected() {
        var val = el.val();
        if (val.indexOf(firstSelectVal) === -1) {
            firstSelectVal = val[0];
            firstSelectLabel = el.find("[value=" + val[0] + "]").text();
        }
    }

    function sortSelected() {
        var val = el.val();
        var newOrder = optionsList.clone();

        function setSelected(node, selected) {
            if (selected) {
                $(node).attr("selected", true);
            } else {
                $(node).removeAttr("selected");
            }
        }

        newOrder.each(function () {
            var $option = $(this);
            var isSelected = val.indexOf($($option).attr("value")) > -1;
            setSelected($option, isSelected);
        });

        newOrder.sort(function (a, b) {
            var isASelected = val.indexOf($(a).attr("value")) > -1;
            var isBSelected = val.indexOf($(b).attr("value")) > -1;
            return isBSelected - isASelected;
        });

        el.empty();
        el.append(newOrder);

        if (selectedDivider && val.length) {
            $(newOrder[val.length - 1]).after('<option data-divider="true"></option>');
        }
    }

    function applyCustoms() {
        if (["title:label", "title:count", "title:num"].indexOf(selectedTextFormat) > -1) {
            optionsList.each(function (index, option) {
                var title = getTitle(selectedTextFormat, option);
                if (title) {
                    $(option).attr("title", title);
                }
            });
            el.removeAttr("data-selected-text-format");
            el.attr("data-my-selected-text-format", selectedTextFormat);
        }

        if (selectedTextFormat === "title:count") {
            el.attr("data-selected-text-format", "count");
            params.countSelectedText = titleCount;
        }

        if (selectedTextFormat === "title:num") {
            el.attr("data-selected-text-format", "count");
            params.countSelectedText = titleNum;
        }

        if (selectedTextFormat === "label:count") {
            el.data("selected-text-format", "count");
            el.on("change", function () {
                setFirstSelected();
            });
            setFirstSelected();
            params.countSelectedText = labelCount;
        }

        if (el.attr("multiple")) {
            el.on("hidden.bs.select", function () {
                //пришлось выключить эту функцию иначе ничего не добавляется
                if (!el.data("AddBootstrapSelect")) {
                    sortSelected();
                    el.selectpicker("refresh");
                }
            });
            if (!el.data("AddBootstrapSelect")) {
                sortSelected();
            }
        }
    }


    applyCustoms();
    if (el.data("selectpicker")) {
        el.selectpicker("destroy");
    }
    el.selectpicker(params);
};
