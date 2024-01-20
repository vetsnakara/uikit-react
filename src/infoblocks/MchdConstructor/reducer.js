import { AppAction } from "./constatns/constants";
import { setSidebarState } from "./context";

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case AppAction.SET_STATUS:
            // eslint-disable-next-line
            const newState = { ...state, status: payload };
            setSidebarState(newState);
            return newState;
        default:
            return state;
    }
};
