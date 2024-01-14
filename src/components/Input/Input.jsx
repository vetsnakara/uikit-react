import cn from "classnames";
import { forwardRef, memo, useEffect } from "react";

//! будет тащиться в каждый бандл
//! подумать о динамически подгружаемых либах и динамически подгружаемых компонентах
import Inputmask from "inputmask"; // todo: check version with existing

import { useFormControlRef } from "../../hooks";

// todo: useInputMask hook
// todo: useDateinput hook
// todo: use const for format (and option)
// todo: use constants for input type: text, search, date
// todo: update dp to use silent option (is needed here?)
// todo: hook useInputmask

//? будет вопрос, почему просто не использовать jsdoc

/**
 * @param {{
 *    title?: string,
 *    error?: string
 *    maskOptions?: Record<"string", any>
 *    onChange?: () => {}
 *    className?: string
 *    value?: "string"
 *    defaultValue?: string
 * } & import('react').HTMLAttributes<HTMLInputElement>} props
 */
// ??? why no `placeholder` attribute ???
function Input(
    {
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
    },
    extRef
) {
    const { ref, callbackRef } = useFormControlRef(extRef, (el) => ({
        el,
        getValue: () => el.value,
        setValue: (value = "") => {
            el.value = value;
        },
        //! setError?
    }));

    useEffect(() => {
        //! don't work React onChange witn jquery inputmask
        // https://github.com/RobinHerbots/Inputmask/issues/1377
        let im = null;

        if (maskOptions) {
            im = new Inputmask(maskOptions);
            im.mask(ref.current.el);
        }

        return () => {
            im?.remove(ref.current);
            // restore default placeholder
            if (ref.current?.el && placeholder) ref.current.el.placeholder = placeholder;
        };
    }, [JSON.stringify(maskOptions)]);

    const handleChange = (event) => {
        onChange?.(ref.current.getValue(), event);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSubmit?.(ref.current.getValue(), event);
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
