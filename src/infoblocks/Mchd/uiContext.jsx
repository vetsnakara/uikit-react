import { createContext, useCallback, useContext, useMemo, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [state, setState] = useState({
        loading: false,
        isSignModalOpen: false,
        isRemoveModalOpen: false,
        isRevokeModalOpen: false,
    });

    const setLoading = useCallback((loading) => {
        setState((state) => ({
            ...state,
            loading,
        }));
    }, []);

    const setIsSignModalOpen = useCallback((isOpen) => {
        setState((state) => ({
            ...state,
            isSignModalOpen: isOpen,
        }));
    }, []);

    const setIsRevokeModalOpen = useCallback((isOpen) => {
        setState((state) => ({
            ...state,
            isRevokeModalOpen: isOpen,
        }));
    }, []);

    const setIsRemoveModalOpen = useCallback((isOpen) => {
        setState((state) => ({
            ...state,
            isRemoveModalOpen: isOpen,
        }));
    }, []);

    // todo: use useMemo for main provider ???
    const value = useMemo(
        () => ({
            ...state,
            setLoading,
            setIsSignModalOpen,
            setIsRevokeModalOpen,
            setIsRemoveModalOpen,
        }),
        [state]
    );
    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUIState = () => useContext(UIContext);
