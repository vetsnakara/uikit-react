export function useDatepicker(extRef: any, { value, defaultValue, name, onChange, onBlur, datepickerOptions: options, format, }: {
    value: any;
    defaultValue: any;
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
