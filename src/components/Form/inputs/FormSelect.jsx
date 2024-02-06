import { get } from "react-hook-form";

import { useFormField } from "../../../hooks/useFormField";
import { Select } from "../../Select";

export const FormSelect = ({ name, ...restProps }) => {
    const { field, formState } = useFormField({ name });

    // const ref = useRef();
    // if (ref.current) console.log("===", ref.current === restProps.items);
    // ref.current = restProps.items;

    // todo: rm useMemo
    // const selectProps = useMemo(() => _.omit(restProps, ["value", "onChange", "error"]), []);
    const selectProps = _.omit(restProps, ["value", "onChange", "error"]);

    return (
        <Select
            name={name}
            value={field.value}
            onChange={field.onChange}
            error={get(formState.errors, name)?.message}
            {...selectProps}
        />
    );
};
