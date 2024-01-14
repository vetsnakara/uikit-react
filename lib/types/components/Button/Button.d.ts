export namespace ButtonVariant {
    let Secondary: string;
    let Plain: string;
}
export namespace ButtonTheme {
    let Destruct: string;
}
export { _Button as Button };
declare const _Button: import("react").ForwardRefExoticComponent<{
    variant?: "secondary" | "plain";
    theme?: string;
    wide?: boolean;
    icon?: string;
    type?: string;
} & import("react").HTMLAttributes<HTMLButtonElement> & import("react").RefAttributes<any>>;
