import cn from "classnames";
import { memo } from "react";

import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

export const Table = memo(({ columns, items, sortColumn, onSort, className }) => {
    const classes = cn("table__wrapper", className);

    if (!items.length) return null;

    return (
        <div className={classes} tabIndex="0">
            <table className="table">
                <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
                <TableBody columns={columns} items={items} />
                {/* footer */}
            </table>
        </div>
    );
});
