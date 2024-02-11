import cn from "classnames";
import { forwardRef, memo } from "react";

import { useDatepicker } from "./useDatepicker";

import { Input } from "@/components";

export const DateInput = memo(
    forwardRef((props, extRef) => {
        const { className, ...otherProps } = props;

        const { callbackRef, handleChange } = useDatepicker(extRef, otherProps);

        const classes = cn("input_date", className);

        const inputProps = _.omit(otherProps, ["value", "defaultValue", "onChange", "onBlur", "datepickerOptions"]);

        return <Input ref={callbackRef} className={classes} onChange={handleChange} {...inputProps} />;
    }),
    _.isEqual
);
