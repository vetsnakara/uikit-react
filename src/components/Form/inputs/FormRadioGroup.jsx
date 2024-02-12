import { useFormField } from "../hooks/useFormField";

import { Radio } from "@/components";
import { get } from "@/utils";

export const FormRadioGroup = (props) => {
    const { name, children, ...restProps } = props;

    const { field, formState } = useFormField({ name });

    const radioProps = _.omit(restProps, ["value", "onChange", "error"]);

    console.log("FormRadioGroup", field, formState);

    return (
        <Radio.Group
            name={name}
            value={field.value}
            onChange={(value) => {
                console.log("FormRadioGroup: value", value);
                field.onChange(value);
            }}
            error={get(formState.errors, name)?.message}
            {...radioProps}
        >
            {children}
        </Radio.Group>
    );
};
