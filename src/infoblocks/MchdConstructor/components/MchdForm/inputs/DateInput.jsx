import { getFieldConfig } from "../../../schema";

import { FormDateInput } from "@/components";

export const DateInput = ({ placeholder, maskOptions = {}, ...otherProps }) => {
    const config = getFieldConfig(otherProps.name);

    return (
        <FormDateInput
            placeholder={placeholder ?? "Выберите дату"}
            maskOptions={{
                mask: "99.99.9999",
                ...maskOptions,
            }}
            {...otherProps}
            {...config}
        />
    );
};
