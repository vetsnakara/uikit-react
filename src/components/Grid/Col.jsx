import cn from "classnames";

const colWidths = ["xs", "sm", "md", "lg", "xl", "xxl"];

const getColumnSizeClass = (isXs, colWidth, colSize) => {
    if (colSize === true || colSize === "") {
        return isXs ? "col" : `col-${colWidth}`;
    }
    if (colSize === "auto") {
        return isXs ? "col-auto" : `col-${colWidth}-auto`;
    }

    return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
};

const getColumnClasses = (attributes, widths = colWidths) => {
    const modifiedAttributes = attributes;
    const colClasses = [];

    widths.forEach((colWidth, i) => {
        const columnProp = modifiedAttributes[colWidth];

        delete modifiedAttributes[colWidth];

        if (!columnProp && columnProp !== "") {
            return;
        }

        const isXs = !i;

        if (_.isObject(columnProp)) {
            const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
            const colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);

            colClasses.push(
                cn({
                    [colClass]: columnProp.size || columnProp.size === "",
                    [`order${colSizeInterfix}${columnProp.order}`]: columnProp.order || columnProp.order === 0,
                    [`offset${colSizeInterfix}${columnProp.offset}`]: columnProp.offset || columnProp.offset === 0,
                })
            );
        } else {
            const colClass = getColumnSizeClass(isXs, colWidth, columnProp);
            colClasses.push(colClass);
        }
    });

    return {
        colClasses,
        modifiedAttributes,
    };
};

export const Col = (props) => {
    const { className, cssModule, widths = colWidths, tag: Tag = "div", ...attributes } = props;

    const { modifiedAttributes, colClasses } = getColumnClasses(attributes, cssModule, widths);

    if (!colClasses.length) {
        colClasses.push("col");
    }

    const classes = cn(className, colClasses);

    return <Tag {...modifiedAttributes} className={classes} />;
};
