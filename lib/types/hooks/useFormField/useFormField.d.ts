export function useFormField(options: any): import("react-hook-form").UseControllerReturn<import("react-hook-form").FieldValues, string>;
export function useFormContext(): import("react-hook-form").UseFormReturn<import("react-hook-form").FieldValues, any, undefined>;
export function FormProvider({ children, ...methods }: {
    [x: string]: any;
    children: any;
}): import("react/jsx-runtime").JSX.Element;
