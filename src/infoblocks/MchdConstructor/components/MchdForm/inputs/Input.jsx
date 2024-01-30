import { FormInput } from "@uikit/components";

import { getFieldConfig } from "../../../schema";

export const Input = ({ placeholder = "", maskOptions = {}, ...otherProps }) => {
    const config = getFieldConfig(otherProps.name);

    return <FormInput placeholder={placeholder} maskOptions={maskOptions} {...otherProps} {...config} />;
};
