import { getFieldConfig } from "../../../schema";

import { FormInput } from "@/components";

export const Input = ({ placeholder = "", maskOptions = {}, ...otherProps }) => {
    const config = getFieldConfig(otherProps.name);

    return <FormInput placeholder={placeholder} maskOptions={maskOptions} {...otherProps} {...config} />;
};
