import { useController, useFormContext as useFormContextRHF, FormProvider as FormProviderRHF } from "react-hook-form";

//?! create namespace @uikit/form
// todo?: move to Form component

export const useFormField = (options) => {
    const { control } = useFormContextRHF();
    return useController({ control, ...options });
};

export const useFormContext = () => useFormContextRHF();

export const FormProvider = ({ children, ...methods }) => <FormProviderRHF {...methods}>{children}</FormProviderRHF>;
