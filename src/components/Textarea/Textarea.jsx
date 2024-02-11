import cn from "classnames";
import { forwardRef, memo, useEffect, useRef } from "react";

import { composeRef } from "../../utils/composeRef";

const Textarea = memo(
    forwardRef(({ value, title, error, wysiwyg, onChange, className, ...textareaProps }, extRef) => {
        const ref = useRef(null);
        const callbackRef = composeRef(ref, extRef);

        useEffect(() => {
            const $textarea = $(ref.current);

            if (wysiwyg) window.initWYSIWYG($textarea);

            return () => {}; // todo: destroy
        }, []);

        const labelClassNames = cn("textarea", { textarea_error: error }, className);

        const handleChange = (event) => {
            const { value } = event.target;
            onChange(value, event);
        };

        return (
            <label className={labelClassNames}>
                <textarea
                    ref={callbackRef}
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
