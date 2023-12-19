import React, { memo, forwardRef, useRef, useEffect } from "react";
import { CheckboxGroupContext } from "./context";
import { composeRef } from "../../hooks/useElementRef";

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

        const ref = useRef({});

        const callbackRef = (el) => {
            ref.current = el
                ? {
                      el,
                      getValue: () => {
                          const checkboxNodes = [...el.querySelectorAll("[type='checkbox']")];

                          const values = [...checkboxNodes]
                              .map(({ value, checked }) => (checked ? value : null))
                              .filter(Boolean);

                          return values;
                      },
                      setValue: (values = []) => {
                          const checkboxNodes = [...el.querySelectorAll("[type='checkbox']")];

                          checkboxNodes.forEach((node) => {
                              node.checked = values.includes(node.value);
                          });
                      },
                  }
                : null;

            if (!extRef) return;
            if (typeof extRef === "function") extRef(ref.current);
            else extRef.current = ref.current;
        };

        // use callback ref to set name immediately on render phase
        // const innerCallbackRef = (node) => {
        //     if (!node) return; //? why can be undefined
        //     if (!node.value && defaultValue) node.value = defaultValue;
        //     // todo: don't set name on div element
        //     node.name = name;
        // };

        //! order of refs is matter
        // const mergedRef = composeRef(innerRef, innerCallbackRef, ref);

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
