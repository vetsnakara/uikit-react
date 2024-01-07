import { maxWidth } from "../../../.storybook/decorators";
import { Separator } from "./Separator";

export default {
    title: "uikit/Separator",
    decorators: [maxWidth(500)],
};

export const Default = () => <Separator />;

export const Wide = () => <Separator wide />;

export const Vertical = () => <Separator vertical />;

export const WithText = () => <Separator>Text</Separator>;
