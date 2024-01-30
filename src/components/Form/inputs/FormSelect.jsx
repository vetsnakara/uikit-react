import { get } from "react-hook-form";

import { useFormField } from "../../../hooks/useFormField";
import { Select } from "../../Select";

export const FormSelect = ({ name, ...restProps }) => {
    const { field, formState } = useFormField({ name });

    const selectProps = _.omit(restProps, ["value", "onChange", "error"]);

    return (
        <Select
            name={name}
            value={field.value}
            onChange={field.onChange}
            error={get(formState.errors, name)?.message}
            {...selectProps}
        />
    );
};
