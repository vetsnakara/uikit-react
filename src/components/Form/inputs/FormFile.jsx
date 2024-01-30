import { get } from "react-hook-form";

import { useFormField } from "../../../hooks/useFormField";
import { File } from "../../File";

export const FormFile = ({ name, ...restProps }) => {
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
