import cn from "classnames";

export const Container = ({ tag: Tag = "div", fluid, className, ...otherProps }) => {
    let containerClass = "container";

    // ???
    if (fluid === true) {
        containerClass = "container-fluid";
        //todo: in uikit only fluid container (no sm, md, ...)
    } else if (fluid) {
        containerClass = `container-${fluid}`;
    }

    const classes = cn(className, containerClass);

    return <Tag {...otherProps} className={classes} />;
};
