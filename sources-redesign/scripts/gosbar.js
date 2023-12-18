$(function () {
    var $body = $(".body"),
        gosbarMarkup = "";
    //     '<nav class="gosbar">' +
    //     '<div class="gosbar__wrapper">' +
    //     '<button class="gosbar__button" type="button">' +
    //     '<img src="/assets/redesign-theme/uikit/gosbar/gosbar-logo.svg" alt="герб России." class="gosbar__logo" width="30" height="50">' +
    //     '</button>' +
    //     '<input class="gosbar__checkbox-control" id="gosbar-checkbox" name="gosbar-checkbox" type="checkbox">' +
    //     '<label class="gosbar__label-menu" for="gosbar-checkbox">Меню</label>' +
    //     '<ul class="gosbar__list">' +
    //     '<li class="gosbar__item"><a class="gosbar__link" href="/about">О портале</a></li>' +
    //     '<li class="gosbar__item"><a class="gosbar__link" href="/news">Новости</a></li>' +
    //     '<li class="gosbar__item"><a class="gosbar__link" href="/help">Помощь и поддержка</a></li>' +
    //     '<li class="gosbar__item"><a class="gosbar__link" href="https://test-portal.trudvsem.ru/">Старая версия портала</a></li>' +
    //     '</ul>' +
    //     '</div>' +
    //     '</nav>';

    function createGosbar(subdomain) {
        var script = document.createElement("script"),
            menu = [
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

        if (subdomain) {
            menu.push({
                text: "Старая версия портала",
                link: "https://trudvsem.ru",
            });
        }

        window._govWidget = {
            cssOrigin: "//gosbar.gosuslugi.ru",
            catalogOrigin: "//gosbar.gosuslugi.ru",
            disableSearch: true,
            fixed: true,
            cssFixed: true,
            menu: menu,
        };

        script.type = "text/javascript";
        script.async = true;
        script.src = "//gosbar.gosuslugi.ru/widget/widget.js";
        $body.append(script);
    }
});
