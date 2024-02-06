import { useController, useFormContext, FormProvider as FormProviderRHF } from "react-hook-form";

// todo?: move to Form component

export const useFormField = (options) => {
    const { control } = useFormContext();
    return useController({ control, ...options });
};

export { useFormContext };

export const FormProvider = ({ children, ...methods }) => <FormProviderRHF {...methods}>{children}</FormProviderRHF>;
