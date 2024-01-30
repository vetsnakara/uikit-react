import { FormSelect } from "@uikit/components";

import { getFieldConfig } from "../../../schema";

const defaultSelectpickerOptions = {
    size: 6,
};

export const Select = ({ items, selectpickerOptions = {}, ...otherProps }) => {
    const config = getFieldConfig(otherProps.name);

    return (
        <FormSelect
            items={items}
            selectpickerOptions={{
                ...defaultSelectpickerOptions,
                ...selectpickerOptions,
            }}
            {...otherProps}
            {...config}
        />
    );
};
