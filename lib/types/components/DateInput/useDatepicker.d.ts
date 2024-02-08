export function useDatepicker(extRef: any, { value, name, onChange, onBlur, datepickerOptions: options, format, }: {
    value: any;
    name: any;
    onChange: any;
    onBlur: any;
    datepickerOptions?: {
        autoClose: boolean;
        keyboardNav: boolean;
        multipleDatesSeparator: string;
    };
    format?: string;
}): {
    callbackRef: any;
    handleChange: (value: any, event: any) => void;
};
