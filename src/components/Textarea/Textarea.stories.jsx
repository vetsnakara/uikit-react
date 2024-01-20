import { maxWidth } from "../../../.storybook/decorators";

import { Textarea } from "./Textarea";

export default {
    title: "inputs/Textarea",
    tags: ["autodocs"],
    decorators: [maxWidth(500)],
};

// todo: controlled / uncontrolled
// todo: add mock onChange

const options = {
    value: "123",
    title: "Textarea title",
};

export const Default = () => <Textarea {...options} />;

export const Error = () => <Textarea {...options} error="Error text" />;

export const Disabled = () => <Textarea {...options} disabled />;

export const Required = () => <Textarea {...options} required />;

export const Readonly = () => <Textarea {...options} readOnly />;

export const WYSIWYG = () => <Textarea {...options} wysiwyg />;
