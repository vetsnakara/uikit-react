import { Card } from "../../Card";

import { HStack } from "./HStack";

export default {
    title: "uikit/Stack/HStack",
};

export const GapOne = ({ gap = 1 }) => {
    return (
        <HStack gap={gap}>
            {[...Array(3).keys()].map((i) => (
                <Card key={i}>Content</Card>
            ))}
        </HStack>
    );
};

export const GapTwo = () => <GapOne gap={2} />;

export const GapThree = () => <GapOne gap={3} />;
