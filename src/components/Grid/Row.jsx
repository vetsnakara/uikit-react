import cn from "classnames";
import { forwardRef } from "react";

const rowColWidths = ["xs", "sm", "md", "lg", "xl", "xxl"];

export const Row = forwardRef((props, ref) => {
    const { className, noGutters, tag: Tag = "div", widths = rowColWidths, ...otherProps } = props;

    const colClasses = [];

    widths.forEach((colWidth, i) => {
        const colSize = props[colWidth];

        delete otherProps[colWidth];

        if (!colSize) {
            return;
        }

        const isXs = !i;
        colClasses.push(isXs ? `row-cols-${colSize}` : `row-cols-${colWidth}-${colSize}`);
    });

    const classes = cn(className, noGutters ? "gx-0" : null, "row", colClasses);

    return <Tag ref={ref} className={classes} {...otherProps} />;
});
