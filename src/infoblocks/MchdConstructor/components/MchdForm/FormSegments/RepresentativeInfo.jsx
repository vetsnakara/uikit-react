import { useFormContext } from "react-hook-form";

import { Card, Col, Form, Row, Subtitle } from "@uikit/components";

import { DocKind } from "../../../constatns/constants";
import { useData } from "../../../context/DataContext";
import { DateInput, Input, Select } from "../inputs";

export const RepresentativeInfo = ({ className }) => {
    const { selectItems } = useData();
    const { watch } = useFormContext();

    /**
     * Настройка видимости полей блока "Сведения о представителе" в зависимости от кода выбранного вида документа
     * 1. Поле "Наименование органа, выдавшего документ" отображается если код выбранного Вида документа <> 10
     * 2. Поле "Код подразделения органа, выдавшего документ" отображается если код выбранного Вида документа <> 10
     * 3. Поле "Дата истечения срока действия документа, удостоверяющего личность" отображается если код выбранного Вида документа = 22
     */
    const docKind = watch("representative.documentType");
    const isDocKind = Boolean(docKind);
    const isForeignCitizenPassport = docKind === DocKind.ForeignCitizenPassport;
    const isInternationalPassportOfCitizenOfRussianFederation =
        docKind === DocKind.InternationalPassportOfCitizenOfRussianFederation;

    return (
        <Card className={className}>
            <Subtitle>Сведения о представителе</Subtitle>

            <Form.Section>
                <Row>
                    <Col md={6} className="mb-2 mb-md-0">
                        <Select title="ФИО" name="representative.id" items={selectItems.managers} />
                    </Col>
                    <Col md={6}>
                        <DateInput title="Дата рождения" name="representative.birthday" />
                    </Col>
                </Row>
            </Form.Section>
            <Form.Section>
                <Row>
                    <Col md={6} className="mb-2 mb-md-0">
                        <Input title="СНИЛС" name="representative.snils" />
                    </Col>
                    <Col md={6}>
                        <Input title="ИНН" name="representative.inn" />
                    </Col>
                </Row>
            </Form.Section>
            <Form.Section>
                <Select title="Вид документа" name="representative.documentType" items={selectItems.documentTypes} />
            </Form.Section>
            <Form.Section>
                <Row>
                    <Col md={6} className="mb-2 mb-md-0">
                        <Input title="Серия и номер документа" name="representative.seriesAndNumber" />
                    </Col>
                    <Col md={6}>
                        <DateInput title="Дата выдачи документа" name="representative.created" />
                    </Col>
                </Row>
            </Form.Section>
            {isDocKind && !isForeignCitizenPassport && (
                <>
                    <Form.Section>
                        <Input
                            title="Наименование органа, выдавшего документ"
                            name="representative.authorityDocument"
                        />
                    </Form.Section>
                    <Form.Section>
                        <Input
                            title="Код подразделения органа, выдавшего документ"
                            name="representative.authorityCodeDocument"
                        />
                    </Form.Section>
                </>
            )}
            {isDocKind && isInternationalPassportOfCitizenOfRussianFederation && (
                <Form.Section>
                    <DateInput
                        title="Дата истечения срока действия документа, удостоверяющего личность"
                        name="representative.validity"
                    />
                </Form.Section>
            )}
        </Card>
    );
};
