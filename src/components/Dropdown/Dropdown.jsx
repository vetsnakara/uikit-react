import cn from "classnames";
import { memo, useEffect, useRef } from "react";

import { DropdownItem } from "./DropdownItem";

export const Dropdown = memo((props) => {
    const { items = [], options = {}, toggle, className, onSelect } = props;

    const ref = useRef();

    useEffect(() => {
        const $toggle = $(ref.current);

        if (!$toggle.data("toggle")) {
            console.error("🛑 Dropdown toggle element should have attribute 'data-toggle=\"dropdown\"'");
        }

        $toggle.dropdown(options);
    }, []);

    const classes = cn("dropdown", className);

    return (
        <div className={classes}>
            {toggle(ref)}

            <div className="dropdown-menu dropdown-menu-left">
                {items.map(({ id, ...itemProps }) => (
                    <DropdownItem key={id} onClick={() => onSelect(id)} {...itemProps} />
                ))}
            </div>
        </div>
    );
});
