import { get } from "react-hook-form";

import { useFormField } from "../../../hooks/useFormField";
import { Checkbox } from "../../Checkbox";

export const FormCheckbox = ({ name, ...restProps }) => {
    const { field, formState } = useFormField({ name });

    const checkboxProps = _.omit(restProps, ["value", "onChange", "error"]);

    return (
        <Checkbox
            name={name}
            checked={field.value}
            onChange={field.onChange}
            error={get(formState.errors, name)?.message}
            {...checkboxProps}
        />
    );
};
