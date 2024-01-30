import { get } from "react-hook-form";

import { useFormField } from "../../../hooks/useFormField";
import { Input } from "../../Input";

export const FormInput = ({ name, ...restProps }) => {
    const { field, formState } = useFormField({ name });

    const inputProps = _.omit(restProps, ["value", "onChange", "error"]);

    return (
        <Input
            name={name}
            ref={field.ref}
            value={field.value}
            onChange={field.onChange}
            error={get(formState.errors, name)?.message}
            {...inputProps}
        />
    );
};
