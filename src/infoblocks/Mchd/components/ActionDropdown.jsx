import { useCallback } from "react";

import { AppAction } from "../constants";
import { useAppState } from "../context";
import { useUIState } from "../uiContext";

import { Button, Dropdown } from "@/components";

export const ActionDropdown = () => {
    const {
        sidebar: {
            statusAttrs: { dropdownItems: items },
        },
    } = useAppState();

    const { setIsRevokeModalOpen, setIsRemoveModalOpen } = useUIState();

    if (!items.length) return null;

    const handleSelect = useCallback((action) => {
        if (action === AppAction.REVOKE) setIsRevokeModalOpen(true);
        if (action === AppAction.REMOVE) setIsRemoveModalOpen(true);
    }, []);

    const toggle = useCallback(
        (ref) => (
            <Button ref={ref} data-toggle="dropdown" variant={Button.Variant.Secondary} wide className="mt-2">
                Действия с документом
            </Button>
        ),
        []
    );

    return <Dropdown items={items} toggle={toggle} onSelect={handleSelect} />;
};
