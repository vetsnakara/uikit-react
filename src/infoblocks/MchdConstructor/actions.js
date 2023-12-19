import { useCallback } from "react";

import { AppAction, Status } from "./constants";
import { useAppDispatch } from "./context";
import { useUIState } from "./uiContext";
import * as api from "./api";

export const setStatus = (status) => ({
    type: AppAction.SET_STATUS,
    payload: status,
});

export const useAction = () => {
    const dispatch = useAppDispatch();
    const { setLoading, setIsSignModalOpen, setIsRevokeModalOpen, setIsRemoveModalOpen } = useUIState();

    // todo: useQuery
    const sign = useCallback(async () => {
        try {
            setIsSignModalOpen(false);

            setLoading(true);
            await api.sign();
            setLoading(false);

            dispatch(setStatus(Status.Signed));
            // todo: success notification
        } catch (error) {
            // todo: error notification
            console.log("error", error);
        }
    }, []);

    //! DRY
    const revoke = useCallback(async () => {
        try {
            setIsRevokeModalOpen(false);

            setLoading(true);
            await api.revoke();
            setLoading(false);

            dispatch(setStatus(Status.Revoked));
        } catch (error) {
            console.log("error", error);
        }
    }, []);

    //! DRY
    const remove = useCallback(async () => {
        try {
            setIsRemoveModalOpen(false);

            setLoading(true);
            await api.remove();
            setLoading(false);

            // todo: use ENV=SB or mock window.location.href ...
            alert("redirect");
        } catch (error) {
            console.log("error", error);
        }
    }, []);

    return {
        sign,
        revoke,
        remove,
    };
};
