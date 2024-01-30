import { useFormContext } from "react-hook-form";

import { Card, Col, Form, FormRadioGroup, Radio, Row, Separator, Subtitle } from "@uikit/components";

import { LegalEntityPrincipalType, PrincipalType } from "../../../constatns/constants";
import { useData } from "../../../context/DataContext";
import { DateInput, Input, Select } from "../inputs";

export const PrincipalInfo = ({ className }) => {
    const { selectItems } = useData();
    const { watch } = useFormContext();

    const type = watch("type");
    const legalEntityPrincipalType = watch("legalEntityPrincipal.type");

    return (
        <Card className={className}>
            <Subtitle>Сведения о доверителе</Subtitle>

            {/* Тип доверителя */}
            <Form.Section>
                <Form.Fieldset>
                    <Form.Title>Тип доверитея</Form.Title>
                </Form.Fieldset>
                <FormRadioGroup name="type" component={Row}>
                    <Col xs="auto" className="mb-2 mb-md-0">
                        <Radio label="Юридическое лицо" value={PrincipalType.LegalEntityPrincipal} />
                    </Col>
                    <Col xs="auto">
                        <Radio
                            label="Индивидуальный предприниматель"
                            value={PrincipalType.IndividualEntrepreneurPrincipal}
                        />
                    </Col>
                </FormRadioGroup>
            </Form.Section>

            {/* Тип доверителя: Юридическое лицо */}
            {type === PrincipalType.LegalEntityPrincipal && (
                <>
                    <Form.Section>
                        <Input title="Наименование организации" name="legalEntityPrincipal.companyName" />
                    </Form.Section>
                    <Form.Section>
                        <Row>
                            <Col md={4} className="mb-2 mb-md-0">
                                <Input title="ИНН" name="legalEntityPrincipal.inn" />
                            </Col>
                            <Col md={4} className="mb-2 mb-md-0">
                                <Input title="КПП" name="legalEntityPrincipal.kpp" />
                            </Col>
                            <Col md={4}>
                                <Input title="ОГРН" name="legalEntityPrincipal.ogrn" />
                            </Col>
                        </Row>
                    </Form.Section>
                    <Form.Section>
                        <Select title="Регион" name="legalEntityPrincipal.region" items={selectItems.regions} />
                    </Form.Section>
                </>
            )}

            {/* Тип доверителя: Индивидуальный предприниматель */}
            {type === PrincipalType.IndividualEntrepreneurPrincipal && (
                <>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="Наименование ИП" name="individualEntrepreneurPrincipal.companyName" />
                            </Col>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="ОГРНИП" name="individualEntrepreneurPrincipal.ogrn" />
                            </Col>
                        </Row>
                    </Form.Section>
                </>
            )}

            <Separator className="my-3" />

            {/* Тип доверителя: Юридическое лицо */}
            {/* Сведения о лице, действующем без доверенности */}
            {type === PrincipalType.LegalEntityPrincipal && (
                <>
                    <Subtitle>Сведения о лице, действующем без доверенности</Subtitle>

                    {/* Лицо, действующее без доверенности */}
                    <Form.Section>
                        <Form.Fieldset>
                            <Form.Title>Лицо, действующее без доверенности</Form.Title>
                        </Form.Fieldset>
                        <FormRadioGroup name="legalEntityPrincipal.type" component={Row}>
                            <Col xs="auto" className="mb-2 mb-md-0">
                                <Radio label="Юридическое лицо" value={LegalEntityPrincipalType.LegalEntityPerson} />
                            </Col>
                            <Col xs="auto">
                                <Radio label="Физическое лицо" value={LegalEntityPrincipalType.Person} />
                            </Col>
                        </FormRadioGroup>
                    </Form.Section>

                    {/* Лицо без доверенности: Юридическое лицо */}
                    {legalEntityPrincipalType === LegalEntityPrincipalType.LegalEntityPerson && (
                        <>
                            <Form.Section>
                                <Input
                                    title="Наименование организации"
                                    name="legalEntityPrincipal.legalEntityPerson.companyName"
                                />
                            </Form.Section>
                            <Form.Section>
                                <Row>
                                    <Col md={4} className="mb-2 mb-md-0">
                                        <Input title="ИНН" name="legalEntityPrincipal.legalEntityPerson.inn" />
                                    </Col>
                                    <Col md={4} className="mb-2 mb-md-0">
                                        <Input title="КПП" name="legalEntityPrincipal.legalEntityPerson.kpp" />
                                    </Col>
                                    <Col md={4}>
                                        <Input title="ОГРН" name="legalEntityPrincipal.legalEntityPerson.ogrn" />
                                    </Col>
                                </Row>
                            </Form.Section>
                            <Form.Section>
                                <Select
                                    title="Регион"
                                    name="legalEntityPrincipal.legalEntityPerson.region"
                                    items={selectItems.regions}
                                />
                            </Form.Section>

                            <Separator className="my-3" />

                            <Subtitle>Сведения о руководителе организации</Subtitle>

                            <Form.Section>
                                <Row>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input title="Фамилия" name="legalEntityPrincipal.legalEntityPerson.lastName" />
                                    </Col>
                                    <Col md={6}>
                                        <Input title="Имя" name="legalEntityPrincipal.legalEntityPerson.firstName" />
                                    </Col>
                                </Row>
                            </Form.Section>
                            <Form.Section>
                                <Row>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input
                                            title="Отчество"
                                            name="legalEntityPrincipal.legalEntityPerson.middleName"
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <DateInput
                                            title="Дата рождения"
                                            name="legalEntityPrincipal.legalEntityPerson.birthday"
                                        />
                                    </Col>
                                </Row>
                            </Form.Section>
                            <Form.Section>
                                <Row>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input title="СНИЛС" name="legalEntityPrincipal.legalEntityPerson.snils" />
                                    </Col>
                                </Row>
                            </Form.Section>
                        </>
                    )}

                    {/* Лицо без доверенности: Физическое лицо */}
                    {legalEntityPrincipalType === LegalEntityPrincipalType.Person && (
                        <>
                            <Form.Section>
                                <Row>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input title="Фамилия" name="legalEntityPrincipal.person.lastName" />
                                    </Col>
                                    <Col md={6}>
                                        <Input title="Имя" name="legalEntityPrincipal.person.firstName" />
                                    </Col>
                                </Row>
                            </Form.Section>
                            <Form.Section>
                                <Row>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input title="Отчество" name="legalEntityPrincipal.person.middleName" />
                                    </Col>
                                    <Col md={6}>
                                        <DateInput title="Дата рождения" name="legalEntityPrincipal.person.birthday" />
                                    </Col>
                                </Row>
                            </Form.Section>
                            <Form.Section>
                                <Row>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input title="СНИЛС" name="legalEntityPrincipal.person.snils" />
                                    </Col>
                                    <Col md={6}>
                                        <Input title="ИНН" name="legalEntityPrincipal.person.inn" />
                                    </Col>
                                </Row>
                            </Form.Section>
                        </>
                    )}
                </>
            )}

            {/* Тип доверителя: Индивидуальный предприниматель */}
            {/* Сведения о подписанте */}
            {type === PrincipalType.IndividualEntrepreneurPrincipal && (
                <>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="Фамилия" name="individualEntrepreneurPrincipal.lastName" />
                            </Col>
                            <Col md={6}>
                                <Input name="individualEntrepreneurPrincipal.firstName" title="Имя" />
                            </Col>
                        </Row>
                    </Form.Section>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="Отчество" name="individualEntrepreneurPrincipal.middleName" />
                            </Col>
                            <Col md={6}>
                                <DateInput title="Дата рождения" name="individualEntrepreneurPrincipal.birthday" />
                            </Col>
                        </Row>
                    </Form.Section>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="СНИЛС" name="individualEntrepreneurPrincipal.snils" />
                            </Col>
                            <Col md={6}>
                                <Input title="ИНН" name="individualEntrepreneurPrincipal.inn" />
                            </Col>
                        </Row>
                    </Form.Section>
                </>
            )}
        </Card>
    );
};
