/**
 * @file
 * Создан Bender 30.07.2021
 */
/*! (c) Andrea Giammarchi - ISC */
/*
const HTMLParsedElement = (() => {
    const DCL = 'DOMContentLoaded';
    const init = new WeakMap;
    const queue = [];
    const isParsed = el => {
        do {
            if (el.nextSibling)
                return true;
        } while (el = el.parentNode);
        return false;
    };
    const upgrade = () => {
        queue.splice(0).forEach(info => {
            if (init.get(info[0]) !== true) {
                init.set(info[0], true);
                info[0][info[1]]();
            }
        });
    };
    document.addEventListener(DCL, upgrade);
    class HTMLParsedElement extends HTMLElement {
        static withParsedCallback(Class, name = 'parsed') {
            const {prototype} = Class;
            const {connectedCallback} = prototype;
            const method = name + 'Callback';
            const cleanUp = (el, observer, ownerDocument, onDCL) => {
                observer.disconnect();
                ownerDocument.removeEventListener(DCL, onDCL);
                parsedCallback(el);
            };
            const parsedCallback = el => {
                if (!queue.length)
                    requestAnimationFrame(upgrade);
                queue.push([el, method]);
            };
            Object.defineProperties(
                prototype,
                {
                    connectedCallback: {
                        configurable: true,
                        writable: true,
                        value() {
                            if (connectedCallback)
                                connectedCallback.apply(this, arguments);
                            if (method in this && !init.has(this)) {
                                const self = this;
                                const {ownerDocument} = self;
                                init.set(self, false);
                                if (ownerDocument.readyState === 'complete' || isParsed(self))
                                    parsedCallback(self);
                                else {
                                    const onDCL = () => cleanUp(self, observer, ownerDocument, onDCL);
                                    ownerDocument.addEventListener(DCL, onDCL);
                                    const observer = new MutationObserver(() => {
                                        /!* istanbul ignore else *!/
                                        if (isParsed(self))
                                            cleanUp(self, observer, ownerDocument, onDCL);
                                    });
                                    observer.observe(self.parentNode, {childList: true, subtree: true});
                                }
                            }
                        }
                    },
                    [name]: {
                        configurable: true,
                        get() {
                            return init.get(this) === true;
                        }
                    }
                }
            );
            return Class;
        }
    }
    return HTMLParsedElement.withParsedCallback(HTMLParsedElement);
})();
window.HTMLParsedElement = HTMLParsedElement;
*/

/*!
 * Анимация изображений в банере
 * */

(function ($, Util) {
    const INITIALIZE_KEY = "banner-animate-init";
    const ANIMATE_INTERVAL_KEY = "animate-interval";
    const IMAGE_HIDDEN_CLASS = "banner__image_hide";
    const Selectors = {
        bannerWrapper: ".banner-new__images",
        bannerImage: ".banner-new__image",
    };

    class Animate {
        constructor(element) {
            this.$el = $(element);
            this.currentImage = 0;
            this.imageList = [].slice.call(this.$el.get(0).querySelectorAll(Selectors.bannerImage));
            this.interval = this.$el.data(ANIMATE_INTERVAL_KEY) || 5000;

            if (this.imageList.length && this.imageList.length > 1) {
                this.imageList = this.imageList.reverse();
                this.startAnimate();
            }
        }

        startAnimate() {
            _.each(_.range(1, this.imageList.length), (item) => $(item).addClass(IMAGE_HIDDEN_CLASS));
            setInterval(() => {
                this.animateTick();
            }, this.interval);
        }

        animateTick() {
            let currentImage = this.currentImage;
            $(this.imageList[this.currentImage]).addClass(IMAGE_HIDDEN_CLASS);
            currentImage = currentImage === this.imageList.length - 1 ? 0 : currentImage + 1;
            $(this.imageList[currentImage]).removeClass(IMAGE_HIDDEN_CLASS);
            this.currentImage = currentImage;
        }
    }

    $(document).ready(() => {
        const bannerList = [].slice.call(document.querySelectorAll(Selectors.bannerWrapper));
        _.each(bannerList, (item) => {
            const $item = $(item);
            if (!$item.data(INITIALIZE_KEY)) {
                $item.data(INITIALIZE_KEY, !!new Animate(item));
            }
        });
    });
})(jQuery, Util);

/*!
 * Анимация изображений в банере
 * */

(function ($, Util) {
    const INITIALIZE_KEY = "banner-animate-init";
    const ANIMATE_INTERVAL_KEY = "animate-interval";
    const IMAGE_HIDDEN_CLASS = "banner__image_hide";
    const Selectors = {
        bannerWrapper: ".banner__container",
        bannerImage: ".banner__image",
    };

    class Animate {
        constructor(element) {
            this.$el = $(element);
            this.currentImage = 0;
            this.imageList = [].slice.call(this.$el.get(0).querySelectorAll(Selectors.bannerImage));
            this.interval = this.$el.data(ANIMATE_INTERVAL_KEY) || 5000;

            if (this.imageList.length && this.imageList.length > 1) {
                this.imageList = this.imageList.reverse();
                this.startAnimate();
            }
        }

        startAnimate() {
            _.each(_.range(1, this.imageList.length), (item) => $(item).addClass(IMAGE_HIDDEN_CLASS));
            setInterval(() => {
                this.animateTick();
            }, this.interval);
        }

        animateTick() {
            let currentImage = this.currentImage;
            $(this.imageList[this.currentImage]).addClass(IMAGE_HIDDEN_CLASS);
            currentImage = currentImage === this.imageList.length - 1 ? 0 : currentImage + 1;
            $(this.imageList[currentImage]).removeClass(IMAGE_HIDDEN_CLASS);
            this.currentImage = currentImage;
        }
    }

    $(document).ready(() => {
        const bannerList = [].slice.call(document.querySelectorAll(Selectors.bannerWrapper));
        _.each(bannerList, (item) => {
            const $item = $(item);
            if (!$item.data(INITIALIZE_KEY)) {
                $item.data(INITIALIZE_KEY, !!new Animate(item));
            }
        });
    });
})(jQuery, Util);

/**
 * @file WebComponent Кнопка
 * Создан Bender 29.07.2021
 */

/*
const ButtonTypes = ["secondary", "plain"];
const OriginalTypes = ["submit", "button"];

const Attr = {
    destruct: "destruct",
    target: "target",
    wide: "wide",
    href: "href",
    content: "content",
    originalType: "original-type",
    type: "type",
    disabled: "disabled",
};

const ContentTypes = {
    icon: "icon",
    icontext: "icontext",
};

const ClassNames = {
    button: "button",
    secondary: "button_secondary",
    plain: "button_plain",
    icon: "button_icon",
    icontext: "button_icontext",
    buttonDestruct: "button_destruct",
    buttonWide: "button_wide",
};

class UIButton extends window.HTMLParsedElement {
    /!**
     * Возвращает имя компонента
     * @return {string}
     *!/
    static get is() {
        return "ui-button";
    }

    /!**
     * Возвращает список атрибут за которыми необходимо слежение
     * @return {string[]}
     *!/
    static get observedAttributes() {
        return [Attr.disabled];
    }

    /!**
     * @constructor
     * @param args
     *!/
    constructor(...args) {
        super(...args);
        this.clickHandler =
        this.addEventListener("click", this.clickHandler);
    }

    /!**
     * Колбек события изменения атрибута
     * @param {string} name - имя атрибута
     * @param {string|null} oldVal - старое значение
     * @param {string|null} newVal - новое значение
     *!/
    attributeChangedCallback(name, oldVal, newVal) {
        if (_.contains(_.keys(Attr), name)) {
            switch (name) {
                case Attr.disabled:
                    this.setDisabled(newVal);
            }
        }
    }

    /!**
     * Устанавливает атрибут disabled для кнопки
     * @param {string|boolean|null} value - состояние активности
     *!/
    setDisabled(value) {
        const button = this.childNodes[0];
        const val = value !== "false" && !!value;
        if (button) {
            if (val) {
                if (!this.hasAttribute(Attr.disabled)) {
                    this.setAttribute(Attr.disabled, value);
                }
                button.setAttribute(Attr.disabled, value);
            } else {
                this.removeAttribute(Attr.disabled);
                button.removeAttribute(Attr.disabled);
            }
        }
    }

    /!**
     * Метод активации кнопки
     *!/
    enable() {
        this.setDisabled(false);
    }

    /!**
     * Метод деактивации кнопки
     *!/
    disable() {
        this.setDisabled(true);
    }

    /!**
     * Колбек вызывающийся при инициализации компонента
     *!/
    parsedCallback() {
        const href = this.getAttribute(Attr.href);
        const tagType = href && href.length ? "a" : "button";
        const isLink = tagType === "a";
        const classList = [ClassNames.button];
        const target = this.hasAttribute(Attr.target) ? this.getAttribute(Attr.target) : false;
        const contentType = this.getAttribute(Attr.content);
        const originalType = this.getAttribute(Attr.originalType) || "button";
        const setOriginalType = originalType && !isLink && _.contains(OriginalTypes, originalType);
        const viewType = this.getAttribute(Attr.type);
        const isDisabled = this.isDisabled();

        if (this.hasAttribute(Attr.destruct)) {
            classList.push(ClassNames.buttonDestruct);
        }
        if (this.hasAttribute(Attr.wide)) {
            classList.push(ClassNames.buttonWide);
        }
        if (_.contains(_.keys(ContentTypes), contentType)) {
            classList.push(ClassNames[contentType]);
        }
        if (_.contains(ButtonTypes, viewType)) {
            classList.push(ClassNames[viewType]);
        }

        this.innerHTML = `<${tagType}
                ${isLink ? `href=${href}` : ""}
                class="${classList.join(" ")}"
                ${isLink && target ? `target="${target}"` : ""}
                ${setOriginalType ? `type="${originalType}"` : ""}
                ${isDisabled ? "disabled" : ""}
        >${this.innerHTML}</${tagType}>`;
    }

    /!**
     * Возвращает текущий статус активности контрола
     * @return {boolean}
     *!/
    isDisabled() {
        const hasAttr = this.hasAttribute(Attr.disabled);
        if (hasAttr) {
            const value = this.getAttribute(Attr.disabled);
            return !(value === null || value === false || value === "false");

        } else {
            return false;
        }
    }

    /!**
     * Обработчик событий если контрол деактивирован то глушить событие клика
     * @param event
     *!/
    clickHandler(event) {
        if (this.isDisabled()) {
            event.stopImmediatePropagation();
        }
    }
}

if (!customElements.get(UIButton.is)) {
    customElements.define(UIButton.is, UIButton);
}
*/

/*!
 * clipboard.js v2.0.6
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports["ClipboardJS"] = factory();
    else
        root["ClipboardJS"] = factory();
})(window, function() {
    return /******/ (function(modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {};
        /******/
        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/ 		if(installedModules[moduleId]) {
                /******/ 			return installedModules[moduleId].exports;
                /******/ 		}
            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			i: moduleId,
                /******/ 			l: false,
                /******/ 			exports: {}
                /******/ 		};
            /******/
            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Flag the module as loaded
            /******/ 		module.l = true;
            /******/
            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/ 	}
        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules;
        /******/
        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules;
        /******/
        /******/ 	// define getter function for harmony exports
        /******/ 	__webpack_require__.d = function(exports, name, getter) {
            /******/ 		if(!__webpack_require__.o(exports, name)) {
                /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
                /******/ 		}
            /******/ 	};
        /******/
        /******/ 	// define __esModule on exports
        /******/ 	__webpack_require__.r = function(exports) {
            /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/ 		}
            /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
            /******/ 	};
        /******/
        /******/ 	// create a fake namespace object
        /******/ 	// mode & 1: value is a module id, require it
        /******/ 	// mode & 2: merge all properties of value into the ns
        /******/ 	// mode & 4: return value when already ns object
        /******/ 	// mode & 8|1: behave like require
        /******/ 	__webpack_require__.t = function(value, mode) {
            /******/ 		if(mode & 1) value = __webpack_require__(value);
            /******/ 		if(mode & 8) return value;
            /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
            /******/ 		var ns = Object.create(null);
            /******/ 		__webpack_require__.r(ns);
            /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
            /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
            /******/ 		return ns;
            /******/ 	};
        /******/
        /******/ 	// getDefaultExport function for compatibility with non-harmony modules
        /******/ 	__webpack_require__.n = function(module) {
            /******/ 		var getter = module && module.__esModule ?
                /******/ 			function getDefault() { return module['default']; } :
                /******/ 			function getModuleExports() { return module; };
            /******/ 		__webpack_require__.d(getter, 'a', getter);
            /******/ 		return getter;
            /******/ 	};
        /******/
        /******/ 	// Object.prototype.hasOwnProperty.call
        /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        /******/
        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = "";
        /******/
        /******/
        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(__webpack_require__.s = 6);
        /******/ })
        /************************************************************************/
        /******/ ([
            /* 0 */
            /***/ (function(module, exports) {

                function select(element) {
                    var selectedText;

                    if (element.nodeName === 'SELECT') {
                        element.focus();

                        selectedText = element.value;
                    }
                    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
                        var isReadOnly = element.hasAttribute('readonly');

                        if (!isReadOnly) {
                            element.setAttribute('readonly', '');
                        }

                        element.select();
                        element.setSelectionRange(0, element.value.length);

                        if (!isReadOnly) {
                            element.removeAttribute('readonly');
                        }

                        selectedText = element.value;
                    }
                    else {
                        if (element.hasAttribute('contenteditable')) {
                            element.focus();
                        }

                        var selection = window.getSelection();
                        var range = document.createRange();

                        range.selectNodeContents(element);
                        selection.removeAllRanges();
                        selection.addRange(range);

                        selectedText = selection.toString();
                    }

                    return selectedText;
                }

                module.exports = select;


                /***/ }),
            /* 1 */
            /***/ (function(module, exports) {

                function E () {
                    // Keep this empty so it's easier to inherit from
                    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
                }

                E.prototype = {
                    on: function (name, callback, ctx) {
                        var e = this.e || (this.e = {});

                        (e[name] || (e[name] = [])).push({
                            fn: callback,
                            ctx: ctx
                        });

                        return this;
                    },

                    once: function (name, callback, ctx) {
                        var self = this;
                        function listener () {
                            self.off(name, listener);
                            callback.apply(ctx, arguments);
                        };

                        listener._ = callback
                        return this.on(name, listener, ctx);
                    },

                    emit: function (name) {
                        var data = [].slice.call(arguments, 1);
                        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                        var i = 0;
                        var len = evtArr.length;

                        for (i; i < len; i++) {
                            evtArr[i].fn.apply(evtArr[i].ctx, data);
                        }

                        return this;
                    },

                    off: function (name, callback) {
                        var e = this.e || (this.e = {});
                        var evts = e[name];
                        var liveEvents = [];

                        if (evts && callback) {
                            for (var i = 0, len = evts.length; i < len; i++) {
                                if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                                    liveEvents.push(evts[i]);
                            }
                        }

                        // Remove event from queue to prevent memory leak
                        // Suggested by https://github.com/lazd
                        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

                        (liveEvents.length)
                            ? e[name] = liveEvents
                            : delete e[name];

                        return this;
                    }
                };

                module.exports = E;
                module.exports.TinyEmitter = E;


                /***/ }),
            /* 2 */
            /***/ (function(module, exports, __webpack_require__) {

                var is = __webpack_require__(3);
                var delegate = __webpack_require__(4);

                /**
                 * Validates all params and calls the right
                 * listener function based on its target type.
                 *
                 * @param {String|HTMLElement|HTMLCollection|NodeList} target
                 * @param {String} type
                 * @param {Function} callback
                 * @return {Object}
                 */
                function listen(target, type, callback) {
                    if (!target && !type && !callback) {
                        throw new Error('Missing required arguments');
                    }

                    if (!is.string(type)) {
                        throw new TypeError('Second argument must be a String');
                    }

                    if (!is.fn(callback)) {
                        throw new TypeError('Third argument must be a Function');
                    }

                    if (is.node(target)) {
                        return listenNode(target, type, callback);
                    }
                    else if (is.nodeList(target)) {
                        return listenNodeList(target, type, callback);
                    }
                    else if (is.string(target)) {
                        return listenSelector(target, type, callback);
                    }
                    else {
                        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
                    }
                }

                /**
                 * Adds an event listener to a HTML element
                 * and returns a remove listener function.
                 *
                 * @param {HTMLElement} node
                 * @param {String} type
                 * @param {Function} callback
                 * @return {Object}
                 */
                function listenNode(node, type, callback) {
                    node.addEventListener(type, callback);

                    return {
                        destroy: function() {
                            node.removeEventListener(type, callback);
                        }
                    }
                }

                /**
                 * Add an event listener to a list of HTML elements
                 * and returns a remove listener function.
                 *
                 * @param {NodeList|HTMLCollection} nodeList
                 * @param {String} type
                 * @param {Function} callback
                 * @return {Object}
                 */
                function listenNodeList(nodeList, type, callback) {
                    Array.prototype.forEach.call(nodeList, function(node) {
                        node.addEventListener(type, callback);
                    });

                    return {
                        destroy: function() {
                            Array.prototype.forEach.call(nodeList, function(node) {
                                node.removeEventListener(type, callback);
                            });
                        }
                    }
                }

                /**
                 * Add an event listener to a selector
                 * and returns a remove listener function.
                 *
                 * @param {String} selector
                 * @param {String} type
                 * @param {Function} callback
                 * @return {Object}
                 */
                function listenSelector(selector, type, callback) {
                    return delegate(document.body, selector, type, callback);
                }

                module.exports = listen;


                /***/ }),
            /* 3 */
            /***/ (function(module, exports) {

                /**
                 * Check if argument is a HTML element.
                 *
                 * @param {Object} value
                 * @return {Boolean}
                 */
                exports.node = function(value) {
                    return value !== undefined
                        && value instanceof HTMLElement
                        && value.nodeType === 1;
                };

                /**
                 * Check if argument is a list of HTML elements.
                 *
                 * @param {Object} value
                 * @return {Boolean}
                 */
                exports.nodeList = function(value) {
                    var type = Object.prototype.toString.call(value);

                    return value !== undefined
                        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
                        && ('length' in value)
                        && (value.length === 0 || exports.node(value[0]));
                };

                /**
                 * Check if argument is a string.
                 *
                 * @param {Object} value
                 * @return {Boolean}
                 */
                exports.string = function(value) {
                    return typeof value === 'string'
                        || value instanceof String;
                };

                /**
                 * Check if argument is a function.
                 *
                 * @param {Object} value
                 * @return {Boolean}
                 */
                exports.fn = function(value) {
                    var type = Object.prototype.toString.call(value);

                    return type === '[object Function]';
                };


                /***/ }),
            /* 4 */
            /***/ (function(module, exports, __webpack_require__) {

                var closest = __webpack_require__(5);

                /**
                 * Delegates event to a selector.
                 *
                 * @param {Element} element
                 * @param {String} selector
                 * @param {String} type
                 * @param {Function} callback
                 * @param {Boolean} useCapture
                 * @return {Object}
                 */
                function _delegate(element, selector, type, callback, useCapture) {
                    var listenerFn = listener.apply(this, arguments);

                    element.addEventListener(type, listenerFn, useCapture);

                    return {
                        destroy: function() {
                            element.removeEventListener(type, listenerFn, useCapture);
                        }
                    }
                }

                /**
                 * Delegates event to a selector.
                 *
                 * @param {Element|String|Array} [elements]
                 * @param {String} selector
                 * @param {String} type
                 * @param {Function} callback
                 * @param {Boolean} useCapture
                 * @return {Object}
                 */
                function delegate(elements, selector, type, callback, useCapture) {
                    // Handle the regular Element usage
                    if (typeof elements.addEventListener === 'function') {
                        return _delegate.apply(null, arguments);
                    }

                    // Handle Element-less usage, it defaults to global delegation
                    if (typeof type === 'function') {
                        // Use `document` as the first parameter, then apply arguments
                        // This is a short way to .unshift `arguments` without running into deoptimizations
                        return _delegate.bind(null, document).apply(null, arguments);
                    }

                    // Handle Selector-based usage
                    if (typeof elements === 'string') {
                        elements = document.querySelectorAll(elements);
                    }

                    // Handle Array-like based usage
                    return Array.prototype.map.call(elements, function (element) {
                        return _delegate(element, selector, type, callback, useCapture);
                    });
                }

                /**
                 * Finds closest match and invokes callback.
                 *
                 * @param {Element} element
                 * @param {String} selector
                 * @param {String} type
                 * @param {Function} callback
                 * @return {Function}
                 */
                function listener(element, selector, type, callback) {
                    return function(e) {
                        e.delegateTarget = closest(e.target, selector);

                        if (e.delegateTarget) {
                            callback.call(element, e);
                        }
                    }
                }

                module.exports = delegate;


                /***/ }),
            /* 5 */
            /***/ (function(module, exports) {

                var DOCUMENT_NODE_TYPE = 9;

                /**
                 * A polyfill for Element.matches()
                 */
                if (typeof Element !== 'undefined' && !Element.prototype.matches) {
                    var proto = Element.prototype;

                    proto.matches = proto.matchesSelector ||
                        proto.mozMatchesSelector ||
                        proto.msMatchesSelector ||
                        proto.oMatchesSelector ||
                        proto.webkitMatchesSelector;
                }

                /**
                 * Finds the closest parent that matches a selector.
                 *
                 * @param {Element} element
                 * @param {String} selector
                 * @return {Function}
                 */
                function closest (element, selector) {
                    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                        if (typeof element.matches === 'function' &&
                            element.matches(selector)) {
                            return element;
                        }
                        element = element.parentNode;
                    }
                }

                module.exports = closest;


                /***/ }),
            /* 6 */
            /***/ (function(module, __webpack_exports__, __webpack_require__) {

                "use strict";
                __webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/select/src/select.js
                var src_select = __webpack_require__(0);
                var select_default = /*#__PURE__*/__webpack_require__.n(src_select);

// CONCATENATED MODULE: ./src/clipboard-action.js
                var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

                var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

                function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



                /**
                 * Inner class which performs selection from either `text` or `target`
                 * properties and then executes copy or cut operations.
                 */

                var clipboard_action_ClipboardAction = function () {
                    /**
                     * @param {Object} options
                     */
                    function ClipboardAction(options) {
                        _classCallCheck(this, ClipboardAction);

                        this.resolveOptions(options);
                        this.initSelection();
                    }

                    /**
                     * Defines base properties passed from constructor.
                     * @param {Object} options
                     */


                    _createClass(ClipboardAction, [{
                        key: 'resolveOptions',
                        value: function resolveOptions() {
                            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                            this.action = options.action;
                            this.container = options.container;
                            this.emitter = options.emitter;
                            this.target = options.target;
                            this.text = options.text;
                            this.trigger = options.trigger;

                            this.selectedText = '';
                        }

                        /**
                         * Decides which selection strategy is going to be applied based
                         * on the existence of `text` and `target` properties.
                         */

                    }, {
                        key: 'initSelection',
                        value: function initSelection() {
                            if (this.text) {
                                this.selectFake();
                            } else if (this.target) {
                                this.selectTarget();
                            }
                        }

                        /**
                         * Creates a fake textarea element, sets its value from `text` property,
                         * and makes a selection on it.
                         */

                    }, {
                        key: 'selectFake',
                        value: function selectFake() {
                            var _this = this;

                            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                            this.removeFake();

                            this.fakeHandlerCallback = function () {
                                return _this.removeFake();
                            };
                            this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

                            this.fakeElem = document.createElement('textarea');
                            // Prevent zooming on iOS
                            this.fakeElem.style.fontSize = '12pt';
                            // Reset box model
                            this.fakeElem.style.border = '0';
                            this.fakeElem.style.padding = '0';
                            this.fakeElem.style.margin = '0';
                            // Move element out of screen horizontally
                            this.fakeElem.style.position = 'absolute';
                            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                            // Move element to the same position vertically
                            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = yPosition + 'px';

                            this.fakeElem.setAttribute('readonly', '');
                            this.fakeElem.value = this.text;

                            this.container.appendChild(this.fakeElem);

                            this.selectedText = select_default()(this.fakeElem);
                            this.copyText();
                        }

                        /**
                         * Only removes the fake element after another click event, that way
                         * a user can hit `Ctrl+C` to copy because selection still exists.
                         */

                    }, {
                        key: 'removeFake',
                        value: function removeFake() {
                            if (this.fakeHandler) {
                                this.container.removeEventListener('click', this.fakeHandlerCallback);
                                this.fakeHandler = null;
                                this.fakeHandlerCallback = null;
                            }

                            if (this.fakeElem) {
                                this.container.removeChild(this.fakeElem);
                                this.fakeElem = null;
                            }
                        }

                        /**
                         * Selects the content from element passed on `target` property.
                         */

                    }, {
                        key: 'selectTarget',
                        value: function selectTarget() {
                            this.selectedText = select_default()(this.target);
                            this.copyText();
                        }

                        /**
                         * Executes the copy operation based on the current selection.
                         */

                    }, {
                        key: 'copyText',
                        value: function copyText() {
                            var succeeded = void 0;

                            try {
                                succeeded = document.execCommand(this.action);
                            } catch (err) {
                                succeeded = false;
                            }

                            this.handleResult(succeeded);
                        }

                        /**
                         * Fires an event based on the copy operation result.
                         * @param {Boolean} succeeded
                         */

                    }, {
                        key: 'handleResult',
                        value: function handleResult(succeeded) {
                            this.emitter.emit(succeeded ? 'success' : 'error', {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            });
                        }

                        /**
                         * Moves focus away from `target` and back to the trigger, removes current selection.
                         */

                    }, {
                        key: 'clearSelection',
                        value: function clearSelection() {
                            if (this.trigger) {
                                this.trigger.focus();
                            }
                            document.activeElement.blur();
                            window.getSelection().removeAllRanges();
                        }

                        /**
                         * Sets the `action` to be performed which can be either 'copy' or 'cut'.
                         * @param {String} action
                         */

                    }, {
                        key: 'destroy',


                        /**
                         * Destroy lifecycle.
                         */
                        value: function destroy() {
                            this.removeFake();
                        }
                    }, {
                        key: 'action',
                        set: function set() {
                            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                            this._action = action;

                            if (this._action !== 'copy' && this._action !== 'cut') {
                                throw new Error('Invalid "action" value, use either "copy" or "cut"');
                            }
                        }

                        /**
                         * Gets the `action` property.
                         * @return {String}
                         */
                        ,
                        get: function get() {
                            return this._action;
                        }

                        /**
                         * Sets the `target` property using an element
                         * that will be have its content copied.
                         * @param {Element} target
                         */

                    }, {
                        key: 'target',
                        set: function set(target) {
                            if (target !== undefined) {
                                if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                                    if (this.action === 'copy' && target.hasAttribute('disabled')) {
                                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    }

                                    if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    }

                                    this._target = target;
                                } else {
                                    throw new Error('Invalid "target" value, use a valid Element');
                                }
                            }
                        }

                        /**
                         * Gets the `target` property.
                         * @return {String|HTMLElement}
                         */
                        ,
                        get: function get() {
                            return this._target;
                        }
                    }]);

                    return ClipboardAction;
                }();

                /* harmony default export */ var clipboard_action = (clipboard_action_ClipboardAction);
// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
                var tiny_emitter = __webpack_require__(1);
                var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter);

// EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js
                var listen = __webpack_require__(2);
                var listen_default = /*#__PURE__*/__webpack_require__.n(listen);

// CONCATENATED MODULE: ./src/clipboard.js
                var clipboard_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

                var clipboard_createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

                function clipboard_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

                function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

                function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





                /**
                 * Base class which takes one or more elements, adds event listeners to them,
                 * and instantiates a new `ClipboardAction` on each click.
                 */

                var clipboard_Clipboard = function (_Emitter) {
                    _inherits(Clipboard, _Emitter);

                    /**
                     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                     * @param {Object} options
                     */
                    function Clipboard(trigger, options) {
                        clipboard_classCallCheck(this, Clipboard);

                        var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

                        _this.resolveOptions(options);
                        _this.listenClick(trigger);
                        return _this;
                    }

                    /**
                     * Defines if attributes would be resolved using internal setter functions
                     * or custom functions that were passed in the constructor.
                     * @param {Object} options
                     */


                    clipboard_createClass(Clipboard, [{
                        key: 'resolveOptions',
                        value: function resolveOptions() {
                            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                            this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
                        }

                        /**
                         * Adds a click event listener to the passed trigger.
                         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                         */

                    }, {
                        key: 'listenClick',
                        value: function listenClick(trigger) {
                            var _this2 = this;

                            this.listener = listen_default()(trigger, 'click', function (e) {
                                return _this2.onClick(e);
                            });
                        }

                        /**
                         * Defines a new `ClipboardAction` on each click event.
                         * @param {Event} e
                         */

                    }, {
                        key: 'onClick',
                        value: function onClick(e) {
                            var trigger = e.delegateTarget || e.currentTarget;

                            if (this.clipboardAction) {
                                this.clipboardAction = null;
                            }

                            this.clipboardAction = new clipboard_action({
                                action: this.action(trigger),
                                target: this.target(trigger),
                                text: this.text(trigger),
                                container: this.container,
                                trigger: trigger,
                                emitter: this
                            });
                        }

                        /**
                         * Default `action` lookup function.
                         * @param {Element} trigger
                         */

                    }, {
                        key: 'defaultAction',
                        value: function defaultAction(trigger) {
                            return getAttributeValue('action', trigger);
                        }

                        /**
                         * Default `target` lookup function.
                         * @param {Element} trigger
                         */

                    }, {
                        key: 'defaultTarget',
                        value: function defaultTarget(trigger) {
                            var selector = getAttributeValue('target', trigger);

                            if (selector) {
                                return document.querySelector(selector);
                            }
                        }

                        /**
                         * Returns the support of the given action, or all actions if no action is
                         * given.
                         * @param {String} [action]
                         */

                    }, {
                        key: 'defaultText',


                        /**
                         * Default `text` lookup function.
                         * @param {Element} trigger
                         */
                        value: function defaultText(trigger) {
                            return getAttributeValue('text', trigger);
                        }

                        /**
                         * Destroy lifecycle.
                         */

                    }, {
                        key: 'destroy',
                        value: function destroy() {
                            this.listener.destroy();

                            if (this.clipboardAction) {
                                this.clipboardAction.destroy();
                                this.clipboardAction = null;
                            }
                        }
                    }], [{
                        key: 'isSupported',
                        value: function isSupported() {
                            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

                            var actions = typeof action === 'string' ? [action] : action;
                            var support = !!document.queryCommandSupported;

                            actions.forEach(function (action) {
                                support = support && !!document.queryCommandSupported(action);
                            });

                            return support;
                        }
                    }]);

                    return Clipboard;
                }(tiny_emitter_default.a);

                /**
                 * Helper function to retrieve attribute value.
                 * @param {String} suffix
                 * @param {Element} element
                 */


                function getAttributeValue(suffix, element) {
                    var attribute = 'data-clipboard-' + suffix;

                    if (!element.hasAttribute(attribute)) {
                        return;
                    }

                    return element.getAttribute(attribute);
                }

                /* harmony default export */ var clipboard = __webpack_exports__["default"] = (clipboard_Clipboard);

                /***/ })
            /******/ ])["default"];
});

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

/** http://t1m0n.name/air-datepicker/docs/index-ru.html */

;(function (window, $, undefined) { ;(function () {
    var VERSION = '2.2.3',
        pluginName = 'datepicker',
        autoInitSelector = '.input_date .input__control, .single-calendar',
        $body, $datepickersContainer,
        containerBuilt = false,
        baseTemplate = '' +
            '<div class="datepicker">' +
            '<i class="datepicker--pointer"></i>' +
            '<nav class="datepicker--nav"></nav>' +
            '<div class="datepicker--content"></div>' +
            '</div>',
        defaults = {
            classes: '',
            inline: false,
            language: 'ru',
            startDate: new Date(),
            firstDay: '',
            weekends: [6, 0],
            dateFormat: '',
            altField: '',
            altFieldDateFormat: '@',
            toggleSelected: true,
            keyboardNav: true,

            position: 'bottom left',
            offset: 12,

            view: 'days',
            minView: 'days',

            showOtherMonths: true,
            selectOtherMonths: true,
            moveToOtherMonthsOnSelect: true,

            showOtherYears: true,
            selectOtherYears: true,
            moveToOtherYearsOnSelect: true,

            minDate: '',
            maxDate: '',
            disableNavWhenOutOfRange: true,

            multipleDates: false, // Boolean or Number
            multipleDatesSeparator: ',',
            range: false,

            todayButton: false,
            clearButton: false,

            showEvent: 'focus',
            autoClose: false,

            // navigation
            monthsField: 'monthsShort',
            prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
            nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
            navTitles: {
                days: 'MM <i>yyyy</i>',
                months: 'yyyy',
                years: 'yyyy1 - yyyy2'
            },

            // timepicker
            timepicker: false,
            onlyTimepicker: false,
            dateTimeSeparator: ' ',
            timeFormat: '',
            minHours: 0,
            maxHours: 24,
            minMinutes: 0,
            maxMinutes: 59,
            hoursStep: 1,
            minutesStep: 1,

            // events
            onSelect: '',
            onShow: '',
            onHide: '',
            onChangeMonth: '',
            onChangeYear: '',
            onChangeDecade: '',
            onChangeView: '',
            onRenderCell: ''
        },
        hotKeys = {
            'ctrlRight': [17, 39],
            'ctrlUp': [17, 38],
            'ctrlLeft': [17, 37],
            'ctrlDown': [17, 40],
            'shiftRight': [16, 39],
            'shiftUp': [16, 38],
            'shiftLeft': [16, 37],
            'shiftDown': [16, 40],
            'altUp': [18, 38],
            'altRight': [18, 39],
            'altLeft': [18, 37],
            'altDown': [18, 40],
            'ctrlShiftUp': [16, 17, 38]
        },
        datepicker;

    var Datepicker  = function (el, options) {
        this.el = el;
        this.$el = $(el);

        this.opts = $.extend(true, {}, defaults, options, this.$el.data());

        if ($body == undefined) {
            $body = $('body');
        }

        if (!this.opts.startDate) {
            this.opts.startDate = new Date();
        }

        if (this.el.nodeName == 'INPUT') {
            this.elIsInput = true;
        }

        if (this.opts.altField) {
            this.$altField = typeof this.opts.altField == 'string' ? $(this.opts.altField) : this.opts.altField;
        }

        this.inited = false;
        this.visible = false;
        this.silent = false; // Need to prevent unnecessary rendering

        this.currentDate = this.opts.startDate;
        this.currentView = this.opts.view;
        this._createShortCuts();
        this.selectedDates = [];
        this.views = {};
        this.keys = [];
        this.minRange = '';
        this.maxRange = '';
        this._prevOnSelectValue = '';

        this.init()
    };

    datepicker = Datepicker;

    datepicker.prototype = {
        VERSION: VERSION,
        viewIndexes: ['days', 'months', 'years'],

        init: function () {
            if (!containerBuilt && !this.opts.inline && this.elIsInput) {
                this._buildDatepickersContainer();
            }
            this._buildBaseHtml();
            this._defineLocale(this.opts.language);
            this._syncWithMinMaxDates();

            if (this.elIsInput) {
                if (!this.opts.inline) {
                    // Set extra classes for proper transitions
                    this._setPositionClasses(this.opts.position);
                    this._bindEvents()
                }
                if (this.opts.keyboardNav && !this.opts.onlyTimepicker) {
                    this._bindKeyboardEvents();
                }
                this.$datepicker.on('mousedown', this._onMouseDownDatepicker.bind(this));
                this.$datepicker.on('mouseup', this._onMouseUpDatepicker.bind(this));
            }

            if (this.opts.classes) {
                this.$datepicker.addClass(this.opts.classes)
            }

            if (this.opts.timepicker) {
                this.timepicker = new $.fn.datepicker.Timepicker(this, this.opts);
                this._bindTimepickerEvents();
            }

            if (this.opts.onlyTimepicker) {
                this.$datepicker.addClass('-only-timepicker-');
            }

            this.views[this.currentView] = new $.fn.datepicker.Body(this, this.currentView, this.opts);
            this.views[this.currentView].show();
            this.nav = new $.fn.datepicker.Navigation(this, this.opts);
            this.view = this.currentView;

            this.$el.on('clickCell.adp', this._onClickCell.bind(this));
            this.$datepicker.on('mouseenter', '.datepicker--cell', this._onMouseEnterCell.bind(this));
            this.$datepicker.on('mouseleave', '.datepicker--cell', this._onMouseLeaveCell.bind(this));

            this.inited = true;
        },

        _createShortCuts: function () {
            this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-8639999913600000);
            this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(8639999913600000);
        },

        _bindEvents : function () {
            this.$el.on(this.opts.showEvent + '.adp', this._onShowEvent.bind(this));
            this.$el.on('mouseup.adp', this._onMouseUpEl.bind(this));
            this.$el.on('blur.adp', this._onBlur.bind(this));
            this.$el.on('keyup.adp', this._onKeyUpGeneral.bind(this));
            $(window).on('resize.adp', this._onResize.bind(this));
            $('body').on('mouseup.adp', this._onMouseUpBody.bind(this));
        },

        _bindKeyboardEvents: function () {
            this.$el.on('keydown.adp', this._onKeyDown.bind(this));
            this.$el.on('keyup.adp', this._onKeyUp.bind(this));
            this.$el.on('hotKey.adp', this._onHotKey.bind(this));
        },

        _bindTimepickerEvents: function () {
            this.$el.on('timeChange.adp', this._onTimeChange.bind(this));
        },

        isWeekend: function (day) {
            return this.opts.weekends.indexOf(day) !== -1;
        },

        _defineLocale: function (lang) {
            if (typeof lang == 'string') {
                this.loc = $.fn.datepicker.language[lang];
                if (!this.loc) {
                    console.warn('Can\'t find language "' + lang + '" in Datepicker.language, will use "ru" instead');
                    this.loc = $.extend(true, {}, $.fn.datepicker.language.ru)
                }

                this.loc = $.extend(true, {}, $.fn.datepicker.language.ru, $.fn.datepicker.language[lang])
            } else {
                this.loc = $.extend(true, {}, $.fn.datepicker.language.ru, lang)
            }

            if (this.opts.dateFormat) {
                this.loc.dateFormat = this.opts.dateFormat
            }

            if (this.opts.timeFormat) {
                this.loc.timeFormat = this.opts.timeFormat
            }

            if (this.opts.firstDay !== '') {
                this.loc.firstDay = this.opts.firstDay
            }

            if (this.opts.timepicker) {
                this.loc.dateFormat = [this.loc.dateFormat, this.loc.timeFormat].join(this.opts.dateTimeSeparator);
            }

            if (this.opts.onlyTimepicker) {
                this.loc.dateFormat = this.loc.timeFormat;
            }

            var boundary = this._getWordBoundaryRegExp;
            if (this.loc.timeFormat.match(boundary('aa')) ||
                this.loc.timeFormat.match(boundary('AA'))
            ) {
               this.ampm = true;
            }
        },

        _buildDatepickersContainer: function () {
            containerBuilt = true;
            $body.append('<div class="datepickers-container" id="datepickers-container"></div>');
            $datepickersContainer = $('#datepickers-container');
        },

        _buildBaseHtml: function () {
            var $appendTarget,
                $inline = $('<div class="datepicker-inline">');

            if(this.el.nodeName == 'INPUT') {
                if (!this.opts.inline) {
                    $appendTarget = $datepickersContainer;
                } else {
                    $appendTarget = $inline.insertAfter(this.$el)
                }
            } else {
                $appendTarget = $inline.appendTo(this.$el)
            }

            this.$datepicker = $(baseTemplate).appendTo($appendTarget);
            this.$content = $('.datepicker--content', this.$datepicker);
            this.$nav = $('.datepicker--nav', this.$datepicker);
        },

        _triggerOnChange: function () {
            if (!this.selectedDates.length) {
                // Prevent from triggering multiple onSelect callback with same argument (empty string) in IE10-11
                if (this._prevOnSelectValue === '') return;
                this._prevOnSelectValue = '';
                return this.opts.onSelect('', '', this);
            }

            var selectedDates = this.selectedDates,
                parsedSelected = datepicker.getParsedDate(selectedDates[0]),
                formattedDates,
                _this = this,
                dates = new Date(
                    parsedSelected.year,
                    parsedSelected.month,
                    parsedSelected.date,
                    parsedSelected.hours,
                    parsedSelected.minutes
                );

                formattedDates = selectedDates.map(function (date) {
                    return _this.formatDate(_this.loc.dateFormat, date)
                }).join(this.opts.multipleDatesSeparator);

            // Create new dates array, to separate it from original selectedDates
            if (this.opts.multipleDates || this.opts.range) {
                dates = selectedDates.map(function(date) {
                    var parsedDate = datepicker.getParsedDate(date);
                    return new Date(
                        parsedDate.year,
                        parsedDate.month,
                        parsedDate.date,
                        parsedDate.hours,
                        parsedDate.minutes
                    );
                })
            }

            this._prevOnSelectValue = formattedDates;
            this.opts.onSelect(formattedDates, dates, this);
        },

        next: function () {
            var d = this.parsedDate,
                o = this.opts;
            switch (this.view) {
                case 'days':
                    this.date = new Date(d.year, d.month + 1, 1);
                    if (o.onChangeMonth) o.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                    break;
                case 'months':
                    this.date = new Date(d.year + 1, d.month, 1);
                    if (o.onChangeYear) o.onChangeYear(this.parsedDate.year);
                    break;
                case 'years':
                    this.date = new Date(d.year + 10, 0, 1);
                    if (o.onChangeDecade) o.onChangeDecade(this.curDecade);
                    break;
            }
        },

        prev: function () {
            var d = this.parsedDate,
                o = this.opts;
            switch (this.view) {
                case 'days':
                    this.date = new Date(d.year, d.month - 1, 1);
                    if (o.onChangeMonth) o.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                    break;
                case 'months':
                    this.date = new Date(d.year - 1, d.month, 1);
                    if (o.onChangeYear) o.onChangeYear(this.parsedDate.year);
                    break;
                case 'years':
                    this.date = new Date(d.year - 10, 0, 1);
                    if (o.onChangeDecade) o.onChangeDecade(this.curDecade);
                    break;
            }
        },

        formatDate: function (string, date) {
            date = date || this.date;
            var result = string,
                boundary = this._getWordBoundaryRegExp,
                locale = this.loc,
                leadingZero = datepicker.getLeadingZeroNum,
                decade = datepicker.getDecade(date),
                d = datepicker.getParsedDate(date),
                fullHours = d.fullHours,
                hours = d.hours,
                ampm = string.match(boundary('aa')) || string.match(boundary('AA')),
                dayPeriod = 'am',
                replacer = this._replacer,
                validHours;

            if (this.opts.timepicker && this.timepicker && ampm) {
                validHours = this.timepicker._getValidHoursFromDate(date, ampm);
                fullHours = leadingZero(validHours.hours);
                hours = validHours.hours;
                dayPeriod = validHours.dayPeriod;
            }

            switch (true) {
                case /@/.test(result):
                    result = result.replace(/@/, date.getTime());
                case /aa/.test(result):
                    result = replacer(result, boundary('aa'), dayPeriod);
                case /AA/.test(result):
                    result = replacer(result, boundary('AA'), dayPeriod.toUpperCase());
                case /dd/.test(result):
                    result = replacer(result, boundary('dd'), d.fullDate);
                case /d/.test(result):
                    result = replacer(result, boundary('d'), d.date);
                case /DD/.test(result):
                    result = replacer(result, boundary('DD'), locale.days[d.day]);
                case /D/.test(result):
                    result = replacer(result, boundary('D'), locale.daysShort[d.day]);
                case /mm/.test(result):
                    result = replacer(result, boundary('mm'), d.fullMonth);
                case /m/.test(result):
                    result = replacer(result, boundary('m'), d.month + 1);
                case /MM/.test(result):
                    result = replacer(result, boundary('MM'), this.loc.months[d.month]);
                case /M/.test(result):
                    result = replacer(result, boundary('M'), locale.monthsShort[d.month]);
                case /ii/.test(result):
                    result = replacer(result, boundary('ii'), d.fullMinutes);
                case /i/.test(result):
                    result = replacer(result, boundary('i'), d.minutes);
                case /hh/.test(result):
                    result = replacer(result, boundary('hh'), fullHours);
                case /h/.test(result):
                    result = replacer(result, boundary('h'), hours);
                case /yyyy/.test(result):
                    result = replacer(result, boundary('yyyy'), d.year);
                case /yyyy1/.test(result):
                    result = replacer(result, boundary('yyyy1'), decade[0]);
                case /yyyy2/.test(result):
                    result = replacer(result, boundary('yyyy2'), decade[1]);
                case /yy/.test(result):
                    result = replacer(result, boundary('yy'), d.year.toString().slice(-2));
            }

            return result;
        },

        _replacer: function (str, reg, data) {
            return str.replace(reg, function (match, p1,p2,p3) {
                return p1 + data + p3;
            })
        },

        _getWordBoundaryRegExp: function (sign) {
            var symbols = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';

            return new RegExp('(^|>|' + symbols + ')(' + sign + ')($|<|' + symbols + ')', 'g');
        },


        selectDate: function (date) {
            var _this = this,
                opts = _this.opts,
                d = _this.parsedDate,
                selectedDates = _this.selectedDates,
                len = selectedDates.length,
                newDate = '';

            if (Array.isArray(date)) {
                date.forEach(function (d) {
                    _this.selectDate(d)
                });
                return;
            }

            if (!(date instanceof Date)) return;

            this.lastSelectedDate = date;

            // Set new time values from Date
            if (this.timepicker) {
                this.timepicker._setTime(date);
            }

            // On this step timepicker will set valid values in it's instance
            _this._trigger('selectDate', date);

            // Set correct time values after timepicker's validation
            // Prevent from setting hours or minutes which values are lesser then `min` value or
            // greater then `max` value
            if (this.timepicker) {
                date.setHours(this.timepicker.hours);
                date.setMinutes(this.timepicker.minutes)
            }

            if (_this.view == 'days') {
                if (date.getMonth() != d.month && opts.moveToOtherMonthsOnSelect) {
                    newDate = new Date(date.getFullYear(), date.getMonth(), 1);
                }
            }

            if (_this.view == 'years') {
                if (date.getFullYear() != d.year && opts.moveToOtherYearsOnSelect) {
                    newDate = new Date(date.getFullYear(), 0, 1);
                }
            }

            if (newDate) {
                _this.silent = true;
                _this.date = newDate;
                _this.silent = false;
                _this.nav._render()
            }

            if (opts.multipleDates && !opts.range) { // Set priority to range functionality
                if (len === opts.multipleDates) return;
                if (!_this._isSelected(date)) {
                    _this.selectedDates.push(date);
                }
            } else if (opts.range) {
                if (len == 2) {
                    _this.selectedDates = [date];
                    _this.minRange = date;
                    _this.maxRange = '';
                } else if (len == 1) {
                    _this.selectedDates.push(date);
                    if (!_this.maxRange){
                        _this.maxRange = date;
                    } else {
                        _this.minRange = date;
                    }
                    // Swap dates if they were selected via dp.selectDate() and second date was smaller then first
                    if (datepicker.bigger(_this.maxRange, _this.minRange)) {
                        _this.maxRange = _this.minRange;
                        _this.minRange = date;
                    }
                    _this.selectedDates = [_this.minRange, _this.maxRange]

                } else {
                    _this.selectedDates = [date];
                    _this.minRange = date;
                }
            } else {
                _this.selectedDates = [date];
            }

            _this._setInputValue();

            if (opts.onSelect) {
                _this._triggerOnChange();
            }

            if (opts.autoClose && !this.timepickerIsActive) {
                if (!opts.multipleDates && !opts.range) {
                    _this.hide();
                } else if (opts.range && _this.selectedDates.length == 2) {
                    _this.hide();
                }
            }

            _this.views[this.currentView]._render()
        },

        removeDate: function (date) {
            var selected = this.selectedDates,
                _this = this;

            if (!(date instanceof Date)) return;

            return selected.some(function (curDate, i) {
                if (datepicker.isSame(curDate, date)) {
                    selected.splice(i, 1);

                    if (!_this.selectedDates.length) {
                        _this.minRange = '';
                        _this.maxRange = '';
                        _this.lastSelectedDate = '';
                    } else {
                        _this.lastSelectedDate = _this.selectedDates[_this.selectedDates.length - 1];
                    }

                    _this.views[_this.currentView]._render();
                    _this._setInputValue();

                    if (_this.opts.onSelect) {
                        _this._triggerOnChange();
                    }

                    return true
                }
            })
        },

        today: function () {
            this.silent = true;
            this.view = this.opts.minView;
            this.silent = false;
            this.date = new Date();

            if (this.opts.todayButton instanceof Date) {
                this.selectDate(this.opts.todayButton)
            }
        },

        clear: function () {
            this.selectedDates = [];
            this.minRange = '';
            this.maxRange = '';
            this.views[this.currentView]._render();
            this._setInputValue();
            if (this.opts.onSelect) {
                this._triggerOnChange()
            }
        },

        /**
         * Updates datepicker options
         * @param {String|Object} param - parameter's name to update. If object then it will extend current options
         * @param {String|Number|Object} [value] - new param value
         */
        update: function (param, value) {
            var len = arguments.length,
                lastSelectedDate = this.lastSelectedDate;

            if (len == 2) {
                this.opts[param] = value;
            } else if (len == 1 && typeof param == 'object') {
                this.opts = $.extend(true, this.opts, param)
            }

            this._createShortCuts();
            this._syncWithMinMaxDates();
            this._defineLocale(this.opts.language);
            this.nav._addButtonsIfNeed();
            if (!this.opts.onlyTimepicker) this.nav._render();
            this.views[this.currentView]._render();

            if (this.elIsInput && !this.opts.inline) {
                this._setPositionClasses(this.opts.position);
                if (this.visible) {
                    this.setPosition(this.opts.position)
                }
            }

            if (this.opts.classes) {
                this.$datepicker.addClass(this.opts.classes)
            }

            if (this.opts.onlyTimepicker) {
                this.$datepicker.addClass('-only-timepicker-');
            }

            if (this.opts.timepicker) {
                if (lastSelectedDate) this.timepicker._handleDate(lastSelectedDate);
                this.timepicker._updateRanges();
                this.timepicker._updateCurrentTime();
                // Change hours and minutes if it's values have been changed through min/max hours/minutes
                if (lastSelectedDate) {
                    lastSelectedDate.setHours(this.timepicker.hours);
                    lastSelectedDate.setMinutes(this.timepicker.minutes);
                }
            }

            this._setInputValue();

            return this;
        },

        _syncWithMinMaxDates: function () {
            var curTime = this.date.getTime();
            this.silent = true;
            if (this.minTime > curTime) {
                this.date = this.minDate;
            }

            if (this.maxTime < curTime) {
                this.date = this.maxDate;
            }
            this.silent = false;
        },

        _isSelected: function (checkDate, cellType) {
            var res = false;
            this.selectedDates.some(function (date) {
                if (datepicker.isSame(date, checkDate, cellType)) {
                    res = date;
                    return true;
                }
            });
            return res;
        },

        _setInputValue: function () {
            var _this = this,
                opts = _this.opts,
                format = _this.loc.dateFormat,
                altFormat = opts.altFieldDateFormat,
                value = _this.selectedDates.map(function (date) {
                    return _this.formatDate(format, date)
                }),
                altValues;

            if (opts.altField && _this.$altField.length) {
                altValues = this.selectedDates.map(function (date) {
                    return _this.formatDate(altFormat, date)
                });
                altValues = altValues.join(this.opts.multipleDatesSeparator);
                this.$altField.val(altValues);
            }

            value = value.join(this.opts.multipleDatesSeparator);

            this.$el.val(value)
        },

        /**
         * Check if date is between minDate and maxDate
         * @param date {object} - date object
         * @param type {string} - cell type
         * @returns {boolean}
         * @private
         */
        _isInRange: function (date, type) {
            var time = date.getTime(),
                d = datepicker.getParsedDate(date),
                min = datepicker.getParsedDate(this.minDate),
                max = datepicker.getParsedDate(this.maxDate),
                dMinTime = new Date(d.year, d.month, min.date).getTime(),
                dMaxTime = new Date(d.year, d.month, max.date).getTime(),
                types = {
                    day: time >= this.minTime && time <= this.maxTime,
                    month: dMinTime >= this.minTime && dMaxTime <= this.maxTime,
                    year: d.year >= min.year && d.year <= max.year
                };
            return type ? types[type] : types.day
        },

        _getDimensions: function ($el) {
            var offset = $el.offset();

            return {
                width: $el.outerWidth(),
                height: $el.outerHeight(),
                left: offset.left,
                top: offset.top
            }
        },

        _getDateFromCell: function (cell) {
            var curDate = this.parsedDate,
                year = cell.data('year') || curDate.year,
                month = cell.data('month') == undefined ? curDate.month : cell.data('month'),
                date = cell.data('date') || 1;

            return new Date(year, month, date);
        },

        _setPositionClasses: function (pos) {
            pos = pos.split(' ');
            var main = pos[0],
                sec = pos[1],
                classes = 'datepicker -' + main + '-' + sec + '- -from-' + main + '-';

            if (this.visible) classes += ' active';

            this.$datepicker
                .removeAttr('class')
                .addClass(classes);
        },

        setPosition: function (position) {
            position = position || this.opts.position;

            var dims = this._getDimensions(this.$el),
                selfDims = this._getDimensions(this.$datepicker),
                pos = position.split(' '),
                top, left,
                offset = this.opts.offset,
                main = pos[0],
                secondary = pos[1];

            switch (main) {
                case 'top':
                    top = dims.top - selfDims.height - offset;
                    break;
                case 'right':
                    left = dims.left + dims.width + offset;
                    break;
                case 'bottom':
                    top = dims.top + dims.height + offset;
                    break;
                case 'left':
                    left = dims.left - selfDims.width - offset;
                    break;
            }

            switch(secondary) {
                case 'top':
                    top = dims.top;
                    break;
                case 'right':
                    left = dims.left + dims.width - selfDims.width;
                    break;
                case 'bottom':
                    top = dims.top + dims.height - selfDims.height;
                    break;
                case 'left':
                    left = dims.left;
                    break;
                case 'center':
                    if (/left|right/.test(main)) {
                        top = dims.top + dims.height/2 - selfDims.height/2;
                    } else {
                        left = dims.left + dims.width/2 - selfDims.width/2;
                    }
            }

            this.$datepicker
                .css({
    left: left,
    top: top
  })
        },

        show: function () {
            var onShow = this.opts.onShow;

            this.setPosition(this.opts.position);
            this.$datepicker.addClass('active');
            this.visible = true;

            if (onShow) {
                this._bindVisionEvents(onShow)
            }
        },

        hide: function () {
            var onHide = this.opts.onHide;

            this.$datepicker
                .removeClass('active')
                .css({
    left: '-100000px'
  });

            this.focused = '';
            this.keys = [];

            this.inFocus = false;
            this.visible = false;
            this.$el.blur();

            if (onHide) {
                this._bindVisionEvents(onHide)
            }
        },

        down: function (date) {
            this._changeView(date, 'down');
        },

        up: function (date) {
            this._changeView(date, 'up');
        },

        _bindVisionEvents: function (event) {
            this.$datepicker.off('transitionend.dp');
            event(this, false);
            this.$datepicker.one('transitionend.dp', event.bind(this, this, true))
        },

        _changeView: function (date, dir) {
            date = date || this.focused || this.date;

            var nextView = dir == 'up' ? this.viewIndex + 1 : this.viewIndex - 1;
            if (nextView > 2) nextView = 2;
            if (nextView < 0) nextView = 0;

            this.silent = true;
            this.date = new Date(date.getFullYear(), date.getMonth(), 1);
            this.silent = false;
            this.view = this.viewIndexes[nextView];

        },

        _handleHotKey: function (key) {
            var date = datepicker.getParsedDate(this._getFocusedDate()),
                focusedParsed,
                o = this.opts,
                newDate,
                totalDaysInNextMonth,
                monthChanged = false,
                yearChanged = false,
                decadeChanged = false,
                y = date.year,
                m = date.month,
                d = date.date;

            switch (key) {
                case 'ctrlRight':
                case 'ctrlUp':
                    m += 1;
                    monthChanged = true;
                    break;
                case 'ctrlLeft':
                case 'ctrlDown':
                    m -= 1;
                    monthChanged = true;
                    break;
                case 'shiftRight':
                case 'shiftUp':
                    yearChanged = true;
                    y += 1;
                    break;
                case 'shiftLeft':
                case 'shiftDown':
                    yearChanged = true;
                    y -= 1;
                    break;
                case 'altRight':
                case 'altUp':
                    decadeChanged = true;
                    y += 10;
                    break;
                case 'altLeft':
                case 'altDown':
                    decadeChanged = true;
                    y -= 10;
                    break;
                case 'ctrlShiftUp':
                    this.up();
                    break;
            }

            totalDaysInNextMonth = datepicker.getDaysCount(new Date(y,m));
            newDate = new Date(y,m,d);

            // If next month has less days than current, set date to total days in that month
            if (totalDaysInNextMonth < d) d = totalDaysInNextMonth;

            // Check if newDate is in valid range
            if (newDate.getTime() < this.minTime) {
                newDate = this.minDate;
            } else if (newDate.getTime() > this.maxTime) {
                newDate = this.maxDate;
            }

            this.focused = newDate;

            focusedParsed = datepicker.getParsedDate(newDate);
            if (monthChanged && o.onChangeMonth) {
                o.onChangeMonth(focusedParsed.month, focusedParsed.year)
            }
            if (yearChanged && o.onChangeYear) {
                o.onChangeYear(focusedParsed.year)
            }
            if (decadeChanged && o.onChangeDecade) {
                o.onChangeDecade(this.curDecade)
            }
        },

        _registerKey: function (key) {
            var exists = this.keys.some(function (curKey) {
                return curKey == key;
            });

            if (!exists) {
                this.keys.push(key)
            }
        },

        _unRegisterKey: function (key) {
            var index = this.keys.indexOf(key);

            this.keys.splice(index, 1);
        },

        _isHotKeyPressed: function () {
            var currentHotKey,
                found = false,
                _this = this,
                pressedKeys = this.keys.sort();

            for (var hotKey in hotKeys) {
                currentHotKey = hotKeys[hotKey];
                if (pressedKeys.length != currentHotKey.length) continue;

                if (currentHotKey.every(function (key, i) { return key == pressedKeys[i]})) {
                    _this._trigger('hotKey', hotKey);
                    found = true;
                }
            }

            return found;
        },

        _trigger: function (event, args) {
            this.$el.trigger(event, args)
        },

        _focusNextCell: function (keyCode, type) {
            type = type || this.cellType;

            var date = datepicker.getParsedDate(this._getFocusedDate()),
                y = date.year,
                m = date.month,
                d = date.date;

            if (this._isHotKeyPressed()){
                return;
            }

            switch(keyCode) {
                case 37: // left
                    type == 'day' ? (d -= 1) : '';
                    type == 'month' ? (m -= 1) : '';
                    type == 'year' ? (y -= 1) : '';
                    break;
                case 38: // up
                    type == 'day' ? (d -= 7) : '';
                    type == 'month' ? (m -= 3) : '';
                    type == 'year' ? (y -= 4) : '';
                    break;
                case 39: // right
                    type == 'day' ? (d += 1) : '';
                    type == 'month' ? (m += 1) : '';
                    type == 'year' ? (y += 1) : '';
                    break;
                case 40: // down
                    type == 'day' ? (d += 7) : '';
                    type == 'month' ? (m += 3) : '';
                    type == 'year' ? (y += 4) : '';
                    break;
            }

            var nd = new Date(y,m,d);
            if (nd.getTime() < this.minTime) {
                nd = this.minDate;
            } else if (nd.getTime() > this.maxTime) {
                nd = this.maxDate;
            }

            this.focused = nd;

        },

        _getFocusedDate: function () {
            var focused  = this.focused || this.selectedDates[this.selectedDates.length - 1],
                d = this.parsedDate;

            if (!focused) {
                switch (this.view) {
                    case 'days':
                        focused = new Date(d.year, d.month, new Date().getDate());
                        break;
                    case 'months':
                        focused = new Date(d.year, d.month, 1);
                        break;
                    case 'years':
                        focused = new Date(d.year, 0, 1);
                        break;
                }
            }

            return focused;
        },

        _getCell: function (date, type) {
            type = type || this.cellType;

            var d = datepicker.getParsedDate(date),
                selector = '.datepicker--cell[data-year="' + d.year + '"]',
                $cell;

            switch (type) {
                case 'month':
                    selector = '[data-month="' + d.month + '"]';
                    break;
                case 'day':
                    selector += '[data-month="' + d.month + '"][data-date="' + d.date + '"]';
                    break;
            }
            $cell = this.views[this.currentView].$el.find(selector);

            return $cell.length ? $cell : $('');
        },

        destroy: function () {
            var _this = this;
            _this.$el
                .off('.adp')
                .data('datepicker', '');

            _this.selectedDates = [];
            _this.focused = '';
            _this.views = {};
            _this.keys = [];
            _this.minRange = '';
            _this.maxRange = '';

            if (_this.opts.inline || !_this.elIsInput) {
                _this.$datepicker.closest('.datepicker-inline').remove();
            } else {
                _this.$datepicker.remove();
            }
        },

        _handleAlreadySelectedDates: function (alreadySelected, selectedDate) {
            if (this.opts.range) {
                if (!this.opts.toggleSelected) {
                    // Add possibility to select same date when range is true
                    if (this.selectedDates.length != 2) {
                        this._trigger('clickCell', selectedDate);
                    }
                } else {
                    this.removeDate(selectedDate);
                }
            } else if (this.opts.toggleSelected){
                this.removeDate(selectedDate);
            }

            // Change last selected date to be able to change time when clicking on this cell
            if (!this.opts.toggleSelected) {
                this.lastSelectedDate = alreadySelected;
                if (this.opts.timepicker) {
                    this.timepicker._setTime(alreadySelected);
                    this.timepicker.update();
                }
            }
        },

        _onShowEvent: function (e) {
            if (!this.visible) {
                this.show();
            }
        },

        _onBlur: function () {
            if (!this.inFocus && this.visible) {
                this.hide();
            }
        },

        _onMouseDownDatepicker: function (e) {
            this.inFocus = true;
        },

        _onMouseUpDatepicker: function (e) {
            this.inFocus = false;
            e.originalEvent.inFocus = true;
            if (!e.originalEvent.timepickerFocus) this.$el.focus();
        },

        _onKeyUpGeneral: function (e) {
            var val = this.$el.val();

            if (!val) {
                this.clear();
            }
        },

        _onResize: function () {
            if (this.visible) {
                this.setPosition();
            }
        },

        _onMouseUpBody: function (e) {
            if (e.originalEvent.inFocus) return;

            if (this.visible && !this.inFocus) {
                this.hide();
            }
        },

        _onMouseUpEl: function (e) {
            e.originalEvent.inFocus = true;
            setTimeout(this._onKeyUpGeneral.bind(this),4);
        },

        _onKeyDown: function (e) {
            var code = e.which;
            this._registerKey(code);

            // Arrows
            if (code >= 37 && code <= 40) {
                e.preventDefault();
                this._focusNextCell(code);
            }

            // Enter
            if (code == 13) {
                if (this.focused) {
                    if (this._getCell(this.focused).hasClass('-disabled-')) return;
                    if (this.view != this.opts.minView) {
                        this.down()
                    } else {
                        var alreadySelected = this._isSelected(this.focused, this.cellType);

                        if (!alreadySelected) {
                            if (this.timepicker) {
                                this.focused.setHours(this.timepicker.hours);
                                this.focused.setMinutes(this.timepicker.minutes);
                            }
                            this.selectDate(this.focused);
                            return;
                        }
                        this._handleAlreadySelectedDates(alreadySelected, this.focused)
                    }
                }
            }

            // Esc
            if (code == 27) {
                this.hide();
            }
        },

        _onKeyUp: function (e) {
            var code = e.which;
            this._unRegisterKey(code);
        },

        _onHotKey: function (e, hotKey) {
            this._handleHotKey(hotKey);
        },

        _onMouseEnterCell: function (e) {
            var $cell = $(e.target).closest('.datepicker--cell'),
                date = this._getDateFromCell($cell);

            // Prevent from unnecessary rendering and setting new currentDate
            this.silent = true;

            if (this.focused) {
                this.focused = ''
            }

            $cell.addClass('-focus-');

            this.focused = date;
            this.silent = false;

            if (this.opts.range && this.selectedDates.length == 1) {
                this.minRange = this.selectedDates[0];
                this.maxRange = '';
                if (datepicker.less(this.minRange, this.focused)) {
                    this.maxRange = this.minRange;
                    this.minRange = '';
                }
                this.views[this.currentView]._update();
            }
        },

        _onMouseLeaveCell: function (e) {
            var $cell = $(e.target).closest('.datepicker--cell');

            $cell.removeClass('-focus-');

            this.silent = true;
            this.focused = '';
            this.silent = false;
        },

        _onTimeChange: function (e, h, m) {
            var date = new Date(),
                selectedDates = this.selectedDates,
                selected = false;

            if (selectedDates.length) {
                selected = true;
                date = this.lastSelectedDate;
            }

            date.setHours(h);
            date.setMinutes(m);

            if (!selected && !this._getCell(date).hasClass('-disabled-')) {
                this.selectDate(date);
            } else {
                this._setInputValue();
                if (this.opts.onSelect) {
                    this._triggerOnChange();
                }
            }
        },

        _onClickCell: function (e, date) {
            if (this.timepicker) {
                date.setHours(this.timepicker.hours);
                date.setMinutes(this.timepicker.minutes);
            }
            this.selectDate(date);
        },

        set focused(val) {
            if (!val && this.focused) {
                var $cell = this._getCell(this.focused);

                if ($cell.length) {
                    $cell.removeClass('-focus-')
                }
            }
            this._focused = val;
            if (this.opts.range && this.selectedDates.length == 1) {
                this.minRange = this.selectedDates[0];
                this.maxRange = '';
                if (datepicker.less(this.minRange, this._focused)) {
                    this.maxRange = this.minRange;
                    this.minRange = '';
                }
            }
            if (this.silent) return;
            this.date = val;
        },

        get focused() {
            return this._focused;
        },

        get parsedDate() {
            return datepicker.getParsedDate(this.date);
        },

        set date (val) {
            if (!(val instanceof Date)) return;

            this.currentDate = val;

            if (this.inited && !this.silent) {
                this.views[this.view]._render();
                this.nav._render();
                if (this.visible && this.elIsInput) {
                    this.setPosition();
                }
            }
            return val;
        },

        get date () {
            return this.currentDate
        },

        set view (val) {
            this.viewIndex = this.viewIndexes.indexOf(val);

            if (this.viewIndex < 0) {
                return;
            }

            this.prevView = this.currentView;
            this.currentView = val;

            if (this.inited) {
                if (!this.views[val]) {
                    this.views[val] = new  $.fn.datepicker.Body(this, val, this.opts)
                } else {
                    this.views[val]._render();
                }

                this.views[this.prevView].hide();
                this.views[val].show();
                this.nav._render();

                if (this.opts.onChangeView) {
                    this.opts.onChangeView(val)
                }
                if (this.elIsInput && this.visible) this.setPosition();
            }

            return val
        },

        get view() {
            return this.currentView;
        },

        get cellType() {
            return this.view.substring(0, this.view.length - 1)
        },

        get minTime() {
            var min = datepicker.getParsedDate(this.minDate);
            return new Date(min.year, min.month, min.date).getTime()
        },

        get maxTime() {
            var max = datepicker.getParsedDate(this.maxDate);
            return new Date(max.year, max.month, max.date).getTime()
        },

        get curDecade() {
            return datepicker.getDecade(this.date)
        }
    };

    //  Utils
    // -------------------------------------------------

    datepicker.getDaysCount = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    datepicker.getParsedDate = function (date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            fullMonth: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1, // One based
            date: date.getDate(),
            fullDate: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            day: date.getDay(),
            hours: date.getHours(),
            fullHours:  date.getHours() < 10 ? '0' + date.getHours() :  date.getHours() ,
            minutes: date.getMinutes(),
            fullMinutes:  date.getMinutes() < 10 ? '0' + date.getMinutes() :  date.getMinutes()
        }
    };

    datepicker.getDecade = function (date) {
        var firstYear = Math.floor(date.getFullYear() / 10) * 10;

        return [firstYear, firstYear + 9];
    };

    datepicker.template = function (str, data) {
        return str.replace(/#\{([\w]+)\}/g, function (source, match) {
            if (data[match] || data[match] === 0) {
                return data[match]
            }
        });
    };

    datepicker.isSame = function (date1, date2, type) {
        if (!date1 || !date2) return false;
        var d1 = datepicker.getParsedDate(date1),
            d2 = datepicker.getParsedDate(date2),
            _type = type ? type : 'day',

            conditions = {
                day: d1.date == d2.date && d1.month == d2.month && d1.year == d2.year,
                month: d1.month == d2.month && d1.year == d2.year,
                year: d1.year == d2.year
            };

        return conditions[_type];
    };

    datepicker.less = function (dateCompareTo, date, type) {
        if (!dateCompareTo || !date) return false;
        return date.getTime() < dateCompareTo.getTime();
    };

    datepicker.bigger = function (dateCompareTo, date, type) {
        if (!dateCompareTo || !date) return false;
        return date.getTime() > dateCompareTo.getTime();
    };

    datepicker.getLeadingZeroNum = function (num) {
        return parseInt(num) < 10 ? '0' + num : num;
    };

    /**
     * Returns copy of date with hours and minutes equals to 0
     * @param date {Date}
     */
    datepicker.resetTime = function (date) {
        if (typeof date != 'object') return;
        date = datepicker.getParsedDate(date);
        return new Date(date.year, date.month, date.date)
    };

    $.fn.datepicker = function ( options ) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this,  pluginName,
                    new Datepicker( this, options ));
            } else {
                var _this = $.data(this, pluginName);

                _this.opts = $.extend(true, _this.opts, options);
                _this.update();
            }
        });
    };

    $.fn.datepicker.Constructor = Datepicker;

    $.fn.datepicker.language = {
        ru: {
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
            daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            today: 'Сегодня',
            clear: 'Очистить',
            dateFormat: 'dd.mm.yyyy',
            timeFormat: 'hh:ii',
            firstDay: 1
        }
    };

    $(function () {
        $(autoInitSelector).datepicker();
    })

})();

;(function () {
    var templates = {
        days:'' +
        '<div class="datepicker--days datepicker--body">' +
        '<div class="datepicker--days-names"></div>' +
        '<div class="datepicker--cells datepicker--cells-days"></div>' +
        '</div>',
        months: '' +
        '<div class="datepicker--months datepicker--body">' +
        '<div class="datepicker--cells datepicker--cells-months"></div>' +
        '</div>',
        years: '' +
        '<div class="datepicker--years datepicker--body">' +
        '<div class="datepicker--cells datepicker--cells-years"></div>' +
        '</div>'
        },
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;

    datepicker.Body = function (d, type, opts) {
        this.d = d;
        this.type = type;
        this.opts = opts;
        this.$el = $('');

        if (this.opts.onlyTimepicker) return;
        this.init();
    };

    datepicker.Body.prototype = {
        init: function () {
            this._buildBaseHtml();
            this._render();

            this._bindEvents();
        },

        _bindEvents: function () {
            this.$el.on('click', '.datepicker--cell', $.proxy(this._onClickCell, this));
        },

        _buildBaseHtml: function () {
            this.$el = $(templates[this.type]).appendTo(this.d.$content);
            this.$names = $('.datepicker--days-names', this.$el);
            this.$cells = $('.datepicker--cells', this.$el);
        },

        _getDayNamesHtml: function (firstDay, curDay, html, i) {
            curDay = curDay != undefined ? curDay : firstDay;
            html = html ? html : '';
            i = i != undefined ? i : 0;

            if (i > 7) return html;
            if (curDay == 7) return this._getDayNamesHtml(firstDay, 0, html, ++i);

            html += '<div class="datepicker--day-name' + (this.d.isWeekend(curDay) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[curDay] + '</div>';

            return this._getDayNamesHtml(firstDay, ++curDay, html, ++i);
        },

        _getCellContents: function (date, type) {
            var classes = "datepicker--cell datepicker--cell-" + type,
                currentDate = new Date(),
                parent = this.d,
                minRange = dp.resetTime(parent.minRange),
                maxRange = dp.resetTime(parent.maxRange),
                opts = parent.opts,
                d = dp.getParsedDate(date),
                render = {},
                html = d.date;

            switch (type) {
                case 'day':
                    if (parent.isWeekend(d.day)) classes += " -weekend-";
                    if (d.month != this.d.parsedDate.month) {
                        classes += " -other-month-";
                        if (!opts.selectOtherMonths) {
                            classes += " -disabled-";
                        }
                        if (!opts.showOtherMonths) html = '';
                    }
                    break;
                case 'month':
                    html = parent.loc[parent.opts.monthsField][d.month];
                    break;
                case 'year':
                    var decade = parent.curDecade;
                    html = d.year;
                    if (d.year < decade[0] || d.year > decade[1]) {
                        classes += ' -other-decade-';
                        if (!opts.selectOtherYears) {
                            classes += " -disabled-";
                        }
                        if (!opts.showOtherYears) html = '';
                    }
                    break;
            }

            if (opts.onRenderCell) {
                render = opts.onRenderCell(date, type) || {};
                html = render.html ? render.html : html;
                classes += render.classes ? ' ' + render.classes : '';
            }

            if (opts.range) {
                if (dp.isSame(minRange, date, type)) classes += ' -range-from-';
                if (dp.isSame(maxRange, date, type)) classes += ' -range-to-';

                if (parent.selectedDates.length == 1 && parent.focused) {
                    if (
                        (dp.bigger(minRange, date) && dp.less(parent.focused, date)) ||
                        (dp.less(maxRange, date) && dp.bigger(parent.focused, date)))
                    {
                        classes += ' -in-range-'
                    }

                    if (dp.less(maxRange, date) && dp.isSame(parent.focused, date)) {
                        classes += ' -range-from-'
                    }
                    if (dp.bigger(minRange, date) && dp.isSame(parent.focused, date)) {
                        classes += ' -range-to-'
                    }

                } else if (parent.selectedDates.length == 2) {
                    if (dp.bigger(minRange, date) && dp.less(maxRange, date)) {
                        classes += ' -in-range-'
                    }
                }
            }


            if (dp.isSame(currentDate, date, type)) classes += ' -current-';
            if (parent.focused && dp.isSame(date, parent.focused, type)) classes += ' -focus-';
            if (parent._isSelected(date, type)) classes += ' -selected-';
            if (!parent._isInRange(date, type) || render.disabled) classes += ' -disabled-';

            return {
                html: html,
                classes: classes
            }
        },

        /**
         * Calculates days number to render. Generates days html and returns it.
         * @param {object} date - Date object
         * @returns {string}
         * @private
         */
        _getDaysHtml: function (date) {
            var totalMonthDays = dp.getDaysCount(date),
                firstMonthDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
                lastMonthDay = new Date(date.getFullYear(), date.getMonth(), totalMonthDays).getDay(),
                daysFromPevMonth = firstMonthDay - this.d.loc.firstDay,
                daysFromNextMonth = 6 - lastMonthDay + this.d.loc.firstDay;

            daysFromPevMonth = daysFromPevMonth < 0 ? daysFromPevMonth + 7 : daysFromPevMonth;
            daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;

            var startDayIndex = -daysFromPevMonth + 1,
                m, y,
                html = '';

            for (var i = startDayIndex, max = totalMonthDays + daysFromNextMonth; i <= max; i++) {
                y = date.getFullYear();
                m = date.getMonth();

                html += this._getDayHtml(new Date(y, m, i))
            }

            return html;
        },

        _getDayHtml: function (date) {
           var content = this._getCellContents(date, 'day');

            return '<div class="' + content.classes + '" ' +
                'data-date="' + date.getDate() + '" ' +
                'data-month="' + date.getMonth() + '" ' +
                'data-year="' + date.getFullYear() + '">' + content.html + '</div>';
        },

        /**
         * Generates months html
         * @param {object} date - date instance
         * @returns {string}
         * @private
         */
        _getMonthsHtml: function (date) {
            var html = '',
                d = dp.getParsedDate(date),
                i = 0;

            while(i < 12) {
                html += this._getMonthHtml(new Date(d.year, i));
                i++
            }

            return html;
        },

        _getMonthHtml: function (date) {
            var content = this._getCellContents(date, 'month');

            return '<div class="' + content.classes + '" data-month="' + date.getMonth() + '">' + content.html + '</div>'
        },

        _getYearsHtml: function (date) {
            var d = dp.getParsedDate(date),
                decade = dp.getDecade(date),
                firstYear = decade[0] - 1,
                html = '',
                i = firstYear;

            for (i; i <= decade[1] + 1; i++) {
                html += this._getYearHtml(new Date(i , 0));
            }

            return html;
        },

        _getYearHtml: function (date) {
            var content = this._getCellContents(date, 'year');

            return '<div class="' + content.classes + '" data-year="' + date.getFullYear() + '">' + content.html + '</div>'
        },

        _renderTypes: {
            days: function () {
                var dayNames = this._getDayNamesHtml(this.d.loc.firstDay),
                    days = this._getDaysHtml(this.d.currentDate);

                this.$cells.html(days);
                this.$names.html(dayNames)
            },
            months: function () {
                var html = this._getMonthsHtml(this.d.currentDate);

                this.$cells.html(html)
            },
            years: function () {
                var html = this._getYearsHtml(this.d.currentDate);

                this.$cells.html(html)
            }
        },

        _render: function () {
            if (this.opts.onlyTimepicker) return;
            this._renderTypes[this.type].bind(this)();
        },

        _update: function () {
            var $cells = $('.datepicker--cell', this.$cells),
                _this = this,
                classes,
                $cell,
                date;
            $cells.each(function (cell, i) {
                $cell = $(this);
                date = _this.d._getDateFromCell($(this));
                classes = _this._getCellContents(date, _this.d.cellType);
                $cell.attr('class',classes.classes)
            });
        },

        show: function () {
            if (this.opts.onlyTimepicker) return;
            this.$el.addClass('active');
            this.acitve = true;
        },

        hide: function () {
            this.$el.removeClass('active');
            this.active = false;
        },

        //  Events
        // -------------------------------------------------

        _handleClick: function (el) {
            var date = el.data('date') || 1,
                month = el.data('month') || 0,
                year = el.data('year') || this.d.parsedDate.year,
                dp = this.d;
            // Change view if min view does not reach yet
            if (dp.view != this.opts.minView) {
                dp.down(new Date(year, month, date));
                return;
            }
            // Select date if min view is reached
            var selectedDate = new Date(year, month, date),
                alreadySelected = this.d._isSelected(selectedDate, this.d.cellType);

            if (!alreadySelected) {
                dp._trigger('clickCell', selectedDate);
                return;
            }

            dp._handleAlreadySelectedDates.bind(dp, alreadySelected, selectedDate)();

        },

        _onClickCell: function (e) {
            var $el = $(e.target).closest('.datepicker--cell');

            if ($el.hasClass('-disabled-')) return;

            this._handleClick.bind(this)($el);
        }
    };
})();

;(function () {
    var template = '' +
        '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div>' +
        '<div class="datepicker--nav-title">#{title}</div>' +
        '<div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',
        buttonsContainerTemplate = '<div class="datepicker--buttons"></div>',
        button = '<span class="datepicker--button" data-action="#{action}">#{label}</span>',
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;

    datepicker.Navigation = function (d, opts) {
        this.d = d;
        this.opts = opts;

        this.$buttonsContainer = '';

        this.init();
    };

    datepicker.Navigation.prototype = {
        init: function () {
            this._buildBaseHtml();
            this._bindEvents();
        },

        _bindEvents: function () {
            this.d.$nav.on('click', '.datepicker--nav-action', $.proxy(this._onClickNavButton, this));
            this.d.$nav.on('click', '.datepicker--nav-title', $.proxy(this._onClickNavTitle, this));
            this.d.$datepicker.on('click', '.datepicker--button', $.proxy(this._onClickNavButton, this));
        },

        _buildBaseHtml: function () {
            if (!this.opts.onlyTimepicker) {
                this._render();
            }
            this._addButtonsIfNeed();
        },

        _addButtonsIfNeed: function () {
            if (this.opts.todayButton) {
                this._addButton('today')
            }
            if (this.opts.clearButton) {
                this._addButton('clear')
            }
        },

        _render: function () {
            var title = this._getTitle(this.d.currentDate),
                html = dp.template(template, $.extend({title: title}, this.opts));
            this.d.$nav.html(html);
            if (this.d.view == 'years') {
                $('.datepicker--nav-title', this.d.$nav).addClass('-disabled-');
            }
            this.setNavStatus();
        },

        _getTitle: function (date) {
            return this.d.formatDate(this.opts.navTitles[this.d.view], date)
        },

        _addButton: function (type) {
            if (!this.$buttonsContainer.length) {
                this._addButtonsContainer();
            }

            var data = {
                    action: type,
                    label: this.d.loc[type]
                },
                html = dp.template(button, data);

            if ($('[data-action=' + type + ']', this.$buttonsContainer).length) return;
            this.$buttonsContainer.append(html);
        },

        _addButtonsContainer: function () {
            this.d.$datepicker.append(buttonsContainerTemplate);
            this.$buttonsContainer = $('.datepicker--buttons', this.d.$datepicker);
        },

        setNavStatus: function () {
            if (!(this.opts.minDate || this.opts.maxDate) || !this.opts.disableNavWhenOutOfRange) return;

            var date = this.d.parsedDate,
                m = date.month,
                y = date.year,
                d = date.date;

            switch (this.d.view) {
                case 'days':
                    if (!this.d._isInRange(new Date(y, m-1, 1), 'month')) {
                        this._disableNav('prev')
                    }
                    if (!this.d._isInRange(new Date(y, m+1, 1), 'month')) {
                        this._disableNav('next')
                    }
                    break;
                case 'months':
                    if (!this.d._isInRange(new Date(y-1, m, d), 'year')) {
                        this._disableNav('prev')
                    }
                    if (!this.d._isInRange(new Date(y+1, m, d), 'year')) {
                        this._disableNav('next')
                    }
                    break;
                case 'years':
                    var decade = dp.getDecade(this.d.date);
                    if (!this.d._isInRange(new Date(decade[0] - 1, 0, 1), 'year')) {
                        this._disableNav('prev')
                    }
                    if (!this.d._isInRange(new Date(decade[1] + 1, 0, 1), 'year')) {
                        this._disableNav('next')
                    }
                    break;
            }
        },

        _disableNav: function (nav) {
            $('[data-action="' + nav + '"]', this.d.$nav).addClass('-disabled-')
        },

        _activateNav: function (nav) {
            $('[data-action="' + nav + '"]', this.d.$nav).removeClass('-disabled-')
        },

        _onClickNavButton: function (e) {
            var $el = $(e.target).closest('[data-action]'),
                action = $el.data('action');

            this.d[action]();
        },

        _onClickNavTitle: function (e) {
            if ($(e.target).hasClass('-disabled-')) return;

            if (this.d.view == 'days') {
                return this.d.view = 'months'
            }

            this.d.view = 'years';
        }
    }

})();

;(function () {
    var template = '<div class="datepicker--time">' +
        '<div class="datepicker--time-current">' +
        '   <span class="datepicker--time-current-hours">#{hourVisible}</span>' +
        '   <span class="datepicker--time-current-colon">:</span>' +
        '   <span class="datepicker--time-current-minutes">#{minValue}</span>' +
        '</div>' +
        '<div class="datepicker--time-sliders">' +
        '   <div class="datepicker--time-row">' +
        '      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>' +
        '   </div>' +
        '   <div class="datepicker--time-row">' +
        '      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>' +
        '   </div>' +
        '</div>' +
        '</div>',
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;

    datepicker.Timepicker = function (inst, opts) {
        this.d = inst;
        this.opts = opts;

        this.init();
    };

    datepicker.Timepicker.prototype = {
        init: function () {
            var input = 'input';
            this._setTime(this.d.date);
            this._buildHTML();

            if (navigator.userAgent.match(/trident/gi)) {
                input = 'change';
            }

            this.d.$el.on('selectDate', this._onSelectDate.bind(this));
            this.$ranges.on(input, this._onChangeRange.bind(this));
            this.$ranges.on('mouseup', this._onMouseUpRange.bind(this));
            this.$ranges.on('mousemove focus ', this._onMouseEnterRange.bind(this));
            this.$ranges.on('mouseout blur', this._onMouseOutRange.bind(this));
        },

        _setTime: function (date) {
            var _date = dp.getParsedDate(date);

            this._handleDate(date);
            this.hours = _date.hours < this.minHours ? this.minHours : _date.hours;
            this.minutes = _date.minutes < this.minMinutes ? this.minMinutes : _date.minutes;
        },

        /**
         * Sets minHours and minMinutes from date (usually it's a minDate)
         * Also changes minMinutes if current hours are bigger then @date hours
         * @param date {Date}
         * @private
         */
        _setMinTimeFromDate: function (date) {
            this.minHours = date.getHours();
            this.minMinutes = date.getMinutes();

            // If, for example, min hours are 10, and current hours are 12,
            // update minMinutes to default value, to be able to choose whole range of values
            if (this.d.lastSelectedDate) {
                if (this.d.lastSelectedDate.getHours() > date.getHours()) {
                    this.minMinutes = this.opts.minMinutes;
                }
            }
        },

        _setMaxTimeFromDate: function (date) {
            this.maxHours = date.getHours();
            this.maxMinutes = date.getMinutes();

            if (this.d.lastSelectedDate) {
                if (this.d.lastSelectedDate.getHours() < date.getHours()) {
                    this.maxMinutes = this.opts.maxMinutes;
                }
            }
        },

        _setDefaultMinMaxTime: function () {
            var maxHours = 23,
                maxMinutes = 59,
                opts = this.opts;

            this.minHours = opts.minHours < 0 || opts.minHours > maxHours ? 0 : opts.minHours;
            this.minMinutes = opts.minMinutes < 0 || opts.minMinutes > maxMinutes ? 0 : opts.minMinutes;
            this.maxHours = opts.maxHours < 0 || opts.maxHours > maxHours ? maxHours : opts.maxHours;
            this.maxMinutes = opts.maxMinutes < 0 || opts.maxMinutes > maxMinutes ? maxMinutes : opts.maxMinutes;
        },

        /**
         * Looks for min/max hours/minutes and if current values
         * are out of range sets valid values.
         * @private
         */
        _validateHoursMinutes: function (date) {
            if (this.hours < this.minHours) {
                this.hours = this.minHours;
            } else if (this.hours > this.maxHours) {
                this.hours = this.maxHours;
            }

            if (this.minutes < this.minMinutes) {
                this.minutes = this.minMinutes;
            } else if (this.minutes > this.maxMinutes) {
                this.minutes = this.maxMinutes;
            }
        },

        _buildHTML: function () {
            var lz = dp.getLeadingZeroNum,
                data = {
                    hourMin: this.minHours,
                    hourMax: lz(this.maxHours),
                    hourStep: this.opts.hoursStep,
                    hourValue: this.hours,
                    hourVisible: lz(this.displayHours),
                    minMin: this.minMinutes,
                    minMax: lz(this.maxMinutes),
                    minStep: this.opts.minutesStep,
                    minValue: lz(this.minutes)
                },
                _template = dp.template(template, data);

            this.$timepicker = $(_template).appendTo(this.d.$datepicker);
            this.$ranges = $('[type="range"]', this.$timepicker);
            this.$hours = $('[name="hours"]', this.$timepicker);
            this.$minutes = $('[name="minutes"]', this.$timepicker);
            this.$hoursText = $('.datepicker--time-current-hours', this.$timepicker);
            this.$minutesText = $('.datepicker--time-current-minutes', this.$timepicker);

            if (this.d.ampm) {
                this.$ampm = $('<span class="datepicker--time-current-ampm">')
                    .appendTo($('.datepicker--time-current', this.$timepicker))
                    .html(this.dayPeriod);

                this.$timepicker.addClass('-am-pm-');
            }
        },

        _updateCurrentTime: function () {
            var h =  dp.getLeadingZeroNum(this.displayHours),
                m = dp.getLeadingZeroNum(this.minutes);

            this.$hoursText.html(h);
            this.$minutesText.html(m);

            if (this.d.ampm) {
                this.$ampm.html(this.dayPeriod);
            }
        },

        _updateRanges: function () {
            this.$hours.attr({
                min: this.minHours,
                max: this.maxHours
            }).val(this.hours);

            this.$minutes.attr({
                min: this.minMinutes,
                max: this.maxMinutes
            }).val(this.minutes)
        },

        /**
         * Sets minHours, minMinutes etc. from date. If date is not passed, than sets
         * values from options
         * @param [date] {object} - Date object, to get values from
         * @private
         */
        _handleDate: function (date) {
            this._setDefaultMinMaxTime();
            if (date) {
                if (dp.isSame(date, this.d.opts.minDate)) {
                    this._setMinTimeFromDate(this.d.opts.minDate);
                } else if (dp.isSame(date, this.d.opts.maxDate)) {
                    this._setMaxTimeFromDate(this.d.opts.maxDate);
                }
            }

            this._validateHoursMinutes(date);
        },

        update: function () {
            this._updateRanges();
            this._updateCurrentTime();
        },

        /**
         * Calculates valid hour value to display in text input and datepicker's body.
         * @param date {Date|Number} - date or hours
         * @param [ampm] {Boolean} - 12 hours mode
         * @returns {{hours: *, dayPeriod: string}}
         * @private
         */
        _getValidHoursFromDate: function (date, ampm) {
            var d = date,
                hours = date;

            if (date instanceof Date) {
                d = dp.getParsedDate(date);
                hours = d.hours;
            }

            var _ampm = ampm || this.d.ampm,
                dayPeriod = 'am';

            if (_ampm) {
                switch(true) {
                    case hours == 0:
                        hours = 12;
                        break;
                    case hours == 12:
                        dayPeriod = 'pm';
                        break;
                    case hours > 11:
                        hours = hours - 12;
                        dayPeriod = 'pm';
                        break;
                    default:
                        break;
                }
            }

            return {
                hours: hours,
                dayPeriod: dayPeriod
            }
        },

        set hours (val) {
            this._hours = val;

            var displayHours = this._getValidHoursFromDate(val);

            this.displayHours = displayHours.hours;
            this.dayPeriod = displayHours.dayPeriod;
        },

        get hours() {
            return this._hours;
        },

        //  Events
        // -------------------------------------------------

        _onChangeRange: function (e) {
            var $target = $(e.target),
                name = $target.attr('name');
            
            this.d.timepickerIsActive = true;

            this[name] = $target.val();
            this._updateCurrentTime();
            this.d._trigger('timeChange', [this.hours, this.minutes]);

            this._handleDate(this.d.lastSelectedDate);
            this.update()
        },

        _onSelectDate: function (e, data) {
            this._handleDate(data);
            this.update();
        },

        _onMouseEnterRange: function (e) {
            var name = $(e.target).attr('name');
            $('.datepicker--time-current-' + name, this.$timepicker).addClass('-focus-');
        },

        _onMouseOutRange: function (e) {
            var name = $(e.target).attr('name');
            if (this.d.inFocus) return; // Prevent removing focus when mouse out of range slider
            $('.datepicker--time-current-' + name, this.$timepicker).removeClass('-focus-');
        },

        _onMouseUpRange: function (e) {
            this.d.timepickerIsActive = false;
        }
    };
})();
 })(window, jQuery);
$(document).ready(function () {
    $("[data-target=hide-show]").on("click", function () {
        const input = $(this).siblings(".input__control");

        $(this).toggleClass("input__eye_off");
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
    var isFirefox = /firefox/i.test(navigator.userAgent);
    document.addEventListener(
        isFirefox ? "DOMMouseScroll" : "mousewheel",
        function (event) {
            var nodeName = event.target.nodeName.toLowerCase();
            if (nodeName === "input" && $(event.target).attr("type").toLowerCase() === "number") {
                event.preventDefault();
            }
        },
        { passive: false }
    );
});

/*!
 * dist/jquery.inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2020 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.6-beta.15
 */
!(function webpackUniversalModuleDefinition(root, factory) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = factory(root.jQuery);
    else if ("function" == typeof define && define.amd) define(["jquery"], factory);
    else {
        var a = "object" == typeof exports ? factory(require("jquery")) : factory(root.jQuery);
        for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i];
    }
})(window, function (__WEBPACK_EXTERNAL_MODULE__8__) {
    return (
        (modules = [
            function (module) {
                module.exports = JSON.parse(
                    '{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17,"KEY_229":229}'
                );
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.default = void 0),
                    __webpack_require__(16),
                    __webpack_require__(17);
                var _mask = __webpack_require__(9),
                    _inputmask = _interopRequireDefault(__webpack_require__(11)),
                    _window = _interopRequireDefault(__webpack_require__(12)),
                    _maskLexer = __webpack_require__(18),
                    _validationTests = __webpack_require__(3),
                    _positioning = __webpack_require__(2),
                    _validation = __webpack_require__(4),
                    _inputHandling = __webpack_require__(5),
                    _eventruler = __webpack_require__(10),
                    _definitions = _interopRequireDefault(__webpack_require__(19)),
                    _defaults = _interopRequireDefault(__webpack_require__(20));
                function _typeof(obj) {
                    return (
                        (_typeof =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function _typeof(obj) {
                                      return typeof obj;
                                  }
                                : function _typeof(obj) {
                                      return obj &&
                                          "function" == typeof Symbol &&
                                          obj.constructor === Symbol &&
                                          obj !== Symbol.prototype
                                          ? "symbol"
                                          : typeof obj;
                                  }),
                        _typeof(obj)
                    );
                }
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                var document = _window.default.document,
                    dataKey = "_inputmask_opts";
                function Inputmask(alias, options, internal) {
                    if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
                    (this.dependencyLib = _inputmask.default),
                        (this.el = void 0),
                        (this.events = {}),
                        (this.maskset = void 0),
                        !0 !== internal &&
                            ("[object Object]" === Object.prototype.toString.call(alias)
                                ? (options = alias)
                                : ((options = options || {}), alias && (options.alias = alias)),
                            (this.opts = _inputmask.default.extend(!0, {}, this.defaults, options)),
                            (this.noMasksCache = options && void 0 !== options.definitions),
                            (this.userOptions = options || {}),
                            resolveAlias(this.opts.alias, options, this.opts)),
                        (this.refreshValue = !1),
                        (this.undoValue = void 0),
                        (this.$el = void 0),
                        (this.skipKeyPressEvent = !1),
                        (this.skipInputEvent = !1),
                        (this.validationEvent = !1),
                        (this.ignorable = !1),
                        this.maxLength,
                        (this.mouseEnter = !1),
                        (this.originalPlaceholder = void 0),
                        (this.isComposing = !1);
                }
                function resolveAlias(aliasStr, options, opts) {
                    var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
                    return aliasDefinition
                        ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts),
                          _inputmask.default.extend(!0, opts, aliasDefinition),
                          _inputmask.default.extend(!0, opts, options),
                          !0)
                        : (null === opts.mask && (opts.mask = aliasStr), !1);
                }
                function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
                    function importOption(option, optionData) {
                        var attrOption = "" === dataAttribute ? option : dataAttribute + "-" + option;
                        (optionData = void 0 !== optionData ? optionData : npt.getAttribute(attrOption)),
                            null !== optionData &&
                                ("string" == typeof optionData &&
                                    (0 === option.indexOf("on")
                                        ? (optionData = _window.default[optionData])
                                        : "false" === optionData
                                        ? (optionData = !1)
                                        : "true" === optionData && (optionData = !0)),
                                (userOptions[option] = optionData));
                    }
                    if (!0 === opts.importDataAttributes) {
                        var attrOptions = npt.getAttribute(dataAttribute),
                            option,
                            dataoptions,
                            optionData,
                            p;
                        if (
                            (attrOptions &&
                                "" !== attrOptions &&
                                ((attrOptions = attrOptions.replace(/'/g, '"')),
                                (dataoptions = JSON.parse("{" + attrOptions + "}"))),
                            dataoptions)
                        )
                            for (p in ((optionData = void 0), dataoptions))
                                if ("alias" === p.toLowerCase()) {
                                    optionData = dataoptions[p];
                                    break;
                                }
                        for (option in (importOption("alias", optionData),
                        userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts),
                        opts)) {
                            if (dataoptions)
                                for (p in ((optionData = void 0), dataoptions))
                                    if (p.toLowerCase() === option.toLowerCase()) {
                                        optionData = dataoptions[p];
                                        break;
                                    }
                            importOption(option, optionData);
                        }
                    }
                    return (
                        _inputmask.default.extend(!0, opts, userOptions),
                        ("rtl" !== npt.dir && !opts.rightAlign) || (npt.style.textAlign = "right"),
                        ("rtl" !== npt.dir && !opts.numericInput) ||
                            ((npt.dir = "ltr"), npt.removeAttribute("dir"), (opts.isRTL = !0)),
                        Object.keys(userOptions).length
                    );
                }
                (Inputmask.prototype = {
                    dataAttribute: "data-inputmask",
                    defaults: _defaults.default,
                    definitions: _definitions.default,
                    aliases: {},
                    masksCache: {},
                    get isRTL() {
                        return this.opts.isRTL || this.opts.numericInput;
                    },
                    mask: function mask(elems) {
                        var that = this;
                        return (
                            "string" == typeof elems &&
                                (elems = document.getElementById(elems) || document.querySelectorAll(elems)),
                            (elems = elems.nodeName ? [elems] : Array.isArray(elems) ? elems : Array.from(elems)),
                            elems.forEach(function (el, ndx) {
                                var scopedOpts = _inputmask.default.extend(!0, {}, that.opts);
                                if (
                                    importAttributeOptions(
                                        el,
                                        scopedOpts,
                                        _inputmask.default.extend(!0, {}, that.userOptions),
                                        that.dataAttribute
                                    )
                                ) {
                                    var maskset = (0, _maskLexer.generateMaskSet)(scopedOpts, that.noMasksCache);
                                    void 0 !== maskset &&
                                        (void 0 !== el.inputmask &&
                                            ((el.inputmask.opts.autoUnmask = !0), el.inputmask.remove()),
                                        (el.inputmask = new Inputmask(void 0, void 0, !0)),
                                        (el.inputmask.opts = scopedOpts),
                                        (el.inputmask.noMasksCache = that.noMasksCache),
                                        (el.inputmask.userOptions = _inputmask.default.extend(
                                            !0,
                                            {},
                                            that.userOptions
                                        )),
                                        (el.inputmask.el = el),
                                        (el.inputmask.$el = (0, _inputmask.default)(el)),
                                        (el.inputmask.maskset = maskset),
                                        _inputmask.default.data(el, dataKey, that.userOptions),
                                        _mask.mask.call(el.inputmask));
                                }
                            }),
                            (elems && elems[0] && elems[0].inputmask) || this
                        );
                    },
                    option: function option(options, noremask) {
                        return "string" == typeof options
                            ? this.opts[options]
                            : "object" === _typeof(options)
                            ? (_inputmask.default.extend(this.userOptions, options),
                              this.el && !0 !== noremask && this.mask(this.el),
                              this)
                            : void 0;
                    },
                    unmaskedvalue: function unmaskedvalue(value) {
                        if (
                            ((this.maskset =
                                this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache)),
                            void 0 === this.el || void 0 !== value)
                        ) {
                            var valueBuffer = (
                                ("function" == typeof this.opts.onBeforeMask &&
                                    this.opts.onBeforeMask.call(this, value, this.opts)) ||
                                value
                            ).split("");
                            _inputHandling.checkVal.call(this, void 0, !1, !1, valueBuffer),
                                "function" == typeof this.opts.onBeforeWrite &&
                                    this.opts.onBeforeWrite.call(
                                        this,
                                        void 0,
                                        _positioning.getBuffer.call(this),
                                        0,
                                        this.opts
                                    );
                        }
                        return _inputHandling.unmaskedvalue.call(this, this.el);
                    },
                    remove: function remove() {
                        if (this.el) {
                            _inputmask.default.data(this.el, dataKey, null);
                            var cv = this.opts.autoUnmask
                                    ? (0, _inputHandling.unmaskedvalue)(this.el)
                                    : this._valueGet(this.opts.autoUnmask),
                                valueProperty;
                            cv !== _positioning.getBufferTemplate.call(this).join("")
                                ? this._valueSet(cv, this.opts.autoUnmask)
                                : this._valueSet(""),
                                _eventruler.EventRuler.off(this.el),
                                Object.getOwnPropertyDescriptor && Object.getPrototypeOf
                                    ? ((valueProperty = Object.getOwnPropertyDescriptor(
                                          Object.getPrototypeOf(this.el),
                                          "value"
                                      )),
                                      valueProperty &&
                                          this.__valueGet &&
                                          Object.defineProperty(this.el, "value", {
                                              get: this.__valueGet,
                                              set: this.__valueSet,
                                              configurable: !0,
                                          }))
                                    : document.__lookupGetter__ &&
                                      this.el.__lookupGetter__("value") &&
                                      this.__valueGet &&
                                      (this.el.__defineGetter__("value", this.__valueGet),
                                      this.el.__defineSetter__("value", this.__valueSet)),
                                (this.el.inputmask = void 0);
                        }
                        return this.el;
                    },
                    getemptymask: function getemptymask() {
                        return (
                            (this.maskset =
                                this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache)),
                            _positioning.getBufferTemplate.call(this).join("")
                        );
                    },
                    hasMaskedValue: function hasMaskedValue() {
                        return !this.opts.autoUnmask;
                    },
                    isComplete: function isComplete() {
                        return (
                            (this.maskset =
                                this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache)),
                            _validation.isComplete.call(this, _positioning.getBuffer.call(this))
                        );
                    },
                    getmetadata: function getmetadata() {
                        if (
                            ((this.maskset =
                                this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache)),
                            Array.isArray(this.maskset.metadata))
                        ) {
                            var maskTarget = _validationTests.getMaskTemplate.call(this, !0, 0, !1).join("");
                            return (
                                this.maskset.metadata.forEach(function (mtdt) {
                                    return mtdt.mask !== maskTarget || ((maskTarget = mtdt), !1);
                                }),
                                maskTarget
                            );
                        }
                        return this.maskset.metadata;
                    },
                    isValid: function isValid(value) {
                        if (
                            ((this.maskset =
                                this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache)),
                            value)
                        ) {
                            var valueBuffer = (
                                ("function" == typeof this.opts.onBeforeMask &&
                                    this.opts.onBeforeMask.call(this, value, this.opts)) ||
                                value
                            ).split("");
                            _inputHandling.checkVal.call(this, void 0, !0, !1, valueBuffer);
                        } else
                            value = this.isRTL
                                ? _positioning.getBuffer.call(this).slice().reverse().join("")
                                : _positioning.getBuffer.call(this).join("");
                        for (
                            var buffer = _positioning.getBuffer.call(this),
                                rl = _positioning.determineLastRequiredPosition.call(this),
                                lmib = buffer.length - 1;
                            rl < lmib && !_positioning.isMask.call(this, lmib);
                            lmib--
                        );
                        return (
                            buffer.splice(rl, lmib + 1 - rl),
                            _validation.isComplete.call(this, buffer) &&
                                value ===
                                    (this.isRTL
                                        ? _positioning.getBuffer.call(this).slice().reverse().join("")
                                        : _positioning.getBuffer.call(this).join(""))
                        );
                    },
                    format: function format(value, metadata) {
                        this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);
                        var valueBuffer = (
                            ("function" == typeof this.opts.onBeforeMask &&
                                this.opts.onBeforeMask.call(this, value, this.opts)) ||
                            value
                        ).split("");
                        _inputHandling.checkVal.call(this, void 0, !0, !1, valueBuffer);
                        var formattedValue = this.isRTL
                            ? _positioning.getBuffer.call(this).slice().reverse().join("")
                            : _positioning.getBuffer.call(this).join("");
                        return metadata
                            ? {
                                  value: formattedValue,
                                  metadata: this.getmetadata(),
                              }
                            : formattedValue;
                    },
                    setValue: function setValue(value) {
                        this.el && (0, _inputmask.default)(this.el).trigger("setvalue", [value]);
                    },
                    analyseMask: _maskLexer.analyseMask,
                }),
                    (Inputmask.extendDefaults = function (options) {
                        _inputmask.default.extend(!0, Inputmask.prototype.defaults, options);
                    }),
                    (Inputmask.extendDefinitions = function (definition) {
                        _inputmask.default.extend(!0, Inputmask.prototype.definitions, definition);
                    }),
                    (Inputmask.extendAliases = function (alias) {
                        _inputmask.default.extend(!0, Inputmask.prototype.aliases, alias);
                    }),
                    (Inputmask.format = function (value, options, metadata) {
                        return Inputmask(options).format(value, metadata);
                    }),
                    (Inputmask.unmask = function (value, options) {
                        return Inputmask(options).unmaskedvalue(value);
                    }),
                    (Inputmask.isValid = function (value, options) {
                        return Inputmask(options).isValid(value);
                    }),
                    (Inputmask.remove = function (elems) {
                        "string" == typeof elems &&
                            (elems = document.getElementById(elems) || document.querySelectorAll(elems)),
                            (elems = elems.nodeName ? [elems] : elems),
                            elems.forEach(function (el) {
                                el.inputmask && el.inputmask.remove();
                            });
                    }),
                    (Inputmask.setValue = function (elems, value) {
                        "string" == typeof elems &&
                            (elems = document.getElementById(elems) || document.querySelectorAll(elems)),
                            (elems = elems.nodeName ? [elems] : elems),
                            elems.forEach(function (el) {
                                el.inputmask
                                    ? el.inputmask.setValue(value)
                                    : (0, _inputmask.default)(el).trigger("setvalue", [value]);
                            });
                    }),
                    (Inputmask.dependencyLib = _inputmask.default),
                    (_window.default.Inputmask = Inputmask);
                var _default = Inputmask;
                exports.default = _default;
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.caret = caret),
                    (exports.determineLastRequiredPosition = determineLastRequiredPosition),
                    (exports.determineNewCaretPosition = determineNewCaretPosition),
                    (exports.getBuffer = getBuffer),
                    (exports.getBufferTemplate = getBufferTemplate),
                    (exports.getLastValidPosition = getLastValidPosition),
                    (exports.isMask = isMask),
                    (exports.resetMaskSet = resetMaskSet),
                    (exports.seekNext = seekNext),
                    (exports.seekPrevious = seekPrevious),
                    (exports.translatePosition = translatePosition);
                var _validationTests = __webpack_require__(3),
                    _validation = __webpack_require__(4),
                    _mask = __webpack_require__(9);
                function caret(input, begin, end, notranslate, isDelete) {
                    var inputmask = this,
                        opts = this.opts,
                        range;
                    if (void 0 === begin)
                        return (
                            "selectionStart" in input && "selectionEnd" in input
                                ? ((begin = input.selectionStart), (end = input.selectionEnd))
                                : window.getSelection
                                ? ((range = window.getSelection().getRangeAt(0)),
                                  (range.commonAncestorContainer.parentNode !== input &&
                                      range.commonAncestorContainer !== input) ||
                                      ((begin = range.startOffset), (end = range.endOffset)))
                                : document.selection &&
                                  document.selection.createRange &&
                                  ((range = document.selection.createRange()),
                                  (begin =
                                      0 -
                                      range.duplicate().moveStart("character", -input.inputmask._valueGet().length)),
                                  (end = begin + range.text.length)),
                            {
                                begin: notranslate ? begin : translatePosition.call(this, begin),
                                end: notranslate ? end : translatePosition.call(this, end),
                            }
                        );
                    if (
                        (Array.isArray(begin) &&
                            ((end = this.isRTL ? begin[0] : begin[1]), (begin = this.isRTL ? begin[1] : begin[0])),
                        void 0 !== begin.begin &&
                            ((end = this.isRTL ? begin.begin : begin.end),
                            (begin = this.isRTL ? begin.end : begin.begin)),
                        "number" == typeof begin)
                    ) {
                        (begin = notranslate ? begin : translatePosition.call(this, begin)),
                            (end = notranslate ? end : translatePosition.call(this, end)),
                            (end = "number" == typeof end ? end : begin);
                        var scrollCalc =
                            parseInt(
                                ((input.ownerDocument.defaultView || window).getComputedStyle
                                    ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null)
                                    : input.currentStyle
                                ).fontSize
                            ) * end;
                        if (
                            ((input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0),
                            (input.inputmask.caretPos = {
                                begin: begin,
                                end: end,
                            }),
                            opts.insertModeVisual && !1 === opts.insertMode && begin === end && (isDelete || end++),
                            input === (input.inputmask.shadowRoot || document).activeElement)
                        )
                            if ("setSelectionRange" in input) input.setSelectionRange(begin, end);
                            else if (window.getSelection) {
                                if (
                                    ((range = document.createRange()),
                                    void 0 === input.firstChild || null === input.firstChild)
                                ) {
                                    var textNode = document.createTextNode("");
                                    input.appendChild(textNode);
                                }
                                range.setStart(
                                    input.firstChild,
                                    begin < input.inputmask._valueGet().length
                                        ? begin
                                        : input.inputmask._valueGet().length
                                ),
                                    range.setEnd(
                                        input.firstChild,
                                        end < input.inputmask._valueGet().length
                                            ? end
                                            : input.inputmask._valueGet().length
                                    ),
                                    range.collapse(!0);
                                var sel = window.getSelection();
                                sel.removeAllRanges(), sel.addRange(range);
                            } else
                                input.createTextRange &&
                                    ((range = input.createTextRange()),
                                    range.collapse(!0),
                                    range.moveEnd("character", end),
                                    range.moveStart("character", begin),
                                    range.select());
                    }
                }
                function determineLastRequiredPosition(returnDefinition) {
                    var inputmask = this,
                        maskset = this.maskset,
                        $ = this.dependencyLib,
                        buffer = _validationTests.getMaskTemplate.call(
                            this,
                            !0,
                            getLastValidPosition.call(this),
                            !0,
                            !0
                        ),
                        bl = buffer.length,
                        pos,
                        lvp = getLastValidPosition.call(this),
                        positions = {},
                        lvTest = maskset.validPositions[lvp],
                        ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0,
                        testPos;
                    for (pos = lvp + 1; pos < buffer.length; pos++)
                        (testPos = _validationTests.getTestTemplate.call(this, pos, ndxIntlzr, pos - 1)),
                            (ndxIntlzr = testPos.locator.slice()),
                            (positions[pos] = $.extend(!0, {}, testPos));
                    var lvTestAlt =
                        lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
                    for (
                        pos = bl - 1;
                        lvp < pos &&
                        ((testPos = positions[pos]),
                        (testPos.match.optionality ||
                            (testPos.match.optionalQuantifier && testPos.match.newBlockMarker) ||
                            (lvTestAlt &&
                                ((lvTestAlt !== positions[pos].locator[lvTest.alternation] &&
                                    1 != testPos.match.static) ||
                                    (!0 === testPos.match.static &&
                                        testPos.locator[lvTest.alternation] &&
                                        _validation.checkAlternationMatch.call(
                                            this,
                                            testPos.locator[lvTest.alternation].toString().split(","),
                                            lvTestAlt.toString().split(",")
                                        ) &&
                                        "" !== _validationTests.getTests.call(this, pos)[0].def)))) &&
                            buffer[pos] === _validationTests.getPlaceholder.call(this, pos, testPos.match));
                        pos--
                    )
                        bl--;
                    return returnDefinition
                        ? {
                              l: bl,
                              def: positions[bl] ? positions[bl].match : void 0,
                          }
                        : bl;
                }
                function determineNewCaretPosition(selectedCaret, tabbed) {
                    var inputmask = this,
                        maskset = this.maskset,
                        opts = this.opts;
                    function doRadixFocus(clickPos) {
                        if ("" !== opts.radixPoint && 0 !== opts.digits) {
                            var vps = maskset.validPositions;
                            if (
                                void 0 === vps[clickPos] ||
                                vps[clickPos].input === _validationTests.getPlaceholder.call(inputmask, clickPos)
                            ) {
                                if (clickPos < seekNext.call(inputmask, -1)) return !0;
                                var radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
                                if (-1 !== radixPos) {
                                    for (var vp in vps)
                                        if (
                                            vps[vp] &&
                                            radixPos < vp &&
                                            vps[vp].input !== _validationTests.getPlaceholder.call(inputmask, vp)
                                        )
                                            return !1;
                                    return !0;
                                }
                            }
                        }
                        return !1;
                    }
                    if (
                        (tabbed &&
                            (inputmask.isRTL
                                ? (selectedCaret.end = selectedCaret.begin)
                                : (selectedCaret.begin = selectedCaret.end)),
                        selectedCaret.begin === selectedCaret.end)
                    ) {
                        switch (opts.positionCaretOnClick) {
                            case "none":
                                break;

                            case "select":
                                selectedCaret = {
                                    begin: 0,
                                    end: getBuffer.call(inputmask).length,
                                };
                                break;

                            case "ignore":
                                selectedCaret.end = selectedCaret.begin = seekNext.call(
                                    inputmask,
                                    getLastValidPosition.call(inputmask)
                                );
                                break;

                            case "radixFocus":
                                if (doRadixFocus(selectedCaret.begin)) {
                                    var radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
                                    selectedCaret.end = selectedCaret.begin = opts.numericInput
                                        ? seekNext.call(inputmask, radixPos)
                                        : radixPos;
                                    break;
                                }

                            default:
                                var clickPosition = selectedCaret.begin,
                                    lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, !0),
                                    lastPosition = seekNext.call(
                                        inputmask,
                                        -1 !== lvclickPosition || isMask.call(inputmask, 0) ? lvclickPosition : -1
                                    );
                                if (clickPosition <= lastPosition)
                                    selectedCaret.end = selectedCaret.begin = isMask.call(
                                        inputmask,
                                        clickPosition,
                                        !1,
                                        !0
                                    )
                                        ? clickPosition
                                        : seekNext.call(inputmask, clickPosition);
                                else {
                                    var lvp = maskset.validPositions[lvclickPosition],
                                        tt = _validationTests.getTestTemplate.call(
                                            inputmask,
                                            lastPosition,
                                            lvp ? lvp.match.locator : void 0,
                                            lvp
                                        ),
                                        placeholder = _validationTests.getPlaceholder.call(
                                            inputmask,
                                            lastPosition,
                                            tt.match
                                        );
                                    if (
                                        ("" !== placeholder &&
                                            getBuffer.call(inputmask)[lastPosition] !== placeholder &&
                                            !0 !== tt.match.optionalQuantifier &&
                                            !0 !== tt.match.newBlockMarker) ||
                                        (!isMask.call(inputmask, lastPosition, opts.keepStatic, !0) &&
                                            tt.match.def === placeholder)
                                    ) {
                                        var newPos = seekNext.call(inputmask, lastPosition);
                                        (newPos <= clickPosition || clickPosition === lastPosition) &&
                                            (lastPosition = newPos);
                                    }
                                    selectedCaret.end = selectedCaret.begin = lastPosition;
                                }
                        }
                        return selectedCaret;
                    }
                }
                function getBuffer(noCache) {
                    var inputmask = this,
                        maskset = this.maskset;
                    return (
                        (void 0 !== maskset.buffer && !0 !== noCache) ||
                            ((maskset.buffer = _validationTests.getMaskTemplate.call(
                                this,
                                !0,
                                getLastValidPosition.call(this),
                                !0
                            )),
                            void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())),
                        maskset.buffer
                    );
                }
                function getBufferTemplate() {
                    var inputmask = this,
                        maskset = this.maskset;
                    return (
                        void 0 === maskset._buffer &&
                            ((maskset._buffer = _validationTests.getMaskTemplate.call(this, !1, 1)),
                            void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())),
                        maskset._buffer
                    );
                }
                function getLastValidPosition(closestTo, strict, validPositions) {
                    var maskset = this.maskset,
                        before = -1,
                        after = -1,
                        valids = validPositions || maskset.validPositions;
                    for (var posNdx in (void 0 === closestTo && (closestTo = -1), valids)) {
                        var psNdx = parseInt(posNdx);
                        valids[psNdx] &&
                            (strict || !0 !== valids[psNdx].generatedInput) &&
                            (psNdx <= closestTo && (before = psNdx), closestTo <= psNdx && (after = psNdx));
                    }
                    return -1 === before || before == closestTo
                        ? after
                        : -1 == after
                        ? before
                        : closestTo - before < after - closestTo
                        ? before
                        : after;
                }
                function isMask(pos, strict, fuzzy) {
                    var inputmask = this,
                        maskset = this.maskset,
                        test = _validationTests.getTestTemplate.call(this, pos).match;
                    if (
                        ("" === test.def && (test = _validationTests.getTest.call(this, pos).match), !0 !== test.static)
                    )
                        return test.fn;
                    if (
                        !0 === fuzzy &&
                        void 0 !== maskset.validPositions[pos] &&
                        !0 !== maskset.validPositions[pos].generatedInput
                    )
                        return !0;
                    if (!0 !== strict && -1 < pos) {
                        if (fuzzy) {
                            var tests = _validationTests.getTests.call(this, pos);
                            return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
                        }
                        var testTemplate = _validationTests.determineTestTemplate.call(
                                this,
                                pos,
                                _validationTests.getTests.call(this, pos)
                            ),
                            testPlaceHolder = _validationTests.getPlaceholder.call(this, pos, testTemplate.match);
                        return testTemplate.match.def !== testPlaceHolder;
                    }
                    return !1;
                }
                function resetMaskSet(soft) {
                    var maskset = this.maskset;
                    (maskset.buffer = void 0), !0 !== soft && ((maskset.validPositions = {}), (maskset.p = 0));
                }
                function seekNext(pos, newBlock, fuzzy) {
                    var inputmask = this;
                    void 0 === fuzzy && (fuzzy = !0);
                    for (
                        var position = pos + 1;
                        "" !== _validationTests.getTest.call(this, position).match.def &&
                        ((!0 === newBlock &&
                            (!0 !== _validationTests.getTest.call(this, position).match.newBlockMarker ||
                                !isMask.call(this, position, void 0, !0))) ||
                            (!0 !== newBlock && !isMask.call(this, position, void 0, fuzzy)));

                    )
                        position++;
                    return position;
                }
                function seekPrevious(pos, newBlock) {
                    var inputmask = this,
                        position = pos - 1;
                    if (pos <= 0) return 0;
                    for (
                        ;
                        0 < position &&
                        ((!0 === newBlock &&
                            (!0 !== _validationTests.getTest.call(this, position).match.newBlockMarker ||
                                !isMask.call(this, position, void 0, !0))) ||
                            (!0 !== newBlock && !isMask.call(this, position, void 0, !0)));

                    )
                        position--;
                    return position;
                }
                function translatePosition(pos) {
                    var inputmask = this,
                        opts = this.opts,
                        el = this.el;
                    return (
                        !this.isRTL ||
                            "number" != typeof pos ||
                            (opts.greedy && "" === opts.placeholder) ||
                            !el ||
                            (pos = this._valueGet().length - pos),
                        pos
                    );
                }
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                function getLocator(tst, align) {
                    var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
                    if ("" !== locator) for (; locator.length < align; ) locator += "0";
                    return locator;
                }
                function getDecisionTaker(tst) {
                    var decisionTaker = tst.locator[tst.alternation];
                    return (
                        "string" == typeof decisionTaker &&
                            0 < decisionTaker.length &&
                            (decisionTaker = decisionTaker.split(",")[0]),
                        void 0 !== decisionTaker ? decisionTaker.toString() : ""
                    );
                }
                function getPlaceholder(pos, test, returnPL) {
                    var inputmask = this,
                        opts = this.opts,
                        maskset = this.maskset;
                    if (
                        ((test = test || getTest.call(this, pos).match), void 0 !== test.placeholder || !0 === returnPL)
                    )
                        return "function" == typeof test.placeholder ? test.placeholder(opts) : test.placeholder;
                    if (!0 !== test.static) return opts.placeholder.charAt(pos % opts.placeholder.length);
                    if (-1 < pos && void 0 === maskset.validPositions[pos]) {
                        var tests = getTests.call(this, pos),
                            staticAlternations = [],
                            prevTest;
                        if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0))
                            for (var i = 0; i < tests.length; i++)
                                if (
                                    "" !== tests[i].match.def &&
                                    !0 !== tests[i].match.optionality &&
                                    !0 !== tests[i].match.optionalQuantifier &&
                                    (!0 === tests[i].match.static ||
                                        void 0 === prevTest ||
                                        !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) &&
                                    (staticAlternations.push(tests[i]),
                                    !0 === tests[i].match.static && (prevTest = tests[i]),
                                    1 < staticAlternations.length &&
                                        /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))
                                )
                                    return opts.placeholder.charAt(pos % opts.placeholder.length);
                    }
                    return test.def;
                }
                function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
                    var inputmask = this,
                        opts = this.opts,
                        maskset = this.maskset,
                        greedy = opts.greedy;
                    clearOptionalTail && (opts.greedy = !1), (minimalPos = minimalPos || 0);
                    var maskTemplate = [],
                        ndxIntlzr,
                        pos = 0,
                        test,
                        testPos,
                        jitRenderStatic;
                    do {
                        if (!0 === baseOnInput && maskset.validPositions[pos])
                            (testPos =
                                clearOptionalTail &&
                                !0 === maskset.validPositions[pos].match.optionality &&
                                void 0 === maskset.validPositions[pos + 1] &&
                                (!0 === maskset.validPositions[pos].generatedInput ||
                                    (maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos))
                                    ? determineTestTemplate.call(
                                          this,
                                          pos,
                                          getTests.call(this, pos, ndxIntlzr, pos - 1)
                                      )
                                    : maskset.validPositions[pos]),
                                (test = testPos.match),
                                (ndxIntlzr = testPos.locator.slice()),
                                maskTemplate.push(
                                    !0 === includeMode
                                        ? testPos.input
                                        : !1 === includeMode
                                        ? test.nativeDef
                                        : getPlaceholder.call(this, pos, test)
                                );
                        else {
                            (testPos = getTestTemplate.call(this, pos, ndxIntlzr, pos - 1)),
                                (test = testPos.match),
                                (ndxIntlzr = testPos.locator.slice());
                            var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
                            (jitRenderStatic =
                                (jitRenderStatic &&
                                    test.static &&
                                    test.def !== opts.groupSeparator &&
                                    null === test.fn) ||
                                (maskset.validPositions[pos - 1] &&
                                    test.static &&
                                    test.def !== opts.groupSeparator &&
                                    null === test.fn)),
                                jitRenderStatic ||
                                !1 === jitMasking ||
                                void 0 === jitMasking ||
                                ("number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking)
                                    ? maskTemplate.push(
                                          !1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test)
                                      )
                                    : (jitRenderStatic = !1);
                        }
                        pos++;
                    } while (
                        ((void 0 === this.maxLength || pos < this.maxLength) &&
                            (!0 !== test.static || "" !== test.def)) ||
                        pos < minimalPos
                    );
                    return (
                        "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(),
                        (!1 === includeMode && void 0 !== maskset.maskLength) || (maskset.maskLength = pos - 1),
                        (opts.greedy = greedy),
                        maskTemplate
                    );
                }
                function getTestTemplate(pos, ndxIntlzr, tstPs) {
                    var inputmask = this,
                        maskset = this.maskset;
                    return (
                        maskset.validPositions[pos] ||
                        determineTestTemplate.call(
                            this,
                            pos,
                            getTests.call(this, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs)
                        )
                    );
                }
                function determineTestTemplate(pos, tests) {
                    var inputmask = this,
                        opts = this.opts;
                    pos = 0 < pos ? pos - 1 : 0;
                    for (
                        var altTest = getTest.call(this, pos),
                            targetLocator = getLocator(altTest),
                            tstLocator,
                            closest,
                            bestMatch,
                            ndx = 0;
                        ndx < tests.length;
                        ndx++
                    ) {
                        var tst = tests[ndx];
                        tstLocator = getLocator(tst, targetLocator.length);
                        var distance = Math.abs(tstLocator - targetLocator);
                        (void 0 === closest ||
                            ("" !== tstLocator && distance < closest) ||
                            (bestMatch &&
                                !opts.greedy &&
                                bestMatch.match.optionality &&
                                "master" === bestMatch.match.newBlockMarker &&
                                (!tst.match.optionality || !tst.match.newBlockMarker)) ||
                            (bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier)) &&
                            ((closest = distance), (bestMatch = tst));
                    }
                    return bestMatch;
                }
                function getTest(pos, tests) {
                    var inputmask = this,
                        maskset = this.maskset;
                    return maskset.validPositions[pos]
                        ? maskset.validPositions[pos]
                        : (tests || getTests.call(this, pos))[0];
                }
                function getTests(pos, ndxIntlzr, tstPs) {
                    var inputmask = this,
                        $ = this.dependencyLib,
                        maskset = this.maskset,
                        opts = this.opts,
                        el = this.el,
                        maskTokens = maskset.maskToken,
                        testPos = ndxIntlzr ? tstPs : 0,
                        ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
                        matches = [],
                        insertStop = !1,
                        latestMatch,
                        cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
                    function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                        function handleMatch(match, loopNdx, quantifierRecurse) {
                            function isFirstMatch(latestMatch, tokenGroup) {
                                var firstMatch = 0 === tokenGroup.matches.indexOf(latestMatch);
                                return (
                                    firstMatch ||
                                        tokenGroup.matches.every(function (match, ndx) {
                                            return (
                                                !0 === match.isQuantifier
                                                    ? (firstMatch = isFirstMatch(
                                                          latestMatch,
                                                          tokenGroup.matches[ndx - 1]
                                                      ))
                                                    : Object.prototype.hasOwnProperty.call(match, "matches") &&
                                                      (firstMatch = isFirstMatch(latestMatch, match)),
                                                !firstMatch
                                            );
                                        }),
                                    firstMatch
                                );
                            }
                            function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                                var bestMatch, indexPos;
                                if (
                                    ((maskset.tests[pos] || maskset.validPositions[pos]) &&
                                        (maskset.tests[pos] || [maskset.validPositions[pos]]).every(function (
                                            lmnt,
                                            ndx
                                        ) {
                                            if (lmnt.mloc[alternateNdx]) return (bestMatch = lmnt), !1;
                                            var alternation =
                                                    void 0 !== targetAlternation ? targetAlternation : lmnt.alternation,
                                                ndxPos =
                                                    void 0 !== lmnt.locator[alternation]
                                                        ? lmnt.locator[alternation].toString().indexOf(alternateNdx)
                                                        : -1;
                                            return (
                                                (void 0 === indexPos || ndxPos < indexPos) &&
                                                    -1 !== ndxPos &&
                                                    ((bestMatch = lmnt), (indexPos = ndxPos)),
                                                !0
                                            );
                                        }),
                                    bestMatch)
                                ) {
                                    var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation],
                                        locator =
                                            bestMatch.mloc[alternateNdx] ||
                                            bestMatch.mloc[bestMatchAltIndex] ||
                                            bestMatch.locator;
                                    return locator.slice(
                                        (void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1
                                    );
                                }
                                return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0;
                            }
                            function isSubsetOf(source, target) {
                                function expand(pattern) {
                                    for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++)
                                        if ("-" === pattern.charAt(i))
                                            for (end = pattern.charCodeAt(i + 1); ++start < end; )
                                                expanded.push(String.fromCharCode(start));
                                        else (start = pattern.charCodeAt(i)), expanded.push(pattern.charAt(i));
                                    return expanded.join("");
                                }
                                return (
                                    source.match.def === target.match.nativeDef ||
                                    (!(
                                        !(
                                            opts.regex ||
                                            (source.match.fn instanceof RegExp && target.match.fn instanceof RegExp)
                                        ) ||
                                        !0 === source.match.static ||
                                        !0 === target.match.static
                                    ) &&
                                        -1 !==
                                            expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(
                                                expand(source.match.fn.toString().replace(/[[\]/]/g, ""))
                                            ))
                                );
                            }
                            function staticCanMatchDefinition(source, target) {
                                return (
                                    !0 === source.match.static &&
                                    !0 !== target.match.static &&
                                    target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1)
                                );
                            }
                            function setMergeLocators(targetMatch, altMatch) {
                                var alternationNdx = targetMatch.alternation,
                                    shouldMerge =
                                        void 0 === altMatch ||
                                        (alternationNdx === altMatch.alternation &&
                                            -1 ===
                                                targetMatch.locator[alternationNdx]
                                                    .toString()
                                                    .indexOf(altMatch.locator[alternationNdx]));
                                if (!shouldMerge && alternationNdx > altMatch.alternation)
                                    for (var i = altMatch.alternation; i < alternationNdx; i++)
                                        if (targetMatch.locator[i] !== altMatch.locator[i]) {
                                            (alternationNdx = i), (shouldMerge = !0);
                                            break;
                                        }
                                if (shouldMerge) {
                                    targetMatch.mloc = targetMatch.mloc || {};
                                    var locNdx = targetMatch.locator[alternationNdx];
                                    if (void 0 !== locNdx) {
                                        if (
                                            ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]),
                                            void 0 === targetMatch.mloc[locNdx] &&
                                                (targetMatch.mloc[locNdx] = targetMatch.locator.slice()),
                                            void 0 !== altMatch)
                                        ) {
                                            for (var ndx in altMatch.mloc)
                                                "string" == typeof ndx && (ndx = ndx.split(",")[0]),
                                                    void 0 === targetMatch.mloc[ndx] &&
                                                        (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                                            targetMatch.locator[alternationNdx] = Object.keys(targetMatch.mloc).join(
                                                ","
                                            );
                                        }
                                        return !0;
                                    }
                                    targetMatch.alternation = void 0;
                                }
                                return !1;
                            }
                            function isSameLevel(targetMatch, altMatch) {
                                if (targetMatch.locator.length !== altMatch.locator.length) return !1;
                                for (
                                    var locNdx = targetMatch.alternation + 1;
                                    locNdx < targetMatch.locator.length;
                                    locNdx++
                                )
                                    if (targetMatch.locator[locNdx] !== altMatch.locator[locNdx]) return !1;
                                return !0;
                            }
                            if (testPos > pos + opts._maxTestPos)
                                throw (
                                    "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " +
                                    maskset.mask
                                );
                            if (testPos === pos && void 0 === match.matches)
                                return (
                                    matches.push({
                                        match: match,
                                        locator: loopNdx.reverse(),
                                        cd: cacheDependency,
                                        mloc: {},
                                    }),
                                    !0
                                );
                            if (void 0 !== match.matches) {
                                if (match.isGroup && quantifierRecurse !== match) {
                                    if (
                                        ((match = handleMatch(
                                            maskToken.matches[maskToken.matches.indexOf(match) + 1],
                                            loopNdx,
                                            quantifierRecurse
                                        )),
                                        match)
                                    )
                                        return !0;
                                } else if (match.isOptional) {
                                    var optionalToken = match,
                                        mtchsNdx = matches.length;
                                    if (
                                        ((match = resolveTestFromToken(
                                            match,
                                            ndxInitializer,
                                            loopNdx,
                                            quantifierRecurse
                                        )),
                                        match)
                                    ) {
                                        if (
                                            (matches.forEach(function (mtch, ndx) {
                                                mtchsNdx <= ndx && (mtch.match.optionality = !0);
                                            }),
                                            (latestMatch = matches[matches.length - 1].match),
                                            void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken))
                                        )
                                            return !0;
                                        (insertStop = !0), (testPos = pos);
                                    }
                                } else if (match.isAlternator) {
                                    var alternateToken = match,
                                        malternateMatches = [],
                                        maltMatches,
                                        currentMatches = matches.slice(),
                                        loopNdxCnt = loopNdx.length,
                                        altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
                                    if (-1 === altIndex || "string" == typeof altIndex) {
                                        var currentPos = testPos,
                                            ndxInitializerClone = ndxInitializer.slice(),
                                            altIndexArr = [],
                                            amndx;
                                        if ("string" == typeof altIndex) altIndexArr = altIndex.split(",");
                                        else
                                            for (amndx = 0; amndx < alternateToken.matches.length; amndx++)
                                                altIndexArr.push(amndx.toString());
                                        if (void 0 !== maskset.excludes[pos]) {
                                            for (
                                                var altIndexArrClone = altIndexArr.slice(),
                                                    i = 0,
                                                    exl = maskset.excludes[pos].length;
                                                i < exl;
                                                i++
                                            ) {
                                                var excludeSet = maskset.excludes[pos][i].toString().split(":");
                                                loopNdx.length == excludeSet[1] &&
                                                    altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
                                            }
                                            0 === altIndexArr.length &&
                                                (delete maskset.excludes[pos], (altIndexArr = altIndexArrClone));
                                        }
                                        (!0 === opts.keepStatic ||
                                            (isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic)) &&
                                            (altIndexArr = altIndexArr.slice(0, 1));
                                        for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
                                            (amndx = parseInt(altIndexArr[ndx])),
                                                (matches = []),
                                                (ndxInitializer =
                                                    ("string" == typeof altIndex &&
                                                        resolveNdxInitializer(testPos, amndx, loopNdxCnt)) ||
                                                    ndxInitializerClone.slice()),
                                                alternateToken.matches[amndx] &&
                                                handleMatch(
                                                    alternateToken.matches[amndx],
                                                    [amndx].concat(loopNdx),
                                                    quantifierRecurse
                                                )
                                                    ? (match = !0)
                                                    : 0 === ndx && (unMatchedAlternation = !0),
                                                (maltMatches = matches.slice()),
                                                (testPos = currentPos),
                                                (matches = []);
                                            for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                                var altMatch = maltMatches[ndx1],
                                                    dropMatch = !1;
                                                (altMatch.match.jit = altMatch.match.jit || unMatchedAlternation),
                                                    (altMatch.alternation = altMatch.alternation || loopNdxCnt),
                                                    setMergeLocators(altMatch);
                                                for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                                    var altMatch2 = malternateMatches[ndx2];
                                                    if (
                                                        "string" != typeof altIndex ||
                                                        (void 0 !== altMatch.alternation &&
                                                            altIndexArr.includes(
                                                                altMatch.locator[altMatch.alternation].toString()
                                                            ))
                                                    ) {
                                                        if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                                            (dropMatch = !0), setMergeLocators(altMatch2, altMatch);
                                                            break;
                                                        }
                                                        if (isSubsetOf(altMatch, altMatch2)) {
                                                            setMergeLocators(altMatch, altMatch2) &&
                                                                ((dropMatch = !0),
                                                                malternateMatches.splice(
                                                                    malternateMatches.indexOf(altMatch2),
                                                                    0,
                                                                    altMatch
                                                                ));
                                                            break;
                                                        }
                                                        if (isSubsetOf(altMatch2, altMatch)) {
                                                            setMergeLocators(altMatch2, altMatch);
                                                            break;
                                                        }
                                                        if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                                            isSameLevel(altMatch, altMatch2) ||
                                                            void 0 !== el.inputmask.userOptions.keepStatic
                                                                ? setMergeLocators(altMatch, altMatch2) &&
                                                                  ((dropMatch = !0),
                                                                  malternateMatches.splice(
                                                                      malternateMatches.indexOf(altMatch2),
                                                                      0,
                                                                      altMatch
                                                                  ))
                                                                : (opts.keepStatic = !0);
                                                            break;
                                                        }
                                                    }
                                                }
                                                dropMatch || malternateMatches.push(altMatch);
                                            }
                                        }
                                        (matches = currentMatches.concat(malternateMatches)),
                                            (testPos = pos),
                                            (insertStop = 0 < matches.length),
                                            (match = 0 < malternateMatches.length),
                                            (ndxInitializer = ndxInitializerClone.slice());
                                    } else
                                        match = handleMatch(
                                            alternateToken.matches[altIndex] || maskToken.matches[altIndex],
                                            [altIndex].concat(loopNdx),
                                            quantifierRecurse
                                        );
                                    if (match) return !0;
                                } else if (
                                    match.isQuantifier &&
                                    quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]
                                )
                                    for (
                                        var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0;
                                        qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) &&
                                        testPos <= pos;
                                        qndx++
                                    ) {
                                        var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
                                        if (
                                            ((match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup)),
                                            match)
                                        ) {
                                            if (
                                                ((latestMatch = matches[matches.length - 1].match),
                                                (latestMatch.optionalQuantifier = qndx >= qt.quantifier.min),
                                                (latestMatch.jit =
                                                    (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >=
                                                    qt.quantifier.jit),
                                                latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup))
                                            ) {
                                                (insertStop = !0), (testPos = pos);
                                                break;
                                            }
                                            return (
                                                latestMatch.jit &&
                                                    (maskset.jitOffset[pos] =
                                                        tokenGroup.matches.length -
                                                        tokenGroup.matches.indexOf(latestMatch)),
                                                !0
                                            );
                                        }
                                    }
                                else if (
                                    ((match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)),
                                    match)
                                )
                                    return !0;
                            } else testPos++;
                        }
                        for (
                            var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0;
                            tndx < maskToken.matches.length;
                            tndx++
                        )
                            if (!0 !== maskToken.matches[tndx].isQuantifier) {
                                var match = handleMatch(
                                    maskToken.matches[tndx],
                                    [tndx].concat(loopNdx),
                                    quantifierRecurse
                                );
                                if (match && testPos === pos) return match;
                                if (pos < testPos) break;
                            }
                    }
                    function mergeLocators(pos, tests) {
                        var locator = [],
                            alternation;
                        return (
                            Array.isArray(tests) || (tests = [tests]),
                            0 < tests.length &&
                                (void 0 === tests[0].alternation || !0 === opts.keepStatic
                                    ? ((locator = determineTestTemplate
                                          .call(inputmask, pos, tests.slice())
                                          .locator.slice()),
                                      0 === locator.length && (locator = tests[0].locator.slice()))
                                    : tests.forEach(function (tst) {
                                          "" !== tst.def &&
                                              (0 === locator.length
                                                  ? ((alternation = tst.alternation), (locator = tst.locator.slice()))
                                                  : tst.locator[alternation] &&
                                                    -1 ===
                                                        locator[alternation]
                                                            .toString()
                                                            .indexOf(tst.locator[alternation]) &&
                                                    (locator[alternation] += "," + tst.locator[alternation]));
                                      })),
                            locator
                        );
                    }
                    if (-1 < pos && (void 0 === inputmask.maxLength || pos < inputmask.maxLength)) {
                        if (void 0 === ndxIntlzr) {
                            for (
                                var previousPos = pos - 1, test;
                                void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) &&
                                -1 < previousPos;

                            )
                                previousPos--;
                            void 0 !== test &&
                                -1 < previousPos &&
                                ((ndxInitializer = mergeLocators(previousPos, test)),
                                (cacheDependency = ndxInitializer.join("")),
                                (testPos = previousPos));
                        }
                        if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency)
                            return maskset.tests[pos];
                        for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                            var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
                            if ((match && testPos === pos) || pos < testPos) break;
                        }
                    }
                    return (
                        (0 !== matches.length && !insertStop) ||
                            matches.push({
                                match: {
                                    fn: null,
                                    static: !0,
                                    optionality: !1,
                                    casing: null,
                                    def: "",
                                    placeholder: "",
                                },
                                locator: [],
                                mloc: {},
                                cd: cacheDependency,
                            }),
                        void 0 !== ndxIntlzr && maskset.tests[pos]
                            ? $.extend(!0, [], matches)
                            : ((maskset.tests[pos] = $.extend(!0, [], matches)), maskset.tests[pos])
                    );
                }
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.determineTestTemplate = determineTestTemplate),
                    (exports.getDecisionTaker = getDecisionTaker),
                    (exports.getMaskTemplate = getMaskTemplate),
                    (exports.getPlaceholder = getPlaceholder),
                    (exports.getTest = getTest),
                    (exports.getTests = getTests),
                    (exports.getTestTemplate = getTestTemplate);
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.alternate = alternate),
                    (exports.checkAlternationMatch = checkAlternationMatch),
                    (exports.isComplete = isComplete),
                    (exports.isValid = isValid),
                    (exports.refreshFromBuffer = refreshFromBuffer),
                    (exports.revalidateMask = revalidateMask),
                    (exports.handleRemove = handleRemove);
                var _validationTests = __webpack_require__(3),
                    _keycode = _interopRequireDefault(__webpack_require__(0)),
                    _positioning = __webpack_require__(2),
                    _eventhandlers = __webpack_require__(6);
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
                    var inputmask = this,
                        $ = this.dependencyLib,
                        opts = this.opts,
                        maskset = this.maskset,
                        validPsClone = $.extend(!0, {}, maskset.validPositions),
                        tstClone = $.extend(!0, {}, maskset.tests),
                        lastAlt,
                        alternation,
                        isValidRslt = !1,
                        returnRslt = !1,
                        altPos,
                        prevAltPos,
                        i,
                        validPos,
                        decisionPos,
                        lAltPos = void 0 !== rAltPos ? rAltPos : _positioning.getLastValidPosition.call(this),
                        nextPos,
                        input,
                        begin,
                        end;
                    if (
                        (selection &&
                            ((begin = selection.begin),
                            (end = selection.end),
                            selection.begin > selection.end && ((begin = selection.end), (end = selection.begin))),
                        -1 === lAltPos && void 0 === rAltPos)
                    )
                        (lastAlt = 0),
                            (prevAltPos = _validationTests.getTest.call(this, lastAlt)),
                            (alternation = prevAltPos.alternation);
                    else
                        for (; 0 <= lAltPos; lAltPos--)
                            if (((altPos = maskset.validPositions[lAltPos]), altPos && void 0 !== altPos.alternation)) {
                                if (
                                    prevAltPos &&
                                    prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]
                                )
                                    break;
                                (lastAlt = lAltPos),
                                    (alternation = maskset.validPositions[lastAlt].alternation),
                                    (prevAltPos = altPos);
                            }
                    if (void 0 !== alternation) {
                        (decisionPos = parseInt(lastAlt)),
                            (maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || []),
                            !0 !== maskPos &&
                                maskset.excludes[decisionPos].push(
                                    (0, _validationTests.getDecisionTaker)(prevAltPos) + ":" + prevAltPos.alternation
                                );
                        var validInputs = [],
                            resultPos = -1;
                        for (i = decisionPos; i < _positioning.getLastValidPosition.call(this, void 0, !0) + 1; i++)
                            -1 === resultPos &&
                                maskPos <= i &&
                                void 0 !== c &&
                                (validInputs.push(c), (resultPos = validInputs.length - 1)),
                                (validPos = maskset.validPositions[i]),
                                validPos &&
                                    !0 !== validPos.generatedInput &&
                                    (void 0 === selection || i < begin || end <= i) &&
                                    validInputs.push(validPos.input),
                                delete maskset.validPositions[i];
                        for (
                            -1 === resultPos &&
                            void 0 !== c &&
                            (validInputs.push(c), (resultPos = validInputs.length - 1));
                            void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10;

                        ) {
                            for (
                                maskset.tests = {}, _positioning.resetMaskSet.call(this, !0), isValidRslt = !0, i = 0;
                                i < validInputs.length &&
                                ((nextPos =
                                    isValidRslt.caret || _positioning.getLastValidPosition.call(this, void 0, !0) + 1),
                                (input = validInputs[i]),
                                (isValidRslt = isValid.call(this, nextPos, input, !1, fromIsValid, !0)));
                                i++
                            )
                                i === resultPos && (returnRslt = isValidRslt),
                                    1 == maskPos &&
                                        isValidRslt &&
                                        (returnRslt = {
                                            caretPos: i,
                                        });
                            if (isValidRslt) break;
                            if (
                                (_positioning.resetMaskSet.call(this),
                                (prevAltPos = _validationTests.getTest.call(this, decisionPos)),
                                (maskset.validPositions = $.extend(!0, {}, validPsClone)),
                                (maskset.tests = $.extend(!0, {}, tstClone)),
                                !maskset.excludes[decisionPos])
                            ) {
                                returnRslt = alternate.call(
                                    this,
                                    maskPos,
                                    c,
                                    strict,
                                    fromIsValid,
                                    decisionPos - 1,
                                    selection
                                );
                                break;
                            }
                            var decisionTaker = (0, _validationTests.getDecisionTaker)(prevAltPos);
                            if (
                                -1 !==
                                maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation)
                            ) {
                                returnRslt = alternate.call(
                                    this,
                                    maskPos,
                                    c,
                                    strict,
                                    fromIsValid,
                                    decisionPos - 1,
                                    selection
                                );
                                break;
                            }
                            for (
                                maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation),
                                    i = decisionPos;
                                i < _positioning.getLastValidPosition.call(this, void 0, !0) + 1;
                                i++
                            )
                                delete maskset.validPositions[i];
                        }
                    }
                    return (returnRslt && !1 === opts.keepStatic) || delete maskset.excludes[decisionPos], returnRslt;
                }
                function casing(elem, test, pos) {
                    var opts = this.opts,
                        maskset = this.maskset;
                    switch (opts.casing || test.casing) {
                        case "upper":
                            elem = elem.toUpperCase();
                            break;

                        case "lower":
                            elem = elem.toLowerCase();
                            break;

                        case "title":
                            var posBefore = maskset.validPositions[pos - 1];
                            elem =
                                0 === pos ||
                                (posBefore && posBefore.input === String.fromCharCode(_keycode.default.SPACE))
                                    ? elem.toUpperCase()
                                    : elem.toLowerCase();
                            break;

                        default:
                            if ("function" == typeof opts.casing) {
                                var args = Array.prototype.slice.call(arguments);
                                args.push(maskset.validPositions), (elem = opts.casing.apply(this, args));
                            }
                    }
                    return elem;
                }
                function checkAlternationMatch(altArr1, altArr2, na) {
                    for (
                        var opts = this.opts,
                            altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
                            isMatch = !1,
                            naArr = void 0 !== na ? na.split(",") : [],
                            naNdx,
                            i = 0;
                        i < naArr.length;
                        i++
                    )
                        -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
                    for (var alndx = 0; alndx < altArr1.length; alndx++)
                        if (altArrC.includes(altArr1[alndx])) {
                            isMatch = !0;
                            break;
                        }
                    return isMatch;
                }
                function handleRemove(input, k, pos, strict, fromIsValid) {
                    var inputmask = this,
                        maskset = this.maskset,
                        opts = this.opts;
                    if (
                        (opts.numericInput || this.isRTL) &&
                        (k === _keycode.default.BACKSPACE
                            ? (k = _keycode.default.DELETE)
                            : k === _keycode.default.DELETE && (k = _keycode.default.BACKSPACE),
                        this.isRTL)
                    ) {
                        var pend = pos.end;
                        (pos.end = pos.begin), (pos.begin = pend);
                    }
                    var lvp = _positioning.getLastValidPosition.call(this, void 0, !0),
                        offset;
                    if (
                        (pos.end >= _positioning.getBuffer.call(this).length && lvp >= pos.end && (pos.end = lvp + 1),
                        k === _keycode.default.BACKSPACE
                            ? pos.end - pos.begin < 1 && (pos.begin = _positioning.seekPrevious.call(this, pos.begin))
                            : k === _keycode.default.DELETE &&
                              pos.begin === pos.end &&
                              (pos.end = _positioning.isMask.call(this, pos.end, !0, !0)
                                  ? pos.end + 1
                                  : _positioning.seekNext.call(this, pos.end) + 1),
                        !1 !== (offset = revalidateMask.call(this, pos)))
                    ) {
                        if (
                            (!0 !== strict && !1 !== opts.keepStatic) ||
                            (null !== opts.regex &&
                                -1 !== _validationTests.getTest.call(this, pos.begin).match.def.indexOf("|"))
                        ) {
                            var result = alternate.call(this, !0);
                            if (result) {
                                var newPos =
                                    void 0 !== result.caret
                                        ? result.caret
                                        : result.pos
                                        ? _positioning.seekNext.call(
                                              this,
                                              result.pos.begin ? result.pos.begin : result.pos
                                          )
                                        : _positioning.getLastValidPosition.call(this, -1, !0);
                                (k !== _keycode.default.DELETE || pos.begin > newPos) && pos.begin;
                            }
                        }
                        !0 !== strict && (maskset.p = k === _keycode.default.DELETE ? pos.begin + offset : pos.begin);
                    }
                }
                function isComplete(buffer) {
                    var inputmask = this,
                        opts = this.opts,
                        maskset = this.maskset;
                    if ("function" == typeof opts.isComplete) return opts.isComplete(buffer, opts);
                    if ("*" !== opts.repeat) {
                        var complete = !1,
                            lrp = _positioning.determineLastRequiredPosition.call(this, !0),
                            aml = _positioning.seekPrevious.call(this, lrp.l);
                        if (
                            void 0 === lrp.def ||
                            lrp.def.newBlockMarker ||
                            lrp.def.optionality ||
                            lrp.def.optionalQuantifier
                        ) {
                            complete = !0;
                            for (var i = 0; i <= aml; i++) {
                                var test = _validationTests.getTestTemplate.call(this, i).match;
                                if (
                                    (!0 !== test.static &&
                                        void 0 === maskset.validPositions[i] &&
                                        !0 !== test.optionality &&
                                        !0 !== test.optionalQuantifier) ||
                                    (!0 === test.static &&
                                        buffer[i] !== _validationTests.getPlaceholder.call(this, i, test))
                                ) {
                                    complete = !1;
                                    break;
                                }
                            }
                        }
                        return complete;
                    }
                }
                function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) {
                    var inputmask = this,
                        $ = this.dependencyLib,
                        opts = this.opts,
                        el = inputmask.el,
                        maskset = inputmask.maskset;
                    function isSelection(posObj) {
                        return inputmask.isRTL
                            ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1
                            : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1;
                    }
                    strict = !0 === strict;
                    var maskPos = pos;
                    function processCommandObject(commandObj) {
                        if (void 0 !== commandObj) {
                            if (
                                (void 0 !== commandObj.remove &&
                                    (Array.isArray(commandObj.remove) || (commandObj.remove = [commandObj.remove]),
                                    commandObj.remove
                                        .sort(function (a, b) {
                                            return b.pos - a.pos;
                                        })
                                        .forEach(function (lmnt) {
                                            revalidateMask.call(inputmask, {
                                                begin: lmnt,
                                                end: lmnt + 1,
                                            });
                                        }),
                                    (commandObj.remove = void 0)),
                                void 0 !== commandObj.insert &&
                                    (Array.isArray(commandObj.insert) || (commandObj.insert = [commandObj.insert]),
                                    commandObj.insert
                                        .sort(function (a, b) {
                                            return a.pos - b.pos;
                                        })
                                        .forEach(function (lmnt) {
                                            "" !== lmnt.c &&
                                                isValid.call(
                                                    inputmask,
                                                    lmnt.pos,
                                                    lmnt.c,
                                                    void 0 === lmnt.strict || lmnt.strict,
                                                    void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid
                                                );
                                        }),
                                    (commandObj.insert = void 0)),
                                commandObj.refreshFromBuffer && commandObj.buffer)
                            ) {
                                var refresh = commandObj.refreshFromBuffer;
                                refreshFromBuffer.call(
                                    inputmask,
                                    !0 === refresh ? refresh : refresh.start,
                                    refresh.end,
                                    commandObj.buffer
                                ),
                                    (commandObj.refreshFromBuffer = void 0);
                            }
                            void 0 !== commandObj.rewritePosition &&
                                ((maskPos = commandObj.rewritePosition), (commandObj = !0));
                        }
                        return commandObj;
                    }
                    function _isValid(position, c, strict) {
                        var rslt = !1;
                        return (
                            _validationTests.getTests.call(inputmask, position).every(function (tst, ndx) {
                                var test = tst.match;
                                if (
                                    (_positioning.getBuffer.call(inputmask, !0),
                                    (rslt =
                                        null != test.fn
                                            ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos))
                                            : (c === test.def || c === opts.skipOptionalPartCharacter) &&
                                              "" !== test.def && {
                                                  c:
                                                      _validationTests.getPlaceholder.call(
                                                          inputmask,
                                                          position,
                                                          test,
                                                          !0
                                                      ) || test.def,
                                                  pos: position,
                                              }),
                                    !1 === rslt)
                                )
                                    return !0;
                                var elem = void 0 !== rslt.c ? rslt.c : c,
                                    validatedPos = position;
                                return (
                                    (elem =
                                        elem === opts.skipOptionalPartCharacter && !0 === test.static
                                            ? _validationTests.getPlaceholder.call(inputmask, position, test, !0) ||
                                              test.def
                                            : elem),
                                    (rslt = processCommandObject(rslt)),
                                    !0 !== rslt &&
                                        void 0 !== rslt.pos &&
                                        rslt.pos !== position &&
                                        (validatedPos = rslt.pos),
                                    (!0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c) ||
                                        (!1 ===
                                            revalidateMask.call(
                                                inputmask,
                                                pos,
                                                $.extend({}, tst, {
                                                    input: casing.call(inputmask, elem, test, validatedPos),
                                                }),
                                                fromIsValid,
                                                validatedPos
                                            ) &&
                                            (rslt = !1)),
                                    !1
                                );
                            }),
                            rslt
                        );
                    }
                    void 0 !== pos.begin && (maskPos = inputmask.isRTL ? pos.end : pos.begin);
                    var result = !0,
                        positionsClone = $.extend(!0, {}, maskset.validPositions);
                    if (
                        !1 === opts.keepStatic &&
                        void 0 !== maskset.excludes[maskPos] &&
                        !0 !== fromAlternate &&
                        !0 !== fromIsValid
                    )
                        for (var i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++)
                            void 0 !== maskset.excludes[i] && ((maskset.excludes[i] = void 0), delete maskset.tests[i]);
                    if (
                        ("function" == typeof opts.preValidation &&
                            !0 !== fromIsValid &&
                            !0 !== validateOnly &&
                            ((result = opts.preValidation.call(
                                inputmask,
                                _positioning.getBuffer.call(inputmask),
                                maskPos,
                                c,
                                isSelection(pos),
                                opts,
                                maskset,
                                pos,
                                strict || fromAlternate
                            )),
                            (result = processCommandObject(result))),
                        !0 === result)
                    ) {
                        if (void 0 === inputmask.maxLength || maskPos < inputmask.maxLength) {
                            if (
                                ((result = _isValid(maskPos, c, strict)),
                                (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly)
                            ) {
                                var currentPosValid = maskset.validPositions[maskPos];
                                if (
                                    !currentPosValid ||
                                    !0 !== currentPosValid.match.static ||
                                    (currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter)
                                ) {
                                    if (
                                        opts.insertMode ||
                                        void 0 ===
                                            maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] ||
                                        pos.end > maskPos
                                    ) {
                                        var skip = !1;
                                        if (
                                            (maskset.jitOffset[maskPos] &&
                                                void 0 ===
                                                    maskset.validPositions[
                                                        _positioning.seekNext.call(inputmask, maskPos)
                                                    ] &&
                                                ((result = isValid.call(
                                                    inputmask,
                                                    maskPos + maskset.jitOffset[maskPos],
                                                    c,
                                                    !0
                                                )),
                                                !1 !== result &&
                                                    (!0 !== fromAlternate && (result.caret = maskPos), (skip = !0))),
                                            pos.end > maskPos && (maskset.validPositions[maskPos] = void 0),
                                            !skip &&
                                                !_positioning.isMask.call(
                                                    inputmask,
                                                    maskPos,
                                                    opts.keepStatic && 0 === maskPos
                                                ))
                                        )
                                            for (
                                                var nPos = maskPos + 1,
                                                    snPos = _positioning.seekNext.call(
                                                        inputmask,
                                                        maskPos,
                                                        !1,
                                                        0 !== maskPos
                                                    );
                                                nPos <= snPos;
                                                nPos++
                                            )
                                                if (((result = _isValid(nPos, c, strict)), !1 !== result)) {
                                                    (result =
                                                        trackbackPositions.call(
                                                            inputmask,
                                                            maskPos,
                                                            void 0 !== result.pos ? result.pos : nPos
                                                        ) || result),
                                                        (maskPos = nPos);
                                                    break;
                                                }
                                    }
                                } else
                                    result = {
                                        caret: _positioning.seekNext.call(inputmask, maskPos),
                                    };
                            }
                        } else result = !1;
                        !1 !== result ||
                        !opts.keepStatic ||
                        (!isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && 0 !== maskPos) ||
                        strict ||
                        !0 === fromAlternate
                            ? isSelection(pos) &&
                              maskset.tests[maskPos] &&
                              1 < maskset.tests[maskPos].length &&
                              opts.keepStatic &&
                              !strict &&
                              !0 !== fromAlternate &&
                              (result = alternate.call(inputmask, !0))
                            : (result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, void 0, pos)),
                            !0 === result &&
                                (result = {
                                    pos: maskPos,
                                });
                    }
                    if ("function" == typeof opts.postValidation && !0 !== fromIsValid && !0 !== validateOnly) {
                        var postResult = opts.postValidation.call(
                            inputmask,
                            _positioning.getBuffer.call(inputmask, !0),
                            void 0 !== pos.begin ? (inputmask.isRTL ? pos.end : pos.begin) : pos,
                            c,
                            result,
                            opts,
                            maskset,
                            strict,
                            fromCheckval
                        );
                        void 0 !== postResult && (result = !0 === postResult ? result : postResult);
                    }
                    result && void 0 === result.pos && (result.pos = maskPos),
                        !1 === result || !0 === validateOnly
                            ? (_positioning.resetMaskSet.call(inputmask, !0),
                              (maskset.validPositions = $.extend(!0, {}, positionsClone)))
                            : trackbackPositions.call(inputmask, void 0, maskPos, !0);
                    var endResult = processCommandObject(result);
                    return endResult;
                }
                function positionCanMatchDefinition(pos, testDefinition, opts) {
                    for (
                        var inputmask = this,
                            maskset = this.maskset,
                            valid = !1,
                            tests = _validationTests.getTests.call(this, pos),
                            tndx = 0;
                        tndx < tests.length;
                        tndx++
                    ) {
                        if (
                            tests[tndx].match &&
                            (!(
                                tests[tndx].match.nativeDef !==
                                    testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] ||
                                (opts.shiftPositions && testDefinition.match.static)
                            ) ||
                                tests[tndx].match.nativeDef === testDefinition.match.nativeDef)
                        ) {
                            valid = !0;
                            break;
                        }
                        if (tests[tndx].match && tests[tndx].match.def === testDefinition.match.nativeDef) {
                            valid = void 0;
                            break;
                        }
                    }
                    return (
                        !1 === valid &&
                            void 0 !== maskset.jitOffset[pos] &&
                            (valid = positionCanMatchDefinition.call(
                                this,
                                pos + maskset.jitOffset[pos],
                                testDefinition,
                                opts
                            )),
                        valid
                    );
                }
                function refreshFromBuffer(start, end, buffer) {
                    var inputmask = this,
                        maskset = this.maskset,
                        opts = this.opts,
                        $ = this.dependencyLib,
                        el = this.el,
                        i,
                        p,
                        skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
                        bffr = this.isRTL ? buffer.slice().reverse() : buffer;
                    if (((opts.skipOptionalPartCharacter = ""), !0 === start))
                        _positioning.resetMaskSet.call(this),
                            (maskset.tests = {}),
                            (start = 0),
                            (end = buffer.length),
                            (p = _positioning.determineNewCaretPosition.call(
                                this,
                                {
                                    begin: 0,
                                    end: 0,
                                },
                                !1
                            ).begin);
                    else {
                        for (i = start; i < end; i++) delete maskset.validPositions[i];
                        p = start;
                    }
                    var keypress = new $.Event("keypress");
                    for (i = start; i < end; i++) {
                        (keypress.which = bffr[i].toString().charCodeAt(0)), (this.ignorable = !1);
                        var valResult = _eventhandlers.EventHandlers.keypressEvent.call(el, keypress, !0, !1, !1, p);
                        !1 !== valResult && (p = valResult.forwardPosition);
                    }
                    opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
                }
                function trackbackPositions(originalPos, newPos, fillOnly) {
                    var inputmask = this,
                        maskset = this.maskset,
                        $ = this.dependencyLib;
                    if (void 0 === originalPos)
                        for (
                            originalPos = newPos - 1;
                            0 < originalPos && !maskset.validPositions[originalPos];
                            originalPos--
                        );
                    for (var ps = originalPos; ps < newPos; ps++)
                        if (void 0 === maskset.validPositions[ps] && !_positioning.isMask.call(this, ps, !0)) {
                            var vp = 0 == ps ? _validationTests.getTest.call(this, ps) : maskset.validPositions[ps - 1];
                            if (vp) {
                                var tests = _validationTests.getTests.call(this, ps).slice();
                                "" === tests[tests.length - 1].match.def && tests.pop();
                                var bestMatch = _validationTests.determineTestTemplate.call(this, ps, tests),
                                    np;
                                if (
                                    bestMatch &&
                                    (!0 !== bestMatch.match.jit ||
                                        ("master" === bestMatch.match.newBlockMarker &&
                                            (np = maskset.validPositions[ps + 1]) &&
                                            !0 === np.match.optionalQuantifier)) &&
                                    ((bestMatch = $.extend({}, bestMatch, {
                                        input:
                                            _validationTests.getPlaceholder.call(this, ps, bestMatch.match, !0) ||
                                            bestMatch.match.def,
                                    })),
                                    (bestMatch.generatedInput = !0),
                                    revalidateMask.call(this, ps, bestMatch, !0),
                                    !0 !== fillOnly)
                                ) {
                                    var cvpInput = maskset.validPositions[newPos].input;
                                    return (
                                        (maskset.validPositions[newPos] = void 0),
                                        isValid.call(this, newPos, cvpInput, !0, !0)
                                    );
                                }
                            }
                        }
                }
                function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
                    var inputmask = this,
                        maskset = this.maskset,
                        opts = this.opts,
                        $ = this.dependencyLib;
                    function IsEnclosedStatic(pos, valids, selection) {
                        var posMatch = valids[pos];
                        if (
                            void 0 === posMatch ||
                            !0 !== posMatch.match.static ||
                            !0 === posMatch.match.optionality ||
                            (void 0 !== valids[0] && void 0 !== valids[0].alternation)
                        )
                            return !1;
                        var prevMatch =
                                selection.begin <= pos - 1
                                    ? valids[pos - 1] && !0 === valids[pos - 1].match.static && valids[pos - 1]
                                    : valids[pos - 1],
                            nextMatch =
                                selection.end > pos + 1
                                    ? valids[pos + 1] && !0 === valids[pos + 1].match.static && valids[pos + 1]
                                    : valids[pos + 1];
                        return prevMatch && nextMatch;
                    }
                    var offset = 0,
                        begin = void 0 !== pos.begin ? pos.begin : pos,
                        end = void 0 !== pos.end ? pos.end : pos;
                    if (
                        (pos.begin > pos.end && ((begin = pos.end), (end = pos.begin)),
                        (validatedPos = void 0 !== validatedPos ? validatedPos : begin),
                        begin !== end ||
                            (opts.insertMode &&
                                void 0 !== maskset.validPositions[validatedPos] &&
                                void 0 === fromIsValid) ||
                            void 0 === validTest)
                    ) {
                        var positionsClone = $.extend(!0, {}, maskset.validPositions),
                            lvp = _positioning.getLastValidPosition.call(this, void 0, !0),
                            i;
                        for (maskset.p = begin, i = lvp; begin <= i; i--)
                            delete maskset.validPositions[i], void 0 === validTest && delete maskset.tests[i + 1];
                        var valid = !0,
                            j = validatedPos,
                            posMatch = j,
                            t,
                            canMatch;
                        for (
                            validTest &&
                                ((maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest)), posMatch++, j++),
                                i = validTest ? end : end - 1;
                            i <= lvp;
                            i++
                        ) {
                            if (
                                void 0 !== (t = positionsClone[i]) &&
                                !0 !== t.generatedInput &&
                                (end <= i ||
                                    (begin <= i &&
                                        IsEnclosedStatic(i, positionsClone, {
                                            begin: begin,
                                            end: end,
                                        })))
                            ) {
                                for (; "" !== _validationTests.getTest.call(this, posMatch).match.def; ) {
                                    if (
                                        !1 !== (canMatch = positionCanMatchDefinition.call(this, posMatch, t, opts)) ||
                                        "+" === t.match.def
                                    ) {
                                        "+" === t.match.def && _positioning.getBuffer.call(this, !0);
                                        var result = isValid.call(
                                            this,
                                            posMatch,
                                            t.input,
                                            "+" !== t.match.def,
                                            "+" !== t.match.def
                                        );
                                        if (
                                            ((valid = !1 !== result),
                                            (j = (result.pos || posMatch) + 1),
                                            !valid && canMatch)
                                        )
                                            break;
                                    } else valid = !1;
                                    if (valid) {
                                        void 0 === validTest && t.match.static && i === pos.begin && offset++;
                                        break;
                                    }
                                    if (!valid && posMatch > maskset.maskLength) break;
                                    posMatch++;
                                }
                                "" == _validationTests.getTest.call(this, posMatch).match.def && (valid = !1),
                                    (posMatch = j);
                            }
                            if (!valid) break;
                        }
                        if (!valid)
                            return (
                                (maskset.validPositions = $.extend(!0, {}, positionsClone)),
                                _positioning.resetMaskSet.call(this, !0),
                                !1
                            );
                    } else
                        validTest &&
                            _validationTests.getTest.call(this, validatedPos).match.cd === validTest.match.cd &&
                            (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));
                    return _positioning.resetMaskSet.call(this, !0), offset;
                }
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.applyInputValue = applyInputValue),
                    (exports.clearOptionalTail = clearOptionalTail),
                    (exports.checkVal = checkVal),
                    (exports.HandleNativePlaceholder = HandleNativePlaceholder),
                    (exports.unmaskedvalue = unmaskedvalue),
                    (exports.writeBuffer = writeBuffer);
                var _keycode = _interopRequireDefault(__webpack_require__(0)),
                    _validationTests = __webpack_require__(3),
                    _positioning = __webpack_require__(2),
                    _validation = __webpack_require__(4),
                    _environment = __webpack_require__(7),
                    _eventhandlers = __webpack_require__(6);
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                function applyInputValue(input, value) {
                    var inputmask = input ? input.inputmask : this,
                        opts = inputmask.opts;
                    (input.inputmask.refreshValue = !1),
                        "function" == typeof opts.onBeforeMask &&
                            (value = opts.onBeforeMask.call(inputmask, value, opts) || value),
                        (value = value.toString().split("")),
                        checkVal(input, !0, !1, value),
                        (inputmask.undoValue = _positioning.getBuffer.call(inputmask).join("")),
                        (opts.clearMaskOnLostFocus || opts.clearIncomplete) &&
                            input.inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") &&
                            -1 === _positioning.getLastValidPosition.call(inputmask) &&
                            input.inputmask._valueSet("");
                }
                function clearOptionalTail(buffer) {
                    var inputmask = this;
                    buffer.length = 0;
                    for (
                        var template = _validationTests.getMaskTemplate.call(this, !0, 0, !0, void 0, !0), lmnt;
                        void 0 !== (lmnt = template.shift());

                    )
                        buffer.push(lmnt);
                    return buffer;
                }
                function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
                    var inputmask = input ? input.inputmask : this,
                        maskset = inputmask.maskset,
                        opts = inputmask.opts,
                        $ = inputmask.dependencyLib,
                        inputValue = nptvl.slice(),
                        charCodes = "",
                        initialNdx = -1,
                        result = void 0,
                        skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
                    function isTemplateMatch(ndx, charCodes) {
                        for (
                            var targetTemplate = _validationTests.getMaskTemplate
                                    .call(inputmask, !0, 0)
                                    .slice(ndx, _positioning.seekNext.call(inputmask, ndx, !1, !1))
                                    .join("")
                                    .replace(/'/g, ""),
                                charCodeNdx = targetTemplate.indexOf(charCodes);
                            0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1];

                        )
                            charCodeNdx--;
                        var match =
                            0 === charCodeNdx &&
                            !_positioning.isMask.call(inputmask, ndx) &&
                            (_validationTests.getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) ||
                                (!0 === _validationTests.getTest.call(inputmask, ndx).match.static &&
                                    _validationTests.getTest.call(inputmask, ndx).match.nativeDef ===
                                        "'" + charCodes.charAt(0)) ||
                                (" " === _validationTests.getTest.call(inputmask, ndx).match.nativeDef &&
                                    (_validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef ===
                                        charCodes.charAt(0) ||
                                        (!0 === _validationTests.getTest.call(inputmask, ndx + 1).match.static &&
                                            _validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef ===
                                                "'" + charCodes.charAt(0)))));
                        if (!match && 0 < charCodeNdx && !_positioning.isMask.call(inputmask, ndx, !1, !0)) {
                            var nextPos = _positioning.seekNext.call(inputmask, ndx);
                            inputmask.caretPos.begin < nextPos &&
                                (inputmask.caretPos = {
                                    begin: nextPos,
                                });
                        }
                        return match;
                    }
                    (opts.skipOptionalPartCharacter = ""),
                        _positioning.resetMaskSet.call(inputmask),
                        (maskset.tests = {}),
                        (initialNdx = opts.radixPoint
                            ? _positioning.determineNewCaretPosition.call(inputmask, {
                                  begin: 0,
                                  end: 0,
                              }).begin
                            : 0),
                        (maskset.p = initialNdx),
                        (inputmask.caretPos = {
                            begin: initialNdx,
                        });
                    var staticMatches = [],
                        prevCaretPos = inputmask.caretPos;
                    if (
                        (inputValue.forEach(function (charCode, ndx) {
                            if (void 0 !== charCode)
                                if (
                                    void 0 === maskset.validPositions[ndx] &&
                                    inputValue[ndx] === _validationTests.getPlaceholder.call(inputmask, ndx) &&
                                    _positioning.isMask.call(inputmask, ndx, !0) &&
                                    !1 ===
                                        _validation.isValid.call(
                                            inputmask,
                                            ndx,
                                            inputValue[ndx],
                                            !0,
                                            void 0,
                                            void 0,
                                            !0
                                        )
                                )
                                    maskset.p++;
                                else {
                                    var keypress = new $.Event("_checkval");
                                    (keypress.which = charCode.toString().charCodeAt(0)), (charCodes += charCode);
                                    var lvp = _positioning.getLastValidPosition.call(inputmask, void 0, !0);
                                    isTemplateMatch(initialNdx, charCodes)
                                        ? (result = _eventhandlers.EventHandlers.keypressEvent.call(
                                              inputmask,
                                              keypress,
                                              !0,
                                              !1,
                                              strict,
                                              lvp + 1
                                          ))
                                        : ((result = _eventhandlers.EventHandlers.keypressEvent.call(
                                              inputmask,
                                              keypress,
                                              !0,
                                              !1,
                                              strict,
                                              inputmask.caretPos.begin
                                          )),
                                          result && ((initialNdx = inputmask.caretPos.begin + 1), (charCodes = ""))),
                                        result
                                            ? (void 0 !== result.pos &&
                                                  maskset.validPositions[result.pos] &&
                                                  !0 === maskset.validPositions[result.pos].match.static &&
                                                  void 0 === maskset.validPositions[result.pos].alternation &&
                                                  (staticMatches.push(result.pos),
                                                  inputmask.isRTL || (result.forwardPosition = result.pos + 1)),
                                              writeBuffer.call(
                                                  inputmask,
                                                  void 0,
                                                  _positioning.getBuffer.call(inputmask),
                                                  result.forwardPosition,
                                                  keypress,
                                                  !1
                                              ),
                                              (inputmask.caretPos = {
                                                  begin: result.forwardPosition,
                                                  end: result.forwardPosition,
                                              }),
                                              (prevCaretPos = inputmask.caretPos))
                                            : (inputmask.caretPos = prevCaretPos);
                                }
                        }),
                        0 < staticMatches.length)
                    ) {
                        var sndx,
                            validPos,
                            nextValid = _positioning.seekNext.call(inputmask, -1, void 0, !1);
                        if (
                            (!_validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) &&
                                staticMatches.length <= nextValid) ||
                            (_validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) &&
                                0 < staticMatches.length &&
                                staticMatches.length !== nextValid &&
                                0 === staticMatches[0])
                        )
                            for (var nextSndx = nextValid; void 0 !== (sndx = staticMatches.shift()); ) {
                                var keypress = new $.Event("_checkval");
                                if (
                                    ((validPos = maskset.validPositions[sndx]),
                                    (validPos.generatedInput = !0),
                                    (keypress.which = validPos.input.charCodeAt(0)),
                                    (result = _eventhandlers.EventHandlers.keypressEvent.call(
                                        inputmask,
                                        keypress,
                                        !0,
                                        !1,
                                        strict,
                                        nextSndx
                                    )),
                                    result &&
                                        void 0 !== result.pos &&
                                        result.pos !== sndx &&
                                        maskset.validPositions[result.pos] &&
                                        !0 === maskset.validPositions[result.pos].match.static)
                                )
                                    staticMatches.push(result.pos);
                                else if (!result) break;
                                nextSndx++;
                            }
                    }
                    writeOut &&
                        writeBuffer.call(
                            inputmask,
                            input,
                            _positioning.getBuffer.call(inputmask),
                            result ? result.forwardPosition : inputmask.caretPos.begin,
                            initiatingEvent || new $.Event("checkval"),
                            initiatingEvent &&
                                "input" === initiatingEvent.type &&
                                inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("")
                        ),
                        (opts.skipOptionalPartCharacter = skipOptionalPartCharacter);
                }
                function HandleNativePlaceholder(npt, value) {
                    var inputmask = npt ? npt.inputmask : this;
                    if (_environment.ie) {
                        if (
                            npt.inputmask._valueGet() !== value &&
                            (npt.placeholder !== value || "" === npt.placeholder)
                        ) {
                            var buffer = _positioning.getBuffer.call(inputmask).slice(),
                                nptValue = npt.inputmask._valueGet();
                            if (nptValue !== value) {
                                var lvp = _positioning.getLastValidPosition.call(inputmask);
                                -1 === lvp && nptValue === _positioning.getBufferTemplate.call(inputmask).join("")
                                    ? (buffer = [])
                                    : -1 !== lvp && clearOptionalTail.call(inputmask, buffer),
                                    writeBuffer(npt, buffer);
                            }
                        }
                    } else
                        npt.placeholder !== value &&
                            ((npt.placeholder = value), "" === npt.placeholder && npt.removeAttribute("placeholder"));
                }
                function unmaskedvalue(input) {
                    var inputmask = input ? input.inputmask : this,
                        opts = inputmask.opts,
                        maskset = inputmask.maskset;
                    if (input) {
                        if (void 0 === input.inputmask) return input.value;
                        input.inputmask &&
                            input.inputmask.refreshValue &&
                            applyInputValue(input, input.inputmask._valueGet(!0));
                    }
                    var umValue = [],
                        vps = maskset.validPositions;
                    for (var pndx in vps)
                        vps[pndx] &&
                            vps[pndx].match &&
                            (1 != vps[pndx].match.static ||
                                (Array.isArray(maskset.metadata) && !0 !== vps[pndx].generatedInput)) &&
                            umValue.push(vps[pndx].input);
                    var unmaskedValue =
                        0 === umValue.length ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
                    if ("function" == typeof opts.onUnMask) {
                        var bufferValue = (
                            inputmask.isRTL
                                ? _positioning.getBuffer.call(inputmask).slice().reverse()
                                : _positioning.getBuffer.call(inputmask)
                        ).join("");
                        unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
                    }
                    return unmaskedValue;
                }
                function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
                    var inputmask = input ? input.inputmask : this,
                        opts = inputmask.opts,
                        $ = inputmask.dependencyLib;
                    if (event && "function" == typeof opts.onBeforeWrite) {
                        var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                        if (result) {
                            if (result.refreshFromBuffer) {
                                var refresh = result.refreshFromBuffer;
                                _validation.refreshFromBuffer.call(
                                    inputmask,
                                    !0 === refresh ? refresh : refresh.start,
                                    refresh.end,
                                    result.buffer || buffer
                                ),
                                    (buffer = _positioning.getBuffer.call(inputmask, !0));
                            }
                            void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
                        }
                    }
                    if (
                        void 0 !== input &&
                        (input.inputmask._valueSet(buffer.join("")),
                        void 0 === caretPos ||
                            (void 0 !== event && "blur" === event.type) ||
                            _positioning.caret.call(
                                inputmask,
                                input,
                                caretPos,
                                void 0,
                                void 0,
                                void 0 !== event &&
                                    "keydown" === event.type &&
                                    (event.keyCode === _keycode.default.DELETE ||
                                        event.keyCode === _keycode.default.BACKSPACE)
                            ),
                        !0 === triggerEvents)
                    ) {
                        var $input = $(input),
                            nptVal = input.inputmask._valueGet();
                        (input.inputmask.skipInputEvent = !0),
                            $input.trigger("input"),
                            setTimeout(function () {
                                nptVal === _positioning.getBufferTemplate.call(inputmask).join("")
                                    ? $input.trigger("cleared")
                                    : !0 === _validation.isComplete.call(inputmask, buffer) &&
                                      $input.trigger("complete");
                            }, 0);
                    }
                }
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.EventHandlers = void 0);
                var _positioning = __webpack_require__(2),
                    _keycode = _interopRequireDefault(__webpack_require__(0)),
                    _environment = __webpack_require__(7),
                    _validation = __webpack_require__(4),
                    _inputHandling = __webpack_require__(5),
                    _validationTests = __webpack_require__(3);
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                var EventHandlers = {
                    keydownEvent: function keydownEvent(e) {
                        var inputmask = this.inputmask,
                            opts = inputmask.opts,
                            $ = inputmask.dependencyLib,
                            maskset = inputmask.maskset,
                            input = this,
                            $input = $(input),
                            k = e.keyCode,
                            pos = _positioning.caret.call(inputmask, input),
                            kdResult = opts.onKeyDown.call(this, e, _positioning.getBuffer.call(inputmask), pos, opts);
                        if (void 0 !== kdResult) return kdResult;
                        if (
                            k === _keycode.default.BACKSPACE ||
                            k === _keycode.default.DELETE ||
                            (_environment.iphone && k === _keycode.default.BACKSPACE_SAFARI) ||
                            (e.ctrlKey && k === _keycode.default.X && !("oncut" in input))
                        )
                            e.preventDefault(),
                                _validation.handleRemove.call(inputmask, input, k, pos),
                                (0, _inputHandling.writeBuffer)(
                                    input,
                                    _positioning.getBuffer.call(inputmask, !0),
                                    maskset.p,
                                    e,
                                    input.inputmask._valueGet() !== _positioning.getBuffer.call(inputmask).join("")
                                );
                        else if (k === _keycode.default.END || k === _keycode.default.PAGE_DOWN) {
                            e.preventDefault();
                            var caretPos = _positioning.seekNext.call(
                                inputmask,
                                _positioning.getLastValidPosition.call(inputmask)
                            );
                            _positioning.caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
                        } else
                            (k === _keycode.default.HOME && !e.shiftKey) || k === _keycode.default.PAGE_UP
                                ? (e.preventDefault(),
                                  _positioning.caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, !0))
                                : ((opts.undoOnEscape && k === _keycode.default.ESCAPE) || (90 === k && e.ctrlKey)) &&
                                  !0 !== e.altKey
                                ? ((0, _inputHandling.checkVal)(input, !0, !1, inputmask.undoValue.split("")),
                                  $input.trigger("click"))
                                : !0 === opts.tabThrough && k === _keycode.default.TAB
                                ? !0 === e.shiftKey
                                    ? ((pos.end = _positioning.seekPrevious.call(inputmask, pos.end, !0)),
                                      !0 === _validationTests.getTest.call(inputmask, pos.end - 1).match.static &&
                                          pos.end--,
                                      (pos.begin = _positioning.seekPrevious.call(inputmask, pos.end, !0)),
                                      0 <= pos.begin &&
                                          0 < pos.end &&
                                          (e.preventDefault(),
                                          _positioning.caret.call(inputmask, input, pos.begin, pos.end)))
                                    : ((pos.begin = _positioning.seekNext.call(inputmask, pos.begin, !0)),
                                      (pos.end = _positioning.seekNext.call(inputmask, pos.begin, !0)),
                                      pos.end < maskset.maskLength && pos.end--,
                                      pos.begin <= maskset.maskLength &&
                                          (e.preventDefault(),
                                          _positioning.caret.call(inputmask, input, pos.begin, pos.end)))
                                : e.shiftKey ||
                                  (opts.insertModeVisual &&
                                      !1 === opts.insertMode &&
                                      (k === _keycode.default.RIGHT
                                          ? setTimeout(function () {
                                                var caretPos = _positioning.caret.call(inputmask, input);
                                                _positioning.caret.call(inputmask, input, caretPos.begin);
                                            }, 0)
                                          : k === _keycode.default.LEFT &&
                                            setTimeout(function () {
                                                var caretPos_begin = _positioning.translatePosition.call(
                                                        inputmask,
                                                        input.inputmask.caretPos.begin
                                                    ),
                                                    caretPos_end = _positioning.translatePosition.call(
                                                        inputmask,
                                                        input.inputmask.caretPos.end
                                                    );
                                                inputmask.isRTL
                                                    ? _positioning.caret.call(
                                                          inputmask,
                                                          input,
                                                          caretPos_begin +
                                                              (caretPos_begin === maskset.maskLength ? 0 : 1)
                                                      )
                                                    : _positioning.caret.call(
                                                          inputmask,
                                                          input,
                                                          caretPos_begin - (0 === caretPos_begin ? 0 : 1)
                                                      );
                                            }, 0)));
                        inputmask.ignorable = opts.ignorables.includes(k);
                    },
                    keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
                        var inputmask = this.inputmask || this,
                            opts = inputmask.opts,
                            $ = inputmask.dependencyLib,
                            maskset = inputmask.maskset,
                            input = inputmask.el,
                            $input = $(input),
                            k = e.which || e.charCode || e.keyCode;
                        if (
                            !(!0 === checkval || (e.ctrlKey && e.altKey)) &&
                            (e.ctrlKey || e.metaKey || inputmask.ignorable)
                        )
                            return (
                                k === _keycode.default.ENTER &&
                                    inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") &&
                                    ((inputmask.undoValue = _positioning.getBuffer.call(inputmask).join("")),
                                    setTimeout(function () {
                                        $input.trigger("change");
                                    }, 0)),
                                (inputmask.skipInputEvent = !0),
                                !0
                            );
                        if (k) {
                            (44 !== k && 46 !== k) ||
                                3 !== e.location ||
                                "" === opts.radixPoint ||
                                (k = opts.radixPoint.charCodeAt(0));
                            var pos = checkval
                                    ? {
                                          begin: ndx,
                                          end: ndx,
                                      }
                                    : _positioning.caret.call(inputmask, input),
                                forwardPosition,
                                c = String.fromCharCode(k);
                            maskset.writeOutBuffer = !0;
                            var valResult = _validation.isValid.call(
                                inputmask,
                                pos,
                                c,
                                strict,
                                void 0,
                                void 0,
                                void 0,
                                checkval
                            );
                            if (
                                (!1 !== valResult &&
                                    (_positioning.resetMaskSet.call(inputmask, !0),
                                    (forwardPosition =
                                        void 0 !== valResult.caret
                                            ? valResult.caret
                                            : _positioning.seekNext.call(
                                                  inputmask,
                                                  valResult.pos.begin ? valResult.pos.begin : valResult.pos
                                              )),
                                    (maskset.p = forwardPosition)),
                                (forwardPosition =
                                    opts.numericInput && void 0 === valResult.caret
                                        ? _positioning.seekPrevious.call(inputmask, forwardPosition)
                                        : forwardPosition),
                                !1 !== writeOut &&
                                    (setTimeout(function () {
                                        opts.onKeyValidation.call(input, k, valResult);
                                    }, 0),
                                    maskset.writeOutBuffer && !1 !== valResult))
                            ) {
                                var buffer = _positioning.getBuffer.call(inputmask);
                                (0, _inputHandling.writeBuffer)(input, buffer, forwardPosition, e, !0 !== checkval);
                            }
                            if ((e.preventDefault(), checkval))
                                return !1 !== valResult && (valResult.forwardPosition = forwardPosition), valResult;
                        }
                    },
                    keyupEvent: function keyupEvent(e) {
                        var inputmask = this.inputmask;
                        !inputmask.isComposing ||
                            (e.keyCode !== _keycode.default.KEY_229 && e.keyCode !== _keycode.default.ENTER) ||
                            inputmask.$el.trigger("input");
                    },
                    pasteEvent: function pasteEvent(e) {
                        var inputmask = this.inputmask,
                            opts = inputmask.opts,
                            input = this,
                            inputValue = inputmask._valueGet(!0),
                            caretPos = _positioning.caret.call(inputmask, this),
                            tempValue;
                        inputmask.isRTL &&
                            ((tempValue = caretPos.end), (caretPos.end = caretPos.begin), (caretPos.begin = tempValue));
                        var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
                            valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                        if (
                            (valueBeforeCaret ==
                                (inputmask.isRTL
                                    ? _positioning.getBufferTemplate.call(inputmask).slice().reverse()
                                    : _positioning.getBufferTemplate.call(inputmask)
                                )
                                    .slice(0, caretPos.begin)
                                    .join("") && (valueBeforeCaret = ""),
                            valueAfterCaret ==
                                (inputmask.isRTL
                                    ? _positioning.getBufferTemplate.call(inputmask).slice().reverse()
                                    : _positioning.getBufferTemplate.call(inputmask)
                                )
                                    .slice(caretPos.end)
                                    .join("") && (valueAfterCaret = ""),
                            window.clipboardData && window.clipboardData.getData)
                        )
                            inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
                        else {
                            if (!e.clipboardData || !e.clipboardData.getData) return !0;
                            inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
                        }
                        var pasteValue = inputValue;
                        if ("function" == typeof opts.onBeforePaste) {
                            if (
                                ((pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts)), !1 === pasteValue)
                            )
                                return e.preventDefault();
                            pasteValue = pasteValue || inputValue;
                        }
                        return (
                            (0, _inputHandling.checkVal)(this, !0, !1, pasteValue.toString().split(""), e),
                            e.preventDefault()
                        );
                    },
                    inputFallBackEvent: function inputFallBackEvent(e) {
                        var inputmask = this.inputmask,
                            opts = inputmask.opts,
                            $ = inputmask.dependencyLib;
                        function ieMobileHandler(input, inputValue, caretPos) {
                            if (_environment.iemobile) {
                                var inputChar = inputValue.replace(_positioning.getBuffer.call(inputmask).join(""), "");
                                if (1 === inputChar.length) {
                                    var iv = inputValue.split("");
                                    iv.splice(caretPos.begin, 0, inputChar), (inputValue = iv.join(""));
                                }
                            }
                            return inputValue;
                        }
                        function analyseChanges(inputValue, buffer, caretPos) {
                            for (
                                var frontPart = inputValue.substr(0, caretPos.begin).split(""),
                                    backPart = inputValue.substr(caretPos.begin).split(""),
                                    frontBufferPart = buffer.substr(0, caretPos.begin).split(""),
                                    backBufferPart = buffer.substr(caretPos.begin).split(""),
                                    fpl =
                                        frontPart.length >= frontBufferPart.length
                                            ? frontPart.length
                                            : frontBufferPart.length,
                                    bpl =
                                        backPart.length >= backBufferPart.length
                                            ? backPart.length
                                            : backBufferPart.length,
                                    bl,
                                    i,
                                    action = "",
                                    data = [],
                                    marker = "~",
                                    placeholder;
                                frontPart.length < fpl;

                            )
                                frontPart.push("~");
                            for (; frontBufferPart.length < fpl; ) frontBufferPart.push("~");
                            for (; backPart.length < bpl; ) backPart.unshift("~");
                            for (; backBufferPart.length < bpl; ) backBufferPart.unshift("~");
                            var newBuffer = frontPart.concat(backPart),
                                oldBuffer = frontBufferPart.concat(backBufferPart);
                            for (i = 0, bl = newBuffer.length; i < bl; i++)
                                switch (
                                    ((placeholder = _validationTests.getPlaceholder.call(
                                        inputmask,
                                        _positioning.translatePosition.call(inputmask, i)
                                    )),
                                    action)
                                ) {
                                    case "insertText":
                                        oldBuffer[i - 1] === newBuffer[i] &&
                                            caretPos.begin == newBuffer.length - 1 &&
                                            data.push(newBuffer[i]),
                                            (i = bl);
                                        break;

                                    case "insertReplacementText":
                                        "~" === newBuffer[i] ? caretPos.end++ : (i = bl);
                                        break;

                                    case "deleteContentBackward":
                                        "~" === newBuffer[i] ? caretPos.end++ : (i = bl);
                                        break;

                                    default:
                                        newBuffer[i] !== oldBuffer[i] &&
                                            (("~" !== newBuffer[i + 1] &&
                                                newBuffer[i + 1] !== placeholder &&
                                                void 0 !== newBuffer[i + 1]) ||
                                            ((oldBuffer[i] !== placeholder || "~" !== oldBuffer[i + 1]) &&
                                                "~" !== oldBuffer[i])
                                                ? "~" === oldBuffer[i + 1] && oldBuffer[i] === newBuffer[i + 1]
                                                    ? ((action = "insertText"),
                                                      data.push(newBuffer[i]),
                                                      caretPos.begin--,
                                                      caretPos.end--)
                                                    : newBuffer[i] !== placeholder &&
                                                      "~" !== newBuffer[i] &&
                                                      ("~" === newBuffer[i + 1] ||
                                                          (oldBuffer[i] !== newBuffer[i] &&
                                                              oldBuffer[i + 1] === newBuffer[i + 1]))
                                                    ? ((action = "insertReplacementText"),
                                                      data.push(newBuffer[i]),
                                                      caretPos.begin--)
                                                    : "~" === newBuffer[i]
                                                    ? ((action = "deleteContentBackward"),
                                                      (!_positioning.isMask.call(
                                                          inputmask,
                                                          _positioning.translatePosition.call(inputmask, i),
                                                          !0
                                                      ) &&
                                                          oldBuffer[i] !== opts.radixPoint) ||
                                                          caretPos.end++)
                                                    : (i = bl)
                                                : ((action = "insertText"),
                                                  data.push(newBuffer[i]),
                                                  caretPos.begin--,
                                                  caretPos.end--));
                                        break;
                                }
                            return {
                                action: action,
                                data: data,
                                caret: caretPos,
                            };
                        }
                        var input = this,
                            inputValue = input.inputmask._valueGet(!0),
                            buffer = (
                                inputmask.isRTL
                                    ? _positioning.getBuffer.call(inputmask).slice().reverse()
                                    : _positioning.getBuffer.call(inputmask)
                            ).join(""),
                            caretPos = _positioning.caret.call(inputmask, input, void 0, void 0, !0);
                        if (buffer !== inputValue) {
                            inputValue = ieMobileHandler(input, inputValue, caretPos);
                            var changes = analyseChanges(inputValue, buffer, caretPos);
                            switch (
                                ((input.inputmask.shadowRoot || document).activeElement !== input && input.focus(),
                                (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask)),
                                _positioning.caret.call(inputmask, input, caretPos.begin, caretPos.end, !0),
                                changes.action)
                            ) {
                                case "insertText":
                                case "insertReplacementText":
                                    changes.data.forEach(function (entry, ndx) {
                                        var keypress = new $.Event("keypress");
                                        (keypress.which = entry.charCodeAt(0)),
                                            (inputmask.ignorable = !1),
                                            EventHandlers.keypressEvent.call(input, keypress);
                                    }),
                                        setTimeout(function () {
                                            inputmask.$el.trigger("keyup");
                                        }, 0);
                                    break;

                                case "deleteContentBackward":
                                    var keydown = new $.Event("keydown");
                                    (keydown.keyCode = _keycode.default.BACKSPACE),
                                        EventHandlers.keydownEvent.call(input, keydown);
                                    break;

                                default:
                                    (0, _inputHandling.applyInputValue)(input, inputValue);
                                    break;
                            }
                            e.preventDefault();
                        }
                    },
                    compositionendEvent: function compositionendEvent(e) {
                        var inputmask = this.inputmask;
                        (inputmask.isComposing = !1), inputmask.$el.trigger("input");
                    },
                    setValueEvent: function setValueEvent(e, argument_1, argument_2) {
                        var inputmask = this.inputmask,
                            input = this,
                            value = e && e.detail ? e.detail[0] : argument_1;
                        void 0 === value && (value = this.inputmask._valueGet(!0)),
                            (0, _inputHandling.applyInputValue)(this, value),
                            ((e.detail && void 0 !== e.detail[1]) || void 0 !== argument_2) &&
                                _positioning.caret.call(inputmask, this, e.detail ? e.detail[1] : argument_2);
                    },
                    focusEvent: function focusEvent(e) {
                        var inputmask = this.inputmask,
                            opts = inputmask.opts,
                            input = this,
                            nptValue = this.inputmask._valueGet();
                        opts.showMaskOnFocus &&
                            nptValue !== _positioning.getBuffer.call(inputmask).join("") &&
                            (0, _inputHandling.writeBuffer)(
                                this,
                                _positioning.getBuffer.call(inputmask),
                                _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask))
                            ),
                            !0 !== opts.positionCaretOnTab ||
                                !1 !== inputmask.mouseEnter ||
                                (_validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) &&
                                    -1 !== _positioning.getLastValidPosition.call(inputmask)) ||
                                EventHandlers.clickEvent.apply(this, [e, !0]),
                            (inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""));
                    },
                    invalidEvent: function invalidEvent(e) {
                        this.inputmask.validationEvent = !0;
                    },
                    mouseleaveEvent: function mouseleaveEvent() {
                        var inputmask = this.inputmask,
                            opts = inputmask.opts,
                            input = this;
                        (inputmask.mouseEnter = !1),
                            opts.clearMaskOnLostFocus &&
                                (this.inputmask.shadowRoot || document).activeElement !== this &&
                                (0, _inputHandling.HandleNativePlaceholder)(this, inputmask.originalPlaceholder);
                    },
                    clickEvent: function clickEvent(e, tabbed) {
                        var inputmask = this.inputmask,
                            input = this;
                        if ((this.inputmask.shadowRoot || document).activeElement === this) {
                            var newCaretPosition = _positioning.determineNewCaretPosition.call(
                                inputmask,
                                _positioning.caret.call(inputmask, this),
                                tabbed
                            );
                            void 0 !== newCaretPosition && _positioning.caret.call(inputmask, this, newCaretPosition);
                        }
                    },
                    cutEvent: function cutEvent(e) {
                        var inputmask = this.inputmask,
                            maskset = inputmask.maskset,
                            input = this,
                            pos = _positioning.caret.call(inputmask, this),
                            clipboardData = window.clipboardData || e.clipboardData,
                            clipData = inputmask.isRTL
                                ? _positioning.getBuffer.call(inputmask).slice(pos.end, pos.begin)
                                : _positioning.getBuffer.call(inputmask).slice(pos.begin, pos.end);
                        clipboardData.setData(
                            "text",
                            inputmask.isRTL ? clipData.reverse().join("") : clipData.join("")
                        ),
                            document.execCommand && document.execCommand("copy"),
                            _validation.handleRemove.call(inputmask, this, _keycode.default.DELETE, pos),
                            (0, _inputHandling.writeBuffer)(
                                this,
                                _positioning.getBuffer.call(inputmask),
                                maskset.p,
                                e,
                                inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("")
                            );
                    },
                    blurEvent: function blurEvent(e) {
                        var inputmask = this.inputmask,
                            opts = inputmask.opts,
                            $ = inputmask.dependencyLib,
                            $input = $(this),
                            input = this;
                        if (this.inputmask) {
                            (0, _inputHandling.HandleNativePlaceholder)(this, inputmask.originalPlaceholder);
                            var nptValue = this.inputmask._valueGet(),
                                buffer = _positioning.getBuffer.call(inputmask).slice();
                            "" !== nptValue &&
                                (opts.clearMaskOnLostFocus &&
                                    (-1 === _positioning.getLastValidPosition.call(inputmask) &&
                                    nptValue === _positioning.getBufferTemplate.call(inputmask).join("")
                                        ? (buffer = [])
                                        : _inputHandling.clearOptionalTail.call(inputmask, buffer)),
                                !1 === _validation.isComplete.call(inputmask, buffer) &&
                                    (setTimeout(function () {
                                        $input.trigger("incomplete");
                                    }, 0),
                                    opts.clearIncomplete &&
                                        (_positioning.resetMaskSet.call(inputmask),
                                        (buffer = opts.clearMaskOnLostFocus
                                            ? []
                                            : _positioning.getBufferTemplate.call(inputmask).slice()))),
                                (0, _inputHandling.writeBuffer)(this, buffer, void 0, e)),
                                inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") &&
                                    ((inputmask.undoValue = _positioning.getBuffer.call(inputmask).join("")),
                                    $input.trigger("change"));
                        }
                    },
                    mouseenterEvent: function mouseenterEvent() {
                        var inputmask = this.inputmask,
                            opts = inputmask.opts,
                            input = this;
                        (inputmask.mouseEnter = !0),
                            (this.inputmask.shadowRoot || document).activeElement !== this &&
                                (null == inputmask.originalPlaceholder &&
                                    this.placeholder !== inputmask.originalPlaceholder &&
                                    (inputmask.originalPlaceholder = this.placeholder),
                                opts.showMaskOnHover &&
                                    (0, _inputHandling.HandleNativePlaceholder)(
                                        this,
                                        (inputmask.isRTL
                                            ? _positioning.getBufferTemplate.call(inputmask).slice().reverse()
                                            : _positioning.getBufferTemplate.call(inputmask)
                                        ).join("")
                                    ));
                    },
                    submitEvent: function submitEvent() {
                        var inputmask = this.inputmask,
                            opts = inputmask.opts;
                        inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") &&
                            inputmask.$el.trigger("change"),
                            opts.clearMaskOnLostFocus &&
                                -1 === _positioning.getLastValidPosition.call(inputmask) &&
                                inputmask._valueGet &&
                                inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") &&
                                inputmask._valueSet(""),
                            opts.clearIncomplete &&
                                !1 === _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) &&
                                inputmask._valueSet(""),
                            opts.removeMaskOnSubmit &&
                                (inputmask._valueSet(inputmask.unmaskedvalue(), !0),
                                setTimeout(function () {
                                    (0,
                                    _inputHandling.writeBuffer)(inputmask.el, _positioning.getBuffer.call(inputmask));
                                }, 0));
                    },
                    resetEvent: function resetEvent() {
                        var inputmask = this.inputmask;
                        (inputmask.refreshValue = !0),
                            setTimeout(function () {
                                (0, _inputHandling.applyInputValue)(inputmask.el, inputmask._valueGet(!0));
                            }, 0);
                    },
                };
                exports.EventHandlers = EventHandlers;
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.iphone = exports.iemobile = exports.mobile = exports.ie = exports.ua = void 0);
                var ua = (window.navigator && window.navigator.userAgent) || "",
                    ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"),
                    mobile = "ontouchstart" in window,
                    iemobile = /iemobile/i.test(ua),
                    iphone = /iphone/i.test(ua) && !iemobile;
                (exports.iphone = iphone),
                    (exports.iemobile = iemobile),
                    (exports.mobile = mobile),
                    (exports.ie = ie),
                    (exports.ua = ua);
            },
            function (module, exports) {
                module.exports = __WEBPACK_EXTERNAL_MODULE__8__;
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.mask = mask);
                var _keycode = _interopRequireDefault(__webpack_require__(0)),
                    _positioning = __webpack_require__(2),
                    _inputHandling = __webpack_require__(5),
                    _eventruler = __webpack_require__(10),
                    _environment = __webpack_require__(7),
                    _validation = __webpack_require__(4),
                    _eventhandlers = __webpack_require__(6);
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                function mask() {
                    var inputmask = this,
                        opts = this.opts,
                        el = this.el,
                        $ = this.dependencyLib;
                    function isElementTypeSupported(input, opts) {
                        function patchValueProperty(npt) {
                            var valueGet, valueSet;
                            function patchValhook(type) {
                                if (
                                    $.valHooks &&
                                    (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)
                                ) {
                                    var valhookGet =
                                            $.valHooks[type] && $.valHooks[type].get
                                                ? $.valHooks[type].get
                                                : function (elem) {
                                                      return elem.value;
                                                  },
                                        valhookSet =
                                            $.valHooks[type] && $.valHooks[type].set
                                                ? $.valHooks[type].set
                                                : function (elem, value) {
                                                      return (elem.value = value), elem;
                                                  };
                                    $.valHooks[type] = {
                                        get: function get(elem) {
                                            if (elem.inputmask) {
                                                if (elem.inputmask.opts.autoUnmask)
                                                    return elem.inputmask.unmaskedvalue();
                                                var result = valhookGet(elem);
                                                return -1 !==
                                                    _positioning.getLastValidPosition.call(
                                                        inputmask,
                                                        void 0,
                                                        void 0,
                                                        elem.inputmask.maskset.validPositions
                                                    ) || !0 !== opts.nullable
                                                    ? result
                                                    : "";
                                            }
                                            return valhookGet(elem);
                                        },
                                        set: function set(elem, value) {
                                            var result = valhookSet(elem, value);
                                            return (
                                                elem.inputmask && (0, _inputHandling.applyInputValue)(elem, value),
                                                result
                                            );
                                        },
                                        inputmaskpatch: !0,
                                    };
                                }
                            }
                            function getter() {
                                return this.inputmask
                                    ? this.inputmask.opts.autoUnmask
                                        ? this.inputmask.unmaskedvalue()
                                        : -1 !== _positioning.getLastValidPosition.call(inputmask) ||
                                          !0 !== opts.nullable
                                        ? (this.inputmask.shadowRoot || document.activeElement) === this &&
                                          opts.clearMaskOnLostFocus
                                            ? (inputmask.isRTL
                                                  ? _inputHandling.clearOptionalTail
                                                        .call(inputmask, _positioning.getBuffer.call(inputmask).slice())
                                                        .reverse()
                                                  : _inputHandling.clearOptionalTail.call(
                                                        inputmask,
                                                        _positioning.getBuffer.call(inputmask).slice()
                                                    )
                                              ).join("")
                                            : valueGet.call(this)
                                        : ""
                                    : valueGet.call(this);
                            }
                            function setter(value) {
                                valueSet.call(this, value),
                                    this.inputmask && (0, _inputHandling.applyInputValue)(this, value);
                            }
                            function installNativeValueSetFallback(npt) {
                                _eventruler.EventRuler.on(npt, "mouseenter", function () {
                                    var input = this,
                                        value = this.inputmask._valueGet(!0);
                                    value !==
                                        (inputmask.isRTL
                                            ? _positioning.getBuffer.call(inputmask).reverse()
                                            : _positioning.getBuffer.call(inputmask)
                                        ).join("") && (0, _inputHandling.applyInputValue)(this, value);
                                });
                            }
                            if (!npt.inputmask.__valueGet) {
                                if (!0 !== opts.noValuePatching) {
                                    if (Object.getOwnPropertyDescriptor) {
                                        var valueProperty = Object.getPrototypeOf
                                            ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value")
                                            : void 0;
                                        valueProperty && valueProperty.get && valueProperty.set
                                            ? ((valueGet = valueProperty.get),
                                              (valueSet = valueProperty.set),
                                              Object.defineProperty(npt, "value", {
                                                  get: getter,
                                                  set: setter,
                                                  configurable: !0,
                                              }))
                                            : "input" !== npt.tagName.toLowerCase() &&
                                              ((valueGet = function valueGet() {
                                                  return this.textContent;
                                              }),
                                              (valueSet = function valueSet(value) {
                                                  this.textContent = value;
                                              }),
                                              Object.defineProperty(npt, "value", {
                                                  get: getter,
                                                  set: setter,
                                                  configurable: !0,
                                              }));
                                    } else
                                        document.__lookupGetter__ &&
                                            npt.__lookupGetter__("value") &&
                                            ((valueGet = npt.__lookupGetter__("value")),
                                            (valueSet = npt.__lookupSetter__("value")),
                                            npt.__defineGetter__("value", getter),
                                            npt.__defineSetter__("value", setter));
                                    (npt.inputmask.__valueGet = valueGet), (npt.inputmask.__valueSet = valueSet);
                                }
                                (npt.inputmask._valueGet = function (overruleRTL) {
                                    return inputmask.isRTL && !0 !== overruleRTL
                                        ? valueGet.call(this.el).split("").reverse().join("")
                                        : valueGet.call(this.el);
                                }),
                                    (npt.inputmask._valueSet = function (value, overruleRTL) {
                                        valueSet.call(
                                            this.el,
                                            null == value
                                                ? ""
                                                : !0 !== overruleRTL && inputmask.isRTL
                                                ? value.split("").reverse().join("")
                                                : value
                                        );
                                    }),
                                    void 0 === valueGet &&
                                        ((valueGet = function valueGet() {
                                            return this.value;
                                        }),
                                        (valueSet = function valueSet(value) {
                                            this.value = value;
                                        }),
                                        patchValhook(npt.type),
                                        installNativeValueSetFallback(npt));
                            }
                        }
                        "textarea" !== input.tagName.toLowerCase() && opts.ignorables.push(_keycode.default.ENTER);
                        var elementType = input.getAttribute("type"),
                            isSupported =
                                ("input" === input.tagName.toLowerCase() &&
                                    opts.supportsInputType.includes(elementType)) ||
                                input.isContentEditable ||
                                "textarea" === input.tagName.toLowerCase();
                        if (!isSupported)
                            if ("input" === input.tagName.toLowerCase()) {
                                var el = document.createElement("input");
                                el.setAttribute("type", elementType), (isSupported = "text" === el.type), (el = null);
                            } else isSupported = "partial";
                        return !1 !== isSupported ? patchValueProperty(input) : (input.inputmask = void 0), isSupported;
                    }
                    _eventruler.EventRuler.off(el);
                    var isSupported = isElementTypeSupported(el, opts);
                    if (!1 !== isSupported) {
                        (inputmask.originalPlaceholder = el.placeholder),
                            (inputmask.maxLength = void 0 !== el ? el.maxLength : void 0),
                            -1 === inputmask.maxLength && (inputmask.maxLength = void 0),
                            "inputMode" in el &&
                                null === el.getAttribute("inputmode") &&
                                ((el.inputMode = opts.inputmode), el.setAttribute("inputmode", opts.inputmode)),
                            !0 === isSupported &&
                                ((opts.showMaskOnFocus =
                                    opts.showMaskOnFocus && -1 === ["cc-number", "cc-exp"].indexOf(el.autocomplete)),
                                _environment.iphone && (opts.insertModeVisual = !1),
                                _eventruler.EventRuler.on(el, "submit", _eventhandlers.EventHandlers.submitEvent),
                                _eventruler.EventRuler.on(el, "reset", _eventhandlers.EventHandlers.resetEvent),
                                _eventruler.EventRuler.on(el, "blur", _eventhandlers.EventHandlers.blurEvent),
                                _eventruler.EventRuler.on(el, "focus", _eventhandlers.EventHandlers.focusEvent),
                                _eventruler.EventRuler.on(el, "invalid", _eventhandlers.EventHandlers.invalidEvent),
                                _eventruler.EventRuler.on(el, "click", _eventhandlers.EventHandlers.clickEvent),
                                _eventruler.EventRuler.on(
                                    el,
                                    "mouseleave",
                                    _eventhandlers.EventHandlers.mouseleaveEvent
                                ),
                                _eventruler.EventRuler.on(
                                    el,
                                    "mouseenter",
                                    _eventhandlers.EventHandlers.mouseenterEvent
                                ),
                                _eventruler.EventRuler.on(el, "paste", _eventhandlers.EventHandlers.pasteEvent),
                                _eventruler.EventRuler.on(el, "cut", _eventhandlers.EventHandlers.cutEvent),
                                _eventruler.EventRuler.on(el, "complete", opts.oncomplete),
                                _eventruler.EventRuler.on(el, "incomplete", opts.onincomplete),
                                _eventruler.EventRuler.on(el, "cleared", opts.oncleared),
                                !0 !== opts.inputEventOnly &&
                                    (_eventruler.EventRuler.on(
                                        el,
                                        "keydown",
                                        _eventhandlers.EventHandlers.keydownEvent
                                    ),
                                    _eventruler.EventRuler.on(
                                        el,
                                        "keypress",
                                        _eventhandlers.EventHandlers.keypressEvent
                                    ),
                                    _eventruler.EventRuler.on(el, "keyup", _eventhandlers.EventHandlers.keyupEvent)),
                                (_environment.mobile || opts.inputEventOnly) && el.removeAttribute("maxLength"),
                                _eventruler.EventRuler.on(el, "input", _eventhandlers.EventHandlers.inputFallBackEvent),
                                _eventruler.EventRuler.on(
                                    el,
                                    "compositionend",
                                    _eventhandlers.EventHandlers.compositionendEvent
                                )),
                            _eventruler.EventRuler.on(el, "setvalue", _eventhandlers.EventHandlers.setValueEvent),
                            (inputmask.undoValue = _positioning.getBufferTemplate.call(inputmask).join(""));
                        var activeElement = (el.inputmask.shadowRoot || document).activeElement;
                        if (
                            "" !== el.inputmask._valueGet(!0) ||
                            !1 === opts.clearMaskOnLostFocus ||
                            activeElement === el
                        ) {
                            (0, _inputHandling.applyInputValue)(el, el.inputmask._valueGet(!0), opts);
                            var buffer = _positioning.getBuffer.call(inputmask).slice();
                            !1 === _validation.isComplete.call(inputmask, buffer) &&
                                opts.clearIncomplete &&
                                _positioning.resetMaskSet.call(inputmask),
                                opts.clearMaskOnLostFocus &&
                                    activeElement !== el &&
                                    (-1 === _positioning.getLastValidPosition.call(inputmask)
                                        ? (buffer = [])
                                        : _inputHandling.clearOptionalTail.call(inputmask, buffer)),
                                (!1 === opts.clearMaskOnLostFocus ||
                                    (opts.showMaskOnFocus && activeElement === el) ||
                                    "" !== el.inputmask._valueGet(!0)) &&
                                    (0, _inputHandling.writeBuffer)(el, buffer),
                                activeElement === el &&
                                    _positioning.caret.call(
                                        inputmask,
                                        el,
                                        _positioning.seekNext.call(
                                            inputmask,
                                            _positioning.getLastValidPosition.call(inputmask)
                                        )
                                    );
                        }
                    }
                }
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.EventRuler = void 0);
                var _inputmask = _interopRequireDefault(__webpack_require__(1)),
                    _keycode = _interopRequireDefault(__webpack_require__(0)),
                    _positioning = __webpack_require__(2),
                    _inputHandling = __webpack_require__(5);
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                var EventRuler = {
                    on: function on(input, eventName, eventHandler) {
                        var $ = input.inputmask.dependencyLib,
                            ev = function ev(e) {
                                e.originalEvent && ((e = e.originalEvent || e), (arguments[0] = e));
                                var that = this,
                                    args,
                                    inputmask = that.inputmask,
                                    opts = inputmask ? inputmask.opts : void 0;
                                if (void 0 === inputmask && "FORM" !== this.nodeName) {
                                    var imOpts = $.data(that, "_inputmask_opts");
                                    $(that).off(), imOpts && new _inputmask.default(imOpts).mask(that);
                                } else {
                                    if (
                                        ["submit", "reset", "setvalue"].includes(e.type) ||
                                        "FORM" === this.nodeName ||
                                        !(
                                            that.disabled ||
                                            (that.readOnly &&
                                                !(
                                                    ("keydown" === e.type && e.ctrlKey && 67 === e.keyCode) ||
                                                    (!1 === opts.tabThrough && e.keyCode === _keycode.default.TAB)
                                                ))
                                        )
                                    ) {
                                        switch (e.type) {
                                            case "input":
                                                if (
                                                    !0 === inputmask.skipInputEvent ||
                                                    (e.inputType && "insertCompositionText" === e.inputType)
                                                )
                                                    return (inputmask.skipInputEvent = !1), e.preventDefault();
                                                break;

                                            case "keydown":
                                                (inputmask.skipKeyPressEvent = !1),
                                                    (inputmask.skipInputEvent = inputmask.isComposing =
                                                        e.keyCode === _keycode.default.KEY_229);
                                                break;

                                            case "keyup":
                                            case "compositionend":
                                                inputmask.isComposing && (inputmask.skipInputEvent = !1);
                                                break;

                                            case "keypress":
                                                if (!0 === inputmask.skipKeyPressEvent) return e.preventDefault();
                                                inputmask.skipKeyPressEvent = !0;
                                                break;

                                            case "click":
                                            case "focus":
                                                return (
                                                    inputmask.validationEvent
                                                        ? ((inputmask.validationEvent = !1),
                                                          input.blur(),
                                                          (0, _inputHandling.HandleNativePlaceholder)(
                                                              input,
                                                              (inputmask.isRTL
                                                                  ? _positioning.getBufferTemplate
                                                                        .call(inputmask)
                                                                        .slice()
                                                                        .reverse()
                                                                  : _positioning.getBufferTemplate.call(inputmask)
                                                              ).join("")
                                                          ),
                                                          setTimeout(function () {
                                                              input.focus();
                                                          }, 3e3))
                                                        : ((args = arguments),
                                                          setTimeout(function () {
                                                              input.inputmask && eventHandler.apply(that, args);
                                                          }, 0)),
                                                    !1
                                                );
                                        }
                                        var returnVal = eventHandler.apply(that, arguments);
                                        return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
                                    }
                                    e.preventDefault();
                                }
                            };
                        (input.inputmask.events[eventName] = input.inputmask.events[eventName] || []),
                            input.inputmask.events[eventName].push(ev),
                            ["submit", "reset"].includes(eventName)
                                ? null !== input.form && $(input.form).on(eventName, ev.bind(input))
                                : $(input).on(eventName, ev);
                    },
                    off: function off(input, event) {
                        if (input.inputmask && input.inputmask.events) {
                            var $ = input.inputmask.dependencyLib,
                                events = input.inputmask.events;
                            for (var eventName in (event &&
                                ((events = []), (events[event] = input.inputmask.events[event])),
                            events)) {
                                for (var evArr = events[eventName]; 0 < evArr.length; ) {
                                    var ev = evArr.pop();
                                    ["submit", "reset"].includes(eventName)
                                        ? null !== input.form && $(input.form).off(eventName, ev)
                                        : $(input).off(eventName, ev);
                                }
                                delete input.inputmask.events[eventName];
                            }
                        }
                    },
                };
                exports.EventRuler = EventRuler;
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.default = void 0);
                var _jquery = _interopRequireDefault(__webpack_require__(8));
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                if (void 0 === _jquery.default) throw "jQuery not loaded!";
                var _default = _jquery.default;
                exports.default = _default;
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.default = void 0);
                var _default = "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window;
                exports.default = _default;
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.default = _default);
                var escapeRegexRegex = new RegExp(
                    "(\\" +
                        ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") +
                        ")",
                    "gim"
                );
                function _default(str) {
                    return str.replace(escapeRegexRegex, "\\$1");
                }
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.default = void 0),
                    __webpack_require__(15),
                    __webpack_require__(21),
                    __webpack_require__(22),
                    __webpack_require__(23);
                var _inputmask2 = _interopRequireDefault(__webpack_require__(1));
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                var _default = _inputmask2.default;
                exports.default = _default;
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                var _inputmask = _interopRequireDefault(__webpack_require__(1));
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                _inputmask.default.extendDefinitions({
                    A: {
                        validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        casing: "upper",
                    },
                    "&": {
                        validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        casing: "upper",
                    },
                    "#": {
                        validator: "[0-9A-Fa-f]",
                        casing: "upper",
                    },
                });
                var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
                function ipValidator(chrs, maskset, pos, strict, opts) {
                    return (
                        (chrs =
                            -1 < pos - 1 && "." !== maskset.buffer[pos - 1]
                                ? ((chrs = maskset.buffer[pos - 1] + chrs),
                                  -1 < pos - 2 && "." !== maskset.buffer[pos - 2]
                                      ? maskset.buffer[pos - 2] + chrs
                                      : "0" + chrs)
                                : "00" + chrs),
                        ipValidatorRegex.test(chrs)
                    );
                }
                _inputmask.default.extendAliases({
                    cssunit: {
                        regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)",
                    },
                    url: {
                        regex: "(https?|ftp)://.*",
                        autoUnmask: !1,
                        keepStatic: !1,
                        tabThrough: !0,
                    },
                    ip: {
                        mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
                        definitions: {
                            i: {
                                validator: ipValidator,
                            },
                            j: {
                                validator: ipValidator,
                            },
                            k: {
                                validator: ipValidator,
                            },
                            l: {
                                validator: ipValidator,
                            },
                        },
                        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                            return maskedValue;
                        },
                        inputmode: "numeric",
                    },
                    email: {
                        mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                        greedy: !1,
                        casing: "lower",
                        onBeforePaste: function onBeforePaste(pastedValue, opts) {
                            return (pastedValue = pastedValue.toLowerCase()), pastedValue.replace("mailto:", "");
                        },
                        definitions: {
                            "*": {
                                validator:
                                    "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]",
                            },
                            "-": {
                                validator: "[0-9A-Za-z-]",
                            },
                        },
                        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                            return maskedValue;
                        },
                        inputmode: "email",
                    },
                    mac: {
                        mask: "##:##:##:##:##:##",
                    },
                    vin: {
                        mask: "V{13}9{4}",
                        definitions: {
                            V: {
                                validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                                casing: "upper",
                            },
                        },
                        clearIncomplete: !0,
                        autoUnmask: !0,
                    },
                    ssn: {
                        mask: "999-99-9999",
                        postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
                            return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(
                                buffer.join("")
                            );
                        },
                    },
                });
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                function _typeof(obj) {
                    return (
                        (_typeof =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function _typeof(obj) {
                                      return typeof obj;
                                  }
                                : function _typeof(obj) {
                                      return obj &&
                                          "function" == typeof Symbol &&
                                          obj.constructor === Symbol &&
                                          obj !== Symbol.prototype
                                          ? "symbol"
                                          : typeof obj;
                                  }),
                        _typeof(obj)
                    );
                }
                "function" != typeof Object.getPrototypeOf &&
                    (Object.getPrototypeOf =
                        "object" === _typeof("test".__proto__)
                            ? function (object) {
                                  return object.__proto__;
                              }
                            : function (object) {
                                  return object.constructor.prototype;
                              });
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Array.prototype.includes ||
                    Object.defineProperty(Array.prototype, "includes", {
                        value: function value(searchElement, fromIndex) {
                            if (null == this) throw new TypeError('"this" is null or not defined');
                            var o = Object(this),
                                len = o.length >>> 0;
                            if (0 == len) return !1;
                            for (var n = 0 | fromIndex, k = Math.max(0 <= n ? n : len - Math.abs(n), 0); k < len; ) {
                                if (o[k] === searchElement) return !0;
                                k++;
                            }
                            return !1;
                        },
                    });
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.generateMaskSet = generateMaskSet),
                    (exports.analyseMask = analyseMask);
                var _inputmask = _interopRequireDefault(__webpack_require__(11));
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                function generateMaskSet(opts, nocache) {
                    var ms;
                    function generateMask(mask, metadata, opts) {
                        var regexMask = !1,
                            masksetDefinition,
                            maskdefKey;
                        if (
                            ((null !== mask && "" !== mask) ||
                                ((regexMask = null !== opts.regex),
                                (mask = regexMask
                                    ? ((mask = opts.regex), mask.replace(/^(\^)(.*)(\$)$/, "$2"))
                                    : ((regexMask = !0), ".*"))),
                            1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""),
                            0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat)
                        ) {
                            var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                            mask =
                                opts.groupmarker[0] +
                                mask +
                                opts.groupmarker[1] +
                                opts.quantifiermarker[0] +
                                repeatStart +
                                "," +
                                opts.repeat +
                                opts.quantifiermarker[1];
                        }
                        return (
                            (maskdefKey = regexMask
                                ? "regex_" + opts.regex
                                : opts.numericInput
                                ? mask.split("").reverse().join("")
                                : mask),
                            !1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey),
                            void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache
                                ? ((masksetDefinition = {
                                      mask: mask,
                                      maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                                      validPositions: {},
                                      _buffer: void 0,
                                      buffer: void 0,
                                      tests: {},
                                      excludes: {},
                                      metadata: metadata,
                                      maskLength: void 0,
                                      jitOffset: {},
                                  }),
                                  !0 !== nocache &&
                                      ((Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition),
                                      (masksetDefinition = _inputmask.default.extend(
                                          !0,
                                          {},
                                          Inputmask.prototype.masksCache[maskdefKey]
                                      ))))
                                : (masksetDefinition = _inputmask.default.extend(
                                      !0,
                                      {},
                                      Inputmask.prototype.masksCache[maskdefKey]
                                  )),
                            masksetDefinition
                        );
                    }
                    if (("function" == typeof opts.mask && (opts.mask = opts.mask(opts)), Array.isArray(opts.mask))) {
                        if (1 < opts.mask.length) {
                            null === opts.keepStatic && (opts.keepStatic = !0);
                            var altMask = opts.groupmarker[0];
                            return (
                                (opts.isRTL ? opts.mask.reverse() : opts.mask).forEach(function (msk) {
                                    1 < altMask.length &&
                                        (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]),
                                        void 0 !== msk.mask && "function" != typeof msk.mask
                                            ? (altMask += msk.mask)
                                            : (altMask += msk);
                                }),
                                (altMask += opts.groupmarker[1]),
                                generateMask(altMask, opts.mask, opts)
                            );
                        }
                        opts.mask = opts.mask.pop();
                    }
                    return (
                        null === opts.keepStatic && (opts.keepStatic = !1),
                        (ms =
                            opts.mask && void 0 !== opts.mask.mask && "function" != typeof opts.mask.mask
                                ? generateMask(opts.mask.mask, opts.mask, opts)
                                : generateMask(opts.mask, opts.mask, opts)),
                        ms
                    );
                }
                function analyseMask(mask, regexMask, opts) {
                    var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                        regexTokenizer =
                            /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                        escaped = !1,
                        currentToken = new MaskToken(),
                        match,
                        m,
                        openenings = [],
                        maskTokens = [],
                        openingToken,
                        currentOpeningToken,
                        alternator,
                        lastMatch,
                        closeRegexGroup = !1;
                    function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                        (this.matches = []),
                            (this.openGroup = isGroup || !1),
                            (this.alternatorGroup = !1),
                            (this.isGroup = isGroup || !1),
                            (this.isOptional = isOptional || !1),
                            (this.isQuantifier = isQuantifier || !1),
                            (this.isAlternator = isAlternator || !1),
                            (this.quantifier = {
                                min: 1,
                                max: 1,
                            });
                    }
                    function insertTestDefinition(mtoken, element, position) {
                        position = void 0 !== position ? position : mtoken.matches.length;
                        var prevMatch = mtoken.matches[position - 1];
                        if (regexMask)
                            0 === element.indexOf("[") || (escaped && /\\d|\\s|\\w]/i.test(element)) || "." === element
                                ? mtoken.matches.splice(position++, 0, {
                                      fn: new RegExp(element, opts.casing ? "i" : ""),
                                      static: !1,
                                      optionality: !1,
                                      newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
                                      casing: null,
                                      def: element,
                                      placeholder: void 0,
                                      nativeDef: element,
                                  })
                                : (escaped && (element = element[element.length - 1]),
                                  element.split("").forEach(function (lmnt, ndx) {
                                      (prevMatch = mtoken.matches[position - 1]),
                                          mtoken.matches.splice(position++, 0, {
                                              fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt)
                                                  ? new RegExp(
                                                        "[" + (opts.staticDefinitionSymbol || lmnt) + "]",
                                                        opts.casing ? "i" : ""
                                                    )
                                                  : null,
                                              static: !0,
                                              optionality: !1,
                                              newBlockMarker:
                                                  void 0 === prevMatch
                                                      ? "master"
                                                      : prevMatch.def !== lmnt && !0 !== prevMatch.static,
                                              casing: null,
                                              def: opts.staticDefinitionSymbol || lmnt,
                                              placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
                                              nativeDef: (escaped ? "'" : "") + lmnt,
                                          });
                                  })),
                                (escaped = !1);
                        else {
                            var maskdef =
                                (opts.definitions && opts.definitions[element]) ||
                                (opts.usePrototypeDefinitions && Inputmask.prototype.definitions[element]);
                            maskdef && !escaped
                                ? mtoken.matches.splice(position++, 0, {
                                      fn: maskdef.validator
                                          ? "string" == typeof maskdef.validator
                                              ? new RegExp(maskdef.validator, opts.casing ? "i" : "")
                                              : new (function () {
                                                    this.test = maskdef.validator;
                                                })()
                                          : new RegExp("."),
                                      static: maskdef.static || !1,
                                      optionality: !1,
                                      newBlockMarker:
                                          void 0 === prevMatch
                                              ? "master"
                                              : prevMatch.def !== (maskdef.definitionSymbol || element),
                                      casing: maskdef.casing,
                                      def: maskdef.definitionSymbol || element,
                                      placeholder: maskdef.placeholder,
                                      nativeDef: element,
                                      generated: maskdef.generated,
                                  })
                                : (mtoken.matches.splice(position++, 0, {
                                      fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element)
                                          ? new RegExp(
                                                "[" + (opts.staticDefinitionSymbol || element) + "]",
                                                opts.casing ? "i" : ""
                                            )
                                          : null,
                                      static: !0,
                                      optionality: !1,
                                      newBlockMarker:
                                          void 0 === prevMatch
                                              ? "master"
                                              : prevMatch.def !== element && !0 !== prevMatch.static,
                                      casing: null,
                                      def: opts.staticDefinitionSymbol || element,
                                      placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
                                      nativeDef: (escaped ? "'" : "") + element,
                                  }),
                                  (escaped = !1));
                        }
                    }
                    function verifyGroupMarker(maskToken) {
                        maskToken &&
                            maskToken.matches &&
                            maskToken.matches.forEach(function (token, ndx) {
                                var nextToken = maskToken.matches[ndx + 1];
                                (void 0 === nextToken ||
                                    void 0 === nextToken.matches ||
                                    !1 === nextToken.isQuantifier) &&
                                    token &&
                                    token.isGroup &&
                                    ((token.isGroup = !1),
                                    regexMask ||
                                        (insertTestDefinition(token, opts.groupmarker[0], 0),
                                        !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))),
                                    verifyGroupMarker(token);
                            });
                    }
                    function defaultCase() {
                        if (0 < openenings.length) {
                            if (
                                ((currentOpeningToken = openenings[openenings.length - 1]),
                                insertTestDefinition(currentOpeningToken, m),
                                currentOpeningToken.isAlternator)
                            ) {
                                alternator = openenings.pop();
                                for (var mndx = 0; mndx < alternator.matches.length; mndx++)
                                    alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
                                0 < openenings.length
                                    ? ((currentOpeningToken = openenings[openenings.length - 1]),
                                      currentOpeningToken.matches.push(alternator))
                                    : currentToken.matches.push(alternator);
                            }
                        } else insertTestDefinition(currentToken, m);
                    }
                    function reverseTokens(maskToken) {
                        function reverseStatic(st) {
                            return (
                                st === opts.optionalmarker[0]
                                    ? (st = opts.optionalmarker[1])
                                    : st === opts.optionalmarker[1]
                                    ? (st = opts.optionalmarker[0])
                                    : st === opts.groupmarker[0]
                                    ? (st = opts.groupmarker[1])
                                    : st === opts.groupmarker[1] && (st = opts.groupmarker[0]),
                                st
                            );
                        }
                        for (var match in ((maskToken.matches = maskToken.matches.reverse()), maskToken.matches))
                            if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
                                var intMatch = parseInt(match);
                                if (
                                    maskToken.matches[match].isQuantifier &&
                                    maskToken.matches[intMatch + 1] &&
                                    maskToken.matches[intMatch + 1].isGroup
                                ) {
                                    var qt = maskToken.matches[match];
                                    maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                                }
                                void 0 !== maskToken.matches[match].matches
                                    ? (maskToken.matches[match] = reverseTokens(maskToken.matches[match]))
                                    : (maskToken.matches[match] = reverseStatic(maskToken.matches[match]));
                            }
                        return maskToken;
                    }
                    function groupify(matches) {
                        var groupToken = new MaskToken(!0);
                        return (groupToken.openGroup = !1), (groupToken.matches = matches), groupToken;
                    }
                    function closeGroup() {
                        if (((openingToken = openenings.pop()), (openingToken.openGroup = !1), void 0 !== openingToken))
                            if (0 < openenings.length) {
                                if (
                                    ((currentOpeningToken = openenings[openenings.length - 1]),
                                    currentOpeningToken.matches.push(openingToken),
                                    currentOpeningToken.isAlternator)
                                ) {
                                    alternator = openenings.pop();
                                    for (var mndx = 0; mndx < alternator.matches.length; mndx++)
                                        (alternator.matches[mndx].isGroup = !1),
                                            (alternator.matches[mndx].alternatorGroup = !1);
                                    0 < openenings.length
                                        ? ((currentOpeningToken = openenings[openenings.length - 1]),
                                          currentOpeningToken.matches.push(alternator))
                                        : currentToken.matches.push(alternator);
                                }
                            } else currentToken.matches.push(openingToken);
                        else defaultCase();
                    }
                    function groupQuantifier(matches) {
                        var lastMatch = matches.pop();
                        return lastMatch.isQuantifier && (lastMatch = groupify([matches.pop(), lastMatch])), lastMatch;
                    }
                    for (
                        regexMask && ((opts.optionalmarker[0] = void 0), (opts.optionalmarker[1] = void 0));
                        (match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask));

                    ) {
                        if (((m = match[0]), regexMask))
                            switch (m.charAt(0)) {
                                case "?":
                                    m = "{0,1}";
                                    break;

                                case "+":
                                case "*":
                                    m = "{" + m + "}";
                                    break;

                                case "|":
                                    if (0 === openenings.length) {
                                        var altRegexGroup = groupify(currentToken.matches);
                                        (altRegexGroup.openGroup = !0),
                                            openenings.push(altRegexGroup),
                                            (currentToken.matches = []),
                                            (closeRegexGroup = !0);
                                    }
                                    break;
                            }
                        if (escaped) defaultCase();
                        else
                            switch (m.charAt(0)) {
                                case "$":
                                case "^":
                                    regexMask || defaultCase();
                                    break;

                                case "(?=":
                                    break;

                                case "(?!":
                                    break;

                                case "(?<=":
                                    break;

                                case "(?<!":
                                    break;

                                case opts.escapeChar:
                                    (escaped = !0), regexMask && defaultCase();
                                    break;

                                case opts.optionalmarker[1]:
                                case opts.groupmarker[1]:
                                    closeGroup();
                                    break;

                                case opts.optionalmarker[0]:
                                    openenings.push(new MaskToken(!1, !0));
                                    break;

                                case opts.groupmarker[0]:
                                    openenings.push(new MaskToken(!0));
                                    break;

                                case opts.quantifiermarker[0]:
                                    var quantifier = new MaskToken(!1, !1, !0);
                                    m = m.replace(/[{}]/g, "");
                                    var mqj = m.split("|"),
                                        mq = mqj[0].split(","),
                                        mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                                        mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                                    ("*" !== mq0 && "+" !== mq0) || (mq0 = "*" === mq1 ? 0 : 1),
                                        (quantifier.quantifier = {
                                            min: mq0,
                                            max: mq1,
                                            jit: mqj[1],
                                        });
                                    var matches =
                                        0 < openenings.length
                                            ? openenings[openenings.length - 1].matches
                                            : currentToken.matches;
                                    if (((match = matches.pop()), match.isAlternator)) {
                                        matches.push(match), (matches = match.matches);
                                        var groupToken = new MaskToken(!0),
                                            tmpMatch = matches.pop();
                                        matches.push(groupToken), (matches = groupToken.matches), (match = tmpMatch);
                                    }
                                    match.isGroup || (match = groupify([match])),
                                        matches.push(match),
                                        matches.push(quantifier);
                                    break;

                                case opts.alternatormarker:
                                    if (0 < openenings.length) {
                                        currentOpeningToken = openenings[openenings.length - 1];
                                        var subToken =
                                            currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                                        lastMatch =
                                            currentOpeningToken.openGroup &&
                                            (void 0 === subToken.matches ||
                                                (!1 === subToken.isGroup && !1 === subToken.isAlternator))
                                                ? openenings.pop()
                                                : groupQuantifier(currentOpeningToken.matches);
                                    } else lastMatch = groupQuantifier(currentToken.matches);
                                    if (lastMatch.isAlternator) openenings.push(lastMatch);
                                    else if (
                                        (lastMatch.alternatorGroup
                                            ? ((alternator = openenings.pop()), (lastMatch.alternatorGroup = !1))
                                            : (alternator = new MaskToken(!1, !1, !1, !0)),
                                        alternator.matches.push(lastMatch),
                                        openenings.push(alternator),
                                        lastMatch.openGroup)
                                    ) {
                                        lastMatch.openGroup = !1;
                                        var alternatorGroup = new MaskToken(!0);
                                        (alternatorGroup.alternatorGroup = !0), openenings.push(alternatorGroup);
                                    }
                                    break;

                                default:
                                    defaultCase();
                            }
                    }
                    for (closeRegexGroup && closeGroup(); 0 < openenings.length; )
                        (openingToken = openenings.pop()), currentToken.matches.push(openingToken);
                    return (
                        0 < currentToken.matches.length &&
                            (verifyGroupMarker(currentToken), maskTokens.push(currentToken)),
                        (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]),
                        maskTokens
                    );
                }
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.default = void 0);
                var _default = {
                    9: {
                        validator: "[0-9\uff10-\uff19]",
                        definitionSymbol: "*",
                    },
                    a: {
                        validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        definitionSymbol: "*",
                    },
                    "*": {
                        validator: "[0-9\uff10-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    },
                };
                exports.default = _default;
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.default = void 0);
                var _default = {
                    _maxTestPos: 500,
                    placeholder: "_",
                    optionalmarker: ["[", "]"],
                    quantifiermarker: ["{", "}"],
                    groupmarker: ["(", ")"],
                    alternatormarker: "|",
                    escapeChar: "\\",
                    mask: null,
                    regex: null,
                    oncomplete: function oncomplete() {},
                    onincomplete: function onincomplete() {},
                    oncleared: function oncleared() {},
                    repeat: 0,
                    greedy: !1,
                    autoUnmask: !1,
                    removeMaskOnSubmit: !1,
                    clearMaskOnLostFocus: !0,
                    insertMode: !0,
                    insertModeVisual: !0,
                    clearIncomplete: !1,
                    alias: null,
                    onKeyDown: function onKeyDown() {},
                    onBeforeMask: null,
                    onBeforePaste: function onBeforePaste(pastedValue, opts) {
                        return "function" == typeof opts.onBeforeMask
                            ? opts.onBeforeMask.call(this, pastedValue, opts)
                            : pastedValue;
                    },
                    onBeforeWrite: null,
                    onUnMask: null,
                    showMaskOnFocus: !0,
                    showMaskOnHover: !0,
                    onKeyValidation: function onKeyValidation() {},
                    skipOptionalPartCharacter: " ",
                    numericInput: !1,
                    rightAlign: !1,
                    undoOnEscape: !0,
                    radixPoint: "",
                    _radixDance: !1,
                    groupSeparator: "",
                    keepStatic: null,
                    positionCaretOnTab: !0,
                    tabThrough: !1,
                    supportsInputType: ["text", "tel", "url", "password", "search"],
                    ignorables: [
                        8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118,
                        119, 120, 121, 122, 123, 0, 229,
                    ],
                    isComplete: null,
                    preValidation: null,
                    postValidation: null,
                    staticDefinitionSymbol: void 0,
                    jitMasking: !1,
                    nullable: !0,
                    inputEventOnly: !1,
                    noValuePatching: !1,
                    positionCaretOnClick: "lvp",
                    casing: null,
                    inputmode: "text",
                    importDataAttributes: !0,
                    shiftPositions: !0,
                    usePrototypeDefinitions: !0,
                };
                exports.default = _default;
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                var _inputmask = _interopRequireDefault(__webpack_require__(1)),
                    _keycode = _interopRequireDefault(__webpack_require__(0)),
                    _escapeRegex = _interopRequireDefault(__webpack_require__(13)),
                    _positioning = __webpack_require__(2);
                function _typeof(obj) {
                    return (
                        (_typeof =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function _typeof(obj) {
                                      return typeof obj;
                                  }
                                : function _typeof(obj) {
                                      return obj &&
                                          "function" == typeof Symbol &&
                                          obj.constructor === Symbol &&
                                          obj !== Symbol.prototype
                                          ? "symbol"
                                          : typeof obj;
                                  }),
                        _typeof(obj)
                    );
                }
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                var $ = _inputmask.default.dependencyLib,
                    currentYear = new Date().getFullYear(),
                    formatCode = {
                        d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
                        dd: [
                            "0[1-9]|[12][0-9]|3[01]",
                            Date.prototype.setDate,
                            "day",
                            function () {
                                return pad(Date.prototype.getDate.call(this), 2);
                            },
                        ],
                        ddd: [""],
                        dddd: [""],
                        m: [
                            "[1-9]|1[012]",
                            Date.prototype.setMonth,
                            "month",
                            function () {
                                return Date.prototype.getMonth.call(this) + 1;
                            },
                        ],
                        mm: [
                            "0[1-9]|1[012]",
                            Date.prototype.setMonth,
                            "month",
                            function () {
                                return pad(Date.prototype.getMonth.call(this) + 1, 2);
                            },
                        ],
                        mmm: [""],
                        mmmm: [""],
                        yy: [
                            "[0-9]{2}",
                            Date.prototype.setFullYear,
                            "year",
                            function () {
                                return pad(Date.prototype.getFullYear.call(this), 2);
                            },
                        ],
                        yyyy: [
                            "[0-9]{4}",
                            Date.prototype.setFullYear,
                            "year",
                            function () {
                                return pad(Date.prototype.getFullYear.call(this), 4);
                            },
                        ],
                        h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
                        hh: [
                            "0[1-9]|1[0-2]",
                            Date.prototype.setHours,
                            "hours",
                            function () {
                                return pad(Date.prototype.getHours.call(this), 2);
                            },
                        ],
                        hx: [
                            function (x) {
                                return "[0-9]{".concat(x, "}");
                            },
                            Date.prototype.setHours,
                            "hours",
                            function (x) {
                                return Date.prototype.getHours;
                            },
                        ],
                        H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
                        HH: [
                            "0[0-9]|1[0-9]|2[0-3]",
                            Date.prototype.setHours,
                            "hours",
                            function () {
                                return pad(Date.prototype.getHours.call(this), 2);
                            },
                        ],
                        Hx: [
                            function (x) {
                                return "[0-9]{".concat(x, "}");
                            },
                            Date.prototype.setHours,
                            "hours",
                            function (x) {
                                return function () {
                                    return pad(Date.prototype.getHours.call(this), x);
                                };
                            },
                        ],
                        M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
                        MM: [
                            "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]",
                            Date.prototype.setMinutes,
                            "minutes",
                            function () {
                                return pad(Date.prototype.getMinutes.call(this), 2);
                            },
                        ],
                        s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
                        ss: [
                            "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]",
                            Date.prototype.setSeconds,
                            "seconds",
                            function () {
                                return pad(Date.prototype.getSeconds.call(this), 2);
                            },
                        ],
                        l: [
                            "[0-9]{3}",
                            Date.prototype.setMilliseconds,
                            "milliseconds",
                            function () {
                                return pad(Date.prototype.getMilliseconds.call(this), 3);
                            },
                        ],
                        L: [
                            "[0-9]{2}",
                            Date.prototype.setMilliseconds,
                            "milliseconds",
                            function () {
                                return pad(Date.prototype.getMilliseconds.call(this), 2);
                            },
                        ],
                        t: ["[ap]"],
                        tt: ["[ap]m"],
                        T: ["[AP]"],
                        TT: ["[AP]M"],
                        Z: [""],
                        o: [""],
                        S: [""],
                    },
                    formatAlias = {
                        isoDate: "yyyy-mm-dd",
                        isoTime: "HH:MM:ss",
                        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
                    };
                function formatcode(match) {
                    var dynMatches = new RegExp("\\d+$").exec(match[0]);
                    if (dynMatches && void 0 !== dynMatches[0]) {
                        var fcode = formatCode[match[0][0] + "x"].slice("");
                        return (fcode[0] = fcode[0](dynMatches[0])), (fcode[3] = fcode[3](dynMatches[0])), fcode;
                    }
                    if (formatCode[match[0]]) return formatCode[match[0]];
                }
                function getTokenizer(opts) {
                    if (!opts.tokenizer) {
                        var tokens = [],
                            dyntokens = [];
                        for (var ndx in formatCode)
                            if (/\.*x$/.test(ndx)) {
                                var dynToken = ndx[0] + "\\d+";
                                -1 === dyntokens.indexOf(dynToken) && dyntokens.push(dynToken);
                            } else -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
                        (opts.tokenizer =
                            "(" +
                            (0 < dyntokens.length ? dyntokens.join("|") + "|" : "") +
                            tokens.join("+|") +
                            ")+?|."),
                            (opts.tokenizer = new RegExp(opts.tokenizer, "g"));
                    }
                    return opts.tokenizer;
                }
                function prefillYear(dateParts, currentResult, opts) {
                    if (dateParts.year !== dateParts.rawyear) {
                        var crrntyear = currentYear.toString(),
                            enteredPart = dateParts.rawyear.replace(/[^0-9]/g, ""),
                            currentYearPart = crrntyear.slice(0, enteredPart.length),
                            currentYearNextPart = crrntyear.slice(enteredPart.length);
                        if (2 === enteredPart.length && enteredPart === currentYearPart) {
                            var entryCurrentYear = new Date(currentYear, dateParts.month - 1, dateParts.day);
                            dateParts.day == entryCurrentYear.getDate() &&
                                (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime()) &&
                                (dateParts.date.setFullYear(currentYear),
                                (dateParts.year = crrntyear),
                                (currentResult.insert = [
                                    {
                                        pos: currentResult.pos + 1,
                                        c: currentYearNextPart[0],
                                    },
                                    {
                                        pos: currentResult.pos + 2,
                                        c: currentYearNextPart[1],
                                    },
                                ]));
                        }
                    }
                    return currentResult;
                }
                function isValidDate(dateParts, currentResult, opts) {
                    if (
                        void 0 === dateParts.rawday ||
                        (!isFinite(dateParts.rawday) &&
                            new Date(
                                dateParts.date.getFullYear(),
                                isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1,
                                0
                            ).getDate() >= dateParts.day) ||
                        ("29" == dateParts.day && !isFinite(dateParts.rawyear)) ||
                        new Date(
                            dateParts.date.getFullYear(),
                            isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1,
                            0
                        ).getDate() >= dateParts.day
                    )
                        return currentResult;
                    if ("29" == dateParts.day) {
                        var tokenMatch = getTokenMatch(currentResult.pos, opts);
                        if (
                            "yyyy" === tokenMatch.targetMatch[0] &&
                            currentResult.pos - tokenMatch.targetMatchIndex == 2
                        )
                            return (currentResult.remove = currentResult.pos + 1), currentResult;
                    } else if ("02" == dateParts.month && "30" == dateParts.day)
                        return (
                            (dateParts.day = "03"),
                            dateParts.date.setDate(3),
                            dateParts.date.setMonth(1),
                            (currentResult.insert = [
                                {
                                    pos: currentResult.pos,
                                    c: "0",
                                },
                                {
                                    pos: currentResult.pos + 1,
                                    c: currentResult.c,
                                },
                            ]),
                            (currentResult.caret = _positioning.seekNext.call(this, currentResult.pos + 1)),
                            currentResult
                        );
                    return !1;
                }
                function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
                    if (!result) return result;
                    if (opts.min) {
                        if (dateParts.rawyear) {
                            var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""),
                                minYear = opts.min.year.substr(0, rawYear.length),
                                maxYear;
                            if (rawYear < minYear) {
                                var tokenMatch = getTokenMatch(result.pos, opts);
                                if (
                                    ((rawYear = dateParts.rawyear
                                        .substr(0, result.pos - tokenMatch.targetMatchIndex + 1)
                                        .replace(/[^0-9]/g, "0")),
                                    (minYear = opts.min.year.substr(0, rawYear.length)),
                                    minYear <= rawYear)
                                )
                                    return (result.remove = tokenMatch.targetMatchIndex + rawYear.length), result;
                                if (
                                    ((rawYear =
                                        "yyyy" === tokenMatch.targetMatch[0]
                                            ? dateParts.rawyear.substr(1, 1)
                                            : dateParts.rawyear.substr(0, 1)),
                                    (minYear = opts.min.year.substr(2, 1)),
                                    (maxYear = opts.max ? opts.max.year.substr(2, 1) : rawYear),
                                    1 === rawYear.length &&
                                        minYear <= rawYear &&
                                        rawYear <= maxYear &&
                                        !0 !== fromCheckval)
                                )
                                    return (
                                        "yyyy" === tokenMatch.targetMatch[0]
                                            ? ((result.insert = [
                                                  {
                                                      pos: result.pos + 1,
                                                      c: rawYear,
                                                      strict: !0,
                                                  },
                                              ]),
                                              (result.caret = result.pos + 2),
                                              (maskset.validPositions[result.pos].input = opts.min.year[1]))
                                            : ((result.insert = [
                                                  {
                                                      pos: result.pos + 1,
                                                      c: opts.min.year[1],
                                                      strict: !0,
                                                  },
                                                  {
                                                      pos: result.pos + 2,
                                                      c: rawYear,
                                                      strict: !0,
                                                  },
                                              ]),
                                              (result.caret = result.pos + 3),
                                              (maskset.validPositions[result.pos].input = opts.min.year[0])),
                                        result
                                    );
                                result = !1;
                            }
                        }
                        result &&
                            dateParts.year &&
                            dateParts.year === dateParts.rawyear &&
                            opts.min.date.getTime() == opts.min.date.getTime() &&
                            (result = opts.min.date.getTime() <= dateParts.date.getTime());
                    }
                    return (
                        result &&
                            opts.max &&
                            opts.max.date.getTime() == opts.max.date.getTime() &&
                            (result = opts.max.date.getTime() >= dateParts.date.getTime()),
                        result
                    );
                }
                function parse(format, dateObjValue, opts, raw) {
                    var mask = "",
                        match,
                        fcode;
                    for (getTokenizer(opts).lastIndex = 0; (match = getTokenizer(opts).exec(format)); )
                        if (void 0 === dateObjValue)
                            if ((fcode = formatcode(match))) mask += "(" + fcode[0] + ")";
                            else
                                switch (match[0]) {
                                    case "[":
                                        mask += "(";
                                        break;

                                    case "]":
                                        mask += ")?";
                                        break;

                                    default:
                                        mask += (0, _escapeRegex.default)(match[0]);
                                }
                        else if ((fcode = formatcode(match)))
                            if (!0 !== raw && fcode[3]) {
                                var getFn = fcode[3];
                                mask += getFn.call(dateObjValue.date);
                            } else fcode[2] ? (mask += dateObjValue["raw" + fcode[2]]) : (mask += match[0]);
                        else mask += match[0];
                    return mask;
                }
                function pad(val, len) {
                    for (val = String(val), len = len || 2; val.length < len; ) val = "0" + val;
                    return val;
                }
                function analyseMask(maskString, format, opts) {
                    var dateObj = {
                            date: new Date(1, 0, 1),
                        },
                        targetProp,
                        mask = maskString,
                        match,
                        dateOperation;
                    function setValue(dateObj, value, opts) {
                        if (
                            ((dateObj[targetProp] = value.replace(/[^0-9]/g, "0")),
                            (dateObj["raw" + targetProp] = value),
                            void 0 !== dateOperation)
                        ) {
                            var datavalue = dateObj[targetProp];
                            "day" === targetProp && 0 === parseInt(datavalue) && (datavalue = 1),
                                "month" === targetProp &&
                                    ((datavalue = parseInt(datavalue)), 0 < datavalue) &&
                                    (datavalue -= 1),
                                dateOperation.call(dateObj.date, datavalue);
                        }
                    }
                    if ("string" == typeof mask) {
                        for (getTokenizer(opts).lastIndex = 0; (match = getTokenizer(opts).exec(format)); ) {
                            var dynMatches = new RegExp("\\d+$").exec(match[0]),
                                fcode = dynMatches ? match[0][0] + "x" : match[0],
                                value = void 0;
                            if (dynMatches) {
                                var lastIndex = getTokenizer(opts).lastIndex,
                                    tokanMatch = getTokenMatch(match.index, opts);
                                (getTokenizer(opts).lastIndex = lastIndex),
                                    (value = mask.slice(0, mask.indexOf(tokanMatch.nextMatch[0])));
                            } else value = mask.slice(0, fcode.length);
                            Object.prototype.hasOwnProperty.call(formatCode, fcode) &&
                                ((targetProp = formatCode[fcode][2]),
                                (dateOperation = formatCode[fcode][1]),
                                setValue(dateObj, value, opts)),
                                (mask = mask.slice(value.length));
                        }
                        return dateObj;
                    }
                    if (mask && "object" === _typeof(mask) && Object.prototype.hasOwnProperty.call(mask, "date"))
                        return mask;
                }
                function importDate(dateObj, opts) {
                    return parse(
                        opts.inputFormat,
                        {
                            date: dateObj,
                        },
                        opts
                    );
                }
                function getTokenMatch(pos, opts) {
                    var calcPos = 0,
                        targetMatch,
                        match,
                        matchLength = 0;
                    for (getTokenizer(opts).lastIndex = 0; (match = getTokenizer(opts).exec(opts.inputFormat)); ) {
                        var dynMatches = new RegExp("\\d+$").exec(match[0]);
                        if (
                            ((matchLength = dynMatches ? parseInt(dynMatches[0]) : match[0].length),
                            (calcPos += matchLength),
                            pos <= calcPos)
                        ) {
                            (targetMatch = match), (match = getTokenizer(opts).exec(opts.inputFormat));
                            break;
                        }
                    }
                    return {
                        targetMatchIndex: calcPos - matchLength,
                        nextMatch: match,
                        targetMatch: targetMatch,
                    };
                }
                _inputmask.default.extendAliases({
                    datetime: {
                        mask: function mask(opts) {
                            return (
                                (opts.numericInput = !1),
                                (formatCode.S = opts.i18n.ordinalSuffix.join("|")),
                                (opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat),
                                (opts.displayFormat =
                                    formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat),
                                (opts.outputFormat =
                                    formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat),
                                (opts.placeholder =
                                    "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, "")),
                                (opts.regex = parse(opts.inputFormat, void 0, opts)),
                                (opts.min = analyseMask(opts.min, opts.inputFormat, opts)),
                                (opts.max = analyseMask(opts.max, opts.inputFormat, opts)),
                                null
                            );
                        },
                        placeholder: "",
                        inputFormat: "isoDateTime",
                        displayFormat: void 0,
                        outputFormat: void 0,
                        min: null,
                        max: null,
                        skipOptionalPartCharacter: "",
                        i18n: {
                            dayNames: [
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                                "Sun",
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday",
                            ],
                            monthNames: [
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                            ],
                            ordinalSuffix: ["st", "nd", "rd", "th"],
                        },
                        preValidation: function preValidation(
                            buffer,
                            pos,
                            c,
                            isSelection,
                            opts,
                            maskset,
                            caretPos,
                            strict
                        ) {
                            if (strict) return !0;
                            if (isNaN(c) && buffer[pos] !== c) {
                                var tokenMatch = getTokenMatch(pos, opts);
                                if (
                                    tokenMatch.nextMatch &&
                                    tokenMatch.nextMatch[0] === c &&
                                    1 < tokenMatch.targetMatch[0].length
                                ) {
                                    var validator = formatCode[tokenMatch.targetMatch[0]][0];
                                    if (new RegExp(validator).test("0" + buffer[pos - 1]))
                                        return (
                                            (buffer[pos] = buffer[pos - 1]),
                                            (buffer[pos - 1] = "0"),
                                            {
                                                fuzzy: !0,
                                                buffer: buffer,
                                                refreshFromBuffer: {
                                                    start: pos - 1,
                                                    end: pos + 1,
                                                },
                                                pos: pos + 1,
                                            }
                                        );
                                }
                            }
                            return !0;
                        },
                        postValidation: function postValidation(
                            buffer,
                            pos,
                            c,
                            currentResult,
                            opts,
                            maskset,
                            strict,
                            fromCheckval
                        ) {
                            var inputmask = this,
                                tokenMatch,
                                validator;
                            if (strict) return !0;
                            if (!1 === currentResult)
                                return (
                                    (tokenMatch = getTokenMatch(pos + 1, opts)),
                                    tokenMatch.targetMatch &&
                                    tokenMatch.targetMatchIndex === pos &&
                                    1 < tokenMatch.targetMatch[0].length &&
                                    void 0 !== formatCode[tokenMatch.targetMatch[0]] &&
                                    ((validator = formatCode[tokenMatch.targetMatch[0]][0]),
                                    new RegExp(validator).test("0" + c))
                                        ? {
                                              insert: [
                                                  {
                                                      pos: pos,
                                                      c: "0",
                                                  },
                                                  {
                                                      pos: pos + 1,
                                                      c: c,
                                                  },
                                              ],
                                              pos: pos + 1,
                                          }
                                        : currentResult
                                );
                            if (
                                (currentResult.fuzzy && ((buffer = currentResult.buffer), (pos = currentResult.pos)),
                                (tokenMatch = getTokenMatch(pos, opts)),
                                tokenMatch.targetMatch &&
                                    tokenMatch.targetMatch[0] &&
                                    void 0 !== formatCode[tokenMatch.targetMatch[0]])
                            ) {
                                validator = formatCode[tokenMatch.targetMatch[0]][0];
                                var part = buffer.slice(
                                    tokenMatch.targetMatchIndex,
                                    tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length
                                );
                                !1 === new RegExp(validator).test(part.join("")) &&
                                    2 === tokenMatch.targetMatch[0].length &&
                                    maskset.validPositions[tokenMatch.targetMatchIndex] &&
                                    maskset.validPositions[tokenMatch.targetMatchIndex + 1] &&
                                    (maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0");
                            }
                            var result = currentResult,
                                dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                            return (
                                result &&
                                    dateParts.date.getTime() == dateParts.date.getTime() &&
                                    ((result = prefillYear(dateParts, result, opts)),
                                    (result = isValidDate.call(this, dateParts, result, opts)),
                                    (result = isDateInRange(dateParts, result, opts, maskset, fromCheckval))),
                                pos && result && currentResult.pos !== pos
                                    ? {
                                          buffer: parse(opts.inputFormat, dateParts, opts).split(""),
                                          refreshFromBuffer: {
                                              start: pos,
                                              end: currentResult.pos,
                                          },
                                      }
                                    : result
                            );
                        },
                        onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                            var input = this;
                            e.ctrlKey &&
                                e.keyCode === _keycode.default.RIGHT &&
                                (this.inputmask._valueSet(importDate(new Date(), opts)), $(this).trigger("setvalue"));
                        },
                        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                            return unmaskedValue
                                ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0)
                                : unmaskedValue;
                        },
                        casing: function casing(elem, test, pos, validPositions) {
                            return 0 == test.nativeDef.indexOf("[ap]")
                                ? elem.toLowerCase()
                                : 0 == test.nativeDef.indexOf("[AP]")
                                ? elem.toUpperCase()
                                : elem;
                        },
                        onBeforeMask: function onBeforeMask(initialValue, opts) {
                            return (
                                "[object Date]" === Object.prototype.toString.call(initialValue) &&
                                    (initialValue = importDate(initialValue, opts)),
                                initialValue
                            );
                        },
                        insertMode: !1,
                        shiftPositions: !1,
                        keepStatic: !1,
                        inputmode: "numeric",
                    },
                });
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                var _inputmask = _interopRequireDefault(__webpack_require__(1)),
                    _keycode = _interopRequireDefault(__webpack_require__(0)),
                    _escapeRegex = _interopRequireDefault(__webpack_require__(13));
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                var $ = _inputmask.default.dependencyLib;
                function autoEscape(txt, opts) {
                    for (var escapedTxt = "", i = 0; i < txt.length; i++)
                        _inputmask.default.prototype.definitions[txt.charAt(i)] ||
                        opts.definitions[txt.charAt(i)] ||
                        opts.optionalmarker[0] === txt.charAt(i) ||
                        opts.optionalmarker[1] === txt.charAt(i) ||
                        opts.quantifiermarker[0] === txt.charAt(i) ||
                        opts.quantifiermarker[1] === txt.charAt(i) ||
                        opts.groupmarker[0] === txt.charAt(i) ||
                        opts.groupmarker[1] === txt.charAt(i) ||
                        opts.alternatormarker === txt.charAt(i)
                            ? (escapedTxt += "\\" + txt.charAt(i))
                            : (escapedTxt += txt.charAt(i));
                    return escapedTxt;
                }
                function alignDigits(buffer, digits, opts, force) {
                    if (0 < buffer.length && 0 < digits && (!opts.digitsOptional || force)) {
                        var radixPosition = buffer.indexOf(opts.radixPoint),
                            negationBack = !1;
                        opts.negationSymbol.back === buffer[buffer.length - 1] &&
                            ((negationBack = !0), buffer.length--),
                            -1 === radixPosition && (buffer.push(opts.radixPoint), (radixPosition = buffer.length - 1));
                        for (var i = 1; i <= digits; i++)
                            isFinite(buffer[radixPosition + i]) || (buffer[radixPosition + i] = "0");
                    }
                    return negationBack && buffer.push(opts.negationSymbol.back), buffer;
                }
                function findValidator(symbol, maskset) {
                    var posNdx = 0;
                    if ("+" === symbol) {
                        for (posNdx in maskset.validPositions);
                        posNdx = parseInt(posNdx);
                    }
                    for (var tstNdx in maskset.tests)
                        if (((tstNdx = parseInt(tstNdx)), posNdx <= tstNdx))
                            for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++)
                                if (
                                    (void 0 === maskset.validPositions[tstNdx] || "-" === symbol) &&
                                    maskset.tests[tstNdx][ndx].match.def === symbol
                                )
                                    return (
                                        tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0)
                                    );
                    return posNdx;
                }
                function findValid(symbol, maskset) {
                    var ret = -1;
                    for (var ndx in maskset.validPositions) {
                        var tst = maskset.validPositions[ndx];
                        if (tst && tst.match.def === symbol) {
                            ret = parseInt(ndx);
                            break;
                        }
                    }
                    return ret;
                }
                function parseMinMaxOptions(opts) {
                    void 0 === opts.parseMinMaxOptions &&
                        (null !== opts.min &&
                            ((opts.min = opts.min
                                .toString()
                                .replace(new RegExp((0, _escapeRegex.default)(opts.groupSeparator), "g"), "")),
                            "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")),
                            (opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN),
                            isNaN(opts.min) && (opts.min = Number.MIN_VALUE)),
                        null !== opts.max &&
                            ((opts.max = opts.max
                                .toString()
                                .replace(new RegExp((0, _escapeRegex.default)(opts.groupSeparator), "g"), "")),
                            "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")),
                            (opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN),
                            isNaN(opts.max) && (opts.max = Number.MAX_VALUE)),
                        (opts.parseMinMaxOptions = "done"));
                }
                function genMask(opts) {
                    (opts.repeat = 0),
                        opts.groupSeparator === opts.radixPoint &&
                            opts.digits &&
                            "0" !== opts.digits &&
                            ("." === opts.radixPoint
                                ? (opts.groupSeparator = ",")
                                : "," === opts.radixPoint
                                ? (opts.groupSeparator = ".")
                                : (opts.groupSeparator = "")),
                        " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0),
                        1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)),
                        "radixFocus" === opts.positionCaretOnClick &&
                            "" === opts.placeholder &&
                            (opts.positionCaretOnClick = "lvp");
                    var decimalDef = "0",
                        radixPointDef = opts.radixPoint;
                    !0 === opts.numericInput && void 0 === opts.__financeInput
                        ? ((decimalDef = "1"),
                          (opts.positionCaretOnClick =
                              "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick),
                          (opts.digitsOptional = !1),
                          isNaN(opts.digits) && (opts.digits = 2),
                          (opts._radixDance = !1),
                          (radixPointDef = "," === opts.radixPoint ? "?" : "!"),
                          "" !== opts.radixPoint &&
                              void 0 === opts.definitions[radixPointDef] &&
                              ((opts.definitions[radixPointDef] = {}),
                              (opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]"),
                              (opts.definitions[radixPointDef].placeholder = opts.radixPoint),
                              (opts.definitions[radixPointDef].static = !0),
                              (opts.definitions[radixPointDef].generated = !0)))
                        : ((opts.__financeInput = !1), (opts.numericInput = !0));
                    var mask = "[+]",
                        altMask;
                    if (
                        ((mask += autoEscape(opts.prefix, opts)),
                        "" !== opts.groupSeparator
                            ? (void 0 === opts.definitions[opts.groupSeparator] &&
                                  ((opts.definitions[opts.groupSeparator] = {}),
                                  (opts.definitions[opts.groupSeparator].validator = "[" + opts.groupSeparator + "]"),
                                  (opts.definitions[opts.groupSeparator].placeholder = opts.groupSeparator),
                                  (opts.definitions[opts.groupSeparator].static = !0),
                                  (opts.definitions[opts.groupSeparator].generated = !0)),
                              (mask += opts._mask(opts)))
                            : (mask += "9{+}"),
                        void 0 !== opts.digits && 0 !== opts.digits)
                    ) {
                        var dq = opts.digits.toString().split(",");
                        isFinite(dq[0]) && dq[1] && isFinite(dq[1])
                            ? (mask += radixPointDef + decimalDef + "{" + opts.digits + "}")
                            : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) &&
                              (opts.digitsOptional
                                  ? ((altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}"),
                                    (opts.keepStatic = !0))
                                  : (mask += radixPointDef + decimalDef + "{" + opts.digits + "}"));
                    }
                    return (
                        (mask += autoEscape(opts.suffix, opts)),
                        (mask += "[-]"),
                        altMask && (mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask]),
                        (opts.greedy = !1),
                        parseMinMaxOptions(opts),
                        mask
                    );
                }
                function hanndleRadixDance(pos, c, radixPos, maskset, opts) {
                    return (
                        opts._radixDance &&
                            opts.numericInput &&
                            c !== opts.negationSymbol.back &&
                            pos <= radixPos &&
                            (0 < radixPos || c == opts.radixPoint) &&
                            (void 0 === maskset.validPositions[pos - 1] ||
                                maskset.validPositions[pos - 1].input !== opts.negationSymbol.back) &&
                            (pos -= 1),
                        pos
                    );
                }
                function decimalValidator(chrs, maskset, pos, strict, opts) {
                    var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
                        result = -1 !== radixPos && new RegExp("[0-9\uff11-\uff19]").test(chrs);
                    return opts._radixDance && result && null == maskset.validPositions[radixPos]
                        ? {
                              insert: {
                                  pos: radixPos === pos ? radixPos + 1 : radixPos,
                                  c: opts.radixPoint,
                              },
                              pos: pos,
                          }
                        : result;
                }
                function checkForLeadingZeroes(buffer, opts) {
                    var numberMatches = new RegExp(
                            "(^" +
                                ("" !== opts.negationSymbol.front
                                    ? (0, _escapeRegex.default)(opts.negationSymbol.front) + "?"
                                    : "") +
                                (0, _escapeRegex.default)(opts.prefix) +
                                ")(.*)(" +
                                (0, _escapeRegex.default)(opts.suffix) +
                                ("" != opts.negationSymbol.back
                                    ? (0, _escapeRegex.default)(opts.negationSymbol.back) + "?"
                                    : "") +
                                "$)"
                        ).exec(buffer.slice().reverse().join("")),
                        number = numberMatches ? numberMatches[2] : "",
                        leadingzeroes = !1;
                    return (
                        number &&
                            ((number = number.split(opts.radixPoint.charAt(0))[0]),
                            (leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number))),
                        !(
                            !leadingzeroes ||
                            !(
                                1 < leadingzeroes[0].length ||
                                (0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)
                            )
                        ) && leadingzeroes
                    );
                }
                _inputmask.default.extendAliases({
                    numeric: {
                        mask: genMask,
                        _mask: function _mask(opts) {
                            return "(" + opts.groupSeparator + "999){+|1}";
                        },
                        digits: "*",
                        digitsOptional: !0,
                        enforceDigitsOnBlur: !1,
                        radixPoint: ".",
                        positionCaretOnClick: "radixFocus",
                        _radixDance: !0,
                        groupSeparator: "",
                        allowMinus: !0,
                        negationSymbol: {
                            front: "-",
                            back: "",
                        },
                        prefix: "",
                        suffix: "",
                        min: null,
                        max: null,
                        SetMaxOnOverflow: !1,
                        step: 1,
                        inputType: "text",
                        unmaskAsNumber: !1,
                        roundingFN: Math.round,
                        inputmode: "numeric",
                        shortcuts: {
                            k: "000",
                            m: "000000",
                        },
                        placeholder: "0",
                        greedy: !1,
                        rightAlign: !0,
                        insertMode: !0,
                        autoUnmask: !1,
                        skipOptionalPartCharacter: "",
                        definitions: {
                            0: {
                                validator: decimalValidator,
                            },
                            1: {
                                validator: decimalValidator,
                                definitionSymbol: "9",
                            },
                            "+": {
                                validator: function validator(chrs, maskset, pos, strict, opts) {
                                    return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front);
                                },
                            },
                            "-": {
                                validator: function validator(chrs, maskset, pos, strict, opts) {
                                    return opts.allowMinus && chrs === opts.negationSymbol.back;
                                },
                            },
                        },
                        preValidation: function preValidation(
                            buffer,
                            pos,
                            c,
                            isSelection,
                            opts,
                            maskset,
                            caretPos,
                            strict
                        ) {
                            if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;
                            var pattern;
                            if ((pattern = opts.shortcuts && opts.shortcuts[c])) {
                                if (1 < pattern.length)
                                    for (var inserts = [], i = 0; i < pattern.length; i++)
                                        inserts.push({
                                            pos: pos + i,
                                            c: pattern[i],
                                            strict: !1,
                                        });
                                return {
                                    insert: inserts,
                                };
                            }
                            var radixPos = buffer.indexOf(opts.radixPoint),
                                initPos = pos;
                            if (
                                ((pos = hanndleRadixDance(pos, c, radixPos, maskset, opts)),
                                "-" === c || c === opts.negationSymbol.front)
                            ) {
                                if (!0 !== opts.allowMinus) return !1;
                                var isNegative = !1,
                                    front = findValid("+", maskset),
                                    back = findValid("-", maskset);
                                return (
                                    -1 !== front && (isNegative = [front, back]),
                                    !1 !== isNegative
                                        ? {
                                              remove: isNegative,
                                              caret: initPos - opts.negationSymbol.front.length,
                                          }
                                        : {
                                              insert: [
                                                  {
                                                      pos: findValidator("+", maskset),
                                                      c: opts.negationSymbol.front,
                                                      fromIsValid: !0,
                                                  },
                                                  {
                                                      pos: findValidator("-", maskset),
                                                      c: opts.negationSymbol.back,
                                                      fromIsValid: void 0,
                                                  },
                                              ],
                                              caret: initPos + opts.negationSymbol.back.length,
                                          }
                                );
                            }
                            if (c === opts.groupSeparator)
                                return {
                                    caret: initPos,
                                };
                            if (strict) return !0;
                            if (
                                -1 !== radixPos &&
                                !0 === opts._radixDance &&
                                !1 === isSelection &&
                                c === opts.radixPoint &&
                                void 0 !== opts.digits &&
                                (isNaN(opts.digits) || 0 < parseInt(opts.digits)) &&
                                radixPos !== pos
                            )
                                return {
                                    caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos,
                                };
                            if (!1 === opts.__financeInput)
                                if (isSelection) {
                                    if (opts.digitsOptional)
                                        return {
                                            rewritePosition: caretPos.end,
                                        };
                                    if (!opts.digitsOptional) {
                                        if (caretPos.begin > radixPos && caretPos.end <= radixPos)
                                            return c === opts.radixPoint
                                                ? {
                                                      insert: {
                                                          pos: radixPos + 1,
                                                          c: "0",
                                                          fromIsValid: !0,
                                                      },
                                                      rewritePosition: radixPos,
                                                  }
                                                : {
                                                      rewritePosition: radixPos + 1,
                                                  };
                                        if (caretPos.begin < radixPos)
                                            return {
                                                rewritePosition: caretPos.begin - 1,
                                            };
                                    }
                                } else if (
                                    !opts.showMaskOnHover &&
                                    !opts.showMaskOnFocus &&
                                    !opts.digitsOptional &&
                                    0 < opts.digits &&
                                    "" === this.inputmask.__valueGet.call(this)
                                )
                                    return {
                                        rewritePosition: radixPos,
                                    };
                            return {
                                rewritePosition: pos,
                            };
                        },
                        postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
                            if (!1 === currentResult) return currentResult;
                            if (strict) return !0;
                            if (null !== opts.min || null !== opts.max) {
                                var unmasked = opts.onUnMask(
                                    buffer.slice().reverse().join(""),
                                    void 0,
                                    $.extend({}, opts, {
                                        unmaskAsNumber: !0,
                                    })
                                );
                                if (
                                    null !== opts.min &&
                                    unmasked < opts.min &&
                                    (unmasked.toString().length > opts.min.toString().length || unmasked < 0)
                                )
                                    return !1;
                                if (null !== opts.max && unmasked > opts.max)
                                    return (
                                        !!opts.SetMaxOnOverflow && {
                                            refreshFromBuffer: !0,
                                            buffer: alignDigits(
                                                opts.max.toString().replace(".", opts.radixPoint).split(""),
                                                opts.digits,
                                                opts
                                            ).reverse(),
                                        }
                                    );
                            }
                            return currentResult;
                        },
                        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                            if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
                            var processValue = maskedValue.replace(opts.prefix, "");
                            return (
                                (processValue = processValue.replace(opts.suffix, "")),
                                (processValue = processValue.replace(
                                    new RegExp((0, _escapeRegex.default)(opts.groupSeparator), "g"),
                                    ""
                                )),
                                "" !== opts.placeholder.charAt(0) &&
                                    (processValue = processValue.replace(
                                        new RegExp(opts.placeholder.charAt(0), "g"),
                                        "0"
                                    )),
                                opts.unmaskAsNumber
                                    ? ("" !== opts.radixPoint &&
                                          -1 !== processValue.indexOf(opts.radixPoint) &&
                                          (processValue = processValue.replace(
                                              _escapeRegex.default.call(this, opts.radixPoint),
                                              "."
                                          )),
                                      (processValue = processValue.replace(
                                          new RegExp("^" + (0, _escapeRegex.default)(opts.negationSymbol.front)),
                                          "-"
                                      )),
                                      (processValue = processValue.replace(
                                          new RegExp((0, _escapeRegex.default)(opts.negationSymbol.back) + "$"),
                                          ""
                                      )),
                                      Number(processValue))
                                    : processValue
                            );
                        },
                        isComplete: function isComplete(buffer, opts) {
                            var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
                            return (
                                (maskedValue = maskedValue.replace(
                                    new RegExp("^" + (0, _escapeRegex.default)(opts.negationSymbol.front)),
                                    "-"
                                )),
                                (maskedValue = maskedValue.replace(
                                    new RegExp((0, _escapeRegex.default)(opts.negationSymbol.back) + "$"),
                                    ""
                                )),
                                (maskedValue = maskedValue.replace(opts.prefix, "")),
                                (maskedValue = maskedValue.replace(opts.suffix, "")),
                                (maskedValue = maskedValue.replace(
                                    new RegExp((0, _escapeRegex.default)(opts.groupSeparator) + "([0-9]{3})", "g"),
                                    "$1"
                                )),
                                "," === opts.radixPoint &&
                                    (maskedValue = maskedValue.replace(
                                        (0, _escapeRegex.default)(opts.radixPoint),
                                        "."
                                    )),
                                isFinite(maskedValue)
                            );
                        },
                        onBeforeMask: function onBeforeMask(initialValue, opts) {
                            var radixPoint = opts.radixPoint || ",";
                            isFinite(opts.digits) && (opts.digits = parseInt(opts.digits)),
                                ("number" != typeof initialValue && "number" !== opts.inputType) ||
                                    "" === radixPoint ||
                                    (initialValue = initialValue.toString().replace(".", radixPoint));
                            var isNagtive =
                                    "-" === initialValue.charAt(0) ||
                                    initialValue.charAt(0) === opts.negationSymbol.front,
                                valueParts = initialValue.split(radixPoint),
                                integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
                                decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "",
                                forceDigits = 1 < valueParts.length;
                            initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);
                            var digits = 0;
                            if (
                                "" !== radixPoint &&
                                ((digits = opts.digitsOptional
                                    ? opts.digits < decimalPart.length
                                        ? opts.digits
                                        : decimalPart.length
                                    : opts.digits),
                                "" !== decimalPart || !opts.digitsOptional)
                            ) {
                                var digitsFactor = Math.pow(10, digits || 1);
                                (initialValue = initialValue.replace((0, _escapeRegex.default)(radixPoint), ".")),
                                    isNaN(parseFloat(initialValue)) ||
                                        (initialValue = (
                                            opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor
                                        ).toFixed(digits)),
                                    (initialValue = initialValue.toString().replace(".", radixPoint));
                            }
                            if (
                                (0 === opts.digits &&
                                    -1 !== initialValue.indexOf(radixPoint) &&
                                    (initialValue = initialValue.substring(0, initialValue.indexOf(radixPoint))),
                                null !== opts.min || null !== opts.max)
                            ) {
                                var numberValue = initialValue.toString().replace(radixPoint, ".");
                                null !== opts.min && numberValue < opts.min
                                    ? (initialValue = opts.min.toString().replace(".", radixPoint))
                                    : null !== opts.max &&
                                      numberValue > opts.max &&
                                      (initialValue = opts.max.toString().replace(".", radixPoint));
                            }
                            return (
                                isNagtive && "-" !== initialValue.charAt(0) && (initialValue = "-" + initialValue),
                                alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("")
                            );
                        },
                        onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
                            function stripBuffer(buffer, stripRadix) {
                                if (!1 !== opts.__financeInput || stripRadix) {
                                    var position = buffer.indexOf(opts.radixPoint);
                                    -1 !== position && buffer.splice(position, 1);
                                }
                                if ("" !== opts.groupSeparator)
                                    for (; -1 !== (position = buffer.indexOf(opts.groupSeparator)); )
                                        buffer.splice(position, 1);
                                return buffer;
                            }
                            var result,
                                leadingzeroes = checkForLeadingZeroes(buffer, opts);
                            if (leadingzeroes)
                                for (
                                    var caretNdx =
                                            buffer.join("").lastIndexOf(leadingzeroes[0].split("").reverse().join("")) -
                                            (leadingzeroes[0] == leadingzeroes.input ? 0 : 1),
                                        offset = leadingzeroes[0] == leadingzeroes.input ? 1 : 0,
                                        i = leadingzeroes[0].length - offset;
                                    0 < i;
                                    i--
                                )
                                    delete this.maskset.validPositions[caretNdx + i], delete buffer[caretNdx + i];
                            if (e)
                                switch (e.type) {
                                    case "blur":
                                    case "checkval":
                                        if (null !== opts.min) {
                                            var unmasked = opts.onUnMask(
                                                buffer.slice().reverse().join(""),
                                                void 0,
                                                $.extend({}, opts, {
                                                    unmaskAsNumber: !0,
                                                })
                                            );
                                            if (null !== opts.min && unmasked < opts.min)
                                                return {
                                                    refreshFromBuffer: !0,
                                                    buffer: alignDigits(
                                                        opts.min.toString().replace(".", opts.radixPoint).split(""),
                                                        opts.digits,
                                                        opts
                                                    ).reverse(),
                                                };
                                        }
                                        if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                                            var nmbrMtchs = new RegExp(
                                                    "(^" +
                                                        ("" != opts.negationSymbol.front
                                                            ? (0, _escapeRegex.default)(opts.negationSymbol.front) + "?"
                                                            : "") +
                                                        (0, _escapeRegex.default)(opts.prefix) +
                                                        ")(.*)(" +
                                                        (0, _escapeRegex.default)(opts.suffix) +
                                                        ("" != opts.negationSymbol.back
                                                            ? (0, _escapeRegex.default)(opts.negationSymbol.back) + "?"
                                                            : "") +
                                                        "$)"
                                                ).exec(stripBuffer(buffer.slice(), !0).reverse().join("")),
                                                number = nmbrMtchs ? nmbrMtchs[2] : "";
                                            0 == number &&
                                                (result = {
                                                    refreshFromBuffer: !0,
                                                    buffer: [0],
                                                });
                                        } else
                                            "" !== opts.radixPoint &&
                                                buffer[0] === opts.radixPoint &&
                                                (result && result.buffer
                                                    ? result.buffer.shift()
                                                    : (buffer.shift(),
                                                      (result = {
                                                          refreshFromBuffer: !0,
                                                          buffer: stripBuffer(buffer),
                                                      })));
                                        if (opts.enforceDigitsOnBlur) {
                                            result = result || {};
                                            var bffr = (result && result.buffer) || buffer.slice().reverse();
                                            (result.refreshFromBuffer = !0),
                                                (result.buffer = alignDigits(bffr, opts.digits, opts, !0).reverse());
                                        }
                                }
                            return result;
                        },
                        onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                            var $input = $(this),
                                bffr;
                            if (e.ctrlKey)
                                switch (e.keyCode) {
                                    case _keycode.default.UP:
                                        return (
                                            this.inputmask.__valueSet.call(
                                                this,
                                                parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)
                                            ),
                                            $input.trigger("setvalue"),
                                            !1
                                        );

                                    case _keycode.default.DOWN:
                                        return (
                                            this.inputmask.__valueSet.call(
                                                this,
                                                parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)
                                            ),
                                            $input.trigger("setvalue"),
                                            !1
                                        );
                                }
                            if (
                                !e.shiftKey &&
                                (e.keyCode === _keycode.default.DELETE ||
                                    e.keyCode === _keycode.default.BACKSPACE ||
                                    e.keyCode === _keycode.default.BACKSPACE_SAFARI) &&
                                caretPos.begin !== buffer.length
                            ) {
                                if (
                                    buffer[
                                        e.keyCode === _keycode.default.DELETE ? caretPos.begin - 1 : caretPos.end
                                    ] === opts.negationSymbol.front
                                )
                                    return (
                                        (bffr = buffer.slice().reverse()),
                                        "" !== opts.negationSymbol.front && bffr.shift(),
                                        "" !== opts.negationSymbol.back && bffr.pop(),
                                        $input.trigger("setvalue", [bffr.join(""), caretPos.begin]),
                                        !1
                                    );
                                if (!0 === opts._radixDance) {
                                    var radixPos = buffer.indexOf(opts.radixPoint);
                                    if (opts.digitsOptional) {
                                        if (0 === radixPos)
                                            return (
                                                (bffr = buffer.slice().reverse()),
                                                bffr.pop(),
                                                $input.trigger("setvalue", [
                                                    bffr.join(""),
                                                    caretPos.begin >= bffr.length ? bffr.length : caretPos.begin,
                                                ]),
                                                !1
                                            );
                                    } else if (
                                        -1 !== radixPos &&
                                        (caretPos.begin < radixPos ||
                                            caretPos.end < radixPos ||
                                            (e.keyCode === _keycode.default.DELETE && caretPos.begin === radixPos))
                                    )
                                        return (
                                            caretPos.begin !== caretPos.end ||
                                                (e.keyCode !== _keycode.default.BACKSPACE &&
                                                    e.keyCode !== _keycode.default.BACKSPACE_SAFARI) ||
                                                caretPos.begin++,
                                            (bffr = buffer.slice().reverse()),
                                            bffr.splice(
                                                bffr.length - caretPos.begin,
                                                caretPos.begin - caretPos.end + 1
                                            ),
                                            (bffr = alignDigits(bffr, opts.digits, opts).join("")),
                                            $input.trigger("setvalue", [
                                                bffr,
                                                caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin,
                                            ]),
                                            !1
                                        );
                                }
                            }
                        },
                    },
                    currency: {
                        prefix: "",
                        groupSeparator: ",",
                        alias: "numeric",
                        digits: 2,
                        digitsOptional: !1,
                    },
                    decimal: {
                        alias: "numeric",
                    },
                    integer: {
                        alias: "numeric",
                        digits: 0,
                    },
                    percentage: {
                        alias: "numeric",
                        min: 0,
                        max: 100,
                        suffix: " %",
                        digits: 0,
                        allowMinus: !1,
                    },
                    indianns: {
                        alias: "numeric",
                        _mask: function _mask(opts) {
                            return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
                        },
                        groupSeparator: ",",
                        radixPoint: ".",
                        placeholder: "0",
                        digits: 2,
                        digitsOptional: !1,
                    },
                });
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                var _window = _interopRequireDefault(__webpack_require__(12)),
                    _inputmask = _interopRequireDefault(__webpack_require__(1));
                function _typeof(obj) {
                    return (
                        (_typeof =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function _typeof(obj) {
                                      return typeof obj;
                                  }
                                : function _typeof(obj) {
                                      return obj &&
                                          "function" == typeof Symbol &&
                                          obj.constructor === Symbol &&
                                          obj !== Symbol.prototype
                                          ? "symbol"
                                          : typeof obj;
                                  }),
                        _typeof(obj)
                    );
                }
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function _inherits(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass)
                        throw new TypeError("Super expression must either be null or a function");
                    (subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: !0,
                            configurable: !0,
                        },
                    })),
                        superClass && _setPrototypeOf(subClass, superClass);
                }
                function _createSuper(Derived) {
                    var hasNativeReflectConstruct = _isNativeReflectConstruct();
                    return function _createSuperInternal() {
                        var Super = _getPrototypeOf(Derived),
                            result;
                        if (hasNativeReflectConstruct) {
                            var NewTarget = _getPrototypeOf(this).constructor;
                            result = Reflect.construct(Super, arguments, NewTarget);
                        } else result = Super.apply(this, arguments);
                        return _possibleConstructorReturn(this, result);
                    };
                }
                function _possibleConstructorReturn(self, call) {
                    return !call || ("object" !== _typeof(call) && "function" != typeof call)
                        ? _assertThisInitialized(self)
                        : call;
                }
                function _assertThisInitialized(self) {
                    if (void 0 === self)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return self;
                }
                function _wrapNativeSuper(Class) {
                    var _cache = "function" == typeof Map ? new Map() : void 0;
                    return (
                        (_wrapNativeSuper = function _wrapNativeSuper(Class) {
                            if (null === Class || !_isNativeFunction(Class)) return Class;
                            if ("function" != typeof Class)
                                throw new TypeError("Super expression must either be null or a function");
                            if ("undefined" != typeof _cache) {
                                if (_cache.has(Class)) return _cache.get(Class);
                                _cache.set(Class, Wrapper);
                            }
                            function Wrapper() {
                                return _construct(Class, arguments, _getPrototypeOf(this).constructor);
                            }
                            return (
                                (Wrapper.prototype = Object.create(Class.prototype, {
                                    constructor: {
                                        value: Wrapper,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0,
                                    },
                                })),
                                _setPrototypeOf(Wrapper, Class)
                            );
                        }),
                        _wrapNativeSuper(Class)
                    );
                }
                function _construct(Parent, args, Class) {
                    return (
                        (_construct = _isNativeReflectConstruct()
                            ? Reflect.construct
                            : function _construct(Parent, args, Class) {
                                  var a = [null];
                                  a.push.apply(a, args);
                                  var Constructor = Function.bind.apply(Parent, a),
                                      instance = new Constructor();
                                  return Class && _setPrototypeOf(instance, Class.prototype), instance;
                              }),
                        _construct.apply(null, arguments)
                    );
                }
                function _isNativeReflectConstruct() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (e) {
                        return !1;
                    }
                }
                function _isNativeFunction(fn) {
                    return -1 !== Function.toString.call(fn).indexOf("[native code]");
                }
                function _setPrototypeOf(o, p) {
                    return (
                        (_setPrototypeOf =
                            Object.setPrototypeOf ||
                            function _setPrototypeOf(o, p) {
                                return (o.__proto__ = p), o;
                            }),
                        _setPrototypeOf(o, p)
                    );
                }
                function _getPrototypeOf(o) {
                    return (
                        (_getPrototypeOf = Object.setPrototypeOf
                            ? Object.getPrototypeOf
                            : function _getPrototypeOf(o) {
                                  return o.__proto__ || Object.getPrototypeOf(o);
                              }),
                        _getPrototypeOf(o)
                    );
                }
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                var document = _window.default.document;
                if (
                    document &&
                    document.head &&
                    document.head.attachShadow &&
                    _window.default.customElements &&
                    void 0 === _window.default.customElements.get("input-mask")
                ) {
                    var InputmaskElement = (function (_HTMLElement) {
                        _inherits(InputmaskElement, _HTMLElement);
                        var _super = _createSuper(InputmaskElement);
                        function InputmaskElement() {
                            var _this;
                            _classCallCheck(this, InputmaskElement), (_this = _super.call(this));
                            var attributeNames = _this.getAttributeNames(),
                                shadow = _this.attachShadow({
                                    mode: "closed",
                                }),
                                input = document.createElement("input");
                            for (var attr in ((input.type = "text"), shadow.appendChild(input), attributeNames))
                                Object.prototype.hasOwnProperty.call(attributeNames, attr) &&
                                    input.setAttribute(attributeNames[attr], _this.getAttribute(attributeNames[attr]));
                            var im = new _inputmask.default();
                            return (
                                (im.dataAttribute = ""), im.mask(input), (input.inputmask.shadowRoot = shadow), _this
                            );
                        }
                        return InputmaskElement;
                    })(_wrapNativeSuper(HTMLElement));
                    _window.default.customElements.define("input-mask", InputmaskElement);
                }
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                var _jquery = _interopRequireDefault(__webpack_require__(8)),
                    _inputmask = _interopRequireDefault(__webpack_require__(1));
                function _typeof(obj) {
                    return (
                        (_typeof =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function _typeof(obj) {
                                      return typeof obj;
                                  }
                                : function _typeof(obj) {
                                      return obj &&
                                          "function" == typeof Symbol &&
                                          obj.constructor === Symbol &&
                                          obj !== Symbol.prototype
                                          ? "symbol"
                                          : typeof obj;
                                  }),
                        _typeof(obj)
                    );
                }
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                void 0 === _jquery.default.fn.inputmask &&
                    (_jquery.default.fn.inputmask = function (fn, options) {
                        var nptmask,
                            input = this[0];
                        if ((void 0 === options && (options = {}), "string" == typeof fn))
                            switch (fn) {
                                case "unmaskedvalue":
                                    return input && input.inputmask
                                        ? input.inputmask.unmaskedvalue()
                                        : (0, _jquery.default)(input).val();

                                case "remove":
                                    return this.each(function () {
                                        this.inputmask && this.inputmask.remove();
                                    });

                                case "getemptymask":
                                    return input && input.inputmask ? input.inputmask.getemptymask() : "";

                                case "hasMaskedValue":
                                    return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();

                                case "isComplete":
                                    return !input || !input.inputmask || input.inputmask.isComplete();

                                case "getmetadata":
                                    return input && input.inputmask ? input.inputmask.getmetadata() : void 0;

                                case "setvalue":
                                    _inputmask.default.setValue(input, options);
                                    break;

                                case "option":
                                    if ("string" != typeof options)
                                        return this.each(function () {
                                            if (void 0 !== this.inputmask) return this.inputmask.option(options);
                                        });
                                    if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
                                    break;

                                default:
                                    return (
                                        (options.alias = fn),
                                        (nptmask = new _inputmask.default(options)),
                                        this.each(function () {
                                            nptmask.mask(this);
                                        })
                                    );
                            }
                        else {
                            if (Array.isArray(fn))
                                return (
                                    (options.alias = fn),
                                    (nptmask = new _inputmask.default(options)),
                                    this.each(function () {
                                        nptmask.mask(this);
                                    })
                                );
                            if ("object" == _typeof(fn))
                                return (
                                    (nptmask = new _inputmask.default(fn)),
                                    void 0 === fn.mask && void 0 === fn.alias
                                        ? this.each(function () {
                                              if (void 0 !== this.inputmask) return this.inputmask.option(fn);
                                              nptmask.mask(this);
                                          })
                                        : this.each(function () {
                                              nptmask.mask(this);
                                          })
                                );
                            if (void 0 === fn)
                                return this.each(function () {
                                    (nptmask = new _inputmask.default(options)), nptmask.mask(this);
                                });
                        }
                    });
            },
            function (module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                }),
                    (exports.default = void 0);
                var _bundle = _interopRequireDefault(__webpack_require__(14));
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : {
                              default: obj,
                          };
                }
                __webpack_require__(24);
                var _default = _bundle.default;
                exports.default = _default;
            },
        ]),
        (installedModules = {}),
        (__webpack_require__.m = modules),
        (__webpack_require__.c = installedModules),
        (__webpack_require__.d = function (exports, name, getter) {
            __webpack_require__.o(exports, name) ||
                Object.defineProperty(exports, name, {
                    enumerable: !0,
                    get: getter,
                });
        }),
        (__webpack_require__.r = function (exports) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(exports, Symbol.toStringTag, {
                    value: "Module",
                }),
                Object.defineProperty(exports, "__esModule", {
                    value: !0,
                });
        }),
        (__webpack_require__.t = function (value, mode) {
            if ((1 & mode && (value = __webpack_require__(value)), 8 & mode)) return value;
            if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
            var ns = Object.create(null);
            if (
                (__webpack_require__.r(ns),
                Object.defineProperty(ns, "default", {
                    enumerable: !0,
                    value: value,
                }),
                2 & mode && "string" != typeof value)
            )
                for (var key in value)
                    __webpack_require__.d(
                        ns,
                        key,
                        function (key) {
                            return value[key];
                        }.bind(null, key)
                    );
            return ns;
        }),
        (__webpack_require__.n = function (module) {
            var getter =
                module && module.__esModule
                    ? function getDefault() {
                          return module.default;
                      }
                    : function getModuleExports() {
                          return module;
                      };
            return __webpack_require__.d(getter, "a", getter), getter;
        }),
        (__webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }),
        (__webpack_require__.p = ""),
        __webpack_require__((__webpack_require__.s = 25))
    );
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = (installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {},
        });
        return (
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__),
            (module.l = !0),
            module.exports
        );
    }
    var modules, installedModules;
});

/*
 Input Mask plugin binding
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
(function (factory) {
    factory(jQuery, window.Inputmask, window);
})(function ($, Inputmask, window) {
    $(window.document)
        .ajaxComplete(function (event, xmlHttpRequest, ajaxOptions) {
            if ($.inArray("html", ajaxOptions.dataTypes) !== -1) {
                $(
                    ".inputmask, [data-inputmask], [data-inputmask-mask], [data-inputmask-alias], [data-inputmask-regex]"
                ).each(function (ndx, lmnt) {
                    if (lmnt.inputmask === undefined) {
                        Inputmask({ autoUnmask: true }).mask(lmnt);
                    }
                });
            }
        })
        .ready(function () {
            $(
                ".inputmask, [data-inputmask], [data-inputmask-mask], [data-inputmask-alias],[data-inputmask-regex]"
            ).each(function (ndx, lmnt) {
                if (lmnt.inputmask === undefined) {
                    Inputmask({ autoUnmask: true }).mask(lmnt);
                }
            });
        });
});

/*!
 * Bootstrap modal.js v4.3.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? (module.exports = factory(global.jQuery, global.Util))
        : typeof define === "function" && define.amd
        ? define(["./jquery", "util"], factory)
        : ((global = global || self), (global.Modal = factory(global.jQuery, global.Util)));
})(this, function ($, Util) {
    "use strict";

    $ = $ && $.hasOwnProperty("default") ? $["default"] : $;
    Util = Util && Util.hasOwnProperty("default") ? Util["default"] : Util;

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true,
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            var ownKeys = Object.keys(source);

            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys = ownKeys.concat(
                    Object.getOwnPropertySymbols(source).filter(function (sym) {
                        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                    })
                );
            }

            ownKeys.forEach(function (key) {
                _defineProperty(target, key, source[key]);
            });
        }

        return target;
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = "modal";
    var VERSION = "4.3.1";
    var DATA_KEY = "bs.modal";
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = ".data-api";
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: true,
    };
    var DefaultType = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean",
    };
    var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        FOCUSIN: "focusin" + EVENT_KEY,
        RESIZE: "resize" + EVENT_KEY,
        CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
        KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
        MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    };
    var ClassName = {
        SCROLLABLE: "",
        SCROLLBAR_MEASURER: "",
        BACKDROP: "",
        OPEN: "",
        FADE: "",
        SHOW: "modal_open",
    };
    var Selector = {
        DIALOG: ".modal",
        MODAL_BODY: ".modal__body",
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: ".modal___fixed",
        STICKY_CONTENT: ".modal___sticky",
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
    };

    var Modal =
        /*#__PURE__*/
        (function () {
            function Modal(element, config) {
                this._config = this._getConfig(config);
                this._element = element;
                this._dialog = element.querySelector(Selector.DIALOG);
                this._backdrop = null;
                this._isShown = false;
                this._isBodyOverflowing = false;
                this._ignoreBackdropClick = false;
                this._isTransitioning = false;
                this._scrollbarWidth = 0;
            } // Getters

            var _proto = Modal.prototype;

            // Public
            _proto.toggle = function toggle(relatedTarget) {
                return this._isShown ? this.hide() : this.show(relatedTarget);
            };

            _proto.show = function show(relatedTarget) {
                var _this = this;

                if (this._isShown || this._isTransitioning) {
                    return;
                }

                if ($(this._element).hasClass(ClassName.FADE)) {
                    this._isTransitioning = true;
                }

                var showEvent = $.Event(Event.SHOW, {
                    relatedTarget: relatedTarget,
                });
                $(this._element).trigger(showEvent);

                if (this._isShown || showEvent.isDefaultPrevented()) {
                    return;
                }

                this._isShown = true;

                this._checkScrollbar();

                this._setScrollbar();

                this._adjustDialog();

                this._setEscapeEvent();

                this._setResizeEvent();

                $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
                    return _this.hide(event);
                });
                $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
                    $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
                        if ($(event.target).is(_this._element)) {
                            _this._ignoreBackdropClick = true;
                        }
                    });
                });

                this._showBackdrop(function () {
                    return _this._showElement(relatedTarget);
                });
            };

            _proto.hide = function hide(event) {
                var _this2 = this;

                if (event) {
                    event.preventDefault();
                }

                if (!this._isShown || this._isTransitioning) {
                    return;
                }

                var hideEvent = $.Event(Event.HIDE);
                $(this._element).trigger(hideEvent);

                if (!this._isShown || hideEvent.isDefaultPrevented()) {
                    return;
                }

                this._isShown = false;
                var transition = $(this._element).hasClass(ClassName.FADE);

                if (transition) {
                    this._isTransitioning = true;
                }

                this._setEscapeEvent();

                this._setResizeEvent();

                $(document).off(Event.FOCUSIN);
                $(this._element).removeClass(ClassName.SHOW);
                $(this._element).off(Event.CLICK_DISMISS);
                $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

                if (transition) {
                    var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                    $(this._element)
                        .one(Util.TRANSITION_END, function (event) {
                            return _this2._hideModal(event);
                        })
                        .emulateTransitionEnd(transitionDuration);
                } else {
                    this._hideModal();
                }
            };

            _proto.dispose = function dispose() {
                [window, this._element, this._dialog].forEach(function (htmlElement) {
                    return $(htmlElement).off(EVENT_KEY);
                });
                /**
                 * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
                 * Do not move `document` in `htmlElements` array
                 * It will remove `Event.CLICK_DATA_API` event that should remain
                 */

                $(document).off(Event.FOCUSIN);
                $.removeData(this._element, DATA_KEY);
                this._config = null;
                this._element = null;
                this._dialog = null;
                this._backdrop = null;
                this._isShown = null;
                this._isBodyOverflowing = null;
                this._ignoreBackdropClick = null;
                this._isTransitioning = null;
                this._scrollbarWidth = null;
            };

            _proto.handleUpdate = function handleUpdate() {
                this._adjustDialog();
            }; // Private

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default, config);
                Util.typeCheckConfig(NAME, config, DefaultType);
                return config;
            };

            _proto._showElement = function _showElement(relatedTarget) {
                var _this3 = this;

                var transition = $(this._element).hasClass(ClassName.FADE);

                if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                    // Don't move modal's DOM position
                    document.body.appendChild(this._element);
                }

                //this._element.style.display = 'block';

                this._element.removeAttribute("aria-hidden");

                this._element.setAttribute("aria-modal", true);

                if ($(this._dialog).hasClass(ClassName.SCROLLABLE)) {
                    this._dialog.querySelector(Selector.MODAL_BODY).scrollTop = 0;
                } else {
                    this._element.scrollTop = 0;
                }

                if (transition) {
                    Util.reflow(this._element);
                }

                $(this._element).addClass(ClassName.SHOW);

                if (this._config.focus) {
                    this._enforceFocus();
                }

                var shownEvent = $.Event(Event.SHOWN, {
                    relatedTarget: relatedTarget,
                });

                var transitionComplete = function transitionComplete() {
                    if (_this3._config.focus) {
                        _this3._element.focus();
                    }

                    _this3._isTransitioning = false;
                    $(_this3._element).trigger(shownEvent);
                };

                if (transition) {
                    var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
                    $(this._dialog)
                        .one(Util.TRANSITION_END, transitionComplete)
                        .emulateTransitionEnd(transitionDuration);
                } else {
                    transitionComplete();
                }
            };

            _proto._enforceFocus = function _enforceFocus() {
                var _this4 = this;

                $(document)
                    .off(Event.FOCUSIN) // Guard against infinite focus loop
                    .on(Event.FOCUSIN, function (event) {
                        if (
                            document !== event.target &&
                            _this4._element !== event.target &&
                            $(_this4._element).has(event.target).length === 0
                        ) {
                            _this4._element.focus();
                        }
                    });
            };

            _proto._setEscapeEvent = function _setEscapeEvent() {
                var _this5 = this;

                if (this._isShown && this._config.keyboard) {
                    $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
                        if (event.which === ESCAPE_KEYCODE) {
                            event.preventDefault();

                            _this5.hide();
                        }
                    });
                } else if (!this._isShown) {
                    $(this._element).off(Event.KEYDOWN_DISMISS);
                }
            };

            _proto._setResizeEvent = function _setResizeEvent() {
                var _this6 = this;

                if (this._isShown) {
                    $(window).on(Event.RESIZE, function (event) {
                        return _this6.handleUpdate(event);
                    });
                } else {
                    $(window).off(Event.RESIZE);
                }
            };

            _proto._hideModal = function _hideModal() {
                var _this7 = this;

                //this._element.style.display = 'none';

                this._element.setAttribute("aria-hidden", true);

                this._element.removeAttribute("aria-modal");

                this._isTransitioning = false;

                this._showBackdrop(function () {
                    $(document.body).removeClass(ClassName.OPEN);

                    _this7._resetAdjustments();

                    _this7._resetScrollbar();

                    $(_this7._element).trigger(Event.HIDDEN);
                });
            };

            _proto._removeBackdrop = function _removeBackdrop() {
                if (this._backdrop) {
                    $(this._backdrop).remove();
                    this._backdrop = null;
                }
            };

            _proto._showBackdrop = function _showBackdrop(callback) {
                var _this8 = this;

                var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : "";

                if (this._isShown && this._config.backdrop) {
                    this._backdrop = document.createElement("div");
                    this._backdrop.className = ClassName.BACKDROP;

                    if (animate) {
                        this._backdrop.classList.add(animate);
                    }

                    $(this._backdrop).appendTo(document.body);
                    $(this._element).on(Event.CLICK_DISMISS, function (event) {
                        if (_this8._ignoreBackdropClick) {
                            _this8._ignoreBackdropClick = false;
                            return;
                        }

                        if (event.target !== event.currentTarget) {
                            return;
                        }

                        if (_this8._config.backdrop === "static") {
                            _this8._element.focus();
                        } else {
                            _this8.hide();
                        }
                    });

                    if (animate) {
                        Util.reflow(this._backdrop);
                    }

                    $(this._backdrop).addClass(ClassName.SHOW);

                    if (!callback) {
                        return;
                    }

                    if (!animate) {
                        callback();
                        return;
                    }

                    var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
                    $(this._backdrop)
                        .one(Util.TRANSITION_END, callback)
                        .emulateTransitionEnd(backdropTransitionDuration);
                } else if (!this._isShown && this._backdrop) {
                    $(this._backdrop).removeClass(ClassName.SHOW);

                    var callbackRemove = function callbackRemove() {
                        _this8._removeBackdrop();

                        if (callback) {
                            callback();
                        }
                    };

                    if ($(this._element).hasClass(ClassName.FADE)) {
                        var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

                        $(this._backdrop)
                            .one(Util.TRANSITION_END, callbackRemove)
                            .emulateTransitionEnd(_backdropTransitionDuration);
                    } else {
                        callbackRemove();
                    }
                } else if (callback) {
                    callback();
                }
            }; // ----------------------------------------------------------------------
            // the following methods are used to handle overflowing modals
            // todo (fat): these should probably be refactored out of modal.js
            // ----------------------------------------------------------------------

            _proto._adjustDialog = function _adjustDialog() {
                // var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
                // if (!this._isBodyOverflowing && isModalOverflowing) {
                //   this._element.style.paddingLeft = this._scrollbarWidth + "px";
                // }
                // if (this._isBodyOverflowing && !isModalOverflowing) {
                //   this._element.style.paddingRight = this._scrollbarWidth + "px";
                // }
            };

            _proto._resetAdjustments = function _resetAdjustments() {
                // this._element.style.paddingLeft = '';
                // this._element.style.paddingRight = '';
            };

            _proto._checkScrollbar = function _checkScrollbar() {
                var rect = document.body.getBoundingClientRect();
                this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
                this._scrollbarWidth = this._getScrollbarWidth();
            };

            _proto._setScrollbar = function _setScrollbar() {
                var _this9 = this;

                if (this._isBodyOverflowing) {
                    // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
                    //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
                    // var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
                    // var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding
                    // $(fixedContent).each(function (index, element) {
                    //   var actualPadding = element.style.paddingRight;
                    //   var calculatedPadding = $(element).css('padding-right');
                    //   $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
                    // }); // Adjust sticky content margin
                    // $(stickyContent).each(function (index, element) {
                    //   var actualMargin = element.style.marginRight;
                    //   var calculatedMargin = $(element).css('margin-right');
                    //   $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
                    // }); // Adjust body padding
                    // var actualPadding = document.body.style.paddingRight;
                    // var calculatedPadding = $(document.body).css('padding-right');
                    // $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
                }

                $(document.body).addClass(ClassName.OPEN);
            };

            _proto._resetScrollbar = function _resetScrollbar() {
                // Restore fixed content padding
                // var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
                // $(fixedContent).each(function (index, element) {
                //   var padding = $(element).data('padding-right');
                //   $(element).removeData('padding-right');
                //   element.style.paddingRight = padding ? padding : '';
                // }); // Restore sticky content
                // var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
                // $(elements).each(function (index, element) {
                //   var margin = $(element).data('margin-right');
                //   if (typeof margin !== 'undefined') {
                //     $(element).css('margin-right', margin).removeData('margin-right');
                //   }
                // }); // Restore body padding
                // var padding = $(document.body).data('padding-right');
                // $(document.body).removeData('padding-right');
                // document.body.style.paddingRight = padding ? padding : '';
            };

            _proto._getScrollbarWidth = function _getScrollbarWidth() {
                // thx d.walsh
                var scrollDiv = document.createElement("div");
                scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
                document.body.appendChild(scrollDiv);
                var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            }; // Static

            Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
                return this.each(function () {
                    var data = $(this).data(DATA_KEY);

                    var _config = _objectSpread(
                        {},
                        Default,
                        $(this).data(),
                        typeof config === "object" && config ? config : {}
                    );

                    if (!data) {
                        data = new Modal(this, _config);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === "string") {
                        if (typeof data[config] === "undefined") {
                            throw new TypeError('No method named "' + config + '"');
                        }

                        data[config](relatedTarget);
                    } else if (_config.show) {
                        data.show(relatedTarget);
                    }
                });
            };

            _createClass(Modal, null, [
                {
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    },
                },
                {
                    key: "Default",
                    get: function get() {
                        return Default;
                    },
                },
            ]);

            return Modal;
        })();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
        var _this10 = this;

        var target;
        var selector = Util.getSelectorFromElement(this);

        if (selector) {
            target = document.querySelector(selector);
        }

        var config = $(target).data(DATA_KEY) ? "toggle" : _objectSpread({}, $(target).data(), $(this).data());

        if (this.tagName === "A" || this.tagName === "AREA") {
            event.preventDefault();
        }

        var $target = $(target).one(Event.SHOW, function (showEvent) {
            if (showEvent.isDefaultPrevented()) {
                // Only register focus restorer if modal will actually get shown
                return;
            }

            $target.one(Event.HIDDEN, function () {
                if ($(_this10).is(":visible")) {
                    _this10.focus();
                }
            });
        });

        Modal._jQueryInterface.call($(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Modal._jQueryInterface;
    $.fn[NAME].Constructor = Modal;

    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Modal._jQueryInterface;
    };

    return Modal;
});

/**
 * Реализация функционала scrollspy
 **/
$(document).ready(function () {
    const ClassName = {
        container: "navigation",
        item: "navigation__item",
        active: "navigation__item_active",
        preview: "navigation__preview",
        navOpen: "navigation_open",
    };
    const Selectors = {
        navContainer: `.${ClassName.container}`,
        navControl: `.${ClassName.item}`,
        navActiveControl: `.${ClassName.active}`,
        navPreview: `.${ClassName.preview}`,
        navProgress: ".navigation_progress",
    };

    /**
     * Контролл ScrollSay
     */
    class ScrollSpy {
        /**
         * Конструктор
         * @param {Element} container - контейнер навигации
         * @param {boolean} _isScrollTop - флаг для инициализации сайдбара без автоскрола по хешу в урле
         */
        constructor(container, _isScrollTop) {
            this.container = container;
            this.$container = $(container);
            this.navPreview = $(Selectors.navPreview, container);
            this.offset = 20;
            this._offsets = [];
            this._targets = [];
            this._scrollHeight = 0;
            this._activeTarget = null;

            $(document).on("scroll", (event) => this._process(event));
            this.navPreview.on("click", () => {
                this._navClickHandler();
            });

            if (_isScrollTop) {
                this._activeTarget = this._targets[0];
            } else {
                this._refresh();
                this._process();
            }
        }

        _navClickHandler() {
            this.$container.toggleClass(ClassName.navOpen);
        }

        _refresh() {
            this._scrollHeight = this._getScrollHeight();
            this._offsets = [];
            this._targets = [];

            const navItems = [].slice.call(this.container.querySelectorAll(Selectors.navControl));
            if (navItems.length) {
                navItems
                    .map((item) => {
                        let target;
                        const targetSelector = Util.getSelectorFromElement(item);
                        if (targetSelector) {
                            target = document.querySelector(targetSelector);
                        }
                        if (target && $(target).is(":visible")) {
                            return [$(target).offset().top, targetSelector];
                        } else {
                            return null;
                        }
                    })
                    .filter((item) => item)
                    .sort((a, b) => a[0] - b[0])
                    .forEach((item) => {
                        this._offsets.push(item[0]);
                        this._targets.push(item[1]);
                    });
            }
        }

        /**
         * Возвращает количество пикселей на которое прокрученная страница
         * @return {number}
         * @private
         */
        _getScrollTop() {
            return window.pageYOffset;
        }

        /**
         * Возвращает высоту контента в элементе, включая содержимое, невидимое из-за прокрутки.
         * @return {number}
         * @private
         */
        _getScrollHeight() {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }

        /**
         * Возвращает высоту (в пикселях) области просмотра окна браузера, включая, если отображается, горизонтальную полосу прокрутки
         * @return {number}
         * @private
         */
        _getOffsetHeight() {
            return window.innerHeight;
        }

        /**
         * Переключение активного итема навигации
         * @private
         */
        _process() {
            const scrollTop = this._getScrollTop() + this.offset;
            const scrollHeight = this._getScrollHeight();
            const maxScroll = this.offset + scrollHeight - this._getOffsetHeight();

            if (this._scrollHeight !== scrollHeight) {
                this._refresh();
            }

            if (scrollTop < this._offsets[0]) {
                const target = this._targets[0];

                if (this._activeTarget !== target) {
                    this._activate(target);
                }
                return true;
            }

            if (scrollTop >= maxScroll) {
                const target = this._targets[this._targets.length - 1];

                if (this._activeTarget !== target) {
                    this._activate(target);
                }
                return true;
            }

            if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
                this._activeTarget = null;
                this._clear();
                return true;
            }

            for (let i = this._offsets.length; i--; ) {
                const isActiveTarget =
                    this._activeTarget !== this._targets[i] &&
                    scrollTop >= this._offsets[i] &&
                    (typeof this._offsets[i + 1] === "undefined" || scrollTop < this._offsets[i + 1]);

                if (isActiveTarget) {
                    this._activate(this._targets[i]);
                }
            }
        }

        /**
         * Откладывает вызов метода на указанный период, новые вызовы запускают таймер сначала
         * @private
         */
        _postpone(callback, limit = 1000) {
            var currentTimer = null;
            return function () {
                if (currentTimer) clearTimeout(currentTimer);
                currentTimer = setTimeout(() => {
                    callback.apply(this, arguments);
                }, limit);
            };
        }

        /**
         * Меняет location.hash в соответствии с активным пунктом навигации
         * @private
         */
        _updatehash = this._postpone(function () {
            var hash = arguments[0].replace(/^#/, "");
            var fx,
                node = $("#" + hash);
            if (node.length) {
                node.attr("id", "");
                fx = $("<div></div>")
                    .css({ position: "absolute", visibility: "hidden", top: $(document).scrollTop() + "px" })
                    .attr("id", hash)
                    .appendTo(document.body);
            }

            window.location.hash = hash;

            if (node.length) {
                fx.remove();
                node.attr("id", hash);
            }
        }, 3000);

        /**
         * Активирует навигационный итем
         * @param target
         * @private
         */
        _activate(target) {
            this._activeTarget = target;
            this._clear();
            const link = $(`a[href="${target}"]`, $(this.container));
            if (link) {
                this._updatehash(target);
                link.addClass(ClassName.active);
                this.navPreview.text(link.text());
                this.$container.removeClass(ClassName.navOpen);
                if (this.$container.is(Selectors.navProgress)) {
                    this.navPreview.attr("data-progress", link.data("progress"));
                }
            }
        }

        /**
         * Очищает классы активности навигационного итема
         * @private
         */
        _clear() {
            [].slice
                .call(this.container.querySelectorAll(Selectors.navControl))
                .filter((node) => node.classList.contains(ClassName.active))
                .forEach((node) => node.classList.remove(ClassName.active));
        }
    }
    //  инициализация логики работы скрола в сайдбаре в зависимости от аттрибута data-scrollTop

    $(function () {
        const container = $(Selectors.navContainer);
        if (container.length) {
            const _isScrollTop = container.get(0).hasAttribute("data-scrollTop");
            if (_isScrollTop) {
                $(document).on("scroll", resetDefault.bind(_isScrollTop));
                setTimeout(() => {
                    window.history.pushState("", document.title, window.location.pathname);
                    if (!$(document).scrollTop()) {
                        $(document).trigger("scroll");
                    } else {
                        $(document).scrollTop(0);
                    }
                }, 200);
            } else {
                new ScrollSpy(container.get(0), _isScrollTop);
            }
        }

        function resetDefault(_isScrollTop) {
            if ($(document).scrollTop() === 0) {
                $(document).off("scroll", resetDefault.bind(_isScrollTop));
                new ScrollSpy(container.get(0), _isScrollTop);
            }
        }
    });
});

/**
 * @file Плагин для bootstrap-select. Добавляет функционала добавления значения из liveSearch в качестве элемента для выбора.
 * Зависимости:
 *  - underscore.js
 *  - jquery
 *  - bootstrap-select
 * Создан Bender 12.05.2021
 */
const Selectors = {
    buttons: ".bs-actionsbox > .group-container",
    searchBoxWrapper: ".bs-searchbox",
    buttonsWrapper: ".bs-actionsbox",
    option: "option",
    buttonAdd: "[data-action='add-item']",
};

/**
 * @class Класс плагина AddBootstrapSelect
 */
class AddBootstrapSelect {
    /**
     * @constructor
     * @param {jquery} element - нода относительно которой инициализируется плагин (исходный селект для selectpicker)
     * @param {object} options - настройки
     * @param {function} [options.appendHandle] - пользовательская функция которая должна вернуть сгенерированный тег option на вход передается введенное значение.
     * @param {string} [options.label] - заголовок кнопки по умолчанию "Добавить"
     * @param {boolean} [options.selectAfterAppend=true] - выбрать новый элемент после добавления ()
     * @param
     */
    constructor(element, options) {
        _.extend(this, options);
        this.element = $(element);
        this.dataStore = this.element.data();
        this.selectpicker = this.dataStore["selectpicker"];
        this.label = this.label || "Добавить";
        this.selectAfterAppend = _.has(options, "selectAfterAppend") ? this.selectAfterAppend : true;

        if (this.selectpicker) {
            //Небольшая задержка чтоб selectpicker успел проинициализироваться
            setTimeout(() => {
                this.render();
                this.initHandler();
            }, 500);
        }
    }

    /**
     * Добавляет новый option в select
     * @param value
     */
    renderOption(value) {
        const { appendHandler } = this;
        if (_.has(this, "appendHandler") && _.isFunction(appendHandler)) {
            appendHandler(this.selectpicker.$element, value);
        } else {
            this.selectpicker.$element.append(`<option>${value}</option>`);
        }
    }

    /**
     * Возвращает верстку кнопки Добавить
     * @return {string}
     */
    renderButton() {
        return `
                <button 
                    type="button" 
                    class="group-container__item button button_plain ${
                        this.selectpicker.multiple && this.selectpicker.options.actionsBox ? "" : "button_wide"
                    }" 
                    data-action="add-item" 
                    
                >
                    ${this.label}
                </button>
            `;
    }

    /**
     * Добавляет кнопку Добавить в интерфейс selectpicker
     */
    render() {
        let buttonsBox = null;
        if (this.selectpicker.multiple && this.selectpicker.options.actionsBox) {
            $(Selectors.buttons, this.selectpicker.$menu).append(this.renderButton());
        } else {
            buttonsBox = `<div class="bs-actionsbox">
                    <div class="group-container group-container_wide">
                        ${this.renderButton()}
                    </div>
                </div>`;
            this.selectpicker.$searchbox.closest(Selectors.searchBoxWrapper).after(buttonsBox);
        }
    }

    /**
     * Проверяет существование введенного лейбла среди элементов селекта
     * @param value
     * @return {boolean}
     */
    isExist(value) {
        const options = $(Selectors.option, this.element).map((index, item) => $(item).text().trim().toLowerCase());
        return _.contains(options, value);
    }

    /**
     * Инициализирует обработчик клика на кнопку
     */
    initHandler() {
        this.selectpicker.$menu.on("click", "[data-action]", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.addHandler();
        });
    }

    /**
     * Обработчик добавления нового элемента
     */
    addHandler() {
        var newValue = this.selectpicker.$searchbox.val();
        this.selectpicker.toggle();
        if (newValue) {
            newValue = newValue.trim();

            if (!this.isExist(newValue)) {
                this.renderOption(newValue);
            }
            this.selectpicker.refresh();
            if (this.selectAfterAppend) {
                this.findAndSelect(newValue);
            }
        }
    }

    /**
     * Находит новую option и выбирает ее значение в селекте
     * @param {string} label
     */
    findAndSelect(label) {
        let value = null;
        let oldValue = this.selectpicker.val() || [];
        $(Selectors.option, this.element).each((item) => {
            const $item = $(item);
            if (label.toLowerCase() === $item.text().trim().toLowerCase()) {
                value = $item.prop("value");
            }
        });
        if (this.selectpicker.multiple && oldValue.length) {
            oldValue.push(value || label);
            this.selectpicker.val(oldValue);
        } else {
            this.selectpicker.val(value || label);
        }
    }

    /**
     * Удаляет верстку компонента и уничтожает инстанс
     */
    destroy() {
        $(Selectors.buttonAdd, this.selectpicker.$menu).remove();
        if (!this.selectpicker.multiple) {
            $(Selectors.buttonsWrapper, this.selectpicker.$menu).remove();
        }
        this.element.data.AddBootstrapSelect = null;
    }
}

/**
 * Инициализация плагина jQuery
 * @param options - опции настройки
 * @return {*}
 */
$.fn.addSelectPicker = function (options) {
    var config = options || {};
    return this.each(function () {
        const timer = setInterval(() => {
            if ($(this).data("selectpicker")) {
                if ($(this).data("AddBootstrapSelect")) {
                    $(this).data("AddBootstrapSelect").destroy();
                }
                $(this).data("AddBootstrapSelect", new AddBootstrapSelect(this, config));
                clearInterval(timer);
            }
        }, 100);
    });
};



/*!
 * Ajax Bootstrap Select
 *
 * Extends existing [Bootstrap Select] implementations by adding the ability to search via AJAX requests as you type. Originally for CROSCON.
 *
 * @version 1.4.5
 * @author Adam Heim - https://github.com/truckingsim
 * @link https://github.com/truckingsim/Ajax-Bootstrap-Select
 * @copyright 2019 Adam Heim
 * @license Released under the MIT license.
 *
 * Contributors:
 *   Mark Carver - https://github.com/markcarver
 *
 * Last build: 2019-09-24 9:36:54 AM CDT
 */
!(function ($, window) {

    /**
     * @class AjaxBootstrapSelect
     *
     * @param {jQuery|HTMLElement} element
     *   The select element this plugin is to affect.
     * @param {Object} [options={}]
     *   The options used to affect the desired functionality of this plugin.
     *
     * @return {AjaxBootstrapSelect|null}
     *   A new instance of this class or null if unable to instantiate.
     */
    var AjaxBootstrapSelect = function (element, options) {
        var i, l, plugin = this;
        options = options || {};

        /**
         * The select element this plugin is being attached to.
         * @type {jQuery}
         */
        this.$element = $(element);

        /**
         * The merged default and passed options.
         * @type {Object}
         */
        this.options = $.extend(true, {}, $.fn.ajaxSelectPicker.defaults, options);

        /**
         * Used for logging error messages.
         * @type {Number}
         */
        this.LOG_ERROR = 1;

        /**
         * Used for logging warning messages.
         * @type {Number}
         */
        this.LOG_WARNING = 2;

        /**
         * Used for logging informational messages.
         * @type {Number}
         */
        this.LOG_INFO = 3;

        /**
         * Used for logging debug messages.
         * @type {Number}
         */
        this.LOG_DEBUG = 4;

        /**
         * The jqXHR object of the last request, false if there was none.
         * @type {jqXHR|Boolean}
         */
        this.lastRequest = false;

        /**
         * The previous query that was requested.
         * @type {String}
         */
        this.previousQuery = '';

        /**
         * The current query being requested.
         * @type {String}
         */
        this.query = '';

        /**
         * The jqXHR object of the current request, false if there is none.
         * @type {jqXHR|Boolean}
         */
        this.request = false;

        // Maps deprecated options to new ones between releases.
        var deprecatedOptionsMap = [
            // @todo Remove these options in next minor release.
            {
                from: 'ajaxResultsPreHook',
                to: 'preprocessData'
            },
            {
                from: 'ajaxSearchUrl',
                to: {
                    ajax: {
                        url: '{{{value}}}'
                    }
                }
            },
            {
                from: 'ajaxOptions',
                to: 'ajax'
            },
            {
                from: 'debug',
                to: function (map) {
                    var _options = {};
                    _options.log = !!plugin.options[map.from];
                    plugin.options = $.extend(true, {}, plugin.options, _options);
                    delete plugin.options[map.from];
                    plugin.log(plugin.LOG_WARNING, 'Deprecated option "' + map.from + '". Update code to use:', _options);
                }
            },
            {
                from: 'mixWithCurrents',
                to: 'preserveSelected'
            },
            {
                from: 'placeHolderOption',
                to: {
                    locale: {
                        emptyTitle: '{{{value}}}'
                    }
                }
            }
        ];
        if (deprecatedOptionsMap.length) {
            $.map(deprecatedOptionsMap, function (map) {
                // Depreciated option detected.
                if (plugin.options[map.from]) {
                    // Map with an object. Use "{{{value}}}" anywhere in the object to
                    // replace it with the passed value.
                    if ($.isPlainObject(map.to)) {
                        plugin.replaceValue(map.to, '{{{value}}}', plugin.options[map.from]);
                        plugin.options = $.extend(true, {}, plugin.options, map.to);
                        plugin.log(plugin.LOG_WARNING, 'Deprecated option "' + map.from + '". Update code to use:', map.to);
                        delete plugin.options[map.from];
                    }
                        // Map with a function. Functions are silos. They are responsible
                    // for deleting the original option and displaying debug info.
                    else if ($.isFunction(map.to)) {
                        map.to.apply(plugin, [map]);
                    }
                    // Map normally.
                    else {
                        var _options = {};
                        _options[map.to] = plugin.options[map.from];
                        plugin.options = $.extend(true, {}, plugin.options, _options);
                        plugin.log(plugin.LOG_WARNING, 'Deprecated option "' + map.from + '". Update code to use:', _options);
                        delete plugin.options[map.from];
                    }
                }
            });
        }

        // Retrieve the element data attributes.
        var data = this.$element.data();

        // @todo Deprecated. Remove this in the next minor release.
        if (data['searchUrl']) {
            plugin.log(plugin.LOG_WARNING, 'Deprecated attribute name: "data-search-url". Update markup to use: \' data-abs-ajax-url="' + data['searchUrl'] + '" \'');
            this.options.ajax.url = data['searchUrl'];
        }

        // Helper functions.
        var matchToLowerCase = function (match, p1) { return p1.toLowerCase(); };
        var expandObject = function (keys, value, obj) {
            var k = [].concat(keys), l = k.length, o = obj || {};
            if (l) { var key = k.shift(); o[key] = expandObject(k, value, o[key]); }
            return l ? o : value;
        };

        // Filter out only the data attributes prefixed with 'data-abs-'.
        var dataKeys = Object.keys(data).filter(/./.test.bind(new RegExp('^abs[A-Z]')));

        // Map the data attributes to their respective place in the options object.
        if (dataKeys.length) {
            // Object containing the data attribute options.
            var dataOptions = {};
            var flattenedOptions = ['locale'];
            for (i = 0, l = dataKeys.length; i < l; i++) {
                var name = dataKeys[i].replace(/^abs([A-Z])/, matchToLowerCase).replace(/([A-Z])/g, '-$1').toLowerCase();
                var keys = name.split('-');

                // Certain options should be flattened to a single object
                // and not fully expanded (such as Locale).
                if (keys[0] && keys.length > 1 && flattenedOptions.indexOf(keys[0]) !== -1) {
                    var newKeys = [keys.shift()];
                    var property = '';
                    // Combine the remaining keys as a single property.
                    for (var ii = 0; ii < keys.length; ii++) {
                        property += (ii === 0 ? keys[ii] : keys[ii].charAt(0).toUpperCase() + keys[ii].slice(1));
                    }
                    newKeys.push(property);
                    keys = newKeys;
                }
                this.log(this.LOG_DEBUG, 'Processing data attribute "data-abs-' + name + '":', data[dataKeys[i]]);
                expandObject(keys, data[dataKeys[i]], dataOptions);
            }
            this.options = $.extend(true, {}, this.options, dataOptions);
            this.log(this.LOG_DEBUG, 'Merged in the data attribute options: ', dataOptions, this.options);
        }

        /**
         * Reference to the selectpicker instance.
         * @type {Selectpicker}
         */
        this.selectpicker = data['selectpicker'];
        if (!this.selectpicker) {
            this.log(this.LOG_ERROR, 'Cannot instantiate an AjaxBootstrapSelect instance without selectpicker first being initialized!');
            return null;
        }

        // Ensure there is a URL.
        if (!this.options.ajax.url) {
            this.log(this.LOG_ERROR, 'Option "ajax.url" must be set! Options:', this.options);
            return null;
        }

        // Initialize the locale strings.
        this.locale = $.extend(true, {}, $.fn.ajaxSelectPicker.locale);

        // Ensure the langCode is properly set.
        this.options.langCode = this.options.langCode || window.navigator.userLanguage || window.navigator.language || 'en';
        if (!this.locale[this.options.langCode]) {
            var langCode = this.options.langCode;

            // Reset the language code.
            this.options.langCode = 'en';

            // Check for both the two and four character language codes, using
            // the later first.
            var langCodeArray = langCode.split('-');
            for (i = 0, l = langCodeArray.length; i < l; i++) {
                var code = langCodeArray.join('-');
                if (code.length && this.locale[code]) {
                    this.options.langCode = code;
                    break;
                }
                langCodeArray.pop();
            }
            this.log(this.LOG_WARNING, 'Unknown langCode option: "' + langCode + '". Using the following langCode instead: "' + this.options.langCode + '".');
        }

        // Allow options to override locale specific strings.
        this.locale[this.options.langCode] = $.extend(true, {}, this.locale[this.options.langCode], this.options.locale);

        /**
         * The select list.
         * @type {AjaxBootstrapSelectList}
         */
        this.list = new window.AjaxBootstrapSelectList(this);
        this.list.refresh();

        // We need for selectpicker to be attached first. Putting the init in a
        // setTimeout is the easiest way to ensure this.
        // @todo Figure out a better way to do this (hopefully listen for an event).
        setTimeout(function () {
            plugin.init();
        }, 500);
    };

    /**
     * Initializes this plugin on a selectpicker instance.
     */
    AjaxBootstrapSelect.prototype.init = function () {
        var requestDelayTimer, plugin = this;

        // Rebind select/deselect to process preserved selections.
        if (this.options.preserveSelected) {
            this.selectpicker.$menu.off('click', '.actions-btn').on('click', '.actions-btn', function (e) {
                if (plugin.selectpicker.options.liveSearch) {
                    plugin.selectpicker.$searchbox.focus();
                }
                else {
                    plugin.selectpicker.$button.focus();
                }
                e.preventDefault();
                e.stopPropagation();
                if ($(this).is('.bs-select-all')) {
                    if (plugin.selectpicker.$lis === null) {
                        plugin.selectpicker.$lis = plugin.selectpicker.$menu.find('li');
                    }
                    plugin.$element.find('option:enabled').prop('selected', true);
                    $(plugin.selectpicker.$lis).not('.disabled').addClass('selected');
                    plugin.selectpicker.render();
                }
                else {
                    if (plugin.selectpicker.$lis === null) {
                        plugin.selectpicker.$lis = plugin.selectpicker.$menu.find('li');
                    }
                    plugin.$element.find('option:enabled').prop('selected', false);
                    $(plugin.selectpicker.$lis).not('.disabled').removeClass('selected');
                    plugin.selectpicker.render();
                }
                plugin.selectpicker.$element.change();
            });
        }

        // Add placeholder text to the search input.
        this.selectpicker.$searchbox
            .attr('placeholder', this.t('searchPlaceholder'))
            // Remove selectpicker events on the search input.
            .off('input propertychange');

        // Bind this plugin's event.
        this.selectpicker.$searchbox.on(this.options.bindEvent, function (e) {
            var query = plugin.selectpicker.$searchbox.val();

            plugin.log(plugin.LOG_DEBUG, 'Bind event fired: "' + plugin.options.bindEvent + '", keyCode:', e.keyCode, e);

            // Dynamically ignore the "enter" key (13) so it doesn't
            // create an additional request if the "cache" option has
            // been disabled.
            if (!plugin.options.cache) {
                plugin.options.ignoredKeys[13] = 'enter';
            }

            // Don't process ignored keys.
            if (plugin.options.ignoredKeys[e.keyCode]) {
                plugin.log(plugin.LOG_DEBUG, 'Key ignored.');
                return;
            }

            // Clear out any existing timer.
            clearTimeout(requestDelayTimer);

            // Process empty search value.
            if (!query.length) {
                // Clear the select list.
                if (plugin.options.clearOnEmpty) {
                    plugin.list.destroy();
                }

                // Don't invoke a request.
                if (!plugin.options.emptyRequest) {
                    return;
                }
            }

            // Don't process if below minimum query length
            if (query.length < plugin.options.minLength) {
                plugin.list.setStatus(plugin.t('statusTooShort'));
                return;
            }

            // Store the query.
            plugin.previousQuery = plugin.query;
            plugin.query = query;

            // Return the cached results, if any.
            if (plugin.options.cache && e.keyCode !== 13) {
                var cache = plugin.list.cacheGet(plugin.query);
                if (cache) {
                    plugin.list.setStatus(!cache.length ? plugin.t('statusNoResults') : '');
                    plugin.list.replaceOptions(cache);
                    plugin.log(plugin.LOG_INFO, 'Rebuilt options from cached data.');
                    return;
                }
            }

            requestDelayTimer = setTimeout(function () {
                // Abort any previous requests.
                if (plugin.lastRequest && plugin.lastRequest.jqXHR && $.isFunction(plugin.lastRequest.jqXHR.abort)) {
                    plugin.lastRequest.jqXHR.abort();
                }

                // Create a new request.
                plugin.request = new window.AjaxBootstrapSelectRequest(plugin);

                // Store as the previous request once finished.
                plugin.request.jqXHR.always(function () {
                    plugin.lastRequest = plugin.request;
                    plugin.request = false;
                });
            }, plugin.options.requestDelay || 300);
        });
    };

    /**
     * Wrapper function for logging messages to window.console.
     *
     * @param {Number} type
     *   The type of message to log. Must be one of:
     *   - AjaxBootstrapSelect.LOG_ERROR
     *   - AjaxBootstrapSelect.LOG_WARNING
     *   - AjaxBootstrapSelect.LOG_INFO
     *   - AjaxBootstrapSelect.LOG_DEBUG
     * @param {String|Object|*} message
     *   The message(s) to log. Multiple arguments can be passed.
     */
    AjaxBootstrapSelect.prototype.log = function (type, message) {
        if (window.console && this.options.log) {
            // Ensure the logging level is always an integer.
            if (typeof this.options.log !== 'number') {
                if (typeof this.options.log === 'string') {
                    this.options.log = this.options.log.toLowerCase();
                }
                switch (this.options.log) {
                    case true:
                    case 'debug':
                        this.options.log = this.LOG_DEBUG;
                        break;

                    case 'info':
                        this.options.log = this.LOG_INFO;
                        break;

                    case 'warn':
                    case 'warning':
                        this.options.log = this.LOG_WARNING;
                        break;

                    default:
                    case false:
                    case 'error':
                        this.options.log = this.LOG_ERROR;
                        break;
                }
            }
            if (type <= this.options.log) {
                var args = [].slice.apply(arguments, [2]);

                // Determine the correct console method to use.
                switch (type) {
                    case this.LOG_DEBUG:
                        type = 'debug';
                        break;
                    case this.LOG_INFO:
                        type = 'info';
                        break;
                    case this.LOG_WARNING:
                        type = 'warn';
                        break;
                    default:
                    case this.LOG_ERROR:
                        type = 'error';
                        break;
                }

                // Prefix the message.
                var prefix = '[' + type.toUpperCase() + '] AjaxBootstrapSelect:';
                if (typeof message === 'string') {
                    args.unshift(prefix + ' ' + message);
                }
                else {
                    args.unshift(message);
                    args.unshift(prefix);
                }

                // Display the message(s).
                window.console[type].apply(window.console, args);
            }
        }
    };

    /**
     * Replaces an old value in an object or array with a new value.
     *
     * @param {Object|Array} obj
     *   The object (or array) to iterate over.
     * @param {*} needle
     *   The value to search for.
     * @param {*} value
     *   The value to replace with.
     * @param {Object} [options]
     *   Additional options for restricting replacement:
     *     - recursive: {boolean} Whether or not to iterate over the entire
     *       object or array, defaults to true.
     *     - depth: {int} The number of level this method is to search
     *       down into child elements, defaults to false (no limit).
     *     - limit: {int} The number of times a replacement should happen,
     *       defaults to false (no limit).
     *
     * @return {void}
     */
    AjaxBootstrapSelect.prototype.replaceValue = function (obj, needle, value, options) {
        var plugin = this;
        options = $.extend({
            recursive: true,
            depth: false,
            limit: false
        }, options);
        // The use of $.each() opposed to native loops here is beneficial
        // since obj can be either an array or an object. This helps reduce
        // the amount of duplicate code needed.
        $.each(obj, function (k, v) {
            if (options.limit !== false && typeof options.limit === 'number' && options.limit <= 0) {
                return false;
            }
            if ($.isArray(obj[k]) || $.isPlainObject(obj[k])) {
                if ((options.recursive && options.depth === false) || (options.recursive && typeof options.depth === 'number' && options.depth > 0)) {
                    plugin.replaceValue(obj[k], needle, value, options);
                }
            }
            else {
                if (v === needle) {
                    if (options.limit !== false && typeof options.limit === 'number') {
                        options.limit--;
                    }
                    obj[k] = value;
                }
            }
        });
    };

    /**
     * Generates a translated {@link $.fn.ajaxSelectPicker.locale locale string} for a given locale key.
     *
     * @param {String} key
     *   The translation key to use.
     * @param {String} [langCode]
     *   Overrides the currently set {@link $.fn.ajaxSelectPicker.defaults#langCode langCode} option.
     *
     * @return {String}
     *   The translated string.
     */
    AjaxBootstrapSelect.prototype.t = function (key, langCode) {
        langCode = langCode || this.options.langCode;
        if (this.locale[langCode] && Object.prototype.hasOwnProperty.call(this.locale[langCode], key)) {
            return this.locale[langCode][key];
        }
        this.log(this.LOG_WARNING, 'Unknown translation key:', key);
        return key;
    };

    /**
     * Use an existing definition in the Window object or create a new one.
     *
     * Note: This must be the last statement of this file.
     *
     * @type {AjaxBootstrapSelect}
     * @ignore
     */
    window.AjaxBootstrapSelect = window.AjaxBootstrapSelect || AjaxBootstrapSelect;

// eslint-disable-next-line valid-jsdoc
    /**
     * @class AjaxBootstrapSelectList
     *   Maintains the select options and selectpicker menu.
     *
     * @param {AjaxBootstrapSelect} plugin
     *   The plugin instance.
     *
     * @return {AjaxBootstrapSelectList}
     *   A new instance of this class.
     */
    var AjaxBootstrapSelectList = function (plugin) {
        var that = this;

        /**
         * DOM element used for updating the status of requests and list counts.
         * @type {jQuery}
         */
        this.$status = $(plugin.options.templates.status).hide().appendTo(plugin.selectpicker.$menu);
        var statusInitialized = plugin.t('statusInitialized');
        if (statusInitialized && statusInitialized.length) {
            this.setStatus(statusInitialized);
        }

        /**
         * Container for cached data.
         * @type {Object}
         */
        this.cache = {};

        /**
         * Reference the plugin for internal use.
         * @type {AjaxBootstrapSelect}
         */
        this.plugin = plugin;

        /**
         * Container for current selections.
         * @type {Array}
         */
        this.selected = [];

        /**
         * Containers for previous titles.
         */
        this.title = null;
        this.selectedTextFormat = plugin.selectpicker.options.selectedTextFormat;

        // Save initial options
        var initial_options = [];
        plugin.$element.find('option').each(function () {
            var $option = $(this);
            var value = $option.attr('value');
            initial_options.push({
                value: value,
                text: $option.text(),
                'class': $option.attr('class') || '',
                data: $option.data() || {},
                preserved: plugin.options.preserveSelected,
                selected: !!$option.attr('selected')
            });
        });
        this.cacheSet(/* query=*/'', initial_options);

        // Preserve selected options.
        if (plugin.options.preserveSelected) {
            that.selected = initial_options;
            plugin.$element.on('change.abs.preserveSelected', function (e) {
                var $selected = plugin.$element.find(':selected');
                that.selected = [];
                // If select does not have multiple selection, ensure that only the
                // last selected option is preserved.
                if (!plugin.selectpicker.multiple) {
                    $selected = $selected.last();
                }
                $selected.each(function () {
                    var $option = $(this);
                    var value = $option.attr('value');
                    that.selected.push({
                        value: value,
                        text: $option.text(),
                        'class': $option.attr('class') || '',
                        data: $option.data() || {},
                        preserved: true,
                        selected: true
                    });
                });
                that.replaceOptions(that.cacheGet(that.plugin.query));
            });
        }
    };

    /**
     * Builds the options for placing into the element.
     *
     * @param {Array} data
     *   The data to use when building options for the select list. Each
     *   array item must be an Object structured as follows:
     *     - {int|string} value: Required, a unique value identifying the
     *       item. Optionally not required if divider is passed instead.
     *     - {boolean} [divider]: Optional, if passed all other values are
     *       ignored and this item becomes a divider.
     *     - {string} [text]: Optional, the text to display for the item.
     *       If none is provided, the value will be used.
     *     - {String} [class]: Optional, the classes to apply to the option.
     *     - {boolean} [disabled]: Optional, flag that determines if the
     *       option is disabled.
     *     - {boolean} [selected]: Optional, flag that determines if the
     *       option is selected. Useful only for select lists that have the
     *       "multiple" attribute. If it is a single select list, each item
     *       that passes this property as true will void the previous one.
     *     - {Object} [data]: Optional, the additional data attributes to
     *       attach to the option element. These are processed by the
     *       bootstrap-select plugin.
     *
     * @return {String}
     *   HTML containing the <option> elements to place in the element.
     */
    AjaxBootstrapSelectList.prototype.build = function (data) {
        var a, i, l = data.length;
        var $select = $('<select/>');
        var $preserved = $('<optgroup/>').attr('label', this.plugin.t('currentlySelected'));

        this.plugin.log(this.plugin.LOG_DEBUG, 'Building the select list options from data:', data);

        for (i = 0; i < l; i++) {
            var item = data[i];
            var $option = $('<option/>').appendTo(item.preserved ? $preserved : $select);

            // Detect dividers.
            if (Object.prototype.hasOwnProperty.call(item, 'divider')) {
                $option.attr('data-divider', 'true');
                continue;
            }

            // Set various properties.
            $option.val(item.value).text(item.text);
            if (item.title) {
                $option.attr('title', item.title);
            }
            if (item['class'].length) {
                $option.attr('class', item['class']);
            }
            if (item.disabled) {
                $option.attr('disabled', true);
            }

            // Remove previous selections, if necessary.
            if (item.selected && !this.plugin.selectpicker.multiple) {
                $select.find(':selected').prop('selected', false);
            }

            // Set this option's selected state.
            if (item.selected) {
                $option.attr('selected', true);
            }

            // Add data attributes.
            for (a in item.data) {
                if (Object.prototype.hasOwnProperty.call(item.data, a)) {
                    $option.attr('data-' + a, item.data[a]);
                }
            }
        }

        // Append the preserved selections.
        if ($preserved.find('option').length) {
            $preserved[this.plugin.options.preserveSelectedPosition === 'before' ? 'prependTo' : 'appendTo']($select);
        }

        var options = $select.html();
        this.plugin.log(this.plugin.LOG_DEBUG, options);
        return options;
    };

    /**
     * Retrieve data from the cache.
     *
     * @param {string} key
     *   The identifier name of the data to retrieve.
     * @param {*} [defaultValue]
     *   The default value to return if no cache data is available.
     *
     * @return {*}
     *   The cached data or defaultValue.
     */
    AjaxBootstrapSelectList.prototype.cacheGet = function (key, defaultValue) {
        var value = this.cache[key] || defaultValue;
        this.plugin.log(this.LOG_DEBUG, 'Retrieving cache:', key, value);
        return value;
    };

    /**
     * Save data to the cache.
     *
     * @param {string} key
     *   The identifier name of the data to store.
     * @param {*} value
     *   The value of the data to store.
     */
    AjaxBootstrapSelectList.prototype.cacheSet = function (key, value) {
        this.cache[key] = value;
        this.plugin.log(this.LOG_DEBUG, 'Saving to cache:', key, value);
    };

    /**
     * Destroys the select list.
     */
    AjaxBootstrapSelectList.prototype.destroy = function () {
        this.replaceOptions();
        this.plugin.list.setStatus();
        this.plugin.log(this.plugin.LOG_DEBUG, 'Destroyed select list.');
    };

    /**
     * Refreshes the select list.
     *
     * @param {Boolean} triggerChange
     *   Flag indicating whether the "change" event should be triggered.
     */
    AjaxBootstrapSelectList.prototype.refresh = function (triggerChange) {
        // Remove unnecessary "min-height" from selectpicker.
        this.plugin.selectpicker.$menu.css('minHeight', 0);
        this.plugin.selectpicker.$menu.find('> .inner').css('minHeight', 0);
        var emptyTitle = this.plugin.t('emptyTitle');
        if (!this.plugin.$element.find('option').length && emptyTitle && emptyTitle.length) {
            this.setTitle(emptyTitle);
        }
        else if (
            this.title ||
            (
                this.selectedTextFormat !== 'static' &&
                this.selectedTextFormat !== this.plugin.selectpicker.options.selectedTextFormat
            )
        ) {
            this.restoreTitle();
        }
        this.plugin.selectpicker.refresh();
        // The "refresh" method sets the $lis property to null, it must be rebuilt.
        this.plugin.selectpicker.findLis();

        // Only trigger change event when specified.
        if (triggerChange) {
            this.plugin.log(this.plugin.LOG_DEBUG, 'Triggering Change');
            this.plugin.$element.trigger('change.$');
        }
        this.plugin.log(this.plugin.LOG_DEBUG, 'Refreshed select list.');
    };

    /**
     * Replaces the select list options with provided data.
     *
     * It will also inject any preserved selections if the preserveSelected
     * option is enabled.
     *
     * @param {Array} data
     *   The data array to process.
     */
    AjaxBootstrapSelectList.prototype.replaceOptions = function (data) {
        var i, l, item, output = '', processedData = [], selected = [], seenValues = [];
        data = data || [];

        // Merge in selected options from the previous state (cannot be cached).
        if (this.selected && this.selected.length) {
            this.plugin.log(this.plugin.LOG_INFO, 'Processing preserved selections:', this.selected);
            selected = [].concat(this.selected, data);
            l = selected.length;
            for (i = 0; i < l; i++) {
                item = selected[i];
                // Typecast the value for the seenValues array. Array indexOf
                // searches are type sensitive.
                if (Object.prototype.hasOwnProperty.call(item, 'value') && seenValues.indexOf(item.value + '') === -1) {
                    seenValues.push(item.value + '');
                    processedData.push(item);
                }
                else {
                    this.plugin.log(this.plugin.LOG_DEBUG, 'Duplicate item found, ignoring.');
                }
            }
            data = processedData;
        }

        // Build the option output.
        if (data.length) {
            output = this.plugin.list.build(data);
        }

        // Replace the options.
        this.plugin.$element.html(output);
        this.refresh();
        this.plugin.log(this.plugin.LOG_DEBUG, 'Replaced options with data:', data);
    };

    /**
     * Restores the select list to the last saved state.
     *
     * @return {boolean}
     *   Return true if successful or false if no states are present.
     */
    AjaxBootstrapSelectList.prototype.restore = function () {
        var cache = this.plugin.list.cacheGet(this.plugin.previousQuery);
        if (cache && this.plugin.list.replaceOptions(cache)) {
            this.plugin.log(this.plugin.LOG_DEBUG, 'Restored select list to the previous query: ', this.plugin.previousQuery);
        }
        this.plugin.log(this.plugin.LOG_DEBUG, 'Unable to restore select list to the previous query:', this.plugin.previousQuery);
        return false;
    };

    /**
     * Restores the previous title of the select element.
     */
    AjaxBootstrapSelectList.prototype.restoreTitle = function () {
        if (!this.plugin.request) {
            this.plugin.selectpicker.options.selectedTextFormat = this.selectedTextFormat;
            if (this.title) {
                this.plugin.$element.attr('title', this.title);
            }
            else {
                this.plugin.$element.removeAttr('title');
            }
            this.title = null;
        }
    };

    /**
     * Sets a new title on the select element.
     *
     * @param {String} title
     *   The title to set.
     */
    AjaxBootstrapSelectList.prototype.setTitle = function (title) {
        if (!this.plugin.request) {
            this.title = this.plugin.$element.attr('title');
            this.plugin.selectpicker.options.selectedTextFormat = 'static';
            this.plugin.$element.attr('title', title);
        }
    };

    /**
     * Sets a new status on the AjaxBootstrapSelectList.$status DOM element.
     *
     * @param {String} [status]
     *   The new status to set, if empty it will hide it.
     */
    AjaxBootstrapSelectList.prototype.setStatus = function (status) {
        status = status || '';
        if (status.length) {
            this.$status.html(status).show();
        }
        else {
            this.$status.html('').hide();
        }
    };

    /**
     * Use an existing definition in the Window object or create a new one.
     *
     * Note: This must be the last statement of this file.
     *
     * @type {AjaxBootstrapSelectList}
     * @ignore
     */
    window.AjaxBootstrapSelectList = window.AjaxBootstrapSelectList || AjaxBootstrapSelectList;

// eslint-disable-next-line valid-jsdoc
    /**
     * @class AjaxBootstrapSelectRequest
     *   Instantiates a new jQuery.ajax request for the current query.
     *
     * @param {AjaxBootstrapSelect} plugin
     *   The plugin instance.
     *
     * @return {AjaxBootstrapSelectRequest}
     *   A new instance of this class.
     */
    var AjaxBootstrapSelectRequest = function (plugin) {
        var that = this;
        var ajaxCallback = function (event) {
            return function () {
                that.plugin.log(that.plugin.LOG_INFO, 'Invoking AjaxBootstrapSelectRequest.' + event + ' callback:', arguments);
                that[event].apply(that, arguments);
                if (that.callbacks[event]) {
                    that.plugin.log(that.plugin.LOG_INFO, 'Invoking ajax.' + event + ' callback:', arguments);
                    that.callbacks[event].apply(that, arguments);
                }
            };
        };
        var events = ['beforeSend', 'success', 'error', 'complete'];
        var i, l = events.length;

        // Reference the existing plugin.
        this.plugin = plugin;

        // Clone the default ajax options.
        this.options = $.extend(true, {}, plugin.options.ajax);

        // Save any existing callbacks provided in the options and replace it with
        // the relevant method callback. The provided callback will be invoked
        // after this plugin has executed.
        this.callbacks = {};
        for (i = 0; i < l; i++) {
            var event = events[i];
            if (this.options[event] && $.isFunction(this.options[event])) {
                this.callbacks[event] = this.options[event];
            }
            this.options[event] = ajaxCallback(event);
        }

        // Allow the data option to be dynamically generated.
        if (this.options.data && $.isFunction(this.options.data)) {
            this.options.data = this.options.data.apply(this) || {
                q: '{{{q}}}'
            };
        }

        // Replace all data values that contain "{{{q}}}" with the value of the
        // current search query.
        this.plugin.replaceValue(this.options.data, '{{{q}}}', this.plugin.query);

        // Allow the url to be dynamically generated if passed as function.
        if (this.options.url && $.isFunction(this.options.url)) {
            this.options.url = this.options.url.apply(this);
        }

        // Invoke the AJAX request.
        this.jqXHR = $.ajax(this.options);
    };

    /**
     * @event beforeSend
     * A callback that can be used to modify the jqXHR object before it is sent.
     *
     * Use this to set custom headers, etc. Returning false will cancel the request.
     * To modify the options being sent, use this.options.
     *
     * @param {jqXHR} jqXHR
     *   The jQuery wrapped XMLHttpRequest object.
     */
    AjaxBootstrapSelectRequest.prototype.beforeSend = function (jqXHR) {
        // Destroy the list currently there.
        this.plugin.list.destroy();

        // Set the status accordingly.
        this.plugin.list.setStatus(this.plugin.t('statusSearching'));

        // this.plugin.list.refresh();
    };

    /**
     * @event complete
     *   The "complete" callback for the request.
     *
     * @param {jqXHR} jqXHR
     *   The jQuery wrapped XMLHttpRequest object.
     * @param {String} status
     *   A string categorizing the status of the request: "success", "notmodified",
     *   "error", "timeout", "abort", or "parsererror".
     */
    AjaxBootstrapSelectRequest.prototype.complete = function (jqXHR, status) {
        // Only continue if actual results and not an aborted state.
        if (status !== 'abort') {
            var cache = this.plugin.list.cacheGet(this.plugin.query);
            if (cache) {
                if (cache.length) {
                    this.plugin.list.setStatus();
                }
                else {
                    this.plugin.list.destroy();
                    this.plugin.list.setStatus(this.plugin.t('statusNoResults'));
                    this.plugin.log(this.plugin.LOG_INFO, 'No results were returned.');
                    return;
                }
            }
            this.plugin.list.refresh(true);
        }
    };

    /**
     * @event error
     *   The "error" callback for the request.
     *
     * @param {jqXHR} jqXHR
     *   The jQuery wrapped XMLHttpRequest object.
     * @param {String} status
     *   A string describing the type of error that occurred. Possible values for
     *   the second argument (besides null) are "timeout", "error", "abort", and
     *   "parsererror".
     * @param {String|Object} error
     *   An optional exception object, if one occurred. When an HTTP error occurs,
     *   error receives the textual portion of the HTTP status, such as "Not Found"
     *   or "Internal Server Error."
     */
    AjaxBootstrapSelectRequest.prototype.error = function (jqXHR, status, error) {
        if (status !== 'abort') {
            // Cache the result data.
            this.plugin.list.cacheSet(this.plugin.query);

            // Clear the list.
            if (this.plugin.options.clearOnError) {
                this.plugin.list.destroy();
            }

            // Set the status after the list has cleared and before the restore.
            this.plugin.list.setStatus(this.plugin.t('errorText'));

            // Restore previous request.
            if (this.plugin.options.restoreOnError) {
                this.plugin.list.restore();
                this.plugin.list.setStatus();
            }
        }
    };

    /**
     * Process incoming data.
     *
     * This method ensures that the incoming data has unique values and
     * is in the proper format that is utilized by this plugin. It also
     * adds in the existing selects if the option is enabled. If the
     * preprocessData and processData functions were defined in the plugin
     * options, they are invoked here.
     *
     * @param {Array|Object} data
     *   The JSON data to process.
     *
     * @return {Array|Boolean}
     *   The processed data array or false if an error occurred.
     */
    AjaxBootstrapSelectRequest.prototype.process = function (data) {
        var i, l, callbackResult, item, preprocessedData, processedData;
        var filteredData = [], seenValues = [];

        this.plugin.log(this.plugin.LOG_INFO, 'Processing raw data for:', this.plugin.query, data);

        // Invoke the preprocessData option callback.
        preprocessedData = data;
        if ($.isFunction(this.plugin.options.preprocessData)) {
            this.plugin.log(this.plugin.LOG_DEBUG, 'Invoking preprocessData callback:', this.plugin.options.processData);
            callbackResult = this.plugin.options.preprocessData.apply(this, [preprocessedData]);
            if (typeof callbackResult !== 'undefined' && callbackResult !== null && callbackResult !== false) {
                preprocessedData = callbackResult;
            }
        }

        // Ensure the data is an array.
        if (!$.isArray(preprocessedData)) {
            this.plugin.log(this.plugin.LOG_ERROR, 'The data returned is not an Array. Use the "preprocessData" callback option to parse the results and construct a proper array for this plugin.', preprocessedData);
            return false;
        }

        // Filter preprocessedData.
        l = preprocessedData.length;
        for (i = 0; i < l; i++) {
            item = preprocessedData[i];
            this.plugin.log(this.plugin.LOG_DEBUG, 'Processing item:', item);
            if ($.isPlainObject(item)) {
                // Check if item is a divider. If so, ignore all other data.
                if (Object.prototype.hasOwnProperty.call(item, 'divider') || (Object.prototype.hasOwnProperty.call(item, 'data') && $.isPlainObject(item.data) && item.data.divider)) {
                    this.plugin.log(this.plugin.LOG_DEBUG, 'Item is a divider, ignoring provided data.');
                    filteredData.push({divider: true});
                }
                // Ensure item has a "value" and is unique.
                else {
                    if (Object.prototype.hasOwnProperty.call(item, 'value')) {
                        // Typecast the value for the seenValues array. Array
                        // indexOf searches are type sensitive.
                        if (seenValues.indexOf(item.value + '') === -1) {
                            seenValues.push(item.value + '');
                            // Provide default items to ensure expected structure.
                            item = $.extend({
                                text: item.value,
                                'class': '',
                                data: {},
                                disabled: false,
                                selected: false
                            }, item);
                            filteredData.push(item);
                        }
                        else {
                            this.plugin.log(this.plugin.LOG_DEBUG, 'Duplicate item found, ignoring.');
                        }
                    }
                    else {
                        this.plugin.log(this.plugin.LOG_DEBUG, 'Data item must have a "value" property, skipping.');
                    }
                }
            }
        }

        // Invoke the processData option callback.
        processedData = [].concat(filteredData);
        if ($.isFunction(this.plugin.options.processData)) {
            this.plugin.log(this.plugin.LOG_DEBUG, 'Invoking processData callback:', this.plugin.options.processData);
            callbackResult = this.plugin.options.processData.apply(this, [processedData]);
            if (typeof callbackResult !== 'undefined' && callbackResult !== null && callbackResult !== false) {
                if ($.isArray(callbackResult)) {
                    processedData = callbackResult;
                }
                else {
                    this.plugin.log(this.plugin.LOG_ERROR, 'The processData callback did not return an array.', callbackResult);
                    return false;
                }
            }
        }

        // Cache the processed data.
        this.plugin.list.cacheSet(this.plugin.query, processedData);

        this.plugin.log(this.plugin.LOG_INFO, 'Processed data:', processedData);
        return processedData;
    };

    /**
     * @event success
     *   The "success" callback for the request.
     *
     * @param {Object} data
     *   The data returned from the server, formatted according to the dataType
     *   option.
     * @param {String} status
     *   A string describing the status.
     * @param {jqXHR} jqXHR
     *   The jQuery wrapped XMLHttpRequest object.
     */
    AjaxBootstrapSelectRequest.prototype.success = function (data, status, jqXHR) {
        // Only process data if an Array or Object.
        if (!$.isArray(data) && !$.isPlainObject(data)) {
            this.plugin.log(this.plugin.LOG_ERROR, 'Request did not return a JSON Array or Object.', data);
            this.plugin.list.destroy();
            return;
        }

        // Process the data.
        var processedData = this.process(data);
        this.plugin.list.replaceOptions(processedData);
    };

    /**
     * Use an existing definition in the Window object or create a new one.
     *
     * Note: This must be the last statement of this file.
     *
     * @type {AjaxBootstrapSelectRequest}
     * @ignore
     */
    window.AjaxBootstrapSelectRequest = window.AjaxBootstrapSelectRequest || AjaxBootstrapSelectRequest;

// eslint-disable-next-line valid-jsdoc
    /**
     * @class $.fn.ajaxSelectPicker
     *
     * The jQuery plugin definition.
     *
     * This initializes a new AjaxBootstrapSelect class for each element in the jQuery chain.
     *
     * @param {Object} options
     *   The {@link $.fn.ajaxSelectPicker.defaults options} to pass to the plugin.
     *
     * @return {jQuery}
     *
     * @chainable
     */
    $.fn.ajaxSelectPicker = function (options) {
        return this.each(function () {
            if (!$(this).data('AjaxBootstrapSelect')) {
                $(this).data('AjaxBootstrapSelect', new window.AjaxBootstrapSelect(this, options));
            }
        });
    };

    /**
     * The locale object containing string translations.
     *
     * @type {Object}
     *
     * @see {@link $.fn.ajaxSelectPicker.locale}
     */
    $.fn.ajaxSelectPicker.locale = {};

    /**
     * The default options the plugin will use if none are provided.
     *
     * See: {@link $.fn.ajaxSelectPicker.defaults}
     *
     * @member $.fn.ajaxSelectPicker
     * @property {Object} defaults
     */
    $.fn.ajaxSelectPicker.defaults = {

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @deprecated Since version `1.2.0`, see: {@link $.fn.ajaxSelectPicker.defaults#preprocessData}.
         * @cfg {Function} ajaxResultsPreHook
         */

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Object} ajax (required)
         * @markdown
         * The options to pass to the jQuery AJAX request.
         *
         * ```js
         * {
         *     url: null, // Required.
         *     type: 'POST',
         *     dataType: 'json',
         *     data: {
         *         q: '{{{q}}}'
         *     }
         * }
         * ```
         */
        ajax: {
            url: null,
            type: 'POST',
            dataType: 'json',
            data: {
                q: '{{{q}}}'
            }
        },

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Number} minLength = 0
         * @markdown
         * Invoke a request for empty search values.
         */
        minLength: 0,

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {String} ajaxSearchUrl
         * @deprecated Since version `1.2.0`, see: {@link $.fn.ajaxSelectPicker.defaults#ajax}.
         */

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {String} bindEvent = "keyup"
         * @markdown
         * The event to bind on the search input element to fire a request.
         */
        bindEvent: 'keyup',

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Boolean} cache = true
         * @markdown
         * Cache previous requests. If enabled, the "enter" key (13) is enabled to
         * allow users to force a refresh of the request.
         */
        cache: true,

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Boolean} clearOnEmpty = true
         * @markdown
         * Clears the previous results when the search input has no value.
         */
        clearOnEmpty: true,

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Boolean} clearOnError = true
         * @markdown
         * Clears the select list when the request returned with an error.
         */
        clearOnError: true,

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Boolean} debug
         * @deprecated Since version `1.2.0`, see: {@link $.fn.ajaxSelectPicker.defaults#log}.
         */

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Boolean} emptyRequest = false
         * @markdown
         * Invoke a request for empty search values.
         */
        emptyRequest: false,

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Object} ignoredKeys
         * @markdown
         * Key codes to ignore so a request is not invoked with bindEvent. The
         * "enter" key (13) will always be dynamically added to any list provided
         * unless the "cache" option above is set to "true".
         *
         * ```js
         * {
         *     9: "tab",
         *     16: "shift",
         *     17: "ctrl",
         *     18: "alt",
         *     27: "esc",
         *     37: "left",
         *     39: "right",
         *     38: "up",
         *     40: "down",
         *     91: "meta"
         * }
         * ```
         */
        ignoredKeys: {
            9: "tab",
            16: "shift",
            17: "ctrl",
            18: "alt",
            27: "esc",
            37: "left",
            39: "right",
            38: "up",
            40: "down",
            91: "meta"
        },

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {String} langCode = null
         * @markdown
         * The language code to use for string translation. By default this value
         * is determined by the browser, however it is not entirely reliable. If
         * you encounter inconsistencies, you may need to manually set this option.
         */
        langCode: null,

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Object} locale = null
         * @markdown
         * Provide specific overrides for {@link $.fn.ajaxSelectPicker.locale locale string} translations. Values
         * set here will cause the plugin to completely ignore defined locale string
         * translations provided by the set language code. This is useful when
         * needing to change a single value or when being used in a system that
         * provides its own translations, like a CMS.
         *
         * ```js
         * locale: {
         *     searchPlaceholder: Drupal.t('Find...')
         * }
         * ```
         */
        locale: null,

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {String|Number|Number} log = 'error'
         * @markdown
         * Determines the amount of logging that is displayed:
         *
         * - __0, false:__ Display no information from the plugin.
         * - __1, 'error':__ Fatal errors that prevent the plugin from working.
         * - __2, 'warn':__ Warnings that may impact the display of request data, but does not prevent the plugin from functioning.
         * - __3, 'info':__ Provides additional information, generally regarding the from request data and callbacks.
         * - __4, true, 'debug':__ Display all possible information. This will likely be highly verbose and is only recommended for development purposes or tracing an error with a request.
         */
        log: 'error',

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Boolean} mixWithCurrents
         * @deprecated Since version `1.2.0`, see: {@link $.fn.ajaxSelectPicker.defaults#preserveSelected}.
         */

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg placeHolderOption
         * @deprecated Since version `1.2.0`, see: {@link $.fn.ajaxSelectPicker.locale#emptyTitle}.
         */

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Function|null} preprocessData = function(){}
         * @markdown
         * Process the raw data returned from a request.
         *
         * The following arguments are passed to this callback:
         *
         * - __data__ - `Array` The raw data returned from the request, passed by reference.
         *
         * This callback must return one of the following:
         *
         * - `Array` - A new array of items. This will replace the passed data.
         * - `undefined|null|false` - Stops the callback and will use whatever modifications have been made to data.
         *
         * ```js
         * function (data) {
         *     var new = [], old = [], other = [];
         *     for (var i = 0; i < data.length; i++) {
         *         // Add items flagged as "new" to the correct array.
         *         if (data[i].new) {
         *             new.push(data[i]);
         *         }
         *         // Add items flagged as "old" to the correct array.
         *         else if (data[i].old) {
         *             old.push(data[i]);
         *         }
         *         // Something out of the ordinary happened, put these last.
         *         else {
         *             other.push(data[i]);
         *         }
         *     }
         *     // Sort the data according to the order of these arrays.
         *     return [].concat(new, old, other).
         * }
         * ```
         */
        preprocessData: function () { },

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Boolean} preserveSelected = true
         * @markdown
         * Preserve selected items(s) between requests. When enabled, they will be
         * placed in an `<optgroup>` with the label `Currently Selected`. Disable
         * this option if you send your currently selected items along with your
         * request and let the server handle this responsibility.
         */
        preserveSelected: true,

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {String} preserveSelectedPosition = 'after'
         * @markdown
         * Place the currently selected options `'before'` or `'after'` the options
         * returned from the request.
         */
        preserveSelectedPosition: 'after',

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Function|null} processData = function(){}
         * @markdown
         * Process the data returned after this plugin, but before the list is built.
         */
        processData: function () { },

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Number} requestDelay = 300
         * @markdown
         * The amount of time, in milliseconds, that must pass before a request
         * is initiated. Each time the {@link $.fn.ajaxSelectPicker.defaults#bindEvent bindEvent} is fired, it will cancel the
         * current delayed request and start a new one.
         */
        requestDelay: 300,

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Boolean} restoreOnError = false
         * @markdown
         * Restores the select list with the previous results when the request
         * returns with an error.
         */
        restoreOnError: false,

        /**
         * @member $.fn.ajaxSelectPicker.defaults
         * @cfg {Object} templates
         * @markdown
         * The DOM templates used in this plugin.
         *
         * ```js
         * templates: {
         *     // The placeholder for status updates pertaining to the list and request.
         *     status: '<div class="status"></div>',
         * }
         * ```
         */
        templates: {
            status: '<div class="dropdown-menu__status"></div>'
        }
    };

    /*
     * Note: You do not have to load this translation file. English is the
     * default language of this plugin and is compiled into it automatically.
     *
     * This file is just to serve as the default string mappings and as a
     * template for future translations.
     * @see: ./src/js/locale/en-US.js
     *
     * Four character language codes are supported ("en-US") and will always
     * take precedence over two character language codes ("en") if present.
     *
     * When copying this file, remove all comments except the one above the
     * definition objection giving credit to the translation author.
     */

    /*!
     * English translation for the "en-US" and "en" language codes.
     * Mark Carver <mark.carver@me.com>
     */
    $.fn.ajaxSelectPicker.locale['en-US'] = {

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} currentlySelected = 'Currently Selected'
         * @markdown
         * The text to use for the label of the option group when currently selected options are preserved.
         */
        currentlySelected: 'Выбрано',

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} emptyTitle = 'Select and begin typing'
         * @markdown
         * The text to use as the title for the select element when there are no items to display.
         */
        emptyTitle: 'Выделите и начните печатать',

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} errorText = ''Unable to retrieve results'
         * @markdown
         * The text to use in the status container when a request returns with an error.
         */
        errorText: 'Невозможно получить результат',

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} searchPlaceholder = 'Search...'
         * @markdown
         * The text to use for the search input placeholder attribute.
         */
        searchPlaceholder: 'Искать...',

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} statusInitialized = 'Start typing a search query'
         * @markdown
         * The text used in the status container when it is initialized.
         */
        statusInitialized: 'Начните печатать запрос для поиска',

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} statusNoResults = 'No Results'
         * @markdown
         * The text used in the status container when the request returns no results.
         */
        statusNoResults: 'Нет результатов',

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} statusSearching = 'Searching...'
         * @markdown
         * The text to use in the status container when a request is being initiated.
         */
        statusSearching: 'Поиск...',

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} statusTooShort = 'Please enter more characters'
         * @markdown
         * The text used in the status container when the request returns no results.
         */
        statusTooShort: 'Введите еще несколько символов'
    };
    $.fn.ajaxSelectPicker.locale.en = $.fn.ajaxSelectPicker.locale['en-US'];

})(jQuery, window);

/*!
 * Bootstrap-select v1.13.18 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2020 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
    if (root === undefined && window !== undefined) root = window;
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define(["jquery"], function (a0) {
            return factory(a0);
        });
    } else if (typeof module === "object" && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(root["jQuery"]);
    } else {
        factory(root["jQuery"]);
    }
})(this, function (jQuery) {
    (function ($) {
        "use strict";

        var DISALLOWED_ATTRIBUTES = ["sanitize", "whiteList", "sanitizeFn"];

        var uriAttrs = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"];

        var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

        var DefaultWhitelist = {
            // Global attributes allowed on any supplied element below.
            "*": ["class", "dir", "id", "lang", "role", "tabindex", "style", ARIA_ATTRIBUTE_PATTERN],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: [],
        };

        /**
         * A pattern that recognizes a commonly useful subset of URLs that are safe.
         *
         * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
         */
        var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;

        /**
         * A pattern that matches safe data URLs. Only matches image, video and audio types.
         *
         * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
         */
        var DATA_URL_PATTERN =
            /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

        function allowedAttribute(attr, allowedAttributeList) {
            var attrName = attr.nodeName.toLowerCase();

            if ($.inArray(attrName, allowedAttributeList) !== -1) {
                if ($.inArray(attrName, uriAttrs) !== -1) {
                    return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
                }

                return true;
            }

            var regExp = $(allowedAttributeList).filter(function (index, value) {
                return value instanceof RegExp;
            });

            // Check if a regular expression validates the attribute.
            for (var i = 0, l = regExp.length; i < l; i++) {
                if (attrName.match(regExp[i])) {
                    return true;
                }
            }

            return false;
        }

        function sanitizeHtml(unsafeElements, whiteList, sanitizeFn) {
            if (sanitizeFn && typeof sanitizeFn === "function") {
                return sanitizeFn(unsafeElements);
            }

            var whitelistKeys = Object.keys(whiteList);

            for (var i = 0, len = unsafeElements.length; i < len; i++) {
                var elements = unsafeElements[i].querySelectorAll("*");

                for (var j = 0, len2 = elements.length; j < len2; j++) {
                    var el = elements[j];
                    var elName = el.nodeName.toLowerCase();

                    if (whitelistKeys.indexOf(elName) === -1) {
                        el.parentNode.removeChild(el);

                        continue;
                    }

                    var attributeList = [].slice.call(el.attributes);
                    var whitelistedAttributes = [].concat(whiteList["*"] || [], whiteList[elName] || []);

                    for (var k = 0, len3 = attributeList.length; k < len3; k++) {
                        var attr = attributeList[k];

                        if (!allowedAttribute(attr, whitelistedAttributes)) {
                            el.removeAttribute(attr.nodeName);
                        }
                    }
                }
            }
        }

        // Polyfill for browsers with no classList support
        // Remove in v2
        if (!("classList" in document.createElement("_"))) {
            (function (view) {
                if (!("Element" in view)) return;

                var classListProp = "classList",
                    protoProp = "prototype",
                    elemCtrProto = view.Element[protoProp],
                    objCtr = Object,
                    classListGetter = function () {
                        var $elem = $(this);

                        return {
                            add: function (classes) {
                                classes = Array.prototype.slice.call(arguments).join(" ");
                                return $elem.addClass(classes);
                            },
                            remove: function (classes) {
                                classes = Array.prototype.slice.call(arguments).join(" ");
                                return $elem.removeClass(classes);
                            },
                            toggle: function (classes, force) {
                                return $elem.toggleClass(classes, force);
                            },
                            contains: function (classes) {
                                return $elem.hasClass(classes);
                            },
                        };
                    };

                if (objCtr.defineProperty) {
                    var classListPropDesc = {
                        get: classListGetter,
                        enumerable: true,
                        configurable: true,
                    };
                    try {
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    } catch (ex) {
                        // IE 8 doesn't support enumerable:true
                        // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                        // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                        if (ex.number === undefined || ex.number === -0x7ff5ec54) {
                            classListPropDesc.enumerable = false;
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        }
                    }
                } else if (objCtr[protoProp].__defineGetter__) {
                    elemCtrProto.__defineGetter__(classListProp, classListGetter);
                }
            })(window);
        }

        var testElement = document.createElement("_");

        testElement.classList.add("c1", "c2");

        if (!testElement.classList.contains("c2")) {
            var _add = DOMTokenList.prototype.add,
                _remove = DOMTokenList.prototype.remove;

            DOMTokenList.prototype.add = function () {
                Array.prototype.forEach.call(arguments, _add.bind(this));
            };

            DOMTokenList.prototype.remove = function () {
                Array.prototype.forEach.call(arguments, _remove.bind(this));
            };
        }

        testElement.classList.toggle("c3", false);

        // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
        // support the second argument.
        if (testElement.classList.contains("c3")) {
            var _toggle = DOMTokenList.prototype.toggle;

            DOMTokenList.prototype.toggle = function (token, force) {
                if (1 in arguments && !this.contains(token) === !force) {
                    return force;
                } else {
                    return _toggle.call(this, token);
                }
            };
        }

        testElement = null;

        // shallow array comparison
        function isEqual(array1, array2) {
            return (
                array1.length === array2.length &&
                array1.every(function (element, index) {
                    return element === array2[index];
                })
            );
        }

        // <editor-fold desc="Shims">
        if (!String.prototype.startsWith) {
            (function () {
                "use strict"; // needed to support `apply`/`call` with `undefined`/`null`
                var defineProperty = (function () {
                    // IE 8 only supports `Object.defineProperty` on DOM elements
                    try {
                        var object = {};
                        var $defineProperty = Object.defineProperty;
                        var result = $defineProperty(object, object, object) && $defineProperty;
                    } catch (error) {}
                    return result;
                })();
                var toString = {}.toString;
                var startsWith = function (search) {
                    if (this == null) {
                        throw new TypeError();
                    }
                    var string = String(this);
                    if (search && toString.call(search) == "[object RegExp]") {
                        throw new TypeError();
                    }
                    var stringLength = string.length;
                    var searchString = String(search);
                    var searchLength = searchString.length;
                    var position = arguments.length > 1 ? arguments[1] : undefined;
                    // `ToInteger`
                    var pos = position ? Number(position) : 0;
                    if (pos != pos) {
                        // better `isNaN`
                        pos = 0;
                    }
                    var start = Math.min(Math.max(pos, 0), stringLength);
                    // Avoid the `indexOf` call if no match is possible
                    if (searchLength + start > stringLength) {
                        return false;
                    }
                    var index = -1;
                    while (++index < searchLength) {
                        if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                            return false;
                        }
                    }
                    return true;
                };
                if (defineProperty) {
                    defineProperty(String.prototype, "startsWith", {
                        value: startsWith,
                        configurable: true,
                        writable: true,
                    });
                } else {
                    String.prototype.startsWith = startsWith;
                }
            })();
        }

        if (!Object.keys) {
            Object.keys = function (
                o, // object
                k, // key
                r // result array
            ) {
                // initialize object and result
                r = [];
                // iterate over object keys
                for (k in o) {
                    // fill result array with non-prototypical keys
                    r.hasOwnProperty.call(o, k) && r.push(k);
                }
                // return result
                return r;
            };
        }

        if (HTMLSelectElement && !HTMLSelectElement.prototype.hasOwnProperty("selectedOptions")) {
            Object.defineProperty(HTMLSelectElement.prototype, "selectedOptions", {
                get: function () {
                    return this.querySelectorAll(":checked");
                },
            });
        }

        function getSelectedOptions(select, ignoreDisabled) {
            var selectedOptions = select.selectedOptions,
                options = [],
                opt;

            if (ignoreDisabled) {
                for (var i = 0, len = selectedOptions.length; i < len; i++) {
                    opt = selectedOptions[i];

                    if (!(opt.disabled || (opt.parentNode.tagName === "OPTGROUP" && opt.parentNode.disabled))) {
                        options.push(opt);
                    }
                }

                return options;
            }

            return selectedOptions;
        }

        // much faster than $.val()
        function getSelectValues(select, selectedOptions) {
            var value = [],
                options = selectedOptions || select.selectedOptions,
                opt;

            for (var i = 0, len = options.length; i < len; i++) {
                opt = options[i];

                if (!(opt.disabled || (opt.parentNode.tagName === "OPTGROUP" && opt.parentNode.disabled))) {
                    value.push(opt.value);
                }
            }

            if (!select.multiple) {
                return !value.length ? null : value[0];
            }

            return value;
        }

        // set data-selected on select element if the value has been programmatically selected
        // prior to initialization of bootstrap-select
        // * consider removing or replacing an alternative method *
        var valHooks = {
            useDefault: false,
            _set: $.valHooks.select.set,
        };

        $.valHooks.select.set = function (elem, value) {
            if (value && !valHooks.useDefault) $(elem).data("selected", true);

            return valHooks._set.apply(this, arguments);
        };

        var changedArguments = null;

        var EventIsSupported = (function () {
            try {
                new Event("change");
                return true;
            } catch (e) {
                return false;
            }
        })();

        $.fn.triggerNative = function (eventName) {
            var el = this[0],
                event;

            if (el.dispatchEvent) {
                // for modern browsers & IE9+
                if (EventIsSupported) {
                    // For modern browsers
                    event = new Event(eventName, {
                        bubbles: true,
                    });
                } else {
                    // For IE since it doesn't support Event constructor
                    event = document.createEvent("Event");
                    event.initEvent(eventName, true, false);
                }

                el.dispatchEvent(event);
            } else if (el.fireEvent) {
                // for IE8
                event = document.createEventObject();
                event.eventType = eventName;
                el.fireEvent("on" + eventName, event);
            } else {
                // fall back to jQuery.trigger
                this.trigger(eventName);
            }
        };
        // </editor-fold>

        function stringSearch(li, searchString, method, normalize) {
            var stringTypes = ["display", "subtext", "tokens"],
                searchSuccess = false;

            for (var i = 0; i < stringTypes.length; i++) {
                var stringType = stringTypes[i],
                    string = li[stringType];

                if (string) {
                    string = string.toString();

                    // Strip HTML tags. This isn't perfect, but it's much faster than any other method
                    if (stringType === "display") {
                        string = string.replace(/<[^>]+>/g, "");
                    }

                    if (normalize) string = normalizeToBase(string);
                    string = string.toUpperCase();

                    if (method === "contains") {
                        searchSuccess = string.indexOf(searchString) >= 0;
                    } else {
                        searchSuccess = string.startsWith(searchString);
                    }

                    if (searchSuccess) break;
                }
            }

            return searchSuccess;
        }

        function toInteger(value) {
            return parseInt(value, 10) || 0;
        }

        // Borrowed from Lodash (_.deburr)
        /** Used to map Latin Unicode letters to basic Latin letters. */
        var deburredLetters = {
            // Latin-1 Supplement block.
            "\xc0": "A",
            "\xc1": "A",
            "\xc2": "A",
            "\xc3": "A",
            "\xc4": "A",
            "\xc5": "A",
            "\xe0": "a",
            "\xe1": "a",
            "\xe2": "a",
            "\xe3": "a",
            "\xe4": "a",
            "\xe5": "a",
            "\xc7": "C",
            "\xe7": "c",
            "\xd0": "D",
            "\xf0": "d",
            "\xc8": "E",
            "\xc9": "E",
            "\xca": "E",
            "\xcb": "E",
            "\xe8": "e",
            "\xe9": "e",
            "\xea": "e",
            "\xeb": "e",
            "\xcc": "I",
            "\xcd": "I",
            "\xce": "I",
            "\xcf": "I",
            "\xec": "i",
            "\xed": "i",
            "\xee": "i",
            "\xef": "i",
            "\xd1": "N",
            "\xf1": "n",
            "\xd2": "O",
            "\xd3": "O",
            "\xd4": "O",
            "\xd5": "O",
            "\xd6": "O",
            "\xd8": "O",
            "\xf2": "o",
            "\xf3": "o",
            "\xf4": "o",
            "\xf5": "o",
            "\xf6": "o",
            "\xf8": "o",
            "\xd9": "U",
            "\xda": "U",
            "\xdb": "U",
            "\xdc": "U",
            "\xf9": "u",
            "\xfa": "u",
            "\xfb": "u",
            "\xfc": "u",
            "\xdd": "Y",
            "\xfd": "y",
            "\xff": "y",
            "\xc6": "Ae",
            "\xe6": "ae",
            "\xde": "Th",
            "\xfe": "th",
            "\xdf": "ss",
            // Latin Extended-A block.
            "\u0100": "A",
            "\u0102": "A",
            "\u0104": "A",
            "\u0101": "a",
            "\u0103": "a",
            "\u0105": "a",
            "\u0106": "C",
            "\u0108": "C",
            "\u010a": "C",
            "\u010c": "C",
            "\u0107": "c",
            "\u0109": "c",
            "\u010b": "c",
            "\u010d": "c",
            "\u010e": "D",
            "\u0110": "D",
            "\u010f": "d",
            "\u0111": "d",
            "\u0112": "E",
            "\u0114": "E",
            "\u0116": "E",
            "\u0118": "E",
            "\u011a": "E",
            "\u0113": "e",
            "\u0115": "e",
            "\u0117": "e",
            "\u0119": "e",
            "\u011b": "e",
            "\u011c": "G",
            "\u011e": "G",
            "\u0120": "G",
            "\u0122": "G",
            "\u011d": "g",
            "\u011f": "g",
            "\u0121": "g",
            "\u0123": "g",
            "\u0124": "H",
            "\u0126": "H",
            "\u0125": "h",
            "\u0127": "h",
            "\u0128": "I",
            "\u012a": "I",
            "\u012c": "I",
            "\u012e": "I",
            "\u0130": "I",
            "\u0129": "i",
            "\u012b": "i",
            "\u012d": "i",
            "\u012f": "i",
            "\u0131": "i",
            "\u0134": "J",
            "\u0135": "j",
            "\u0136": "K",
            "\u0137": "k",
            "\u0138": "k",
            "\u0139": "L",
            "\u013b": "L",
            "\u013d": "L",
            "\u013f": "L",
            "\u0141": "L",
            "\u013a": "l",
            "\u013c": "l",
            "\u013e": "l",
            "\u0140": "l",
            "\u0142": "l",
            "\u0143": "N",
            "\u0145": "N",
            "\u0147": "N",
            "\u014a": "N",
            "\u0144": "n",
            "\u0146": "n",
            "\u0148": "n",
            "\u014b": "n",
            "\u014c": "O",
            "\u014e": "O",
            "\u0150": "O",
            "\u014d": "o",
            "\u014f": "o",
            "\u0151": "o",
            "\u0154": "R",
            "\u0156": "R",
            "\u0158": "R",
            "\u0155": "r",
            "\u0157": "r",
            "\u0159": "r",
            "\u015a": "S",
            "\u015c": "S",
            "\u015e": "S",
            "\u0160": "S",
            "\u015b": "s",
            "\u015d": "s",
            "\u015f": "s",
            "\u0161": "s",
            "\u0162": "T",
            "\u0164": "T",
            "\u0166": "T",
            "\u0163": "t",
            "\u0165": "t",
            "\u0167": "t",
            "\u0168": "U",
            "\u016a": "U",
            "\u016c": "U",
            "\u016e": "U",
            "\u0170": "U",
            "\u0172": "U",
            "\u0169": "u",
            "\u016b": "u",
            "\u016d": "u",
            "\u016f": "u",
            "\u0171": "u",
            "\u0173": "u",
            "\u0174": "W",
            "\u0175": "w",
            "\u0176": "Y",
            "\u0177": "y",
            "\u0178": "Y",
            "\u0179": "Z",
            "\u017b": "Z",
            "\u017d": "Z",
            "\u017a": "z",
            "\u017c": "z",
            "\u017e": "z",
            "\u0132": "IJ",
            "\u0133": "ij",
            "\u0152": "Oe",
            "\u0153": "oe",
            "\u0149": "'n",
            "\u017f": "s",
        };

        /** Used to match Latin Unicode letters (excluding mathematical operators). */
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

        /** Used to compose unicode character classes. */
        var rsComboMarksRange = "\\u0300-\\u036f",
            reComboHalfMarksRange = "\\ufe20-\\ufe2f",
            rsComboSymbolsRange = "\\u20d0-\\u20ff",
            rsComboMarksExtendedRange = "\\u1ab0-\\u1aff",
            rsComboMarksSupplementRange = "\\u1dc0-\\u1dff",
            rsComboRange =
                rsComboMarksRange +
                reComboHalfMarksRange +
                rsComboSymbolsRange +
                rsComboMarksExtendedRange +
                rsComboMarksSupplementRange;

        /** Used to compose unicode capture groups. */
        var rsCombo = "[" + rsComboRange + "]";

        /**
         * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
         * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
         */
        var reComboMark = RegExp(rsCombo, "g");

        function deburrLetter(key) {
            return deburredLetters[key];
        }

        function normalizeToBase(string) {
            string = string.toString();
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }

        // List of HTML entities for escaping.
        var escapeMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
        };

        // Functions for escaping and unescaping strings to/from HTML interpolation.
        var createEscaper = function (map) {
            var escaper = function (match) {
                return map[match];
            };
            // Regexes for identifying a key that needs to be escaped.
            var source = "(?:" + Object.keys(map).join("|") + ")";
            var testRegexp = RegExp(source);
            var replaceRegexp = RegExp(source, "g");
            return function (string) {
                string = string == null ? "" : "" + string;
                return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
            };
        };

        var htmlEscape = createEscaper(escapeMap);

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var keyCodeMap = {
            32: " ",
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            59: ";",
            65: "A",
            66: "B",
            67: "C",
            68: "D",
            69: "E",
            70: "F",
            71: "G",
            72: "H",
            73: "I",
            74: "J",
            75: "K",
            76: "L",
            77: "M",
            78: "N",
            79: "O",
            80: "P",
            81: "Q",
            82: "R",
            83: "S",
            84: "T",
            85: "U",
            86: "V",
            87: "W",
            88: "X",
            89: "Y",
            90: "Z",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
        };

        var keyCodes = {
            ESCAPE: 27, // KeyboardEvent.which value for Escape (Esc) key
            ENTER: 13, // KeyboardEvent.which value for Enter key
            SPACE: 32, // KeyboardEvent.which value for space key
            TAB: 9, // KeyboardEvent.which value for tab key
            ARROW_UP: 38, // KeyboardEvent.which value for up arrow key
            ARROW_DOWN: 40, // KeyboardEvent.which value for down arrow key
        };

        var version = {
            success: true,
            major: "4",
        };

        try {
            version.full = ($.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split(".");
            version.major = version.full[0];
            version.success = true;
        } catch (err) {
            // do nothing
        }

        var selectId = 0;

        var EVENT_KEY = ".bs.select";

        var classNames = {
            DISABLED: "disabled",
            DIVIDER: "divider",
            SHOW: "open",
            DROPUP: "dropup",
            MENU: "dropdown-menu",
            MENUINNER: "dropdown-menu_inner",
            MENURIGHT: "dropdown-menu-right",
            MENULEFT: "dropdown-menu-left",
            // to-do: replace with more advanced template/customization options
            BUTTONCLASS: "btn-default",
            POPOVERHEADER: "popover-title",
            ICONBASE: "glyphicon",
            TICKICON: "glyphicon-ok",
        };

        var Selector = {
            MENU: "." + classNames.MENU,
        };

        var elementTemplates = {
            div: document.createElement("div"),
            span: document.createElement("span"),
            i: document.createElement("i"),
            subtext: document.createElement("small"),
            a: document.createElement("a"),
            li: document.createElement("li"),
            whitespace: document.createTextNode("\u00A0"),
            fragment: document.createDocumentFragment(),
        };

        elementTemplates.noResults = elementTemplates.li.cloneNode(false);
        elementTemplates.noResults.className = "no-results";

        elementTemplates.a.setAttribute("role", "option");
        elementTemplates.a.className = "dropdown-item";

        elementTemplates.subtext.className = "text-muted";

        elementTemplates.text = elementTemplates.span.cloneNode(false);
        elementTemplates.text.className = "text";

        elementTemplates.checkMark = elementTemplates.span.cloneNode(false);

        var REGEXP_ARROW = new RegExp(keyCodes.ARROW_UP + "|" + keyCodes.ARROW_DOWN);
        var REGEXP_TAB_OR_ESCAPE = new RegExp("^" + keyCodes.TAB + "$|" + keyCodes.ESCAPE);

        var generateOption = {
            li: function (content, classes, optgroup) {
                var li = elementTemplates.li.cloneNode(false);

                if (content) {
                    if (content.nodeType === 1 || content.nodeType === 11) {
                        li.appendChild(content);
                    } else {
                        li.innerHTML = content;
                    }
                }

                if (typeof classes !== "undefined" && classes !== "") li.className = classes;
                if (typeof optgroup !== "undefined" && optgroup !== null) li.classList.add("optgroup-" + optgroup);

                return li;
            },

            a: function (text, classes, inline) {
                var a = elementTemplates.a.cloneNode(true);

                if (text) {
                    if (text.nodeType === 11) {
                        a.appendChild(text);
                    } else {
                        a.insertAdjacentHTML("beforeend", text);
                    }
                }

                if (typeof classes !== "undefined" && classes !== "")
                    a.classList.add.apply(a.classList, classes.split(/\s+/));
                if (inline) a.setAttribute("style", inline);

                return a;
            },

            text: function (options, useFragment) {
                var textElement = elementTemplates.text.cloneNode(false),
                    subtextElement,
                    iconElement;

                if (options.content) {
                    textElement.innerHTML = options.content;
                } else {
                    textElement.textContent = options.text;

                    if (options.icon) {
                        var whitespace = elementTemplates.whitespace.cloneNode(false);

                        // need to use <i> for icons in the button to prevent a breaking change
                        // note: switch to span in next major release
                        iconElement = (useFragment === true ? elementTemplates.i : elementTemplates.span).cloneNode(
                            false
                        );
                        iconElement.className = this.options.iconBase + " " + options.icon;

                        elementTemplates.fragment.appendChild(iconElement);
                        elementTemplates.fragment.appendChild(whitespace);
                    }

                    if (options.subtext) {
                        subtextElement = elementTemplates.subtext.cloneNode(false);
                        subtextElement.textContent = options.subtext;
                        textElement.appendChild(subtextElement);
                    }
                }

                if (useFragment === true) {
                    while (textElement.childNodes.length > 0) {
                        elementTemplates.fragment.appendChild(textElement.childNodes[0]);
                    }
                } else {
                    elementTemplates.fragment.appendChild(textElement);
                }

                return elementTemplates.fragment;
            },

            label: function (options) {
                var textElement = elementTemplates.text.cloneNode(false),
                    subtextElement,
                    iconElement;

                textElement.innerHTML = options.display;

                if (options.icon) {
                    var whitespace = elementTemplates.whitespace.cloneNode(false);

                    iconElement = elementTemplates.span.cloneNode(false);
                    iconElement.className = this.options.iconBase + " " + options.icon;

                    elementTemplates.fragment.appendChild(iconElement);
                    elementTemplates.fragment.appendChild(whitespace);
                }

                if (options.subtext) {
                    subtextElement = elementTemplates.subtext.cloneNode(false);
                    subtextElement.textContent = options.subtext;
                    textElement.appendChild(subtextElement);
                }

                elementTemplates.fragment.appendChild(textElement);

                return elementTemplates.fragment;
            },
        };

        function showNoResults(searchMatch, searchValue) {
            if (!searchMatch.length) {
                elementTemplates.noResults.innerHTML = this.options.noneResultsText.replace(
                    "{0}",
                    '"' + htmlEscape(searchValue) + '"'
                );
                this.$menuInner[0].firstChild.appendChild(elementTemplates.noResults);
            }
        }

        var Selectpicker = function (element, options) {
            var that = this;

            // bootstrap-select has been initialized - revert valHooks.select.set back to its original function
            if (!valHooks.useDefault) {
                $.valHooks.select.set = valHooks._set;
                valHooks.useDefault = true;
            }

            this.$element = $(element);
            this.$newElement = null;
            this.$button = null;
            this.$menu = null;
            this.options = options;
            this.selectpicker = {
                main: {},
                search: {},
                current: {}, // current changes if a search is in progress
                view: {},
                isSearching: false,
                keydown: {
                    keyHistory: "",
                    resetKeyHistory: {
                        start: function () {
                            return setTimeout(function () {
                                that.selectpicker.keydown.keyHistory = "";
                            }, 800);
                        },
                    },
                },
            };

            this.sizeInfo = {};

            // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
            // data-attribute)
            if (this.options.title === null) {
                this.options.title = this.$element.attr("title");
            }

            // Format window padding
            var winPad = this.options.windowPadding;
            if (typeof winPad === "number") {
                this.options.windowPadding = [winPad, winPad, winPad, winPad];
            }

            // Expose public methods
            this.val = Selectpicker.prototype.val;
            this.render = Selectpicker.prototype.render;
            this.refresh = Selectpicker.prototype.refresh;
            this.setStyle = Selectpicker.prototype.setStyle;
            this.selectAll = Selectpicker.prototype.selectAll;
            this.deselectAll = Selectpicker.prototype.deselectAll;
            this.destroy = Selectpicker.prototype.destroy;
            this.remove = Selectpicker.prototype.remove;
            this.show = Selectpicker.prototype.show;
            this.hide = Selectpicker.prototype.hide;

            this.init();
        };

        Selectpicker.VERSION = "1.13.18";

        // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
        Selectpicker.DEFAULTS = {
            noneSelectedText: "Nothing selected",
            noneResultsText: "No results matched {0}",
            countSelectedText: function (numSelected, numTotal) {
                return numSelected == 1 ? "{0} item selected" : "{0} items selected";
            },
            maxOptionsText: function (numAll, numGroup) {
                return [
                    numAll == 1 ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)",
                    numGroup == 1 ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)",
                ];
            },
            selectAllText: "Select All",
            deselectAllText: "Deselect All",
            doneButton: false,
            doneButtonText: "Close",
            multipleSeparator: ", ",
            styleBase: "btn",
            style: classNames.BUTTONCLASS,
            size: "auto",
            title: null,
            selectedTextFormat: "values",
            width: false,
            container: false,
            hideDisabled: false,
            showSubtext: false,
            showIcon: true,
            showContent: true,
            dropupAuto: true,
            header: false,
            liveSearch: false,
            liveSearchPlaceholder: null,
            liveSearchNormalize: false,
            liveSearchStyle: "contains",
            actionsBox: false,
            iconBase: classNames.ICONBASE,
            tickIcon: classNames.TICKICON,
            showTick: false,
            template: {
                caret: '<span class="caret"></span>',
            },
            maxOptions: false,
            mobile: false,
            selectOnTab: false,
            dropdownAlignRight: false,
            windowPadding: 0,
            virtualScroll: 600,
            display: false,
            sanitize: true,
            sanitizeFn: null,
            whiteList: DefaultWhitelist,
        };

        Selectpicker.prototype = {
            constructor: Selectpicker,

            init: function () {
                var that = this,
                    id = this.$element.attr("id"),
                    element = this.$element[0],
                    form = element.form;

                selectId++;
                this.selectId = "bs-select-" + selectId;

                element.classList.add("bs-select-hidden");

                this.multiple = this.$element.prop("multiple");
                this.autofocus = this.$element.prop("autofocus");

                if (element.classList.contains("show-tick")) {
                    this.options.showTick = true;
                }

                this.$newElement = this.createDropdown();
                this.buildData();
                this.$element.after(this.$newElement).prependTo(this.$newElement);

                // ensure select is associated with form element if it got unlinked after moving it inside newElement
                if (form && element.form === null) {
                    if (!form.id) form.id = "form-" + this.selectId;
                    element.setAttribute("form", form.id);
                }

                this.$button = this.$newElement.children("button");
                this.$menu = this.$newElement.children(Selector.MENU);
                this.$menuInner = this.$menu.children(".inner");
                this.$searchbox = this.$menu.find("input");

                element.classList.remove("bs-select-hidden");

                if (this.options.dropdownAlignRight === true) this.$menu[0].classList.add(classNames.MENURIGHT);

                if (typeof id !== "undefined") {
                    this.$button.attr("data-id", id);
                }

                this.checkDisabled();
                this.clickListener();

                if (this.options.liveSearch) {
                    this.liveSearchListener();
                    this.focusedParent = this.$searchbox[0];
                } else {
                    this.focusedParent = this.$menuInner[0];
                }

                this.setStyle();
                this.render();
                this.setWidth();
                if (this.options.container) {
                    this.selectPosition();
                } else {
                    this.$element.on("hide" + EVENT_KEY, function () {
                        if (that.isVirtual()) {
                            // empty menu on close
                            var menuInner = that.$menuInner[0],
                                emptyMenu = menuInner.firstChild.cloneNode(false);

                            // replace the existing UL with an empty one - this is faster than $.empty() or innerHTML = ''
                            menuInner.replaceChild(emptyMenu, menuInner.firstChild);
                            menuInner.scrollTop = 0;
                        }
                    });
                }
                this.$menu.data("this", this);
                this.$newElement.data("this", this);
                if (this.options.mobile) this.mobile();

                this.$newElement.on({
                    "hide.bs.dropdown": function (e) {
                        that.$element.trigger("hide" + EVENT_KEY, e);
                    },
                    "hidden.bs.dropdown": function (e) {
                        that.$element.trigger("hidden" + EVENT_KEY, e);
                    },
                    "show.bs.dropdown": function (e) {
                        that.$element.trigger("show" + EVENT_KEY, e);
                    },
                    "shown.bs.dropdown": function (e) {
                        that.$element.trigger("shown" + EVENT_KEY, e);
                    },
                });

                if (element.hasAttribute("required")) {
                    this.$element.on("invalid" + EVENT_KEY, function () {
                        that.$button[0].classList.add("bs-invalid");

                        that.$element
                            .on("shown" + EVENT_KEY + ".invalid", function () {
                                that.$element
                                    .val(that.$element.val()) // set the value to hide the validation message in Chrome when menu is opened
                                    .off("shown" + EVENT_KEY + ".invalid");
                            })
                            .on("rendered" + EVENT_KEY, function () {
                                // if select is no longer invalid, remove the bs-invalid class
                                if (this.validity.valid) that.$button[0].classList.remove("bs-invalid");
                                that.$element.off("rendered" + EVENT_KEY);
                            });

                        that.$button.on("blur" + EVENT_KEY, function () {
                            that.$element.trigger("focus").trigger("blur");
                            that.$button.off("blur" + EVENT_KEY);
                        });
                    });
                }

                setTimeout(function () {
                    that.buildList();
                    that.$element.trigger("loaded" + EVENT_KEY);
                });
            },

            createDropdown: function () {
                // Options
                // If we are multiple or showTick option is set, then add the show-tick class
                var showTick = this.multiple || this.options.showTick ? " show-tick" : "",
                    multiselectable = this.multiple ? ' aria-multiselectable="true"' : "",
                    inputGroup = "",
                    autofocus = this.autofocus ? " autofocus" : "";

                if (version.major < 4 && this.$element.parent().hasClass("input-group")) {
                    inputGroup = " input-group-btn";
                }

                // Elements
                var drop,
                    header = "",
                    searchbox = "",
                    actionsbox = "",
                    donebutton = "";

                if (this.options.header) {
                    header =
                        '<div class="' +
                        classNames.POPOVERHEADER +
                        '">' +
                        '<button type="button" class="close button button_plain button_icon dropdown-menu__close" aria-hidden="true"><svg class="icon button__icon dropdown-menu__close-icon"><use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use></svg></button>' +
                        this.options.header +
                        "</div>";
                }

                if (this.options.liveSearch) {
                    searchbox =
                        '<div class="bs-searchbox">' +
                        '<input type="text" name="' +
                        this.selectId +
                        '" class="bs-searchbox__input" autocomplete="off"' +
                        (this.options.liveSearchPlaceholder === null
                            ? ""
                            : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') +
                        ' role="combobox" aria-label="Search" aria-controls="' +
                        this.selectId +
                        '" aria-autocomplete="list">' +
                        '<button class="button button_plain button_icon bs-searchbox__button bs-searchbox__button_show" type="button"> ' +
                        '<svg class="icon button__icon">' +
                        '<use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use>' +
                        "</svg>" +
                        "</button>" +
                        "</div>";
                }

                if (this.multiple && this.options.actionsBox) {
                    actionsbox =
                        '<div class="bs-actionsbox">' +
                        '<div class="group-container group-container_wide">' +
                        '<button type="button" class="group-container__item actions-btn bs-select-all button button_plain">' +
                        this.options.selectAllText +
                        "</button>" +
                        '<button type="button" class="group-container__item actions-btn bs-deselect-all button button_plain">' +
                        this.options.deselectAllText +
                        "</button>" +
                        "</div>" +
                        "</div>";
                }

                if (this.multiple && this.options.doneButton) {
                    donebutton =
                        '<div class="bs-donebutton">' +
                        '<div class="btn-group btn-block">' +
                        '<button type="button" class="btn btn-sm ' +
                        classNames.BUTTONCLASS +
                        '">' +
                        this.options.doneButtonText +
                        "</button>" +
                        "</div>" +
                        "</div>";
                }

                drop =
                    '<div class="dropdown bootstrap-select' +
                    showTick +
                    inputGroup +
                    '">' +
                    '<button type="button" tabindex="-1" class="' +
                    this.options.styleBase +
                    ' dropdown-toggle" ' +
                    (this.options.display === "static" ? 'data-display="static"' : "") +
                    'data-toggle="dropdown"' +
                    autofocus +
                    ' role="combobox" aria-owns="' +
                    this.selectId +
                    '" aria-haspopup="listbox" aria-expanded="false">' +
                    '<div class="filter-option">' +
                    '<div class="filter-option-inner">' +
                    '<div class="filter-option-inner-inner"></div>' +
                    "</div> " +
                    "</div>" +
                    (version.major === "4" ? "" : '<span class="bs-caret">' + this.options.template.caret + "</span>") +
                    "</button>" +
                    '<div class="' +
                    classNames.MENU +
                    " " +
                    (version.major === "4" ? "" : classNames.SHOW) +
                    '">' +
                    header +
                    searchbox +
                    actionsbox +
                    '<div class="inner ' +
                    classNames.SHOW +
                    '" role="listbox" id="' +
                    this.selectId +
                    '" tabindex="-1" ' +
                    multiselectable +
                    ">" +
                    '<ul class="' +
                    classNames.MENU +
                    " " +
                    classNames.MENUINNER +
                    " inner " +
                    (version.major === "4" ? classNames.SHOW : "") +
                    '" role="presentation">' +
                    "</ul>" +
                    "</div>" +
                    donebutton +
                    "</div>" +
                    "</div>";

                return $(drop);
            },

            setPositionData: function () {
                this.selectpicker.view.canHighlight = [];
                this.selectpicker.view.size = 0;
                this.selectpicker.view.firstHighlightIndex = false;

                for (var i = 0; i < this.selectpicker.current.data.length; i++) {
                    var li = this.selectpicker.current.data[i],
                        canHighlight = true;

                    if (li.type === "divider") {
                        canHighlight = false;
                        li.height = this.sizeInfo.dividerHeight;
                    } else if (li.type === "optgroup-label") {
                        canHighlight = false;
                        li.height = this.sizeInfo.dropdownHeaderHeight;
                    } else {
                        li.height = this.sizeInfo.liHeight;
                    }

                    if (li.disabled) canHighlight = false;

                    this.selectpicker.view.canHighlight.push(canHighlight);

                    if (canHighlight) {
                        this.selectpicker.view.size++;
                        li.posinset = this.selectpicker.view.size;
                        if (this.selectpicker.view.firstHighlightIndex === false)
                            this.selectpicker.view.firstHighlightIndex = i;
                    }

                    li.position = (i === 0 ? 0 : this.selectpicker.current.data[i - 1].position) + li.height;
                }
            },

            isVirtual: function () {
                return (
                    (this.options.virtualScroll !== false &&
                        this.selectpicker.main.elements.length >= this.options.virtualScroll) ||
                    this.options.virtualScroll === true
                );
            },

            createView: function (isSearching, setSize, refresh) {
                var that = this,
                    scrollTop = 0,
                    active = [],
                    selected,
                    prevActive;

                this.selectpicker.isSearching = isSearching;
                this.selectpicker.current = isSearching ? this.selectpicker.search : this.selectpicker.main;

                this.setPositionData();

                if (setSize) {
                    if (refresh) {
                        scrollTop = this.$menuInner[0].scrollTop;
                    } else if (!that.multiple) {
                        var element = that.$element[0],
                            selectedIndex = (element.options[element.selectedIndex] || {}).liIndex;

                        if (typeof selectedIndex === "number" && that.options.size !== false) {
                            var selectedData = that.selectpicker.main.data[selectedIndex],
                                position = selectedData && selectedData.position;

                            if (position) {
                                scrollTop = position - (that.sizeInfo.menuInnerHeight + that.sizeInfo.liHeight) / 2;
                            }
                        }
                    }
                }

                scroll(scrollTop, true);

                this.$menuInner.off("scroll.createView").on("scroll.createView", function (e, updateValue) {
                    if (!that.noScroll) scroll(this.scrollTop, updateValue);
                    that.noScroll = false;
                });

                function scroll(scrollTop, init) {
                    var size = that.selectpicker.current.elements.length,
                        chunks = [],
                        chunkSize,
                        chunkCount,
                        firstChunk,
                        lastChunk,
                        currentChunk,
                        prevPositions,
                        positionIsDifferent,
                        previousElements,
                        menuIsDifferent = true,
                        isVirtual = that.isVirtual();

                    that.selectpicker.view.scrollTop = scrollTop;

                    chunkSize = Math.ceil((that.sizeInfo.menuInnerHeight / that.sizeInfo.liHeight) * 1.5); // number of options in a chunk
                    chunkCount = Math.round(size / chunkSize) || 1; // number of chunks

                    for (var i = 0; i < chunkCount; i++) {
                        var endOfChunk = (i + 1) * chunkSize;

                        if (i === chunkCount - 1) {
                            endOfChunk = size;
                        }

                        chunks[i] = [i * chunkSize + (!i ? 0 : 1), endOfChunk];

                        if (!size) break;

                        if (
                            currentChunk === undefined &&
                            scrollTop - 1 <=
                                that.selectpicker.current.data[endOfChunk - 1].position - that.sizeInfo.menuInnerHeight
                        ) {
                            currentChunk = i;
                        }
                    }

                    if (currentChunk === undefined) currentChunk = 0;

                    prevPositions = [that.selectpicker.view.position0, that.selectpicker.view.position1];

                    // always display previous, current, and next chunks
                    firstChunk = Math.max(0, currentChunk - 1);
                    lastChunk = Math.min(chunkCount - 1, currentChunk + 1);

                    that.selectpicker.view.position0 =
                        isVirtual === false ? 0 : Math.max(0, chunks[firstChunk][0]) || 0;
                    that.selectpicker.view.position1 =
                        isVirtual === false ? size : Math.min(size, chunks[lastChunk][1]) || 0;

                    positionIsDifferent =
                        prevPositions[0] !== that.selectpicker.view.position0 ||
                        prevPositions[1] !== that.selectpicker.view.position1;

                    if (that.activeIndex !== undefined) {
                        prevActive = that.selectpicker.main.elements[that.prevActiveIndex];
                        active = that.selectpicker.main.elements[that.activeIndex];
                        selected = that.selectpicker.main.elements[that.selectedIndex];

                        if (init) {
                            if (that.activeIndex !== that.selectedIndex) {
                                that.defocusItem(active);
                            }
                            that.activeIndex = undefined;
                        }

                        if (that.activeIndex && that.activeIndex !== that.selectedIndex) {
                            that.defocusItem(selected);
                        }
                    }

                    if (
                        that.prevActiveIndex !== undefined &&
                        that.prevActiveIndex !== that.activeIndex &&
                        that.prevActiveIndex !== that.selectedIndex
                    ) {
                        that.defocusItem(prevActive);
                    }

                    if (init || positionIsDifferent) {
                        previousElements = that.selectpicker.view.visibleElements
                            ? that.selectpicker.view.visibleElements.slice()
                            : [];

                        if (isVirtual === false) {
                            that.selectpicker.view.visibleElements = that.selectpicker.current.elements;
                        } else {
                            that.selectpicker.view.visibleElements = that.selectpicker.current.elements.slice(
                                that.selectpicker.view.position0,
                                that.selectpicker.view.position1
                            );
                        }

                        that.setOptionStatus();

                        // if searching, check to make sure the list has actually been updated before updating DOM
                        // this prevents unnecessary repaints
                        if (isSearching || (isVirtual === false && init))
                            menuIsDifferent = !isEqual(previousElements, that.selectpicker.view.visibleElements);

                        // if virtual scroll is disabled and not searching,
                        // menu should never need to be updated more than once
                        if ((init || isVirtual === true) && menuIsDifferent) {
                            var menuInner = that.$menuInner[0],
                                menuFragment = document.createDocumentFragment(),
                                emptyMenu = menuInner.firstChild.cloneNode(false),
                                marginTop,
                                marginBottom,
                                elements = that.selectpicker.view.visibleElements,
                                toSanitize = [];

                            // replace the existing UL with an empty one - this is faster than $.empty()
                            menuInner.replaceChild(emptyMenu, menuInner.firstChild);

                            for (var i = 0, visibleElementsLen = elements.length; i < visibleElementsLen; i++) {
                                var element = elements[i],
                                    elText,
                                    elementData;

                                if (that.options.sanitize) {
                                    elText = element.lastChild;

                                    if (elText) {
                                        elementData =
                                            that.selectpicker.current.data[i + that.selectpicker.view.position0];

                                        if (elementData && elementData.content && !elementData.sanitized) {
                                            toSanitize.push(elText);
                                            elementData.sanitized = true;
                                        }
                                    }
                                }

                                menuFragment.appendChild(element);
                            }

                            if (that.options.sanitize && toSanitize.length) {
                                sanitizeHtml(toSanitize, that.options.whiteList, that.options.sanitizeFn);
                            }

                            if (isVirtual === true) {
                                marginTop =
                                    that.selectpicker.view.position0 === 0
                                        ? 0
                                        : that.selectpicker.current.data[that.selectpicker.view.position0 - 1].position;
                                marginBottom =
                                    that.selectpicker.view.position1 > size - 1
                                        ? 0
                                        : that.selectpicker.current.data[size - 1].position -
                                          that.selectpicker.current.data[that.selectpicker.view.position1 - 1].position;

                                menuInner.firstChild.style.marginTop = marginTop + "px";
                                menuInner.firstChild.style.marginBottom = marginBottom + "px";
                            } else {
                                menuInner.firstChild.style.marginTop = 0;
                                menuInner.firstChild.style.marginBottom = 0;
                            }

                            menuInner.firstChild.appendChild(menuFragment);

                            // if an option is encountered that is wider than the current menu width, update the menu width accordingly
                            // switch to ResizeObserver with increased browser support
                            if (isVirtual === true && that.sizeInfo.hasScrollBar) {
                                var menuInnerInnerWidth = menuInner.firstChild.offsetWidth;

                                if (
                                    init &&
                                    menuInnerInnerWidth < that.sizeInfo.menuInnerInnerWidth &&
                                    that.sizeInfo.totalMenuWidth > that.sizeInfo.selectWidth
                                ) {
                                    menuInner.firstChild.style.minWidth = that.sizeInfo.menuInnerInnerWidth + "px";
                                } else if (menuInnerInnerWidth > that.sizeInfo.menuInnerInnerWidth) {
                                    // set to 0 to get actual width of menu
                                    that.$menu[0].style.minWidth = 0;

                                    var actualMenuWidth = menuInner.firstChild.offsetWidth;

                                    if (actualMenuWidth > that.sizeInfo.menuInnerInnerWidth) {
                                        that.sizeInfo.menuInnerInnerWidth = actualMenuWidth;
                                        menuInner.firstChild.style.minWidth = that.sizeInfo.menuInnerInnerWidth + "px";
                                    }

                                    // reset to default CSS styling
                                    that.$menu[0].style.minWidth = "";
                                }
                            }
                        }
                    }

                    that.prevActiveIndex = that.activeIndex;

                    if (!that.options.liveSearch) {
                        that.$menuInner.trigger("focus");
                    } else if (isSearching && init) {
                        var index = 0,
                            newActive;

                        if (!that.selectpicker.view.canHighlight[index]) {
                            index = 1 + that.selectpicker.view.canHighlight.slice(1).indexOf(true);
                        }

                        newActive = that.selectpicker.view.visibleElements[index];

                        that.defocusItem(that.selectpicker.view.currentActive);

                        that.activeIndex = (that.selectpicker.current.data[index] || {}).index;

                        that.focusItem(newActive);
                    }
                }

                $(window)
                    .off("resize" + EVENT_KEY + "." + this.selectId + ".createView")
                    .on("resize" + EVENT_KEY + "." + this.selectId + ".createView", function () {
                        var isActive = that.$newElement.hasClass(classNames.SHOW);

                        if (isActive) scroll(that.$menuInner[0].scrollTop);
                    });
            },

            focusItem: function (li, liData, noStyle) {
                if (li) {
                    liData = liData || this.selectpicker.main.data[this.activeIndex];
                    var a = li.firstChild;

                    if (a) {
                        a.setAttribute("aria-setsize", this.selectpicker.view.size);
                        a.setAttribute("aria-posinset", liData.posinset);

                        if (noStyle !== true) {
                            this.focusedParent.setAttribute("aria-activedescendant", a.id);
                            li.classList.add("active");
                            a.classList.add("active");
                        }
                    }
                }
            },

            defocusItem: function (li) {
                if (li) {
                    li.classList.remove("active");
                    if (li.firstChild) li.firstChild.classList.remove("active");
                }
            },

            setPlaceholder: function () {
                var that = this,
                    updateIndex = false;

                if (this.options.title && !this.multiple) {
                    if (!this.selectpicker.view.titleOption)
                        this.selectpicker.view.titleOption = document.createElement("option");

                    // this option doesn't create a new <li> element, but does add a new option at the start,
                    // so startIndex should increase to prevent having to check every option for the bs-title-option class
                    updateIndex = true;

                    var element = this.$element[0],
                        selectTitleOption = false,
                        titleNotAppended = !this.selectpicker.view.titleOption.parentNode,
                        selectedIndex = element.selectedIndex,
                        selectedOption = element.options[selectedIndex],
                        navigation = window.performance && window.performance.getEntriesByType("navigation"),
                        // Safari doesn't support getEntriesByType('navigation') - fall back to performance.navigation
                        isNotBackForward =
                            navigation && navigation.length
                                ? navigation[0].type !== "back_forward"
                                : window.performance.navigation.type !== 2;

                    if (titleNotAppended) {
                        // Use native JS to prepend option (faster)
                        this.selectpicker.view.titleOption.className = "bs-title-option";
                        this.selectpicker.view.titleOption.value = "";

                        // Check if selected or data-selected attribute is already set on an option. If not, select the titleOption option.
                        // the selected item may have been changed by user or programmatically before the bootstrap select plugin runs,
                        // if so, the select will have the data-selected attribute
                        selectTitleOption =
                            !selectedOption ||
                            (selectedIndex === 0 &&
                                selectedOption.defaultSelected === false &&
                                this.$element.data("selected") === undefined);
                    }

                    if (titleNotAppended || this.selectpicker.view.titleOption.index !== 0) {
                        element.insertBefore(this.selectpicker.view.titleOption, element.firstChild);
                    }

                    // Set selected *after* appending to select,
                    // otherwise the option doesn't get selected in IE
                    // set using selectedIndex, as setting the selected attr to true here doesn't work in IE11
                    if (selectTitleOption && isNotBackForward) {
                        element.selectedIndex = 0;
                    } else if (document.readyState !== "complete") {
                        // if navigation type is back_forward, there's a chance the select will have its value set by BFCache
                        // wait for that value to be set, then run render again
                        window.addEventListener("pageshow", function () {
                            if (that.selectpicker.view.displayedValue !== element.value) that.render();
                        });
                    }
                }

                return updateIndex;
            },

            buildData: function () {
                var optionSelector = ':not([hidden]):not([data-hidden="true"])',
                    mainData = [],
                    optID = 0,
                    startIndex = this.setPlaceholder() ? 1 : 0; // append the titleOption if necessary and skip the first option in the loop

                if (this.options.hideDisabled) optionSelector += ":not(:disabled)";

                var selectOptions = this.$element[0].querySelectorAll("select > *" + optionSelector);

                function addDivider(config) {
                    var previousData = mainData[mainData.length - 1];

                    // ensure optgroup doesn't create back-to-back dividers
                    if (previousData && previousData.type === "divider" && (previousData.optID || config.optID)) {
                        return;
                    }

                    config = config || {};
                    config.type = "divider";

                    mainData.push(config);
                }

                function addOption(option, config) {
                    config = config || {};

                    config.divider = option.getAttribute("data-divider") === "true";

                    if (config.divider) {
                        addDivider({
                            optID: config.optID,
                        });
                    } else {
                        var liIndex = mainData.length,
                            cssText = option.style.cssText,
                            inlineStyle = cssText ? htmlEscape(cssText) : "",
                            optionClass = (option.className || "") + (config.optgroupClass || "");

                        if (config.optID) optionClass = "opt " + optionClass;

                        config.optionClass = optionClass.trim();
                        config.inlineStyle = inlineStyle;
                        config.text = option.textContent;

                        config.content = option.getAttribute("data-content");
                        config.tokens = option.getAttribute("data-tokens");
                        config.subtext = option.getAttribute("data-subtext");
                        config.icon = option.getAttribute("data-icon");

                        option.liIndex = liIndex;

                        config.display = config.content || config.text;
                        config.type = "option";
                        config.index = liIndex;
                        config.option = option;
                        config.selected = !!option.selected;
                        config.disabled = config.disabled || !!option.disabled;

                        mainData.push(config);
                    }
                }

                function addOptgroup(index, selectOptions) {
                    var optgroup = selectOptions[index],
                        // skip placeholder option
                        previous = index - 1 < startIndex ? false : selectOptions[index - 1],
                        next = selectOptions[index + 1],
                        options = optgroup.querySelectorAll("option" + optionSelector);

                    if (!options.length) return;

                    var config = {
                            display: htmlEscape(optgroup.label),
                            subtext: optgroup.getAttribute("data-subtext"),
                            icon: optgroup.getAttribute("data-icon"),
                            type: "optgroup-label",
                            optgroupClass: " " + (optgroup.className || ""),
                        },
                        headerIndex,
                        lastIndex;

                    optID++;

                    if (previous) {
                        addDivider({ optID: optID });
                    }

                    config.optID = optID;

                    mainData.push(config);

                    for (var j = 0, len = options.length; j < len; j++) {
                        var option = options[j];

                        if (j === 0) {
                            headerIndex = mainData.length - 1;
                            lastIndex = headerIndex + len;
                        }

                        addOption(option, {
                            headerIndex: headerIndex,
                            lastIndex: lastIndex,
                            optID: config.optID,
                            optgroupClass: config.optgroupClass,
                            disabled: optgroup.disabled,
                        });
                    }

                    if (next) {
                        addDivider({ optID: optID });
                    }
                }

                for (var len = selectOptions.length, i = startIndex; i < len; i++) {
                    var item = selectOptions[i];

                    if (item.tagName !== "OPTGROUP") {
                        addOption(item, {});
                    } else {
                        addOptgroup(i, selectOptions);
                    }
                }

                this.selectpicker.main.data = this.selectpicker.current.data = mainData;
            },

            buildList: function () {
                var that = this,
                    selectData = this.selectpicker.main.data,
                    mainElements = [],
                    widestOptionLength = 0;

                if ((that.options.showTick || that.multiple) && !elementTemplates.checkMark.parentNode) {
                    elementTemplates.checkMark.className =
                        this.options.iconBase + " " + that.options.tickIcon + " check-mark";
                    elementTemplates.a.appendChild(elementTemplates.checkMark);
                }

                function buildElement(item) {
                    var liElement,
                        combinedLength = 0;

                    switch (item.type) {
                        case "divider":
                            liElement = generateOption.li(
                                false,
                                classNames.DIVIDER,
                                item.optID ? item.optID + "div" : undefined
                            );

                            break;

                        case "option":
                            liElement = generateOption.li(
                                generateOption.a(
                                    generateOption.text.call(that, item),
                                    item.optionClass,
                                    item.inlineStyle
                                ),
                                "",
                                item.optID
                            );

                            if (liElement.firstChild) {
                                liElement.firstChild.id = that.selectId + "-" + item.index;
                            }

                            break;

                        case "optgroup-label":
                            liElement = generateOption.li(
                                generateOption.label.call(that, item),
                                "dropdown-header" + item.optgroupClass,
                                item.optID
                            );

                            break;
                    }

                    item.element = liElement;
                    mainElements.push(liElement);

                    // count the number of characters in the option - not perfect, but should work in most cases
                    if (item.display) combinedLength += item.display.length;
                    if (item.subtext) combinedLength += item.subtext.length;
                    // if there is an icon, ensure this option's width is checked
                    if (item.icon) combinedLength += 1;

                    if (combinedLength > widestOptionLength) {
                        widestOptionLength = combinedLength;

                        // guess which option is the widest
                        // use this when calculating menu width
                        // not perfect, but it's fast, and the width will be updating accordingly when scrolling
                        that.selectpicker.view.widestOption = mainElements[mainElements.length - 1];
                    }
                }

                for (var len = selectData.length, i = 0; i < len; i++) {
                    var item = selectData[i];

                    buildElement(item);
                }

                this.selectpicker.main.elements = this.selectpicker.current.elements = mainElements;
            },

            findLis: function () {
                return this.$menuInner.find(".inner > li");
            },

            render: function () {
                var that = this,
                    element = this.$element[0],
                    // ensure titleOption is appended and selected (if necessary) before getting selectedOptions
                    placeholderSelected = this.setPlaceholder() && element.selectedIndex === 0,
                    selectedOptions = getSelectedOptions(element, this.options.hideDisabled),
                    selectedCount = selectedOptions.length,
                    button = this.$button[0],
                    buttonInner = button.querySelector(".filter-option-inner-inner"),
                    multipleSeparator = document.createTextNode(this.options.multipleSeparator),
                    titleFragment = elementTemplates.fragment.cloneNode(false),
                    showCount,
                    countMax,
                    hasContent = false;

                button.classList.toggle(
                    "bs-placeholder",
                    that.multiple ? !selectedCount : !getSelectValues(element, selectedOptions)
                );

                if (!that.multiple && selectedOptions.length === 1) {
                    that.selectpicker.view.displayedValue = getSelectValues(element, selectedOptions);
                }

                if (this.options.selectedTextFormat === "static") {
                    titleFragment = generateOption.text.call(this, { text: this.options.title }, true);
                } else {
                    showCount =
                        this.multiple && this.options.selectedTextFormat.indexOf("count") !== -1 && selectedCount > 1;

                    // determine if the number of selected options will be shown (showCount === true)
                    if (showCount) {
                        countMax = this.options.selectedTextFormat.split(">");
                        showCount =
                            (countMax.length > 1 && selectedCount > countMax[1]) ||
                            (countMax.length === 1 && selectedCount >= 2);
                    }

                    // only loop through all selected options if the count won't be shown
                    if (showCount === false) {
                        if (!placeholderSelected) {
                            for (var selectedIndex = 0; selectedIndex < selectedCount; selectedIndex++) {
                                if (selectedIndex < 50) {
                                    var option = selectedOptions[selectedIndex],
                                        thisData = this.selectpicker.main.data[option.liIndex],
                                        titleOptions = {};

                                    if (this.multiple && selectedIndex > 0) {
                                        titleFragment.appendChild(multipleSeparator.cloneNode(false));
                                    }

                                    if (option.title) {
                                        titleOptions.text = option.title;
                                    } else if (thisData) {
                                        if (thisData.content && that.options.showContent) {
                                            titleOptions.content = thisData.content.toString();
                                            hasContent = true;
                                        } else {
                                            if (that.options.showIcon) {
                                                titleOptions.icon = thisData.icon;
                                            }
                                            if (that.options.showSubtext && !that.multiple && thisData.subtext)
                                                titleOptions.subtext = " " + thisData.subtext;
                                            titleOptions.text = option.textContent.trim();
                                        }
                                    }

                                    titleFragment.appendChild(generateOption.text.call(this, titleOptions, true));
                                } else {
                                    break;
                                }
                            }

                            // add ellipsis
                            if (selectedCount > 49) {
                                titleFragment.appendChild(document.createTextNode("..."));
                            }
                        }
                    } else {
                        var optionSelector = ':not([hidden]):not([data-hidden="true"]):not([data-divider="true"])';
                        if (this.options.hideDisabled) optionSelector += ":not(:disabled)";

                        // If this is a multiselect, and selectedTextFormat is count, then show 1 of 2 selected, etc.
                        var totalCount = this.$element[0].querySelectorAll(
                                "select > option" +
                                    optionSelector +
                                    ", optgroup" +
                                    optionSelector +
                                    " option" +
                                    optionSelector
                            ).length,
                            tr8nText =
                                typeof this.options.countSelectedText === "function"
                                    ? this.options.countSelectedText(selectedCount, totalCount)
                                    : this.options.countSelectedText;

                        titleFragment = generateOption.text.call(
                            this,
                            {
                                text: tr8nText
                                    .replace("{0}", selectedCount.toString())
                                    .replace("{1}", totalCount.toString()),
                            },
                            true
                        );
                    }
                }

                if (this.options.title == undefined) {
                    // use .attr to ensure undefined is returned if title attribute is not set
                    this.options.title = this.$element.attr("title");
                }

                // If the select doesn't have a title, then use the default, or if nothing is set at all, use noneSelectedText
                if (!titleFragment.childNodes.length) {
                    titleFragment = generateOption.text.call(
                        this,
                        {
                            text:
                                typeof this.options.title !== "undefined"
                                    ? this.options.title
                                    : this.options.noneSelectedText,
                        },
                        true
                    );
                }

                // strip all HTML tags and trim the result, then unescape any escaped tags
                button.title = titleFragment.textContent.replace(/<[^>]*>?/g, "").trim();

                if (this.options.sanitize && hasContent) {
                    sanitizeHtml([titleFragment], that.options.whiteList, that.options.sanitizeFn);
                }

                buttonInner.innerHTML = "";
                buttonInner.appendChild(titleFragment);

                if (version.major < 4 && this.$newElement[0].classList.contains("bs3-has-addon")) {
                    var filterExpand = button.querySelector(".filter-expand"),
                        clone = buttonInner.cloneNode(true);

                    clone.className = "filter-expand";

                    if (filterExpand) {
                        button.replaceChild(clone, filterExpand);
                    } else {
                        button.appendChild(clone);
                    }
                }

                this.$element.trigger("rendered" + EVENT_KEY);
            },

            /**
             * @param [style]
             * @param [status]
             */
            setStyle: function (newStyle, status) {
                var button = this.$button[0],
                    newElement = this.$newElement[0],
                    style = this.options.style.trim(),
                    buttonClass;

                if (this.$element.attr("class")) {
                    this.$newElement.addClass(
                        this.$element
                            .attr("class")
                            .replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, "")
                    );
                }

                if (version.major < 4) {
                    newElement.classList.add("bs3");

                    if (
                        newElement.parentNode.classList &&
                        newElement.parentNode.classList.contains("input-group") &&
                        (newElement.previousElementSibling || newElement.nextElementSibling) &&
                        (newElement.previousElementSibling || newElement.nextElementSibling).classList.contains(
                            "input-group-addon"
                        )
                    ) {
                        newElement.classList.add("bs3-has-addon");
                    }
                }

                if (newStyle) {
                    buttonClass = newStyle.trim();
                } else {
                    buttonClass = style;
                }

                if (status == "add") {
                    if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(" "));
                } else if (status == "remove") {
                    if (buttonClass) button.classList.remove.apply(button.classList, buttonClass.split(" "));
                } else {
                    if (style) button.classList.remove.apply(button.classList, style.split(" "));
                    if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(" "));
                }
            },

            liHeight: function (refresh) {
                if (!refresh && (this.options.size === false || Object.keys(this.sizeInfo).length)) return;

                var newElement = elementTemplates.div.cloneNode(false),
                    menu = elementTemplates.div.cloneNode(false),
                    menuInner = elementTemplates.div.cloneNode(false),
                    menuInnerInner = document.createElement("ul"),
                    divider = elementTemplates.li.cloneNode(false),
                    dropdownHeader = elementTemplates.li.cloneNode(false),
                    li,
                    a = elementTemplates.a.cloneNode(false),
                    text = elementTemplates.span.cloneNode(false),
                    header =
                        this.options.header && this.$menu.find("." + classNames.POPOVERHEADER).length > 0
                            ? this.$menu.find("." + classNames.POPOVERHEADER)[0].cloneNode(true)
                            : null,
                    search = this.options.liveSearch ? elementTemplates.div.cloneNode(false) : null,
                    actions =
                        this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0
                            ? this.$menu.find(".bs-actionsbox")[0].cloneNode(true)
                            : null,
                    doneButton =
                        this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0
                            ? this.$menu.find(".bs-donebutton")[0].cloneNode(true)
                            : null,
                    firstOption = this.$element.find("option")[0];

                this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth;

                text.className = "text";
                a.className = "dropdown-item " + (firstOption ? firstOption.className : "");
                newElement.className = this.$menu[0].parentNode.className + " bs-container " + classNames.SHOW;
                newElement.style.width = "auto"; // ensure button width doesn't affect natural width of menu when calculating
                if (this.options.width === "auto") menu.style.minWidth = 0;
                menu.className = classNames.MENU + " " + classNames.SHOW;
                menuInner.className = "inner " + classNames.SHOW;
                menuInnerInner.className =
                    classNames.MENU + " dropdown-menu_inner inner " + (version.major === "4" ? classNames.SHOW : "");
                divider.className = classNames.DIVIDER;
                dropdownHeader.className = "dropdown-header";

                text.appendChild(document.createTextNode("\u200b"));

                if (this.selectpicker.current.data.length) {
                    for (var i = 0; i < this.selectpicker.current.data.length; i++) {
                        var data = this.selectpicker.current.data[i];
                        if (data.type === "option") {
                            li = data.element;
                            break;
                        }
                    }
                } else {
                    li = elementTemplates.li.cloneNode(false);
                    a.appendChild(text);
                    li.appendChild(a);
                }

                dropdownHeader.appendChild(text.cloneNode(true));

                if (this.selectpicker.view.widestOption) {
                    menuInnerInner.appendChild(this.selectpicker.view.widestOption.cloneNode(true));
                }

                menuInnerInner.appendChild(li);
                menuInnerInner.appendChild(divider);
                menuInnerInner.appendChild(dropdownHeader);
                if (header) menu.appendChild(header);
                if (search) {
                    var input = document.createElement("input");
                    search.className = "bs-searchbox";
                    input.className = "form-control";
                    search.appendChild(input);
                    menu.appendChild(search);
                }
                if (actions) menu.appendChild(actions);
                menuInner.appendChild(menuInnerInner);
                menu.appendChild(menuInner);
                if (doneButton) menu.appendChild(doneButton);
                newElement.appendChild(menu);

                document.body.appendChild(newElement);

                var liHeight = li.offsetHeight,
                    dropdownHeaderHeight = dropdownHeader ? dropdownHeader.offsetHeight : 0,
                    headerHeight = header ? header.offsetHeight : 0,
                    searchHeight = search ? search.offsetHeight : 0,
                    actionsHeight = actions ? actions.offsetHeight : 0,
                    doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
                    dividerHeight = $(divider).outerHeight(true),
                    // fall back to jQuery if getComputedStyle is not supported
                    menuStyle = window.getComputedStyle ? window.getComputedStyle(menu) : false,
                    menuWidth = menu.offsetWidth,
                    $menu = menuStyle ? null : $(menu),
                    menuPadding = {
                        vert:
                            toInteger(menuStyle ? menuStyle.paddingTop : $menu.css("paddingTop")) +
                            toInteger(menuStyle ? menuStyle.paddingBottom : $menu.css("paddingBottom")) +
                            toInteger(menuStyle ? menuStyle.borderTopWidth : $menu.css("borderTopWidth")) +
                            toInteger(menuStyle ? menuStyle.borderBottomWidth : $menu.css("borderBottomWidth")),
                        horiz:
                            toInteger(menuStyle ? menuStyle.paddingLeft : $menu.css("paddingLeft")) +
                            toInteger(menuStyle ? menuStyle.paddingRight : $menu.css("paddingRight")) +
                            toInteger(menuStyle ? menuStyle.borderLeftWidth : $menu.css("borderLeftWidth")) +
                            toInteger(menuStyle ? menuStyle.borderRightWidth : $menu.css("borderRightWidth")),
                    },
                    menuExtras = {
                        vert:
                            menuPadding.vert +
                            toInteger(menuStyle ? menuStyle.marginTop : $menu.css("marginTop")) +
                            toInteger(menuStyle ? menuStyle.marginBottom : $menu.css("marginBottom")) +
                            2,
                        horiz:
                            menuPadding.horiz +
                            toInteger(menuStyle ? menuStyle.marginLeft : $menu.css("marginLeft")) +
                            toInteger(menuStyle ? menuStyle.marginRight : $menu.css("marginRight")) +
                            2,
                    },
                    scrollBarWidth;

                menuInner.style.overflowY = "scroll";

                scrollBarWidth = menu.offsetWidth - menuWidth;

                document.body.removeChild(newElement);

                this.sizeInfo.liHeight = liHeight;
                this.sizeInfo.dropdownHeaderHeight = dropdownHeaderHeight;
                this.sizeInfo.headerHeight = headerHeight;
                this.sizeInfo.searchHeight = searchHeight;
                this.sizeInfo.actionsHeight = actionsHeight;
                this.sizeInfo.doneButtonHeight = doneButtonHeight;
                this.sizeInfo.dividerHeight = dividerHeight;
                this.sizeInfo.menuPadding = menuPadding;
                this.sizeInfo.menuExtras = menuExtras;
                this.sizeInfo.menuWidth = menuWidth;
                this.sizeInfo.menuInnerInnerWidth = menuWidth - menuPadding.horiz;
                this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth;
                this.sizeInfo.scrollBarWidth = scrollBarWidth;
                this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight;

                this.setPositionData();
            },

            getSelectPosition: function () {
                var that = this,
                    $window = $(window),
                    pos = that.$newElement.offset(),
                    $container = $(that.options.container),
                    containerPos;

                if (that.options.container && $container.length && !$container.is("body")) {
                    containerPos = $container.offset();
                    containerPos.top += parseInt($container.css("borderTopWidth"));
                    containerPos.left += parseInt($container.css("borderLeftWidth"));
                } else {
                    containerPos = { top: 0, left: 0 };
                }

                var winPad = that.options.windowPadding;

                this.sizeInfo.selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
                this.sizeInfo.selectOffsetBot =
                    $window.height() -
                    this.sizeInfo.selectOffsetTop -
                    this.sizeInfo.selectHeight -
                    containerPos.top -
                    winPad[2];
                this.sizeInfo.selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
                this.sizeInfo.selectOffsetRight =
                    $window.width() -
                    this.sizeInfo.selectOffsetLeft -
                    this.sizeInfo.selectWidth -
                    containerPos.left -
                    winPad[1];
                this.sizeInfo.selectOffsetTop -= winPad[0];
                this.sizeInfo.selectOffsetLeft -= winPad[3];
            },

            setMenuSize: function (isAuto) {
                this.getSelectPosition();

                var selectWidth = this.sizeInfo.selectWidth,
                    liHeight = this.sizeInfo.liHeight,
                    headerHeight = this.sizeInfo.headerHeight,
                    searchHeight = this.sizeInfo.searchHeight,
                    actionsHeight = this.sizeInfo.actionsHeight,
                    doneButtonHeight = this.sizeInfo.doneButtonHeight,
                    divHeight = this.sizeInfo.dividerHeight,
                    menuPadding = this.sizeInfo.menuPadding,
                    menuInnerHeight,
                    menuHeight,
                    divLength = 0,
                    minHeight,
                    _minHeight,
                    maxHeight,
                    menuInnerMinHeight,
                    estimate,
                    isDropup;

                if (this.options.dropupAuto) {
                    // Get the estimated height of the menu without scrollbars.
                    // This is useful for smaller menus, where there might be plenty of room
                    // below the button without setting dropup, but we can't know
                    // the exact height of the menu until createView is called later
                    estimate = liHeight * this.selectpicker.current.elements.length + menuPadding.vert;

                    isDropup =
                        this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert &&
                        estimate + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot;

                    // ensure dropup doesn't change while searching (so menu doesn't bounce back and forth)
                    if (this.selectpicker.isSearching === true) {
                        isDropup = this.selectpicker.dropup;
                    }

                    this.$newElement.toggleClass(classNames.DROPUP, isDropup);
                    this.selectpicker.dropup = isDropup;
                }

                if (this.options.size === "auto") {
                    _minHeight =
                        this.selectpicker.current.elements.length > 3
                            ? this.sizeInfo.liHeight * 3 + this.sizeInfo.menuExtras.vert - 2
                            : 0;
                    menuHeight = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert;
                    minHeight = _minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
                    menuInnerMinHeight = Math.max(_minHeight - menuPadding.vert, 0);

                    if (this.$newElement.hasClass(classNames.DROPUP)) {
                        menuHeight = this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert;
                    }

                    maxHeight = menuHeight;
                    menuInnerHeight =
                        menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert;
                } else if (
                    this.options.size &&
                    this.options.size != "auto" &&
                    this.selectpicker.current.elements.length > this.options.size
                ) {
                    for (var i = 0; i < this.options.size; i++) {
                        if (this.selectpicker.current.data[i].type === "divider") divLength++;
                    }

                    menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;
                    menuInnerHeight = menuHeight - menuPadding.vert;
                    maxHeight = menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
                    minHeight = menuInnerMinHeight = "";
                }

                this.$menu.css({
                    "max-height": maxHeight + "px",
                    overflow: "hidden",
                    "min-height": this.options.size === "auto" ? "" : minHeight + "px",
                });

                this.$menuInner.css({
                    "max-height": menuInnerHeight + "px",
                    "overflow-y": "auto",
                    "min-height": this.options.size === "auto" ? "" : menuInnerMinHeight + "px",
                });

                // ensure menuInnerHeight is always a positive number to prevent issues calculating chunkSize in createView
                this.sizeInfo.menuInnerHeight = Math.max(menuInnerHeight, 1);

                if (
                    this.selectpicker.current.data.length &&
                    this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position >
                        this.sizeInfo.menuInnerHeight
                ) {
                    this.sizeInfo.hasScrollBar = true;
                    this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth;
                }

                if (this.options.dropdownAlignRight === "auto") {
                    this.$menu.toggleClass(
                        classNames.MENURIGHT,
                        this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight &&
                            this.sizeInfo.selectOffsetRight < this.sizeInfo.totalMenuWidth - selectWidth
                    );
                }

                if (this.dropdown && this.dropdown._popper) this.dropdown._popper.update();
            },

            setSize: function (refresh) {
                this.liHeight(refresh);

                if (this.options.header) this.$menu.css("padding-top", 0);

                if (this.options.size !== false) {
                    var that = this,
                        $window = $(window);

                    this.setMenuSize();

                    if (this.options.liveSearch) {
                        this.$searchbox
                            .off("input.setMenuSize propertychange.setMenuSize")
                            .on("input.setMenuSize propertychange.setMenuSize", function () {
                                return that.setMenuSize();
                            });
                    }

                    if (this.options.size === "auto") {
                        $window
                            .off(
                                "resize" +
                                    EVENT_KEY +
                                    "." +
                                    this.selectId +
                                    ".setMenuSize" +
                                    " scroll" +
                                    EVENT_KEY +
                                    "." +
                                    this.selectId +
                                    ".setMenuSize"
                            )
                            .on(
                                "resize" +
                                    EVENT_KEY +
                                    "." +
                                    this.selectId +
                                    ".setMenuSize" +
                                    " scroll" +
                                    EVENT_KEY +
                                    "." +
                                    this.selectId +
                                    ".setMenuSize",
                                function () {
                                    return that.setMenuSize();
                                }
                            );
                    } else if (
                        this.options.size &&
                        this.options.size != "auto" &&
                        this.selectpicker.current.elements.length > this.options.size
                    ) {
                        $window.off(
                            "resize" +
                                EVENT_KEY +
                                "." +
                                this.selectId +
                                ".setMenuSize" +
                                " scroll" +
                                EVENT_KEY +
                                "." +
                                this.selectId +
                                ".setMenuSize"
                        );
                    }
                }

                this.createView(false, true, refresh);
            },

            setWidth: function () {
                var that = this;

                if (this.options.width === "auto") {
                    requestAnimationFrame(function () {
                        that.$menu.css("min-width", "0");

                        that.$element.on("loaded" + EVENT_KEY, function () {
                            that.liHeight();
                            that.setMenuSize();

                            // Get correct width if element is hidden
                            var $selectClone = that.$newElement.clone().appendTo("body"),
                                btnWidth = $selectClone.css("width", "auto").children("button").outerWidth();

                            $selectClone.remove();

                            // Set width to whatever's larger, button title or longest option
                            that.sizeInfo.selectWidth = Math.max(that.sizeInfo.totalMenuWidth, btnWidth);
                            that.$newElement.css("width", that.sizeInfo.selectWidth + "px");
                        });
                    });
                } else if (this.options.width === "fit") {
                    // Remove inline min-width so width can be changed from 'auto'
                    this.$menu.css("min-width", "");
                    this.$newElement.css("width", "").addClass("fit-width");
                } else if (this.options.width) {
                    // Remove inline min-width so width can be changed from 'auto'
                    this.$menu.css("min-width", "");
                    this.$newElement.css("width", this.options.width);
                } else {
                    // Remove inline min-width/width so width can be changed
                    this.$menu.css("min-width", "");
                    this.$newElement.css("width", "");
                }
                // Remove fit-width class if width is changed programmatically
                if (this.$newElement.hasClass("fit-width") && this.options.width !== "fit") {
                    this.$newElement[0].classList.remove("fit-width");
                }
            },

            selectPosition: function () {
                this.$bsContainer = $('<div class="bs-container" />');

                var that = this,
                    $container = $(this.options.container),
                    pos,
                    containerPos,
                    actualHeight,
                    getPlacement = function ($element) {
                        var containerPosition = {},
                            // fall back to dropdown's default display setting if display is not manually set
                            display =
                                that.options.display ||
                                // Bootstrap 3 doesn't have $.fn.dropdown.Constructor.Default
                                ($.fn.dropdown.Constructor.Default ? $.fn.dropdown.Constructor.Default.display : false);

                        that.$bsContainer
                            .addClass($element.attr("class").replace(/form-control|fit-width/gi, ""))
                            .toggleClass(classNames.DROPUP, $element.hasClass(classNames.DROPUP));
                        pos = $element.offset();

                        if (!$container.is("body")) {
                            containerPos = $container.offset();
                            containerPos.top += parseInt($container.css("borderTopWidth")) - $container.scrollTop();
                            containerPos.left += parseInt($container.css("borderLeftWidth")) - $container.scrollLeft();
                        } else {
                            containerPos = { top: 0, left: 0 };
                        }

                        actualHeight = $element.hasClass(classNames.DROPUP) ? 0 : $element[0].offsetHeight;

                        // Bootstrap 4+ uses Popper for menu positioning
                        if (version.major < 4 || display === "static") {
                            containerPosition.top = pos.top - containerPos.top + actualHeight;
                            containerPosition.left = pos.left - containerPos.left;
                        }

                        containerPosition.width = $element[0].offsetWidth;

                        that.$bsContainer.css(containerPosition);
                    };

                this.$button.on("click.bs.dropdown.data-api", function () {
                    if (that.isDisabled()) {
                        return;
                    }

                    getPlacement(that.$newElement);

                    that.$bsContainer
                        .appendTo(that.options.container)
                        .toggleClass(classNames.SHOW, !that.$button.hasClass(classNames.SHOW))
                        .append(that.$menu);
                });

                $(window)
                    .off("resize" + EVENT_KEY + "." + this.selectId + " scroll" + EVENT_KEY + "." + this.selectId)
                    .on(
                        "resize" + EVENT_KEY + "." + this.selectId + " scroll" + EVENT_KEY + "." + this.selectId,
                        function () {
                            var isActive = that.$newElement.hasClass(classNames.SHOW);

                            if (isActive) getPlacement(that.$newElement);
                        }
                    );

                this.$element.on("hide" + EVENT_KEY, function () {
                    that.$menu.data("height", that.$menu.height());
                    that.$bsContainer.detach();
                });
            },

            setOptionStatus: function (selectedOnly) {
                var that = this;

                that.noScroll = false;

                if (that.selectpicker.view.visibleElements && that.selectpicker.view.visibleElements.length) {
                    for (var i = 0; i < that.selectpicker.view.visibleElements.length; i++) {
                        var liData = that.selectpicker.current.data[i + that.selectpicker.view.position0],
                            option = liData.option;

                        if (option) {
                            if (selectedOnly !== true) {
                                that.setDisabled(liData.index, liData.disabled);
                            }

                            that.setSelected(liData.index, option.selected);
                        }
                    }
                }
            },

            /**
             * @param {number} index - the index of the option that is being changed
             * @param {boolean} selected - true if the option is being selected, false if being deselected
             */
            setSelected: function (index, selected) {
                var li = this.selectpicker.main.elements[index],
                    liData = this.selectpicker.main.data[index],
                    activeIndexIsSet = this.activeIndex !== undefined,
                    thisIsActive = this.activeIndex === index,
                    prevActive,
                    a,
                    // if current option is already active
                    // OR
                    // if the current option is being selected, it's NOT multiple, and
                    // activeIndex is undefined:
                    //  - when the menu is first being opened, OR
                    //  - after a search has been performed, OR
                    //  - when retainActive is false when selecting a new option (i.e. index of the newly selected option is not the same as the current activeIndex)
                    keepActive = thisIsActive || (selected && !this.multiple && !activeIndexIsSet);

                liData.selected = selected;

                a = li.firstChild;

                if (selected) {
                    this.selectedIndex = index;
                }

                li.classList.toggle("selected", selected);

                if (keepActive) {
                    this.focusItem(li, liData);
                    this.selectpicker.view.currentActive = li;
                    this.activeIndex = index;
                } else {
                    this.defocusItem(li);
                }

                if (a) {
                    a.classList.toggle("selected", selected);

                    if (selected) {
                        a.setAttribute("aria-selected", true);
                    } else {
                        if (this.multiple) {
                            a.setAttribute("aria-selected", false);
                        } else {
                            a.removeAttribute("aria-selected");
                        }
                    }
                }

                if (!keepActive && !activeIndexIsSet && selected && this.prevActiveIndex !== undefined) {
                    prevActive = this.selectpicker.main.elements[this.prevActiveIndex];

                    this.defocusItem(prevActive);
                }
            },

            /**
             * @param {number} index - the index of the option that is being disabled
             * @param {boolean} disabled - true if the option is being disabled, false if being enabled
             */
            setDisabled: function (index, disabled) {
                var li = this.selectpicker.main.elements[index],
                    a;

                this.selectpicker.main.data[index].disabled = disabled;

                a = li.firstChild;

                li.classList.toggle(classNames.DISABLED, disabled);

                if (a) {
                    if (version.major === "4") a.classList.toggle(classNames.DISABLED, disabled);

                    if (disabled) {
                        a.setAttribute("aria-disabled", disabled);
                        a.setAttribute("tabindex", -1);
                    } else {
                        a.removeAttribute("aria-disabled");
                        a.setAttribute("tabindex", 0);
                    }
                }
            },

            isDisabled: function () {
                return this.$element[0].disabled;
            },

            checkDisabled: function () {
                if (this.isDisabled()) {
                    this.$newElement[0].classList.add(classNames.DISABLED);
                    this.$button.addClass(classNames.DISABLED).attr("aria-disabled", true);
                } else {
                    if (this.$button[0].classList.contains(classNames.DISABLED)) {
                        this.$newElement[0].classList.remove(classNames.DISABLED);
                        this.$button.removeClass(classNames.DISABLED).attr("aria-disabled", false);
                    }
                }
            },

            clickListener: function () {
                var that = this,
                    $document = $(document);

                $document.data("spaceSelect", false);

                this.$button.on("keyup", function (e) {
                    if (/(32)/.test(e.keyCode.toString(10)) && $document.data("spaceSelect")) {
                        e.preventDefault();
                        $document.data("spaceSelect", false);
                    }
                });

                this.$newElement.on("show.bs.dropdown", function () {
                    if (version.major > 3 && !that.dropdown) {
                        that.dropdown = that.$button.data("bs.dropdown");
                        that.dropdown._menu = that.$menu[0];
                    }
                });

                this.$button.on("click.bs.dropdown.data-api", function () {
                    if (!that.$newElement.hasClass(classNames.SHOW)) {
                        that.setSize();
                    }
                });

                function setFocus() {
                    if (that.options.liveSearch) {
                        that.$searchbox.trigger("focus");
                    } else {
                        that.$menuInner.trigger("focus");
                    }
                }

                function checkPopperExists() {
                    if (that.dropdown && that.dropdown._popper && that.dropdown._popper.state.isCreated) {
                        setFocus();
                    } else {
                        requestAnimationFrame(checkPopperExists);
                    }
                }

                this.$element.on("shown" + EVENT_KEY, function () {
                    if (that.$menuInner[0].scrollTop !== that.selectpicker.view.scrollTop) {
                        that.$menuInner[0].scrollTop = that.selectpicker.view.scrollTop;
                    }

                    if (version.major > 3) {
                        requestAnimationFrame(checkPopperExists);
                    } else {
                        setFocus();
                    }
                });

                // ensure posinset and setsize are correct before selecting an option via a click
                this.$menuInner.on("mouseenter", "li a", function (e) {
                    var hoverLi = this.parentElement,
                        position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0,
                        index = Array.prototype.indexOf.call(hoverLi.parentElement.children, hoverLi),
                        hoverData = that.selectpicker.current.data[index + position0];

                    that.focusItem(hoverLi, hoverData, true);
                });

                this.$menuInner.on("click", "li a", function (e, retainActive) {
                    var $this = $(this),
                        element = that.$element[0],
                        position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0,
                        clickedData = that.selectpicker.current.data[$this.parent().index() + position0],
                        clickedIndex = clickedData.index,
                        prevValue = getSelectValues(element),
                        prevIndex = element.selectedIndex,
                        prevOption = element.options[prevIndex],
                        triggerChange = true;

                    // Don't close on multi choice menu
                    if (that.multiple && that.options.maxOptions !== 1) {
                        e.stopPropagation();
                    }

                    e.preventDefault();

                    // Don't run if the select is disabled
                    if (!that.isDisabled() && !$this.parent().hasClass(classNames.DISABLED)) {
                        var option = clickedData.option,
                            $option = $(option),
                            state = option.selected,
                            $optgroup = $option.parent("optgroup"),
                            $optgroupOptions = $optgroup.find("option"),
                            maxOptions = that.options.maxOptions,
                            maxOptionsGrp = $optgroup.data("maxOptions") || false;

                        if (clickedIndex === that.activeIndex) retainActive = true;

                        if (!retainActive) {
                            that.prevActiveIndex = that.activeIndex;
                            that.activeIndex = undefined;
                        }

                        if (!that.multiple) {
                            // Deselect all others if not multi select box
                            if (prevOption) prevOption.selected = false;
                            option.selected = true;
                            that.setSelected(clickedIndex, true);
                        } else {
                            // Toggle the one we have chosen if we are multi select.
                            option.selected = !state;

                            that.setSelected(clickedIndex, !state);
                            that.focusedParent.focus();

                            if (maxOptions !== false || maxOptionsGrp !== false) {
                                var maxReached = maxOptions < getSelectedOptions(element).length,
                                    maxReachedGrp = maxOptionsGrp < $optgroup.find("option:selected").length;

                                if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                                    if (maxOptions && maxOptions == 1) {
                                        element.selectedIndex = -1;
                                        option.selected = true;
                                        that.setOptionStatus(true);
                                    } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                                        for (var i = 0; i < $optgroupOptions.length; i++) {
                                            var _option = $optgroupOptions[i];
                                            _option.selected = false;
                                            that.setSelected(_option.liIndex, false);
                                        }

                                        option.selected = true;
                                        that.setSelected(clickedIndex, true);
                                    } else {
                                        var maxOptionsText =
                                                typeof that.options.maxOptionsText === "string"
                                                    ? [that.options.maxOptionsText, that.options.maxOptionsText]
                                                    : that.options.maxOptionsText,
                                            maxOptionsArr =
                                                typeof maxOptionsText === "function"
                                                    ? maxOptionsText(maxOptions, maxOptionsGrp)
                                                    : maxOptionsText,
                                            maxTxt = maxOptionsArr[0].replace("{n}", maxOptions),
                                            maxTxtGrp = maxOptionsArr[1].replace("{n}", maxOptionsGrp),
                                            $notify = $('<div class="notify"></div>');
                                        // If {var} is set in array, replace it
                                        /** @deprecated */
                                        if (maxOptionsArr[2]) {
                                            maxTxt = maxTxt.replace("{var}", maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                                            maxTxtGrp = maxTxtGrp.replace(
                                                "{var}",
                                                maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]
                                            );
                                        }

                                        option.selected = false;

                                        that.$menu.append($notify);

                                        if (maxOptions && maxReached) {
                                            $notify.append($("<div>" + maxTxt + "</div>"));
                                            triggerChange = false;
                                            that.$element.trigger("maxReached" + EVENT_KEY);
                                        }

                                        if (maxOptionsGrp && maxReachedGrp) {
                                            $notify.append($("<div>" + maxTxtGrp + "</div>"));
                                            triggerChange = false;
                                            that.$element.trigger("maxReachedGrp" + EVENT_KEY);
                                        }

                                        setTimeout(function () {
                                            that.setSelected(clickedIndex, false);
                                        }, 10);

                                        $notify[0].classList.add("fadeOut");

                                        setTimeout(function () {
                                            $notify.remove();
                                        }, 1050);
                                    }
                                }
                            }
                        }

                        if (!that.multiple || (that.multiple && that.options.maxOptions === 1)) {
                            that.$button.trigger("focus");
                        } else if (that.options.liveSearch) {
                            that.$searchbox.trigger("focus");
                        }

                        // Trigger select 'change'
                        if (triggerChange) {
                            if (that.multiple || prevIndex !== element.selectedIndex) {
                                // $option.prop('selected') is current option state (selected/unselected). prevValue is the value of the select prior to being changed.
                                changedArguments = [option.index, $option.prop("selected"), prevValue];
                                that.$element.triggerNative("change");
                            }
                        }
                    }
                });

                this.$menu.on(
                    "click",
                    "li." +
                        classNames.DISABLED +
                        " a, ." +
                        classNames.POPOVERHEADER +
                        ", ." +
                        classNames.POPOVERHEADER +
                        " :not(.close)",
                    function (e) {
                        if (e.currentTarget == this) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (that.options.liveSearch && !$(e.target).hasClass("close")) {
                                that.$searchbox.trigger("focus");
                            } else {
                                that.$button.trigger("focus");
                            }
                        }
                    }
                );

                this.$menuInner.on("click", ".divider, .dropdown-header", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (that.options.liveSearch) {
                        that.$searchbox.trigger("focus");
                    } else {
                        that.$button.trigger("focus");
                    }
                });

                this.$menu.on("click", "." + classNames.POPOVERHEADER + " .close", function () {
                    that.$button.trigger("click");
                });

                this.$searchbox.on("click", function (e) {
                    e.stopPropagation();
                });

                this.$menu.on("click", ".actions-btn", function (e) {
                    if (that.options.liveSearch) {
                        that.$searchbox.trigger("focus");
                    } else {
                        that.$button.trigger("focus");
                    }

                    e.preventDefault();
                    e.stopPropagation();

                    if ($(this).hasClass("bs-select-all")) {
                        that.selectAll();
                    } else {
                        that.deselectAll();
                    }
                });

                this.$button
                    .on("focus" + EVENT_KEY, function (e) {
                        var tabindex = that.$element[0].getAttribute("tabindex");

                        // only change when button is actually focused
                        if (tabindex !== undefined && e.originalEvent && e.originalEvent.isTrusted) {
                            // apply select element's tabindex to ensure correct order is followed when tabbing to the next element
                            this.setAttribute("tabindex", tabindex);
                            // set element's tabindex to -1 to allow for reverse tabbing
                            that.$element[0].setAttribute("tabindex", -1);
                            that.selectpicker.view.tabindex = tabindex;
                        }
                    })
                    .on("blur" + EVENT_KEY, function (e) {
                        // revert everything to original tabindex
                        if (
                            that.selectpicker.view.tabindex !== undefined &&
                            e.originalEvent &&
                            e.originalEvent.isTrusted
                        ) {
                            that.$element[0].setAttribute("tabindex", that.selectpicker.view.tabindex);
                            this.setAttribute("tabindex", -1);
                            that.selectpicker.view.tabindex = undefined;
                        }
                    });

                this.$element
                    .on("change" + EVENT_KEY, function () {
                        that.render();
                        that.$element.trigger("changed" + EVENT_KEY, changedArguments);
                        changedArguments = null;
                    })
                    .on("focus" + EVENT_KEY, function () {
                        if (!that.options.mobile) that.$button[0].focus();
                    });
            },

            liveSearchListener: function () {
                var that = this;

                this.$button.on("click.bs.dropdown.data-api", function () {
                    if (!!that.$searchbox.val()) {
                        that.$searchbox.val("");
                        that.selectpicker.search.previousValue = undefined;
                    }
                });

                this.$menu.find(".bs-searchbox__button").on("click", function () {
                    that.$searchbox.val("").trigger("input").trigger("keyup").focus();
                });

                this.$searchbox.on(
                    "click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api",
                    function (e) {
                        e.stopPropagation();
                    }
                );

                this.$searchbox.on("input propertychange", function () {
                    var searchValue = that.$searchbox[0].value;

                    that.selectpicker.search.elements = [];
                    that.selectpicker.search.data = [];

                    if (searchValue) {
                        var i,
                            searchMatch = [],
                            q = searchValue.toUpperCase(),
                            cache = {},
                            cacheArr = [],
                            searchStyle = that._searchStyle(),
                            normalizeSearch = that.options.liveSearchNormalize;

                        if (normalizeSearch) q = normalizeToBase(q);

                        for (var i = 0; i < that.selectpicker.main.data.length; i++) {
                            var li = that.selectpicker.main.data[i];

                            if (!cache[i]) {
                                cache[i] = stringSearch(li, q, searchStyle, normalizeSearch);
                            }

                            if (cache[i] && li.headerIndex !== undefined && cacheArr.indexOf(li.headerIndex) === -1) {
                                if (li.headerIndex > 0) {
                                    cache[li.headerIndex - 1] = true;
                                    cacheArr.push(li.headerIndex - 1);
                                }

                                cache[li.headerIndex] = true;
                                cacheArr.push(li.headerIndex);

                                cache[li.lastIndex + 1] = true;
                            }

                            if (cache[i] && li.type !== "optgroup-label") cacheArr.push(i);
                        }

                        for (var i = 0, cacheLen = cacheArr.length; i < cacheLen; i++) {
                            var index = cacheArr[i],
                                prevIndex = cacheArr[i - 1],
                                li = that.selectpicker.main.data[index],
                                liPrev = that.selectpicker.main.data[prevIndex];

                            if (
                                li.type !== "divider" ||
                                (li.type === "divider" && liPrev && liPrev.type !== "divider" && cacheLen - 1 !== i)
                            ) {
                                that.selectpicker.search.data.push(li);
                                searchMatch.push(that.selectpicker.main.elements[index]);
                            }
                        }

                        that.activeIndex = undefined;
                        that.noScroll = true;
                        that.$menuInner.scrollTop(0);
                        that.selectpicker.search.elements = searchMatch;
                        that.createView(true);
                        showNoResults.call(that, searchMatch, searchValue);
                    } else if (that.selectpicker.search.previousValue) {
                        // for IE11 (#2402)
                        that.$menuInner.scrollTop(0);
                        that.createView(false);
                    }

                    that.selectpicker.search.previousValue = searchValue;
                });
            },

            _searchStyle: function () {
                return this.options.liveSearchStyle || "contains";
            },

            val: function (value) {
                var element = this.$element[0];

                if (typeof value !== "undefined") {
                    var prevValue = getSelectValues(element);

                    changedArguments = [null, null, prevValue];

                    this.$element.val(value).trigger("changed" + EVENT_KEY, changedArguments);

                    if (this.$newElement.hasClass(classNames.SHOW)) {
                        if (this.multiple) {
                            this.setOptionStatus(true);
                        } else {
                            var liSelectedIndex = (element.options[element.selectedIndex] || {}).liIndex;

                            if (typeof liSelectedIndex === "number") {
                                this.setSelected(this.selectedIndex, false);
                                this.setSelected(liSelectedIndex, true);
                            }
                        }
                    }

                    this.render();

                    changedArguments = null;

                    return this.$element;
                } else {
                    return this.$element.val();
                }
            },

            changeAll: function (status) {
                if (!this.multiple) return;
                if (typeof status === "undefined") status = true;

                var element = this.$element[0],
                    previousSelected = 0,
                    currentSelected = 0,
                    prevValue = getSelectValues(element);

                element.classList.add("bs-select-hidden");

                for (var i = 0, data = this.selectpicker.current.data, len = data.length; i < len; i++) {
                    var liData = data[i],
                        option = liData.option;

                    if (option && !liData.disabled && liData.type !== "divider") {
                        if (liData.selected) previousSelected++;
                        option.selected = status;
                        if (status === true) currentSelected++;
                    }
                }

                element.classList.remove("bs-select-hidden");

                if (previousSelected === currentSelected) return;

                this.setOptionStatus();

                changedArguments = [null, null, prevValue];

                this.$element.triggerNative("change");
            },

            selectAll: function () {
                return this.changeAll(true);
            },

            deselectAll: function () {
                return this.changeAll(false);
            },

            toggle: function (e) {
                e = e || window.event;

                if (e) e.stopPropagation();

                this.$button.trigger("click.bs.dropdown.data-api");
            },

            keydown: function (e) {
                var $this = $(this),
                    isToggle = $this.hasClass("dropdown-toggle"),
                    $parent = isToggle ? $this.closest(".dropdown") : $this.closest(Selector.MENU),
                    that = $parent.data("this"),
                    $items = that.findLis(),
                    index,
                    isActive,
                    liActive,
                    activeLi,
                    offset,
                    updateScroll = false,
                    downOnTab = e.which === keyCodes.TAB && !isToggle && !that.options.selectOnTab,
                    isArrowKey = REGEXP_ARROW.test(e.which) || downOnTab,
                    scrollTop = that.$menuInner[0].scrollTop,
                    isVirtual = that.isVirtual(),
                    position0 = isVirtual === true ? that.selectpicker.view.position0 : 0;

                // do nothing if a function key is pressed
                if (e.which >= 112 && e.which <= 123) return;

                isActive = that.$newElement.hasClass(classNames.SHOW);

                if (
                    !isActive &&
                    (isArrowKey ||
                        (e.which >= 48 && e.which <= 57) ||
                        (e.which >= 96 && e.which <= 105) ||
                        (e.which >= 65 && e.which <= 90))
                ) {
                    that.$button.trigger("click.bs.dropdown.data-api");

                    if (that.options.liveSearch) {
                        that.$searchbox.trigger("focus");
                        return;
                    }
                }

                if (e.which === keyCodes.ESCAPE && isActive) {
                    e.preventDefault();
                    that.$button.trigger("click.bs.dropdown.data-api").trigger("focus");
                }

                if (isArrowKey) {
                    // if up or down
                    if (!$items.length) return;

                    liActive = that.selectpicker.main.elements[that.activeIndex];
                    index = liActive ? Array.prototype.indexOf.call(liActive.parentElement.children, liActive) : -1;

                    if (index !== -1) {
                        that.defocusItem(liActive);
                    }

                    if (e.which === keyCodes.ARROW_UP) {
                        // up
                        if (index !== -1) index--;
                        if (index + position0 < 0) index += $items.length;

                        if (!that.selectpicker.view.canHighlight[index + position0]) {
                            index =
                                that.selectpicker.view.canHighlight.slice(0, index + position0).lastIndexOf(true) -
                                position0;
                            if (index === -1) index = $items.length - 1;
                        }
                    } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) {
                        // down
                        index++;
                        if (index + position0 >= that.selectpicker.view.canHighlight.length)
                            index = that.selectpicker.view.firstHighlightIndex;

                        if (!that.selectpicker.view.canHighlight[index + position0]) {
                            index =
                                index +
                                1 +
                                that.selectpicker.view.canHighlight.slice(index + position0 + 1).indexOf(true);
                        }
                    }

                    e.preventDefault();

                    var liActiveIndex = position0 + index;

                    if (e.which === keyCodes.ARROW_UP) {
                        // up
                        // scroll to bottom and highlight last option
                        if (position0 === 0 && index === $items.length - 1) {
                            that.$menuInner[0].scrollTop = that.$menuInner[0].scrollHeight;

                            liActiveIndex = that.selectpicker.current.elements.length - 1;
                        } else {
                            activeLi = that.selectpicker.current.data[liActiveIndex];
                            offset = activeLi.position - activeLi.height;

                            updateScroll = offset < scrollTop;
                        }
                    } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) {
                        // down
                        // scroll to top and highlight first option
                        if (index === that.selectpicker.view.firstHighlightIndex) {
                            that.$menuInner[0].scrollTop = 0;

                            liActiveIndex = that.selectpicker.view.firstHighlightIndex;
                        } else {
                            activeLi = that.selectpicker.current.data[liActiveIndex];
                            offset = activeLi.position - that.sizeInfo.menuInnerHeight;

                            updateScroll = offset > scrollTop;
                        }
                    }

                    liActive = that.selectpicker.current.elements[liActiveIndex];

                    that.activeIndex = that.selectpicker.current.data[liActiveIndex].index;

                    that.focusItem(liActive);

                    that.selectpicker.view.currentActive = liActive;

                    if (updateScroll) that.$menuInner[0].scrollTop = offset;

                    if (that.options.liveSearch) {
                        that.$searchbox.trigger("focus");
                    } else {
                        $this.trigger("focus");
                    }
                } else if (
                    (!$this.is("input") && !REGEXP_TAB_OR_ESCAPE.test(e.which)) ||
                    (e.which === keyCodes.SPACE && that.selectpicker.keydown.keyHistory)
                ) {
                    var searchMatch,
                        matches = [],
                        keyHistory;

                    e.preventDefault();

                    that.selectpicker.keydown.keyHistory += keyCodeMap[e.which];

                    if (that.selectpicker.keydown.resetKeyHistory.cancel)
                        clearTimeout(that.selectpicker.keydown.resetKeyHistory.cancel);
                    that.selectpicker.keydown.resetKeyHistory.cancel =
                        that.selectpicker.keydown.resetKeyHistory.start();

                    keyHistory = that.selectpicker.keydown.keyHistory;

                    // if all letters are the same, set keyHistory to just the first character when searching
                    if (/^(.)\1+$/.test(keyHistory)) {
                        keyHistory = keyHistory.charAt(0);
                    }

                    // find matches
                    for (var i = 0; i < that.selectpicker.current.data.length; i++) {
                        var li = that.selectpicker.current.data[i],
                            hasMatch;

                        hasMatch = stringSearch(li, keyHistory, "startsWith", true);

                        if (hasMatch && that.selectpicker.view.canHighlight[i]) {
                            matches.push(li.index);
                        }
                    }

                    if (matches.length) {
                        var matchIndex = 0;

                        $items.removeClass("active").find("a").removeClass("active");

                        // either only one key has been pressed or they are all the same key
                        if (keyHistory.length === 1) {
                            matchIndex = matches.indexOf(that.activeIndex);

                            if (matchIndex === -1 || matchIndex === matches.length - 1) {
                                matchIndex = 0;
                            } else {
                                matchIndex++;
                            }
                        }

                        searchMatch = matches[matchIndex];

                        activeLi = that.selectpicker.main.data[searchMatch];

                        if (scrollTop - activeLi.position > 0) {
                            offset = activeLi.position - activeLi.height;
                            updateScroll = true;
                        } else {
                            offset = activeLi.position - that.sizeInfo.menuInnerHeight;
                            // if the option is already visible at the current scroll position, just keep it the same
                            updateScroll = activeLi.position > scrollTop + that.sizeInfo.menuInnerHeight;
                        }

                        liActive = that.selectpicker.main.elements[searchMatch];

                        that.activeIndex = matches[matchIndex];

                        that.focusItem(liActive);

                        if (liActive) liActive.firstChild.focus();

                        if (updateScroll) that.$menuInner[0].scrollTop = offset;

                        $this.trigger("focus");
                    }
                }

                // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
                if (
                    isActive &&
                    ((e.which === keyCodes.SPACE && !that.selectpicker.keydown.keyHistory) ||
                        e.which === keyCodes.ENTER ||
                        (e.which === keyCodes.TAB && that.options.selectOnTab))
                ) {
                    if (e.which !== keyCodes.SPACE) e.preventDefault();

                    if (!that.options.liveSearch || e.which !== keyCodes.SPACE) {
                        that.$menuInner.find(".active a").trigger("click", true); // retain active class
                        $this.trigger("focus");

                        if (!that.options.liveSearch) {
                            // Prevent screen from scrolling if the user hits the spacebar
                            e.preventDefault();
                            // Fixes spacebar selection of dropdown items in FF & IE
                            $(document).data("spaceSelect", true);
                        }
                    }
                }
            },

            mobile: function () {
                // ensure mobile is set to true if mobile function is called after init
                this.options.mobile = true;
                this.$element[0].classList.add("mobile-device");
            },

            refresh: function () {
                // update options if data attributes have been changed
                var config = $.extend({}, this.options, this.$element.data());
                this.options = config;

                this.checkDisabled();
                this.buildData();
                this.setStyle();
                this.render();
                this.buildList();
                this.setWidth();

                this.setSize(true);

                this.$element.trigger("refreshed" + EVENT_KEY);
            },

            hide: function () {
                this.$newElement.hide();
            },

            show: function () {
                this.$newElement.show();
            },

            remove: function () {
                this.$newElement.remove();
                this.$element.remove();
            },

            destroy: function () {
                this.$newElement.before(this.$element).remove();

                if (this.$bsContainer) {
                    this.$bsContainer.remove();
                } else {
                    this.$menu.remove();
                }

                if (this.selectpicker.view.titleOption && this.selectpicker.view.titleOption.parentNode) {
                    this.selectpicker.view.titleOption.parentNode.removeChild(this.selectpicker.view.titleOption);
                }

                this.$element.off(EVENT_KEY).removeData("selectpicker").removeClass("bs-select-hidden selectpicker");

                $(window).off(EVENT_KEY + "." + this.selectId);
            },
        };

        // SELECTPICKER PLUGIN DEFINITION
        // ==============================
        function Plugin(option) {
            // get the args of the outer function..
            var args = arguments;
            // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
            // to get lost/corrupted in android 2.3 and IE9 #715 #775
            var _option = option;

            [].shift.apply(args);

            // if the version was not set successfully
            if (!version.success) {
                // try to retreive it again
                try {
                    version.full = ($.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split(".");
                } catch (err) {
                    // fall back to use BootstrapVersion if set
                    if (Selectpicker.BootstrapVersion) {
                        version.full = Selectpicker.BootstrapVersion.split(" ")[0].split(".");
                    } else {
                        version.full = [version.major, "0", "0"];

                        console.warn(
                            "There was an issue retrieving Bootstrap's version. " +
                                "Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. " +
                                "If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.",
                            err
                        );
                    }
                }

                version.major = version.full[0];
                version.success = true;
            }

            if (version.major === "4") {
                // some defaults need to be changed if using Bootstrap 4
                // check to see if they have already been manually changed before forcing them to update
                var toUpdate = [];

                if (Selectpicker.DEFAULTS.style === classNames.BUTTONCLASS)
                    toUpdate.push({ name: "style", className: "BUTTONCLASS" });
                if (Selectpicker.DEFAULTS.iconBase === classNames.ICONBASE)
                    toUpdate.push({ name: "iconBase", className: "ICONBASE" });
                if (Selectpicker.DEFAULTS.tickIcon === classNames.TICKICON)
                    toUpdate.push({ name: "tickIcon", className: "TICKICON" });

                classNames.DIVIDER = "dropdown-divider";
                classNames.SHOW = "show";
                classNames.BUTTONCLASS = "btn-light";
                classNames.POPOVERHEADER = "popover-header";
                classNames.ICONBASE = "";
                classNames.TICKICON = "bs-ok-default";

                for (var i = 0; i < toUpdate.length; i++) {
                    var option = toUpdate[i];
                    Selectpicker.DEFAULTS[option.name] = classNames[option.className];
                }
            }

            var value;
            var chain = this.each(function () {
                var $this = $(this);
                if ($this.is("select")) {
                    var data = $this.data("selectpicker"),
                        options = typeof _option == "object" && _option;

                    if (!data) {
                        var dataAttributes = $this.data();

                        for (var dataAttr in dataAttributes) {
                            if (
                                Object.prototype.hasOwnProperty.call(dataAttributes, dataAttr) &&
                                $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1
                            ) {
                                delete dataAttributes[dataAttr];
                            }
                        }

                        var config = $.extend(
                            {},
                            Selectpicker.DEFAULTS,
                            $.fn.selectpicker.defaults || {},
                            dataAttributes,
                            options
                        );
                        config.template = $.extend(
                            {},
                            Selectpicker.DEFAULTS.template,
                            $.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {},
                            dataAttributes.template,
                            options.template
                        );
                        $this.data("selectpicker", (data = new Selectpicker(this, config)));
                    } else if (options) {
                        for (var i in options) {
                            if (Object.prototype.hasOwnProperty.call(options, i)) {
                                data.options[i] = options[i];
                            }
                        }
                    }

                    if (typeof _option == "string") {
                        if (data[_option] instanceof Function) {
                            value = data[_option].apply(data, args);
                        } else {
                            value = data.options[_option];
                        }
                    }
                }
            });

            if (typeof value !== "undefined") {
                // noinspection JSUnusedAssignment
                return value;
            } else {
                return chain;
            }
        }

        var old = $.fn.selectpicker;
        $.fn.selectpicker = Plugin;
        $.fn.selectpicker.Constructor = Selectpicker;

        // SELECTPICKER NO CONFLICT
        // ========================
        $.fn.selectpicker.noConflict = function () {
            $.fn.selectpicker = old;
            return this;
        };

        // get Bootstrap's keydown event handler for either Bootstrap 4 or Bootstrap 3
        function keydownHandler() {
            if ($.fn.dropdown) {
                // wait to define until function is called in case Bootstrap isn't loaded yet
                var bootstrapKeydown =
                    $.fn.dropdown.Constructor._dataApiKeydownHandler || $.fn.dropdown.Constructor.prototype.keydown;
                return bootstrapKeydown.apply(this, arguments);
            }
        }

        $(document)
            .off("keydown.bs.dropdown.data-api")
            .on("keydown.bs.dropdown.data-api", ':not(.bootstrap-select) > [data-toggle="dropdown"]', keydownHandler)
            .on("keydown.bs.dropdown.data-api", ":not(.bootstrap-select) > .dropdown-menu", keydownHandler)
            .on(
                "keydown" + EVENT_KEY,
                '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input',
                Selectpicker.prototype.keydown
            )
            .on(
                "focusin.modal",
                '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input',
                function (e) {
                    e.stopPropagation();
                }
            );

        // SELECTPICKER DATA-API
        // =====================
        $(window).on("load" + EVENT_KEY + ".data-api", function () {
            $(".selectpicker").each(function () {
                var $selectpicker = $(this);
                Plugin.call($selectpicker, $selectpicker.data());
            });
        });
    })(jQuery);
});

/*!
 * Bootstrap-select v1.13.18 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2020 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
    if (root === undefined && window !== undefined) root = window;
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define(["jquery"], function (a0) {
            return factory(a0);
        });
    } else if (typeof module === "object" && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(root["jQuery"]);
    } else {
        factory(root["jQuery"]);
    }
})(this, function (jQuery) {
    (function ($) {
        $.fn.selectpicker.defaults = {
            noneSelectedText: "Ничего не выбрано",
            noneResultsText: "Совпадений не найдено {0}",
            countSelectedText: "Выбрано {0} из {1}",
            maxOptionsText: [
                "Достигнут предел ({n} {var} максимум)",
                "Достигнут предел в группе ({n} {var} максимум)",
                ["шт.", "шт."],
            ],
            doneButtonText: "Закрыть",
            selectAllText: "Выбрать все",
            deselectAllText: "Отменить все",
            multipleSeparator: ", ",
            currentlySelected: "Выбрано",
            emptyTitle: "Выделите и начните печатать",
            errorText: "Невозможно получить результат",
            searchPlaceholder: "Искать...",
            statusInitialized: "Начните печатать запрос для поиска",
            statusNoResults: "Нет результатов",
            statusSearching: "Поиск...",
            statusTooShort: "Введите еще несколько символов",
        };
    })(jQuery);
});

/*
 Copyright (C) Federico Zivolo 2020
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */ (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : (e.Popper = t());
})(window, function () {
    "use strict";
    function e(e) {
        return e && "[object Function]" === {}.toString.call(e);
    }
    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = e.ownerDocument.defaultView,
            n = o.getComputedStyle(e, null);
        return t ? n[t] : n;
    }
    function o(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host;
    }
    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case "HTML":
            case "BODY":
                return e.ownerDocument.body;
            case "#document":
                return e.body;
        }
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e));
    }
    function i(e) {
        return e && e.referenceNode ? e.referenceNode : e;
    }
    function r(e) {
        return 11 === e ? re : 10 === e ? pe : re || pe;
    }
    function p(e) {
        if (!e) return document.documentElement;
        for (var o = r(10) ? document.body : null, n = e.offsetParent || null; n === o && e.nextElementSibling; )
            n = (e = e.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && "BODY" !== i && "HTML" !== i
            ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === t(n, "position")
                ? p(n)
                : n
            : e
            ? e.ownerDocument.documentElement
            : document.documentElement;
    }
    function s(e) {
        var t = e.nodeName;
        return "BODY" !== t && ("HTML" === t || p(e.firstElementChild) === e);
    }
    function d(e) {
        return null === e.parentNode ? e : d(e.parentNode);
    }
    function a(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            n = o ? e : t,
            i = o ? t : e,
            r = document.createRange();
        r.setStart(n, 0), r.setEnd(i, 0);
        var l = r.commonAncestorContainer;
        if ((e !== l && t !== l) || n.contains(i)) return s(l) ? l : p(l);
        var f = d(e);
        return f.host ? a(f.host, t) : a(e, d(t).host);
    }
    function l(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
            o = "top" === t ? "scrollTop" : "scrollLeft",
            n = e.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var i = e.ownerDocument.documentElement,
                r = e.ownerDocument.scrollingElement || i;
            return r[o];
        }
        return e[o];
    }
    function f(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            n = l(t, "top"),
            i = l(t, "left"),
            r = o ? -1 : 1;
        return (e.top += n * r), (e.bottom += n * r), (e.left += i * r), (e.right += i * r), e;
    }
    function m(e, t) {
        var o = "x" === t ? "Left" : "Top",
            n = "Left" == o ? "Right" : "Bottom";
        return parseFloat(e["border" + o + "Width"]) + parseFloat(e["border" + n + "Width"]);
    }
    function h(e, t, o, n) {
        return ee(
            t["offset" + e],
            t["scroll" + e],
            o["client" + e],
            o["offset" + e],
            o["scroll" + e],
            r(10)
                ? parseInt(o["offset" + e]) +
                      parseInt(n["margin" + ("Height" === e ? "Top" : "Left")]) +
                      parseInt(n["margin" + ("Height" === e ? "Bottom" : "Right")])
                : 0
        );
    }
    function c(e) {
        var t = e.body,
            o = e.documentElement,
            n = r(10) && getComputedStyle(o);
        return { height: h("Height", t, o, n), width: h("Width", t, o, n) };
    }
    function g(e) {
        return le({}, e, { right: e.left + e.width, bottom: e.top + e.height });
    }
    function u(e) {
        var o = {};
        try {
            if (r(10)) {
                o = e.getBoundingClientRect();
                var n = l(e, "top"),
                    i = l(e, "left");
                (o.top += n), (o.left += i), (o.bottom += n), (o.right += i);
            } else o = e.getBoundingClientRect();
        } catch (t) {}
        var p = { left: o.left, top: o.top, width: o.right - o.left, height: o.bottom - o.top },
            s = "HTML" === e.nodeName ? c(e.ownerDocument) : {},
            d = s.width || e.clientWidth || p.width,
            a = s.height || e.clientHeight || p.height,
            f = e.offsetWidth - d,
            h = e.offsetHeight - a;
        if (f || h) {
            var u = t(e);
            (f -= m(u, "x")), (h -= m(u, "y")), (p.width -= f), (p.height -= h);
        }
        return g(p);
    }
    function b(e, o) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            p = r(10),
            s = "HTML" === o.nodeName,
            d = u(e),
            a = u(o),
            l = n(e),
            m = t(o),
            h = parseFloat(m.borderTopWidth),
            c = parseFloat(m.borderLeftWidth);
        i && s && ((a.top = ee(a.top, 0)), (a.left = ee(a.left, 0)));
        var b = g({ top: d.top - a.top - h, left: d.left - a.left - c, width: d.width, height: d.height });
        if (((b.marginTop = 0), (b.marginLeft = 0), !p && s)) {
            var w = parseFloat(m.marginTop),
                y = parseFloat(m.marginLeft);
            (b.top -= h - w),
                (b.bottom -= h - w),
                (b.left -= c - y),
                (b.right -= c - y),
                (b.marginTop = w),
                (b.marginLeft = y);
        }
        return (p && !i ? o.contains(l) : o === l && "BODY" !== l.nodeName) && (b = f(b, o)), b;
    }
    function w(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = e.ownerDocument.documentElement,
            n = b(e, o),
            i = ee(o.clientWidth, window.innerWidth || 0),
            r = ee(o.clientHeight, window.innerHeight || 0),
            p = t ? 0 : l(o),
            s = t ? 0 : l(o, "left"),
            d = { top: p - n.top + n.marginTop, left: s - n.left + n.marginLeft, width: i, height: r };
        return g(d);
    }
    function y(e) {
        var n = e.nodeName;
        if ("BODY" === n || "HTML" === n) return !1;
        if ("fixed" === t(e, "position")) return !0;
        var i = o(e);
        return !!i && y(i);
    }
    function E(e) {
        if (!e || !e.parentElement || r()) return document.documentElement;
        for (var o = e.parentElement; o && "none" === t(o, "transform"); ) o = o.parentElement;
        return o || document.documentElement;
    }
    function v(e, t, r, p) {
        var s = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            d = { top: 0, left: 0 },
            l = s ? E(e) : a(e, i(t));
        if ("viewport" === p) d = w(l, s);
        else {
            var f;
            "scrollParent" === p
                ? ((f = n(o(t))), "BODY" === f.nodeName && (f = e.ownerDocument.documentElement))
                : "window" === p
                ? (f = e.ownerDocument.documentElement)
                : (f = p);
            var m = b(f, l, s);
            if ("HTML" === f.nodeName && !y(l)) {
                var h = c(e.ownerDocument),
                    g = h.height,
                    u = h.width;
                (d.top += m.top - m.marginTop),
                    (d.bottom = g + m.top),
                    (d.left += m.left - m.marginLeft),
                    (d.right = u + m.left);
            } else d = m;
        }
        r = r || 0;
        var v = "number" == typeof r;
        return (
            (d.left += v ? r : r.left || 0),
            (d.top += v ? r : r.top || 0),
            (d.right -= v ? r : r.right || 0),
            (d.bottom -= v ? r : r.bottom || 0),
            d
        );
    }
    function x(e) {
        var t = e.width,
            o = e.height;
        return t * o;
    }
    function O(e, t, o, n, i) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto")) return e;
        var p = v(o, n, r, i),
            s = {
                top: { width: p.width, height: t.top - p.top },
                right: { width: p.right - t.right, height: p.height },
                bottom: { width: p.width, height: p.bottom - t.bottom },
                left: { width: t.left - p.left, height: p.height },
            },
            d = Object.keys(s)
                .map(function (e) {
                    return le({ key: e }, s[e], { area: x(s[e]) });
                })
                .sort(function (e, t) {
                    return t.area - e.area;
                }),
            a = d.filter(function (e) {
                var t = e.width,
                    n = e.height;
                return t >= o.clientWidth && n >= o.clientHeight;
            }),
            l = 0 < a.length ? a[0].key : d[0].key,
            f = e.split("-")[1];
        return l + (f ? "-" + f : "");
    }
    function L(e, t, o) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
            r = n ? E(t) : a(t, i(o));
        return b(o, r, n);
    }
    function S(e) {
        var t = e.ownerDocument.defaultView,
            o = t.getComputedStyle(e),
            n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
            i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
            r = { width: e.offsetWidth + i, height: e.offsetHeight + n };
        return r;
    }
    function T(e) {
        var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
        return e.replace(/left|right|bottom|top/g, function (e) {
            return t[e];
        });
    }
    function C(e, t, o) {
        o = o.split("-")[0];
        var n = S(e),
            i = { width: n.width, height: n.height },
            r = -1 !== ["right", "left"].indexOf(o),
            p = r ? "top" : "left",
            s = r ? "left" : "top",
            d = r ? "height" : "width",
            a = r ? "width" : "height";
        return (i[p] = t[p] + t[d] / 2 - n[d] / 2), (i[s] = o === s ? t[s] - n[a] : t[T(s)]), i;
    }
    function D(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0];
    }
    function N(e, t, o) {
        if (Array.prototype.findIndex)
            return e.findIndex(function (e) {
                return e[t] === o;
            });
        var n = D(e, function (e) {
            return e[t] === o;
        });
        return e.indexOf(n);
    }
    function P(t, o, n) {
        var i = void 0 === n ? t : t.slice(0, N(t, "name", n));
        return (
            i.forEach(function (t) {
                t["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var n = t["function"] || t.fn;
                t.enabled &&
                    e(n) &&
                    ((o.offsets.popper = g(o.offsets.popper)),
                    (o.offsets.reference = g(o.offsets.reference)),
                    (o = n(o, t)));
            }),
            o
        );
    }
    function k() {
        if (!this.state.isDestroyed) {
            var e = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} };
            (e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed)),
                (e.placement = O(
                    this.options.placement,
                    e.offsets.reference,
                    this.popper,
                    this.reference,
                    this.options.modifiers.flip.boundariesElement,
                    this.options.modifiers.flip.padding
                )),
                (e.originalPlacement = e.placement),
                (e.positionFixed = this.options.positionFixed),
                (e.offsets.popper = C(this.popper, e.offsets.reference, e.placement)),
                (e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute"),
                (e = P(this.modifiers, e)),
                this.state.isCreated
                    ? this.options.onUpdate(e)
                    : ((this.state.isCreated = !0), this.options.onCreate(e));
        }
    }
    function W(e, t) {
        return e.some(function (e) {
            var o = e.name,
                n = e.enabled;
            return n && o === t;
        });
    }
    function B(e) {
        for (
            var t = [!1, "ms", "Webkit", "Moz", "O"], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0;
            n < t.length;
            n++
        ) {
            var i = t[n],
                r = i ? "" + i + o : e;
            if ("undefined" != typeof document.body.style[r]) return r;
        }
        return null;
    }
    function H() {
        return (
            (this.state.isDestroyed = !0),
            W(this.modifiers, "applyStyle") &&
                (this.popper.removeAttribute("x-placement"),
                (this.popper.style.position = ""),
                (this.popper.style.top = ""),
                (this.popper.style.left = ""),
                (this.popper.style.right = ""),
                (this.popper.style.bottom = ""),
                (this.popper.style.willChange = ""),
                (this.popper.style[B("transform")] = "")),
            this.disableEventListeners(),
            this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
            this
        );
    }
    function A(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window;
    }
    function M(e, t, o, i) {
        var r = "BODY" === e.nodeName,
            p = r ? e.ownerDocument.defaultView : e;
        p.addEventListener(t, o, { passive: !0 }), r || M(n(p.parentNode), t, o, i), i.push(p);
    }
    function F(e, t, o, i) {
        (o.updateBound = i), A(e).addEventListener("resize", o.updateBound, { passive: !0 });
        var r = n(e);
        return M(r, "scroll", o.updateBound, o.scrollParents), (o.scrollElement = r), (o.eventsEnabled = !0), o;
    }
    function I() {
        this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate));
    }
    function R(e, t) {
        return (
            A(e).removeEventListener("resize", t.updateBound),
            t.scrollParents.forEach(function (e) {
                e.removeEventListener("scroll", t.updateBound);
            }),
            (t.updateBound = null),
            (t.scrollParents = []),
            (t.scrollElement = null),
            (t.eventsEnabled = !1),
            t
        );
    }
    function U() {
        this.state.eventsEnabled &&
            (cancelAnimationFrame(this.scheduleUpdate), (this.state = R(this.reference, this.state)));
    }
    function Y(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
    }
    function V(e, t) {
        Object.keys(t).forEach(function (o) {
            var n = "";
            -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(o) && Y(t[o]) && (n = "px"),
                (e.style[o] = t[o] + n);
        });
    }
    function j(e, t) {
        Object.keys(t).forEach(function (o) {
            var n = t[o];
            !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
        });
    }
    function q(e, t) {
        var o = e.offsets,
            n = o.popper,
            i = o.reference,
            r = $,
            p = function (e) {
                return e;
            },
            s = r(i.width),
            d = r(n.width),
            a = -1 !== ["left", "right"].indexOf(e.placement),
            l = -1 !== e.placement.indexOf("-"),
            f = t ? (a || l || s % 2 == d % 2 ? r : Z) : p,
            m = t ? r : p;
        return {
            left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left),
            top: m(n.top),
            bottom: m(n.bottom),
            right: f(n.right),
        };
    }
    function K(e, t, o) {
        var n = D(e, function (e) {
                var o = e.name;
                return o === t;
            }),
            i =
                !!n &&
                e.some(function (e) {
                    return e.name === o && e.enabled && e.order < n.order;
                });
        if (!i) {
            var r = "`" + t + "`";
            console.warn(
                "`" +
                    o +
                    "`" +
                    " modifier is required by " +
                    r +
                    " modifier in order to work, be sure to include it before " +
                    r +
                    "!"
            );
        }
        return i;
    }
    function z(e) {
        return "end" === e ? "start" : "start" === e ? "end" : e;
    }
    function G(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = he.indexOf(e),
            n = he.slice(o + 1).concat(he.slice(0, o));
        return t ? n.reverse() : n;
    }
    function _(e, t, o, n) {
        var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +i[1],
            p = i[2];
        if (!r) return e;
        if (0 === p.indexOf("%")) {
            var s;
            switch (p) {
                case "%p":
                    s = o;
                    break;
                case "%":
                case "%r":
                default:
                    s = n;
            }
            var d = g(s);
            return (d[t] / 100) * r;
        }
        if ("vh" === p || "vw" === p) {
            var a;
            return (
                (a =
                    "vh" === p
                        ? ee(document.documentElement.clientHeight, window.innerHeight || 0)
                        : ee(document.documentElement.clientWidth, window.innerWidth || 0)),
                (a / 100) * r
            );
        }
        return r;
    }
    function X(e, t, o, n) {
        var i = [0, 0],
            r = -1 !== ["right", "left"].indexOf(n),
            p = e.split(/(\+|\-)/).map(function (e) {
                return e.trim();
            }),
            s = p.indexOf(
                D(p, function (e) {
                    return -1 !== e.search(/,|\s/);
                })
            );
        p[s] &&
            -1 === p[s].indexOf(",") &&
            console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var d = /\s*,\s*|\s+/,
            a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return (
            (a = a.map(function (e, n) {
                var i = (1 === n ? !r : r) ? "height" : "width",
                    p = !1;
                return e
                    .reduce(function (e, t) {
                        return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
                            ? ((e[e.length - 1] = t), (p = !0), e)
                            : p
                            ? ((e[e.length - 1] += t), (p = !1), e)
                            : e.concat(t);
                    }, [])
                    .map(function (e) {
                        return _(e, i, t, o);
                    });
            })),
            a.forEach(function (e, t) {
                e.forEach(function (o, n) {
                    Y(o) && (i[t] += o * ("-" === e[n - 1] ? -1 : 1));
                });
            }),
            i
        );
    }
    function J(e, t) {
        var o,
            n = t.offset,
            i = e.placement,
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = i.split("-")[0];
        return (
            (o = Y(+n) ? [+n, 0] : X(n, p, s, d)),
            "left" === d
                ? ((p.top += o[0]), (p.left -= o[1]))
                : "right" === d
                ? ((p.top += o[0]), (p.left += o[1]))
                : "top" === d
                ? ((p.left += o[0]), (p.top -= o[1]))
                : "bottom" === d && ((p.left += o[0]), (p.top += o[1])),
            (e.popper = p),
            e
        );
    }
    var Q = Math.min,
        Z = Math.floor,
        $ = Math.round,
        ee = Math.max,
        te = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
        oe = (function () {
            for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
                if (te && 0 <= navigator.userAgent.indexOf(e[t])) return 1;
            return 0;
        })(),
        ne = te && window.Promise,
        ie = ne
            ? function (e) {
                  var t = !1;
                  return function () {
                      t ||
                          ((t = !0),
                          window.Promise.resolve().then(function () {
                              (t = !1), e();
                          }));
                  };
              }
            : function (e) {
                  var t = !1;
                  return function () {
                      t ||
                          ((t = !0),
                          setTimeout(function () {
                              (t = !1), e();
                          }, oe));
                  };
              },
        re = te && !!(window.MSInputMethodContext && document.documentMode),
        pe = te && /MSIE 10/.test(navigator.userAgent),
        se = function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        },
        de = (function () {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++)
                    (o = t[n]),
                        (o.enumerable = o.enumerable || !1),
                        (o.configurable = !0),
                        "value" in o && (o.writable = !0),
                        Object.defineProperty(e, o.key, o);
            }
            return function (t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t;
            };
        })(),
        ae = function (e, t, o) {
            return (
                t in e
                    ? Object.defineProperty(e, t, { value: o, enumerable: !0, configurable: !0, writable: !0 })
                    : (e[t] = o),
                e
            );
        },
        le =
            Object.assign ||
            function (e) {
                for (var t, o = 1; o < arguments.length; o++)
                    for (var n in ((t = arguments[o]), t)) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e;
            },
        fe = te && /Firefox/i.test(navigator.userAgent),
        me = [
            "auto-start",
            "auto",
            "auto-end",
            "top-start",
            "top",
            "top-end",
            "right-start",
            "right",
            "right-end",
            "bottom-end",
            "bottom",
            "bottom-start",
            "left-end",
            "left",
            "left-start",
        ],
        he = me.slice(3),
        ce = { FLIP: "flip", CLOCKWISE: "clockwise", COUNTERCLOCKWISE: "counterclockwise" },
        ge = (function () {
            function t(o, n) {
                var i = this,
                    r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                se(this, t),
                    (this.scheduleUpdate = function () {
                        return requestAnimationFrame(i.update);
                    }),
                    (this.update = ie(this.update.bind(this))),
                    (this.options = le({}, t.Defaults, r)),
                    (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
                    (this.reference = o && o.jquery ? o[0] : o),
                    (this.popper = n && n.jquery ? n[0] : n),
                    (this.options.modifiers = {}),
                    Object.keys(le({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
                        i.options.modifiers[e] = le(
                            {},
                            t.Defaults.modifiers[e] || {},
                            r.modifiers ? r.modifiers[e] : {}
                        );
                    }),
                    (this.modifiers = Object.keys(this.options.modifiers)
                        .map(function (e) {
                            return le({ name: e }, i.options.modifiers[e]);
                        })
                        .sort(function (e, t) {
                            return e.order - t.order;
                        })),
                    this.modifiers.forEach(function (t) {
                        t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state);
                    }),
                    this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(), (this.state.eventsEnabled = p);
            }
            return (
                de(t, [
                    {
                        key: "update",
                        value: function () {
                            return k.call(this);
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            return H.call(this);
                        },
                    },
                    {
                        key: "enableEventListeners",
                        value: function () {
                            return I.call(this);
                        },
                    },
                    {
                        key: "disableEventListeners",
                        value: function () {
                            return U.call(this);
                        },
                    },
                ]),
                t
            );
        })();
    return (
        (ge.Utils = ("undefined" == typeof window ? global : window).PopperUtils),
        (ge.placements = me),
        (ge.Defaults = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function () {},
            onUpdate: function () {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function (e) {
                        var t = e.placement,
                            o = t.split("-")[0],
                            n = t.split("-")[1];
                        if (n) {
                            var i = e.offsets,
                                r = i.reference,
                                p = i.popper,
                                s = -1 !== ["bottom", "top"].indexOf(o),
                                d = s ? "left" : "top",
                                a = s ? "width" : "height",
                                l = { start: ae({}, d, r[d]), end: ae({}, d, r[d] + r[a] - p[a]) };
                            e.offsets.popper = le({}, p, l[n]);
                        }
                        return e;
                    },
                },
                offset: { order: 200, enabled: !0, fn: J, offset: 0 },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function (e, t) {
                        var o = t.boundariesElement || p(e.instance.popper);
                        e.instance.reference === o && (o = p(o));
                        var n = B("transform"),
                            i = e.instance.popper.style,
                            r = i.top,
                            s = i.left,
                            d = i[n];
                        (i.top = ""), (i.left = ""), (i[n] = "");
                        var a = v(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
                        (i.top = r), (i.left = s), (i[n] = d), (t.boundaries = a);
                        var l = t.priority,
                            f = e.offsets.popper,
                            m = {
                                primary: function (e) {
                                    var o = f[e];
                                    return f[e] < a[e] && !t.escapeWithReference && (o = ee(f[e], a[e])), ae({}, e, o);
                                },
                                secondary: function (e) {
                                    var o = "right" === e ? "left" : "top",
                                        n = f[o];
                                    return (
                                        f[e] > a[e] &&
                                            !t.escapeWithReference &&
                                            (n = Q(f[o], a[e] - ("right" === e ? f.width : f.height))),
                                        ae({}, o, n)
                                    );
                                },
                            };
                        return (
                            l.forEach(function (e) {
                                var t = -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                                f = le({}, f, m[t](e));
                            }),
                            (e.offsets.popper = f),
                            e
                        );
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent",
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function (e) {
                        var t = e.offsets,
                            o = t.popper,
                            n = t.reference,
                            i = e.placement.split("-")[0],
                            r = Z,
                            p = -1 !== ["top", "bottom"].indexOf(i),
                            s = p ? "right" : "bottom",
                            d = p ? "left" : "top",
                            a = p ? "width" : "height";
                        return (
                            o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]),
                            o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])),
                            e
                        );
                    },
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function (e, o) {
                        var n;
                        if (!K(e.instance.modifiers, "arrow", "keepTogether")) return e;
                        var i = o.element;
                        if ("string" == typeof i) {
                            if (((i = e.instance.popper.querySelector(i)), !i)) return e;
                        } else if (!e.instance.popper.contains(i))
                            return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                        var r = e.placement.split("-")[0],
                            p = e.offsets,
                            s = p.popper,
                            d = p.reference,
                            a = -1 !== ["left", "right"].indexOf(r),
                            l = a ? "height" : "width",
                            f = a ? "Top" : "Left",
                            m = f.toLowerCase(),
                            h = a ? "left" : "top",
                            c = a ? "bottom" : "right",
                            u = S(i)[l];
                        d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)),
                            d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]),
                            (e.offsets.popper = g(e.offsets.popper));
                        var b = d[m] + d[l] / 2 - u / 2,
                            w = t(e.instance.popper),
                            y = parseFloat(w["margin" + f]),
                            E = parseFloat(w["border" + f + "Width"]),
                            v = b - e.offsets.popper[m] - y - E;
                        return (
                            (v = ee(Q(s[l] - u, v), 0)),
                            (e.arrowElement = i),
                            (e.offsets.arrow = ((n = {}), ae(n, m, $(v)), ae(n, h, ""), n)),
                            e
                        );
                    },
                    element: "[x-arrow]",
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function (e, t) {
                        if (W(e.instance.modifiers, "inner")) return e;
                        if (e.flipped && e.placement === e.originalPlacement) return e;
                        var o = v(
                                e.instance.popper,
                                e.instance.reference,
                                t.padding,
                                t.boundariesElement,
                                e.positionFixed
                            ),
                            n = e.placement.split("-")[0],
                            i = T(n),
                            r = e.placement.split("-")[1] || "",
                            p = [];
                        switch (t.behavior) {
                            case ce.FLIP:
                                p = [n, i];
                                break;
                            case ce.CLOCKWISE:
                                p = G(n);
                                break;
                            case ce.COUNTERCLOCKWISE:
                                p = G(n, !0);
                                break;
                            default:
                                p = t.behavior;
                        }
                        return (
                            p.forEach(function (s, d) {
                                if (n !== s || p.length === d + 1) return e;
                                (n = e.placement.split("-")[0]), (i = T(n));
                                var a = e.offsets.popper,
                                    l = e.offsets.reference,
                                    f = Z,
                                    m =
                                        ("left" === n && f(a.right) > f(l.left)) ||
                                        ("right" === n && f(a.left) < f(l.right)) ||
                                        ("top" === n && f(a.bottom) > f(l.top)) ||
                                        ("bottom" === n && f(a.top) < f(l.bottom)),
                                    h = f(a.left) < f(o.left),
                                    c = f(a.right) > f(o.right),
                                    g = f(a.top) < f(o.top),
                                    u = f(a.bottom) > f(o.bottom),
                                    b =
                                        ("left" === n && h) ||
                                        ("right" === n && c) ||
                                        ("top" === n && g) ||
                                        ("bottom" === n && u),
                                    w = -1 !== ["top", "bottom"].indexOf(n),
                                    y =
                                        !!t.flipVariations &&
                                        ((w && "start" === r && h) ||
                                            (w && "end" === r && c) ||
                                            (!w && "start" === r && g) ||
                                            (!w && "end" === r && u)),
                                    E =
                                        !!t.flipVariationsByContent &&
                                        ((w && "start" === r && c) ||
                                            (w && "end" === r && h) ||
                                            (!w && "start" === r && u) ||
                                            (!w && "end" === r && g)),
                                    v = y || E;
                                (m || b || v) &&
                                    ((e.flipped = !0),
                                    (m || b) && (n = p[d + 1]),
                                    v && (r = z(r)),
                                    (e.placement = n + (r ? "-" + r : "")),
                                    (e.offsets.popper = le(
                                        {},
                                        e.offsets.popper,
                                        C(e.instance.popper, e.offsets.reference, e.placement)
                                    )),
                                    (e = P(e.instance.modifiers, e, "flip")));
                            }),
                            e
                        );
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                    flipVariations: !1,
                    flipVariationsByContent: !1,
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function (e) {
                        var t = e.placement,
                            o = t.split("-")[0],
                            n = e.offsets,
                            i = n.popper,
                            r = n.reference,
                            p = -1 !== ["left", "right"].indexOf(o),
                            s = -1 === ["top", "left"].indexOf(o);
                        return (
                            (i[p ? "left" : "top"] = r[o] - (s ? i[p ? "width" : "height"] : 0)),
                            (e.placement = T(t)),
                            (e.offsets.popper = g(i)),
                            e
                        );
                    },
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function (e) {
                        if (!K(e.instance.modifiers, "hide", "preventOverflow")) return e;
                        var t = e.offsets.reference,
                            o = D(e.instance.modifiers, function (e) {
                                return "preventOverflow" === e.name;
                            }).boundaries;
                        if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                            if (!0 === e.hide) return e;
                            (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
                        } else {
                            if (!1 === e.hide) return e;
                            (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
                        }
                        return e;
                    },
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function (e, t) {
                        var o = t.x,
                            n = t.y,
                            i = e.offsets.popper,
                            r = D(e.instance.modifiers, function (e) {
                                return "applyStyle" === e.name;
                            }).gpuAcceleration;
                        void 0 !== r &&
                            console.warn(
                                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                            );
                        var s,
                            d,
                            a = void 0 === r ? t.gpuAcceleration : r,
                            l = p(e.instance.popper),
                            f = u(l),
                            m = { position: i.position },
                            h = q(e, 2 > window.devicePixelRatio || !fe),
                            c = "bottom" === o ? "top" : "bottom",
                            g = "right" === n ? "left" : "right",
                            b = B("transform");
                        if (
                            ((d =
                                "bottom" == c
                                    ? "HTML" === l.nodeName
                                        ? -l.clientHeight + h.bottom
                                        : -f.height + h.bottom
                                    : h.top),
                            (s =
                                "right" == g
                                    ? "HTML" === l.nodeName
                                        ? -l.clientWidth + h.right
                                        : -f.width + h.right
                                    : h.left),
                            a && b)
                        )
                            (m[b] = "translate3d(" + s + "px, " + d + "px, 0)"),
                                (m[c] = 0),
                                (m[g] = 0),
                                (m.willChange = "transform");
                        else {
                            var w = "bottom" == c ? -1 : 1,
                                y = "right" == g ? -1 : 1;
                            (m[c] = d * w), (m[g] = s * y), (m.willChange = c + ", " + g);
                        }
                        var E = { "x-placement": e.placement };
                        return (
                            (e.attributes = le({}, E, e.attributes)),
                            (e.styles = le({}, m, e.styles)),
                            (e.arrowStyles = le({}, e.offsets.arrow, e.arrowStyles)),
                            e
                        );
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right",
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function (e) {
                        return (
                            V(e.instance.popper, e.styles),
                            j(e.instance.popper, e.attributes),
                            e.arrowElement && Object.keys(e.arrowStyles).length && V(e.arrowElement, e.arrowStyles),
                            e
                        );
                    },
                    onLoad: function (e, t, o, n, i) {
                        var r = L(i, t, e, o.positionFixed),
                            p = O(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                        return (
                            t.setAttribute("x-placement", p),
                            V(t, { position: o.positionFixed ? "fixed" : "absolute" }),
                            o
                        );
                    },
                    gpuAcceleration: void 0,
                },
            },
        }),
        ge
    );
});

/*!
 * Bootstrap dropdown.js v4.5.2 (https://getbootstrap.com/)
 * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? (module.exports = factory(require("../../scripts/jquery"), window.Popper, require("../bootstrap/utils")))
        : typeof define === "function" && define.amd
        ? define(["jquery", "popper.js", "./util.js"], factory)
        : ((global = typeof globalThis !== "undefined" ? globalThis : global || self),
          (global.Dropdown = factory(global.jQuery, global.Popper, global.Util)));
})(this, function ($, Popper, Util) {
    "use strict";

    $ = $ && Object.prototype.hasOwnProperty.call($, "default") ? $["default"] : $;
    Popper = Popper && Object.prototype.hasOwnProperty.call(Popper, "default") ? Popper["default"] : Popper;
    Util = Util && Object.prototype.hasOwnProperty.call(Util, "default") ? Util["default"] : Util;

    function _extends() {
        _extends =
            Object.assign ||
            function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
                return target;
            };
        return _extends.apply(this, arguments);
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = "dropdown";
    var VERSION = "4.5.2";
    var DATA_KEY = "bs.dropdown";
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = ".data-api";
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var EVENT_HIDE = "hide" + EVENT_KEY;
    var EVENT_HIDDEN = "hidden" + EVENT_KEY;
    var EVENT_SHOW = "show" + EVENT_KEY;
    var EVENT_SHOWN = "shown" + EVENT_KEY;
    var EVENT_CLICK = "click" + EVENT_KEY;
    var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
    var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY + DATA_API_KEY;
    var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY + DATA_API_KEY;
    var CLASS_NAME_DISABLED = "disabled";
    var CLASS_NAME_SHOW = "show";
    var CLASS_NAME_DROPUP = "dropup";
    var CLASS_NAME_DROPRIGHT = "dropright";
    var CLASS_NAME_DROPLEFT = "dropleft";
    var CLASS_NAME_MENURIGHT = "dropdown-menu-right";
    var CLASS_NAME_POSITION_STATIC = "position-static";
    var SELECTOR_DATA_TOGGLE = '[data-toggle="dropdown"]';
    var SELECTOR_FORM_CHILD = ".dropdown form";
    var SELECTOR_MENU = ".dropdown-menu";
    var SELECTOR_NAVBAR_NAV = ".navbar-nav";
    var SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
    var PLACEMENT_TOP = "top-start";
    var PLACEMENT_TOPEND = "top-end";
    var PLACEMENT_BOTTOM = "bottom-start";
    var PLACEMENT_BOTTOMEND = "bottom-end";
    var PLACEMENT_RIGHT = "right-start";
    var PLACEMENT_LEFT = "left-start";
    var Default = {
        offset: 0,
        flip: true,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic",
        popperConfig: null,
    };
    var DefaultType = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string",
        popperConfig: "(null|object)",
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Dropdown = /*#__PURE__*/ (function () {
        function Dropdown(element, config) {
            this._element = element;
            this._popper = null;
            this._config = this._getConfig(config);
            this._menu = this._getMenuElement();
            this._inNavbar = this._detectNavbar();

            this._addEventListeners();
        } // Getters

        var _proto = Dropdown.prototype;

        // Public
        _proto.toggle = function toggle() {
            if (this._element.disabled || $(this._element).hasClass(CLASS_NAME_DISABLED)) {
                return;
            }

            var isActive = $(this._menu).hasClass(CLASS_NAME_SHOW);

            Dropdown._clearMenus();

            if (isActive) {
                return;
            }

            this.show(true);
        };

        _proto.show = function show(usePopper) {
            if (usePopper === void 0) {
                usePopper = false;
            }

            if (
                this._element.disabled ||
                $(this._element).hasClass(CLASS_NAME_DISABLED) ||
                $(this._menu).hasClass(CLASS_NAME_SHOW)
            ) {
                return;
            }

            var relatedTarget = {
                relatedTarget: this._element,
            };
            var showEvent = $.Event(EVENT_SHOW, relatedTarget);

            var parent = Dropdown._getParentFromElement(this._element);

            $(parent).trigger(showEvent);

            if (showEvent.isDefaultPrevented()) {
                return;
            } // Disable totally Popper.js for Dropdown in Navbar

            if (!this._inNavbar && usePopper) {
                /**
                 * Check for Popper dependency
                 * Popper - https://popper.js.org
                 */
                if (typeof Popper === "undefined") {
                    throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                }

                var referenceElement = this._element;

                if (this._config.reference === "parent") {
                    referenceElement = parent;
                } else if (Util.isElement(this._config.reference)) {
                    referenceElement = this._config.reference; // Check if it's jQuery element

                    if (typeof this._config.reference.jquery !== "undefined") {
                        referenceElement = this._config.reference[0];
                    }
                } // If boundary is not `scrollParent`, then set position to `static`
                // to allow the menu to "escape" the scroll parent's boundaries
                // https://github.com/twbs/bootstrap/issues/24251

                if (this._config.boundary !== "scrollParent") {
                    $(parent).addClass(CLASS_NAME_POSITION_STATIC);
                }

                this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
            } // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

            if ("ontouchstart" in document.documentElement && $(parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
                $(document.body).children().on("mouseover", null, $.noop);
            }

            this._element.focus();

            this._element.setAttribute("aria-expanded", true);

            $(this._menu).toggleClass(CLASS_NAME_SHOW);
            $(parent).toggleClass(CLASS_NAME_SHOW).trigger($.Event(EVENT_SHOWN, relatedTarget));
        };

        _proto.hide = function hide() {
            if (
                this._element.disabled ||
                $(this._element).hasClass(CLASS_NAME_DISABLED) ||
                !$(this._menu).hasClass(CLASS_NAME_SHOW)
            ) {
                return;
            }

            var relatedTarget = {
                relatedTarget: this._element,
            };
            var hideEvent = $.Event(EVENT_HIDE, relatedTarget);

            var parent = Dropdown._getParentFromElement(this._element);

            $(parent).trigger(hideEvent);

            if (hideEvent.isDefaultPrevented()) {
                return;
            }

            if (this._popper) {
                this._popper.destroy();
            }

            $(this._menu).toggleClass(CLASS_NAME_SHOW);
            $(parent).toggleClass(CLASS_NAME_SHOW).trigger($.Event(EVENT_HIDDEN, relatedTarget));
        };

        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY);
            $(this._element).off(EVENT_KEY);
            this._element = null;
            this._menu = null;

            if (this._popper !== null) {
                this._popper.destroy();

                this._popper = null;
            }
        };

        _proto.update = function update() {
            this._inNavbar = this._detectNavbar();

            if (this._popper !== null) {
                this._popper.scheduleUpdate();
            }
        }; // Private

        _proto._addEventListeners = function _addEventListeners() {
            var _this = this;

            $(this._element).on(EVENT_CLICK, function (event) {
                event.preventDefault();
                event.stopPropagation();

                _this.toggle();
            });
        };

        _proto._getConfig = function _getConfig(config) {
            config = _extends({}, this.constructor.Default, $(this._element).data(), config);
            Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
            return config;
        };

        _proto._getMenuElement = function _getMenuElement() {
            if (!this._menu) {
                var parent = Dropdown._getParentFromElement(this._element);

                if (parent) {
                    this._menu = parent.querySelector(SELECTOR_MENU);
                }
            }

            return this._menu;
        };

        _proto._getPlacement = function _getPlacement() {
            var $parentDropdown = $(this._element.parentNode);
            var placement = PLACEMENT_BOTTOM; // Handle dropup

            if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
                placement = $(this._menu).hasClass(CLASS_NAME_MENURIGHT) ? PLACEMENT_TOPEND : PLACEMENT_TOP;
            } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
                placement = PLACEMENT_RIGHT;
            } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
                placement = PLACEMENT_LEFT;
            } else if ($(this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
                placement = PLACEMENT_BOTTOMEND;
            }

            return placement;
        };

        _proto._detectNavbar = function _detectNavbar() {
            return $(this._element).closest(".navbar").length > 0;
        };

        _proto._getOffset = function _getOffset() {
            var _this2 = this;

            var offset = {};

            if (typeof this._config.offset === "function") {
                offset.fn = function (data) {
                    data.offsets = _extends(
                        {},
                        data.offsets,
                        _this2._config.offset(data.offsets, _this2._element) || {}
                    );
                    return data;
                };
            } else {
                offset.offset = this._config.offset;
            }

            return offset;
        };

        _proto._getPopperConfig = function _getPopperConfig() {
            var popperConfig = {
                placement: this._getPlacement(),
                modifiers: {
                    offset: this._getOffset(),
                    flip: {
                        enabled: this._config.flip,
                    },
                    preventOverflow: {
                        boundariesElement: this._config.boundary,
                    },
                },
            }; // Disable Popper.js if we have a static display

            if (this._config.display === "static") {
                popperConfig.modifiers.applyStyle = {
                    enabled: false,
                };
            }

            return _extends({}, popperConfig, this._config.popperConfig);
        }; // Static

        Dropdown._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY);

                var _config = typeof config === "object" ? config : null;

                if (!data) {
                    data = new Dropdown(this, _config);
                    $(this).data(DATA_KEY, data);
                }

                if (typeof config === "string") {
                    if (typeof data[config] === "undefined") {
                        throw new TypeError('No method named "' + config + '"');
                    }

                    data[config]();
                }
            });
        };

        Dropdown._clearMenus = function _clearMenus(event) {
            if (
                event &&
                (event.which === RIGHT_MOUSE_BUTTON_WHICH || (event.type === "keyup" && event.which !== TAB_KEYCODE))
            ) {
                return;
            }

            var toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));

            for (var i = 0, len = toggles.length; i < len; i++) {
                var parent = Dropdown._getParentFromElement(toggles[i]);

                var context = $(toggles[i]).data(DATA_KEY);
                var relatedTarget = {
                    relatedTarget: toggles[i],
                };

                if (event && event.type === "click") {
                    relatedTarget.clickEvent = event;
                }

                if (!context) {
                    continue;
                }

                var dropdownMenu = context._menu;

                if (!$(parent).hasClass(CLASS_NAME_SHOW)) {
                    continue;
                }

                if (
                    event &&
                    ((event.type === "click" && /input|textarea/i.test(event.target.tagName)) ||
                        (event.type === "keyup" && event.which === TAB_KEYCODE)) &&
                    $.contains(parent, event.target)
                ) {
                    continue;
                }

                if (
                    event &&
                    event.type === "click" &&
                    /button/i.test(event.target.tagName) &&
                    !/dropdown/i.test($(event.target).attr("class"))
                ) {
                    continue;
                }

                var hideEvent = $.Event(EVENT_HIDE, relatedTarget);
                $(parent).trigger(hideEvent);

                if (hideEvent.isDefaultPrevented()) {
                    continue;
                } // If this is a touch-enabled device we remove the extra
                // empty mouseover listeners we added for iOS support

                if ("ontouchstart" in document.documentElement) {
                    $(document.body).children().off("mouseover", null, $.noop);
                }

                toggles[i].setAttribute("aria-expanded", "false");

                if (context._popper) {
                    context._popper.destroy();
                }

                $(dropdownMenu).removeClass(CLASS_NAME_SHOW);
                $(parent).removeClass(CLASS_NAME_SHOW).trigger($.Event(EVENT_HIDDEN, relatedTarget));
            }
        };

        Dropdown._getParentFromElement = function _getParentFromElement(element) {
            var parent;
            var selector = Util.getSelectorFromElement(element);

            if (selector) {
                parent = document.querySelector(selector);
            }

            return parent || element.parentNode;
        }; // eslint-disable-next-line complexity

        Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
            // If not input/textarea:
            //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
            // If input/textarea:
            //  - If space key => not a dropdown command
            //  - If key is other than escape
            //    - If key is not up or down => not a dropdown command
            //    - If trigger inside the menu => not a dropdown command
            if (
                /input|textarea/i.test(event.target.tagName)
                    ? event.which === SPACE_KEYCODE ||
                      (event.which !== ESCAPE_KEYCODE &&
                          ((event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE) ||
                              $(event.target).closest(SELECTOR_MENU).length))
                    : !REGEXP_KEYDOWN.test(event.which)
            ) {
                return;
            }

            if (this.disabled || $(this).hasClass(CLASS_NAME_DISABLED)) {
                return;
            }

            var parent = Dropdown._getParentFromElement(this);

            var isActive = $(parent).hasClass(CLASS_NAME_SHOW);

            if (!isActive && event.which === ESCAPE_KEYCODE) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            if (!isActive || (isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE))) {
                if (event.which === ESCAPE_KEYCODE) {
                    $(parent.querySelector(SELECTOR_DATA_TOGGLE)).trigger("focus");
                }

                $(this).trigger("click");
                return;
            }

            var items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS)).filter(function (item) {
                return $(item).is(":visible");
            });

            if (items.length === 0) {
                return;
            }

            var index = items.indexOf(event.target);

            if (event.which === ARROW_UP_KEYCODE && index > 0) {
                // Up
                index--;
            }

            if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
                // Down
                index++;
            }

            if (index < 0) {
                index = 0;
            }

            items[index].focus();
        };

        _createClass(Dropdown, null, [
            {
                key: "VERSION",
                get: function get() {
                    return VERSION;
                },
            },
            {
                key: "Default",
                get: function get() {
                    return Default;
                },
            },
            {
                key: "DefaultType",
                get: function get() {
                    return DefaultType;
                },
            },
        ]);

        return Dropdown;
    })();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document)
        .on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown._dataApiKeydownHandler)
        .on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler)
        .on(EVENT_CLICK_DATA_API + " " + EVENT_KEYUP_DATA_API, Dropdown._clearMenus)
        .on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
            event.preventDefault();
            event.stopPropagation();

            Dropdown._jQueryInterface.call($(this), "toggle");
        })
        .on(EVENT_CLICK_DATA_API, SELECTOR_FORM_CHILD, function (e) {
            e.stopPropagation();
        });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;

    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Dropdown._jQueryInterface;
    };

    return Dropdown;
});

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

$(function () {
    const sidebarMenu = document.querySelector(".sidebar-menu");
    let switchableClass = "sidebar-menu_open";

    const classToggler = (evt) => {
        let target = evt.target;

        if (
            target.classList.contains("sidebar-menu__preview") &&
            target.parentNode.classList.contains(switchableClass)
        ) {
            sidebarMenu.classList.remove(switchableClass);
        } else {
            sidebarMenu.classList.add(switchableClass);
        }
    };

    sidebarMenu.addEventListener("click", classToggler);
});

/**
 * Кастомный контрол спойлера
 * Bender 07.09.2020
 */
"use strict";

(function ($, Util) {
    var EVENT_KEY = ".spoiler";
    var SPOILER_PREFIX = "spoiler";
    var SPOILER_DATA_KEY = SPOILER_PREFIX + "Instance";
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
        control: "spoiler__control",
        controlClose: "spoiler_closed",
        target: "spoiler",
        targetAnimate: "spoiler_animated",
        targetActive: "spoiler_active",
    };

    var Spoiler = function (element) {
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

    Spoiler.prototype.toggle = function () {
        if (this._isExpanded) {
            this.hide();
        } else {
            this.show();
        }
    };

    Spoiler.prototype.show = function () {
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

    Spoiler.prototype.hide = function () {
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

    Spoiler.prototype.getTargets = function () {
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

    Spoiler.prototype._getSelectorFromElement = function (element) {
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

    Spoiler.prototype._findNextIBlock = function (selector) {
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

    Spoiler.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, isOpen) {
        var toggleName = element.data("name");
        if (toggleName) {
            element.data("name", element.text());
            element.text(toggleName);
        }
        element.toggleClass(ClassName.controlClose, !isOpen).attr("aria-expanded", isOpen);
    };

    $(document).on("click", function (event) {
        var $trigger = $(event.target);
        var spoilerInstance;
        if ($trigger.hasClass(ClassName.control)) {
            if (event.target.tagName === "A") {
                event.preventDefault();
            }

            spoilerInstance = $trigger.data(SPOILER_DATA_KEY);

            if (!spoilerInstance) {
                spoilerInstance = new Spoiler($trigger);
                $trigger.data(SPOILER_DATA_KEY, spoilerInstance);
            }

            spoilerInstance.toggle();
        }
    });
})($, Util);

/*!
 * Bootstrap tab.js v4.5.2 (https://getbootstrap.com/)
 * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 *
 * Модифицировал под uikit Bender
 * 19.04.2021
 */
(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? (module.exports = factory(require("jquery"), require("./util.js")))
        : typeof define === "function" && define.amd
        ? define(["jquery", "./util.js"], factory)
        : ((global = typeof globalThis !== "undefined" ? globalThis : global || self),
          (global.Tab = factory(global.jQuery, global.Util)));
})(window, function ($, Util) {
    "use strict";

    $ = $ && Object.prototype.hasOwnProperty.call($, "default") ? $["default"] : $;
    Util = Util && Object.prototype.hasOwnProperty.call(Util, "default") ? Util["default"] : Util;

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = "tab";
    var VERSION = "4.5.2";
    var DATA_KEY = "bs.tab";
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = ".data-api";
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var EVENT_HIDE = "hide" + EVENT_KEY;
    var EVENT_HIDDEN = "hidden" + EVENT_KEY;
    var EVENT_SHOW = "show" + EVENT_KEY;
    var EVENT_SHOWN = "shown" + EVENT_KEY;
    var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
    var CLASS_NAME = ".tabs";
    var CLASS_NAME_DROPDOWN_MENU = "dropdown-menu";
    var CLASS_NAME_TAB_PREVIEW = ".tabs__preview";
    var CLASS_NAME_OPEN = "tabs_open";
    var CLASS_NAME_ACTIVE = "tabs_active";
    var CLASS_NAME_DISABLED = "disabled";
    var CLASS_NAME_FADE = "fade";
    var CLASS_NAME_SHOW = "show";
    var SELECTOR_DROPDOWN = ".dropdown";
    var SELECTOR_NAV_LIST_GROUP = ".tabs__list, .tabs_radio";
    var SELECTOR_ACTIVE = ".tabs_active";
    var SELECTOR_ACTIVE_UL = "> li > .tabs_active";
    var SELECTOR_DATA_TOGGLE = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
    var SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
    var SELECTOR_DROPDOWN_ACTIVE_CHILD = "> .dropdown-menu .tabs_active";
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Tab = /*#__PURE__*/ (function () {
        function Tab(element) {
            this._element = element;
        }

        // Getters
        var _proto = Tab.prototype;

        // Public
        _proto.set = function set() {
            var element = this._element;
            if ($(element).hasClass(CLASS_NAME_ACTIVE)) {
                var activeContent = $(element).text();
                if (activeContent) {
                    $(element).closest(SELECTOR_NAV_LIST_GROUP).prev(CLASS_NAME_TAB_PREVIEW).text(activeContent);
                }
            }
        };

        _proto.preview = function preview() {
            var element = this._element;
            $(element).parent(CLASS_NAME).toggleClass(CLASS_NAME_OPEN);
        };

        _proto.show = function show() {
            var _this = this;

            if (
                (this._element.parentNode &&
                    this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                    $(this._element).hasClass(CLASS_NAME_ACTIVE)) ||
                $(this._element).hasClass(CLASS_NAME_DISABLED)
            ) {
                return;
            }

            var target;
            var previous;
            var listElement = $(this._element).closest(SELECTOR_NAV_LIST_GROUP)[0];
            var selector = Util.getSelectorFromElement(this._element);

            if (listElement) {
                var itemSelector =
                    listElement.nodeName === "UL" || listElement.nodeName === "OL"
                        ? SELECTOR_ACTIVE_UL
                        : SELECTOR_ACTIVE;
                previous = $.makeArray($(listElement).find(itemSelector));
                previous = previous[previous.length - 1];
            }

            var hideEvent = $.Event(EVENT_HIDE, {
                relatedTarget: this._element,
            });
            var showEvent = $.Event(EVENT_SHOW, {
                relatedTarget: previous,
            });

            if (previous) {
                $(previous).trigger(hideEvent);
            }

            $(this._element).trigger(showEvent);

            if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                return;
            }

            if (selector) {
                target = document.querySelector(selector);
            }

            this._activate(this._element, listElement);

            var complete = function complete() {
                var hiddenEvent = $.Event(EVENT_HIDDEN, {
                    relatedTarget: _this._element,
                });
                var shownEvent = $.Event(EVENT_SHOWN, {
                    relatedTarget: previous,
                });
                $(previous).trigger(hiddenEvent);
                $(_this._element).trigger(shownEvent);
            };

            if (target) {
                this._activate(target, target.parentNode, complete);
            } else {
                complete();
            }
        };

        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY);
            this._element = null;
        }; // Private

        _proto._activate = function _activate(element, container, callback) {
            var _this2 = this;

            var activeElements =
                container && (container.nodeName === "UL" || container.nodeName === "OL")
                    ? $(container).find(SELECTOR_ACTIVE_UL)
                    : $(container).children(SELECTOR_ACTIVE);
            var active = activeElements[0];
            var isTransitioning = callback && active && $(active).hasClass(CLASS_NAME_FADE);

            var complete = function complete() {
                return _this2._transitionComplete(element, active, callback);
            };

            if (active && isTransitioning) {
                var transitionDuration = Util.getTransitionDurationFromElement(active);
                $(active)
                    .removeClass(CLASS_NAME_SHOW)
                    .one(Util.TRANSITION_END, complete)
                    .emulateTransitionEnd(transitionDuration);
            } else {
                complete();
            }
        };

        _proto._transitionComplete = function _transitionComplete(element, active, callback) {
            if (active) {
                $(active).removeClass(CLASS_NAME_ACTIVE);
                var dropdownChild = $(active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

                if (dropdownChild) {
                    $(dropdownChild).removeClass(CLASS_NAME_ACTIVE);
                }

                if (active.getAttribute("role") === "tab") {
                    active.setAttribute("aria-selected", false);
                }
            }

            $(element).addClass(CLASS_NAME_ACTIVE);

            if (element.getAttribute("role") === "tab") {
                element.setAttribute("aria-selected", true);
            }

            Util.reflow(element);

            if (element.classList.contains(CLASS_NAME_FADE)) {
                element.classList.add(CLASS_NAME_SHOW);
            }

            if (element.parentNode && $(element.parentNode).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
                var dropdownElement = $(element).closest(SELECTOR_DROPDOWN)[0];

                if (dropdownElement) {
                    var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE));
                    $(dropdownToggleList).addClass(CLASS_NAME_ACTIVE);
                }

                element.setAttribute("aria-expanded", true);
            }

            if (callback) {
                callback();
            }
        }; // Static

        Tab._jQueryInterface = function _jQueryInterface() {
            var config = [].slice.call(arguments);

            return this.each(function () {
                var $this = $(this);
                var data = $this.data(DATA_KEY);

                if (!data) {
                    data = new Tab(this);
                    $this.data(DATA_KEY, data);
                }

                if (typeof config === "string") {
                    if (typeof data[config] === "undefined") {
                        throw new TypeError('No method named "' + config + '"');
                    }
                    data[config]();
                } else if (Object.prototype.toString.call(config) === "[object Array]") {
                    config.forEach(function (item) {
                        data[item]();
                    });
                }
            });
        };

        _createClass(Tab, null, [
            {
                key: "VERSION",
                get: function get() {
                    return VERSION;
                },
            },
        ]);

        return Tab;
    })();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
        event.preventDefault();
        Tab._jQueryInterface.apply($(this), ["show", "set"]);
    });

    $(document).on(EVENT_CLICK_DATA_API, CLASS_NAME_TAB_PREVIEW, function (event) {
        event.preventDefault();
        Tab._jQueryInterface.apply($(this), ["preview"]);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tab._jQueryInterface;
    $.fn[NAME].Constructor = Tab;

    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Tab._jQueryInterface;
    };

    return Tab;
});

/**
 * @file Bootstrap (v4.6.0): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Создан Bender 01.06.2021
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('popper.js'), require('./util.js')) :
        typeof define === 'function' && define.amd ? define(['jquery', 'popper.js', './util'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tooltip = factory(global.jQuery, global.Popper, global.Util));
}(this, (function ($, Popper, Util) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var $__default = /*#__PURE__*/_interopDefaultLegacy($);
    var Popper__default = /*#__PURE__*/_interopDefaultLegacy(Popper);
    var Util__default = /*#__PURE__*/_interopDefaultLegacy(Util);

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _extends() {
        _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        return _extends.apply(this, arguments);
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.6.0): tools/sanitizer.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    var DATA_ATTRIBUTE_PATTERN = /^data-[\w-]*$/i;
    var DefaultWhitelist = {
        // Global attributes allowed on any supplied element below.
        '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN, DATA_ATTRIBUTE_PATTERN],
        a: ['target', 'href', 'title', 'rel'],
        button: ['type', 'title'],
        svg: ['class'],
        use: ['href', 'xlink:href'],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    };
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
    /**
     * A pattern that matches safe data URLs. Only matches image, video and audio types.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

    function allowedAttribute(attr, allowedAttributeList) {
        var attrName = attr.nodeName.toLowerCase();

        if (allowedAttributeList.indexOf(attrName) !== -1) {
            if (uriAttrs.indexOf(attrName) !== -1) {
                return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
            }

            return true;
        }

        var regExp = allowedAttributeList.filter(function (attrRegex) {
            return attrRegex instanceof RegExp;
        }); // Check if a regular expression validates the attribute.

        for (var i = 0, len = regExp.length; i < len; i++) {
            if (attrName.match(regExp[i])) {
                return true;
            }
        }

        return false;
    }

    function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
        if (unsafeHtml.length === 0) {
            return unsafeHtml;
        }

        if (sanitizeFn && typeof sanitizeFn === 'function') {
            return sanitizeFn(unsafeHtml);
        }

        var domParser = new window.DOMParser();
        var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
        var whitelistKeys = Object.keys(whiteList);
        var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

        var _loop = function _loop(i, len) {
            var el = elements[i];
            var elName = el.nodeName.toLowerCase();

            if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
                el.parentNode.removeChild(el);
                return "continue";
            }

            var attributeList = [].slice.call(el.attributes);
            var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
            attributeList.forEach(function (attr) {
                if (!allowedAttribute(attr, whitelistedAttributes)) {
                    el.removeAttribute(attr.nodeName);
                }
            });
        };

        for (var i = 0, len = elements.length; i < len; i++) {
            var _ret = _loop(i);

            if (_ret === "continue") continue;
        }

        return createdDocument.body.innerHTML;
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'tooltip';
    var VERSION = '4.6.0';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $__default['default'].fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
    var DefaultType = {
        animation: 'boolean',
        template: 'string',
        title: '(string|element|function)',
        trigger: 'string',
        delay: '(number|object)',
        html: 'boolean',
        selector: '(string|boolean)',
        placement: '(string|function)',
        offset: '(number|string|function)',
        container: '(string|element|boolean)',
        fallbackPlacement: '(string|array)',
        boundary: '(string|element)',
        customClass: '(string|function)',
        sanitize: 'boolean',
        sanitizeFn: '(null|function)',
        whiteList: 'object',
        popperConfig: '(null|object)'
    };
    var AttachmentMap = {
        AUTO: 'auto',
        TOP: 'top',
        RIGHT: 'right',
        BOTTOM: 'bottom',
        LEFT: 'left'
    };
    var Default = {
        animation: true,
        template: '<div class="tooltip tooltip_toggle" role="tooltip">' + '<div class="tooltip__arrow arrow"></div>' + '<div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        selector: false,
        placement: 'top',
        offset: 0,
        container: false,
        fallbackPlacement: 'flip',
        boundary: 'scrollParent',
        customClass: '',
        sanitize: true,
        sanitizeFn: null,
        whiteList: DefaultWhitelist,
        popperConfig: null
    };
    var HOVER_STATE_SHOW = 'show';
    var HOVER_STATE_OUT = 'out';
    var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        INSERTED: "inserted" + EVENT_KEY,
        CLICK: "click" + EVENT_KEY,
        FOCUSIN: "focusin" + EVENT_KEY,
        FOCUSOUT: "focusout" + EVENT_KEY,
        MOUSEENTER: "mouseenter" + EVENT_KEY,
        MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var CLASS_NAME_FADE = 'fade';
    var CLASS_NAME_SHOW = 'show';
    var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
    var SELECTOR_ARROW = '.arrow';
    var TRIGGER_HOVER = 'hover';
    var TRIGGER_FOCUS = 'focus';
    var TRIGGER_CLICK = 'click';
    var TRIGGER_MANUAL = 'manual';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Tooltip = /*#__PURE__*/function () {
        function Tooltip(element, config) {
            if (typeof Popper__default['default'] === 'undefined') {
                throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
            } // private


            this._isEnabled = true;
            this._timeout = 0;
            this._hoverState = '';
            this._activeTrigger = {};
            this._popper = null; // Protected

            this.element = element;
            this.config = this._getConfig(config);
            this.tip = null;

            this._setListeners();
        } // Getters


        var _proto = Tooltip.prototype;

        // Public
        _proto.enable = function enable() {
            this._isEnabled = true;
        };

        _proto.disable = function disable() {
            this._isEnabled = false;
        };

        _proto.toggleEnabled = function toggleEnabled() {
            this._isEnabled = !this._isEnabled;
        };

        _proto.toggle = function toggle(event) {
            if (!this._isEnabled) {
                return;
            }

            if (event) {
                var dataKey = this.constructor.DATA_KEY;
                var context = $__default['default'](event.currentTarget).data(dataKey);

                if (!context) {
                    context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                    $__default['default'](event.currentTarget).data(dataKey, context);
                }

                context._activeTrigger.click = !context._activeTrigger.click;

                if (context._isWithActiveTrigger()) {
                    context._enter(null, context);
                } else {
                    context._leave(null, context);
                }
            } else {
                if ($__default['default'](this.getTipElement()).hasClass(CLASS_NAME_SHOW)) {
                    this._leave(null, this);

                    return;
                }

                this._enter(null, this);
            }
        };

        _proto.dispose = function dispose() {
            clearTimeout(this._timeout);
            $__default['default'].removeData(this.element, this.constructor.DATA_KEY);
            $__default['default'](this.element).off(this.constructor.EVENT_KEY);
            $__default['default'](this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

            if (this.tip) {
                $__default['default'](this.tip).remove();
            }

            this._isEnabled = null;
            this._timeout = null;
            this._hoverState = null;
            this._activeTrigger = null;

            if (this._popper) {
                this._popper.destroy();
            }

            this._popper = null;
            this.element = null;
            this.config = null;
            this.tip = null;
        };

        _proto.show = function show() {
            var _this = this;

            if ($__default['default'](this.element).css('display') === 'none') {
                throw new Error('Please use show on visible elements');
            }

            var showEvent = $__default['default'].Event(this.constructor.Event.SHOW);

            if (this.isWithContent() && this._isEnabled) {
                $__default['default'](this.element).trigger(showEvent);
                var shadowRoot = Util__default['default'].findShadowRoot(this.element);
                var isInTheDom = $__default['default'].contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

                if (showEvent.isDefaultPrevented() || !isInTheDom) {
                    return;
                }

                var tip = this.getTipElement();
                var tipId = Util__default['default'].getUID(this.constructor.NAME);
                tip.setAttribute('id', tipId);
                this.element.setAttribute('aria-describedby', tipId);
                this.setContent();

                if (this.config.animation) {
                    $__default['default'](tip).addClass(CLASS_NAME_FADE);
                }

                var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

                var attachment = this._getAttachment(placement);

                this.addAttachmentClass(attachment);

                var container = this._getContainer();

                $__default['default'](tip).data(this.constructor.DATA_KEY, this);

                if (!$__default['default'].contains(this.element.ownerDocument.documentElement, this.tip)) {
                    $__default['default'](tip).appendTo(container);
                }

                $__default['default'](this.element).trigger(this.constructor.Event.INSERTED);
                this._popper = new Popper__default['default'](this.element, tip, this._getPopperConfig(attachment));
                $__default['default'](tip).addClass(CLASS_NAME_SHOW);
                $__default['default'](tip).addClass(this.config.customClass); // If this is a touch-enabled device we add extra
                // empty mouseover listeners to the body's immediate children;
                // only needed because of broken event delegation on iOS
                // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

                if ('ontouchstart' in document.documentElement) {
                    $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
                }

                var complete = function complete() {
                    if (_this.config.animation) {
                        _this._fixTransition();
                    }

                    var prevHoverState = _this._hoverState;
                    _this._hoverState = null;
                    $__default['default'](_this.element).trigger(_this.constructor.Event.SHOWN);

                    if (prevHoverState === HOVER_STATE_OUT) {
                        _this._leave(null, _this);
                    }
                };

                if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE)) {
                    var transitionDuration = Util__default['default'].getTransitionDurationFromElement(this.tip);
                    $__default['default'](this.tip).one(Util__default['default'].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                } else {
                    complete();
                }
            }
        };

        _proto.hide = function hide(callback) {
            var _this2 = this;

            var tip = this.getTipElement();
            var hideEvent = $__default['default'].Event(this.constructor.Event.HIDE);

            var complete = function complete() {
                if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
                    tip.parentNode.removeChild(tip);
                }

                _this2._cleanTipClass();

                _this2.element.removeAttribute('aria-describedby');

                $__default['default'](_this2.element).trigger(_this2.constructor.Event.HIDDEN);

                if (_this2._popper !== null) {
                    _this2._popper.destroy();
                }

                if (callback) {
                    callback();
                }
            };

            $__default['default'](this.element).trigger(hideEvent);

            if (hideEvent.isDefaultPrevented()) {
                return;
            }

            $__default['default'](tip).removeClass(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support

            if ('ontouchstart' in document.documentElement) {
                $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
            }

            this._activeTrigger[TRIGGER_CLICK] = false;
            this._activeTrigger[TRIGGER_FOCUS] = false;
            this._activeTrigger[TRIGGER_HOVER] = false;

            if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE)) {
                var transitionDuration = Util__default['default'].getTransitionDurationFromElement(tip);
                $__default['default'](tip).one(Util__default['default'].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            } else {
                complete();
            }

            this._hoverState = '';
        };

        _proto.update = function update() {
            if (this._popper !== null) {
                this._popper.scheduleUpdate();
            }
        } // Protected
        ;

        _proto.isWithContent = function isWithContent() {
            return Boolean(this.getTitle());
        };

        _proto.addAttachmentClass = function addAttachmentClass(attachment) {
            $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
        };

        _proto.getTipElement = function getTipElement() {
            this.tip = this.tip || $__default['default'](this.config.template)[0];
            return this.tip;
        };

        _proto.setContent = function setContent() {
            var tip = this.getTipElement();
            this.setElementContent($__default['default'](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
            $__default['default'](tip).removeClass(CLASS_NAME_FADE + " " + CLASS_NAME_SHOW);
        };

        _proto.setElementContent = function setElementContent($element, content) {
            if (typeof content === 'object' && (content.nodeType || content.jquery)) {
                // Content is a DOM node or a jQuery
                if (this.config.html) {
                    if (!$__default['default'](content).parent().is($element)) {
                        $element.empty().append(content);
                    }
                } else {
                    $element.text($__default['default'](content).text());
                }

                return;
            }

            if (this.config.html) {
                if (this.config.sanitize) {
                    content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
                }

                $element.html(content);
            } else {
                $element.text(content);
            }
        };

        _proto.getTitle = function getTitle() {
            var title = this.element.getAttribute('data-original-title');

            if (!title) {
                title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
            }

            return title;
        } // Private
        ;

        _proto._getPopperConfig = function _getPopperConfig(attachment) {
            var _this3 = this;

            var defaultBsConfig = {
                placement: attachment,
                modifiers: {
                    offset: this._getOffset(),
                    flip: {
                        behavior: this.config.fallbackPlacement
                    },
                    arrow: {
                        element: SELECTOR_ARROW
                    },
                    preventOverflow: {
                        boundariesElement: this.config.boundary
                    }
                },
                onCreate: function onCreate(data) {
                    if (data.originalPlacement !== data.placement) {
                        _this3._handlePopperPlacementChange(data);
                    }
                },
                onUpdate: function onUpdate(data) {
                    return _this3._handlePopperPlacementChange(data);
                }
            };
            return _extends({}, defaultBsConfig, this.config.popperConfig);
        };

        _proto._getOffset = function _getOffset() {
            var _this4 = this;

            var offset = {};

            if (typeof this.config.offset === 'function') {
                offset.fn = function (data) {
                    data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
                    return data;
                };
            } else {
                offset.offset = this.config.offset;
            }

            return offset;
        };

        _proto._getContainer = function _getContainer() {
            if (this.config.container === false) {
                return document.body;
            }

            if (Util__default['default'].isElement(this.config.container)) {
                return $__default['default'](this.config.container);
            }

            return $__default['default'](document).find(this.config.container);
        };

        _proto._getAttachment = function _getAttachment(placement) {
            return AttachmentMap[placement.toUpperCase()];
        };

        _proto._setListeners = function _setListeners() {
            var _this5 = this;

            var triggers = this.config.trigger.split(' ');
            triggers.forEach(function (trigger) {
                if (trigger === 'click') {
                    $__default['default'](_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
                        return _this5.toggle(event);
                    });
                } else if (trigger !== TRIGGER_MANUAL) {
                    var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
                    var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
                    $__default['default'](_this5.element).on(eventIn, _this5.config.selector, function (event) {
                        return _this5._enter(event);
                    }).on(eventOut, _this5.config.selector, function (event) {
                        return _this5._leave(event);
                    });
                }
            });

            this._hideModalHandler = function () {
                if (_this5.element) {
                    _this5.hide();
                }
            };

            $__default['default'](this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

            if (this.config.selector) {
                this.config = _extends({}, this.config, {
                    trigger: 'manual',
                    selector: ''
                });
            } else {
                this._fixTitle();
            }
        };

        _proto._fixTitle = function _fixTitle() {
            var titleType = typeof this.element.getAttribute('data-original-title');

            if (this.element.getAttribute('title') || titleType !== 'string') {
                this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
                this.element.setAttribute('title', '');
            }
        };

        _proto._enter = function _enter(event, context) {
            var dataKey = this.constructor.DATA_KEY;
            context = context || $__default['default'](event.currentTarget).data(dataKey);

            if (!context) {
                context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                $__default['default'](event.currentTarget).data(dataKey, context);
            }

            if (event) {
                context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            }

            if ($__default['default'](context.getTipElement()).hasClass(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
                context._hoverState = HOVER_STATE_SHOW;
                return;
            }

            clearTimeout(context._timeout);
            context._hoverState = HOVER_STATE_SHOW;

            if (!context.config.delay || !context.config.delay.show) {
                context.show();
                return;
            }

            context._timeout = setTimeout(function () {
                if (context._hoverState === HOVER_STATE_SHOW) {
                    context.show();
                }
            }, context.config.delay.show);
        };

        _proto._leave = function _leave(event, context) {
            var dataKey = this.constructor.DATA_KEY;
            context = context || $__default['default'](event.currentTarget).data(dataKey);

            if (!context) {
                context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                $__default['default'](event.currentTarget).data(dataKey, context);
            }

            if (event) {
                context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
            }

            if (context._isWithActiveTrigger()) {
                return;
            }

            clearTimeout(context._timeout);
            context._hoverState = HOVER_STATE_OUT;

            if (!context.config.delay || !context.config.delay.hide) {
                context.hide();
                return;
            }

            context._timeout = setTimeout(function () {
                if (context._hoverState === HOVER_STATE_OUT) {
                    context.hide();
                }
            }, context.config.delay.hide);
        };

        _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
            for (var trigger in this._activeTrigger) {
                if (this._activeTrigger[trigger]) {
                    return true;
                }
            }

            return false;
        };

        _proto._getConfig = function _getConfig(config) {
            var dataAttributes = $__default['default'](this.element).data();
            Object.keys(dataAttributes).forEach(function (dataAttr) {
                if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
                    delete dataAttributes[dataAttr];
                }
            });
            config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

            if (typeof config.delay === 'number') {
                config.delay = {
                    show: config.delay,
                    hide: config.delay
                };
            }

            if (typeof config.title === 'number') {
                config.title = config.title.toString();
            }

            if (typeof config.content === 'number') {
                config.content = config.content.toString();
            }

            Util__default['default'].typeCheckConfig(NAME, config, this.constructor.DefaultType);

            if (config.sanitize) {
                config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
            }

            return config;
        };

        _proto._getDelegateConfig = function _getDelegateConfig() {
            var config = {};

            if (this.config) {
                for (var key in this.config) {
                    if (this.constructor.Default[key] !== this.config[key]) {
                        config[key] = this.config[key];
                    }
                }
            }

            return config;
        };

        _proto._cleanTipClass = function _cleanTipClass() {
            var $tip = $__default['default'](this.getTipElement());
            var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

            if (tabClass !== null && tabClass.length) {
                $tip.removeClass(tabClass.join(''));
            }
        };

        _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
            this.tip = popperData.instance.popper;

            this._cleanTipClass();

            this.addAttachmentClass(this._getAttachment(popperData.placement));
        };

        _proto._fixTransition = function _fixTransition() {
            var tip = this.getTipElement();
            var initConfigAnimation = this.config.animation;

            if (tip.getAttribute('x-placement') !== null) {
                return;
            }

            $__default['default'](tip).removeClass(CLASS_NAME_FADE);
            this.config.animation = false;
            this.hide();
            this.show();
            this.config.animation = initConfigAnimation;
        } // Static
        ;

        Tooltip._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var $element = $__default['default'](this);
                var data = $element.data(DATA_KEY);

                var _config = typeof config === 'object' && config;

                if (!data && /dispose|hide/.test(config)) {
                    return;
                }

                if (!data) {
                    data = new Tooltip(this, _config);
                    $element.data(DATA_KEY, data);
                }

                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }

                    data[config]();
                }
            });
        };

        _createClass(Tooltip, null, [{
            key: "VERSION",
            get: function get() {
                return VERSION;
            }
        }, {
            key: "Default",
            get: function get() {
                return Default;
            }
        }, {
            key: "NAME",
            get: function get() {
                return NAME;
            }
        }, {
            key: "DATA_KEY",
            get: function get() {
                return DATA_KEY;
            }
        }, {
            key: "Event",
            get: function get() {
                return Event;
            }
        }, {
            key: "EVENT_KEY",
            get: function get() {
                return EVENT_KEY;
            }
        }, {
            key: "DefaultType",
            get: function get() {
                return DefaultType;
            }
        }]);

        return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $__default['default'].fn[NAME] = Tooltip._jQueryInterface;
    $__default['default'].fn[NAME].Constructor = Tooltip;

    $__default['default'].fn[NAME].noConflict = function () {
        $__default['default'].fn[NAME] = JQUERY_NO_CONFLICT;
        return Tooltip._jQueryInterface;
    };

    return Tooltip;

})));

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

(function () {
    const BlindTalker = function (options) {
        this.API_KEY = "307fd9d4-f5bf-4064-9a4c-587754d4e1c0";
        this.COOKIE_NAME = "lowVisHTML";
        this.STORAGE_KEY = "blind:talker:enable";
        this.NORMAL_THEME = "common";
        this.chach = {};
        this.lastText = null;
        this.immediatelyStop = false;
        this.isPlaying = false;
        this.isOpera = navigator.userAgent.indexOf("Opera") > -1;
        this.isBlindMode = false;
        this.isSoundDisabled = true;
        this.playerElement = null;
        this.playerElement = new Audio();
        this.playerElement.preload = "metadata";
        this.autoSound = options.autoSound || [];

        this.checkIsBlindModeEnabled();
        this.initHandlers();

        return this;
    };

    BlindTalker.prototype.initHandlers = function () {
        const self = this;
        let SelectionTimer = null;
        if (this.autoSound.length) {
            const selector = this.autoSound.join(", ");
            $(selector).on("mouseenter", function () {
                if (!self.isBlindMode || self.isSoundDisabled) {
                    return true;
                }
                self.play(!!!$(this).attr("title") ? $(this).text() : $(this).attr("title"));
            });

            $(selector).on("mouseleave", function () {
                if (!self.isBlindMode || self.isSoundDisabled) {
                    return true;
                }
                self.stop();
            });
        }

        document.addEventListener("selectionchange", () => {
            if (!self.isBlindMode || self.isSoundDisabled) {
                return true;
            }
            if (SelectionTimer) {
                clearTimeout(SelectionTimer);
            }
            setTimeout(function () {
                const selectedText = self.getSelectionText();
                if (selectedText) {
                    self.play(selectedText);
                }
            }, 2000);
        });
    };

    /**
     * Проверяет включен ли режим слабовидящих и активирована ли озвучка
     */
    BlindTalker.prototype.checkIsBlindModeEnabled = function () {
        const theme = this.getCookie(this.COOKIE_NAME);
        this.isBlindMode = theme && theme !== this.NORMAL_THEME;
        if (this.isBlindMode) {
            this.isSoundDisabled = !localStorage.getItem(this.STORAGE_KEY);
        } else {
            localStorage.removeItem(this.STORAGE_KEY);
        }
    };

    /**
     * Читает значение cookie
     * @param name
     * @return {string|undefined}
     */
    BlindTalker.prototype.getCookie = function (name) {
        let matches = document.cookie.match(
            new RegExp("(?:^|; )" + name.replace(/([.*+?\^${}()|\[\]\/\\])/g, "\\$1") + "=([^;]*)")
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    /**
     * Отключает озвучку
     */
    BlindTalker.prototype.disableSound = function () {
        if (this.isPlaying) {
            this.stop();
        }
        this.isSoundDisabled = true;
        localStorage.removeItem(this.STORAGE_KEY);
    };

    /**
     * Включает озвучку
     */
    BlindTalker.prototype.enableSound = function () {
        this.isSoundDisabled = false;
        this.isBlindMode = true;
        localStorage.setItem(this.STORAGE_KEY, "1");
    };

    /**
     * Запрашивает файл аудио текста и воспроизводит
     * @param {string} text - текст для озвучивания
     * @param {boolean?} cache - маркер того кешировать ли файл озвучки или нет, если не передан то кеширование отключено
     * @return {boolean}
     */
    BlindTalker.prototype.play = function (text, cache) {
        var self = this;
        var list = null;
        var cacheEnable = _.isUndefined(cache) ? false : cache;
        if ("undefined" == typeof text || !text.length || this.immediatelyStop) {
            this.immediatelyStop = false;
            return false;
        }
        if (this.isPlaying) {
            this.stop();
        }
        this.isPlaying = true;
        this.lastText = text;
        if (this.startPlayingTimeout) {
            clearTimeout(this.startPlayingTimeout);
            this.startPlayingTimeout = null;
        }
        list = this.breakLongText(text);
        $(this.playerElement)
            .off("ended")
            .on("ended", function () {
                if (list.length) {
                    console.log("воспроизвел звук");
                    if (cacheEnable) {
                        self.loadData(list.pop()).done(function (data) {
                            self.playerElement.src = URL.createObjectURL(data);
                            self.playerElement.play(0);
                        });
                    } else {
                        self.playerElement.src = list.shift();
                        self.playerElement.play(0);
                    }
                } else {
                    self.stop();
                    self.lastText = null;
                }
            });
        this.startPlayingTimeout = setTimeout(
            function (url) {
                console.log("воспроизвел звук");
                if (cacheEnable) {
                    self.loadData(url).done(function (data) {
                        self.playerElement.src = URL.createObjectURL(data);
                        self.playerElement.play(0);
                    });
                } else {
                    self.playerElement.src = url;
                    self.playerElement.play(0);
                }
            },
            300,
            list.shift()
        );
    };

    /**
     * Загружает данные и сохраняет в кеш или отдает из кеша если данные уже в нем сохранены.
     * @param url
     * @return {*}
     */
    BlindTalker.prototype.loadData = function (url) {
        const self = this;
        const d = $.Deferred();
        if (this.chach[url]) {
            return d.resolve(this.chach[url]);
        }
        $.ajax({
            url: url,
            processData: false,
            xhrFields: {
                responseType: "arraybuffer",
            },
            success: function (data) {
                self.chach[url] = new Blob([data]);
                d.resolve(new Blob([data]));
            },
        });
        return d.promise();
    };

    /**
     * Останавливает воспроизведение
     */
    BlindTalker.prototype.stop = function () {
        this.isPlaying = false;
        clearTimeout(this.startPlayingTimeout);
        this.startPlayingTimeout = null;
        this.playerElement.pause();
    };

    /**
     * Разрезает переданные текст на предложения с ограничением в 100 символов
     * @param {string} str - текст предназначенный для озвучивания
     * @return {*}
     */
    BlindTalker.prototype.breakLongText = function (str) {
        const self = this;
        const sentences = str.split(".").map(function (str) {
            return str.replace(/\s{2,}/gi, " ").split(" ");
        });

        return sentences.reduce(function (current, words) {
            let line = "";
            words.forEach(function (word) {
                if (line.length + word.length > 100) {
                    current.push(self.getQuery(line));
                    line = "";
                }
                if (word.trim().length) {
                    line += word + " ";
                }
            });
            if (line.length) {
                current.push(self.getQuery(line));
            }
            return current;
        }, []);
    };

    /**
     * Возвращает сроку запроса к api
     * @param {string} text - текст для озвучивания
     * @return {string}
     */
    BlindTalker.prototype.getQuery = function (text) {
        return (
            "https://tts.voicetech.yandex.net/generate?text=" +
            encodeURIComponent(text) +
            "&format=" +
            (this.isOpera ? "opus" : "mp3") +
            "&speaker=zahar&emotion=neutral&ill=false&robot=true&lang=ru-RU&key=" +
            this.API_KEY
        );
    };

    BlindTalker.prototype.getSelectionText = function () {
        let text = "";
        const activeEl = document.activeElement;
        const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
        if (
            activeElTagName === "textarea" ||
            (activeElTagName === "input" &&
                /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
                typeof activeEl.selectionStart == "number")
        ) {
            text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
        } else if (window.getSelection) {
            text = window.getSelection().toString();
        }
        return text;
    };

    window.BlindTalker = BlindTalker;
})();

$(function() {
    $('[data-name="burger-button"]').on( "click", function() {
        $('[data-name="burger-button"]').toggleClass("burger_active");
    });
});

$(function () {

    var neighbour = document.querySelector('.main__aside-neighbour');
    var wrapper = document.querySelector('.main__aside');
    var container = document.querySelector('.main__aside-container');
    var cancelClass = 'main__aside_relative';
    var paddingTop = parseInt($(document.body).css("padding-top").split("px")[0] || 0, 10) + 20,
        paddingBottom = 20, scrollMark = null, Z = 0;

    function positionCheck() {
        var wrapperRect = wrapper.getBoundingClientRect();
        var neighbourRect = neighbour.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect();

        // Контент выше чем сайдбар
        if (neighbourRect.bottom > wrapperRect.bottom) {
            var windowHeight = document.documentElement.clientHeight;
            var columnsHeightDiff = Math.round(containerRect.height - neighbourRect.height);

            var gottaStick = null;
            var calculatedTop = '';

            // Сайдбар выше чем viewport
            if (containerRect.height > windowHeight) {

                // Скролл вниз
                if (wrapperRect.top < scrollMark) {

                    // Нижняя часть контента не во viewport
                    if (wrapperRect.top + neighbourRect.height + paddingBottom <= windowHeight) {
                        gottaStick = false;
                        calculatedTop = -columnsHeightDiff;
                        Z = columnsHeightDiff;
                    // -1 - исправление дефекта с дёргающимся сайдбаром в масштабированном хроме
                    } else if (containerRect.bottom + paddingBottom - 1 <= windowHeight) {
                        gottaStick = true;
                        calculatedTop = windowHeight - containerRect.height - paddingBottom;
                        Z = paddingBottom + wrapperRect.top + containerRect.height - windowHeight;
                    } else {
                        gottaStick = false;
                        calculatedTop = -Z;
                    }

                // Скролл наверх
                } else {
                    // -1 - исправление дефекта с дёргающимся сайдбаром в масштабированном хроме
                    if (wrapperRect.top < paddingTop && containerRect.top >= paddingTop - 1) {
                        gottaStick = true;
                        calculatedTop = paddingTop;
                        Z = wrapperRect.top - paddingTop;
                    } else if (wrapperRect.top < paddingTop) {
                        gottaStick = false;
                        calculatedTop = -Z;
                    } else {
                        Z = 0;
                    }
                }

                scrollMark = wrapperRect.top;

            } else {
                if (wrapperRect.top - paddingTop <= columnsHeightDiff) {
                    gottaStick = false;
                    calculatedTop = -columnsHeightDiff;
                } else if (wrapperRect.top <= paddingTop) {
                    gottaStick = true;
                    calculatedTop = paddingTop;
                }
            }

            container.classList.toggle('main__aside-container_sticky', gottaStick === true);
            container.classList.toggle('main__aside-container_stop', gottaStick === false);
            container.style.top = calculatedTop + 'px';
        }
    }

    if(neighbour && wrapper && !wrapper.classList.contains(cancelClass) && container) {
        window.addEventListener('scroll', positionCheck, false);
    }
})

/**
 * Реализация логики мега-меню
 */
$(function () {
    const ClassNames = {
        megaMenu: "mega-menu",
        opened: "mega-menu_opened",
        toggler: "mega-menu__toggle",
        close: "mega-menu__close",
        content: "mega-menu__content",
        mobileButton: "burger",
        mobileButtonOpened: "burger_active",
        menuWrapper: "mega-menu__wrapper",
    };
    const Selectors = {
        megaMenu: `.${ClassNames.megaMenu}`,
        toggler: `.${ClassNames.toggler}`,
        close: `.${ClassNames.close}`,
        content: `.${ClassNames.content}`,
        mobileButton: `.${ClassNames.mobileButton}`,
        menuWrapper: `.${ClassNames.menuWrapper}`,
    };

    const wrapper = $(Selectors.megaMenu);
    const toggler = $(`${Selectors.toggler}, ${Selectors.close}, ${Selectors.mobileButton}`);
    const mobileButton = $(Selectors.mobileButton);

    toggler.on("click", function (e) {
        e.stopPropagation();
        wrapper.toggleClass(ClassNames.opened);
    });

    $("body").on("click", function (event) {
        if (($(event.target).closest(Selectors.content).length === 0)
          && ($(event.target).closest(Selectors.menuWrapper).length === 0)
          && (wrapper.hasClass(ClassNames.opened))) {
            wrapper.toggleClass(ClassNames.opened);
            mobileButton.toggleClass(ClassNames.mobileButtonOpened);
        }
    });
});

// Ion.RangeSlider
// version 2.3.1 Build: 382
// © Denis Ineshin, 2019
// https://github.com/IonDen
//
// Project page:    http://ionden.com/a/plugins/ion.rangeSlider/en.html
// GitHub page:     https://github.com/IonDen/ion.rangeSlider
//
// Released under MIT licence:
// http://ionden.com/a/plugins/licence-en.html
// =====================================================================================================================

;(function(factory) {
    if ((typeof jQuery === 'undefined' || !jQuery) && typeof define === "function" && define.amd) {
        define(["jquery"], function (jQuery) {
            return factory(jQuery, document, window, navigator);
        });
    } else if ((typeof jQuery === 'undefined' || !jQuery) && typeof exports === "object") {
        factory(require("jquery"), document, window, navigator);
    } else {
        factory(jQuery, document, window, navigator);
    }
} (function ($, document, window, navigator, undefined) {
    "use strict";

    // =================================================================================================================
    // Service

    var plugin_count = 0;

    // IE8 fix
    var is_old_ie = (function () {
        var n = navigator.userAgent,
            r = /msie\s\d+/i,
            v;
        if (n.search(r) > 0) {
            v = r.exec(n).toString();
            v = v.split(" ")[1];
            if (v < 9) {
                $("html").addClass("lt-ie9");
                return true;
            }
        }
        return false;
    } ());
    if (!Function.prototype.bind) {
        Function.prototype.bind = function bind(that) {

            var target = this;
            var slice = [].slice;

            if (typeof target != "function") {
                throw new TypeError();
            }

            var args = slice.call(arguments, 1),
                bound = function () {

                    if (this instanceof bound) {

                        var F = function(){};
                        F.prototype = target.prototype;
                        var self = new F();

                        var result = target.apply(
                            self,
                            args.concat(slice.call(arguments))
                        );
                        if (Object(result) === result) {
                            return result;
                        }
                        return self;

                    } else {

                        return target.apply(
                            that,
                            args.concat(slice.call(arguments))
                        );

                    }

                };

            return bound;
        };
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement, fromIndex) {
            var k;
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = +fromIndex || 0;
            if (Math.abs(n) === Infinity) {
                n = 0;
            }
            if (n >= len) {
                return -1;
            }
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }



    // =================================================================================================================
    // Template

    var base_html =
        '<span class="range-slider__container">' +
        '<span class="range-slider__line" tabindex="0"></span>' +
        '<span class="irs-min">0</span><span class="irs-max">1</span>' +
        '<span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span>' +
        '</span>' +
        '<span class="irs-grid"></span>';

    var single_html =
        '<span class="range-slider__bar irs-bar--single"></span>' +
        '<span class="irs-shadow shadow-single"></span>' +
        '<span class="range-slider__handle single"><i></i><i></i><i></i></span>';

    var double_html =
        '<span class="range-slider__bar"></span>' +
        '<span class="irs-shadow shadow-from"></span>' +
        '<span class="irs-shadow shadow-to"></span>' +
        '<span class="range-slider__handle from"><i></i><i></i><i></i></span>' +
        '<span class="range-slider__handle to"><i></i><i></i><i></i></span>';

    var disable_html =
        '<span class="irs-disable-mask"></span>';



    // =================================================================================================================
    // Core

    /**
     * Main plugin constructor
     *
     * @param input {Object} link to base input element
     * @param options {Object} slider config
     * @param plugin_count {Number}
     * @constructor
     */
    var IonRangeSlider = function (input, options, plugin_count) {
        this.VERSION = "2.3.1";
        this.input = input;
        this.plugin_count = plugin_count;
        this.current_plugin = 0;
        this.calc_count = 0;
        this.update_tm = 0;
        this.old_from = 0;
        this.old_to = 0;
        this.old_min_interval = null;
        this.raf_id = null;
        this.dragging = false;
        this.force_redraw = false;
        this.no_diapason = false;
        this.has_tab_index = true;
        this.is_key = false;
        this.is_update = false;
        this.is_start = true;
        this.is_finish = false;
        this.is_active = false;
        this.is_resize = false;
        this.is_click = false;

        options = options || {};

        // cache for links to all DOM elements
        this.$cache = {
            win: $(window),
            body: $(document.body),
            input: $(input),
            cont: null,
            rs: null,
            min: null,
            max: null,
            from: null,
            to: null,
            single: null,
            bar: null,
            line: null,
            s_single: null,
            s_from: null,
            s_to: null,
            shad_single: null,
            shad_from: null,
            shad_to: null,
            edge: null,
            grid: null,
            grid_labels: []
        };

        // storage for measure variables
        this.coords = {
            // left
            x_gap: 0,
            x_pointer: 0,

            // width
            w_rs: 0,
            w_rs_old: 0,
            w_handle: 0,

            // percents
            p_gap: 0,
            p_gap_left: 0,
            p_gap_right: 0,
            p_step: 0,
            p_pointer: 0,
            p_handle: 0,
            p_single_fake: 0,
            p_single_real: 0,
            p_from_fake: 0,
            p_from_real: 0,
            p_to_fake: 0,
            p_to_real: 0,
            p_bar_x: 0,
            p_bar_w: 0,

            // grid
            grid_gap: 0,
            big_num: 0,
            big: [],
            big_w: [],
            big_p: [],
            big_x: []
        };

        // storage for labels measure variables
        this.labels = {
            // width
            w_min: 0,
            w_max: 0,
            w_from: 0,
            w_to: 0,
            w_single: 0,

            // percents
            p_min: 0,
            p_max: 0,
            p_from_fake: 0,
            p_from_left: 0,
            p_to_fake: 0,
            p_to_left: 0,
            p_single_fake: 0,
            p_single_left: 0
        };



        /**
         * get and validate config
         */
        var $inp = this.$cache.input,
            val = $inp.prop("value"),
            config, config_from_data, prop;

        // default config
        config = {
            skin: "flat",
            type: "single",

            min: 10,
            max: 100,
            from: null,
            to: null,
            step: 1,

            min_interval: 0,
            max_interval: 0,
            drag_interval: false,

            values: [],
            p_values: [],

            from_fixed: false,
            from_min: null,
            from_max: null,
            from_shadow: false,

            to_fixed: false,
            to_min: null,
            to_max: null,
            to_shadow: false,

            prettify_enabled: true,
            prettify_separator: " ",
            prettify: null,

            force_edges: false,

            keyboard: true,

            grid: false,
            grid_margin: true,
            grid_num: 4,
            grid_snap: false,

            hide_min_max: false,
            hide_from_to: false,

            prefix: "",
            postfix: "",
            max_postfix: "",
            decorate_both: true,
            values_separator: " — ",

            input_values_separator: ";",

            disable: false,
            block: false,

            extra_classes: "",

            scope: null,
            onStart: null,
            onChange: null,
            onFinish: null,
            onUpdate: null
        };


        // check if base element is input
        if ($inp[0].nodeName !== "INPUT") {
            console && console.warn && console.warn("Base element should be <input>!", $inp[0]);
        }


        // config from data-attributes extends js config
        config_from_data = {
            skin: $inp.data("skin"),
            type: $inp.data("type"),

            min: $inp.data("min"),
            max: $inp.data("max"),
            from: $inp.data("from"),
            to: $inp.data("to"),
            step: $inp.data("step"),

            min_interval: $inp.data("minInterval"),
            max_interval: $inp.data("maxInterval"),
            drag_interval: $inp.data("dragInterval"),

            values: $inp.data("values"),

            from_fixed: $inp.data("fromFixed"),
            from_min: $inp.data("fromMin"),
            from_max: $inp.data("fromMax"),
            from_shadow: $inp.data("fromShadow"),

            to_fixed: $inp.data("toFixed"),
            to_min: $inp.data("toMin"),
            to_max: $inp.data("toMax"),
            to_shadow: $inp.data("toShadow"),

            prettify_enabled: $inp.data("prettifyEnabled"),
            prettify_separator: $inp.data("prettifySeparator"),

            force_edges: $inp.data("forceEdges"),

            keyboard: $inp.data("keyboard"),

            grid: $inp.data("grid"),
            grid_margin: $inp.data("gridMargin"),
            grid_num: $inp.data("gridNum"),
            grid_snap: $inp.data("gridSnap"),

            hide_min_max: $inp.data("hideMinMax"),
            hide_from_to: $inp.data("hideFromTo"),

            prefix: $inp.data("prefix"),
            postfix: $inp.data("postfix"),
            max_postfix: $inp.data("maxPostfix"),
            decorate_both: $inp.data("decorateBoth"),
            values_separator: $inp.data("valuesSeparator"),

            input_values_separator: $inp.data("inputValuesSeparator"),

            disable: $inp.data("disable"),
            block: $inp.data("block"),

            extra_classes: $inp.data("extraClasses"),
        };
        config_from_data.values = config_from_data.values && config_from_data.values.split(",");

        for (prop in config_from_data) {
            if (config_from_data.hasOwnProperty(prop)) {
                if (config_from_data[prop] === undefined || config_from_data[prop] === "") {
                    delete config_from_data[prop];
                }
            }
        }


        // input value extends default config
        if (val !== undefined && val !== "") {
            val = val.split(config_from_data.input_values_separator || options.input_values_separator || ";");

            if (val[0] && val[0] == +val[0]) {
                val[0] = +val[0];
            }
            if (val[1] && val[1] == +val[1]) {
                val[1] = +val[1];
            }

            if (options && options.values && options.values.length) {
                config.from = val[0] && options.values.indexOf(val[0]);
                config.to = val[1] && options.values.indexOf(val[1]);
            } else {
                config.from = val[0] && +val[0];
                config.to = val[1] && +val[1];
            }
        }



        // js config extends default config
        $.extend(config, options);


        // data config extends config
        $.extend(config, config_from_data);
        this.options = config;



        // validate config, to be sure that all data types are correct
        this.update_check = {};
        this.validate();



        // default result object, returned to callbacks
        this.result = {
            input: this.$cache.input,
            slider: null,

            min: this.options.min,
            max: this.options.max,

            from: this.options.from,
            from_percent: 0,
            from_value: null,

            to: this.options.to,
            to_percent: 0,
            to_value: null
        };



        this.init();
    };

    IonRangeSlider.prototype = {

        /**
         * Starts or updates the plugin instance
         *
         * @param [is_update] {boolean}
         */
        init: function (is_update) {
            this.no_diapason = false;
            this.coords.p_step = this.convertToPercent(this.options.step, true);

            this.target = "base";

            this.toggleInput();
            this.append();
            this.setMinMax();

            if (is_update) {
                this.force_redraw = true;
                this.calc(true);

                // callbacks called
                this.callOnUpdate();
            } else {
                this.force_redraw = true;
                this.calc(true);

                // callbacks called
                this.callOnStart();
            }

            this.updateScene();
        },

        /**
         * Appends slider template to a DOM
         */
        append: function () {
            var container_html = '<span class="range-slider__container range-slider_' + this.options.skin + ' js-irs-' + this.plugin_count + ' ' + this.options.extra_classes + '"></span>';
            this.$cache.input.before(container_html);
            this.$cache.input.prop("readonly", true);
            this.$cache.cont = this.$cache.input.prev();
            this.result.slider = this.$cache.cont;

            this.$cache.cont.html(base_html);
            this.$cache.rs = this.$cache.cont.find(".range-slider__container");
            this.$cache.min = this.$cache.cont.find(".irs-min");
            this.$cache.max = this.$cache.cont.find(".irs-max");
            this.$cache.from = this.$cache.cont.find(".irs-from");
            this.$cache.to = this.$cache.cont.find(".irs-to");
            this.$cache.single = this.$cache.cont.find(".irs-single");
            this.$cache.line = this.$cache.cont.find(".range-slider__line");
            this.$cache.grid = this.$cache.cont.find(".irs-grid");

            if (this.options.type === "single") {
                this.$cache.cont.append(single_html);
                this.$cache.bar = this.$cache.cont.find(".range-slider__bar");
                this.$cache.edge = this.$cache.cont.find(".irs-bar-edge");
                this.$cache.s_single = this.$cache.cont.find(".single");
                this.$cache.from[0].style.visibility = "hidden";
                this.$cache.to[0].style.visibility = "hidden";
                this.$cache.shad_single = this.$cache.cont.find(".shadow-single");
            } else {
                this.$cache.cont.append(double_html);
                this.$cache.bar = this.$cache.cont.find(".range-slider__bar");
                this.$cache.s_from = this.$cache.cont.find(".from");
                this.$cache.s_to = this.$cache.cont.find(".to");
                this.$cache.shad_from = this.$cache.cont.find(".shadow-from");
                this.$cache.shad_to = this.$cache.cont.find(".shadow-to");

                this.setTopHandler();
            }

            if (this.options.hide_from_to) {
                this.$cache.from[0].style.display = "none";
                this.$cache.to[0].style.display = "none";
                this.$cache.single[0].style.display = "none";
            }

            this.appendGrid();

            if (this.options.disable) {
                this.appendDisableMask();
                this.$cache.input[0].disabled = true;
            } else {
                this.$cache.input[0].disabled = false;
                this.removeDisableMask();
                this.bindEvents();
            }

            // block only if not disabled
            if (!this.options.disable) {
                if (this.options.block) {
                    this.appendDisableMask();
                } else {
                    this.removeDisableMask();
                }
            }

            if (this.options.drag_interval) {
                this.$cache.bar[0].style.cursor = "ew-resize";
            }
        },

        /**
         * Determine which handler has a priority
         * works only for double slider type
         */
        setTopHandler: function () {
            var min = this.options.min,
                max = this.options.max,
                from = this.options.from,
                to = this.options.to;

            if (from > min && to === max) {
                this.$cache.s_from.addClass("type_last");
            } else if (to < max) {
                this.$cache.s_to.addClass("type_last");
            }
        },

        /**
         * Determine which handles was clicked last
         * and which handler should have hover effect
         *
         * @param target {String}
         */
        changeLevel: function (target) {
            switch (target) {
                case "single":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
                    this.$cache.s_single.addClass("state_hover");
                    break;
                case "from":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
                    this.$cache.s_from.addClass("state_hover");
                    this.$cache.s_from.addClass("type_last");
                    this.$cache.s_to.removeClass("type_last");
                    break;
                case "to":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake);
                    this.$cache.s_to.addClass("state_hover");
                    this.$cache.s_to.addClass("type_last");
                    this.$cache.s_from.removeClass("type_last");
                    break;
                case "both":
                    this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
                    this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer);
                    this.$cache.s_to.removeClass("type_last");
                    this.$cache.s_from.removeClass("type_last");
                    break;
            }
        },

        /**
         * Then slider is disabled
         * appends extra layer with opacity
         */
        appendDisableMask: function () {
            this.$cache.cont.append(disable_html);
            this.$cache.cont.addClass("range-slider__disabled");
        },

        /**
         * Then slider is not disabled
         * remove disable mask
         */
        removeDisableMask: function () {
            this.$cache.cont.remove(".irs-disable-mask");
            this.$cache.cont.removeClass("range-slider__disabled");
        },

        /**
         * Remove slider instance
         * and unbind all events
         */
        remove: function () {
            this.$cache.cont.remove();
            this.$cache.cont = null;

            this.$cache.line.off("keydown.irs_" + this.plugin_count);

            this.$cache.body.off("touchmove.irs_" + this.plugin_count);
            this.$cache.body.off("mousemove.irs_" + this.plugin_count);

            this.$cache.win.off("touchend.irs_" + this.plugin_count);
            this.$cache.win.off("mouseup.irs_" + this.plugin_count);

            if (is_old_ie) {
                this.$cache.body.off("mouseup.irs_" + this.plugin_count);
                this.$cache.body.off("mouseleave.irs_" + this.plugin_count);
            }

            this.$cache.grid_labels = [];
            this.coords.big = [];
            this.coords.big_w = [];
            this.coords.big_p = [];
            this.coords.big_x = [];

            cancelAnimationFrame(this.raf_id);
        },

        /**
         * bind all slider events
         */
        bindEvents: function () {
            if (this.no_diapason) {
                return;
            }

            this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
            this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));

            this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
            this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));

            this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
            this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

            this.$cache.line.on("focus.irs_" + this.plugin_count, this.pointerFocus.bind(this));

            if (this.options.drag_interval && this.options.type === "double") {
                this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
                this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
            } else {
                this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
            }

            if (this.options.type === "single") {
                this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

                this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
            } else {
                this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null));
                this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null));

                this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

                this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
            }

            if (this.options.keyboard) {
                this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
            }

            if (is_old_ie) {
                this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
                this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this));
            }
        },

        /**
         * Focus with tabIndex
         *
         * @param e {Object} event object
         */
        pointerFocus: function (e) {
            if (!this.target) {
                var x;
                var $handle;

                if (this.options.type === "single") {
                    $handle = this.$cache.single;
                } else {
                    $handle = this.$cache.from;
                }

                x = $handle.offset().left;
                x += ($handle.width() / 2) - 1;

                this.pointerClick("single", {preventDefault: function () {}, pageX: x});
            }
        },

        /**
         * Mousemove or touchmove
         * only for handlers
         *
         * @param e {Object} event object
         */
        pointerMove: function (e) {
            if (!this.dragging) {
                return;
            }

            var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
            this.coords.x_pointer = x - this.coords.x_gap;

            this.calc();
        },

        /**
         * Mouseup or touchend
         * only for handlers
         *
         * @param e {Object} event object
         */
        pointerUp: function (e) {
            if (this.current_plugin !== this.plugin_count) {
                return;
            }

            if (this.is_active) {
                this.is_active = false;
            } else {
                return;
            }

            this.$cache.cont.find(".state_hover").removeClass("state_hover");

            this.force_redraw = true;

            if (is_old_ie) {
                $("*").prop("unselectable", false);
            }

            this.updateScene();
            this.restoreOriginalMinInterval();

            // callbacks call
            if ($.contains(this.$cache.cont[0], e.target) || this.dragging) {
                this.callOnFinish();
            }

            this.dragging = false;
        },

        /**
         * Mousedown or touchstart
         * only for handlers
         *
         * @param target {String|null}
         * @param e {Object} event object
         */
        pointerDown: function (target, e) {
            e.preventDefault();
            var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
            if (e.button === 2) {
                return;
            }

            if (target === "both") {
                this.setTempMinInterval();
            }

            if (!target) {
                target = this.target || "from";
            }

            this.current_plugin = this.plugin_count;
            this.target = target;

            this.is_active = true;
            this.dragging = true;

            this.coords.x_gap = this.$cache.rs.offset().left;
            this.coords.x_pointer = x - this.coords.x_gap;

            this.calcPointerPercent();
            this.changeLevel(target);

            if (is_old_ie) {
                $("*").prop("unselectable", true);
            }

            this.$cache.line.trigger("focus");

            this.updateScene();
        },

        /**
         * Mousedown or touchstart
         * for other slider elements, like diapason line
         *
         * @param target {String}
         * @param e {Object} event object
         */
        pointerClick: function (target, e) {
            e.preventDefault();
            var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
            if (e.button === 2) {
                return;
            }

            this.current_plugin = this.plugin_count;
            this.target = target;

            this.is_click = true;
            this.coords.x_gap = this.$cache.rs.offset().left;
            this.coords.x_pointer = +(x - this.coords.x_gap).toFixed();

            this.force_redraw = true;
            this.calc();

            this.$cache.line.trigger("focus");
        },

        /**
         * Keyborard controls for focused slider
         *
         * @param target {String}
         * @param e {Object} event object
         * @returns {boolean|undefined}
         */
        key: function (target, e) {
            if (this.current_plugin !== this.plugin_count || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
                return;
            }

            switch (e.which) {
                case 83: // W
                case 65: // A
                case 40: // DOWN
                case 37: // LEFT
                    e.preventDefault();
                    this.moveByKey(false);
                    break;

                case 87: // S
                case 68: // D
                case 38: // UP
                case 39: // RIGHT
                    e.preventDefault();
                    this.moveByKey(true);
                    break;
            }

            return true;
        },

        /**
         * Move by key
         *
         * @param right {boolean} direction to move
         */
        moveByKey: function (right) {
            var p = this.coords.p_pointer;
            var p_step = (this.options.max - this.options.min) / 100;
            p_step = this.options.step / p_step;

            if (right) {
                p += p_step;
            } else {
                p -= p_step;
            }

            this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * p);
            this.is_key = true;
            this.calc();
        },

        /**
         * Set visibility and content
         * of Min and Max labels
         */
        setMinMax: function () {
            if (!this.options) {
                return;
            }

            if (this.options.hide_min_max) {
                this.$cache.min[0].style.display = "none";
                this.$cache.max[0].style.display = "none";
                return;
            }

            if (this.options.values.length) {
                this.$cache.min.html(this.decorate(this.options.p_values[this.options.min]));
                this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));
            } else {
                var min_pretty = this._prettify(this.options.min);
                var max_pretty = this._prettify(this.options.max);

                this.result.min_pretty = min_pretty;
                this.result.max_pretty = max_pretty;

                this.$cache.min.html(this.decorate(min_pretty, this.options.min));
                this.$cache.max.html(this.decorate(max_pretty, this.options.max));
            }

            this.labels.w_min = this.$cache.min.outerWidth(false);
            this.labels.w_max = this.$cache.max.outerWidth(false);
        },

        /**
         * Then dragging interval, prevent interval collapsing
         * using min_interval option
         */
        setTempMinInterval: function () {
            var interval = this.result.to - this.result.from;

            if (this.old_min_interval === null) {
                this.old_min_interval = this.options.min_interval;
            }

            this.options.min_interval = interval;
        },

        /**
         * Restore min_interval option to original
         */
        restoreOriginalMinInterval: function () {
            if (this.old_min_interval !== null) {
                this.options.min_interval = this.old_min_interval;
                this.old_min_interval = null;
            }
        },



        // =============================================================================================================
        // Calculations

        /**
         * All calculations and measures start here
         *
         * @param update {boolean=}
         */
        calc: function (update) {
            if (!this.options) {
                return;
            }

            this.calc_count++;

            if (this.calc_count === 10 || update) {
                this.calc_count = 0;
                this.coords.w_rs = this.$cache.rs.outerWidth(false);

                this.calcHandlePercent();
            }

            if (!this.coords.w_rs) {
                return;
            }

            this.calcPointerPercent();
            var handle_x = this.getHandleX();


            if (this.target === "both") {
                this.coords.p_gap = 0;
                handle_x = this.getHandleX();
            }

            if (this.target === "click") {
                this.coords.p_gap = this.coords.p_handle / 2;
                handle_x = this.getHandleX();

                if (this.options.drag_interval) {
                    this.target = "both_one";
                } else {
                    this.target = this.chooseHandle(handle_x);
                }
            }

            switch (this.target) {
                case "base":
                    var w = (this.options.max - this.options.min) / 100,
                        f = (this.result.from - this.options.min) / w,
                        t = (this.result.to - this.options.min) / w;

                    this.coords.p_single_real = this.toFixed(f);
                    this.coords.p_from_real = this.toFixed(f);
                    this.coords.p_to_real = this.toFixed(t);

                    this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);

                    this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                    this.target = null;

                    break;

                case "single":
                    if (this.options.from_fixed) {
                        break;
                    }

                    this.coords.p_single_real = this.convertToRealPercent(handle_x);
                    this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real);
                    this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);

                    this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);

                    break;

                case "from":
                    if (this.options.from_fixed) {
                        break;
                    }

                    this.coords.p_from_real = this.convertToRealPercent(handle_x);
                    this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                    if (this.coords.p_from_real > this.coords.p_to_real) {
                        this.coords.p_from_real = this.coords.p_to_real;
                    }
                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                    this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                    this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");

                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

                    break;

                case "to":
                    if (this.options.to_fixed) {
                        break;
                    }

                    this.coords.p_to_real = this.convertToRealPercent(handle_x);
                    this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                    if (this.coords.p_to_real < this.coords.p_from_real) {
                        this.coords.p_to_real = this.coords.p_from_real;
                    }
                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                    this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                    this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");

                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                    break;

                case "both":
                    if (this.options.from_fixed || this.options.to_fixed) {
                        break;
                    }

                    handle_x = this.toFixed(handle_x + (this.coords.p_handle * 0.001));

                    this.coords.p_from_real = this.convertToRealPercent(handle_x) - this.coords.p_gap_left;
                    this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                    this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

                    this.coords.p_to_real = this.convertToRealPercent(handle_x) + this.coords.p_gap_right;
                    this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                    this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                    break;

                case "both_one":
                    if (this.options.from_fixed || this.options.to_fixed) {
                        break;
                    }

                    var real_x = this.convertToRealPercent(handle_x),
                        from = this.result.from_percent,
                        to = this.result.to_percent,
                        full = to - from,
                        half = full / 2,
                        new_from = real_x - half,
                        new_to = real_x + half;

                    if (new_from < 0) {
                        new_from = 0;
                        new_to = new_from + full;
                    }

                    if (new_to > 100) {
                        new_to = 100;
                        new_from = new_to - full;
                    }

                    this.coords.p_from_real = this.calcWithStep(new_from);
                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

                    this.coords.p_to_real = this.calcWithStep(new_to);
                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                    break;
            }

            if (this.options.type === "single") {
                this.coords.p_bar_x = (this.coords.p_handle / 2);
                this.coords.p_bar_w = this.coords.p_single_fake;

                this.result.from_percent = this.coords.p_single_real;
                this.result.from = this.convertToValue(this.coords.p_single_real);
                this.result.from_pretty = this._prettify(this.result.from);

                if (this.options.values.length) {
                    this.result.from_value = this.options.values[this.result.from];
                }
            } else {
                this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + (this.coords.p_handle / 2));
                this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake);

                this.result.from_percent = this.coords.p_from_real;
                this.result.from = this.convertToValue(this.coords.p_from_real);
                this.result.from_pretty = this._prettify(this.result.from);
                this.result.to_percent = this.coords.p_to_real;
                this.result.to = this.convertToValue(this.coords.p_to_real);
                this.result.to_pretty = this._prettify(this.result.to);

                if (this.options.values.length) {
                    this.result.from_value = this.options.values[this.result.from];
                    this.result.to_value = this.options.values[this.result.to];
                }
            }

            this.calcMinMax();
            this.calcLabels();
        },


        /**
         * calculates pointer X in percent
         */
        calcPointerPercent: function () {
            if (!this.coords.w_rs) {
                this.coords.p_pointer = 0;
                return;
            }

            if (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer)  ) {
                this.coords.x_pointer = 0;
            } else if (this.coords.x_pointer > this.coords.w_rs) {
                this.coords.x_pointer = this.coords.w_rs;
            }

            this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100);
        },

        convertToRealPercent: function (fake) {
            var full = 100 - this.coords.p_handle;
            return fake / full * 100;
        },

        convertToFakePercent: function (real) {
            var full = 100 - this.coords.p_handle;
            return real / 100 * full;
        },

        getHandleX: function () {
            var max = 100 - this.coords.p_handle,
                x = this.toFixed(this.coords.p_pointer - this.coords.p_gap);

            if (x < 0) {
                x = 0;
            } else if (x > max) {
                x = max;
            }

            return x;
        },

        calcHandlePercent: function () {
            if (this.options.type === "single") {
                this.coords.w_handle = this.$cache.s_single.outerWidth(false);
            } else {
                this.coords.w_handle = this.$cache.s_from.outerWidth(false);
            }

            this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
        },

        /**
         * Find closest handle to pointer click
         *
         * @param real_x {Number}
         * @returns {String}
         */
        chooseHandle: function (real_x) {
            if (this.options.type === "single") {
                return "single";
            } else {
                var m_point = this.coords.p_from_real + ((this.coords.p_to_real - this.coords.p_from_real) / 2);
                if (real_x >= m_point) {
                    return this.options.to_fixed ? "from" : "to";
                } else {
                    return this.options.from_fixed ? "to" : "from";
                }
            }
        },

        /**
         * Measure Min and Max labels width in percent
         */
        calcMinMax: function () {
            if (!this.coords.w_rs) {
                return;
            }

            this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100;
            this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100;
        },

        /**
         * Measure labels width and X in percent
         */
        calcLabels: function () {
            if (!this.coords.w_rs || this.options.hide_from_to) {
                return;
            }

            if (this.options.type === "single") {

                this.labels.w_single = this.$cache.single.outerWidth(false);
                this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
                this.labels.p_single_left = this.coords.p_single_fake + (this.coords.p_handle / 2) - (this.labels.p_single_fake / 2);
                this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);

            } else {

                this.labels.w_from = this.$cache.from.outerWidth(false);
                this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100;
                this.labels.p_from_left = this.coords.p_from_fake + (this.coords.p_handle / 2) - (this.labels.p_from_fake / 2);
                this.labels.p_from_left = this.toFixed(this.labels.p_from_left);
                this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake);

                this.labels.w_to = this.$cache.to.outerWidth(false);
                this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100;
                this.labels.p_to_left = this.coords.p_to_fake + (this.coords.p_handle / 2) - (this.labels.p_to_fake / 2);
                this.labels.p_to_left = this.toFixed(this.labels.p_to_left);
                this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake);

                this.labels.w_single = this.$cache.single.outerWidth(false);
                this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
                this.labels.p_single_left = ((this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2) - (this.labels.p_single_fake / 2);
                this.labels.p_single_left = this.toFixed(this.labels.p_single_left);
                this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);

            }
        },



        // =============================================================================================================
        // Drawings

        /**
         * Main function called in request animation frame
         * to update everything
         */
        updateScene: function () {
            if (this.raf_id) {
                cancelAnimationFrame(this.raf_id);
                this.raf_id = null;
            }

            clearTimeout(this.update_tm);
            this.update_tm = null;

            if (!this.options) {
                return;
            }

            this.drawHandles();

            if (this.is_active) {
                this.raf_id = requestAnimationFrame(this.updateScene.bind(this));
            } else {
                this.update_tm = setTimeout(this.updateScene.bind(this), 300);
            }
        },

        /**
         * Draw handles
         */
        drawHandles: function () {
            this.coords.w_rs = this.$cache.rs.outerWidth(false);

            if (!this.coords.w_rs) {
                return;
            }

            if (this.coords.w_rs !== this.coords.w_rs_old) {
                this.target = "base";
                this.is_resize = true;
            }

            if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) {
                this.setMinMax();
                this.calc(true);
                this.drawLabels();
                if (this.options.grid) {
                    this.calcGridMargin();
                    this.calcGridLabels();
                }
                this.force_redraw = true;
                this.coords.w_rs_old = this.coords.w_rs;
                this.drawShadow();
            }

            if (!this.coords.w_rs) {
                return;
            }

            if (!this.dragging && !this.force_redraw && !this.is_key) {
                return;
            }

            if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {

                this.drawLabels();

                this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
                this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";

                if (this.options.type === "single") {
                    this.$cache.bar[0].style.left = 0;
                    this.$cache.bar[0].style.width = this.coords.p_bar_w + this.coords.p_bar_x + "%";

                    this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%";

                    this.$cache.single[0].style.left = this.labels.p_single_left + "%";
                } else {
                    this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%";
                    this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%";

                    if (this.old_from !== this.result.from || this.force_redraw) {
                        this.$cache.from[0].style.left = this.labels.p_from_left + "%";
                    }
                    if (this.old_to !== this.result.to || this.force_redraw) {
                        this.$cache.to[0].style.left = this.labels.p_to_left + "%";
                    }

                    this.$cache.single[0].style.left = this.labels.p_single_left + "%";
                }

                this.writeToInput();

                if ((this.old_from !== this.result.from || this.old_to !== this.result.to) && !this.is_start) {
                    this.$cache.input.trigger("change");
                    this.$cache.input.trigger("input");
                }

                this.old_from = this.result.from;
                this.old_to = this.result.to;

                // callbacks call
                if (!this.is_resize && !this.is_update && !this.is_start && !this.is_finish) {
                    this.callOnChange();
                }
                if (this.is_key || this.is_click) {
                    this.is_key = false;
                    this.is_click = false;
                    this.callOnFinish();
                }

                this.is_update = false;
                this.is_resize = false;
                this.is_finish = false;
            }

            this.is_start = false;
            this.is_key = false;
            this.is_click = false;
            this.force_redraw = false;
        },

        /**
         * Draw labels
         * measure labels collisions
         * collapse close labels
         */
        drawLabels: function () {
            if (!this.options) {
                return;
            }

            var values_num = this.options.values.length;
            var p_values = this.options.p_values;
            var text_single;
            var text_from;
            var text_to;
            var from_pretty;
            var to_pretty;

            if (this.options.hide_from_to) {
                return;
            }

            if (this.options.type === "single") {

                if (values_num) {
                    text_single = this.decorate(p_values[this.result.from]);
                    this.$cache.single.html(text_single);
                } else {
                    from_pretty = this._prettify(this.result.from);

                    text_single = this.decorate(from_pretty, this.result.from);
                    this.$cache.single.html(text_single);
                }

                this.calcLabels();

                if (this.labels.p_single_left < this.labels.p_min + 1) {
                    this.$cache.min[0].style.visibility = "hidden";
                } else {
                    this.$cache.min[0].style.visibility = "visible";
                }

                if (this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1) {
                    this.$cache.max[0].style.visibility = "hidden";
                } else {
                    this.$cache.max[0].style.visibility = "visible";
                }

            } else {

                if (values_num) {

                    if (this.options.decorate_both) {
                        text_single = this.decorate(p_values[this.result.from]);
                        text_single += this.options.values_separator;
                        text_single += this.decorate(p_values[this.result.to]);
                    } else {
                        text_single = this.decorate(p_values[this.result.from] + this.options.values_separator + p_values[this.result.to]);
                    }
                    text_from = this.decorate(p_values[this.result.from]);
                    text_to = this.decorate(p_values[this.result.to]);

                    this.$cache.single.html(text_single);
                    this.$cache.from.html(text_from);
                    this.$cache.to.html(text_to);

                } else {
                    from_pretty = this._prettify(this.result.from);
                    to_pretty = this._prettify(this.result.to);

                    if (this.options.decorate_both) {
                        text_single = this.decorate(from_pretty, this.result.from);
                        text_single += this.options.values_separator;
                        text_single += this.decorate(to_pretty, this.result.to);
                    } else {
                        text_single = this.decorate(from_pretty + this.options.values_separator + to_pretty, this.result.to);
                    }
                    text_from = this.decorate(from_pretty, this.result.from);
                    text_to = this.decorate(to_pretty, this.result.to);

                    this.$cache.single.html(text_single);
                    this.$cache.from.html(text_from);
                    this.$cache.to.html(text_to);

                }

                this.calcLabels();

                var min = Math.min(this.labels.p_single_left, this.labels.p_from_left),
                    single_left = this.labels.p_single_left + this.labels.p_single_fake,
                    to_left = this.labels.p_to_left + this.labels.p_to_fake,
                    max = Math.max(single_left, to_left);

                if (this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left) {
                    this.$cache.from[0].style.visibility = "hidden";
                    this.$cache.to[0].style.visibility = "hidden";
                    this.$cache.single[0].style.visibility = "visible";

                    if (this.result.from === this.result.to) {
                        if (this.target === "from") {
                            this.$cache.from[0].style.visibility = "visible";
                        } else if (this.target === "to") {
                            this.$cache.to[0].style.visibility = "visible";
                        } else if (!this.target) {
                            this.$cache.from[0].style.visibility = "visible";
                        }
                        this.$cache.single[0].style.visibility = "hidden";
                        max = to_left;
                    } else {
                        this.$cache.from[0].style.visibility = "hidden";
                        this.$cache.to[0].style.visibility = "hidden";
                        this.$cache.single[0].style.visibility = "visible";
                        max = Math.max(single_left, to_left);
                    }
                } else {
                    this.$cache.from[0].style.visibility = "visible";
                    this.$cache.to[0].style.visibility = "visible";
                    this.$cache.single[0].style.visibility = "hidden";
                }

                if (min < this.labels.p_min + 1) {
                    this.$cache.min[0].style.visibility = "hidden";
                } else {
                    this.$cache.min[0].style.visibility = "visible";
                }

                if (max > 100 - this.labels.p_max - 1) {
                    this.$cache.max[0].style.visibility = "hidden";
                } else {
                    this.$cache.max[0].style.visibility = "visible";
                }

            }
        },

        /**
         * Draw shadow intervals
         */
        drawShadow: function () {
            var o = this.options,
                c = this.$cache,

                is_from_min = typeof o.from_min === "number" && !isNaN(o.from_min),
                is_from_max = typeof o.from_max === "number" && !isNaN(o.from_max),
                is_to_min = typeof o.to_min === "number" && !isNaN(o.to_min),
                is_to_max = typeof o.to_max === "number" && !isNaN(o.to_max),

                from_min,
                from_max,
                to_min,
                to_max;

            if (o.type === "single") {
                if (o.from_shadow && (is_from_min || is_from_max)) {
                    from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
                    from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
                    from_min = this.toFixed(from_min - (this.coords.p_handle / 100 * from_min));
                    from_max = this.toFixed(from_max - (this.coords.p_handle / 100 * from_max));
                    from_min = from_min + (this.coords.p_handle / 2);

                    c.shad_single[0].style.display = "block";
                    c.shad_single[0].style.left = from_min + "%";
                    c.shad_single[0].style.width = from_max + "%";
                } else {
                    c.shad_single[0].style.display = "none";
                }
            } else {
                if (o.from_shadow && (is_from_min || is_from_max)) {
                    from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
                    from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
                    from_min = this.toFixed(from_min - (this.coords.p_handle / 100 * from_min));
                    from_max = this.toFixed(from_max - (this.coords.p_handle / 100 * from_max));
                    from_min = from_min + (this.coords.p_handle / 2);

                    c.shad_from[0].style.display = "block";
                    c.shad_from[0].style.left = from_min + "%";
                    c.shad_from[0].style.width = from_max + "%";
                } else {
                    c.shad_from[0].style.display = "none";
                }

                if (o.to_shadow && (is_to_min || is_to_max)) {
                    to_min = this.convertToPercent(is_to_min ? o.to_min : o.min);
                    to_max = this.convertToPercent(is_to_max ? o.to_max : o.max) - to_min;
                    to_min = this.toFixed(to_min - (this.coords.p_handle / 100 * to_min));
                    to_max = this.toFixed(to_max - (this.coords.p_handle / 100 * to_max));
                    to_min = to_min + (this.coords.p_handle / 2);

                    c.shad_to[0].style.display = "block";
                    c.shad_to[0].style.left = to_min + "%";
                    c.shad_to[0].style.width = to_max + "%";
                } else {
                    c.shad_to[0].style.display = "none";
                }
            }
        },



        /**
         * Write values to input element
         */
        writeToInput: function () {
            if (this.options.type === "single") {
                if (this.options.values.length) {
                    this.$cache.input.prop("value", this.result.from_value);
                } else {
                    this.$cache.input.prop("value", this.result.from);
                }
                this.$cache.input.data("from", this.result.from);
            } else {
                if (this.options.values.length) {
                    this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value);
                } else {
                    this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to);
                }
                this.$cache.input.data("from", this.result.from);
                this.$cache.input.data("to", this.result.to);
            }
        },



        // =============================================================================================================
        // Callbacks

        callOnStart: function () {
            this.writeToInput();

            if (this.options.onStart && typeof this.options.onStart === "function") {
                if (this.options.scope) {
                    this.options.onStart.call(this.options.scope, this.result);
                } else {
                    this.options.onStart(this.result);
                }
            }
        },
        callOnChange: function () {
            this.writeToInput();

            if (this.options.onChange && typeof this.options.onChange === "function") {
                if (this.options.scope) {
                    this.options.onChange.call(this.options.scope, this.result);
                } else {
                    this.options.onChange(this.result);
                }
            }
        },
        callOnFinish: function () {
            this.writeToInput();

            if (this.options.onFinish && typeof this.options.onFinish === "function") {
                if (this.options.scope) {
                    this.options.onFinish.call(this.options.scope, this.result);
                } else {
                    this.options.onFinish(this.result);
                }
            }
        },
        callOnUpdate: function () {
            this.writeToInput();

            if (this.options.onUpdate && typeof this.options.onUpdate === "function") {
                if (this.options.scope) {
                    this.options.onUpdate.call(this.options.scope, this.result);
                } else {
                    this.options.onUpdate(this.result);
                }
            }
        },




        // =============================================================================================================
        // Service methods

        toggleInput: function () {
            this.$cache.input.toggleClass("range-slider__input");

            if (this.has_tab_index) {
                this.$cache.input.prop("tabindex", -1);
            } else {
                this.$cache.input.removeProp("tabindex");
            }

            this.has_tab_index = !this.has_tab_index;
        },

        /**
         * Convert real value to percent
         *
         * @param value {Number} X in real
         * @param no_min {boolean=} don't use min value
         * @returns {Number} X in percent
         */
        convertToPercent: function (value, no_min) {
            var diapason = this.options.max - this.options.min,
                one_percent = diapason / 100,
                val, percent;

            if (!diapason) {
                this.no_diapason = true;
                return 0;
            }

            if (no_min) {
                val = value;
            } else {
                val = value - this.options.min;
            }

            percent = val / one_percent;

            return this.toFixed(percent);
        },

        /**
         * Convert percent to real values
         *
         * @param percent {Number} X in percent
         * @returns {Number} X in real
         */
        convertToValue: function (percent) {
            var min = this.options.min,
                max = this.options.max,
                min_decimals = min.toString().split(".")[1],
                max_decimals = max.toString().split(".")[1],
                min_length, max_length,
                avg_decimals = 0,
                abs = 0;

            if (percent === 0) {
                return this.options.min;
            }
            if (percent === 100) {
                return this.options.max;
            }


            if (min_decimals) {
                min_length = min_decimals.length;
                avg_decimals = min_length;
            }
            if (max_decimals) {
                max_length = max_decimals.length;
                avg_decimals = max_length;
            }
            if (min_length && max_length) {
                avg_decimals = (min_length >= max_length) ? min_length : max_length;
            }

            if (min < 0) {
                abs = Math.abs(min);
                min = +(min + abs).toFixed(avg_decimals);
                max = +(max + abs).toFixed(avg_decimals);
            }

            var number = ((max - min) / 100 * percent) + min,
                string = this.options.step.toString().split(".")[1],
                result;

            if (string) {
                number = +number.toFixed(string.length);
            } else {
                number = number / this.options.step;
                number = number * this.options.step;

                number = +number.toFixed(0);
            }

            if (abs) {
                number -= abs;
            }

            if (string) {
                result = +number.toFixed(string.length);
            } else {
                result = this.toFixed(number);
            }

            if (result < this.options.min) {
                result = this.options.min;
            } else if (result > this.options.max) {
                result = this.options.max;
            }

            return result;
        },

        /**
         * Round percent value with step
         *
         * @param percent {Number}
         * @returns percent {Number} rounded
         */
        calcWithStep: function (percent) {
            var rounded = Math.round(percent / this.coords.p_step) * this.coords.p_step;

            if (rounded > 100) {
                rounded = 100;
            }
            if (percent === 100) {
                rounded = 100;
            }

            return this.toFixed(rounded);
        },

        checkMinInterval: function (p_current, p_next, type) {
            var o = this.options,
                current,
                next;

            if (!o.min_interval) {
                return p_current;
            }

            current = this.convertToValue(p_current);
            next = this.convertToValue(p_next);

            if (type === "from") {

                if (next - current < o.min_interval) {
                    current = next - o.min_interval;
                }

            } else {

                if (current - next < o.min_interval) {
                    current = next + o.min_interval;
                }

            }

            return this.convertToPercent(current);
        },

        checkMaxInterval: function (p_current, p_next, type) {
            var o = this.options,
                current,
                next;

            if (!o.max_interval) {
                return p_current;
            }

            current = this.convertToValue(p_current);
            next = this.convertToValue(p_next);

            if (type === "from") {

                if (next - current > o.max_interval) {
                    current = next - o.max_interval;
                }

            } else {

                if (current - next > o.max_interval) {
                    current = next + o.max_interval;
                }

            }

            return this.convertToPercent(current);
        },

        checkDiapason: function (p_num, min, max) {
            var num = this.convertToValue(p_num),
                o = this.options;

            if (typeof min !== "number") {
                min = o.min;
            }

            if (typeof max !== "number") {
                max = o.max;
            }

            if (num < min) {
                num = min;
            }

            if (num > max) {
                num = max;
            }

            return this.convertToPercent(num);
        },

        toFixed: function (num) {
            num = num.toFixed(20);
            return +num;
        },

        _prettify: function (num) {
            if (!this.options.prettify_enabled) {
                return num;
            }

            if (this.options.prettify && typeof this.options.prettify === "function") {
                return this.options.prettify(num);
            } else {
                return this.prettify(num);
            }
        },

        prettify: function (num) {
            var n = num.toString();
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator);
        },

        checkEdges: function (left, width) {
            if (!this.options.force_edges) {
                return this.toFixed(left);
            }

            if (left < 0) {
                left = 0;
            } else if (left > 100 - width) {
                left = 100 - width;
            }

            return this.toFixed(left);
        },

        validate: function () {
            var o = this.options,
                r = this.result,
                v = o.values,
                vl = v.length,
                value,
                i;

            if (typeof o.min === "string") o.min = +o.min;
            if (typeof o.max === "string") o.max = +o.max;
            if (typeof o.from === "string") o.from = +o.from;
            if (typeof o.to === "string") o.to = +o.to;
            if (typeof o.step === "string") o.step = +o.step;

            if (typeof o.from_min === "string") o.from_min = +o.from_min;
            if (typeof o.from_max === "string") o.from_max = +o.from_max;
            if (typeof o.to_min === "string") o.to_min = +o.to_min;
            if (typeof o.to_max === "string") o.to_max = +o.to_max;

            if (typeof o.grid_num === "string") o.grid_num = +o.grid_num;

            if (o.max < o.min) {
                o.max = o.min;
            }

            if (vl) {
                o.p_values = [];
                o.min = 0;
                o.max = vl - 1;
                o.step = 1;
                o.grid_num = o.max;
                o.grid_snap = true;

                for (i = 0; i < vl; i++) {
                    value = +v[i];

                    if (!isNaN(value)) {
                        v[i] = value;
                        value = this._prettify(value);
                    } else {
                        value = v[i];
                    }

                    o.p_values.push(value);
                }
            }

            if (typeof o.from !== "number" || isNaN(o.from)) {
                o.from = o.min;
            }

            if (typeof o.to !== "number" || isNaN(o.to)) {
                o.to = o.max;
            }

            if (o.type === "single") {

                if (o.from < o.min) o.from = o.min;
                if (o.from > o.max) o.from = o.max;

            } else {

                if (o.from < o.min) o.from = o.min;
                if (o.from > o.max) o.from = o.max;

                if (o.to < o.min) o.to = o.min;
                if (o.to > o.max) o.to = o.max;

                if (this.update_check.from) {

                    if (this.update_check.from !== o.from) {
                        if (o.from > o.to) o.from = o.to;
                    }
                    if (this.update_check.to !== o.to) {
                        if (o.to < o.from) o.to = o.from;
                    }

                }

                if (o.from > o.to) o.from = o.to;
                if (o.to < o.from) o.to = o.from;

            }

            if (typeof o.step !== "number" || isNaN(o.step) || !o.step || o.step < 0) {
                o.step = 1;
            }

            if (typeof o.from_min === "number" && o.from < o.from_min) {
                o.from = o.from_min;
            }

            if (typeof o.from_max === "number" && o.from > o.from_max) {
                o.from = o.from_max;
            }

            if (typeof o.to_min === "number" && o.to < o.to_min) {
                o.to = o.to_min;
            }

            if (typeof o.to_max === "number" && o.from > o.to_max) {
                o.to = o.to_max;
            }

            if (r) {
                if (r.min !== o.min) {
                    r.min = o.min;
                }

                if (r.max !== o.max) {
                    r.max = o.max;
                }

                if (r.from < r.min || r.from > r.max) {
                    r.from = o.from;
                }

                if (r.to < r.min || r.to > r.max) {
                    r.to = o.to;
                }
            }

            if (typeof o.min_interval !== "number" || isNaN(o.min_interval) || !o.min_interval || o.min_interval < 0) {
                o.min_interval = 0;
            }

            if (typeof o.max_interval !== "number" || isNaN(o.max_interval) || !o.max_interval || o.max_interval < 0) {
                o.max_interval = 0;
            }

            if (o.min_interval && o.min_interval > o.max - o.min) {
                o.min_interval = o.max - o.min;
            }

            if (o.max_interval && o.max_interval > o.max - o.min) {
                o.max_interval = o.max - o.min;
            }
        },

        decorate: function (num, original) {
            var decorated = "",
                o = this.options;

            if (o.prefix) {
                decorated += o.prefix;
            }

            decorated += num;

            if (o.max_postfix) {
                if (o.values.length && num === o.p_values[o.max]) {
                    decorated += o.max_postfix;
                    if (o.postfix) {
                        decorated += " ";
                    }
                } else if (original === o.max) {
                    decorated += o.max_postfix;
                    if (o.postfix) {
                        decorated += " ";
                    }
                }
            }

            if (o.postfix) {
                decorated += o.postfix;
            }

            return decorated;
        },

        updateFrom: function () {
            this.result.from = this.options.from;
            this.result.from_percent = this.convertToPercent(this.result.from);
            this.result.from_pretty = this._prettify(this.result.from);
            if (this.options.values) {
                this.result.from_value = this.options.values[this.result.from];
            }
        },

        updateTo: function () {
            this.result.to = this.options.to;
            this.result.to_percent = this.convertToPercent(this.result.to);
            this.result.to_pretty = this._prettify(this.result.to);
            if (this.options.values) {
                this.result.to_value = this.options.values[this.result.to];
            }
        },

        updateResult: function () {
            this.result.min = this.options.min;
            this.result.max = this.options.max;
            this.updateFrom();
            this.updateTo();
        },


        // =============================================================================================================
        // Grid

        appendGrid: function () {
            if (!this.options.grid) {
                return;
            }

            var o = this.options,
                i, z,

                total = o.max - o.min,
                big_num = o.grid_num,
                big_p = 0,
                big_w = 0,

                small_max = 4,
                local_small_max,
                small_p,
                small_w = 0,

                result,
                html = '';



            this.calcGridMargin();

            if (o.grid_snap) {
                big_num = total / o.step;
            }

            if (big_num > 50) big_num = 50;
            big_p = this.toFixed(100 / big_num);

            if (big_num > 4) {
                small_max = 3;
            }
            if (big_num > 7) {
                small_max = 2;
            }
            if (big_num > 14) {
                small_max = 1;
            }
            if (big_num > 28) {
                small_max = 0;
            }

            for (i = 0; i < big_num + 1; i++) {
                local_small_max = small_max;

                big_w = this.toFixed(big_p * i);

                if (big_w > 100) {
                    big_w = 100;
                }
                this.coords.big[i] = big_w;

                small_p = (big_w - (big_p * (i - 1))) / (local_small_max + 1);

                for (z = 1; z <= local_small_max; z++) {
                    if (big_w === 0) {
                        break;
                    }

                    small_w = this.toFixed(big_w - (small_p * z));

                    html += '<span class="irs-grid-pol small" style="left: ' + small_w + '%"></span>';
                }

                html += '<span class="irs-grid-pol" style="left: ' + big_w + '%"></span>';

                result = this.convertToValue(big_w);
                if (o.values.length) {
                    result = o.p_values[result];
                } else {
                    result = this._prettify(result);
                }

                html += '<span class="irs-grid-text js-grid-text-' + i + '" style="left: ' + big_w + '%">' + result + '</span>';
            }
            this.coords.big_num = Math.ceil(big_num + 1);



            this.$cache.cont.addClass("irs-with-grid");
            this.$cache.grid.html(html);
            this.cacheGridLabels();
        },

        cacheGridLabels: function () {
            var $label, i,
                num = this.coords.big_num;

            for (i = 0; i < num; i++) {
                $label = this.$cache.grid.find(".js-grid-text-" + i);
                this.$cache.grid_labels.push($label);
            }

            this.calcGridLabels();
        },

        calcGridLabels: function () {
            var i, label, start = [], finish = [],
                num = this.coords.big_num;

            for (i = 0; i < num; i++) {
                this.coords.big_w[i] = this.$cache.grid_labels[i].outerWidth(false);
                this.coords.big_p[i] = this.toFixed(this.coords.big_w[i] / this.coords.w_rs * 100);
                this.coords.big_x[i] = this.toFixed(this.coords.big_p[i] / 2);

                start[i] = this.toFixed(this.coords.big[i] - this.coords.big_x[i]);
                finish[i] = this.toFixed(start[i] + this.coords.big_p[i]);
            }

            if (this.options.force_edges) {
                if (start[0] < -this.coords.grid_gap) {
                    start[0] = -this.coords.grid_gap;
                    finish[0] = this.toFixed(start[0] + this.coords.big_p[0]);

                    this.coords.big_x[0] = this.coords.grid_gap;
                }

                if (finish[num - 1] > 100 + this.coords.grid_gap) {
                    finish[num - 1] = 100 + this.coords.grid_gap;
                    start[num - 1] = this.toFixed(finish[num - 1] - this.coords.big_p[num - 1]);

                    this.coords.big_x[num - 1] = this.toFixed(this.coords.big_p[num - 1] - this.coords.grid_gap);
                }
            }

            this.calcGridCollision(2, start, finish);
            this.calcGridCollision(4, start, finish);

            for (i = 0; i < num; i++) {
                label = this.$cache.grid_labels[i][0];

                if (this.coords.big_x[i] !== Number.POSITIVE_INFINITY) {
                    label.style.marginLeft = -this.coords.big_x[i] + "%";
                }
            }
        },

        // Collisions Calc Beta
        // TODO: Refactor then have plenty of time
        calcGridCollision: function (step, start, finish) {
            var i, next_i, label,
                num = this.coords.big_num;

            for (i = 0; i < num; i += step) {
                next_i = i + (step / 2);
                if (next_i >= num) {
                    break;
                }

                label = this.$cache.grid_labels[next_i][0];

                if (finish[i] <= start[next_i]) {
                    label.style.visibility = "visible";
                } else {
                    label.style.visibility = "hidden";
                }
            }
        },

        calcGridMargin: function () {
            if (!this.options.grid_margin) {
                return;
            }

            this.coords.w_rs = this.$cache.rs.outerWidth(false);
            if (!this.coords.w_rs) {
                return;
            }

            if (this.options.type === "single") {
                this.coords.w_handle = this.$cache.s_single.outerWidth(false);
            } else {
                this.coords.w_handle = this.$cache.s_from.outerWidth(false);
            }
            this.coords.p_handle = this.toFixed(this.coords.w_handle  / this.coords.w_rs * 100);
            this.coords.grid_gap = this.toFixed((this.coords.p_handle / 2) - 0.1);

            this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%";
            this.$cache.grid[0].style.left = this.coords.grid_gap + "%";
        },



        // =============================================================================================================
        // Public methods

        update: function (options) {
            if (!this.input) {
                return;
            }

            this.is_update = true;

            this.options.from = this.result.from;
            this.options.to = this.result.to;
            this.update_check.from = this.result.from;
            this.update_check.to = this.result.to;

            this.options = $.extend(this.options, options);
            this.validate();
            this.updateResult(options);

            this.toggleInput();
            this.remove();
            this.init(true);
        },

        reset: function () {
            if (!this.input) {
                return;
            }

            this.updateResult();
            this.update();
        },

        destroy: function () {
            if (!this.input) {
                return;
            }

            this.toggleInput();
            this.$cache.input.prop("readonly", false);
            $.data(this.input, "ionRangeSlider", null);

            this.remove();
            this.input = null;
            this.options = null;
        }
    };

    $.fn.ionRangeSlider = function (options) {
        return this.each(function() {
            if (!$.data(this, "ionRangeSlider")) {
                $.data(this, "ionRangeSlider", new IonRangeSlider(this, options, plugin_count++));
            }
        });
    };



    // =================================================================================================================
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

    // MIT license

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

}));

// 1) реализовать логику очистки поля поиска по нажатию на кнопку "крестик" и появления этой кнопки
//    в зависимости от полноты поля (нативная логика поля "search" только с кастомной кнопкой);
$(function() {

    $('[data-name="search-button"]').on( "click", function() {
        $('[data-name="search-content"]').toggleClass("search-content_open");
    });
});
