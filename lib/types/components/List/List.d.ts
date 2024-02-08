export namespace ListType {
    let Ordered: string;
    let Unordered: string;
}
export namespace OrderedListType {
    let Bracked: string;
    let Letter: string;
}
export function List({ type, letter, bracket, className, ...props }: {
    [x: string]: any;
    type?: string;
    letter: any;
    bracket: any;
    className: any;
}): import("react/jsx-runtime").JSX.Element;
export namespace List {
    export { Item };
}
export function OList(props: any): import("react/jsx-runtime").JSX.Element;
export namespace OList {
    export { Item };
}
export function UList(props: any): import("react/jsx-runtime").JSX.Element;
export namespace UList {
    export { Item };
}
declare function Item({ tag: Tag, className, ...otherProps }: {
    [x: string]: any;
    tag?: string;
    className: any;
}): import("react/jsx-runtime").JSX.Element;
export {};
