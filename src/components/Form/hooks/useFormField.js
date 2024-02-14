import * as rhf from "react-hook-form";

const { useFormContext, useController } = rhf;

export const useFormField = (options) => {
    const { control } = useFormContext();
    return useController({ control, ...options });
};
