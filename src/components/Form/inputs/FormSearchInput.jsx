import { forwardRef, useCallback, useEffect, useRef } from "react";

import { useFormField } from "../hooks/useFormField";

import { Input } from "@/components";

import { composeRef, get } from "@/utils";

export const FormSearchInput = forwardRef((props, extRef) => {
    const { name, ...restProps } = props;

    const ref = useRef();
    const callbackRef = composeRef(ref, extRef);

    const { field, formState } = useFormField({ name });

    useEffect(() => {
        ref.current.value = field.value;
    }, [field.value]);

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
