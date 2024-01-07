import { useState, useMemo, useRef } from "react";

import { maxWidth } from "../../../.storybook/decorators";
import { VStack } from "../Stack";
import { Button, ButtonVariant } from "../Button";
import { DateInput } from "./DateInput";

export default {
    title: "inputs/DateInput",
    decorators: [maxWidth(500)],
};

// todo: controlled, uncontrolled, sandbox
// todo: sandbox like for select

export const Default = () => <DateInput />;

export const Title = () => <DateInput title="Title" />;

export const Error = () => <DateInput error="Error text" />;

export const Disabled = () => <DateInput disabled />;

export const Required = () => <DateInput title="Title" required />;

// todo: don't works
// export const Readonly = () => <DateInput value="10.10.1984" readOnly />;

export const Mask = () => (
    <VStack gap={1}>
        <DateInput
            maskOptions={{
                mask: "99.99.9999",
            }}
        />
        <DateInput
            datepickerOptions={{ range: true }}
            maskOptions={{
                mask: "99.99.9999 - 99.99.9999",
            }}
        />
    </VStack>
);

export const Range = () => (
    <DateInput
        datepickerOptions={{
            range: true,
            multipleDatesSeparator: " - ", // is by default
        }}
    />
);

// // datepicker options

export const DatepickerOptions = () => (
    <VStack gap={1}>
        {/* don't work */}
        {/* <DateInput title="inline: true" datepickerOptions={{ inline: true }} /> */}

        <DateInput
            title="Months"
            datepickerOptions={{
                view: "months",
                minView: "months",
                dateFormat: "MMMM yyyy", // don't works correctly
            }}
        />

        {/* don't work */}
        {/* <DateInput
            title="isMobile: true"
            datepickerOptions={{
                isMobile: true,
                autoClose: true,
            }}
        /> */}

        <DateInput
            title="minMaxDate"
            datepickerOptions={{
                isMobile: true,
                autoClose: true,
                minDate: moment().toDate(),
                maxDate: moment().add(5, "days").toDate(),
            }}
        />

        <DateInput
            title="minMaxDate"
            datepickerOptions={{
                range: true,
                isMobile: true,
                autoClose: true,
                minDate: moment().toDate(),
                maxDate: moment().add(5, "days").toDate(),
            }}
        />
    </VStack>
);

// todo: create case with submit form (like for ordinary input)
export const Uncontrolled = () => {
    const dateRef = useRef();
    const dateRangeRef = useRef();

    return (
        <VStack gap={2}>
            <DateInput
                ref={dateRef}
                defaultValue="10.10.1984"
                onChange={(value) => {
                    console.log("value", value);
                    console.log("dateRef.current.getValue()", dateRef.current.getValue());
                }}
                maskOptions={{
                    mask: "99.99.9999",
                }}
            />
            <DateInput
                ref={dateRangeRef}
                defaultValue={["10.10.1984", "15.10.1984"]}
                onChange={(value) => {
                    console.log("value", value);
                    console.log("dateRangeRef.current.getValue()", dateRangeRef.current.getValue());
                }}
                datepickerOptions={{
                    range: true,
                }}
                maskOptions={{
                    mask: "99.99.9999 - 99.99.9999",
                }}
            />
        </VStack>
    );
};

export const Controlled = () => (
    <VStack gap={2}>
        <ControlledSingle />
        <ControlledRange />
    </VStack>
);

//! при использовании контролируемых инпутов
//! 1 - лишние перерендеры всегда при изменении значения
//! 2 - нужно мемоизировать все передаваемые объекты (+ массивы), чтобы исключить лишние перерендеры, когда ничего в компоненте не поменялось (нужно делать и для неконтролируемых тоже)

const ControlledSingle = () => {
    const [date, setDate] = useState("10.10.1984");

    const options = useMemo(
        () => ({
            maskOptions: {
                mask: "99.99.9999",
            },
        }),
        []
    );

    return (
        <>
            <DateInput value={date} onChange={setDate} {...options} />
            <div>date: {JSON.stringify(date)}</div>
        </>
    );
};

const ControlledRange = () => {
    const [dates, setDates] = useState(["10.10.1984", "15.10.1984"]);

    const options = useMemo(
        () => ({
            maskOptions: {
                mask: "99.99.9999 - 99.99.9999",
            },
            datepickerOptions: {
                range: true,
            },
        }),
        []
    );

    return (
        <>
            <DateInput value={dates} onChange={setDates} {...options} />
            <div>dates: {JSON.stringify(dates)}</div>
        </>
    );
};
