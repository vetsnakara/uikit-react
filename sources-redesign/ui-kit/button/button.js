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
