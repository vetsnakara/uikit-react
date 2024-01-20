import { useCallback, useEffect, useRef } from "react";

/**
 *
 * @param {*} extRef
 * @param {*} getRefProps - API for useForm hook
 * @returns
 */
export function useFormControlRef(extRef, getRefProps) {
    const ref = useRef({});
    const fnRef = useRef({});

    useEffect(() => {
        // console.log("--- useEffect");
        fnRef.current.onMount?.();
        return () => fnRef.current.onUnmount?.();
    }, []);

    /**
     * @param {import("react").DOMElement | Object} refParam
     */
    // todo?: rename refParam to el?
    const callbackRef = useCallback((refParam) => {
        ref.current = refParam
            ? {
                  ...getRefProps(refParam),
                  setOnMount: (fn) => {
                      fnRef.current.onMount = fn;
                  },
                  setOnUnmount: (fn) => {
                      fnRef.current.onUnmount = fn;
                  },
              }
            : null;

        if (!extRef) return;
        if (typeof extRef === "function") extRef(ref.current);
        else extRef.current = ref.current;
    }, []);

    return { ref, callbackRef };
}
