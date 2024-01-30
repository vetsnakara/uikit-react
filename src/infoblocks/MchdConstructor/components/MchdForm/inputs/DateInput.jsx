import { FormDateInput } from "@uikit/components";

import { getFieldConfig } from "../../../schema";

export const DateInput = ({ placeholder, maskOptions = {}, ...otherProps }) => {
    const config = getFieldConfig(otherProps.name);

    return (
        <FormDateInput
            placeholder={placeholder ?? "Выберите дату"}
            maskOptions={{
                // todo: memo (set as default)
                mask: "99.99.9999",
                ...maskOptions,
            }}
            {...otherProps}
            {...config}
        />
    );
};
