import { Card } from "../../Card";

import { VStack } from "./VStack";

import { maxWidth } from "@/storybook/decorators";

export default {
    title: "uikit/Stack/VStack",
    decorators: [maxWidth(500)],
    tags: ["autodocs"],
};

export const GapOne = ({ gap = 1 }) => {
    return (
        <VStack gap={gap}>
            {[...Array(3).keys()].map((i) => (
                <Card key={i}>Content</Card>
            ))}
        </VStack>
    );
};

export const GapTwo = () => <GapOne gap={2} />;

export const GapThree = () => <GapOne gap={3} />;
