import { forwardRef } from "react";

import { Input } from "./Input";

export const SearchInput = forwardRef(({ value = "", onChange, onSubmit, ...inputProps }, ref) => {
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
