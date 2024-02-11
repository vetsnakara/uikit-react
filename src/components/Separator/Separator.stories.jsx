import { Separator } from "./Separator";

import { maxWidth } from "@/storybook/decorators";

export default {
    title: "uikit/Separator",
    tags: ["autodocs"],
    decorators: [maxWidth(500)],
};

export const Default = () => <Separator />;

export const Wide = () => <Separator wide />;

export const Vertical = () => <Separator vertical />;

export const WithText = () => <Separator>Text</Separator>;
