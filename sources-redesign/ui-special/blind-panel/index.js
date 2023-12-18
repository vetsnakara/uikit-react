$(function () {
    var cookieValue = getCookie("lowVisHTML");
    var isBlindMode = Boolean(cookieValue) && cookieValue.indexOf("blind") !== -1;
    $("html").toggleClass("blind", isBlindMode);
});

function uikitChangeTheme(theme) {
    var baseTheme = "common";
    var blindTheme = "blind-white-small-noimage";

    if (!theme) return;
    else if (theme == "false") theme = baseTheme;
    else if (theme == "true") theme = blindTheme;

    $("html").toggleClass("blind", theme !== baseTheme);

    var blindPanel = document.querySelector(".blind-panel");
    var head = document.head;
    var path = head.dataset.path;
    var pathArr = path && path.split("?");
    var filePath = (pathArr.length && pathArr[0]) || "/";
    var cacheControl = (pathArr.length > 1 && "?" + pathArr[1]) || "";
    var styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = filePath + theme + ".css" + cacheControl;
    styles.classList.add("theme-link");
    styles.addEventListener("load", function () {
        var backup = head.querySelectorAll(".theme-link");
        if (backup.length > 1) {
            backup[0].parentNode.removeChild(backup[0]);
            document.cookie = "lowVisHTML=" + theme + "; path=/";
            if (blindPanel) {
                blindPanel.dataset.blindMode = theme;
            }
        }
    });

    head.appendChild(styles);
}

function getCookie(name) {
    var matches = document.cookie.match(
        new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

$(function () {
    var SOUND_TOGGLE_CLASS = "blind-panel__sound-switcher_sound";
    //селекторы для автоозвучки
    var AutoSoundItems = [
        ".mega-menu__dropdown-toggle",
        ".mega-menu__link",
        ".mega-menu__dropdown-link",
        ".mega-menu__list-title",
        ".mega-menu__submenu-link",
        ".mega-menu__list-link",
        ".mega-menu__toggle",
        ".footer__title",
        ".footer__nav-title",
        ".button",
        "h1",
        "h2",
        "h3",
        "h4",
        "a",
    ];
    var Talker = new BlindTalker({ autoSound: AutoSoundItems });
    var switcher = document.querySelector(".blind-panel-switcher .blind-panel-switcher__button");
    if (!switcher) return;
    var blindPanel = document.querySelector(".blind-panel");
    if (!blindPanel) return;

    if (Talker.isBlindMode && !Talker.isSoundDisabled) {
        $("button[data-blind-moder='sound']").addClass(SOUND_TOGGLE_CLASS);
    }

    switcher.addEventListener("click", function () {
        var blindMode = blindPanel.dataset.blindMode;

        if (!blindMode || blindMode.indexOf("blind") > -1) {
            uikitChangeTheme("common");
            Talker.disableSound();
        } else {
            uikitChangeTheme("true");
        }
    });

    $(blindPanel).on("click", "[data-blind-moder]", function (event) {
        var moder = event.currentTarget.dataset.blindModer;
        var blindMode = blindPanel.dataset.blindMode;

        if (!moder || !blindMode) return;
        else if (["black", "white", "blue"].includes(moder)) {
            blindMode = blindMode
                .split("-")
                .map(function (v, i) {
                    return i === 1 ? moder : v;
                })
                .join("-");
        } else if (["small", "medium", "large"].includes(moder)) {
            blindMode = blindMode
                .split("-")
                .map(function (v, i) {
                    return i === 2 ? moder : v;
                })
                .join("-");
        } else if (["image", "noimage"].includes(moder)) {
            blindMode = blindMode
                .split("-")
                .map(function (v, i) {
                    return i === 3 ? moder : v;
                })
                .join("-");
        } else if (["sound"].includes(moder)) {
            var target = $(event.currentTarget);

            if (target.hasClass(SOUND_TOGGLE_CLASS)) {
                target.removeClass(SOUND_TOGGLE_CLASS);
                Talker.disableSound();
            } else {
                target.addClass(SOUND_TOGGLE_CLASS);
                Talker.enableSound();
            }
        }

        uikitChangeTheme(blindMode);
    });
});
