/**
 * Кастомный контрол спойлера
 * Bender 07.09.2020
 */
"use strict";

(function ($, Util) {
    var EVENT_KEY = ".collapse";
    var COLLAPSE_PREFIX = "collapse";
    var COLLAPSE_DATA_KEY = COLLAPSE_PREFIX + "Instance";
    var Targets = {
        top: "iblock:top",
        down: "iblock:down",
    };
    var Event = {
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
    };
    var ClassName = {
        control: "collapse__control",
        controlClose: "collapse__control_closed",
        target: "collapse",
        targetAnimate: "collapse_animated",
        targetActive: "collapse_active",
    };

    var Collapse = function (element) {
        var $element = $(element);
        this.$element = $element;
        this.selector = null;
        this._isExpanded = !$element.hasClass(ClassName.controlClose);

        if (this._isExpanded) {
            this.$element.removeClass(ClassName.controlClose).attr("aria-expanded", this._isExpanded);
        } else {
            this.$element.addClass(ClassName.controlClose).attr("aria-expanded", this._isExpanded);
        }

        this._targetsList = this.getTargets();
    };

    var objectValues = function (obj) {
        var res = [];
        for (var i in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, i)) {
                res.push(obj[i]);
            }
        }
        return res;
    }

    Collapse.prototype.toggle = function () {
        if (this._isExpanded) {
            this.hide();
        } else {
            this.show();
        }
    };

    Collapse.prototype.show = function () {
        var element = this.$element;
        var counter = 0;
        var targetsCount = this._targetsList.length;
        var startEvent = $.Event(Event.SHOW);
        this._isExpanded = true;
        this._addAriaAndCollapsedClass(element, this._isExpanded);

        element.trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
            return;
        }

        this._targetsList.each(function (index, item) {
            var $item = $(item);
            var complete = function () {
                $item.removeClass(ClassName.targetAnimate).addClass(ClassName.targetActive);
                counter++;
                if (counter >= targetsCount) {
                    element.trigger(Event.SHOWN);
                }
            };
            var transitionDuration = Util.getTransitionDurationFromElement($item);
            $item.addClass(ClassName.target).addClass(ClassName.targetAnimate);
            $($item).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        });
    };

    Collapse.prototype.hide = function () {
        var element = this.$element;
        var counter = 0;
        var targetsCount = this._targetsList.length;
        var startEvent = $.Event(Event.HIDE);
        this._isExpanded = false;
        this._addAriaAndCollapsedClass(this.$element, this._isExpanded);

        element.trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
            return;
        }

        this._targetsList.each(function (index, item) {
            var $item = $(item);
            var complete = function () {
                $item.removeClass(ClassName.targetAnimate);
                counter++;
                if (counter >= targetsCount) {
                    element.trigger(Event.SHOWN);
                }
            };
            var transitionDuration = Util.getTransitionDurationFromElement($item);
            $item.removeClass(ClassName.targetActive).addClass(ClassName.target).addClass(ClassName.targetAnimate);
            $($item).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        });
    };

    Collapse.prototype.getTargets = function () {
        var selector;
        var targets = this._targetsList;
        if (!targets) {
            selector = this.selector || this._getSelectorFromElement(this.$element.get(0));
            if (objectValues(Targets).indexOf(selector) > -1) {
                targets = this._findNextIBlock(selector);
            } else {
                targets = $(selector);
            }
        }
        return targets;
    };

    Collapse.prototype._getSelectorFromElement = function (element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
            var hrefAttr = element.getAttribute('href');
            selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
        }

        try {
            if (objectValues(Targets).indexOf(selector) > -1) {
                return selector
            } else {
                return document.querySelector(selector) ? selector : null;
            }

        } catch (err) {
            return null;
        }
    };

    Collapse.prototype._findNextIBlock = function (selector) {
        var controlIndex;
        var indexDiv = selector === Targets.top ? -1 : 1;
        var elemIblock = this.$element.closest("[data-uid]");
        var elemIblockUID = elemIblock.data("uid");
        var elemContainer = this.$element.closest(".container");
        var inContainer = !!elemContainer.length;
        var iblovkList = $(
            "div[data-uid]:not(div.ib-container div[data-uid])",
            inContainer ? elemContainer : $("body")
        );
        if (iblovkList.length) {
            for (var i = 0, cnt = iblovkList.length; i < cnt; i++) {
                if ($(iblovkList.get(i)).data("uid") === elemIblockUID) {
                    controlIndex = i;
                    break;
                }
            }

            if (iblovkList[controlIndex + indexDiv]) {
                return $(iblovkList[controlIndex + indexDiv]);
            } else {
                console.log("Не найден инфоблок по селектору", selector, iblovkList);
            }
        }
        return [];
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, isOpen) {
        var toggleName = element.data("name");
        if (toggleName) {
            element.data("name", element.text());
            element.text(toggleName);
        }
        element.toggleClass(ClassName.controlClose, !isOpen).attr("aria-expanded", isOpen);
    };

    $(document).on("click", function (event) {
        var $trigger = $(event.target);
        var collapseInstance;
        if ($trigger.hasClass(ClassName.control)) {
            if (event.target.tagName === "A") {
                event.preventDefault();
            }

            collapseInstance = $trigger.data(COLLAPSE_DATA_KEY);

            if (!collapseInstance) {
                collapseInstance = new Collapse($trigger);
                $trigger.data(COLLAPSE_DATA_KEY, collapseInstance);
            }

            collapseInstance.toggle();
        }
    });
})($, Util);
