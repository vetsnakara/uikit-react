import { forwardRef, memo } from "react";
import cn from "classnames";

import { Input } from "../Input";
import { useDatepicker } from "./useDatepicker";

// todo: default masks - 99.99.9999 or 99.99.9999 - 99.99.9999

export const DateInput = memo(
    forwardRef(({ className, ...props }, extRef) => {
        const { callbackRef, handleChange } = useDatepicker(extRef, props);

        const classes = cn("input_date", className);

        const inputProps = _.omit(props, ["value", "defaultValue", "onChange", "onBlur", "datepickerOptions"]);

        return <Input ref={callbackRef} className={classes} onChange={handleChange} {...inputProps} />;
    }),
    //! для колбэков нужно использовать useCallback при передаче в компонент (добавить в гайд по разработке компонентов)
    //! использовать deepEqual только для options и items (для остальных - поверхностное сравнение) ???
    _.isEqual
);
