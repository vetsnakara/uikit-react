import cn from "classnames";
import React, { forwardRef } from "react";

export const ButtonVariant = {
    Secondary: "secondary",
    Plain: "plain",
};

export const ButtonTheme = {
    Destruct: "desctuct",
};

const ButtonPropTypes = {};

/**
 * Button
 *
 * @param {{
 *     variant?: "secondary" | "plain",
 *     theme?: "destruct",
 *     wide?: boolean,
 *     icon?: string,
 *     type?: string
 * } & import('react').ButtonHTMLAttributes<HTMLButtonElement>} props
 */
function Button(props, ref) {
    const { variant, theme, wide, icon, type = "button", className, children, ...buttonProps } = props;

    const iconElement = icon ? React.cloneElement(icon, { className: "button__icon" }) : null;

    const classNames = cn(
        "button",
        {
            [`button_${variant}`]: variant,
            [`button_${theme}`]: theme,
            button_wide: wide,
            button_icontext: icon && children,
            button_icon: icon && !children,
        },
        className
    );

    return (
        <button ref={ref} className={classNames} type={type} {...buttonProps}>
            {iconElement}
            {children}
        </button>
    );
}

const _Button = forwardRef(Button);

Object.assign(_Button, {
    displayName: "Button",
    propTypes: ButtonPropTypes,
    Variant: ButtonVariant,
});

export { _Button as Button };
