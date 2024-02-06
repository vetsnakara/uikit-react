import { useController, useFormContext, FormProvider as RHFFormProvider } from "react-hook-form";

// todo?: move to Form component

export const useFormField = (options) => {
    const { control } = useFormContext();
    return useController({ control, ...options });
};

export const FormProvider = ({ children, ...methods }) => <RHFFormProvider {...methods}>{children}</RHFFormProvider>;
