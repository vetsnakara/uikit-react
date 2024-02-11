import { useFormField } from "../hooks/useFormField";

import { Checkbox } from "@/components";
import { get } from "@/utils";

export const FormCheckboxGroup = (props) => {
    const { name, children, ...restProps } = props;

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
