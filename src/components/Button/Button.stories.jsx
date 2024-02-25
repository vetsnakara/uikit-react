import { Button } from "./Button";

import { maxWidth } from "@/storybook/decorators";

import { GroupContainer, Icon, VStack } from "@/components";

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

export const WithIcon = () => {
    const icon = <Icon name="delete" />;

    return (
        <VStack gap={1}>
            <Buttons icon={icon} />
            <Buttons icon={icon} theme="destruct" />
            <Buttons icon={icon} disabled />
        </VStack>
    );
};

WithIcon.parameters = {
    docs: {
        description: {
            story: "Кнопка с иконкой",
        },
    },
};

export const IconButton = () => {
    const icon = <Icon name="delete" />;

    return (
        <VStack gap={1}>
            <Buttons icon={icon} label="" />
            <Buttons icon={icon} label="" theme="destruct" />
            <Buttons icon={icon} label="" disabled />
        </VStack>
    );
};

IconButton.parameters = {
    docs: {
        description: {
            story: "Кнопка с иконкой без текста",
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
