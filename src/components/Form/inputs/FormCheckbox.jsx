import { useFormField } from "../hooks/useFormField";

import { Checkbox } from "@/components";

import { get } from "@/utils";

export const FormCheckbox = (props) => {
    const { name, ...restProps } = props;

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
