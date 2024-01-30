import { get } from "react-hook-form";

import { useFormField } from "../../../hooks/useFormField";
import { DateInput } from "../../DateInput";

export const FormDateInput = ({ name, ...restProps }) => {
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
