import { useEffect, useMemo, useRef, useState } from "react";

import { Input } from "./Input";
import { SearchInput } from "./SearchInput";

import { Button, ButtonVariant, GroupContainer, VStack } from "@/components";

import { maxWidth } from "@/storybook/decorators";

export default {
    title: "inputs/Input",
    tags: ["autodocs"],
    decorators: [maxWidth(500)],
};

export const Default = () => <Input />;

export const Uncontrolled = () => {
    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        console.log("inputRef", inputRef);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValue(inputRef.current.value);
    };

    const handleClickFocus = () => {
        inputRef.current.focus();
    };

    return (
        <>
            <p>Input value: {value}</p>
            <form onSubmit={handleSubmit}>
                <VStack gap={1}>
                    <Input
                        ref={inputRef}
                        defaultValue="Hello"
                        onChange={(value) => {
                            console.log("value", value);
                        }}
                    />
                    <GroupContainer>
                        <Button type="submit">Submit Form</Button>
                        <Button onClick={handleClickFocus}>Focus</Button>
                    </GroupContainer>
                </VStack>
            </form>
        </>
    );
};

export const Controlled = () => {
    const [value, setValue] = useState("");
    const renderCountRef = useRef(0);

    renderCountRef.current += 1;

    return (
        <>
            <p>Render count: {renderCountRef.current}</p>
            <p>Input value: {value}</p>
            <Input value={value} onChange={setValue} />
        </>
    );
};

export const Title = () => <Input title="Title" />;

export const Error = () => <Input error="Error text" />;

export const Mask = () => {
    const [mask, setMask] = useState("phone");

    const maskOptions = useMemo(() => {
        if (mask === "phone")
            return {
                mask: "+\\7(99[9]) 999-99-99",
            };
        if (mask === "email")
            return {
                alias: "email",
            };
    }, [mask]);

    return (
        <>
            <Input maskOptions={maskOptions} />

            <div>
                <Button variant={ButtonVariant.Plain} onClick={() => setMask("phone")}>
                    Change to Phone Mask
                </Button>
                <br />
                <Button variant={ButtonVariant.Plain} onClick={() => setMask("email")}>
                    Change to Email Mask
                </Button>
            </div>
        </>
    );
};

export const Disabled = () => <Input disabled />;

export const Required = () => <Input title="Title" required />;

export const Readonly = () => <Input defaultValue="123" readOnly />;

export const Search = () => {
    const [value, setValue] = useState("");
    const [submitValue, setSubmitValue] = useState("");

    return (
        <>
            <SearchInput
                value={value}
                onChange={(value) => setValue(value)}
                onSubmit={(value) => setSubmitValue(value)}
            />
            <div>change value: {value}</div>
            <div>submit value: {submitValue}</div>
            <Button onClick={() => setValue("")}>reset</Button>
        </>
    );
};
