import { useState } from "react";

import { VStack } from "../../Stack";
import { Button } from "../../Button";
import { Checkbox } from "../../Checkbox";
import { Radio } from "../../Radio";
import { Input } from "../../Input";
import { Row, Col } from "../../Grid";
import { Separator } from "../../Separator";
import { Select } from "../Select";

import { options } from "./data";

export default {
    title: "inputs/Select/Sandbox",
};

export const Sandbox = () => {
    const [selectProps, setSelectProps] = useState({
        ...options,
        title: "Select title",
        label: "",
        placeholder: "Select placeholder",
        error: "Select error",
        selectpickerOptions: {
            width: false,
            // size: 5,
        },
    });

    console.log("selectProps", selectProps);

    // todo: add `Reset button (red?)`
    // todo: this story should go first

    return (
        <>
            <Select {...selectProps} className="mb-3" />
            <Row>
                <Col>
                    <VStack gap={2} className="mb-2">
                        <Input
                            title="Title"
                            value={selectProps.title}
                            onChange={(value) =>
                                setSelectProps((props) => ({
                                    ...props,
                                    title: value,
                                }))
                            }
                            // className="mb-1" // todo: use margin util...
                        />
                        <Input
                            title="Label"
                            value={selectProps.label}
                            onChange={(value) =>
                                setSelectProps((props) => ({
                                    ...props,
                                    label: value,
                                }))
                            }
                        />
                        <Input
                            title="Error"
                            value={selectProps.error}
                            onChange={(value) =>
                                setSelectProps((props) => ({
                                    ...props,
                                    error: value,
                                }))
                            }
                        />
                        <Input
                            title="Placeholder"
                            value={selectProps.placeholder}
                            onChange={(value) =>
                                setSelectProps((props) => ({
                                    ...props,
                                    placeholder: value,
                                }))
                            }
                        />
                    </VStack>

                    <Separator />

                    <Row>
                        <Col>
                            <Checkbox
                                items={[{ value: "disabled", label: "Disabled" }]}
                                onChange={(value) =>
                                    setSelectProps((props) => ({
                                        ...props,
                                        disabled: value[0] === "disabled",
                                    }))
                                }
                            />
                            <Checkbox
                                items={[{ value: "noItems", label: "No items" }]}
                                onChange={(value) =>
                                    setSelectProps((props) => ({
                                        ...props,
                                        items: value[0] === "noItems" ? [] : options.items,
                                    }))
                                }
                            />
                            <Checkbox
                                items={[{ value: "required", label: "Required" }]}
                                onChange={(value) =>
                                    setSelectProps((props) => ({
                                        ...props,
                                        required: value[0] === "required",
                                    }))
                                }
                            />
                            {/* todo: options are sorted after select in multiple mode */}
                            <Checkbox
                                items={[{ value: "multiple", label: "Multiple" }]}
                                onChange={(value) =>
                                    setSelectProps((props) => ({
                                        ...props,
                                        multiple: value[0] === "multiple",
                                    }))
                                }
                            />
                            <Checkbox
                                items={[{ value: "closeable", label: "Closeable" }]}
                                onChange={(value) =>
                                    setSelectProps((props) => ({
                                        ...props,
                                        closeable: value[0] === "closeable",
                                    }))
                                }
                            />
                            <Checkbox
                                items={[{ value: "noDecor", label: "NoDecor" }]}
                                onChange={(value) =>
                                    setSelectProps((props) => ({
                                        ...props,
                                        noDecor: value[0] === "noDecor",
                                    }))
                                }
                            />
                        </Col>
                        <Col>
                            <Radio
                                value={selectProps.selectpickerOptions?.width ?? "auto"}
                                items={[
                                    { value: false, label: "false" }, // default
                                    { value: "auto", label: "auto" },
                                    { value: "fit", label: "fit" },
                                    { value: "150px", label: "150px" },
                                    { value: "75%", label: "75%" },
                                ]}
                                onChange={(value) => {
                                    setSelectProps((props) => ({
                                        ...props,
                                        selectpickerOptions: {
                                            ...props.selectpickerOptions,
                                            width: value === "false" ? false : value,
                                        },
                                    }));
                                }}
                            />
                        </Col>
                        <Col>
                            <Radio
                                value={selectProps.selectpickerOptions?.size ?? "auto"}
                                items={[
                                    { value: "auto", label: "auto" },
                                    { value: "false", label: "false" },
                                    { value: "2", label: "2" },
                                    { value: "4", label: "4" },
                                ]}
                                onChange={(value) =>
                                    setSelectProps((props) => ({
                                        ...props,
                                        selectpickerOptions: {
                                            ...props.selectpickerOptions,
                                            size: value,
                                        },
                                    }))
                                }
                            />
                        </Col>
                    </Row>

                    <Separator />

                    <Button
                        onClick={() =>
                            setSelectProps((props) => ({
                                ...props,
                                items: [
                                    {
                                        value: props.items.length,
                                        label: `New ${props.items.length}`,
                                    },
                                    ...props.items,
                                ],
                            }))
                        }
                    >
                        Add item
                    </Button>
                    <Button
                        onClick={() =>
                            setSelectProps((props) => ({
                                ...props,
                                items: props.items.slice(1),
                            }))
                        }
                    >
                        Remove First
                    </Button>
                    <Button
                        onClick={() =>
                            setSelectProps((props) => ({
                                ...props,
                                items: [
                                    { value: "a", label: "AAA" },
                                    { value: "b", label: "BBB" },
                                    { value: "c", label: "CCC" },
                                ],
                            }))
                        }
                    >
                        Change all
                    </Button>
                </Col>
            </Row>
        </>
    );
};
