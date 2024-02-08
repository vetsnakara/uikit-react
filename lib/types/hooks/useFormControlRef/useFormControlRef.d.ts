/**
 *
 * @param {*} extRef
 * @param {*} getRefProps - API for useForm hook
 * @returns
 */
export function useFormControlRef(extRef: any, getRefProps: any): {
    ref: import("react").MutableRefObject<{}>;
    callbackRef: (refParam: any) => void;
};
