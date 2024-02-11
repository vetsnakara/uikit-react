import { useCallback, useMemo } from "react";

import { Dropdown } from "./Dropdown";
import { DropdownItemType } from "./DropdownItem";

import { Button, ButtonVariant } from "@/components";

export default {
    title: "uikit/Dropdown",
    tags: ["autodocs"],
};

export const Default = () => {
    const items = useMemo(
        () => [
            {
                id: 1,
                icon: "eye",
                text: "Button 1",
            },
            {
                id: 2,
                icon: "eye",
                text: "Button 2",
            },
            {
                id: 3,
                icon: "eye-off",
                text: "Link (in place)",
                href: "https://some-url-in-place",
                type: DropdownItemType.Link,
            },
            {
                id: 4,
                icon: "eye-off",
                text: "Link (new page)",
                href: "https://some-url-new-page",
                type: DropdownItemType.Link,
                target: "_blank",
            },
        ],
        []
    );

    const toggle = useCallback(
        (ref) => (
            <Button
                ref={ref}
                data-toggle="dropdown"
                icon="more"
                variant={ButtonVariant.Plain}
                className="content_pale"
            />
        ),
        []
    );

    const handleSelect = useCallback(console.log, []);

    return <Dropdown items={items} toggle={toggle} onSelect={handleSelect} />;
};
