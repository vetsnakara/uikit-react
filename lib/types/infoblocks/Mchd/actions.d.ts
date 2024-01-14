export function setStatus(status: any): {
    type: string;
    payload: any;
};
export function useAction(): {
    sign: () => Promise<void>;
    revoke: () => Promise<void>;
    remove: () => Promise<void>;
};
