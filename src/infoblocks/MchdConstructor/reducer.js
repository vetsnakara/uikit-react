import { setSidebarState } from "./context";
import { AppAction } from "./constants";

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
