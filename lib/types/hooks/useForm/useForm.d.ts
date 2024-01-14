export function useForm({ defaultValues, schema }?: {
    defaultValues?: {};
    schema: any;
}): {
    register: (name: any) => {
        name: any;
        ref: any;
        onChange: (value: any, event: any) => Promise<void>;
        error: any;
    };
    watch: (name: string | string[] | undefined) => any;
    handleSubmit: (submitHandler: any) => (e: any) => Promise<void>;
    formState: {};
    reset: () => void;
    clear: () => void;
    getData: () => {};
};
