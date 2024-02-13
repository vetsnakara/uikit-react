import rhf from "react-hook-form";

console.log("rhf", rhf);

const { useFormContext, useController } = rhf;

export const useFormField = (options) => {
    const { control } = useFormContext();
    return useController({ control, ...options });
};
