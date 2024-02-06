import { useController, useFormContext } from "react-hook-form";

// todo?: move to Form component

export const useFormField = (options) => {
    const { control } = useFormContext();
    return useController({ control, ...options });
};
