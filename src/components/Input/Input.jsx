import cn from "classnames";
import { forwardRef, memo, useEffect, useRef } from "react";

import Inputmask from "inputmask";

import { composeRef } from "../../utils/composeRef";

/**
 * @param {{
 *    title?: string,
 *    error?: string
 *    maskOptions?: Record<"string", any>
 *    onChange?: () => {}
 *    className?: string
 *    value?: "string"
 *    defaultValue?: string
 * } & import('react').InputHTMLAttributes<HTMLInputElement>} props
 */
function Input(props, extRef) {
    const {
        name,
        title,
        error,
        type = "text",
        maskOptions,
        placeholder,
        onChange,
        onBlur,
        onSubmit,
        className,
        value,
        defaultValue,
        ...inputOptions
    } = props;

    const ref = useRef(null);
    const callbackRef = composeRef(ref, extRef);

    useEffect(() => {
        // note: React onChange doesn't work with jquery inputmask; need valilla lib
        // https://github.com/RobinHerbots/Inputmask/issues/1377
        let im = null;

        if (maskOptions) {
            im = new Inputmask(maskOptions);
            im.mask(ref.current);
        }

        return () => {
            im?.remove(ref.current);
            // restore default placeholder
            if (ref.current && placeholder) ref.current.placeholder = placeholder;
        };
    }, [JSON.stringify(maskOptions)]);

    const handleChange = (event) => {
        onChange?.(ref.current.value, event);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSubmit?.(ref.current.value, event);
        }
    };

    const handleBlur = (event) => {
        onBlur?.(event);
    };

    const isSearch = type === "search";

    const labelClassNames = cn("input", { input_error: error, input_search: isSearch }, className);

    return (
        <label className={labelClassNames}>
            <input
                ref={callbackRef}
                name={name}
                type={type}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown} // for search input type
                onBlur={handleBlur}
                className="input__control"
                autoComplete="off"
                placeholder={placeholder}
                {...inputOptions}
            />
            {isSearch && <button type="submit" className="input__search-button" />}
            {title && <span className="input__title">{title}</span>}
            {error && <span className="input__error">{error}</span>}
        </label>
    );
}

const _Input = memo(forwardRef(Input), _.isEqual);

export { _Input as Input };
