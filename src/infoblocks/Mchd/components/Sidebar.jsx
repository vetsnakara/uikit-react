import { Action } from "../constants";
import { useAppState } from "../context";
import { useUIState } from "../uiContext";

import { ActionDropdown } from "./ActionDropdown";

import { Button, Card, Loader, Status } from "@/components";

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
                <Button wide onClick={() => setIsSignModalOpen(true)} className="mt-2">
                    Подписать
                </Button>
            )}

            {/* Download */}
            {actions.includes(Action.DOWNLOAD) && (
                // todo: use Link
                // todo: display: block
                <a
                    href="/iblocks/mchd/123f3c10-fafb-4b35-b556-6bf54d939d48/signed"
                    download="mchd.zip"
                    className="button button_secondary button_wide mt-2 d-block"
                >
                    Скачать
                </a>
            )}

            <ActionDropdown />

            {loading && <Loader />}
        </Card>
    );
};
