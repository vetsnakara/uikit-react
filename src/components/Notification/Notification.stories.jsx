import { Button } from "../Button";

import { HStack } from "../Stack";

import { NotificationContainer, notification } from "./NotificationContainer";

export default {
    title: "uikit/Notification",
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
