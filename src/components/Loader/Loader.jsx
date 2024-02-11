import cn from "classnames";

export const Loader = (props) => {
    const { className, ...otherProps } = props;

    const classes = cn("loader", className);
    return <div className={classes} {...otherProps} />;
};
