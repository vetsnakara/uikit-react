import { useController, useFormContext } from "react-hook-form";

export const useFormField = (options) => {
    const { control } = useFormContext();
    return useController({ control, ...options });
};
