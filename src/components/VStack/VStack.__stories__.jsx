import { Card } from "../Card";
import { VStack } from "./VStack";

export default {
    title: "uikit/VStack",
    parameters: {
        layout: "centered",
    },
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
