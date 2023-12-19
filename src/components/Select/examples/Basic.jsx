import { useState, useRef } from "react";

import { VStack } from "../../Stack";
import { Button, ButtonVariant } from "../../Button";
import { Checkbox } from "../../Checkbox";
import { Radio } from "../../Radio";
import { Input } from "../../Input";
import { Row, Col } from "../../Grid";
import { Separator } from "../../Separator";
import { Select } from "../Select";
import { options } from "./data";

export const Default = () => <Select {...options} />;

export const NoItems = () => <Select />;

export const Title = () => <Select {...options} title="Title" />;

export const Error = () => <Select {...options} error="Error" />;

export const Disabled = () => <Select {...options} disabled />;

export const Required = () => <Select {...options} title="Title" required />;

export const Multiple = () => <Select {...options} multiple />;

export const Placeholder = () => {
    const commonOptions = {
        ...options,
        placeholder: "Выберите",
    };
    return (
        <VStack gap={2}>
            <Select {...commonOptions} title="Единственный выбор" />
            <Select {...commonOptions} title="Множественный выбор" multiple />
        </VStack>
    );
};

export const Closeable = () => <Select {...options} closeable />;

export const CloseableWithError = () => <Select {...options} closeable error />;

export const NoDecor = () => <Select {...options} title="Селект без декора" label="Искать по:" noDecor />;

export const Uncontrolled = () => {
    const [value, setValue] = useState(null);

    const selectRef = useRef();
    const countRef = useRef(0);

    countRef.current += 1;

    return (
        <>
            <Select
                {...options}
                ref={selectRef}
                defaultValue={options.items[0].value} // initial value
                onChange={(value) => {
                    console.log("value", value);
                    console.log("selectRef.current.getValue()", selectRef.current.getValue());
                }}
            />
            <div>
                <Button
                    variant={ButtonVariant.Plain}
                    onClick={() => {
                        // read value from select (with rerender)
                        setValue(selectRef.current.getValue());
                    }}
                >
                    Get value
                </Button>
                <div>Render: {countRef.current}</div>
                <div>Value: {value}</div>
            </div>
        </>
    );
};

export const Controlled = () => {
    const [value, setValue] = useState(options.items[0].value);
    const countRef = useRef(0);

    countRef.current += 1;

    return (
        <>
            <Select
                {...options}
                value={value} // current value
                onChange={setValue} // set new value on every change (with rerender)
                // todo: don't close on rerender
                multiple
            />
            <div>Render: {countRef.current}</div>
            <div>Value: {value}</div>
        </>
    );
};

export const Events = () => {
    const [events, setEvents] = useState([]);

    const handler = (event) => {
        setEvents((events) => [...events, event]);
    };

    return (
        <>
            <Select
                {...options}
                onShow={handler}
                onShown={handler}
                onHide={handler}
                onHidden={handler}
                onLoaded={handler}
                onRendered={handler}
                onRefreshed={handler}
                onChanged={handler}
            />
            <div>
                Events:
                <ul>
                    {events.map(({ type }) => (
                        <li key={type}>{type}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};
