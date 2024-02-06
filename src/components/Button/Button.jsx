import cn from "classnames";
import { forwardRef } from "react";

// todo: Button as link (prop `as`)
// todo: use Button.Variant
// todo: change order of memo and forwardRef ???
// todo: create helper for generate new component (cli, snippet)

export const ButtonVariant = {
    Secondary: "secondary",
    Plain: "plain",
};

export const ButtonTheme = {
    Destruct: "desctuct",
};

const ButtonPropTypes = {
    // theme: PropTypes.string.isRequired,
};

/**
 * Button
 *
 * @param {{
 *     variant?: "secondary" | "plain",
 *     theme?: string,
 *     wide?: boolean,
 *     icon?: string,
 *     type?: string
 * } & import('react').ButtonHTMLAttributes<HTMLButtonElement>} props
 */
function Button({ variant, theme, wide, icon, type = "button", className, children, ...buttonProps }, ref) {
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
            {icon && (
                <svg className="icon button__icon">
                    <use href={`uikit/icon/icons.svg#${icon}`}></use>
                </svg>
            )}
            {children}
        </button>
    );
}

const _Button = forwardRef(Button);

Object.assign(_Button, {
    displayName: "Button",
    propTypes: ButtonPropTypes,
    Variant: ButtonVariant, // todo: rm
});

export { _Button as Button };
