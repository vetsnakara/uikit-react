import cn from "classnames";

import { Span } from "../Text";

export const StatusType = {
    Success: "success",
    Warning: "warning",
    Danger: "danger",
    Muted: "muted",
};

export const Status = ({ type = StatusType.Normal, className, children, ...props }) => {
    const classNames = cn(
        "status",
        {
            [`status_${type}`]: type,
        },
        className
    );

    return (
        <Span className={classNames} {...props}>
            {children}
        </Span>
    );
};
