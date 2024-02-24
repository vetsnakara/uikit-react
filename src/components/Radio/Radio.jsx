import cn from "classnames";
import { forwardRef, memo, useContext, useRef } from "react";

import { composeRef } from "../../utils/composeRef";

import { RadioGroup } from "./RadioGroup";
import { RadioGroupContext } from "./context";

export const Radio = memo(
    forwardRef((props, ref) => {
        const { label, title, error, className, ...otherProps } = props;

        const innerRef = useRef(null);
        const mergedRef = composeRef(ref, innerRef);

        const groupContext = useContext(RadioGroupContext);

        const onRadioChange = (e) => {
            props.onChange?.(e);
            groupContext?.onChange?.(e);
        };

        const radioProps = { ...otherProps };

        if (groupContext) {
            radioProps.name = groupContext.name;
            radioProps.onChange = onRadioChange;
            radioProps.disabled = props.disabled ?? groupContext.disabled;

            if (groupContext.defaultValue) {
                radioProps.defaultChecked = props.value === groupContext.defaultValue;
            }

            radioProps.checked = Boolean(groupContext.value) ? props.value === groupContext.value : false;
        }

        const labelClassNames = cn("radio", className, { radio_error: error });

        return (
            <label className={labelClassNames}>
                <input type="radio" ref={mergedRef} {...radioProps} />
                <span className="radio__label">{label}</span>
                {title && <span className="radio__title">{title}</span>}
                {error && <span className="radio__error">{error}</span>}
            </label>
        );
    })
);

Radio.Group = RadioGroup;
