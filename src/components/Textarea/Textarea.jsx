import { forwardRef, useEffect, memo } from "react";
import cn from "classnames";

import { useElementRef } from "../../hooks/useElementRef";

const Textarea = memo(
    forwardRef(({ value, title, error, wysiwyg, onChange, className, ...textareaProps }, extRef) => {
        const { ref, refCallback } = useElementRef(extRef);

        useEffect(() => {
            const $textarea = $(ref.current);

            if (wysiwyg) {
                window.initWYSIWYG($textarea);
            }

            return () => {}; // todo
        }, []);

        const labelClassNames = cn("textarea", { textarea_error: error }, className);

        const handleChange = (event) => {
            onChange(event.target.value);
        };

        return (
            <label className={labelClassNames}>
                <textarea
                    ref={refCallback}
                    value={value}
                    className="textarea__control"
                    onChange={handleChange}
                    {...textareaProps}
                />
                {title && <span className="textarea__title">{title}</span>}
                {error && <span className="textarea__error">{error}</span>}
            </label>
        );
    })
);

export { Textarea };
