import React, { memo, forwardRef, useRef, useEffect } from "react";

import { RadioGroupContext } from "./context";
import { composeRef } from "../../hooks/useElementRef";

// todo: optimize renders for controlled variant
// todo: show error (if any) on last Radio only
// todo: create Radios from items list prop

export const RadioGroup = memo(
    forwardRef((props, extRef) => {
        const { name, value, defaultValue, disabled, className, children, component: Component = "div" } = props;

        const ref = useRef({});

        const callbackRef = (el) => {
            ref.current = el
                ? {
                      el,
                      setValue: (value) => {
                          if (!value) {
                              const nodes = [...el.querySelectorAll(`[type='radio']`)];
                              nodes.forEach((node) => {
                                  node.checked = false;
                              });
                              //   innerRef.current.value = "";
                              return;
                          }

                          const node = el.querySelector(`[type='radio'][value='${value}']`);
                          node.checked = true;
                          //   innerRef.current.value = value;
                      },

                      getValue: () => {
                          const checkedEl = el.querySelector("[type='radio']:checked");
                          return checkedEl ? checkedEl.value : "";
                      },
                  }
                : null;

            if (!extRef) return;
            if (typeof extRef === "function") extRef(ref.current);
            else extRef.current = ref.current;
        };

        // useEffect(() => {}, []);

        // use callback ref to set name immediately on render phase
        // const innerCallbackRef = (node) => {
        //     if (!node) return; //? why can be undefined
        //     if (!node.value && defaultValue) node.value = defaultValue;
        //     // todo: don't set name on div element
        //     node.name = name;
        // };

        // //! order of refs is matter
        // const mergedRef = composeRef(innerRef, innerCallbackRef, ref);

        // todo: should return (value, event)
        const onRadioChange = (event) => {
            // todo: last value is needed???
            // const lastValue = value;
            // const val = event.target.value;

            // const { onChange } = props;

            props?.onChange(ref.current.getValue(), event);

            // if (onChange && val !== lastValue) {
            //     innerRef.current.value = val; // ref points to div
            //     onChange(val, event);
            // }
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
