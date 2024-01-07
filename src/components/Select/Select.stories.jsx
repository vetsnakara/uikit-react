import { useEffect, useRef, useState, Component } from "react";
import { maxWidth } from "../../../.storybook/decorators";

import ReactSelect from "react-select";
import ReactDatePicker from "react-datepicker";

export default {
    title: "inputs/Select",
    decorators: [maxWidth(500)],
};

// todo: опция ВСЕ для обычного селекта (и мультиселекта?)
// todo: пустая опция
// todo: we don't see x button in search input
// todo: в stories не мемоизировать опции (для краткости), но оставить комментарий, что в рабочем коде мемоизировать нужно
// todo: select events
// todo: select methods
// todo: how to remove dropdown-header if no label specified for optgroup ???
// todo: why groups don't work with multiselect ???
// todo: сделать todo-лист для доработок (уже в составе команды), если не получилось решить сразу
// todo: programmatically chanage items, selectpickerOptions, value
// todo: test progammaticaly change value (+ multiple), disable/enable, chnage add/remove options - need to refresh

export {
    Default,
    NoItems,
    Title,
    Error,
    Disabled,
    Required,
    Multiple,
    Placeholder,
    Closeable,
    CloseableWithError,
    NoDecor,
    Uncontrolled,
    Controlled,
    Events,
} from "./examples/Basic";

export { Subtext, StyleOptions, Divider, Groups, CustomContent, DisabledOptions } from "./examples/Options";

export {
    Width,
    Container,
    Dropup,
    Header,
    Size,
    MaxOptions,
    LiveSearch,
    LiveSearchStyle,
    ActionsBox,
    AddItems,
    SelectedTextFormat,
    NoneSelectedText,
    CountSelectedText,
    MultipleSeparator,
} from "./examples/Selectpicker";

export { Ajax } from "./examples/Ajax";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

export const ReactSelectStory = () => {
    const ref = useRef(null);

    const [value, setValue] = useState();

    // useEffect(() => {
    //     console.log("ref", ref);
    // }, []);

    // todo: try react datepicker too

    return (
        <>
            <div>value: {JSON.stringify(value)}</div>
            <ReactSelect
                isMulti
                ref={console.log}
                options={options}
                onChange={(value) => console.log("value", value)}
            />
            <button onClick={() => setValue(ref.current.getValue())}>get value</button>
            <button onClick={() => ref.current.setValue(options.slice(1))}>set value</button>

            <br />
            <br />
            <br />

            {/* <ReactDatePicker ref={dateRef} /> */}
        </>
    );
};

class ClassComponent extends Component {
    getValue() {}

    setValue() {}

    render() {
        return <div>Hi</div>;
    }
}

export const ClassComponentStory = () => {
    const ref = useRef(null);

    useEffect(() => {
        console.log("ClassComponent:ref", ref);
    });

    return <ClassComponent ref={ref} />;
};
