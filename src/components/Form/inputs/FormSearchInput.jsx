import { get } from "react-hook-form";

import { forwardRef, useCallback, useEffect, useRef } from "react";

import { composeRef } from "../../../hooks/useElementRef";
import { useFormField } from "../../../hooks/useFormField";
import { Input } from "../../Input";

export const FormSearchInput = forwardRef(({ name, ...restProps }, extRef) => {
    const ref = useRef();
    const callbackRef = composeRef(ref, extRef);

    const { field, formState } = useFormField({ name });

    useEffect(() => {
        ref.current.value = field.value;
    }, [field.value]);

    //???
    const inputProps = _.omit(restProps, ["value", "onChange", "error"]);

    const handleSubmit = useCallback((value) => {
        field.onChange(value);
    }, []);

    return (
        <Input
            name={name}
            type="search"
            ref={callbackRef}
            defaultValue={field.value}
            onSubmit={handleSubmit}
            error={get(formState.errors, name)?.message}
            {...inputProps}
        />
    );
});
