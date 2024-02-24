import { useRef, useState } from "react";

import { Checkbox } from "./Checkbox";

import { VStack } from "@/components";

export default {
    title: "inputs/Checkbox",
    tags: ["autodocs"],
};

export const Default = () => <Checkbox label="Default" />;

export const Checked = () => <Checkbox label="Checked" checked />;

export const DefaultChecked = () => <Checkbox label="DefaultChecked" defaultChecked />;

export const Disabled = () => <Checkbox label="One" disabled />;

export const Title = () => <Checkbox label="One" title="Checkbox title" />;

export const Error = () => <Checkbox label="One" error="Error text" />;

export const Switch = () => (
    <>
        <Checkbox label="One" variant={Checkbox.Variant.Switch} />
        <Checkbox label="One" variant={Checkbox.Variant.Switch} checked />
        <Checkbox label="One" variant={Checkbox.Variant.Switch} defaultChecked />
        <Checkbox label="One" variant={Checkbox.Variant.Switch} disabled />
        <Checkbox label="One" variant={Checkbox.Variant.Switch} title="Switch title" />
        <Checkbox label="One" variant={Checkbox.Variant.Switch} error="Error text" />
    </>
);

export const Uncontrolled = () => {
    const ref = useRef(null);

    return (
        <Checkbox
            ref={ref}
            label="One"
            onChange={(value) => {
                console.log("value", value);
            }}
        />
    );
};

export const Controlled = () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label="One" checked={checked} onChange={setChecked} />;
};

// Group
// --------------------------
export const Group = () => {
    return (
        <Checkbox.Group name="group" value={["2"]}>
            <Checkbox value="1" label="One" />
            <Checkbox value="2" label="Two" />
            <Checkbox value="3" label="Three" />
        </Checkbox.Group>
    );
};

export const GroupDisabled = () => {
    return (
        <Checkbox.Group name="group" value={["2"]} disabled>
            <Checkbox value="1" label="One" />
            <Checkbox value="2" label="Two" />
            <Checkbox value="3" label="Three" />
        </Checkbox.Group>
    );
};

export const GroupSwitch = () => {
    return (
        <Checkbox.Group name="group" value={["2"]} variant={Checkbox.Variant.Switch}>
            <VStack gap={1}>
                <Checkbox value="1" label="One" />
                <Checkbox value="2" label="Two" />
                <Checkbox value="3" label="Three" />
            </VStack>
        </Checkbox.Group>
    );
};

export const GroupUncontrolled = () => {
    const ref = useRef(null);

    const handleChange = (value) => {
        console.log("value", value);
    };

    return (
        <Checkbox.Group ref={ref} name="group" value={["2"]} onChange={handleChange}>
            <Checkbox value="1" label="One" />
            <Checkbox value="2" label="Two" />
            <Checkbox value="3" label="Three" />
        </Checkbox.Group>
    );
};

export const GroupControlled = () => {
    const [value, setValues] = useState(["2"]);

    return (
        <Checkbox.Group name="group" value={value} onChange={setValues}>
            <Checkbox value="1" label="One" />
            <Checkbox value="2" label="Two" />
            <Checkbox value="3" label="Three" />
        </Checkbox.Group>
    );
};
