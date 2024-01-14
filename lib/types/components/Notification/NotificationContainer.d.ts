export namespace notification {
    function info(data: any): void;
    function success(data: any): void;
    function danger(data: any): void;
    function warning(data: any): void;
}
export function NotificationContainer({ element }: {
    element: any;
}): import("react/jsx-runtime").JSX.Element;
