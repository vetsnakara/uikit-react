import { useFormField } from "../hooks/useFormField";

import { Select } from "@/components";
import { get } from "@/utils";

export const FormSelect = (props) => {
    const { name, ...restProps } = props;

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
