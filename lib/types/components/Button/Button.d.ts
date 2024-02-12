export namespace ButtonVariant {
    let Secondary: string;
    let Plain: string;
}
export namespace ButtonTheme {
    let Destruct: string;
}
export { _Button as Button };
declare const _Button: React.ForwardRefExoticComponent<{
    variant?: "secondary" | "plain";
    theme?: "destruct";
    wide?: boolean;
    icon?: string;
    type?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<any>>;
import React from "react";
