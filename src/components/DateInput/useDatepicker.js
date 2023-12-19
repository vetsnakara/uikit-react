import { useEffect, useRef } from "react";

import { useElementRef } from "../../hooks/useElementRef";
import { useCallback } from "react";

const DEFAULT_DATE_FORMMAT = "DD.MM.YYYY";
const DEFAULT_MULTIPLE_DATES_SEPARATOR = " - ";
const DATE_SELECT_EVENT = "DATE_SELECT_EVENT";

const defaultOptions = {
    autoClose: true,
    multipleDatesSeparator: DEFAULT_MULTIPLE_DATES_SEPARATOR,
};

// todo: check different time formats
// todo: process minMaxDate (can input date < minDate by hand!)
// todo: в неконтр. варианте сделать так, чтобы через ref в range mode отдавался массив дат-строк
// todo: return focus to input after setting date by hand input

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
    const ref = useRef({});

    // todo: useCallback ???
    const callbackRef = (refParams) => {
        const { el } = refParams ?? {};

        ref.current = el
            ? {
                  el,
                  getValue: () => el.value, //! should return date / [date1, date2]/null, see onChange
                  setValue: setDate,
              }
            : null;

        if (!extRef) return;
        if (typeof extRef === "function") extRef(ref.current);
        else extRef.current = ref.current;
    };

    useEffect(() => {
        const $el = $(ref.current.el);

        $el.datepicker({
            ...defaultOptions,
            ...options,
            onSelect: (value) => {
                if (context.silent) return; // todo: update dp to use silent option?
                const dateSelectEvent = { target: { name }, type: DATE_SELECT_EVENT };
                handleChange(value, dateSelectEvent);
            },
            onHide(inst, isFinished) {
                if (isFinished) return;
                onBlur?.({ target: { name } });
            },
        });

        return () => {
            const dp = $el.data("datepicker");
            dp.destroy();
        };
    }, [options, onChange]);

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
        const dateValue = Boolean(options?.range)
            ? value.split(
                  // todo: optimize get separator
                  options?.multipleDatesSeparator || DEFAULT_MULTIPLE_DATES_SEPARATOR
              )
            : value;

        const date = setDate(dateValue);

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //! "" and [] are valid date(s) value
        // if (date) onChange?.(date, event);
        onChange?.(date, event);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // if event - date is changed by hand (typing in input)
        if (event.type !== DATE_SELECT_EVENT) {
            const dp = $(ref.current.el).data("datepicker");
            dp.show(); // for uncontrolled component - open calendar
            context.openOnInit = true; // for controlled component - open calendar on next render
        }
    }, []); // todo: deps?

    const setDate = (value) => {
        if (!value) selectDate();

        const isRange = Array.isArray(value);

        if (isRange) {
            const [valueBegin, valueEnd] = value;

            const mDateBegin = moment(valueBegin, format, true);
            const mDateEnd = moment(valueEnd, format, true);

            const isDateBeginValid = mDateBegin.isValid();
            const isDateEndValid = mDateEnd.isValid();
            const isValid = isDateBeginValid && isDateEndValid;

            if (isValid) {
                selectDate([mDateBegin.toDate(), mDateEnd.toDate()]);
                return [valueBegin, valueEnd];
            }
        } else {
            const mDate = moment(value, format, true);
            const isValid = mDate.isValid();
            if (isValid) {
                selectDate(mDate.toDate());
                return mDate.format(format);
            }
        }

        return null; // todo: need?

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
            // dp.setViewDate(date.toDate()) in new version
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
