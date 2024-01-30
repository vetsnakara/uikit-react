import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Card, Checkbox, Col, Form, Row, Subtitle } from "@uikit/components";

import { DateInput, Input } from "../inputs";

export const AttorneyInfo = ({ className }) => {
    const {
        setValue,
        formState: { isSubmitted },
    } = useFormContext();

    const [noExtensionNumber, setNoExtensionNumber] = useState(false);

    const handleChangeNoExtensionNumber = useCallback(() => {
        setNoExtensionNumber((prev) => !prev);
    }, []);

    useEffect(() => {
        setValue("extensionNumber", noExtensionNumber ? "Б/н" : "", {
            shouldValidate: isSubmitted,
        });
    }, [noExtensionNumber, isSubmitted]);

    return (
        <Card className={className}>
            <Subtitle>Сведения о доверенности</Subtitle>
            <Form.Section>
                <Input
                    title="Внтуренний номер"
                    name="extensionNumber"
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
