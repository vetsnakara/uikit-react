import { useCallback, useMemo, useRef, useState } from "react";

import { DateInput } from "./DateInput";

import { maxWidth } from "@/storybook/decorators";

import { Button, VStack } from "@/components";

export default {
    title: "inputs/DateInput",
    tags: ["autodocs"],
    decorators: [maxWidth(500)],
};

export const Default = () => <DateInput />;

export const Title = () => <DateInput title="Title" />;

export const Error = () => <DateInput error="Error text" />;

export const Disabled = () => <DateInput disabled />;

export const Required = () => <DateInput title="Title" required />;

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

export const DatepickerOptions = () => (
    <VStack gap={1}>
        <DateInput
            title="Months"
            datepickerOptions={{
                view: "months",
                minView: "months",
                dateFormat: "MMMM yyyy", // don't works correctly
            }}
        />

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

export const Uncontrolled = () => {
    const dateRef = useRef();
    const dateRangeRef = useRef();

    return (
        <VStack gap={2}>
            <DateInput
                ref={dateRef}
                defaultValue="10.10.1984"
                onChange={useCallback((value) => {
                    console.log("value", value);
                }, [])}
                maskOptions={{
                    mask: "99.99.9999",
                }}
            />
            <DateInput
                ref={dateRangeRef}
                defaultValue={["10.10.1984", "15.10.1984"]}
                onChange={useCallback((value) => {
                    console.log("value", value);
                }, [])}
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

const ControlledSingle = ({ className }) => {
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
        <div className={className}>
            <DateInput value={date} onChange={setDate} {...options} />
            <div>date: {JSON.stringify(date)}</div>
            <Button onClick={() => setDate("")}>reset</Button>
        </div>
    );
};

const ControlledRange = ({ className }) => {
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
        <div className={className}>
            <DateInput value={dates} onChange={setDates} {...options} />
            <div>dates: {JSON.stringify(dates)}</div>
            <Button onClick={() => setDates([])}>reset</Button>
        </div>
    );
};
