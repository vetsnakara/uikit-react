import { useFormField } from "../hooks/useFormField";

import { Input } from "@/components";
import { get } from "@/utils";

export const FormInput = (props) => {
    const { name, type, ...restProps } = props;

    const { field, formState } = useFormField({ name });

    const inputProps = _.omit(restProps, ["value", "onChange", "error"]);

    return (
        <Input
            name={name}
            type={type}
            ref={field.ref}
            value={field.value}
            onChange={field.onChange}
            error={get(formState.errors, name)?.message}
            {...inputProps}
        />
    );
};
