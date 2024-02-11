import { useFormField } from "../hooks/useFormField";

import { DateInput } from "@/components";
import { get } from "@/utils";

export const FormDateInput = (props) => {
    const { name, ...restProps } = props;

    const { field, formState } = useFormField({ name });

    const inputProps = _.omit(restProps, ["value", "onChange", "error"]);

    return (
        <DateInput
            ref={field.ref}
            name={name}
            value={field.value}
            onChange={field.onChange}
            error={get(formState.errors, name)?.message}
            {...inputProps}
        />
    );
};
