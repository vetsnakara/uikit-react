import cn from "classnames";

export const Loader = ({ className, size, ...props }) => {
    const classes = cn("loader", className);
    return <div className={classes} {...props} />
};