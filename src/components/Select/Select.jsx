import cn from "classnames";
import { forwardRef, memo, useEffect, useRef } from "react";

import { composeRef } from "@/utils";
import { Icon } from "@/components";

import { SelectEvent, selectpickerEventHandlers } from "./constants";

const defaultSelectpickerOptions = {};
const defaultItems = [];

const renderOptions = (items) =>
    items.map(
        (
            {
                value,
                label,
                items: groupItems,
                disabled,
                token = "",
                title = "",
                content = "",
                subtext = "",
                className = "",
                divider,
                style,
            },
            index
        ) =>
            groupItems ? (
                <optgroup key={label || index} label={label} disabled={disabled}>
                    {renderOptions(groupItems)}
                </optgroup>
            ) : (
                <option
                    key={value || `noValue${index}`}
                    title={title}
                    value={value}
                    disabled={disabled}
                    data-tokens={token}
                    data-content={content}
                    data-subtext={subtext}
                    data-divider={divider}
                    className={className}
                    style={style}
                >
                    {label}
                </option>
            )
    );

export const Select = memo(
    forwardRef((props, extRef) => {
        const {
            value,
            items = defaultItems,
            selectpickerOptions = defaultSelectpickerOptions,
            title,
            label,
            placeholder,
            error,
            multiple,
            disabled,
            closeable,
            noDecor,
            onChange,
            onClose,
            className,
            ...selectOptions
        } = props;

        const ref = useRef(null);
        const callbackRef = composeRef(ref, extRef);

        const { ajaxOptions, addItemsOptions } = selectpickerOptions;

        useEffect(() => {
            const $select = $(ref.current);

            const baseSelectpickerOptions = _.omit(selectpickerOptions, ["ajaxOptions", "addItemsOptions"]);

            if (ajaxOptions) {
                // note: для корректной работы ajax используем базовый конструктор селектпикера,
                // т.к. в initBootstrapSelect реализовано кеширование опций, которое ломает
                // поведение ajax-селектпикера (после закрытия дропдауна выбранные опции слетают)
                $select.selectpicker(baseSelectpickerOptions);
            } else {
                window.initBootstrapSelect(ref.current, baseSelectpickerOptions);
            }

            // init plugins
            if (ajaxOptions) $select.ajaxSelectPicker(ajaxOptions);
            if (addItemsOptions) $select.addSelectPicker(addItemsOptions);

            // add selectpicker event handlers
            Object.entries(selectOptions).forEach(([propName, fn]) => {
                const [, eventName] = propName.split("on");
                if (!eventName) return;
                const eventNameUppercase = eventName.toUpperCase();
                if (eventNameUppercase in SelectEvent) {
                    const selectpickerEventName = SelectEvent[eventNameUppercase];
                    $select.on(selectpickerEventName, fn);
                }
            });

            return () => {
                $select.data("AddBootstrapSelect")?.destroy();
                $select.off().selectpicker("destroy");
            };
        }, [placeholder, multiple, disabled, JSON.stringify(items), JSON.stringify(selectpickerOptions), onChange]);

        useEffect(() => {
            if (!_.isUndefined(value)) {
                const $select = $(ref.current);

                $select.val(value);
                $select.selectpicker("refresh");
            }
        }, [value]);

        const handleChange = (event) => {
            const {
                target: { options, value },
            } = event;

            const values = Array.from(options)
                .filter(({ selected }) => selected)
                .map(({ value }) => value);

            const newValue = multiple ? values : value;

            onChange?.(newValue, event);
        };

        const labelClassNames = cn(
            "select",
            {
                [`${closeable ? "select_closeable_error" : "select_error"}`]: error,
                select_closeable: closeable,
                "select_no-decor": noDecor,
                select_required: selectOptions.required,
            },
            className
        );

        const selectClassNames = cn("select__control", {
            dropup: selectpickerOptions.dropupAuto === false,
        });

        const isDisabled = disabled || (!ajaxOptions && !items.length);

        return (
            <label className={labelClassNames}>
                <select
                    ref={callbackRef}
                    data-init="false"
                    className={selectClassNames}
                    value={value}
                    onChange={handleChange}
                    multiple={multiple}
                    disabled={isDisabled}
                    title={placeholder}
                    {..._.omit(selectOptions, selectpickerEventHandlers)}
                >
                    {/* <option data-hidden="true" key="default" /> */}
                    {renderOptions(items)}
                </select>

                {closeable && (
                    <button type="button" className="button button_plain button_icon select__close" onClick={onClose}>
                        <Icon name="close" className="button__icon select__close-icon" />
                    </button>
                )}

                {title && !closeable && <span className="select__title">{title}</span>}

                {/* is used with noDecor mode */}
                {label && !closeable && <span className="select__label">{label}</span>}

                {error && !closeable && !noDecor && <span className="select__error">{error}</span>}
            </label>
        );
    }),
    _.isEqual // deep comparison
);
