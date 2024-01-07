import { Card, Status, Loader } from "@uikit/components";

import { useAppState } from "../context";
import { Action } from "../constants";
import { useUIState } from "../uiContext";

import { ActionDropdown } from "./ActionDropdown";

export const Sidebar = () => {
    const {
        sidebar: {
            statusAttrs: { name, statusType, actions },
        },
    } = useAppState();

    const { loading, setIsSignModalOpen } = useUIState();

    return (
        <Card style={{ position: "relative" }}>
            <Status type={statusType}>{name}</Status>

            {/* Sign */}
            {actions.includes(Action.SIGN) && (
                // todo: use Button
                <button type="button" className="button button_wide mt-2" onClick={() => setIsSignModalOpen(true)}>
                    Подписать
                </button>
            )}

            {/* Download */}
            {actions.includes(Action.DOWNLOAD) && (
                // todo: use Link
                <a
                    href="/iblocks/mchd/123f3c10-fafb-4b35-b556-6bf54d939d48/signed"
                    download="mchd.zip"
                    className="button button_secondary button_wide mt-2 d-block"
                    // todo: display: block
                >
                    Скачать
                </a>
            )}

            {/* !!! method: can be placed in any place  */}
            {/* !!! method: can be remove easyly */}
            <ActionDropdown />

            {loading && <Loader />}
        </Card>
    );
};
