export namespace DropdownItemType {
    let Button: string;
    let Link: string;
}
export function DropdownItem({ type, text, icon, href, className, onClick, ...props }: {
    [x: string]: any;
    type?: string;
    text: any;
    icon: any;
    href: any;
    className: any;
    onClick: any;
}): import("react/jsx-runtime").JSX.Element;
