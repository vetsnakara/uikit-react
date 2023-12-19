import { forwardRef, useEffect, memo, useRef, useCallback } from "react";
import cn from "classnames";

//! будет тащиться в каждый бандл
//! подумать о динамически подгружаемых либах и динамически подгружаемых компонентах
import Inputmask from "inputmask"; // todo: check version with existing

import { useElementRef } from "../../hooks/useElementRef";

// todo: useInputMask hook
// todo: useDateinput hook
// todo: use const for format (and option)
// todo: use constants for input type: text, search, date
// todo: update dp to use silent option (is needed here?)
// todo: hook useInputmask

const Input = memo(
    forwardRef(
        (
            {
                title,
                error,
                type = "text",
                maskOptions,
                datepickerOptions,
                placeholder,
                onChange,
                onBlur,
                onSubmit,
                className,
                value,
                defaultValue,
                ...otherProps
            },
            extRef
        ) => {
            const ref = useRef({});

            // todo: useCallback ???
            const callbackRef = (el) => {
                ref.current = el
                    ? {
                          el,
                          getValue: () => el.value,
                          setValue: (value) => {
                              el.value = value;
                          },
                          //! setError?
                      }
                    : null;

                if (!extRef) return;
                if (typeof extRef === "function") extRef(ref.current);
                else extRef.current = ref.current;
            };

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
            }, [maskOptions]);

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
                        {...otherProps}
                    />
                    {isSearch && <button type="submit" className="input__search-button" />}
                    {title && <span className="input__title">{title}</span>}
                    {error && <span className="input__error">{error}</span>}
                </label>
            );
        }
    )
);

export { Input };
