import { useFormField } from "../hooks/useFormField";

import { Radio } from "@/components";
import { get } from "@/utils";

export const FormRadioGroup = (props) => {
    const { name, children, ...restProps } = props;

    const { field, formState } = useFormField({ name });

    const radioProps = _.omit(restProps, ["value", "onChange", "error"]);

    return (
        <Radio.Group
            name={name}
            value={field.value}
            onChange={field.onChange}
            error={get(formState.errors, name)?.message}
            {...radioProps}
        >
            {children}
        </Radio.Group>
    );
};
