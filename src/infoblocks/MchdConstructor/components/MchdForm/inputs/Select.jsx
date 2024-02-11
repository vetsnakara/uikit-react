import { getFieldConfig } from "../../../schema";

import { FormSelect } from "@/components";

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
