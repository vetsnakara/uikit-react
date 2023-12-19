import { VStack } from "../Stack";
import { Status, StatusType } from "./Status";

export default {
    title: "uikit/Status",
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
