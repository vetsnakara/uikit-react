export namespace StatusType {
    let Success: string;
    let Warning: string;
    let Danger: string;
    let Muted: string;
}
export function Status({ type, className, children, ...props }: {
    [x: string]: any;
    type?: any;
    className: any;
    children: any;
}): import("react/jsx-runtime").JSX.Element;
