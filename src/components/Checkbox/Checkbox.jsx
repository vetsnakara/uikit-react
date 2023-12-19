import { memo, forwardRef, useEffect, useRef, useContext } from "react";
import cn from "classnames";

import { composeRef } from "../../hooks/useElementRef";
import { CheckboxGroupContext } from "./context";
import { CheckboxGroup } from "./CheckboxGroup";

const CheckboxVariant = {
    Checkbox: "checkbox",
    Switch: "switch",
};

export const Checkbox = memo(
    forwardRef((props, extRef) => {
        const { label, title, error, className, onChange, ...otherProps } = props;

        // todo: abstract logic DRY
        const ref = useRef({});

        const callbackRef = (el) => {
            ref.current = el
                ? {
                      el,
                      getValue: () => el.checked,
                      setValue: (checked = false) => {
                          el.checked = checked;
                      },
                  }
                : null;

            if (!extRef) return;
            if (typeof extRef === "function") extRef(ref.current);
            else extRef.current = ref.current;
        };

        const checkboxProps = { ...otherProps };

        const onCheckboxChange = (event) => {
            onChange?.(ref.current.getValue(), event);
        };

        checkboxProps.onChange = onCheckboxChange;

        //! use defaultValue for consistency (useForm)
        if (checkboxProps.defaultValue) {
            checkboxProps.defaultChecked = checkboxProps.defaultValue;
        }

        const groupContext = useContext(CheckboxGroupContext);

        if (groupContext) {
            checkboxProps.name = groupContext.name;
            checkboxProps.disabled = props.disabled ?? groupContext.disabled;
            checkboxProps.variant = props.variant ?? groupContext.variant;

            checkboxProps.onChange = (event) => {
                onCheckboxChange?.(event);
                groupContext.onChange?.(event);
            };

            if (groupContext.value) {
                checkboxProps.checked = groupContext.value.includes(checkboxProps.value);
            }

            if (groupContext.defaultValue) {
                checkboxProps.defaultChecked = groupContext.defaultValue.includes(checkboxProps.value);
            }
        }

        const { variant = CheckboxVariant.Checkbox } = checkboxProps;
        const labelClassNames = cn(variant, className, { checkbox_error: error });

        return (
            <label className={labelClassNames}>
                <input type="checkbox" ref={callbackRef} {...checkboxProps} />
                <span className={`${variant}__label`}>{label}</span>
                {title && <span className={`${variant}__title`}>{title}</span>}
                {error && <span className="checkbox__error">{error}</span>}
            </label>
        );
    })
);

Checkbox.Group = CheckboxGroup;
Checkbox.Variant = CheckboxVariant;
