import { Button } from "./Button";

import { maxWidth } from "@/storybook/decorators";

import { GroupContainer, VStack } from "@/components";

export default {
    title: "uikit/Button",
    tags: ["autodocs"],
    decorators: [maxWidth(500)],
    parameters: {
        docs: {
            description: {
                component: "Кнопка",
            },
        },
    },
};

const Buttons = ({ label = "Click", ...props }) => (
    <GroupContainer>
        <Button {...props}>{label}</Button>

        <Button variant="secondary" {...props}>
            {label}
        </Button>

        <Button variant="plain" {...props}>
            {label}
        </Button>
    </GroupContainer>
);

export const Default = () => (
    <VStack gap={1}>
        <Buttons />
        <Buttons theme="destruct" />
        <Buttons disabled />
    </VStack>
);

export const WithIcon = () => (
    <VStack gap={1}>
        <Buttons icon="delete" />
        <Buttons icon="delete" theme="destruct" />
        <Buttons icon="delete" disabled />
    </VStack>
);

WithIcon.parameters = {
    docs: {
        description: {
            story: "Кнока с иконкой",
        },
    },
};

export const IconButton = () => (
    <VStack gap={1}>
        <Buttons icon="delete" label="" />
        <Buttons icon="delete" label="" theme="destruct" />
        <Buttons icon="delete" label="" disabled />
    </VStack>
);

IconButton.parameters = {
    docs: {
        description: {
            story: "Кнока с иконкой без текста",
        },
    },
};

export const Wide = () => (
    <VStack gap={3}>
        <VStack gap={1} max>
            <Buttons wide />
        </VStack>
        <VStack gap={1} max>
            <Buttons wide theme="destruct" />
        </VStack>
        <VStack gap={1} max>
            <Buttons wide disabled />
        </VStack>
    </VStack>
);

Wide.parameters = {
    docs: {
        description: {
            story: "Широкая кнопка",
        },
    },
};
