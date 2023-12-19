import { forwardRef } from "react";
import cn from "classnames";

// todo: use Button.Variant
export const ButtonVariant = {
    Secondary: "secondary",
    Plain: "plain",
};

export const ButtonTheme = {
    Destruct: "desctuct",
};

// /**
//  * todo: as link
//  * ! Some component description is here (and in Storybook too)
//  * todo: add description to each component (на русском)
//  * todo: use PropTypes to document props
//  */

// /**
//  * @typedef {Object} Props
//  * @property {("primary" | "secondary" | "plain")} variant - The name of the user.
//  * @property {(ButtonTheme.Destruct)} theme - The age of the user.
//  */

// // todo: use proptypes eventually

// /**
//  * A React component that displays the name and age of a user.
//  *
//  * @param {Props} props - The props for the component.
//  * @returns {JSX.Element} - The rendered component.
//  */
export const Button = forwardRef(
    ({ children, variant, theme, wide, icon, type = "button", className, ...props }, ref) => {
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
            <button ref={ref} className={classNames} type={type} {...props}>
                {icon && (
                    <svg className="icon button__icon">
                        <use href={`uikit/icon/icons.svg#${icon}`}></use>
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.Variant = ButtonVariant;
