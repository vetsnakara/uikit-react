import { VStack } from "../Stack";
import { Subtitle } from "../Text";

import { Definitions } from "./Definitions";

export default {
    title: "uikit/Definitions",
};

const items = [
    {
        term: "Model",
        desc: "The central component of the pattern. It is the application's dynamic data structure, independent of the user interface. It directly manages the data, logic and rules of the application. ",
    },
    {
        term: "View",
        desc: "Any representation of information such as a chart, diagram or table. Multiple views of the same information are possible, such as a bar chart for management and a tabular view for accountants.",
    },
    { term: "Controller", desc: "Accepts input and converts it to commands for the model or view." },
];

const { Variant, Width } = Definitions;

export const Default = () => <Definitions items={items} />;

export const Reverse = () => <Definitions items={items} reverse />;

export const Row = () => <Definitions items={items} variant={Variant.Row} />;

export const RowTable = () => <Definitions items={items} variant={Variant.RowTable} />;

export const FixWidth = () => (
    <VStack gap={3}>
        {/* todo: use Box */}
        <div>
            <Subtitle>Ширина лейбла 150px</Subtitle>
            <Definitions items={items} variant={Variant.RowTable} fixWidth={Width.W150} />
        </div>
        <div>
            <Subtitle>Ширина лейбла 200px</Subtitle>
            <Definitions items={items} variant={Variant.RowTable} fixWidth={Width.W200} />
        </div>
        <div>
            <Subtitle>Ширина лейбла 250px</Subtitle>
            <Definitions items={items} variant={Variant.RowTable} fixWidth={Width.W250} />
        </div>
        <div>
            <Subtitle>Ширина лейбла 300px</Subtitle>
            <Definitions items={items} variant={Variant.RowTable} fixWidth={Width.W300} />
        </div>
    </VStack>
);
