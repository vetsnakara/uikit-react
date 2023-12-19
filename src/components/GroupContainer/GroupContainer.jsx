import React from "react";
import cn from "classnames";

export const GroupContainer = ({ className, children }) => {
    const classNames = cn("group-container", className);

    const modifyChildren = (child) => {
        const className = cn(child.props.className, "group-container__item");
        return React.cloneElement(child, { className });
    };

    return <div className={classNames}>{React.Children.map(children, modifyChildren)}</div>;
};
