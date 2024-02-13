import { useCallback, useEffect, useState } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import { DateInput, Input } from "../inputs";

import { Card, Checkbox, Col, Form, Row, Subtitle } from "@/components";

const EXT_NUMBER_KEY = "extensionNumber";

// todo: create hook for logic
export const AttorneyInfo = ({ className }) => {
    const [noExtensionNumber, setNoExtensionNumber] = useState(false);

    const {
        setValue,
        formState: { isSubmitted },
        getFieldState,
    } = useFormContext();

    const { isDirty: isExtNumberDirty } = getFieldState(EXT_NUMBER_KEY);
    const extensionNumber = useWatch({ name: EXT_NUMBER_KEY });

    console.log({ isExtNumberDirty, extensionNumber });

    // handle reset
    useEffect(() => {
        if (!isExtNumberDirty) {
            setNoExtensionNumber(false);
        }
    }, [extensionNumber, isExtNumberDirty]);

    const handleChangeNoExtensionNumber = useCallback(
        (checked) => {
            setNoExtensionNumber(checked);

            const newValue = checked ? "Б/н" : "";

            setValue(EXT_NUMBER_KEY, newValue, {
                shouldValidate: isSubmitted,
                shouldDirty: true,
            });
        },
        [isSubmitted]
    );

    return (
        <Card className={className}>
            <Subtitle>Сведения о доверенности</Subtitle>
            <Form.Section>
                <Input
                    title="Внтуренний номер"
                    name={EXT_NUMBER_KEY}
                    placeholder="Введите значение"
                    className="mb-1"
                    disabled={noExtensionNumber}
                />
                <Checkbox label="Без номера" checked={noExtensionNumber} onChange={handleChangeNoExtensionNumber} />
            </Form.Section>
            <Form.Section>
                <Row>
                    <Col md={6} className="mb-2 mb-md-0">
                        <DateInput title="Дата выдачи доверенности" name="created" />
                    </Col>
                    <Col md={6}>
                        <DateInput title="Дата окончания доверенности" name="validity" />
                    </Col>
                </Row>
            </Form.Section>
        </Card>
    );
};
