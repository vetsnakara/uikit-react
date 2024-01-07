import { useEffect, useRef, useCallback } from "react";

import { useFormControlRef } from "../../hooks";

// const DEFAULT_DATE_VALUE = "";
// const DEFAULT_DATE_RANGE = [];

const DEFAULT_DATE_FORMMAT = "DD.MM.YYYY";
const DEFAULT_MULTIPLE_DATES_SEPARATOR = " - ";
const DATE_SELECT_EVENT = "DATE_SELECT_EVENT";

const defaultOptions = {
    autoClose: true,
    keyboardNav: false,
    multipleDatesSeparator: DEFAULT_MULTIPLE_DATES_SEPARATOR,
};

// todo: update plugin to use silent option?
// todo: check different time formats
// todo: process minMaxDate (can input date < minDate by hand!)
// todo: в неконтр. варианте сделать так, чтобы через ref в range mode отдавался массив дат-строк
// todo: return focus to input after setting date by hand input

//! sort dates array on return outside (can be [1985, 1984] when type by hand in reverse order and plugin changes order by himself)

export const useDatepicker = (
    extRef,
    {
        value,
        defaultValue,
        name,
        onChange,
        onBlur,
        datepickerOptions: options = defaultOptions,
        format = DEFAULT_DATE_FORMMAT,
    }
) => {
    const context = useRef();

    // note: Input passes to callback ref object { el, setValue, ...}, not DOM input element
    const { ref, callbackRef } = useFormControlRef(extRef, ({ el }) => ({
        el,
        getValue: () => {
            const parsedDateValue = getDateValueFromString(el.value);
            const { dateValue } = getValidatedDate(parsedDateValue);
            return dateValue;
        },
        setValue: setDate,
    }));

    useEffect(() => {
        const $el = $(ref.current.el);

        $el.datepicker({
            ...defaultOptions,
            ...options,
            onSelect: (value) => {
                if (context.silent) return;
                const dateSelectEvent = { target: { name }, type: DATE_SELECT_EVENT };
                handleChange(value, dateSelectEvent);
            },
            onHide(inst /* not used */, isFinished) {
                if (isFinished) return;
                onBlur?.({ target: { name } });
            },
        });

        // set date from input value if it exists
        const val = $el.val();
        if (val) setDate(val, { parse: true });

        return () => {
            $el.data("datepicker").destroy();
        };
    }, [JSON.stringify(options), onChange]);

    // for controlled input
    useEffect(() => {
        const dateValue = value || defaultValue; // todo?: don't use default value here
        if (!dateValue) return;

        setDate(dateValue);

        if (context.openOnInit) {
            context.openOnInit = false;

            const dp = $(ref.current.el).data("datepicker");
            dp.show();
        }
    }, [value]);

    // set date on value change
    // !!! handleChange gets (value, event) because is passed to <Input/> component (not to primitive <input/>)
    const handleChange = useCallback((value, event) => {
        const date = setDate(value, { parse: true });

        onChange?.(date, event);

        // if event - date is changed by hand (typing in input)
        if (event.type !== DATE_SELECT_EVENT) {
            const dp = $(ref.current.el).data("datepicker");
            dp.show(); // for uncontrolled component - open calendar
            context.openOnInit = true; // for controlled component - open calendar on next render
        }
    }, []); // todo: deps?

    /**
     * Parse to [d1, d2]
     * @param {*} value
     * @returns
     */
    const getDateValueFromString = (value) => {
        // todo: optimize get separator
        const separator = options?.multipleDatesSeparator || DEFAULT_MULTIPLE_DATES_SEPARATOR;

        return options?.range ? value.split(separator).filter(Boolean) : value;
    };

    const getValidatedDate = (value) => {
        const isRange = Array.isArray(value);

        return isRange ? getValidatedDateRange(value) : getValidatedDateSingle(value);
    };

    const getValidatedDateSingle = (value) => {
        if (value === "")
            return {
                isValid: true,
                dateValue: value,
                dateObj: null,
            };

        const mDate = moment(value, format, true);
        const isValid = mDate.isValid();

        return {
            isValid,
            dateValue: isValid ? value : null,
            dateObj: isValid ? mDate.toDate() : null,
        };
    };

    const getValidatedDateRange = (value) => {
        if (value.length === 0)
            return {
                isValid: true,
                dateValue: [],
                dateObj: [],
            };

        const [valueBegin, valueEnd] = value;

        const mDateBegin = moment(valueBegin, format, true);
        const mDateEnd = moment(valueEnd, format, true);

        const isDateBeginValid = mDateBegin.isValid();
        const isDateEndValid = mDateEnd.isValid();
        const isValid = isDateBeginValid && isDateEndValid;

        return {
            isValid,
            dateValue: isValid ? [valueBegin, valueEnd] : null,
            dateObj: isValid ? [mDateBegin.toDate(), mDateEnd.toDate()] : null,
        };
    };

    const setDate = (value, { parse = false } = {}) => {
        //? call selectDate two times ??? (see below)
        if (!value) selectDate(); // reset date

        if (parse) value = getDateValueFromString(value);

        const { isValid, dateValue, dateObj } = getValidatedDate(value);

        if (isValid) selectDate(dateObj);

        return dateValue;

        /**
         * todo
         * @param {*} date
         */
        function selectDate(date) {
            const dp = $(ref.current.el).data("datepicker");

            context.silent = true;
            dp.clear();
            if (date) dp.selectDate(date);
            context.silent = false;

            // update date in calendar dropdown
            // note: dp.setViewDate(date.toDate()) in new version();
            if (Array.isArray(date)) {
                const [firstDate, secondDate] = date;
                const isSame = moment(firstDate).isSame(moment(secondDate));
                const isBefore = moment(firstDate).isBefore(moment(secondDate));
                const isSameOrBefore = isSame || isBefore;
                dp.date = isSameOrBefore ? firstDate : secondDate;
            } else {
                dp.date = date;
            }
        }
    };

    return {
        callbackRef,
        handleChange,
    };
};
