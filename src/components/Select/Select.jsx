import { memo, forwardRef, useEffect, useRef } from "react";
import cn from "classnames";

import { useElementRef } from "../../hooks/useElementRef";
import { SelectEvent, selectpickerEventHandlers } from "./constants";

const defaultSelectpickerOptions = {};
const defaultItems = [];

// todo: "All" options for single/multiple select (how to set?)
// todo: empty option (how to set?)

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
    forwardRef(
        (
            {
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
                // onBlur, // todo: is needed for useForm (?)
                className,
                ...selectOptions
            },
            extRef
        ) => {
            const { ajaxOptions, addItemsOptions } = selectpickerOptions;

            const ref = useRef({});

            // todo: useCallback ???
            // todo: abstract this common logic
            const callbackRef = (el) => {
                ref.current = el
                    ? {
                          el,
                          getValue: () => {
                              const { options, value } = el;

                              const values = Array.from(options)
                                  .filter(({ selected }) => selected)
                                  .map(({ value }) => value);

                              return multiple ? values : value;
                          },
                          setValue: (value) => {
                              const defaultValue = multiple ? [] : "";
                              $(el).selectpicker("val", value ?? defaultValue);
                          },
                      }
                    : null;

                if (!extRef) return;
                if (typeof extRef === "function") extRef(ref.current);
                else extRef.current = ref.current;
            };

            useEffect(() => {
                const $select = $(ref.current.el);

                window.initBootstrapSelect(
                    ref.current.el,
                    _.omit(selectpickerOptions, ["ajaxOptions", "addItemsOptions"])
                );

                // todo: init plugins in separate effects ???
                if (ajaxOptions) $select.ajaxSelectPicker(ajaxOptions);
                if (addItemsOptions) $select.addSelectPicker(addItemsOptions);

                // todo: is needed for useForm (?)
                // const { $button } = $select.data("selectpicker");
                // $button.removeAttr("tabindex");
                // $button
                //     .on("blur", () => {
                //         // console.log("blur button");
                //         onBlur?.({ target: { name: selectOptions.name } });
                //     })
                //     .on("focus", () => {
                //         // console.log("focus button");
                //     })
                //     .on("keydown", (event) => {
                //         if (event.key === " ") {
                //             $select.selectpicker("toggle");
                //         }
                //     });

                // add selectpicker event handlers
                // todo: check order of events
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
            }, [value, items, placeholder, multiple, disabled, onChange, selectpickerOptions]);

            const handleChange = (event) => {
                const {
                    target: { options, value },
                } = event;

                //! DRY (see ref)
                const values = Array.from(options)
                    .filter(({ selected }) => selected)
                    .map(({ value }) => value);

                onChange?.(multiple ? values : value, event);
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
                        <button
                            type="button"
                            className="button button_plain button_icon select__close"
                            onClick={onClose}
                        >
                            <svg className="icon button__icon select__close-icon">
                                <use href="uikit/icon/icons.svg#close"></use>
                            </svg>
                        </button>
                    )}

                    {title && !closeable && <span className="select__title">{title}</span>}

                    {/* is used with noDecor mode */}
                    {label && !closeable && <span className="select__label">{label}</span>}

                    {error && !closeable && !noDecor && <span className="select__error">{error}</span>}
                </label>
            );
        }
    )
);
