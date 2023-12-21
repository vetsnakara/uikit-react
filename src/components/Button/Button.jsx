import { forwardRef } from "react";
import cn from "classnames";

// todo: Button as link

// todo: use Button.Variant
export const ButtonVariant = {
  Secondary: "secondary",
  Plain: "plain",
};

export const ButtonTheme = {
  Destruct: "desctuct",
};

// todo: change order of memo and forwardRef ???
// todo: create helper for generate new component (cli, snippet)
/**
 * Button
 *
 * @type {import("./Button").ButtonType}
 * @return {React.ReactElement}
 */
export const Button = forwardRef(
  (
    {
      variant,
      theme,
      wide,
      icon,
      type = "button",
      className,
      children,
      ...props
    },
    ref
  ) => {
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
