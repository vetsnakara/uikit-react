import { useEffect, useRef, memo } from "react";
import cn from "classnames";

import { DropdownItem } from "./DropdownItem";

export const Dropdown = memo(({ items = [], options = {}, toggle, className, onSelect }) => {
    const ref = useRef();

    useEffect(() => {
        const $toggle = $(ref.current);

        if (!$toggle.data("toggle")) {
            console.error("Dropdown toggle element should have attribute 'data-toggle=\"dropdown\"'");
        }

        $toggle.dropdown(options);
    }, []);

    const classes = cn("dropdown", className);

    return (
        <div className={classes}>
            {toggle(ref)}

            <div className="dropdown-menu dropdown-menu-left">
                {/* ??? left */}
                {items.map(({ id, ...itemProps }) => (
                    <DropdownItem key={id} onClick={() => onSelect(id)} {...itemProps} />
                ))}
            </div>
        </div>
    );
});
