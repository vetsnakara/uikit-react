import { useCallback } from "react";

export function fillRef(ref, node) {
    if (typeof ref === "function") {
        ref(node);
    } else if (typeof ref === "object" && ref && "current" in ref) {
        ref.current = node;
    }
}

/**
 * Merge refs into one ref function to support ref passing.
 */
export function composeRef(...refs) {
    const refList = refs.filter((ref) => ref);

    if (refList.length <= 1) {
        return refList[0];
    }

    return useCallback((node) => {
        refs.forEach((ref) => {
            fillRef(ref, node);
        });
    }, []);
}
