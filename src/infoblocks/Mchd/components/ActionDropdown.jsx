import { Button, Dropdown } from "@uikit/components";
import { useCallback } from "react";

console.log("Button", Button);

import { AppAction } from "../constants";
import { useAppState } from "../context";
import { useUIState } from "../uiContext";

/* !!! can be placed in any place  */
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
            // todo: arrow down
            <Button ref={ref} data-toggle="dropdown" variant={Button.Variant.Secondary} wide className="mt-2">
                Действия с документом
            </Button>
        ),
        []
    );

    return <Dropdown items={items} toggle={toggle} onSelect={handleSelect} />;
};
