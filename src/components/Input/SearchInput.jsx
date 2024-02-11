import { forwardRef } from "react";

import { Input } from "./Input";

export const SearchInput = forwardRef((props, ref) => {
    const { value = "", onChange, onSubmit, ...inputProps } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input ref={ref} type="search" value={value} onChange={onChange} {...inputProps} />
        </form>
    );
});
