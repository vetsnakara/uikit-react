import { VStack } from "../../Stack";
import { Select } from "../Select";

import { options } from "./data";

export const Subtext = () => {
    const items = [
        { value: "1", label: "One", subtext: "111" },
        { value: "2", label: "Two", subtext: "222" },
        { value: "3", label: "Three", subtext: "333" },
    ];

    return (
        <VStack gap={2}>
            <Select items={items} title="Единственный выбор" />
            <Select
                items={items}
                title="Единственный выбор (showSubtext: true)"
                selectpickerOptions={{ showSubtext: true }}
            />
            <Select items={items} title="Множественный выбор" multiple />
        </VStack>
    );
};

export const StyleOptions = () => {
    const commonOptions = {
        items: [
            { value: "1", label: "One", className: "special", style: { backgroundColor: "red" } },
            { value: "2", label: "Two", className: "special", style: { backgroundColor: "magenta" } },
            { value: "3", label: "Three", className: "special", style: { backgroundColor: "orange" } },
        ],
        selectpickerOptions: {
            showSubtext: true,
        },
    };

    return (
        <VStack gap={2}>
            <Select {...commonOptions} title="Единственный выбор" />
            <Select {...commonOptions} title="Множественный выбор" multiple />
        </VStack>
    );
};

export const Divider = () => {
    const items = [
        { value: "1", label: "One" },
        { value: "2", label: "Two" },
        { value: "3", label: "Three" },
        { divider: true },
        { value: "4", label: "Four" },
        { value: "5", label: "Five" },
    ];

    return <Select items={items} />;
};

export const Groups = () => {
    const items = [
        {
            value: "0",
            label: "Zero",
        },
        {
            label: "Group 1",
            items: [
                { value: "1", label: "One" },
                { value: "2", label: "Two" },
                { value: "3", label: "Three" },
            ],
        },
        {
            // label: "Group 2",
            disabled: true,
            items: [
                { value: "4", label: "Four" },
                { value: "5", label: "Five" },
            ],
        },
        {
            value: "6",
            label: "Six",
        },
        {
            value: "7",
            label: "Seven",
        },
    ];

    return (
        <VStack gap={2}>
            <Select items={items} title="Единственный выбор" />
            {/* <Select items={items} title="Множественный выбор" multiple />  */}
        </VStack>
    );
};

export const CustomContent = () => {
    const getContent = (text, color = "red") => {
        const style = [
            "display: inline-block",
            `background-color: ${color}`,
            "padding: 3px 10px",
            "border-radius: 6px",
        ].join(";");

        return `<span style="${style}">${text}</span>`;
    };

    const items = [
        { value: "1", label: "One", content: getContent("One", "red") },
        { value: "2", label: "Two", content: getContent("Two", "magenta") },
        { value: "3", label: "Three", content: getContent("Three", "orange") },
    ];

    return (
        <VStack gap={2}>
            <Select items={items} title="Единственный выбор (showContent: true, default)" />
            <Select
                items={items}
                title="Единственный выбор (showContent: false)"
                selectpickerOptions={{ showContent: false }}
            />
            <Select items={items} title="Множественный выбор (showContent: true, default)" multiple />
            <Select
                items={items}
                title="Множественный выбор (showContent: false)"
                selectpickerOptions={{ showContent: false }}
                multiple
            />
        </VStack>
    );
};

export const DisabledOptions = () => {
    const items = [
        ...options.items,
        { value: "6", label: "Six", disabled: true },
        { value: "7", label: "Seven", disabled: true },
    ];

    return (
        <>
            <VStack gap={2} style={{ marginBottom: 50 }}>
                <Select items={items} title="Единственный выбор (hideDisabled: false, default)" />
                <Select
                    items={items}
                    title="Единственный выбор (hideDisabled: true)"
                    selectpickerOptions={{ hideDisabled: true }}
                />
            </VStack>
            <VStack gap={2}>
                <Select items={items} title="Множественный выбор (hideDisabled: false, default)" multiple />
                <Select
                    items={items}
                    title="Множественный выбор (hideDisabled: true)"
                    selectpickerOptions={{ hideDisabled: true }}
                    multiple
                />
            </VStack>
        </>
    );
};
