export function useProxyState(initState: any): {
    state: any;
    proxyState: {};
    updateState: (name: any, value: any, { shouldRender }?: {
        shouldRender?: boolean;
    }) => void;
};
