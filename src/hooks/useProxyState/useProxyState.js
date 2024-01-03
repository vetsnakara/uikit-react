import { useState, useRef, useMemo } from "react";

export const useProxyState = (initState) => {
  const [state, setState] = useState(initState);

  const watchFieldsRef = useRef({});
  const proxyStateRef = useRef({ ...state });

  const a = false;

  const proxyState = useMemo(() => {
    const result = {};

    for (const name in state) {
      Object.defineProperty(result, name, {
        get: () => {
          watchFieldsRef.current[name] = true;
          return proxyStateRef.current[name];
        },
      });
    }

    return result;
  }, []);

  // todo: use object to set value (can set multiple values)
  // todo: use updateState to set initial errors
  // todo: reformat errors state with proxyState function
  // todo: is shouldRender used ???
  const updateState = (name, value, { shouldRender = true } = {}) => {
    const currentValue = proxyStateRef.current[name];
    const isSameValue = value === currentValue;
    const isWatched = watchFieldsRef.current[name];

    proxyStateRef.current[name] = value;

    const shouldSetState = shouldRender && isWatched && !isSameValue;
    if (shouldSetState) setState({ ...proxyStateRef.current });
  };

  //? should use two states
  return { state, proxyState, updateState };
};
