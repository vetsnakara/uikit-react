import { VStack } from "../Stack";

import { Badge, BadgeMaxWidth250, BadgeVariant } from "./Badge";

export default {
    title: "uikit/Badge",
    tags: ["autodocs"],
};

export const Default = () => (
    <VStack gap={1}>
        <Badge>Default</Badge>
        <Badge variant={BadgeVariant.Success}>Success</Badge>
        <Badge variant={BadgeVariant.Warning}>Warning</Badge>
        <Badge variant={BadgeVariant.Danger}>Danger</Badge>
        <Badge variant={BadgeVariant.Error}>Error</Badge>
        <Badge variant={BadgeVariant.Error} closeable>
            Error Closeable
        </Badge>
        <Badge variant={BadgeVariant.Transparent}>Transparent</Badge>
        <Badge variant={BadgeVariant.Success} icon="book">
            Text
        </Badge>
        <Badge icon="book" round />
        <Badge maxWidth={BadgeMaxWidth250}>Very very very very very very long text</Badge>
    </VStack>
);
