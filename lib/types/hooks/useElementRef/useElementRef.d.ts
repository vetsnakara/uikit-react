export function useElementRef(extRef: any): {
    ref: import("react").MutableRefObject<undefined>;
    refCallback: (el: any) => void;
};
