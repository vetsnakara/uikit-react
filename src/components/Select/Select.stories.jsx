import { maxWidth } from "@/storybook/decorators";

export default {
    title: "inputs/Select",
    tags: ["autodocs"],
    decorators: [maxWidth(500)],
};

export {
    Closeable,
    CloseableWithError,
    Controlled,
    Default,
    Disabled,
    Error,
    Events,
    Multiple,
    NoDecor,
    NoItems,
    Placeholder,
    Required,
    Title,
    Uncontrolled,
} from "./examples/Basic";

export { CustomContent, DisabledOptions, Divider, Groups, StyleOptions, Subtext } from "./examples/Options";

export {
    ActionsBox,
    AddItems,
    Container,
    CountSelectedText,
    Dropup,
    Header,
    LiveSearch,
    LiveSearchStyle,
    MaxOptions,
    MultipleSeparator,
    NoneSelectedText,
    SelectedTextFormat,
    Size,
    Width,
} from "./examples/Selectpicker";

export { Ajax } from "./examples/Ajax";
