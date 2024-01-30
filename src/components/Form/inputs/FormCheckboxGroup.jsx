import { get } from "react-hook-form";

import { useFormField } from "../../../hooks/useFormField";
import { Checkbox } from "../../Checkbox";

export const FormCheckboxGroup = ({ name, children, ...restProps }) => {
    const { field, formState } = useFormField({ name });

    const radioProps = _.omit(restProps, ["value", "onChange", "error"]);

    return (
        <Checkbox.Group
            name={name}
            value={field.value}
            onChange={field.onChange}
            error={get(formState.errors, name)?.message}
            {...radioProps}
        >
            {children}
        </Checkbox.Group>
    );
};
