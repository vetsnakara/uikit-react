export function Card({ children, className, theme, ...props }: {
    theme?: "muted";
} & import('react').HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export namespace Card {
    export { CardFooter as Footer };
}
declare function CardFooter({ className, ...props }: {
    [x: string]: any;
    className: any;
}): import("react/jsx-runtime").JSX.Element;
export {};
