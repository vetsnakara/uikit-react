import cn from "classnames";

export const Container = (props) => {
    const { tag: Tag = "div", fluid, className, ...otherProps } = props;

    let containerClass = "container";

    if (fluid === true) {
        containerClass = "container-fluid";
    } else if (fluid) {
        containerClass = `container-${fluid}`;
    }

    const classes = cn(className, containerClass);

    return <Tag {...otherProps} className={classes} />;
};
