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
