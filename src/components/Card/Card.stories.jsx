import { Card } from "./Card";

import { maxWidth } from "@/storybook/decorators";

export default {
    title: "uikit/Card",
    tags: ["autodocs"],
    decorators: [maxWidth(500)],
    parameters: {
        docs: {
            description: {
                component: "Карточка",
            },
        },
    },
};

export const Default = () => <Card style={{ width: "100%" }}>Default</Card>;

export const Muted = () => (
    <Card style={{ width: "100%" }} theme="muted">
        Muted
    </Card>
);

Muted.parameters = {
    docs: {
        description: {
            story: "Карточка c тенью",
        },
    },
};

export const WithFooter = () => (
    <Card>
        Content
        <Card.Footer>Footer</Card.Footer>
    </Card>
);

WithFooter.parameters = {
    docs: {
        description: {
            story: "Карточка c футером",
        },
    },
};
