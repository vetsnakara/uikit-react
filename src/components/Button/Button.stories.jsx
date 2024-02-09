import { maxWidth } from "../../../.storybook/decorators";

import { HStack, VStack } from "../Stack";

import { Button } from "./Button";

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
    <>
        <Button {...props}>{label}</Button>

        <Button variant="secondary" {...props}>
            {label}
        </Button>

        <Button variant="plain" {...props}>
            {label}
        </Button>
    </>
);

export const Default = () => (
    <VStack gap={1}>
        <HStack gap={1}>
            <Buttons />
        </HStack>
        <HStack gap={1}>
            <Buttons theme="destruct" />
        </HStack>
        <HStack gap={1}>
            <Buttons disabled />
        </HStack>
    </VStack>
);

export const WithIcon = () => (
    <VStack gap={1}>
        <HStack gap={1}>
            <Buttons icon="delete" />
        </HStack>
        <HStack gap={1}>
            <Buttons icon="delete" theme="destruct" />
        </HStack>
        <HStack gap={1}>
            <Buttons icon="delete" disabled />
        </HStack>
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
        <HStack gap={1}>
            <Buttons icon="delete" label="" />
        </HStack>
        <HStack gap={1}>
            <Buttons icon="delete" label="" theme="destruct" />
        </HStack>
        <HStack gap={1}>
            <Buttons icon="delete" label="" disabled />
        </HStack>
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
