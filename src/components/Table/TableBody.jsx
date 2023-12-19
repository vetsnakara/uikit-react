import { memo } from "react";

export const TableBody = memo(({ columns, items, idFieldName = "id" }) => (
    <tbody className="table__body">
        {items.map((item) => (
            <tr className="table__item" key={item[idFieldName]}>
                {columns.map((col) => renderCell(col, item))}
            </tr>
        ))}
    </tbody>
));

/**
 * Render cell
 */
function renderCell(col, item) {
    const key = col.path || col.key;
    const value = col.value ? col.value(item) : get(item, col.path);
    return (
        <td className="table__cell" key={key}>
            {value}
        </td>
    );
}

function get(obj, path) {
    for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
        obj = obj[path[i]];
    }
    return obj;
}
