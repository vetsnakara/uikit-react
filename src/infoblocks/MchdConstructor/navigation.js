// const ClassName = {
//     container: "navigation",
//     item: "navigation__item",
//     active: "navigation__item_active",
//     preview: "navigation__preview",
//     navOpen: "navigation_open",
// };
// const Selectors = {
//     navContainer: `.${ClassName.container}`,
//     navControl: `.${ClassName.item}`,
//     navActiveControl: `.${ClassName.active}`,
//     navPreview: `.${ClassName.preview}`,
//     navProgress: ".navigation_progress",
// };

// /**
//  * Контролл ScrollSay
//  */
// class ScrollSpy {
//     /**
//      * Конструктор
//      * @param {Element} container - контейнер навигации
//      * @param {boolean} _isScrollTop - флаг для инициализации сайдбара без автоскрола по хешу в урле
//      */
//     constructor(container, _isScrollTop) {
//         this.container = container;
//         this.$container = $(container);
//         this.navPreview = $(Selectors.navPreview, container);
//         this.offset = 20;
//         this._offsets = [];
//         this._targets = [];
//         this._scrollHeight = 0;
//         this._activeTarget = null;

//         $(document).on("scroll", (event) => this._process(event));
//         this.navPreview.on("click", () => {
//             this._navClickHandler();
//         });

//         if (_isScrollTop) {
//             this._activeTarget = this._targets[0];
//         } else {
//             this._refresh();
//             this._process();
//         }
//     }

//     _navClickHandler() {
//         this.$container.toggleClass(ClassName.navOpen);
//     }

//     _refresh() {
//         this._scrollHeight = this._getScrollHeight();
//         this._offsets = [];
//         this._targets = [];

//         const navItems = [].slice.call(this.container.querySelectorAll(Selectors.navControl));
//         if (navItems.length) {
//             navItems
//                 .map((item) => {
//                     let target;
//                     const targetSelector = Util.getSelectorFromElement(item);
//                     if (targetSelector) {
//                         target = document.querySelector(targetSelector);
//                     }
//                     if (target && $(target).is(":visible")) {
//                         return [$(target).offset().top, targetSelector];
//                     } else {
//                         return null;
//                     }
//                 })
//                 .filter((item) => item)
//                 .sort((a, b) => a[0] - b[0])
//                 .forEach((item) => {
//                     this._offsets.push(item[0]);
//                     this._targets.push(item[1]);
//                 });
//         }
//     }

//     /**
//      * Возвращает количество пикселей на которое прокрученная страница
//      * @return {number}
//      * @private
//      */
//     _getScrollTop() {
//         return window.pageYOffset;
//     }

//     /**
//      * Возвращает высоту контента в элементе, включая содержимое, невидимое из-за прокрутки.
//      * @return {number}
//      * @private
//      */
//     _getScrollHeight() {
//         return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
//     }

//     /**
//      * Возвращает высоту (в пикселях) области просмотра окна браузера, включая, если отображается, горизонтальную полосу прокрутки
//      * @return {number}
//      * @private
//      */
//     _getOffsetHeight() {
//         return window.innerHeight;
//     }

//     /**
//      * Переключение активного итема навигации
//      * @private
//      */
//     _process() {
//         const scrollTop = this._getScrollTop() + this.offset;
//         const scrollHeight = this._getScrollHeight();
//         const maxScroll = this.offset + scrollHeight - this._getOffsetHeight();

//         if (this._scrollHeight !== scrollHeight) {
//             this._refresh();
//         }

//         if (scrollTop < this._offsets[0]) {
//             const target = this._targets[0];

//             if (this._activeTarget !== target) {
//                 this._activate(target);
//             }
//             return true;
//         }

//         if (scrollTop >= maxScroll) {
//             const target = this._targets[this._targets.length - 1];

//             if (this._activeTarget !== target) {
//                 this._activate(target);
//             }
//             return true;
//         }

//         if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
//             this._activeTarget = null;
//             this._clear();
//             return true;
//         }

//         for (let i = this._offsets.length; i--; ) {
//             const isActiveTarget =
//                 this._activeTarget !== this._targets[i] &&
//                 scrollTop >= this._offsets[i] &&
//                 (typeof this._offsets[i + 1] === "undefined" || scrollTop < this._offsets[i + 1]);

//             if (isActiveTarget) {
//                 this._activate(this._targets[i]);
//             }
//         }
//     }

//     /**
//      * Откладывает вызов метода на указанный период, новые вызовы запускают таймер сначала
//      * @private
//      */
//     _postpone(callback, limit = 1000) {
//         var currentTimer = null;
//         return function () {
//             if (currentTimer) clearTimeout(currentTimer);
//             currentTimer = setTimeout(() => {
//                 callback.apply(this, arguments);
//             }, limit);
//         };
//     }

//     /**
//      * Меняет location.hash в соответствии с активным пунктом навигации
//      * @private
//      */
//     _updatehash = this._postpone(function () {
//         var hash = arguments[0].replace(/^#/, "");
//         var fx,
//             node = $("#" + hash);
//         if (node.length) {
//             node.attr("id", "");
//             fx = $("<div></div>")
//                 .css({ position: "absolute", visibility: "hidden", top: $(document).scrollTop() + "px" })
//                 .attr("id", hash)
//                 .appendTo(document.body);
//         }

//         window.location.hash = hash;

//         if (node.length) {
//             fx.remove();
//             node.attr("id", hash);
//         }
//     }, 3000);

//     /**
//      * Активирует навигационный итем
//      * @param target
//      * @private
//      */
//     _activate(target) {
//         this._activeTarget = target;
//         this._clear();
//         const link = $(`a[href="${target}"]`, $(this.container));
//         if (link) {
//             this._updatehash(target);
//             link.addClass(ClassName.active);
//             this.navPreview.text(link.text());
//             this.$container.removeClass(ClassName.navOpen);
//             if (this.$container.is(Selectors.navProgress)) {
//                 this.navPreview.attr("data-progress", link.data("progress"));
//             }
//         }
//     }

//     /**
//      * Очищает классы активности навигационного итема
//      * @private
//      */
//     _clear() {
//         [].slice
//             .call(this.container.querySelectorAll(Selectors.navControl))
//             .filter((node) => node.classList.contains(ClassName.active))
//             .forEach((node) => node.classList.remove(ClassName.active));
//     }
// }
// //  инициализация логики работы скрола в сайдбаре в зависимости от аттрибута data-scrollTop

// export const initNavigation = () => {
//     const container = $(Selectors.navContainer);
//     if (container.length) {
//         const _isScrollTop = container.get(0).hasAttribute("data-scrollTop");
//         if (_isScrollTop) {
//             $(document).on("scroll", resetDefault.bind(_isScrollTop));
//             setTimeout(() => {
//                 window.history.pushState("", document.title, window.location.pathname);
//                 if (!$(document).scrollTop()) {
//                     $(document).trigger("scroll");
//                 } else {
//                     $(document).scrollTop(0);
//                 }
//             }, 200);
//         } else {
//             new ScrollSpy(container.get(0), _isScrollTop);
//         }
//     }

//     function resetDefault(_isScrollTop) {
//         if ($(document).scrollTop() === 0) {
//             $(document).off("scroll", resetDefault.bind(_isScrollTop));
//             new ScrollSpy(container.get(0), _isScrollTop);
//         }
//     }
// };
