import { useEffect, useRef, useState } from "react";
import { Radio } from "./Radio";

export default {
    title: "uikit/Radio",
};

// todo: controlled and uncontrolled

export const Default = () => <Radio label="Default" />;

export const Checked = () => <Radio label="Checked" checked />;

export const DefaultChecked = () => <Radio label="DefaultChecked" defaultChecked />;

export const Disabled = () => <Radio label="One" disabled />;

export const Title = () => <Radio label="One" title="Radio title" />;

export const Error = () => <Radio label="One" error="Error text" />;

export const Ref = () => {
    const ref = useRef(null);

    useEffect(() => {
        console.log("ref.current", ref.current);
    }, []);

    return <Radio ref={ref} label="One" onChange={console.log} />;
};

export const GroupUncontrolled = () => {
    const ref = useRef(null);

    useEffect(() => {
        console.log("ref.current.getValue()", ref.current.getValue());
    }, []);

    return (
        <Radio.Group
            ref={ref}
            name="group"
            defaultValue="2"
            onChange={(value) => {
                console.log("value", value);
                console.log("ref.current.getValue()", ref.current.getValue());
            }}
        >
            <Radio value="1" label="One" />
            <Radio value="2" label="Two" />
            <Radio value="3" label="Three" />
        </Radio.Group>
    );
};

export const GroupDisabled = () => {
    return (
        <Radio.Group name="group" defaultValue="2" disabled>
            <Radio value="1" label="One" />
            <Radio value="2" label="Two" />
            <Radio value="3" label="Three" />
        </Radio.Group>
    );
};

export const GroupControlled = () => {
    const [value, setValue] = useState("2");

    return (
        <Radio.Group name="group" value={value} onChange={setValue}>
            <Radio value="1" label="One" />
            <Radio value="2" label="Two" />
            <Radio value="3" label="Three" />
        </Radio.Group>
    );
};
