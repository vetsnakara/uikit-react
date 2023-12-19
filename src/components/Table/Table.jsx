import { memo } from "react";
import cn from "classnames";

import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

// todo: noData icon in body (if no hide table for empty items)

export const Table = memo(({ columns, items, sortColumn, onSort, className }) => {
    const classes = cn("table__wrapper", className);

    if (!items.length) return null;

    return (
        <div className={classes} tabIndex="0">
            <table className="table">
                <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
                <TableBody columns={columns} items={items} />
                {/* todo: footer */}
            </table>
        </div>
    );
});
