import { Icon } from "./Icon";

import { VStack, Subtitle, Row, Col } from "@/components";

export default {
    title: "uikit/Icon",
    component: Icon,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Иконка",
            },
        },
    },
};

const IconWrapper = (iconProps) => (
    <Col>
        <Icon name="eye" {...iconProps} />
    </Col>
);

const colors = ["", "brand", "good", "danger", "warning", "default", "gray", "blue", "muted", "light"];

const sizes = ["x3", "l", "b", "", "m", "s", "xs"];

export const Default = () => (
    <VStack gap={3}>
        <Subtitle>Цвет</Subtitle>
        <Row>
            {colors.map((color, index) => (
                <IconWrapper key={index} color={color} />
            ))}
        </Row>
        <Subtitle>Размер</Subtitle>
        <Row>
            {sizes.map((size, index) => (
                <IconWrapper key={index} size={size} />
            ))}
        </Row>
    </VStack>
);
