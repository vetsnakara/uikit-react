import { VStack } from "../Stack";

import { Status, StatusType } from "./Status";

import { maxWidth } from "@/storybook/decorators";

export default {
    title: "uikit/Status",
    decorators: [maxWidth(500)],
    tags: ["autodocs"],
};

export const Default = () => (
    <VStack gap={2}>
        <Status>Normal</Status>
        <Status type={StatusType.Success}>Success</Status>
        <Status type={StatusType.Danger}>Danger</Status>
        <Status type={StatusType.Warning}>Warning</Status>
        <Status type={StatusType.Muted}>Muted</Status>
    </VStack>
);
