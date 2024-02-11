import { forwardRef, memo, useRef } from "react";

import { composeRef } from "../../utils/composeRef";

import { RadioGroupContext } from "./context";

export const RadioGroup = memo(
    forwardRef((props, extRef) => {
        const { name, value, defaultValue, disabled, className, children, component: Component = "div" } = props;

        const ref = useRef(null);
        const callbackRef = composeRef(ref, extRef);

        const onRadioChange = (event) => {
            const checkedEl = ref.current.querySelector("[type='radio']:checked");
            const value = checkedEl ? checkedEl.value : "";
            props?.onChange(value, event);
        };

        return (
            <Component ref={callbackRef} className={className}>
                <RadioGroupContext.Provider
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
