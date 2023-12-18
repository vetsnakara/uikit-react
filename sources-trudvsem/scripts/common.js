$(function () {
    function getCookie(name) {
        var matches = document.cookie.match(
            new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    function gosuslugi(menuItems) {
        var gosbarLink = null;
        if (location.hostname === "trudvsem.ru") {
            gosbarLink = "//gosbar.gosuslugi.ru/widget/widget.js";
        } else {
            gosbarLink = "//search-portal1.test.gosuslugi.ru/widget/widget.js";
        }

        window._govWidget = {
            cssOrigin: "//gosbar.gosuslugi.ru",
            catalogOrigin: "//gosbar.gosuslugi.ru",
            disableSearch: true,
            fixed: true,
            cssFixed: true,
            menu: menuItems,
        };
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = gosbarLink;
        $(".for-gosbar").append(script);
    }

    function updateMenu() {
        let mt = getCookie("MenuType");
        $.ajax({
            url: "/menuJson/?mt=" + (mt ? mt : "CANDIDATE") + "&dt=BASE",
            success: function (json) {
                if (json && "OK" === json.status) {
                    gosuslugi(json.menu);
                } else {
                    var menu = [
                        {
                            text: "О портале",
                            link: "/about",
                        },
                        {
                            text: "Новости",
                            link: "/news",
                        },
                        {
                            text: "Помощь и поддержка",
                            link: "/help",
                        },
                    ];
                    gosuslugi(menu);
                }
            },
        });
    }

    var isCandidate = "true" === getCookie("isCandidate");
    updateMenu();

    if ($(".top-info-panel").length) {
        var $topPanel = $(".top-info-panel");
        var topBodyOuter = $topPanel.height();

        $("body").css("padding-top", topBodyOuter + "px");

        function panelWidth() {
            var windowWidth = $(window).width();
            $topPanel.css("width", windowWidth);
        }

        panelWidth();

        $(window).resize(function () {
            panelWidth();
        });
    }
});

/**
 * Коорректировка timestamp к заданной таймзоне
 *
 * Функция формирует timestamp такми образом, чтобы при формировании
 * строкового представления даты в таймзоне Europe/Moscow была получена
 * такая же дата, как и локальной таймзоне. Время отбрасывается.
 *
 * @param {*} timestamp
 * @returns
 */
window.convertTimestampToTimezone = function (timestamp) {
    return dayjs(dayjs(timestamp).format("YYYY-MM-DDTHH:mm:00+03:00")).valueOf();
};

/**
 * Склонение числительныйх пример pluralize(number, ['найдена', 'найдено', 'найдены']);
 * Первый элемент title —
 *  когда число заканчивается на 1,
 *  второй - когда число заканчивается на 2,
 *  третий — когда число заканчивается на 0
 * @param number
 * @param titles
 * @returns {*}
 */
window.pluralize = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    number = String(number).replace(/\D+/g, "");
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

/**
 * Находит на странице ссылки помеченный атрибутом  data-content="dlink" из настройки data-urlparam="id"
 * берет имя get параметра и если он есть в url страницы подставляет его в url ссылки
 */
window.initDLink = function () {
    var params = window.location.search;
    var dLinkList;
    if (params.length) {
        params = params.slice(1).split("&");
        params = (function (arr) {
            var obj = {};
            _.each(arr, function (item) {
                var pair = item.split("=");
                obj[pair[0]] = pair[1];
            });
            return obj;
        })(params);

        dLinkList = $("a[data-content=dlink]:not([data-dlink-init])");

        dLinkList.each(function (index, item) {
            var dlink = $(item);
            var paramName = dlink.data("urlparam");
            var href = dlink.attr("href");
            dlink.attr("data-dlink-init", true);

            if (!getQueryParam(href, paramName)) {
                href += (href.indexOf("?") > -1 ? "&" : "?") + paramName + "=" + params[paramName];
                dlink.attr("href", href);
            }
        });
    }
};

window.getQueryParam = function (url, param) {
    var value = url.match(new RegExp("[?&]" + param + "=([^&]*)(&?)", "i"));
    return value ? value[1] : value;
};

$(document).ready(function () {
    try {
        initDLink();
    } catch (e) {
        console.log(e);
    }
});
