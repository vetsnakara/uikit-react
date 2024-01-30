import { get } from "react-hook-form";

import { useFormField } from "../../../hooks/useFormField";
import { Textarea } from "../../Textarea";

export const FormTextarea = ({ name, ...restProps }) => {
    const { field, formState } = useFormField({ name });

    const textareaProps = _.omit(restProps, ["value", "onChange", "error"]);

    return (
        <Textarea
            name={name}
            ref={field.ref}
            value={field.value}
            onChange={field.onChange}
            error={get(formState.errors, name)?.message}
            {...textareaProps}
        />
    );
};
