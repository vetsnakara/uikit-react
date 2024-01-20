import { OList, UList } from "./List";

export default {
    title: "uikit/List",
    tags: ["autodocs"],
};

export const Unordered = () => (
    <UList>
        <UList.Item>One</UList.Item>
        <UList.Item>
            Two
            <UList>
                <UList.Item>One</UList.Item>
                <UList.Item>Two</UList.Item>
                <UList.Item>Three</UList.Item>
            </UList>
        </UList.Item>
        <UList.Item>Three</UList.Item>
    </UList>
);

export const Ordered = () => (
    <OList>
        <OList.Item>One</OList.Item>
        <OList.Item>
            Two
            <OList bracket>
                <OList.Item>One</OList.Item>
                <OList.Item>Two</OList.Item>
                <OList.Item>
                    Three
                    <OList letter>
                        <OList.Item value={3}>One</OList.Item>
                        <OList.Item value={4}>Two</OList.Item>
                        <OList.Item value={5}>Three</OList.Item>
                    </OList>
                </OList.Item>
            </OList>
        </OList.Item>
        <OList.Item>Three</OList.Item>
    </OList>
);
