import { useRef, useCallback } from "react";

/**
 *
 * @param {*} extRef
 * @param {*} getRefProps - API for useForm hook
 * @returns
 */
export function useFormControlRef(extRef, getRefProps) {
  const ref = useRef({});

  /**
   * @param {import("react").DOMElement | Object} refParam
   */
  const callbackRef = useCallback((refParam) => {
    ref.current = refParam ? getRefProps(refParam) : null;

    if (!extRef) return;
    if (typeof extRef === "function") extRef(ref.current);
    else extRef.current = ref.current;
  }, []);

  return { ref, callbackRef };
}
