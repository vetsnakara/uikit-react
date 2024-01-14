export namespace ButtonVariant {
    let Secondary: string;
    let Plain: string;
}
export namespace ButtonTheme {
    let Destruct: string;
}
/**
 * Button
 *
 * @param {{
 *     variant?: "secondary" | "plain",
 *     theme?: string,
 *     wide?: boolean,
 *     icon?: string,
 *     type?: string
 * } & import('react').HTMLAttributes<HTMLButtonElement>} props
 */
export const Button: import("react").ForwardRefExoticComponent<import("react").RefAttributes<any>>;
