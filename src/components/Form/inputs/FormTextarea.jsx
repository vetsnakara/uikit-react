import { useFormField } from "../hooks/useFormField";

import { Textarea } from "@/components";
import { get } from "@/utils";

export const FormTextarea = (props) => {
    const { name, ...restProps } = props;

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
