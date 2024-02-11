import { useFormField } from "../hooks/useFormField";

import { File } from "@/components";
import { get } from "@/utils";

export const FormFile = (props) => {
    const { name, ...restProps } = props;

    const { field, formState } = useFormField({ name });

    const fileProps = _.omit(restProps, ["value", "onChange", "error"]);

    return (
        <File
            name={name}
            file={field.value}
            onChange={field.onChange}
            error={get(formState.errors, name)?.message}
            {...fileProps}
        />
    );
};
