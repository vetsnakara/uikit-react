import { forwardRef, memo } from "react";

import { useFormControlRef } from "../../hooks";

import { RadioGroupContext } from "./context";

// todo: optimize renders for controlled variant
// todo: show error (if any) on last Radio only
// todo: create Radios from items list prop

export const RadioGroup = memo(
    forwardRef((props, extRef) => {
        const { name, value, defaultValue, disabled, className, children, component: Component = "div" } = props;

        const { ref, callbackRef } = useFormControlRef(extRef, (el) => ({
            el,
            getValue: () => {
                const checkedEl = el.querySelector("[type='radio']:checked");
                return checkedEl ? checkedEl.value : "";
            },
            setValue: (value) => {
                if (value) {
                    const node = el.querySelector(`[type='radio'][value='${value}']`);
                    node.checked = true;
                    return;
                }

                // reset
                const nodes = [...el.querySelectorAll(`[type='radio']`)];
                nodes.forEach((node) => {
                    node.checked = false;
                });
            },
        }));

        // todo: should return (value, event)
        const onRadioChange = (event) => {
            props?.onChange(ref.current.getValue(), event);
        };

        return (
            // todo: use Component in other components
            <Component ref={callbackRef} className={className}>
                <RadioGroupContext.Provider
                    // todo: memo?
                    value={{
                        name,
                        value,
                        defaultValue,
                        disabled,
                        onChange: onRadioChange,
                    }}
                >
                    {children}
                </RadioGroupContext.Provider>
            </Component>
        );
    })
);
