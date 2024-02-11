import { forwardRef, memo, useRef } from "react";

import { CheckboxGroupContext } from "./context";

import { composeRef } from "@/utils";

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
            component: Component = "div",
        } = props;

        const ref = useRef(null);
        const callbackRef = composeRef(ref, extRef);

        const onCheckboxChange = (event) => {
            const checkboxNodes = ref.current.querySelectorAll("[type='checkbox']");
            const values = [...checkboxNodes].map(({ value, checked }) => (checked ? value : null)).filter(Boolean);

            ref.current.value = values; // ref points to wrapper el (div)

            props.onChange?.(values, event);
        };

        return (
            <Component ref={callbackRef} className={className}>
                <CheckboxGroupContext.Provider
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
