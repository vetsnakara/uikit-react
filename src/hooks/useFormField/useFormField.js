// import { useController, useFormContext as useFormContextRHF, FormProvider as FormProviderRHF } from "react-hook-form";

//?! create namespace @uikit/form
// todo?: move to Form component

//!!! Refactor

const ReactHookForm = { instance: null };

export const initForm = (rhfInstance) => {
    ReactHookForm.instance = rhfInstance;

    return {
        getRhfInstance: () => rhfInstance,
    };
};

export const getRhfInstance = () => ReactHookForm.instance;

export const useFormField = (options) => {
    const { useFormContext, useController } = ReactHookForm.instance;
    const { control } = useFormContext();
    return useController({ control, ...options });
};

// /**
//  * For external useage
//  * @returns
//  */
// export const useFormContext = () => useFormContextRHF();

// /**
//  * For external useage
//  * @returns
//  */
// export const FormProvider = ({ children, ...methods }) => <FormProviderRHF {...methods}>{children}</FormProviderRHF>;
