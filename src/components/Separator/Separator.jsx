import cn from "classnames";

export const Separator = ({ className, wide, vertical, children }) => {
    const mainClass = "separator";

    const classes = cn(mainClass, className, {
        [`${mainClass}_wide`]: wide,
        [`${mainClass}_vertical`]: vertical,
    });

    if (children) {
        return (
            <span className="separator">
                <span className="separator__text">{children}</span>
            </span>
        );
    }

    return <hr className={classes} />;
};
