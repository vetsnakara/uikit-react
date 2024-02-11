import { forwardRef, memo, useContext, useRef } from "react";

import cn from "classnames";

import { CheckboxGroup } from "./CheckboxGroup";
import { CheckboxGroupContext } from "./context";

import { composeRef } from "@/utils";

const CheckboxVariant = {
    Checkbox: "checkbox",
    Switch: "switch",
};

export const Checkbox = memo(
    forwardRef((props, extRef) => {
        const { label, title, error, className, onChange, ...otherProps } = props;

        const checkboxProps = { ...otherProps };

        const ref = useRef(null);
        const callbackRef = composeRef(ref, extRef);

        const onCheckboxChange = (event) => {
            onChange?.(ref.current.checked, event);
        };

        checkboxProps.onChange = onCheckboxChange;

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
