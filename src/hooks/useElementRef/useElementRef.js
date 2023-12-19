import { useCallback } from "react";
import { useRef } from "react";

/**
 * todo
 * @param {*} extRef
 */
// todo: сделать единую точку экпорта для hooks
// todo: return $el ???
// todo: rename => useElement
// todo!: replace with composeRef ???
export const useElementRef = (extRef) => {
    const ref = useRef();

    const refCallback = useCallback((el) => {
        ref.current = el;

        if (!extRef) return;

        if (typeof extRef === "function") extRef(el);
        else extRef.current = el;
    }, []);

    // todo: rm
    if (!Object.hasOwn(ref, "el")) {
        Object.defineProperty(ref, "el", {
            get() {
                return ref.current;
            },
        });
    }

    // todo: rm
    if (!Object.hasOwn(ref, "$el")) {
        Object.defineProperty(ref, "$el", {
            get() {
                // todo: cache get $el
                return $(ref.current);
            },
        });
    }

    return {
        ref,
        refCallback,
    };
};
