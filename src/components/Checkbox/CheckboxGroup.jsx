import React, { memo, forwardRef } from "react";

import { useFormControlRef } from "../../hooks";

import { CheckboxGroupContext } from "./context";

// todo: optimize renders for controlled variant
// todo: show error (if any) on last Radio only
// todo: create Radios from items list prop

export const CheckboxGroup = memo(
    forwardRef((props, extRef) => {
        const {
            name,
            value,
            defaultValue,
            disabled,
            variant,
            className,
            children,
            component: Component = "div", //? prop: as
        } = props;

        const { ref, callbackRef } = useFormControlRef(extRef, (el) => ({
            el,
            getValue: () => {
                const checkboxNodes = [...el.querySelectorAll("[type='checkbox']")];

                const values = [...checkboxNodes].map(({ value, checked }) => (checked ? value : null)).filter(Boolean);

                return values;
            },
            setValue: (values = []) => {
                //! DRY
                const checkboxNodes = [...el.querySelectorAll("[type='checkbox']")];

                checkboxNodes.forEach((node) => {
                    node.checked = values.includes(node.value);
                });
            },
        }));

        const onCheckboxChange = (event) => {
            const checkboxNodes = ref.current.el.querySelectorAll("[type='checkbox']");
            const values = [...checkboxNodes].map(({ value, checked }) => (checked ? value : null)).filter(Boolean);

            ref.current.el.value = values; // ref points to div

            props.onChange?.(values, event);
        };

        return (
            <Component ref={callbackRef} className={className}>
                <CheckboxGroupContext.Provider
                    // todo: memo?
                    value={{
                        name,
                        value,
                        defaultValue,
                        variant,
                        disabled,
                        onChange: onCheckboxChange,
                    }}
                >
                    {children}
                </CheckboxGroupContext.Provider>
            </Component>
        );
    })
);
