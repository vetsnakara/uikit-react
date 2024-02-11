import { Textarea } from "./Textarea";

import { maxWidth } from "@/storybook/decorators";

export default {
    title: "inputs/Textarea",
    tags: ["autodocs"],
    decorators: [maxWidth(500)],
};

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
