//?! create namespace @uikit/form
// todo?: move to Form component

import { getLib } from "../../utils/libAdapter";

export const useFormField = (options) => {
    const { useFormContext, useController } = getLib("ReactHookForm");
    const { control } = useFormContext();

    return useController({ control, ...options });
};
