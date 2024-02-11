import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { composeRef } from "@/utils";

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

export const useDatepicker = (
    extRef,
    { value, name, onChange, onBlur, datepickerOptions: options = defaultOptions, format = DEFAULT_DATE_FORMMAT }
) => {
    const context = useRef();

    const ref = useRef(null);
    const callbackRef = composeRef(ref, extRef);

    // note: use useLayoutEffect to initialize datepicker before useEffect
    useLayoutEffect(() => {
        const $el = $(ref.current);

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
        const dateValue = value;

        if (_.isNull(dateValue) || _.isUndefined(dateValue)) {
            console.log("dateValue", dateValue, "🛑 return");
            return;
        }

        setDate(dateValue);

        if (context.openOnInit) {
            context.openOnInit = false;

            const dp = $(ref.current).data("datepicker");
            dp.show();
        }
    }, [value]);

    // note: handleChange gets (value, event) because is passed to <Input/>
    // not to primitive <input/>
    const handleChange = useCallback((value, event) => {
        const date = setDate(value, { parse: true });

        onChange?.(date, event);

        // if event - date is changed by hand (typing in input)
        if (event.type !== DATE_SELECT_EVENT) {
            const dp = $(ref.current).data("datepicker");
            dp.show(); // for uncontrolled component - open calendar
            context.openOnInit = true; // for controlled component - open calendar on next render
        }
    }, []);

    /**
     * Parse to [d1, d2]
     * @param {*} value
     * @returns
     */
    const getDateValueFromString = (value) => {
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
            const dp = $(ref.current).data("datepicker");

            context.silent = true;
            dp.clear();
            if (date) dp.selectDate(date);
            context.silent = false;

            // update date in calendar dropdown
            // note: dp.setViewDate(date.toDate()) in new version of air-datepicker;
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
