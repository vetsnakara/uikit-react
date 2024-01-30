import { get } from "react-hook-form";

import { useFormField } from "../../../hooks/useFormField";
import { Radio } from "../../Radio";

export const FormRadioGroup = ({ name, children, ...restProps }) => {
    const { field, formState } = useFormField({ name });

    const radioProps = _.omit(restProps, ["value", "onChange", "error"]);

    // todo: check case of empty default value
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
