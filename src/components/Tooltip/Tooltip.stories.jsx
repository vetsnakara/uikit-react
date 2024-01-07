import { VStack } from "../Stack";

import { Tooltip } from "./Tooltip";

export default {
    title: "uikit/Tooltip",
    parameters: {
        layout: "centered",
    },
};

export const Default = () => (
    <VStack gap={3}>
        <Tooltip tooltip="Hello" placement="top">
            Top
        </Tooltip>
        <Tooltip tooltip="Hello" placement="bottom">
            Bottom
        </Tooltip>
        <Tooltip tooltip="Hello" placement="left">
            Left
        </Tooltip>
        <Tooltip tooltip="Hello" placement="right">
            Right
        </Tooltip>
        <Tooltip tooltip="Hello" toggle>
            Click
        </Tooltip>
        <Tooltip tooltip="Hello" theme="dark">
            Dark
        </Tooltip>
        <Tooltip tooltip="Hello" handler />
    </VStack>
);
