import { forwardRef, memo } from "react";
import cn from "classnames";

import { Input } from "../Input";
import { useDatepicker } from "./useDatepicker";

export const DateInput = memo(
    forwardRef(({ className, ...props }, extRef) => {
        const { callbackRef, handleChange } = useDatepicker(extRef, props);

        const classes = cn("input_date", className);
        const inputProps = _.omit(props, ["value", "defaultValue", "onChange", "onBlur"]);

        return <Input ref={callbackRef} className={classes} onChange={handleChange} {...inputProps} />;
    })
);
