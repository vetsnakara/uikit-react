export function Definitions({ items, variant, fixWidth, reverse, className, ...props }: {
    [x: string]: any;
    items?: any[];
    variant: any;
    fixWidth: any;
    reverse?: boolean;
    className: any;
}): import("react/jsx-runtime").JSX.Element;
export namespace Definitions {
    export { DefinitionsVariant as Variant };
    export { DefinitionsWidth as Width };
}
declare namespace DefinitionsVariant {
    let Row: string;
    let RowTable: string;
}
declare namespace DefinitionsWidth {
    let W150: number;
    let W200: number;
    let W250: number;
    let W300: number;
}
export {};