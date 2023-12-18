;jQuery(function () {
    var container = document.querySelector("body");
    container.addEventListener("mouseenter", showTooltip, true);

    function showTooltip(event) {
        initToolTip($(event.target));
    }

    /**
     * Инициализирует библиотеку тултипа
     * @param {jquery} el - элемент относительно которого инициализируется функционал
     * @param {boolean} [show] - показать тултип после инициализации
     * @param {boolean} [isManual] - инициализирует тултип в режиме ручном режиме активации
     */
    function initToolTip(el, show, isManual) {
        if (el.is("[data-tooltip]")) {
            const bsTooltip = el.data("bs.tooltip");
            if (!bsTooltip) {
                const options = {
                    offset: "0, 7px",
                    title: el.data("tooltip"),
                    html: true,
                    customClass: `tooltip_theme-${el.data("tooltip-theme") || "default"}`,
                };
                let showAfterInit = true;
                if (el.is("[data-tooltip-toggle]")) {
                    options.trigger = "click";
                    el.removeProp("data-tooltip-toggle");
                    showAfterInit = false;
                    el.on("show.bs.tooltip", function () {
                        const el = $(this);
                        const timer = setInterval(() => el.tooltip("hide"), 5000);
                        el.data("bft.tooltip.timer", timer);
                    });
                    el.on("hide.bs.tooltip", function () {
                        const el = $(this);
                        clearInterval(el.data("bft.tooltip.timer"));
                    });
                }
                if (isManual) {
                    options.trigger = "manual";
                }
                if (!el.is("[data-placement]")) {
                    options.placement = "auto";
                }
                el.tooltip(options);
                if (showAfterInit || show) {
                    el.tooltip("show");
                }
            }
        }
    }

    /**
     * Программный вызов тултипа
     * @param {Node} element - элемент относительно которого показываем тултип
     * @param {string} text - текст тултипа
     * @param {number} ttl - задержка перед исчезновением
     */
    window.uiToolTipShow = function (element, text, ttl) {
        const $el = $(element);
        ttl = _.isUndefined(ttl) ? 5000 : ttl;
        if (!_.isUndefined(text)) {
            $el.attr("data-tooltip", text);
        }
        initToolTip($el, false, true);
        $el.tooltip("show");
        setTimeout(() => {
            $el.tooltip("hide");
        }, ttl);
    };
});
