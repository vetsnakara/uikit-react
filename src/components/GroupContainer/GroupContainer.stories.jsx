import { Button } from "../Button";

import { GroupContainer } from "./GroupContainer";

import { maxWidth } from "@/storybook/decorators";

export default {
    title: "layout/GroupContainer",
    decorators: [maxWidth(500)],
    tags: ["autodocs"],
};

export const Default = () => (
    <GroupContainer>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
    </GroupContainer>
);
