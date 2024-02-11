import { getLib } from "@/utils";

export const useFormField = (options) => {
    const { useFormContext, useController } = getLib("ReactHookForm");
    const { control } = useFormContext();

    return useController({ control, ...options });
};
