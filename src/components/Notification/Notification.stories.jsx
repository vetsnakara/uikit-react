import { Button } from "../Button";

import { HStack } from "../Stack";

import { NotificationContainer, notification } from "./NotificationContainer";

import { maxWidth } from "@/storybook/decorators";

export default {
    title: "uikit/Notification",
    decorators: [maxWidth(500)],
    tags: ["autodocs"],
};

// todo: не вижно иконки закрытия

export const Notification = () => {
    return (
        <HStack gap={1}>
            <Button onClick={notification.info}>Info</Button>
            <Button onClick={notification.success}>Success</Button>
            <Button onClick={notification.warning}>Warning</Button>
            <Button onClick={notification.danger}>Danger</Button>
            <NotificationContainer />
        </HStack>
    );
};
